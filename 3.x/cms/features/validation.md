---
subtitle: Validate form submissions using the AJAX framework.
---
# Validation

Validating forms checks the user input against a set of predfined rules.

## Performing Validation

To enable validation features, include the `data-request-validate` attribute on a HTML form tag. The following is a minimal example of form validation.

```html
<form data-request="onSubmit" data-request-validate>
    <div>
        <label>Name</label>
        <input name="name" />
    </div>

    <button data-attach-loading>
        Submit
    </button>
</form>
```

Inside your [AJAX handler](../ajax/handlers.md), you may throw a [validation exception](../../extend/system/exceptions.md) using the `ValidationException` class to make a field invalid. The supplied array (first argument) should use field names for the keys and the error messages for the values.

```php
function onSubmit()
{
    if (!post('name')) {
        throw new ValidationException(['name' => 'You must give a name!']);
    }
}
```

When the AJAX framework encounters the `ValidationException`, it will automatically focus the first invalid field and display error messages, if configured.

### Validating a Single Field

In some cases you may want to validate a single field when the value changes. By including the `data-track-input` attribute alongside the `data-request` attribute, the AJAX framework will submit a request when a user types something in to the field.

```html
<form data-request-validate>
    <div>
        <label>Username</label>
        <input name="username" data-request="onCheckUsername" data-track-input />
    </div>
</form>
```

A dedicated AJAX handler can be used to validate the field. If no exception is thrown, it can be considered valid.

```php
function onCheckUsername()
{
    if (true) {
        throw new ValidationException(['username' => 'Username is taken!']);
    }
}
```

## Using the Validation Service

::: aside
View the [Validation article](../../extend/services/validation.md) to learn about the different rules you can use here.
:::

For more complex validation, you may use the `Request` facade to apply rules to the user input in bulk. The `validate` method performs validation using the specified rules (first argument), and returns the attributes and values that were validated as an array. It also throws a `ValidationException` if the validation fails.

```php
function onSubmit()
{
    $data = Request::validate([
        'name' => 'required',
        'email' => 'required|email',
    ]);

    // The code will not reach here if validation fails

    Flash::success('Jobs done!');
}
```

### Custom Error Messages & Attributes

To change the deafult validation messages, you may pass custom messages to the `validate` method. The keys in the messages array (third argument) follow the `attribute.rule` format.

```php
$messages = [
    'email.required' => 'Please type something for the email...',
    'email.email' => 'That email is not an email...!'
];

$data = Request::validate($rules, $messages);
```

If you want to keep the default validation messages, and only change the `:attribute` name used, pass custom attributes as an array (fourth argument).

```php
$attributeNames = [
    'email' => 'e-mail address'
];

$data = Request::validate($rules, [], $attributeNames);
```

## Displaying Error Messages

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

### Displaying Errors with Fields

If you prefer to show validation messages for individual fields, define an element that uses the `data-validate-for` attribute, passing the field name as the value.

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

## Working with JavaScript

To implement custom functionality for the error messages, hook into the `ajax:invalid-field` event to display the field and `ajax:promise` to reset the form on a new submission. The JavaScript events used are found in the [AJAX JavaScript API](../ajax/javascript-api.md).

```js
addEventListener('ajax:invalid-field', function(event) {
    const { fieldElement, fieldName, errorMsg, isFirst } = event.detail;
    fieldElement.classList.add('has-error');
});

addEventListener('ajax:promise', function(event) {
    event.target.closest('form').querySelectorAll('.has-error').forEach(function(el) {
        el.classList.remove('has-error');
    });
});
```

## Complete Usage Example

Below is a complete example of form validation. It calls the `onSubmitForm` event handler that triggers a loading submit button, performs validation on the form fields, then displays a successful flash message.

The `data-request-flash` attribute is used to [enable flash messages](./flash-messages.md) for successful messages and display the validation message. The `data-attach-loading` attribute is used to display a [loading indicator](./loaders.md) and prevent double submissions from misclicks.

```html
<form
    data-request="onSubmitForm"
    data-request-validate
    data-request-flash="success">
    <div>
        <label>Username</label>
        <input name="username"
            data-request="onCheckUsername"
            data-track-input
            data-attach-loading />
        <span data-validate-for="username"></span>
    </div>

    <div>
        <label>Email</label>
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

The `onSubmitForm` AJAX event handler looks at the POST data sent by the client and applies some rules to the validator. If the validation fails, a `ValidationException` is thrown, otherwise a `Flash::success` message is returned.

The `onCheckUsername` checks to see if a username is available, currently hard-coded to prevent names **admin** and **jeff** from being entered. It is checked twice, when the user types something in and when the user submits the form.

```php
function onSubmitForm()
{
    $data = Request::validate([
        'username' => 'required',
        'email' => 'required|email',
    ]);

    $this->onCheckUsername();

    Flash::success('Jobs done!');
}

function onCheckUsername()
{
    $username = strtolower(trim(post('username')));
    $isTaken = in_array($username, ['admin', 'jeff']);

    if ($isTaken) {
        throw new ValidationException(['username' => 'Username is taken!']);
    }
}
```

#### See Also

::: also
* [Validation service](../../extend/services/validation.md)
:::
