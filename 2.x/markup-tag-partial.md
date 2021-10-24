# {% partial %}

The `{% partial %}` tag will parse a [CMS partial](../cms/partials) and render the partial contents on the page. To display a partial called **footer.htm**, simply pass the name after the `partial` tag quoted as a string.

    {% partial "footer" %}

A partial inside a subdirectory can be rendered in the same way.

    {% partial "sidebar/menu" %}

> **Note**: The [Themes documentation](../cms/themes#subdirectories) has more details on subdirectory usage.

The partial name can also be a variable:

    {% set tabName = "profile" %}
    {% partial tabName %}

<a name="variables"></a>
## Variables

You can pass variables to partials by specifying them after the partial name:

    {% partial "blog-posts" posts=posts %}

You can also assign new variables for use in the partial:

    {% partial "location" city="Vancouver" country="Canada" %}

Inside the partial, variables can be accessed like any other markup variable:

    <p>Country: {{ country }}, city: {{ city }}.</p>

<a name="markup-variable"></a>
## Passing Markup as a Variable

It is possible to pass markup to a partial using the `body` attribute.

    {% partial "card" body %}
        This is the card contents
    {% endpartial %}

The contents are then available as the `body` variable.

    {{ body|raw }}

<a name="checking-partial-exits"></a>
## Checking a Partial Exists

In any template you can check if a partial content exists by using the `partial()` function. This lets you to generate different markup depending on whether the partial exists or not. Example:

    {% set cardPartial = 'my-cards/' ~ cardCode %}

    {% if partial(cardPartial) %}
        {% partial cardPartial %}
    {% else %}
        <p>Card not found!</p>
    {% endif %}
