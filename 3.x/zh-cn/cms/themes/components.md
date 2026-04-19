---
subtitle: 可附加到任何页面、部件或布局的可配置控制器。
---
# 组件

组件是使用 October CMS 构建可扩展的现代化解决方案的关键功能。每个组件实现了一些扩展您网站的功能。组件可以在页面上输出 HTML 标记，但这不是必需的——组件的其他重要功能包括[处理 AJAX 请求](../ajax/introduction.md)、处理表单回传以及处理页面执行生命周期，允许向页面注入变量或实现网站安全性。

本文介绍了组件的基础知识，不涉及如何[将组件与 AJAX 结合使用](../ajax/handlers.md)、作为插件的一部分[开发组件](../../extend/cms-components.md)，或 October CMS [内置的组件](../components/section.md)。

## 介绍

组件可以在管理面板的编辑器中找到。您可以通过点击任何打开文档上的组件工具栏按钮，将组件添加到页面、部件和布局中。如果您使用文本编辑器，可以通过将组件名称添加到模板文件的配置部分来将组件附加到页面或布局。下面的示例演示了如何将一个演示待办事项组件添加到页面。

::: cmstemplate
```ini
title = "Components demonstration"
url = "/components"

[demoTodo]
maxItems = 20
```
```twig
<!-- HTML Content Here -->
```
:::

这将使用组件部分中定义的属性来初始化组件。许多组件都有属性，但这不是必需的。某些属性是必需的，而某些属性有默认值。如果您不确定组件支持哪些属性，请参阅开发者提供的文档，或使用编辑器管理面板中的检查器。当您在页面或布局组件面板中点击组件时，检查器将打开。

::: aside
如果两个同名组件同时分配给页面和布局，则页面组件将优先。
:::

当您引用一个组件时，它会自动创建一个与组件名称匹配的页面变量（在前面的示例中为 `demoTodo`）。提供 HTML 标记的组件可以使用 `{% component %}` 标签在页面上渲染，如下所示。

```twig
{% component 'demoTodo' %}
```

::: warning
在部件中使用组件的功能有限，这在文档的[动态部件部分](./partials.md)中有更详细的描述。
:::

## 组件别名

如果有两个插件注册了同名的组件，您可以使用其完全限定类名来附加组件，并为其分配一个*别名*。

```ini
[October\Demo\Components\Todo demoTodoAlias]
maxItems = 20
```

部分中的第一个参数是类名，第二个是组件别名，将在附加到页面时使用。如果您指定了组件别名，则在页面代码中引用该组件时应处处使用它。请注意，下面的示例引用了组件别名：

```twig
{% component 'demoTodoAlias' %}
```

别名还允许您使用短名称在前、别名在后的方式，在同一页面上定义同一类的多个组件。这使您可以在一个页面上使用同一组件的多个实例。

```ini
[demoTodo todoA]
maxItems = 10
[demoTodo todoB]
maxItems = 20
```

## 使用外部属性值

默认情况下，属性值在定义组件的配置部分中初始化，属性值是静态的，如下所示：

```ini
[demoTodo]
maxItems = 20
==
...
```

::: v-pre
但是，有一种方法可以使用从外部参数加载的值来初始化属性——URL 参数或[部件](partials.md)参数（对于在部件中定义的组件）。使用 `{{ paramName }}` 语法表示应从部件变量加载的值：
:::

```ini
[demoTodo]
maxItems = {{ maxItems }}
==
...
```

假设在上面的示例中组件 **demoTodo** 定义在一个部件中，它将使用从 **maxItems** 部件变量加载的值进行初始化：

```twig
{% partial 'my-todo-partial' maxItems='10' %}
```

您可以使用点表示法从外部参数中获取深层嵌套的值：

```ini
[demoTodo]
maxItems = {{ data.maxItems }}
==
...
```

::: v-pre
要从 URL 参数加载属性值，请使用 `{{ :paramName }}` 语法，其中名称以冒号（`:`）开头，例如。
:::

```ini
[demoTodo]
maxItems = {{ :maxItems }}
==
...
```

组件所属的页面应定义相应的 [URL 参数](pages.md)。

```ini
url = "/todo/:maxItems"
```

在 October 后端中，您可以使用检查器工具将外部值分配给组件属性。在检查器中，您不需要使用花括号来输入参数名称。检查器中的每个字段右侧都有一个图标，用于打开外部参数名称编辑器。对于部件变量，输入参数名称为 `paramName`，对于 URL 参数，输入 `:paramName`。

## 向组件传递变量

组件可以设计为在渲染时使用变量，类似于[部件变量](./partials.md)，可以在 `{% component %}` 标签中的组件名称后面指定。指定的变量将显式覆盖[组件属性](../../extend/cms-components.md)的值，包括外部属性值。

在此示例中，组件的 **maxItems** 属性将在渲染时设置为 *7*：

```twig
{% component 'demoTodoAlias' maxItems='7' %}
```

## 自定义默认标记

::: aside
组件中的默认标记是样板代码，旨在提供一个简单的使用示例。
:::

有两种方法可以自定义组件的默认标记：

