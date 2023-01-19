# Model Settings

Model settings keep values stored in the database and can be overriden by the user interface in the backend panel.

## Database Settings

Plugins can use database-driven configuration using models for storing settings in the database by implementing the `SettingsModel` behavior in a model class. This model can be used directly for creating the backend settings form. You don't need to create a database table and a controller for creating the backend settings forms based on the settings model. An example of a model setting directory structure:

::: dir
├── plugins
|   └── acme
|       └── demo
|           ├── models
|           |   ├── usersetting  _← Config Directory_
|           |   |   └── fields.yaml  _← Form Fields_
|           |   └── `UserSetting.php`  _← Model Class_
|           └── Plugin.php
:::

Settings models can be registered to appear on the [settings area in the backend panel](./settings.md), but it is not a requirement - you can set and read settings values like any other model.

### Model Class Definition

The settings model classes should extend the Model class and implement the `System\Behaviors\SettingsModel` [behavior](../system/behaviors.md). The settings models, like any other models, should be defined in the **models** subdirectory of the plugin directory. The model from the next example should be defined in the **plugins/acme/demo/models/UserSetting.php** file.

```php
namespace Acme\Demo\Models;

class UserSetting extends \Model
{
    public $implement = [
        \System\Behaviors\SettingsModel::class
    ];

    public $settingsCode = 'acme_demo_settings';

    public $settingsFields = 'fields.yaml';
}
```

The `$settingsCode` property is required for settings models. It defines the unique settings key which is used for saving the settings to the database.

The `$settingsFields` property is required if you are going to build a backend settings form based on the model. The property specifies a name of the YAML file containing the form fields definition. The form fields are described in the [form controller article](../forms/form-controller.md). The YAML file should be placed to the directory with the name matching the model class name in lowercase.

## Writing to a Settings Model

The settings model has the static `set` method that allows to save individual or multiple values. You can also use the standard model features for setting the model properties and saving the model.

```php
use Acme\Demo\Models\UserSetting;

// Set a single value
UserSetting::set('api_key', 'ABCD');

// Set an array of values
UserSetting::set(['api_key' => 'ABCD']);

// Set object values
$settings = UserSetting::instance();
$settings->api_key = 'ABCD';
$settings->save();
```

## Reading From a Settings Model

The settings model has the static `get` method that enables you to load individual properties. Also, when you instantiate a model with the `instance` method, it loads the properties from the database and you can access them directly.

```php
// Outputs: ABCD
echo UserSetting::instance()->api_key;

// Get a single value
echo UserSetting::get('api_key');

// Get a value and return a default value if it doesn't exist
echo UserSetting::get('is_activated', true);
```

## Integration with Multisite

Settings models can provide different configuration values for each site defined by [multisite configuration](../../cms/resources/multisite.md). To enable multisite, include the `October\Rain\Database\Traits\Multisite` [trait](../database/traits.md) inside the model and define a `$propagatable` property, which can specify fields that propagate across all sites.

```php
namespace Acme\Demo\Models;

class UserSetting extends \Model
{
    use \October\Rain\Database\Traits\Multisite;

    public $implement = [
        \System\Behaviors\SettingsModel::class
    ];

    public $settingsCode = 'acme_demo_settings';

    public $settingsFields = 'fields.yaml';

    protected $propagatable = [];
}
```
