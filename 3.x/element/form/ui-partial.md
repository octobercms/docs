---
subtitle: Form UI
---
# Partial

The `partial` UI element renders a partial, the `path` value can refer to a partial view file otherwise the field name is used as the partial name.

```yaml
content:
    label: Content
    type: partial
    path: field_content
```

The following [field properties](../form-fields.md) are supported.

Property | Description
------------- | -------------
**path** | path to a [partial view file](../../extend/system/views.md) or [view template code](../../extend/services/response-view.md), defaults to the field name with **field_** as a prefix.

When the `path` is set to an unqualified file name (a file name without a directory path and extension), the source path is determined to be in the model or controller directories. The following example will check for the partial file at **../models/mymodel/_field_for_content.php** or **../controllers/mycontroller/_field_for_content.php**.

```yaml
content:
    type: partial
    path: field_for_content
```

You may specify a fully qualified `path` to access partials outside the model or controller directories. This can be useful for sharing partials between definitions.

```yaml
content:
    type: partial
    path: $/acme/blog/partials/_field_content.php
```

## Accessing Variables

The following variables are available inside the partial when it is rendered.

- `$value` is the current field value, if found.
- `$model` is the [model used](../../extend/system/models.md) for the field
- `$field` is the configured class object `Backend\Classes\FormField`

Here is an some example contents of the **_field_content.php** file.

```php
<?php if ($model->is_active): ?>
    <p><?= $field->label ?> is active</p>
<?php endif ?>
```

## Using View Templates

You may pass a view template code as the `path` to access view service templates inside the plugin. The following code would be found at the path **plugins/acme/blog/views/formfields/content.php**.

```yaml
content:
    type: partial
    path: acme.blog::formfields.content
```

:::tip
The path must contain the `::` characters to activate the view service.
:::

#### See Also

::: also
* [Hint Form UI](./ui-hint.md)
* [Rendering Controller Views](../../extend/system/views.md)
* [Response & View Service](../../extend/services/response-view.md)
:::
