#### Creating Links

##### Link to anything relative to the application

```html
<a href="{{ '/about-us'|app }}">About Us</a>
```

##### Link to a page file name with reverse routing

```html
<a href="{{ 'about'|page }}">About Us</a>
```

##### Link to an asset file

Assets resides in the **assets/** directory of a theme

```html
<script type="text/javascript" src="{{ 'assets/js/menu.js'|theme }}"></script>
```

Assets of the same type can be combined on the fly by passing an array of files

```html
<link href="{{ ['assets/css/styles1.css', 'assets/css/styles2.css']|theme }}" rel="stylesheet">
```

#### Default variables

The following default variables are available inside the `{{this}}` variable:

* **this.page** - a reference to the current page object
* **this.layout** - a reference to the layout used by the current page
* **this.param** - a collection of the routing parameter values

Example:

```html
<html>
    <head>
        <title>{{ this.page.name }}</title>
        <meta name="description" content="{{ this.page.description }}">
    </head>
    <body class="page-{{ this.page.id }} layout-{{ this.layout.id }}">
        ...
    </body>
</html>
```

#### Flash messages

##### Display all flash messages

``` html
{% flash %}
    <div class="alert alert-{{ type }}">{{ message }}</div>
{% endflash %}
```

##### Display all messages of a given type

``` html
{% flash success %}
    <div class="alert alert-success">{{ message }}</div>
{% endflash %}
```

#### Placeholders

Placeholders allow pages to inject content to the layout defined with the **placeholder** tag. Content is then injected with the **put** tag.

For example, injecting content to the HEAD section.

##### Layout

```html
<head>
    {% placeholder head %}
</head>
```

##### Page
```html
url = "/my-page"
--
{% put head %}
    <link href="/themes/demo/assets/css/page.css" rel="stylesheet">
{% endput %}

<p>The page content goes here.</p>
```

Placeholders can have default content, that can be either replaced or complemented by a page. Example:

##### Layout

```html
{% placeholder sidebar default %}
    <p><a href="/contacts">Contact us</a></p>
{% endplaceholder %}
```

##### Page

```html
{% put sidebar %}
    <p><a href="/services">Services</a></p>
    {% default %}
{% endput %}
```

The **default** tag specifies a place where the default placeholder content should be displayed.

##### Checking a placeholder exists

You can check if a placeholder content exists by using the `placeholder()` function. Example:

```html
{% if placeholder('sidemenu') %}
    <div class="row">
        <div class="col-md-3">
            {% placeholder sidemenu %}
        </div>
        <div class="col-md-9">
            {% page %}
        </div>
    </div>
{% else %}
    {% page %}
{% endif %}
```

#### Forms

Opening and closing forms.

##### Open a form

```html
{{ form_open() }}

{{ form_open({ class => 'form-horizontal' }) }}

{{ form_open({ request: 'onUpdate' }) }}
```

* **method** - postback method. Eg:POST, GET, PUT, DELETE
* **url** - specified URL to post to.
* **route** - post to a route. eg: route.name
* **action** - post to a controller action. eg: Controller@method
* **files** - form will submit files. true|false
* **request** - request handler to postback to. eg: onSave
* **model** - form model binding

##### Open an AJAX form

```html
{{ form_ajax('onUpdate') }}

{{ form_ajax('onSave', { class => 'form-horizontal'}) }}

{{ form_ajax('onDelete', { data: { id: 2 } }) }}

{{ form_ajax('onRefresh', { update: { statistics: '#statsPanel' } }) }}
```

* **success** - javascript to execute on successful result
* **error** - javascript to execute on failed result
* **confirm** - a message to display to confirm before sending
* **redirect** - on successful result, redirect to a URL
* **update** - array of partials to update. eg: { 'partial': '#element' }
* **data** - extra data to include with the postback. eg: { isPostback: true }

##### Close a form

```html
{{ form_close() }}
```

#### Adding custom markup tags

Additional markup tags can be registered in the CMS by plugins, contained in the Plugin Information File. An example of registering a custom markup tag:

* A **filter** will manipulate a value with a specified function. Example: `{{ 'value'|uppercase }}`
* A **function** can be used by itself and takes some parameters. Example: `{{ form_open('value') }}`

```php
<?php namespace Plugins\October\Blog;

class Plugin extends System\Classes\PluginBase
{

    [...]

    public function registerMarkupTags()
    {
        return [
            'filters' => [
                // A global function, i.e str_plural()
                'plural' => 'str_plural',

                // A local method, i.e $this->makeTextAllCaps()
                'uppercase' => [$this, 'makeTextAllCaps']
            ],
            'functions' => [
                // A static method call, i.e Form::open()
                'form_open' => ['October\Rain\Html\Form', 'open'],

                // Using an inline closure
                'helloWorld' => function() { return 'Hello World!'; }
            ]
        ];
    }

    public function makeTextAllCaps($text)
    {
        return strtoupper($text);
    }

}
```
