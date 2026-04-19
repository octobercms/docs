---
subtitle: 了解如何在 CMS 主题中翻译消息。
---
# 本地化

::: aside
查看[多站点文章](../resources/multisite.md)以了解如何为您的网站设置活动语言。
:::

主题可以通过放置在主题目录的 **lang** 子目录中的文件来提供本地化键。这些本地化键会自动注册，可以在主题内容中使用，也可以作为后端表单标签使用，类似于[插件本地化](../../extend/system/localization.md)。

### 本地化文件结构

以下是主题 **lang** 目录的示例。

::: dir
├── themes
|   └── website
|       └── `lang`  _← 本地化目录_
|           ├── en.json  _← 本地化文件_
|           └── fr.json  _← 本地化文件_
:::

本地化文件是一个 JSON 文件，其中字符串使用"默认"翻译的字符串作为键。例如，如果您的应用程序有法语翻译，您应该创建一个 `lang/fr.json` 文件。

```json
{
    "I love programming.": "j'adore programmer"
}
```

您还可以通过在 JSON 文件中使用完整的语言键来定义基于代码的键，例如，可以为 **acme** 主题使用 `theme.options.website_name`。

```json
{
    "theme.options.website_name": "October CMS"
}
```

可以在主题文件中使用 `trans` Twig 过滤器来访问语言字符串。

::: tip
查看[标记指南](../../markup/filter/trans.md)以了解更多关于 Twig 中翻译的内容。
```twig
<!-- j'adore programmer -->
{{ 'I love programming.'|trans }}

<!-- October CMS -->
{{ 'theme.options.website_name'|trans }}
```
:::

#### 参见

::: also
* [多站点](../resources/multisite.md)
* [插件本地化](../../extend/system/localization.md)
:::
