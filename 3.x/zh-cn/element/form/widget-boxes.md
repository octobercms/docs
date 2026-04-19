---
subtitle: 表单小部件
shortname: Boxes
---
# Boxes 字段

`boxes` - 渲染一个用于构建可视化页面的盒子编辑器，其工作方式类似于前端页面构建器。

::: tip
此字段需要在 October CMS 市场上安装 [Boxes 插件](https://octobercms.com/plugin/offline-boxes)后才能使用。获得许可后，您可以使用以下命令安装它。

```bash
php artisan plugin:install OFFLINE.Boxes
```
:::

要在 Tailor 后端表单中显示 Boxes 编辑器，请按如下方式定义表单字段：

```yaml
fields:
    boxes_content:
        label: Boxes Content
        span: adaptive  # This makes sure the Boxes Editor looks good in Tailor.
        type: boxes     # This loads the Boxes Editor.
```

在前端中，您可以使用字段上的 render 方法获取渲染的 HTML 内容：

::: cmstemplate
```ini
[section yourSectionVar]
handle = "Your\Handle"
```
```twig
{{ yourSectionVar.boxes_content.render|raw }}
```
:::

#### 另请参阅

::: also
* [Boxes 插件页面](https://octobercms.com/plugin/offline-boxes)
:::
