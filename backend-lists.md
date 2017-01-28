# Backend lists

- [Introduction](#introduction)
- [Configuring the list behavior](#configuring-list)
    - [Adding a toolbar](#adding-toolbar)
    - [Filtering the list](#adding-filters)
- [Defining list columns](#list-columns)
    - [Column options](#column-options)
- [Available column types](#column-types)
- [Displaying the list](#displaying-list)
- [Multiple list definitions](#multiple-list-definitions)
- [Using list filters](#list-filters)
    - [Scope options](#filter-scope-options)
    - [Available scope types](#scope-types)
- [Extending list behavior](#extend-list-behavior)
    - [Overriding controller action](#overriding-action)
    - [Overriding views](#overriding-views)
    - [Extending column definitions](#extend-list-columns)
    - [Extending the model query](#extend-model-query)
    - [Custom column types](#custom-column-types)

<a name="introduction"></a>
## Introduction

**List behavior** is a controller modifier used for easily adding a record list to a page. The behavior provides the sortable and searchable list with optional links on its records. The behavior provides the controller action `index()` however the list can be rendered anywhere and multiple list definitions can be used.

List behavior depends on list [column definitions](#list-columns) and a [model class](../database/model). In order to use the list behavior you should add it to the `$implement` property of the controller class. Also, the `$listConfig` class property should be defined and its value should refer to the YAML file used for configuring the behavior options.

    namespace Acme\Blog\Controllers;

    class Categories extends \Backend\Classes\Controller
    {
        public $implement = ['Backend.Behaviors.ListController'];

        public $listConfig = 'list_config.yaml';
    }

> **Note:** Very often the list and [form behavior](form) are used together in a same controller.

<a name="configuring-list"></a>
## Configuring the list behavior

The configuration file referred in the `$listConfig` property is defined in YAML format. The file should be placed into the controller's [views directory](controllers-views-ajax/#introduction). Below is an example of a typical list behavior configuration file:

    # ===================================
    #  List Behavior Config
    # ===================================

    title: Blog Posts
    list: ~/plugins/acme/blog/models/post/columns.yaml
    modelClass: Acme\Blog\Models\Post
    recordUrl: acme/blog/posts/update/:id

The following fields are required in the list configuration file:

Field | Description
------------- | -------------
**title** | a title for this list.
**list** | a configuration array or reference to a list column definition file, see [list columns](#list-columns).
**modelClass** | a model class name, the list data is loaded from this model.

The configuration options listed below are optional.

Option | Description
------------- | -------------
**filter** | filter configuration, see [filtering the list](#adding-filters).
**recordUrl** | link each list record to another page. Eg: **users/update:id**. The `:id` part is replaced with the record identifier. This allows you to link the list behavior and the [form behavior](forms).
**recordOnClick** | custom JavaScript code to execute when clicking on a record.
**noRecordsMessage** | a message to display when no records are found, can refer to a [localization string](../plugin/localization).
**recordsPerPage** | records to display per page, use 0 for no pages. Default: 0
**toolbar** | reference to a Toolbar Widget configuration file, or an array with configuration (see below).
**showSorting** | displays the sorting link on each column. Default: true
**defaultSort** | sets a default sorting column and direction when user preference is not defined. Supports a string or an array with keys `column` and `direction`.
**showCheckboxes** | displays checkboxes next to each record. Default: false.
**showSetup** | displays the list column set up button. Default: false.
**showTree** | displays a tree hierarchy for parent/child records. Default: false.
**treeExpanded** | if tree nodes should be expanded by default. Default: false.
**customViewPath** | specify a custom view path to override partials used by the list, optional.

<a name="adding-toolbar"></a>
### Adding a toolbar

To include a toolbar with the list, add the following configuration to the list configuration YAML file:

    toolbar:
        buttons: list_toolbar
        search:
            prompt: Find records

The toolbar configuration allows:

Option | Description
------------- | -------------
**buttons** | a reference to a controller partial file with the toolbar buttons. Eg: **_list_toolbar.htm**
**search** | reference to a Search Widget configuration file, or an array with configuration.

The search configuration supports the following options:

Option | Description
------------- | -------------
**prompt** | a placeholder to display when there is no active search, can refer to a [localization string](../plugin/localization).
**mode** | defines the search strategy to either contain all words, any word or exact phrase. Supported options: all, any, exact. Default: all.
**scope** | specifies a [query scope method](../database/model#query-scopes) defined in the **list model** to apply to the search query, the first argument will contain the search term.

The toolbar buttons partial referred above should contain the toolbar control definition with some buttons. The partial could also contain a [scoreboard control](controls#scoreboards) with charts. Example of a toolbar partial with the **New Post** button referring to the **create** action provided by the [form behavior](forms):

    <div data-control="toolbar">
        <a
            href="<?= Backend::url('acme/blog/posts/create') ?>"
            class="btn btn-primary oc-icon-plus">New Post</a>
    </div>

<a name="adding-filters"></a>
### Filtering the list

To filter a list by user defined input, add the following list configuration to the YAML file:

    filter: config_filter.yaml

The **filter** option should make reference to a [filter configuration file](#list-filters) path or supply an array with the configuration.

<a name="list-columns"></a>
## Defining list columns

List columns are defined with the YAML file. The column configuration is used by the list behavior for creating the record table and displaying model columns in the table cells. The file is placed to a subdirectory of the **models** directory of a plugin. The subdirectory name matches the model class name written in lowercase. The file name doesn't matter, but the **columns.yaml** and **list_columns.yaml** are common names. Example list columns file location:

    plugins/
      acme/
        blog/
          models/                  <=== Plugin models directory
            post/                  <=== Model configuration directory
              list_columns.yaml    <=== Model list columns config file
            Post.php               <=== model class


The next example shows the typical contents of a list column definitions file.

    # ===================================
    #  List Column Definitions
    # ===================================

    columns:
        name: Name
        email: Email

<a name="column-options"></a>
### Column options

For each column can specify these options (where applicable):

Option | Description
------------- | -------------
**label** | a name when displaying the list column to the user.
**type** | defines how this column should be rendered (see [Column types](#column-types) below).
**default** | specifies the default value for the column if value is empty.
**searchable** | include this column in the list search results. Default: false.
**invisible** | specifies if this column is hidden by default. Default: false.
**sortable** | specifies if this column can be sorted. Default: true.
**clickable** | if set to false, disables the default click behavior when the column is clicked. Default: true.
**select** | defines a custom SQL select statement to use for the value.
**valueFrom** | defines a model attribute to use for the value.
**relation** | defines a model relationship column.
**cssClass** | assigns a CSS class to the column container.
**width** | sets the column width, can be specified in percents (10%) or pixels (50px). There could be a single column without width specified, it will be stretched to take the available space.

<a name="column-types"></a>
## Available column types

There are various column types that can be used for the **type** setting, these control how the list column is displayed. In addition to the native column types specified below, you may also [define custom column types](#custom-column-types).

<style>
    .collection-method-list {
        column-count: 3; -moz-column-count: 3; -webkit-column-count: 3;
        column-gap: 2em; -moz-column-gap: 2em; -webkit-column-gap: 2em;
    }

    .collection-method-list a {
        display: block;
    }
</style>

<div class="content-list collection-method-list" markdown="1">
- [Text](#column-text)
- [Number](#column-number)
- [Switch](#column-switch)
- [Date & Time](#column-datetime)
- [Date](#column-date)
- [Time](#column-time)
- [Time since](#column-timesince)
- [Time tense](#column-timetense)
- [Select](#column-select)
- [Relation](#column-relation)
- [Partial](#column-partial)
</div>

<a name="column-text"></a>
### Text

`text` - displays a text column, aligned left

    full_name:
        label: Full Name
        type: text

<a name="column-number"></a>
### Number

`number` - displays a number column, aligned right

    age:
        label: Age
        type: number

<a name="column-switch"></a>
### Switch

`switch` - displays a on or off state for boolean columns.

    enabled:
        label: Enabled
        type: switch

<a name="column-datetime"></a>
### Date & Time

`datetime` - displays the column value as a formatted date and time. The next example displays dates as **Thu, Dec 25, 1975 2:15 PM**.

    created_at:
        label: Date
        type: datetime

You can also specify a custom date format, for example **Thursday 25th of December 1975 02:15:16 PM**:

    created_at:
        label: Date
        type: datetime
        format: l jS \of F Y h:i:s A

<a name="column-date"></a>
### Date

`date` - displays the column value as date format **M j, Y**

    created_at:
        label: Date
        type: date

<a name="column-time"></a>
### Time

`time` - displays the column value as time format **g:i A**

    created_at:
        label: Date
        type: time

<a name="column-timesince"></a>
### Time since

`timesince` - displays a human readable time difference from the value to the current time. Eg: **10 minutes ago**

    created_at:
        label: Date
        type: timesince

<a name="column-timetense"></a>
### Time tense

`timetense` - displays 24-hour time and the day using the grammatical tense of the current date. Eg: **Today at 12:49**, **Yesterday at 4:00** or **18 Sep 2015 at 14:33**.

    created_at:
        label: Date
        type: timetense

<a name="column-select"></a>
### Select

`select` - allows to create a column using a custom select statement. Any valid SQL SELECT statement works here.

    full_name:
        label: Full Name
        select: concat(first_name, ' ', last_name)

<a name="column-relation"></a>
### Relation

`relation` - allows to display related columns, you can provide a relationship option. The value of this option has to be the name of the Active Record [relationship](../database/relations) on your model. In the next example the **name** value will be translated to the name attribute found in the related model (eg: `$model->name`).

    group:
        label: Group
        relation: groups
        select: name

If the [relationship definition](../database/relations) uses the **count** argument, you can display the number of related records using the `valueFrom` and `default` options.

    users_count:
        label: Users
        relation: users_count
        valueFrom: count
        default: 0

<a name="column-partial"></a>
### Partial

`partial` - renders a partial, the `path` value can refer to a partial view file otherwise the column name is used as the partial name. Inside the partial these variables are available: `$value` is the default cell value, `$record` is the model used for the cell and `$column` is the configured class object `Backend\Classes\ListColumn`.

    content:
        type: partial
        path: ~/plugins/acme/blog/models/comments/_content_column.htm

<a name="displaying-list"></a>
## Displaying the list

Usually lists are displayed in the index [view](controllers-views-ajax/#introduction) file. Since lists include the toolbar, the view file will consist solely of the single `listRender()` method call.

    <?= $this->listRender() ?>

<a name="multiple-list-definitions"></a>
## Multiple list definitions

The list behavior can support mulitple lists in the same controller using named definitions. The `$listConfig` property can be defined as an array where the key is a definition name and the value is the configuration file.

    public $listConfig = [
        'templates' => 'config_templates_list.yaml',
        'layouts' => 'config_layouts_list.yaml'
    ];

Each definition can then be displayed by passing the definition name as the first argument when calling the `listRender()` method:

    <?= $this->listRender('templates') ?>

<a name="list-filters"></a>
## Using list filters

Lists can be filtered by [adding a filter definition](#adding-filters) to the list configuration. Similarly filters are driven by their own configuration file that contain filter scopes, each scope is an aspect by which the list can be filtered. The next example shows a typical contents of the filter definition file.

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
            conditions: is_published <> true

        approved:
            label: Approved
            type: switch
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


<a name="filter-scope-options"></a>
### Scope options

For each scope you can specify these options (where applicable):

Option | Description
------------- | -------------
**label** | a name when displaying the filter scope to the user.
**type** | defines how this scope should be rendered (see [Scope types](#scope-types) below). Default: group.
**conditions** | specifies a raw where query statement to apply to the list model query, the `:filtered` parameter represents the filtered value(s).
**scope** | specifies a [query scope method](../database/model#query-scopes) defined in the **list model** to apply to the list query, the first argument will contain the filtered value(s).
**options** | options to use if filtering by multiple items, this option can specify an array or a method name in the `modelClass` model.
**nameFrom** | if filtering by multiple items, the attribute to display for the name, taken from all records of the `modelClass` model.

<a name="scope-types"></a>
### Available scope types

These types can be used to determine how the filter scope should be displayed.

Type | Description
------------- | -------------
**group** | filters the list by a group of items, usually by a related model and requires a `nameFrom` or `options` definition. Eg: Status name as open, closed, etc.
**checkbox** | used as a binary checkbox to apply a predefined condition or query to the list, either on or off.
**switch** | used as a switch to toggle between two predefined conditions or queries to the list, either indeterminate, on or off.
**date** | displays a date picker for a single date to be selected.
**daterange** | displays a date picker for two dates to be selected as a date range. The conditions parameters are passed as `:before` and `:after`.

<a name="extend-list-behavior"></a>
## Extending list behavior

Sometimes you may wish to modify the default list behavior and there are several ways you can do this.

- [Overriding controller action](#overriding-action)
- [Overriding views](#overriding-views)
- [Extending column definitions](#extend-list-columns)
- [Extending the model query](#extend-model-query)
- [Custom column types](#custom-column-types)

<a name="overriding-action"></a>
### Overriding controller action

You can use your own logic for the `index()` action method in the controller, then optionally call the List behavior `index()` parent method.

    public function index()
    {
        //
        // Do any custom code here
        //

        // Call the ListController behavior index() method
        $this->asExtension('ListController')->index();
    }

<a name="overriding-views"></a>
### Overriding views

The `ListController` behavior has a main container view that you may override by creating a special file named `_list_container.htm` in your controller directory. The following example will add a sidebar to the list:

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

The behavior will invoke a `Lists` widget that also contains numerous views that you may override. This is possible by specifying a `customViewPath` option as described in the [list configuration options](#configuring-list). The widget will look in this path for a view first, then fall back to the default location.

    # Custom view path
    customViewPath: $/acme/blog/controllers/reviews/list

> **Note**: It is a good idea to use a sub-directory, for example `list`, to avoid conflicts.

For example, to modify the list body row markup, create a file called `list/_list_body_row.htm` in your controller directory.

    <tr>
        <?php foreach ($columns as $key => $column): ?>
            <td><?= $this->getColumnValue($record, $column) ?></td>
        <?php endforeach ?>
    </tr>

<a name="extend-list-columns"></a>
### Extending column definitions

You can extend the columns of another controller from outside by calling the `extendListColumns` static method on the controller class. This method can take two arguments, **$list** will represent the Lists widget object and **$model** represents the model used by the list. Take this controller for example:

    class Categories extends \Backend\Classes\Controller
    {
        public $implement = ['Backend.Behaviors.ListController'];

        public $listConfig = 'list_config.yaml';
    }

Using the `extendListColumns` method you can add extra columns to any list rendered by this controller. It is a good idea to check the **$model** is of the correct type. Here is an example:

        Categories::extendListColumns(function($list, $model) {

            if (!$model instanceof MyModel)
                return;

            $list->addColumns([
                'my_column' => [
                    'label' => 'My Column'
                ]
            ]);

        });

You can also extend the list columns internally by overriding the `listExtendColumns` method inside the controller class.

    class Categories extends \Backend\Classes\Controller
    {
        [...]

        public function listExtendColumns($list)
        {
            $list->addColumns([...]);
        }
    }

The following methods are available on the $list object.

Method | Description
------------- | -------------
**addColumns** | adds new columns to the list
**removeColumn** | removes a column from the list

Each method takes an array of columns similar to the [list column configuration](#list-columns).

<a name="extend-model-query"></a>
### Extending the model query

The lookup query for the list [database model](../database/model) can be extended by overriding the `listExtendQuery` method inside the controller class. This example will ensure that soft deleted records are included in the list data, by applying the **withTrashed** scope to the query:

    public function listExtendQuery($query)
    {
        $query->withTrashed();
    }

The [list filter](#list-filters) model query can also be extended by overriding the `listFilterExtendQuery` method:

    public function listFilterExtendQuery($query, $scope)
    {
        if ($scope->scopeName == 'status') {
            $query->where('status', '<>', 'all');
        }
    }

<a name="custom-column-types"></a>
### Custom column types

Custom list column types can be registered in the back-end with the `registerListColumnTypes()` method of the [Plugin registration class](../plugin/registration#registration-methods). The method should return an array where the key is the type name and the value is a callable function. The callable function receives three arguments, the native `$value`, the `$column` definition object and the model `$record` object.

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

Using the custom list column type is as simple as calling it by name using the `type` option.

    # ===================================
    #  List Column Definitions
    # ===================================

    columns:
        secret_code:
            label: Secret code
            type: uppercase
