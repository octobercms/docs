# {% partial %}

The `{% partial %}` tag will parse a [CMS partial](../cms/partials.md) and render the partial contents on the page. To display a partial called **footer.htm**, simply pass the name after the `partial` tag quoted as a string.

```twig
{% partial "footer" %}
```

A partial inside a subdirectory can be rendered in the same way.

```twig
{% partial "sidebar/menu" %}
```

> **Note**: The [Themes documentation](../cms/themes.md#subdirectories) has more details on subdirectory usage.

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

## Checking a partial exists

In any template you can check if a partial content exists by using the `partial()` function. This lets you to generate different markup depending on whether the partial exists or not. Example:

```twig
{% set cardPartial = 'my-cards/' ~ cardCode %}

{% if partial(cardPartial) %}
    {% partial cardPartial %}
{% else %}
    <p>Card not found!</p>
{% endif %}
```
