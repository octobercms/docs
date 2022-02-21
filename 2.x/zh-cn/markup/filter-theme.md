# |theme

`|theme` 过滤器返回相对于网站活动主题路径的地址。 返回结果是过滤器参数中指定的主题的绝对 URL，包括域名和协议。 主题资产通常位于主题目录的 **assets** 子目录中。

```twig
<script type="text/javascript" src="{{ 'assets/js/menu.js'|theme }}"></script>
```

如果网站地址是 __https://octobercms.com__ 并且活动主题名为 `website`，则上面的示例将输出以下内容： 

```html
<script type="text/javascript" src="http://october.com/themes/website/assets/js/menu.js"></script>
```

## 合并 CSS 和 JavaScript

过滤器还可用于通过传递文件数组来组合相同类型的资产。

```twig
<link href="{{ [
    'assets/css/styles1.css',
    'assets/css/styles2.css'
]|theme }}" rel="stylesheet">
```

> **注意**: 您可以使用 `config/cms.php` 文件中的 `enableAssetMinify` 参数启用资产合并。 默认情况下，合并是禁用的。


### 组合器别名 

资产组合器支持替换文件路径的常用别名，这些别名将以"@"符号开头。 例如 [AJAX 框架资产](../ajax/introduction.md#including-the-framework) 可以包含在组合器中:

```twig
<script src="{{ [
    '@jquery',
    '@framework',
    '@framework.extras',
    'assets/javascript/app.js'
]|theme }}"></script>
```

支持以下别名：

别名 | 描述
------------- | -------------
`@jquery` | 引用后端使用的jQuery库. (JavaScript)
`@framework` | AJAX 框架附加功能，代替  `{% framework %}` (JavaScript)
`@framework.extras` | AJAX 框架附加功能，代替 `{% framework extras %}`  (JavaScript, CSS)
`@framework.extras.js` | AJAX 框架附加功能 (JavaScript)
`@framework.extras.css` | AJAX 框架附加功能 (CSS)

相同的别名可用于 JavaScript 或 CSS，例如 `@framework.extras`。 数组中至少需要一个带有文件扩展名的显式引用来确定使用哪个。

### 动态组合器路径

在某些情况下，您可能希望在主题之外组合文件，这是通过在路径前加上符号来创建动态路径来实现的。 例如，以 `~/` 开头的路径将创建一个相对于应用程序的路径： 

```twig
<script src="{{ ['~/modules/system/assets/js/framework.js']|theme }}"></script>
```

支持这些符号用于创建动态路径：

符号 | 描述
------------- | -------------
`~` | 相对于应用程序目录
`$` | 相对于插件目录 
`#` | 相对于主题目录
