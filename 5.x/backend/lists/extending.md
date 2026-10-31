---
previousPath: extend/lists/list-controller.md#extending-list-behavior
subtitle: Change the columns, filters, query, rows and views of the list controller from your own code.
---
# Extending the List Controller

The list controller calls override methods on your controller and fires events as it builds the list, so you can change how it works without replacing the behavior. Define an override method in a controller that uses the behavior, or listen to a global event to change lists that belong to other plugins.

```php
class Categories extends \Backend\Classes\Controller
{
    public $implement = [
        \Backend\Behaviors\ListController::class
    ];

    public $listConfig = 'config_list.yaml';

    public function listExtendQuery($query)
    {
        $query->withTrashed();
    }
}
```

## Extending Column Definitions

You may extend the columns of another controller from outside by listening to the `backend.list.extendColumns` [global event](../services/events.md). The event function takes a `$list` argument, the `Backend\Widgets\Lists` object, where you can use the `getController` and `getModel` methods to check the execution context.

Since this event can affect every list, always check that the controller and model are of the correct type. Here is an example using the `addColumns` method to add a new column to the event log list, and modify an existing column.

```php
Event::listen('backend.list.extendColumns', function($list) {
    if (
        !$list->getController() instanceof \System\Controllers\EventLogs ||
        !$list->getModel() instanceof \System\Models\EventLog
    ) {
        return;
    }

    // Add a new column
    $list->addColumns([
        'my_column' => [
            'label' => 'My Column'
        ]
    ]);

    // Modify an existing column
    $list->getColumn('title')->useConfig([
        'path' => 'column_title'
    ]);
});
```

To extend the columns inside your own controller, override the `listExtendColumns` method in the controller class. This only affects the list used by the `ListController` behavior.

```php
class Categories extends \Backend\Classes\Controller
{
    public $implement = [
        \Backend\Behaviors\ListController::class
    ];

    public function listExtendColumns($list)
    {
        $list->addColumns([...]);

        $list->getColumn(...);
    }
}
```

The following methods are available on the `$list` object.

Method | Description
------------- | -------------
**addColumns** | adds new columns to the list
**removeColumn** | removes a column from the list
**getColumn** | returns an existing column definition

The `addColumns` method takes an array of columns in the same format as the [list column configuration](../../handbook/list-columns.md).

## Extending Filter Scopes

You may extend the filter scopes of another controller by listening to the `backend.filter.extendScopes` [global event](../services/events.md). The event function takes a `$filter` argument, the `Backend\Widgets\Filter` object, where you can use the `getController`, `getModel` and `getContext` methods to check the execution context.

Since this event can affect every filter, always check that the controller and model are of the correct type. Here is an example using the `addScopes` method to add a new scope to the event log list, and adjust the CSS classes.

```php
Event::listen('backend.filter.extendScopes', function($filter) {
    if (
        !$filter->getController() instanceof \System\Controllers\EventLogs ||
        !$filter->getModel() instanceof \System\Models\EventLog
    ) {
        return;
    }

    // Add a new scope
    $filter->addScopes([
        'my_scope' => [
            'label' => 'My Filter Scope'
        ]
    ]);

    // Add custom CSS classes to the filter widget
    $filter->cssClasses = array_merge(
        $filter->cssClasses,
        ['my-array', 'of-classes']
    );
});
```

To extend the filter scopes inside your own controller, override the `listFilterExtendScopes` method.

```php
class Categories extends \Backend\Classes\Controller
{
    public $implement = [
        \Backend\Behaviors\ListController::class
    ];

    public function listFilterExtendScopes($filter)
    {
        $filter->addScopes([...]);
    }
}
```

The following methods are available on the `$filter` object.

Method | Description
------------- | -------------
**addScopes** | adds new scopes to the filter widget using the [list filters configuration](./filters.md)
**removeScope** | removes a scope from the filter widget
**getScope** | returns an existing scope definition

### Extending the Filter Response

The `listExtendRefreshResults` method lets you add to the AJAX response when the list updates, such as after a filter changes. It should return an array of additional partial updates. Use the `listGetFilterWidget` method to access the filter widget and its scopes.

```php
public function listExtendRefreshResults($list, $result)
{
    $statusCode = $this->listGetFilterWidget()->getScope('status_code')->value;

    return ['#my-partial-id' => $this->makePartial(...)];
}
```

## Extending the Model Query

To change the query that loads the list [database model](../data/model-queries.md) records, override the `listExtendQuery` method in the controller class. This example applies the **withTrashed** scope, so soft deleted records are included in the list.

```php
public function listExtendQuery($query)
{
    $query->withTrashed();
}
```

