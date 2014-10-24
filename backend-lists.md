# Backend lists

- [Configuring the list behavior](#configuring-list)
- [Defining list columns](#list-columns)
- [Available column types](#column-types)
- [Displaying the list](#displaying-list)
- [Using list filters](#list-filters)
- [Extending list behavior](#extend-list-behavior)

`List behavior` is a controller modifier used for easily adding a record list to a page. The behavior provides the sortable and searchable list with optional links on its records. 

List behavior depends on list [column definitions](#list-columns) and a [model class](../database/model). In order to use the list behavior you should add it to the `$implement` field of the controller class. Also, the `$relationConfig` class property should be defined and its value should refer to the YAML file used for configuring the behavior options.

    namespace Acme\Blog\Controllers;

    class Categories extends \Backend\Classes\Controller
    {
        public $implement = ['Backend.Behaviors.ListController'];

        public $listConfig = 'list_config.yaml';
    }

> **Note:** Very often the list and [form behavior](form) are used together in a same controller.

<a name="configuring-list" class="anchor" href="#configuring-list"></a>
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

Field  | Description
------------- | -------------
**title** | a title for this list.
**list** | a configuration array or reference to a list column definition file, see [list columns](#list-columns).
**modelClass** | a model class name, the list data is loaded from this model.

The configuration options listed below are optional.

Option  | Description
------------- | -------------
**recordUrl** | link each list record to another page. Eg: **users/update:id**. The `:id` part is replaced with the record identifier. This allows you to link the list behavior and the [form behavior](forms).
**noRecordsMessage** | a message to display when no records are found, can refer to a [localization string](../plugin/localization).
**recordsPerPage** | records to display per page, use 0 for no pages. Default: 0
**toolbar** | reference to a Toolbar Widget configuration file, or an array with configuration (see below).
**showSorting** | displays the sorting link on each column. Default: true
**defaultSort** | sets a default sorting column and direction when user preference is not defined. Supports a string or an array with keys `column` and `direction`.
**showCheckboxes** | displays checkboxes next to each record. Default: false.
**showSetup** | displays the list column set up button. Default: false.
**showTree** | displays a tree hierarchy for parent/child records. Default: false.
**treeExpanded** | if tree nodes should be expanded by default. Default: false.

<a name="adding-toolbar" class="anchor" href="#adding-toolbar"></a>
### Adding a toolbar

To include a toolbar with the list, add the following configuration to the list configuration YAML file:

    toolbar:
        buttons: list_toolbar
        search:
            prompt: Find records

The toolbar configuration allows:

Option  | Description
------------- | -------------
**buttons** | a reference to a controller partial file with the toolbar buttons. Eg: **_list_toolbar.htm**
**search** | reference to a Search Widget configuration file, or an array with configuration.

The search configuration supports the following options:

Option  | Description
------------- | -------------
**prompt** | A placeholder to display when there is no active search, can refer to a [localization string](../plugin/localization).

The toolbar buttons partial referred above should contain the toolbar control definition with some buttons. The partial could also contain a [scoreboard control](controls#scoreboards) with charts. Example of a toolbar partial with the **New Post** button referring to the **create** action provided by the [form behavior](forms):

    <div data-control="toolbar">
        <a 
            href="<?= Backend::url('acme/blog/posts/create') ?>" 
            class="btn btn-primary oc-icon-plus">New Post</a>
    </div>

<a name="adding-filters" class="anchor" href="#adding-filters"></a>
### Filtering the list

To filter a list by user defined input, add the following list configuration to the YAML file:

    filter: config_filter.yaml

The **filter** option should make reference to a [filter configuration file](#list-filters) path or supply an array with the configuration.

<a name="list-columns" class="anchor" href="#list-columns"></a>
## Defining list columns

List columns are defined with the YAML file. The column configuration is used by the list behavior for creating the record table and displaying model columns in the table cells. The file is placed to a subdirectory of the **models** directory of a plugin. The subdirectory name matches the model class name written in lowercase. The file name doesn't matter, but the **columns.yaml** and **list_columns.yaml** are common names. Example list columns file location: 

    plugins/
      acme/
        blog/
          models/                <=== Plugin models directory
            post/                <=== Model configuration directory
              list_columns.yaml  <=== Model list columns config file
            Post.php             <=== model class


The next example shows the typical contents of a list column definitions file.

    # ===================================
    #  List Column Definitions
    # ===================================

    columns:
        name: Name
        email: Email

<a name="column-options" class="anchor" href="#column-options"></a>
### Column options

For each column can specify these options (where applicable):

Option  | Description
------------- | -------------
**label** | a name when displaying the list column to the user.
**type** | defines how this column should be rendered (see [Column types](#column-types) below).
**options** | options used by a render type used (optional).
**searchable** | include this column in the list search results. Default: no.
**invisible** | specifies if this column is hidden by default. Default: no.
**sortable** | specifies if this column can be sorted. Default: yes.
**select** | defines a custom SQL select statement.
**relation** | defines a relationship column.
**cssClass** | assigns a CSS class to the column container.


<a name="column-types" class="anchor" href="#column-types"></a>
## Available column types

There are various column types that can be used for the **type** setting, these control how the list column is displayed.

- [Text](#column-text)
- [Number](#column-number)
- [Switch](#column-switch)
- [Date & Time](#column-datetime)
- [Date](#column-date)
- [Time](#column-time)
- [Time since](#column-timesince)
- [Select](#column-select)
- [Relation](#column-relation)
- [Partial](#column-partial)

<a name="column-text" class="anchor" href="#column-text"></a>
### Text

`text` - displays a text column, aligned left

    full_name:
        label: Full Name
        type: text

<a name="column-number" class="anchor" href="#column-number"></a>
### Number

`number` - displays a number column, aligned right

    age:
        label: Age
        type: number

<a name="column-switch" class="anchor" href="#column-switch"></a>
### Switch

`switch` - displays a on or off state for boolean columns.

    enabled:
        label: Enabled
        type: switch

<a name="column-datetime" class="anchor" href="#column-datetime"></a>
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

<a name="column-date" class="anchor" href="#column-date"></a>
### Date

`date` - displays the column value as date format **M j, Y**

    created_at:
        label: Date
        type: date

<a name="column-time" class="anchor" href="#column-time"></a>
### Time

`time` - displays the column value as time format **g:i A**

    created_at:
        label: Date
        type: time

<a name="column-timesince" class="anchor" href="#column-timesince"></a>
### Time since

`timesince` - displays a human readable time difference from the value to the current time. Eg: **10 minutes ago**

    created_at:
        label: Date
        type: timesince

<a name="column-select" class="anchor" href="#column-select"></a>
### Select

`select` - allows to create a column using a custom select statement. Any valid SQL SELECT statement works here.

    full_name:
        label: Full Name
        select: concat(first_name, ' ', last_name)

<a name="column-relation" class="anchor" href="#column-relation"></a>
### Relation

`relation` - allows to display related columns, you can provide a relationship option. The value of this option has to be the name of the Active Record [relationship](../database/model#relationships) on your model. In the next example the **name** value will be translated to the name attribute found in the related model (eg: `$model->name`).

    group:
        label: Group
        relation: groups
        select: name

<a name="column-partial" class="anchor" href="#column-partial"></a>
### Partial

`partial` - renders a partial, the `path` field can refer to a partial view file otherwise the field name is used as the partial name. Inside the partial these variables are available: `$value` is the default cell value, `$record` is the model used for the cell and `$column` is the configured class object `Backend\Classes\ListColumn`.

    content:
        type: partial
        path: ~/plugins/acme/blog/models/comments/_content_column.htm

<a name="displaying-list" class="anchor" href="#displaying-list"></a>
## Displaying the list

Usually lists are displayed in the index [view](controllers-views-ajax/#introduction). As lists include the toolbar, a view can consist from the single `listRender()` method call:

    <?= $this->listRender() ?>

<a name="list-filters" class="anchor" href="#list-filters"></a>
## Using list filters

Lists can be filtered by [adding a filter definition](#adding-filters) to the list configuration. Similarly filters are driven by their own configuration file that contain filter scopes, each scope is an aspect by which the list can be filtered. The next example shows a typical contents of the filter definition file.

    # ===================================
    # Filter Scope Definitions
    # ===================================
    scopes:

        category:
            label: Category
            modelClass: Acme\Blog\Models\Category
            nameFrom: name
            conditions: category_id in (:filtered)

        published:
            label: Hide published
            type: checkbox
            conditions: published <> 1

<a name="filter-scope-options" class="anchor" href="#filter-scope-options"></a>
### Scope options

For each scope you can specify these options (where applicable):

Option  | Description
------------- | -------------
**label** | a name when displaying the filter scope to the user.
**type** | defines how this scope should be rendered (see [Scope types](#scope-types) below). Default: group.
**conditions** | specifies a raw where query statement to apply to the list model query, the `:filtered` parameter represents the filtered value(s).
**scope** | specifies a [query scope method](http://laravel.com/docs/eloquent#query-scopes) defined in the **list model** to apply to the list query, the first parameter will contain the filtered value(s).
**nameFrom** | if filtering by multiple items, a column to display for the name, taken from the `modelClass` model.

<a name="scope-types" class="anchor" href="#scope-types"></a>
### Available scope types

These types can be used to determine how the filter scope should be displayed.

Type  | Description
------------- | -------------
**group** | filters the list by a group of items, usually by a related model and require a `nameFrom` definition. Eg: Status name as open, closed, etc.
**checkbox** | used as a switch to apply a predefined condition or query to the list.

<a name="extend-list-behavior" class="anchor" href="#extend-list-behavior"></a>
## Extending list behavior

Sometimes you may wish to modify the default list behavior and there are several ways you can do this.

- [Overriding controller action](#overriding-action)
- [Extending list columns](#extend-list-columns)
- [Extending list model query](#extend-model-query)

<a name="overriding-action" class="anchor" href="#overriding-action"></a>
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

<a name="extend-list-columns" class="anchor" href="#extend-list-columns"></a>
### Extending list columns

You can extend the columns of another controller from outside by calling the `extendListColumns` static method on the controller class. This method can take two arguments, **$list** will represent the Lists widget object and **$model** represents the model used by the list. Take this controller for example:

    class Categories extends \Backend\Classes\Controller
    {
        public $implement = ['Backend.Behaviors.ListController'];

        public $listConfig = 'list_config.yaml';
    }

Using the `extendListColumns` method you can add extra columns to any list rendered by this controller. It is a good idea to check the **$model** is of the correct type. Here is an example:

        Categories::extendListColumns(function($list, $model, $context){

            if (!$model instanceof MyModel)
                return;

            $list->addColumns([
                'my_column' => [
                    'label'   => 'My Column',
                ],
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

Method  | Description
------------- | -------------
**addColumns** | adds new columns to the list

Each method takes an array of columns similar to the [list column configuration](#list-columns).

<a name="extend-model-query" class="anchor" href="#extend-model-query"></a>
### Extending model query

The lookup query for the list [database model](../database/model) can be extended by overriding the `listExtendQuery` method inside the controller class. This example will ensure that soft deleted records are included in the list data, by applying the **withTrashed** scope to the query:

    public function listExtendQuery($query)
    {
        $query->withTrashed();
    }