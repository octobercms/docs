---
subtitle: Twig Filter
---
# |page

The `|page` filter creates a link to a page using a page file name, without an extension, as a parameter. For example, if there is the about.htm page you can use the following code to generate a link to it:

```twig
<a href="{{ 'about'|page }}">About Us</a>
```

Remember that if you refer a page from a subdirectory you should specify the subdirectory name:

```html
<a href="{{ 'contacts/about'|page }}">About Us</a>
```

::: tip
The [Themes documentation](../../cms/themes/themes.md) has more details on subdirectory usage.
:::

To access the link to a certain page from the PHP section, you can use `$this->pageUrl('page-name-without-extension')`.

::: cmstemplate
```ini
```
```php
<?
function onStart()
{
    $this['newsPage'] = $this->pageUrl('blog/overview');
}
?>
```
```twig
{{ newsPage }}
```
:::

You can create a link to the current page by filtering the `this` variable.

```twig
<a href="{{ this|page }}">Refresh page</a>
```

To get the link to the current page in PHP, call the `$this->pageUrl()` method without any arguments.

::: cmstemplate
```ini
```
```php
<?
function onStart()
{
    $this['currentUrl'] = $this->pageUrl();
}
?>
```
```twig
{{ currentUrl }}
```
:::

## Reverse Routing

When linking to a page that has URL parameters defined, the `|page` filter supports reverse routing by passing an array as the first argument.

::: cmstemplate
```ini
url = "/blog/post/:post_id"
```
```twig
[...]
```
:::

Given the above content is found in a CMS page file **post.htm** you can link to this page using:

```twig
<a href="{{ 'post'|page({ post_id: 10 }) }}">
    Blog post #10
</a>
```

If the website address is __https://octobercms.com__ the above example would output the following:

```html
<a href="https://octobercms.com/blog/post/10">
    Blog post #10
</a>
```

## Persistent URL Parameters

If a URL parameter is already presented in the environment, the `|page` filter will use it automatically.

```ini
url = "/blog/post/:post_id"

url = "/blog/post/edit/:post_id"
```

If there are two pages, **post.htm** and **post-edit.htm**, with the above URLs defined, you can link to either page without needing to define the `post_id` parameter.

```twig
<a href="{{ 'post-edit'|page }}">
    Edit this post
</a>
```

When the above markup appears on the **post.htm** page, it will output the following:

```html
<a href="https://octobercms.com/blog/post/edit/10">
    Edit this post
</a>
```

The `post_id` value of *10* is already known and has persisted across the environments. You can disable this functionality by passing the 2nd argument as `false`:

```twig
<a href="{{ 'post'|page(false) }}">
    Unknown blog post
</a>
```

Or by defining a different value:

```twig
<a href="{{ 'post'|page({ post_id: 6 }) }}">
    Blog post #6
</a>
```
