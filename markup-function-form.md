# form()

Functions prefixed with `form_` perform tasks that are useful when dealing with forms. The helper maps directly to the `Form` PHP class and its methods.

    {{ form_close() }}

Is the PHP equivalent of the following:

    <?= Form::close() ?>

> **Note**: Methods in *camelCase* should be converted to *snake_case*.

## form_open()

Outputs a standard FORM opening tag (non AJAX).

    {{ form_open() }}

Attributes can be passed in the first argument.

    {{ form_open({ class: 'form-horizontal' }) }}

The above example would output as the following:

    <form class="form-horizontal">

There are some special options that can also be used alongside the attributes.

    {{ form_open({ request: 'onUpdate' }) }}

The function support the following options:

Option | Description
------------- | -------------
**method** | request method, corresponds the **method** FORM tag attribute. Eg: POST, GET, PUT, DELETE
**request** | a handler name to execute on the server when the form is posted, see the [Handling forms](../cms/pages#handling-forms) article for details about the event handlers.
**url** | specifies URL to post the form to, corresponds the **action** FORM tag attribute.
**files** | determines whether the form will submit files, accepted values: **true** and **false**.
**model** | a model object for the form model binding.

## form_ajax()

Outputs an AJAX enabled FORM opening tag. The first parameter of the `form_ajax()` function is the AJAX handler name. The handler can be defined in the layout or page [PHP section](../cms/themes#php-section) code, it can also be defined in a component. You may find more information about AJAX in the [AJAX Framework](../cms/ajax) article.

    {{ form_ajax('onUpdate') }}

Attributes can be passed in the second argument.

    {{ form_ajax('onSave', { class: 'form-horizontal'}) }}

The above example would output as the following:

    <form data-request="onSave" class="form-horizontal">

There are some special options that can also be used alongside the attributes.

    {{ form_ajax('onDelete', { data: { id: 2 }, confirm: 'Really delete this record?' }) }}

    {{ form_ajax('onRefresh', { update: { statistics: '#statsPanel' } }) }}

The function support the following options:

Option | Description
------------- | -------------
**success** | JavaScript string to execute on successful result.
**error** | JavaScript string to execute on failed result.
**confirm** | a message to display to confirm before sending the request.
**redirect** | on successful result, redirect to a URL.
**update** | an array of partials to update on success in the following format: { 'partial': '#element' }.
**data** | extra data to include with the request in the following format: { 'myvar': 'myvalue' }.

## form_close()

Outputs a standard FORM closing tag. This tag is generally available to provide consistency across the usage.

    {{ form_close() }}

The above example would output as the following:

    </form>
