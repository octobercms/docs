---
subtitle: 了解如何在列表中排序和构建记录结构。
---
# 记录排序

October CMS 提供了对数据库记录进行排序和重新排列的功能。对于支持结构化列表的行为，您可以定义 **structure** 属性来启用该功能。各种[模型 Trait](../database/traits.md) 用于支持重新排序，包括嵌套集、简单树和可排序模型。

## 配置行为

[列表控制器](./list-controller.md)和[关联控制器](../forms/form-controller.md)后台行为目前支持使用相关定义中的 **structure** 属性来重新排序记录的选项。定义后，页面将显示带有拖动手柄的记录列表，允许对它们进行排序和重新组织结构。

```yaml
# config_list.yaml

# ...

structure:
    showTree: true
    showReorder: true
    showSorting: false
    maxDepth: 2
```

可以使用以下列出的配置属性。

属性 | 描述
------------- | -------------
**showTree** | 显示父子记录的树形层次结构。默认值：`true`
**treeExpanded** | 树节点是否默认展开。默认值：`true`
**showReorder** | 显示用于重新排序记录的界面。默认值：`true`
**showSorting** | 允许排序记录，排序时禁用结构。默认值：`true`
**maxDepth** | 定义重新排序允许的最大层级数。默认值：`null`
**dragRow** | 允许拖动整行，而不仅仅是重新排序手柄。默认值：`true`
**permissions** | 当前后台用户修改结构所需的[权限](../../extend/backend/permissions.md)。支持单个权限的字符串或权限数组（只需满足其中一个即可授予访问权限）。

## 支持的模型类型

根据需求，可以使用不同的模型接口来管理嵌套和排序的记录。行为将根据实现的 Trait 自动调整。

### 嵌套集（Nested Set）

当需要固定结构时，请使用 `NestedTree` Trait。这包括父子关系以及需要按特定顺序显示记录的情况。

```php
class Category extends Model
{
    use \October\Rain\Database\Traits\NestedTree;
}
```

在[数据库文档](../database/traits.md)中阅读有关 `NestedTree` Trait 的更多信息。

### 简单树（Simple Tree）

当需要基本的父子关系时，请使用 `SimpleTree` Trait。

```php
class Category extends Model
{
    use \October\Rain\Database\Traits\SimpleTree;
}
```

在[数据库文档](../database/traits.md)中阅读有关 `SimpleTree` Trait 的更多信息。

### 可排序模型（Sortable Model）

当需要按特定顺序显示记录时，请使用 `Sortable` Trait。

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Sortable;
}
```

在[数据库文档](../database/traits.md)中阅读有关 `Sortable` Trait 的更多信息。

## 排序关联记录

可以使用[关联控制器](../forms/relation-controller.md)的 **structure** 属性来排序关联记录。下面列出了支持的关联类型。

- [一对多（Has Many）](../database/relations.md#relation-one-to-many)在关联模型上使用 `Sortable` Trait。
- [多对多（Belongs To Many）](../database/relations.md#relation-many-to-many)在父模型上使用 `SortableRelation` Trait（见下文）。

### 可排序关联模型 Trait

当需要在中间表内排序记录时（例如[多对多（Belongs To Many）](../database/relations.md#many-to-many)关联类型），请使用 `SortableRelation` 模型 Trait。此 Trait 要求在关联中定义 `pivotSortable` 属性，其值为中间表中的可排序列名。

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

然后在关联配置中，您应该启用 `showReorder` 属性并禁用 `showTree` 属性。

```yaml
roles:
    #...
    structure:
        showReorder: true
        showTree: false
```
