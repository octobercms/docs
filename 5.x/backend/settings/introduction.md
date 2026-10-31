---
previousPath: extend/settings/settings.md
subtitle: Choose between file and model settings for your plugin, and register settings pages in the backend Settings area.
---
# Plugin Settings

Plugins configure the system in one of two ways: settings stored in files, or settings stored in the database through a model. Model settings can appear as pages in the backend **Settings** area, which you register in the plugin registration file.

```php
public function registerSettings()
{
    return [
        'settings' => [
            'label' => 'User Settings',
            'description' => 'Manage user based settings.',
            'category' => 'CATEGORY_USERS',
            'icon' => 'icon-cog',
            'class' => \Acme\User\Models\UserSetting::class,
        ]
    ];
}
```

## Choosing File or Model Settings

Decide which option fits your requirements first.

- [File-based configuration](./file-settings.md) has no user interface and is stored in the file system.
- [Model-based settings](./model-settings.md) have an optional user interface and are stored in the database.

Model-based settings with backend pages give a better user experience, but take more work to build at first. File-based configuration suits settings that rarely change and need no interface, such as policy configuration.

## Registering a Settings Page

You can register model-based settings in the dedicated area for managing settings, opened by clicking the **Settings** link in the main menu.

Register settings pages by overriding the `registerSettings` method in the [plugin registration file](../plugins/extending.md), as shown at the top of this page. The method returns an array with a key for each settings item. Each value configures the settings model or controller that appears in the settings area.

### Settings Properties

The following properties are available for each settings item.

Property | Description
------------- | -------------
**label** | specifies the menu label localization string key, required.
**description** | specifies a description localization string key for the settings item, optional.
**category** | specifies a category label localization string key, for grouping settings pages together, required.
**keywords** | specifies keywords used for searching settings.
**order** | a numerical weight when determining the display order.
**icon** | an icon name from the [October CMS icon collection](../../handbook/icons.md), optional.
**iconSvg** | an SVG icon to be used in place of the standard icon, the SVG icon should be a rectangle and can support colors, optional.
**url** | the backend URL the menu item should refer to, eg. `Backend::url('author/plugin/controller/action')`.
**class** | the model class the settings item should refer to, eg. `Acme\User\Models\UserSetting::class`.
**permissions** | an array of permissions the backend user must have in order to view the menu item (Note: direct access of URLs still requires separate permission checks), optional.
**context** | specifies the placement of the settings item, either `system` or `mysettings`. Default: `system`.
**size** | the settings form size when used with a `class` definition. Supported values: `tiny`, `small`, `medium`, `large`, `huge`, `giant`, `adaptive`. Default: `large`.

The optional `keywords` property is used by the settings search. Without keywords, the search uses only the settings item label and description.

### Grouping Settings into Categories

For interoperability with other plugins, use one of the following general constants for the `category` property.

<div class="content-list" markdown="1">

- CATEGORY_CMS
- CATEGORY_MISC
- CATEGORY_MAIL
- CATEGORY_LOGS
- CATEGORY_SHOP
- CATEGORY_TEAM
- CATEGORY_USERS
- CATEGORY_SOCIAL
- CATEGORY_SYSTEM
- CATEGORY_EVENTS
- CATEGORY_BACKEND
- CATEGORY_CUSTOMERS
- CATEGORY_MYSETTINGS
- CATEGORY_NOTIFICATIONS
- CATEGORY_GLOBALS
- CATEGORY_COLLECTIONS

</div>

## Linking to a Settings Model

When a settings item links to a model `class`, you do not need to build your own controller. This suits most cases. The following example links to a settings model, described in the [model settings article](./model-settings.md).

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

A generic backend controller displays the form, with basic features such as saving and resetting the values to default. Active navigation is configured automatically, and the controller enforces the permissions you define.

## Linking to a Custom Controller

When a settings item uses a page `url`, you can build your own controller and link it in the settings area. This example links to a backend page.

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

### Writing a Settings Controller

A settings page controller can be any [backend controller](../panel/controllers.md). To make things easier, extend the `Backend\Classes\SettingsController` base class, which registers the settings navigation context automatically. Set the `$settingsItemCode` property to the settings code, which determines the active menu item.

```php
namespace Acme\Blog\Controllers;

class Posts extends \Backend\Classes\SettingsController
{
    public $settingsItemCode = 'location';

    public function index() {}
}
```

#### See Also

::: also
* [Model Settings](./model-settings.md)
* [File Settings](./file-settings.md)
* [Backend Controllers](../panel/controllers.md)
:::
