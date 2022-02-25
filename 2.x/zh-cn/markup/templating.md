# 模板

October 扩展了 [Twig 模板语言](https://twig.symfony.com/doc/) 增加了许多函数、标签、过滤器和变量。这些扩展允许您使用 CMS 功能并访问模板内的页面环境信息。

## 变量

模板变量使用*{{}}*打印在页面上。

```twig
{{ variable }}
```

变量也可以表示*表达式*。

```twig
{{ isAjax ? 'Yes' : 'No' }}
```

变量可以与 `~` 字符连接。

```twig
{{ 'Your name: ' ~ name }}
```

October 在 `this` 变量下提供了全局变量，如 **变量** 部分所列。

## 标签

标签是 Twig 的一项独特功能，并用 `{% %}` 字符包裹。

```twig
{% tag %}
```

标签提供了一种更流畅的方式来描述模板逻辑。

```twig
{% if stormCloudComing %}
    呆在里面
{% else %}
    出去玩
{% endif %}
```

`{% set %}` 标签可用于在模板内设置变量。

```twig
{% set activePage = 'blog' %}
```

标签可以采用许多不同的语法，并列在**标签**部分下。

## 过滤器

过滤器充当单个实例变量的修饰符，并使用*管道符号*后跟过滤器名称来应用。

```twig
{{ 'string'|filter }}
```

过滤器可以像函数一样接受参数。

```twig
{{ price|currency('USD') }}
```

过滤器可以连续应用。

```twig
{{ 'October Glory'|upper|replace({'October': 'Morning'}) }}
```

过滤器列在**Filters**部分下。

## 函数

函数允许执行逻辑并且返回结果充当变量。

```twig
{{ function() }}
```

函数可以接受参数。

```twig
{{ dump(variable) }}
```

函数列在 **Functions** 部分下。

## 访问逻辑

::: v-pre
了解 Twig 最重要的是它如何访问 PHP 层。为方便起见，`{{ foo.bar }}` 对 PHP 对象进行以下检查：
:::

1. 检查 `foo` 是否为数组，`bar` 是否为有效元素。
1. 如果不是，并且如果 `foo` 是一个对象，请检查 `bar` 是否是一个有效属性。
1. 如果不是，并且如果 `foo` 是一个对象，请检查 `bar` 是否是一个有效的方法(即使 bar 是构造函数 - 使用 `__construct()` 代替)。
1. 如果不是，并且如果`foo`是一个对象，检查`getBar`是一个有效的方法。
1. 如果不是，并且如果 `foo` 是一个对象，请检查 `isBar` 是否是一个有效的方法。
1. 如果不是，则返回一个 `null` 值。

## 不支持的功能

Twig 提供的某些功能在October不支持。它们列在下面的等效功能旁边。

标签 | 相等的
------------- | -------------
`{% extend %}` | 使用 [布局](https://octobercms.com/docs/cms/layouts) 或者 `{% placeholder %}`
`{% include %}` | 使用 `{% partial %}` 或者 `{% content %}`
