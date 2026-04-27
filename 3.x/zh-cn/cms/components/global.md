---
subtitle: 向页面添加全局配置。
---
# 全局（Global）

`global` 组件使全局记录可用于页面、布局或部件。全局组件可以在任何页面、布局或部件中使用。

## 可用属性

该组件支持以下属性。

属性 | 描述
-------- | -------------
**handle** | [全局蓝图](../tailor/blueprints.md)的句柄。

## 基本用法

以下示例向页面添加了一个句柄为 **Blog\Config** 的全局。使用组件别名将组件分配名称 **blogConfig**，这就是页面可用的变量名称。页面访问 `about_this_blog` 文本字段并将其显示在页面上。

::: cmstemplate
```ini
[global blogConfig]
handle = "Blog\Config"
```
```twig
<p>{{ blogConfig.about_this_blog }}</p>
```
:::
