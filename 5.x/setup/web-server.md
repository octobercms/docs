---
previousPath: setup/web-server-config.md
subtitle: Configure your web server for October CMS, then secure the site and improve its performance for production.
---
# Web Server Configuration

October CMS routes every request through its `index.php` file and only serves static files from asset directories. Configure your web server to do the same, then work through the security and performance steps below before you go live.

## Configuring the Web Server

Apache works with the `.htaccess` file that ships with October CMS. Other web servers need the rules below added to their site configuration.

::: details Apache
To run October CMS applications, the Apache server needs this configuration:

* the [mod_rewrite module](https://httpd.apache.org/docs/2.4/mod/mod_rewrite.html) must be installed
* the [AllowOverride directive](https://httpd.apache.org/docs/2.4/mod/core.html#AllowOverride) for the application directory must have the `All` value.

In some cases you may need to uncomment the [RewriteBase directive](https://httpd.apache.org/docs/2.4/mod/mod_rewrite.html#rewritebase) in the project's `.htaccess` file:

```text
# RewriteBase /
```

If you installed October CMS in a subdirectory, add its name to the directive value. This gives you URLs like example.tld/subdirectory/page.

```text
# RewriteBase /subdirectory/
```
:::

::: details Nginx
Use the following code in the server section of the Nginx site configuration. If you installed October CMS in a subdirectory, replace the first `/` in the location directives with the subdirectory name.

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
location ~ ^/app/(assets|resources) { try_files $uri 404; }
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
Paste the following code in the Lighttpd sites configuration file and change the `host address` and `server.document-root` to match your project's location.

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
                        <add input="{REQUEST_FILENAME}" matchType="IsFile" pattern="^/app/(assets|resources)/.*" negate="true" />
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

## Using a Public Folder

In the default configuration, the October CMS directory is the web root. For the best security in production, configure the web server to use a public folder so that only files in specific directories can be accessed.

Create the public folder with the `october:mirror` command.

```bash
php artisan october:mirror
```

The command creates a directory called `public` in the project root. Inside it, the command creates symbolic links to the asset and resource directories of every plugin, module and theme in the project.

::: aside
On Windows, you can only run the `october:mirror` command in a console running as administrator.
:::

Then update the web server configuration to point to the `public` directory instead of the project root. In Apache, the document location is set with the `DocumentRoot` directive.

Run `october:mirror` again after each system update and whenever you install a new plugin. To run it automatically each time Composer updates the project, use the `system.auto_mirror_public` configuration parameter.

```ini
AUTO_MIRROR_PUBLIC=true
```

## Improving Performance

These steps drastically improve the page load time, and are recommended for every production environment.

In the configuration, disable [debug mode](./configuration.md#debug-mode) and enable the caching layers. For example, in the `.env` file:

```ini
APP_DEBUG=false
CMS_ROUTE_CACHE=true
CMS_ASSET_CACHE=true
CMS_TWIG_CACHE=true
```

Then cache the system structure with these commands:

```bash
php artisan october:optimize

composer dump-autoload --optimize
```

## Securing Shared Hosting

On shared hosting, take extra steps to protect your project files from other users on the same server.

::: warning
Ask your hosting provider for suitable permission masks. As a general rule, other users must not be able to access the application files. The owner user and the web server must be able to access and manage all files. Configuration files must be accessible to the owner user and the web server, but the web server must not be able to change them.
:::

October CMS can set permissions on new files and directories automatically. The default permissions are set with the `system.default_mask.file` and `system.default_mask.folder` configuration parameters. For example, in the `.env` file:

```ini
DEFAULT_FILE_MASK=644
DEFAULT_FOLDER_MASK=755
```

## Using a Reverse Proxy

Behind a reverse proxy such as Cloudflare, the host server may use an insecure protocol internally, and October CMS reflects this when it generates links. The response can then contain a mix of `http://` and `https://` links. Use the `system.link_policy` setting to force `secure` HTTPS links everywhere.

```ini
LINK_POLICY=secure
```

You can also `force` every link to use the application URL defined in the `app.url` configuration.

```ini
LINK_POLICY=force
```

### Using Cloudflare

Cloudflare [Rocket Loader](https://developers.cloudflare.com/speed/optimization/content/rocket-loader/) rewrites script tags to defer their execution, which breaks the script loading order the backend panel relies on. The symptoms are hard to trace because no errors appear in the browser console. For example, the navigation menu stops responding after you open a page, list rows ignore hover and click events, or the page only works again after a popup opens and closes.

The recommended solution is the [Cloudflare plugin](https://octobercms.com/plugin/rainlab-cloudflare). It adds the `data-cfasync="false"` attribute to every backend script tag so Rocket Loader leaves them alone. The plugin also registers the Cloudflare network as trusted proxies, so the HTTPS protocol and visitor IP address are detected correctly.

```bash
php artisan plugin:install RainLab.Cloudflare
```

Alternatively, disable Rocket Loader in the Cloudflare dashboard, either for the entire site or with a configuration rule that targets the backend path (`/admin` by default).

::: tip
The plugin only protects the backend by default, so Rocket Loader can continue optimizing theme scripts. If your theme or the AJAX framework is affected on the frontend, set `CLOUDFLARE_IGNORE_FRONTEND_SCRIPTS=true` in the `.env` file.
:::

## Restricting Trusted Hosts

In production, configure your web server to accept only requests whose `Host` header matches your domain. This prevents host header spoofing, where a crafted request could influence the URLs generated for redirects and emails.

Most web servers do this by default through their virtual host configuration. For example, Apache only routes a request to a virtual host when the `Host` header matches its `ServerName` or `ServerAlias`, and Nginx requires a matching `server_name` directive.

In the application, there are two ways to pin URL generation to your domain:

- **Link Policy**: the `LINK_POLICY=force` setting described above pins all generated URLs to the configured `APP_URL` value, whatever the request host.

- **Multisite**: when the [multisite feature](../themes/sites/multisite.md) is enabled with hostname restrictions, only requests matching the allowed hostnames are served. This rejects requests with unrecognized Host headers, and also works with wildcard patterns such as `*.example.com`.

## Enabling Safe Mode

Safe mode prevents running arbitrary PHP code by disabling the [PHP code section](../themes/structure.md#php-code-section) in CMS templates. It also enables a secure Twig environment, which restricts unsafe method calls.

The `cms.safe_mode` parameter is in the `config/cms.php` file, and its value loads from the `CMS_SAFE_MODE` environment variable. Set it to `true` to enable safe mode. It is disabled (`false`) by default.

```ini
CMS_SAFE_MODE=true
```

If you plan to use safe mode in production, enable it during development too, so you can check that your theme works with the secure Twig environment. You may need to modify plugins to allow calling methods, using the `October\Contracts\Twig\CallsAnyMethod` and `October\Contracts\Twig\CallsMethods` interfaces.

Alternatively, switch to a more relaxed Twig policy with the `cms.security_policy_v1` configuration value, which blocks unsafe methods instead.

```ini
CMS_SECURITY_POLICY_V1=true
```

#### See Also

::: also
* [Production Configuration](./configuration.md#production-configuration)
* [Deployment](./deployment.md)
:::
