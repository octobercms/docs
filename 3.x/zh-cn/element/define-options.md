---
subtitle: 定义在许多定义中使用的 options 属性。
---
# 定义选项

通常，您可能会遇到 **options**、**optionsMethod** 或 **optionsPreset** 属性，本文更详细地描述了如何配置选项。

## 选项数组

`options` 属性应直接在定义中以键值对的形式指定选项，其中值和标签是独立指定的。

```yaml
options:
    draft: Draft
    published: Published
    archived: Archived
```

键可以是带有标签的整数。

```yaml
options:
    1: Simple
    2: Complex
```

除了简单数组外，某些字段（如 [radio 列表](./form/field-radio.md)）支持将描述作为其 `options` 值的一部分。这里值被定义为另一个数组，语法为 `key: [label, description]`。

```yaml
options:
    all: [All, Guests and customers will be able to access this page.]
    registered: [Registered only, Only logged in member will be able to access this page.]
    guests: [Guests only, Only guest users will be able to access this page.]
```

其他字段，如[下拉列表字段](./form/field-dropdown.md)，支持将图标、图片或颜色作为其 `options` 值的一部分。如果数组中的第二项以 `#` 开头，则视为颜色；如果值包含 `.`，则视为图片；否则视为图标类。

```yaml
options:
    red: [Color, '#ff0000']
    icon: [Icon, 'oc-icon-calendar']
    image: [Image, '/path/to/image.png']
```

## 选项预设

`optionsPreset` 属性指定可用于请求可用选项的预设代码。

```yaml
optionsPreset: icons
```

以下预设可用：

预设 | 描述
------ | -----------
**icons** | 列出可用的图标名称（例如：`icon-calendar`）
**phosphorIcons** | 列出可用的图标名称（例如：`ph ph-calendar`）
**locales** | 列出可用的语言区域（例如：`en-au`）
**flags** | 列出语言区域及其图标标志（例如：`[en-au, flag-au]`）
**timezones** | 列出可用的时区（例如：`Australia/Sydney`）

## 选项方法

`optionsMethod` 属性指定一个可调用的 PHP 方法，用于请求可用选项。通常，方法名称将引用关联模型的本地方法。

```yaml
optionsMethod: getMyOptionsFromModel
```

方法名称也可以是任何对象上的静态方法。

```yaml
optionsMethod: MyAuthor\MyPlugin\Helpers\FormHelper::getMyStaticMethodOptions
```

### 详细选项定义

在方法内部，可以使用详细定义来指定更高级的选项，例如为每个选项设置单独的属性。详细定义通过其关联的数组结构来标识。

```php
public function getDetailedFieldOptions()
{
    return [
        1 => [
            'label' => 'Option 1',
            'comment' => 'This is option one'
        ],
        2 => [
            'label' => 'Option 2',
            'comment' => 'This is option two',
            'disabled' => true
        ]
    ];
}
```

在可能的情况下，支持以下属性：

属性 | 描述
------------- | -------------
**label** | 向用户显示选项时使用的名称。
**comment** | 在选项标签下方放置描述性注释。
**readOnly** | 指定选项是否为只读。
**disabled** | 指定选项是否被禁用。
**hidden** | 定义选项但从不显示它。
**color** | 以十六进制颜色定义选项的状态指示器颜色（下拉列表）
**icon** | 为此选项指定图标名称（下拉列表）
**image** | 为此选项指定图片 URL（下拉列表）
**optgroup** | 如果子项应属于选项组结构，则设置为 `true`，默认值：`false`（下拉列表）
**children** | 将子选项指定为另一个数组以形成嵌套结构（复选框列表）

如果选项定义支持嵌套，请使用 `children` 属性。通常，这将为复选框列表显示结构，并为下拉列表实现选项组。

```php
public function getDetailedFieldOptions()
{
    return [
        1 => [
            'label' => 'Option 1',
            'comment' => 'This is option one',
            'children' => [
                2 => [
                    'label' => 'Option 2',
                    'comment' => 'This is option two',
                ],
                // ...
            ]
        ],
    ];
}
```

#### 另请参阅

::: also
* [Checkbox List 字段](./form/field-checkboxlist.md)
* [Dropdown 字段](./form/field-dropdown.md)
* [Radio 字段](./form/field-radio.md)
:::
