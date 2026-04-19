---
subtitle: 了解如何使用 Twig 模板来显示动态内容。
---
# 模板

October CMS 通过一系列功能、标签、过滤器和变量扩展了 [Twig 模板语言](https://twig.symfony.com/doc/)。这些扩展允许你在模板中使用 CMS 功能并访问页面环境信息。

## 变量

模板变量使用*双花括号*在页面上输出。

```twig
{{ variable }}
```

变量也可以表示*表达式*。

```twig
{{ isAjax ? 'Yes' : 'No' }}
```

变量可以使用 `~` 字符进行拼接。

```twig
{{ 'Your name: ' ~ name }}
```

October 在 `this` 变量下提供全局变量，详见**变量**部分。

## 标签

标签是 Twig 的独特功能，使用 `{% %}` 字符包裹。

```twig
{% tag %}
```

标签提供了一种更流畅的方式来描述模板逻辑。

```twig
{% if stormCloudComing %}
    Stay inside
{% else %}
    Go outside and play
{% endif %}
```

`{% set %}` 标签可用于在模板内设置变量。

```twig
{% set activePage = 'blog' %}
```

标签可以有多种不同的语法，详见**标签**部分。

## 过滤器

过滤器作为变量的单次修饰符，通过*管道符号*后跟过滤器名称来应用。

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

过滤器列表详见**过滤器**部分。

## 功能

功能允许执行逻辑，其返回结果作为变量使用。

```twig
{{ function() }}
```

功能可以接受参数。

```twig
{{ dump(variable) }}
```

功能列表详见**功能**部分。

## 访问逻辑

::: v-pre
关于 Twig 最重要的是了解它如何访问 PHP 层。为方便起见，`{{ foo.bar }}` 会对 PHP 对象执行以下检查：
:::

1. 检查 `foo` 是否为数组且 `bar` 是否为有效元素。
1. 如果不是，且 `foo` 是对象，则检查 `bar` 是否为有效属性。
1. 如果不是，且 `foo` 是对象，则检查 `bar` 是否为有效方法（即使 bar 是构造函数——请使用 `__construct()` 代替）。
1. 如果不是，且 `foo` 是对象，则检查 `getBar` 是否为有效方法。
1. 如果不是，且 `foo` 是对象，则检查 `isBar` 是否为有效方法。
1. 如果都不是，则返回 `null` 值。

## 不支持的功能

Twig 提供的一些功能不被 October CMS 支持。下面列出了这些功能及其等效替代方案。

标签 | 等效替代
------------- | -------------
`{% extend %}` | 使用[布局](../cms/themes/layouts.md)或 `{% placeholder %}`
`{% include %}` | 使用 `{% partial %}` 或 `{% content %}`
