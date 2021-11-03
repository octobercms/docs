# Юнит тесты

<a href="#testing-plugins" name="testing-plugins" class="anchor"></a>
## Тестирование плагинов

Вы можете выполнить юнит тесты, запустив `phpunit` из каталога с плагином.

### Создание тестов

Вы можете протестировать плагины, создав файл `phpunit.xml` в папке с плагином. Пример содержимого файла **/plugins/acme/blog/phpunit.xml**:

    <?xml version="1.0" encoding="UTF-8"?>
    <phpunit backupGlobals="false"
             backupStaticAttributes="false"
             bootstrap="../../../tests/bootstrap.php"
             colors="true"
             convertErrorsToExceptions="true"
             convertNoticesToExceptions="true"
             convertWarningsToExceptions="true"
             processIsolation="false"
             stopOnFailure="false"
             syntaxCheck="false"
    >
        <testsuites>
            <testsuite name="Plugin Unit Test Suite">
                <directory>./tests</directory>
            </testsuite>
        </testsuites>
        <php>
            <env name="APP_ENV" value="testing"/>
            <env name="CACHE_DRIVER" value="array"/>
            <env name="SESSION_DRIVER" value="array"/>
        </php>
    </phpunit>

Вы можете создать папку **tests/** с тестовыми классами. Пример:

    <?php namespace Acme\Blog\Tests\Models;

    use Acme\Blog\Models\Post;
    use PluginTestCase;

    class PostTest extends PluginTestCase
    {
        public function testCreateFirstPost()
        {
            $post = Post::create(['title' => 'Hi!']);
            $this->assertEquals(1, $post->id);
        }
    }

Тестовые классы должны расширять класс `PluginTestCase`, который обновляет БД OctoberCMS, тестируемый плагин и его зависимости при запуске теста. Это эквивалентно выполнению следующих действий перед каждым тестом:

    php artisan october:up
    php artisan plugin:refresh Acme.Blog
    [php artisan plugin:refresh <dependency>, ...]

<a href="#testing-system" name="testing-system" class="anchor"></a>
## Тестирование системы

Вы должны загрузить копию для разработки, используя composer, или клонировать git-репозиторий, чтобы иметь возможность протестировать ядро OctoberCMS. Это обеспечит наличие каталога `tests/`.

### Юнит тесты

Юнит тесты могут быть выполнены путем запуска `phpunit` в корневом каталоге или внутри `/tests/unit`.

### Функциональные тесты

Функциональные тесты могут быть выполнены путем запуска `phpunit` в каталоге `/tests/functional`. Убедитесь, что выполнены следующие настройки:

- `demo` - активная тема
- `en` - активный язык

#### Установка Selenium

1. [Скачайте](http://java.sun.com/) последнюю версию Java SE и установите ее.
1. Скачайте архив с дистрибутивом [Selenium Server](http://seleniumhq.org/download/).
1. Разархивируйте файл и скопируйте selenium-server-standalone-2.42.2.jar (укажите нужную версию) в /usr/local/bin.
1. Запустите Selenium Server при помощи следующей команды: `java -jar /usr/local/bin/selenium-server-standalone-2.42.2.jar`.

#### Настройка Selenium

Создайте файл `selenium.php` в корне проекта и добавьте в него следующее содержимое:

    <?php

    // Selenium server details
    define('TEST_SELENIUM_HOST', '127.0.0.1');
    define('TEST_SELENIUM_PORT', 4444);
    define('TEST_SELENIUM_BROWSER', '*firefox');

    // Back-end URL
    define('TEST_SELENIUM_URL', 'http://localhost/backend/');

    // Active Theme
    define('TEST_SELENIUM_THEME', 'demo');

    // Back-end credentials
    define('TEST_SELENIUM_USER', 'admin');
    define('TEST_SELENIUM_PASS', 'admin');
