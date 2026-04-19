---
subtitle: 表单字段
shortname: Dropdown
---
# Dropdown 字段

`dropdown` 字段渲染一个带有指定选项的下拉列表。有多种方式提供下拉选项，大多数涉及指定 `options` 值。

```yaml
status_type:
    type: dropdown
    label: Blog Post Status
    options:
        draft: Draft
        published: Published
        archived: Archived
```

以下[字段属性](../form-fields.md)受支持且常用。

属性 | 描述
------------- | -------------
**title** | 表单字段的标题。
**placeholder** | 字段为空时显示的文本。
**default** | 新记录使用的默认值。
**comment** | 在字段下方放置描述性注释。
**options** | 下拉列表的可用选项，以数组形式。
**optionsMethod** | 从模型上定义的方法或静态方法获取选项，例如 `Class::method`。
**optionsPreset** | 从[预定义选项列表](../define-options.md)获取选项。
**emptyOption** | 允许空选项时显示的文本。
**showSearch** | 允许用户搜索选项。默认值：`true`。
**attributes** | 应用于 select 字段的属性和值的关联数组，用于指定自定义 Select2 配置（见下文）。

通常 `options` 以键值对定义，其中值和标签是独立指定的。

```yaml
status_type:
    label: Blog Post Status
    type: dropdown
    options:
        draft: Draft
        published: Published
        archived: Archived
```

您可以使用 `default` 属性设置默认值，其中值是选项的键。

```yaml
status_type:
    label: Blog Post Status
    type: dropdown
    default: published
```

要处理没有设置值的情况，您可以指定 `emptyOption` 值以包含一个可以重新选择的空选项。

```yaml
status:
    label: Blog Post Status
    type: dropdown
    emptyOption: -- no status --
```

或者您可以使用 `placeholder` 选项来使用一个不可重新选择的"单向"空选项。

```yaml
status:
    label: Blog Post Status
    type: dropdown
    placeholder: -- select a status --
```

默认情况下，下拉列表具有搜索功能，允许快速选择值。可以通过将 `showSearch` 选项设置为 false 来禁用此功能。

```yaml
status:
    label: Blog Post Status
    type: dropdown
    showSearch: false
```

## 动态选项

以下方法涉及在插件或应用程序代码库中使用模型类。如果省略 `options` 值，框架期望在模型中定义一个名为 `get*FieldName*Options` 的方法。

使用以下示例，模型类应具有 `getStatusTypeOptions` 方法。此方法的第一个参数是此字段的当前值，第二个参数是整个表单的当前数据对象。此方法应返回格式为 **key => label** 的选项数组。

```yaml
status_type:
    label: Blog Post Status
    type: dropdown
```

这是提供下拉选项的模型类方法示例。请注意，方法名称与列名以 _TitleCase_ 格式匹配。

```php
public function getStatusTypeOptions($value, $formData)
{
    return ['all' => 'All', ...];
}
```

您也可以定义一个通用方法，作为未定义专用方法名称时的回退，它将用于模型的所有下拉字段类型。

此方法的第一个参数是字段名称，第二个参数是字段的当前值，第三个参数是整个表单的当前数据对象。它应返回格式为 **key => label** 的选项数组。

```php
public function getDropdownOptions($fieldName, $value, $formData)
{
    if ($fieldName == 'status') {
        return ['all' => 'All', ...];
    }
    else {
        return ['' => '-- none --'];
    }
}
```

要使用自定义方法名称，请在 `options` 参数中明确指定，这将精确匹配模型中定义的方法名称。

在下一个示例中，`listStatuses` 方法应在模型类中定义。此方法接收与 `getDropdownOptions` 方法相同的所有参数，并应返回格式为 **key => label** 的选项数组。

```yaml
status:
    label: Blog Post Status
    type: dropdown
    options: listStatuses
```

这是提供下拉选项的模型类自定义方法示例。

```php
public function listStatuses($fieldName, $value, $formData)
{
    return ['published' => 'Published', ...];
}
```

要为下拉字段中渲染的每个选项添加自定义图标，您可以将选项指定为多维数组，格式为 **key => [label-text, label-icon]**。

```php
public function listStatuses($fieldName, $value, $formData)
{
    return [
        'published' => ['Published', 'icon-check-circle'],
        'unpublished' => ['Unpublished', 'icon-minus-circle'],
        'draft' => ['Draft', 'icon-clock-o']
    ];
}
```

也支持显示自定义颜色，将选项指定为数组，格式为 **key => [label-text, label-color]**，其中颜色是以井号（`#`）开头的十六进制值。

```php
public function listStatuses($fieldName, $value, $formData)
{
    return [
        'published' => ['Published', '#666666'],
        'unpublished' => ['Unpublished', '#ff9999'],
        'draft' => ['Draft', '#ff0000']
    ];
}
```

如果您想调用外部类上的方法，可以通过调用任何完全限定对象上的静态方法来实现。只需在 `options` 参数中将 `ClassName::method` 语法指定为字符串即可。

```yaml
status:
    label: Blog Post Status
    type: dropdown
    options: MyAuthor\MyPlugin\Helpers\FormHelper::staticMethodOptions
```

此示例显示了在任何辅助类上定义的静态方法。第一个参数是 Model 对象，第二个参数是表单字段定义。

```php
public static function staticMethodOptions($model, $formField)
{
    return ['published' => 'Published', ...];
}
```

要使用选项组（`optgroup`），您可以使用[详细选项定义](../define-options.md)指定子项。在以下示例中，选项组的标签取自值，因此不需要重复。`children` 属性包含该组的选项，仅支持一级选项。

```php
public function getDetailedFieldOptions()
{
    return [
        'Option Group' => [
            'optgroup' => true,
            'children' => [
                1 => 'Option 1',
                2 => 'Option 2',
                // ...
            ]
        ],
    ];
}
```

## 自定义 Select2 配置

下拉字段使用 [Select2 控件](https://select2.org/)来渲染字段。在某些情况下，您可能希望为此字段指定自定义配置。这可以使用 `attributes` 属性以及 Select2 提供的[数据属性配置](https://select2.org/configuration/data-attributes)来实现。

例如，您可以微调下拉列表的自动完成行为。

```yaml
attributes:
    data-handler: onGetClientOptions
    data-minimum-input-length: 3
    data-process-Results: true
    data-ajax--delay: 300
```

与 [Tag List 字段](./widget-taglist.md)一起使用时，以下配置将在选择项目后保持下拉列表打开。

```yaml
categories:
    type: taglist
    attributes:
        data-close-on-select: false
```

#### 另请参阅

::: also
* [Tag List 表单字段](./widget-taglist.md)
* [Select2 控件](https://select2.org/)
:::
