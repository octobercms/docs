---
previousPath: extend/database/query.md
subtitle: Build and run database queries with a fluent interface, without needing a model.
---
# Query Builder

The query builder creates and runs database queries through a fluent interface. It handles most database operations and works on all supported database systems. Use it through the `Db` facade when you want to query a table directly, without a [model](./models.md).

```php
$users = Db::table('users')
    ->where('votes', '>', 100)
    ->orderBy('name')
    ->get();
```

::: aside
The query builder uses PDO parameter binding to protect your application against SQL injection attacks. You do not need to clean strings passed as bindings.
:::

To run plain SQL instead, use the `Db::select` method. See [Raw Database Access](./database.md) for more information.

```php
Db::select('select * from sometable where name = :name', ['name' => 'Charles']);
```

## Retrieving Results

To start a query, call the `table` method on the `Db` facade. It returns a query builder instance for the given table, so you can chain more constraints and then get the results. In this example, `get` returns all records from the table.

```php
$users = Db::table('users')->get();
```

The `get` method returns a collection of results, where each result is an instance of the PHP `stdClass` object. Read each column's value as a property of the object.

```php
foreach ($users as $user) {
    echo $user->name;
}
```

To retrieve a single row, use the `first` method. It returns a single `stdClass` object.

```php
$user = Db::table('users')->where('name', 'John')->first();

echo $user->name;
```

### Retrieving a Single Value or Column

To get a single value from a record, use the `value` method. It returns the value of the column directly.

```php
$email = Db::table('users')->where('name', 'John')->value('email');
```

To get the values of a single column, use the `pluck` method. This example retrieves the role titles.

```php
$titles = Db::table('roles')->pluck('title');

foreach ($titles as $title) {
    echo $title;
}
```

You can also set a custom key column for the result.

```php
$roles = Db::table('roles')->pluck('title', 'name');

foreach ($roles as $name => $title) {
    echo $title;
}
```

::: warning
The `pluck` method returns a `Collection` object that behaves like an array. To convert it to a PHP array, use the `all()` method, for example `pluck('name')->all()`.
:::

### Processing Results in Chunks

To work with thousands of database records, use the `chunk` method. It retrieves a small "chunk" of the results at a time and passes each chunk to a `Closure`. This is useful for [console commands](../console/commands.md) that process many records. This example works through the `users` table 100 records at a time.

```php
Db::table('users')->chunk(100, function($users) {
    foreach ($users as $user) {
        //
    }
});
```

To stop processing further chunks, return `false` from the `Closure`.

```php
Db::table('users')->chunk(100, function($users) {
    // Process the records...

    return false;
});
```

If you update records while chunking, the chunk results can change in unexpected ways. Use the `chunkById` method instead, which paginates the results by the record's primary key.

```php
Db::table('users')->where('active', false)
    ->chunkById(100, function ($users) {
        foreach ($users as $user) {
            Db::table('users')
                ->where('id', $user->id)
                ->update(['active' => true]);
        }
    });
```

::: warning
When you update or delete records inside the chunk callback, changes to the primary key or foreign keys can affect the chunk query. This can leave records out of the chunked results.
:::

### Calculating Aggregates

The query builder provides aggregate methods such as `count`, `max`, `min`, `avg` and `sum`. Call any of them after building your query.

```php
$users = Db::table('users')->count();

$price = Db::table('orders')->max('price');
```

You can combine these methods with other clauses.

```php
$price = Db::table('orders')
    ->where('is_finalized', 1)
    ->avg('price');
```

To check whether any records match your query, use the `exists` and `doesntExist` methods instead of `count`.

```php
return Db::table('orders')->where('finalized', 1)->exists();

return Db::table('orders')->where('finalized', 1)->doesntExist();
```

## Selecting Columns

To choose which columns to select, use the `select` method.

```php
$users = Db::table('users')->select('name', 'email as user_email')->get();
```

The `distinct` method makes the query return distinct results.

```php
$users = Db::table('users')->distinct()->get();
```

To add a column to an existing select clause, use the `addSelect` method.

```php
$query = Db::table('users')->select('name');

$users = $query->addSelect('age')->get();
```

### Using Raw Expressions

