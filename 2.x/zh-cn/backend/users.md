# 用户和权限

后端的用户管理包括角色、组、权限、密码重置和登录限制等功能。插件还可以注册权限来控制对后端功能的访问。

<a id="oc-users-and-permissions"></a>
## 用户和权限

对October CMS实例的所有部分的访问由权限系统控制。在最低级别，有超级用户(`is_superuser` 标志设置为 true 的用户)、管理员(用户)和权限。 `\Backend\Models\User` 模型是保存有关用户的所有重要信息的容器。

超级用户可以访问系统中的所有内容，并且只能由他们自己或其他超级用户管理；即使管理员拥有`backend.manage_users`权限，常规管理员也无法看到或编辑它们。

> **注意**：任何拥有 `manage_users` 权限的用户都可以管理角色的分配，但只能分配给其他用户(不能分配给自己)，并且角色只能由超级用户创建或修改。

权限是 `author.plugin.permission_name` 形式的字符串key，通过在编辑管理员页面上直接分配或通过用户角色继承授予用户。

检查用户是否具有特定权限时，该用户角色的权限设置将被继承，然后被直接应用于该用户的任何权限覆盖。例如，如果用户 **Bob** 具有角色 **Genius**，并且角色 **Genius** 具有 `eat_cake` 权限，但 **Bob** 具有专门设置为拒绝的 `eat_cake` 权限，则 * *Bob** 不会去 `eat_cake`。但是，如果 **Bob** 具有直接分配给他的 `eat_vegetables` 权限，但 **Genius** 角色没有，那么 **Bob** 仍然可以访问 `eat_vegetables`。

角色 (`\Backend\Models\UserRole`) 是权限分组，具有用于识别角色的名称和描述。管理员一次只能分配一个角色。一个角色可以分配给多个管理员。October默认附带两个系统角色，`developer`和`publisher`。可以创建具有自己权限组合的任意数量的自定义角色并将其应用于用户。

> **注意**：系统角色(`developer`、`publisher` 以及 `is_system` 设置为 `true` 的任何角色)不能通过后端更改其权限。假定他们有权访问所有权限，除非给定权限指定了一个或多个特定角色，它使用权限定义中的`roles`数组键(在这种情况下，只有指定的系统角色有权访问它)。

组(`\Backend\Models\UserGroup`)是用于对管理员进行分组的组织工具，可以将它们视为`用户类别`。它们与权限无关，仅用于组织目的。例如，如果您想向 `总公司职员` 组中的所有用户发送电子邮件，您只需执行 `Mail::sendTo(UserGroup::where('code', 'head-office-staff' )->get()->users, 'author.plugin::mail.important_notification', $data);`

## 后端用户助手

全局 `BackendAuth` 门面可用于管理管理用户，它主要继承 `October\Rain\Auth\Manager` 类。要注册新的管理员用户帐户，请使用 `BackendAuth::register` 方法。

```php
$user = BackendAuth::register([
    'first_name' => 'Some',
    'last_name' => 'User',
    'login' => 'someuser',
    'email' => 'some@website.tld',
    'password' => 'changeme',
    'password_confirmation' => 'changeme'
]);
```

`BackendAuth::check` 方法是检查用户是否已登录的快速方法。要返回已登录的用户模型，请改用 `BackendAuth::getUser`。 此外，活动用户将在任何 [后端控制器](../backend/controllers-ajax.md) 中作为 `$this->user` 使用。

```php
// 如果已登录，则返回 true。
$loggedIn = BackendAuth::check();

// 返回登录用户
$user = BackendAuth::getUser();

// 从控制器返回登录用户
$user = $this->user;
```

您可以使用 `BackendAuth::findUserByLogin` 方法通过登录名查找用户。

```php
$user = BackendAuth::findUserByLogin('someuser');
```

您可以通过使用 `BackendAuth::authenticate` 提供他们的登录名和密码来验证用户。 您还可以通过将 `Backend\Models\User` 模型与 `BackendAuth::login` 一起传递来以用户身份进行身份验证。

```php
// 通过凭据对用户进行身份验证
$user = BackendAuth::authenticate([
    'login' => post('login'),
    'password' => post('password')
]);

// 以特定用户身份登录
BackendAuth::login($user);
```

## 注册权限

插件可以通过覆盖[插件注册类](../plugin/registration.md#oc-registration-file)中的`registerPermissions`方法来注册后端用户权限。 权限被定义为一个数组，其中键对应于权限键，值对应于权限描述。 权限密钥由作者姓名、插件名称和功能名称组成。 这是一个示例代码：

```
acme.blog.access_categories
```

下一个示例显示如何注册后端权限项。 权限是使用权限密钥和描述定义的。 在后端权限管理用户界面中，权限显示为复选框列表。 后端控制器可以使用插件定义的权限来限制用户访问 [页面](#restricting-access-to-backend-pages) 或 [功能](#restricting-access-to-features)。

```php
public function registerPermissions()
{
    return [
        'acme.blog.access_posts' => [
            'label' => '管理博客文章',
            'tab' => 'Blog',
            'order' => 200,
        ],
        // ...
    ];
}
```

您还可以将 `roles` 选项指定为一个数组，其中每个值作为角色 API 代码。 当使用此代码创建角色时，它会成为系统角色，该角色始终将此权限授予具有该角色的用户。

```php
public function registerPermissions()
{
    return [
        'acme.blog.access_categories' => [
            'label' => '管理博客类别',
            'tab' => 'Blog',
            'order' => 200,
            'roles' => ['developer']
        ]
        // ...
    ];
}
```

## 限制对后端页面的访问

在后端控制器类中，您可以指定访问控制器提供的页面需要哪些权限。 它是通过 `$requiredPermissions` 控制器的属性完成的。 此属性应包含一组权限键。 如果用户权限与列表中的任何权限匹配，则框架将让用户查看控制器页面。

```php
<?php namespace Acme\Blog\Controllers;

use Backend\Classes\BackendController;

class Posts extends BackendController
{
    public $requiredPermissions = ['acme.blog.access_posts'];
}
```

您还可以使用 **asterisk** 符号表示"所有权限"条件。 在下一个示例中，所有具有以"acme.blog."字符串开头的权限的用户都可以访问控制器页面：

```php
public $requiredPermissions = ['acme.blog.*'];
```

## 限制对功能的访问

后端用户模型具有允许确定用户是否具有特定权限的方法。 您可以使用此功能来限制后端用户界面的功能。 后端用户支持的权限方式有`hasAccess`和`hasPermission`。 这两种方法都采用两个参数：权限键字符串（或键字符串数组）和一个可选参数，该参数指示与第一个参数一起列出的所有权限都是必需的。

如果用户是超级用户（`is_superuser` 设置为 `true`），`hasAccess` 方法会为任何权限返回 **true**。 `hasPermission` 方法更严格，仅当用户在其帐户中或通过其角色实际上具有指定的权限时才返回 true。 通常，`hasAccess` 是首选方法，因为它尊重超级用户的绝对权力。 以下示例显示了如何使用控制器代码中的方法：

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

您还可以使用后端视图中的方法来隐藏用户界面元素。 下一个示例演示如何隐藏编辑类别 [后端表单](表单)上的按钮：

```php
<?php if ($this->user->hasAccess('acme.blog.delete_categories')): ?>
    <button
        type="button"
        class="oc-icon-trash-o btn-icon danger pull-right"
        data-request="onDelete"
        data-load-indicator="删除类别..."
        data-request-confirm="你真的要删除这个类别吗?">
    </button>
<?php endif ?>
```
