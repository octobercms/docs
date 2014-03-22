# Plugin Configuration

- [File-based Configuration](#file-configuration)
- [Database Settings](#database-settings)
- [Back-end Settings Page](#settings-page)

<a name="file-configuration"></a>
## File-based Configuration

Modules and plugins can have configuration files in the /config directory.

#### Accessing configuration settings

```
// Get a localization string from the CMS module
echo Config::get('cms::errors.page.not_found');

// Get a localization string from the october/blog plugin.
echo Config::get('october.blog::messages.post.added');
```

#### Overriding localization strings

System users can override localization strings without altering the modules' and plugins' files. This is done by adding localization files to the app/lang directory. To override a plugin's localization:

```
app
  lang
    vendorname
      pluginname
        en
          file.php
```
Example: app/lang/october/blog/en/errors.php

To override a module's localization:

```
app
  lang
    modulename
      en
        file.php
```
Example: app/lang/cms/en/errors.php



<a name="database-settings"></a>
## Database Settings

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
Settings::set('api_key', 'ABCD');

Settings::set(['api_key' => 'ABCD']);

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



<a name="settings-page"></a>
## Settings page links

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