When a controller uses [multiple list definitions](./list-controller.md#multiple-list-definitions), the second argument of `listExtendQuery` contains the name of the definition.

```php
public $listConfig = [
    'inbox' => 'config_inbox_list.yaml',
    'trashed' => 'config_trashed_list.yaml'
];

public function listExtendQuery($query, $definition)
{
    if ($definition === 'trashed') {
        $query->onlyTrashed();
    }
}
```

You may also join other tables to help with searching and sorting. The following example joins the `post_statuses` table and adds the `status_sort_order` and `status_name` columns to the query.

```php
public function listExtendQuery($query, $definition = null)
{
    $query->leftJoin('post_statuses', 'posts.status_id', 'post_statuses.id');

    $query->addSelect(
        'post_statuses.sort_order as status_sort_order',
        'post_statuses.name as status_name'
    );
}
```

To change the query used by the [list filter](./filters.md), override the `listFilterExtendQuery` method.

```php
public function listFilterExtendQuery($query, $scope)
{
    if ($scope->scopeName == 'status') {
        $query->where('status', '<>', 'all');
    }
}
```

## Extending the Records Collection

To change the collection of records after the query runs, override the `listExtendRecords` method in the controller class. This example uses the `sort` method on the [record collection](../data/collection-methods.md) to change the sort order of the records.

```php
public function listExtendRecords($records)
{
    return $records->sort(function ($a, $b) {
        return $a->computedVal() <=> $b->computedVal();
    });
}
```

## Adding CSS Classes to Rows

To add CSS classes to a row, define a `listInjectRowClass` method on the controller class. The method takes two arguments: `$record` is a single model record and `$definition` is the name of the list definition. Return a string with your row classes, and they are added to the row's HTML markup.

```php
class Lessons extends \Backend\Classes\Controller
{
    // ...

    public function listInjectRowClass($lesson, $definition = null)
    {
        // Strike through past lessons
        if ($lesson->lesson_date->lt(Carbon::today())) {
            return 'strike';
        }
    }
}
```

The special CSS class `nolink` makes a row unclickable, even when the `recordUrl` or `recordOnClick` properties are defined for the list. Use it for rows that should not open, such as soft deleted or informational rows.

```php
public function listInjectRowClass($record, $definition = null)
{
    if ($record->trashed()) {
        return 'nolink';
    }
}
```

## Overriding the Record URL

To set the click action for a record, override the `listOverrideRecordUrl` method. It can return a string with a new backend URL, or an array with a more complex definition.

```php
public function listOverrideRecordUrl($record, $definition = null)
{
    if ($record->is_active) {
        return "acme/test/services/preview/{$record->id}";
    }
}
```

To override the onclick behavior, return an array with the `onclick` key and set the `url` to null.

```php
public function listOverrideRecordUrl($record, $definition = null)
{
    if ($record->is_banned) {
        return ['onclick' => "alert('Unable to click')", 'url' => null];
    }
}
```

To make a record unclickable entirely, return an array with the `clickable` key set to false.

```php
public function listOverrideRecordUrl($record, $definition = null)
{
    if ($record->is_disabled) {
        return ['clickable' => false];
    }
}
```

## Custom Column Types

Register custom list column types with the `registerListColumnTypes` method of the [plugin registration file](../plugins/extending.md). The method returns an array where the key is the type name and the value is a callable function. The function receives three arguments: the native `$value`, the `$column` definition object and the model `$record` object.

```php
public function registerListColumnTypes()
{
    return [
        // A local method, i.e $this->evalUppercaseListColumn()
        'uppercase' => [$this, 'evalUppercaseListColumn'],

        // Using an inline closure
        'loveit' => function($value) { return "I love {$value}"; }
    ];
}

public function evalUppercaseListColumn($value, $column, $record)
{
    return strtoupper($value);
}
```

To use a custom list column type, set it by name in the `type` property.

```yaml
# columns.yaml
columns:
    secret_code:
        label: Secret code
        type: uppercase
```

## Extending the List Configuration

To change the list configuration at runtime, override the `listGetConfig` method.

```php
public function listGetConfig($definition)
{
    $config = $this->asExtension('ListController')->listGetConfig($definition);

    // Implement structure dynamically
    $config->structure = [
        'showTree' => true
    ];

    return $config;
}
```

## Overriding Controller Action

You may define your own `index` action method in the controller, then optionally call the behavior's `index` method.

```php
public function index()
{
    //
    // Do any custom code here
    //

    // Call the ListController behavior index() method
    $this->asExtension('ListController')->index();
}
```

## Overriding Views

The `ListController` behavior has a main container view that you may override by creating a file named `_list_container.php` in your controller directory. The following example adds a sidebar to the list.

```php
<?php if ($toolbar): ?>
    <?= $toolbar->render() ?>
<?php endif ?>

<?php if ($filter): ?>
    <?= $filter->render() ?>
<?php endif ?>

<div class="row row-flush">
    <div class="col-sm-3">
        [Insert sidebar here]
    </div>
    <div class="col-sm-9 list-with-sidebar">
        <?= $list->render() ?>
    </div>
</div>
```

The behavior uses a `Lists` widget, which has many views of its own that you may override. Set the `customViewPath` property in the [list configuration](../../handbook/controller-config/list.md), and the widget looks in this path for a view first, then falls back to the default location.

```yaml
# Custom view path
customViewPath: $/acme/blog/controllers/reviews/list
```

::: tip
Use a subdirectory, for example one called `list`, to avoid conflicts with the controller's own views.
:::

For example, to change the markup of a list body row, create a file called `list/_list_body_row.php` in your controller directory.

```php
<tr>
    <?php foreach ($columns as $key => $column): ?>
        <td><?= $this->getColumnValue($record, $column) ?></td>
    <?php endforeach ?>
</tr>
```

#### See Also

::: also
* [List Controller](./list-controller.md)
* [Filtering Records](./filters.md)
* [Custom Filter Widgets](./filter-widgets.md)
* [Extending October CMS](../plugins/extending.md)
:::
