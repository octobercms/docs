---
previousPath: extend/services/cache.md
subtitle: Cache your own data so slow queries and computed values are reused across requests.
---
# Cache

October CMS handles most caching internally. Use the `Cache` facade to cache your own data, such as the result of a database query.

```php
$value = Cache::remember('users', $seconds, function() {
    return Db::table('users')->get();
});
```

## Retrieving Items from the Cache

The `get` method on the `Cache` facade retrieves items from the cache. If the item does not exist in the cache, `null` is returned. You can pass a second argument to the `get` method with a default value to return if the item does not exist.

```php
$value = Cache::get('key');

$value = Cache::get('key', 'default');
```

You can also pass a `Closure` as the default value. The result of the `Closure` is returned if the item does not exist in the cache. A Closure lets you defer fetching the default value from a database or other external service.

```php
$value = Cache::get('key', function() {
    return Db::table(...)->get();
});
```

#### Checking for Item Existence

The `has` method checks if an item exists in the cache.

```php
if (Cache::has('key')) {
    //
}
```

#### Incrementing / Decrementing Values

The `increment` and `decrement` methods adjust the value of integer items in the cache. Both methods accept an optional second argument with the amount to increment or decrement the value by.

```php
Cache::increment('key');

Cache::increment('key', $amount);

Cache::decrement('key');

Cache::decrement('key', $amount);
```

#### Retrieve or Update

Sometimes you want to retrieve an item from the cache, and store a default value if the item does not exist. For example, you can retrieve all users from the cache or, if they are not cached, retrieve them from the database and add them to the cache. Use the `Cache::remember` method for this.

```php
$value = Cache::remember('users', $seconds, function() {
    return Db::table('users')->get();
});
```

If the item does not exist in the cache, the `Closure` passed to the `remember` method runs and its result is placed in the cache.

The `rememberForever` method combines `remember` and `forever`.

```php
$value = Cache::rememberForever('users', function() {
    return Db::table('users')->get();
});
```

#### Retrieve and Delete

To retrieve an item from the cache and then delete it, use the `pull` method. Like the `get` method, it returns `null` if the item does not exist in the cache.

```php
$value = Cache::pull('key');
```

## Storing Items in the Cache

Use the `put` method on the `Cache` facade to store items in the cache. When you store an item, specify the number of seconds to cache the value for.

```php
Cache::put('key', 'value', $seconds);
```

Instead of the number of seconds, you can also pass a PHP `DateTime` instance with the expiration time of the cached item.

```php
$expiresAt = Carbon::now()->addMinutes(10);

Cache::put('key', 'value', $expiresAt);
```

::: tip
We recommend using `DateTime` instances for all expiry lengths, to ensure compatibility with future versions of October CMS.
:::

The `add` method only adds the item to the cache if it does not already exist in the cache store. It returns `true` if the item is added to the cache, otherwise it returns `false`.

```php
Cache::add('key', 'value', $seconds);
```

The `forever` method stores an item in the cache permanently. You must remove these values manually with the `forget` method.

```php
Cache::forever('key', 'value');
```

## Removing Items from the Cache

Remove items from the cache with the `forget` method on the `Cache` facade.

```php
Cache::forget('key');
```

Clear the entire cache with the `flush` method.

```php
Cache::flush();
```

::: warning
Flushing the cache **does not** respect the cache prefix and removes all entries from the cache. Consider this carefully when clearing a cache that is shared with other applications.
:::

## Configuring the Cache

October CMS provides a single API for various caching systems. The cache configuration is located at **config/cache.php**, where you can set the cache driver your application uses by default. Popular caching systems like [Memcached](http://memcached.org) and [Redis](https://redis.io) are supported out of the box.

The cache configuration file also contains other options, which are documented in the file, so make sure to read them. By default, October CMS uses the `file` cache driver, which stores the serialized, cached objects in the filesystem. For larger applications, we recommend an in-memory cache such as Memcached or APC. You can even configure multiple cache configurations for the same driver.

### Driver Prerequisites

#### Database

The `database` cache driver uses the database instead of the file system. It needs no other configuration, since the database structure is already available.

#### Memcached

The Memcached cache requires the [Memcached PECL package](http://pecl.php.net/package/memcached). The default configuration uses TCP/IP based on [Memcached::addServer](http://php.net/manual/en/memcached.addserver.php).

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

You can also set the `host` option to a UNIX socket path. If you do, set the `port` option to `0`.

```php
'memcached' => [
    'servers' => [
        [
            'host' => '/var/run/memcached/memcached.sock',
            'port' => 0,
            'weight' => 100
        ],
    ],
],
```

#### Redis

::: tip
Before using a Redis cache with October CMS, install either the PhpRedis PHP extension via PECL or the `predis/predis` package (`^2.3|^3.0`) via Composer.
:::

The Redis configuration for your application is located in the **config/database.php** configuration file. In this file, the `redis` array contains the Redis servers used by your application.

```php
'redis' => [

    'client' => env('REDIS_CLIENT', 'phpredis'),

    'default' => [
        'host'     => '127.0.0.1',
        'port'     => 6379,
        'database' => 0,
    ],

],
```

You can define an `options` array value in your Redis connection definition to specify a set of Predis [client options](https://github.com/nrk/predis/wiki/Client-Options).

If your Redis server requires authentication, supply a password by adding a `password` configuration item to your Redis server configuration array.

#### DynamoDB

Before using the DynamoDB cache driver, create a DynamoDB table to store the cached data. The table is usually named `cache`, but you can use any name, as set by the `stores.dynamodb.table` configuration value in your application's `cache` configuration file.

```php
'dynamodb' => [
    'table' => env('DYNAMODB_CACHE_TABLE', 'cache'),
],
```

The table also needs a string partition key with a name that matches the `stores.dynamodb.attributes.key` configuration item in your application's cache configuration file. By default, the partition key should be named `key`.

#### See Also

::: also
* [Query Builder](../data/query-builder.md)
* [Laravel Cache](https://laravel.com/docs/12.x/cache)
:::
