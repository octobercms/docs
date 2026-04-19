---
subtitle: 了解如何在后端面板中控制权限。
---
# 权限

权限允许用户在后端面板中拥有特定的权限和功能。例如，创建或删除记录，或查看服务器日志。这些权限基于分配的角色，并且可以按用户单独授予。

## 权限代码

权限代码定义单个权限，是使用"点"表示法的字符串键，例如 `some.area.permission_name`。这些权限通过直接分配或通过角色继承的方式授予用户。

当检查用户是否拥有特定权限时，该用户角色的权限会被继承，然后被直接应用于该用户的任何权限覆盖。例如：

- 如果用户 **Bob** 拥有一个名为 **Genius** 的角色；并且
- 角色 **Genius** 拥有 `eat_cake` 权限；但是
- **Bob** 的 `eat_cake` 权限被明确设置为拒绝；那么
- **Bob** 将无法 `eat_cake`。

但是：

- 如果 **Bob** 被直接分配了 `eat_vegetables` 权限，但是；
- **Genius** 角色没有该权限，那么；
- **Bob** 仍然可以 `eat_vegetables`。

### 嵌套权限

权限代码支持嵌套结构，以便在选择权限时提供更清晰的界面。要嵌套权限代码，"点"值必须是其父级的直接后代，并且支持无限层级嵌套。

在以下示例中，必须先授予 `manage_entries` 权限，`manage_entries.create` 和 `manage_entries.publish` 代码才可用。其可视化表示如下：

::: dir
├── manage_entries
|   ├── manage_entries.create
|   └── manage_entries.publish
└── delete_entries
:::

## 访问级别

对 October CMS 实例所有部分的访问由权限系统控制。`BackendAuth::userHasAccess` 方法是检查当前用户是否已登录并拥有特定区域权限的快捷方式。

```php
// Returns true if the user has permission
$permissionGranted = BackendAuth::userHasAccess('utilities.logs');
```

### 超级用户

管理员可以被授予一个名为"超级用户"的特殊标志，允许访问所有区域。授予后，权限系统将被绕过，可访问所有区域。超级用户对其他普通管理员不可见。

::: warning
任何超级用户都可以创建和删除其他超级用户，因此该权限只应授予最高级别的管理员或应用程序所有者。
:::

### 角色

角色使用 `Backend\Models\UserRole` 模型，是具有名称和描述的权限分组，用于标识角色。管理员一次只能被分配一个角色。

October CMS 默认提供两个系统角色，分别为 `developer` 和 `publisher`。可以创建任意数量的自定义角色，设置各自的权限组合并应用于用户。

::: tip
系统角色的权限无法更改，但如果不需要可以将其删除。
:::

### 角色层级

每个角色在后端面板中都被分配了一个排名位置，在数据库中表示为 `sort_order` 列。这允许建立基本的组织结构，使用户只能管理低于其自身角色的角色。

在以下示例中，**高级编辑** 可以管理所有用户，其级别高于 **编辑** 和 **事实核查员** 角色。而 **事实核查员** 角色无法查看或管理其上级的用户和权限，即 **编辑** 和 **高级编辑** 角色。

- Senior Editor
- Staff Writer
- Fact Checker

如果授予了 **管理管理员 → 管理角色** 权限，用户可以管理其当前角色以下的用户、权限和角色。

## 注册权限

插件可以通过在[插件注册文件](../extending.md)中重写 `registerPermissions` 方法来注册后端用户权限。权限被定义为一个数组，其键对应权限键，值对应权限描述。权限键由作者名称、插件名称和功能名称组成。以下是示例代码。

```
acme.blog.access_categories
```

下一个示例展示了如何注册后端权限项。权限通过权限键和描述来定义。在后端权限管理用户界面中，权限显示为复选框列表。后端控制器可以使用插件定义的权限来限制用户对页面或功能的访问。

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

您还可以指定一个 `roles` 选项作为数组，其中每个值为角色 API 代码。当使用此代码创建角色时，它将成为一个系统角色，始终将此权限授予拥有该角色的用户。

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

## 限制对后端页面的访问

在后端控制器类中，您可以指定访问控制器提供的页面所需的权限。这通过控制器的 `$requiredPermissions` 属性完成。此属性应包含一个权限键数组。如果用户权限与列表中的任何权限匹配，框架将允许用户查看控制器页面。

```php
namespace Acme\Blog\Controllers;

use Backend\Classes\BackendController;

class Posts extends BackendController
{
    public $requiredPermissions = ['acme.blog.access_posts'];
}
```

您还可以使用**星号**符号来表示"所有权限"条件。在下一个示例中，控制器页面对所有拥有以 "acme.blog." 字符串开头的权限的用户可访问：

```php
public $requiredPermissions = ['acme.blog.*'];
```

## 限制对功能的访问

后端用户模型具有允许确定用户是否拥有特定权限的方法。您可以使用此功能来限制后端用户界面的功能。后端用户支持的权限方法有 `userHasAccess` 和 `userHasPermission`。两个方法都接受两个参数：权限键字符串（或键字符串数组）和一个可选参数，指示第一个参数列出的所有权限都是必需的。

`userHasAccess` 方法在用户是超级用户时对任何权限返回 **true**。`userHasPermission` 方法更严格，仅当用户在其账户中或通过其角色实际拥有指定权限时才返回 true。通常，`userHasAccess` 是首选方法，因为它尊重超级用户的绝对权力。以下示例展示了如何在控制器代码中使用这些方法。

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

您还可以在后端视图中使用这些方法来隐藏用户界面元素。下一个示例演示了如何在[后端表单](../forms/form-controller.md)中隐藏按钮。

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
