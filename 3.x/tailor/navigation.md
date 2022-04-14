# Defining Navigation

In the backend area, entries will be listed under the Content menu item with globals listed under the Settings menu item (by default). You may control this behavior using the **navigation** property in the blueprint file. The following code will set an icon and specify the order of appearance.

```yaml
navigation:
    icon: icon-pencil
    order: 200
```

To place an item in the Settings area. The **category** definition can be a string or a settings constant reference, eg. `CATEGORY_COLLECTIONS`.

```yaml
navigation:
    mode: settings
    category: Collections
```

To place an item in the Content area.

```yaml
navigation:
    mode: content
```

To place the item as a primary navigation item. A **primaryNavigation** definition is needed.

```yaml
primaryNavigation:
    label: Blog
    icon: icon-copy
    order: 500

navigation:
    mode: primary
    label: Main Menu Item
```

To place the item as a secondary navigation item. The **parent** property should specify the UUID of a primary navigation item.

```yaml
navigation:
    mode: secondary
    parent: 6947ff28-b660-47d7-9240-24ca6d58aeae
```
