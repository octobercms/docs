# Sorting Records

October CMS provides features for sorting and reordering database records. For behaviors that support structured lists, you can define a **structure** option to enable the feature. Various [model traits](../database/traits.md) are used to support reordering including nested sets, simple trees and sortable models.

## Configuring a Behavior

The [List Behavior](../backend/lists.md) and [Relation Behavior](../backend/relations.md) backend behaviors currently support the option to reorder records using the **structure** option in the relevant definition. When defined, the page displays a list of records with a drag handle allowing them to be sorted and restructured.

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
**showTree** | displays a tree hierarchy for parent/child records. Default: `true`
**treeExpanded** | if tree nodes should be expanded by default. Default: `true`
**showReorder** | displays an interface for reordering records. Default: `true`
**maxDepth** | defines the maximum levels allowed for reordering. Default: `null`
**dragRow** | allow dragging the entire row in addition to the reorder handle. Default: `true`

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

## Sorting Related Records

Sorting related records is possible using the [Relation Behavior](../backend/relations.md) and the supported relation types are listed below.

- [Has Many](../database/relations.md#relation-one-to-many) uses the `Sortable` trait on the related model.
- [Belongs To Many](../database/relations.md#relation-many-to-many) uses the `SortableRelation` trait on the parent model (see below).

<a id="oc-sortable-relation-model"></a>
### Sortable Relation Model

Use the `SortableRelation` trait when records need to be sorted inside a pivot table, such as a [Belongs To Many](../database/relations.md#many-to-many) relation type. This trait requires the `pivotSortable` option to be defined in the relationship where the value is the sortable column name found in the pivot table.

```php
class User extends Model
{
    use \October\Rain\Database\Traits\SortableRelation;

    /**
     * @var array belongsToMany
     */
    public $belongsToMany = [
        'roles' => [
            Role::class,
            'table' => 'users_roles',
            'pivotSortable' => 'sort_order',
        ]
    ];
}
```

Then inside your relation configuration, you should enable the `showReorder` option and disable the `showTree` option.

```yaml
roles:
    #...
    structure:
        showReorder: true
        showTree: false
```
