---
previousPath: extend/lists/structures.md
subtitle: Let users reorder records and arrange them in a tree by dragging rows in a backend list.
---
# Sorting Records

Add a **structure** property to a list to let users reorder its records with a drag handle, or arrange them in a parent and child tree. The model stores the order using one of the [model traits](../data/model-traits.md) for nested sets, simple trees or sortable models.

```yaml
# config_list.yaml

# ...

structure:
    showTree: true
    showReorder: true
    showSorting: false
    maxDepth: 2
```

## Enabling Reordering in a List

The [List Controller](./list-controller.md) and [Relation Controller](../relations/relation-controller.md) behaviors support reordering records with the **structure** property in the relevant definition, as shown above. When it is defined, the page displays the records with a drag handle, so they can be sorted and restructured.

The following properties are supported.

Property | Description
------------- | -------------
**showTree** | displays a tree hierarchy for parent/child records. Default: `true`
**treeExpanded** | if tree nodes should be expanded by default. Default: `true`
**showReorder** | displays an interface for reordering records. Default: `true`
**showSorting** | allows sorting records, disables the structure when sorted. Default: `true`
**maxDepth** | defines the maximum levels allowed for reordering. Default: `null`
**dragRow** | allow dragging the entire row in addition to the reorder handle. Default: `true`
**permissions** | the [permissions](../panel/permissions.md) that the current backend user must have to modify the structure. Supports either a string for a single permission or an array of permissions of which only one is needed to grant access.

## Choosing a Model Trait

The behavior adapts to the trait your model implements. Pick the trait that matches how your records are nested and sorted.

### Nested Set

Use the `NestedTree` trait when you need a fixed structure, with parent-child relationships and records displayed in a specific order.

```php
class Category extends Model
{
    use \October\Rain\Database\Traits\NestedTree;
}
```

Read more about the [NestedTree trait](../data/model-traits/nested-tree.md).

### Simple Tree

Use the `SimpleTree` trait when you need a basic parent-child relationship.

```php
class Category extends Model
{
    use \October\Rain\Database\Traits\SimpleTree;
}
```

Read more about the [SimpleTree trait](../data/model-traits/simple-tree.md).

### Sortable Model

Use the `Sortable` trait when records need to be displayed in a specific order, without a tree.

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Sortable;
}
```

A sortable model is not a tree, so set `showTree: false` in the structure.

```yaml
structure:
    showTree: false
    showReorder: true
```

Read more about the [Sortable trait](../data/model-traits/sortable.md).

## Sorting Related Records

The [Relation Controller](../relations/relation-controller.md) can sort related records using the **structure** property. The supported relation types are listed below.

- [Has Many](../data/relation-types/has-many.md) uses the `Sortable` trait on the related model.
- [Belongs To Many](../data/relation-types/belongs-to-many.md) uses the `SortableRelation` trait on the parent model (see below).

### Sorting Records in a Pivot Table

Use the `SortableRelation` model trait when records are sorted inside a pivot table, such as a [Belongs To Many](../data/relation-types/belongs-to-many.md) relation. The trait requires the `pivotSortable` property in the relationship definition, set to the name of the sort order column in the pivot table.

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

Then in the relation configuration, enable the `showReorder` property and disable the `showTree` property.

```yaml
roles:
    #...
    structure:
        showReorder: true
        showTree: false
```

Read more about the [SortableRelation trait](../data/model-traits/sortable-relation.md).

#### See Also

::: also
* [List Controller](./list-controller.md)
* [Model Traits](../data/model-traits.md)
* [config_relation.yaml](../../handbook/controller-config/relation.md)
:::
