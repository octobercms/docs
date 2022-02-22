# 基本用法

连接到数据库和运行Select是一个简单的过程，可以使用原始 SQL、[查询生成器](../database/query.md) 或 [活动记录模型](../database/model.md) 来支持。管理数据库表和填充种子数据由[迁移和播种](../database/structure.md) 处理。

原始 SQL 和使用查询生成器将执行得更快，应该用于简单任务。 Active Record 是流行框架 Ruby On Rails 使用的一种方法。它允许一个简单的界面来执行重复性任务，例如创建、读取、更新和删除数据库记录。您可以了解更多关于 [Wikipedia 上的活动记录模式](http://en.wikipedia.org/wiki/Active_record_pattern)。

## 配置

应用程序的数据库配置位于 `config/database.php` 文件中。在此文件中，您可以定义所有数据库连接，并指定默认情况下应使用哪个连接。此文件中提供了所有受支持的数据库系统的示例。

### 读写分离

有时候你希望 SELECT 语句使用一个数据库连接，而 INSERT，UPDATE，和 DELETE 语句使用另一个数据库连接。在 Laravel 中，无论你是使用原生查询，查询构造器，或者是 Eloquent ORM，都能轻松的实现

为了弄明白读写分离是如何配置的，我们先来看个例子：

```php
'mysql' => [
    'read' => [
        'host' => '192.168.1.1',
    ],
    'write' => [
        'host' => '196.168.1.2'
    ],
    'driver'    => 'mysql',
    'database'  => 'database',
    'username'  => 'root',
    'password'  => '',
    'charset'   => 'utf8',
    'collation' => 'utf8_unicode_ci',
    'prefix'    => '',
],
```

注意在以上的例子中，配置数组中增加了三个键，分别是 `read`， `write` 和 `sticky`。 `read` 和 `write` 的键都包含一个键为 `host` 的数组。而 `read` 和 `write` 的其他数据库都在键为 `mysql` 的数组中。

如果你想重写主数组中的配置，只需要修改 `read` 和 `write` 数组即可。所以，这个例子中： `192.168.1.1`和`192.168.1.2` 将作为 「读」 连接主机，而 `192.168.1.3` 将作为 「写」 连接主机。这两个连接会共享 `mysql` 数组的各项配置，如数据库的凭据(用户名 / 密码)，前缀，字符编码等。

## 运行原生 SQL 查询

一旦配置好数据库连接后，便可以使用 `DB` facade 运行查询。 `DB` facade 为每种类型的查询提供了方法： `select`，`update`，`insert`，`delete` 和 `statement`。

#### 运行 Select 查询

你可以使用 `DB` 门面 的 `select` 方法来运行基础的查询语句：

```php
$users = Db::select('select * from users where active = ?', [1]);
```

传递给 `select` 方法的第一个参数就是一个原生的 SQL 查询，而第二个参数则是需要绑定到查询中的参数值。通常，这些值用于约束 `where` 语句。参数绑定用于防止 SQL 注入。

`select` 方法将始终返回一个数组，数组中的每个结果都是一个 `StdClass` 对象，可以像下面这样访问结果值：

```php
foreach ($users as $user) {
    echo $user->name;
}
```

#### 使用命名绑定

除了使用 `?` 表示参数绑定外，你也可以使用命名绑定来执行一个查询：

```php
$results = Db::select('select * from users where id = :id', ['id' => 1]);
```

#### 运行插入语句

可以使用 `DB` 门面 的 `insert` 方法来执行 `insert` 语句。与 `select` 一样，该方法将原生 SQL 查询作为其第一个参数，并将绑定数据作为第二个参数：

```php
Db::insert('insert into users (id, name) values (?, ?)', [1, 'Joe']);
```

#### 运行更新语句

`update` 方法用于更新数据库中现有的记录。该方法返回受该语句影响的行数：

```php
$affected = Db::update('update users set votes = 100 where name = ?', ['John']);
```

#### 运行删除语句

`delete` 方法用于从数据库中删除记录。与 `update` 一样，返回受该语句影响的行数：

```php
$deleted = Db::delete('delete from users');
```

#### 运行普通语句

有些数据库语句不会有任何返回值。对于这些语句，你可以使用 `DB` Facade 的 `statement` 方法来运行：

```php
Db::statement('drop table users');
```

## 使用多个数据库连接

当使用多个数据库连接时，你可以通过 `DB` Facade 的 `connection` 方法访问每一个连接。传递给 `connection`方法的参数 `name` 应该是 `config/database.php` 配置文件中 connections 数组中的一个值：

```php
$users = Db::connection('foo')->select(...);
```

你也可以使用一个连接实例上的 `getPdo` 方法访问底层的 PDO 实例：

```php
$pdo = Db::connection()->getPdo();
```

## 数据库事务

你可以使用 `DB` 门面的 `transaction` 方法在数据库事务中运行一组操作。如果事务的闭包 `Closure` 中出现一个异常，事务将会回滚。如果事务闭包 `Closure` 执行成功，事务将自动提交。一旦你使用了 `transaction` ， 就不再需要担心手动回滚或提交的问题：

```php
Db::transaction(function () {
    Db::table('users')->update(['votes' => 1]);

    Db::table('posts')->delete();
});
```

#### 手动使用事务

如果你想要手动开始一个事务，并且对回滚和提交能够完全控制，那么你可以使用 `DB` 门面的 `beginTransaction` 方法：

```php
Db::beginTransaction();
```

你可以使用 `rollBack` 方法回滚事务：

```php
Db::rollBack();
```

最后，你可以使用 `commit` 方法提交事务：

```php
Db::commit();
```

> **注意**：使用 `Db` 门面的事务方法还可以控制 [查询构建器](../database/query.md) 和 [模型查询](../database/model.md) 的事务。

## 数据库事件

如果你想监控程序执行的每一个 SQL 查询，你可以使用 `listen` 方法。这个方法对于记录查询或调试非常有用。

```php
Db::listen(function($sql, $bindings, $time) {
    //
});
```

就像 [事件注册](../services/events.md#where-to-register-listeners)一样，您可以在 [插件注册文件](../plugin/registration.md#registration-methods) 的 `boot` 方法中注册查询侦听器。 或者，可以在插件目录中提供一个名为 **init.php** 的文件，您可以使用它来放置此逻辑。

### 查询记录

启用查询日志记录后，会在内存中保存为当前请求运行的所有查询的日志。 调用 `enableQueryLog` 方法启用此功能。

```php
Db::connection()->enableQueryLog();
```

要获取已执行查询的数组，您可以使用 `getQueryLog` 方法：

```php
$queries = Db::getQueryLog();
```

但是，在某些情况下，例如在插入大量行时，这可能会导致应用程序使用过多的内存。 要禁用日志，您可以使用 `disableQueryLog` 方法：

```php
Db::connection()->disableQueryLog();
```

> **注意**：为了更快地调试，调用 `trace_sql` [助手函数](../services/error-log.md#helper-functions) 可能更有用。
