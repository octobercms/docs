# 缓存

## 配置

October 为各种缓存系统提供了统一的 API，缓存配置位于`config/cache.php`。在此文件中，您可以指定您希望在整个应用程序中默认使用的缓存驱动程序。系统为您准备了[Memcached](http://memcached.org) 和 [Redis](https://redis.io) 等流行的缓存系统。

缓存配置文件还包含文件中记录的各种其他选项，因此请务必阅读这些选项。默认情况下，October CMS 配置使用`file`缓存驱动程序，该驱动程序将序列化的缓存对象存储在文件系统中。对于较大的应用程序，建议您使用内存缓存，例如 Memcached 或 APC。您甚至可以为同一个驱动程序配置多个缓存配置。

### 缓存条件

#### 数据库

`database` 缓存驱动使用数据库代替文件系统。使用此类型不需要其他配置，因为数据库结构已经可用。

#### 内存缓存

使用 Memcached 缓存需要安装 [Memcached PECL 包](http://pecl.php.net/package/memcached)。

默认配置使用基于 [Memcached::addServer](http://php.net/manual/en/memcached.addserver.php) 的 TCP/IP：

```php
'memcached' => [
    [
        'host' => '127.0.0.1',
        'port' => 11211,
        'weight' => 100
    ],
],
```

您还可以将 `host` 选项设置为 UNIX 套接字路径。 如果你这样做，`port` 选项应该设置为 `0`：

```php
'memcached' => [
    [
        'host' => '/var/run/memcached/memcached.sock',
        'port' => 0,
        'weight' => 100
    ],
],
```

#### Redis

> 需要安装[驱动插件](https://octobercms.com/plugin/october-drivers)才能使用Redis缓存驱动。

应用程序的 Redis 配置位于 `config/database.php` 配置文件中。 在此文件中，您将看到一个 `redis` 数组，其中包含您的应用程序使用的 Redis 服务器：

```php
'redis' => [

    'cluster' => false,

    'default' => [
        'host'     => '127.0.0.1',
        'port'     => 6379,
        'database' => 0,
    ],

],
```

您可以在 Redis 连接定义中定义一个 `options` 数组值，允许您指定一组 Predis [客户端选项](https://github.com/nrk/predis/wiki/Client-Options)。

如果您的 Redis 服务器需要身份验证，您可以通过将 `password`配置项添加到 Redis 服务器配置数组来提供密码。

## 缓存使用

虽然大多数缓存在October内部处理，但 `Cache` 门面提供了一些简单的方法来缓存您自己的数据。

### 从缓存中检索项目

`Cache` 门面上的 `get` 方法用于从缓存中检索项目。 如果缓存中不存在该项目，则将返回 `null`。 如果您愿意，您可以将第二个参数传递给 `get` 方法，指定您希望在项目不存在时返回的自定义默认值：

```php
$value = Cache::get('key');

$value = Cache::get('key', 'default');
```

你甚至可以传递一个 `Closure` 作为默认值。 如果指定的项在缓存中不存在，则返回 `Closure` 的结果。 传递闭包允许您延迟从数据库或其他外部服务中检索默认值：

```php
$value = Cache::get('key', function() {
    return Db::table(...)->get();
});
```

#### 检查项目是否存在

`has` 方法可用于确定缓存中是否存在项目：

```php
if (Cache::has('key')) {
    //
}
```

#### 递增/递减值

`increment` 和 `decrement` 方法可用于调整缓存中整数项的值。 这两种方法都可以选择接受第二个参数，指示增加或减少项目值的数量：

```php
Cache::increment('key');

Cache::increment('key', $amount);

Cache::decrement('key');

Cache::decrement('key', $amount);
```

#### 检索或更新

有时您可能希望从缓存中检索一个项目，但如果请求的项目不存在，也存储一个默认值。 例如，您可能希望从缓存中检索所有用户，或者如果它们不存在，则从数据库中检索它们并将它们添加到缓存中。 您可以使用 `Cache::remember` 方法执行此操作：

```php
$value = Cache::remember('users', $seconds, function() {
    return Db::table('users')->get();
});
```

如果缓存中不存在该项，则将执行传递给 `remember` 方法的 `Closure`，并将其结果放入缓存中。

您还可以结合使用 `remember` 和 `forever` 方法：

```php
$value = Cache::rememberForever('users', function() {
    return Db::table('users')->get();
});
```

#### 检索和删除

如果您需要从缓存中检索一个项目然后删除它，您可以使用 `pull` 方法。 与 `get` 方法一样，如果缓存中不存在该项，则将返回 `null`：

```php
$value = Cache::pull('key');
```

### 在缓存中存储项目

您可以使用 `Cache` 门面上的 `put` 方法将项目存储在缓存中。 当您将项目放入缓存中时，您需要指定应缓存该值的秒数：

```php
Cache::put('key', 'value', $seconds);
```

除了传递项目过期之前的秒数之外，您还可以传递一个 PHP `DateTime` 实例来表示缓存项目的过期时间：

```php
$expiresAt = Carbon::now()->addMinutes(10);

Cache::put('key', 'value', $expiresAt);
```

> **注意**：我们建议使用 `DateTime` 实例来定义所有到期长度，以确保与October CMS的未来版本兼容。

`add` 方法只会将缓存存储中不存在的项目添加到缓存中。 如果项目实际添加到缓存中，该方法将返回`true`。 否则该方法将返回 `false`：

```php
Cache::add('key', 'value', $seconds);
```

`forever` 方法可用于将项目永久存储在缓存中。 这些值必须使用 `forget` 方法从缓存中手动删除：

```php
Cache::forever('key', 'value');
```

### 从缓存中删除项目

您可以使用 `Cache` 门面上的 `forget` 方法从缓存中删除项目：

```php
Cache::forget('key');
```

您可以使用 `flush` 方法清除整个缓存：

```php
Cache::flush();
```

刷新缓存**不考虑**缓存前缀，将从缓存中删除所有条目。 在清除由其他应用程序共享的缓存时，请仔细考虑这一点。
