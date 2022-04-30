---
subtitle: Learn how to control permissions in the backend panel.
---
# Permissions

## Access Levels

Access to all parts of an October CMS instance is controlled by the permissions system. At the lowest level, there are super users, administrators and permissions. The `Backend\Models\User` models are the containers that hold all the important information about a user.

### Super Users

Super users have access to everything in the system and are only manageable by themselves or other super users; they are not visible to nor editable by regular administrators, not even if an administrator has the `backend.manage_users` permission.

::: tip
Any user with the `manage_users` permissions can manage the assignment of roles, but only to other users (not to themselves), and roles can only be created or modified by a super user.
:::

### Administrators

Permissions are string keys in the form of `author.plugin.permission_name` that are granted to users by either direct assignment on their Edit Administrator page or by inheritance through the user's Role.

When checking if a user has a specific permission, the permission settings for that user's role are inherited and then overridden by any permissions applied directly to that user. For example:

- If user **Bob** has role **Genius**; and
- Role **Genius** has the `eat_cake` permission; but
- **Bob** has the `eat_cake` permission specifically set to deny; then
- **Bob** will not get to `eat_cake`.

However:

- If **Bob** has the permission `eat_vegetables` assigned directly to him, but;
- The **Genius** role does not, then;
- **Bob** still gets to `eat_vegetables`.

### Roles

Roles (`Backend\Models\UserRole`) are groupings of permissions with a name and description used to identify the role. An administrator can only have one role assigned to them at once.

October CMS ships with two system roles by default, `developer` and `publisher`. Any number of custom roles with their own combinations of permissions can be created and applied to users.

::: tip
System roles cannot have their permissions changed through the backend panel, however, they can be deleted if not required.
:::

### Groups

Groups (`Backend\Models\UserGroup`) are an organizational tool for grouping administrators, they have nothing to do with permissions and are strictly for organizational purposes, such as notifications.

For instance, if you wanted to send an email to all users that are in the group `Head Office Staff`, you would simply do

```php
$staff = UserGroup::where('code', 'head-office-staff')->get()->users;

Mail::sendTo($staff, 'author.plugin::mail.important_notification');
```

## Registering Permissions

Plugins can register backend user permissions by overriding the `registerPermissions` method inside the [plugin registration file](../extending.md). The permissions are defined as an array with keys corresponding the permission keys and values corresponding the permission descriptions. The permission keys consist of the author name, the plugin name and the feature name. Here is an example code.

```
acme.blog.access_categories
```

The next example shows how to register backend permission items. Permissions are defined with a permission key and description. In the backend permission management user interface permissions are displayed as a checkbox list. Back-end controllers can use permissions defined by plugins for restricting the user access to pages or features.

```php
public function registerPermissions()
{
    return [
        'acme.blog.access_posts' => [
            'label' => 'Manage the blog posts',
            'tab' => 'Blog',
            'order' => 200,
        ],
        // ...
    ];
}
```

You may also specify a `roles` option as an array with each value as a role API code. When a role is created with this code, it becomes a system role that always grants this permission to users with that role.

```php
public function registerPermissions()
{
    return [
        'acme.blog.access_categories' => [
            'label' => 'Manage the blog categories',
            'tab' => 'Blog',
            'order' => 200,
            'roles' => ['developer']
        ]
        // ...
    ];
}
```

## Restricting Access to Backend Pages

In a backend controller class you can specify which permissions are required for access the pages provided by the controller. It's done with the `$requiredPermissions` controller's property. This property should contain an array of permission keys. If the user permissions match any permission from the list, the framework will let the user to see the controller pages.

```php
namespace Acme\Blog\Controllers;

use Backend\Classes\BackendController;

class Posts extends BackendController
{
    public $requiredPermissions = ['acme.blog.access_posts'];
}
```

You can also use the **asterisk** symbol to indicate the "all permissions" condition. In the next example the controller pages are accessible for all users who has any permissions starting with the "acme.blog." string:

```php
public $requiredPermissions = ['acme.blog.*'];
```

## Restricting Access to Features

The backend user model has methods that allow determining whether the user has specific permissions. You can use this feature in order to limit the functionality of the backend user interface. The permission methods supported by the backend user are `hasAccess` and `hasPermission`. Both methods take two parameters: the permission key string (or an array of key strings) and an optional parameter indicating that all permissions listed with the first parameters are required.

The `hasAccess` method returns **true** for any permission if the user is a super user. The `hasPermission` method is more strict, only returning true if the user actually has the specified permissions either in their account or through their role. Generally, `hasAccess` is the preferred method to use as it respects the absolute power of the super user. The following example shows how to use the methods in the controller code.

```php
if ($this->user->hasAccess('acme.blog.*')) {
    // ...
}

if ($this->user->hasPermission([
    'acme.blog.access_posts',
    'acme.blog.access_categories'
])) {
    // ...
}
```

You can also use the methods in the backend views for hiding user interface elements. The next example demonstrates how you can hide a button on a [backend form](../forms/form-controller.md).

```php
<?php if ($this->user->hasAccess('acme.blog.delete_categories')): ?>
    <button
        type="button"
        class="oc-icon-trash-o btn-icon danger pull-right"
        data-request="onDelete"
        data-load-indicator="Deleting Category..."
        data-request-confirm="Do you really want to delete this category?">
    </button>
<?php endif ?>
```
