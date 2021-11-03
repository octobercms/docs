# Конфигурация приложения

Все файлы настроек Октября хранятся в папке **config/**. Опции хорошо описаны в комментариях, так что рекомендуем внимательно изучить эти файлы.

<a name="webserver-configuration" class="anchor"></a>
## Конфигурация веб-сервера

<a name="apache-configuration" class="anchor"></a>
### Apache configuration

Если на вашем веб-сервере установлен Apache, то перед началом работы убедитесь, что модуль mod_rewrite и параметр AllowOverride включены. Это необходимо для корректной обработки файла `.htaccess`.

В некоторых случаях, возможно, потребуется раскомментировать эту строку в файле `.htaccess`:

    ##
    ## You may need to uncomment the following line for some hosting environments,
    ## if you have installed to a subdirectory, enter the name here also.
    ##
    # RewriteBase /

Если Вы установили приложение в подпапку, то должны указать ее название:

    RewriteBase /mysubdirectory/

<a name="nginx-configuration" class="anchor"></a>
### Конфигурация Nginx

Если на вашем веб-сервере установлен Nginx, то перед началом работы требуются внести небольшие изменения.

`nano /etc/nginx/sites-available/default`

Используйте следующий код в разделе **server**. Если вы установили Октябрь в подпапке, замените `/` на название папки, в которую было установлено приложение:

    location / {
        try_files $uri $uri/ /index.php$is_args$args;
    }

    rewrite ^themes/.*/(layouts|pages|partials)/.*.htm /index.php break;
    rewrite ^bootstrap/.* /index.php break;
    rewrite ^config/.* /index.php break;
    rewrite ^vendor/.* /index.php break;
    rewrite ^storage/cms/.* /index.php break;
    rewrite ^storage/logs/.* /index.php break;
    rewrite ^storage/framework/.* /index.php break;
    rewrite ^storage/temp/protected/.* /index.php break;
    rewrite ^storage/app/uploads/protected/.* /index.php break;

<a name="lighttpd-configuration" class="anchor"></a>
### Конфигурация Lighttpd

Если на Вашем веб-сервере установлен Lighttpd, то Вы можете использовать следующую конфигурацию для запуска OctoberCMS. Откройте файл с настройками вашего сайта:

`nano /etc/lighttpd/conf-enabled/sites.conf`

Вставьте следующий код в редактор и измените **host address** и **server.document-root** в соответствии с Вашим проектом.

    $HTTP["host"] =~ "example.domain.com" {
        server.document-root = "/var/www/example/"

        url.rewrite-once = (
            "^/(plugins|modules/(system|backend|cms))/(([\w-]+/)+|/|)assets/([\w-]+/)+[-\w^&'@{}[\],$=!#().%+~/ ]+\.(jpg|jpeg|gif|png|svg|swf|avi|mpg|mpeg|mp3|flv|ico|css|js|woff|ttf)(\?.*|)$" => "$0",
            "^/(system|themes/[\w-]+)/assets/([\w-]+/)+[-\w^&'@{}[\],$=!#().%+~/ ]+\.(jpg|jpeg|gif|png|svg|swf|avi|mpg|mpeg|mp3|flv|ico|css|js|woff|ttf)(\?.*|)$" => "$0",
            "^/storage/app/uploads/public/[\w-]+/.*$" => "$0",
            "^/storage/temp/public/[\w-]+/.*$" => "$0",
            "^/(favicon\.ico|robots\.txt|sitemap\.xml)$" => "$0",
            "(.*)" => "/index.php$1"
        )
    }

<a name="iis-configuration" class="anchor"></a>
### Конфигурация IIS

Если на Вашем веб-сервере установлен Internet Information Services (IIS), используйте следующие настройки в файле **web.config**:

    <?xml version="1.0" encoding="UTF-8"?>
    <configuration>
        <system.webServer>
            <rewrite>
                <rules>
                    <rule name="redirect all requests" stopProcessing="true">
                        <match url="^(.*)$" ignoreCase="false" />
                        <conditions logicalGrouping="MatchAll">
                            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" pattern="" ignoreCase="false" />
                        </conditions>
                        <action type="Rewrite" url="index.php" appendQueryString="true" />
                    </rule>
                </rules>
            </rewrite>
        </system.webServer>
    </configuration>

<a name="app-configuration" class="anchor"></a>
## Конфигурация приложения

<a name="debug-mode" class="anchor"></a>
### Режим отладки

Параметр `debug` находится в файле с настройками `config/app.php` и включен по умолчанию.

Когда этот параметр включен, то сообщения об ошибках отображаются с подробностями. После завершения работы над приложением обязательно отключите режим отладки. Это поможет предотвратить отображение потенциально конфиденциальной информации конечному пользователю.

В режиме отладки используются следующие функции:

