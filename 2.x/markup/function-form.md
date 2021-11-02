# form()

Functions prefixed with `form_` perform tasks that are useful when dealing with forms. The helper maps directly to the `Form` PHP class and its methods. For example:

```twig
{{ form_close() }}
```

is the PHP equivalent of the following:

```php
<?= Form::close() ?>
```

> **Note**: Methods in *camelCase* should be converted to *snake_case*.

## form_open()

Outputs a standard `<form>` opening tag along with the `_session_key` and `_token` hidden fields for CSRF protection. If you are using the [AJAX Framework](../ajax/introduction.md), it is recommended that you use [`form_ajax()`](#form_ajax) instead.

```twig
{{ form_open() }}
```

Attributes can be passed in the first argument.

```twig
{{ form_open({ class: 'form-horizontal' }) }}
```

The above example would output as the following:

```html
<form class="form-horizontal">
```

There are some special options that can also be used alongside the attributes.

```twig
{{ form_open({ request: 'onUpdate' }) }}
```

The function support the following options:

Option | Description
------------- | -------------
**method** | Request method. Corresponds to the **method** FORM tag attribute. Eg: POST, GET, PUT, DELETE
**request** | A handler name to execute on the server when the form is posted. See the [Handling forms](../cms/pages.md#handling-forms) article for details about the event handlers.
**url** | Specifies URL to post the form to. Corresponds to the **action** FORM tag attribute.
**files** | Determines whether the form will submit files. Accepted values: **true** and **false**.
**model** | A model object for the form model binding.

## form_ajax()

Outputs an AJAX enabled FORM opening tag. The first parameter of the `form_ajax()` function is the AJAX handler name. The handler can be defined in the layout or page [PHP section](../cms/themes.md#php-section) code, it can also be defined in a component. You may find more information about AJAX in the [AJAX Framework](../ajax/introduction.md) article.

```twig
{{ form_ajax('onUpdate') }}
```

Attributes can be passed in the second argument.

```twig
{{ form_ajax('onSave', { class: 'form-horizontal'}) }}
```

The above example would output as the following:

```html
<form data-request="onSave" class="form-horizontal">
```

There are some special options that can also be used alongside the attributes.

```twig
{{ form_ajax('onDelete', { data: { id: 2 }, confirm: 'Really delete this record?' }) }}

{{ form_ajax('onRefresh', { update: { statistics: '#statsPanel' } }) }}
```

>**Note:** When attempting to reference a component's alias with `__SELF__` as an argument to `form_ajax()` you must first build the string you wish to use outside of the call itself. Example:

```twig
{% set targetPartial = "'" ~ __SELF__ ~ "::statistics': '#statsPanel'" %}
{{ form_ajax('onUpdate', { update: targetPartial }) }}
```

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

```twig
{{ form_close() }}
```

The above example would output as the following:

```html
</form>
```

## Passing Attributes to the Generated Element

You can pass additional attributes to the `Form::open()` method by passing an array of attribute names and values to be rendered on the final generated `<form>` element.

```php
<?= Form::open(array('id' => 'example', 'class' => 'something')) ?>
    // ..
<?= Form::close() ?>
```

The above example would output the following:

```html
<form method="POST" action="" accept-charset="UTF-8" id="example" class="something">

</form>
```
