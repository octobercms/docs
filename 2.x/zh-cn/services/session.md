# Session

## 配置

由于 HTTP 驱动的应用程序是无状态的，Session提供了一种跨请求存储用户信息的方法。 October 附带了各种Session后端，可通过一个干净、统一的 API 使用。 对流行后端的支持，例如 [Memcached](http://memcached.org)、[Redis](http://redis.io)，以及直接可用的数据库。

Session配置存储在 `config/session.php` 中。 请务必查看此文件中提供给您的有据可查的选项。 默认情况下，October 配置为使用 `file` Session驱动程序，该驱动程序适用于大多数应用程序。

- `file` - Session存储在 `storage/framework/sessions` 中。
- `cookie` - Session存储在安全、加密的 cookie 中。
- `database` - Session存储在应用程序使用的数据库中。
- `memcached` / `redis` - Session存储在这些基于缓存的快速存储之一中。
- `array` - Session存储在一个简单的 PHP 数组中，不会跨请求持久化。

> **注意**：数组驱动程序通常用于运行单元测试以防止Session数据持久化。

#### 保留的密钥

October CMS 在内部使用 `flash` Session密钥，因此您不应使用该名称向Session添加项目。

## Session使用

#### 在Session中存储数据

使用 `Session` 门面，您可以调用各种函数来与底层数据进行交互。 例如，`put` 方法在Session中存储了一条新数据：

```php
Session::put('key', 'value');
```

#### 推送到数组Session值

`push` 方法可用于将新值推送到作为数组的Session值上。 例如，如果 `user.teams` 键包含团队名称数组，您可以将新值推送到数组中，如下所示：

```php
Session::push('user.teams', 'developers');
```

#### 从Session中检索数据

当您从Session中检索值时，您还可以将默认值作为第二个参数传递给 `get` 方法。 如果Session中不存在指定的键，将返回此默认值。 如果将 `Closure` 作为默认值传递给 `get` 方法，则 `Closure` 将被执行并返回其结果：

```php
$value = Session::get('key');

$value = Session::get('key', 'default');

$value = Session::get('key', function() { return 'default'; });
```

#### 从Session中检索所有数据

如果您想从Session中检索所有数据，您可以使用 `all` 方法：

```php
$data = Session::all();
```

#### 检索数据并释放

`pull` 方法将从Session中检索和删除项目：

```php
$value = Session::pull('key', 'default');
```

#### 确定Session中是否存在项目

`has` 方法可用于检查Session中是否存在项目。 如果项目存在，此方法将返回 `true`：

```php
if (Session::has('users')) {
    //
}
```

#### 从Session中删除数据

`forget` 方法将从Session中删除一条数据。 如果您想从Session中删除所有数据，可以使用 `flush` 方法：

```php
Session::forget('key');

Session::flush();
```

#### 重新生成Session ID

如果需要重新生成Session ID，可以使用 `regenerate` 方法：

```php
Session::regenerate();
```

## 闪存数据

有时您可能希望将项目存储在Session中仅用于下一个请求。 您可以使用 `Session::flash` 方法来执行此操作。 使用此方法存储在Session中的数据将仅在后续 HTTP 请求期间可用，然后将被删除。 闪存数据主要用于短暂的状态消息：

```php
Session::flash('key', 'value');
```

如果您需要为更多请求保留闪存数据，您可以使用 `reflash` 方法，该方法将保留所有闪存数据以用于其他请求。 如果您只需要保留特定的闪存数据，您可以使用 `keep` 方法：

```php
Session::reflash();

Session::keep(['username', 'email']);
```
