# File Settings

File settings keep setting values stored in files and can be overriden by the environment variables or application files.

## Config File Structure

Plugins can use file-based configuration files in the **config** subdirectory of the plugin directory. Below is an example of the plugin's **config** directory.

::: dir
├── plugins
|   └── acme
|       └── todo
|           └── `config`
|               ├── config.php  _← Configuration File_
|               └── custom.php  _← Configuration File_
:::

The configuration files are PHP scripts that define and return an **array**. The following is an example configuration file **config.php**.

```php
return [
    'maxItems' => 10,
    'display' => 5
];
```

## Accessing Configuration Values

Use the `Config` facade for accessing the configuration values defined in the configuration file. The `get` method accepts the plugin and the configuration name (first argument) in the following format: **acme.demo::maxItems**. You may also define a default value (second argument) to return if the configuration parameter doesn't exist.

```php
$maxItems = Config::get('acme.demo::maxItems', 50);
```

Using a different filename for the configuration file will affects the key name. For example, a configuration file named **custom.php** will prefix the key name with `custom`, using the following format: **acme.demo::custom.maxItems**. The following example is based on a configuration file named **custom.php**.

```php
$maxItems = Config::get('acme.demo::custom.maxItems', 50);
```

## Overriding Configuration Values

A plugin configuration file can be overridden by the application by creating a local configuration file to match, for example, to override **plugins/acme/demo/config/config.php**, create a file called **config/acme/todo/config.php**.


::: dir
├── config
|   └── `acme`
|       └── `todo`
|           └── config.php  _← Override File_
:::

Inside the overridden configuration file you can return only values you want to override.

```php
return [
    'maxItems' => 20
];
```

If you want to use separate configurations across different environments (eg: **dev**, **production**), consider using the `env()` helper to pull the value from an environment variable. The `env()` function accepts the environment variable name (first argument) and an optional default value if the variable doesn't exist (second argument).

```php
<?php

return [
    'maxItems' => env('ACME_TODO_MAX_ITEMS', 25)
];
```

This will change the `maxItems` value when the environment variable `ACME_TODO_MAX_ITEMS` is set to any other value. For example, inside the **.env** file for the application. See the [configuration article](../../setup/configuration.md) to learn how to change these values depending on the environment.

```ini
ACME_TODO_MAX_ITEMS=10
```

#### See Also

::: also
* [Common Configuration](../../setup/configuration.md)
:::
