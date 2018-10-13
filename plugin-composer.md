# Composer

- [Introduction](#introduction)
- [Composer File](#composer-file)
- [Dependency Loading](#dependency-loading)
- [Marketplace](#marketplace)
- [Laravel Packages](#laravel-packages)
    - [Configuration Files](#laravel-config-files)
    - [Aliases & Service Providers](#laravel-aliases-service-providers)
    - [Migrations & Models](#laravel-migrations-models)

<a name="introduction"></a>
## Introduction

OctoberCMS uses [Composer](https://getcomposer.org/) as the package manager of choice. Dependencies on Marketplace plugins should be defined with the `$require` property of the [plugin registration file](../plugin/registration#dependency-definitions) and dependencies on third party packages should be defined in the plugin's specific `composer.json file`.


<a name="composer-file"></a>
## Composer File

An example `composer.json` file for a plugin is included below:

```json
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
        },
        {
            "name": "Samuel Georges",
            "email": "hello@octobercms.com",
            "role": "Co-founder"
        },
        {
            "name": "Luke Towers",
            "email": "octobercms@luketowers.ca",
            "role": "Core maintainer"
        }
    ],
    "require": {
        "php": ">=7.0",
        "composer/installers": "~1.0"
    }
}
```

Two important properties to note are the `name` (the package name should be prefixed with `oc-` & suffixed with `-plugin`, in accordance with the [quality guidelines](http://octobercms.com/help/guidelines/developer#repository-naming)); and the `type` (the type `october-plugin` is used to indicate to the `composer/installers` package how to actually install the dependency).


<a name="dependency-loading"></a>
## Dependency Loading

OctoberCMS loads many different types of dependencies in a few different ways.

**Modules** can be thought of as "internal plugins" and are packages of type `october-module`. They are located within the `/modules` directory and can be included with Composer. A module must be present in the `cms.loadModules` configuration item to be loaded.

**Plugins** extend the core functionality of October and are packages of type `october-plugin`. They are located within the `/plugins` directory and can be included with Composer. The `System` module controls the loading of plugins and plugins must not be marked as disabled in order to load.

**Themes** are used by the `CMS` module to present the data controlled by that module and are packages of type `october-theme`. They are located within the `/themes` directory and can be included with Composer. The `CMS` module controls which theme is currently active and used to display the content controlled by the `CMS` module. Static file content is stored within the theme that is was created in.

**All other packages** are included via Composer in either the project's `/vendor` directory or plugin-specific `/vendor` directories.


<a name="marketplace"></a>
## Marketplace

As the [marketplace](https://octobercms.com/plugins) needs to support all configurations of OctoberCMS (those that use Composer and those that don't), it targets the lowest common denominator of users: those that do not use composer at all. As such, the build process takes a few extra steps to prepare plugins for those users.

1. Plugin developers define their external dependencies in `composer.json` and their Marketplace plugin dependencies in the `$require` property of the [plugin registration file](../plugin/registration#dependency-definitions)
2. Dependencies that are already included in a base OctoberCMS instance are injected into the [`replace` property of `composer.json`](https://getcomposer.org/doc/04-schema.md#replace) in order to prevent including any dependencies that are already included in every OctoberCMS instance (i.e. Laravel, October itself, etc).
3. `composer install` is run in the plugin directory, pulling plugin dependencies into a plugin-specific `vendor` directory.
4. `composer.json` & `composer.lock` are removed to prevent projects that use Composer from accidentally double including dependencies by merging those files in with the core `composer.json` when running `composer update` event though this plugin's dependencies are already included in the plugin specific `vendor` directory.
5. The final result is packaged up and ready for consumption by the OctoberCMS updater through the Marketplace API.

Because of this build process, developers should note a few things:

1. If they are including dependencies in their plugins they should ensure that a `composer.json` file is present and the `/vendor` directory is not committed to the repository.
2. If they are using Composer for their project they should always update their plugin dependencies from the project root so that the `wikimedia/composer-merge-plugin` included by the base OctoberCMS `composer.json` file can include the plugin dependencies into the entire project dependencies.
3. If they are using Marketplace plugins in their project that support Composer, and they use Composer, they should instead install those plugins using Composer.


<a name="laravel-packages"></a>
## Laravel Packages

When including Laravel packages in OctoberCMS plugins there are a few things to take note of.


<a name="laravel-config-files"></a>
### Configuration Files

Laravel packages will often provide configuration files, and they will usually come with the instructions to publish these config files to the project config folder, usually something like `php artisan vendor:publish --tag=config`. However, this is not the October way of doing things, as there would now be random package's config files in the project's `/config` directory with no obvious tie to the plugin that introduced them. In order to solve this problem, it is recommended that developer's proxy their included package's configuration through the plugin that includes the package. See the following code examples for how to perform the proxying:

**Code to put in the `boot()` method of your Plugin registration file**
```php
use Config;

/**
 * Boots (configures and registers) any packages found within this plugin's packages.load configuration value
 *
 * @see https://luketowers.ca/blog/how-to-use-laravel-packages-in-october-plugins
 * @author Luke Towers <octobercms@luketowers.ca>
 */
public function bootPackages()
{
    // Get the namespace of the current plugin to use in accessing the Config of the plugin
    $pluginNamespace = str_replace('\\', '.', strtolower(__NAMESPACE__));

    // Get the packages to boot
    $packages = Config::get($pluginNamespace . '::packages');

    // Boot each package
    foreach ($packages as $name => $options) {
        // Setup the configuration for the package, pulling from this plugin's config
        if (!empty($options['config']) && !empty($options['config_namespace'])) {
            Config::set($options['config_namespace'], $options['config']);
        }
    }
}
```

**How to structure your plugin's config file (/plugin/config/config.php):**
```php
return [
    // This contains the Laravel Packages that you want this plugin to utilize listed under their package identifiers
    'packages' => [
        'packagevendor/packagename' => [
            // The namespace to set the configuration under. For this example, this package accesses
            // it's config via config('purifier.' . $key), so the namespace 'purifier' is what we put here
            'config_namespace' => 'purifier',

            // The configuration file for the package itself. Start this out by copying the default
            // one that comes with the package and then modifying what you need.
            'config' => [
                'encoding'      => 'UTF-8',
                'finalize'      => true,
                'cachePath'     => storage_path('app/purifier'),
                'cacheFileMode' => 0755,
            ],
        ],
    ],
];
```

Now the configuration for the packages introduced by your plugin lives within your plugin and can be [overridden](settings#file-configuration) at the project level in the normal, OctoberCMS way.


<a name="laravel-aliases-service-providers"></a>
### Aliases & Service Providers

Laravel packages will often use [Package Discovery](https://laravel.com/docs/5.5/packages#package-discovery) to register their Aliases and Service Providers through Composer automatically, but in case they don't you are able to provide that information in your plugin's `composer.json` file yourself and it will work. You might also desire to prevent automatic package discovery for packages included by your plugin, this is done by using the `extra.laravel.dont-discover` Composer file property, documented in the Laravel documentation on package discovery.


<a name="laravel-migrations-models"></a>
### Migrations & Models

Laravel packages that interact with the database will often include their own database migrations and Eloquent models. In an ideal world, developers should replace these migration files and Eloquent models with ones that are included directly in the plugin itself. The reason for this is to make the overall plugin better integrated with October; with things like extending the October `Model` class instead of the Laravel one (making all OctoberCMS model functionality available) and properly plugin author & name prefixing the database tables.
