---
previousPath: cms/themes/pages.md
subtitle: Create the pages of your website, give each one a URL and add page logic in PHP.
---
# Pages

A page is a template that the website serves at a URL. Page files live in the **pages** directory of your theme and use the **htm** extension.

::: cmstemplate
```ini
url = "/"
```
```twig
<h1>Hello, world!</h1>
```
:::

Pages require the configuration and Twig sections, while the PHP section is optional. The file name does not affect routing, so name each page after its purpose. See [Theme Structure](./structure.md#writing-a-template) for how the sections fit together.

## Page Configuration

The configuration section of a page sets the parameters used to route and render it, along with any [components](./components.md) it uses. Pages support the following parameters.

Parameter | Description
------------- | -------------
**url** | the page URL, required. See [Defining the Page URL](#defining-the-page-url).
**title** | the page title, required.
**layout** | the [layout](./layouts.md) for the page, optional. Use the layout file name without the extension, for example `default`.
**description** | the page description shown in the admin panel, optional.
**is_hidden** | hidden pages are accessible only to administrators who are signed in to the admin panel, optional.
**meta_title** | the title for the layout to output in the `<title>` tag, optional. Supports variables, see [Setting the Page Title](#setting-the-page-title).
**meta_description** | the description for the layout to output in the meta description tag, optional. Supports variables.

## Defining the Page URL

The **url** parameter sets the page URL. URLs start with a forward slash and can contain parameters. A URL without parameters is fixed and strict. The following page answers to `/blog`.

```ini
url = "/blog"
```

Page URLs are case-insensitive. Subdirectories in the **pages** directory do not affect the URL, which is defined only by the **url** parameter.

### URL Parameters

A parameter starts with a colon and matches any value in its URL segment. The following page displays for any address like `/blog/post/something`.

```ini
url = "/blog/post/:post_id"
```

Read the parameter value in the page's PHP section with the `param` method. Components can also read URL parameters, and Twig can read them with [`this.param`](../handbook/twig-properties/this-param.md).

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

Parameter names must be compatible with PHP variable names.

### Optional Parameters

Add a question mark after the name to make a parameter optional.

```ini
url = "/blog/post/:post_id?"
```

Parameters in the middle of the URL cannot be optional. In the next example, the `:post_id` parameter is marked as optional, but is processed as required.

```ini
url = "/blog/:post_id?/comments"
```

An optional parameter can have a default value, used when the URL does not include the parameter. Specify the default after the question mark. Default values cannot contain asterisks, pipe symbols or question marks. In the next example, the `category_id` parameter is `10` for the URL `/blog/category`.

```ini
url = "/blog/category/:category_id?10"
```

### Validating Parameters

To validate a parameter with a regular expression, add a pipe symbol after the parameter name, or after its question mark, followed by the expression. The forward slash is not allowed in these expressions.

```ini
url = "/blog/:post_id|^[0-9]+$/comments" ; this will match /blog/10/comments

url = "/blog/:post_id|^[0-9]+$" ; this will match /blog/3

url = "/blog/:post_name?|^[a-z0-9\-]+$" ; this will match /blog/my-blog-post
```

### Wildcard Parameters

A wildcard parameter, marked with an asterisk after its name, can match one or more URL segments. A URL can contain only one wildcard parameter. It cannot use a regular expression or be followed by an optional parameter.

```ini
url = "/blog/:category*/:slug"
```

To make a wildcard parameter optional, put a question mark before the asterisk.

```ini
url = "/blog/:slug?*"
```

For example, the URL pattern `/color/:color/make/:make*/edit` matches `/color/brown/make/volkswagen/beetle/retro/edit` and extracts the following values.

- color: `brown`
- make: `volkswagen/beetle/retro`

## Adding Page Logic

A dynamic page needs **variables**, which the page or layout PHP section can prepare, or which [components](./components.md) provide. This section shows how to prepare them in the PHP section. The Twig section can then use any [tags, filters and functions](./templating.md) to display them.

### Page Life Cycle

The PHP section of a page can define three special functions.

- `onInit` runs when all components are initialized, before AJAX requests are handled.
- `onStart` runs at the beginning of the page execution.
- `onEnd` runs after the page [components](./components.md) run, before the page renders.

In `onStart` and `onEnd` you can pass variables to the Twig section using array access on `$this`.

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

The next example loads a collection of blog posts from the database and displays them on the page. The `Acme\Blog` plugin is imaginary.

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

Layouts have life cycle functions too. See [Layout Life Cycle](./layouts.md#layout-life-cycle) for the order in which every function runs.

### Sending a Custom Response

Any life cycle function can stop the page and return a response instead. The following example skips the page contents and returns the string *Hello world!* to the browser.

```php
function onStart()
{
    return 'Hello world!';
}
```

A more useful example triggers a redirect using the `Redirect` facade.

```php
public function onStart()
{
    return Redirect::to('http://google.com');
}
```

## Setting the Page Title

The layout usually outputs the page title in its `<title>` tag. A page can set that title in its configuration, in PHP or in Twig.

### Using Page Properties

The `meta_title` and `meta_description` parameters accept variables from the page life cycle, written in Twig variable syntax. The following page builds its title from the **post.title** value.

```ini
url = "/blog"
meta_title = "{{ post.title }} - Blog"
```

Only basic Twig variables are supported. Filters, tags and functions cannot be used.

In the PHP section or a [component](./components.md), the page object is available as `$this->page`. The following sets the `meta_title` property to a new value.

```php
function onEnd()
{
    $this->page->meta_title = 'A different page title';
}
```

The layout reads the property with the `this.page` variable.

```twig
<title>{{ this.page.meta_title }}</title>
```

See [`this.page`](../handbook/twig-properties/this-page.md) for every page property you can read.

### Using Placeholder Variables

The `{% put %}` tag stores a value in a placeholder variable. The following sets the `pageTitle` variable.

```twig
{% put pageTitle = 'Yet another page title' %}
```

The layout reads it with the `placeholder()` function, which takes a default value as the second argument.

```twig
<title>{{ placeholder('pageTitle', this.page.meta_title) }}</title>
```

See the [placeholder tag](../handbook/twig-tags/placeholder.md) for more ways to use placeholders.

## Custom Error Pages

A theme can replace the default error pages with its own pages.

### 404 Page

If the theme contains a page with the URL `/404`, it is displayed when the system can't find the requested page.

### Error Page

By default, errors show a detailed error page with the file contents, line number and stack trace where the error occurred. To display a custom error page instead, set `debug` to **false** in the **config/app.php** file and create a page with the URL `/error`. See [Debug Mode](../setup/configuration.md#debug-mode) for more about this setting.

## Handling Forms

The page or layout PHP section can define handler functions for forms. Handler names start with `on`. Use the `form_open()` [Twig function](../handbook/twig-functions/form.md) with the `request` option to post a standard form to a handler.

```twig
{{ form_open({ request: 'onHandleForm' }) }}
    <div>
        <label>Please enter a string</label>
        <input name="value"/>
    </div>

    <button type="submit">
        Submit
    </button>
{{ form_close() }}

<p>Last submitted value: {{ lastValue }}</p>
```

Define the `onHandleForm` function in the page or layout PHP section.

```php
function onHandleForm()
{
    $this['lastValue'] = post('value');
}
```

The handler reads the value with the `post` function and sets the `lastValue` variable, which displays below the form. To submit the form with AJAX instead, use the `data-request` attribute, as described in the [AJAX Framework](./ajax/introduction.md).

```html
<form data-request="onHandleForm">...</form>
```

::: tip
When a page, its layout and a [component](./components.md) define a handler with the same name, the page handler runs. When only a component and the layout define it, the layout handler runs. The precedence is page, layout, component.
:::

To call a handler from a specific component, prefix the handler with the component's name or alias.

```html
<form data-request="myComponent::onHandleForm">...</form>
```

## Adding CSS and JavaScript from PHP

You can inject CSS and JavaScript files into a page with the `addCss` and `addJs` methods. Call them in the `onStart` function of a page or [layout](./layouts.md).

```php
function onStart()
{
    $this->addCss('assets/css/hello.css');
    $this->addJs('assets/js/app.js');
}
```

A path that begins with a slash (/) is relative to the website root. Any other path is relative to the theme.

Pass an array to combine several files.

```php
function onStart()
{
    $this->addCss(['assets/css/hello.css', 'assets/css/goodbye.css']);
    $this->addJs(['assets/js/app.js', 'assets/js/nav.js']);
}
```

The combiner also compiles LESS and SCSS files.

```php
function onStart()
{
    $this->addCss(['assets/less/base.less']);
}
```

The second argument adds attributes to the injected tags.

```php
function onStart()
{
    $this->addJs(['assets/js/app.js', 'assets/js/nav.js'], ['defer' => true]);
}
```

Output the injected files with the `{% styles %}` and `{% scripts %}` tags, usually in the [layout](./layouts.md).

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

See [System Placeholders](../handbook/twig-tags/placeholder.md#system-placeholders) for more about these tags.

#### See Also

::: also
* [Layouts](./layouts.md)
* [Twig Templating](./templating.md)
* [`this.page` Twig Property](../handbook/twig-properties/this-page.md)
* [Placeholder Twig Tag](../handbook/twig-tags/placeholder.md)
* [AJAX Framework](./ajax/introduction.md)
:::
