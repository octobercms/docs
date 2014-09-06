# Relations

- [Configuring the relation behavior](#configuring-relation)
- [Relationship types](#relationship-types)
- [Displaying a relation manager](#relation-display)

`Relation behavior` is a controller modifier used for easily managing complex [model](../database/model) relationships on a page. Not to be confused with [List](lists#column-types) relation columns or Form relation fields that only provide simple management.

Relation behavior depends on [relation definitions](#relation-definitions). In order to use the relation behavior you should add the `Backend.Behaviors.RelationController` definition to the `$implement` field of the controller class. Also, the `$relationConfig` class property should be defined and its value should refer to the YAML file used for [configuring the behavior options](#configuring-relation).

    namespace Acme\Projects\Controllers;

    class Projects extends Controller
    {
        public $implement = [
            'Backend.Behaviors.FormController',
            'Backend.Behaviors.RelationController',
        ];

        public $formConfig = 'config_form.yaml';
        public $relationConfig = 'config_relation.yaml';

> **Note:** Very often the relation behavior is used together with the [form behavior](form).

<a name="configuring-relation" class="anchor" href="#configuring-relation"></a>
## Configuring the relation behavior

The configuration file referred in the `$relationConfig` property is defined in YAML format. The file should be placed into the controller's [views directory](controllers-views-ajax/#introduction). The required configuration depends on the [relationship type](#relationship-types) between the target model and the related model.

The first level field in the relation configuration file defines the relationship name in the target model. For example:

    class Invoice {
        public $hasMany = [
            'items' => ['Acme\Pay\Models\InvoiceItem'],
        ];
    }

An *Invoice* model with a relationship called `items` should define the first level field using the same relationship name:

    # ===================================
    #  Relation Behavior Config
    # ===================================

    items:
        label: Invoice Line Item
        list: @/plugins/acme/pay/models/invoiceitem/columns.yaml
        form: @/plugins/acme/pay/models/invoiceitem/fields.yaml
        manage:
            recordsPerPage: 10

The following options are then used for each relationship name definition:

Option  | Description
------------- | -------------
**label** | a label for the relation, in the singular tense, required.
**emptyMessage** | a message to display when the relationship is empty, optional.
**readOnly** | disables the ability to add, update, delete or create relations. default: false

The configuration options listed below are optional.

Option  | Description
------------- | -------------
**list** | a reference to list column definition file, see [backend list columns](lists#list-columns).
**form** | a reference to form field definition file, see [backend form fields](forms#form-fields).
**pivot** | a reference to form field definition file, used for relations with pivot table data.
**view** | configuration specific to the view container, see below.
**manage** | configuration specific to the management popup, see below.

These configuration values can be specified for the **view** or **manage** options.

Option  | Type | Description
------------- | ------------- | -------------
**showSearch** | List | display an input for searching the records. Default: false
**showSorting** | List | displays the sorting link on each column. Default: true
**defaultSort** | List | sets a default sorting column and direction when user preference is not defined. Supports a string or an array with keys `column` and `direction`.
**recordsPerPage** | List | maximum rows to display for each page.

<a name="relationship-types" class="anchor" href="#relationship-types"></a>
## Relationship types

How the relation manager is displayed depends on the relationship definition in the target model. The relationship type will also determine the configuration requirements, these are shown in **bold**.

<a name="has-many" class="anchor" href="#has-many"></a>
### Has Many relation

1. Related records are displayed as a **list**.
1. Clicking a record will display an update **form**.
1. Clicking toolbar Create button will display a create **form**.
1. Clicking toolbar Delete button will destroy the record(s).

For example, if a *Blog Post* has many *Comments*, the target model is set as the blog post and a list of comments is displayed, using columns from the **list** definition. Clicking on a comment opens a popup form with the fields defined in **form** to update the comment. Comments can be created in the same way. Below is an example of the relation behavior configuration file:

    # ===================================
    #  Relation Behavior Config
    # ===================================

    comments:
        label: Comment
        list: @/plugins/acme/blog/models/comment/columns.yaml
        form: @/plugins/acme/blog/models/comment/fields.yaml

<a name="belongs-to-many" class="anchor" href="#belongs-to-many"></a>
### Belongs to Many relation

1. Related records are displayed as a **list**.
1. Clicking toolbar Add button will display a selection **list**.
1. Clicking toolbar Delete button will destroy the pivot table record(s).

For example, if a *User* belongs to many *Roles*, the target model is set as the user and a list of roles is displayed, using columns from the **list** definition. Existing roles can be added and removed from the user. Below is an example of the relation behavior configuration file:

    # ===================================
    #  Relation Behavior Config
    # ===================================

    roles:
        label: Role
        list: @/plugins/acme/user/models/role/columns.yaml

<a name="belongs-to-many-pivot" class="anchor" href="#belongs-to-many-pivot"></a>
### Belongs to Many (with Pivot Data) relation

1. Related records are displayed as a **list**.
1. Clicking a record will display a **pivot** data update form.
1. Clicking toolbar Add button will display a selection **list**, then a **pivot** data entry form.
1. Clicking toolbar Delete button will destroy the pivot table record(s).

Continuing the example in *Belongs To Many* relations, if a role also carried an expiry date, clicking on a role will open a popup form with the fields defined in **pivot** to update the expiry date. Below is an example of the relation behavior configuration file:

    # ===================================
    #  Relation Behavior Config
    # ===================================

    roles:
        label: Role
        list: @/plugins/acme/user/models/role/columns.yaml
        pivot:
            fields:
                expiry_date:
                    label: Expires
                    type: datepicker

<a name="belongs-to" class="anchor" href="#belongs-to"></a>
### Belongs to relation (*Not yet implemented*)

1. Related record is displayed as a **form** preview.
1. Clicking toolbar Link to button will display a selection **list**.
1. Clicking toolbar Unlink button will orphan the relationship.

<a name="has-one" class="anchor" href="#has-one"></a>
### Has one relation (*Not yet implemented*)

1. Related record is displayed as a **form** preview.
1. Clicking toolbar Create button will display a create **form**.
1. Clicking toolbar Update button will display an update **form**.
1. Clicking toolbar Delete button will destroy the record.

<a name="relation-display" class="anchor" href="#relation-display"></a>
## Displaying a relation manager

Before relations can be managed on any page, the target model must first be initialized in the controller by calling the `initRelation()` method.

    $post = Post::where('id', 7)->first();
    $this->initRelation($post);

> **Note:** The [form behavior](forms) will automatically initialize the model on its create, update and preview actions.

The relation manager can then be displayed for a specified relation definition by calling the `relationRender()` method. For example, if you want to display the relation manager on the [Preview](forms#form-preview-view) page, the **preview.htm** view contents could look like this:

    <?= $this->formRenderPreview() ?>

    <?= $this->relationRender('comments') ?>

