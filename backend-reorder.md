# Backend Sorting and Reordering

- [Introduction](#introduction)
- [Configuring a Behavior](#configuring-reorder)
- [Supported Model Types](#supported-models)
    - [Nested Set](#model-nested-set)
    - [Simple Tree](#model-simple-tree)
    - [Sortable Model](#model-sortable)

<a name="introduction"></a>
## Introduction

October CMS provides features for sorting and reordering database records. For behaviors that support structured lists, you can define a **structure** option to enable the feature. Various [model traits](../database/traits) are used to support reordering including nested sets, simple trees and sortable models.

<a name="configuring-reorder"></a>
## Configuring a Behavior

The [List Behavior](../backend/lists) backend behavior currently support the option to reorder records using the **structure** option in the relevant definition. When defined, the page displays a list of records with a drag handle allowing them to be sorted and restructured.

    # ===================================
    #  List Behavior Config
    # ===================================

    # ...

    structure:
        showTree: true
        showReorder: true
        maxDepth: 2

The configuration options listed below can be used.

Option | Description
------------- | -------------
**showTree** | displays a tree hierarchy for parent/child records. Default: true.
**treeExpanded** | if tree nodes should be expanded by default. Default: true.
**showReorder** | displays an interface for reordering records. Default: true
**maxDepth** | defines the maximum levels allowed for reordering. Default: null

<a name="supported-models"></a>
## Supported Model Types

Depending on the requirements, a different model interface can be used for managing nested and sorted records. The behavior will adapt depending on which trait is implemented.

<a name="model-nested-set"></a>
### Nested Set

Use the `NestedTree` trait when a fixed structure is needed. This includes parent-child relationships and when records need to be displayed in a specific order.

    class Category extends Model
    {
        use \October\Rain\Database\Traits\NestedTree;
    }

Read more about the [NestedTree trait in the database documentation](../database/traits#nested-tree).

<a name="model-simple-tree"></a>
### Simple Tree

Use the `SimpleTree` trait when a basic parent-child relationship is needed.

    class Category extends Model
    {
        use \October\Rain\Database\Traits\SimpleTree;
    }

Read more about the [SimpleTree trait in the database documentation](../database/traits#simple-tree).

<a name="model-sortable"></a>
### Sortable Model

Use the `Sortable` trait when records need to be displayed in a specific order.

    class User extends Model
    {
        use \October\Rain\Database\Traits\Sortable;
    }

Read more about the [Sortable trait in the database documentation](../database/traits#sortable).
