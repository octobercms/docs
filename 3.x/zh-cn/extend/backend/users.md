---
subtitle: 了解后台面板的用户管理。
---
# 用户

后台面板的用户管理基于管理员，其中 `Backend\Models\User` 模型是保存用户所有重要信息的容器。它包括角色、分组、权限、密码重置和登录限流等功能。插件还可以[注册权限](./permissions.md)来控制对后台功能的访问。

## 后台用户助手

全局 `BackendAuth` facade 可用于管理管理用户，它主要继承自 `October\Rain\Auth\Manager` 类。要注册新的管理用户帐户，请使用 `BackendAuth::register` 方法。

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

`BackendAuth::check` 方法是快速检查用户是否已登录的方式。要返回已登录的用户模型，请使用 `BackendAuth::getUser`。此外，活动用户在任何[后台控制器](../system/controllers.md)中都可以通过 `$this->user` 获取。

```php
// Returns true if signed in.
$loggedIn = BackendAuth::check();

// Returns the signed in user
$user = BackendAuth::getUser();
```

您可以使用 `BackendAuth::findUserByLogin` 方法通过登录名查找用户。

```php
$user = BackendAuth::findUserByLogin('someuser');
```

您可以使用 `BackendAuth::authenticate` 通过提供登录名和密码来验证用户身份。您也可以通过将 `Backend\Models\User` 模型传递给 `BackendAuth::login` 来直接以用户身份登录。

```php
// Authenticate user by credentials
$user = BackendAuth::authenticate([
    'login' => post('login'),
    'password' => post('password')
]);

// Sign in as a specific user
BackendAuth::login($user);
```

## 分组

用户分组使用 `Backend\Models\UserGroup` 模型，是用于对管理员进行分组的组织工具，它们与[用户权限](./permissions.md)无关，严格用于组织目的，例如通知。

例如，如果您想向 `Head Office Staff` 分组中的所有用户发送电子邮件，您可以找到该用户分组及其中的用户。

```php
$group = UserGroup::where('code', 'head-office-staff')->first();

Mail::sendTo($group->users, 'author.plugin:important_notification');
```

## 更改后台用户密码

`october:passwd` 命令允许通过命令行更改后台管理员的密码。如果您被锁定在 October CMS 安装之外，或需要更改默认管理员帐户的密码，这很有用。

```bash
php artisan october:passwd username password
```

第一个参数可以传递登录名或电子邮件地址。第二个参数可以选择性地传递所需的密码，否则将提示您输入密码。
