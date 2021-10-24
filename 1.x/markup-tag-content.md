# {% content %}

The `{% content %}` tag will display a [CMS content block](../cms/content) on the page. To display content block called **contacts.htm** you pass the file name after the `content` tag quoted as a string.

    {% content "contacts.htm" %}

A content block inside a subdirectory can be rendered in the same way.

    {% content "sidebar/content.htm" %}

> **Note**: The [Themes documentation](../cms/themes#subdirectories) has more details on subdirectory usage.

Content blocks can be rendered as plain text:

    {% content "readme.txt" %}

You can also use Markdown syntax:

    {% content "changelog.md" %}

Content blocks can also be used in combination with [layout placeholders](../cms/layouts#placeholders):

    {% put sidebar %}
        {% content 'sidebar-content.htm' %}
    {% endput %}

<a name="variables"></a>
## Variables

You can pass variables to content blocks by specifying them after the file name:

    {% content "welcome.htm" name=user.name %}

You can also assign new variables for use in the content:

    {% content "location.htm" city="Vancouver" country="Canada" %}

Inside the content, variables can be accessed using a basic syntax using singular *curly brackets*:

    <p>Country: {country}, city: {city}.</p>

You can also pass a collection of variables as a simple array:

    {% content "welcome.htm" likes=[
        {name:'Dogs'},
        {name:'Fishing'},
        {name:'Golf'}
    ] %}

The collection of variables is accessed by using an opening and closing set of brackets:

    <ul>
        {likes}
            <li>{name}</li>
        {/likes}
    </ul>

> **Note**: Twig syntax is not supported in Content blocks, consider using a [CMS partial](../cms/partials) instead.
