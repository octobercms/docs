---
previousPath: extend/forms/relation-controller.md#extending-relation-behavior
subtitle: Change the configuration, widgets, toolbar and refreshes of the relation controller from your own code.
---
# Extending the Relation Controller

The relation controller calls override methods on your controller as it builds each relation manager, so you can change its configuration, lists, forms and toolbar. Every method receives the relation name in `$field`, so check it before you change anything.

```php
public function relationExtendConfig($config, $field, $model)
{
    if ($field !== 'comments') {
        return;
    }

    $config->view['recordsPerPage'] = 5;
}
```

## Extending Relation Configuration

The `relationExtendConfig` method lets you change the relation configuration. The following example uses a different columns.yaml file based on a property of your model.

```php
public function relationExtendConfig($config, $field, $model)
{
    // Make sure the model and field matches those you want to manipulate
    if (!$model instanceof MyModel || $field !== 'myField') {
        return;
    }

    // Show a different list for business customers
    if ($model->mode == 'b2b') {
        $config->view['list'] = '$/author/plugin_name/models/mymodel/b2b_columns.yaml';
    }
}
```

## Extending the View Widget

The view widget displays the related records on the page. Relations with many records use a list widget, extended by the `relationExtendViewListWidget` method. Singular relations use a form widget, extended by the `relationExtendViewFormWidget` method. For example, you might toggle `showCheckboxes` based on a property of your model.

```php
public function relationExtendViewListWidget($widget, $field, $model)
{
    // Make sure the model and field matches those you want to manipulate
    if (!$model instanceof MyModel || $field !== 'myField') {
        return;
    }

    if ($model->constant) {
        $widget->showCheckboxes = false;
    }
}
```

### Removing a Column

The widget has not finished initializing at this point, so you can't call `$widget->removeColumn()` directly. The `addColumns()` method described in [Extending the List Controller](../lists/extending.md#extending-column-definitions) works as expected, but to remove a column, listen to the `list.extendColumns` event inside the `relationExtendViewListWidget()` method.

```php
public function relationExtendViewListWidget($widget, $field, $model)
{
    // Make sure the model and field matches those you want to manipulate
    if (!$model instanceof MyModel || $field !== 'myField') {
        return;
    }

    // This will work
    $widget->bindEvent('list.extendColumns', function () use ($widget) {
        $widget->removeColumn('my_column');
    });
}
```

## Extending the Manage Widget

The manage widget is shown in the popup used to manage related records. The `relationExtendManageListWidget` method extends the list used to select existing records, and the `relationExtendManageFormWidget` method extends the form used to create or update a record.

```php
public function relationExtendManageListWidget($widget, $field, $model)
{
    // Make sure the field is the expected one
    if ($field !== 'myField') {
        return;
    }

    // Manipulate widget as needed
}

public function relationExtendManageFormWidget($widget, $field, $model)
{
    // Make sure the field is the expected one
    if ($field !== 'myField') {
        return;
    }

    // Manipulate widget as needed
}
```

## Extending the Pivot Widget

The `relationExtendPivotFormWidget` method extends the form used to edit the pivot data of your relation.

```php
public function relationExtendPivotFormWidget($widget, $field, $model)
{
    // Make sure the field is the expected one
    if ($field !== 'myField') {
        return;
    }

    // Manipulate widget as needed
}
```

## Extending the Filter Widgets

The relation controller has two filter widgets, one for the view mode and one for the manage mode. Extend them with the following methods.

```php
public function relationExtendViewFilterWidget($widget, $field, $model)
{
    // Extends the view filter widget
}

public function relationExtendManageFilterWidget($widget, $field, $model)
{
    // Extends the manage filter widget
}
```

For examples of adding or removing scopes in the filter widgets, see [Extending Filter Scopes](../lists/extending.md#extending-filter-scopes).

## Running Code When Related Records Change

The relation controller calls an override method on the controller before and after it changes related records. Each method receives the relation name in `$field`, followed by the model, or by the list of models for add, remove and delete actions.

Override Method | Called
------------- | -------------
**relationBeforeSave** | before a related record is created or updated
**relationAfterSave** | after a related record is created or updated
**relationBeforeCreate** | before a related record is created
**relationAfterCreate** | after a related record is created
**relationBeforeUpdate** | before a related record is updated
**relationAfterUpdate** | after a related record is updated
**relationAfterDelete** | after related records are deleted
**relationBeforeAdd** | before existing records are added to the relation
**relationAfterAdd** | after existing records are added to the relation
**relationBeforeRemove** | before records are removed from the relation
**relationAfterRemove** | after records are removed from the relation

```php
public function relationAfterCreate($field, $model)
{
    if ($field !== 'comments') {
        return;
    }

    // Respond to the new comment
}
```

## Adding Custom Toolbar Buttons

In addition to the built-in `toolbarButtons` (such as `create`, `add` and `delete`), you may add your own buttons by listing a custom name and providing a matching partial in the controller's views directory. The partial name follows the convention `_relation_button_{name}.php`.

For example, to add an **Export** button to the toolbar, include `export` in the `toolbarButtons` definition.

```yaml
# config_relation.yaml
items:
    view:
        list: $/acme/pay/models/invoiceitem/columns.yaml
        toolbarButtons: create|delete|export
```

Then create a partial named `_relation_button_export.php` in the controller's views directory.

```php
<a
    data-request="onExportRelation"
    href="javascript:;"
    class="btn btn-sm btn-secondary"
>
    <i class="icon-download"></i> Export
</a>
```

Define the button's AJAX handler as a method on the controller, like any other handler.

```php
public function onExportRelation()
{
    // Perform export logic
}
```

The same approach overrides any of the default button partials. For example, a `_relation_button_create.php` partial in the controller's views directory takes precedence over the built-in **Create** button markup.

## Refreshing Relations via AJAX

Call the `relationRefresh` method from a custom AJAX handler to refresh a relation container. It returns a DOM update array that the AJAX framework applies automatically.

```php
public function onSaveSignature()
{
    // ... your logic ...

    // Refreshes the view and toolbar of the 'files' relation
    return $this->relationRefresh('files');
}
```

To refresh several relations at once, merge the results into a single array.

```php
public function onSaveSignature()
{
    // ... your logic ...

    return array_merge(
        $this->relationRefresh('files'),
        $this->relationRefresh('comments')
    );
}
```

To refresh the entire form and one or more relations together, combine it with `formGetWidget()->onRefresh()` from the [form controller](../forms/extending.md#refreshing-the-form-via-ajax).

```php
public function onSaveSignature()
{
    // ... your logic ...

    return array_merge(
        $this->formGetWidget()->onRefresh(),   // All form fields
        $this->relationRefresh('files')        // A specific relation
    );
}
```

## Extending the Refresh Results

The view widget is often refreshed when the manage widget makes a change. Override the `relationExtendRefreshResults` method to include other page elements when this happens. Return an array with the extra values to send to the browser.

```php
public function relationExtendRefreshResults($field)
{
    // Make sure the field is the expected one
    if ($field !== 'myField') {
        return;
    }

    return ['#myCounter' => 'Total records: 6'];
}
```

#### See Also

::: also
* [Relation Controller](./relation-controller.md)
* [config_relation.yaml](../../handbook/controller-config/relation.md)
* [Relation Form Widget](../../handbook/form-fields/relation.md)
* [Entries Content Field](../../handbook/tailor-fields/entries.md)
:::
