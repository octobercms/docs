---
previousPath: cms/tailor/navigation.md
subtitle: Control where each blueprint appears in the admin panel menus, add your own menu items or hide the navigation.
---
# Tailor Navigation

Tailor adds a menu item to the admin panel for every blueprint. Entries are listed under the **Content** menu item and globals under the **Settings** area by default. Use the **navigation** property in the blueprint file to change the label, icon, order and position.

```yaml
navigation:
    icon: ph ph-pencil
    order: 200
```

## Navigation Properties

The following properties are supported by the `navigation` and `primaryNavigation` definitions.

Property | Description
------------- | -------------
**label** | the menu label or a localization string key. Defaults to the blueprint name.
**order** | a numerical weight when determining the display order.
**parent** | links the navigation item to a parent item using a blueprint handle.
**icon** | an icon name from the [available icons](../../handbook/icons.md), optional.
**iconSvg** | an SVG icon to be used in place of the standard icon, the SVG icon should be a rectangle and can support colors, optional.

## Placing an Item in the Content or Settings Area

To place an item in the Content area, set the **parent** to `content`.

```yaml
navigation:
    parent: content
```

To place an item in the Settings area, set the **parent** to `settings`. The **category** can be a string or a settings constant reference, for example `CATEGORY_COLLECTIONS`.

```yaml
navigation:
    parent: settings
    category: Collections
```

## Creating a Main Menu Item

To place the blueprint in the main menu of the admin panel, add a **primaryNavigation** definition.

```yaml
primaryNavigation:
    label: Blog
    icon: ph ph-copy
    order: 500

navigation:
    label: Main Menu Item
```

### Adding Items to a Main Menu Item

To place another blueprint under that main menu item, set the **parent** property of its navigation to the UUID or handle of the blueprint with the **primaryNavigation** definition.

```yaml
navigation:
    parent: <handle|uuid>
```

### Showing a Main Menu Item Without a Side Menu

To disable the secondary navigation, define the **primaryNavigation** for a single blueprint without it being a parent for any other blueprints.

```yaml
primaryNavigation:
    label: Page
    icon: ph ph-magic-wand
    order: 500
```

## Hiding the Navigation

To remove the blueprint from the admin panel menus entirely, set the **navigation** property to `false`.

```yaml
navigation: false
```

## Adding Extra Navigation Items

Use the `extraNavigation` property to register custom navigation items alongside the blueprint. The value matches the `sideMenu` definition found in the [backend navigation specification](../../backend/panel/navigation.md). The following example adds a section heading and a divider using custom display types, with the `order` property placing them in the correct position.

```yaml
navigation:
    label: Authors
    parent: Blog\Post
    icon: ph ph-user
    order: 230

extraNavigation:
    _authors_section:
        itemType: section
        label: Authors
        order: 210

    _authors_ruler:
        itemType: ruler
        order: 220
```

### Linking to a Plugin Controller

You can also add links to [controllers introduced by plugins](../../backend/panel/controllers.md) by setting the `url` property to the controller URL. The following links to the **acme/blog/posts** controller.

```yaml
navigation:
    label: Authors
    # ...

extraNavigation:
    testimonials:
        label: Testimonials
        order: 210
        icon: ph ph-users
        url: acme/blog/posts
```

To highlight the menu item when the controller is open, call the `setTailorContext` method on the `BackendMenu` facade inside the controller. The first argument is the blueprint `handle` and the second argument is the key of the extra navigation item. Use the `setTailorContextUuid` method to pass the blueprint `uuid` instead.

```php
BackendMenu::setTailorContext('Blog\Post', 'testimonials');

BackendMenu::setTailorContextUuid('edcd102e-0525-4e4d-b07e-633ae6c18db6', 'testimonials');
```

#### See Also

::: also
* [Backend Navigation](../../backend/panel/navigation.md)
* [Available Icons](../../handbook/icons.md)
* [Blueprints](./blueprints.md)
:::
