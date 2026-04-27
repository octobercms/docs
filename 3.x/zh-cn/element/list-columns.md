---
subtitle: 了解如何在列表结构中定义列。
---
# 列表列

列表列是列表使用的列定义。它们在以下区域中使用。

- [后端列表控制器](../extend/lists/list-controller.md)
- [后端关联控制器](../extend/forms/relation-controller.md)

所有列表列都通过各自的 **type** 属性来标识。

```yaml
columns:
    mycolumn:
        type: number
        # ...
```

## 可用列

以下列表列可用：

<div class="content-list-p" markdown="1">

[Text](./lists/column-text.md)
[Number](./lists/column-number.md)
[Image](./lists/column-image.md)
[Switch](./lists/column-switch.md)
[Summary](./lists/column-summary.md)
[Date & Time](./lists/column-datetime.md)
[Selectable](./lists/column-selectable.md)
[Linkage](./lists/column-linkage.md)
[Partial](./lists/column-partial.md)
[Color Picker](./lists/column-colorpicker.md)
[Currency](./lists/column-currency.md)

</div>

## 列属性

对于每个列，您可以指定以下属性（如适用）：

属性 | 描述
------------- | -------------
**label** | 向用户显示列表列时使用的名称。
**type** | 定义此列的渲染方式。
**default** | 当值为空时，指定列的默认值。
**searchable** | 将此列包含在列表搜索结果中。默认值：`false`。
**invisible** | 指定此列是否默认隐藏。默认值：`false`。
**sortable** | 指定此列是否可以排序。默认值：`true`。
**sortableDefault** | 指定此列是否默认排序。这应仅在单个可排序列上使用。支持的值：`asc`、`desc`。
**clickable** | 如果设置为 false，则在点击列时禁用默认的点击行为。默认值：true。
**select** | 定义用于值的自定义 SQL select 语句。如果指定了 `relation`，则此项引用关联数据库表上的列。
**valueFrom** | 定义用于源值的模型属性。如果指定了 `relation`，则此项引用关联的属性并预加载该关联。
**displayFrom** | 定义用于显示值的模型属性。
**relation** | 定义作为源的模型关联名称，与 `select` 或 `valueFrom` 一起使用。
**relationCount** | 将关联记录的数量显示为列值。必须与 `relation` 选项一起使用。默认值：`false`
**relationWith** | 在列表查询中预加载指定的关联定义。有助于提高嵌套列选择的性能。
**cssClass** | 为列容器分配 CSS 类。
**headCssClass** | 为列标题容器分配 CSS 类。
**width** | 设置列宽，可以用百分比（10%）或像素（50px）指定。可以有一个未指定宽度的列，它将拉伸以占用可用空间。
**align** | 指定列对齐方式。可能的值为 `left`、`right` 和 `center`。
**permissions** | 当前后端用户必须拥有的[权限](../extend/backend/permissions.md)才能使用该列。支持单个权限的字符串或权限数组（只需其中一个即可授予访问权限）。
**order** | 确定显示顺序时的数值权重，默认值每列递增 100 点。
**after** | 使用显示顺序（+1）将此列放置在另一个现有列名之后。
**before** | 使用显示顺序（-1）将此列放置在另一个现有列名之前。
**tooltip** | 在列标签后添加带有工具提示的图标。请参阅下面的更多详细设置。

### 自定义值选择

可以更改每列的源值和显示值。如果要从另一列获取列值，请使用 `valueFrom` 选项。

```yaml
other_name:
    label: Something Great
    valueFrom: name
```

如果要保留源列值但显示来自模型属性的不同值，请使用 `displayFrom` 选项。

```yaml
status_code:
    label: Status
    displayFrom: status_label
```

这主要适用于使用[模型访问器](../extend/database/mutators.md)修改显示值的情况。当您想显示某个值但按不同的值进行排序和搜索时，这很有用。

```php
public function getStatusLabelAttribute()
{
    return title_case($this->status_code);
}
```

### 嵌套列选择

在某些情况下，从嵌套数据结构中检索列值是有意义的，例如[模型关联](../extend/database/relations.md)列或 [jsonable 数组](../extend/system/models.md)。以下示例将在 PHP 中分别查找 `$record->content->title` 或 `$record->content['title']` 的值。

```yaml
content[title]:
    name: Title
    sortable: false
```

这样做的唯一缺点是该列不能使用 searchable 或 sortable 选项。要使列可搜索，出于性能原因，我们建议使用[模型事件](../extend/database/model.md)将其值复制到本地数据库表。或者，您可以使用下面进一步描述的 `relation` 属性。

### 直接 SQL 选择

`select` 属性允许您使用自定义 select 语句创建列。任何有效的 SQL SELECT 语句都可以在此使用。

```yaml
full_name:
    label: Full Name
    select: concat(first_name, ' ', last_name)
```

### 关联列选择

`relation` 属性允许您将关联列作为数据库查询的一部分显示，从而允许对该列进行搜索和排序。`relation` 设置为[模型关联](../database/relations.md)的名称。在下一个示例中，**name** 值将被转换为在关联模型中找到的 name 属性（例如：`$model->name`）。

```yaml
group_name:
    label: Group
    relation: groups
    select: name
```

要显示显示关联记录数量的列，请使用 `relationCount` 属性。

```yaml
users_count:
    label: Users
    type: number
    relation: users
    relationCount: true
```

::: warning
注意不要将关联命名为与现有数据库列相同的名称。例如，使用名称 `group_id` 可能由于命名冲突而破坏 group 关联。
:::

### 工具提示

`tooltip` 属性通过在列标题中添加信息图标来增强列表列。将鼠标悬停在此图标上会显示工具提示，提供有关该列的额外上下文或详细信息。此功能有助于为用户提供指导或说明以理解列内容。

```yaml
count:
    label: Count
    type: number
    tooltip: Number of users in the group
```

除了提供工具提示 `title` 外，您还可以指定 `icon`（[可用图标](../element/available-icons.md)）和工具提示的 `placement`（`right`、`bottom`、`left`，默认值为 `top`）。

```yaml
count:
    label: Count
    type: number
    tooltip:
        title: Number of users in the group
        placement: bottom
        icon: icon-users
```
