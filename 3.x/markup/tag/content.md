# {% content %}

The `{% content %}` tag will display a [CMS content block](../cms/content.md) on the page. To display content block called **contacts.htm** you pass the file name after the `content` tag quoted as a string.

```twig
{% content "contacts.htm" %}
```

A content block inside a subdirectory can be rendered in the same way.

```twig
{% content "sidebar/content.htm" %}
```

::: tip
The [Themes documentation](../../cms/themes/themes.md) has more details on subdirectory usage.
:::

Content blocks can be rendered as plain text:

```twig
{% content "readme.txt" %}
```

You can also use Markdown syntax:

```twig
{% content "changelog.md" %}
```

Content blocks can also be used in combination with [layout placeholders](../../cms/themes/layouts.md).

```twig
{% put sidebar %}
    {% content 'sidebar-content.htm' %}
{% endput %}
```

## Variables

You can pass variables to content blocks by specifying them after the file name:

```twig
{% content "welcome.htm" name=user.name %}
```

You can also assign new variables for use in the content:

```twig
{% content "location.htm" city="Vancouver" country="Canada" %}
```

Inside the content, variables can be accessed using a basic syntax using singular *curly brackets*:

```
<p>Country: {country}, city: {city}.</p>
```

You can also pass a collection of variables as a simple array:

```twig
{% content "welcome.htm" likes=[
    {name:'Dogs'},
    {name:'Fishing'},
    {name:'Golf'}
] %}
```

The collection of variables is accessed by using an opening and closing set of brackets:

```
<ul>
    {likes}
        <li>{name}</li>
    {/likes}
</ul>
```

> **Note**: Twig syntax is not supported in Content blocks, consider using a [CMS partial](../cms/partials.md) instead.

## Setting Contents to a Twig Variable

In any template you can set the contents to a variable with the `content()` function. This lets you manipulate the output before display. Remember to use the `|raw` filter to prevent output escaping.

```twig
{% set welcomeContent = content('welcome.htm') %}

{{ welcomeContent|raw }}
```

You may also pass variables to the content as the second argument.

```twig
{% set welcomeContent = content('welcome.htm', { foo: 'bar' }) %}
```

## Checking a Content File Exists

The `hasContent()` function can be used to check if a content exists without rendering the contents. To prevent the rendering of the content, pass the second argument as false and it will return true or false if the content file is found.

```twig
{% if hasContent('welcome.htm') %}
    {% content 'welcome.htm' %}
{% else %}
    <p>Welcome content not found!</p>
{% endif %}
```
