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

## Checking a Partial Exists

In any template you can check if a partial content exists by using the `partial()` function. This lets you to generate different markup depending on whether the partial exists or not.

```twig
{% set cardPartial = 'my-cards/' ~ cardCode %}

{% if partial(cardPartial) %}
    {% partial cardPartial %}
{% else %}
    <p>Card not found!</p>
{% endif %}
```

Alternatively, if your partial is non-idempotent you can set a variable and render with the `|raw` filter.

```twig
{% set cardPartial = partial('my-cards/' ~ cardCode) %}

{% if cardPartial %}
    {{ cardPartial|raw }}
{% else %}
    <p>Card not found!</p>
{% endif %}
```
