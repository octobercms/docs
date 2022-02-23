# 内容块

内容块可以是与页面或布局分开编辑的文本、HTML 或 [Markdown](http://daringfireball.net/projects/markdown/syntax) 块。它们旨在仅保存静态内容并支持基本模板变量。 [部件](partials.md) 更灵活，应该用于生成动态内容。

## 介绍

内容块文件驻留在主题目录的 **/content** 子目录中。内容文件支持以下扩展名。

扩展 |描述
------------- | -------------
**htm** |用于 HTML 标记。
**txt** |用于纯文本。
**MD** |用于 Markdown 语法。

该扩展会影响后端用户界面中内容块的显示模式，可以使用 WYSIWYG 编辑器、纯文本编辑器或 Markdown 编辑器。它还决定在网站上渲染块；例如，Markdown 块会在显示之前转换为 HTML。

## 渲染内容块

使用 `{% content 'file.htm' %}` 标签在 [page](pages.md)、[partial](partials.md) 或 [layout](layouts.md) 中呈现内容块。

此示例显示了呈现内容块的完整页面。

```
url = "/contacts"
==
<div class="contacts">
    {% content 'contacts.htm' %}
</div>
```

另一个使用 `md` 扩展名渲染一些 Markdown 的示例。

```twig
{% content 'my-markdown.md' %}
```

<a id="oc-passing-variables-to-content-blocks"></a>
## 将变量传递给内容块

有时您可能需要将变量从外部代码传递到内容块。虽然内容块不支持 Twig 标记，但它们确实支持使用具有基本语法的变量。您可以通过在 `{% content %}` 标签中的内容块名称之后指定变量来将变量传递给内容块。

将名为“name”且值为 **John** 的变量传递给内容块。

```twig
{% content 'welcome.htm' name='John' %}
```

在内容块内，可以使用单个 *大括号* 访问变量。

```
<h1>This is a demo for {name}</h1>
```

> **提示**：有关变量使用的更多信息可以在 [标记指南](../markup/tag-content.md) 中找到。

### 全局变量

您可以使用`View::share` 方法注册对所有内容块全局可用的变量。

```php
View::share('site_name', 'October CMS');
```

放置此方法的一个公共区域是在[插件注册文件](../plugin/registration.md) 的register或boot方法内。使用上面的示例，变量 `{site_name}` 将在所有内容块中可用。

```
<p>欢迎来到{site_name}</p>
```