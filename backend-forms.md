## Controller Configuration

Form behavior is a controller modifier used for easily adding Form functionality to a page.

Form behavior depends on field definitions and a model class.

### Basic structure

The configuration is defined in YAML format, an example looks like this:

```
# ===================================
#  Form Behavior Config
# ===================================

name: Admin
form: /Modules/Backend/Models/Admin/form-fields.yaml
model-class: Backend\Models\Admin

create:
    title: New Admin

update:
    title: Edit Admin

preview:
    title: View Admin
```

### Required configuration

* **name** - a name for the object being managed by this form.
* **form** - a reference to list column definition file, see Model Configuration.
* **model-class** - a Model class name to source and save the form data.

### Optional configuration

* **default-redirect** - redirection page to use when none is defined.
* **preview** - an array containing configuration for the preview page.
* **create** - an array containing configuration for the create page.
* **update** - an array containing configuration for the update page.

### Create page

To include an create page add the following configuration:

```
create:
    title: New Admin
    redirect: backend/users/update/:id
    redirect-close: backend/users
    flash-save: Admin has been created!
```

The create page configuration allows:

* **title** - a page title, can refer to a [localization string](Localization).
* **redirect** - redirection page when record is saved.
* **redirect-close** - redirection page when record is saved and **close** post variable is sent with the request.
* **flash-save** - flash message to display when record is saved, can refer to a [localization string](Localization).

### Update page

To include an update page add the following configuration:

```
update:
    title: Edit Admin
    redirect: backend/users
    flash-save: Admin updated successfully!
    flash-delete: Admin has been deleted.
```

The update page configuration allows:

* **title** - a page title, can refer to a [localization string](Localization).
* **redirect** - redirection page when record is saved.
* **redirect-close** - redirection page when record is saved and **close** post variable is sent with the request.
* **flash-save** - flash message to display when record is saved, can refer to a [localization string](Localization).
* **flash-delete** - flash message to display when record is deleted, can refer to a [localization string](Localization).

### Preview page

To include an preview page add the following configuration:

```
preview:
    title: View Admin
```

The preview page configuration allows:

* **title** - a page title, can refer to a [localization string](Localization).






## Model Configuration

Form field definitions are a configuration file usually contained in a ``form-fields.yaml`` file stored in the **/models** directory of a plugin.

They are used for creating a graphical user interface (GUI) representation of a database Model (or model-like class). The GUI is displayed as a HTML form. Fields can be placed in three areas, the *outside area*, *primary tabs* or *secondary tabs*.

### Basic structure

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

secondary-tabs:
  fields:
    [...]
```

### Field options

Each field can specify these options (where applicable):

* **label** - a name when displaying the form field to the user
* **type** - defines how this field should be rendered (see Fields types below). Default: text
* **span** - aligns the form field to one side. Options: auto, left, right, full. Default: auto
* **size** - specifies a field size for fields that use it. Options: tiny, small, large, huge, giant
* **placeholder** - if the field supports a placeholder value
* **comment** - places a descriptive comment below the field
* **comment-above** - places a comment above the field
* **tab** - assigns the field to a tab
* **css-class** - assigns a CSS class to the field container
* **disabled** - grays out the field if set to true. Options: true, false.
* **stretch** - specifies if this field stretch to fit the page height.

---

## Field types

The following field types are available:

### Text box
Renders a single line text box. This is the default type used if none is specified.
```
blog_title:
  label: Blog Title
  type: text
```

### Password
Renders a single line password field.
```
user_password:
  label: Password
  type: password
```

### Text Area
Renders a multiline text box. A size can also be specified with possible values: tiny, small, large, huge, giant.

```
blog_contents:
  label: Contents
  type: textarea
  size: large
```

### Dropdown
Renders a dropdown with specified options. There are 3 ways to provide options:

*Method 1:* Define options directly in the YAML file
```
status:
  label: Blog Post Status
  type: dropdown
  options:
    draft: Draft
    published: Published
    archived: Archived
```

*Method 2:* Define them with a method declared in the model's class
```
status:
  label: Blog Post Status
  type: dropdown
```

If the options element is omitted, the framework expects a method with the name **get*Field*Options()** to be defined in the model. 

Using the example above, the model should have the ``getStatusOptions()`` method. This method should return an array of options in the format *key => value*.

*Method 3:* Use a specific method declared in the model's class:

```
status:
  label: Blog Post Status
  type: dropdown
  options: listStatuses
```

In this example the ``listStatuses()`` method should be defined in the model class.

### Radio List
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

### Widget

You can also use a special field type called a *Form Widget*.

```
blog_content:
  type: Backend\Widgets\FormRichEditor
  size: huge
  options: [...]
```

The *type* field can refer directly to the class name of the widget. You can read more on the [Form Widgets](Widgets) article.