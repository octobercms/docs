---
subtitle: 了解如何自定义主题管理功能。
---
# 主题设置

主题目录可以包含 **theme.yaml**、**version.yaml** 和 **assets/images/theme-preview.png** 文件。这些文件对于本地开发是可选的，但对于在 October CMS 市场上发布的主题是必需的。

## 主题信息文件

主题信息文件 **theme.yaml** 包含主题描述、作者名称、作者网站 URL 和一些其他信息。该文件应放置在主题根目录中：

::: dir
├── themes
|   └── website
|       ├── pages
|       ├── layouts
|       ├── partials
|       ├── content
|       ├── assets
|       └── `theme.yaml`  _← 信息文件_
:::

**theme.yaml** 文件支持以下字段：

字段 | 描述
------------- | -------------
**name** | 指定主题名称，必填。
**author** | 指定作者名称，必填。
**homepage** | 指定作者网站 URL，必填。
**description** | 主题描述，必填。
**previewImage** | 自定义预览图片，相对于主题目录的路径，例如：`assets/images/preview.png`，可选。
**code** | 主题代码，可选。该值在 October CMS 市场上用于初始化主题代码值。
**authorCode** | 主题作者代码，可选。该值在 October CMS 市场上用于定义主题所有者。
**form** | 配置数组或表单字段定义文件的引用，用于主题自定义，可选。
**require** | 用于主题依赖的插件名称数组，可选。

主题信息文件示例：

```yaml
name: "October CMS Demo"
description: "Demonstrates the basic concepts of the front-end theming."
author: "October CMS"
homepage: "https://octobercms.com"
code: "Demo"
authorCode: "Acme"
```

## 版本文件

主题版本文件 **version.yaml** 定义当前主题版本和更新日志。该文件应放置在主题根目录中。

::: dir
├── themes
|   └── website
|       ├── ...
|       └── theme.yaml
|       └── `version.yaml`  _← 版本文件_
:::

该文件包含以下格式。

```yaml
v1.0.1: Theme initialization
v1.0.2: Added more features
v1.0.3: Some features are removed
```

## 主题预览图片

主题预览图片用于后端主题选择器。图片文件 **theme-preview.png** 应放置在主题的 **assets/images** 目录中：

::: dir
├── themes
|   └── website
|       ├── ...
|       └── assets
|           └── images
|               └── `theme-preview.png`  _← 预览图片_
:::

图片宽度应至少为 600px。理想的宽高比为 1.5，例如 600x400px。

## 主题依赖

主题可以通过在主题信息文件中定义 **require** 选项来依赖插件，该选项应提供一个被视为需求的插件名称数组。依赖 **Acme.Blog** 和 **Acme.User** 的主题可以如此定义此需求：

```yaml
name: "October CMS Demo"
# [...]

require:
    - "Acme.User"
    - "Acme.Blog"
```

当主题首次安装时，系统将尝试同时安装所需的插件。为了获得流畅的体验，请考虑同时[将这些插件添加到 Composer 依赖列表](../../extend/resources/publishing-packages.md)中。

## 主题自定义

主题可以通过在主题信息文件中定义 `form` 键来支持配置值。此键应包含配置数组或表单字段定义文件的引用，更多信息请参阅[表单字段定义](../../element/form-fields.md)。

以下是如何定义一个名为 **site_name** 的网站名称配置字段的示例：

```yaml
name: My Theme
# [...]

form:
    fields:
        site_name:
            label: Site name
            comment: The website name as it should appear on the front-end
            default: My Amazing Site!
```

然后可以在任何主题模板中使用名为 `this.theme` 的[全局 Twig 变量](../../markup/property/this-theme.md)来访问该值。

```twig
<h1>Welcome to {{ this.theme.site_name }}!</h1>
```

您也可以在单独的文件中定义配置，其中路径相对于主题。以下定义将从主题内的 **config/fields.yaml** 文件中获取表单字段。

```yaml
name: My Theme
# [...]

form: config/fields.yaml
```

**themes/demo/config/fields.yaml**:

```yaml
fields:
    site_name:
        label: Site name
        comment: The website name as it should appear on the front-end
        default: My Amazing Site!
```

### 在 CSS 中使用主题数据

有时您可能希望在主题样式表中包含视觉偏好。您可以使用 CSS 自定义属性（变量）来使这些值可用。在以下示例中，我们将使用[颜色选择器字段类型](../../element/form/widget-colorpicker.md)来指定自定义链接颜色。

```yaml
form:
    fields:
        # [...]

        link_color:
            label: Link color
            type: colorpicker
```

使用上面的示例，我们可以定义一个 [CMS 部件](./partials.md)，使用本地样式表将选定的值传递给 CSS。然后将该部件包含在[主题布局](./layouts.md)的 `<head>` 标签内。

```html
<style>
    :root {
        --my-color: {{ this.theme.link_color }};
    }
</style>
```

::: tip
自定义属性名称区分大小写，因此 `--my-color` 将被视为与 `--My-color` 不同的自定义属性。
:::

现在在您的样式表中，可以通过在 `var()` 函数内指定自定义属性名称来代替常规属性值，在任何地方使用该自定义属性。

```css
a {
    color: var(--my-color);
}
```

### 将主题数据与合并资产一起使用

使用 `|theme` [过滤器和合并器](../markup/filter-theme.md)合并的资产可以将值传递给支持的过滤器，例如 LESS 过滤器。只需在定义表单字段时指定 `assetVar` 选项，该值应包含所需的变量名称。

```yaml
form:
    fields:
        # [...]

        link_color:
            label: Link color
            type: colorpicker
            assetVar: 'link-color'
```

在上面的示例中，选定的颜色值将在 LESS 文件中以 `@link-color` 的形式可用。假设我们有以下样式表引用：

```twig
<link href="{{ ['assets/less/theme.less']|theme }}" rel="stylesheet">
```

使用 **themes/yourtheme/assets/less/theme.less** 中的一些示例内容：

```less
a { color: @link-color }
```
