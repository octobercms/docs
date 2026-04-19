---
subtitle: 内容字段
shortname: Entries
---
# Entries 字段

`entries` - 通过 UUID 或 handle 链接到其他条目。

```yaml
author:
    label: Author
    type: entries
    source: <uuid|handle>
```

支持以下属性。

属性 | 描述
------------- | -------------
**source** | 关联的蓝图 UUID 或 handle 名称。
**maxItems** | 限制可以选择的条目数量。
**displayMode** | 修改字段的显示方式。支持的值：`relation`、`recordfinder`、`taglist`、`controller`。默认值：`relation`。
**conditions** | 指定应用于模型查询的原始 where 查询语句。
**modelScope** | 将[模型查询范围](../../extend/database/model.md)方法应用于**关联表单模型**，可以是模型方法名或静态 PHP 类方法（`Class::method`）。
**inverse** | 当定义为反向关系时，源蓝图中关联字段的名称。

要限制可选择项目的数量，请使用 `maxItems` 属性。

```yaml
author:
    type: entries
    maxItems: 1
```

要显示记录查找器而不是典型控件，请使用 `displayMode` 属性。此模式仅在可选择一个项目时可用。

```yaml
author:
    type: entries
    displayMode: recordfinder
```

当有多个项目可用时，`displayMode` 支持使用标签列表选择项目。

```yaml
author:
    type: entries
    displayMode: taglist
```

## 应用条件

您可以使用以下方法通过 SQL 或 PHP 限制关联查询。在示例中，关联记录有一个名为 `is_featured` 的字段，渲染为复选框。我们可以将关联记录限制为仅那些已标记此复选框的记录。

### SQL 查询条件

您可以使用 `conditions` 属性通过原始 SQL 查询限制关联模型。

```yaml
categories:
    label: Categories
    type: entries
    source: Blog\Category
    conditions: is_featured = true
```

### PHP 查询范围

您可以使用 `scope` 属性通过 PHP 方法限制关联查询。

```yaml
basic_entries:
    label: Basic Entry
    type: entries
    source: Basic\Entry
    scope: App\Classes\ScopeHelper::applyScope
```

这将引用 `App\Classes\ScopeHelper` 类，该类可能是位于 **app/classes/ScopeHelper.php** 的文件，例如。

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

## 定义反向关系

在某些情况下，您可能希望反向访问关系，例如查找属于某个类别的所有文章。`inverse` 属性可用于在相反方向链接关系，其中属性值设置为源蓝图中的字段名称。

例如，如果 **Blog\Post** 蓝图已经定义了 `categories` 关系。

```yaml
categories:
    type: entries
    source: Blog\Category
```

**Blog\Category** 蓝图可以包含一个 `posts` 字段，作为源蓝图（上方）中 `categories` 字段的 `inverse`。可以通过将 `hidden` 值设置为 `true` 来从表单中排除该字段，这是可选的。

```yaml
posts:
    type: entries
    source: Blog\Post
    inverse: categories
    hidden: true
```

## 列表列显示

默认情况下，entries 字段将显示为指向关联记录的超链接。

### 显示为计数器

要将列表列显示为关联记录的计数器，您可以使用以下[列配置](../list-columns.md)。`relation` 属性应设置为字段名称，`relationCount` 设置为 `true`，列类型为 `number`。

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

## 高级记录管理

要在表单中创建、更新和删除项目，请将 `displayMode` 设置为 controller 以显示高级管理模式，由[关联控制器行为](../../extend/forms/relation-controller.md)提供支持。

```yaml
author:
    type: entries
    displayMode: controller
```

如果蓝图将 `navigation` 设置为 `false`，则默认按钮将显示 **Create** 和 **Delete**。如果定义了导航，则按钮显示 **Add** 和 **Remove**。您可以使用 `toolbarButtons` 属性自定义按钮。

```yaml
author:
    type: entries
    toolbarButtons: create|add|remove|delete
```

关联控制器中使用的各种消息取自源蓝图的 `customMessages` 属性，您也可以使用字段定义上的 `customMessages` 进行修改。

```yaml
author:
    type: entries
    customMessages:
        buttonCreate: New Author
        titleUpdateForm: Update Author
        titleCreateForm: Create Author
```

#### 另请参阅

::: also
* [嵌套项目内容字段](./field-nesteditems.md)
:::
