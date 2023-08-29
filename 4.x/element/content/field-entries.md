---
subtitle: Content Field
---
# Entries

`entries` - links to other entries by UUID or handle.

```yaml
author:
    label: Author
    type: entries
    source: <uuid|handle>
```

The following properties are supported.

Property | Description
------------- | -------------
**source** | the related blueprint UUID or handle name.
**maxItems** | limits the number of entries that can be selected.
**displayMode** | modifies how the field is displayed. Supported values: `relation`, `recordfinder`, `taglist`. Default: `relation`.
**conditions** | specifies a raw where query statement to apply to the model query.
**scope** | applies a [query scope method](../../extend/database/model.md) to the **related form model**, can be a model method name or a static PHP class method (`Class::method`).
**inverse** | when defined as an inverse relationship, the name of the related field in the source blueprint.

To limit the number of selectable items, use the `maxItems` property.

```yaml
author:
    type: entries
    maxItems: 1
```

To display a record finder instead of the typical control, use the `displayMode` property. This mode is only available when one item is selectable.

```yaml
author:
    type: entries
    displayMode: recordfinder
```

When multiple items are available, the `displayMode` supports selecting items using a tag list.

```yaml
author:
    type: entries
    displayMode: taglist
```

## Applying Conditions

You can restrict the related query using SQL or PHP using the approaches below. In the examples, the related record has a field called `is_featured` that renders as a checkbox. We can limit the related records to only those that have this checkbox marked.

### SQL Query Condition

You may limit the related model using a raw SQL query using the `conditions` property.

```yaml
categories:
    label: Categories
    type: entries
    source: Blog\Category
    conditions: is_featured = true
```

### PHP Query Scopes

You may limit the related query using a PHP method with the `scope` property.

```yaml
basic_entries:
    label: Basic Entry
    type: entries
    source: Basic\Entry
    scope: App\Classes\ScopeHelper::applyScope
```

This would refer to the `App\Classes\ScopeHelper` class that may look a file located in **app/classes/ScopeHelper.php**, for example.

```php
namespace App\Classes;

class ScopeHelper
{
    public static function applyScope($query)
    {
        return $query->where('is_featured', true);
    }
}
```

## Defining the Inverse Relation

In some cases you may wish to access the relationship in reverse, such as finding all posts that belong to a certain category. The `inverse` property can be used to link the relationship in the opposite direction, where the property value is set to the field name in the source blueprint.

For example, if a **Blog\Post** blueprint has a `categories` relationship already defined.

```yaml
categories:
    type: entries
    source: Blog\Category
```

The **Blog\Category** blueprint can include a `posts` field as the `inverse` of the `categories` field found in the source blueprint (above). The field can be excluded from forms by setting the `hidden` value to `true`, and this is optional.

```yaml
posts:
    type: entries
    source: Blog\Post
    inverse: categories
    hidden: true
```

## List Column Display

By default, the entries field will display as a hyperlink to the related record.

### Display as a Counter

To display the list column to show a counter of related records, you may use the following [column configuration](../list-columns.md). The `relation` property should be set to the field name, with `relationCount` set to `true` and a `number` column type.

```yaml
categories:
    label: Categories
    type: entries
    # ...
    column:
        relation: categories
        relationCount: true
        type: number
```
