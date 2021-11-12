# |twig

The `|twig` filter renders the value as a Twig string inside the Twig environment.

```twig
{{ "I am {{ name }}"|twig }}
```

Where the `name` variable is **Frodo** this will output the following:

```
I am Frodo
```

It is important to remember to escape content with the `|e` filter if it may contain user input.

```twig
{{ user.name|twig|e }}
```

## Using a Dynamic Page Title

The filter can be useful for processing dynamic variables inside CMS template properties. The following example of a layout template will allow Twig variables to be used inside the page title.

```html
<html>
    <head>
        <title>October CMS - {{ this.page.title|twig|e }}</title>
    </head>
    <body><!-- ... --></body>
<html>
```

The page template can then define its title using Twig variables that are available in the global environment.

```ini
url = "/blog"
title = "{{ category.title }} - Blog"
```
