---
subtitle: Twig 过滤器
---
# |theme

`|theme` 过滤器返回相对于网站活动主题路径的地址。结果是一个绝对 URL，包括域名和协议，指向过滤器参数中指定的资源。主题资源通常位于主题目录的 **assets** 子目录中。

```twig
<script type="text/javascript" src="{{ 'assets/js/menu.js'|theme }}"></script>
```

如果网站地址是 __https://octobercms.com__，活动主题名为 `website`，上面的示例将输出以下内容：

```html
<script type="text/javascript" src="http://october.com/themes/website/assets/js/menu.js"></script>
```

## 合并 CSS 和 JavaScript

该过滤器还可以通过传递文件数组来合并相同类型的资源。

```twig
<link href="{{ [
    'assets/css/styles1.css',
    'assets/css/styles2.css'
]|theme }}" rel="stylesheet">
```

> **注意**：您可以在 `config/cms.php` 脚本中通过 `enableAssetMinify` 参数启用资源压缩。默认情况下压缩是禁用的。

### 合并器别名

资源合并器支持替代文件路径的常用别名，这些别名以 `@` 符号开头。例如，[AJAX 框架资源](../../cms/ajax/introduction.md)可以包含在合并器中。

```twig
<script src="{{ [
    '@framework.extras',
    'assets/javascript/app.js'
]|theme }}"></script>
```

支持以下别名：

Alias | Description
------------- | -------------
`@framework` | AJAX 框架附加功能，替代 `{% framework %}` 标签（JavaScript）
`@framework.extras` | AJAX 框架附加功能，替代 `{% framework extras %}` 标签（JavaScript、CSS）
`@framework.turbo` | AJAX 框架 turbo，替代 `{% framework turbo %}` 标签（JavaScript）
`@framework.bundle` | AJAX 框架 bundle，替代 `{% framework extras turbo %}` 标签（JavaScript、CSS）

:: tip
同一个别名可以用于 JavaScript 或 CSS，例如 `@framework.extras`。数组中至少需要另一个具有 CSS 或 JS 文件扩展名的引用来确定使用哪种类型。
:::

### 外部合并器路径

在某些情况下，您可能希望合并主题之外的文件，这可以通过在路径前添加符号来创建动态路径来实现。例如，以 `~/` 开头的路径将创建相对于应用程序的路径：

```twig
<script src="{{ ['~/modules/system/assets/js/framework.js']|theme }}"></script>
```

以下符号支持创建动态路径：

Symbol | Description
------------- | -------------
`~` | 相对于应用程序目录
`$` | 相对于插件目录
`#` | 相对于主题目录
