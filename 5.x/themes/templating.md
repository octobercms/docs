---
previousPath: markup/templating.md
subtitle: Learn the Twig syntax for printing variables and adding logic to pages, layouts and partials.
---
# Twig Templating

Pages, layouts and partials use the [Twig template language](https://twig.symfony.com/doc/). October CMS adds its own tags, filters, functions and variables, so your templates can use CMS features and read information about the current page.

```twig
{% set activePage = 'blog' %}

<h1>{{ this.page.title }}</h1>

{% for post in posts %}
    <h2>{{ post.title|upper }}</h2>
{% endfor %}
```

Twig has three kinds of delimiters: `{{ }}` prints a value, `{% %}` runs a tag, and `{# #}` writes a comment.

## Printing Variables

Print a variable with double curly brackets.

```twig
{{ variable }}
```

A variable can also be an *expression*.

```twig
{{ isAjax ? 'Yes' : 'No' }}
```

Join strings with the `~` character.

```twig
{{ 'Your name: ' ~ name }}
```

October CMS provides global variables under the `this` variable, such as `this.page` and `this.theme`. See [Twig Properties](../handbook/twig-properties.md) for the full list.

## Using Tags

Tags are wrapped in `{% %}` characters and describe the template logic.

```twig
{% tag %}
```

For example, the `{% if %}` tag renders content when an expression is true.

```twig
{% if stormCloudComing %}
    Stay inside
{% else %}
    Go outside and play
{% endif %}
```

The `{% set %}` tag sets a variable inside the template.

```twig
{% set activePage = 'blog' %}
```

Tags take many different syntaxes. See [Twig Tags](../handbook/twig-tags.md) for the tags October CMS adds, such as `{% partial %}` and `{% placeholder %}`.

## Applying Filters

Filters modify a value. Apply one with a *pipe symbol* followed by the filter name.

```twig
{{ 'string'|filter }}
```

Filters can take arguments like a function.

```twig
{{ post.published_at|date('j M Y') }}
```

Filters can be applied in succession.

```twig
{{ 'October Glory'|upper|replace({'October': 'Morning'}) }}
```

See [Twig Filters](../handbook/twig-filters.md) for the filters October CMS adds, such as `|page` and `|theme`.

## Calling Functions

Functions run logic and return a result that acts as a variable.

```twig
{{ function() }}
```

Functions can take arguments.

```twig
{{ dump(variable) }}
```

For example, the `__()` function translates a string using your [theme's language files](./sites/localization.md).

```twig
{{ __('Welcome to our website') }}
```

See [Twig Functions](../handbook/twig-functions.md) for the functions October CMS adds.

## How Twig Reads Object Properties

Twig reaches into the PHP layer to read values. For convenience, `{{ foo.bar }}` performs the following checks on a PHP object.

1. Check if `foo` is an array and `bar` a valid element.
1. If not, and if `foo` is an object, check that `bar` is a valid property.
1. If not, and if `foo` is an object, check that `bar` is a valid method (even if bar is the constructor, use `__construct()` instead).
1. If not, and if `foo` is an object, check that `getBar` is a valid method.
1. If not, and if `foo` is an object, check that `isBar` is a valid method.
1. If not, return a `null` value.

## Unsupported Twig Features

Some Twig features are not supported by October CMS. Use the equivalent feature instead.

Tag | Equivalent
------------- | -------------
`{% extends %}` | Use [Layouts](./layouts.md) or `{% placeholder %}`
`{% include %}` | Use `{% partial %}` or `{% content %}`

#### See Also

::: also
* [Twig Tags](../handbook/twig-tags.md)
* [Twig Filters](../handbook/twig-filters.md)
* [Twig Functions](../handbook/twig-functions.md)
* [Twig Properties](../handbook/twig-properties.md)
* [Registering Twig Functions & Filters](./extending/twig.md)
* [Twig Documentation](https://twig.symfony.com/doc/)
:::
