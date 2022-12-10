---
subtitle: Define a URL for each page on your website.
---
# Pages

Every website serves up at least one page and in October CMS, a page is represented with page template. Page template files reside in the **pages** directory in your theme. Page file names do not affect the routing, but it's a good idea to name your pages according to the page's function. The files should have the **htm** extension.

The Configuration and Twig template sections are required for pages, but the PHP section is optional. Below, you can see the simplest home page example.

```twig
url = "/"
==
<h1>Hello, world!</h1>
```

## Page Configuration

Page configuration is defined in the configuration Section of the page template file. The page configuration defines the page parameters, required for the routing and rendering the page and its [Components](./components.md), which are explained in another article. The following configuration parameters are supported for pages:

Parameter | Description
------------- | -------------
**url** | the page URL, required. The URL syntax is described below.
**title** | the page title, required.
**layout** | the page [layout](./layouts.md), optional. If specified, should contain the name of the layout file, without extension, for example: `default`.
**description** | the page description for the back-end interface, optional.
**hidden** | hidden pages are accessible only by logged-in back-end users, optional.

### URL Syntax

The page URL is defined with the **url** configuration parameter. URLs should start with the forward slash character, and can contain parameters. URLs without parameters are fixed and strict. In the following example, the page URL is `/blog`.

::: tip
The page URL is case-insensitive by default.

```ini
url = "/blog"
```
:::


URLs with parameters are more flexible. A page with the URL pattern defined in the following example would be displayed for any address like `/blog/post/something`. URL parameters can be accessed by October components or from the page PHP code section.

```ini
url = "/blog/post/:post_id"
```

This is how you can access the URL parameter from the page's PHP section (see the Dynamic Pages section for more details).

```php
url = "/blog/post/:post_id"
==
function onStart()
{
    $postId = $this->param('post_id');
}
==
```

Parameter names should be compatible with PHP variable names. To make a parameter optional, add a question mark after its name:

```ini
url = "/blog/post/:post_id?"
```

Parameters in the middle of the URL cannot be optional. In the next example, the `:post_id` parameter is marked as optional, but is processed as required.

```ini
url = "/blog/:post_id?/comments"
```

Optional parameters can have default values which are used as fallback values in case the real parameter value is not presented in the URL. Default values cannot contain any asterisks, pipe symbols, or question marks. The default value is specified after the **question mark**. In the next example, the `category_id` parameter would be `10` for the URL `/blog/category`.

```ini
url = "/blog/category/:category_id?10"
```

You can also use regular expressions to validate parameters. To add a validation expression, add a pipe symbol after the parameter name, or a question mark, and specify the expression. The forward slash symbol is not allowed in these expressions. Examples:

```ini
url = "/blog/:post_id|^[0-9]+$/comments" ; this will match /blog/10/comments

url = "/blog/:post_id|^[0-9]+$" ; this will match /blog/3

url = "/blog/:post_name?|^[a-z0-9\-]+$" ; this will match /blog/my-blog-post
```

It is possible to use a special *wildcard* parameter by placing an **asterisk** after the parameter. Unlike regular parameters, wildcard parameters can match one or more URL segments. A URL can only ever contain a single wildcard parameter, cannot use regular expressions, or be followed by an optional parameter.

```ini
url = "/blog/:category*/:slug"
```

Wildcard parameters themselves can be made optional by preceding the asterisk with the `?` character however.

```ini
url = "/blog/:slug?*"
```

For example, a URL like `/color/:color/make/:make*/edit` will match `/color/brown/make/volkswagen/beetle/retro/edit` and extract the following parameter values:

- color: `brown`
- make: `volkswagen/beetle/retro`

::: tip
Subdirectories do not affect page URLs - the URL is defined only with the **url** parameter.
:::

## Dynamic Pages

Inside the Twig section of a page template, you can use any [functions, filters, and tags provided by October CMS](../../markup/templating.md). Any dynamic page requires **variables** and variables may be prepared by the page or layout PHP section, or by [Components](./components.md). In this article, we describe how to prepare variables in the PHP section.

### Page Execution Life Cycle

There are special functions that can be defined in the PHP section of pages and layouts: `onInit`, `onStart`, and `onEnd`. The `onInit` function is executed when all components are initialized and before AJAX requests are handled. The `onStart` function is executed during the beginning of the page execution. The `onEnd` function is executed before the page is rendered and after the page [components](./components.md) are executed. In the `onStart` and `onEnd` functions, you can inject variables into the Twig environment. Use the `$this` with array notation to pass variables to the page.

```php
url = "/"
==
function onStart()
{
    $this['hello'] = "Hello world!";
}
==
<h3>{{ hello }}</h3>
```

The next example is more complicated. It shows how to load a blog post collection from the database, and display on the page (the Acme\Blog plugin is imaginary).

```php
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

The default variables and Twig extensions provided by October CMS are described in the [Markup Guide](../../markup/templating.md). The sequence that the handlers are executed in is described by the [Dynamic Layouts section](./layouts.md).

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

You can handle standard forms with handler methods defined in the page or layout PHP section (handling the AJAX requests is explained in the [AJAX Framework](../ajax/introduction.md) article). Use the `form_open()` [Twig function](../../markup/function/form.md) to define a form that refers to an event handler.

```twig
{{ form_open({ request: 'onHandleForm' }) }}
    Please enter a string: <input type="text" name="value"/>
    <input type="submit" value="Submit me!"/>
{{ form_close() }}
<p>Last submitted value: {{ lastValue }}</p>
```

The `onHandleForm` function can be defined in the page or layout PHP section.

```php
function onHandleForm()
{
    $this['lastValue'] = post('value');
}
```

The handler loads the value with the `post` function and initializes the page's `lastValue` attribute variable which is displayed below the form in the first example.

::: tip
If a handler with the same name is defined in the page layout, the page, and a [page component](./components.md), October CMS will execute the page handler. If a handler is defined in a component and a layout, the layout handler will be executed. The handler precedence is: page, layout, component.
:::

If you want to refer to a handler defined in a specific component, use the component's name or alias in the handler reference:

```twig
{{ form_open({ request: 'myComponent::onHandleForm' }) }}
```

## 404 Page

If the theme contains a page with the URL `/404`, it is displayed when the system can't find a requested page.

## Error Page

By default, any errors will be shown with a detailed error page containing the file contents, line number, and stack trace where the error occurred. You can display a custom error page by setting the configuration value `debug` to **false** in the `config/app.php` script, and creating a page with the URL `/error`.

## Page Variables

The properties of a page can be accessed in the PHP code section or [Components](./components.md) by referencing `$this->page`.

```php
function onEnd()
{
    $this->page->meta_title = 'A different page title';
}
```

They can also be accessed in the markup using the `this.page` variable. For example, to return the title of a page:

```twig
<p>The title of this page is: {{ this.page.meta_title }}</p>
```

::: tip
More information on `this.page` can be found in [the Markup guide](../../markup/property/this-page.md).
:::

## Injecting Page Assets Programmatically

If needed, you can inject assets (CSS and JavaScript files) into pages with the controller's `addCss` and `addJs` methods. It could be done in the `onStart` function defined in the PHP section of a page or [layout template](./layouts.md).

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

LESS and SCSS assets can be injected and compiled using the combiner.

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

In order to output the injected assets on pages or [layouts](./layouts.md), use the `{% styles %}` and `{% scripts %}` tags. Example:

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
More information on `{% styles %}` and `{% scripts %}` tags can be found at [the Markup guide](../../markup/tag/placeholder.md).
:::
