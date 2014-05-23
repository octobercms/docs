# Backend lists

- [Configuring the list behavior](#configuring-list)
- [List columns](#list-columns)
- [Displaying the list](#displaying-list)

`List behavior` is a controller modifier used for easily adding a record list to a page. The behavior provides the sortable and searchable list with optional links on its records. 

List behavior depends on form [column definitions](#form-fields) and a [model class](../database/model). In order to use the list behavior you should add it to the `$implement` field of the controller class. Also, the `$relationConfig` class property should be defined and its value should refer to the YAML file used for configuring the behavior options.

    namespace Acme\Blog\Controllers;

    class Categories extends \Backend\Classes\Controller {
        public $implement = [
            'Backend.Behaviors.ListController'
        ];

        public $listConfig = 'list_config.yaml';

> **Note:** Very often the list and [form behavior](form) are used together in a same controller.

<a name="configuring-list" class="anchor" href="#configuring-list"></a>
## Configuring the list behavior

The configuration file referred in the `$listConfig` property is defined in YAML format. The file should be placed into the controller's [views directory](controllers-views-ajax/#introduction). Below is an example of a typical list behavior configuration file:

    # ===================================
    #  List Behavior Config
    # ===================================

    title: Blog Posts
    list: @/plugins/acme/blog/models/post/columns.yaml
    modelClass: Acme\Blog\Models\Post
    recordUrl: acme/blog/posts/update/:id

The following fields are required in the list configuration file:

* **title** - a title for this list.
* **list** - a reference to list column definition file, see [list columns](#list-columns).
* **modelClass** - a model class name to load the list data.

The configuration options listed below are optional. 

* **recordUrl** - link each list record to another page. Eg: **users/update:id**. The `:id` part is replaced with the record identifier. This allows you to link the list behavior and the [form behavior](forms).
* **noRecordsMessage** - a message to display when no records are found, can refer to a [localization string](../plugin/localization).
* **recordsPerPage** - records to display per page, use 0 for no pages. Default: 0
* **toolbar** - reference to a Toolbar Widget configuration file, or an array with configuration (see below).
* **showSorting** - displays the sorting link on each column. Default: true
* **defaultSort** - sets a default sorting column and direction when user preference is not defined.
* **showCheckboxes** - displays checkboxes next to each record. Default: false.
* **showSetup** - displays the list column set up button. Default: false.
* **showTree** - displays a tree hierarchy for parent/child records. Default: false.
* **treeExpanded** - if tree nodes should be expanded by default. Default: true.

<a name="adding-toolbar" class="anchor" href="#adding-toolbar"></a>
### Adding a toolbar

To include a toolbar with the list add the following configuration to the list configuration YAML file:

    toolbar:
        buttons: list_toolbar
        search:
            prompt: Find records

The toolbar configuration allows:

* **buttons** - a reference to a controller partial file with the toolbar buttons. Eg: **_list_toolbar.htm**
* **search** - reference to a Search Widget configuration file, or an array with configuration.

The search configuration supports the following fields:

* **prompt** - A placeholder to display when there is no active search, can refer to a [localization string](../plugin/localization).

The toolbar buttons partial referred above should contain the toolbar control definition with some buttons. The partial could also contain a [scoreboard control](controls#scoreboards) with charts. Example of a toolbar partial with the **New Post** button referring to the **create** action provided by the [form behavior](forms):

    <div data-control="toolbar">
        <a 
            href="<?= Backend::url('acme/blog/posts/create') ?>" 
            class="btn btn-primary oc-icon-plus">New Post</a>
    </div>

<a name="list-columns" class="anchor" href="#list-columns"></a>
## List columns

List columns are defined with the YAML file. The column configuration is used by the list behavior for creating the record table and displaying model columns in the table cells. The file is placed to a subdirectory of the **models** directory of a plugin. The subdirectory name matches the model class name written in lowercase. The file name doesn't matter, but the **columns.yaml** and **list_columns.yaml** are common names. Example list columns file location: 

    plugins/
      acme/
        blog/
          models/                <=== Plugin models directory
            post/                <=== Model configuration directory
              list_columns.yaml  <=== Model list columns config file
            Post.php             <=== model class


The next example shows a typical contents of the list column definitions file.

    # ===================================
    #  List Column Definitions
    # ===================================

    columns:
        name: Name
        email: Email

<a name="column-options" class="anchor" href="#column-options"></a>
### Column options

For each column can specify these options (where applicable):

* **label** - a name when displaying the list column to the user.
* **type** - defines how this column should be rendered (see [Column types](column-types) below).
* **options** - options used by a render type used (optional).
* **searchable** - include this field in the list search results. Default: no.
* **invisible** - specifies if this column is hidden by default. Default: no.
* **sortable** - specifies if this column can be sorted. Default: yes.
* **select** - defines a custom SQL select statement.
* **relation** - defines a relationship column.

<a name="column-types" class="anchor" href="#column-types"></a>
### Column Types

`text` - displays a text column, aligned left

    full_name:
        label: Full Name
        type: text

`number` - displays a number column, aligned right

    age:
        label: Age
        type: number

`switch` - displays a on or off state for boolean fields.

    enabled:
        label: Enabled
        type: switch

`datetime` - displays the column value as a formatted date and time. The next example displays dates as **Thu, Dec 25, 1975 2:15 PM**.

    created_at:
        label: Date
        type: datetime

You can also specify a custom date format, for example **Thursday 25th of December 1975 02:15:16 PM**:

    created_at:
        label: Date
        type: datetime
        format: l jS \of F Y h:i:s A

`date` - displays the column value as date format **M j, Y**

    created_at:
        label: Date
        type: date

`time` - displays the column value as time format **g:i A**

    created_at:
        label: Date
        type: time

`timesince` - displays a human readable time difference from the value to the current time. Eg: **10 minutes ago**

    created_at:
        label: Date
        type: timesince

`select` - allows to create a column using a custom select statement. Any valid SQL SELECT statement works here.

    full_name:
        label: Full Name
        select: concat(first_name, ' ', last_name)

`relation` - allows to display related columns, you can provide a relationship option. The value of this option has to be the name of the Active Record [relationship](../database/model#relationships) on your model. In the next example the **@name** value will be translated to a fully qualified reference (eg: table.name).

    group:
        label: Group
        relation: groups
        select: @name

<a name="displaying-list" class="anchor" href="#displaying-list"></a>
## Displaying the list

Usually lists are displayed in the index [view](controllers-views-ajax/#introduction). As lists include the toolbar, a view can consist from the single `listRender()` method call:

    <?= $this->listRender() ?>

### Overriding the default list behavior

Sometimes you may wish to use your own logic along with the list. You can use your own `index()` action method in the controller, then call the List behavior `index()` method.

    public function index($userId = null)
    {
        //
        // Do any custom code here
        //

        // Call the ListController behavior index() method
        $this->getClassExtension('Backend.Behaviors.ListController')->index();
    }
