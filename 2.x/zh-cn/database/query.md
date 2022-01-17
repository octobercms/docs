# 查询

数据库查询构建器为创建和运行数据库查询提供了方便、流畅的界面。它可用于在您的应用程序中执行大多数数据库操作，并适用于所有受支持的数据库系统。

> **注意**：查询生成器使用 PDO 参数绑定来保护您的应用程序免受 SQL 注入攻击。 无需清理作为绑定传递的字符串。

## 查询结果

#### 从一个数据表中获取所有行

你可以使用 `DB` facade 里的`table` 方法来开始查询。 `table` 方法为给定的表返回一个查询构造器实例，允许你在查询上链式调用更多的约束，最后使用 `get` 方法获取结果：

```php
$users = Db::table('users')->get();
```

与 [原生查询](../database/basics.md#running-raw-sql-queries) 类似，`get` 方法返回结果的`array`，其中每个结果都是 PHP `stdClass` 对象的一个实例。 您可以通过将字段作为对象的属性来访问每一列的值：

```php
foreach ($users as $user) {
    echo $user->name;
}
```

#### 从数据表中获取单行或单列

如果你只需要从数据表中获取一行数据，你可以使用 `first` 方法。该方法返回一个 `StdClass` 对象

```php
$user = Db::table('users')->where('name', 'John')->first();

echo $user->name;
```

如果你甚至不需要整行数据，则可以使用 `value` 方法从记录中获取单个值。该方法将直接返回该字段的值：

```php
$email = Db::table('users')->where('name', 'John')->value('email');
```

#### 获取一列的值

如果您想检索包含一列值的数组，您可以使用 `lists` 方法。 在此示例中，我们将检索角色标题数组：

```php
$titles = Db::table('roles')->lists('title');

foreach ($titles as $title) {
    echo $title;
}
```

您还可以为返回的数组指定自定义键列：

```php
$roles = Db::table('roles')->lists('title', 'name');

foreach ($roles as $name => $title) {
    echo $title;
}
```

### 原生SQL表达式

有时候你可能需要在查询中使用原生表达式。 你可以使用`Db::select`创建一个原生表达式：

```php
Db::select('select * from sometable where name = :name', ['name' => 'Charles']);
```

有关详细信息，请参阅有关 [运行原生 SQL 查询](../database/basics.md#running-raw-sql-queries) 的文章。

### 分块结果

如果您需要处理数千条数据库记录，请考虑使用 `chunk` 方法。该方法一次获取结果集的一小块，并将其传递给 `闭包` 函数进行处理。 这种方法对于编写处理数千条记录的[控制台命令](../console/development.md)非常有用。 例如，我们可以将全部 `users` 表数据切割成一次处理 100 条记录的一小块：

```php
Db::table('users')->chunk(100, function($users) {
    foreach ($users as $user) {
        //
    }
});
```

你可以通过在 `闭包` 中返回 `false` 来终止继续获取分块结果：

```php
Db::table('users')->chunk(100, function($users) {
    // 处理记录...

    return false;
});
```

如果要在分块结果时更新数据库记录，则块结果可能会和预计的返回结果不一致。 因此，在分块更新记录时，最好使用 `chunkById` 方法。 此方法将根据记录的主键自动对结果进行分页：

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

> **注意**：在块的回调里面更新或删除记录时，对主键或外键的任何更改都可能影响块查询。 这可能会导致记录没有包含在分块结果中。

### 聚合

查询构造器还提供了各种聚合方法，比如 `count`, `max`，`min`， `avg`，还有 `sum`。你可以在构造查询后调用任何方法：

```php
$users = Db::table('users')->count();

$price = Db::table('orders')->max('price');
```

当然，你也可以将这些聚合方法与其他的查询语句相结合：

```php
$price = Db::table('orders')
    ->where('is_finalized', 1)
    ->avg('price');
```

#### 判断记录是否存在

除了通过 `count` 方法可以确定查询条件的结果是否存在之外，还可以使用 `exists` 和 `doesntExist` 方法：

```php
return Db::table('orders')->where('finalized', 1)->exists();

return Db::table('orders')->where('finalized', 1)->doesntExist();
```

## Selects

#### 指定一个 Select 语句

当然你可能并不总是希望从数据库表中获取所有列。使用 `select ` 方法，你可以自定义一个 `select` 查询语句来查询指定的字段

```php
$users = Db::table('users')->select('name', 'email as user_email')->get();
```

`distinct` 方法会强制让查询返回的结果不重复：

```php
$users = Db::table('users')->distinct()->get();
```

如果你已经有了一个查询构造器实例，并且希望在现有的查询语句中加入一个字段，那么你可以使用 `addSelect` 方法：

```php
$query = Db::table('users')->select('name');

$users = $query->addSelect('age')->get();
```

#### 原生表达式

有时候你可能需要在查询中使用原生表达式。你可以使用 `DB::raw` 创建一个原生表达式：

```php
$users = Db::table('users')
    ->select(Db::raw('count(*) as user_count, status'))
    ->where('status', '<>', 1)
    ->groupBy('status')
    ->get();
```

另一种用途可能是将字段"与/或"字符串连接在一起。

```php
Db::raw("(first_name, ' ', last_name) as full_name");
```

> **注意**：原生语句将作为字符串注入到查询中，因此您应该非常小心，不要造成 SQL 注入漏洞。

#### 原生方法

可以使用以下方法代替 `DB::raw`，将原生表达式插入查询的各个部分。

**selectRaw**

`selectRaw` 方法可以代替 `select(DB::raw(...))`。该方法的第二个参数是可选项，值是一个绑定参数的数组：

```php
$orders = Db::table('orders')
    ->selectRaw('price * ? as price_with_tax', [1.0825])
    ->get();
```

**whereRaw / orWhereRaw**

`whereRaw` 和`orWhereRaw` 方法将原生的 `where`
注入到你的查询中。这两个方法的第二个参数还是可选项，值还是绑定参数的数组：

```php
$orders = Db::table('orders')
    ->whereRaw('price > IF(state = "TX", ?, 100)', [200])
    ->get();
```

**havingRaw / orHavingRaw**

`havingRaw` 和`orHavingRaw` 方法可以用于将原生字符串设置为 `having` 语句的值：

```php
$orders = Db::table('orders')
    ->select('department', Db::raw('SUM(price) as total_sales'))
    ->groupBy('department')
    ->havingRaw('SUM(price) > ?', [2500])
    ->get();
```

**orderByRaw**

`orderByRaw` 方法可用于将原生字符串设置为 `order by` 子句的值：

```php
$orders = Db::table('orders')
    ->orderByRaw('updated_at - created_at DESC')
    ->get();
```

**groupByRaw**

`groupByRaw` 方法可用于将原生字符串设置为 `group by` 子句的值：

```php
$orders = Db::table('orders')
    ->select('city', 'state')
    ->groupByRaw('city, state')
    ->get();
```

## Joins

#### Inner Join 语句

查询构造器也可以编写 `join` 方法。若要执行基本的
「内链接」，你可以在查询构造器实例上使用 `join` 方法。传递给 `join` 方法的第一个参数是你需要连接的表的名称，而其他参数则使用指定连接的字段约束。你还可以在单个查询中连接多个数据表：

```php
$users = Db::table('users')
    ->join('contacts', 'users.id', '=', 'contacts.user_id')
    ->join('orders', 'users.id', '=', 'orders.user_id')
    ->select('users.*', 'contacts.phone', 'orders.price')
    ->get();
```

#### Left Join / Right Join 语句

如果你想使用 「左连接」或者 「右连接」代替「内连接」 ，可以使用 `leftJoin` 或者 `rightJoin` 方法。这两个方法与 `join` 方法用法相同：

```php
$users = Db::table('users')
    ->leftJoin('posts', 'users.id', '=', 'posts.user_id')
    ->get();

$users = Db::table('users')
    ->rightJoin('posts', 'users.id', '=', 'posts.user_id')
    ->get();
```

#### Cross Join 语句

使用 `crossJoin` 方法和你想要连接的表名做 「交叉连接」。交叉连接在第一个表和被连接的表之间会生成笛卡尔积：

```php
$users = Db::table('sizes')
    ->crossJoin('colors')
    ->get();
```

#### 高级 Join 语句

你可以指定更高级的 join 语句。比如传递一个 `闭包` 作为 `join` 方法的第二个参数。此 `闭包` 接收一个
 `JoinClause` 对象，从而指定 `join` 语句中指定的约束：

```php
Db::table('users')
    ->join('contacts', function ($join) {
        $join->on('users.id', '=', 'contacts.user_id')->orOn(...);
    })
    ->get();
```

如果你想要在连接上使用「where」 风格的语句，你可以在连接上使用 `where` 和 `orWhere` 方法。这些方法会将列和值进行比较，而不是列和列进行比较：

```php
Db::table('users')
    ->join('contacts', function ($join) {
        $join->on('users.id', '=', 'contacts.user_id')
            ->where('contacts.user_id', '>', 5);
    })
    ->get();
```

#### 子连接查询

你可以使用 `joinSub`，`leftJoinSub` 和 `rightJoinSub` 方法关联一个查询作为子查询。他们每一种方法都会接收三个参数：子查询，表别名和定义关联字段的闭包：

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

## Unions

查询构造器还提供了将两个查询 「联合」 的快捷方式。比如，你可以先创建一个查询，然后使用 `union` 方法将其和第二个查询进行联合：

```php
$first = Db::table('users')
    ->whereNull('first_name');

$users = Db::table('users')
    ->whereNull('last_name')
    ->union($first)
    ->get();
```

你也可以使用 `unionAll` 方法，用法和 `union` 方法一样。

## Where 语句

#### 简单的 Where 语句

在构造 `where` 查询实例的中，你可以使用 `where` 方法。调用 `where` 最基本的方式是需要传递三个参数：第一个参数是列名，第二个参数是任意一个数据库系统支持的运算符，第三个是该列要比较的值。

例如，下面是一个要验证 「votes」 字段的值等于 100 的查询：

```php
$users = Db::table('users')->where('votes', '=', 100)->get();
```

为了方便，如果你只是简单比较列值和给定数值是否相等，可以将数值直接作为 `where` 方法的第二个参数：

```php
$users = Db::table('users')->where('votes', 100)->get();
```

当然，你也可以使用其他的运算符来编写 `where` 子句：

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

#### Or 语句

你可以一起链式调用 where 约束，也可以在查询中添加  `or` 字句。 `orWhere` 方法和 `where` 方法接收的参数一样：

```php
$users = Db::table('users')
    ->where('votes', '>', 100)
    ->orWhere('name', 'John')
    ->get();
```

> **提示：**您还可以在下面的任何 where 语句方法前加上 `or`，使条件成为「OR」条件 - 例如，`orWhereBetween`、`orWhereIn` 等。

#### "Where between" 语句

`whereBetween` 方法验证字段值是否在给定的两个值之间：

```php
$users = Db::table('users')
    ->whereBetween('votes', [1, 100])->get();
```

`whereNotBetween`方法验证字段值是否在给定的两个值之外：

```php
$users = Db::table('users')
    ->whereNotBetween('votes', [1, 100])
    ->get();
```

#### "Where in" 语句

`whereIn` 方法验证字段的值必须存在指定的数组里：

```php
$users = Db::table('users')
    ->whereIn('id', [1, 2, 3])
    ->get();
```

`whereNotIn` 方法验证字段的值必须不存在于指定的数组里

```php
$users = Db::table('users')
    ->whereNotIn('id', [1, 2, 3])
    ->get();
```

#### "Where null" statements

`whereNull` 方法验证指定的字段必须是 `NULL`：

```php
$users = Db::table('users')
    ->whereNull('updated_at')
    ->get();
```

 `whereNotNull`  方法验证指定的字段必须不是 `NULL`：

```php
$users = Db::table('users')
    ->whereNotNull('updated_at')
    ->get();
```

### 高级 Where 子句

#### 参数分组

有时候你需要创建更高级的 where 子句，例如「where exists」或者嵌套的参数分组。 Laravel 的查询构造器也能够处理这些。下面，让我们看一个在括号中进行分组约束的例子

```php
Db::table('users')
    ->where('name', '=', 'John')
    ->orWhere(function ($query) {
        $query->where('votes', '>', 100)
            ->where('title', '<>', 'Admin');
    })
    ->get();
```

你可以看到，通过一个 `Closure` 写入 `where` 方法构建一个查询构造器 来约束一个分组。 这个 `Closure` 接收一个查询实例，你可以使用这个实例来设置应该包含的约束. 上面的例子将生成以下SQL：

```sql
select * from users where name = 'John' or (votes > 100 and title <> 'Admin')
```

#### Where Exists 语句

 `whereExists` 方法允许你使用 `where exists` SQL 语句。 `whereExists` 方法接收一个 `Closure` 参数，该 `whereExists` 方法接受一个 Closure 参数，该闭包获取一个查询构建器实例从而允许你定义放置在 `exists` 字句中查询：

```php
Db::table('users')
    ->whereExists(function ($query) {
        $query->select(Db::raw(1))
            ->from('orders')
            ->whereRaw('orders.user_id = users.id');
    })
    ->get();
```

上述查询将产生如下的 SQL 语句：

```sql
select * from users where exists (
    select 1 from orders where orders.user_id = users.id
)
```

### JSON Where 语句

October CMS 也支持查询 JSON 类型的字段。使用 `->` 操作符查询 JSON 数据：

```php
$users = Db::table('users')
    ->where('options->language', 'en')
    ->get();

$users = Db::table('users')
    ->where('preferences->dining->meal', 'salad')
    ->get();
```

你也可以使用 `whereJsonContains` 来查询 JSON 数组(不支持 SQLite)：

```php
$users = Db::table('users')
    ->whereJsonContains('options->languages', 'en')
    ->get();
```

MySQL 和 PostgreSQL 的 `whereJsonContains` 可以支持多个值：

```php
$users = Db::table('users')
    ->whereJsonContains('options->languages', ['en', 'de'])
    ->get();
```

你可以使用 `whereJsonLength` 来查询JSON数组的长度：

```php
$users = Db::table('users')
    ->whereJsonLength('options->languages', 0)
    ->get();

$users = Db::table('users')
    ->whereJsonLength('options->languages', '>', 1)
    ->get();
```

### 条件子句

有时候你可能想要子句只适用于某个情况为真是才执行查询。例如你可能只想给定值在请求中存在的情况下才应用 `where` 语句。 你可以通过使用 `when` 方法

```php
$role = $request->input('role');

$users = Db::table('users')
    ->when($role, function ($query, $role) {
        return $query->where('role_id', $role);
    })
    ->get();
```

`when` 方法只有在第一个参数为 true 的时候才执行给的的闭包。如果第一个参数为 `false` ，那么这个闭包将不会被执行

你也可以传递另一个闭包作为 `when` 方法的第三个参数。 该闭包会在第一个参数为 `false` 的情况下执行。为了说明如何使用这个特性，我们来配置一个查询的默认排序

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

## 排序, 分组, 限制&偏移(分页)

#### 排序

`orderBy` 方法允许你通过给定字段对结果集进行排序。 `orderBy` 的第一个参数应该是你希望排序的字段，第二个参数控制排序的方向，可以是 `asc` 或 `desc`：

```php
$users = Db::table('users')
    ->orderBy('name', 'desc')
    ->get();
```

#### 最新/最旧

 `latest` 和 `oldest` 方法可以使你轻松地通过日期排序。它默认使用 `created_at` 列作为排序依据。当然，你也可以传递自定义的列名：

```php
$user = Db::table('users')
    ->latest()
    ->first();
```

#### 随机排序

`inRandomOrder` 方法被用来将结果随机排序。例如，你可以使用此方法随机找到一个用户。

```php
$randomUser = Db::table('users')
    ->inRandomOrder()
    ->first();
```

#### 分组

`groupBy` 和 `having` 方法可以将结果分组。 `having` 方法的使用与 `where` 方法十分相似：

```php
$users = Db::table('users')
    ->groupBy('account_id')
    ->having('account_id', '>', 100)
    ->get();
```

你可以向 `groupBy` 方法传递多个参数：

```php
$users = Db::table('users')
    ->groupBy('first_name', 'status')
    ->having('account_id', '>', 100)
    ->get();
```

对于更高级的 `having` 语法，参见 [`havingRaw`](#aggregates) 方法.

#### 限制和偏移(分页)

要限制结果的返回数量，或跳过指定数量的结果，你可以使用 `skip` 和 `take` 方法：

```php
$users = Db::table('users')->skip(10)->take(5)->get();
```

## 插入

查询构造器还提供了 `insert` 方法用于插入记录到数据库中。 `insert` 方法接收数组形式的字段名和字段值进行插入操作

```php
Db::table('users')->insert(
    ['email' => 'john@example.com', 'votes' => 0]
);
```

你甚至可以将数组传递给 `insert` 方法，将多个记录插入到表中

```php
Db::table('users')->insert([
    ['email' => 'taylor@example.com', 'votes' => 0],
    ['email' => 'dayle@example.com', 'votes' => 0]
]);
```

#### 自增 ID

如果数据表有自增 ID ，使用 `insertGetId` 方法来插入记录并返回 ID 值

```php
$id = Db::table('users')->insertGetId(
    ['email' => 'john@example.com', 'votes' => 0]
);
```

> **注意**: 当使用 PostgreSQL 时，` insertGetId` 方法将默认把 `id` 作为自动递增字段的名称。如果你要从其他「序列」来获取 ID ，则可以将字段名称作为第二个参数传递给 `insertGetId` 方法。

## 更新

除了将记录插入数据库之外，查询构建器还可以使用 `update` 方法更新现有记录。 `update` 方法与 `insert` 方法一样，接受包含要更新的字段和值数组。 您可以使用 `where` 子句限制 `update` 查询：

```php
Db::table('users')
    ->where('id', 1)
    ->update(['votes' => 1]);
```

#### 更新或者新增

有时您可能希望更新数据库中的现有记录，或者如果不存在匹配记录则创建它。 在这种情况下，可以使用 `updateOrInsert` 方法。 `updateOrInsert` 方法接受两个参数：一个用于查找记录的条件数组，以及一个包含要更该记录的键值对数组。

`updateOrInsert` 方法将首先尝试使用第一个参数的键和值对来查找匹配的数据库记录。 如果记录存在，则使用第二个参数中的值去更新记录。 如果找不到记录，将插入一个新记录，更新的数据是两个数组的集合：

```php
Db::table('users')
    ->updateOrInsert(
        ['email' => 'john@example.com', 'name' => 'John'],
        ['votes' => '2']
    );
```

<!--
#### Update or Insert / `upsert()` (Batch query to process multiple rows in one DB call)

The `upsert` method will insert rows that do not exist and update the rows that already exist with the new values. The method's first argument consists of the values to insert or update, while the second argument lists the column(s) that uniquely identify records within the associated table. The method's third and final argument is an array of columns that should be updated if a matching record already exists in the database:

    DB::table('flights')->upsert([
        ['departure' => 'Oakland', 'destination' => 'San Diego', 'price' => 99],
        ['departure' => 'Chicago', 'destination' => 'New York', 'price' => 150]
    ], ['departure', 'destination'], ['price']);

> **Note**: All databases except SQL Server require the columns in the second argument of the `upsert` method to have a "primary" or "unique" index.
-->

### 更新 JSON 字段

更新 JSON 字段时，你可以使用 `->` 语法访问 JSON 对象中相应的值，此操作只能支持 MySQL 5.7+ 和 PostgreSQL 9.5+:

```php
$affected = Db::table('users')
    ->where('id', 1)
    ->update(['options->enabled' => true]);
```

#### 自增 & 自减

查询构造器还为给定字段的递增或递减提供了方便的方法。此方法提供了一个比手动编写 `update` 语句更具表达力且更精练的接口。

这两种方法都至少接收一个参数：需要修改的列。第二个参数是可选的，用于控制列递增或递减的量：

```php
Db::table('users')->increment('votes');

Db::table('users')->increment('votes', 5);

Db::table('users')->decrement('votes');

Db::table('users')->decrement('votes', 5);
```

你也可以在操作过程中指定要更新的字段：

```php
Db::table('users')->increment('votes', 1, ['name' => 'John']);
```

## 删除

查询构建器也可用于通过 `delete` 方法从表中删除记录：

```php
Db::table('users')->delete();
```

查询构造器也可以使用 `delete` 方法从表中删除记录。 在使用 `delete` 前，可以添加 `where` 子句来约束 `delete` 语法：

```php
Db::table('users')->where('votes', '<', 100)->delete();
```

如果你需要清空表，你可以使用 `truncate` 方法，它将删除所有行，并重置自增 ID 为零：

```php
Db::table('users')->truncate();
```

## 悲观锁

查询构造器也包含一些可以帮助你在 `select` 语法上实现「悲观锁定」的函数。若想在查询中实现一个「共享锁」， 你可以使用 `sharedLock` 方法。 共享锁可防止选中的数据列被篡改，直到事务被提交为止 :

```php
Db::table('users')->where('votes', '>', 100)->sharedLock()->get();
```

或者，你可以使用 `lockForUpdate` 方法。使用 「update」锁可避免行被其它共享锁修改或选取：

```php
Db::table('users')->where('votes', '>', 100)->lockForUpdate()->get();
```

## 缓存查询

您可以使用 [缓存服务](../services/cache.md) 轻松缓存查询结果。 准备查询时，只需链接 `remember` 或 `rememberForever` 方法。

```php
$users = Db::table('users')->remember(10)->get();
```

在本例中，查询结果将被缓存十分钟。 当结果被缓存时，查询不会针对数据库运行，结果将从为您的应用程序指定的默认缓存驱动程序加载。

## 调试

你可以使用 `dd` 或者 `dump` 方法输出查询结果或者 SQL 语句。 使用`dd` 方法可以显示调试信息，然后停止执行请求。 `dump` 方法同样可以显示调试信息，但是不会停止执行请求：

```php
Db::table('users')->where('votes', '>', 100)->dd();

Db::table('users')->where('votes', '>', 100)->dump();
```
