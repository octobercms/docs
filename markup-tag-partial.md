# {% partial %}

The `{% partial %}` tag will parse a [CMS partial](../cms/partials) and render the partial contents on the page. To display a partial called **footer.htm** you pass the name after the `partial` tag quoted as a string.

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
