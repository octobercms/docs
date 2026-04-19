---
subtitle: 用于存储和更新页面内容的专用文件。
---
# 内容块

内容块可以是文本、HTML 或 [Markdown](http://daringfireball.net/projects/markdown/syntax) 块，它们与页面或布局分开编辑。内容块设计用于保存静态内容，并支持基本的模板变量。[部件](./partials.md)更加灵活，应该用于生成动态内容。

## 介绍

内容块文件存放在主题目录的 **/content** 子目录中。内容文件支持以下扩展名。

扩展名 | 描述
------------- | -------------
**html** | 用于 HTML 标记（所见即所得编辑器）。
**htm** | 用于 HTML 标记（代码编辑器）。
**txt** | 用于纯文本。
**md** | 用于 Markdown 语法。

扩展名会影响内容块在后端用户界面中的显示模式，可以是所见即所得编辑器、代码编辑器或 Markdown 编辑器。它还决定了在网站上渲染块的方式；例如，Markdown 块会在显示之前转换为 HTML。

## 渲染内容块

使用 `{% content 'file.htm' %}` 标签在[页面](./pages.md)、[部件](./partials.md)或[布局](./layouts.md)中渲染内容块。

此示例展示了一个渲染内容块的完整页面。

::: cmstemplate
```ini
url = "/contacts"
```
```twig
<div class="contacts">
    {% content 'contacts.html' %}
</div>
```
:::

另一个使用 `md` 扩展名渲染 Markdown 的示例。

```twig
{% content 'my-markdown.md' %}
```

## 向内容块传递变量

有时您可能需要从外部代码向内容块传递变量。虽然内容块不支持 Twig 标记，但它们支持使用基本语法的变量。您可以通过在 `{% content %}` 标签中的内容块名称后面指定变量来向内容块传递变量。

向内容块传递一个名为 `name`、值为 **John** 的变量。

```twig
{% content 'welcome.htm' name='John' %}
```

在内容块内部，可以使用单个*花括号*来访问变量。

```html
<h1>This is a demo for {name}</h1>
```

::: tip
更多关于变量使用的信息可以在[标记指南](../../markup/tag/content.md)中找到。
:::

### 全局变量

您可以使用 `View::share` 方法注册对所有内容块全局可用的变量。

```php
View::share('site_name', 'October CMS');
```

放置此方法的常见位置是[插件注册文件](../../extend/system/plugins.md)的 register 或 boot 方法中。使用上面的示例，变量 `{site_name}` 将在所有内容块中可用。

```html
<p>Welcome to {site_name}</p>
```

#### 参见

::: also
* [Content Twig 标签](../../markup/tag/content.md)
:::
