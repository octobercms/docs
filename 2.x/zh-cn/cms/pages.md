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

这是从页面的 PHP 部分访问 URL 参数的方法（有关更多详细信息，请参阅 [动态页面](#dynamic-pages) 部分）：

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

在页面模板的 [Twig 部分](themes.md#twig-section) 内，您可以使用任何 [由 October 提供的功能、过滤器和标签](../markup)。任何动态页面都需要**变量**。 在October，变量可能由页面、布局[PHP 部分](themes.md#php-section) 或[组件](components.md) 准备。在本文中，我们将在 PHP 部分描述如何准备变量。

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

下一个例子更复杂。 它展示了如何从数据库加载博客文章集合，并显示在页面上（Acme\Blog 插件是虚构的）：

```
url = "/blog"
==
use Acme\Blog\Classes\Post;

function onStart()
{
    $this['posts'] = Post::orderBy('created_at', 'desc')->get();
}
==
<h2>Latest posts</h2>
<ul>
    {% for post in posts %}
        <h3>{{ post.title }}</h3>
        {{ post.content }}
    {% endfor %}
</ul>
```

The default variables and Twig extensions provided by October are described in the [Markup Guide](../markup.md). The sequence that the handlers are executed in is described by the [Dynamic layouts](layouts.md#dynamic-layouts) article.

### Sending a Custom Response

All methods defined in the execution life cycle have the ability to halt the process and return a response - simply return a response from the life cycle function. The example below will not load any page contents, and instead return the string *Hello world!* to the browser:

```php
function onStart()
{
    return 'Hello world!';
}
```

A more useful example might be triggering a redirect using the `Redirect` facade:

```php
public function onStart()
{
    return Redirect::to('http://google.com');
}
```

### Handling Forms

You can handle standard forms with handler methods defined in the page or layout [PHP section](themes.md#php-section) (handling the AJAX requests is explained in the [AJAX Framework](../ajax/introduction.md) article). Use the [`form_open()`](markup#standard-form) function to define a form that refers to an event handler. Example:

```twig
{{ form_open({ request: 'onHandleForm' }) }}
    Please enter a string: <input type="text" name="value"/>
    <input type="submit" value="Submit me!"/>
{{ form_close() }}
<p>Last submitted value: {{ lastValue }}</p>
```

The `onHandleForm` function can be defined in the page or layout [PHP section](themes.md#php-section), like so:

```php
function onHandleForm()
{
    $this['lastValue'] = post('value');
}
```

The handler loads the value with the `post` function and initializes the page's `lastValue` attribute variable which is displayed below the form in the first example.

> **Note**: If a handler with the same name is defined in the page layout, the page, and a page [component](components.md), October will execute the page handler. If a handler is defined in a component and a layout, the layout handler will be executed. The handler precedence is: page, layout, component.

If you want to refer to a handler defined in a specific [component](components.md), use the component's name or alias in the handler reference:

```twig
{{ form_open({ request: 'myComponent::onHandleForm' }) }}
```

## 404 Page

If the theme contains a page with the URL `/404`, it is displayed when the system can't find a requested page.

## Error Page

By default, any errors will be shown with a detailed error page containing the file contents, line number, and stack trace where the error occurred. You can display a custom error page by setting the configuration value `debug` to **false** in the `config/app.php` script, and creating a page with the URL `/error`.

## Page Variables

The properties of a page can be accessed in the [PHP code section](../cms/themes.md#php-section), or [Components](../cms/components.md) by referencing `$this->page`.

```php
function onEnd()
{
    $this->page->meta_title = 'A different page title';
}
```

They can also be accessed in the markup using the [`this.page` variable](../markup/this-page). For example, to return the title of a page:

```twig
<p>The title of this page is: {{ this.page.meta_title }}</p>
```

More information can be found at [`this.page` in the Markup guide](../markup/this-page).

## Injecting Page Assets Programmatically

If needed, you can inject assets (CSS and JavaScript files) into pages with the controller's `addCss` and `addJs` methods. It could be done in the `onStart` function defined in the [PHP section](themes.md#php-section) of a page or [layout](layout.md) template. Example:

```php
function onStart()
{
    $this->addCss('assets/css/hello.css');
    $this->addJs('assets/js/app.js');
}
```

If the path specified in the `addCss` and `addJs` method argument begins with a slash (/), it will be relative to the website root. If the asset path does not begin with a slash, it is relative to the theme.

Injected assets can be combined by passing them as an array:

```php
function onStart()
{
    $this->addCss(['assets/css/hello.css', 'assets/css/goodbye.css']);
    $this->addJs(['assets/js/app.js', 'assets/js/nav.js']);
}
```

LESS and SCSS assets can be injected and compiled using the combiner:

```php
function onStart()
{
    $this->addCss(['assets/less/base.less']);
}
```

The second argument of `addCss` and `addJs` allows you to provide additional attributes to your injected assets:

```php
function onStart()
{
    $this->addJs(['assets/js/app.js', 'assets/js/nav.js'], ['defer' => true]);
}
```

In order to output the injected assets on pages or [layouts](layout.md), use the [{% styles %}](../markup/tag-styles) and [{% scripts %}](../markup/tag-scripts) tags. Example:

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
