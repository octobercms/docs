#### Creating Links

###### Link to anything relative to the application

```html
<a href="{{ '/about-us'|app }}">About Us</a>
```

###### Link to a page file name with reverse routing

```html
<a href="{{ 'about'|page }}">About Us</a>
```

###### Link to an asset file

Assets resides in the **assets/** directory of a theme

```html
<script type="text/javascript" src="{{ 'assets/js/menu.js'|theme }}"></script>
```

Assets of the same type can be combined on the fly by passing an array of files

```html
<link href="{{ ['assets/css/styles1.css', 'assets/css/styles2.css']|theme }}" rel="stylesheet">
```

#### Placeholders

Placeholders allow pages to inject content to the layout defined with the **placeholder** tag. Content is then injected with the **put** tag.

For example, injecting content to the HEAD section.

###### Layout

```html
<head>
    {% placeholder head %}
</head>
```

###### Page
```html
url = "/my-page"
--
{% put head %}
    <link href="/themes/demo/assets/css/page.css" rel="stylesheet">
{% endput %}

<p>The page content goes here.</p>
```

###### Layout

```html
{% placeholder sidebar default %}
    <p><a href="/contacts">Contact us</a></p>
{% endplaceholder %}
```

###### Page

```html
{% put sidebar %}
    <p><a href="/services">Services</a></p>
    {% default %}
{% endput %}
```

The **default** tag specifies a place where the default placeholder content should be displayed.
