# Sorting Records

October CMS provides features for sorting and reordering database records. For behaviors that support structured lists, you can define a **structure** option to enable the feature. Various [model traits](../database/traits.md) are used to support reordering including nested sets, simple trees and sortable models.

## Configuring a Behavior

The [List Behavior](../backend/lists.md) backend behavior currently support the option to reorder records using the **structure** option in the relevant definition. When defined, the page displays a list of records with a drag handle allowing them to be sorted and restructured.

```yaml
# ===================================
#  List Behavior Config
# ===================================

# ...

structure:
    showTree: true
    showReorder: true
    maxDepth: 2
```

The configuration options listed below can be used.

Option | Description
------------- | -------------
**showTree** | displays a tree hierarchy for parent/child records. Default: true.
**treeExpanded** | if tree nodes should be expanded by default. Default: true.
**showReorder** | displays an interface for reordering records. Default: true
**maxDepth** | defines the maximum levels allowed for reordering. Default: null

## Supported Model Types

Depending on the requirements, a different model interface can be used for managing nested and sorted records. The behavior will adapt depending on which trait is implemented.

### Nested Set

Use the `NestedTree` trait when a fixed structure is needed. This includes parent-child relationships and when records need to be displayed in a specific order.

```php
class Category extends Model
{
    use \October\Rain\Database\Traits\NestedTree;
}
```

Read more about the [NestedTree trait in the database documentation](../database/traits.md#oc-nested-tree).

### Simple Tree

Use the `SimpleTree` trait when a basic parent-child relationship is needed.

```php
class Category extends Model
{
    use \October\Rain\Database\Traits\SimpleTree;
}
```

Read more about the [SimpleTree trait in the database documentation](../database/traits.md#oc-simple-tree).

### Sortable Model

Use the `Sortable` trait when records need to be displayed in a specific order.

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Sortable;
}
```

Read more about the [Sortable trait in the database documentation](../database/traits.md#oc-sortable).
