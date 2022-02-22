# this.page

You can access the current page object via `this.page` and it returns the object `Cms\Classes\Page`. This object can also be [accessed in the PHP code](../cms/pages.md#page-variables).

## Properties

`this.page` has the following properties.

### layout

Reference to the layout name used by this page, if defined. Not to be confused with `this.layout`.

```twig
{{ this.page.layout }}
```

### id

Converts the page file name and folder name to a CSS friendly identifier.

```twig
<body class="page-{{ this.page.id }}">
```

If the page file was **home/index.htm** this would generate a class name of `page-home-index`.

### title

The page title as defined by the configuration.

```twig
<h1>{{ this.page.title }}</h1>
```

### description

The page description as defined by the configuration.

```twig
<p>{{ this.page.description }}</p>
```

### meta_title

An alternative `title` field, usually more descriptive for SEO purposes.

```twig
<title>{{ this.page.meta_title }}</title>
```

### meta_description

An alternative `description` field, usually more descriptive for SEO purposes.

```twig
<meta name="description" content="{{ this.page.meta_description }}">
```

### hidden

Hidden pages are accessible only by logged-in back-end users.

```twig
{% if this.page.hidden %}
    <p>Note to other admins: We are currently working on this page.</p>
{% endif %}
```

### fileName

Page file name in the theme with extension.

### baseFileName

Page file name in the theme without the extension.
