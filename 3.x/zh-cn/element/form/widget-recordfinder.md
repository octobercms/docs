---
subtitle: 表单小部件
shortname: Record Finder
---
# Record Finder 字段

`recordfinder` - 渲染一个显示关联记录详细信息的字段。展开该字段将显示一个弹出列表以搜索大量记录。仅支持单数关系。

```yaml
user:
    label: User
    type: recordfinder
    list: ~/plugins/rainlab/user/models/user/columns.yaml
```

以下[字段属性](../form-fields.md)受支持且常用。

属性 | 描述
------------- | -------------
**label** | 向用户显示表单字段时使用的名称。
**default** | 指定默认字符串值，可选。
**comment** | 在字段下方放置描述性注释。
**keyFrom** | 关系中用作键的列名。默认值：`id`。
**nameFrom** | 关系中用于显示名称的列名。默认值：`name`。
**descriptionFrom** | 关系中用于显示描述的列名。默认值：`description`。
**title** | 在弹出窗口标题部分显示的文本。
**list** | 配置数组或列表列定义文件的引用。
**filter** | 过滤器范围定义文件的引用，请参阅[后端列表过滤器](../../extend/lists/filters.md)。
**showSetup** | 显示设置按钮以配置列表列和每页记录数。默认值：`false`
**structure** | 启用只读结构化列表以选择记录，请参阅[排序记录文章](../../extend/lists/structures.md)。设置为 `false` 以禁用，否则当模型使用树形界面时将自动启用。
**defaultSort** | 在用户偏好未定义时设置默认排序列和方向。支持字符串或包含 `column` 和 `direction` 键的数组。方向可以是 `asc`（升序，默认）或 `desc`（降序）。
**recordsPerPage** | 每页显示的记录数，使用 0 表示不分页。默认值：`10`
**conditions** | 指定应用于列表模型查询的原始 where 查询语句。
**modelScope** | 将[模型查询范围](../../extend/database/model.md)方法应用于**关联表单模型**，可以是模型方法名或静态 PHP 类方法（`Class::method`）。第一个参数将包含小部件将其值附加到的模型，即父模型。
**searchMode** | 定义搜索策略，可选包含所有词、任意词或精确短语。支持的选项：all、any、exact。默认值：`all`。
**searchScope** | 指定在**关联表单模型**中定义的[模型查询范围](../../extend/database/model.md)方法应用于搜索查询，第一个参数将包含搜索词。
**useRelation** | 使用字段名称作为关系名称直接与父模型交互的标志。默认值：`true`。禁用以仅返回所选模型的 ID
**modelClass** | 当 `useRelation` 为 `false` 时用于列出记录的模型类
**popupSize** | 更改查找器弹出窗口的大小，可选：`giant`、`huge`、`large`、`small`、`tiny` 或 `adaptive`。默认值：`huge`
**inlineOptions** | 在所选记录旁边显示带按钮的字段，如果水平空间有限，请禁用此模式。默认值：`true`。

您可以使用 `recordsPerPage` 属性限制每页的记录数。

```yaml
user:
    label: User
    type: recordfinder
    recordsPerPage: 10
```

使用 `title` 属性更改管理表单的标题。

```yaml
user:
    label: User
    type: recordfinder
    title: Find A User
```

选择记录后，可以使用 `nameFrom` 和 `descriptionFrom` 属性从模型属性中选择显示属性。

```yaml
user:
    label: User
    type: recordfinder
    nameFrom: name
    descriptionFrom: email
```

如果检测到[模型结构](../../extend/lists/structures.md)，列表将以结构形式显示。可以使用 **structure** 属性显式禁用或启用。

```yaml
user:
    label: User
    type: recordfinder
    structure: false
```

## 在 Tailor 中使用

当 `recordfinder` 字段用作 [Tailor 中的内容字段](../../cms/tailor/content-fields.md)时，需要指定 `modelClass` 属性来定义和查找模型关系。

```yaml
products:
    label: Products
    type: recordfinder
    modelClass: Acme\Test\Models\Product
    list: $/october/test/models/product/columns.yaml
```

当 `maxItems` 设置为 **1** 时，关系定义为 `belongsTo` 关系。否则，关系定义为 `belongsToMany`。

```yaml
products:
    label: Products
    type: recordfinder
    modelClass: Acme\Test\Models\Tag
    maxItems: 1
```

`inverse` 属性可以设置为关联模型上的关系名称。这将根据 `maxItems` 设置和关联模型的关系类型将关系定义更改为 `hasOne`、`hasMany` 或 `belongsToMany`。

```yaml
tags:
    label: Tags
    type: recordfinder
    modelClass: Acme\Test\Models\Tag
    inverse: tags
```

#### 另请参阅

::: also
* [Tailor 模型](../../cms/tailor/models.md)
* [数据库关系](../../extend/database/relations.md)
:::
