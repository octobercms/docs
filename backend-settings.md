### Settings model

You can create models used for storing settings easily by implementing the **SettingsModel** behavior. You do not need to create a database table or a controller.

```php
class Settings extends Model
{
    public $implement = ['System.Behaviors.SettingsModel'];

    // A unique code
    public $settingsCode = 'october_user_settings';

    // Reference to field configuration
    public $settingsFields = 'fields.yaml';
}
```

#### Writing to a settings model

```php
$settings = Settings::instance();
$settings->api_key = 'ABCD';
$settings->save();
```

#### Reading from a settings model

```php
// Outputs: ABCD
echo Settings::instance()->api_key;

// Get a single value
echo Settings::get('api_key');

// Get a value and return a default value if it doesn't exist
echo Settings::get('is_activated', true);
```

### Settings page links

The section shows you how to add linkable items to the System Settings page.

#### Link to a page URL

```php
public function registerSettings()
{
    return [
        'location' => [
            'label' => 'Locations',
            'description' => 'Manage available user countries and states.',
            'category' => 'Users',
            'icon' => 'icon-globe',
            'url' => Backend::url('october/user/locations'),
            'order' => 100
        ]
    ];
}
```


#### Link to a Settings model

```php
public function registerSettings()
{
    return [
        'settings' => [
            'label' => 'User Settings',
            'description' => 'Manage user based settings.',
            'category' => 'Users',
            'icon' => 'icon-cog',
            'class' => 'October\User\Models\Settings',
            'order' => 100
        ]
    ];
}
```
