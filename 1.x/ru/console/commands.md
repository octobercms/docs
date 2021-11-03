# Интерфейс командной строки

OctoberCMS включает в себя несколько консольных команд и утилит, основанных на инструменте Laravel - [Artisan](http://laravel.com/docs/artisan), которые позволяют установить систему, обновить ее, а также ускорить процесс разработки. Вы можете [создавать свои команды](../console/development.md) или использовать уже [существующие](../console/scaffolding.md).

<a name="console-install" class="anchor"></a>
## Установка

Установка консоли может быть выполнена при помощи системы или [Composer](http://getcomposer.org/). Если вы планируете использовать базу данных, убедитесь после установки в работе команды [install](#console-install-command).

<a name="console-install-quick" class="anchor"></a>
### Быстрый старт

Введите эту строчку в терминал, чтобы получить последнюю копию October:

    curl -s https://octobercms.com/api/installer | php

или:

    php -r "eval('?>'.file_get_contents('https://octobercms.com/api/installer'));"

<a name="console-install-composer" class="anchor"></a>
### Composer

Используйте команду `create-project`, чтобы закачать исходный код в папку **/myoctober**:

    composer create-project october/october myoctober dev-master

После чего откройте файл **config/cms.php** и внесите следующие изменения:

    'disableCoreUpdates' => true,

Используйте команду `composer update` для обновления системы.

> **Примечание**: Composer будет искать внутри плагинов зависимости, которые будут включены в обновления.

<a name="maintenance-commands" class="anchor"></a>
## Настройка и Поддержка

<a name="console-install-command" class="anchor"></a>
### Установка системы

Команда `october:install` поможет вам установить OctoberCMS на сервер:

    php artisan october:install

После чего Вы можете внести необходимые изменения в **config/app.php** и **config/cms.php**.

<a name="console-update-command" class="anchor"></a>
### Обновление системы

Команда `october:update` обновит файлы ядра, плагины и внесет необходимые изменения в базу данных.

    php artisan october:update

> **Примечание**: Если Вы использовали [composer](#console-install-composer) для установки, то ядро приложение не обновится автоматически! Используйте сначала команду `composer update`, а уже после `php artisan october:update`.

<a name="console-up-command" class="anchor"></a>
### Миграция

Команда `october:up` внесет необходимые изменения в базу данных: создаст таблицы и добавит новые значения, указанные в файле [version.yaml](../plugin/updates.md).

    php artisan october:up

Команда `october:down` вернет все изменения обратно. Новые таблицы, как и новые значения в них, будут удалены.
    php artisan october:down

<a name="plugin-commands" class="anchor"></a>
## Управление плагинами

October включает в себя ряд команд для управления плагинами.

<a name="plugin-install-command" class="anchor"></a>
### Установка плагина

`plugin:install` - скачивает и устанавливает указанный плагин.

    php artisan plugin:install AuthorName.PluginName

<a name="plugin-refresh-command" class="anchor"></a>
### Обновление плагина

`plugin:refresh` - удаляет таблицы плагина и заново их создает. Эта команда полезна при разработке.

    php artisan plugin:refresh AuthorName.PluginName

<a name="plugin-remove-command" class="anchor"></a>
### Удаление плагина

`plugin:remove` - удаляет таблицы и все файлы плагина.

    php artisan plugin:remove AuthorName.PluginName

<a name="theme-commands" class="anchor"></a>
## Управление темами

October включает в себя ряд команд для управления темами.

<a name="theme-install-command" class="anchor"></a>
### Установка темы

`theme:install` - скачивает и устанавливает тему из [Маркетплейса](https://octobercms.com/themes/).

    php artisan theme:install AuthorName.ThemeName

Укажите название папки в качестве второго аргументы для установки темы в произвольную папку:

    php artisan theme:install AuthorName.ThemeName my-theme

<a name="theme-list-command" class="anchor"></a>
### Список тем

`theme:list` - список установленных тем. Используйте параметр e **-m**, чтобы посмотреть популярные темы в Маркетплейсе.

    php artisan theme:list

<a name="theme-use-command" class="anchor"></a>
### Включение темы

`theme:use` - устанавливает активную тему:

    php artisan theme:use rainlab-vanilla

<a name="theme-remove-command" class="anchor"></a>
### Удаление темы

`theme:remove` - удаляет тему:

    php artisan theme:remove rainlab-vanilla

<a name="utility-commands" class="anchor"></a>
## Утилиты

October включает в себя ряд дополнительных команд.

<a name="cache-clear-command" class="anchor"></a>
### Очистка кэша

`cache:clear` - очищает кэш приложения. Пример:

    php artisan cache:clear

<a name="october-fresh-command" class="anchor"></a>
### Удалить Демо

`october:fresh` - удаляет демо темы и плагина, которые устанавливаются по умолчанию.

    php artisan october:fresh

<a name="cache-clear-command" class="anchor"></a>
### Зеркальная копия папки public

`october:mirror` - создает зеркальную копию папки **public**, используя **symbolic linking** (см. [Настройка папки public](../setup/configuration.md#public-folder)).

    php artisan october:mirror public/

<a name="october-env-command" class="anchor"></a>
### Включение DotEnv

`october:env` - изменяет значения конфигурации на [DotEnv синтаксис](../setup/configuration.md#environment-config-extended).

    php artisan october:env

<a name="october-util-command" class="anchor"></a>
### Miscellaneous commands

`october:util` - общая команда для выполнения различных задач.

#### Компилирование CSS, JS и других файлов

    php artisan october:util compile assets
    php artisan october:util compile lang
    php artisan october:util compile js
    php artisan october:util compile less

Используйте параметр `--debug` для отключение минификации.

    php artisan october:util compile js --debug

#### Запулить все репозитории

Эта команда выполнит `git pull` для всех папок с темами и плагинами.

    php artisan october:util git pull

#### Удалить все изображения

Удалить все thumbnails в папке **uploads**

    php artisan october:util purge thumbs
