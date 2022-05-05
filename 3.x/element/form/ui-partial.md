# Partial

The `partial` UI element renders a partial, the `path` value can refer to a partial view file otherwise the field name is used as the partial name.

```yaml
content:
    type: partial
    path: content_field
```

The following properties are supported.

Property | Description
------------- | -------------
**path** | path to a [partial view file](../../extend/system/views.md), defaults to the field name.

You may specify a fully qualified `path` to access partials outside the controller scope.

```yaml
content:
    type: partial
    path: content_field
    path: $/acme/blog/models/comments/_content_field.htm
```

Inside the partial these variables are available.

- `$value` is the current field value, if found.
- `$model` is the [model used](../../extend/system/models.md) for the field
- `$field` is the configured class object `Backend\Classes\FormField`

For example.

```php
<?= $field->label ?>
<?= $model->id ?>
<?= $value ?>
```

#### See Also

::: also
* [Hint Form UI](./ui-hint.md)
:::
