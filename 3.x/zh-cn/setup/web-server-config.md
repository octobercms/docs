---
subtitle: 了解如何配置和保护您的服务器，以及如何优化应用程序性能。
---
# Web 服务器配置

## 安全与性能

### 公共文件夹

在默认配置中，October CMS 目录位于 Web 访问的根目录。为了在生产环境中获得最高安全性，您应该将 Web 服务器配置为使用公共文件夹，以确保只有特定目录中的文件可以被访问。

首先，您需要使用 `october:mirror` 命令生成一个公共文件夹：

```bash
php artisan october:mirror
```

该命令会在项目的根目录中创建一个名为 `public` 的新目录。在该目录内，命令会为项目中所有插件、模块和主题的资源目录创建符号链接。

::: tip
在 Apache 中，服务器和虚拟主机的文档位置通过 `DocumentRoot` 指令进行管理。
:::

Web 服务器配置必须更新为指向公共目录，而不是项目的根目录。

::: aside
在 Windows 操作系统中，`october:mirror` 命令只能在以管理员身份运行的控制台中执行。
:::

每次系统更新或安装新插件后，都应执行 `october:mirror` 命令。您可以指示 October CMS 在每次使用 Composer 更新项目后自动运行该命令。自动镜像功能通过 `system.auto_mirror_public` 配置参数进行管理。

### 提高性能

本节描述了提高应用程序性能的步骤，建议所有生产环境都执行这些步骤，因为它们将大幅缩短页面加载时间。

在配置中，禁用[调试模式](../setup/configuration.html#debug-mode)并启用缓存层。例如，如果您使用的是 `.env` 文件：

```ini
APP_DEBUG=false
CMS_ROUTE_CACHE=true
CMS_ASSET_CACHE=true
CMS_TWIG_CACHE=true
```

在控制台中，使用以下命令缓存系统结构：

```bash
php artisan october:optimize

composer dump-autoload --optimize
```

### 共享主机安全

在共享主机环境中，必须采取额外措施来保护您的项目文件，以免被与您共享服务器的其他用户访问。

::: warning
请咨询您的主机提供商以获取合适的权限掩码。一般规则是，应用程序文件不得被其他用户访问。所有文件必须可由所有者用户和 Web 服务器访问和管理。配置文件必须可由所有者用户和 Web 服务器访问，但 Web 服务器不得能够修改它们。
:::

October CMS 可以自动为新文件和目录设置权限。默认权限通过 `system.default_mask.file` 和 `system.default_mask.folder` 配置参数进行管理。例如，如果您使用 `.env` 文件来声明环境变量：

```ini
DEFAULT_FILE_MASK=644
DEFAULT_FOLDER_MASK=755
```

### 使用反向代理

当使用反向代理（如 CloudFlare）时，主机服务器内部可能使用不安全的协议，October CMS 在生成链接时会反映这一点。这可能导致响应中生成 `http://` 和 `https://` 混合的链接。`system.link_policy` 设置可用于强制在所有位置使用安全的 HTTPS 链接。

```ini
LINK_POLICY=secure
```

您也可以 `force`（强制）将应用程序 URL 严格用于每个链接，该 URL 在 `app.url` 配置中定义。

```ini
LINK_POLICY=force
```

### 安全模式

安全模式是一个额外的保护层，它通过禁用编辑器中的 PHP 代码区域来防止执行任意 PHP 代码。安全模式还会启用安全的 Twig 环境，从而限制不安全的方法调用。

`cms.safe_mode` 参数可以在 `config/cms.php` 文件中找到。默认情况下，该值从 `CMS_SAFE_MODE` 环境变量加载。安全模式会禁用 CMS 模板中的 [PHP 代码区域](../cms/themes.md#php-code-section)。

该参数可以取以下值之一：

- `true` - 启用安全模式
- `false` - 禁用安全模式
- `null` - 当[调试模式](../setup/configuration.md#debug-mode)被禁用时，安全模式处于激活状态。

如果您计划在生产环境中使用安全模式，您也应该在开发环境中启用它，以检查您的主题是否能在安全的 Twig 环境下正常工作。您可能需要修改插件，以允许通过 `October\Contracts\Twig\CallsAnyMethod` 和 `October\Contracts\Twig\CallsMethods` 接口调用方法。

或者，您可以使用 `cms.security_policy_v1` 配置值切换到更宽松的 Twig 策略，该策略会阻止不安全的方法调用。

```ini
CMS_SECURITY_POLICY_V1=true
```

## 特定服务器配置

本节描述了各种 Web 服务器的配置。

::: details Apache
要运行 October CMS 应用程序，Apache 服务器必须具有以下配置：

* 必须安装 [mod_rewrite 模块](https://httpd.apache.org/docs/2.4/mod/mod_rewrite.html)
* 应用程序目录的 [AllowOverride 指令](https://httpd.apache.org/docs/2.4/mod/core.html#AllowOverride) 必须设置为 `All` 值。

在某些情况下，您可能需要取消注释项目 `.htaccess` 文件中的 [RewriteBase 指令](https://httpd.apache.org/docs/2.4/mod/mod_rewrite.html#rewritebase)：

```text
# RewriteBase /
```

如果您将 October CMS 安装到子目录中，请将子目录名称添加到指令值中。这样，您就可以拥有类似 example.tld/subdirectory/page 的 URL。

```text
# RewriteBase /subdirectory/
```
:::

::: details Nginx
在 Nginx 站点配置的 server 部分中使用以下代码。如果您将 October CMS 安装到子目录中，请将 location 指令中的第一个 `/` 替换为子目录名称。

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
location ~ ^/plugins/.*/.*/(assets|resources) { try_files $uri 404; }
location ~ ^/plugins/.*/.*/(behaviors|reportwidgets|formwidgets|widgets)/.*/(assets|resources) { try_files $uri 404; }
location ~ ^/themes/.*/(?:assets|resources) { try_files $uri 404; }
```
:::

::: details Lighttpd
将以下代码粘贴到 Lighttpd 站点配置文件中，并将 `host address` 和 `server.document-root` 更改为与您的项目位置匹配。

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
使用以下 `web.config` 文件中的配置在 IIS 上运行 October CMS：

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
