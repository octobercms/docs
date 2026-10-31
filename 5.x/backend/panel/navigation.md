---
previousPath: extend/backend/navigation.md
subtitle: Add your plugin pages to the main menu and side menu of the admin panel.
---
# Navigation

Plugins add items to the backend menu with the `registerNavigation` method of the [plugin registration file](../plugins/extending.md#registration-methods). Each main menu item can have its own side menu items. The following registers a top-level **Blog** item with two side menu items.

```php
public function registerNavigation()
{
    return [
        'blog' => [
            'label' => 'Blog',
            'url' => Backend::url('acme/blog/posts'),
            'icon' => 'ph ph-pencil-simple',
            'permissions' => ['acme.blog.*'],
            'order' => 500,

            'sideMenu' => [
                'posts' => [
                    'label' => 'Posts',
                    'icon' => 'ph ph-copy',
                    'url' => Backend::url('acme/blog/posts'),
                    'permissions' => ['acme.blog.access_posts'],
                ],
                'categories' => [
                    'label' => 'Categories',
                    'icon' => 'ph ph-copy',
                    'url' => Backend::url('acme/blog/categories'),
                    'permissions' => ['acme.blog.access_categories'],
                ]
            ]
        ]
    ];
}
```

## Registering Menu Items

The keys of the array, such as `blog` and `posts`, are the menu codes. The `label` values can be [localization strings](../localization/backend.md). The `permissions` values hide items from users without the matching [backend permissions](./permissions.md). The `order` value sets the position of the item: lower numbers appear earlier and higher numbers appear later. Main menu items default to an order of 500.

To show the side menu items, set the navigation context in the [backend controller](./controllers.md#setting-the-navigation-context) with the `BackendMenu::setContext` method. This makes the parent menu item active and displays its children in the side menu.

The following properties are available to menu items.

Property | Description
------------- | -------------
**label** | specifies the menu label localization string key, required.
**order** | a numerical weight when determining the display order.
**icon** | an icon name from the [October CMS icon collection](../../handbook/icons.md), optional.
**iconSvg** | an SVG icon to be used in place of the standard icon, the SVG icon should be a rectangle and can support colors, optional.
**url** | the URL the menu item should point to (eg. `Backend::url('author/plugin/controller/action')`), required.
**counter** | a numeric value to output near the menu icon. The value should be a number or a callable returning a number, optional.
**counterLabel** | a string value to describe the numeric reference in counter, optional.
**attributes** | an associative array of attributes and values to apply to the menu item, optional.
**permissions** | an array of permissions the backend user must have in order to view the menu item, optional.
**sideMenu** | an array of side menu items sharing the same configuration as parent menu items, optional.
**itemType** | specifies a display type for the item, side menu items only. Supported: `primary`, `link`, `ruler`, `section`. Default: `link`.
**visibleOn** | used by side menu items, provides a list of other items, when active makes this item visible, optional.

::: warning
The `permissions` property only hides the menu item. Users can still open the URL directly, so the page needs its own [permission check](./permissions.md#restricting-access-to-backend-pages).
:::

The system generates the following values. Do not provide them when registering the navigation items.

Key | Description
------------- | -------------
**code** | a string value that acts as a unique identifier for that menu option.
**owner** | a string value that specifies the menu item owner plugin or module in the format "Author.Plugin".

## Showing a Counter

A counter shows that some items need attention, such as unread messages. Use the `counter` and `counterLabel` properties on main menu and side menu items alike. The counter can be a callable that returns the number.

```php
'blog' => [
    // ...
    'counter' => [\Author\Plugin\Classes\MyMenuCounterService::class, 'getCounterMethod'],
    'counterLabel' => 'Label describing a dynamic menu counter',
],
```

## Adding Sections, Dividers and Buttons

Side menu items support different display types with the `itemType` property. Set the type to `section` to display a section heading. Prefixing the key with an underscore (`_`) is a good way to show that the item is a user interface element rather than a page.

```php
'_section1' => [
    'itemType' => 'section',
    'label' => 'Advanced',
],
```

Set the type to `ruler` to display a divider. A divider placed above a section works well.

```php
'_ruler1' => [
    'itemType' => 'ruler',
],
```

Set the type to `primary` to display the link as a primary button, useful for a call to action.

```php
'people_create' => [
    'label' => 'New Person',
    'icon' => 'ph ph-plus',
    'url' => Backend::url('acme/blog/people/create'),
    'itemType' => 'primary',
],
```

### Showing an Item Only on Some Pages

Use the `visibleOn` property to show an item only when another side menu item is active. The following shows the **New Person** button when the **people** item is active, and the **New Post** button when the **posts** item is active.

```php
'people_create' => [
    'label' => 'New Person',
    'icon' => 'ph ph-plus',
    'url' => Backend::url('acme/blog/people/create'),
    'itemType' => 'primary',
    'visibleOn' => 'people',
],
'post_create' => [
    'label' => 'New Post',
    'icon' => 'ph ph-plus',
    'url' => Backend::url('acme/blog/posts/create'),
    'itemType' => 'primary',
    'visibleOn' => 'posts',
],
```

## Changing Existing Menu Items

Use the `backend.menu.extendItems` [event](../plugins/extending.md#listening-to-events) to change the navigation items after the system and plugins have registered them. The event passes a navigation `$manager` instance that supports the following methods.

Method | Description
------------- | -------------
**addMainMenuItems($owner, $definitions)** | Add or update a main menu definition
**getMainMenuItem($owner, $code)** | Retrieve an existing main menu definition
**removeMainMenuItem($owner, $code)** | Delete an existing main menu definition
**addSideMenuItems($owner, $code, $definitions)** | Add or update a side menu definition
**getSideMenuItem($owner, $code, $sideCode)** | Retrieve an existing side menu definition
**removeSideMenuItem($owner, $code, $sideCode)** | Delete an existing side menu definition
**removeSideMenuItems($owner, $code, $sideCodes)** | Delete multiple existing side menu definitions

A retrieved menu item supports method chaining to update its properties. The following replaces the label of the Editor with **Code Editor**.

```php
Event::listen('backend.menu.extendItems', function($manager) {
    $manager->getMainMenuItem('October.Editor', 'editor')->label('Code Editor');
});
```

The next example changes the label of the Acme Blog **posts** item to **News** and adds a counter of **9**.

```php
Event::listen('backend.menu.extendItems', function($manager) {
    $manager->getMainMenuItem('Acme.Blog', 'blog')
        ->getSideMenuItem('posts')
        ->label('News')
        ->counter(9);
});
```

The same event can remove menu items. The following removes the whole menu, a single side menu item and multiple side menu items, in that order.

```php
Event::listen('backend.menu.extendItems', function($manager) {
    $manager->removeMainMenuItem('Acme.Blog', 'blog');

    $manager->removeSideMenuItem('Acme.Blog', 'blog', 'posts');

    $manager->removeSideMenuItems('Acme.Blog', 'blog', [
        'posts',
        'categories'
    ]);
});
```

#### See Also

::: also
* [Controllers](./controllers.md)
* [Permissions](./permissions.md)
* [Skins](./skins.md)
* [Icons](../../handbook/icons.md)
:::
