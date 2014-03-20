This section shows you how to add menu items to the back-end navigation area.

#### Registering menu items

Backend menu items are registered in the Plugin information file. An example of registering a menu item:

```php
public function registerNavigation()
{
    return [
        'blog' => [
            'label' => 'Blog',
            'url' => Backend::url('october/blog/posts')
        ]
    ];
}
```
You can learn more about registering backend menu items by reading the Backend navigation article (To do).

#### Adding back-end menu items

Back-end navigation items are registered in the system by plugins, contained in the Plugin Information File. An example of registering a navigation menu item:

```php
<?php namespace Plugins\October\Blog;

class Plugin extends System\Classes\PluginBase
{

    [...]

    public function registerNavigation()
    {
        return [
            'blog' => [
                'label' => 'Blog',
                'url' => Backend::url('october/blog/posts'),
                'icon' => 'icon-pencil',
                'permissions' => ['blog:*'],
                'order' => 500,
                'subMenu' => [
                    'posts' => [
                        'label' => 'Posts',
                        'icon' => 'icon-copy',
                        'url' => Backend::url('october/blog/posts'),
                        'permissions' => ['blog:access_posts'],
                    ],
                    'categories' => [
                        'label' => 'Categories',
                        'icon' => 'icon-copy',
                        'url' => Backend::url('october/blog/categories'),
                        'permissions' => ['blog:access_categories'],
                    ],
                ]
            ]
        ];
    }

}
```
