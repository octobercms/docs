# Navigation

Plugins can extend the backend navigation menus by overriding the `registerNavigation` method of the [plugin registration file](../extending.md). This section shows you how to add menu items to the backend navigation area. An example of registering a top-level navigation menu item with two sub-menu items:

```php
public function registerNavigation()
{
    return [
        'blog' => [
            'label' => 'Blog',
            'url' => Backend::url('acme/blog/posts'),
            'icon' => 'icon-pencil',
            'permissions' => ['acme.blog.*'],
            'order' => 500,

            'sideMenu' => [
                'posts' => [
                    'label' => 'Posts',
                    'icon' => 'icon-copy',
                    'url' => Backend::url('acme/blog/posts'),
                    'permissions' => ['acme.blog.access_posts'],
                ],
                'categories' => [
                    'label' => 'Categories',
                    'icon' => 'icon-copy',
                    'url' => Backend::url('acme/blog/categories'),
                    'permissions' => ['acme.blog.access_categories'],
                ]
            ]
        ]
    ];
}
```

When you register the backend navigation you can use [localization strings](../system/localization.md) for the `label` values. Backend navigation can also be controlled by the `permissions` values and correspond to defined [backend user permissions](./permissions.md). The order in which the backend navigation appears on the overall navigation menu items, is controlled by the `order` value. Higher numbers mean that the item will appear later on in the order of menu items while lower numbers mean that it will appear earlier on.

To make the sub-menu items visible, you may set the navigation context in the [backend controller](../system/controllers.md) using the `BackendMenu::setContext` method. This will make the parent menu item active and display the children in the side menu.

Property | Description
------------- | -------------
**label** | specifies the menu label localization string key, required.
**order** | a numerical weight when determining the display order.
**icon** | an icon name from the [October CMS icon collection](https://octobercms.com/docs/ui/icon), optional.
**iconSvg** | an SVG icon to be used in place of the standard icon, the SVG icon should be a rectangle and can support colors, optional.
**url** | the URL the menu item should point to (eg. `Backend::url('author/plugin/controller/action')`, required.
**counter** | a numeric value to output near the menu icon. The value should be a number or a callable returning a number, optional.
**counterLabel** | a string value to describe the numeric reference in counter, optional.
**attributes** | an associative array of attributes and values to apply to the menu item, optional.
**permissions** | an array of permissions the backend user must have in order to view the menu item (Note: direct access of URLs still requires separate permission checks), optional.

The following are system generated value and are not provided when registering the navigation items.

Key | Description
------------- | -------------
**code** | a string value that acts as an unique identifier for that menu option.
**owner** | a string value that specifies the menu items owner plugin or module in the format "Author.Plugin".

## Navigation Counters

Navigation items support specifying a counter to indicate that there are items that require attention. These properties are available to parent and child menu items alike. Use the **counter** and **counterLabel** to show a numeric counter.

```php
'blog' => [
    // ...
    'counter' => [\Author\Plugin\Classes\MyMenuCounterService::class, 'getCounterMethod'],
    'counterLabel' => 'Label describing a dynamic menu counter',
],
```
