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
