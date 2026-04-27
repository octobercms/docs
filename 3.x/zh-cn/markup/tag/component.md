---
subtitle: Twig 标签
---
# {% component %}

`{% component %}` 标签将解析 [CMS 组件](../../cms/themes/components.md)的默认标记内容并在页面上显示。并非所有组件都提供默认标记，插件的文档将指导正确的用法。

```twig
{% component "blogPosts" %}
```

这将渲染固定名称为 **default.htm** 的组件部件，本质上等同于以下写法：

```twig
{% partial "blogPosts::default" %}
```

## 变量

某些组件支持在渲染时向其传递变量。

```twig
{% component "blogPosts" postsPerPage="5" %}
```

## 自定义组件

在大多数情况下，不需要使用 `{% component %}` 标签，标记是作为组件 API 的使用示例提供的。组件旨在被自定义，可以通过两种方式实现：

1. 将默认标记移动到部件中
1. 使用主题覆盖组件部件

[CMS 组件文章](../../cms/themes/components.md)概述了自定义默认标记的过程。

#### 参见

::: also
* [CMS 组件](../../cms/themes/components.md)
:::
