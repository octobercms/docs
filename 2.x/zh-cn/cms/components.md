# 组件

组件是可配置的构建元素，可以附加到任何页面、部件或布局。组件是October的主要功能。每个组件都实现了一些扩展您网站的功能。组件可以在页面上输出 HTML 标记，但这不是必需的 - 组件的其他重要功能是处理 [AJAX 请求](../ajax/introduction.md)、处理表单回发和处理页面执行周期，这允许向页面注入变量或实现网站安全。

本文介绍了组件的基础知识，并没有解释如何使用 [AJAX组件](../ajax/handlers.md) 或 [开发组件](../plugin/components.md) 作为插件的一部分。

> **注意**：在局部组件中使用组件的功能有限，[动态局部组件](partials.md#oc-dynamic-partials) 文章中对此进行了更详细的描述。

## 介绍

如果您使用后端用户界面，您可以通过单击“组件”面板中的组件将组件添加到您的页面、部件和布局。如果您使用文本编辑器，您可以通过将组件名称添加到模板文件的 [Configuration](themes.md#oc-configuration-section) 部分，将组件附加到页面或布局。下一个示例演示如何向页面添加演示 To-do 组件：

```ini
title = "Components demonstration"
url = "/components"

[demoTodo]
maxItems = 20
==
...
```

这将使用组件部分中定义的属性初始化组件。许多组件都有属性，但这不是必需的。有些属性是必需的，有些属性有默认值。如果您不确定某个组件支持哪些属性，请参阅开发人员提供的文档，或使用 October 后端中的检查器。单击页面或布局组件面板中的组件时，检查器会打开。

当您引用一个组件时，它会自动创建一个与组件名称匹配的页面变量(上一个示例中的`demoTodo`)。提供 HTML 标记的组件可以在带有 `{% component %}` 标签的页面上呈现，如下所示：

```twig
{% component 'demoTodo' %}
```

> **注意**：如果将两个同名组件一起分配给一个页面和布局，页面组件会覆盖布局组件的任何属性。

<a id="oc-components-aliases"></a>
## 组件别名

如果有两个插件注册了同名的组件，您可以通过使用其完全限定的类名并为其分配一个 *alias* 来附加一个组件：

```ini
[October\Demo\Components\Todo demoTodoAlias]
maxItems = 20
```

该部分中的第一个参数是类名，第二个是附加到页面时将使用的组件别名。如果指定了组件别名，则在引用组件时应在页面代码中的任何地方使用别名。请注意，下一个示例引用了组件别名：

```twig
{% component 'demoTodoAlias' %}
```

别名还允许您首先使用短名称，然后使用别名，在同一页面上定义同一类的多个组件。这使您可以在页面上使用同一组件的多个实例。

```ini
[demoTodo todoA]
maxItems = 10
[demoTodo todoB]
maxItems = 20
```

<a id="oc-using-external-property-values"></a>
## 使用外部属性值

默认情况下，属性值在定义组件的配置部分初始化，并且属性值是静态的，如下所示：

```ini
[demoTodo]
maxItems = 20
==
...
```

::: v-pre
但是，有一种方法可以使用从外部参数加载的值来初始化属性 - URL 参数或 [partial](partials.md) 参数(对于在部件中定义的组件)。对应部件变量加载的值使用 `{{ paramName }}` 语法：
:::

```ini
[demoTodo]
maxItems = {{ maxItems }}
==
...
```

假设在上面的示例中，组件 **demoTodo** 定义在一个部件中，它将使用从 **maxItems** 部件变量加载的值进行初始化：

```twig
{% partial 'my-todo-partial' maxItems='10' %}
```

您可以使用点表示法从外部参数中检索深度嵌套的值：

```ini
[demoTodo]
maxItems = {{ data.maxItems }}
==
...
```

::: v-pre
要从 URL 参数加载属性值，请使用 `{{ :paramName }}` 语法，其中名称以冒号 (`:`) 开头，例如：
:::

```ini
[demoTodo]
maxItems = {{ :maxItems }}
==
...
```

组件所属的页面应该有一个对应的[URL参数](pages.md#oc-url-syntax)定义：

```ini
url = "/todo/:maxItems"
```

在 October的后端中，您可以使用 检查器(Inspector) 工具为组件属性分配外部值。在检查器中，您不需要使用大括号输入参数名称。 检查器中的每个字段在右侧都有一个图标，用于打开外部参数名称编辑器。对于部件变量，输入参数名称为 `paramName`，或者为 URL 参数输入 `:paramName`。

<a id="oc-passing-variables-to-components"></a>
## 将变量传递给组件

组件可以设计成在渲染的时候使用变量，类似于[部件变量](partials.md#oc-passing-variables-to-partials)，可以在`{% component %}` 中的组件名后指定标签。指定的变量将显式覆盖 [组件属性](../plugin/components.md#oc-component-properties) 的值，包括 [外部属性值](#oc-using-external-property-values)。

在此示例中，组件的 **maxItems** 属性将在组件呈现时设置为 *7*：

```twig
{% component 'demoTodoAlias' maxItems='7' %}
```

> **注意**：并非所有组件都支持渲染时传递变量。

## 自定义默认标记

组件提供的标记通常用作组件的使用示例。在某些情况下，您可能希望修改组件的外观和输出。 [将默认标记移动到主题部分](#oc-moving-default-markup-to-a-partial) 适用于彻底检修组件。 [覆盖组件部分](#oc-overriding-component-partials) 对局部区域进行自定义很有用。

<a id="oc-moving-default-markup-to-a-partial"></a>
### 将默认标记移动到部件

每个组件都可以有一个名为 **default.htm** 的入口点部分，它会在调用 `{% component %}` 标签时呈现，在以下示例中，我们假设组件名为 **blogPost**。

```
url = "blog/post"

[blogPost]
==
{% component "blogPost" %}
```

输出将从插件目录 **components/blogpost/default.htm** 呈现。您可以复制此文件中的所有标记并将其直接粘贴到页面中或粘贴到新的部件，例如 **blog-post.htm**。

```twig
<h1>{{ __SELF__.post.title }}</h1>
<p>{{ __SELF__.post.description }}</p>
```

在标记中，您可能会注意到对名为 `__SELF__` 的变量的引用，它指的是组件对象，应该替换为页面上使用的组件别名，在本例中为 `blogPost`。

```twig
<h1>{{ blogPost.post.title }}</h1>
<p>{{ blogPost.post.description }}</p>
```

这是允许默认组件标记在主题内的任何位置工作所需的唯一更改。现在可以使用主题部件自定义和呈现组件标记。

```twig
{% partial 'blog-post.htm' %}
```

对于在组件部分目录中找到的所有其他部件，可以重复此过程。

<a id="oc-overriding-component-partials"></a>
### 覆盖组件部件

可以使用主题部件覆盖所有组件部件。如果名为 **channel** 的组件使用 **title.htm** 部件。

```
url = "mypage"

[channel]
==
{% component "channel" %}
```

我们可以通过在我们的主题中创建一个名为 **partials/channel/title.htm** 的文件来覆盖部件。

文件路径段分解如下：

标识|描述
------------- | -------------
**partials** |主题部件目录
**channel** |组件别名(部件子目录)
**title.htm** |要覆盖的组件部件

通过简单地为组件分配同名别名，可以将部件子目录名称自定义为任何内容。例如，通过为 **channel** 组件分配一个不同的别名 **foobar**，覆盖目录也会改变：

```
[channel foobar]
==
{% component "foobar" %}
```

现在我们可以通过在我们的主题中创建一个名为 **partials/foobar/title.htm** 的文件来覆盖 **title.htm** 部件。

## "ViewBag"组件

October包含一个名为"ViewBag"的特殊组件，可用于任何页面或布局。它允许在标记区域内轻松定义和访问临时属性作为变量。一个很好的用法示例是在页面内定义活动菜单项：

```
title = "About"
url = "/about.html"
layout = "default"

[viewBag]
activeMenu = "about"
==

<p>页面内容...</p>
```

然后使用 `viewBag` 变量在页面、布局或部件标记中使为组件定义的任何属性可用。例如，在此布局中，如果 `viewBag.activeMenu` 值设置为 **about**，则会将 **active** 类添加到列表项中：

```
description = "默认布局"
==
[...]

<!-- Main navigation -->
<ul>
    <li class="{{ viewBag.activeMenu == 'about' ? 'active' }}">About</li>
    [...]
</ul>
```
> **注意**：viewBag 组件隐藏在后端，仅可用于基于文件的编辑。 其他插件也可以使用它来存储数据。

### AJAX 处理程序和部件

组件可以将 [AJAX 处理程序](../ajax/introduction.md) 和 [partials](../cms/partials.md) 引入主题的生命周期，使用组件名称的前缀和两个 `::` 符号。 例如，组件定义的所有 AJAX 处理程序都是全局可用的。

```
data-request="onMyComponentHandler"
```

但是，如果命名存在冲突，则可以使用完全限定名称。

```
data-request="componentName::onMyComponentHandler"
```

从组件外部呈现的部件必须使用其完全限定名称。

```twig
{% partial 'componentName::component-partial' %}
```

阅读更多关于 [组件开发](../plugin/components.md#oc-component-partials) 以了解组件部分。

<!--
## Soft Components

Soft components are components in a theme that will continue to operate even if the linked component is no longer available. This allows theme and site developers to specify optional plugin components in their themes that will provide specific functionality if the plugin and/or component is present, while allowing the site to continue to function should the component no longer exist.

When soft components are present on a page and the component is unavailable, no output is generated for the component.

You can define soft components by prefixing the component name with an `@` symbol.

```
url = "mypage"

[@channel]
==
{% component "channel" %}
```

In this example, should the `channel` component not be available, the `{% component "channel" %}` tag will be ignored when the page is rendered.

Soft components also work with aliases as well:

```
url = "mypage"

[@channel channelSection]
==
{% component "channelSection" %}
```

As soft components do not contain any of the data that the component may provide normally if the component is not available, you must take care to ensure that any custom markup will gracefully handle any missing component information. For example:

```
url = "mypage"

[@channel]
==
{% if channel.name %}
    <div class="channel">
        {% channel.name %}
    </div>
{% endif %}
```
-->
