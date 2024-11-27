---
subtitle: Extending Twig with custom filters and functions.
---
# Building Twig Tags

Custom Twig filters and functions can be registered in the CMS with the `registerMarkupTags` method of the [plugin registration class](../extend/extending.md). This article describes how to register your own Twig filters and functions that can be used in the CMS and mail templates.

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

## Registering a Filter

The `filters` key in the registration array may be used for Twig filters. For example, the `|plural` filter can be mapped to the global PHP function `str_plural()` with the following value.

```php
'filters' => [
    'plural' => 'str_plural'
]
```

You may also pass a local method. For example, `|uppercase` can be mapped to the `$this->makeAllCaps()` method.

```php
'filters' => [
    'uppercase' => [$this, 'makeTextAllCaps']
]
```

This becomes available in Twig as the following.

```twig
{{ 'my text'|uppercase }}
```

## Registering a Function

Just like filters, the `functions` key can be used to create Twig function. For example, the function could map to a static method call of `Form::open()` instead.

```php
'functions' => [
    'form_open' => [Form::class, 'open']
]
```

Static calls also support wildcard definitions. In this example, a function call of `url_foobar()` will translate to a method call of `Url::foobar` and so on.

```php
'functions' => [
    'url_*' => [Url::class, '*'],
]
```

Passing a closure is also allowed for either definition.

```php
'functions' => [
    'hello_world' => function() { return 'Hello World!'; }
]
```

This is now available in Twig as the following.

```twig
{{ hello_world() }}
```

## Escaped Output

It is important to note that custom Twig filters and functions are escaped by default. To disable escaping by default pass the last array value as `false` in the definition.

```php
public function registerMarkupTags()
{
    return [
        'functions' => [
            // Escaped Functions
            'input' => 'input',

            // Raw Functions
            'link_to' => ['link_to', false],

            // Escaped Classes
            'str_*' => [\Str::class, '*'],

            // Raw Classes
            'url_*' => [\Url::class, '*', false],
        ],
        'filters' => [
            // Escaped Filters
            'display_name' => [fn ($user) => $user->getDisplayName()],

            // Raw Filters
            'avatar_url' => [fn ($user) => $user->getAvatarUrl(), false],

            // Escaped Classes
            'str_*' => [\Str::class, '*'],

            // Raw Classes
            'url_*' => [\Url::class, '*', false],
        ]
    ];
}
```

## Advanced Options

In addition to passing the last array value as `false`, you may also pass it as an array to provide [custom options to the Twig extension](https://twig.symfony.com/doc/3.x/advanced.html). This can include passing environment and context variables to the function.

```php
public function registerMarkupTags()
{
    return [
        'filters' => [
            // Unescaped
            'rot13' => ['str_rot13', ['is_safe' => ['html']]],

            // Has Environment
            'env_filter' => [fn ($env, $string) => '...', ['needs_environment' => true]],

            // Has Context
            'context_filter' => [fn ($context, $string) => '...', ['needs_context' => true]],

            // Has Both
            'context_both' => [fn ($env, $context, $string) => '...', [
                'needs_environment' => true,
                'needs_context' => true
            ]],
        ]
    ];
}
```

#### See Also

::: also
* [Extending Twig](https://twig.symfony.com/doc/3.x/advanced.html)
:::
