---
subtitle: The menu items for managing the content in the admin panel.
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

To disable the secondary navigation, define the **primaryNavigation** for a single blueprint without it being a parent for any other blueprints.

```yaml
primaryNavigation:
    label: Page
    icon: icon-magic
    order: 500
```

You may also completely disable the navigation by setting the **navigation** property to `false`.

```yaml
navigation: false
```

## Extra Navigation

Use the `extraNavigation` property to register custom navigation items to include with the blueprint. The value is an array matching the `sideMenu` definition found in the [backend navigation specification](../../extend/backend/navigation.md). The following example includes two a section and divider using custom display types, the `order` property is used to align the items in the correct order.

```yaml
navigation:
    label: Authors
    parent: Blog\Post
    icon: icon-user
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

#### See Also

::: also
* [Backend Navigation](../../extend/backend/navigation.md)
:::
