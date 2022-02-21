# {% styles %}

`{% styles %}` 标记将 CSS 链接呈现到应用程序注入的样式表文件。 标签通常在页面或布局的 head 部分中定义：

```twig
<head>
    ...
    {% styles %}
</head>
```

> **注意**：此标签应仅在给定的页面周期中出现一次，以防止重复引用。

## 注入样式

可以通过[部件](../plugin/components.md#injecting-page-assets-with-components) 或者 [页面编程方式](../cms/pages.md#injecting-page-assets-programmatically)在 PHP 中注入样式表文件的链接

```php
function onStart()
{
    $this->addCss('assets/css/hello.css');
}
```

您还可以使用 **styles** [占位符](../cms/layouts.md#placeholders) 将原始标记注入到 `{% styles %}` 标签。 在页面或布局中使用 `{% put %}` 标签将内容添加到占位符：

```twig
{% put styles %}
    <link href="/themes/demo/assets/css/page.css" rel="stylesheet" />
{% endput %}
```
