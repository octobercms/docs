# 构建组件

组件文件和目录位于插件目录的 **/components** 子目录中。 每个组件都有一个定义组件类的 PHP 文件和一个可选的组件部件目录。 组件部件目录名称用小写的组件类名称匹配。 组件目录结构示例：

```
plugins/
  acme/
    myplugin/
      components/
        componentname/       <=== 部件目录(小写)
          default.htm        <=== 默认标记(可选)
        ComponentName.php    <=== Class文件
      Plugin.php
```

组件必须[在插件注册类中注册](#oc-component-registration) 使用`registerComponents` 方法。

<a id="oc-component-class-definition"></a>
## 组件类定义

**组件类文件**定义了组件功能和[组件属性](#oc-component-properties)。 组件类文件名应与组件类名匹配。 组件类应该扩展`\Cms\Classes\ComponentBase` 类。 下一个示例中的组件应该在 plugins/acme/blog/components/BlogPosts.php 文件中定义。

```php
namespace Acme\Blog\Components;

class BlogPosts extends \Cms\Classes\ComponentBase
{
    public function componentDetails()
    {
        return [
            'name' => '博客文章',
            'description' => '显示博客文章的集合。'
        ];
    }

    /**
     * 帖子在页面上变为可用 {{ component.posts }}
     */
    public function posts()
    {
        return ['First Post', 'Second Post', 'Third Post'];
    }
}
```

`componentDetails` 方法是必需的。 该方法应该返回一个带有两个键的数组：`name` 和 `description`。 名称和描述显示在 CMS 后端用户界面中。

当这个[组件附加到页面或布局](../cms/components.md) 时，类属性和方法通过组件变量在页面上使用，该名称与组件短名称或别名相匹配。 例如，如果上一个示例中的 BlogPost 组件是在具有其短名称的页面上定义的：

```ini
url = "/blog"

[blogPosts]
==
```

你可以通过 `blogPosts` 变量访问它的 `posts` 方法。 请注意，Twig 支持方法的属性符号，因此您不需要使用括号。

```twig
{% for post in blogPosts.posts %}
    {{ post }}
{% endfor %}
```

<a id="oc-component-registration"></a>
### 组件注册

组件必须通过覆盖[插件注册类](registration.md#oc-registration-file)内的`registerComponents`方法来注册。 这会告诉 CMS 有关该组件的信息，并提供一个 **短名称** 以供使用。 注册组件的示例：

```php
public function registerComponents()
{
    return [
        \October\Demo\Components\Todo::class => 'demoTodo'
    ];
}
```

这将使用默认别名 **demoTodo** 注册 Todo 组件类。 有关使用组件的更多信息，请参见 [CMS 组件文章](../cms/components.md)。

<a id="oc-component-properties"></a>
## 组件属性

当您将组件添加到页面或布局时，您可以使用属性对其进行配置。 属性是用组件类的`defineProperties` 方法定义的。 下一个示例显示如何定义组件属性：

```php
public function defineProperties()
{
    return [
        'maxItems' => [
            'title' => '最大项目',
            'description' => '允许的最多待办事项',
            'default' => 10,
            'type' => 'string',
            'validationPattern' => '^[0-9]+$',
            'validationMessage' => 'Max Items 属性只能包含数字符号'
        ]
    ];
}
```

该方法应该返回一个数组，其中属性键作为索引，属性参数作为值。 属性键用于访问组件类中的组件属性值。 属性参数使用具有以下键的数组定义：

键 | 描述
------------- | -------------
**title** | 必需，属性标题，由CMS后端的组件检查器使用。
**description** | 必需，属性描述，由CMS后端的组件检查器使用。
**default** | 可选，当组件被添加到 CMS 后端的页面或布局时使用的默认属性值。
**type** | 可选，指定属性类型。类型定义了属性在检查器中的显示方式。当前支持的类型有 **string**、**checkbox**、**dropdown** 和 **set**。默认值：**string**。
**validationPattern** | 当用户在检查器中输入属性值时使用的可选正则表达式。验证只能与 **string** 属性一起使用。
**validationMessage** | 验证失败时显示的可选错误消息。
**required** | 可选，强制填充字段。留空时使用validationMessage。
**placeholder** | 字符串和下拉属性的可选占位符。
**options** | 下拉属性的可选选项数组。
**depends** | 下拉属性所依赖的属性名称数组。请参阅下面的 [下拉属性](#oc-dropdown-and-set-properties)。
**group** | 一个可选的组名。组在检查器中创建部件以简化用户体验。在多个属性中使用相同的组名来组合它们。
**showExternalParam** | 为检查器中的属性指定外部参数编辑器的可见性。默认值：**true**。

在组件内部，您可以使用 `property` 方法读取属性值：

```php
$this->property('maxItems');
```

如果未定义属性值，您可以提供默认值作为 `property` 方法的第二个参数：

```php
$this->property('maxItems', 6);
```

您还可以将所有属性加载为数组：

```php
$properties = $this->getProperties();
```

要从组件的 Twig 部件访问属性，请使用引用 Component 对象的 `__SELF__` 变量：

```twig
{{ __SELF__.property('maxItems') }}
```

<a id="oc-dropdown-and-set-properties"></a>
### 下拉和设置属性

下拉列表和设置属性的选项列表可以是静态的或动态的。 静态选项是用属性定义的`options` 元素定义的。 例子：

```php
public function defineProperties()
{
    return [
        'units' => [
            'title' => '单位',
            'type' => 'dropdown',
            'default' => 'imperial',
            'placeholder' => '选择单位',
            'options' => ['metric' => '公制', 'imperial' => '英制']
        ]
    ];
}
```

当显示检查器时，可以从服务器动态获取选项列表。 如果在下拉列表或设置属性定义中省略了 `options` 参数，则选项列表被认为是动态的。 组件类必须定义一个返回选项列表的方法。 该方法应具有以下格式的名称：`get*Property*Options`，其中 **Property** 是属性名称，例如：`getCountryOptions`。 该方法返回一个选项数组，其中选项值作为键，选项标签作为值。 动态下拉列表定义示例：

```php
public function defineProperties()
{
    return [
        'country' => [
            'title' => '国家',
            'type' => 'dropdown',
            'default' => 'us'
        ]
    ];
}

public function getCountryOptions()
{
    return ['us' => '美国', 'ca' => '加拿大', 'zh-cn' => '中华人民共和国'];
}
```

动态下拉列表和集合列表可以依赖于其他属性。 例如，州列表可能取决于所选的国家。 依赖项在属性定义中使用 `depends` 参数声明。 下一个示例定义了两个动态下拉属性，并且州列表取决于国家/地区：

```php
public function defineProperties()
{
    return [
        'country' => [
            'title' => '国家',
            'type' => 'dropdown',
            'default' => 'us'
        ],
        'state' => [
            'title' => 'State',
            'type' => 'dropdown',
            'default' => 'dc',
            'depends' => ['country'],
            'placeholder' => '选择一个州'
        ]
    ];
}
```

为了加载州列表，您应该知道当前在检查器中选择了哪个国家。 检查器将所有属性值 POST 到 `getPropertyOptions` 处理程序，因此您可以执行以下操作：

```php
public function getStateOptions()
{
    // 从 POST 加载国家属性值
    $countryCode = post('country');

    $states = [
        'ca' => ['ab' => '艾伯塔省', 'bc' => '不列颠哥伦比亚省'],
        'us' => ['al' => '阿拉巴马州', 'ak' => '阿拉斯加州'],
        'zh-cn' => ['hb' => '河北省', 'hk' => '香港特别行政区', 'tw' => '台湾省']
    ];

    return $states[$countryCode];
}
```

### 页面列表属性

有时组件需要创建指向网站页面的链接。 例如，博客文章列表包含指向博客文章详细信息页面的链接。 在这种情况下，组件应该知道帖子详细信息页面文件名(然后它可以使用 [页面 Twig 过滤器](../markup/filter-page.md))。 October包括一个用于创建动态下拉列表页面的助手。 下一个示例定义了 postPage 属性，该属性显示页面列表：

```php
public function defineProperties()
{
        return [
            'postPage' => [
                'title' => '帖子页面',
                'type' => 'dropdown',
                'default' => 'blog/post'
            ]
        ];
}

public function getPostPageOptions()
{
    return Page::sortBy('baseFileName')->lists('baseFileName', 'baseFileName');
}
```

## 路由参数

组件可以直接访问[页面的URL](../cms/pages.md#oc-url-syntax)中定义的路由参数值。

```php
// 返回 URL 段值，例如：/page/:post_id
$postId = $this->param('post_id');
```

在某些情况下，[组件属性](#oc-component-properties) 可能充当硬编码值或从 URL 引用该值。

这个硬编码示例显示了使用标识符"2"的博客文章：

```ini
url = "/blog/hard-coded-page"

[blogPost]
id = "2"
```

或者，可以使用 [外部属性值](../cms/components.md#oc-using-external-property-values) 从页面 URL 动态引用该值：

```ini
url = "/blog/:my_custom_parameter"

[blogPost]
id = "{{ :my_custom_parameter }}"
```

在这两种情况下，都可以使用 `property` 方法检索值：

```php
$this->property('id');
```

如果需要访问路由参数名称：

```php
// 返回 "my_custom_parameter"
$this->paramName('id');
```

<a id="oc-handling-the-page-execution-cycle"></a>
## 处理页面执行周期

通过覆盖组件类中的`onRun` 方法，组件可以参与到页面执行循环事件中。 每次页面或布局加载时，CMS 控制器都会执行此方法。 在该方法中，您可以通过 `page` 属性将变量注入到 Twig 环境中：

```php
public function onRun()
{
    // 当加载页面或布局并将组件附加到它时，将执行此代码。

    $this->page['var'] = 'value'; // 向页面注入一些变量
}
```

### 页面执行生命周期处理程序

当页面加载时，October 会执行可以在布局，页面 [PHP 部分](../cms/themes.md#oc-php-section) 和组件类中定义的处理程序函数。 处理程序的执行顺序如下：

1.布局`onInit()`函数。
1.页面`onInit()`函数。
1.布局`onStart()`函数。
1.布局组件`onRun()`方法。
1.布局`onBeforePageStart()`函数。
1.页面`onStart()`函数。
1.页面组件`onRun()`方法。
1.页面`onEnd()`函数。
1.布局`onEnd()`函数。

<a id="oc-component-initialization"></a>
### 组件初始化

有时您可能希望在组件类第一次实例化时执行代码。 您可以覆盖组件类中的 `init` 方法来处理任何初始化逻辑，这将在 AJAX 处理程序和页面执行生命周期之前执行。 例如，此方法可用于将另一个组件动态附加到页面。
```php
public function init()
{
    $this->addComponent(\Acme\Blog\Components\BlogPosts::class, 'blogPosts');
}
```

### 停止响应

和[页面执行生命周期](../cms/layouts.md#oc-dynamic-layouts)中的所有方法一样，如果组件中的`onRun`方法有返回值，这将在此停止循环 指向并将响应返回给浏览器。 这里我们使用 `Response` 门面返回一个访问被拒绝的消息：

```php
public function onRun()
{
    if (true) {
        return Response::make('拒绝访问!', 403);
    }
}
```

您还可以从 `onRun` 方法返回 404 响应：

```php
public function onRun()
{
    if (true) {
        $this->setStatusCode(404);
        return $this->controller->run('404');
    }
}
```

<a id="oc-ajax-handlers"></a>
## AJAX 处理程序

组件可以承载 AJAX 事件处理程序。 它们在组件类中的定义与在 [页面或布局代码](../ajax/handlers.md) 中定义的完全一样。 在组件类中定义的示例 AJAX 处理程序方法：

```php
public function onAddItem()
{
    $value1 = post('value1');
    $value2 = post('value2');
    $this->page['result'] = $value1 + $value2;
}
```

如果这个组件的别名是 *demoTodo* 这个处理程序可以通过 `demoTodo::onAddItem` 访问。 有关在组件中使用 AJAX 的详细信息，请参阅 [调用组件中定义的 AJAX 处理程序](../ajax/handlers.md#oc-calling-a-handler) 文章。

## 默认标记

所有组件都可以带有默认标记，当它包含在带有 `{% component %}` 标签的页面上时使用，尽管这是可选的。 默认标记保存在 **component partials 目录** 中，该目录与小写的组件类同名。

默认组件标记应放置在名为 **default.htm** 的文件中。 例如，Demo ToDo 组件的默认标签在文件 **/plugins/october/demo/components/todo/default.htm** 中定义。 然后可以使用 `{% component %}` 标签将其插入到页面的任何位置：

```
url = "/todo"

[demoTodo]
==
{% component 'demoTodo' %}
```

默认标记还可以采用在渲染时覆盖 [组件属性](#oc-component-properties) 的参数。

```twig
{% component 'demoTodo' maxItems="7" %}
```

这些属性在 `onRun` 方法中将不可用，因为它们是在页面循环完成后建立的。 相反，它们可以通过覆盖组件类中的 `onRender` 方法来处理。 CMS 控制器在呈现默认标记之前执行此方法。

```php
public function onRender()
{
    // 此代码将在默认组件之前执行
    // 标记呈现在页面或布局上。

    $this->page['var'] = '允许的最大项目数: ' . $this->property('maxItems');
}
```

<a id="oc-component-partials"></a>
## 组件部件

除了默认标记之外，组件还可以提供可在前端或默认标记本身内使用的附加部件。如果 Demo ToDo 组件有一个 **pagination** 部件，它将位于 **/plugins/october/demo/components/todo/pagination.htm** 并使用以下命令显示在页面上：

```twig
{% partial 'demoTodo::pagination' %}
```

可以使用上下文相关的宽松方法。如果在组件部件内部调用，它将直接引用自身。如果在主题部件内部调用，它将扫描页面/布局上使用的所有组件以查找匹配的部件名称并使用它。

```twig
{% partial '@pagination' %}
```

通过将部件文件放在名为 **components/partials** 的目录中，多个组件可以共享部件。当无法找到常规的组件部件时，在此目录中找到的部件用作后备。例如，位于 **/plugins/acme/blog/components/partials/shared.htm** 的共享部件可以由任何组件使用以下方式显示在页面上：

```twig
{% partial '@shared' %}
```

### 引用"自己"

组件可以通过使用 `__SELF__` 变量在它们的部件内部引用自己。默认情况下，它将返回组件的短名称或 [别名](../cms/components.md#oc-components-aliases)。

```twig
<form data-request="{{__SELF__}}::onEventHandler">
    [...]
</form>
```

组件也可以引用它们自己的属性。

```twig
{% for item in __SELF__.items() %}
    {{ item }}
{% endfor %}
```

如果在组件部件内部，您需要渲染另一个组件部件，将 `__SELF__` 变量与部件名称连接起来：

```twig
{% partial __SELF__~"::screenshot-list" %}
```

### 唯一标识符

如果相同的组件在同一页面上被调用两次，则可以使用 `id` 属性来引用每个实例。

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

## 从代码渲染部件

您可以使用 `renderPartial` 方法以编程方式在 PHP 代码中渲染组件部件。 这将检查名为`component-partial.htm`的部件的组件，并将结果作为字符串返回。 第二个参数用于传递视图变量。 当你在 PHP 中渲染组件部件时，同样的 [路径解析逻辑](#oc-component-partials) 也适用于 Twig； 使用 `@` 前缀来引用组件本身内的部件。

```php
$content = $this->renderPartial('@component-partial.htm');

$content = $this->renderPartial('@component-partial.htm', [
    'name' => '约翰·史密斯'
]);
```

例如，要将部件渲染为对 [AJAX 处理程序](../ajax/handlers.md) 的响应：

```php
function onGetTemplate()
{
    return ['#someDiv' => $this->renderPartial('@component-partial.htm')];
}
```

另一个示例可能是通过从 `onRun` [页面循环方法](#oc-handling-the-page-execution-cycle) 返回一个值来覆盖整个页面视图响应。 此代码将使用 `Response` 门面专门返回一个 XML 响应：

```php
public function onRun()
{
    $content = $this->renderPartial('@default.htm');
    return Response::make($content)->header('Content-Type', 'text/xml');
}
```

<a id="oc-injecting-page-assets-with-components"></a>
## 使用组件注入页面资产

组件可以将资产(CSS 和 JavaScript 文件)注入到它们所附加的页面或布局中。 使用控制器的 `addCss` 和 `addJs` 方法将资产添加到 CMS 控制器。 它可以在组件的 `onRun` 方法中完成。 请阅读有关[在页面文章中注入资产](../cms/pages.md#oc-injecting-page-assets-programmatically)的更多详细信息。 例子：

```php
public function onRun()
{
    $this->addJs('/plugins/acme/blog/assets/javascript/blog-controls.js');
}
```

如果在 `addCss` 和 `addJs` 方法参数中指定的路径以斜杠 (/) 开头，那么它将相对于网站根目录。 如果资产路径不以斜杠开头，则它是相对于组件目录的。

`addCss` 和 `addJs` 方法提供了第二个参数，用于将注入资产的属性定义为数组。 一个特殊的属性 - `build` - 可用，它将使用指定插件的当前版本为您注入的资产添加后缀。 这可用于在插件升级时刷新缓存的资产。
```php
public function onRun()
{
    $this->addJs('/plugins/acme/blog/assets/javascript/blog-controls.js', [
        'build' => 'Acme.Test',
        'defer' => true
    ]);
}
```

您也可以使用字符串作为第二个参数，然后默认使用字符串值作为 `build`。

```php
public function onRun()
{
    $this->addJs('/plugins/acme/blog/assets/javascript/blog-controls.js', 'Acme.Test');
}
```
