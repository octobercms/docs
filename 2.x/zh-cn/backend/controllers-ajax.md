# 控制器和AJAX

October CMS后端实现了模型-视图-控制器(MVC)模式。 控制器管理后端页面并实现各种功能，如表单和列表。 本文介绍如何开发后端控制器以及如何配置控制器行为。

每个控制器都由一个 PHP 脚本表示，该脚本位于插件目录的 **/controllers** 子目录中。 控制器视图是位于控制器视图目录中的`.htm`文件。 控制器视图目录名称与以小写形式的控制器类名称相匹配。 视图目录还可以包含控制器配置文件。 控制器目录结构示例：

```
plugins/
  acme/
    blog/
      controllers/
        users/                <=== 视图目录
          _partial.htm        <=== 部件文件
          config_form.yaml    <=== 配置文件
          index.htm           <=== 视图文件
        Users.php             <=== 控制器类
        Plugin.php
```

> **提示**：有关使用后端控制器的实际示例，请查看 [Beyond Behaviors 教程系列](https://octobercms.com/support/article/ob-19)。

### 类定义

控制器类必须扩展 `\Backend\Classes\Controller` 类。 与其他任何插件类一样，控制器应该属于 [插件命名空间](../plugin/registration.md#plugin-namespaces)。 在插件中使用的控制器最基本表示如下所示。

```php
namespace Acme\Blog\Controllers;

class Posts extends \Backend\Classes\Controller {

    public function index()    // <=== 动作方法
    {

    }
}
```

通常每个控制器都实现了处理单一类型数据的功能——比如博客文章或类别。 下面描述的所有后端行为都采用这种约定。

### 控制器属性

后端控制器基类定义了许多允许配置页面外观和管理页面安全性的属性：

属性 | 描述
------------- | -------------
**$fatalError** | 允许存储在操作方法中生成的致命异常，以便在视图中显示它。
**$user** | 包含对后端用户对象的引用。
**$suppressView** | 允许阻止视图显示。可以在操作方法或控制器构造函数中更新。
**$params** | 路由参数的数组。
**$action** | 当前请求中正在执行的操作方法的名称。
**$publicActions** | 定义了一系列无需后端用户身份验证即可使用的操作。可以在类定义中被覆盖。
**$requiredPermissions** | 查看此页面所需的权限。可以在类定义或控制器构造函数中设置。有关详细信息，请参阅 [用户和权限](用户)。
**$pageTitle** | 设置页面标题。可以在action方法中设置。
**$bodyClass** | 用于自定义布局的 body 类属性。可以在控制器构造函数或动作方法中设置。
**$guarded** | 控制器特定的方法不能被称为动作。可以在控制器构造函数中扩展。
**$layout** | 为控制器视图指定自定义布局(参见 [布局](../backend/views-partials.md#layouts-and-child-layouts))。

## 动作、视图和路由

公共控制器方法(称为**actions**)与表示该操作对应页面的**视图文件**文件耦合。后端视图文件使用 PHP 语法。 **index.htm**视图文件内容示例，对应**index**动作方法：

```html
<h1>Hello World</h1>
```

该页面的 URL 由作者名、插件名、控制器名和动作名组成。

    backend/[author name]/[plugin name]/[controller name]/[action name]

上述控制器导致以下结果：

    http://example.com/backend/acme/blog/users/index

## 将数据传递给视图

使用控制器的 `$vars` 属性将任何数据直接传递到您的视图：

```php
$this->vars['myVariable'] = 'value';
```

使用 `$vars` 属性传递的变量现在可以在您的视图中直接访问：

```php
<p>变量值为 <?= $myVariable ?></p>
```

## 设置导航上下文

插件可以在[插件注册文件](../plugin/registration.md#navigation-menus)中注册后台导航菜单和子菜单。导航上下文确定当前后端页面的活动后端菜单和子菜单。您可以使用 `BackendMenu` 类设置导航上下文：

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

您可以使用控制器类的 `$pageTitle` 属性设置后端页面的标题(请注意，表单和列表行为可以为您完成)：

```php
$this->pageTitle = '博客类别';
```

## 使用 AJAX 处理程序

后端 AJAX 框架使用与前端页面相同的 [AJAX 库](../ajax/introduction.md)。该库在后端页面上自动加载。

### 后端 AJAX 处理程序

后端 AJAX 处理程序可以在控制器类或 [小部件](widgets.md) 中定义。在控制器类中，AJAX 处理程序被定义为名称以"on"字符串开头的公共方法：**onCreateTemplate**、**onGetTemplateList** 等。

后端 AJAX 处理程序可以返回数据数组、引发异常或重定向到另一个页面(请参阅 [AJAX 事件处理程序](../ajax/handlers.md))。您可以使用 `$this->vars` 设置变量和控制器的 `makePartial` 方法来渲染部件并将其内容作为响应数据的一部分返回。

```php
public function onOpenTemplate()
{
    if (Request::input('someVar') != 'someValue') {
        throw new ApplicationException('Invalid value');
    }

    $this->vars['foo'] = 'bar';

    return [
        'partialContents' => $this->makePartial('some-partial')
    ];
}
```

### 触发 AJAX 请求

可以使用数据属性 API 或 JavaScript API 触发 AJAX 请求。详情请参阅[前端 AJAX 库](../ajax/introduction)。以下示例显示如何使用后端按钮触发请求。

```html
<button
    type="button"
    data-request="onDoSomething"
    class="btn btn-default">
    某个操作
</button>
```

> **注意**：您可以使用前缀 `widget::onName` 专门针对小部件的 AJAX 处理程序。有关详细信息，请参阅 [小部件AJAX处理程序文章](../backend/widgets.md#ajax-handlers)。

## 覆盖响应

您可以覆盖后端控制器中的响应，作为更改 HTTP 请求响应的机制。例如，您可能希望为控制器中的某些操作指定 HTTP 标头，或者在用户不符合某些条件时重定向用户。

覆盖响应非常有用，尤其是在扩展其他控制器时。您会发现在本地调用这些方法很快捷。

```php
\Author\Plugin\Controllers\SomeController::extend(function($controller) {
    $controller->setResponseHeader('Test-Header', 'Test');
});
```

如果你想检查路由的动作或参数，你可以在控制器的 `action` 和 `params` 属性中找到这些可用的。

```php
Author\Plugin\Controllers\SomeController::extend(function($controller) {
    if ($this->action === 'index') {
        // 仅对索引执行此操作
    }

    if ($this->params[0] ?? null) {
        // 仅当第一个参数存在时
    }
});
```

要在响应中添加标头，您可以调用 `setResponseHeader` 方法。

```php
$this->setResponseHeader('Test-Header', 'Test');
```

要更改响应的状态代码，请使用 `setStatusCode` 方法。

```php
$this->setStatusCode(404);
```

要覆盖整个响应，请调用 `setResponse` 方法，这将强制响应，无论页面生命周期中发生什么。

```php
$this->setResponse('找不到网页');
```

您也可以将 `Response` 对象传递给此方法。

```php
$this->setResponse(Response::make(...));
```

> **注意**：查看 [视图和响应文章](../services/response-view) 了解有关构建响应的更多信息。
