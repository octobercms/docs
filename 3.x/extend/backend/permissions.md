---
subtitle: Learn how to control permissions in the backend panel.
---
# Permissions

Permissions allow users to have specific privileges and functions in the backend panel. An example might be the ability to create or delete a record, or view the server logs. These permissions are based on the role assigned and can be granted on a per-user basis.

## Permission Codes

Permissions codes define a single permission and are string keys that use a "dot" notation, for example, `some.area.permission_name`. These permissions are granted to users by either direct assignment or by inheritance through their role.

When checking if a user has a specific permission, the permission for that user's role are inherited and then overridden by any permissions applied directly to that user. For example:

- If user **Bob** has role called **Genius**; and
- Role **Genius** has the `eat_cake` permission; but
- **Bob** has the `eat_cake` permission specifically set to deny; then
- **Bob** will not get to `eat_cake`.

However:

- If **Bob** has the permission `eat_vegetables` assigned directly to him, but;
- The **Genius** role does not, then;
- **Bob** still gets to `eat_vegetables`.

### Nested Permissions

Permission codes support a nested structure to provide a cleaner interface when selecting permissions. To nest a permission code the "dot" value must be a direct descendant of its parent and unlimited nesting is supported.

In the following example, the `manage_entries` permission must be granted for the `manage_entries.create` and `manage_entries.publish` codes to become available. Visually it is represented like this:

::: dir
├── manage_entries
|   ├── manage_entries.create
|   └── manage_entries.publish
└── delete_entries
:::

## Access Levels

Access to all parts of an October CMS instance is controlled by the permissions system. The `BackendAuth::userHasAccess` method is a quick way to check if the current user is logged in and has permission to a specific area.

```php
// Returns true if the user has permission
$permissionGranted = BackendAuth::userHasAccess('utilities.logs');
```

### Super Users

Administrators can be granted a special flag called a "super user" that allows access to all areas. When granted, the permission system is bypassed with access to all areas. Super users are not visible to other regular administrators.

::: warning
Any super user can create and remove other super users, so it should only be granted to the highest level administrator or owner of the application.
:::

### Roles

Roles use the `Backend\Models\UserRole` model and are groupings of permissions with a name and description used to identify the role. An administrator can only have one role assigned to them at once.

October CMS ships with two default system roles called `developer` and `publisher`. Any number of custom roles with their own combinations of permissions can be created and applied to users.

::: tip
System roles cannot change their permissions however they can be deleted if not required.
:::

### Role Hierarchy

Each role is assigned a ranked position in the backend panel, represented as the `sort_order` column in the database. This allows a basic organisational structure to be established where users can only manage roles lower than their own role.

In the following example, the **Senior Editor** can manage all the users, outranking **Staff Writer** and **Fact Checker** roles. Whereas, the **Fact Checker** role cannot see users or manage permissions above them, in the **Staff Writer** and **Senior Editor** roles.

- Senior Editor
- Staff Writer
- Fact Checker

If the **Manage Admins → Manage Roles** permission is granted, users can manage their own users, permissions and roles existing below their current role.

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

The backend user model has methods that allow determining whether the user has specific permissions. You can use this feature in order to limit the functionality of the backend user interface. The permission methods supported by the backend user are `userHasAccess` and `userHasPermission`. Both methods take two parameters: the permission key string (or an array of key strings) and an optional parameter indicating that all permissions listed with the first parameters are required.

The `userHasAccess` method returns **true** for any permission if the user is a super user. The `userHasPermission` method is more strict, only returning true if the user actually has the specified permissions either in their account or through their role. Generally, `userHasAccess` is the preferred method to use as it respects the absolute power of the super user. The following example shows how to use the methods in the controller code.

```php
if (BackendAuth::userHasAccess('acme.blog.*')) {
    // ...
}

if (BackendAuth::userHasPermission([
    'acme.blog.access_posts',
    'acme.blog.access_categories'
])) {
    // ...
}
```

You can also use the methods in the backend views for hiding user interface elements. The next example demonstrates how you can hide a button on a [backend form](../forms/form-controller.md).

```php
<?php if (BackendAuth::userHasAccess('acme.blog.delete_categories')): ?>
    <button
        type="button"
        class="oc-icon-trash-o btn-icon danger"
        data-request="onDelete"
        data-load-indicator="Deleting Category..."
        data-request-confirm="Do you really want to delete this category?">
    </button>
<?php endif ?>
```
