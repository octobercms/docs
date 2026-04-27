---
subtitle: 列表列
shortname: Summary
---
# Summary 列

`summary` - 生成摘要值，去除 HTML 并将长度限制到最近的单词边界。

```yaml
html_content:
    label: Content
    type: summary
```

默认摘要长度为 40 个字符，您可以使用 `limitChars` 选项进行调整。

```yaml
html_content:
    label: Content
    type: summary
    limitChars: 100
```

要按单词数量限制，请指定 `limitWords` 选项。您也可以使用 `endChars` 选项更改结尾后缀字符。

```yaml
html_content:
    label: Content
    type: summary
    limitWords: 10
    endChars: "..."
```
