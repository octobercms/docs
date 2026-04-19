---
subtitle: Twig 属性
---
# this.layout

您可以通过 `this.layout` 访问当前布局对象，它返回 `Cms\Classes\Layout` 对象。

## 属性

`this.layout` 具有以下属性。

### id

将布局文件名和文件夹名转换为 CSS 友好的标识符。

```twig
<body class="layout-{{ this.layout.id }}">
```

如果布局文件是 **default.htm**，则会生成类名 `layout-default`。

### description

由配置定义的布局描述。

```twig
<meta name="description" content="{{ this.layout.description }}">
```
