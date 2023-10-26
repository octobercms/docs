---
subtitle: Learn how to configure and secure your server and tune up the application performance.
---
# Web Server Configuration

## Security & Performance

### Public Folder

In the default configuration, the October CMS directory sits at the root level for web access. For ultimate security in production environments, you should configure the web server to use a public folder to ensure only files in specific directories can be accessed.

First you will need to spawn a public folder using the `october:mirror` command:

```bash
php artisan october:mirror
```

It will create a new directory called `public` in the project's root directory. Inside the directory, the command creates symbolic links to assets and resources directories for all plugins, modules and themes existing in the project.

::: tip
In Apache, the server and virtual host document location is managed with the `DocumentRoot` directive.
:::

The web server configuration must be updated to point to the public directory instead of the project's root directory.

::: aside
In Windows operating systems, the `october:mirror` command can only be executed in a console running as administrator.
:::

The `october:mirror` command should be performed after each system update or when a new plugin is installed. You may instruct October CMS to run the command each time after updating the project with the Composer. The auto mirroring feature is managed with the `system.auto_mirror_public` configuration parameter.

### Improving Performance

This section describes steps that increase the application performance and is recommended for all production environments since it will drastically improve the page load time.

In the configuration, disable [debug mode](../setup/configuration.html#debug-mode) and enable the caching layers. For example, if you are using the `.env` file:

```ini
APP_DEBUG=false
CMS_ROUTE_CACHE=true
CMS_ASSET_CACHE=true
CMS_TWIG_CACHE=true
```

In the console, cache the system structure with these commands:

```bash
php artisan october:optimize

composer dump-autoload --optimize
```

### Shared Hosting Security

In shared hosting environments, extra steps must be done to protect your project files from other users that share the server with you.

::: warning
Consult with your hosting provider for suitable permission masks. The general rule is that the application files must not be accessible by other users. All files must be accessible and manageable by the owner user and the web server. Configuration files must be accessible by the owner user and web server, but the web server must not be able to change them.
:::

October CMS can automatically set permissions for new files and directories. The default permissions are managed with the `system.default_mask.file` and `system.default_mask.folder` configuration parameters. For example, if you are using the `.env` file to declare the environment variables:

```ini
DEFAULT_FILE_MASK=644
DEFAULT_FOLDER_MASK=755
```

### Using a Reverse Proxy

When using a reverse proxy, such as CloudFlare, the host server may use an insecure protocol internally and October CMS will reflect this when generating links. This can result in mixed links generated as `http://` and `https://` within the response. The `system.link_policy` setting can be used to force `secure` HTTPS links everywhere.

```ini
LINK_POLICY=secure
```

You may also `force` the application URL to be used strictly for every link, which is defined in the `app.url` configuration.

```ini
LINK_POLICY=force
```

### Safe Mode

Safe mode is an extra level of protection that prevents running arbitrary PHP code by disabling the PHP code section in the editor. Safe mode will also enable a secure Twig environment, which restricts unsafe method calls.

The `cms.safe_mode` parameter can be found in the `config/cms.php` file. By default, the value is loaded from the `CMS_SAFE_MODE` environment variable. Safe mode disables the [PHP code section](../cms/themes.md#php-code-section) in CMS templates.

The parameter can take one of the following values:

- `true` - safe mode is enabled
- `false` - safe mode is disabled
- `null` - safe mode is active if [debug mode](../setup/configuration.md#debug-mode) is disabled.

If you plan on using safe mode in production, you should also enable it for development to check that your theme works with the secure Twig environment. You may need to modify plugins to allow calling methods using the `October\Contracts\Twig\CallsAnyMethod` and `October\Contracts\Twig\CallsMethods` interfaces.

Alternatively, you can change to a more relaxed  Twig policy with the `cms.security_policy_v1` configuration value, which blocks unsafe methods instead.

```ini
CMS_SECURITY_POLICY_V1=true
```

## Server-specific Configuration

This section describes the configuration for various web servers.

::: details Apache
To run October CMS applications, the Apache server must have the following configuration:

* the [mod_rewrite module](https://httpd.apache.org/docs/2.4/mod/mod_rewrite.html) must be installed
* the [AllowOverride directive](https://httpd.apache.org/docs/2.4/mod/core.html#AllowOverride) for the application directory must have the `All` value.

In some cases you may need to uncomment the [RewriteBase directive](https://httpd.apache.org/docs/2.4/mod/mod_rewrite.html#rewritebase) in the project’s `.htaccess` file:

```text
# RewriteBase /
```

If you have installed October CMS to a subdirectory, add its name to the directive value. In this way, you can have URLs like example.tld/subdirectory/page.

```text
# RewriteBase /subdirectory/
```
:::

::: details Nginx
Use the following code in the server section of the Nginx site configuration. If you have installed October CMS into a subdirectory, replace the first `/` in location directives with the subdirectory name.

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
Paste the following code in the Lighttpd sites configuration file and change the `host address` and `server.document-root` to match your project’s location.

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
Use the following configuration in the `web.config` file to run October CMS on IIS:

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