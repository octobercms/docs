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
    - [Environment configuration](#environment-config)
- [Advanced configuration](#advanced-configuration)
    - [Using a public folder](#public-folder)
    - [Extended environment configuration](#environment-config-extended)

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

Use the following code in **server** section. If you have installed October into a subdirectory, replace `/` with the directory October was installed under:

    location / {
        try_files $uri /index.php$is_args$args;
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

<a name="lighttpd-configuration"></a>
### Lighttpd configuration

If your webserver is running Lighttpd you can use the following configuration to run OctoberCMS. Open your site configuration file with your favorite editor.

`nano /etc/lighttpd/conf-enabled/sites.conf`

Paste the following code in the editor and change the **host address** and  **server.document-root** to match your project.

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

<a name="iis-configuration"></a>
### IIS configuration

If your webserver is running Internet Information Services (IIS) you can use the following in your **web.config** configuration file to run OctoberCMS.

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

While CSRF protection is disabled by default, you can enable it with the `enableCsrfProtection` parameter in the `config/cms.php` configuration file.

<a name="edge-updates"></a>
### Bleeding edge updates

The October platform and some plugins will implement changes in two stages to ensure overall stability and integrity of the platform. This means they have a *test build* in addition to the default *stable build*.

You can instruct the platform to prefer test builds by changing the `edgeUpdates` parameter in the `config/cms.php` configuration file.

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

<a name="environment-config"></a>
### Environment configuration

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

<a name="advanced-configuration"></a>
## Advanced configuration

<a name="public-folder"></a>
### Using a public folder

For ultimate security in production environments you may configure your web server to use a **public/** folder to ensure only public files can be accessed. First you will need to spawn a public folder using the `october:mirror` command.

    php artisan october:mirror public/

This will create a new directory called **public/** in the project's base directory, from here you should modify the webserver configuration to use this new path as the home directory, also known as *wwwroot*.

> **Note**: The above command may need to be performed with System Administrator or *sudo* privileges. It should also be performed after each system update or when a new plugin is installed.

<a name="environment-config-extended"></a>
### Extended environment configuration

As an alternative to the standard [environment configuration](#environment-config) you may place common values in the environment instead of using configuration files. The config is then accessed using [DotEnv](https://github.com/vlucas/phpdotenv) syntax. Run the `october:env` command to move common config values to the environment:

    php artisan october:env

This will create an **.env** file in project root directory and modify configuration files to use `env` helper function. The first argument contains the key name found in the environment, the second argument contains an optional default value.

    'debug' => env('APP_DEBUG', true),

Your `.env` file should not be committed to your application's source control, since each developer or server using your application could require a different environment configuration.
