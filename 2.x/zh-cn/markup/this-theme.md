# this.theme

您可以通过`this.theme`方式访问当前主题对象  并返回该对象`Cms\Classes\Theme`, 详情请参考[theme customization object](../themes/development.md#oc-theme-customization).

## 属性

`this.theme` 将提供对任何主题自定义定义的表单字段值的直接访问。 它本身还具有以下属性。

### id

将主题目录名称转换为 CSS 友好的标识符。

```twig
<body class="theme-{{ this.theme.id }}">
```
如果主题目录是 **website** 这将生成一个类名 `theme-website`。

### config

包含在 `theme.yaml` 文件中找到的所有主题配置值的数组。

```twig
<meta name="description" content="{{ this.theme.config.description }}">
```
