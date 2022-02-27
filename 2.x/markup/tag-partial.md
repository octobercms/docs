# {% partial %}

The `{% partial %}` tag will parse a [CMS partial](../cms/partials.md) and render the partial contents on the page. To display a partial called **footer.htm**, simply pass the name after the `partial` tag quoted as a string.

```twig
{% partial "footer" %}
```

A partial inside a subdirectory can be rendered in the same way.

```twig
{% partial "sidebar/menu" %}
```

> **Note**: The [Themes documentation](../cms/themes.md#oc-subdirectories) has more details on subdirectory usage.

The partial name can also be a variable:

```twig
{% set tabName = "profile" %}
{% partial tabName %}
```

## Variables

You can pass variables to partials by specifying them after the partial name:

```twig
{% partial "blog-posts" posts=posts %}
```

You can also assign new variables for use in the partial:

```twig
{% partial "location" city="Vancouver" country="Canada" %}
```

Inside the partial, variables can be accessed like any other markup variable:

```twig
<p>Country: {{ country }}, city: {{ city }}.</p>
```

## Passing Markup as a Variable

It is possible to pass markup to a partial using the `body` attribute.

```twig
{% partial "card" body %}
    This is the card contents
{% endpartial %}
```

The contents are then available as the `body` variable.

```twig
{{ body|raw }}
```

## Setting Partial Contents to a Twig Variable

In any template you can set the partial contents to a variable with the `partial()` function. This lets you manipulate the output before display. Remember to use the `|raw` filter to prevent output escaping.

```twig
{% set cardPartial = partial('my-cards/card') %}

{{ cardPartial|raw }}
```

You may also pass variables to the partial as the second argument.

```twig
{% set cardPartial = partial('my-cards/card', { foo: 'bar' }) %}
```

## Checking a Partial Exists

The `partial()` function can be used to check if a partial exists without rendering the contents. To prevent the rendering of the partial, pass the second argument as false and it will return true or false if the partial is found.

```twig
{% if partial('my-cards/card', false) %}
    {% partial 'my-cards/card' %}
{% else %}
    <p>Card not found!</p>
{% endif %}
```
