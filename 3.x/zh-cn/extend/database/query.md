# 查询构建器

::: aside
查询构建器使用 PDO 参数绑定来保护您的应用程序免受 SQL 注入攻击。无需清理作为绑定传递的字符串。
:::

数据库查询构建器提供了一个方便、流畅的接口来创建和运行数据库查询。它可用于执行应用程序中的大多数数据库操作，并且适用于所有支持的数据库系统。

### 原始 SQL 示例

有时使用纯 SQL 执行查询更有意义，您可以使用 `Db::select` 方法来实现。

```php
Db::select('select * from sometable where name = :name', ['name' => 'Charles']);
```

有关更多信息，请参阅[运行原始 SQL 查询](./basics.md)的文章。

## 获取结果

要开始一个流畅查询，请使用 `Db` 门面上的 `table` 方法。`table` 方法为给定的表返回一个流畅的查询构建器实例，允许您在查询上链接更多约束，然后最终获取结果。在此示例中，`get` 将返回表中的所有记录。

```php
$users = Db::table('users')->get();
```

类似于[原始查询](./basics.md)，`get` 方法返回一个结果 `array`，其中每个结果都是 PHP `stdClass` 对象的实例。您可以通过将列作为对象的属性来访问每个列的值。

```php
foreach ($users as $user) {
    echo $user->name;
}
```

如果您只需要从数据库表中获取单行，您可以使用 `first` 方法。此方法将返回一个 `stdClass` 对象。

```php
$user = Db::table('users')->where('name', 'John')->first();

echo $user->name;
```

### 提取值

如果您甚至不需要整行，您可以使用 `value` 方法从记录中提取单个值。此方法将直接返回列的值：

```php
$email = Db::table('users')->where('name', 'John')->value('email');
```

如果您想获取包含单个列的值的数组，您可以使用 `pluck` 方法。在此示例中，我们将获取角色标题的数组。

```php
$titles = Db::table('roles')->pluck('title');

foreach ($titles as $title) {
    echo $title;
}
```

您还可以为返回的数组指定自定义键列。

```php
$roles = Db::table('roles')->pluck('title', 'name');

foreach ($roles as $name => $title) {
    echo $title;
}
```

::: warning
`pluck` 的结果将返回行为类似数组的 `Collection` 对象。使用 `all()` 方法将其转换为 PHP 数组，例如 `pluck('name')->all()`。
:::

### 分块结果

如果您需要处理数千条数据库记录，请考虑使用 `chunk` 方法。此方法每次获取一小"块"结果，并将每个块送入 `Closure` 进行处理。此方法对于编写处理数千条记录的[控制台命令](../console-commands.md)非常有用。例如，让我们每次处理 100 条记录来处理整个 `users` 表。

```php
Db::table('users')->chunk(100, function($users) {
    foreach ($users as $user) {
        //
    }
});
```

您可以通过从 `Closure` 中返回 `false` 来停止处理后续的块。

```php
Db::table('users')->chunk(100, function($users) {
    // 处理记录...

    return false;
});
```

如果您在分块结果的同时更新数据库记录，您的分块结果可能会以意想不到的方式变化。因此，在分块时更新记录时，最好改用 `chunkById` 方法。此方法将基于记录的主键自动分页结果。

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
在分块回调中更新或删除记录时，对主键或外键的任何更改都可能影响分块查询。这可能会导致某些记录不包含在分块结果中。
:::

### 聚合函数

查询构建器还提供了多种聚合方法，如 `count`、`max`、`min`、`avg` 和 `sum`。您可以在构建查询后调用这些方法中的任何一个：

```php
$users = Db::table('users')->count();

$price = Db::table('orders')->max('price');
```

当然，您可以将这些方法与其他子句结合使用来构建查询：

```php
$price = Db::table('orders')
    ->where('is_finalized', 1)
    ->avg('price');
```

