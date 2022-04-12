# 排序记录

October CMS 提供了对数据库记录进行排序和重新排序的功能。 对于支持结构化列表的行为，您可以定义一个 **structure** 选项来启用该功能。 各种[模型特征](../database/traits.md) 用于支持重新排序，包括嵌套集、简单树和可排序模型。

## 配置行为

[列表行为](../backend/lists.md) 后端行为当前支持使用相关定义中的 **structure** 选项重新排序记录的选项。 定义后，页面会显示带有拖动手柄的记录列表，允许对它们进行排序和重组。

```yaml
# ===================================
#  列出行为配置
# ===================================

# ...

structure:
    showTree: true
    showReorder: true
    maxDepth: 2
```

可以使用下面列出的配置选项。

选项 | 描述
------------- | -------------
**showTree** | 显示父/子记录的树层次结构。 默认值：`true`
**treeExpanded** | 默认情况下是否应展开树节点。 默认值：`true`
**showReorder** | 显示用于重新排序记录的界面。 默认值：`true`
**maxDepth** | 定义允许重新排序的最大级别。 默认值：`null`
**dragRow** | allow dragging the entire row in addition to the reorder handle. Default: `true`

## 支持的模型类型

根据要求，可以使用不同的模型接口来管理嵌套和排序的记录。 行为将根据实现的特征进行调整。

### 嵌套集

当需要一个固定的结构时，使用 `NestedTree` Trait。 这包括父子关系以及何时需要以特定顺序显示记录。

```php
class Category extends Model
{
    use \October\Rain\Database\Traits\NestedTree;
}
```

阅读有关 [数据库文档中的 NestedTree Trait](../database/traits.md#oc-nested-tree) 的更多信息。

### 简单树

当需要基本的父子关系时，使用 `SimpleTree` Trait。

```php
class Category extends Model
{
    use \October\Rain\Database\Traits\SimpleTree;
}
```

阅读有关 [数据库文档中的 SimpleTree Trait](../database/traits.md#oc-simple-tree) 的更多信息。

### 可排序模型

当需要以特定顺序显示记录时，使用 `Sortable` Trait。

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Sortable;
}
```

阅读更多关于[数据库文档中的可排序Trait](../database/traits.md#oc-sortable)。

## 对相关记录进行排序

可以使用 [Relation Behavior](../backend/relations.md) 对相关记录进行排序，下面列出了支持的关系类型。

- [一对多](../database/relations.md#relation-one-to-many)在相关模型上使用 `Sortable` 特征。
- [多对多](../database/relations.md#relation-many-to-many)在父模型上使用 `SortableRelation` 特征(见下文).

<a id="oc-sortable-relation-model"></a>
### 可排序的关系模型

当需要在数据透视表中对记录进行排序时，使用 `SortableRelation` 特征，例如 [多对多](database/relations.md#many-to-many) 关系类型。 此特征需要在关系中定义 `pivotSortable` 选项，其中值是在数据透视表中找到的可排序列名称。

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

然后在您的关系配置中，您应该启用 `showReorder` 选项并禁用 `showTree` 选项。

```yaml
roles:
    #...
    structure:
        showReorder: true
        showTree: false
```
