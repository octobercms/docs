---
subtitle: Form Widget
---
# Record Finder

`recordfinder` - renders a field with details of a related record. Expanding the field displays a popup list to search large amounts of records. Supported by singular relationships only.

```yaml
user:
    label: User
    type: recordfinder
    list: ~/plugins/rainlab/user/models/user/columns.yaml
```

The following [field properties](../form-fields.md) are supported and commonly used.

Property | Description
------------- | -------------
**label** | a name when displaying the form field to the user.
**default** | specifies a default string value, optional.
**comment** | places a descriptive comment below the field.
**keyFrom** | the name of column to use in the relation used for key. Default: `id`.
**nameFrom** | the column name to use in the relation used for displaying the name. Default: `name`.
**descriptionFrom** | the column name to use in the relation used for displaying a description. Default: `description`.
**title** | text to display in the title section of the popup.
**list** | a configuration array or reference to a list column definition file.
**filter** | a reference to a filter scopes definition file, see [backend list filters](../../extend/lists/filters.md).
**showSetup** | displays a setup button to configure the list columns and records per page. Default: `false`
**defaultSort** | sets a default sorting column and direction when user preference is not defined. Supports a string or an array with keys `column` and `direction`. The direction can be `asc` for ascending (default) or `desc` for descending order.
**recordsPerPage** | records to display per page, use 0 for no pages. Default: `10`
**conditions** | specifies a raw where query statement to apply to the list model query.
**scope** | applies a [query scope method](../../extend/database/model.md) to the **related form model**, can be a model method name or a static PHP class method (`Class::method`). The first argument will contain the model that the widget will be attaching its value to, i.e. the parent model.
**searchMode** | defines the search strategy to either contain all words, any word or exact phrase. Supported options: all, any, exact. Default: `all`.
**searchScope** | specifies a [query scope method](../../extend/database/model.md) defined in the **related form model** to apply to the search query, the first argument will contain the search term.
**useRelation** | flag for using the name of the field as a relation name to interact with directly on the parent model. Default: `true`. Disable to return just the selected model's ID
**modelClass** | class of the model to use for listing records when `useRelation` is `false`
**popupSize** | change the size of the finder popup used, either: `giant`, `huge`, `large`, `small`, `tiny` or `adaptive`. Default: `huge`
**inlineOptions** | displays the field with buttons alongside the selected record, disable this mode if horizontal space is limited. Default: `true`.

You may limit the number of records per page using the `recordsPerPage` property.

```yaml
user:
    label: User
    type: recordfinder
    recordsPerPage: 10
```

Use the `title` property to change the title of the management form.

```yaml
user:
    label: User
    type: recordfinder
    title: Find A User
```

When a record is selected, the display attributes can be chosen from model attributes using the `nameFrom` and `descriptionFrom` properties.

```yaml
user:
    label: User
    type: recordfinder
    nameFrom: name
    descriptionFrom: email
```

## Usage in Tailor

When the `recordfinder` field is used as a [content field in Tailor](../../cms/tailor/content-fields.md), it requires the `modelClass` property to be specified to define and locate the model relation.

```yaml
products:
    label: Products
    type: recordfinder
    modelClass: Acme\Test\Models\Product
    list: $/october/test/models/product/columns.yaml
```

When the `maxItems` is set to **1**, the relation is defined as a `belongsTo` relation. Otherwise, the relation is defined as `belongsToMany`.

```yaml
products:
    label: Products
    type: recordfinder
    modelClass: Acme\Test\Models\Tag
    maxItems: 1
```

The `inverse` property can be set to the relation name on the related model. This will change the relation definition to `hasOne`, `hasMany` or `belongsToMany` based on the `maxItems` setting and relation type of the related model.

```yaml
tags:
    label: Tags
    type: recordfinder
    modelClass: Acme\Test\Models\Tag
    inverse: tags
```

#### See Also

::: also
* [Tailor Models](../../cms/tailor/models.md)
* [Database Relations](../../extend/database/relations.md)
:::
