# 部署

## 概念

### 使用 Composer 进行身份验证

使用 Composer 部署应用程序时，系统可能会提示您提供 October CMS 网站的登录凭据。这些凭据将验证您的 Composer 会话是否有权下载 October CMS 源代码。

为避免手动输入这些凭据，您应该确保 [Composer auth.json 文件](https://getcomposer.org/doc/articles/http-basic-authentication.md) 与您的应用程序一起部署。

或者，您可以使用 `project:set` [artisan 命令](../console/commands.md#oc-set-project) 重新创建此文件。

```sh
php artisan project:set <license key>
```

如果上述命令不可用，您可以使用 composer 创建文件。

```sh
​composer config --auth http-basic.gateway.octobercms.com <email address> <license key>
```

### 没有 Composer 的部署

<ProductIcon src="https://i.ibb.co/vPRZ4nB/deploy-plugin.png" />

如果您的服务器不具备运行 Composer 或命令行工具的能力，例如微实例和共享环境，您可以使用[官方部署插件](https://octobercms.com/plugin/rainlab-deploy)作为部署您的网站的解决方案。

<div class="clearfix"></div>

## 安全性和性能

<a id="oc-public-folder"></a>
### 公共文件夹

为了在生产环境中获得最高安全性，您可以将 Web 服务器配置为使用 **public/** 文件夹，以确保只能访问公共文件。首先，您需要使用 `october:mirror` 命令生成一个公共文件夹。

```sh
php artisan october:mirror
```

这将在项目的基本目录中创建一个名为 **public/** 的新目录，您应该从这里修改网络服务器配置以使用此新路径作为主目录，也称为 *wwwroot*。

该命令应在每次系统更新或安装新插件后执行。您可以使用 `system.auto_mirror_public` 配置项指示 October CMS 自动执行此操作。

```
AUTO_MIRROR_PUBLIC=true
```

> **注意**：对于 Windows 操作系统，`october:mirror` 命令必须在以管理员身份运行的控制台中执行。因此，它更适合作为部署过程的一部分运行。

### 提高性能

October CMS 已针对性能进行了微调，您可以采取一些额外的步骤来进一步提高此性能，尤其是对于大型应用程序。

禁用 [调试模式](../setup/configuration.md#oc-debug-mode) 并启用 [环境配置](../setup/configuration.md#oc-environment-configuration) 中的缓存设置。

```
APP_DEBUG=false
CMS_ROUTE_CACHE=true
CMS_ASSET_CACHE=true
CMS_TWIG_CACHE=true
```

使用这些 artisan 命令缓存配置和路由。
```
php artisan config:cache
php artisan route:cache
```

### 共享主机

如果您与其他用户共享一台服务器，您应该防止邻居站点遭到入侵。确保所有带有密码的文件(例如像 `config/database.php` 这样的 CMS 配置文件)无法从其他用户帐户中读取，即使他们找出了您文件的绝对路径。将此类重要文件的权限设置为 600(仅对所有者进行读写，对其他任何人都没有)是一个好主意。

您可以在文件位置 config/system.php 中或通过下面的环境变量设置默认权限掩码部分的保护。

```
DEFAULT_FILE_MASK=644
DEFAULT_FOLDER_MASK=755
```

> **注意**：不要忘记手动检查文件是否已设置为 644，因为您可能需要进入控制面板进行设置。

## Web 服务器配置

October CMS 具有应用于您的网络服务器的基本配置。常见的网络服务器及其配置可以在下面找到。

### Apache 配置

如果您的网络服务器正在运行 Apache，则有一些额外的系统要求：

1. 应安装mod_rewrite
1. AllowOverride 选项应该打开

在某些情况下，您可能需要在 `.htaccess` 文件中取消注释这一行：

```
##
## You may need to uncomment the following line for some hosting environments,
## if you have installed to a subdirectory, enter the name here also.
##
# RewriteBase /
```

如果您已安装到子目录，则还应添加子目录的名称：

```
RewriteBase /mysubdirectory/
```

### Nginx 配置

在 Nginx 中配置您的站点需要进行一些小的更改。

```sh
nano /etc/nginx/sites-available/default
```

在 **server** 部分使用以下代码。如果您已将October安装到子目录中，请将位置指令中的第一个 `/` 替换为October的安装目录：

```
location / {
    # Let October CMS handle everything by default.
    # The path not resolved by October CMS router will return October CMS's 404 page.
    # Everything that does not match with the whitelist below will fall into this.
    rewrite ^/.*$ /index.php last;
}

# Pass the PHP scripts to FastCGI server
location ~ ^/index.php {
    # Write your FPM configuration here

}

# Whitelist
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

### Lighttpd 配置

如果您的网络服务器正在运行 Lighttpd，您可以使用以下配置来运行 October CMS。使用您喜欢的编辑器打开您的站点配置文件。

```sh
nano /etc/lighttpd/conf-enabled/sites.conf
```

在编辑器中粘贴以下代码并更改 **host address** 和 **server.document-root** 以匹配您的项目。

```
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

### IIS 配置

如果您的网络服务器正在运行 Internet 信息服务 (IIS)，您可以在 **web.config** 配置文件中使用以下内容来运行 October CMS。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <clear />
                <rule name="October CMS to handle all non-whitelisted URLs" stopProcessing="true">
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
