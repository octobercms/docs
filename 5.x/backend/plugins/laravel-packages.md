---
previousPath: extend/resources/using-laravel-packages.md
subtitle: Use a Laravel package inside a plugin by registering its service providers, copying its configuration and adapting its models.
---
# Using Laravel Packages

Most Laravel packages work inside October CMS plugins. Register the package's service providers and aliases in your plugin, then move its configuration, migrations and models into the plugin where needed.

```php
public function register()
{
    App::registerClassAlias('Purifier', \Mews\Purifier\Facades\Purifier::class);

    App::register(\Mews\Purifier\PurifierServiceProvider::class);
}
```

## Registering Service Providers and Aliases

If a Laravel package contains service providers and aliases, register them in your plugin's `register()` method using the `App` facade, as shown above. Call `App::registerClassAlias` for each alias and `App::register` for each service provider.

## Providing Package Configuration

Laravel packages often include configuration files. Copy the package configuration into your plugin's directory. For example, a package file named **purifier.php** might contain these values.

```php
return [
    'encoding' => 'UTF-8',
    'finalize' => true,
    'cachePath' => storage_path('app/purifier'),
    'cacheFileMode' => 0755,
];
```

Copy this file to your plugin directory, for example, **plugins/acme/blog/config/purifier.php**. Copy and maintain the entire file, because missing keys are not inherited from the base configuration.

Next, pass your plugin's configuration to the package configuration inside the `boot()` method.

```php
public function boot()
{
    Config::set('purifier', Config::get('acme.blog::purifier'));
}
```

This sets all the package configuration values to your plugin's values. The following values are now equal.

```php
Config::get('purifier.encoding') === Config::get('acme.blog::purifier.encoding');
```

You can now manage the package configuration the same way as regular plugin configuration, using the [standard configuration approach](../settings/file-settings.md).

## Adapting Migrations and Models

Laravel packages that use the database often include their own migrations and Eloquent models. Copy these migrations and models into your plugin's directory.

Change the model classes to extend `October\Rain\Database\Model` instead of the Laravel Eloquent model class. This gives them the extra features of [October CMS models](../data/models.md).

Rename the database tables with a prefix of your author code and plugin name. For example, rename a table called `posts` to `rainlab_blog_posts`. Then add the migrations to your plugin's [version history](./versions.md).

#### See Also

::: also
* [Plugin Structure](./introduction.md)
* [File Settings](../settings/file-settings.md)
* [Publishing Packages](./publishing-packages.md)
:::
