---
subtitle: Twig 过滤器
---
# |page

`|page` 过滤器使用页面文件名（不含扩展名）作为参数来创建页面链接。例如，如果有一个 about.htm 页面，您可以使用以下代码生成指向它的链接：

```twig
<a href="{{ 'about'|page }}">About Us</a>
```

请记住，如果您引用子目录中的页面，应指定子目录名称：

```html
<a href="{{ 'contacts/about'|page }}">About Us</a>
```

::: tip
[主题文档](../../cms/themes/themes.md) 中有更多关于子目录使用的详细信息。
:::

要从 PHP 部分访问某个页面的链接，可以使用 `$this->pageUrl('page-name-without-extension')`。

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

您可以通过过滤 `this` 变量来创建指向当前页面的链接。

```twig
<a href="{{ this|page }}">Refresh page</a>
```

要在 PHP 中获取当前页面的链接，请不带任何参数调用 `$this->pageUrl()` 方法。

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

## 反向路由

当链接到定义了 URL 参数的页面时，`|page` 过滤器通过将数组作为第一个参数来支持反向路由。

::: cmstemplate
```ini
url = "/blog/post/:post_id"
```
```twig
[...]
```
:::

假设上述内容在 CMS 页面文件 **post.htm** 中，您可以使用以下方式链接到此页面：

```twig
<a href="{{ 'post'|page({ post_id: 10 }) }}">
    Blog post #10
</a>
```

如果网站地址是 __https://octobercms.com__，上面的示例将输出以下内容：

```html
<a href="https://octobercms.com/blog/post/10">
    Blog post #10
</a>
```

## 持久化 URL 参数

如果 URL 参数已经存在于当前环境中，`|page` 过滤器将自动使用它。

```ini
url = "/blog/post/:post_id"

url = "/blog/post/edit/:post_id"
```

如果有两个页面 **post.htm** 和 **post-edit.htm**，分别定义了上述 URL，您可以在不需要定义 `post_id` 参数的情况下链接到任一页面。

```twig
<a href="{{ 'post-edit'|page }}">
    Edit this post
</a>
```

当上述标记出现在 **post.htm** 页面上时，它将输出以下内容：

```html
<a href="https://octobercms.com/blog/post/edit/10">
    Edit this post
</a>
```

`post_id` 的值 *10* 已经是已知的，并且在环境之间保持持久化。您可以通过将第 2 个参数传递为 `false` 来禁用此功能：

```twig
<a href="{{ 'post'|page(false) }}">
    Unknown blog post
</a>
```

或者通过定义不同的值：

```twig
<a href="{{ 'post'|page({ post_id: 6 }) }}">
    Blog post #6
</a>
```
