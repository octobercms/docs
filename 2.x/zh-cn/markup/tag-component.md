# {% component %}

`{% component %}` 标签将解析 [CMS组件](../cms/components.md) 的默认的内容并将其显示在页面上。 并非所有组件都提供默认内容，插件的文档将指导您正确使用。

```twig
{% component "blogPosts" %}
```

这将使用 **default.htm** 的固定名称呈现组件部分，并且本质上是以下内容的别名：
```twig
{% partial "blogPosts::default" %}
```

## 变量

某些组件在渲染时支持 [传递变量](../cms/components.md#oc-passing-variables-to-components) :

```twig
{% component "blogPosts" postsPerPage="5" %}
```

## 自定义组件

在大多数情况下，不需要 `{% component %}` 标签，并且提供标记作为组件 API 的使用示例。 组件旨在定制，这可以通过两种方式完成：

1. [将默认标记移动到部件](../cms/components.md#oc-moving-default-markup-to-a-partial)
1. [覆盖组件部件](../cms/components.md#oc-overriding-component-partials)