To use a raw expression in a query, create it with the `Db::raw` method.

```php
$users = Db::table('users')
    ->select(Db::raw('count(*) as user_count, status'))
    ->where('status', '<>', 1)
    ->groupBy('status')
    ->get();
```

Another use is joining columns and strings together.

```php
Db::raw("concat(first_name, ' ', last_name) as full_name");
```

::: warning
Raw statements are injected into the query as strings, so be extremely careful not to create SQL injection vulnerabilities.
:::

### Raw Methods

Instead of `Db::raw`, you can use the following methods to insert a raw expression into parts of your query.

The `selectRaw` method replaces `addSelect(Db::raw(...))`. It accepts an optional array of bindings as its second argument.

```php
$orders = Db::table('orders')
    ->selectRaw('price * ? as price_with_tax', [1.0825])
    ->get();
```

The `whereRaw` and `orWhereRaw` methods inject a raw `where` clause into your query. They accept an optional array of bindings as their second argument.

```php
$orders = Db::table('orders')
    ->whereRaw('price > IF(state = "TX", ?, 100)', [200])
    ->get();
```

The `havingRaw` and `orHavingRaw` methods set a raw string as the value of the `having` clause. They accept an optional array of bindings as their second argument.

```php
$orders = Db::table('orders')
    ->select('department', Db::raw('SUM(price) as total_sales'))
    ->groupBy('department')
    ->havingRaw('SUM(price) > ?', [2500])
    ->get();
```

The `orderByRaw` method sets a raw string as the value of the order by clause.

```php
$orders = Db::table('orders')
    ->orderByRaw('updated_at - created_at DESC')
    ->get();
```

The `groupByRaw` method sets a raw string as the value of the group by clause.

```php
$orders = Db::table('orders')
    ->select('city', 'state')
    ->groupByRaw('city, state')
    ->get();
```

## Filtering with Where Clauses

To add a `where` clause, use the `where` method. The basic call takes three arguments: the column name, an operator supported by the database, and the value to compare against the column. This query checks that the "votes" column equals 100.

```php
$users = Db::table('users')->where('votes', '=', 100)->get();
```

To check that a column equals a value, you can pass the value directly as the second argument.

```php
$users = Db::table('users')->where('votes', 100)->get();
```

You can use other operators, such as greater than `>`, doesn't equal `<>` and `like`.

```php
$users = Db::table('users')
    ->where('votes', '>=', 100)
    ->get();

$users = Db::table('users')
    ->where('votes', '<>', 100)
    ->get();

$users = Db::table('users')
    ->where('name', 'like', 'T%')
    ->get();
```

### Adding Or Conditions

You can chain where constraints together and add `or` clauses to the query. The `orWhere` method accepts the same arguments as the `where` method.

```php
$users = Db::table('users')
    ->where('votes', '>', 100)
    ->orWhere('name', 'John')
    ->get();
```

::: tip
You can prefix `or` to any of the where methods below to make an "OR" condition, for example `orWhereBetween` or `orWhereIn`.
:::

### Other Where Methods

The `whereBetween` method checks that a column's value is between two values.

```php
$users = Db::table('users')
    ->whereBetween('votes', [1, 100])->get();
```

The `whereNotBetween` method checks that a column's value lies outside two values.

```php
$users = Db::table('users')
    ->whereNotBetween('votes', [1, 100])
    ->get();
```

The `whereIn` method checks that a column's value is in the given array.

```php
$users = Db::table('users')
    ->whereIn('id', [1, 2, 3])
    ->get();
```

The `whereNotIn` method checks that a column's value is **not** in the given array.

```php
$users = Db::table('users')
    ->whereNotIn('id', [1, 2, 3])
    ->get();
```

The `whereNull` method checks that a column's value is `NULL`.

```php
$users = Db::table('users')
    ->whereNull('updated_at')
    ->get();
```

The `whereNotNull` method checks that a column's value is **not** `NULL`.

```php
$users = Db::table('users')
    ->whereNotNull('updated_at')
    ->get();
```

### Grouping Conditions

To build more advanced where clauses, such as nested parameter groups, pass a `Closure` to a where method. This example groups constraints within parentheses.

