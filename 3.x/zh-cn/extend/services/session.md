# 会话

由于 HTTP 驱动的应用程序是无状态的，会话提供了一种跨请求存储用户信息的方式。October CMS 提供了多种会话接口，可通过统一的 API 使用。支持 [Memcached](http://memcached.org)、[Redis](https://redis.io) 和数据库等流行服务，开箱即用。

## 配置

会话配置存储在 `config/session.php` 中。请务必查看此文件中记录的可用选项。

- `file` - 会话存储在 `storage/framework/sessions` 中。
- `cookie` - 会话存储在安全的加密 cookie 中。
- `database` - 会话存储在应用程序使用的数据库中。
- `memcached` / `redis` - 会话存储在这些快速的基于缓存的存储中。
- `array` - 会话存储在简单的 PHP 数组中，不会跨请求持久化。

默认情况下，October CMS 配置为使用 `file` 会话驱动程序，这对大多数应用程序都适用。`array` 驱动程序通常用于运行单元测试以防止会话数据持久化。

## 存储数据

使用 `Session` 门面，你可以调用各种函数来与底层数据交互。例如，`put` 方法在会话中存储一段新数据。

```php
Session::put('key', 'value');
```

::: warning
October CMS 内部使用 `flash` 会话键，因此你应避免将其用作键名。
:::

`push` 方法可用于将新值推送到作为数组的会话值。例如，如果 `user.teams` 键包含一个团队名称数组，你可以像这样向数组推送新值：

```php
Session::push('user.teams', 'developers');
```

## 获取数据

从会话中获取值时，你也可以将默认值作为第二个参数传递给 `get` 方法。如果指定的键在会话中不存在，将返回此默认值。如果将 `Closure` 作为默认值传递给 `get` 方法，`Closure` 将被执行并返回其结果。

```php
$value = Session::get('key');

$value = Session::get('key', 'default');

$value = Session::get('key', function() { return 'default'; });
```

如果你想从会话中获取所有数据，可以使用 `all` 方法。

```php
$data = Session::all();
```

`has` 方法可用于检查项目是否存在于会话中。如果项目存在，此方法将返回 `true`。

```php
if (Session::has('users')) {
    //
}
```

## 删除数据

`pull` 方法将从会话中获取并删除一个项目。

```php
$value = Session::pull('key', 'default');
```

`forget` 方法将从会话中移除一段数据。如果你想从会话中移除所有数据，可以使用 `flush` 方法。

```php
Session::forget('key');

Session::flush();
```

## 重新生成会话

如果你需要重新生成会话 ID，可以使用 `regenerate` 方法。

```php
Session::regenerate();
```

要重新生成会话 ID 并在单个语句中从会话中移除所有数据，可以使用 `invalidate` 方法。

```php
Session::invalidate();
```

## 闪存数据

有时你可能希望仅在下一次请求中将项目存储在会话中。你可以使用 `Session::flash` 方法来实现。使用此方法存储在会话中的数据仅在后续的 HTTP 请求期间可用，然后将被删除。闪存数据主要用于短期状态消息。

```php
Session::flash('key', 'value');
```

如果你需要将闪存数据保留更多请求，可以使用 `reflash` 方法，它将保留所有闪存数据以供额外的请求使用。如果你只需要保留特定的闪存数据，可以使用 `keep` 方法。

```php
Session::reflash();

Session::keep(['username', 'email']);
```

#### 参见

::: also
* [Laravel HTTP Session](https://laravel.com/docs/10.x/session)
:::
