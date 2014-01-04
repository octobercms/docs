## Controller Configuration

List behavior is a controller modifier used for easily adding a List to a page.

List behavior depends on column definitions and a model class.

### Basic structure

The configuration is defined in YAML format, an example looks like this:

```
# ===================================
#  List Behavior Config
# ===================================

title: Admins
list: /modules/backend/models/user/list-columns.yaml
model-class: Modules\Backend\Models\Admin
record-url: users/update/:id
```

### Required configuration

* **title** - a title for this list.
* **list** - a reference to list column definition file, see [list columns config](List Columns Config).
* **model-class** - a Model class name to source the list data.

### Optional configuration

* **record-url** - link each list record to another page. Eg: **users/update:id**
* **no-records-message** - a message to display when no records are found, can refer to a [localization string](Localization).
* **records-per-page** - how many records to display per page. Default: 20
* **show-checkboxes** - displays checkboxes next to each record.
* **toolbar** - reference to a Toolbar Widget configuration file, or an array with configuration (see below).

### Adding a toolbar

To include a toolbar with the list add the following configuration:

```
toolbar:
    buttons: list_toolbar
    search:
        prompt: No records found!
```

The toolbar configuration allows:

* **buttons** - a reference to a controller partial file with the toolbar buttons. Eg: **_list_toolbar.htm**
* **search** - reference to a Search Widget configuration file, or an array with configuration.

The search configuration allows:

* **prompt** - A placeholder to display when there is no active search, can refer to a [localization string](Localization).






## Model Configuration

List column definitions are used for creating a graphical user interface (GUI) representation of a collection of database Models.

The GUI is displayed as a HTML table.

### Basic structure

```
# ===================================
#  List Column Definitions
# ===================================

columns:
    name: Name
    email: Email
```

### Field options

Each field can specify these options (where applicable):

* **label** - a name when displaying the list column to the user
* **type** - defines how this column should be rendered (see Column types below)
* **options** - options used by a render type used (optional)
* **searchable** - include this field in the list search results. Default: no
* **invisible** - specifies if this column is hidden by default. Default: no
* **sortable** - specifies if this column can be sorted. Default: yes
* **select** - defines a custom SQL select statement
* **relation** - defines a relationship column

## Column types

The following column types are available:

### Text

Displays a text column, aligned left

```
full_name:
    label: Full Name
    type: text
```

### Number

Displays a number column, aligned right

```
age:
    label: Age
    type: number
```

### Date Time

Displays the column value as a formatted date and time.

```
  created_at:
    label: Date
    type: datetime
```

This displays as *Thu, Dec 25, 1975 2:15 PM*.

You can also specify a custom format:

```
  created_at:
    label: Date
    type: datetime
    format: l jS \of F Y h:i:s A
```

Displays as *Thursday 25th of December 1975 02:15:16 PM*

### Date

Displays the column value as date format `M j, Y`

```
  created_at:
    label: Date
    type: time
```

### Time

Displays the column value as time format `g:i A`

```
  created_at:
    label: Date
    type: time
```

## Custom Selects

You can create a column using a custom select statement. Any valid SQL SELECT statement works here.

```
full_name:
    label: Full Name
    select: concat(first_name, ' ', last_name)
```

## Relationships

If you want to display related columns, you can provide a relationship option.
The value of this option has to be the name of the Active Record relationshp on your model.

```
group:
    label: Group
    relation: groups
    select: @name
```

The **@name** value will be translated to a fully qualified reference (eg: table.name).

