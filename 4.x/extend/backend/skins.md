---
subtitle: Change the look and structure of the backend navigation using skins.
---
# Skins

Skins control the navigation chrome of the backend panel, including the main menu, the side navigation and their styles. The page layouts themselves are still selected by backend controllers, while the skin supplies the navigation components those layouts display.

October CMS includes three skins.

Skin | Description
------------- | -------------
**Standard** | The default layout with the main menu displayed across the top of the page.
**Sidebar** | The main menu is displayed as a vertical strip of icons on the left side of the page.
**Horizon** | A search-focused top bar, with the main menu displayed as a mega menu under the menu button.

## Selecting a Skin

The active skin is set with the `skin` value found in the **config/backend.php** file. The value is the class name of the skin to use.

```php
'skin' => Backend\Skins\Sidebar::class,
```

The Standard skin is used when no value is specified.

::: tip
The **Menu Style** branding setting (inline, text, tiles, icons, collapsed) applies to the Standard skin. The previous **Left Side** menu style has been replaced by the Sidebar skin.
:::

## Creating a Custom Skin

A skin is a class that extends `Backend\Classes\Skin` and implements the `skinDetails` method. The class can live in a plugin, for example in the **plugins/acme/theme/skins** directory.

```php
namespace Acme\Theme\Skins;

use Backend\Classes\Skin;

class Midnight extends Skin
{
    public function skinDetails(): array
    {
        return [
            'name' => 'Midnight',
            'description' => 'A dark backend layout with a compact menu.',
            'author' => 'Acme Corp',
            'icon' => 'ph ph-moon',
        ];
    }
}
```

The skin files are placed in a directory next to the class, named after the class in lowercase. The skin above uses the **plugins/acme/theme/skins/midnight** directory.

::: dir
├── `skins`
|   ├── midnight  _← Skin Directory_
|   |   ├── layouts
|   |   |   ├── _mainmenu.php
|   |   |   └── _sidenav.php
|   |   └── assets
|   |       ├── css
|   |       |   └── skin.css
|   |       └── js
|   |           └── main.js
|   └── Midnight.php  _← Skin Class_
:::

Then activate the skin in the **config/backend.php** file.

```php
'skin' => Acme\Theme\Skins\Midnight::class,
```

### Navigation Partials

Backend layouts render two navigation regions, and the skin decides what appears in each one.

- `_mainmenu.php` is rendered at the top of the page.
- `_sidenav.php` is rendered at the side of the page, next to the page content.

For example, the Standard skin places the main menu in the top region and the section navigation in the side region, whereas the Sidebar skin leaves the top region empty and places both menus in the side region.

The following partials may be provided in the **layouts** directory of a skin.

Partial | Description
------------- | -------------
**_mainmenu.php** | the top navigation region.
**_sidenav.php** | the side navigation region.
**_mainmenu_responsive.php** | the main menu displayed on small screens.
**_sidenav-responsive.php** | the side navigation displayed on small screens.

The navigation items are available using the `BackendMenu` facade, for example the `listMainMenuItemsWithSubitems` method returns every main menu item along with its side menu items.

```php
<?php foreach (BackendMenu::listMainMenuItemsWithSubitems() as $itemInfo): ?>
    <a href="<?= $itemInfo->mainMenuItem->url ?>">
        <?= e(__($itemInfo->mainMenuItem->label)) ?>
    </a>
<?php endforeach ?>
```

Layouts are located using the paths returned by the `getLayoutPaths` method, where the first matching file is used. By default this is the skin **layouts** directory followed by the **modules/backend/layouts** directory, which contains the page layouts and shared partials such as `_head.php` and `_footer.php`.

### Skin Assets

The backend loads the following files from the active skin.

File | Description
------------- | -------------
**assets/css/skin.css** | the stylesheet for the skin navigation.
**assets/js/main.js** | the backend script entry point, loaded as a module.
**assets/images/favicon.png** | the favicon, along with **favicon-dark.png** for dark mode.

When a skin does not provide a file, the file is loaded from the **modules/backend** directory instead. Since the **main.js** file replaces the backend script entry point, a skin that provides one should import the core entry point before its own code.

```js
import '/modules/backend/assets/js/main.js';

oc.pageReady().then(() => {
    // Skin behavior
});
```

Use the `Backend::skinAsset` method to reference other files from the skin in a partial.

```php
<img src="<?= Backend::skinAsset('assets/images/logo.svg') ?>" />
```

## Extending an Existing Skin

A skin can extend an included skin to reuse its partials and styles, and only override what is different. The skin should include the parent skin directory in the layout paths, since the default paths only include the current skin.

```php
namespace Acme\Theme\Skins;

use Backend\Skins\Standard;

class Compact extends Standard
{
    public function skinDetails(): array
    {
        return ['name' => 'Compact'];
    }

    public function getLayoutPaths()
    {
        return [
            $this->skinPath . '/layouts',
            base_path('modules/backend/skins/standard/layouts'),
            $this->defaultSkinPath . '/layouts',
        ];
    }
}
```

The stylesheet can import the parent styles before applying its own.

```css
@import '/modules/backend/skins/standard/assets/css/skin.css';

.layout-mainmenu .navbar {
    height: 50px;
}
```

::: also
* [Navigation](./navigation.md)
* [Backend Configuration](../../setup/configuration.md)
:::
