---
subtitle: 使用自定义组件扩展 CMS。
---
# 构建 CMS 组件

组件文件和目录位于插件目录的 **components** 子目录中。每个组件都有一个定义组件类的 PHP 文件和一个可选的组件片段目录。组件片段目录名称与组件类名称的小写形式相匹配。组件目录结构示例如下：

::: dir
├── plugins
|   └── acme
|       └── blog
|           ├── `components`
|           |   ├── blogposts  _← Partials Directory_
|           |   |   └── default.htm  _← Default Markup (Optional)_
|           |   └── BlogPosts.php  _← Component Class_
|           └── Plugin.php
:::

组件必须在[插件注册文件](../extend/extending.md)中使用 `registerComponents` 方法进行[注册](../extend/extending.md)。组件可以使用属性及其 [inspector 类型定义](../element/inspector-types.md)进行配置。

## 组件类定义

`create:component` 命令用于创建新的组件类和默认组件视图。第一个参数指定作者和插件名称。第二个参数指定组件类名称。

```bash
php artisan create:component Acme.Blog BlogPosts
```

组件类文件定义了组件的功能和组件属性。组件类文件名应与组件类名匹配。组件类应继承 `Cms\Classes\ComponentBase` 类。下一个示例中的组件应定义在 **plugins/acme/blog/components/BlogPosts.php** 文件中。

```php
namespace Acme\Blog\Components;

class BlogPosts extends \Cms\Classes\ComponentBase
{
    public function componentDetails()
    {
        return [
            'name' => 'Blog Posts',
            'description' => 'Displays a collection of blog posts.',
            'icon' => 'icon-puzzle-piece'
        ];
    }

    /**
     * posts becomes available on the page as {{ component.posts }}
     */
    public function posts()
    {
        return ['First Post', 'Second Post', 'Third Post'];
    }
}
```

`componentDetails` 方法是必需的。该方法应返回一个包含两个键的数组：`name` 和 `description`。名称和描述将显示在 CMS 后端用户界面中。

当此[组件附加到页面或布局](../cms/themes/components.md)时，类的属性和方法将通过组件变量在页面上可用，变量名与组件短名称或别名匹配。例如，如果上一个示例中的 BlogPost 组件使用其短名称定义在页面上：

```ini
url = "/blog"

[blogPosts]
==
```

您可以通过 `blogPosts` 变量访问其 `posts` 方法。请注意，Twig 支持方法的属性表示法，因此您不需要使用括号。

```twig
{% for post in blogPosts.posts %}
    {{ post }}
{% endfor %}
```

### 组件注册

组件必须通过在[插件注册文件](../extend/extending.md)中重写 `registerComponents` 方法来注册。这会告知 CMS 有关该组件的信息，并提供一个用于使用它的**短名称**。注册组件的示例：

```php
public function registerComponents()
{
    return [
        \October\Demo\Components\Todo::class => 'demoTodo'
    ];
}
```

这将注册 Todo 组件类，其默认别名为 **demoTodo**。有关使用组件的更多信息，请参阅 [CMS 组件文章](../cms/themes/components.md)。

## 组件属性

当您将组件添加到页面或布局时，可以使用属性对其进行配置。属性通过组件类的 `defineProperties` 方法定义。下一个示例展示了如何使用 **string** inspector 类型定义组件属性。

```php
public function defineProperties()
{
    return [
        'maxItems' => [
            'title' => 'Max items',
            'description' => 'The most amount of todo items allowed',
            'default' => 10,
            'type' => 'string',
            'validation' => [
                'regex' => [
                    'message' => 'The Max Items property can contain only numeric symbols.',
                    'pattern' => '^[0-9]+$'
                ]
            ]
        ]
    ];
}
```

该方法应返回一个以属性键为索引、属性参数为值的数组。属性键用于在组件类内部访问组件属性值。

::: tip
属性参数和可用类型在 [inspector 类型文章](../element/inspector-types.md)中描述。
:::

在组件内部，您可以使用 `property` 方法读取属性值：

```php
$this->property('maxItems');
```

如果属性值未定义，您可以将默认值作为 `property` 方法的第二个参数提供：

```php
$this->property('maxItems', 6);
```

您还可以以数组形式加载所有属性：

```php
$properties = $this->getProperties();
```

要从组件的 Twig 片段中访问属性，请使用 `__SELF__` 变量，它引用组件对象：

```twig
{{ __SELF__.property('maxItems') }}
```