您可以使用 `exists` 和 `doesntExist` 方法来确定是否存在与查询约束匹配的记录，而不使用 `count` 方法：

```php
return Db::table('orders')->where('finalized', 1)->exists();

return Db::table('orders')->where('finalized', 1)->doesntExist();
```

## Select 语句

在某些情况下，您可能不想从数据库表中选择所有列。使用 `select` 方法，您可以为查询指定一个自定义的 `select` 子句。

```php
$users = Db::table('users')->select('name', 'email as user_email')->get();
```

`distinct` 方法允许您强制查询返回不重复的结果。

```php
$users = Db::table('users')->distinct()->get();
```

如果您已经有一个查询构建器实例，并且希望向其现有的 select 子句添加一列，您可以使用 `addSelect` 方法：

```php
$query = Db::table('users')->select('name');

$users = $query->addSelect('age')->get();
```

### 原始表达式

有时您可能需要在查询中使用原始表达式。要创建原始表达式，您可以使用 `Db::raw` 方法。

```php
$users = Db::table('users')
    ->select(Db::raw('count(*) as user_count, status'))
    ->where('status', '<>', 1)
    ->groupBy('status')
    ->get();
```

另一个用途可能是连接列和/或字符串。

```php
Db::raw("(first_name, ' ', last_name) as full_name");
```

::: warning
原始语句将作为字符串注入到查询中，因此您应该非常小心，不要创建 SQL 注入漏洞。
:::

### 原始方法

除了使用 `Db::raw`，您还可以使用以下方法将原始表达式插入查询的各个部分。

`selectRaw` 方法可以代替 `addSelect(Db::raw(...))`。此方法接受一个可选的绑定数组作为其第二个参数：

```php
$orders = Db::table('orders')
    ->selectRaw('price * ? as price_with_tax', [1.0825])
    ->get();
```

`whereRaw` 和 `orWhereRaw` 方法可用于将原始 `where` 子句注入您的查询。这些方法接受一个可选的绑定数组作为其第二个参数：

```php
$orders = Db::table('orders')
    ->whereRaw('price > IF(state = "TX", ?, 100)', [200])
    ->get();
```

`havingRaw` 和 `orHavingRaw` 方法可用于将原始字符串设置为 `having` 子句的值。这些方法接受一个可选的绑定数组作为其第二个参数：

```php
$orders = Db::table('orders')
    ->select('department', Db::raw('SUM(price) as total_sales'))
    ->groupBy('department')
    ->havingRaw('SUM(price) > ?', [2500])
    ->get();
```

`orderByRaw` 方法可用于将原始字符串设置为 order by 子句的值：

```php
$orders = Db::table('orders')
    ->orderByRaw('updated_at - created_at DESC')
    ->get();
```

`groupByRaw` 方法可用于将原始字符串设置为 group by 子句的值：

```php
$orders = Db::table('orders')
    ->select('city', 'state')
    ->groupByRaw('city, state')
    ->get();
```

## 连接

查询构建器也可用于编写连接语句。要执行基本的 SQL "内连接"，您可以在查询构建器实例上使用 `join` 方法。传递给 `join` 方法的第一个参数是您需要连接的表的名称，而其余参数指定连接的列约束。当然，如您所见，您可以在一个查询中连接多个表。

```php
$users = Db::table('users')
    ->join('contacts', 'users.id', '=', 'contacts.user_id')
    ->join('orders', 'users.id', '=', 'orders.user_id')
    ->select('users.*', 'contacts.phone', 'orders.price')
    ->get();
```

如果您想执行"左连接"或"右连接"而不是"内连接"，请使用 `leftJoin` 或 `rightJoin` 方法。`leftJoin` 和 `rightJoin` 方法与 `join` 方法具有相同的签名。

```php
$users = Db::table('users')
    ->leftJoin('posts', 'users.id', '=', 'posts.user_id')
    ->get();

$users = Db::table('users')
    ->rightJoin('posts', 'users.id', '=', 'posts.user_id')
    ->get();
```

