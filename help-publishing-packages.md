# Publishing Packages

- [Introduction](#introduction)
- [Publishing Plugins](#publishing-plugins)
- [Publishing Themes](#publishing-themes)
- [Declaring Dependencies](#dependencies)
- [Tagging a Release](#tagging-release)
- [Using Laravel Packages](#laravel-packages)
    - [Configuration Files](#laravel-config-files)
    - [Aliases & Service Providers](#laravel-aliases-service-providers)
    - [Migrations & Models](#laravel-migrations-models)

<a name="introduction"></a>
## Introduction

October CMS uses [Composer](https://getcomposer.org/) to publish packages and is fully compatible, so their documentation applies as an extension of this article. However, a composer version is not the same as an October CMS version and these need to be managed separately.

To publish your plugin or theme on the October CMS marketplace, you will need to first become an author and choose an author code. This code will determine the name of your packages and cannot be changed later.

Your package also must reside in a source control repository that can be accessed by the October CMS gateway, such as [GitHub](https://github.com/) or [BitBucket](https://bitbucket.org/). For private packages, the server can access them using the credentials you provide during the publishing process.

Be sure to start your package `name` with **oc-** and end it with **-plugin** or **-theme** respectively, this will help others find your package and is in  accordance with the [quality guidelines](../help/guidelines/developer#repository-naming).

<a name="publishing-plugins"></a>
## Publishing Plugins

When publishing your plugin the `composer.json` file should have this JSON content at a minimum. Notice that the package name must end with **-plugin** and include the `composer/installers` package as a dependency.

    {
        "name": "acme/blog-plugin",
        "type": "october-plugin",
        "description": "Enter a meaningful description here",
        "require": {
            "composer/installers": "~1.0"
        }
    }

<a name="publishing-themes"></a>
## Publishing Themes

When publishing your theme the `composer.json` file should have this JSON content at a minimum. Notice that the package name must end with **-theme** and include the `composer/installers` package as a dependency.

    {
        "name": "acme/boilerplate-theme",
        "type": "october-theme",
        "description": "Enter a meaningful description here",
        "require": {
            "composer/installers": "~1.0"
        }
    }

> **Reminder**: Be sure to specify any dependencies in your composer file as you would using the  `$require` property found in the [plugin registration file](../plugin/registration#dependency-definitions)

<a name="dependencies"></a>
## Declaring Dependencies

Plugins and themes alike can depend on other packages.

<a name="tagging-release"></a>
## Tagging a Release

Packages in October CMS follow semantic versioning and Composer uses git to determine the stability and impact of a given release.

Listing your tags

    $ git tag
    v1.0
    v2.0

Creating a tag

    git tag -a v2.0.1 -m "Version 2 is here!"

<a name="laravel-packages"></a>
## Using Laravel Packages

When including Laravel packages in October CMS plugins there are a few things to take note of.

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

By default, October CMS disables the loading of discovered packages through [Laravel's package discovery service](https://laravel.com/docs/6.x/packages#package-discovery), in order to allow packages used by plugins to be disabled if the plugin itself is disabled. Please note that packages defined in `app.providers` will still be loaded even if discovery is disabled.

> **NOTE:** It is possible to set `app.loadDiscoveredPackages` to `true` in the project configuration to enable automatic loading of these packages. This will result in packages being loaded, even if the plugin using them is disabled. This is **NOT RECOMMENDED.**

In order to manually register ServiceProviders and Aliases provided by external Laravel packages that are used by your plugins you should use the `App` facade and `AliasLoader` instance respectively:

```php
use App;
use Illuminate\Foundation\AliasLoader;
use System\Classes\Plugin as PluginBase;

class Plugin extends PluginBase
{
    public function register()
    {
        // Instantiate the AliasLoader
        $aliasLoader = AliasLoader::getInstance();

        // Register the aliases provided by the packages used by your plugin
        $aliasLoader->alias('Purifier', \Mews\Purifier\Facades\Purifier::class);

        // Register the service providers provided by the packages used by your plugin
        App::register(\Mews\Purifier\PurifierServiceProvider::class);
    }
}
```

<a name="laravel-migrations-models"></a>
### Migrations & Models

Laravel packages that interact with the database will often include their own database migrations and Eloquent models. Ideally you should duplicate these migrations and models to your plugin's directory and then rebase the provided Model classes to extend the base `\October\Rain\Database\Model` class instead of the base Laravel Eloquent model class to take advantage of the extended technology features found in October.

You should also make an effort to rename the tables to prefix them with your plugin's author code and name. For example, a table with the name `posts` should be renamed to `rainlab_blog_posts`.
