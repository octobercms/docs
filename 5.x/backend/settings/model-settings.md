---
previousPath: extend/settings/model-settings.md
subtitle: Store plugin settings in the database with a settings model that admins can edit from the backend panel.
---
# Model Settings

A settings model stores plugin settings in the database, and backend users can change the values through a form in the backend panel. You do not need to create a database table or a controller for it.

```php
namespace Acme\Demo\Models;

class UserSetting extends \System\Models\SettingModel
{
    public $settingsCode = 'acme_demo_settings';

    public $settingsFields = 'fields.yaml';
}
```

## Creating a Settings Model

A settings model extends the `System\Models\SettingModel` base class. You can use this model directly to build the backend settings form. Like any other model, it lives in the **models** subdirectory of the plugin. The model above belongs in the **plugins/acme/demo/models/UserSetting.php** file.

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

The `$settingsCode` property is required. It defines the unique settings key used to save the settings to the database.

The `$settingsFields` property is required if you build a backend settings form from the model. It names the YAML file containing the [form field definitions](../../handbook/form-fields.md). Place the YAML file in the directory named after the model class in lowercase.

You can [register the settings model](./introduction.md#linking-to-a-settings-model) to appear in the settings area of the backend panel, but this is optional. You can set and read settings values like any other model.

## Writing Settings Values

The static `set` method saves one or more values. You can also set the model properties and save the model, as with any other model.

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

## Reading Settings Values

The static `get` method reads a single value. You can also call the `instance` method, which loads the properties from the database so you can access them directly.

```php
// Outputs: ABCD
echo UserSetting::instance()->api_key;

// Get a single value
echo UserSetting::get('api_key');

// Get a value and return a default value if it doesn't exist
echo UserSetting::get('is_activated', true);
```

## Using Different Settings per Site

Settings models can hold different values for each site in a [multisite configuration](../../themes/sites/multisite.md). To enable this, add the `October\Rain\Database\Traits\Multisite` [trait](../localization/multisite.md) to the model and define a `$propagatable` property. This property lists the fields that propagate across all sites.

```php
namespace Acme\Demo\Models;

class UserSetting extends \System\Models\SettingModel
{
    use \October\Rain\Database\Traits\Multisite;

    public $settingsCode = 'acme_demo_settings';

    public $settingsFields = 'fields.yaml';

    protected $propagatable = [];
}
```

#### See Also

::: also
* [Plugin Settings](./introduction.md)
* [File Settings](./file-settings.md)
* [Multisite Models](../localization/multisite.md)
:::
