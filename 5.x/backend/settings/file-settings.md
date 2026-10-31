---
previousPath: extend/settings/file-settings.md
subtitle: Store plugin settings in configuration files that the application can override with its own files or environment variables.
---
# File Settings

File settings store plugin configuration in PHP files inside the plugin. The application can override the values with its own configuration files or environment variables. Use them for settings that rarely change and need no user interface.

```php
// plugins/acme/todo/config/config.php
return [
    'maxItems' => 10,
    'display' => 5
];
```

```php
$maxItems = Config::get('acme.todo::maxItems', 50);
```

## Creating a Configuration File

Plugin configuration files live in the **config** subdirectory of the plugin directory.

::: dir
├── plugins
|   └── acme
|       └── todo
|           └── `config`
|               ├── config.php  _← Configuration File_
|               └── custom.php  _← Configuration File_
:::

Each configuration file is a PHP script that defines and returns an **array**, like the **config.php** example at the top of this page.

## Reading Configuration Values

Use the `Config` facade to read the values defined in the configuration file. The first argument of the `get` method is the plugin code and the configuration name, in the format **acme.todo::maxItems**. The optional second argument is a default value to return if the configuration parameter does not exist.

```php
$maxItems = Config::get('acme.todo::maxItems', 50);
```

The file name affects the key name. A configuration file named **custom.php** prefixes the key name with `custom`, in the format **acme.todo::custom.maxItems**.

```php
$maxItems = Config::get('acme.todo::custom.maxItems', 50);
```

## Overriding Configuration Values

The application can override a plugin configuration file with a local configuration file that matches it. For example, to override **plugins/acme/todo/config/config.php**, create a file called **config/acme/todo/config.php**.

::: dir
├── config
|   └── `acme`
|       └── `todo`
|           └── config.php  _← Override File_
:::

The override file only needs to return the values you want to change.

```php
return [
    'maxItems' => 20
];
```

### Using Environment Variables

To use separate configurations across environments, such as **dev** and **production**, use the `env()` helper to read the value from an environment variable. The `env()` function takes the environment variable name as the first argument and an optional default value as the second.

```php
<?php

return [
    'maxItems' => env('ACME_TODO_MAX_ITEMS', 25)
];
```

The `maxItems` value now changes when the `ACME_TODO_MAX_ITEMS` environment variable is set, for example inside the application's **.env** file. See the [configuration article](../../setup/configuration.md) to learn how to change these values for each environment.

```ini
ACME_TODO_MAX_ITEMS=10
```

#### See Also

::: also
* [Plugin Settings](./introduction.md)
* [Model Settings](./model-settings.md)
* [Common Configuration](../../setup/configuration.md)
:::