要执行"交叉连接"，请使用 `crossJoin` 方法以及您希望交叉连接的表名。交叉连接在第一个表和连接表之间生成笛卡尔积。

```php
$users = Db::table('sizes')
    ->crossJoin('colors')
    ->get();
```

### 高级连接语句

您还可以指定更高级的连接子句。首先，将一个 `Closure` 作为第二个参数传递给 `join` 方法。`Closure` 将接收一个 `JoinClause` 对象，允许您在 `join` 子句上指定约束。

```php
Db::table('users')
    ->join('contacts', function ($join) {
        $join->on('users.id', '=', 'contacts.user_id')->orOn(...);
    })
    ->get();
```

如果您想在连接上使用 "where" 风格的子句，您可以在连接上使用 `where` 和 `orWhere` 方法。这些方法不是比较两列，而是将列与值进行比较。

```php
Db::table('users')
    ->join('contacts', function ($join) {
        $join->on('users.id', '=', 'contacts.user_id')
            ->where('contacts.user_id', '>', 5);
    })
    ->get();
```

### 子查询连接

您可以使用 `joinSub`、`leftJoinSub` 和 `rightJoinSub` 方法将查询连接到子查询。这些方法各接收三个参数：子查询、其表别名和定义相关列的 Closure：

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

### 联合

查询构建器还提供了一种快速将两个查询"联合"在一起的方法。例如，您可以创建一个初始查询，然后使用 `union` 方法将其与第二个查询联合。

```php
$first = Db::table('users')
    ->whereNull('first_name');

$users = Db::table('users')
    ->whereNull('last_name')
    ->union($first)
    ->get();
```

`unionAll` 方法也可用，其方法签名与 `union` 相同。

## Where 子句

要向查询添加 `where` 子句，请在查询构建器实例上使用 `where` 方法。最基本的 `where` 调用需要三个参数。第一个参数是列的名称。第二个参数是运算符，可以是数据库支持的任何运算符。第三个参数是要与列进行比较的值。

例如，以下查询验证 "votes" 列的值等于 100。

```php
$users = Db::table('users')->where('votes', '=', 100)->get();
```

为了方便起见，如果您只想验证某列等于给定值，您可以将值直接作为第二个参数传递给 `where` 方法。

```php
$users = Db::table('users')->where('votes', 100)->get();
```

您可以在编写 `where` 子句时使用各种其他运算符，例如大于 `>`、不等于 `<>` 和 `like`。

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

### Or 语句

您可以将 where 约束链接在一起，也可以向查询添加 `or` 子句。`orWhere` 方法接受与 `where` 方法相同的参数：

```php
$users = Db::table('users')
    ->where('votes', '>', 100)
    ->orWhere('name', 'John')
    ->get();
```

::: tip
您还可以在下面的任何 where 语句方法前加上 `or` 前缀，使条件成为 "OR" 条件 - 例如 `orWhereBetween`、`orWhereIn` 等。
:::

### 更多 Where 语句

`whereBetween` 方法验证列的值在两个值之间。

```php
$users = Db::table('users')
    ->whereBetween('votes', [1, 100])->get();
```

`whereNotBetween` 方法验证列的值在两个值之外。

```php
$users = Db::table('users')
    ->whereNotBetween('votes', [1, 100])
    ->get();
```

`whereIn` 方法验证给定列的值包含在给定数组中。

```php
$users = Db::table('users')
    ->whereIn('id', [1, 2, 3])
    ->get();
```

`whereNotIn` 方法验证给定列的值**不**包含在给定数组中。

```php
$users = Db::table('users')
    ->whereNotIn('id', [1, 2, 3])
    ->get();
```

`whereNull` 方法验证给定列的值为 `NULL`。

```php
$users = Db::table('users')
    ->whereNull('updated_at')
    ->get();
```

`whereNotNull` 方法验证列的值**不**为 `NULL`。

