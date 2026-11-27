---
subtitle: Build your own column type for backend lists with a list widget.
---
# Custom List Widgets

A list widget adds a new column type to backend lists. Build one when the built-in [list columns](../../handbook/list-columns.md) don't display a value the way you need, and the column needs its own options, partials, assets or AJAX handlers.

```php
namespace Acme\Blog\ListWidgets;

use Backend\Classes\ListWidgetBase;

class Meter extends ListWidgetBase
{
    public function renderValue($record, $value)
    {
        return $this->makePartial('meter', ['value' => $value]);
    }
}
```

For a column that only formats its value, a [custom column type](./extending.md#custom-column-types) is less work. For markup that only one list uses, a [partial column](../../handbook/list-columns/partial.md) is enough.

## Creating a List Widget

List widget classes live in the **listwidgets** directory of a plugin. The inner directory is named after the widget class in lowercase, and holds the widget's partials and assets.

::: dir
├── `listwidgets`
|   ├── meter
|   |   ├── partials
|   |   |   └── _meter.php  _← Partial File_
|   |   └── assets
|   |       └── css
|   |           └── meter.css  _← StyleSheet File_
|   └── Meter.php  _← Widget Class_
:::

List widget classes must extend the `Backend\Classes\ListWidgetBase` class. The `renderValue` method returns the markup of one cell, and receives the `$record` of the row and the `$value` of the column.

The list creates one widget for each column that uses it, then calls `renderValue` for every row. Pass anything that belongs to a row to the partial, and keep it out of the widget's properties.

## Registering a List Widget

Plugins should register their list widgets by overriding the `registerListWidgets` method in the [plugin registration file](../plugins/extending.md). The method returns an array with the widget class as the key and the widget short code as the value.

```php
public function registerListWidgets()
{
    return [
        \Acme\Blog\ListWidgets\Meter::class => 'meter',
    ];
}
```

Use the short code as the column `type` in the [list column definitions](../../handbook/list-columns.md).

```yaml
views:
    label: Views
    type: meter
```

::: warning
Make the short code unique. A built-in column type keeps its code, so a list widget registered as `text` or `image` is never used for those columns.
:::

## Adding Widget Properties

List widgets may have properties that are set in the list column configuration. Define the configurable properties on the class, then call the `fillFromConfig` method in the `init` method to populate them.

```php
class Meter extends ListWidgetBase
{
    /**
     * @var int max is the value that fills the bar
     */
    public $max = 100;

    /**
     * init the widget
     */
    public function init()
    {
        $this->fillFromConfig([
            'max',
        ]);
    }

    // ...
}
```

The property values can then be set in the list column definition that uses the widget.

```yaml
views:
    label: Views
    type: meter
    max: 8000
```

## Rendering the Cell

The `renderValue` method prepares the values of a row and passes them to a partial.

```php
public function renderValue($record, $value)
{
    $percent = $this->max > 0
        ? min(100, round($value / $this->max * 100))
        : 0;

    return $this->makePartial('meter', [
        'record' => $record,
        'value' => $value,
        'percent' => $percent,
    ]);
}
```

The partial holds the markup of the cell. A partial is plain PHP, so escape the values it prints with the `e` helper.

```php
<div class="list-meter" title="<?= e($value) ?>">
    <span class="list-meter-bar" style="width: <?= $percent ?>%"></span>
</div>
```

Inside the widget class, the `columnName` property holds the name of the column, the `getColumn` method returns the column definition and the `getParentList` method returns the list that contains the column.

## Setting Column Defaults

Some column types need their own defaults for the [column properties](../../handbook/list-columns.md#column-properties). For example, a column without a value of its own should not be sortable. Define a static `columnDefaults` method that returns the properties a column of this type takes, unless the column definition sets them.

```php
public static function columnDefaults(): array
{
    return [
        'sortable' => false,
        'clickable' => false,
    ];
}
```

Set `clickable` to false when the cell has links or buttons of its own, so a click on them does not open the record.

## Handling AJAX Requests

A list widget can define its own [AJAX handlers](../panel/ajax.md). The list binds each widget to the controller, so the handlers are available on any page that shows the column. In the partial, use the `getEventHandler` method to get the full name of a handler, and send the key of the record with the request.

```php
<button
    type="button"
    class="list-meter"
    data-request="<?= $this->getEventHandler('onShowValue') ?>"
    data-request-data="<?= e(json_encode(['key' => $record->getKey()])) ?>"
    data-request-flash>
    <span class="list-meter-bar" style="width: <?= $percent ?>%"></span>
</button>
```

In the handler, load the record with the `findRecord` method. It looks for the record using the list's own query, with the filters and search term applied, and returns `null` when the list would not show that record.

```php
public function onShowValue()
{
    $record = $this->findRecord(post('key'));

    if (!$record) {
        throw new ApplicationException('That record is not in the list.');
    }

    Flash::info(number_format($record->{$this->columnName}) . ' views');
}
```

::: tip
A column hidden from the user by its `permissions` property has no widget, so its handlers can't be reached.
:::

## Loading Assets

To include CSS and JavaScript files with the widget, override the `loadAssets` method and call `addCss` and `addJs`. The paths are relative to the widget's **assets** directory, and the files only load on pages with a list that uses the widget.

```php
protected function loadAssets()
{
    $this->addCss('css/meter.css');
}
```

#### See Also

::: also
* [Extending the List Controller](./extending.md)
* [List Columns](../../handbook/list-columns.md)
* [Widgets](../panel/widgets.md)
* [Custom Filter Widgets](./filter-widgets.md)
:::
