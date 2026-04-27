---
subtitle: Узнайте, как настроить и защитить сервер, а также повысить производительность приложения.
---
# Конфигурация веб-сервера

## Безопасность и производительность

### Публичная папка

В конфигурации по умолчанию директория October CMS находится на корневом уровне для веб-доступа. Для максимальной безопасности в рабочих окружениях следует настроить веб-сервер на использование публичной папки, чтобы обеспечить доступ только к файлам в определённых директориях.

Сначала необходимо создать публичную папку с помощью команды `october:mirror`:

```bash
php artisan october:mirror
```

Команда создаст новую директорию `public` в корневой директории проекта. Внутри этой директории команда создаст символические ссылки на директории ресурсов и активов для всех плагинов, модулей и тем, существующих в проекте.

::: tip
В Apache расположение документов сервера и виртуального хоста управляется директивой `DocumentRoot`.
:::

Конфигурацию веб-сервера необходимо обновить, чтобы она указывала на публичную директорию вместо корневой директории проекта.

::: aside
В операционных системах Windows команда `october:mirror` может быть выполнена только в консоли, запущенной от имени администратора.
:::

Команду `october:mirror` следует выполнять после каждого обновления системы или при установке нового плагина. Вы можете настроить October CMS на автоматический запуск этой команды после каждого обновления проекта через Composer. Функция автоматического зеркалирования управляется параметром конфигурации `system.auto_mirror_public`.

### Повышение производительности

В этом разделе описаны шаги по повышению производительности приложения, рекомендуемые для всех рабочих окружений, поскольку они значительно сократят время загрузки страниц.

В конфигурации отключите [режим отладки](../setup/configuration.html#debug-mode) и включите слои кэширования. Например, если вы используете файл `.env`:

```ini
APP_DEBUG=false
CMS_ROUTE_CACHE=true
CMS_ASSET_CACHE=true
CMS_TWIG_CACHE=true
```

В консоли выполните кэширование структуры системы следующими командами:

```bash
php artisan october:optimize

composer dump-autoload --optimize
```

### Безопасность на виртуальном хостинге

На виртуальном хостинге необходимо предпринять дополнительные меры для защиты файлов вашего проекта от других пользователей, разделяющих сервер с вами.

::: warning
Проконсультируйтесь с вашим хостинг-провайдером по поводу подходящих масок разрешений. Общее правило состоит в том, что файлы приложения не должны быть доступны другим пользователям. Все файлы должны быть доступны и управляемы пользователем-владельцем и веб-сервером. Файлы конфигурации должны быть доступны пользователю-владельцу и веб-серверу, но веб-сервер не должен иметь возможности их изменять.
:::

October CMS может автоматически устанавливать разрешения для новых файлов и директорий. Разрешения по умолчанию управляются параметрами конфигурации `system.default_mask.file` и `system.default_mask.folder`. Например, если вы используете файл `.env` для объявления переменных окружения:

```ini
DEFAULT_FILE_MASK=644
DEFAULT_FOLDER_MASK=755
```

### Использование обратного прокси

При использовании обратного прокси, например CloudFlare, хост-сервер может использовать незащищённый протокол внутри, и October CMS будет отражать это при генерации ссылок. Это может привести к генерации смешанных ссылок `http://` и `https://` в ответе. Параметр `system.link_policy` можно использовать для принудительного применения безопасных HTTPS-ссылок повсюду.

```ini
LINK_POLICY=secure
```

Вы также можете принудительно (`force`) использовать URL приложения для каждой ссылки, который определяется в конфигурации `app.url`.

```ini
LINK_POLICY=force
```

### Безопасный режим

Безопасный режим — это дополнительный уровень защиты, который предотвращает выполнение произвольного PHP-кода путём отключения секции PHP-кода в редакторе. Безопасный режим также включает защищённое окружение Twig, которое ограничивает вызовы небезопасных методов.

Параметр `cms.safe_mode` находится в файле `config/cms.php`. По умолчанию значение загружается из переменной окружения `CMS_SAFE_MODE`. Безопасный режим отключает [секцию PHP-кода](../cms/themes.md#php-code-section) в шаблонах CMS.

Параметр может принимать одно из следующих значений:

- `true` — безопасный режим включён
- `false` — безопасный режим отключён
- `null` — безопасный режим активен, если [режим отладки](../setup/configuration.md#debug-mode) отключён.

Если вы планируете использовать безопасный режим в рабочем окружении, вам следует также включить его для разработки, чтобы убедиться, что ваша тема работает с защищённым окружением Twig. Возможно, вам потребуется модифицировать плагины, чтобы разрешить вызов методов с использованием интерфейсов `October\Contracts\Twig\CallsAnyMethod` и `October\Contracts\Twig\CallsMethods`.

В качестве альтернативы вы можете переключиться на более мягкую политику Twig с помощью конфигурационного значения `cms.security_policy_v1`, которое блокирует небезопасные методы вместо полного ограничения.

```ini
CMS_SECURITY_POLICY_V1=true
```

## Конфигурация для различных серверов

В этом разделе описана конфигурация для различных веб-серверов.

::: details Apache
Для работы приложений October CMS сервер Apache должен иметь следующую конфигурацию:

* должен быть установлен модуль [mod_rewrite](https://httpd.apache.org/docs/2.4/mod/mod_rewrite.html)
* директива [AllowOverride](https://httpd.apache.org/docs/2.4/mod/core.html#AllowOverride) для директории приложения должна иметь значение `All`.

В некоторых случаях может потребоваться раскомментировать директиву [RewriteBase](https://httpd.apache.org/docs/2.4/mod/mod_rewrite.html#rewritebase) в файле `.htaccess` проекта:

```text
# RewriteBase /
```

Если вы установили October CMS в поддиректорию, добавьте её имя к значению директивы. Таким образом, вы сможете использовать URL вида example.tld/subdirectory/page.

```text
# RewriteBase /subdirectory/
```
:::

::: details Nginx
Используйте следующий код в секции server конфигурации сайта Nginx. Если вы установили October CMS в поддиректорию, замените первый `/` в директивах location на имя поддиректории.

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
location ~ ^/(favicon\.ico|sitemap\.xml|robots\.txt|humans\.txt) { try_files $uri /index.php; }

# Block all .dotfiles except well-known
location ~ /\.(?!well-known).* { deny all; }

## Static Files
location ~ ^/storage/app/(uploads/public|media|resources) { try_files $uri 404; }
location ~ ^/storage/temp/public { try_files $uri 404; }
location ~ ^/modules/.*/(assets|resources) { try_files $uri 404; }
location ~ ^/modules/.*/(behaviors|widgets|formwidgets|reportwidgets)/.*/(assets|resources) { try_files $uri 404; }
location ~ ^/plugins/.*/(assets|resources) { try_files $uri 404; }
location ~ ^/plugins/.*/.*/(behaviors|reportwidgets|formwidgets|widgets)/.*/(assets|resources) { try_files $uri 404; }
location ~ ^/themes/.*/(?:assets|resources) { try_files $uri 404; }
```
:::

::: details Lighttpd
Вставьте следующий код в файл конфигурации сайтов Lighttpd и измените `host address` и `server.document-root` в соответствии с расположением вашего проекта.

```text
$HTTP["host"] =~ "domain.example.tld" {
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
