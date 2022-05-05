# Кэш

<a name="configuration" class="anchor"></a>
## Настройка

Октябрь предоставляет унифицированное API для различных систем кэширования. Настройки кэша содержатся в файле `config/cache.php`. Там же Вы можете указать драйвер, который будет использоваться для кэширования. Многие популярные системы, такие как [Memcached](http://memcached.org) и [Redis](https://redis.io) поддерживатся "из коробки".

Файл с настройками также содержит множество других параметров, которые в нём же документированы, поэтому обязательно ознакомьтесь с ними. По умолчанию OctoberCMS настроен для использования драйвера `file`, который хранит упакованные объекты кэша в файловой системе. Для больших приложений рекомендуется использование систем кэширования в памяти - таких как Memcached или APC.

### Требования

#### База данных

Драйвер кэша `database` использует базу данных вместо файловой системы. Структура базы данных уже создана, поэтому для его использования Вам больше не нужно ничего настраивать.

#### Memcached

Вам нужно установить и настроить [Memcached PECL package](http://pecl.php.net/package/memcached) для того, чтобы испльзовать Memcached.

Конфигурация по умолчанию использует TCP/IP на основе [Memcached::addServer](http://php.net/manual/en/memcached.addserver.php):

    'memcached' => [
        [
            'host' => '127.0.0.1',
            'port' => 11211,
            'weight' => 100
        ],
    ],

Вы также можете указать параметр `host`. Тогда параметр `port` должен быть равен `0`:

    'memcached' => [
        [
            'host' => '/var/run/memcached/memcached.sock',
            'port' => 0,
            'weight' => 100
        ],
    ],

#### Redis

> Вы должны установить [Drivers plugin](http://octobercms.com/plugin/october-drivers) перед тем, как использовать драйвер Redis.

Файл с настройками находится в `config/database.php`. Внутри этого файла вы увидите массив `redis`, содержащий серверы Redis, используемые вашим приложением:

    'redis' => [

        'cluster' => false,

        'default' => [
            'host'     => '127.0.0.1',
            'port'     => 6379,
            'database' => 0,
        ],

    ],

Вы можете определить массив `options`, чтобы указать набор Predis [client options](https://github.com/nrk/predis/wiki/Client-Options).

Если Ваш сервер Redis требует аутентификацию, то Вы можете добавить параметр `password` в файл с настройками.

<a name="cache-usage" class="anchor"></a>
## Использование кэша

В то время как бОльшая часть логики кэширования скрыта внутри Октября, фасад `Cache` предоставляет некоторые простые методы для кэширования ваших собственных данных.

<a name="retrieving-items-from-the-cache" class="anchor"></a>
### Получение элементов из кэша

Метод `get` фасада `Cache` используется для получения элементов из кэша. Если элемент не существует, то метод вернет `null`. Второй аргумент указывает значение по умолчанию:

    $value = Cache::get('key');

    $value = Cache::get('key', 'default');

Вы даже можете передать значение `Closure` в качестве значения по умолчанию. Результат `Closure` будет возвращен, если в кеше указанный элемент не существует:

    $value = Cache::get('key', function() {
        return Db::table(...)->get();
    });

#### Проверка существования элемента в кэше

    if (Cache::has('key')) {
        //
    }

#### Увеличение / Уменьшение значений

Увеличение числового значения:

    Cache::increment('key');

    Cache::increment('key', $amount);

Уменьшение числового значения:

    Cache::decrement('key');

    Cache::decrement('key', $amount);

#### Retrieve or update

Иногда Вам может быть нужно получить элемент из кэша или сохранить его там, если он не существует. Вы можете сделать это методом `Cache::remember`:

    $value = Cache::remember('users', $minutes, function() {
        return Db::table('users')->get();
    });

Вы также можете совместить методы `remember` и `forever`:

    $value = Cache::rememberForever('users', function() {
        return Db::table('users')->get();
    });

#### Retrieve and delete

Если Вы хотите получить элемент из кэша и затем удалить его, вы можете воспользоваться методом `pull`:

    $value = Cache::pull('key');

<a name="storing-items-in-the-cache" class="anchor"></a>
### Запись элементов в кэш

Запись нового элемента в кэш

    Cache::put('key', 'value', $minutes);

Использование объекта Carbon для установки времени жизни кэша

    $expiresAt = Carbon::now()->addMinutes(10);

    Cache::put('key', 'value', $expiresAt);

Метод `add`  возвращает `true`, если производится запись элемента в кэш. Иначе, если элемент уже есть в кэше, возвращается `false`:

    Cache::add('key', 'value', $minutes);

Запись элемента на постоянное хранение

    Cache::forever('key', 'value');

<a name="removing-items-from-the-cache" class="anchor"></a>
### Удаление элементов из кэша

Удаление элемента из кэша

    Cache::forget('key');

Используйте метод `flush`, чтобы удалить все элеменеты из кэша:

    Cache::flush();
