# Using Laravel Packages

When including Laravel packages in October CMS plugins there are a few things to take note of.

### Configuration Files

Laravel packages will often provide configuration files, you should duplicate this configuration to your plugin's directory. For example, if the file was named **purifier.php** and contained some basic configuration values.

```php
return [
    'encoding' => 'UTF-8',
    'finalize' => true,
    'cachePath' => storage_path('app/purifier'),
    'cacheFileMode' => 0755,
];
```

Copy this file to your plugin directory, for example, **plugins/acme/blog/config/purifier.php**. It is important to copy and maintain the entire file as any missing keys will not be inherited from the base configuration.

Next you should transfer the contents of your plugin's configuration to the package configuration inside the `boot()` method.

```php
public function boot()
{
    Config::set('purifier', Config::get('acme.blog::purifier'));
}
```

This will set all the package config values to be that of your plugin config values. The following values would then be equal.

```php
Config::get('purifier.encoding') === Config::get('acme.blog::purifier.encoding');
```

Now you are free to provide the packages configuration values the same way you would with regular plugin configuration values and the [standard configuration approach](../settings/file-settings.md).

### Aliases & Service Providers

If the Laravel package contains any Service Providers and Aliases, you should manually register them in your plugins using the the `App` facade in the `register()` method.

```php
public function register()
{
    // Register the aliases provided by the packages used by your plugin
    App::registerClassAlias('Purifier', \Mews\Purifier\Facades\Purifier::class);

    // Register the service providers provided by the packages used by your plugin
    App::register(\Mews\Purifier\PurifierServiceProvider::class);
}
```

### Migrations & Models

Laravel packages that interact with the database will often include their own database migrations and Eloquent models. You should duplicate these migrations and models to your plugin's directory.

Be sure to change the Model classes to extend the base `October\Rain\Database\Model` class instead of the base Laravel Eloquent model class to take advantage of the extended technology features found in October CMS.

It is also a good idea to rename the database tables and prefix them with your author code and plugin name. For example, a table with the name `posts` should be renamed to `rainlab_blog_posts`.
