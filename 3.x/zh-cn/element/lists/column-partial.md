---
subtitle: 列表列
shortname: Partial
---
# Partial 列

`partial` 列将使用部件或视图文件渲染列内容。`path` 值可以引用部件视图文件，否则将使用列名称作为部件名称。视图路径的默认范围是控制器的视图路径。

```yaml
content:
    label: Content
    type: partial
    path: content_column
```

支持以下属性。

属性 | 描述
------------- | -------------
**path** | [部件视图文件](../../extend/system/views.md)或[视图模板代码](../../extend/services/response-view.md)的路径，默认为以 **column_** 为前缀的列名称。

当 `path` 设置为非限定文件名（不包含目录路径和扩展名的文件名）时，源路径将被确定为模型或控制器目录。以下示例将在 **../models/mymodel/_column_for_content.php** 或 **../controllers/mycontroller/_column_for_content.php** 中查找部件文件。

```yaml
content:
    type: partial
    path: column_for_content
```

您可以指定完全限定的 `path` 来访问模型或控制器目录之外的部件。这对于在不同定义之间共享部件非常有用。

```yaml
content:
    label: Content
    type: partial
    path: $/acme/blog/partials/_content_column.php
```

在部件内部以下变量可用。

- `$value` 是默认的单元格值
- `$record` 是用于单元格的模型
- `$column` 是已配置的类对象 `Backend\Classes\ListColumn`

以下是 **_content_column.php** 文件的一些示例内容。

```php
<?php if ($record->is_active): ?>
    <?= e($value) ?>
<?php endif ?>
```

## 使用视图模板

您可以将视图模板代码作为 `path` 传递，以访问插件内部的视图服务模板。以下代码将在路径 **plugins/acme/blog/views/listcolumns/content.php** 中找到。

```yaml
content:
    label: Content
    type: partial
    path: acme.blog::listcolumns.content
```

:::tip
路径必须包含 `::` 字符才能激活视图服务。
:::

#### 另请参阅

::: also
* [渲染控制器视图](../../extend/system/views.md)
* [响应与视图服务](../../extend/services/response-view.md)
:::
