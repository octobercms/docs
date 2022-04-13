# Partial

`partial` - renders a partial, the `path` value can refer to a partial view file otherwise the column name is used as the partial name.

```yaml
content:
    label: Content
    type: partial
    path: ~/plugins/acme/blog/models/comment/_content_column.htm
```

Inside the partial these variables are available: `$value` is the default cell value, `$record` is the model used for the cell and `$column` is the configured class object `Backend\Classes\ListColumn`. Here is an some example contents of the **_content_column.htm** file.

```php
<?php if ($record->is_active): ?>
    <?= e($value) ?>
<?php endif ?>
```
