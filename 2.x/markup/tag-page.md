# {% page %}

The `{% page %}` tag renders the contents of a [page](../cms/pages) into a layout template.

See [layouts](../cms/layouts) for a basic example.

The `{% page %}` tag parses the raw markup from a page template. A page template may inject content both into placeholder(s) as well as define raw markup.

```
description="example layout"
==
<html>
    <head>
        {% placeholder head %}
    </head>
    <body>
        {% page %}
        ...
```

Placing content in the `head` placeholder.

```
description="example page"
==
{% put head %}
    <meta name="foo" content="bar">
{% endput %}

<p>My content.</p>
```

The page rendered with the template would result in:

```html
<html>
    <head>
        <meta name="foo" content="bar">
    </head>
    <body>
        <p>My content.</p>
        ...
```
