---
previousPath: extend/backend/permissions.md
subtitle: Register permissions in your plugin and use them to control access to backend pages and features.
---
# Permissions

Permissions control what each administrator can do in the backend panel, such as creating or deleting a record, or viewing the server logs. Your plugin registers its permissions, an administrator grants them to roles and users, and your controllers and views check them.

```php
public function registerPermissions()
{
    return [
        'acme.blog.access_posts' => [
            'label' => 'Manage the blog posts',
            'tab' => 'Blog',
            'order' => 200,
        ],
    ];
}
```

## Registering Permissions

Plugins register backend permissions by overriding the `registerPermissions` method in the [plugin registration file](../plugins/extending.md#registration-methods), as shown above. The array keys are the permission codes. A permission code is a string key using "dot" notation, made of the author name, the plugin name and the feature name.

```
acme.blog.access_categories
```

In the permission management screens, permissions are displayed as a checkbox list. Each permission supports the following options.

Option | Description
------------- | -------------
**label** | the name of the permission, required.
**tab** | assigns the permission to a tabbed group, optional.
**order** | the position of the permission in the list, optional.
**comment** | a brief comment that describes the permission, optional.
**roles** | an array of role codes that are always granted this permission, optional.

### Granting a Permission to System Roles

The `roles` option takes an array of role API codes. When a role is created with one of these codes, it becomes a system role that always grants this permission to users with that role.

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

### Nesting Permissions

Permission codes support a nested structure for a cleaner interface when selecting permissions. A nested code must be a direct "dot" descendant of its parent, and nesting has no depth limit.

In the following example, the `manage_entries` permission must be granted before the `manage_entries.create` and `manage_entries.publish` permissions become available.

::: dir
├── manage_entries
|   ├── manage_entries.create
|   └── manage_entries.publish
└── delete_entries
:::

## Restricting Access to Backend Pages

Use the `$requiredPermissions` property of a backend controller to set the permissions required to open its pages. The property is an array of permission codes, and a user with any one of them can see the controller pages.

```php
namespace Acme\Blog\Controllers;

use Backend\Classes\Controller;

class Posts extends Controller
{
    public $requiredPermissions = ['acme.blog.access_posts'];
}
```

Use the **asterisk** symbol to match many permissions. In the next example, the controller pages are accessible to all users who have any permission starting with `acme.blog.`.

```php
public $requiredPermissions = ['acme.blog.*'];
```

## Restricting Access to Features

Use the `BackendAuth::userHasAccess` method to check if the current user is signed in and has a permission. It returns `true` if the permission is granted.

```php
$permissionGranted = BackendAuth::userHasAccess('utilities.logs');
```

There are two methods for checking permissions, `userHasAccess` and `userHasPermission`.

- `userHasAccess` always returns `true` for super users.
- `userHasPermission` is more strict, only returning `true` if the user has the permission in their account or through their role.

Generally, `userHasAccess` is the preferred method as it respects the absolute power of the super user. Both methods take a permission code, or an array of codes, as the first argument. The optional second argument defaults to `true`, which requires every listed permission. Pass `false` to require any one of them.

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

You can also use these methods in backend views to hide parts of the interface. The next example hides a button on a [backend form](../forms/form-controller.md).

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

## How Permissions Are Inherited

Permissions are granted to users directly, or through their role. When checking a permission, the user inherits the permissions of their role, then any permissions set directly on the user override them. For example:

- If user **Bob** has a role called **Genius**; and
- Role **Genius** has the `eat_cake` permission; but
- **Bob** has the `eat_cake` permission specifically set to deny; then
- **Bob** will not get to `eat_cake`.

However:

- If **Bob** has the permission `eat_vegetables` assigned directly to him, but;
- The **Genius** role does not, then;
- **Bob** still gets to `eat_vegetables`.

## Super Users

Administrators can be granted a special flag called "super user" that allows access to all areas. The permission system is bypassed for super users. Super users are not visible to other regular administrators.

::: warning
Any super user can create and remove other super users, so only grant it to the highest level administrator or owner of the application.
:::

## Roles

Roles use the `Backend\Models\UserRole` model. A role is a group of permissions with a name and description. An administrator can only have one role at a time.

October CMS ships with two default system roles called `developer` and `publisher`. You can create any number of custom roles with their own combinations of permissions and assign them to users.

::: tip
System roles cannot change their permissions, however they can be deleted if not required.
:::

### Role Hierarchy

Each role has a ranked position in the backend panel, stored in the `sort_order` column in the database. This sets up a basic organizational structure, where users can only manage roles lower than their own.

In the following example, the **Senior Editor** can manage all the users, outranking the **Staff Writer** and **Fact Checker** roles. The **Fact Checker** role cannot see users or manage permissions above it, in the **Staff Writer** and **Senior Editor** roles.

- Senior Editor
- Staff Writer
- Fact Checker

If the **Manage Admins → Manage Roles** permission is granted, users can manage the users, permissions and roles below their current role.

#### See Also

::: also
* [Users](./users.md)
* [Navigation](./navigation.md)
* [Controllers](./controllers.md)
:::
