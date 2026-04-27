# 缓存

## 配置

October CMS 为各种缓存系统提供了统一的 API，缓存配置位于 `config/cache.php`。在此文件中，你可以指定整个应用程序默认使用的缓存驱动程序。流行的缓存系统如 [Memcached](http://memcached.org) 和 [Redis](https://redis.io) 均开箱即用。

缓存配置文件还包含各种其他选项，这些选项在文件中均有文档说明，请务必仔细阅读这些选项。默认情况下，October CMS 配置为使用 `file` 缓存驱动程序，该驱动程序将序列化的缓存对象存储在文件系统中。对于较大的应用程序，建议使用内存缓存，如 Memcached 或 APC。你甚至可以为同一个驱动程序配置多个缓存配置。

### 缓存先决条件

#### 数据库

`database` 缓存驱动程序使用数据库代替文件系统。使用此类型不需要其他配置，因为数据库结构已经可用。

#### Memcached

使用 Memcached 缓存需要安装 [Memcached PECL 扩展包](http://pecl.php.net/package/memcached)。默认配置使用基于 [Memcached::addServer](http://php.net/manual/en/memcached.addserver.php) 的 TCP/IP。

```php
'memcached' => [
    'servers' => [
        [
            'host' => env('MEMCACHED_HOST', '127.0.0.1'),
            'port' => env('MEMCACHED_PORT', 11211),
            'weight' => 100,
        ],
    ],
],
```

你也可以将 `host` 选项设置为 UNIX socket 路径。如果这样做，`port` 选项应设置为 `0`。

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

::: tip
在 Laravel 中使用 Redis 缓存之前，你需要通过 PECL 安装 PhpRedis PHP 扩展，或通过 Composer 安装 `predis/predis` 包（~1.0）。
:::

应用程序的 Redis 配置位于 `config/database.php` 配置文件中。在此文件中，你会看到一个 `redis` 数组，其中包含应用程序使用的 Redis 服务器信息：

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

你可以在 Redis 连接定义中定义一个 `options` 数组值，以指定一组 Predis [客户端选项](https://github.com/nrk/predis/wiki/Client-Options)。

如果你的 Redis 服务器需要身份验证，可以通过在 Redis 服务器配置数组中添加 `password` 配置项来提供密码。

#### DynamoDB

在使用 DynamoDB 缓存驱动程序之前，你应该创建一个 DynamoDB 缓存表来存储所有缓存数据，通常命名为 `cache`。你可以根据应用程序 `cache` 配置文件中 `stores.dynamodb.table` 配置值来为表命名。

```php
'dynamodb' => [
    'table' => env('DYNAMODB_CACHE_TABLE', 'cache'),
],
```

此表还应有一个字符串分区键，其名称应与应用程序缓存配置文件中 `stores.dynamodb.attributes.key` 配置项的值对应。默认情况下，分区键应命名为 `key`。

## 缓存用法

虽然大多数缓存由 October 内部处理，但 `Cache` 门面提供了一些简单的方法用于缓存你自己的数据。

### 从缓存中获取项目

`Cache` 门面上的 `get` 方法用于从缓存中获取项目。如果该项目在缓存中不存在，将返回 `null`。如果你愿意，可以将第二个参数传递给 `get` 方法，指定当项目不存在时要返回的自定义默认值：

```php
$value = Cache::get('key');

$value = Cache::get('key', 'default');
```

你甚至可以将 `Closure` 作为默认值传递。如果指定的项目在缓存中不存在，将返回 `Closure` 的结果。传递闭包允许你延迟从数据库或其他外部服务获取默认值：

```php
$value = Cache::get('key', function() {
    return Db::table(...)->get();
});
```

#### 检查项目是否存在

`has` 方法可用于确定缓存中是否存在某个项目：

```php
if (Cache::has('key')) {
    //
}
```

#### 递增 / 递减值

`increment` 和 `decrement` 方法可用于调整缓存中整数项目的值。这两个方法都可以选择接受第二个参数，指示递增或递减项目值的数量：

```php
Cache::increment('key');

Cache::increment('key', $amount);

Cache::decrement('key');

Cache::decrement('key', $amount);
```

#### 获取或更新

有时你可能希望从缓存中获取一个项目，同时在请求的项目不存在时存储一个默认值。例如，你可能希望从缓存中获取所有用户，或者如果它们不存在，则从数据库中获取并添加到缓存中。你可以使用 `Cache::remember` 方法来实现：

```php
$value = Cache::remember('users', $seconds, function() {
    return Db::table('users')->get();
});
```

如果该项目在缓存中不存在，传递给 `remember` 方法的 `Closure` 将被执行，其结果将被放入缓存中。

你还可以结合使用 `remember` 和 `forever` 方法：

```php
$value = Cache::rememberForever('users', function() {
    return Db::table('users')->get();
});
```

#### 获取并删除

如果你需要从缓存中获取一个项目然后将其删除，可以使用 `pull` 方法。与 `get` 方法类似，如果该项目在缓存中不存在，将返回 `null`：

```php
$value = Cache::pull('key');
```

### 向缓存中存储项目

你可以使用 `Cache` 门面上的 `put` 方法将项目存储到缓存中。当你将项目放入缓存时，需要指定该值应被缓存的秒数：

```php
Cache::put('key', 'value', $seconds);
```

除了传递过期秒数外，你还可以传递一个 PHP `DateTime` 实例来表示缓存项目的过期时间：

```php
$expiresAt = Carbon::now()->addMinutes(10);

Cache::put('key', 'value', $expiresAt);
```

> **注意**：我们建议使用 `DateTime` 实例来定义所有过期时间，以确保与 October CMS 未来版本的兼容性。

`add` 方法仅在缓存存储中不存在该项目时才将其添加到缓存中。如果该项目实际被添加到缓存中，该方法将返回 `true`。否则，该方法将返回 `false`：

```php
Cache::add('key', 'value', $seconds);
```

`forever` 方法可用于将项目永久存储在缓存中。这些值必须使用 `forget` 方法手动从缓存中移除：

```php
Cache::forever('key', 'value');
```

### 从缓存中移除项目

你可以使用 `Cache` 门面上的 `forget` 方法从缓存中移除项目：

```php
Cache::forget('key');
```

你可以使用 `flush` 方法清空整个缓存：

```php
Cache::flush();
```

清空缓存**不会**遵循缓存前缀，将删除缓存中的所有条目。如果缓存被其他应用程序共享，请谨慎考虑。