## 路由参数

组件可以直接访问在[页面 URL](../cms/themes/pages.md) 中定义的路由参数值。

```php
// Returns the URL segment value, eg: /page/:post_id
$postId = $this->param('post_id');
```

在某些情况下，组件属性可以作为硬编码值或引用 URL 中的值。以下硬编码示例展示了使用标识符 `2` 的博客文章：

```ini
url = "/blog/hard-coded-page"

[blogPost]
id = "2"
```

或者，可以使用[组件中的外部属性值](../cms/themes/components.md)从页面 URL 动态引用该值。

```ini
url = "/blog/:my_custom_parameter"

[blogPost]
id = "{{ :my_custom_parameter }}"
```

在两种情况下，都可以使用 `property` 方法检索该值：

```php
$this->property('id');
```

如果您需要访问路由参数名称：

```php
// Returns "my_custom_parameter"
$this->paramName('id');
```

## 处理页面执行周期

组件可以通过在组件类中重写 `onRun` 方法来参与页面执行周期事件。CMS 控制器在每次页面或布局加载时执行此方法。在该方法内部，您可以通过 `page` 属性向 Twig 环境注入变量：

```php
public function onRun()
{
    // This code will be executed when the page or layout is
    // loaded and the component is attached to it.

    $this->page['var'] = 'value'; // Inject some variable to the page
}
```

### 页面执行生命周期处理程序

当页面加载时，October 执行可以在布局和页面 PHP 部分以及组件类中定义的处理函数。处理程序的执行顺序如下。

1. 布局 `onInit()` 函数。
1. 页面 `onInit()` 函数。
1. 布局 `onStart()` 函数。
1. 布局组件 `onRun()` 方法。
1. 布局 `onBeforePageStart()` 函数。
1. 页面 `onStart()` 函数。
1. 页面组件 `onRun()` 方法。
1. 页面 `onEnd()` 函数。
1. 布局 `onEnd()` 函数。

### 组件初始化

有时您可能希望在组件类首次实例化时执行代码。您可以在组件类中重写 `init` 方法来处理任何初始化逻辑，这将在 AJAX 处理程序和页面执行生命周期之前执行。例如，此方法可用于动态地将另一个组件附加到页面。

```php
public function init()
{
    $this->addComponent(\Acme\Blog\Components\BlogPosts::class, 'blogPosts');
}
```

### 通过响应停止

与[布局执行生命周期](../cms/themes/layouts.md)中的所有方法一样，如果组件中的 `onRun` 方法返回一个值，这将在此处停止周期并将响应返回给浏览器。以下示例使用 `Response` facade 返回一条拒绝访问的消息：

```php
public function onRun()
{
    if (true) {
        return Response::make('Access denied!', 403);
    }
}
```

您也可以从 `onRun` 方法返回 404 响应：

```php
public function onRun()
{
    if (true) {
        $this->setStatusCode(404);
        return $this->controller->run('404');
    }
}
```

## AJAX 处理程序

组件可以托管 AJAX 事件处理程序。它们在组件类中的定义方式与在[页面或布局代码](../cms/ajax/handlers.md)中的定义方式完全相同。以下是在组件类中定义的 AJAX 处理方法示例：

```php
public function onAddItem()
{
    $value1 = post('value1');
    $value2 = post('value2');
    $this->page['result'] = $value1 + $value2;
}
```

如果此组件的别名为 *demoTodo*，则可以通过 `demoTodo::onAddItem` 访问此处理程序。请参阅 [AJAX 处理程序文章](../cms/ajax/handlers.md)了解如何在组件中使用 AJAX。

## 默认标记

所有组件都可以带有默认标记，当使用 `{% component %}` 标签将其包含到页面中时会使用该默认标记，但这是可选的。默认标记保存在**组件片段目录**中，该目录与组件类名称的小写形式同名。

默认组件标记应放置在名为 **default.htm** 的文件中。例如，Demo ToDo 组件的默认标记定义在文件 **/plugins/october/demo/components/todo/default.htm** 中。然后可以使用 `{% component %}` 标签将其插入页面的任何位置：

::: cmstemplate
```ini
url = "/todo"

[demoTodo]
```
```twig
{% component 'demoTodo' %}
```
:::

默认标记还可以接受在渲染时覆盖组件属性的参数。

```twig
{% component 'demoTodo' maxItems="7" %}
```

