# Publishing Packages

- [Introduction](#introduction)
    - [Publishing Plugins](#publishing-plugins)
    - [Publishing Themes](#publishing-themes)
    - [Declaring Dependencies](#dependencies)
    - [Tagging a Release](#tagging-release)
- [Private Plugins and Themes](#private-plugins-themes)
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
### Publishing Plugins

When publishing your plugin the `composer.json` file should have this JSON content at a minimum. Notice that the package name must end with **-plugin** and include the `composer/installers` package as a dependency.

    {
        "name": "acme/blog-plugin",
        "type": "october-plugin",
        "description": "Enter a meaningful description here",
        "require": {
            "composer/installers": "~1.0"
        }
    }

A plugin with the code **Acme.Blog** will have a composer package name of `acme/blog-plugin` and will be installed in the **plugins/acme/blog** directory.

<a name="publishing-themes"></a>
### Publishing Themes

When publishing your theme the `composer.json` file should have this JSON content at a minimum. Notice that the package name must end with **-theme** and include the `composer/installers` package as a dependency.

    {
        "name": "acme/boilerplate-theme",
        "type": "october-theme",
        "description": "Enter a meaningful description here",
        "require": {
            "composer/installers": "~1.0"
        }
    }

A plugin with the code **Acme.Boilerplate** will have a composer package name of `acme/boilerplate-theme` and be installed in the **themes/boilerplate** directory.

<a name="dependencies"></a>
### Declaring Dependencies

Plugins and themes alike can depend on other packages. Use the `composer require` command to include them in your composer.json file.

> **Note**: The `--no-update` switch should be used to instruct composer to only include a reference to the dependency. Otherwise, the files will be installed and included in your package source.

#### Requiring another plugin

Navigate to your theme or plugin directory and use `composer require` to include it as a dependency.

    composer require --no-update acme/blog-plugin

You should also make sure that this package is included in the `$require` property found in the [plugin registration file](../plugin/registration#dependency-definitions).

#### Requiring another theme

Navigate to your theme or plugin directory and use `composer require` to include it as a dependency.

    composer require --no-update acme/vanilla-theme

Make sure that this package is included in the `require` property found in the [theme information file](../themes/development#dependencies).

<a name="tagging-release"></a>
### Tagging a Release

Packages in October CMS follow semantic versioning and Composer uses git to determine the stability and impact of a given release.

#### Listing your tags

Use the `git tag` command to list the existing tags for your package.

    $ git tag
    v1.0
    v2.0

#### Creating a new tag

To create a new tag add (`-a`) the version with an optional (`-m`) message.

    git tag -a v2.0.1 -m "Version 2 is here!"

In addition to tagging, you should also increment the version file found in your [plugin](../plugin/updates) or [theme](../themes/development#version-file).

<a name="private-plugins-themes"></a>
## Private Plugins and Themes

Composer allows you to add private repositories from GitHub and other providers to your October CMS projects. Make sure you have followed the same instructions for [publishing plugins](#publishing-plugins) and [themes](#publishing-themes) respectively.

In all cases, you should have a copy of your private plugin or theme stored somewhere outside of the main project. The `plugin:install` and `theme:install` commands can be used to install private plugins from either a remote or local source. This will add the location to your composer file and install it like any other package.

#### Install from a remote source

Use the `--source` option to specify the location to your remote source when installing.

    php artisan plugin:install Acme.Blog --source=git@github.com:acme/blog-plugin.git

#### Install from a local source

You may also use a source found on a local or network drive.

    php artisan plugin:install Acme.Blog --source=../private-plugins/acme-blog

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

By default, October CMS will load discovered packages through [Laravel's package discovery service](https://laravel.com/docs/6.x/packages#package-discovery), in order to allow packages used by plugins to be disabled if the plugin itself is disabled. Please note that packages defined in `app.providers` will still be loaded even if discovery is disabled.

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
