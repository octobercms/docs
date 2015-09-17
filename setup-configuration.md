# App configuration

- [Environment configuration](#environment-config)
- [Bleeding edge updates](#edge-updates)
- [CSRF protection](#csrf-protection)

<a name="environment-config" class="anchor" href="#environment-config"></a>
## Environment configuration

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

<a name="edge-updates" class="anchor" href="#edge-updates"></a>
## Bleeding edge updates

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

<a name="csrf-protection" class="anchor" href="#csrf-protection"></a>
## CSRF protection

October provides an easy method of protecting your application from cross-site request forgeries. First a random token is placed in your user's session. Then when a [opening form tag is used](../services/html#form-tokens) the token is added to the page and submitted back with each request.

While CSRF protection is disabled by default, you can enable it with the `enableCsrfProtection` parameter in the `config/cms.php` configuration file.