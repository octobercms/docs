---
subtitle: Twig 属性
---
# this.page

您可以通过 `this.page` 访问当前页面对象，它返回 `Cms\Classes\Page` 对象。该对象也可以在[页面的 PHP 代码](../../cms/themes/pages.md)中通过 `$this->page` 访问。

## 属性

`this.page` 具有以下属性。

### layout

引用此页面所使用的布局名称（如果已定义）。请勿与 `this.layout` 混淆。

```twig
{{ this.page.layout }}
```

### id

将页面文件名和文件夹名转换为 CSS 友好的标识符。

```twig
<body class="page-{{ this.page.id }}">
```

如果页面文件是 **home/index.htm**，则会生成类名 `page-home-index`。

### title

由配置定义的页面标题。

```twig
<h1>{{ this.page.title }}</h1>
```

### description

由配置定义的页面描述。

```twig
<p>{{ this.page.description }}</p>
```

### meta_title

替代的 `title` 字段，通常用于更具描述性的 SEO 用途。

```twig
<title>{{ this.page.meta_title }}</title>
```

### meta_description

替代的 `description` 字段，通常用于更具描述性的 SEO 用途。

```twig
<meta name="description" content="{{ this.page.meta_description }}">
```

### hidden

隐藏页面仅对已登录的后台用户可见。

```twig
{% if this.page.hidden %}
    <p>Note to other admins: We are currently working on this page.</p>
{% endif %}
```

### fileName

带扩展名的主题中的页面文件名。

### baseFileName

不带扩展名的主题中的页面文件名。
