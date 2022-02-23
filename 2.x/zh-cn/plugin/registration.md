# 注册(登记)

插件是通过扩展向 CMS 添加新功能的基础。 本文介绍了组件注册。 注册过程允许插件声明其功能，例如 [组件](components.md) 或后端菜单和页面。 插件可以做什么的一些例子：

1. 定义[组件](components.md)。
1. 定义[用户权限](../backend/users.md)。
1. 添加[设置页面](settings.md#oc-backend-settings-pages)、[菜单项](#navigation-menus)、[列表](../backend/lists.md) 和[表单](.. /backend/forms.md）。
1. 创建[数据库表结构和种子数据](updates.md)。
1. 更改[核心或其他插件的功能](events.md)。
1. 提供类、[后端控制器](../backend/controllers-ajax)、视图、资产等文件。

### 目录结构

插件驻留在应用程序目录的 **/plugins** 子目录中。 插件目录结构示例：

```
plugins/
  acme/            <=== 作者/厂商名称
    blog/          <=== 插件名称
      classes/
      components/
      controllers/
      models/
      updates/
      ...
      Plugin.php   <=== 插件注册文件
```

并非所有插件目录都是必需的。 唯一需要的文件是下面描述的**Plugin.php**。 如果您的插件仅提供一个 [部件](components.md)，您的插件目录可能会简单得多，如下所示：

```
plugins/
  acme/            <=== 作者/厂商名称
    blog/          <=== 插件名称
      components/
      Plugin.php   <=== 插件注册文件
```

> **注意**：如果您正在为[市场](https://octobercms.com/help/site/marketplace) 开发插件，则需要[updates/version.yaml](updates.md) 文件。

<a id="oc-plugin-namespaces"></a>
### 插件命名空间

插件命名空间是必不可少的，特别是如果您打算在 [October市场](https://octobercms.com/plugins) 上发布您的插件。当您在市场上注册为作者时，系统会要求您提供作者代码，该代码是所有插件的根命名空间。注册时只能指定一次作者代码。 市场提供的默认作者代码由作者名字和姓氏组成：JohnSmith。注册后无法更改代码。你所有的插件命名空间都应该在根命名空间下定义，例如`\JohnSmith\Blog`。

<a id="oc-registration-file"></a>
## 注册文件

**Plugin.php** 文件，称为*插件注册文件*，是一个初始化脚本，声明了插件的核心功能和信息。注册文件可以提供以下内容：

1. 插件信息、插件名称和作者。
1. 扩展CMS的注册方法。

注册文件应该使用插件命名空间。注册文件应该定义一个名为`Plugin`的类，它扩展了`\System\Classes\PluginBase`类。插件注册类唯一需要的方法是`pluginDetails`。插件注册文件示例：

```php
namespace Acme\Blog;

class Plugin extends \System\Classes\PluginBase
{
    public function pluginDetails()
    {
        return [
            'name' => '博客插件',
            'description' => '提供一些非常酷的博客功能。',
            'author' => 'ACME 公司',
            'icon' => 'icon-leaf'
        ];
    }

    public function registerComponents()
    {
        return [
            \Acme\Blog\Components\Post::class => 'blogPost'
        ];
    }
}
```

<a id="oc-registration-methods"></a>
### 注册方法

插件注册类支持以下方法：

方法 | 描述
------------- | -------------
**pluginDetails()** | 返回有关插件的信息。
**register()** | register 方法，在插件首次注册时调用。
**boot()** | boot 方法，在请求路由之前调用。
**registerMarkupTags()** | 注册可在 CMS 中使用的 [附加标记标签](#extending-twig)。
**registerComponents()** | 注册此插件使用的任何 [前端组件](components#oc-component-registration)。
**registerNavigation()** | 为这个插件注册[后端导航菜单项](#navigation-menus)。
**registerPermissions()** | 注册此插件使用的任何 [后端权限](../backend/users#oc-registering-permissions)。
**registerSettings()** | 注册此插件使用的任何 [后端配置链接](settings#oc-settings-link-registration)。
**registerFormWidgets()** | 注册此插件提供的任何 [后端表单小部件](../backend/widgets#oc-form-widget-registration)。
**registerReportWidgets()** | 注册任何 [后端报告小部件](../backend/widgets#oc-report-widget-registration)，包括仪表板小部件。
**registerListColumnTypes()** | 注册此插件提供的任何 [自定义列表字段类型](../backend/lists.md#oc-custom-column-types)。
**registerMailLayouts()** | 注册此插件提供的任何 [邮件视图布局](mail.md#oc-registering-mail-layouts-templates-partials)。
**registerMailTemplates()** | 注册此插件提供的任何 [邮件视图模板](mail.md#oc-registering-mail-layouts-templates-partials)。
**registerMailPartials()** | 注册此插件提供的任何 [邮件视图部件](mail.md#oc-registering-mail-layouts-templates-partials)。
**registerSchedule()** | 注册定期执行的 [计划任务](../plugin/scheduling.md#oc-defining-schedules)。

### 基本插件信息

`pluginDetails` 是插件注册类的必需方法。 它应该返回一个包含以下键的数组：

键 | 描述
------------- | -------------
**name** | 插件名称，必填。
**description** | 插件描述，必填。
**author** | 插件作者姓名，必填。
**icon** | 插件图标的名称。 可用图标的完整列表可以在 [UI 文档](../ui/icon.md) 中找到。 此字体提供的任何图标名称都是有效的，例如 **icon-glass**、**icon-music**，可选。
**iconSvg** | 用于代替标准图标的 SVG 图标。 SVG 图标应该是一个矩形并且可以支持颜色，可选。
**homepage** | 指向作者网站地址的链接，可选。

<a id="oc-routing-and-initialization"></a>
## 路由和初始化

插件注册文件可以包含两个方法`boot`和`register`。 使用这些方法，您可以做任何您喜欢的事情，例如注册路由或将处理程序附加到事件。

注册插件时会立即调用 register 方法。 `boot` 方法在请求被路由之前被调用。 因此，如果您的操作依赖于另一个插件，则应使用 boot 方法。 例如，在 `boot` 方法中，您可以扩展模型：

```php
public function boot()
{
    User::extend(function($model) {
        $model->hasOne['author'] = \Acme\Blog\Models\Author::class;
    });
}
```

插件还可以提供一个名为 **routes.php** 的文件，其中包含自定义路由逻辑，如 [路由服务](../services/router.md) 中定义的。 例如：

```php
Route::get('api_acme_blog/cleanup_posts', function() {
    return Posts::cleanUp();
});
```

<a id="oc-dependency-definitions"></a>
## 依赖定义

插件可以通过在[插件注册文件](#registration-file) 中定义`$require` 属性来依赖其他插件，该属性应包含被视为需求的插件名称数组。 依赖 **Acme.User** 插件的插件可以通过以下方式声明此要求：

```php
namespace Acme\Blog;

class Plugin extends \System\Classes\PluginBase
{
    /**
     * @var array 插件依赖
     */
    public $require = ['Acme.User'];

    // ...
}
```

依赖定义将影响插件的运行方式和[更新过程如何应用更新](../plugin/updates.md#oc-update-process)。 安装过程将尝试自动安装任何依赖项，但是如果在系统中检测到没有任何依赖项的插件，它将被禁用以防止系统错误。

依赖定义可能很复杂，但应注意防止循环引用。 依赖图应该始终是有向的，循环依赖被认为是设计错误。

<a id="oc-extending-twig"></a>
## 扩展Twig

可以使用插件注册类的`registerMarkupTags` 方法在CMS中注册自定义Twig过滤器和函数。下一个示例注册两个 Twig 过滤器和两个函数。

```php
public function registerMarkupTags()
{
    return [
        'filters' => [
            // 一个全局函数，即 str_plural()
            'plural' => 'str_plural',

            // 本地方法，即 $this->makeTextAllCaps()
            'uppercase' => [$this, 'makeTextAllCaps']
        ],
        'functions' => [
            // 静态方法调用，即 Form::open()
            'form_open' => [\October\Rain\Html\Form::class, 'open'],

            // 使用内联闭包
            'helloWorld' => function() { return 'Hello World!'; }
        ]
    ];
}

public function makeTextAllCaps($text)
{
    return strtoupper($text);
}
```

<a id="oc-navigation-menus"></a>
## 导航菜单

插件可以通过覆盖[插件注册类](#registration-file)的`registerNavigation`方法来扩展后端导航菜单。 本节向您展示如何将菜单项添加到后端导航区域。 注册具有两个子菜单项的顶级导航菜单项的示例：

```php
public function registerNavigation()
{
    return [
        'blog' => [
            'label' => '博客',
            'url' => Backend::url('acme/blog/posts'),
            'icon' => 'icon-pencil',
            'permissions' => ['acme.blog.*'],
            'order' => 500,

            'sideMenu' => [
                'posts' => [
                    'label' => '帖子',
                    'icon' => 'icon-copy',
                    'url' => Backend::url('acme/blog/posts'),
                    'permissions' => ['acme.blog.access_posts'],
                ],
                'categories' => [
                    'label' => '分类',
                    'icon' => 'icon-copy',
                    'url' => Backend::url('acme/blog/categories'),
                    'permissions' => ['acme.blog.access_categories'],
                ]
            ]
        ]
    ];
}
```

当您注册后端导航时，您可以将 [多语言字符串](localization.md) 用于 `label` 值。 后端导航也可以由`permissions` 值控制并对应于定义的[后端用户权限](../backend/users)。 后端导航出现在整个导航菜单项上的顺序由 `order` 值控制。 较高的数字意味着该项目将在菜单项的顺序中稍后出现，而较低的数字意味着它将较早出现。

要使子菜单项可见，您可以在后端控制器中使用 `BackendMenu::setContext [设置导航上下文](../backend/controllers-ajax.md#oc-setting-the-navigation-context) ` 方法。 这将使父菜单项处于活动状态并在侧菜单中显示子项。

键 | 描述
------------- | -------------
**label** | 指定菜单标签多语言字符串键，必需。
**icon** | 来自 [October CMS 图标集](../ui/icon.md) 的图标名称，可选。
**iconSvg** | 用于代替标准图标的SVG图标，SVG图标应该是一个矩形并且可以支持颜色，可选。
**url** | 菜单项应指向的 URL（例如，`Backend::url('author/plugin/controller/action')`，必需。
**counter** | 要在菜单图标附近输出的数值。 该值应该是一个数字或一个返回数字的可调用对象，可选。
**counterLabel** | 一个字符串值，用于描述计数器中的数字引用，可选。
**badge** | 一个字符串值来代替计数器输出，该值应该是一个字符串，如果设置，将覆盖badge属性，可选。
**attributes** | 要应用于菜单项的属性和值的关联数组，可选。
**permissions** | 后端用户必须拥有的一组权限才能查看菜单项(注意：直接访问 URL 仍然需要单独的权限检查)，可选。

以下是系统生成的值，在注册导航项时不提供。

键 | 描述
------------- | -------------
**code** | 作为该菜单选项的唯一标识符的字符串值。
**owner** | 以“Author.Plugin”格式指定菜单项所有者插件或模块的字符串值。

### 导航计数器

导航项支持指定徽章或计数器以指示存在需要注意的项。 这些属性可用于父菜单项和子菜单项。 使用 **counter** 和 **counterLabel** 来显示数字计数器。

```php
'blog' => [
    // ...
    'counter' => [\Author\Plugin\Classes\MyMenuCounterService::class, 'getCounterMethod'],
    'counterLabel' => '描述动态菜单计数器的标签',
],
```

例如，使用 **badge** 显示带有单词的徽章，例如`New`。

```php
'blog' => [
    // ...
    'badge' => 'New'
],
```

## 注册中间件

要注册自定义中间件，您可以使用以下方法扩展 Controller 类。

```php
public function boot()
{
    \Cms\Classes\CmsController::extend(function($controller) {
        $controller->middleware(\Path\To\Custom\Middleware::class);
    });
}
```

或者，您可以通过以下方式将其直接推送到内核中。

```php
public function boot()
{
    // 在堆栈的开头添加一个新的中间件。
    $this->app[\Illuminate\Contracts\Http\Kernel::class]
            ->prependMiddleware('Path\To\Custom\Middleware');

    // 将新的中间件添加到堆栈的末尾。
    $this->app[\Illuminate\Contracts\Http\Kernel::class]
            ->pushMiddleware('Path\To\Custom\Middleware');
}
```
