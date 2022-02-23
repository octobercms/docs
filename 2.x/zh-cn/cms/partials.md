# 部件

部件包含可重用的代码块，可在整个网站的任何地方使用。 它们对于在不同页面或布局上重复的元素很有用。 一个这样的例子是跨不同[页面布局](layouts.md)使用的页脚。 在[使用 AJAX 更新页面内容](../ajax/update-partials.md) 时，部件也是一个关键因素。

部件模板文件位于主题的 **partials** 目录中。 部件文件应具有 **htm** 扩展名。 接下来是最简单的部件示例。

```
<p>这是部件</p>
```

[Configuration](themes.md#oc-configuration-section) 配置部分对于部件是可选的，并且可以包含显示在后端用户界面中的可选 **description** 参数。 此示例显示了定义了描述的部分。

```
description = "演示部件"
==
<p>这是部件</p>
```

部件配置部分还可以包含组件定义。 [组件文章](components.md) 更详细地解释了组件。

## 渲染部件

`{% partial "partial-name" %}` Twig 标签呈现部件。 该标签有一个必需的参数：不带扩展名的部件文件名。 请记住，如果您从 [子目录](themes.md#oc-subdirectories) 引用部件，您应该指定子目录名称。 `{% partial %}` 标签可以在页面、布局或其他部件中使用。 引用部件的页面示例：

```twig
<div class="sidebar">
    {% partial "sidebar-contacts" %}
</div>
```

<a id="oc-passing-variables-to-partials"></a>
## 将变量传递给部件

你会发现你经常需要将变量从外部代码传递给部件代码。 这使得分音更加有用。 例如，您可以有一个部件来呈现博客文章列表。 如果您可以将帖子集合传递给部件，则可以在博客存档页面、博客类别页面等上使用相同的部件。 您可以通过在 `{% partial %}` 标签中的部件名称之后指定变量来将变量传递给部分：

```twig
<div class="sidebar">
    {% partial "blog-posts" posts=posts %}
</div>
```

您还可以分配新变量以用于部件：

```twig
<div class="sidebar">
    {% partial "sidebar-contacts" city="Vancouver" country="Canada" %}
</div>
```

在部件内部，可以像访问任何其他标记变量一样访问变量：

```twig
<p>国家: {{ country }}, 城市: {{ city }}.</p>
```

### 将标记作为变量传递

通过将`body` 属性添加到partial 标签，可以将标记传递给部件。

```twig
{% partial "card" body %}
    这是卡片内容
{% endpartial %}
```

内容在部件内部作为 `body` 变量可用。

```twig
{{ body|raw }}
```

结合 [占位符标记](../markup/tag-placeholder.md)，这可以让您构建可组合的部件。

```twig
{% partial "card" image="img.jpg" body %}
    {% put header %}
        <h2>这是卡头</h2>
    {% endput %}
    这是卡片内容
{% endpartial %}
```

**card** 部件由两个内容区域和一个图像变量组成。

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

<a id="oc-dynamic-partials"></a>
## 动态部件

部件像页面一样，可以使用任何 Twig 功能。 详情请参考[动态页面](pages.md#oc-dynamic-pages) 文档。

### 部件执行生命周期

部件函数的 PHP 部分可以定义一些特殊的函数：`onStart` 和 `onEnd`。 `onStart` 函数在部件渲染之前和部件[组件](components.md) 执行之前执行。 `onEnd` 函数在部件渲染之前和部件 [组件](components.md) 执行之后执行。 在 onStart 和 onEnd 函数中，您可以将变量注入 Twig 环境。 使用 `数组` 将变量传递给页面：

```
==
function onStart()
{
    $this['hello'] = "Hello world!";
}
==
<h3>{{ hello }}</h3>
```

[标记指南](../markup.md) 中描述了 October 提供的模板语言。 [动态布局](layouts.md#oc-dynamic-layouts) 文章中描述了处理程序执行的整体顺序。

### 生命周期限制

由于它们的实例化较晚，因此在页面呈现期间，部件对象的生命周期存在一些限制。 它们不遵循标准执行流程，如[布局执行生命周期](layouts.md#oc-dynamic-layouts) 中所述。 应注意以下限制：

1. AJAX 事件未注册，无法正常运行。
1. 生命周期函数不能返回任何值。
1. 正常的 POST 表单处理将在部分渲染时发生。

通常，部件中的组件使用是为基本组件设计的，这些组件无需太多处理即可呈现简单的标记，例如 *Like* 或 *Tweet* 按钮。
