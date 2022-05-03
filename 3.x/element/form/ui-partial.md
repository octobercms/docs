# Partial

`partial` - renders a partial, the `path` value can refer to a partial view file otherwise the field name is used as the partial name. Inside the partial these variables are available: `$value` is the default field value, `$model` is the model used for the field and `$field` is the configured class object `Backend\Classes\FormField`.

```yaml
content:
    type: partial
    path: $/acme/blog/models/comments/_content_field.htm
```
