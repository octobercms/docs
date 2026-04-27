---
subtitle: 为网站上的每个页面定义 URL。
---
# 页面

每个网站至少提供一个页面，在 October CMS 中，页面由页面模板表示。页面模板文件位于主题中的 **pages** 目录中。页面文件名不影响路由，但最好根据页面的功能来命名您的页面。文件应具有 **htm** 扩展名。

配置部分和 Twig 模板部分对于页面是必需的，但 PHP 代码部分是可选的。下面，您可以看到最简单的首页示例。

::: cmstemplate
```ini
url = "/"
```
```twig
<h1>Hello, world!</h1>
```
:::

## 页面配置

页面配置在页面模板文件的配置部分中定义。页面配置定义了页面参数，这些参数是路由和渲染页面及其[组件](./components.md)所必需的，组件将在另一篇文章中解释。页面支持以下配置参数：

参数 | 描述
------------- | -------------
**url** | 页面 URL，必填。URL 语法在下面描述。
**title** | 页面标题，必填。
**layout** | 页面[布局](./layouts.md)，可选。如果指定，应包含布局文件的名称（不带扩展名），例如：`default`。
**description** | 后端界面的页面描述，可选。
**hidden** | 隐藏的页面只能由已登录的后端用户访问，可选。

### URL 语法

页面 URL 使用 **url** 配置参数定义。URL 应以正斜杠字符开头，并且可以包含参数。没有参数的 URL 是固定和严格的。在以下示例中，页面 URL 为 `/blog`。

::: tip
页面 URL 默认不区分大小写。

```ini
url = "/blog"
```
:::


带参数的 URL 更加灵活。在以下示例中定义的 URL 模式的页面将为任何类似 `/blog/post/something` 的地址显示。URL 参数可以由 October 组件或从页面 PHP 代码部分访问。

```ini
url = "/blog/post/:post_id"
```

以下是从页面的 PHP 代码部分访问 URL 参数的方法（有关更多详细信息，请参阅动态页面部分）。

::: cmstemplate
```ini
url = "/blog/post/:post_id"
```
```php
function onStart()
{
    $postId = $this->param('post_id');
}
```
```twig
```
:::

参数名称应与 PHP 变量名兼容。要使参数成为可选的，请在其名称后添加问号：

```ini
url = "/blog/post/:post_id?"
```

URL 中间的参数不能是可选的。在下一个示例中，`:post_id` 参数被标记为可选，但会被处理为必需的。

```ini
url = "/blog/:post_id?/comments"
```

可选参数可以有默认值，当 URL 中未提供实际参数值时，这些默认值用作后备值。默认值不能包含任何星号、管道符号或问号。默认值在**问号**后指定。在下一个示例中，对于 URL `/blog/category`，`category_id` 参数将为 `10`。

```ini
url = "/blog/category/:category_id?10"
```

您还可以使用正则表达式来验证参数。要添加验证表达式，请在参数名称或问号后添加管道符号，并指定表达式。这些表达式中不允许使用正斜杠符号。示例：

```ini
url = "/blog/:post_id|^[0-9]+$/comments" ; this will match /blog/10/comments

url = "/blog/:post_id|^[0-9]+$" ; this will match /blog/3

url = "/blog/:post_name?|^[a-z0-9\-]+$" ; this will match /blog/my-blog-post
```

可以通过在参数后放置**星号**来使用特殊的*通配符*参数。与常规参数不同，通配符参数可以匹配一个或多个 URL 段。URL 只能包含一个通配符参数，不能使用正则表达式，也不能后跟可选参数。

```ini
url = "/blog/:category*/:slug"
```

通配符参数本身也可以通过在星号前加上 `?` 字符来设为可选。

```ini
url = "/blog/:slug?*"
```

例如，像 `/color/:color/make/:make*/edit` 这样的 URL 将匹配 `/color/brown/make/volkswagen/beetle/retro/edit` 并提取以下参数值：

- color: `brown`
- make: `volkswagen/beetle/retro`

::: tip
子目录不影响页面 URL - URL 仅由 **url** 参数定义。
:::

## 动态页面

在页面模板的 Twig 部分中，您可以使用任何 [October CMS 提供的函数、过滤器和标签](../../markup/templating.md)。任何动态页面都需要**变量**，变量可以由页面或布局的 PHP 代码部分准备，或由[组件](./components.md)准备。在本文中，我们描述如何在 PHP 代码部分中准备变量。

### 页面执行生命周期

在页面和布局的 PHP 代码部分中可以定义特殊函数：`onInit`、`onStart` 和 `onEnd`。`onInit` 函数在所有组件初始化后和处理 AJAX 请求之前执行。`onStart` 函数在页面执行开始时执行。`onEnd` 函数在页面渲染之前和页面[组件](./components.md)执行之后执行。在 `onStart` 和 `onEnd` 函数中，您可以向 Twig 环境注入变量。使用带数组表示法的 `$this` 将变量传递给页面。

::: cmstemplate
```ini
url = "/"
```
```php
function onStart()
{
    $this['hello'] = "Hello world!";
}
```
```twig
<h3>{{ hello }}</h3>
```
:::

下一个示例更为复杂。它展示了如何从数据库加载博客文章集合并在页面上显示（`Acme\Blog` 插件是虚构的）。

::: cmstemplate
```ini
url = "/blog"
```
```php
use Acme\Blog\Classes\Post;

function onStart()
{
    $this['posts'] = Post::orderBy('created_at', 'desc')->get();
}
```
```twig
<h2>Latest posts</h2>
<ul>
    {% for post in posts %}
        <h3>{{ post.title }}</h3>
        {{ post.content }}
    {% endfor %}
</ul>
```
:::

