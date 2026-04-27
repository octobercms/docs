---
subtitle: Twig 属性
---
# this.theme

您可以通过 `this.theme` 访问当前主题对象，它返回 `Cms\Classes\Theme` 对象，该对象是对[主题自定义对象](../../cms/themes/settings.md)的引用。

## 属性

`this.theme` 可以直接访问由任何主题自定义定义的表单字段值。它还原生具有以下属性。

### id

将主题目录名转换为 CSS 友好的标识符。

```twig
<body class="theme-{{ this.theme.id }}">
```

如果主题目录是 **website**，则会生成类名 `theme-website`。

### config

一个包含 `theme.yaml` 文件中所有主题配置值的数组。

```twig
<meta name="description" content="{{ this.theme.config.description }}">
```
