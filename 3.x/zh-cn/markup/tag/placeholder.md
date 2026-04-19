---
subtitle: Twig 标签
---
# {% placeholder %}

`{% placeholder %}` 标签将渲染一个占位符区域，通常[在布局中使用](../../cms/themes/layouts.md)。此标签将返回使用 `{% put %}` 标签添加的任何占位符内容，或任何已定义的默认内容（可选）。

```twig
{% placeholder name %}
```

然后可以在任何后续的页面或部件中向占位符注入内容。

```twig
{% put name %}
    <p>Place this text in the name placeholder</p>
{% endput %}
```

## 替换内容

默认情况下，`{% put %}` 会将内容追加到占位符中。使用 `replace` 属性可以替换内容。

```twig
{% put name replace %}
    <p>Replace all the content inside with this</p>
{% endput %}
```

## 处理多次调用

在某些情况下，你可能会在部件内部调用 `{% put %}` 标签来包含一些资源。然后，当在同一页面上多次包含该部件时，可能会导致脚本被插入两次。包含 `once` 属性将确保每个模板只设置一次内容。缓存键使用 CMS 模板文件名来判断是否已经插入过。

```twig
{% put scripts once %}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.2/min/tiny-slider.js"></script>
{% endput %}
```

## 默认占位符内容

占位符可以有默认内容，这些内容可以被页面替换或补充。如果页面没有为具有默认内容的占位符定义 `{% put %}` 标签，则显示默认占位符内容。布局模板中的占位符定义示例：

```twig
{% placeholder sidebar default %}
    <p><a href="/contacts">Contact us</a></p>
{% endplaceholder %}
```

页面可以向占位符注入更多内容。`{% default %}` 标签指定默认占位符内容应显示的位置。如果不使用此标签，占位符内容将被完全替换。

```twig
{% put sidebar %}
    <p><a href="/services">Services</a></p>
    {% default %}
{% endput %}
```

## 检查占位符是否存在

在布局模板中，你可以使用 `hasPlaceholder()` 函数检查占位符内容是否存在。这允许你根据页面是否提供了占位符内容来生成不同的标记。示例：

```twig
{% if hasPlaceholder('sidemenu') %}
    <!-- Markup for a page with a sidebar -->
    <div class="row">
        <div class="col-md-3">
            {% placeholder sidemenu %}
        </div>
        <div class="col-md-9">
            {% page %}
        </div>
    </div>
{% else %}
    <!-- Markup for a page without a sidebar -->
    {% page %}
{% endif %}
```

## 将占位符用作变量

占位符可用于设置继承变量，例如页面导航中的活动链接。`{% put %}` 标签允许你直接设置值。例如，在页面模板中将 `activeNav` 值设置为 **home**。

```twig
{% put activeNav = 'home' %}
```

该变量可以在布局模板中使用 `placeholder()` 函数访问。由此，我们可以根据页面设置的值来确定活动链接。

```twig
{% set active = placeholder('activeNav') %}

<ul>
    <li class="{{ active == 'home' ? 'active' }}">Home</li>
    <li class="{{ active == 'blog' ? 'active' }}">Blog</li>
    <li class="{{ active == 'contact' ? 'active' }}">Contact</li>
</ul>
```

可以提供默认值（第二个参数）作为回退。

```twig
{% set active = placeholder('activeNav', 'home') }} %}
```

## 系统占位符

October CMS 定义了系统使用的静态占位符。包（Package）将使用这些占位符通过 PHP 或 Twig 接口向页面注入依赖项。

### {% scripts %}

`{% scripts %}` 标签插入应用程序注入的 JavaScript 文件引用。该标签通常定义在 BODY 结束标签之前。

```twig
<body>
    ...
    {% scripts %}
</body>
```

> **注意**：此标签在给定的页面周期中应只出现一次，以防止重复引用。

#### 注入脚本

JavaScript 文件的链接可以在 PHP 中通过[组件](../../extend/cms-components.md)或[页面](../../cms/themes/pages.md)以编程方式注入。

```php
function onStart()
{
    $this->addJs('assets/js/app.js');
}
```

你也可以使用 **scripts** 匿名占位符[在布局中](../../cms/themes/layouts.md)向 `{% scripts %}` 标签注入原始标记。在页面或布局中使用 `{% put %}` 标签来向占位符添加内容。

```twig
{% put scripts %}
    <script type="text/javascript" src="/themes/demo/assets/js/menu.js"></script>
{% endput %}
```

### {% styles %}

`{% styles %}` 标签渲染应用程序注入的样式表文件的 CSS 链接。该标签通常定义在页面或布局的 HEAD 区域中。

```twig
<head>
    ...
    {% styles %}
</head>
```

> **注意**：此标签在给定的页面周期中应只出现一次，以防止重复引用。

#### 注入样式

样式表文件的链接可以在 PHP 中通过[组件](../../extend/cms-components.md)或[页面](../../cms/themes/pages.md)以编程方式注入。

```php
function onStart()
{
    $this->addCss('assets/css/hello.css');
}
```

你也可以使用 **styles** 匿名占位符[在布局中](../../cms/themes/layouts.md)向 `{% styles %}` 标签注入原始标记。在页面或布局中使用 `{% put %}` 标签来向占位符添加内容。

```twig
{% put styles %}
    <link href="/themes/demo/assets/css/page.css" rel="stylesheet" />
{% endput %}
```

### {% meta %}

`{% meta %}` 标签渲染元数据内容，例如 Open Graph 信息。该标签通常定义在页面或布局的 HEAD 区域中，放在 styles 和 scripts 之前。

```twig
<head>
    {% meta %}
    ...
</head>
```

> **注意**：此标签在给定的页面周期中应只出现一次，以防止重复引用。

#### 注入元数据

你可以使用 **meta** 匿名占位符[在布局中](../../cms/themes/layouts.md)向 `{% meta %}` 标签注入原始标记。在页面或布局中使用 `{% put %}` 标签来向占位符添加内容。

```twig
{% put meta %}
    <meta name="turbo-visit-control" content="error">
{% endput %}
```

## 自定义属性

`placeholder` 标签接受两个可选属性 &mdash; `title` 和 `type`。`title` 属性不被 CMS 本身使用，但可以被其他插件使用。`type` 属性管理占位符类型。目前支持两种类型 &mdash; **text** 和 **html**。文本类型占位符的内容在显示前会被转义。`title` 和 `type` 属性应定义在占位符名称和 `default` 属性（如果有的话）之后。示例：

```twig
{% placeholder ordering title="Ordering information" type="text" %}
```

具有默认内容、title 和 type 属性的占位符示例。

```twig
{% placeholder ordering default title="Ordering information" type="text" %}
    There is no ordering information for this product.
{% endplaceholder %}
```
