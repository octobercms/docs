---
previousPath: extend/database/basics.md
subtitle: Run raw SQL queries with the Db facade, switch between database connections, use transactions and log queries.
---
# Raw Database Access

The `Db` facade runs raw SQL queries against your database. Raw SQL and the [query builder](./query-builder.md) perform faster than [models](./model-queries.md) and suit simple tasks, while models give you a simple interface for creating, reading, updating and deleting records.

```php
$users = Db::select('select * from users where active = ?', [1]);
```

Managing database tables and seed data is handled by [migrations and seeders](./migrations.md). Models follow the active record pattern, made popular by Ruby on Rails. You can learn more about the [active record pattern on Wikipedia](http://en.wikipedia.org/wiki/Active_record_pattern).

## Running Raw SQL Queries

Once you have configured your database connection, run queries using the `Db` facade. It provides a method for each type of query: `select`, `update`, `insert`, `delete` and `statement`.

### Selecting Records

To run a basic query, use the `select` method, as shown at the top of this page. The first argument is the raw SQL query, and the second is the parameter bindings for the query, usually the values of the `where` clause constraints. Parameter binding protects against SQL injection.

The `select` method always returns an `array` of results. Each result is a PHP `stdClass` object, so you can read its values as properties.

```php
foreach ($users as $user) {
    echo $user->name;
}
```

You can use named bindings instead of `?` placeholders.

```php
$results = Db::select('select * from users where id = :id', ['id' => 1]);
```

If a query returns a single value, retrieve it with the `scalar` method.

```php
$count = Db::scalar('select count(*) as count from menu_items');
```

### Modifying Records

To run an `insert` statement, use the `insert` method. Like `select`, it takes the raw SQL query as the first argument and bindings as the second.

```php
Db::insert('insert into users (id, name) values (?, ?)', [1, 'Joe']);
```

To update existing records, use the `update` method. It returns the number of rows affected.

```php
$affected = Db::update('update users set votes = 100 where name = ?', ['John']);
```

To delete records, use the `delete` method. Like `update`, it returns the number of rows deleted.

```php
$deleted = Db::delete('delete from users');
```

### Running General Statements

For database statements that do not return a value, use the `statement` method.

```php
Db::statement('drop table users');
```

## Using Multiple Database Connections

When [using multiple connections](../../setup/database.md), access each one with the `connection` method. The name passed to `connection` must match one of the connections listed in your `config/database.php` configuration file.

```php
$users = Db::connection('foo')->select(...);
```

To access the underlying PDO instance, use the `getPdo` method on a connection instance.

```php
$pdo = Db::connection()->getPdo();
```

## Using Database Transactions

To run a set of operations inside a database transaction, use the `transaction` method. If an exception is thrown inside the transaction `Closure`, the transaction is rolled back. If the `Closure` runs successfully, the transaction is committed. You do not need to roll back or commit manually.

```php
Db::transaction(function () {
    Db::table('users')->update(['votes' => 1]);

    Db::table('posts')->delete();
});
```

To control rollbacks and commits yourself, start a transaction manually with the `beginTransaction` method.

```php
Db::beginTransaction();
```

Roll back the transaction with the `rollBack` method.

```php
Db::rollBack();
```

Commit the transaction with the `commit` method.

```php
Db::commit();
```

::: tip
The `Db` facade's transaction methods also control transactions for the [query builder](./query-builder.md) and [model queries](./model-queries.md).
:::

## Listening to Queries

To receive each SQL query your application runs, use the `listen` method. This is useful for logging queries or debugging. The listener receives a query event with the `sql`, `bindings` and `time` properties.

```php
Db::listen(function($query) {
    // $query->sql
    // $query->bindings
    // $query->time
});
```

Register your query listener in the `boot` method of a [plugin registration file](../plugins/extending.md). Plugins can also supply a file named **init.php** in the plugin directory for this logic.

### Logging Queries

With query logging enabled, a log of every query run in the current request is kept in memory. Call the `enableQueryLog` method to turn it on.

```php
Db::connection()->enableQueryLog();
```

To get an array of the executed queries, use the `getQueryLog` method.

```php
$queries = Db::getQueryLog();
```

In some cases, such as inserting a large number of rows, the log can make the application use too much memory. To turn off the log, use the `disableQueryLog` method.

```php
Db::connection()->disableQueryLog();
```

::: tip
For quicker debugging, call the [`trace_sql` helper function](../services/log.md#logging-database-queries) instead.
:::

#### See Also

::: also
* [Query Builder](./query-builder.md)
* [Model Queries](./model-queries.md)
* [Database Configuration](../../setup/database.md)
:::
