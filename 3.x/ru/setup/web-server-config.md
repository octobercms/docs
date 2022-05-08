---
subtitle: Узнайте как настроить и защитить ваш сервер и тонко настроить производительность приложения.
---
# Конфигурация веб-сервера

## Безопасность и производительность

### Директория Public

В конфигурации по умолчанию весь корневой каталог October CMS открыт для веб-доступа. Для максимальной безопасности в боевых окружениях вы можете настроить веб-сервер на работу внутри `public` директории, чтобы обеспечить доступ только к файлам внутри нее.

Сначала вам нужно будет создать `public` директорию с помощью команды `october:mirror`:

```bash
php artisan october:mirror
```

Это создаст новую директорию `public` в корневой директории проекта. Внутри этой директории, команда создаст символические ссылки к ассетам и ресурсам для всех плагинов, модулей и шаблонам существующих в проекте.

::: tip
В Apache расположение документов сервера и виртуального хоста управляется директивой `DocumentRoot`.
:::

Конфигурацию веб-сервера необходимо обновить, чтобы она указывала на директорию `public`, а не на корневой каталог проекта.

::: aside
В операционных системах Windows команду `october:mirror` можно выполнить только в консоли, работающей от имени администратора.
:::

Команду `october:mirror` следует выполнять после каждого обновления системы или при установке нового плагина. Вы можете заставить October CMS запускать команду каждый раз после обновления проекта с помощью Composer. Функция управляется параметром конфигурации `system.auto_mirror_public`.

### Улучшаем производительность

В этом разделе описаны шаги, которые могут помочь повысить производительность больших приложений.

