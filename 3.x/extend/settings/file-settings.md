# File Settings

<a id="oc-file-based-configuration"></a>
## File-based Configuration

Plugins can have a configuration file **config.php** in the **config** subdirectory of the plugin directory. The configuration files are PHP scripts that define and return an **array**. Example configuration file **plugins/acme/demo/config/config.php**.

```php
<?php

return [
    'maxItems' => 10,
    'display' => 5
];
```

Use the `Config` class for accessing the configuration values defined in the configuration file. The `Config::get($name, $default = null)` method accepts the plugin and the parameter name in the following format: **Acme.Demo::maxItems**. The second optional parameter defines the default value to return if the configuration parameter doesn't exist.

```php
$maxItems = Config::get('acme.demo::maxItems', 50);
```

You may also use a different filename for the configuration file and this affects the key name. For example, a configuration file named **custom.php** will prefix the key name with `custom`, using the following format: **Acme.Demo::custom.maxItems**. Example configuration file **plugins/acme/demo/config/custom.php**.

```php
$maxItems = Config::get('acme.demo::custom.maxItems', 50);
```

### Overriding Configuration Values

A plugin configuration file can be overridden by the application by creating a local configuration file to match, for example, to override **plugins/acme/demo/config/config.php**, create a file called **config/acme/todo/config.php**. Inside the overridden configuration file you can return only values you want to override.

```php
<?php

return [
    'maxItems' => 20
];
```

If you want to use separate configurations across different environments (eg: **dev**, **production**), consider using the `env()` helper to pull the value from an environment variable. The `env($name, $default = null)` function accepts the environment variable name and a default value if the variable doesn't exist.

```php
<?php

return [
    'maxItems' => env('ACME_TODO_MAX_ITEMS', 25)
];
```

This will change the `maxItems` value when the environment variable `ACME_TODO_MAX_ITEMS` is set to any other value.
