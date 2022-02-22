# Settings & Config

There are two ways to configure plugins - with back-end settings forms and with configuration files. Using database settings with back-end pages provide a better user experience, but they carry more overhead for the initial development. File-based configuration is suitable for configuration that is rarely modified.

## Database Settings

You can create models for storing settings in the database by implementing the `SettingsModel` behavior in a model class. This model can be used directly for creating the back-end settings form. You don't need to create a database table and a controller for creating the back-end settings forms based on the settings model.

The settings model classes should extend the Model class and implement the `\System\Behaviors\SettingsModel` behavior. The settings models, like any other models, should be defined in the **models** subdirectory of the plugin directory. The model from the next example should be defined in the `plugins/acme/demo/models/Settings.php` script.

```php
<?php namespace Acme\Demo\Models;

use Model;

class Settings extends Model
{
    public $implement = [\System\Behaviors\SettingsModel::class];

    // A unique code
    public $settingsCode = 'acme_demo_settings';

    // Reference to field configuration
    public $settingsFields = 'fields.yaml';
}
```

The `$settingsCode` property is required for settings models. It defines the unique settings key which is used for saving the settings to the database.

The `$settingsFields` property is required if are going to build a back-end settings form based on the model. The property specifies a name of the YAML file containing the form fields definition. The form fields are described in the [Backend forms](../backend/forms.md) article. The YAML file should be placed to the directory with the name matching the model class name in lowercase. For the model from the previous example the directory structure would look like this:

```
plugins/
    acme/
    demo/
        models/
        settings/        <=== Files Directory
            fields.yaml  <=== Form Fields
        Settings.php     <=== Script
```

Settings models [can be registered](#backend-settings-pages) to appear on the **back-end Settings page**, but it is not a requirement - you can set and read settings values like any other model.

### Writing to a Settings Model

The settings model has the static `set` method that allows to save individual or multiple values. You can also use the standard model features for setting the model properties and saving the model.

```php
use Acme\Demo\Models\Settings;

// Set a single value
Settings::set('api_key', 'ABCD');

// Set an array of values
Settings::set(['api_key' => 'ABCD']);

// Set object values
$settings = Settings::instance();
$settings->api_key = 'ABCD';
$settings->save();
```

### Reading From a Settings Model

The settings model has the static `get` method that enables you to load individual properties. Also, when you instantiate a model with the `instance` method, it loads the properties from the database and you can access them directly.

```php
// Outputs: ABCD
echo Settings::instance()->api_key;

// Get a single value
echo Settings::get('api_key');

// Get a value and return a default value if it doesn't exist
echo Settings::get('is_activated', true);
```

## Backend Settings Pages

The back-end contains a dedicated area for housing settings and configuration, it can be accessed by clicking the <strong>Settings</strong> link in the main menu. The Settings page contains a list of links to the configuration pages registered by the system and other plugins.

### Settings Link Registration

The back-end settings navigation links can be extended by overriding the `registerSettings` method inside the [Plugin registration class](registration.md#oc-registration-file). When you create a configuration link you have two options - create a link to a specific back-end page, or create a link to a settings model. The next example shows how to create a link to a back-end page.

```php
public function registerSettings()
{
    return [
        'location' => [
            'label' => 'Locations',
            'description' => 'Manage available user countries and states.',
            'category' => 'Users',
            'icon' => 'icon-globe',
            'url' => Backend::url('acme/user/locations'),
            'order' => 500,
            'keywords' => 'geography place placement'
        ]
    ];
}
```

> **Note**: Backend settings pages should [set the settings context](#setting-the-page-navigation-context) in order to mark the corresponding settings menu item active in the System page sidebar. Settings context for settings models is detected automatically.

The following example creates a link to a settings model. Settings models is a part of the settings API which is described above in the [Database settings](#database-settings) section.

```php
public function registerSettings()
{
    return [
        'settings' => [
            'label' => 'User Settings',
            'description' => 'Manage user based settings.',
            'category' => 'Users',
            'icon' => 'icon-cog',
            'class' => \Acme\User\Models\Settings::class,
            'order' => 500,
            'keywords' => 'security location',
            'permissions' => ['acme.users.access_settings']
        ]
    ];
}
```

The optional `keywords` parameter is used by the settings search feature. If keywords are not provided, the search uses only the settings item label and description.

### Setting the Page Navigation Context

Just like [setting navigation context in the controller](../backend/controllers-ajax.md#oc-setting-the-navigation-context), Back-end settings pages should set the settings navigation context. It's required in order to mark the current settings link in the System page sidebar as active. Use the `System\Classes\SettingsManager` class to set the settings context. Usually it could be done in the controller constructor:

```php
public function __construct()
{
    parent::__construct();

    [...]

    BackendMenu::setContext('October.System', 'system', 'settings');
    SettingsManager::setContext('You.Plugin', 'settings');
}
```

The first argument of the `setContext` method is the settings item owner in the following format: **author.plugin**. The second argument is the setting name, the same as you provided when [registering the back-end settings page](#settings-link-registration).

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