```php
$users = Db::table('users')
    ->whereNotNull('updated_at')
    ->get();
```

### 搜索语句

`searchWhere` 和 `orSearchWhere` 方法可用于对列的值执行搜索查询。该方法将使用搜索词（第一个参数）和搜索列（第二个参数）通过不区分大小写的 `like` 查询添加到查询中。

```php
$pages = Db::table('posts')
    ->searchWhere('foo bar', ['title', 'content'])
    ->get();
```

上面的示例将生成以下 SQL，其中每个列和值都应用了 `lower()`：

```sql
select * from users where
    (title like '%foo%' and title like '%bar%') or
    (content like '%foo%' and content like '%bar%')
```

默认情况下，搜索词中的每个单词都会被搜索，但是您可以通过提供模式（第三个参数）来修改此行为，支持以下模式。

- **all**：结果必须包含所有单词（默认）
- **any**：结果可以包含任何单词
- **exact**：结果必须包含确切的短语

```php
$query->searchWhere('foo bar', ['title', 'content'], 'exact');
```

上面的 `exact` 搜索示例将生成以下 SQL：

```sql
select * from users where (title like '%foo bar%' or content like '%foo bar%')
```

## 复合 Where 子句

有时您可能需要创建更高级的 where 子句，例如 "where exists" 或嵌套参数分组。Laravel 查询构建器也可以处理这些。让我们先来看一个在括号内分组约束的示例：

```php
Db::table('users')
    ->where('name', '=', 'John')
    ->orWhere(function ($query) {
        $query->where('votes', '>', 100)
            ->where('title', '<>', 'Admin');
    })
    ->get();
```

如您所见，将 `Closure` 传递给 `orWhere` 方法会指示查询构建器开始一个约束组。`Closure` 将接收一个查询构建器实例，您可以使用它来设置应包含在括号组中的约束。上面的示例将生成以下 SQL：

```sql
select * from users where name = 'John' or (votes > 100 and title <> 'Admin')
```

### Exists 语句

`whereExists` 方法允许您编写 `where exist` SQL 子句。`whereExists` 方法接受一个 `Closure` 参数，该参数将接收一个查询构建器实例，允许您定义应放置在 "exists" 子句中的查询：

```php
Db::table('users')
    ->whereExists(function ($query) {
        $query->select(Db::raw(1))
            ->from('orders')
            ->whereRaw('orders.user_id = users.id');
    })
    ->get();
```

上面的查询将生成以下 SQL：

```sql
select * from users where exists (
    select 1 from orders where orders.user_id = users.id
)
```

### JSON Where 语句

October CMS 还支持在提供 JSON 列类型支持的数据库上查询 JSON 列类型。要查询 JSON 列，请使用 `->` 运算符。

```php
$users = Db::table('users')
    ->where('options->language', 'en')
    ->get();

$users = Db::table('users')
    ->where('preferences->dining->meal', 'salad')
    ->get();
```

您可以使用 `whereJsonContains` 来查询 JSON 数组（不支持 SQLite）。

```php
$users = Db::table('users')
    ->whereJsonContains('options->languages', 'en')
    ->get();
```

MySQL 和 PostgreSQL 支持 `whereJsonContains` 使用多个值。

```php
$users = Db::table('users')
    ->whereJsonContains('options->languages', ['en', 'de'])
    ->get();
```

您可以使用 `whereJsonLength` 按 JSON 数组的长度进行查询。

```php
$users = Db::table('users')
    ->whereJsonLength('options->languages', 0)
    ->get();

$users = Db::table('users')
    ->whereJsonLength('options->languages', '>', 1)
    ->get();
```

### 条件子句

有时您可能希望子句仅在其他条件为真时才应用于查询。例如，您可能只想在传入请求中存在给定输入值时才应用 `where` 语句。您可以使用 `when` 方法来实现：

