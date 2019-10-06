# App configuration

- [Webserver configuration](#webserver-configuration)
    - [Apache configuration](#apache-configuration)
    - [Nginx configuration](#nginx-configuration)
    - [Lighttpd configuration](#lighttpd-configuration)
    - [IIS configuration](#iis-configuration)
- [Application configuration](#app-configuration)
    - [Debug mode](#debug-mode)
    - [Safe mode](#safe-mode)
    - [CSRF protection](#csrf-protection)
    - [Bleeding edge updates](#edge-updates)
    - [Using a public folder](#public-folder)
- [Environment configuration](#environment-config)
    - [Defining a base environment](#base-environment)
    - [Domain driven environment](#domain-environment)
    - [Converting to DotEnv configuration](#dotenv-configuration)

All of the configuration files for October are stored in the **config/** directory. Each option is documented, so feel free to look through the files and get familiar with the options available to you.

<a name="webserver-configuration"></a>
## Web server configuration

October has basic configuration that should be applied to your webserver. Common webservers and their configuration can be found below.

<a name="apache-configuration"></a>
### Apache configuration

If your webserver is running Apache there are some extra system requirements:

1. mod_rewrite should be installed
1. AllowOverride option should be switched on

In some cases you may need to uncomment this line in the `.htaccess` file:

    ##
    ## You may need to uncomment the following line for some hosting environments,
    ## if you have installed to a subdirectory, enter the name here also.
    ##
    # RewriteBase /

If you have installed to a subdirectory, you should add the name of the subdirectory also:

    RewriteBase /mysubdirectory/

<a name="nginx-configuration"></a>
### Nginx configuration

There are small changes required to configure your site in Nginx.

`nano /etc/nginx/sites-available/default`

Use the following code in **server** section. If you have installed October into a subdirectory, replace the first `/` in location directives with the directory October was installed under:

    location / {
        # Let OctoberCMS handle everything by default.
        # The path not resolved by OctoberCMS router will return OctoberCMS's 404 page.
        # Everything that does not match with the whitelist below will fall into this.
        rewrite ^/.*$ /index.php last;
    }

    # Pass the PHP scripts to FastCGI server
    location ~ ^/index.php {
        # Write your FPM configuration here

    }

    # Whitelist
    ## Let October handle if static file not exists
    location ~ ^/favicon\.ico { try_files $uri /index.php; }
    location ~ ^/sitemap\.xml { try_files $uri /index.php; }
    location ~ ^/robots\.txt { try_files $uri /index.php; }
    location ~ ^/humans\.txt { try_files $uri /index.php; }

    ## Let nginx return 404 if static file not exists
    location ~ ^/.well-known { try_files $uri 404; }
    location ~ ^/storage/app/uploads/public { try_files $uri 404; }
    location ~ ^/storage/app/media { try_files $uri 404; }
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

<a name="lighttpd-configuration"></a>
### Lighttpd configuration

If your webserver is running Lighttpd you can use the following configuration to run OctoberCMS. Open your site configuration file with your favorite editor.

`nano /etc/lighttpd/conf-enabled/sites.conf`

Paste the following code in the editor and change the **host address** and  **server.document-root** to match your project.

    $HTTP["host"] =~ "domain.example.com" {
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

<a name="iis-configuration"></a>
### IIS configuration

If your webserver is running Internet Information Services (IIS) you can use the following in your **web.config** configuration file to run OctoberCMS.

    <?xml version="1.0" encoding="UTF-8"?>
    <configuration>
        <system.webServer>
            <rewrite>
                <rules>
                    <clear />
                    <rule name="OctoberCMS to handle all non-whitelisted URLs" stopProcessing="true">
                       <match url="^(.*)$" ignoreCase="false" />
                       <conditions logicalGrouping="MatchAll">
                           <add input="{REQUEST_FILENAME}" matchType="IsFile" pattern="^/.well-known/*" negate="true" />
                           <add input="{REQUEST_FILENAME}" matchType="IsFile" pattern="^/storage/app/uploads/.*" negate="true" />
                           <add input="{REQUEST_FILENAME}" matchType="IsFile" pattern="^/storage/app/media/.*" negate="true" />
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

<a name="app-configuration"></a>
## Application configuration

<a name="debug-mode"></a>
### Debug mode

The debug setting is found in the `config/app.php` configuration file with the `debug` parameter and is enabled by default.

When enabled, this setting will show detailed error messages when they occur along with other debugging features. While useful during development, debug mode should always be disabled when used in a live production site. This prevents potentially sensitive information from being displayed to the end-user.

The debug mode uses the following features when enabled:

1. [Detailed error pages](../cms/pages#error-page) are displayed.
1. Failed user authentication provides a specific reason.
1. [Combined assets](../markup/filter-theme) are not minified by default.
1. [Safe mode](#safe-mode) is disabled by default.

> **Important**: Always set the `app.debug` setting to `false` for production environments.

<a name="safe-mode"></a>
### Safe mode

The safe mode setting is found in the `config/cms.php` configuration file with the `enableSafeMode` parameter. The default value is `null`.

If safe mode is enabled, the PHP code section is disabled in CMS templates for security reasons. If set to `null`, safe mode is on when [debug mode](#debug-mode) is disabled.

<a name="csrf-protection"></a>
### CSRF protection

October provides an easy method of protecting your application from cross-site request forgeries. First a random token is placed in your user's session. Then when a [opening form tag is used](../services/html#form-tokens) the token is added to the page and submitted back with each request.

While CSRF protection is enabled by default, you can disable it with the `enableCsrfProtection` parameter in the `config/cms.php` configuration file.

<a name="edge-updates"></a>
### Bleeding edge updates

The October platform and some marketplace plugins will implement changes in two stages to ensure overall stability and integrity of the platform. This means they have a *test build* in addition to the default *stable build*.

You can instruct the platform to prefer test builds from the marketplace by changing the `edgeUpdates` parameter in the `config/cms.php` configuration file.

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

> **Note:** For plugin developers we recommend enabling **Test updates** for your plugins listed on the marketplace, via the Plugin Settings page.

> **Note:** If using [Composer](../console/commands#console-install-composer) to manage updates, then replace the default OctoberCMS requirements in your `composer.json` file with the following in order to download updates directly from the develop branch.

    "october/rain": "dev-develop as 1.0",
    "october/system": "dev-develop",
    "october/backend": "dev-develop",
    "october/cms": "dev-develop",
    "laravel/framework": "5.5.*@dev",

<a name="public-folder"></a>
### Using a public folder

For ultimate security in production environments you may configure your web server to use a **public/** folder to ensure only public files can be accessed. First you will need to spawn a public folder using the `october:mirror` command.

    php artisan october:mirror public/

This will create a new directory called **public/** in the project's base directory, from here you should modify the webserver configuration to use this new path as the home directory, also known as *wwwroot*.

> **Note**: The above command may need to be performed with System Administrator or *sudo* privileges. It should also be performed after each system update or when a new plugin is installed.

<a name="environment-config"></a>
## Environment configuration

<a name="base-environment"></a>
### Defining a base environment

It is often helpful to have different configuration values based on the environment the application is running in. You can do this by setting the `APP_ENV` environment variable which by default it is set to **production**. There are two common ways to change this value:

1. Set `APP_ENV` value directly with your webserver.

    For example, in Apache this line can be added to the `.htaccess` or `httpd.config` file:

        SetEnv APP_ENV "dev"

2. Create a **.env** file in the root directory with the following content:

        APP_ENV=dev

In both of the above examples, the environment is set to the new value `dev`. Configuration files can now be created in the path **config/dev** and will override the application's base configuration.

For example, to use a different MySQL database for the `dev` environment only, create a file called **config/dev/database.php** using this content:

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

<a name="domain-environment"></a>
### Domain driven environment

October supports using an environment detected by a specific hostname. You may place these hostnames in an environment configuration file, for example, **config/environment.php**.

Using this file contents below, when the application is accessed via **global.website.tld** the environment will be set to `global` and likewise for the others.

    <?php

    return [
        'hosts' => [
            'global.website.tld' => 'global',
            'local.website.tld' => 'local',
        ]
    ];

<a name="dotenv-configuration"></a>
### Converting to DotEnv configuration

As an alternative to the [base environment configuration](#base-environment) you may place common values in the environment instead of using configuration files. The config is then accessed using [DotEnv](https://github.com/vlucas/phpdotenv) syntax. Run the `october:env` command to move common config values to the environment:

    php artisan october:env

This will create an **.env** file in project root directory and modify configuration files to use `env` helper function. The first argument contains the key name found in the environment, the second argument contains an optional default value.

    'debug' => env('APP_DEBUG', true),

Your `.env` file should not be committed to your application's source control, since each developer or server using your application could require a different environment configuration.

It is also important that your `.env` file is not accessible to the public in production. To accomplish this, you should consider using a [public folder](#public-folder).
