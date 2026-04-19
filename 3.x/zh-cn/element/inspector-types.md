---
subtitle: 了解如何定义组件属性。
---
# Inspector 类型

Inspector 类型是 CMS 组件使用的属性类型。它们在以下区域中使用：

- [CMS 组件类](../extend/cms-components.md)

所有 Inspector 类型都通过各自的 **type** 属性来标识。

```php
public function defineProperties()
{
    return [
        'maxItems' => [
            'title' => 'Max Items',
            'type' => 'string'
        ]
    ];
}
```

## 可用类型

以下 Inspector 类型可用：

<div class="content-list-p" markdown="1">

[String](./inspector/type-string.md)
[String List](./inspector/type-stringlist.md)
[Text](./inspector/type-text.md)
[Autocomplete](./inspector/type-autocomplete.md)
[Checkbox](./inspector/type-checkbox.md)
[Dropdown](./inspector/type-dropdown.md)
[Dictionary](./inspector/type-dictionary.md)
[Object](./inspector/type-object.md)
[Object List](./inspector/type-objectlist.md)
[Set](./inspector/type-set.md)

</div>

## 可用配置

属性参数通过包含以下键的数组来定义。

键 | 描述
------------- | -------------
**title** | 必填，属性标题，由 CMS 后端的组件 Inspector 使用。
**description** | 必填，属性描述，由 CMS 后端的组件 Inspector 使用。
**default** | 可选，当组件被添加到 CMS 后端的页面或布局时使用的默认属性值。
**type** | 指定属性类型，定义属性在 Inspector 中的显示方式。
**validation** | 可选，指定属性值的验证规则（见下文）。
**placeholder** | 可选，字符串和下拉列表属性的占位符。
**options** | 可选，下拉列表属性的选项数组。
**optionsMethod** | 指定组件类上的方法名以获取选项。
**depends** | 下拉列表属性依赖的属性名数组。有关更多信息，请参阅[下拉列表类型](./inspector/type-dropdown.md)。
**group** | 可选的分组名称。分组在 Inspector 中创建分区，简化用户体验。在多个属性中使用相同的分组名称可将它们组合在一起。
**showExternalParam** | 指定 Inspector 中属性的外部参数编辑器的可见性。默认值：`true`。
**ignoreIfDefault** | 设置为 `true` 以在选择匹配默认值时从数组中排除输出。默认值：`false`
**ignoreIfEmpty** | 设置为 `true` 以在选择为空值时从数组中排除输出。默认值：`false`
**sortOrder** | 指定属性在可用列表中的自定义位置（整数）。

## 验证规则

Inspector 类型支持多种可应用于属性的验证规则。验证规则可以应用于顶级属性以及对象和对象列表编辑器的内部属性定义。

```php
public function defineProperties()
{
    return [
        'name' => [
            'title' => 'Name',
            'type' => 'string',
            'validation' => [
                'required' => [
                    'message' => 'The Name field is required'
                ],
                'regex' => [
                    'message' => 'The Name field can contain only Latin letters.',
                    'pattern' => '^[a-zA-Z]+$'
                ]
            ]
        ]
    ];
}
```

`validation` 对象中的键值引用验证器（见下文）。验证器通过对象配置，其属性取决于验证器。一个属性 - `message` 对所有验证器通用。

### Required 验证器

`required` 验证器检查值是否非空。该验证器可以与任何编辑器一起使用，包括复杂编辑器（集合、字典、对象列表等）。示例：

```php
public function defineProperties()
{
    return [
        'name' => [
            'title' => 'Name',
            'type' => 'string',
            'validation' => [
                'required' => [
                    'message' => 'The Name field is required'
                ]
            ]
        ]
    ];
}
```

### Regex 验证器

`regex` 验证器使用正则表达式验证字符串值。该验证器只能与字符串类型的编辑器一起使用。示例：


```php
public function defineProperties()
{
    return [
        'name' => [
            'title' => 'Name',
            'type' => 'string',
            'validation' => [
                'regex' => [
                    'message' => 'The Name field can contain only Latin letters',
                    'pattern' => '^[a-z]+$',
                    'modifiers' => 'i'
                ]
            ]
        ]
    ];
}
```

正则表达式通过必需的 `pattern` 参数指定。`modifiers` 参数是可选的，可用于设置正则表达式修饰符。

### Integer 验证器

`integer` 验证器检查值是否为整数，并可以选择验证值是否在特定区间内。该验证器只能与字符串类型的编辑器一起使用。示例：


```php
public function defineProperties()
{
    return [
        'numOfColumns' => [
            'title' => 'Number of Columns',
            'type' => 'string',
            'validation' => [
                'integer' => [
                    'message' => 'The Number of Columns field should contain an integer value',
                    'allowNegative' => true,
                    'min' => [
                        'value' => -10,
                        'message' => 'The number of columns should not be less than -10.'
                    ],
                    'max' => [
                        'value' => 10,
                        'message' => 'The number of columns should not be greater than 10.'
                    ]
                ]
            ]
        ]
    ];
}
```

支持的参数：

* `allowNegative` - 可选，确定是否允许负值。默认情况下不允许负值。
* `min` - 可选对象，定义允许的最小值和错误消息。对象字段：
    * `value` - 定义最小值。
    * `message` - 可选，定义错误消息。
* `max` - 可选对象，定义允许的最大值和错误消息。对象字段：
    * `value` - 定义最大值。
    * `message` - 可选，定义错误消息。

### Float 验证器

`float` 验证器检查值是否为浮点数。此验证器的参数与上面描述的 **integer** 验证器的参数匹配。示例：

```php
public function defineProperties()
{
    return [
        'amount' => [
            'title' => 'Amount',
            'type' => 'string',
            'validation' => [
                'float' => [
                    'message' => 'The Amount field should contain a positive floating point value'
                ]
            ]
        ]
    ];
}
```

有效的浮点数格式：

* 10
* 10.302
* -10（如果 `allowNegative` 为 `true`）
* -10.84（如果 `allowNegative` 为 `true`）

### Length 验证器

`length` 验证器检查字符串、数组或对象是否不短于或不长于指定的值。此验证器可以与 string、text、set、string list、dictionary 和 object list 编辑器一起使用。在多值编辑器（set、string list、dictionary 和 object list）中，它验证编辑器中创建的项目数量。

::: tip
`length` 验证器不验证空值。例如，如果它应用于 set 编辑器且集合为空，则无论 `min` 和 `max` 参数值如何，验证都会通过。请将 `required` 验证器与 `length` 验证器一起使用，以确保在应用长度验证之前值不为空。
:::

```php
public function defineProperties()
{
    return [
        'name' => [
            'title' => 'Name',
            'type' => 'string',
            'validation' => [
                'length' => [
                    'min' => [
                        'value' => 2,
                        'message' => 'The name should not be shorter than two letters.'
                    ],
                    'max' => [
                        'value' => 10,
                        'message' => 'The name should not be longer than 10 letters.'
                    ]
                ]
            ]
        ]
    ];
}
```

支持的参数：

* `min` - 可选对象，定义允许的最小长度和错误消息。对象字段：
    * `value` - 定义最小值。
    * `message` - 可选，定义错误消息。
* `max` - 可选对象，定义允许的最大长度和错误消息。对象字段：
    * `value` - 定义最大值。
    * `message` - 可选，定义错误消息。
