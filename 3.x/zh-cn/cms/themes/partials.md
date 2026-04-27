---
subtitle: 在网站的任何地方重用 HTML 代码块。
---
# 部件

部件是强大的元素，可以在不同的页面或布局中重复使用 HTML，例如，在不同[页面布局](./layouts.md)中使用的页脚。部件也是使用 [AJAX 动态更新页面内容](../ajax/update-partials.md)的强大工具。

部件模板文件位于主题中的 **partials** 目录中。部件文件应具有 **htm** 扩展名。以下是最简单的部件示例。

```html
<p>This is a partial</p>
```

配置部分对于部件是可选的，可以包含在后端用户界面中显示的可选 **description** 参数。此示例显示了一个定义了描述的部件。

::: cmstemplate
```ini
description = "Demo partial"
```
```html
<p>This is a partial</p>
```
:::

部件配置部分还可以包含组件定义。[组件文章](./components.md)更详细地解释了组件。

## 渲染部件

::: aside
请记住，如果您引用子目录中的部件，则应指定子目录名称。
:::

`{% partial "partial-name" %}` Twig 标签用于渲染部件。该标签有一个必需参数 - 不带扩展名的部件文件名。`{% partial %}` 标签可以在页面、布局或另一个部件中使用。以下是引用部件的页面示例。

```twig
<div class="sidebar">
    {% partial "sidebar-contacts" %}
</div>
```

## 向部件传递变量

您经常需要从外部代码向部件传递变量。这使得部件更加有用。例如，您可以有一个渲染博客文章列表的部件。如果您可以将文章集合传递给部件，则同一个部件可以在博客归档页面、博客分类页面等上使用。您可以通过在 `{% partial %}` 标签中的部件名称后指定变量来向部件传递变量。

```twig
<div class="sidebar">
    {% partial "blog-posts" posts=posts %}
</div>
```

您还可以提供新变量供部件使用。

```twig
<div class="sidebar">
    {% partial "sidebar-contacts" city="Vancouver" country="Canada" %}
</div>
```

在部件内部，变量可以像任何其他标记变量一样访问。

```twig
<p>Country: {{ country }}, city: {{ city }}.</p>
```

### 变量作用域

部件内容将可以访问当前上下文中的变量和提供的额外变量。

```twig
{% partial "mypartial" foo="bar" %}
```

在以下示例中，`foo` 变量将在 `mypartial` 部件模板中可用。

```twig
{% set foo = "bar" %}
{% partial "mypartial" %}
```

您可以通过附加 `only` 关键字来禁用对上下文的访问。在此示例中，只有 `foo` 变量可以访问。

```twig
{% partial "mypartial" foo="bar" only %}
```

在下一个示例中，将没有任何变量可以访问。

```twig
{% partial "mypartial" only %}
```

### 将标记作为变量传递

可以通过向部件标签添加 `body` 属性来将标记传递给部件。

```twig
{% partial "card" body %}
    This is the card contents
{% endpartial %}
```

内容在部件内作为 `body` 变量可用。

```twig
{{ body|raw }}
```

结合[占位符标记标签](../../markup/tag/placeholder.md)，这可以让您构建可组合的部件。

```twig
{% partial "card" image="img.jpg" body %}
    {% put header %}
        <h2>This is the card header</h2>
    {% endput %}
    This is the card contents
{% endpartial %}
```

**card** 部件由两个内容区域和一个图片变量组成。

```twig
<div class="header">
    <div class="image">
        <img src="{{ image }}" />
    </div>
    {% placeholder header %}
</div>
<div class="body">
    {{ body|raw }}
</div>
```

## 动态部件

部件与页面一样，可以使用任何 Twig 功能。有关详细信息，请参阅文档的[动态页面部分](pages.md)。

### 部件执行生命周期

在部件的 PHP 代码部分中可以定义特殊函数：`onStart` 和 `onEnd`。`onStart` 函数在部件渲染之前和部件[组件](./components.md)执行之前执行。`onEnd` 函数在部件渲染之前和部件组件执行之后执行。在 `onStart` 和 `onEnd` 函数中，您可以向 Twig 环境注入变量。使用带数组表示法的 `$this` 将变量传递给页面。

::: cmstemplate
```ini
```
```php
<?
function onStart()
{
    $this['hello'] = "Hello world!";
}
?>
```
```twig
<h3>{{ hello }}</h3>
```
:::

从外部分配给部件的变量可以在 PHP 中使用 `$this` 对象访问。

::: cmstemplate
```ini
```
```php
<?
function onStart()
{
    $this['location'] = $this->city . ', ' . $this->country;
}
?>
```
```twig
<p>{{ location }} is the same as {{ city }}, {{ country }}.</p>
```
:::

October CMS 提供的模板语言在[标记指南](../../markup/templating.md)中进行了描述。处理程序执行的整体顺序在文档的[动态布局部分](./layouts.md)中进行了描述。

### 在部件中调用 AJAX 处理程序

由于部件是在页面渲染期间延迟实例化的，因此常规部件的生命周期有一些限制。为了克服这个问题，您可以使用 `{% ajaxPartial %}` 来允许在部件内部调用 AJAX 处理程序。

```twig
{% ajaxPartial "contact-form" %}
```

::: tip
请参阅 [AJAX 部件 Twig 标签文章](../../markup/tag/ajax-partial.md)以了解更多关于 `{% ajaxPartial %}` 标签的信息。
:::

当从 AJAX 部件中调用处理程序时，生命周期与常规 AJAX 处理程序的运行方式不同。

1. 处理程序在部件的 `onEnd` 函数之后运行。
1. 完整的页面生命周期会运行，包括布局、页面和父部件中的逻辑。
1. 在请求期间所有变量都可用，包括使用 Twig 设置的变量。
1. 部件生命周期函数不支持返回任何值。

#### 另请参阅

::: also
* [部件 Twig 标签](../../markup/tag/partial.md)
* [AJAX 部件 Twig 标签](../../markup/tag/ajax-partial.md)
:::
