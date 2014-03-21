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

#### Forms

Opening and closing forms.

##### Open a form

```html
{{ form_open() }}

{{ form_open({ class => 'form-horizontal' }) }}

{{ form_open({ request: 'onUpdate' }) }}
```

* **method** - postback method. Eg: POST, GET, PUT, DELETE
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

