# Composer

- [Introduction](#introduction)
    - [Development Branch](#development-branch)
- [Publishing Plugins or Themes](#product-composer-file)
- [Package Descriptions](#package-descriptions)
- [Marketplace Builds](#marketplace-builds)
- [Using Laravel Packages](#laravel-packages)
    - [Configuration Files](#laravel-config-files)
    - [Aliases & Service Providers](#laravel-aliases-service-providers)
    - [Migrations & Models](#laravel-migrations-models)

<a name="introduction"></a>
## Introduction

Using [Composer](https://getcomposer.org/) as an alternative package manager to using the standard one-click update manager is possible, however, there are some trade-offs to this approach and should only be considered by more advanced users and developers. See the console command on how to [first install October using composer](../console/commands#console-install-composer).

<a name="development-branch"></a>
### Development Branch

If you plan on submitting pull requests to the October CMS project via GitHub, or just want to stay up to date with the absolute latest version, we recommend switching your composer dependencies to point to the `develop` branch where all the latest improvements and bug fixes take place.

    "october/rain": "dev-develop as 1.0",
    "october/system": "dev-develop",
    "october/backend": "dev-develop",
    "october/cms": "dev-develop",
    "laravel/framework": "~6.0",

> **Note**: This is considered a bleeding edge copy of October and is only for the brave!

<a name="publishing-products"></a>
## Publishing Plugins or Themes

When publishing your plugins or themes to the marketplace, you may wish to also make them available via composer. An example `composer.json` file for a plugin is included below:

    {
        "name": "october/oc-demo-plugin",
        "type": "october-plugin",
        "description": "Demo OctoberCMS plugin",
        "keywords": ["october", "cms", "demo", "plugin"],
        "license": "MIT",
        "authors": [
            {
                "name": "Alexey Bobkov",
                "email": "hello@octobercms.com",
                "role": "Co-founder"
            }
        ],
        "require": {
            "php": ">=7.2",
            "composer/installers": "~1.0"
        }
    }

Be sure to start your package `name` with **oc-** and end it with **-plugin** or **-theme** respectively, this will help others find your package and is in  accordance with the [quality guidelines](../help/guidelines/developer#repository-naming).

The `type` field is a key definition for ensuring that your plugin or theme arrives at the correct location upon installation. Use the following types:

Product | Type
------- | -------------
Plugin  | `october-plugin`
Theme   | `october-theme`
Module  | `october-module`

> **Reminder**: Be sure to specify any dependencies in your composer file as you would using the  `$require` property found in the [plugin registration file](../plugin/registration#dependency-definitions)

<a name="package-descriptions"></a>
## Package Descriptions

There are many different moving parts that come together to make the October CMS platform work. Here we will describe the various packages you will likely encounter:

- **Modules** are the core packages that are included with October, you can think of them as "internal plugins" that provide core functionality. Modules use the package type `october-module` and are located within the `/modules` directory. They are loaded manually via configuration and at least one module must be present in the `cms.loadModules` configuration item for the system to operate.

- **Plugins** extend the core functionality of October and are packages of type `october-plugin`. They are located within the `/plugins` directory. The `System` module is responsible for the loading of plugins which happens automatically when found in the file system, unless they are explicitly disabled.

- **Themes** contain static file content that is used to manage the front end structure of your website and use the package type `october-theme`. They are located within the `/themes` directory. The `Cms` module is responsible for managing themes and determining what theme is currently active.

- **Vendor** packages are included via Composer in either the project's `/vendor` directory or can sometimes be found in plugin-specific `/vendor` directories. The project vendor directory takes priority over and plugin vendor directories that appear in the system.

<a name="marketplace-builds"></a>
## Marketplace Builds

When you publish your plugin or theme to the marketplace, the server will conveniently pull in all the packages defined in your composer file. This makes the product ready for others to use, even if they don't use composer. Here's how it works:

1. As a plugin or theme developer, you can define your external dependencies and packages in `composer.json`, including other plugins or themes.

2. The server will attempt to remove any core dependencies that are inherently available in the core, including Laravel, October and its related packages.

3. The server will run  `composer install` in your plugin or themes directory, pulling dependencies into the `vendor` directory, local to that package.

4. The files `composer.json` and `composer.lock` are then removed to prevent the package files from becoming duplicated and a potential double up of dependencies.

5. The final result is packaged up and ready for consumption by October CMS platforms using one-click updates.

It is a good idea not to include the `vendor` directory when publishing your plugin or theme to the marketplace, the server will handle this for you.

If you are developing with your plugin, you can run `composer update` from the root directory. A special package called `wikimedia/composer-merge-plugin` will scan the plugins directory and merge the dependencies in to the main composer file.

<a name="laravel-packages"></a>
## Using Laravel Packages

When including Laravel packages in OctoberCMS plugins there are a few things to take note of.

<a name="laravel-config-files"></a>
### Configuration Files

Laravel packages will often provide configuration files, and they will usually come with the instructions to publish these config files to the project config folder, usually something like `php artisan vendor:publish --tag=config`.

However, this can create problems with October's plugin oriented design, since there would now be random config files in the core `/config` directory. In order to solve this problem, it is recommended that you proxy the included package's configuration through your plugin instead.

You may place this code in your Plugin registration file and call it from the  the `boot()` method.

    public function bootPackages()
    {
        // Get the namespace code of the current plugin
        $pluginNamespace = str_replace('\\', '.', strtolower(__NAMESPACE__));

        // Locate the packages to boot
        $packages = \Config::get($pluginNamespace . '::packages');

        // Boot each package
        foreach ($packages as $name => $options) {
            // Apply the configuration for the package
            if (
                !empty($options['config']) &&
                !empty($options['config_namespace'])
            ) {
                Config::set($options['config_namespace'], $options['config']);
            }
        }
    }

Now you are free to provide the packages configuration values the same way you would with regular plugin configuration values.

    return [
        // Laravel Package Configuration
        'packages' => [
            'packagevendor/packagename' => [
                // The accessor for the config item, for example,
                // to access via Config::get('purifier.' . $key)
                'config_namespace' => 'purifier',

                // The configuration file for the package itself.
                // Copy this from the package configuration.
                'config' => [
                    'encoding'      => 'UTF-8',
                    'finalize'      => true,
                    'cachePath'     => storage_path('app/purifier'),
                    'cacheFileMode' => 0755,
                ],
            ],
        ],
    ];

Now the package configuration has been included natively in October CMS and the values can be changed normally using the [standard configuration approach](settings#file-configuration).

<a name="laravel-aliases-service-providers"></a>
### Aliases & Service Providers

Laravel packages will often use [Package Discovery](https://laravel.com/docs/5.5/packages#package-discovery) to register their Aliases and Service Providers through Composer automatically, but in case they don't you are able to provide that information in your plugin's `composer.json` file yourself and it will work.

If you want to prevent automatic package discovery for packages included by your plugin, this can be done by using the `extra.laravel.dont-discover` Composer file property, as specified by the Laravel documentation.

<a name="laravel-migrations-models"></a>
### Migrations & Models

Laravel packages that interact with the database will often include their own database migrations and Eloquent models. Ideally you should duplicate these migrations and models in to your plugin's directory to take advantage of the extended technology features found in October.

You should also make an effort to rename the tables to prefix them with your plugin's author code and name. For example, a table with the name `posts` should be renamed to `rainlab_blog_posts`.
