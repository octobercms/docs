---
subtitle: 创建实现各种功能的页面，如表单和列表。
---
# 控制器

October CMS 后端实现了模型-视图-控制器（MVC）模式。本文介绍如何开发后端控制器以及如何配置控制器行为。

每个控制器都由一个 PHP 脚本表示，该脚本位于插件目录的 **/controllers** 子目录中。控制器视图是 `.php` 文件，位于控制器视图目录中。控制器视图目录名称与以小写形式书写的控制器类名匹配。视图目录还可以包含控制器配置文件。以下是控制器目录结构的示例：

::: dir
├── plugins
|   └── acme
|       └── blog
|           ├── `controllers`
|           |   ├── users  _← 视图目录_
|           |   |   ├── config_form.yaml  _← 配置文件_
|           |   |   ├── _partial.php  _← 局部视图文件_
|           |   |   └── index.php  _← 视图文件_
|           |   └── Users.php  _← 控制器类_
|           └── Plugin.php
:::

:::tip
有关使用后端控制器的实际示例，请查看 [Beyond Behaviors 教程系列](https://octobercms.com/support/article/ob-19)。
:::

### 类定义

`create:controller` 命令会生成控制器、配置和视图文件。第一个参数指定作者和插件名称。第二个参数指定控制器类名。

```bash
php artisan create:controller Acme.Blog Posts
```

控制器类必须继承 `Backend\Classes\Controller` 类。与任何其他插件类一样，控制器应属于[插件命名空间](../system/plugins.md)。在插件中使用的控制器的最基本表示如下所示。

```php
namespace Acme\Blog\Controllers;

class Posts extends \Backend\Classes\Controller
{
    public function index()    // ← Action method
    {

    }
}
```

通常每个控制器实现与单一类型数据交互的功能——例如博客文章或分类。下面描述的所有后端行为都遵循这一约定。

### 控制器属性

后端控制器基类定义了许多属性，允许配置页面外观和管理页面安全：

属性 | 描述
------------- | -------------
**$fatalError** | 允许存储在操作方法中生成的致命异常，以便在视图中显示。
**$user** | 包含对后端用户对象的引用。
**$suppressView** | 允许阻止视图显示。可以在操作方法或控制器构造函数中更新。
**$params** | 路由参数的数组。
**$action** | 当前请求中正在执行的操作方法的名称。
**$publicActions** | 定义无需后端用户认证即可访问的操作数组。可以在类定义中覆盖。
**$requiredPermissions** | 查看此页面所需的权限。可以在类定义或控制器构造函数中设置。详情请参阅[用户和权限](../backend/users.md)。
**$pageTitle** | 设置页面标题。可以在操作方法中设置。
**$bodyClass** | 用于自定义布局的 body 类属性。可以在控制器构造函数或操作方法中设置。
**$guarded** | 不能作为操作调用的控制器特定方法。可以在控制器构造函数中扩展。
**$layout** | 为[控制器视图](../system/views.md)指定自定义布局。

## 初始化逻辑

控制器可以在原生 `__construct` 方法中执行初始化逻辑。

::: warning
构造函数内的逻辑不受保护，不应处理任何敏感逻辑。
```php
public function __construct()
{
    parent::__construct();
}
```
:::

`beforeDisplay` 方法在权限检查之后调用，大多数逻辑应放在这里。这包括初始化小部件和其他共享组件。

```php
public function beforeDisplay()
{
    // Initialize widgets, handle file uploads, etc.
}
```

## 操作、视图和路由

公共控制器方法，称为**操作**，与代表该操作对应页面的**视图文件**相关联。后端视图文件使用 PHP 语法。以下是 **index.php** 视图文件内容的示例，对应 `index` 操作方法。

```html
<h1>Hello World</h1>
```

此页面的 URL 由作者名称、插件名称、控制器名称和操作名称组成。

```text
admin/[author name]/[plugin name]/[controller name]/[action name]
```

例如，本文开头使用的类定义可以通过以下 URL 访问。

```text
https://example.tld/admin/acme/blog/users/index
```

如果[插件已注册](./plugins.md)并在 `pluginDetails` 方法中设置了 **hint**，则可以使用更短的 URL 结构，这对于在 URL 中隐藏作者名称很有用。

```text
admin/[plugin hint]/[controller name]/[action name]
```

## 向视图传递数据

使用控制器的 `$vars` 属性将任何数据直接传递给你的视图：

```php
$this->vars['myVariable'] = 'value';
```

通过 `$vars` 属性传递的变量现在可以在你的视图中直接访问：

```php
<p>The variable value is <?= $myVariable ?></p>
```

## 设置导航上下文

插件可以在[插件注册文件](../backend/navigation.md)中注册后端导航菜单和子菜单。导航上下文决定了当前后端页面的活动菜单和子菜单。你可以使用 `BackendMenu` 类设置导航上下文：

```php
BackendMenu::setContext('Acme.Blog', 'blog', 'categories');
```

第一个参数指定作者和插件名称。第二个参数设置菜单代码。可选的第三个参数指定子菜单代码。通常你在控制器构造函数中调用 `BackendMenu::setContext`。

```php
namespace Acme\Blog\Controllers;

class Categories extends \Backend\Classes\Controller {

public function __construct()
{
    parent::__construct();

    BackendMenu::setContext('Acme.Blog', 'blog', 'categories');
}
```

你可以使用控制器类的 `$pageTitle` 属性设置后端页面的标题（注意表单和列表行为可以为你完成此操作）：

```php
$this->pageTitle = 'Blog Categories';
```

## 覆盖响应

你可以在后端控制器中覆盖响应，作为修改 HTTP 请求响应的机制。例如，你可能希望为控制器中的某些操作指定 HTTP 头，或者在用户不满足某些条件时重定向用户。

覆盖响应在扩展其他控制器时特别有用。但是你也可能发现在本地调用这些方法很有用。

```php
\Author\Plugin\Controllers\SomeController::extend(function($controller) {
    $controller->setResponseHeader('Test-Header', 'Test');
});
```

如果你想检查路由的操作或参数，可以在控制器的 `getAction` 和 `getParams` 方法中找到它们。

```php
Author\Plugin\Controllers\SomeController::extend(function($controller) {
    if ($controller->getAction() === 'index') {
        // Only do it for the index action
    }

    if ($controller->getParams()[0] ?? null) {
        // Only if first parameter exists
    }
});
```

要向响应添加头信息，可以调用 `setResponseHeader` 方法。

```php
$this->setResponseHeader('Test-Header', 'Test');
```

要更改响应的状态码，使用 `setStatusCode` 方法。

```php
$this->setStatusCode(404);
```

要覆盖整个响应，调用 `setResponse` 方法，这将强制返回该响应，无论页面生命周期中发生了什么。

```php
$this->setResponse('Page Not Found');
```

你也可以向此方法传递一个 `Response` 对象。

```php
$this->setResponse(Response::make(...));
```

查看[视图与响应文章](../services/response-view.md)以获取有关构建响应的更多信息。

#### 另请参阅

::: also
* [视图和响应](../services/response-view.md)
:::
