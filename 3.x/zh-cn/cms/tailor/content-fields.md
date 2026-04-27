---
subtitle: 从定义内容的表单字段开始。
---
# 内容字段

::: aside
您可以通过[扩展 Tailor](../../extend/tailor-fields.md) 来构建自定义内容字段。
:::

内容字段是 Tailor 模块的基石，定义了字段应如何配置和显示。这些定义通常位于蓝图的 **fields** 属性下。

```yaml
fields:
    name:
        label: Full Name
        type: text
```

::: tip
可在[后端元素部分](../../element/form-fields.md)找到可用字段的完整列表。
:::

对于每个字段，您可以在适用的情况下指定以下通用属性。

属性 | 描述
------------- | -------------
**label** | 向用户显示表单字段时使用的名称。
**shortLabel** | 在列表和过滤器中使用的较短标签。
**type** | 定义此字段的渲染方式，参见[表单字段定义](../../element/form-fields.md)。默认值：text。
**span** | 将表单字段对齐到一侧。选项：auto、left、right、row、full、adaptive。默认值：`full`。
**spanClass** | 与 span `row` 选项一起使用，将表单显示为 Bootstrap 网格，例如 `spanClass: col-4`。
**size** | 为使用它的字段指定字段大小，例如 textarea 字段。
**placeholder** | 如果字段支持占位符值。
**comment** | 在字段下方放置描述性注释。
**commentAbove** | 在字段上方放置注释。
**commentHtml** | 允许注释中使用 HTML 标记。默认值：`false`。
**default** | 指定字段的默认值。对于 `dropdown`、`checkboxlist`、`radio` 和 `balloon-selector` 小部件，您可以在此指定一个选项键使其默认被选中。
**tab** | 将字段分配到选项卡。
**validation** | 定义表单字段的验证规则，参见[验证文章](../../extend/services/validation.md)了解规则定义。
**trigger** | 使用[触发器事件](../../element/form-fields.md)为此字段指定条件。
**preset** | 允许字段值由另一个字段的值初始设置，通过[输入预设转换器](../../element/form-fields.md)进行转换。
**translatable** | 在蓝图定义中使用 `multisite` 时禁用此字段的翻译。

## 列表和过滤器属性

在列表或过滤器中显示字段时，每个字段都有自己的默认设置。您可以按字段覆盖这些设置，这适合进行小的调整。对于更复杂的用例，我们建议将列和范围与字段分开定义（见下文）。

属性 | 描述
------------- | -------------
**column** | 定义字段在列表中的显示方式，参见[列表列定义](../../element/list-columns.md)。
**scope** | 定义字段在过滤器中的显示方式，参见[过滤器范围定义](../../element/filter-scopes.md)。

### 字段配置

例如，可以使用字段的 `column` 或 `scope` 属性为每个指定不同的标签。

```yaml
myfield:
    label: Form Label
    column:
        label: List Label
    scope:
        label: Filter Label
```

如果将它们设置为 `false`，则字段将被禁用并阻止其显示。

```yaml
myfield:
    label: Form Label
    column: false
    scope: false
```

`column` 类型可以设置为 `invisible`，使其默认从列表中隐藏。

```yaml
myfield:
    label: Form Label
    column: invisible
```

### 外部配置

您可以使用蓝图中的 `columns` 和 `scopes` 属性将范围和列与表单字段分开定义。使用外部配置时，默认视图将被替换为仅已定义的字段。

```yaml
scopes:
    myfield:
        label: Filter Label
        # [...]

columns:
    myfield:
        label: List Label
        # [...]

fields:
    myfield:
        label: Form Label
        # [...]
```

::: tip
**columns** 或 **scopes** 定义要有效，必须存在 **fields** 定义。要从表单中隐藏定义，使用 `hidden: true` 将其从表单中隐藏，然后使用 `hidden: false` 在列或范围中显示。
:::

列表列有可以使用的简写值。传递字符串将替换标签，传递 `true` 将包含默认列，传递 `false` 将移除该列，传递 `invisible` 将使该列不可见。

```yaml
columns:
    myfield: List Label   # 新标签
    myfield: true         # 显示
    myfield: false        # 隐藏
    myfield: invisible    # 不可见
    myfield: [...]        # 配置数组
```

过滤器范围与列表列有类似的简写值。

```yaml
scopes:
    myfield: Filter Label # 新标签
    myfield: true         # 显示
    myfield: false        # 隐藏
    myfield: [...]        # 配置数组
```

## 表单字段验证

您可以使用 `validation` 字段属性为表单字段指定验证规则，参见[验证文章](../../extend/services/validation.md)了解规则定义。

```yaml
fields:
    myfield:
        label: Featured Text
        validation: "required|min:15"
```

验证规则也可以在蓝图文件中使用 `validation` 蓝图属性进行外部定义。这允许您设置自定义属性名称和验证消息。

```yaml
validation:
    rules:
        myfield: "required|min:15"
    attributeNames:
        myfield: My Field
    customMessages:
        myfield.min: "My field has to be at least 15 characters long"

fields:
    myfield:
        label: Form Label
        # [...]
```

`unique` 验证规则会自动配置，不需要指定表名。

```yaml
unique_field:
    label: Unique Field
    validation: unique
```

`required` 验证规则支持 **create** 和 **update** 修饰符，分别仅在模型创建或更新时应用。以下规则仅在模型尚不存在时为必填。

```yaml
password:
    label: Password
    validation: "required:create"
```

## 修改核心字段

每个蓝图记录都有几个核心字段，由[模型上的属性定义](./models.md)。您可以在特定条件下修改这些字段。

Entry 默认为启用状态；但是您可以通过为 `is_enabled` 字段指定新的默认值来修改此行为。

```yaml
fields:
    is_enabled:
        default: false
```

`title` 字段的占位符是根据蓝图名称生成的；但是您可以根据用例将其自定义为更有用的内容。例如，_名字和姓氏_、_活动标题_ 或 _地点名称_。

```yaml
fields:
    title:
        placeholder: Event Title
```

在某些情况下，`title` 字段可能不是必需的，例如使用[单条目蓝图](./blueprints.md)时，您可以将 `hidden` 属性设置为 `true`。隐藏标题将禁用此字段的内置验证。

```yaml
fields:
    title:
        hidden: true
```

#### 另请参阅

::: also
* [定义表单字段](../../element/form-fields.md)
* [构建 Tailor 字段](../../extend/tailor-fields.md)
:::
