# Settings & Config

There are two ways to configure plugins - with back-end settings forms and with configuration files. Using database settings with back-end pages provide a better user experience, but they carry more overhead for the initial development. File-based configuration is suitable for configuration that is rarely modified.

<a id="oc-backend-settings-pages"></a>
## Backend Settings Pages

The back-end contains a dedicated area for housing settings and configuration, it can be accessed by clicking the <strong>Settings</strong> link in the main menu. The Settings page contains a list of links to the configuration pages registered by the system and other plugins.

<a id="oc-settings-link-registration"></a>
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

> **Note**: Backend settings pages should [set the settings context](#oc-setting-the-page-navigation-context) in order to mark the corresponding settings menu item active in the System page sidebar. Settings context for settings models is detected automatically.

The following example creates a link to a settings model. Settings models is a part of the settings API which is described above in the [Database settings](#oc-database-settings) section.

```php
public function registerSettings()
{
    return [
        'settings' => [
            'label' => 'User Settings',
            'description' => 'Manage user based settings.',
            'category' => 'Users',
            'icon' => 'icon-cog',
            'class' => \Acme\User\Models\UserSetting::class,
            'order' => 500,
            'keywords' => 'security location',
            'permissions' => ['acme.users.access_settings']
        ]
    ];
}
```

The optional `keywords` parameter is used by the settings search feature. If keywords are not provided, the search uses only the settings item label and description.

<a id="oc-setting-the-page-navigation-context"></a>
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

The first argument of the `setContext` method is the settings item owner in the following format: **author.plugin**. The second argument is the setting name, the same as you provided when [registering the back-end settings page](#oc-settings-link-registration).