October CMS 提供的默认变量和 Twig 扩展在[标记指南](../../markup/templating.md)中进行了描述。处理程序的执行顺序在[动态布局部分](./layouts.md)中进行了描述。

### 发送自定义响应

在执行生命周期中定义的所有方法都有能力中止进程并返回响应 - 只需从生命周期函数中返回响应即可。下面的示例不会加载任何页面内容，而是将字符串 *Hello world!* 返回给浏览器：

```php
function onStart()
{
    return 'Hello world!';
}
```

一个更有用的例子可能是使用 `Redirect` facade 触发重定向：

```php
public function onStart()
{
    return Redirect::to('http://google.com');
}
```

### 处理表单

您可以使用在页面或布局 PHP 代码部分中定义的处理程序方法来处理标准表单（AJAX 请求的处理在 [AJAX 框架](../ajax/introduction.md)文章中进行了解释）。使用 `form_open()` [Twig 函数](../../markup/function/form.md)来定义引用事件处理程序的表单。

```html
<form data-request="onHandleForm">
    <div>
        <label>Please enter a string</label>
        <input name="value"/>
    </div>

    <button data-attach-loading>
        Submit
    </button>
</form>

<p>Last submitted value: {{ lastValue }}</p>
```

`onHandleForm` 函数可以在页面或布局的 PHP 代码部分中定义。

```php
function onHandleForm()
{
    $this['lastValue'] = post('value');
}
```

处理程序使用 `post` 函数加载值，并初始化页面的 `lastValue` 属性变量，该变量在第一个示例中显示在表单下方。

::: tip
如果在页面布局、页面和[页面组件](./components.md)中定义了同名的处理程序，October CMS 将执行页面处理程序。如果在组件和布局中定义了处理程序，则将执行布局处理程序。处理程序优先级为：页面、布局、组件。
:::

如果您想引用特定组件中定义的处理程序，请在处理程序引用中使用组件的名称或别名：

```html
<form data-request="myComponent::onHandleForm">...</form>
```

## 404 页面

如果主题包含 URL 为 `/404` 的页面，则当系统找不到请求的页面时将显示该页面。

## 错误页面

默认情况下，任何错误都会显示一个详细的错误页面，其中包含文件内容、行号和发生错误的堆栈跟踪。您可以通过在 `config/app.php` 脚本中将配置值 `debug` 设置为 **false**，并创建 URL 为 `/error` 的页面来显示自定义错误页面。

## 设置页面标题

可以在 PHP 中使用 Page 对象，或在 Twig 中使用[占位符标签](../../markup/tag/placeholder.md)来设置页面标题。

### 使用页面属性

页面的属性可以在 PHP 代码部分或[组件](./components.md)中通过引用 `$this->page` 来访问。以下示例将 `meta_title` 属性设置为新值。

```php
function onEnd()
{
    $this->page->meta_title = 'A different page title';
}
```

可以在 Twig 中使用 `this.page` 变量访问 `{{ this.page }}` 变量。例如，在布局中返回 `meta_title` 属性。

```twig
<title>{{ this.page.meta_title }}</title>
```

::: tip
有关 `this.page` 的更多信息可以在[标记指南](../../markup/property/this-page.md)中找到。
:::

### 使用占位符变量

`{% put %}` 标签允许您将值存储在占位符变量中。以下示例设置了 `pageTitle` 变量。

```twig
{% put pageTitle = 'Yet another page title' %}
```

`placeholder()` Twig 函数用于在布局中访问该变量。

```twig
<title>{{ placeholder('pageTitle') }}</title>
```

可以提供默认值（第二个参数）作为后备。

```twig
<title>{{ placeholder('pageTitle', this.page.meta_title) }}</title>
```

::: tip
有关占位符标签的更多信息可以在[占位符标签文章](../../markup/tag/placeholder.md)中找到。
:::

## 以编程方式注入页面资产

如果需要，您可以使用控制器的 `addCss` 和 `addJs` 方法将资产（CSS 和 JavaScript 文件）注入页面。这可以在页面或[布局模板](./layouts.md)的 PHP 代码部分中定义的 `onStart` 函数中完成。

```php
function onStart()
{
    $this->addCss('assets/css/hello.css');
    $this->addJs('assets/js/app.js');
}
```

如果 `addCss` 和 `addJs` 方法参数中指定的路径以斜杠 (/) 开头，则它将相对于网站根目录。如果资产路径不以斜杠开头，则它相对于主题。

注入的资产可以通过将它们作为数组传递来合并：

```php
function onStart()
{
    $this->addCss(['assets/css/hello.css', 'assets/css/goodbye.css']);
    $this->addJs(['assets/js/app.js', 'assets/js/nav.js']);
}
```

LESS 和 SCSS 资产可以使用合并器注入和编译。

```php
function onStart()
{
    $this->addCss(['assets/less/base.less']);
}
```

`addCss` 和 `addJs` 的第二个参数允许您为注入的资产提供额外的属性：

```php
function onStart()
{
    $this->addJs(['assets/js/app.js', 'assets/js/nav.js'], ['defer' => true]);
}
```

要在页面或[布局](./layouts.md)上输出注入的资产，请使用 `{% styles %}` 和 `{% scripts %}` 标签。示例：

```twig
<head>
    ...
    {% styles %}
</head>
<body>
    ...
    {% scripts %}
</body>
```

::: tip
有关 `{% styles %}` 和 `{% scripts %}` 标签的更多信息可以在[标记指南](../../markup/tag/placeholder.md)中找到。
:::