1. Отображается [подробное описание ошибки](../cms/pages#error-page).
1. Указывается конкретная причина при неудачной аутентификация пользователя.
1. [Скрипты и стили](../markup/filter-theme) не минифицируются.
1. [Безопасный режим](#safe-mode) по умолчанию отключен.

> **Важно**: Всегда указывайте значение `false` для параметра `app.debug` в рабочих проектах.

<a name="safe-mode" class="anchor"></a>
### Безопасный режим

Вы можете включить Безопасный режим при помощи параметра `enableSafeMode` в файле с настройками `config/cms.php`. По умолчанию значение параметра - `null`.

Если безопасный режим включен, то секция PHP кода будет отключена в CMS шаблонах по соображениям безопасности. Если установлено значение `null`, то безопасный режим включен, когда [режим отладки](# debug-mode) отключен.

<a name="csrf-protection" class="anchor"></a>
### Защита от CSRF

October provides an easy method of protecting your application from cross-site request forgeries. First a random token is placed in your user's session. Then when a [opening form tag is used](../services/html#form-tokens) the token is added to the page and submitted back with each request.

While CSRF protection is disabled by default, you can enable it with the `enableCsrfProtection` parameter in the `config/cms.php` configuration file.

<a name="edge-updates" class="anchor"></a>
### Последние обновления

Ядро и некоторые плагины имеют *тестовую версию* в дополнение к *стабильной*, чтобы разработчики могли проверить работоспособность своего кода.

Вы можете получать самые последние обновления, изменив параметр `edgeUpdates` в файле с настройками `config/cms.php` на `true`.

    /*
    |--------------------------------------------------------------------------
    | Bleeding edge updates
    |--------------------------------------------------------------------------
    |
    | If you are developing with October, it is important to have the latest
    | code base, set this value to 'true' to tell the platform to download
    | and use the development copies of core files and plugins.
    |
    */

    'edgeUpdates' => false,

> **Примечание:** Мы рекомендуем включить `edgeUpdates` для разработчиков плагинов.

<a name="environment-config" class="anchor"></a>
### Конфигурация среды выполнения

Часто бывает полезно иметь разные значения конфигурации на основе среды, в которой работает приложение. Это можно сделать, задав переменную `APP_ENV` (по умолчанию - **production**). Существует два способа изменить это значение:

1. Установить значение `APP_ENV` напрямую при помощи сервера.

    Например, если Вы используете Apache, то можете просто добавить следующую строку в `.htaccess` или `httpd.config`:

        SetEnv APP_ENV "dev"

2. Создать файл **.env** в корне приложения со следующим содержимым:

        APP_ENV=dev

Теперь файлы с настройками можно добавить в папку **config/dev**, тем самым переопределив базовую конфигурацию приложения.

Например, чтобы использовать другую базу данных MySQL только для `dev`, создайте файл с именем **config/dev/database.php** и добавьте в него следующие содержимое:

    <?php

    return [
        'connections' => [
            'mysql' => [
                'host'     => 'localhost',
                'port'     => '',
                'database' => 'database',
                'username' => 'root',
                'password' => ''
            ]
        ]
    ];

<a name="advanced-configuration" class="anchor"></a>
## Расширенная конфигурация

<a name="public-folder" class="anchor"></a>
### Использование обшей папки

Вы можете использовать папку **public/**, чтобы обеспечить дополнительную безопасность своему приложению:

    php artisan october:mirror public/

Эта консольная команда создаст новый каталог с именем **public/** в корне Вашего проекта. Вы также должны указать новый путь до сайта в настройках веб-сервера.

> **Примечание**: Выполняйте эту команду после каждого обновления системы или при установке нового плагина. Возможно для этого Вам потребуются права администратора сервера.

<a name="environment-config-extended" class="anchor"></a>
### Расширенная конфигурация среды выполнения

Вы можете использовать хелпер `env` для получения значений переменных из Ваших конфигурационных файлов. Выполните команду `october:env`, чтобы переместить значение в среду выполнения:

    php artisan october:env

Первый параметр - название ключа. Второй параметр, принимаемый функцией `env`, является значением по умолчанию.  Если Вы ознакомитесь с конфигурационными файлами, то увидите несколько параметров, которые уже используют этот хелпер:

    'debug' => env('APP_DEBUG', true),

Файл `.env` не должен попадать в Вашу систему контроля версий, так как каждый из разработчиков и серверов, использующих ваше приложение, может иметь свои собственные настройки окружения.

Если вы занимаетесь разработкой в команде, то вы можете включить файл `.env.example` в Ваше приложение. Замените в нём значения «секретных» параметров (пароли, ключи доступа) на пустые строки или поясняющие комментарии — так другие разработчики в вашей команде смогут увидеть переменные окружения, необходимые для запуска вашего приложения.
