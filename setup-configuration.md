# App configuration

- [Application configuration](#app-configuration)
    - [Debug mode](#debug-mode)
    - [Safe mode](#safe-mode)
    - [CSRF protection](#csrf-protection)
    - [Bleeding edge updates](#edge-updates)
- [Environment configuration](#environment-config)
    - [Defining a base environment](#base-environment)
    - [Domain driven environment](#domain-environment)

All of the configuration files for October are stored in the **config/** directory. Each option is documented, so feel free to look through the files and get familiar with the options available to you.

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
    "laravel/framework": "~6.0",

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