```php
Db::table('users')
    ->where('name', '=', 'John')
    ->orWhere(function ($query) {
        $query->where('votes', '>', 100)
            ->where('title', '<>', 'Admin');
    })
    ->get();
```

Passing a `Closure` to the `orWhere` method starts a constraint group. The `Closure` receives a query builder instance for setting the constraints inside the parentheses. The example above produces the following SQL.

```sql
select * from users where name = 'John' or (votes > 100 and title <> 'Admin')
```

### Checking a Subquery Exists

The `whereExists` method writes `where exists` SQL clauses. It accepts a `Closure` that receives a query builder instance for defining the query inside the "exists" clause.

```php
Db::table('users')
    ->whereExists(function ($query) {
        $query->select(Db::raw(1))
            ->from('orders')
            ->whereRaw('orders.user_id = users.id');
    })
    ->get();
```

The query above produces the following SQL.

```sql
select * from users where exists (
    select 1 from orders where orders.user_id = users.id
)
```

### Querying JSON Columns

You can query JSON columns on databases that support JSON column types. To query a JSON column, use the `->` operator.

```php
$users = Db::table('users')
    ->where('options->language', 'en')
    ->get();

$users = Db::table('users')
    ->where('preferences->dining->meal', 'salad')
    ->get();
```

To query JSON arrays, use `whereJsonContains`. This is not supported on SQLite.

```php
$users = Db::table('users')
    ->whereJsonContains('options->languages', 'en')
    ->get();
```

MySQL and PostgreSQL support `whereJsonContains` with multiple values.

```php
$users = Db::table('users')
    ->whereJsonContains('options->languages', ['en', 'de'])
    ->get();
```

To query JSON arrays by their length, use `whereJsonLength`.

```php
$users = Db::table('users')
    ->whereJsonLength('options->languages', 0)
    ->get();

$users = Db::table('users')
    ->whereJsonLength('options->languages', '>', 1)
    ->get();
```

### Applying Clauses Conditionally

To apply a clause only when something else is true, use the `when` method. For example, you might only apply a `where` statement if an input value is present on the request.

```php
$role = $request->input('role');

$users = Db::table('users')
    ->when($role, function ($query, $role) {
        return $query->where('role_id', $role);
    })
    ->get();
```

The `when` method only runs the `Closure` when the first parameter is `true`. If the first parameter is `false`, the `Closure` does not run.

You can pass another `Closure` as the third parameter. It runs when the first parameter is false. This example uses it to set the default sorting of a query.

```php
$sortBy = null;

$users = Db::table('users')
    ->when($sortBy, function ($query, $sortBy) {
        return $query->orderBy($sortBy);
    }, function ($query) {
        return $query->orderBy('name');
    })
    ->get();
```

### Searching Columns

The `searchWhere` and `orSearchWhere` methods run a search query on column values. They take the search term as the first argument and the search columns as the second, then run a case insensitive `like` query. These methods are available on [model queries](./model-queries.md).

```php
$posts = Post::searchWhere('foo bar', ['title', 'content'])->get();
```

The example above produces the following SQL, where each column and value has `lower()` applied to it.

```sql
select * from posts where
    (title like '%foo%' and title like '%bar%') or
    (content like '%foo%' and content like '%bar%')
```

By default, each word in the search term is searched. To change this, pass a mode as the third argument. The following modes are supported.

- **all**: result must contain all words (default)
- **any**: result can contain any word
- **exact**: result must contain the exact phrase

```php
$query->searchWhere('foo bar', ['title', 'content'], 'exact');
```

The `exact` search example above produces the following SQL.

```sql
select * from posts where (title like '%foo bar%' or content like '%foo bar%')
```

## Ordering, Grouping and Limiting

### Ordering Results

The `orderBy` method sorts the results by a given column. The first argument is the column to sort by, and the second sets the direction, either `asc` or `desc`.

```php
$users = Db::table('users')
    ->orderBy('name', 'desc')
    ->get();
```

The `latest` and `oldest` methods order results by date. By default they use the `created_at` column, or you can pass the column name to sort by.

```php
$user = Db::table('users')
    ->latest()
    ->first();
```

The `inRandomOrder` method sorts the results randomly. For example, you can use it to fetch a random user.

