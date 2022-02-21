# this.layout

您可以通过 `this.layout` 访问当前布局对象，并返回对象 `Cms\Classes\Layout`。

## 属性

`this.layout` 具有以下属性。 

### id

将布局文件名和文件夹名转换为 CSS 友好标识符。

```twig
<body class="layout-{{ this.layout.id }}">
```

如果布局文件是 **default.htm** 这将生成一个类名 `layout-default`。

### description

配置定义的布局描述。

```twig
<meta name="description" content="{{ this.layout.description }}">
```
