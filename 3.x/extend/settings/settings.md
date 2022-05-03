# Settings Page

There are two ways to configure plugins - with backend settings forms and with configuration files. Using database settings with backend pages provide a better user experience, but they carry more overhead for the initial development. File-based configuration is suitable for configuration that is rarely modified.

## Backend Settings Pages

The backend contains a dedicated area for housing settings and configuration, it can be accessed by clicking the <strong>Settings</strong> link in the main menu. The Settings page contains a list of links to the configuration pages registered by the system and other plugins.

### Settings Link Registration

The backend settings navigation links can be extended by overriding the `registerSettings` method inside the [plugin registration file](../extending.md). When you create a configuration link you have two options - create a link to a specific backend page, or create a link to a settings model. The next example shows how to create a link to a backend page.

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

::: tip
Backend settings pages set the settings context in the controller to mark the menu item as active in the system page sidebar. Settings context for settings models is detected automatically.
:::

The following example creates a link to a settings model. Settings models is a part of the settings API which is described above in the [model settings article](./model-settings.md).

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

### Setting the Page Navigation Context

Just like setting navigation context in the [backend controller](../system/controllers.md), backend settings pages should set the settings navigation context. It's required in order to mark the current settings link in the System page sidebar as active. Use the `System\Classes\SettingsManager` class to set the settings context. Usually it could be done in the controller constructor:

```php
public function __construct()
{
    parent::__construct();

    // ...

    BackendMenu::setContext('October.System', 'system', 'settings');
    SettingsManager::setContext('Your.Plugin', 'settings');
}
```

The first argument of the `setContext` method is the settings item owner in the following format: **author.plugin**. The second argument is the setting name, the same as you provided when registering the backend settings page.
