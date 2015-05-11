# Forms

October provides the `form_open()`, `form_ajax()` and `form_close()` functions that simplify creating the FORM tags. Using the functions is not necessary, but you may find that in many cases using the functions is simpler than listing all required attributes in the standard FORM tag.

## form_open()

Opening the standard form

The next example shows several examples of opening a standard (non AJAX) form with different parameters:

    {{ form_open() }}

    {{ form_open({ class: 'form-horizontal' }) }}

    {{ form_open({ request: 'onUpdate' }) }}

The first parameter of the `form_open()` function accepts the option object. The function support the following options:

Option  | Description
------------- | -------------
**method** | request method, corresponds the **method** FORM tag attribute. Eg: POST, GET, PUT, DELETE
**request** | a handler name to execute on the server when the form is posted, see the [Handling forms](pages#handling-forms) article for details about the event handlers.
**url** | specifies URL to post the form to, corresponds the **action** FORM tag attribute.
**files** | determines whether the form will submit files, accepted values: **true** and **false**.
**model** | a model object for the form model binding.

## form_ajax()

Opening the AJAX form

The next example shows several examples of opening a AJAX form. The first parameter of the `form_ajax()` function is the AJAX handler name. The handler can be defined in the layout or page PHP [section](themes#php-section) or in a component. You may find more information about AJAX in the [AJAX Framework](ajax) article.

    {{ form_ajax('onUpdate') }}

    {{ form_ajax('onSave', { class: 'form-horizontal'}) }}

    {{ form_ajax('onDelete', { data: { id: 2 }, confirm: 'Really delete this record?' }) }}

    {{ form_ajax('onRefresh', { update: { statistics: '#statsPanel' } }) }}

The second parameter accepts the option object. The function supports the following options:

Option  | Description
------------- | -------------
**success** | JavaScript string to execute on successful result.
**error** | JavaScript string to execute on failed result.
**confirm** | a message to display to confirm before sending the request.
**redirect** | on successful result, redirect to a URL.
**update** | an array of partials to update on success in the following format: { 'partial': '#element' }.
**data** | extra data to include with the request in the following format: { 'myvar': 'myvalue' }.