这些属性在 `onRun` 方法中不可用，因为它们是在页面周期完成后才确定的。相反，可以通过在组件类中重写 `onRender` 方法来处理它们。CMS 控制器在渲染默认标记之前执行此方法。

```php
public function onRender()
{
    // This code will be executed before the default component
    // markup is rendered on the page or layout.

    $this->page['var'] = 'Maximum items allowed: ' . $this->property('maxItems');
}
```

## 组件片段

除了默认标记之外，组件还可以提供可在前端或默认标记本身中使用的额外片段。如果 Demo ToDo 组件有一个 **pagination** 片段，它将位于 **/plugins/october/demo/components/todo/pagination.htm**，并使用以下方式在页面上显示：

```twig
{% partial 'demoTodo::pagination' %}
```

还可以使用一种上下文相关的宽松方法。如果在组件片段内部调用，它将直接引用自身。如果在主题片段内部调用，它将扫描页面/布局上使用的所有组件以查找匹配的片段名称并使用它。

```twig
{% partial '@pagination' %}
```

多个组件可以通过将片段文件放置在名为 **components/partials** 的目录中来共享片段。当找不到常规组件片段时，此目录中的片段将用作后备。例如，位于 **/plugins/acme/blog/components/partials/shared.htm** 的共享片段可以由任何组件使用以下方式在页面上显示：

```twig
{% partial '@shared' %}
```

### 引用"自身"

组件可以在其片段内部使用 `__SELF__` 变量引用自身。默认情况下，它将返回[组件的短名称或别名](../cms/themes/components.md)。

```twig
<form data-request="{{__SELF__}}::onEventHandler">
    [...]
</form>
```

组件也可以引用自身的属性。

```twig
{% for item in __SELF__.items() %}
    {{ item }}
{% endfor %}
```

如果在组件片段内部需要渲染另一个组件片段，请将 `__SELF__` 变量与片段名称连接：

```twig
{% partial __SELF__~"::screenshot-list" %}
```

### 唯一标识符

如果在同一页面上调用了相同的组件两次，可以使用 `id` 属性来引用每个实例。

```twig
{{__SELF__.id}}
```

每次显示组件时，ID 都是唯一的。

```twig
<!-- ID: demoTodo527c532e9161b -->
{% component 'demoTodo' %}

<!-- ID: demoTodo527c532ec4c33 -->
{% component 'demoTodo' %}
```

## 从代码渲染片段

您可以在 PHP 代码中使用 `renderPartial` 方法以编程方式渲染组件片段。这将检查组件中名为 `component-partial.htm` 的片段并以字符串形式返回结果。第二个参数用于传递视图变量。在 PHP 中渲染组件片段时，适用与 Twig 中相同的路径解析逻辑；使用 `@` 前缀引用组件自身内部的片段。

```php
$content = $this->renderPartial('@component-partial.htm');

$content = $this->renderPartial('@component-partial.htm', [
    'name' => 'John Smith'
]);
```

例如，将片段作为 [AJAX 处理程序](../cms/ajax/handlers.md)的响应进行渲染：

```php
function onGetTemplate()
{
    return ['#someDiv' => $this->renderPartial('@component-partial.htm')];
}
```

另一个示例是通过从 `onRun` 页面执行周期返回值来覆盖整个页面视图响应。此代码将使用 `Response` facade 专门返回 XML 响应：

```php
public function onRun()
{
    $content = $this->renderPartial('@default.htm');
    return Response::make($content)->header('Content-Type', 'text/xml');
}
```

## 通过组件注入页面资源

组件可以向其附加的页面或布局注入资源（CSS 和 JavaScript 文件）。使用控制器的 `addCss` 和 `addJs` 方法向 CMS 控制器添加资源。这可以在组件的 `onRun` 方法中完成。

```php
public function onRun()
{
    $this->addJs('/plugins/acme/blog/assets/javascript/blog-controls.js');
}
```

如果 `addCss` 和 `addJs` 方法参数中指定的路径以斜杠（`/`）开头，则它将相对于网站根目录。如果资源路径不以斜杠开头，则它相对于组件目录。

`addCss` 和 `addJs` 方法提供第二个参数，以数组形式定义注入资源的属性。

```php
public function onRun()
{
    $this->addJs('/plugins/acme/blog/assets/javascript/blog-controls.js', ['defer' => true]);
}
```

#### 另请参阅

::: also
* [Inspector 类型](../element/inspector-types.md)
:::