```php
$role = $request->input('role');

$users = Db::table('users')
    ->when($role, function ($query, $role) {
        return $query->where('role_id', $role);
    })
    ->get();
```

`when` 方法仅在第一个参数为 `true` 时执行给定的 Closure。如果第一个参数为 `false`，则不会执行 Closure。

您可以将另一个 Closure 作为第三个参数传递给 `when` 方法。当第一个参数计算为 false 时，此 Closure 将执行。为了说明如何使用此功能，我们将使用它来配置查询的默认排序：

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

## 排序、分组、限制

### 排序

`orderBy` 方法允许您按给定列对查询结果进行排序。`orderBy` 方法的第一个参数应该是您希望排序的列，而第二个参数控制排序的方向，可以是 `asc` 或 `desc`。

```php
$users = Db::table('users')
    ->orderBy('name', 'desc')
    ->get();
```

`latest` 和 `oldest` 方法允许您轻松地按日期排序结果。默认情况下，结果将按 `created_at` 列排序。或者，您可以传递您希望排序的列名。

```php
$user = Db::table('users')
    ->latest()
    ->first();
```

`inRandomOrder` 方法可用于将查询结果随机排序。例如，您可以使用此方法获取一个随机用户。

```php
$randomUser = Db::table('users')
    ->inRandomOrder()
    ->first();
```

### 分组

`groupBy` 和 `having` 方法可用于对查询结果进行分组。`having` 方法的签名与 `where` 方法类似。

```php
$users = Db::table('users')
    ->groupBy('account_id')
    ->having('account_id', '>', 100)
    ->get();
```

您可以向 `groupBy` 方法传递多个参数以按多列分组。

```php
$users = Db::table('users')
    ->groupBy('first_name', 'status')
    ->having('account_id', '>', 100)
    ->get();
```

对于更高级的 `having` 语句，您可以使用 `havingRaw` 方法。

### 限制和偏移

要限制查询返回的结果数量，或跳过查询中给定数量的结果（`OFFSET`），您可以使用 `skip` 和 `take` 方法。

```php
$users = Db::table('users')->skip(10)->take(5)->get();
```

## 插入

查询构建器还提供了一个 `insert` 方法，用于向数据库表中插入记录。`insert` 方法接受一个列名和值的数组来插入：

```php
Db::table('users')->insert(
    ['email' => 'john@example.tld', 'votes' => 0]
);
```

您甚至可以通过传递一个数组的数组来一次调用 `insert` 向表中插入多条记录。每个数组代表要插入表中的一行：

```php
Db::table('users')->insert([
    ['email' => 'taylor@example.tld', 'votes' => 0],
    ['email' => 'dayle@example.tld', 'votes' => 0]
]);
```

### 自增 ID

如果表有自增 id，使用 `insertGetId` 方法插入记录然后获取 ID：

```php
$id = Db::table('users')->insertGetId(
    ['email' => 'john@example.tld', 'votes' => 0]
);
```

::: tip
使用 PostgreSQL 数据库驱动时，insertGetId 方法期望自增列名为 `id`。如果您想从不同的"序列"获取 ID，您可以将序列名称作为第二个参数传递给 `insertGetId` 方法。
:::

## 更新

除了向数据库插入记录外，查询构建器还可以使用 `update` 方法更新现有记录。`update` 方法与 `insert` 方法一样，接受一个列和值对的数组，包含要更新的列。您可以使用 `where` 子句来约束 `update` 查询。

```php
Db::table('users')
    ->where('id', 1)
    ->update(['votes' => 1]);
```

### 更新或插入

有时您可能想更新数据库中的现有记录，或者如果不存在匹配记录则创建它。在这种情况下，可以使用 `updateOrInsert` 方法。`updateOrInsert` 方法接受两个参数：一个用于查找记录的条件数组，以及一个包含要更新的列和值对的数组。

