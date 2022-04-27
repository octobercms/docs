---
subtitle: Include new menu items in the backend panel for managing content.
---
# Defining Navigation

In the backend area, entries will be listed under the Content menu item with globals listed under the Settings menu item (by default). You may control this behavior using the **navigation** property in the blueprint file. The following code will set an icon and specify the order of appearance.

```yaml
navigation:
    icon: icon-pencil
    order: 200
```

The following properties are supported by the `navigation` and `primaryNavigation` definition.

Property | Description
------------- | -------------
**label** | specifies the menu label localization string key, required.
**order** | a numerical weight when determining the display order.
**parent** | links the navigation item to a parent item using a blueprint handle.
**icon** | an icon name from the [October CMS icon collection](https://octobercms.com/docs/ui/icon), optional.
**iconSvg** | an SVG icon to be used in place of the standard icon, the SVG icon should be a rectangle and can support colors, optional.

To place an item in the Settings area, set the **parent** to `settings`. The **category** definition can be a string or a settings constant reference, eg. `CATEGORY_COLLECTIONS`.

```yaml
navigation:
    parent: settings
    category: Collections
```

To place an item in the Content area, set the **parent** to `content`.

```yaml
navigation:
    parent: content
```

To place the item as a primary navigation item. A **primaryNavigation** definition is needed.

```yaml
primaryNavigation:
    label: Blog
    icon: icon-copy
    order: 500

navigation:
    label: Main Menu Item
```

To place the item as a secondary navigation item. The **parent** property should specify the UUID or handle of a primary navigation item.

```yaml
navigation:
    parent: <handle|uuid>
```