- 将默认标记复制到您的主题中
- 逐个覆盖组件部件

覆盖组件部件的用途非常有限。在大多数情况下，将组件的部件转换为 CMS 部件要容易得多，而且这样做几乎没有区别。

以一个像这样渲染的博客组件为例。

::: cmstemplate
```ini
[blog]
```
```twig
{% component 'blog' %}
```
:::

上面的代码实际上等同于这样做。

::: cmstemplate
```ini
[blog]
```
```twig
{% partial 'blog::default' %}
```
:::

如果您将组件中的 **default.htm** 部件复制到主题中作为 **blog-default.htm** 部件，您可以用相同的方式渲染它。

::: cmstemplate
```ini
[blog]
```
```twig
{% partial 'blog-default' %}
```
:::

在这里我们可以看到使用 CMS 部件来自定义内容是很简单的，这展示了组件的真正强大之处。只有在极少数情况下主题才需要覆盖组件部件，下面将更详细地介绍这一点。

### 将默认标记移动到部件

每个组件都有一个名为 **default.htm** 的入口点部件，当调用 `{% component %}` 标签时会渲染它，在下面的示例中我们假设组件名为 **blogPost**。

::: cmstemplate
```ini
url = "blog/post"

[blogPost]
```
```twig
{% component "blogPost" %}
```
:::

输出将从插件目录 **components/blogpost/default.htm** 渲染。您可以将此文件中的所有标记复制并直接粘贴到页面中，或粘贴到一个新的部件中，例如名为 **blog-post.htm**。

```twig
<h1>{{ __SELF__.post.title }}</h1>
<p>{{ __SELF__.post.description }}</p>
```

在标记中，您可能会注意到引用了一个名为 `__SELF__` 的变量，它指的是组件对象，应该替换为页面上使用的组件别名，在此示例中为 `blogPost`。

```twig
<h1>{{ blogPost.post.title }}</h1>
<p>{{ blogPost.post.description }}</p>
```

这是让默认组件标记在主题中任何位置工作所需的唯一更改。现在可以使用主题部件来自定义和渲染组件标记。

```twig
{% partial 'blog-post' %}
```

此过程可以对组件部件目录中找到的所有其他部件重复执行。

### 覆盖组件部件

所有组件部件都可以使用主题部件来覆盖。当组件具有严格的实现时，这很有用，它提供了一种配置其标记的特定区域的选项。

例如，如果一个名为 **channel** 的组件使用了 **title.htm** 部件。

::: cmstemplate
```ini
url = "mypage"

[channel]
```
```twig
{% component "channel" %}
```
:::

我们可以通过在主题中创建一个名为 **partials/channel/title.htm** 的文件来覆盖该部件。

文件路径段的分解如下：

段 | 描述
------------- | -------------
**partials** | 主题部件目录
**channel** | 组件别名（部件子目录）
**title.htm** | 要覆盖的组件部件

可以通过简单地为组件分配同名的别名来自定义部件子目录名称。例如，将 **channel** 组件分配一个不同的别名 **foobar**，覆盖目录也会随之更改。

::: cmstemplate
```ini
[channel foobar]
```
```twig
{% component "foobar" %}
```
:::

现在我们可以通过在主题中创建名为 **partials/foobar/title.htm** 的文件来覆盖 **title.htm** 部件。

## "View Bag" 组件

::: aside
viewBag 组件在后端面板中是隐藏的，仅可用于基于文件的编辑。它也可以被其他插件用来存储数据。
:::

October CMS 中包含一个名为 `viewBag` 的特殊组件，可以在任何页面或布局上使用。它允许定义临时属性，并在标记区域中作为变量轻松访问。一个很好的用法示例是在页面中定义活动菜单项。

::: cmstemplate
```ini
title = "About"
url = "/about.html"
layout = "default"

[viewBag]
activeMenu = "about"
```
```twig
<p>Page content...</p>
```
:::

为组件定义的任何属性随后都可以在页面、布局或部件标记中使用 `viewBag` 变量来访问。例如，在此布局中，如果 `viewBag.activeMenu` 值设置为 **about**，则 **active** 类将被添加到列表项。

::: cmstemplate
```ini
description = "Default layout"
```
```twig
...

<!-- Main navigation -->
<ul>
    <li class="{{ viewBag.activeMenu == 'about' ? 'active' }}">About</li>
    ...
</ul>
```
:::

### AJAX 处理器和部件

组件可以通过使用组件名称前缀和两个 `::` 符号，向主题的生命周期引入 [AJAX 处理器](../ajax/introduction.md)和[部件](./partials.md)。例如，组件定义的所有 AJAX 处理器都是全局可用的。

```html
data-request="onMyComponentHandler"
```

但是，如果存在命名冲突，可以使用完全限定名称。

```html
data-request="componentName::onMyComponentHandler"
```

从组件外部渲染的部件必须使用其完全限定名称。

```twig
{% partial 'componentName::component-partial' %}
```

阅读更多关于[组件开发](../../extend/cms-components.md)的内容，以了解组件部件。

#### 参见

::: also
* [CMS 组件开发](../../extend/cms-components.md)
:::
