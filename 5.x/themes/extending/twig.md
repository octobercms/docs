---
previousPath: extend/twig-tags.md
subtitle: Register your own Twig filters and functions in a plugin so they can be used in CMS and mail templates.
---
# Registering Twig Functions & Filters

A plugin can add its own Twig filters and functions with the `registerMarkupTags` method of the [plugin registration file](../../backend/plugins/introduction.md#registration-file). They become available in CMS templates and mail templates.

```php
public function registerMarkupTags()
{
    return [
        'filters' => [
            'plural' => 'str_plural'
        ],
        'functions' => [
            'hello_world' => fn () => 'Hello World!'
        ]
    ];
}
```

The method returns an array with a `filters` key and a `functions` key. Each entry maps a Twig name to a PHP callable.

```twig
{{ 'apple'|plural }}

{{ hello_world() }}
```

## Registering a Filter

Use the `filters` key to register Twig filters. For example, the `|plural` filter can map to the global PHP function `str_plural()`.

```php
'filters' => [
    'plural' => 'str_plural'
]
```

You can also map a filter to a method of the plugin class. The following maps `|uppercase` to the `$this->makeTextAllCaps()` method.

```php
'filters' => [
    'uppercase' => [$this, 'makeTextAllCaps']
]
```

The filter is then available in Twig.

```twig
{{ 'my text'|uppercase }}
```

## Registering a Function

Use the `functions` key to register Twig functions in the same way. For example, a function can map to the static method `Form::open()`.

```php
'functions' => [
    'form_open' => [Form::class, 'open']
]
```

### Using a Closure

Both filters and functions accept a closure.

```php
'functions' => [
    'hello_world' => function() { return 'Hello World!'; }
]
```

The function is then available in Twig.

```twig
{{ hello_world() }}
```

### Mapping Many Methods with a Wildcard

Static calls support wildcard definitions. In this example, calling `url_foobar()` in Twig calls the `Url::foobar` method, and so on for any name.

```php
'functions' => [
    'url_*' => [Url::class, '*'],
]
```

## Escaping Output

Custom Twig filters and functions escape their output by default. To output raw HTML instead, pass `false` as the last value of the definition array.

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

## Passing Options to Twig

Instead of `false`, the last value can be an array of [options for the Twig extension](https://twig.symfony.com/doc/3.x/advanced.html). This lets you mark output as safe or pass the Twig environment and context to your callable.

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
* [Extending with Plugins](./introduction.md)
* [Twig Filters](../../handbook/twig-filters.md)
* [Twig Functions](../../handbook/twig-functions.md)
* [Extending Twig](https://twig.symfony.com/doc/3.x/advanced.html)
:::
