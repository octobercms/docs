Page templates reside in the **/pages** directory of a theme. Page files should have the **htm** extension. All pages should have the configuration section and Twig section. 

The following configuration parameters are supported for pages:

- **url** - the page URL (required)
- **layout** - the page layout, optional. If specified, should contain the name of the layout file, without extension. For example: "default".
- **description** - the page description for the back-end interface (optional)

Simplest page example:

```php
url = "/"
==
<h1>Hello, world!</h1>
```

#### URL syntax

URLs should start with the forward slash character. URLs can contain parameters. 

```
/blog/post/:post_id
```

Parameter names should be compatible with PHP variable names. To make a parameter optional add the question mark after its name:

```
/blog/post/:post_id?
```

By default, parameters in the middle of the URL are required. For example:

```
/blog/:post_id?/comments
```

Although the `:post_id` parameter is marked as optional, it will be processed as required.

Optional parameters can have default values which are used as fallback values in case the real parameter value is not presented in the URL. Default values cannot contain the pipe symbols and question marks. Specify the default value after the question mark:

```
/blog/category/:category_id?10
```

The `category_id` parameter would be `10` for this URL: /blog/category

You can also add regular expression validation to parameters. To add a validation expression, add the pipe symbol after the parameter name (or the question mark) and specify the expression. The forward slash symbol is not allowed in the expressions. Examples:

```
/blog/:post_id|^[0-9]+$/comments - this will match /blog/post/10/comments
/blog/:post_id|^[0-9]+$ - this will match /blog/post/3
/blog/:post_name?|^[a-z0-9\-]+$ - this will match /blog/my-blog-post
```

> **Note:** Pages within subdirectories do not affect page URLs - the URL is defined only with the **url** parameter.

#### 404 page

If the theme contains a page with the URL `/404` it is displayed when the system can't find a requested page.

#### Error page

By default any errors will be shown with a detailed error page containing the file contents, line number and stack trace where the error occurred. 

You can display a friendly error page by setting the configuration value **customErrorPage** to `true` and creating a page with the URL `/error`.
