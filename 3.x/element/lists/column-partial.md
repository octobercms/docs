# Partial

The `partial` column will render the column content using a partial or view file. The `path` value can refer to a partial view file otherwise the column name is used as the partial name. The default scope for the view path is the controller's view path.

```yaml
content:
    label: Content
    type: partial
    path: content_column
```

The following properties are supported.

Property | Description
------------- | -------------
**path** | path to a [partial view file](../../extend/system/views.md) or [view template code](../../extend/services/response-view.md), defaults to the column name.

You may specify a fully qualified `path` to access partials outside the controller scope.

```yaml
content:
    label: Content
    type: partial
    path: ~/plugins/acme/blog/models/comment/_content_column.php
```

Inside the partial these variables are available.

- `$value` is the default cell value
- `$record` is the model used for the cell
- `$column` is the configured class object `Backend\Classes\ListColumn`

Here is an some example contents of the **_content_column.php** file.

```php
<?php if ($record->is_active): ?>
    <?= e($value) ?>
<?php endif ?>
```

## Using View Templates

You may pass a view template code as the `path` to access view service templates inside the plugin. The following code would be found at the path **plugins/acme/blog/views/listcolumns/content.php**.

```yaml
content:
    label: Content
    type: partial
    path: acme.blog::listcolumns.content
```

:::tip
The path must contain the `::` characters to activate the view service.
:::

#### See Also

::: also
* [Rendering Controller Views](../../extend/system/views.md)
* [Response & View Service](../../extend/services/response-view.md)
:::
