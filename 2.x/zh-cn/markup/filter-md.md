# |md

`|md` 过滤器将值从 Markdown 转换为 HTML 格式.

```twig
{{ '**Text** 是粗体.'|md }}
```

以上将输出以下内容：

```html
<strong>Text</strong> 是粗体.
```

有关使用 Markdown 的更多详细信息，请参阅 [Markdown 解析器文章](../services/parser.md#oc-markdown-parser)