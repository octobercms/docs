# |page

`|page` 过滤器使用页面文件名(不带扩展名)作为参数创建指向页面的链接。 例如，如果有 about.htm 页面，您可以使用以下代码生成指向它的链接：

```twig
<a href="{{ 'about'|page }}">关于我们</a>
```

切记，如果您从子目录引用页面，则应指定子目录名称： 

```html
<a href="{{ 'contacts/about'|page }}">关于我们</a>
```

> **注意**:  [主题文档](../cms/themes.md#subdirectories) 有更多关于子目录使用的细节。

要从 PHP 部分访问特定页面的链接，您可以使用 `$this->pageUrl('page-name-without-extension')`:

```
==
<?
function onStart() {
    $this['newsPage'] = $this->pageUrl('blog/overview');
}
?>
==
{{ newsPage }}
```

您可以通过过滤空字符串来创建指向当前页面的链接：

```twig
<a href="{{ ''|page }}">刷新页面</a>
```

要在 PHP 中获取到当前页面的链接，可以使用带有空字符串的 `$this->pageUrl('')`。

```
==
<?php
function onStart() {
    $this['currentUrl'] = $this->pageUrl('');
}
?>
==
{{ currentUrl }}
```

## 反向路由

当链接到一个带有参数的URL页面时，`|page` 过滤器通过传递一个数组作为第一个参数来支持反向路由
```
url = "/blog/post/:post_id"
==
[...]
```

鉴于上述内容位于 CMS 页面文件 **post.htm** 中，您可以使用以下方法链接到该页面：

```twig
<a href="{{ 'post'|page({ post_id: 10 }) }}">
    Blog post #10
</a>
```

如果网站地址是 __https://octobercms.com__ 则上面的示例将输出以下内容：

```html
<a href="https://octobercms.com/blog/post/10">
    Blog post #10
</a>
```

## 持久URL参数

如果环境中已经存在 URL 参数，`|page` 过滤器将自动使用它。

```
url = "/blog/post/:post_id"

url = "/blog/post/edit/:post_id"
```

如果有两个页面，**post.htm** 和 **post-edit.htm**，并定义了上述 URL，您可以链接到任一页面，而无需定义 `post_id` 参数。

```twig
<a href="{{ 'post-edit'|page }}">
    编辑这个帖子
</a>
```

当上述标记出现在 **post.htm** 页面上时，它将输出以下内容：

```html
<a href="https://octobercms.com/blog/post/edit/10">
    编辑这个帖子
</a>
```

*10* 的 `post_id` 值是已知的，并且已在整个环境中持续存在。 您可以通过将第二个参数传递为 `false` 来禁用此功能

```twig
<a href="{{ 'post'|page(false) }}">
    未知的博文
</a>
```

或者通过定义不同的值：

```twig
<a href="{{ 'post'|page({ post_id: 6 }) }}">
    博客帖子 #6
</a>
```