`updateOrInsert` 方法将首先尝试使用第一个参数的列和值对定位匹配的数据库记录。如果记录存在，它将使用第二个参数中的值进行更新。如果找不到记录，将使用两个参数的合并属性插入一条新记录。

```php
Db::table('users')
    ->updateOrInsert(
        ['email' => 'john@example.tld', 'name' => 'John'],
        ['votes' => '2']
    );
```

### Upsert

`upsert` 方法将插入不存在的行并使用新值更新已存在的行。该方法的第一个参数由要插入或更新的值组成，而第二个参数列出在关联表中唯一标识记录的列。该方法的第三个也是最后一个参数是一个列数组，如果数据库中已存在匹配记录，则应更新这些列。

```php
Db::table('flights')->upsert([
    ['departure' => 'Oakland', 'destination' => 'San Diego', 'price' => 99],
    ['departure' => 'Chicago', 'destination' => 'New York', 'price' => 150]
], ['departure', 'destination'], ['price']);
```

::: tip
除 SQL Server 外，所有数据库都要求 `upsert` 方法第二个参数中的列具有"主"索引或"唯一"索引。
:::

### 更新 JSON 列

更新 JSON 列时，您应该使用 `->` 语法来访问 JSON 对象中的相应键。此操作支持 MySQL 5.7+ 和 PostgreSQL 9.5+：

```php
$affected = Db::table('users')
    ->where('id', 1)
    ->update(['options->enabled' => true]);
```

### 递增 / 递减

查询构建器还提供了递增或递减给定列值的便捷方法。与手动编写 `update` 语句相比，这只是一个快捷方式，提供了更具表现力和简洁的接口。

这两种方法都至少接受一个参数：要修改的列。可以选择传递第二个参数来控制列应该递增/递减的量。

```php
Db::table('users')->increment('votes');

Db::table('users')->increment('votes', 5);

Db::table('users')->decrement('votes');

Db::table('users')->decrement('votes', 5);
```

您还可以在操作期间指定要更新的其他列：

```php
Db::table('users')->increment('votes', 1, ['name' => 'John']);
```

## 删除

查询构建器也可以通过 `delete` 方法从表中删除记录。

```php
Db::table('users')->delete();
```

您可以在调用 `delete` 方法之前添加 `where` 子句来约束 `delete` 语句。

```php
Db::table('users')->where('votes', '<', 100)->delete();
```

如果您希望截断整个表，这将删除所有行并将自增 ID 重置为零，您可以使用 `truncate` 方法。

```php
Db::table('users')->truncate();
```

## 悲观锁

查询构建器还包含一些函数来帮助您对 `select` 语句进行"悲观锁"。要使用"共享锁"运行语句，您可以在查询上使用 `sharedLock` 方法。共享锁防止所选行在您的事务提交之前被修改。

```php
Db::table('users')->where('votes', '>', 100)->sharedLock()->get();
```

或者，您可以使用 `lockForUpdate` 方法。"for update" 锁可防止行被修改或被另一个共享锁选择。

```php
Db::table('users')->where('votes', '>', 100)->lockForUpdate()->get();
```

## 缓存查询

您可以使用[缓存服务](../services/cache.md)轻松缓存查询结果。只需在准备查询时链接 `remember` 或 `rememberForever` 方法。

```php
$users = Db::table('users')->remember(10)->get();
```

在此示例中，查询结果将被缓存十分钟。在结果被缓存期间，查询不会针对数据库运行，结果将从应用程序指定的默认缓存驱动加载。

## 调试

您可以在构建查询时使用 `dd` 或 `dump` 方法来转储查询绑定和 SQL。`dd` 方法将显示调试信息然后停止执行请求。`dump` 方法将显示调试信息但允许请求继续执行：

```php
Db::table('users')->where('votes', '>', 100)->dd();

Db::table('users')->where('votes', '>', 100)->dump();
```

#### 另请参阅

::: also
* [Laravel Query Builder](https://laravel.com/docs/10.x/queries)
:::
