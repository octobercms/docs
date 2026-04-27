---
subtitle: Программно тестируйте и укрепляйте вашу бизнес-логику.
---
# Модульное тестирование

Тестовые случаи отдельных плагинов можно выполнять с помощью artisan-команды `plugin:test`, за которой следует код плагина. Например, следующая команда запустит тесты, найденные в директории **plugins/acme/demo**.

```bash
php artisan plugin:test acme.demo
```

::: tip
Если у вас установлен `phpunit` глобально, вы также можете вызвать его из директории плагина.
:::

## Создание тестов плагина

Первый шаг к тестированию плагинов — создание файла **phpunit.xml** в базовой директории плагина. Вот пример файла с именем **/plugins/acme/blog/phpunit.xml** для плагина `Acme.Blog`.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit
    backupGlobals="false"
    backupStaticAttributes="false"
    bootstrap="../../../modules/system/tests/bootstrap.php"
    colors="true"
    convertErrorsToExceptions="true"
    convertNoticesToExceptions="true"
    convertWarningsToExceptions="true"
    processIsolation="false"
    stopOnFailure="false"
>
    <testsuites>
        <testsuite name="Plugin Test Suite">
            <directory>./tests</directory>
            <exclude>./tests/browser</exclude>
        </testsuite>
    </testsuites>
    <php>
        <env name="APP_ENV" value="testing" />
        <env name="CACHE_DRIVER" value="array" />
        <env name="SESSION_DRIVER" value="array" />
        <env name="ACTIVE_THEME" value="test" />
        <env name="CONVERT_LINE_ENDINGS" value="true" />
        <env name="CMS_ROUTE_CACHE" value="true" />
        <env name="CMS_TWIG_CACHE" value="false" />
        <env name="ENABLE_CSRF" value="false" />
        <env name="DB_CONNECTION" value="sqlite" />
        <env name="DB_DATABASE" value=":memory:" />
    </php>
</phpunit>
```

## Создание тестового класса

Команда `create:test` генерирует тестовый класс. Первый аргумент указывает имя автора и плагина. Второй аргумент указывает имя тестового класса, которое должно заканчиваться на **Test**.

```bash
php artisan create:test Acme.Blog UserTest
```

Все тесты должны быть размещены в директории **tests**, которая используется для хранения тестовых классов. Имена классов должны использовать суффикс `Test`, а пространство имён для класса является необязательным. Тестовый класс должен наследовать базовый класс `PluginTestCase` — это специальный класс, который настраивает базу данных October CMS в памяти в рамках метода `setUp`.

```php
use Acme\Blog\Models\Post;

class PostTest extends PluginTestCase
{
    public function testCreateFirstPost()
    {
        $post = Post::create(['title' => 'Hi!']);
        $this->assertEquals(1, $post->id);
    }
}
```

## Регистрация и загрузка плагинов

В тестовой среде сам плагин и все его зависимости регистрируются и загружаются автоматически. Это обеспечивает более точный контроль над тестовой средой и предотвращает вмешательство других плагинов в систему, например при регистрации событий. Вы можете отключить автоматическую загрузку текущего плагина, установив свойство `autoRegister` в `false`.

```php
/**
 * @var bool autoRegister feature disabled for this test.
 */
protected $autoRegister = false;
```

Вы можете вручную зарегистрировать и загрузить плагин с помощью метода `loadPlugin`. В некоторых случаях вам также потребуется выполнить миграцию плагина вручную (см. ниже).

```php
public function setUp(): void
{
    parent::setUp();

    // Runs register() and boot() methods
    $this->loadPlugin('Acme.Blog');
}
```

Доступны следующие методы регистрации.

Имя метода | Назначение
------------- | -------------
**loadAllPlugins()** | Загружает все плагины, найденные в системе.
**loadCurrentPlugin()** | Загружает текущий плагин и его зависимости.
**loadPlugin($code)** | Загружает один плагин по его коду, например: `Acme.Blog`.
**loadPlugins($codes)** | Загружает несколько плагинов как массив кодов.

## Работа с базой данных

По умолчанию тесты плагинов автоматически выполняют миграции таблиц базы данных для модулей ядра, текущего плагина и его зависимостей. Это эквивалентно выполнению следующего перед каждым тестом.

```bash
php artisan october:migrate
php artisan plugin:refresh Acme.Blog
[php artisan plugin:refresh <dependency>, ...]
```

Вы можете отключить эту функцию, установив свойство `autoMigrate` в false в тестовом классе. Это применимо, когда тест не использует базу данных.

```php
class PostTest extends PluginTestCase
{
    /**
     * @var bool autoMigrate feature disabled for this test.
     */
    protected $autoMigrate = false;
}
```

Вы можете вручную выполнить миграцию плагинов с помощью метода `migratePlugin` при настройке теста. Метод `migrateModules` также может быть использован для создания системных таблиц.

```php
public function setUp(): void
{
    parent::setUp();

    // Migrate core modules
    $this->migrateModules();

    // Migrate the blog plugin
    $this->migratePlugin('Acme.Blog');
}
```

Доступны следующие методы миграции.

Имя метода | Назначение
------------- | -------------
**migrateDatabase()** | Выполняет миграцию всей базы данных, аналогично `october:migrate`.
**migrateModules()** | Выполняет миграцию только модулей ядра.
**migrateCurrentPlugin()** | Выполняет миграцию текущего плагина и его зависимостей.
**migratePlugin($code)** | Выполняет миграцию конкретного плагина по его коду, например: `Acme.Blog`.

### Изменение базы данных

По умолчанию модульные тесты используют SQLite в памяти для тестовой среды плагина. Вы можете изменить эту настройку в файле `phpunit.xml`. Значения здесь основаны на конфигурационном файле `/config/database.php`.

```xml
<env name="DB_CONNECTION" value="sqlite" />
<env name="DB_DATABASE" value=":memory:" />
```