```php
$randomUser = Db::table('users')
    ->inRandomOrder()
    ->first();
```

### Grouping Results

The `groupBy` and `having` methods group the query results. The `having` method's signature is similar to the `where` method.

```php
$users = Db::table('users')
    ->groupBy('account_id')
    ->having('account_id', '>', 100)
    ->get();
```

To group by several columns, pass several arguments to the `groupBy` method.

```php
$users = Db::table('users')
    ->groupBy('first_name', 'status')
    ->having('account_id', '>', 100)
    ->get();
```

For more advanced `having` statements, use the [`havingRaw` method](#raw-methods).

### Limiting and Offsetting Results

To limit the number of results, or to skip a number of results (`OFFSET`), use the `take` and `skip` methods.

```php
$users = Db::table('users')->skip(10)->take(5)->get();
```

## Joining Tables

To perform a basic SQL "inner join", use the `join` method. The first argument is the name of the table to join, and the remaining arguments set the column constraints for the join. You can join several tables in a single query.

```php
$users = Db::table('users')
    ->join('contacts', 'users.id', '=', 'contacts.user_id')
    ->join('orders', 'users.id', '=', 'orders.user_id')
    ->select('users.*', 'contacts.phone', 'orders.price')
    ->get();
```

For a "left join" or "right join", use the `leftJoin` or `rightJoin` method. They have the same signature as the `join` method.

```php
$users = Db::table('users')
    ->leftJoin('posts', 'users.id', '=', 'posts.user_id')
    ->get();

$users = Db::table('users')
    ->rightJoin('posts', 'users.id', '=', 'posts.user_id')
    ->get();
```

For a "cross join", use the `crossJoin` method with the name of the table to cross join. Cross joins generate a cartesian product between the first table and the joined table.

```php
$users = Db::table('sizes')
    ->crossJoin('colors')
    ->get();
```

### Advanced Join Clauses

For more advanced join clauses, pass a `Closure` as the second argument to the `join` method. The `Closure` receives a `JoinClause` object for setting constraints on the `join` clause.

```php
Db::table('users')
    ->join('contacts', function ($join) {
        $join->on('users.id', '=', 'contacts.user_id')->orOn(...);
    })
    ->get();
```

To use a "where" style clause on a join, use the `where` and `orWhere` methods on the join. These compare the column against a value instead of comparing two columns.

```php
Db::table('users')
    ->join('contacts', function ($join) {
        $join->on('users.id', '=', 'contacts.user_id')
            ->where('contacts.user_id', '>', 5);
    })
    ->get();
```

### Joining a Subquery

The `joinSub`, `leftJoinSub` and `rightJoinSub` methods join a query to a subquery. Each takes three arguments: the subquery, its table alias and a `Closure` that defines the related columns.

```php
$latestPosts = Db::table('posts')
    ->select('user_id', Db::raw('MAX(created_at) as last_post_created_at'))
    ->where('is_published', true)
    ->groupBy('user_id');

$users = Db::table('users')
    ->joinSub($latestPosts, 'latest_posts', function ($join) {
        $join->on('users.id', '=', 'latest_posts.user_id');
    })->get();
```

### Combining Queries with Unions

To "union" two queries together, create an initial query and pass it to the `union` method of a second query.

```php
$first = Db::table('users')
    ->whereNull('first_name');

$users = Db::table('users')
    ->whereNull('last_name')
    ->union($first)
    ->get();
```

The `unionAll` method is also available and has the same signature as `union`.

## Inserting Records

The `insert` method inserts records into the table. It accepts an array of column names and values.

```php
Db::table('users')->insert(
    ['email' => 'john@example.tld', 'votes' => 0]
);
```

To insert several records in a single call, pass an array of arrays. Each array is a row to insert.

```php
Db::table('users')->insert([
    ['email' => 'taylor@example.tld', 'votes' => 0],
    ['email' => 'dayle@example.tld', 'votes' => 0]
]);
```

### Getting the Inserted ID

If the table has an auto-incrementing ID, use the `insertGetId` method to insert a record and then retrieve the ID.

```php
$id = Db::table('users')->insertGetId(
    ['email' => 'john@example.tld', 'votes' => 0]
);
```

::: tip
With the PostgreSQL database driver, the `insertGetId` method expects the auto-incrementing column to be named `id`. To retrieve the ID from a different "sequence", pass the sequence name as the second parameter to the `insertGetId` method.
:::

## Updating Records

The `update` method updates existing records. Like `insert`, it accepts an array of column and value pairs to update. Constrain the `update` query with `where` clauses.

```php
Db::table('users')
    ->where('id', 1)
    ->update(['votes' => 1]);
```

### Updating or Inserting a Record

To update a record if it exists or create it if it does not, use the `updateOrInsert` method. It takes two arguments: an array of conditions to find the record, and an array of column and value pairs to update.

The method first looks for a matching record using the first argument's column and value pairs. If the record exists, it is updated with the values in the second argument. If not, a new record is inserted with the merged attributes of both arguments.

```php
Db::table('users')
    ->updateOrInsert(
        ['email' => 'john@example.tld', 'name' => 'John'],
        ['votes' => '2']
    );
```

### Upserting Many Records

The `upsert` method inserts rows that do not exist and updates rows that already exist. The first argument is the values to insert or update. The second argument lists the columns that uniquely identify records in the table. The third argument is an array of columns to update if a matching record already exists.

```php
Db::table('flights')->upsert([
    ['departure' => 'Oakland', 'destination' => 'San Diego', 'price' => 99],
    ['departure' => 'Chicago', 'destination' => 'New York', 'price' => 150]
], ['departure', 'destination'], ['price']);
```

::: tip
All databases except SQL Server require the columns in the second argument of the `upsert` method to have a "primary" or "unique" index.
:::

### Updating JSON Columns

To update a key in a JSON column, use the `->` syntax. This is supported on MySQL 5.7+ and PostgreSQL 9.5+.

```php
$affected = Db::table('users')
    ->where('id', 1)
    ->update(['options->enabled' => true]);
```

### Incrementing and Decrementing Values

The `increment` and `decrement` methods change the value of a column without writing the `update` statement yourself. Both take the column to change as the first argument. An optional second argument sets the amount to change it by.

```php
Db::table('users')->increment('votes');

Db::table('users')->increment('votes', 5);

Db::table('users')->decrement('votes');

Db::table('users')->decrement('votes', 5);
```

You can also update other columns during the operation.

```php
Db::table('users')->increment('votes', 1, ['name' => 'John']);
```

## Deleting Records

The `delete` method deletes records from the table.

```php
Db::table('users')->delete();
```

Constrain `delete` statements by adding `where` clauses before calling the `delete` method.

```php
Db::table('users')->where('votes', '<', 100)->delete();
```

To truncate the entire table, which removes all rows and resets the auto-incrementing ID to zero, use the `truncate` method.

```php
Db::table('users')->truncate();
```

## Locking Rows

The query builder can apply "pessimistic locking" to your `select` statements. To run a statement with a "shared lock", use the `sharedLock` method. A shared lock prevents the selected rows from being modified until your transaction commits.

```php
Db::table('users')->where('votes', '>', 100)->sharedLock()->get();
```

You can also use the `lockForUpdate` method. A "for update" lock prevents the rows from being modified or from being selected with another shared lock.

```php
Db::table('users')->where('votes', '>', 100)->lockForUpdate()->get();
```

## Caching Queries

To cache the results of a query with the [Cache service](../services/cache.md), chain the `remember` or `rememberForever` method.

```php
$users = Db::table('users')->remember(10)->get();
```

In this example, the results are cached for ten minutes. While they are cached, the query does not run against the database, and the results load from the default cache driver for your application.

## Debugging Queries

To dump the query bindings and SQL while building a query, use the `dd` or `dump` methods. The `dd` method displays the debug information and stops the request. The `dump` method displays the debug information and lets the request continue.

```php
Db::table('users')->where('votes', '>', 100)->dd();

Db::table('users')->where('votes', '>', 100)->dump();
```

#### See Also

::: also
* [Raw Database Access](./database.md)
* [Model Queries](./model-queries.md)
* [Laravel Query Builder](https://laravel.com/docs/12.x/queries)
:::
