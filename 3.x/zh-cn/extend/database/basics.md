# 基本用法

连接数据库并运行查询是一个简单的过程，支持使用原始 SQL、[查询构建器](./query.md)或[活动记录模型](./model.md)。管理数据库表和填充种子数据由[迁移和种子填充流程](./structure.md)处理。

原始 SQL 和使用查询构建器执行更快，应该用于简单任务。活动记录是流行框架 Ruby On Rails 使用的一种方法。它为执行创建、读取、更新和删除数据库记录等重复任务提供了简单的接口。您可以在 [Wikipedia 上了解更多关于活动记录模式的信息](http://en.wikipedia.org/wiki/Active_record_pattern)。

## 运行原始 SQL 查询

配置好数据库连接后，您可以使用 `Db` 门面运行查询。`Db` 门面为每种类型的查询提供了方法：`select`、`update`、`insert`、`delete` 和 `statement`。

### 查询记录

要运行基本查询，请使用 `Db` 门面上的 `select` 方法。

```php
$users = Db::select('select * from users where active = ?', [1]);
```

传递给 `select` 方法的第一个参数是原始 SQL 查询，第二个参数是需要绑定到查询的任何参数绑定。通常，这些是 `where` 子句约束的值。参数绑定提供了针对 SQL 注入的保护。

`select` 方法将始终返回一个结果 `array`。数组中的每个结果将是一个 PHP `stdClass` 对象，允许您访问结果的值：

```php
foreach ($users as $user) {
    echo $user->name;
}
```

您可以使用命名绑定来执行查询，而不是使用 `?` 来表示您的参数绑定。

```php
$results = Db::select('select * from users where id = :id', ['id' => 1]);
```

如果数据库查询可能产生单个值，可以使用 `scalar` 方法获取。

```php
$count = Db::scalar('select count(*) as count from menu_items');
```

### 修改记录

要执行 `insert` 语句，您可以使用 `Db` 门面上的 `insert` 方法。与 `select` 一样，此方法将原始 SQL 查询作为第一个参数，将绑定作为第二个参数。

```php
Db::insert('insert into users (id, name) values (?, ?)', [1, 'Joe']);
```

`update` 方法应该用于更新数据库中的现有记录。该方法将返回受该语句影响的行数：

```php
$affected = Db::update('update users set votes = 100 where name = ?', ['John']);
```

`delete` 方法应该用于从数据库中删除记录。与 `update` 一样，将返回被删除的行数：

```php
$deleted = Db::delete('delete from users');
```

### 通用语句

某些数据库语句不应该返回任何值。对于这些类型的操作，您可以使用 `Db` 门面上的 `statement` 方法。

```php
Db::statement('drop table users');
```

## 多个数据库连接

当[使用多个连接](../../setup/database-config.md)时，您可以通过 `Db` 门面上的 `connection` 方法访问每个连接。传递给 `connection` 方法的 `name` 应该对应于 `config/database.php` 配置文件中列出的连接之一。

```php
$users = Db::connection('foo')->select(...);
```

您还可以使用连接实例上的 `getPdo` 方法访问原始的底层 PDO 实例。

```php
$pdo = Db::connection()->getPdo();
```

## 数据库事务

要在数据库事务中运行一组操作，您可以使用 `Db` 门面上的 `transaction` 方法。如果在事务 `Closure` 中抛出异常，事务将自动回滚。如果 `Closure` 成功执行，事务将自动提交。使用 `transaction` 方法时，您不需要担心手动回滚或提交。

```php
Db::transaction(function () {
    Db::table('users')->update(['votes' => 1]);

    Db::table('posts')->delete();
});
```

如果您想手动开始一个事务并完全控制回滚和提交，您可以使用 `Db` 门面上的 `beginTransaction` 方法：

```php
Db::beginTransaction();
```

您可以通过 `rollBack` 方法回滚事务：

```php
Db::rollBack();
```

最后，您可以通过 `commit` 方法提交事务：

```php
Db::commit();
```

::: tip
使用 `Db` 门面的事务方法还可以控制[查询构建器](./query.md)和[模型查询](./model.md)的事务。
:::

## 数据库事件

如果您希望接收应用程序执行的每个 SQL 查询，您可以使用 `listen` 方法。此方法对于记录查询或调试非常有用。

```php
Db::listen(function($sql, $bindings, $time) {
    //
});
```

您可以在[插件注册文件](../extending.md)的 `boot` 方法中注册您的查询监听器。或者，插件可以在插件目录中提供一个名为 **init.php** 的文件，您可以在其中放置此逻辑。

### 查询日志

启用查询日志时，内存中会保留当前请求已运行的所有查询的日志。调用 `enableQueryLog` 方法启用此功能。

```php
Db::connection()->enableQueryLog();
```

要获取已执行查询的数组，您可以使用 `getQueryLog` 方法：

```php
$queries = Db::getQueryLog();
```

但是，在某些情况下，例如插入大量行时，这可能导致应用程序使用过多内存。要禁用日志，您可以使用 `disableQueryLog` 方法：

```php
Db::connection()->disableQueryLog();
```

::: tip
对于更快速的调试，调用 `trace_sql` [辅助函数](../services/log.md)可能更有用。
:::
