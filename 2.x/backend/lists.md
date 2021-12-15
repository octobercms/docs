# Lists

**List Behavior** is a controller modifier used for easily adding a record list to a page. The behavior provides the sortable and searchable list with optional links on its records. The behavior provides the controller action `index` however the list can be rendered anywhere and multiple list definitions can be used.

List behavior depends on list [column definitions](#defining-list-columns) and a [model class](../database/model.md). In order to use the list behavior you should add it to the `$implement` property of the controller class. Also, the `$listConfig` class property should be defined and its value should refer to the YAML file used for configuring the behavior options.

```php
namespace Acme\Blog\Controllers;

class Categories extends \Backend\Classes\Controller
{
    public $implement = [
        \Backend\Behaviors\ListController::class
    ];

    public $listConfig = 'list_config.yaml';
}
```

> **Note**: Very often the list and [form behavior](../backend/forms.md) are used together in a same controller.

## Configuring the List Behavior

The configuration file referred in the `$listConfig` property is defined in YAML format. The file should be placed into the controller's [views directory](controllers-ajax.md). Below is an example of a typical list behavior configuration file:

```yaml
# ===================================
#  List Behavior Config
# ===================================

title: Blog Posts
list: ~/plugins/acme/blog/models/post/columns.yaml
modelClass: Acme\Blog\Models\Post
recordUrl: acme/blog/posts/update/:id
```

The following fields are required in the list configuration file:

Field | Description
------------- | -------------
**title** | a title for this list.
**list** | a configuration array or reference to a list column definition file, see [list columns](#defining-list-columns).
**modelClass** | a model class name, the list data is loaded from this model.

The configuration options listed below are optional.

Option | Description
------------- | -------------
**filter** | filter configuration, see [filtering the list](#filtering-the-list).
**recordUrl** | link each list record to another page. Eg: **users/update:id**. The `:id` part is replaced with the record identifier. This allows you to link the list behavior and the [form behavior](forms.md).
**recordOnClick** | custom JavaScript code to execute when clicking on a record.
**noRecordsMessage** | a message to display when no records are found, can refer to a [localization string](../plugin/localization.md).
**deleteMessage** | a message to display when records are bulk deleted, can refer to a [localization string](../plugin/localization.md).
**noRecordsDeletedMessage** | a message to display when a bulk delete action is triggered, but no records were deleted, can refer to a [localization string](../plugin/localization.md).
**recordsPerPage** | records to display per page, use 0 for no pages. Default: 0
**perPageOptions** | options for number of items per page. Default: [20, 40, 80, 100, 120]
**showPageNumbers** | displays page numbers with pagination. Disable this to improve list performance when working with large tables. Default: true
**toolbar** | reference to a Toolbar Widget configuration file, or an array with configuration (see below).
**showSorting** | displays the sorting link on each column. Default: true
**defaultSort** | sets a default sorting column and direction when user preference is not defined. Supports a string or an array with keys `column` and `direction`.
**showCheckboxes** | displays checkboxes next to each record. Default: false.
**showSetup** | displays the list column set up button. Default: false.
**structure** | enables a structured list, see the [sorting and reordering article](../backend/reorder.md) for more details.
**customViewPath** | specify a custom view path to override partials used by the list, optional.

### Adding a Toolbar

To include a toolbar with the list, add the following configuration to the list configuration YAML file:

```yaml
toolbar:
    buttons: list_toolbar
    search:
        prompt: Find records
```

The toolbar configuration allows:

Option | Description
------------- | -------------
**buttons** | a reference to a controller partial file with the toolbar buttons. Eg: **_list_toolbar.htm**
**search** | reference to a Search Widget configuration file, or an array with configuration.

The search configuration supports the following options:

Option | Description
------------- | -------------
**prompt** | a placeholder to display when there is no active search, can refer to a [localization string](../plugin/localization.md).
**mode** | defines the search strategy to either contain all words, any word or exact phrase. Supported options: all, any, exact. Default: all.
**scope** | specifies a [query scope method](../database/model.md#query-scopes) defined in the **list model** to apply to the search query. The first argument will contain the query object (as per a regular scope method), the second will contain the search term, and the third will be an array of the columns to be searched.
**searchOnEnter** | setting this to true will make the search widget wait for the Enter key to be pressed before it starts searching (the default behavior is that it starts searching automatically after someone enters something into the search field and then pauses for a short moment).  Default: false.

The toolbar buttons partial referred above should contain the toolbar control definition with some buttons. The partial could also contain a [scoreboard control](controls.md#scoreboards) with charts. Example of a toolbar partial with the **New Post** button referring to the **create** action provided by the [form behavior](forms.md):

```php
<div data-control="toolbar">
    <a
        href="<?= Backend::url('acme/blog/posts/create') ?>"
        class="btn btn-primary oc-icon-plus">New Post</a>
</div>
```

### Filtering the List

To filter a list by user defined input, add the following list configuration to the YAML file:

```yaml
filter: config_filter.yaml
```

The **filter** option should make reference to a [filter configuration file](#using-list-filters) path or supply an array with the configuration.

## Defining List Columns

List columns are defined with the YAML file. The column configuration is used by the list behavior for creating the record table and displaying model columns in the table cells. The file is placed to a subdirectory of the **models** directory of a plugin. The subdirectory name matches the model class name written in lowercase. The file name doesn't matter, but the **columns.yaml** and **list_columns.yaml** are common names. Example list columns file location:

::: dir
├── plugins
|   └── acme
|       └── blog
|           └── `models`
|               ├── post             _<== Config Directory_
|               |   └── columns.yaml _<== Config File_
|               └── Post.php         _<== Model Class_
:::

The next example shows the typical contents of a list column definitions file.

```yaml
# ===================================
#  List Column Definitions
# ===================================

columns:
    name: Name
    email: Email
```

### Column Options

For each column can specify these options (where applicable):

Option | Description
------------- | -------------
**label** | a name when displaying the list column to the user.
**type** | defines how this column should be rendered (see [Column types](#available-column-types) below).
**default** | specifies the default value for the column if value is empty.
**searchable** | include this column in the list search results. Default: false.
**invisible** | specifies if this column is hidden by default. Default: false.
**sortable** | specifies if this column can be sorted. Default: true.
**clickable** | if set to false, disables the default click behavior when the column is clicked. Default: true.
**select** | defines a custom SQL select statement to use for the value.
**valueFrom** | defines a model attribute to use for the source value.
**displayFrom** | defines a model attribute to use for the display value.
**relation** | defines a model relationship column.
**relationCount** | display the number of related records as the column value. Must be used with the `relation` option. Default: false
**cssClass** | assigns a CSS class to the column container.
**headCssClass** | assigns a CSS class to the column header container.
**width** | sets the column width, can be specified in percents (10%) or pixels (50px). There could be a single column without width specified, it will be stretched to take the available space.
**align** | specifies the column alignment. Possible values are `left`, `right` and `center`.
**permissions** | the [permissions](users.md#users-and-permissions) that the current backend user must have in order for the column to be used. Supports either a string for a single permission or an array of permissions of which only one is needed to grant access.

### Custom Value Selection

It is possible to change the source and display values for each column. If you want to source the column value from another column, do so with the `valueFrom` option.

```yaml
other_name:
    label: Something Great
    valueFrom: name
```

If you want to keep the source column value but display a different value from the model attribute, use the `displayFrom` option.

```yaml
status_code:
    label: Status
    displayFrom: status_label
```

This is mostly applicable when a [model accessor](../database/mutators.md#accessors-mutators) is used to modify the display value. This is useful where you want to display a certain value, but sort and search by a different value.

```php
public function getStatusLabelAttribute()
{
    return title_case($this->status_code);
}
```

### Nested Column Selection

In some cases it makes sense to retrieve a column value from a nested data structure, such as a [model relationship](../database/relations.md) column or a [jsonable array](../database/model.md#property-jsonable). The only drawback of doing this is the column cannot use searchable or sortable options.

```yaml
content[title]:
    name: Title
    sortable: false
```

The above example would look for the value in PHP equivalent of `$record->content->title` or `$record->content['title']` respectively. To make the column searchable, and for performance reasons, we recommend duplicating its value on the local database table using [model events](../database/model.md#events).

## Available Column Types

There are various column types that can be used for the **type** setting, these control how the list column is displayed. In addition to the native column types specified below, you may also [define custom column types](#custom-column-types).

<div class="content-list" markdown="1">

- [Text](#column-text)
- [Image](#column-image)
- [Number](#column-number)
- [Switch](#column-switch)
- [Date & Time](#column-datetime)
- [Date](#column-date)
- [Time](#column-time)
- [Time since](#column-timesince)
- [Time tense](#column-timetense)
- [Select](#column-select)
- [Selectable](#column-selectable)
- [Relation](#column-relation)
- [Partial](#column-partial)
- [Colorpicker](#column-colorpicker)

</div>
<a name="column-text"></a>

### Text

`text` - displays a text column, aligned left

```yaml
full_name:
    label: Full Name
    type: text
```

<a name="column-image"></a>
### Image

`image` - displays an image column with the option to resize the output.

```yaml
avatar:
    label: Avatar
    type: image
    sortable: false
    width: 150
    height: 150
    options:
        quality: 80
```

See the [image resizing article](../services/resizer.md#resize-parameters) for more information on what options are supported.

<a name="column-number"></a>
### Number

`number` - displays a number column, aligned right

```yaml
age:
    label: Age
    type: number
```

You may also specify a custom number format, for example currency **$99.00**.

```yaml
price:
    label: Price
    type: number
    format: "$%.2f"
```

> **Note**: Both `text` and `number` columns support the `format` property as a string value, this property follows the formatting rules of the [PHP sprintf() function](https://secure.php.net/manual/en/function.sprintf.php)

<a name="column-switch"></a>
### Switch

`switch` - displays a on or off state for boolean columns.

```yaml
enabled:
    label: Enabled
    type: switch
```

<a name="column-datetime"></a>
### Date & Time

`datetime` - displays the column value as a formatted date and time. The next example displays dates as **Thu, Dec 25, 1975 2:15 PM**.

```yaml
created_at:
    label: Date
    type: datetime
```

You may also specify a custom date format, for example **Thursday 25th of December 1975 02:15:16 PM**.

```yaml
created_at:
    label: Date
    type: datetime
    format: l jS \of F Y h:i:s A
```

The display value is automatically converted to the backend timezone preference, you may disable this using the `useTimezone` option.

```yaml
created_at:
    label: Date
    type: datetime
    useTimezone: false
```

> **Note**: the `useTimezone` option also applies to other date and time related field types, including `date`, `time`, `timesince` and `timetense`.

<a name="column-date"></a>
### Date

`date` - displays the column value as date format **M j, Y**.

```yaml
created_at:
    label: Date
    type: date
```

The backend timezone preference is not applied to this value by default. If the date includes a time, you may convert the timezone with the `useTimezone` option.

```yaml
created_at:
    label: Date
    type: date
    useTimezone: true
```

> **Note**: the `date` and `time` columns do not apply backend timezone conversions by default since a date and time are both required for the conversion.

<a name="column-time"></a>
### Time

`time` - displays the column value as time format **g:i A**.

```yaml
created_at:
    label: Date
    type: time
```

<a name="column-timesince"></a>
### Time Since

`timesince` - displays a human readable time difference from the value to the current time. Eg: **10 minutes ago**

```yaml
created_at:
    label: Date
    type: timesince
```

<a name="column-timetense"></a>
### Time Tense

`timetense` - displays 24-hour time and the day using the grammatical tense of the current date. Eg: **Today at 12:49**, **Yesterday at 4:00** or **18 Sep 2015 at 14:33**.

```yaml
created_at:
    label: Date
    type: timetense
```

<a name="column-select"></a>
### Select

`select` - allows to create a column using a custom select statement. Any valid SQL SELECT statement works here.

```yaml
full_name:
    label: Full Name
    select: concat(first_name, ' ', last_name)
```

<a name="column-selectable"></a>
### Selectable

`selectable` - takes the column value and matches it to the value in the record's available options. Take the following array as an example, if the record value is set to `open` then the **Open** value is displayed in the column.

```php
['open' => 'Open', 'closed' => 'Closed']
```

The available options are defined on the model as [dropdown options](forms.md#field-dropdown).

```yaml
status:
    label: Status
    type: selectable
```

They can also be specified explicitly in the `options` value.

```yaml
status:
    label: Status
    type: selectable
    options:
        pending: Pending
        active: Active
```

<a name="column-relation"></a>
### Relation

`relation` - allows to display related columns, you can provide a relationship option. The value of this option has to be the name of the Active Record [relationship](../database/relations.md) on your model. In the next example the **name** value will be translated to the name attribute found in the related model (eg: `$model->name`).

```yaml
group_name:
    label: Group
    relation: groups
    select: name
```

To display a column that shows the number of related records, use the `relationCount` option.

```yaml
users_count:
    label: Users
    relation: users
    relationCount: true
    type: number
```

> **Note**: Be careful not to name relations the same as existing database columns. For example, using a name `group_id` could break the group relation due to a naming conflict.

<a name="column-partial"></a>
### Partial

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

<a name="column-colorpicker"></a>
### Color Picker

`colorpicker` - displays a color from colorpicker column

```yaml
color:
    label: Background
    type: colorpicker
```

## Displaying the List

Usually lists are displayed in the index [view](controllers-ajax.md) file. Since lists include the toolbar, the view file will consist solely of the single `listRender` method call.

```php
<?= $this->listRender() ?>
```

## Multiple List Definitions

The list behavior can support multiple lists in the same controller using named definitions. The `$listConfig` property can be defined as an array where the key is a definition name and the value is the configuration file.

```php
public $listConfig = [
    'templates' => 'config_templates_list.yaml',
    'layouts' => 'config_layouts_list.yaml'
];
```

Each definition can then be displayed by passing the definition name as the first argument when calling the `listRender` method:

```php
<?= $this->listRender('templates') ?>
```

## Using List Filters

Lists can be filtered by [adding a filter definition](#filtering-the-list) to the list configuration. Similarly filters are driven by their own configuration file that contain filter scopes, each scope is an aspect by which the list can be filtered. The next example shows a typical contents of the filter definition file.

```yaml
# ===================================
# Filter Scope Definitions
# ===================================

scopes:

    category:
        label: Category
        modelClass: Acme\Blog\Models\Category
        conditions: category_id in (:filtered)
        nameFrom: name

    status:
        label: Status
        type: group
        conditions: status in (:filtered)
        options:
            pending: Pending
            active: Active
            closed: Closed

    published:
        label: Hide published
        type: checkbox
        default: 1
        conditions: is_published <> true

    approved:
        label: Approved
        type: switch
        default: 2
        conditions:
            - is_approved <> true
            - is_approved = true

    created_at:
        label: Date
        type: date
        conditions: created_at >= ':filtered'

    published_at:
        label: Date
        type: daterange
        conditions: created_at >= ':after' AND created_at <= ':before'
```

### Scope Options

For each scope you can specify these options (where applicable):

Option | Description
------------- | -------------
**label** | a name when displaying the filter scope to the user.
**type** | defines how this scope should be rendered (see [Scope types](#available-scope-types) below). Default: group.
**conditions** | specifies a raw where query statement to apply to the list model query, the `:filtered` parameter represents the filtered value(s).
**scope** | specifies a [query scope method](../database/model.md#query-scopes) defined in the **list model** to apply to the list query. The first argument will contain the query object (as per a regular scope method) and the second argument will contain the filtered value(s)
**options** | options to use if filtering by multiple items, this option can specify an array or a method name in the `modelClass` model.
**emptyOption** | an optional label for an intentional empty selection.
**nameFrom** | if filtering by multiple items, the attribute to display for the name, taken from all records of the `modelClass` model.
**default** | can either be integer (switch, checkbox, number) or array (group, date range, number range) or string (date).
**permissions** | the [permissions](users.md#users-and-permissions) that the current backend user must have in order for the filter scope to be used. Supports either a string for a single permission or an array of permissions of which only one is needed to grant access.
**dependsOn** | a string or an array of other scope names that this scope [depends on](#filter-scope-dependencies). When the other scopes are modified, this scope will update.

### Filter Dependencies

Filter scopes can declare dependencies on other scopes by defining the `dependsOn` [scope option](#scope-options), which provide a server-side solution for updating scopes when their dependencies are modified. When the scopes that are declared as dependencies change, the defining scope will update dynamically. This provides an opportunity to change the available options to be provided to the scope.

```yaml
country:
    label: Country
    type: group
    conditions: country_id in (:filtered)
    modelClass: October\Test\Models\Location
    options: getCountryOptions

city:
    label: City
    type: group
    conditions: city_id in (:filtered)
    modelClass: October\Test\Models\Location
    options: getCityOptions
    dependsOn: country
```

In the above example, the `city` scope will refresh when the `country` scope has changed. Any scope that defines the `dependsOn` property will be passed all current scope objects for the Filter widget, including their current values, as an array that is keyed by the scope names.

```php
public function getCountryOptions()
{
    return Country::lists('name', 'id');
}

public function getCityOptions($scopes = null)
{
    if (!empty($scopes['country']->value)) {
        return City::whereIn('country_id', array_keys($scopes['country']->value))
            ->lists('name', 'id')
        ;
    }
    else {
        return City::lists('name', 'id');
    }
}
```

> **Note**: Scope dependencies with `type: group` are only supported at this stage.

### Available Scope Types

These types can be used to determine how the filter scope should be displayed.

<div class="content-list" markdown="1">

- [Group](#filter-group)
- [Checkbox](#filter-checkbox)
- [Switch](#filter-switch)
- [Date](#filter-date)
- [Date range](#filter-daterange)
- [Number](#filter-number)
- [Number range](#filter-numberrange)
- [Text](#filter-text)

</div>
<a name="filter-group"></a>

### Group

`group` - filters the list by a group of items, usually by a related model and requires a `nameFrom` or `options` definition. Eg: Status name as open, closed, etc.

```yaml
status:
    label: Status
    type: group
    conditions: status in (:filtered)
    default:
        pending: Pending
        active: Active
    options:
        pending: Pending
        active: Active
        closed: Closed
```

<a name="filter-checkbox"></a>
### Checkbox

`checkbox` - used as a binary checkbox to apply a predefined condition or query to the list, either on or off. Use 0 for off and 1 for on for default value

```yaml
published:
    label: Hide published
    type: checkbox
    default: 1
    conditions: is_published <> true
```

<a name="filter-switch"></a>
### Switch

`switch` - used as a switch to toggle between two predefined conditions or queries to the list, either indeterminate, on or off. Use 0 for off, 1 for indeterminate and 2 for on for default value

```yaml
approved:
    label: Approved
    type: switch
    default: 1
    conditions:
        - is_approved <> true
        - is_approved = true
```

<a name="filter-date"></a>
### Date

`date` - displays a date picker for a single date to be selected. The values available to be used in the conditions property are:

- `:filtered`: The selected date formatted as `Y-m-d`
- `:before`: The selected date formatted as `Y-m-d 00:00:00`, converted from the backend timezone to the app timezone
- `:after`: The selected date formatted as `Y-m-d 23:59:59`, converted from the backend timezone to the app timezone

```yaml
created_at:
    label: Date
    type: date
    minDate: '2001-01-23'
    maxDate: '2030-10-13'
    yearRange: 10
    conditions: created_at >= ':filtered'
```

<a name="filter-daterange"></a>
### Date Range

`daterange` - displays a date picker for two dates to be selected as a date range. The values available to be used in the conditions property are:

 - `:before`: The selected "before" date formatted as `Y-m-d H:i:s`
 - `:beforeDate`: The selected "before" date formatted as `Y-m-d`
 - `:after`: The selected "after" date formatted as `Y-m-d H:i:s`
 - `:afterDate`: The selected "after" date formatted as `Y-m-d`

```yaml
published_at:
    label: Date
    type: daterange
    minDate: '2001-01-23'
    maxDate: '2030-10-13'
    yearRange: 10
    conditions: created_at >= ':after' AND created_at <= ':before'
```

To use default value for Date and Date Range

```php
\MyController::extendListFilterScopes(function($filter) {
    $widget->addScopes([
        'Date Test' => [
            'label' => 'Date Test',
            'type' => 'daterange',
            'default' => $this->myDefaultTime(),
            'conditions' => "created_at >= ':after' AND created_at <= ':before'"
        ],
    ]);
});

// Return value must be instance of carbon
public function myDefaultTime()
{
    return [
        0 => Carbon::parse('2012-02-02'),
        1 => Carbon::parse('2012-04-02'),
    ];
}
```

<!--
You may also wish to set `useTimezone: false` to prevent a timezone conversion between the date that is displayed and the date stored in the database, since by default the backend timezone preference is applied to the display value.

    published_at:
        label: Date
        type: daterange
        minDate: '2001-01-23'
        maxDate: '2030-10-13'
        yearRange: 10
        conditions: created_at >= ':after' AND created_at <= ':before'
        useTimezone: false

> **Note**: the `useTimezone` option also applies to the `date` filter type as well.
-->

<a name="filter-number"></a>
### Number

`number` - displays input for a single number to be entered. The value is available to be used in the conditions property as `:filtered`.

```yaml
age:
    label: Age
    type: number
    default: 14
    conditions: age >= ':filtered'
```

<a name="filter-numberrange"></a>
### Number Range

`numberrange` - displays inputs for two numbers to be entered as a number range. The values available to be used in the conditions property are:

- `:min`: The minimum value, defaults to -2147483647
- `:max`: The maximum value, defaults to 2147483647

You may leave either the minimum value blank to search everything up to the maximum value, and vice versa, you may leave the maximum value blank to search everything at least the minimum value.

```yaml
visitors:
    label: Visitor Count
    type: numberrange
    default:
        0: 10
        1: 20
    conditions: visitors >= ':min' and visitors <= ':max'
```

<a name="filter-text"></a>
### Text

`text` - display text input for a string to be entered. You may specify a `size` attribute that will be injected in the input size attribute (default: 10).

```yaml
username:
    label: Username
    type: text
    conditions: username = :value
    size: 2
```

## Extending List Behavior

Sometimes you may wish to modify the default list behavior and there are several ways you can do this.

### Overriding Controller Action

You may use your own logic for the `index` action method in the controller, then optionally call the List behavior `index` parent method.

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

### Overriding Views

The `ListController` behavior has a main container view that you may override by creating a special file named `_list_container.htm` in your controller directory. The following example will add a sidebar to the list:

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

The behavior will invoke a `Lists` widget that also contains numerous views that you may override. This is possible by specifying a `customViewPath` option as described in the [list configuration options](#configuring-the-list-behavior). The widget will look in this path for a view first, then fall back to the default location.

```yaml
# Custom view path
customViewPath: $/acme/blog/controllers/reviews/list
```

> **Note**: It is a good idea to use a sub-directory, for example `list`, to avoid conflicts.

For example, to modify the list body row markup, create a file called `list/_list_body_row.htm` in your controller directory.

```php
<tr>
    <?php foreach ($columns as $key => $column): ?>
        <td><?= $this->getColumnValue($record, $column) ?></td>
    <?php endforeach ?>
</tr>
```

### Extending Column Definitions

You may extend the columns of another controller from outside by calling the `extendListColumns` static method on the controller class. This method can take two arguments, **$list** will represent the Lists widget object and **$model** represents the model used by the list. Take this controller for example:

```php
class Categories extends \Backend\Classes\Controller
{
    public $implement = [
        \Backend\Behaviors\ListController::class
    ];

    public $listConfig = 'list_config.yaml';
}
```

Using the `extendListColumns` method you can add extra columns to any list rendered by this controller. It is a good idea to check the **$model** is of the correct type. Here is an example:

```php
Categories::extendListColumns(function($list, $model) {
    if (!$model instanceof MyModel) {
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

You may also extend the list columns internally by overriding the `listExtendColumns` method inside the controller class.

```php
class Categories extends \Backend\Classes\Controller
{
    // ...

    public function listExtendColumns($list)
    {
        $list->addColumns([...]);

        $list->getColumn(...);
    }
}
```

The following methods are available on the $list object.

Method | Description
------------- | -------------
**addColumns** | adds new columns to the list
**removeColumn** | removes a column from the list

Each method takes an array of columns similar to the [list column configuration](#defining-list-columns).

### Inject CSS Row Class

You may inject a custom css row class by adding a `listInjectRowClass` method on the controller class. This method can take two arguments, **$record** will represent a single model record and **$definition** contains the name of the List widget definition. You may return any string value containing your row classes. These classes will be added to the row's HTML markup.

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

A special CSS class `nolink` is available to force a row to be unclickable, even if the `recordUrl` or `recordOnClick` options are defined for the List widget. Returning this class in an event will allow you to make records unclickable - for example, for soft-deleted rows or for informational rows:

```php
public function listInjectRowClass($record, $value)
{
    if ($record->trashed()) {
        return 'nolink';
    }
}
```

### Overriding Column URL

You may specify the click action for a column record by overriding the `listOverrideRecordUrl` method. This method can return a string for a new backend URL or an array with a complex definition.

```php
public function listOverrideRecordUrl($record, $definition = null)
{
    if ($record->is_active) {
        return 'acme/test/services/preview/' . $record->id;
    }
}
```

To override the onclick behavior return an array with the `onclick` key and change the `url` to null.

```php
public function listOverrideRecordUrl($record, $definition = null)
{
    if ($record->is_banned) {
        return ['onclick' => "alert('Unable to click')", 'url' => null];
    }
}
```

To make a column unclickable entirely return an array with the `clickable` key set to false.

```php
public function listOverrideRecordUrl($record, $definition = null)
{
    if ($record->is_disabled) {
        return ['clickable' => false];
    }
}
```

### Extending Filter Scopes

You may extend the filter scopes of another controller from outside by calling the `extendListFilterScopes` static method on the controller class. This method can take the argument **$filter** which will represent the Filter widget object. Take this controller for example:

```php
Categories::extendListFilterScopes(function($filter) {
    // Add custom CSS classes to the Filter widget itself
    $filter->cssClasses = array_merge($filter->cssClasses, ['my', 'array', 'of', 'classes']);

    $filter->addScopes([
        'my_scope' => [
            'label' => 'My Filter Scope'
        ]
    ]);
});
```

> The array of scopes provided is similar to the [list filters configuration](#using-list-filters).

You may also extend the filter scopes internally to the controller class, simply override the `listFilterExtendScopes` method.

```php
class Categories extends \Backend\Classes\Controller
{
    // ...

    public function listFilterExtendScopes($filter)
    {
        $filter->addScopes([...]);
    }
}
```

The following methods are available on the $filter object.

Method | Description
------------- | -------------
**addScopes** | adds new scopes to filter widget
**removeScope** | remove scope from filter widget

### Extending the Model Query

The lookup query for the list [database model](../database/model.md) can be extended by overriding the `listExtendQuery` method inside the controller class. This example will ensure that soft deleted records are included in the list data, by applying the **withTrashed** scope to the query:

```php
public function listExtendQuery($query)
{
    $query->withTrashed();
}
```

When dealing with multiple lists definitions in a same controller, you can use the second parameter of `listExtendQuery` which contains the name of the definition :

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

You may also join other tables to aid with searching and sorting. The following will join the `post_statuses` table and introduce the `status_sort_order` and `status_name` columns to the query.

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

The [list filter](#using-list-filters) model query can also be extended by overriding the `listFilterExtendQuery` method:

```php
public function listFilterExtendQuery($query, $scope)
{
    if ($scope->scopeName == 'status') {
        $query->where('status', '<>', 'all');
    }
}
```

### Extending the Records Collection

The collection of records used by the list can be extended by overriding the `listExtendRecords` method inside the controller class. This example uses the `sort` method on the [record collection](../database/collection.md) to change the sort order of the records.

```php
public function listExtendRecords($records)
{
    return $records->sort(function ($a, $b) {
        return $a->computedVal() > $b->computedVal();
    });
}
```

### Custom Column Types

Custom list column types can be registered in the back-end with the `registerListColumnTypes` method of the [Plugin registration class](../plugin/registration.md#registration-methods). The method should return an array where the key is the type name and the value is a callable function. The callable function receives three arguments, the native `$value`, the `$column` definition object and the model `$record` object.

```php
public function registerListColumnTypes()
{
    return [
        // A local method, i.e $this->evalUppercaseListColumn()
        'uppercase' => [$this, 'evalUppercaseListColumn'],

        // Using an inline closure
        'loveit' => function($value) { return 'I love '. $value; }
    ];
}

public function evalUppercaseListColumn($value, $column, $record)
{
    return strtoupper($value);
}
```

Using the custom list column type is as simple as calling it by name using the `type` option.

```yaml
# ===================================
#  List Column Definitions
# ===================================

columns:
    secret_code:
        label: Secret code
        type: uppercase
```
