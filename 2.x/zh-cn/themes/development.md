# 开发主题

主题目录可以包括 **theme.yaml**、**version.yaml** 和 **assets/images/theme-preview.png** 文件。 这些文件对于本地开发是可选的，但对于在 October CMS 市场上发布的主题是必需的。

##主题信息文件

主题信息文件 **theme.yaml** 包含主题描述、作者姓名、作者网站的 URL 以及其他一些信息。 该文件应放在主题根目录中：

```
themes/
  demo/
    theme.yaml    <=== 主题信息文件
```

**theme.yaml** 文件支持以下字段:

领域 | 描述
------------- | -------------
**name** | 指定主题名称，必填。
**author** | 指定作者姓名，必填。
**homepage** | 指定作者网站 URL，必填。
**description** | 主题描述，必填。
**previewImage** | 自定义预览图片，相对于主题目录的路径，例如：`assets/images/preview.png`，可选。
**code** | 主题代码，可选。 该值在 October CMS 市场上用于初始化主题代码值。
**authorCode** | 主题作者代码，可选。 该值在 October CMS 市场上用于定义主题所有者。
**form** | 配置数组或对表单域定义文件的引用，用于[主题定制](#theme-customization)，可选。
**require** | 用于 [主题依赖项](#theme-dependencies) 的插件名称数组，可选。

主题信息文件示例：

```yaml
name: "October CMS Demo"
description: "演示前端主题的基本概念"
author: "October CMS"
homepage: "http://octobercms.com"
code: "Demo"
authorCode: "武志伟"
```

## 版本文件

主题版本文件 **version.yaml** 定义了当前的主题版本和变更日志。 该文件应放在主题根目录中：

```
themes/
  demo/
    ...
    version.yaml    <=== 主题版本文件
```

文件格式如下：

```yaml
v1.0.1: 主题初始化
v1.0.2: 添加了更多功能
v1.0.3: 删除了一些功能
```

## 主题预览图片

主题预览图像用于后端主题选择器。 图片文件**theme-preview.png** 应该放在主题的**assets/images** 目录下:

```
themes/
  demo/
    assets/
      images/
        theme-preview.png    <=== 主题预览图
```

图像宽度应至少为 600 像素。 理想的纵横比是 1.5，例如 600x400px。

## 主题定制

主题可以通过在主题信息文件中定义一个 `form` 键来支持配置值。 此键应包含配置数组或对表单字段定义文件的引用，有关更多信息，请参阅 [表单字段](../backend/forms.md#defining-form-fields)。

以下是如何定义名为**site_name** 的网站名称配置字段的示例：

```yaml
name:我的主题
# [...]

form:
    fields:
        site_name:
            label: 站点名称
            comment: 应出现在前端的网站名称
            default: 我的超级网站！
```

> **注意**：如果使用具有数组语法(`contact[name]`、`contact[email]` 等)的嵌套字段，您需要使用 下列的。

```php
\Cms\Models\ThemeData::extend(function ($model) {
    $model->addJsonable('contact');
});
```

然后可以使用名为`this.theme`的[默认页面变量](../cms/markup.md#default-variables) 在任何主题模板中访问该值。

```twig
<h1>欢迎来到 {{ this.theme.site_name }}!</h1>
```

您还可以在单独的文件中定义配置，其中路径是相对于主题的。 以下定义将从主题内的文件 **config/fields.yaml** 中获取表单字段。

```yaml
name: 我的主题
# [...]

form: config/fields.yaml
```

**config/fields.yaml**:

```yaml
fields:
    site_name:
        label: 站点名称
        comment: 应出现在前端的网站名称
        default: 我的超级网站！
```

### 组合变量

使用 `|theme` [过滤器和组合器](../markup/filter-theme.md) 组合的资产可以将值传递给过滤器，例如 LESS 过滤器。 在定义表单字段时只需指定 `assetVar` 选项，该值应包含所需的变量名称。

```yaml
form:
    fields:
        # [...]

        link_color:
            label: Link color
            type: colorpicker
            assetVar: 'link-color'
```

在上面的例子中，选择的颜色值将在 less 文件中作为 `@link-color` 可用。 假设我们有以下样式表参考：

```twig
<link href="{{ ['assets/less/theme.less']|theme }}" rel="stylesheet" />
```

使用 **themes/yourtheme/assets/less/theme.less** 中的一些示例内容：

```less
a { color: @link-color }
```

## 主题依赖

一个主题可以通过在[主题信息文件](#theme-information-file)中定义一个**require**选项来依赖插件，该选项应该提供一个被认为是需求的插件名称数组。 依赖于 **Acme.Blog** 和 **Acme.User** 的主题可以像这样定义这个需求：

```yaml
name: "October CMS Demo"
# [...]

require:
    - "Acme.User"
    - "Acme.Blog"
```

首次安装主题时，系统会同时尝试安装所需的插件。

## 多语言

主题可以通过放置在主题目录的 **lang** 子目录中的文件提供后端多语言密钥。 这些多语言键只有在与 October 后端交互时才会自动注册，并且可以像 [插件多语言](../plugin/localization.md) 一样用于表单标签

> **注意**：翻译前端内容应使用 [RainLab.Translate](https://octobercms.com/plugin/rainlab-translate) 插件处理。

### 多语言文件结构

以下是主题的 lang 目录示例：

```
themes/
  acme/           <=== 主题目录
    lang/         <=== 多语言目录
      en/         <=== 语言目录
        lang.php  <=== 多语言文件
      fr/
        lang.php
```

**lang.php** 文件应该定义并返回一个任意深度的数组，例如：

```php
return [
    'options' => [
        'website_name' => 'October CMS'
    ]
];
```

然后你就可以使用`theme.theme-code::lang.key` 来引用这些键。 在上面的例子中，你用来引用`website_name`多语言的完整语言键是`theme.acme::lang.options.website_name`。
