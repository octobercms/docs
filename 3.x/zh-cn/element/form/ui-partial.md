---
subtitle: 表单 UI
shortname: Partial
---
# Partial 字段

`partial` UI 元素渲染一个部件，`path` 值可以引用部件视图文件，否则将使用字段名称作为部件名称。

```yaml
content:
    label: Content
    type: partial
    path: field_content
```

支持以下[字段属性](../form-fields.md)。

属性 | 描述
------------- | -------------
**path** | [部件视图文件](../../extend/system/views.md)或[视图模板代码](../../extend/services/response-view.md)的路径，默认为以 **field_** 为前缀的字段名称。

当 `path` 设置为非限定文件名（不包含目录路径和扩展名的文件名）时，源路径将被确定为模型或控制器目录。以下示例将在 **../models/mymodel/_field_for_content.php** 或 **../controllers/mycontroller/_field_for_content.php** 中查找部件文件。

```yaml
content:
    type: partial
    path: field_for_content
```

您可以指定完全限定的 `path` 来访问模型或控制器目录之外的部件。这对于在不同定义之间共享部件非常有用。

```yaml
content:
    type: partial
    path: $/acme/blog/partials/_field_content.php
```

## 访问变量

部件渲染时，以下变量在部件内部可用。

- `$value` 是当前字段值（如果存在）。
- `$model` 是字段使用的[模型](../../extend/system/models.md)
- `$field` 是已配置的类对象 `Backend\Classes\FormField`

以下是 **_field_content.php** 文件的一些示例内容。

```php
<?php if ($model->is_active): ?>
    <p><?= $field->label ?> is active</p>
<?php endif ?>
```

## 使用视图模板

您可以将视图模板代码作为 `path` 传递，以访问插件内部的视图服务模板。以下代码将在路径 **plugins/acme/blog/views/formfields/content.php** 中找到。

```yaml
content:
    type: partial
    path: acme.blog::formfields.content
```

您也可以将部件放在 app 目录中，例如 **app/views/formfields/content.php**。

```yaml
content:
    type: partial
    path: app::formfields.content
```

:::tip
路径必须包含 `::` 字符才能激活视图服务。
:::

#### 另请参阅

::: also
* [Hint 表单 UI](./ui-hint.md)
* [渲染控制器视图](../../extend/system/views.md)
* [响应与视图服务](../../extend/services/response-view.md)
:::