Отключите [режим отладки](../setup/configuration.html#debug-mode) и включите кэш. Пример, если вы используете`.env` файл:

```ini
APP_DEBUG=false
CMS_ROUTE_CACHE=true
CMS_ASSET_CACHE=true
CMS_TWIG_CACHE=true
```

Закэшируйте конфигурацию и таблицу роутов с помощью этих команд:

```ini
php artisan config:cache
php artisan route:cache
```

### Безопасность на Shared хостингах

Используя Shared хостинги, необходимо выполнить несколько действий чтобы полностью защититься от пользователей, которые делят с вами хостинг.

::: warning
Проконсультируйтесь с вашим хостинг-провайдером о подходящих масках разрешений. Общее правило заключается в том, что файлы приложения не должны быть доступны другим пользователям. Все файлы должны быть доступны и управляться пользователем-владельцем и веб-сервером. Файлы конфигурации должны быть доступны пользователю-владельцу и веб-серверу, но веб-сервер не должен иметь возможности изменять их.
:::

October CMS может автоматически устанавливать разрешения для новых файлов и каталогов. Разрешения по умолчанию управляются параметрами конфигурации `system.default_mask.file` и `system.default_mask.folder`. Пример, если вы используете файл `.env` для объявления переменных среды:

```ini
DEFAULT_FILE_MASK=644
DEFAULT_FOLDER_MASK=755
```

## Конфигурация определенного сервера

В этом разделе описывается конфигурация различных веб-серверов.

::: details Apache
Для запуска приложений October CMS сервер Apache должен иметь следующую конфигурацию:

* модуль [mod_rewrite](https://httpd.apache.org/docs/2.4/mod/mod_rewrite.html) должен быть установлен
* директива [AllowOverride](https://httpd.apache.org/docs/2.4/mod/core.html#AllowOverride) для директории приложения должна быть установлена `All`.

В некоторых случаях вам нужно раскомментировать директиву [RewriteBase](https://httpd.apache.org/docs/2.4/mod/mod_rewrite.html#rewritebase) внутри файла `.htaccess`:

```text
# RewriteBase /
```

Если вы установили October CMS в субдиректорию, добавьте ее имя к значению директивы. Таким образом, вы можете иметь такие URL-адреса, как `example.com/subdirectory/page`.

```text
# RewriteBase /subdirectory/
```
:::

::: details Nginx
Используйте следующий код в разделе сервера конфигурации сайта Nginx. Если вы установили October CMS в субдиректорию, замените первый `/` в директивах местоположения именем субдиректории.

```text
location / {
    # Let October CMS handle everything by default.
    # The path not resolved by October CMS router will return October CMS's 404 page.
    # Everything that does not match with the allowlist below will fall into this.
    rewrite ^/.*$ /index.php last;
}

# Pass the PHP scripts to FastCGI server
location ~ ^/index.php {
    # Write your FPM configuration here

}

# Allowlist
location ~ ^/favicon\.ico { try_files $uri /index.php; }
location ~ ^/sitemap\.xml { try_files $uri /index.php; }
location ~ ^/robots\.txt { try_files $uri /index.php; }
location ~ ^/humans\.txt { try_files $uri /index.php; }

# Block all .dotfiles except well-known
location ~ /\.(?!well-known).* { deny all; }

## Let nginx return 404 if static file not exists
location ~ ^/storage/app/uploads/public { try_files $uri 404; }
location ~ ^/storage/app/media { try_files $uri 404; }
location ~ ^/storage/app/resources { try_files $uri 404; }
location ~ ^/storage/temp/public { try_files $uri 404; }

location ~ ^/modules/.*/assets { try_files $uri 404; }
location ~ ^/modules/.*/resources { try_files $uri 404; }
location ~ ^/modules/.*/behaviors/.*/assets { try_files $uri 404; }
location ~ ^/modules/.*/behaviors/.*/resources { try_files $uri 404; }
location ~ ^/modules/.*/widgets/.*/assets { try_files $uri 404; }
location ~ ^/modules/.*/widgets/.*/resources { try_files $uri 404; }
location ~ ^/modules/.*/formwidgets/.*/assets { try_files $uri 404; }
location ~ ^/modules/.*/formwidgets/.*/resources { try_files $uri 404; }
location ~ ^/modules/.*/reportwidgets/.*/assets { try_files $uri 404; }
location ~ ^/modules/.*/reportwidgets/.*/resources { try_files $uri 404; }

location ~ ^/plugins/.*/.*/assets { try_files $uri 404; }
location ~ ^/plugins/.*/.*/resources { try_files $uri 404; }
location ~ ^/plugins/.*/.*/behaviors/.*/assets { try_files $uri 404; }
location ~ ^/plugins/.*/.*/behaviors/.*/resources { try_files $uri 404; }
location ~ ^/plugins/.*/.*/reportwidgets/.*/assets { try_files $uri 404; }
location ~ ^/plugins/.*/.*/reportwidgets/.*/resources { try_files $uri 404; }
location ~ ^/plugins/.*/.*/formwidgets/.*/assets { try_files $uri 404; }
location ~ ^/plugins/.*/.*/formwidgets/.*/resources { try_files $uri 404; }
location ~ ^/plugins/.*/.*/widgets/.*/assets { try_files $uri 404; }
location ~ ^/plugins/.*/.*/widgets/.*/resources { try_files $uri 404; }

location ~ ^/themes/.*/assets { try_files $uri 404; }
location ~ ^/themes/.*/resources { try_files $uri 404; }
```
:::

::: details Lighttpd
Вставьте следующий код в файл конфигурации сайтов Lighttpd и измените `host address` и `server.document-root`, чтобы они соответствовали местоположению вашего проекта.

```text
$HTTP["host"] =~ "domain.example.com" {
    server.document-root = "/var/www/example/"

    url.rewrite-once = (
        "^/(plugins|modules/(system|backend|cms))/(([\w-]+/)+|/|)assets/([\w-]+/)+[-\w^&'@{}[\],$=!#().%+~/ ]+\.(jpg|jpeg|gif|png|svg|swf|avi|mpg|mpeg|mp3|flv|ico|css|js|woff|ttf)(\?.*|)$" => "$0",
        "^/(system|themes/[\w-]+)/assets/([\w-]+/)+[-\w^&'@{}[\],$=!#().%+~/ ]+\.(jpg|jpeg|gif|png|svg|swf|avi|mpg|mpeg|mp3|flv|ico|css|js|woff|ttf)(\?.*|)$" => "$0",
        "^/storage/app/uploads/public/[\w-]+/.*$" => "$0",
        "^/storage/app/media/.*$" => "$0",
        "^/storage/app/resources/.*$" => "$0",
        "^/storage/temp/public/[\w-]+/.*$" => "$0",
        "^/(favicon\.ico)$" => "$0",
        "(.*)" => "/index.php$1"
    )
}
```
:::

:::details Microsoft IIS
Используйте следующую конфигурацию в файле `web.config` для запуска October CMS на IIS:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <clear />
                <rule name="October CMS to handle all non-allowlisted URLs" stopProcessing="true">
                    <match url="^(.*)$" ignoreCase="false" />
                    <conditions logicalGrouping="MatchAll">
                        <add input="{REQUEST_FILENAME}" matchType="IsFile" pattern="^/.well-known/*" negate="true" />
                        <add input="{REQUEST_FILENAME}" matchType="IsFile" pattern="^/storage/app/uploads/public/.*" negate="true" />
                        <add input="{REQUEST_FILENAME}" matchType="IsFile" pattern="^/storage/app/media/.*" negate="true" />
                        <add input="{REQUEST_FILENAME}" matchType="IsFile" pattern="^/storage/app/resources/.*" negate="true" />
                        <add input="{REQUEST_FILENAME}" matchType="IsFile" pattern="^/storage/temp/public/.*" negate="true" />
                        <add input="{REQUEST_FILENAME}" matchType="IsFile" pattern="^/themes/.*/(assets|resources)/.*" negate="true" />
                        <add input="{REQUEST_FILENAME}" matchType="IsFile" pattern="^/plugins/.*/(assets|resources)/.*" negate="true" />
                        <add input="{REQUEST_FILENAME}" matchType="IsFile" pattern="^/modules/.*/(assets|resources)/.*" negate="true" />
                    </conditions>
                    <action type="Rewrite" url="index.php" appendQueryString="true" />
                </rule>
            </rules>
        </rewrite>
    </system.webServer>
</configuration>
```
:::
