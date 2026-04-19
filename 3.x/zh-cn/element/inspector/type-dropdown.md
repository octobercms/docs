---
subtitle: Inspector 类型
shortname: Dropdown
---
# Dropdown Inspector 类型

`dropdown` Inspector 类型用于从一组预定义选项中进行单选。下拉和集合属性的选项列表可以是静态的或动态的。静态选项通过属性定义的 `options` 元素定义。

```php
public function defineProperties()
{
    return [
        'unit' => [
            'title' => 'Unit',
            'type' => 'dropdown',
            'default' => 'imperial',
            'placeholder' => 'Select units',
            'options' => ['metric' => 'Metric', 'imperial' => 'Imperial']
        ]
    ];
}
```

生成的输出是与所选选项对应的字符串值，例如：

```json
"unit": "metric"
```

以下[配置值](../inspector-types.md)常用。

属性 | 描述
------------- | -------------
**title** | 属性的标题。
**description** | 属性的简要描述，可选。
**default** | 指定默认字符串值，可选。
**options** | 下拉属性的选项数组，如果定义了 `get*PropertyName*Options` 方法则可选。

## 动态选项

当显示 Inspector 时，选项列表可以从服务器动态获取。如果在下拉或集合属性定义中省略了 `options` 参数，则选项列表被视为动态的。组件类必须定义一个返回选项列表的方法。方法名称应采用以下格式：`get*PropertyName*Options`，其中 **Property** 是属性名称，例如：`getCountryOptions`。该方法返回一个选项数组，选项值作为键，选项标签作为值。动态下拉列表定义示例。

```php
public function defineProperties()
{
    return [
        'country' => [
            'title' => 'Country',
            'type' => 'dropdown',
            'default' => 'us'
        ]
    ];
}

public function getCountryOptions()
{
    return ['us' => 'United states', 'ca' => 'Canada'];
}
```

动态下拉列表和集合列表可以依赖于其他属性。例如，州列表可以依赖于所选国家。依赖关系通过属性定义中的 `depends` 参数声明。下一个示例定义了两个动态下拉属性，州列表依赖于国家。

```php
public function defineProperties()
{
    return [
        'country' => [
            'title' => 'Country',
            'type' => 'dropdown',
            'default' => 'us'
        ],
        'state' => [
            'title' => 'State',
            'type' => 'dropdown',
            'default' => 'dc',
            'depends' => ['country'],
            'placeholder' => 'Select a state'
        ]
    ];
}
```

为了加载州列表，您应该知道 Inspector 中当前选择了哪个国家。Inspector 将所有属性值 POST 到 `getPropertyOptions` 处理程序，因此您可以执行以下操作。

```php
public function getStateOptions()
{
    // 从 POST 加载 country 属性值
    $countryCode = post('country');

    $states = [
        'ca' => ['ab' => 'Alberta', 'bc' => 'British columbia'],
        'us' => ['al' => 'Alabama', 'ak' => 'Alaska']
    ];

    return $states[$countryCode];
}
```

## 页面列表属性

有时组件需要创建到网站页面的链接。例如，博客文章列表包含到博客文章详情页面的链接。在这种情况下，组件应该知道文章详情页面的文件名（然后它可以使用 [page Twig 过滤器](../../markup/filter/page.md)）。October 包含一个用于创建动态下拉页面列表的辅助工具。下一个示例定义了 postPage 属性，它显示页面列表：

```php
public function defineProperties()
{
    return [
        'postPage' => [
            'title' => 'Post page',
            'type' => 'dropdown',
            'default' => 'blog/post'
        ]
    ];
}

public function getPostPageOptions()
{
    return Page::sortBy('baseFileName')->lists('baseFileName', 'baseFileName');
}
```
