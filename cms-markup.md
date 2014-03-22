# Markup Guide

- [Page links](#page-links)
- [Default variables](#default-variables)
- [Flash messages](#flash-messages)
- [Forms & inputs](#forms-inputs)
- [Further reading](#further-reading)


<a name="default-variables"></a>
## Default variables

The following default variables are available inside the `{{this}}` variable:

* **this.page** - a reference to the current page object
* **this.layout** - a reference to the layout used by the current page
* **this.param** - a collection of the routing parameter values

Example:

    <html>
        <head>
            <title>{{ this.page.name }}</title>
            <meta name="description" content="{{ this.page.description }}">
        </head>
        <body class="page-{{ this.page.id }} layout-{{ this.layout.id }}">
            ...
        </body>
    </html>



<a name="page-links"></a>
## Page links

#### Link to anything relative to the application

    <a href="{{ '/about-us'|app }}">About Us</a>

#### Link to a page file name with reverse routing

    <a href="{{ 'about'|page }}">About Us</a>

#### Link to an asset file

Assets resides in the **assets/** directory of a theme

    <script type="text/javascript" src="{{ 'assets/js/menu.js'|theme }}"></script>

Assets of the same type can be combined on the fly by passing an array of files

    <link href="{{ ['assets/css/styles1.css', 'assets/css/styles2.css']|theme }}" rel="stylesheet">



<a name="flash-messages"></a>
## Flash messages

#### Display all flash messages

    {% flash %}
        <div class="alert alert-{{ type }}">{{ message }}</div>
    {% endflash %}

#### Display all messages of a given type

    {% flash success %}
        <div class="alert alert-success">{{ message }}</div>
    {% endflash %}



<a name="forms-inputs"></a>
## Forms & inputs

Opening and closing forms.

#### Open a form

    {{ form_open() }}

    {{ form_open({ class => 'form-horizontal' }) }}

    {{ form_open({ request: 'onUpdate' }) }}

* **method** - postback method. Eg: POST, GET, PUT, DELETE
* **url** - specified URL to post to.
* **route** - post to a route. eg: route.name
* **action** - post to a controller action. eg: Controller@method
* **files** - form will submit files. true|false
* **request** - request handler to postback to. eg: onSave
* **model** - form model binding

#### Open an AJAX form

    {{ form_ajax('onUpdate') }}

    {{ form_ajax('onSave', { class => 'form-horizontal'}) }}

    {{ form_ajax('onDelete', { data: { id: 2 } }) }}

    {{ form_ajax('onRefresh', { update: { statistics: '#statsPanel' } }) }}

* **success** - javascript to execute on successful result
* **error** - javascript to execute on failed result
* **confirm** - a message to display to confirm before sending
* **redirect** - on successful result, redirect to a URL
* **update** - array of partials to update. eg: { 'partial': '#element' }
* **data** - extra data to include with the postback. eg: { isPostback: true }

#### Close a form

    {{ form_close() }}



<a name="further-reading"></a>
## Further Reading

* [Markup guide - Twig documentation](http://twig.sensiolabs.org/doc/templates.html)
