# {% scripts %}

`{% scripts %}` 标签将 JavaScript 文件引用插入到应用程序注入的脚本中。 该标记通常在结束 BODY 标记之前定义：

```twig
<body>
    ...
    {% scripts %}
</body>
```

>  **注意**：此标签应仅在给定的页面周期中出现一次，以防止重复引用。

## 注入脚本

可以通过 [组件](../plugin/components.md#oc-injecting-page-assets-with-components) 或 [页面](../cms/pages.md#oc-injecting-page-assets-programmatically)以编程方式将 JavaScript 文件的链接注入PHP

```php
function onStart()
{
    $this->addJs('assets/js/app.js');
}
```

您还可以使用 **scripts** [占位符](../cms/layouts.md#oc-placeholders) 将原始标记注入到 `{% scripts %}` 标签。 在页面或布局中使用 `{% put %}` 标签将内容添加到占位符：

```twig
{% put scripts %}
    <script type="text/javascript" src="/themes/demo/assets/js/menu.js"></script>
{% endput %}
```
