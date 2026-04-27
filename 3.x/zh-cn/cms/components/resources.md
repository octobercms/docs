---
subtitle: 向页面注入资源、变量和头信息。
---
# 资源（Resources）

`resources` 组件可以创建新变量、添加头信息并向页面注入资源。资源组件可以在任何页面、布局或部件中使用。

## 可用属性

该组件支持以下属性。

属性 | 描述
-------- | -------------
**js** | 主题 **assets/js** 文件夹中的 JavaScript 文件数组
**less** | 主题 **assets/less** 文件夹中的 LESS 文件数组
**scss** | 主题 **assets/scss** 文件夹中的 SCSS 文件数组
**css** | 主题 **assets/css** 文件夹中的样式表文件数组
**vars** | 包含页面或布局上可用的变量。
**headers** | 包含页面响应中的头信息。

## 基本用法

以下示例使用 `vars` 属性创建一个名为 **activeNav** 的新变量，该变量在页面生命周期中可用，包括该页面的布局或页面上使用的部件。通过 `{{ activeNav }}` Twig 变量来访问该变量。

::: cmstemplate
```ini
[resources]
vars[activeNav] = 'blog'
```
```twig
{% if activeNav == 'blog' %}
    <p>The blog is active!</p>
{% endif %}
```
:::

## 注入变量

资源组件允许您在页面上定义任意数量的变量。这些变量将作为常规的 Twig 变量在布局中可用。

```ini
[resources]
vars[activeNav] = 'blog'
```

您还可以使用页面周期中的参数。在以下示例中，`activeNav` 变量将包含 `:slug` 页面路由中的值。

```ini
url = "mypage/:slug"

[resources]
vars[activeNav] = '{{ :slug }}'
```

此概念也适用于组件变量。以下示例通过页面路由中的 `:slug` 查找作者，然后将 `author.id` 赋值给 **authorIdPage** 页面变量。

```ini
url = "/author/:slug"

[section author]
handle = "Blog\Author"
identifier = "slug"

[resources]
vars[authorIdPage] = 'Author ID is: {{ author.id }}'
```

## 注入资源

如果布局包含标准的 `{% scripts %}` 和 `{% styles %}` 标签，则可以向这些占位符注入资源。资源将被打包并合并为单个脚本/样式引用。

使用资源组件加载的资源应位于主题内的特定文件夹中，如可用属性中所述。例如，一个名为 **blocks/carousel.htm** 的部件

::: cmstemplate
```ini
[resources]
css[] = "blocks/carousel.css"
scss[] = "blocks/carousel.scss"
less[] = "blocks/carousel.less"
js[] = "blocks/carousel.js"
```
```html
<!-- Carousel Contents Here -->
```
:::

现在，当部件在页面上加载时，脚本和样式表将被注入到布局中。资源应分别位于 **assets/js/blocks/carousel.js** 和 **assets/less/blocks/carousel.less** 目录中。

```twig
<!-- Assets for the carousel are injected automatically -->
{% partial 'blocks/carousel' %}
```

::: tip
在页面上使用同一部件两次只会注入一次资源。
:::

## 使用自定义头信息

作为定义自定义头信息的示例，您可能希望在页面上呈现 XML 内容而不是 HTML 内容。这可以通过向页面注入 `Content-Type` 头信息并赋予其 **text/xml** 值来实现。当页面加载时，此头信息值将随响应一起发送。

::: cmstemplate
```ini
url = "/blog/rss"

[resources]
headers[Content-Type] = 'text/xml'
```
```xml
<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <!-- RSS contents here -->
</rss>
```
