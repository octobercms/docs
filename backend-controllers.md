# Backend Controllers

- [Basic Usage](#basic-usage)
- [Routing](#routing)
- [Forms](#forms)
- [Lists](#lists)
- [Relations](#relations)


<a name="basic-usage"></a>
## Basic Usage

Controllers in October are primarily used for the back-end pages, since the CMS page template will act as the front-end controller.

Controllers reside in the **/controllers** directory inside a Plugin. An example of a controller directory structure:

```
plugins/
  acme/
    blog/
      controllers/
        users/               <=== Controller view directory
          _partial.htm       <=== Controller partial file
          config_form.yaml   <=== Controller config file
          index.htm          <=== Controller view file
        Users.php            <=== Controller class
      Plugin.php
```

The controller view directory is a lower case name of the controller class.

#### Class definition

The most basic representation of a Controller used inside a Plugin looks like this:

```php
namespace Acme\Blog\Controllers;

class Posts extends \Backend\Classes\Controller {

    public index() {}

}
```



<a name="routing"></a>
## Routing

A controller is also coupled to a view file for its class method names, called *actions*, for example **index.htm** contents:

```
<h1>Hello World</h1>
```

To access this page the URL is made up of the author name, plugin name, controller name, action name.

```
backend/[author name]/[plugin name]/[controller name]/[action name]
```

The above Controller results in the following:

```
http://yoursite.com/backend/acme/blog/users/index
```



<a name="forms"></a>
## Forms

`Form behavior` is a controller modifier used for easily adding Form functionality to a page. Form behavior depends on field definitions and a model class.

- [Configuration](#form-configuration)
- [Form Fields](#form-fields)
- [Field Types](#form-field-types)

<a name="form-configuration"></a>
### Configuration

The configuration is defined in YAML format, an example looks like this:

```
# ===================================
#  Form Behavior Config
# ===================================

name: Admin
form: @/plugins/acme/blog/models/post/fields.yaml
model-class: Acme\Blog\Post

create:
    title: New Blog Post

update:
    title: Edit Blog Post

preview:
    title: View Blog Post
```

#### Required configuration

* **name** - a name for the object being managed by this form.
* **form** - a reference to form field definition file, see Model Configuration.
* **model-class** - a Model class name to source and save the form data.

#### Optional configuration

* **default-redirect** - redirection page to use when none is defined.
* **preview** - an array containing configuration for the preview page.
* **create** - an array containing configuration for the create page.
* **update** - an array containing configuration for the update page.

#### Create page

To include an create page add the following configuration:

```
create:
    title: New Blog Post
    redirect: acme/blog/posts/update/:id
    redirect-close: acme/blog/posts
    flash-save: Post has been created!
```

The create page configuration allows:

* **title** - a page title, can refer to a [localization string](Localization).
* **redirect** - redirection page when record is saved.
* **redirect-close** - redirection page when record is saved and **close** post variable is sent with the request.
* **flash-save** - flash message to display when record is saved, can refer to a [localization string](Localization).

#### Update page

To include an update page add the following configuration:

```
update:
    title: Edit Blog Post
    redirect: acme/blog/posts
    flash-save: Post updated successfully!
    flash-delete: Post has been deleted.
```

The update page configuration allows:

* **title** - a page title, can refer to a [localization string](Localization).
* **redirect** - redirection page when record is saved.
* **redirect-close** - redirection page when record is saved and **close** post variable is sent with the request.
* **flash-save** - flash message to display when record is saved, can refer to a [localization string](Localization).
* **flash-delete** - flash message to display when record is deleted, can refer to a [localization string](Localization).

#### Preview page

To include an preview page add the following configuration:

```
preview:
    title: View Blog Post
```

The preview page configuration allows:

* **title** - a page title, can refer to a [localization string](Localization).

<a name="form-fields"></a>
### Form fields

Form field definitions are a configuration file usually contained in a `fields.yaml` file stored in the **/models** directory of a plugin.
They are used for creating a graphical user interface (GUI) representation of a database Model (or model-like class).
The GUI is displayed as a HTML form.
Fields can be placed in three areas, the *outside area*, *primary tabs* or *secondary tabs*.

The configuration is defined in YAML format, an example looks like this:

```
# ===================================
#  Form Field Definitions
# ===================================

fields:
  blog_title:
    label: Blog Title
    description: The title for this blog

  published_at:
    label: Published date
    description: When this blog post was published
    type: datetime

  [...]

tabs:
  fields:
    [...]

secondaryTabs:
  fields:
    [...]
```

#### Field options

Each field can specify these options (where applicable):

* **label** - a name when displaying the form field to the user
* **type** - defines how this field should be rendered (see Fields types below). Default: text
* **span** - aligns the form field to one side. Options: auto, left, right, full. Default: auto
* **size** - specifies a field size for fields that use it. Options: tiny, small, large, huge, giant
* **placeholder** - if the field supports a placeholder value
* **comment** - places a descriptive comment below the field
* **commentAbove** - places a comment above the field
* **tab** - assigns the field to a tab
* **cssClass** - assigns a CSS class to the field container
* **disabled** - grays out the field if set to true. Options: true, false.
* **stretch** - specifies if this field stretch to fit the page height.

<a name="form-field-types"></a>
## Field Types

The following field types are available:

#### Text box
Renders a single line text box. This is the default type used if none is specified.
```
blog_title:
  label: Blog Title
  type: text
```

#### Password
Renders a single line password field.
```
user_password:
  label: Password
  type: password
```

#### Text Area
Renders a multiline text box. A size can also be specified with possible values: tiny, small, large, huge, giant.

```
blog_contents:
  label: Contents
  type: textarea
  size: large
```

#### Dropdown
Renders a dropdown with specified options. There are 3 ways to provide options:

**Method 1:** Define options directly in the YAML file
```
status:
  label: Blog Post Status
  type: dropdown
  options:
    draft: Draft
    published: Published
    archived: Archived
```

**Method 2**: Define them with a method declared in the model's class
```
status:
  label: Blog Post Status
  type: dropdown
```

If the options element is omitted, the framework expects a method with the name **get*Field*Options()** to be defined in the model. Using the example above, the model should have the ``getStatusOptions()`` method. This method should return an array of options in the format *key => value*.

**Method 3:** Use a specific method declared in the model's class:

```
status:
  label: Blog Post Status
  type: dropdown
  options: listStatuses
```

In this example the `listStatuses()` method should be defined in the model class.

#### Radio List
Renders a list of radio options, where only one item can be selected at a time.

```
security_level:
  label: Access Level
  type: radio
  options:
    all: All
    registered: Registered only
    guests: Guests only
```

Radio lists also support a secondary description.

```
security_level:
  label: Access Level
  type: radio
  options:
    all: [All, Guests and customers will be able to access this page.]
    registered: [Registered only, Only logged in member will be able to access this page.]
    guests: [Guests only, Only guest users will be able to access this page.]
```

#### Widget

You can also use a special field type called a *Form Widget*.

```
blog_content:
  type: Backend\FormWidgets\RichEditor
  size: huge
  options: [...]
```

The `type` field can refer directly to the class name of the widget. You can read more on the [Form Widgets](Widgets) article.


<a name="lists"></a>
## Lists

`List behavior` is a controller modifier used for easily adding a List to a page. List behavior depends on column definitions and a model class.

- [Configuration](#list-configuration)
- [List Columns](#list-columns)
- [Column Types](#list-column-types)

<a name="list-configuration"></a>
### Configuration

The configuration is defined in YAML format, an example looks like this:

```
# ===================================
#  List Behavior Config
# ===================================

title: Blog Posts
list: @/plugins/acme/blog/models/post/columns.yaml
model-class: Acme\Blog\Models\Post
record-url: acme/blog/posts/update/:id
```

#### Required configuration

* **title** - a title for this list.
* **list** - a reference to list column definition file, see Model Configuration.
* **model-class** - a Model class name to source the list data.

#### Optional configuration

* **record-url** - link each list record to another page. Eg: **users/update:id**
* **no-records-message** - a message to display when no records are found, can refer to a [localization string](Localization).
* **records-per-page** - how many records to display per page. Default: 20
* **show-checkboxes** - displays checkboxes next to each record. Default: false
* **show-setup** - displays the list column set up button. Default: true
* **show-pagination** - displays page numbers for multiple records. Default: true
* **toolbar** - reference to a Toolbar Widget configuration file, or an array with configuration (see below).
* **default-sort** - sets a default sorting column and direction when user preference is not defined.

#### Adding a toolbar

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

<a name="list-columns"></a>
### List Columns

List column definitions are used for creating a graphical user interface (GUI) representation of a collection of database Models. The GUI is displayed as a HTML table.

```
# ===================================
#  List Column Definitions
# ===================================

columns:
    name: Name
    email: Email
```

#### Field options

Each field can specify these options (where applicable):

* **label** - a name when displaying the list column to the user
* **type** - defines how this column should be rendered (see Column types below)
* **options** - options used by a render type used (optional)
* **searchable** - include this field in the list search results. Default: no
* **invisible** - specifies if this column is hidden by default. Default: no
* **sortable** - specifies if this column can be sorted. Default: yes
* **select** - defines a custom SQL select statement
* **relation** - defines a relationship column

<a name="list-column-types"></a>
## Column Types

The following column types are available:

#### Text

Displays a text column, aligned left

```
full_name:
    label: Full Name
    type: text
```

#### Number

Displays a number column, aligned right

```
age:
    label: Age
    type: number
```

#### Date Time

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

#### Date

Displays the column value as date format `M j, Y`

```
created_at:
    label: Date
    type: date
```

#### Time

Displays the column value as time format `g:i A`

```
created_at:
    label: Date
    type: time
```

#### Time elapsed

Displays a human readable time difference from the value to the current time. Eg: *10 minutes ago*

```
created_at:
    label: Date
    type: timesince
```

#### Custom Selects

You can create a column using a custom select statement. Any valid SQL SELECT statement works here.

```
full_name:
    label: Full Name
    select: concat(first_name, ' ', last_name)
```

#### Relationships

If you want to display related columns, you can provide a relationship option.
The value of this option has to be the name of the Active Record relationshp on your model.

```
group:
    label: Group
    relation: groups
    select: @name
```

The **@name** value will be translated to a fully qualified reference (eg: table.name).




<a name="relations"></a>
## Relations

`Relation behavior` is a controller modifier used for easily managing complex Model relationships on a page. Not to be confused with List relation columns or Form relation fields that only provide simple management. Relation behavior depends on relation definitions.

- [Configuration](#relation-configuration)
- [Relation Display](#relation-display)

<a name="configuration"></a>
### Configuration

```
# ===================================
#  Relation Behavior Config
# ===================================

comments:
    label: Comment
    list: @/plugins/acme/blog/models/comment/columns.yaml
    form: @/plugins/acme/blog/models/comment/fields.yaml
```

#### Required configuration

* **label** - a label for the relation.

#### Optional configuration

* **list** - a reference to list column definition file, see Model Configuration of Backend Lists.
* **form** - a reference to form field definition file, see Model Configuration of Backend Forms.
* **pivot** - a reference to form field definition file, used for relations with pivot table data.

<a name="relation-display"></a>
### Displaying a relation manager

Relations can be managed on any page by first initializing the parent model.

```php
$this->initRelation($model);
```
> **Note:** The Form behavior will automatically initialize the model on its create, update and preview actions.

The relation manager can then be displayed for a specified relation definition.

```php
<?= $this->relationRender('comments') ?>
```

#### Relationship types

How the relation manager is presented depends on the relationship definition in the parent model, and the relation definition.

##### Has Many

* Related records are displayed as a **list**.
* Clicking a record will display an update **form**.
* Clicking toolbar Create button will display a create **form**.
* Clicking toolbar Delete button will destroy the record(s).

##### Belongs to Many

* Related records are displayed as a **list**.
* Clicking toolbar Add button will display a selection **list**.
* Clicking toolbar Delete button will destroy the pivot table record(s).

##### Belongs to Many (with Pivot Data)

* Related records are displayed as a **list**.
* Clicking a record will display a **pivot** data update form.
* Clicking toolbar Add button will display a selection **list**, then a **pivot** data entry form.
* Clicking toolbar Delete button will destroy the pivot table record(s).

##### Belongs to

* Related record is displayed as a **form** preview.
* Clicking toolbar Link to button will display a selection **list**.
* Clicking toolbar Unlink button will orphan the relationship.

##### Has one

* Related record is displayed as a **form** preview.
* Clicking toolbar Create button will display a create **form**.
* Clicking toolbar Update button will display an update **form**.
* Clicking toolbar Delete button will destroy the record.
