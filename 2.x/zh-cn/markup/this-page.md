# this.page

可以通过 `this.page` 访问当前页面对象，并返回对象 `Cms\Classes\Page`. 这个对象也可以 [在 PHP 代码中访问](../cms/pages/.md#page-variables).

## 属性

`this.page` 具有以下属性。

### layout

引用此页面使用的布局名称(如果已定义)。不要与 `this.layout` 混淆。

```twig
{{ this.page.layout }}
```

### id

将页面文件名和文件夹名转换为 CSS 友好标识符。

```twig
<body class="page-{{ this.page.id }}">
```

如果页面文件是 **home/index.htm** 这将生成一个类名 `page-home-index`。

### title

配置定义的页面标题。

```twig
<h1>{{ this.page.title }}</h1>
```

### description

配置定义的页面描述。

```twig
<p>{{ this.page.description }}</p>
```

### meta_title

另一个`title`字段，通常对 SEO 目的更具描述性。 

```twig
<title>{{ this.page.meta_title }}</title>
```

### meta_description

另一种`description`字段，通常对 SEO 目的更具描述性。

```twig
<meta name="description" content="{{ this.page.meta_description }}">
```

### hidden

隐藏页面只能由登录的后台用户访问。

```twig
{% if this.page.hidden %}
    <p>Note to other admins: We are currently working on this page.</p>
{% endif %}
```

### fileName

带有扩展名的主题中的页面文件名。

### baseFileName

没有扩展名的主题中的页面文件名。
