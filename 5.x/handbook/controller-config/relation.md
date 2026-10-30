---
previousPath: extend/relations/relation-controller.md#configuring-the-relation-behavior
subtitle: Controller Configuration
---
# config_relation.yaml

The configuration file referred in the `$relationConfig` property is defined in YAML format. The file should be placed into the [controller's views directory](../../backend/panel/views.md). The required configuration depends on the relationship type between the target model and the related model.

The first level field in the relation configuration file defines the relationship name in the target model. For example.

```php
class Invoice extends Model
{
    public $hasMany = [
        'items' => \Acme\Pay\Models\InvoiceItem::class,
    ];
}
```

An `Invoice` model with a relationship called `items` should define the first level field using the same relationship name.

```yaml
# config_relation.yaml
items:
    label: Invoice Line Item
    view:
        list: $/acme/pay/models/invoiceitem/columns.yaml
        toolbarButtons: create|delete
        recordsPerPage: 10
    manage:
        form: $/acme/pay/models/invoiceitem/fields.yaml
```

The following properties are then used for each relationship name definition.

Property | Description
------------- | -------------
**label** | a label for the relation, in the singular tense, required.
**view** | configuration specific to the view container, see below.
**manage** | configuration specific to the management popup, see below.
**pivot** | a reference to form field definition file, used for relations with pivot table data.
**emptyMessage** | a message to display when the relationship is empty, optional.
**readOnly** | disables the ability to add, update, delete or create relations. Default: `false`
**deferredBinding** | [defers all binding actions using a session key](../../backend/data/relationships.md) when it is available. default: `false`
**popupSize** | change the size of the management popups used, either: `giant`, `huge`, `large`, `small`, `tiny` or `adaptive`. Default: `huge`
**valueFrom** | defines a custom model attribute to use for the source value. Default comes from the definition name.

These configuration values can be specified for the **view** or **manage** properties, where applicable to the render type of list, form or both.

Property | Type | Description
------------- | ------------- | -------------
**form** | Form | a reference to form field definition file, see [backend form fields](../form-fields.md).
**list** | List | a reference to list column definition file, see [backend list columns](../list-columns.md).
**showFlash** | Both | enables the display of flash messages after a successful action. Default: `true`
**showSearch** | List | display an input for searching the records. Default: `false`
**showSorting** | List | displays the sorting link on each column. Default: `true`
**showSetup** | List | displays a setup button to configure the list columns and records per page. Default: `false`
**defaultSort** | List | sets a default sorting column and direction when user preference is not defined. Supports a string or an array with keys `column` and `direction`. The direction can be `asc` for ascending (default) or `desc` for descending order.
**recordsPerPage** | List | maximum rows to display for each page.
**noRecordsMessage** | List | a message to display when no records are found, can refer to a [localization string](../../backend/localization/backend.md).
**conditions** | List | specifies a raw where query statement to apply to the list model query.
**scope** | List | specifies a [model query scope](../../backend/data/model-queries.md) method defined in the related form model to apply to the list query always. The model that this relationship will be attached to (i.e. the parent model) is passed to this scope method as the second parameter (`$query` is the first).
**searchMode** | List | defines the search strategy to either contain all words, any word or exact phrase. Supported options: `all`, `any`, `exact`. Default: `all`.
**searchScope** | List | specifies a [model query scope](../../backend/data/model-queries.md) method defined in the related form model to apply to the search query, the first argument will contain the search term.
**filter** | List | a reference to a filter scopes definition file, see [backend list filters](../../backend/lists/filters.md).
**customPageName** | List | specify a custom variable name to use in the page URL for paginated records. Set to `false` to disable storing the page number in the URL.

These configuration values can be specified only for the **view** property.

Property | Type | Description
------------- | ------------- | -------------
**showCheckboxes** | List | displays checkboxes next to each record.
**recordUrl** | List | link each list record to another page. Eg: **users/update/:id**. The `:id` part is replaced with the record identifier.
**customViewPath** | List | specify a custom view path to override partials used by the list.
**recordOnClick** | List | custom JavaScript code to execute when clicking on a record.
**toolbarPartial** | Both | a reference to a controller partial file with the toolbar buttons. Eg: `_relation_toolbar.php`. This property overrides the `toolbarButtons` property.
**toolbarButtons** | Both | the set of buttons to display. This can be formatted as an array or a pipe separated string, or set to `false` to show no buttons. Available options are: `create`, `update`, `delete`, `add`, `remove`, `link`, & `unlink`. Example: `add|remove`. Custom button names are also supported, see [Adding Custom Toolbar Buttons](../../backend/relations/extending.md#adding-custom-toolbar-buttons).
**structure** | List | options to enable [sorting records](../../backend/lists/sorting.md) for the list.

These configuration values can be specified only for the **manage** property.

Property | Type | Description
------------- | ------------- | -------------
**title** | Both | a popup title, can refer to a [localization string](../../backend/localization/backend.md).
**context** | Form | context of the form being displayed. Can be a string or an array with keys: `create`, `update`.

## Custom Messages

Specify the `customMessages` property to override the default messages used by the Relation Controller. The values can be plain text or can refer to a [localization string](../../backend/localization/backend.md).

```yaml
customMessages:
    buttonCreate: Make Thing
    buttonDelete: Destroy Thing
```

You may also modify messages in the context of the related field being displayed. The following will override the `createButton` message for the `items` relation only.

```yaml
items:
    customMessages:
        buttonCreate: New Item!
```

The following messages are available to override as custom messages.

::: details View the list of available messages
Message | Default Message
------------- | -------------
**buttonCreate** | Create :name
**buttonCreateForm** | Create
**buttonCancelForm** | Cancel
**buttonCloseForm** | Close
**buttonUpdate** | Update :name
**buttonUpdateForm** | Update
**buttonAdd** | Add :name
**buttonAddMany** | Add Selected
**buttonAddForm** | Add
**buttonLink** | Link :name
**buttonDelete** | Delete
**buttonDeleteMany** | Delete Selected
**buttonRemove** | Remove
**buttonRemoveMany** | Remove Selected
**buttonUnlink** | Unlink
**buttonUnlinkMany** | Unlink Selected
**confirmDelete** | Are you sure?
**confirmUnlink** | Are you sure?
**titlePreviewForm** | Preview :name
**titleCreateForm** | Create :name
**titleUpdateForm** | Update :name
**titleLinkForm** | Link a New :name
**titleAddForm** | Add a New :name
**titlePivotForm** | Related :name Data
**flashCreate** | :name Created
**flashUpdate** | :name Updated
**flashDelete** | :name Deleted
**flashAdd** | :name Added
**flashLink** | :name Linked
**flashRemove** | :name Removed
**flashUnlink** | :name Unlinked
:::

## Nested Definitions

The Relation Controller supports nesting relations, in other words, managing relations through relations. A nested relationship uses the standard field nesting syntax. For example, the `countries[cities]` relation definition makes the `cities` relationship available to manage through the `countries` relationship.

```yaml
countries:
    label: Country
    form: $/acme/location/models/country/fields.yaml
    list: $/acme/location/models/country/columns.yaml

countries[cities]:
    label: City
    form: $/acme/location/models/city/fields.yaml
    list: $/acme/location/models/city/columns.yaml
```

::: tip
Nested relation definitions are designed to work seamlessly with the [relation form widget](../form-fields/relation.md), setting the `useController` property set to `true`.
:::

## Relationship Types

How the relation manager is displayed depends on the relationship definition in the target model. The relationship type will also determine the configuration requirements, these are shown in **bold**. The following relationship types are available:

### Has Many

1. Related records are displayed as a list (`view.list`).
1. Clicking a record will display an update form (`manage.form`).
1. Clicking **Add** will display a selection list (`manage.list`).
1. Clicking **Create** will display a create form (`manage.form`).
1. Clicking **Delete** will destroy the record(s).
1. Clicking **Remove** will orphan the relationship.

For example, if a **Blog Post** has many **Comments**, the target model is set as the blog post and a list of comments is displayed, using columns from the `list` definition. Clicking on a comment opens a popup form with the fields defined in `form` to update the comment. Comments can be created in the same way. Below is an example of the relation behavior configuration file.

```yaml
# config_relation.yaml
comments:
    label: Comment
    manage:
        form: $/acme/blog/models/comment/fields.yaml
        list: $/acme/blog/models/comment/columns.yaml
    view:
        list: $/acme/blog/models/comment/columns.yaml
        toolbarButtons: create|delete
```

### Belongs to Many

1. Related records are displayed as a list (`view.list`).
1. Clicking **Add** will display a selection list (`manage.list`).
1. Clicking **Create** will display a create form (`manage.form`).
1. Clicking **Delete** will destroy the pivot table record(s).
1. Clicking **Remove** will orphan the relationship.

For example, if a **User** belongs to many **Roles**, the target model is set as the user and a list of roles is displayed, using columns from the `list` definition. Existing roles can be added and removed from the user. Below is an example of the relation behavior configuration file.

```yaml
# config_relation.yaml
roles:
    label: Role
    view:
        list: $/acme/user/models/role/columns.yaml
        toolbarButtons: add|remove
    manage:
        list: $/acme/user/models/role/columns.yaml
        form: $/acme/user/models/role/fields.yaml
```

### Belongs to Many (with Pivot Data)

1. Related records are displayed as a list (`view.list`).
1. Clicking a record will display an update form (`pivot.form`).
1. Clicking **Add** will display a selection list (`manage.list`), then a data entry form (`pivot.form`).
1. Clicking **Remove** will destroy the pivot table record(s).

Continuing the example in **Belongs To Many** relations, if a role also carried an expiry date, clicking on a role will open a popup form with the fields defined in `pivot` to update the expiry date. Below is an example of the relation behavior configuration file.

```yaml
# config_relation.yaml
roles:
    label: Role
    view:
        list: $/acme/user/models/role/columns.yaml
    manage:
        list: $/acme/user/models/role/columns.yaml
    pivot:
        form: $/acme/user/models/role/fields.yaml
```

Pivot data is available when defining form fields and list columns via the `pivot` relation, see the example below.

```yaml
# config_relation.yaml
teams:
    label: Team
    view:
        list:
            columns:
                name:
                    label: Name
                pivot[team_color]:
                    label: Team color
    manage:
        list:
            columns:
                name:
                    label: Name
    pivot:
        form:
            fields:
                pivot[team_color]:
                    label: Team color
```

### Belongs To

1. Related record is displayed as a preview form (`view.form`).
1. Clicking **Create** will display a create form (`manage.form`).
1. Clicking **Update** will display an update form (`manage.form`).
1. Clicking **Link** will display a selection list (`manage.list`).
1. Clicking **Unlink** will orphan the relationship.
1. Clicking **Delete** will destroy the record.

For example, if a **Phone** belongs to a **Person** the relation manager will display a form with the fields defined in `form`. Clicking the Link button will display a list of People to associate with the Phone. Clicking the Unlink button will dissociate the Phone with the Person.

```yaml
# config_relation.yaml
person:
    label: Person
    view:
        form: $/acme/user/models/person/fields.yaml
        toolbarButtons: link|unlink
    manage:
        form: $/acme/user/models/person/fields.yaml
        list: $/acme/user/models/person/columns.yaml
```

### Has One

1. Related record is displayed as a preview form (`view.form`).
1. Clicking **Create** will display a create form (`manage.form`).
1. Clicking **Update** will display an update form (`manage.form`).
1. Clicking **Link** will display a selection list (`manage.list`).
1. Clicking **Unlink** will orphan the relationship.
1. Clicking **Delete** will destroy the record.

For example, if a **Person** has one **Phone** the relation manager will display form with the fields defined in `form` for the Phone. When clicking the Update button, a popup is displayed with the fields now editable. If the Person already has a Phone the fields are update, otherwise a new Phone is created for them.

```yaml
# config_relation.yaml
phone:
    label: Phone
    view:
        form: $/acme/user/models/phone/fields.yaml
        toolbarButtons: update|delete
    manage:
        form: $/acme/user/models/phone/fields.yaml
        list: $/acme/user/models/phone/columns.yaml
```
