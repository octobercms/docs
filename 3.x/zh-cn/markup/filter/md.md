---
subtitle: Twig 过滤器
---
# |md

`|md` 过滤器将值从 Markdown 格式转换为 HTML 格式。

```twig
{{ '**Text** is bold.'|md }}
```

上面的代码将输出以下内容：

```html
<strong>Text</strong> is bold.
```

有关使用 Markdown 的更多详细信息，请参阅 [Markdown 解析器文章](../../extend/services/parser.md)。

## |md_safe

`|md_safe` 过滤器将在安全模式下解析 Markdown，完全转义所有 HTML，除了 Markdown 语法生成的基本 HTML。简而言之，这意味着 HTML 标记会被转义，并且防御 Markdown 语法中提供脚本功能的地方。只有特定的"安全" HTML 协议可以使用，例如 `https://`、`ftps://`、`mailto:` 等。

以下 JavaScript 将不会执行：

```twig
{{ '<a href="javascript:alert(1)">click me</a>'|md_safe }}
```

## |md_clean

`md_clean` 过滤器将以比 `|md_safe` 更多的 HTML 支持来解析 Markdown，因为它使用清理器来移除任何潜在的危险代码。

```twig
{{ '<script>alert(1)</script>'|md_clean }}
```

#### 参见

::: also
* [Markdown 解析器文章](../../extend/services/parser.md)
:::
