# Relations

- [Configuring the relation behavior](#configuring-relation)
- [Displaying a relation manager](#relation-display)
- [Relationship types](#relationship-types)

`Relation behavior` is a controller modifier used for easily managing complex [model](../database/model) relationships on a page. Not to be confused with [List](lists#column-types) relation columns or Form relation fields that only provide simple management. 

Relation behavior depends on [relation definitions](#relation-definitions). In order to use the relation behavior you should add it to the `$implement` field of the controller class. Also, the `$listConfig` class property should be defined and its value should refer to the YAML file used for configuring the behavior options.

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

The configuration file referred in the `$relationConfig` property is defined in YAML format. The file should be placed into the controller's [views directory](controllers-views-ajax/#introduction). Below is an example of a typical relation behavior configuration file:

    # ===================================
    #  Relation Behavior Config
    # ===================================

    comments:
        label: Comment
        list: @/plugins/acme/blog/models/comment/columns.yaml
        form: @/plugins/acme/blog/models/comment/fields.yaml

The following fields are required in the relation configuration file:

* **label** - a label for the relation.

The configuration options listed below are optional. 

* **list** - a reference to list column definition file, see [backend list columns](lists#list-columns).
* **form** - a reference to form field definition file, see [backend form fields](forms#form-fields).
* **pivot** - a reference to form field definition file, used for relations with pivot table data.

<a name="relation-display" class="anchor" href="#relation-display"></a>
## Displaying a relation manager

Relations can be managed on any page by first initializing the parent model. Note that the [form behavior](forms) will automatically initialize the model on its create, update and preview actions.

    $this->initRelation($model);

The relation manager can then be displayed for a specified relation definition. For example, if you want to display the relation manager on the [Preview](forms#form-preview-view) page, the **preview.htm** view contents could look like this:

    <?= $this->formRenderPreview() ?>

    <?= $this->relationRender('packages') ?>

<a name="relationship-types" class="anchor" href="#relationship-types"></a>
## Relationship types

How the relation manager is presented depends on the relationship definition in the parent model, and the relation definition.

<a name="has-many" class="anchor" href="#has-many"></a>
### Has Many relation

* Related records are displayed as a **list**.
* Clicking a record will display an update **form**.
* Clicking toolbar Create button will display a create **form**.
* Clicking toolbar Delete button will destroy the record(s).

<a name="belongs-to-many" class="anchor" href="#belongs-to-many"></a>
### Belongs to Many relation

* Related records are displayed as a **list**.
* Clicking toolbar Add button will display a selection **list**.
* Clicking toolbar Delete button will destroy the pivot table record(s).

<a name="belongs-to-many-pivot" class="anchor" href="#belongs-to-many-pivot"></a>
### Belongs to Many (with Pivot Data) relation

* Related records are displayed as a **list**.
* Clicking a record will display a **pivot** data update form.
* Clicking toolbar Add button will display a selection **list**, then a **pivot** data entry form.
* Clicking toolbar Delete button will destroy the pivot table record(s).

<a name="belongs-to" class="anchor" href="#belongs-to"></a>
### Belongs to relation

* Related record is displayed as a **form** preview.
* Clicking toolbar Link to button will display a selection **list**.
* Clicking toolbar Unlink button will orphan the relationship.

<a name="has-one" class="anchor" href="#has-one"></a>
### Has one relation

* Related record is displayed as a **form** preview.
* Clicking toolbar Create button will display a create **form**.
* Clicking toolbar Update button will display an update **form**.
* Clicking toolbar Delete button will destroy the record.