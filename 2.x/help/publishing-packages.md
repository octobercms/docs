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

October CMS uses [Composer](https://getcomposer.org/) to publish packages and is fully compatible, so their documentation applies as an extension of this article.

To publish your plugin or theme on the October CMS marketplace, you will need to first become an author and choose an author code. This code will determine the name of your packages and cannot be changed later.

Your package should reside in a source control repository that can be accessed by the October CMS gateway, such as [GitHub](https://github.com/) or [BitBucket](https://bitbucket.org/). For private packages, the server can access them using the credentials you provide during the publishing process.

Be sure to start your package `name` ends with **-plugin** or **-theme** respectively, this will help others find your package and is in accordance with the [Developer Guide](../../help/guidelines/developer#package-naming).

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

Plugins and themes alike can require a specific version of October CMS and also depend on other packages, simply include them in your composer.json file.

#### Requiring a Version of October CMS

Simply require the `october/system` package to the desired [target version pattern](https://getcomposer.org/doc/articles/versions.md). The following will require that the platform installation uses version 2.1 of October CMS.

    "require": {
        "october/system": "^2.1"
    }

#### Requiring Another Plugin

Navigate to your theme or plugin directory and open the composer.json file to include a dependency and its target version. The following will include the Acme.Blog plugin with a [version range of 1.2](https://getcomposer.org/doc/articles/versions.md).

    "require": {
        "acme/blog-plugin": "^1.2"
    }

You should also make sure that this package is included in the `$require` property found in the [plugin registration file](../plugin/registration#dependency-definitions).

#### Requiring Another Theme

Navigate to your theme or plugin directory and open the composer.json file to include a dependency and its target version. The following will include the Acme.Vanilla theme with a [version range of 1.2](https://getcomposer.org/doc/articles/versions.md).

    "require": {
        "acme/vanilla-theme": "^1.2"
    }

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

In all cases, you should have a copy of your private plugin or theme stored somewhere available to the main project. The `plugin:install` and `theme:install` commands can be used to install private plugins from either a remote or local source. This will add the location to your composer file and install it like any other package.

#### Install from a remote source

Use the `--from` option to specify the location to your remote source when installing.

    php artisan plugin:install Acme.Blog --from=git@github.com:acme/blog-plugin.git

To use a specific version or branch, use the `--want` option, for example to request the **develop** branch version.

    php artisan plugin:install Acme.Blog --from=git@github.com:acme/blog-plugin.git --want=dev-develop

> **Note**: If you use the `git@` address of a repository, composer will prefer the source version and clone the repository so you can continue to push updates normally.

#### Install from a local source

To install a plugin using composer from the same project source.

    php artisan plugin:install Acme.Blog --from=./plugins/acme/blog

You may also use a source found on a local or network drive.

    php artisan plugin:install Acme.Blog --from=/home/sam/private-plugins/acme-blog

<a name="laravel-packages"></a>
## Using Laravel Packages

When including Laravel packages in October CMS plugins there are a few things to take note of.

<a name="laravel-config-files"></a>
### Configuration Files

Laravel packages will often provide configuration files, you should duplicate this configuration to your plugin's directory. For example, if the file was named **purifier.php** and contained some basic configuration values.

    return [
        'encoding'      => 'UTF-8',
        'finalize'      => true,
        'cachePath'     => storage_path('app/purifier'),
        'cacheFileMode' => 0755,
    ];

Copy this file to your plugin directory, for example, **plugins/acme/blog/config/purifier.php**. It is important to copy and maintain the entire file as any missing keys will not be inherited from the base configuration.

Next you should transfer the contents of your plugin's configuration to the package configuration inside the `boot()` method.

    public function boot()
    {
        Config::set('purifier', Config::get('acme.blog::purifier'));
    }

This will set all the package config values to be that of your plugin config values. The following values would then be equal.

    Config::get('purifier.encoding') === Config::get('acme.blog::purifier.encoding');

Now you are free to provide the packages configuration values the same way you would with regular plugin configuration values and the [standard configuration approach](settings#file-configuration).

<a name="laravel-aliases-service-providers"></a>
### Aliases & Service Providers

If the Laravel package contains any Service Providers and Aliases, you should manually register them in your plugins using the the `App` facade in the `register()` method.

    public function register()
    {
        // Register the aliases provided by the packages used by your plugin
        App::registerClassAlias('Purifier', \Mews\Purifier\Facades\Purifier::class);

        // Register the service providers provided by the packages used by your plugin
        App::register(\Mews\Purifier\PurifierServiceProvider::class);
    }

<a name="laravel-migrations-models"></a>
### Migrations & Models

Laravel packages that interact with the database will often include their own database migrations and Eloquent models. You should duplicate these migrations and models to your plugin's directory.

Be sure to change the Model classes to extend the base `\October\Rain\Database\Model` class instead of the base Laravel Eloquent model class to take advantage of the extended technology features found in October CMS.

It is also a good idea to rename the database tables and prefix them with your author code and plugin name. For example, a table with the name `posts` should be renamed to `rainlab_blog_posts`.
