---
subtitle: 使用自定义过滤器和函数扩展 Twig。
---
# 构建 Twig 标签

可以使用[插件注册类](../extend/extending.md)的 `registerMarkupTags` 方法在 CMS 中注册自定义 Twig 过滤器和函数。本文介绍如何注册可在 CMS 和邮件模板中使用的自定义 Twig 过滤器和函数。

```php
public function registerMarkupTags()
{
    return [
        'filters' => [
            // ...Filters defined here
        ],
        'functions' => [
            // ...Functions defined here
        ]
    ];
}
```

## 注册过滤器

注册数组中的 `filters` 键可用于 Twig 过滤器。例如，`|plural` 过滤器可以通过以下值映射到全局 PHP 函数 `str_plural()`。

```php
'filters' => [
    'plural' => 'str_plural'
]
```

您也可以传递本地方法。例如，`|uppercase` 可以映射到 `$this->makeAllCaps()` 方法。

```php
'filters' => [
    'uppercase' => [$this, 'makeTextAllCaps']
]
```

在 Twig 中可以这样使用。

```twig
{{ 'my text'|uppercase }}
```

## 注册函数

与过滤器一样，`functions` 键可用于创建 Twig 函数。例如，该函数可以映射到 `Form::open()` 的静态方法调用。

```php
'functions' => [
    'form_open' => [Form::class, 'open']
]
```

静态调用还支持通配符定义。在此示例中，函数调用 `url_foobar()` 将转换为方法调用 `Url::foobar`，以此类推。

```php
'functions' => [
    'url_*' => [Url::class, '*'],
]
```

也允许传递闭包用于任一定义。

```php
'functions' => [
    'hello_world' => function() { return 'Hello World!'; }
]
```

现在在 Twig 中可以这样使用。

```twig
{{ hello_world() }}
```

## 转义输出

需要注意的是，自定义 Twig 过滤器和函数默认不会被转义。要默认启用转义，请在定义中将最后一个数组值设为 `true`。

```php
public function registerMarkupTags()
{
    return [
        'functions' => [
            // Escaped Functions
            'input' => ['input', true],

            // Raw Functions
            'link_to' => 'link_to',

            // Escaped Classes
            'str_*' => [\Str::class, '*', true],

            // Raw Classes
            'url_*' => [\Url::class, '*'],
        ],
        'filters' => [
            // Escaped Filters
            'display_name' => [fn ($user) => $user->getDisplayName(), true],

            // Raw Filters
            'avatar_url' => [fn ($user) => $user->getAvatarUrl()],

            // Escaped Classes
            'str_*' => [\Str::class, '*', true],

            // Raw Classes
            'url_*' => [\Url::class, '*'],
        ]
    ];
}
```

#### 另请参阅

::: also
* [扩展 Twig](https://twig.symfony.com/doc/3.x/advanced.html)
:::
