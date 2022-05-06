---
subtitle: Learn more about the extras included with the AJAX framework.
---
# Extra Features

When using the AJAX framework, you have the option to specify the **extras** suffix which includes additional StyleSheet and JavaScript files. These features are useful when working with AJAX requests in front-end CMS pages.

```twig
{% framework extras %}
```

## Loading Indicator

The first feature you should notice is a loading indicator that is displayed on the top of the page when an AJAX request runs. The indicator hooks in to global events used by [the JavaScript AJAX framework](./javascript-api.md).

When an AJAX request starts the `ajaxPromise` event is fired that displays the indicator and puts the mouse cursor in a loading state. The `ajaxFail` and `ajaxDone` events are used to detect when the request finishes, where the indicator is hidden again.

## Form Validation

You may specify the `data-request-validate` attribute on a form to enable validation features.

```html
<form
    data-request="onSubmit"
    data-request-validate>
    <!-- ... -->
</form>
```

### Throwing a Validation Error

In the server side AJAX handler you may throw a [validation exception](../../extend/system/exceptions.md) using the `ValidationException` class to make a field invalid, where the first argument is an array. The array should use field names for the keys and the error messages for the values.

```php
function onSubmit()
{
    throw new ValidationException(['name' => 'You must give a name!']);
}
```

::: tip
You can also pass an instance of the [validation service](../../extend/services/validation.md) as the first argument of the exception.
:::

### Displaying Error Messages

Inside the form, you may display the first error message by using the `data-validate-error` attribute on a container element. The content inside the container will be set to the error message and the element will be made visible.

```html
<div data-validate-error></div>
```

To display multiple error messages, include an element with the `data-message` attribute. In this example the paragraph tag will be duplicated and set with content for each message that exists.

```html
<div class="alert alert-danger" data-validate-error>
    <p data-message></p>
</div>
```

To add custom classes on AJAX invalidation, hook into the `ajaxInvalidField` and `ajaxPromise` JS events.

```js
$(window).on('ajaxInvalidField', function(event, fieldElement, fieldName, errorMsg, isFirst) {
    $(fieldElement).closest('.form-group').addClass('has-error');
});

$(document).on('ajaxPromise', '[data-request]', function() {
    $(this).closest('form').find('.form-group.has-error').removeClass('has-error');
});
```

### Displaying Errors with Fields

Alternatively, you can show validation messages for individual fields by defining an element that uses the `data-validate-for` attribute, passing the field name as the value.

```html
<!-- Input field -->
<input name="phone" />

<!-- Validation message for the field -->
<div data-validate-for="phone"></div>
```

If the element is left empty, it will be populated with the validation text from the server. Otherwise you can specify any text you like and it will be displayed instead.

```html
<div data-validate-for="phone">
    Oops.. phone number is invalid!
</div>
```

## Loading Button

When any element contains the `data-attach-loading` attribute, the CSS class `oc-loading` will be added to it during the AJAX request. This class will spawn a loading spinner on button and anchor elements using the `:after` CSS selector.

```html
<form data-request="onSubmit">
    <button data-attach-loading>
        Submit
    </button>
</form>

<a
    href="#"
    data-request="onDoSomething"
    data-attach-loading>
    Do something
</a>
```

## Flash Messages

Specify the `data-request-flash` attribute on a form to enable the use of flash messages on successful AJAX requests.

```html
<form
    data-request="onSuccess"
    data-request-flash>
    <!-- ... -->
</form>
```

Combined with use of the `Flash` facade in the event handler, a flash message will appear after the request finishes.

```php
function onSuccess()
{
    Flash::success('You did it!');
}
```

To remain consistent with AJAX based flash messages, you can render a [standard flash message](../../markup/tag/flash.md) when the page loads by placing this code in your page or layout.

```twig
{% flash %}
    <p
        data-control="flash-message"
        class="flash-message fade {{ type }}"
        data-interval="5">
        {{ message }}
    </p>
{% endflash %}
```

## Usage Example

Below is a complete example of form validation. It calls the `onDoSomething` event handler that triggers a loading submit button, performs validation on the form fields, then displays a successful flash message.

```html
<form
    data-request="onDoSomething"
    data-request-validate
    data-request-flash>

    <div>
        <input name="name" />
        <span data-validate-for="name"></span>
    </div>

    <div>
        <input name="email" />
        <span data-validate-for="email"></span>
    </div>

    <button data-attach-loading>
        Submit
    </button>

    <div class="alert alert-danger" data-validate-error>
        <p data-message></p>
    </div>

</form>
```

The AJAX event handler looks at the POST data sent by the client and applies some rules to the validator. If the validation fails, a `ValidationException` is thrown, otherwise a `Flash::success` message is returned.

```php
function onDoSomething()
{
    $data = post();

    $rules = [
        'name' => 'required',
        'email' => 'required|email',
    ];

    $validation = Validator::make($data, $rules);

    if ($validation->fails()) {
        throw new ValidationException($validation);
    }

    Flash::success('Jobs done!');
}
```
