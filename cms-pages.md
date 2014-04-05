# CMS Pages

- [Page configuration](#configuration)
- [Dynamic pages](#dynamic-pages)
- [404 page](#404-page)
- [Error page](#error-page)

All websites have pages. In October pages are represented with page templates. Page template files reside in the **/pages** subdirectory of a theme directory. Page file names do not affect the routing, but it's a good idea to name your pages accordingly to the page function. The files should have the **htm** extension. The [Configuration](themes#configuration-section) and [Twig](themes#twig-section) template sections are required for pages but the [PHP section](themes#php-section) is optional. Below you can see the simplest home page example.

    url = "/"
    ==t
    <h1>Hello, world!</h1>

<a name="configuration" class="anchor" href="#configuration"></a>
## Page configuration

Page configuration is defined in the [Configuration Section](themes#configuration-section) of the page template file. The page configuration defines the page parameters, required for the routing and rendering the page and page [Components](components), which are explained in another article. The following configuration parameters are supported for pages:

- **url** - the page URL, required. The URL syntax is described below.
- **title** - the page title, required.
- **layout** - the page [layout](layouts), optional. If specified, should contain the name of the layout file, without extension, for example: `default`.
- **description** - the page description for the back-end interface, optional.

<a name="url-syntax" class="anchor" href="#url-syntax"></a>
### URL syntax

The page URL is defined with the **url** configuration parameter. URLs should start with the forward slash character and can contain parameters. URLs without parameters are fixed and strict. In the following example the page URL is `/blog`.

    url = "/blog"

URLs with parameters are more flexible. A page with the URL pattern defined in the following example would be displayed for any address like `/blog/post/something`. URL parameters can be accessed by October components or from the page [PHP code](themes#php-section) section.

    url = "/blog/post/:post_id"

This is how you can access the URL parameter from the page PHP section (see the [Dynamic pages](#dynamic-pages) section for more details):

    url = "/blog/post/:post_id"
    ==
    function onStart()
    {
        $post_id = $this->param('post_id');
    }
    ==

Parameter names should be compatible with PHP variable names. To make a parameter optional add the question mark after its name:

    url = "/blog/post/:post_id?"

Parameters in the middle of the URL cannot be optional. In the next example the `:post_id` parameter is marked as optional, but is processed as required.

    url = "/blog/:post_id?/comments"

Optional parameters can have default values which are used as fallback values in case the real parameter value is not presented in the URL. Default values cannot contain the pipe symbols and question marks. The default value is specified after the **question mark**. In the next example the `category_id` parameter would be `10` for this URL: /blog/category

    url = "/blog/category/:category_id?10"

You can also add regular expression validation to parameters. To add a validation expression, add the pipe symbol after the parameter name (or the question mark) and specify the expression. The forward slash symbol is not allowed in the expressions. Examples:

    url = "/blog/:post_id|^[0-9]+$/comments" - this will match /blog/post/10/comments
    ...
    url = "/blog/:post_id|^[0-9]+$" - this will match /blog/post/3
    ...
    url = "/blog/:post_name?|^[a-z0-9\-]+$" - this will match /blog/my-blog-post

> **Note:** subdirectories do not affect page URLs - the URL is defined only with the **url** parameter.

<a name="dynamic-pages" class="anchor" href="#dynamic-pages"></a>
## Dynamic pages

Inside the [Twig section](themes#twig-section) of a page template you can use any native [Twig](http://twig.sensiolabs.org/documentation) functions, filters and tags as well as the [Twig extensions provided by October](markup). Any dynamic page requires **variables**. In October page variables can be prepared by the page or layout [PHP section](themes#php-section) or by [Components](components). In this article we describe how to prepare variables in the PHP section.

<a name="page-cycle-handlers" class="anchor" href="#page-cycle-handlers"></a>
### Page execution cycle handlers

There are two special functions that could be defined in the PHP section: `onStart` and `onEnd`. The onStart function is executed in the beginning of the page execution. The onEnd function is executed before the page is rendered and after the page [components](components) are executed. In the onStart and onEnd functions you can inject variables to the Twig environment. Use the `array notation` to pass variables to the page:

    url = "/"
    ==
    <?
    function onStart()
    {
        $this['hello'] = "Hello world!";
    }
    ?>
    ==
    <h3>{{ hello }}</h3>


The next example is more complicated. It shows how to load a blog post collection from the database and display on the page (the JohnSmith\Blog plugin is imaginary).

    url = "/blog"
    ==
    <?
    use JohnSmith\Blog\Classes\Post;

    function onStart()
    {
      $this['posts'] = Post::orderBy('created_at', 'desc')->get();
    }
    ?>
    ==
    <h2>Latest posts</h2>
    <ul>
        {% for post in posts %}
            <li>
                <h3>{{ post.title }}</h3>
                <p>{{ post.description }}</p>
            </li>
        {% endfor %}
    </ul>

The PHP section can also define AJAX handlers which are described in the [AJAX Framework](ajax) article.

<a name="this-variable" class="anchor" href="#this-variable"></a>
### Accessing the page, layout and URL parameters in templates

The `this` variable is always presented in October Twig environment. This variable contains an object with three fields: 

- **page** - the current page object.
- **layout** - the current layout object.
- **param** - an array of URL parameters.

You can use the `this` variable to output the page title:

    <title>{{ this.page.title }}</title>

<a name="404-page" class="anchor" href="#404-page"></a>
## 404 page

If the theme contains a page with the URL `/404` it is displayed when the system can't find a requested page.

<a name="error-page" class="anchor" href="#error-page"></a>
## Error page

By default any errors will be shown with a detailed error page containing the file contents, line number and stack trace where the error occurred. You can display a friendly error page by setting the configuration value **customErrorPage** to **true** in the `app/config/cms.php` script and creating a page with the URL `/error`.