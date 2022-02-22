# 页面

每个网站至少提供一个页面，在 October CMS 中，一个页面用页面模板表示。 页面模板文件位于主题的 **pages** 目录中。 页面文件名不会影响路由，但根据页面的功能来命名页面是个好主意。 这些文件应具有 **htm** 扩展名。

页面需要 [配置部分](themes.md#configuration-section) 和 [Twig](themes.md#twig-section) 模板部分，但 [PHP 部分](themes.md#php-section) 是可选的 . 下面，您可以看到最简单的主页示例：

```
url = "/"
==
<h1>Hello, world!</h1>
```

## 页面配置

页面配置定义在页面模板文件的[配置部分](themes.md#configuration-section)中。 页面配置定义了路由和渲染页面及其[组件](components.md)所需的页面参数，在另一篇文章中进行了解释。 页面支持以下配置参数：

参数 | 描述
------------- | -------------
**url** | 页面 URL，必填。 URL 语法如下所述。
**title** | 页面标题，必填。
**layout** | 页面 [布局](layouts.md)，可选。 如果指定，则应包含布局文件的名称，不带扩展名，例如：`default`。
**description** | 后端界面的页面描述，可选。
**hidden** | 隐藏页面只能由登录的后端用户访问，可选。

### URL 语法

页面 URL 使用 **url** 配置参数定义。 URL 应以正斜杠字符开头，并且可以包含参数。 没有参数的 URL 是固定且严格的。 在以下示例中，页面 URL 是 `/blog`。

```ini
url = "/blog"
```

> **注意**：页面 URL 默认不区分大小写。

带参数的 URL 更灵活。 具有以下示例中定义的 URL 模式的页面将针对任何地址(如 `/blog/post/something`)显示。 URL 参数可以通过 October 组件或从页面 [PHP 代码](themes.md#php-section) 部分访问。

```ini
url = "/blog/post/:post_id"
```

这是从页面的 PHP 部分访问 URL 参数的方法(有关更多详细信息，请参阅 [动态页面](#dynamic-pages) 部分)：

```
url = "/blog/post/:post_id"
==
function onStart()
{
    $post_id = $this->param('post_id');
}
==
```

参数名称应与 PHP 变量名称兼容。 要使参数可选，请在其名称后添加一个问号：

```ini
url = "/blog/post/:post_id?"
```

URL 中间的参数不能是可选的。 在下一个示例中，`:post_id` 参数被标记为可选，但会按要求进行处理。

```ini
url = "/blog/:post_id?/comments"
```

可选参数可以具有默认值，这些默认值用作备用值，以防 URL 中未显示实际参数值。 默认值不能包含任何星号*、管道符号|或问号?。 默认值在**?**之后指定。 在下一个示例中，URL `/blog/category` 的 `category_id` 参数将为 `10`。

```ini
url = "/blog/category/:category_id?10"
```

您还可以使用正则表达式来验证参数。 要添加验证表达式，请在参数名称后添加管道符号或问号，并指定表达式。 这些表达式中不允许使用正斜杠符号。 例子：

```ini
url = "/blog/:post_id|^[0-9]+$/comments" ; this will match /blog/10/comments

url = "/blog/:post_id|^[0-9]+$" ; this will match /blog/3

url = "/blog/:post_name?|^[a-z0-9\-]+$" ; this will match /blog/my-blog-post
```

通过在参数后放置一个**星号**，可以使用特殊的*通配符*参数。 与常规参数不同，通配符参数可以匹配一个或多个 URL 段。 一个 URL 只能包含一个通配符参数，不能使用正则表达式，也不能跟一个可选参数。

```ini
url = "/blog/:category*/:slug"
```

但是，通配符参数本身可以通过在星号前加上 `?` 字符来成为可选参数。

```ini
url = "/blog/:slug?*"
```

例如，像 `/color/:color/make/:make*/edit` 这样的 URL 将匹配 `/color/brown/make/volkswagen/beetle/retro/edit` 并提取以下参数值：

- color: `brown`
- make: `volkswagen/beetle/retro`

> **注意**：子目录不影响页面 URL - URL 仅使用 **url** 参数定义。

## 动态页面

在页面模板的 [Twig 部分](themes.md#twig-section) 内，您可以使用任何 [由 October 提供的功能、过滤器和标签](../markup/templating.md)。任何动态页面都需要**变量**。 在October，变量可能由页面、布局[PHP 部分](themes.md#php-section) 或[组件](components.md) 准备。在本文中，我们将在 PHP 部分描述如何准备变量。

### 页面执行生命周期

可以在页面和布局的 PHP 部分定义特殊函数：`onInit`、`onStart` 和 `onEnd`。 `onInit` 函数在所有组件初始化时和 AJAX 请求被处理之前执行。 `onStart` 函数在页面执行开始时执行。 `onEnd` 函数在页面渲染之前和页面 [组件](components.md) 执行之后执行。在 `onStart` 和 `onEnd` 函数中，你可以将变量注入到 Twig 环境中。使用 `数组表示法` 将变量传递给页面：

```
url = "/"
==
function onStart()
{
    $this['hello'] = "Hello world!";
}
==
<h3>{{ hello }}</h3>
```

下一个例子更复杂。 它展示了如何从数据库加载博客文章集合，并显示在页面上(Acme\Blog 插件是虚构的)：

```
url = "/blog"
==
use Acme\Blog\Classes\Post;

function onStart()
{
    $this['posts'] = Post::orderBy('created_at', 'desc')->get();
}
==
<h2>最新帖子</h2>
<ul>
    {% for post in posts %}
        <h3>{{ post.title }}</h3>
        {{ post.content }}
    {% endfor %}
</ul>
```

[标记指南](../markup.md) 中描述了 October 提供的默认变量和 Twig 扩展。 [动态布局](layouts.md#dynamic-layouts) 文章描述了处理程序的执行顺序。

### 发送自定义响应

执行生命周期中定义的所有方法都能够停止进程并返回响应——只需从生命周期函数返回响应即可。 下面的示例不会加载任何页面内容，而是将字符串 *Hello world!* 返回给浏览器：

```php
function onStart()
{
    return 'Hello world!';
}
```

一个更有用的例子是使用 `Redirect` 门面触发重定向：

```php
public function onStart()
{
    return Redirect::to('http://google.com');
}
```

### 处理表单

您可以使用在页面或布局中定义的处理程序方法处理标准表单 [PHP 部分](themes.md#php-section)(处理 AJAX 请求在 [AJAX 框架](../ajax/introduction.md) 中有说明) 文章)。 使用 [`form_open()`](markup#standard-form) 函数定义引用事件处理程序的表单。 例子：

```twig
{{ form_open({ request: 'onHandleForm' }) }}
    请输入字符串: <input type="text" name="value"/>
    <input type="submit" value="Submit me!"/>
{{ form_close() }}
<p>Last submitted value: {{ lastValue }}</p>
```

`onHandleForm` 函数可以在页面或布局 [PHP section](themes.md#php-section) 中定义，如下所示：

```php
function onHandleForm()
{
    $this['lastValue'] = post('value');
}
```

处理程序使用 `post` 函数加载值并初始化页面的 `lastValue` 属性变量，该变量显示在第一个示例中的表单下方。

> **注意**：如果在页面布局、页面和页面[组件](components.md)中定义了同名的处理程序，October将执行页面处理程序。 如果在组件和布局中定义了处理程序，则将执行布局处理程序。 处理程序优先级为：页面、布局、组件。

如果要引用在特定 [组件](components.md) 中定义的处理程序，请在处理程序引用中使用该组件的名称或别名：

```twig
{{ form_open({ request: 'myComponent::onHandleForm' }) }}
```

## 404 页面

如果主题包含一个 URL 为 `/404` 的页面，当系统找不到请求的页面时会显示它。

## 错误页面

默认情况下，任何错误都会显示一个详细的错误页面，其中包含文件内容、行号和发生错误的堆栈跟踪。 您可以通过在 `config/app.php` 脚本中将配置值 `debug` 设置为 **false** 并使用 URL `/error` 创建一个页面来显示自定义错误页面。

## 页面变量

可以在[PHP代码部分](../cms/themes.md#php-section)或[组件](../cms/components.md)中通过引用`$this->page`。

```php
function onEnd()
{
    $this->page->meta_title = '不同的页面标题';
}
```

也可以使用 [`this.page` 变量](../markup/this-page) 在标记中访问它们。 例如，要返回页面的标题：

```twig
<p>这个页面的标题是: {{ this.page.meta_title }}</p>
```

更多信息可以在 [标记指南中的`this.page`](../markup/this-page) 中找到。

## 以编程方式注入页面资产

如果需要，您可以使用控制器的 `addCss` 和 `addJs` 方法将资产(CSS 和 JavaScript 文件)注入页面。 它可以在页面的 [PHP 部分](themes.md#php-section) 或 [布局](layout.md) 模板中定义的 `onStart` 函数中完成。 例子：

```php
function onStart()
{
    $this->addCss('assets/css/hello.css');
    $this->addJs('assets/js/app.js');
}
```

如果 `addCss` 和 `addJs` 方法参数中指定的路径以斜杠 (/) 开头，则它将相对于网站根目录。 如果资产路径不以斜杠开头，则它是相对于主题的。

注入的资产可以通过将它们作为数组传递来组合：

```php
function onStart()
{
    $this->addCss(['assets/css/hello.css', 'assets/css/goodbye.css']);
    $this->addJs(['assets/js/app.js', 'assets/js/nav.js']);
}
```

可以使用组合器注入和编译 LESS 和 SCSS 资产：

```php
function onStart()
{
    $this->addCss(['assets/less/base.less']);
}
```

`addCss` 和 `addJs` 的第二个参数允许你为注入的资产提供额外的属性：

```php
function onStart()
{
    $this->addJs(['assets/js/app.js', 'assets/js/nav.js'], ['defer' => true]);
}
```

为了在页面或 [布局](layout.md) 上输出注入的资源，请使用 [{% styles %}](../markup/tag-styles) 和 [{% scripts %}](../markup/tag-scripts)标签。 例子：

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
