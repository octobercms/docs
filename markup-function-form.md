# form()

Functions prefixed with `form_` perform tasks that are useful when dealing with forms. The helper maps directly to the `Form` PHP class and its methods. For example:

    {{ form_close() }}

is the PHP equivalent of the following:

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
**method** | Request method. Corresponds to the **method** FORM tag attribute. Eg: POST, GET, PUT, DELETE
**request** | A handler name to execute on the server when the form is posted. See the [Handling forms](../cms/pages#handling-forms) article for details about the event handlers.
**url** | Specifies URL to post the form to. Corresponds to the **action** FORM tag attribute.
**files** | Determines whether the form will submit files. Accepted values: **true** and **false**.
**model** | A model object for the form model binding.

## form_ajax()

Outputs an AJAX enabled FORM opening tag. The first parameter of the `form_ajax()` function is the AJAX handler name. The handler can be defined in the layout or page [PHP section](../cms/themes#php-section) code, it can also be defined in a component. You may find more information about AJAX in the [AJAX Framework](../ajax/introduction) article.

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
**confirm** | A confirmation message to display before sending the request.
**redirect** | On successful result, redirect to a URL.
**update** | An array of partials to update on success in the following format: { 'partial': '#element' }.
**data** | Extra data to include with the request in the following format: { 'myvar': 'myvalue' }.

## form_close()

Outputs a standard FORM closing tag. This tag is generally available to provide consistency in usage.

    {{ form_close() }}

The above example would output as the following:

    </form>
