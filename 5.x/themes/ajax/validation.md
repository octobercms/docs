---
previousPath: cms/features/validation.md
subtitle: Check form input on the server and show error messages in the form or as flash messages.
---
# Validating Forms

Validation checks user input against a set of rules before your handler saves it. With the [AJAX framework](./introduction.md), a handler that rejects the input makes the framework focus the first invalid field and display the error message. Add the `data-request-flash` attribute to the form to show the message as a [flash message](./flash-messages.md).

```html
<form data-request="onSubmit" data-request-flash>
    <div>
        <label>Name</label>
        <input name="name" />
    </div>

    <button data-attach-loading>
        Submit
    </button>
</form>
```

Inside your [AJAX handler](./handlers.md), throw a [validation exception](../../backend/services/exceptions.md) with the `ValidationException` class to make a field invalid. The array in the first argument uses field names for the keys and error messages for the values.

```php
function onSubmit()
{
    if (!post('name')) {
        throw new ValidationException(['name' => 'You must give a name!']);
    }
}
```

Without the `data-request-flash` attribute, the error message is displayed as an alert window.

::: tip
Flash messages and inline error messages are extra features, so the layout must include the `{% framework extras %}` tag. See [Including the Framework](./introduction.md#including-the-framework).
:::

## Validating with Rules

::: aside
View the [Validation article](../../backend/services/validation.md) to learn about the rules you can use here.
:::

For more complex validation, use the `Request` facade to apply rules to the input in bulk. The `validate` method checks the input against the rules in the first argument and returns the validated attributes and values as an array. It throws a `ValidationException` if validation fails.

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

### Customizing Error Messages and Attribute Names

To change the default validation messages, pass custom messages to the `validate` method. The keys in the messages array (second argument) follow the `attribute.rule` format.

```php
$messages = [
    'email.required' => 'Please type something for the email...',
    'email.email' => 'That email is not an email...!'
];

$data = Request::validate($rules, $messages);
```

To keep the default messages and change only the `:attribute` name they use, pass custom attribute names as an array (third argument).

```php
$attributeNames = [
    'email' => 'e-mail address'
];

$data = Request::validate($rules, [], $attributeNames);
```

## Showing Errors Inside the Form

To display error messages inside the form, add the `data-request-validate` attribute to the form tag. The following form shows the error message in a container element.

```html
<form data-request="onSubmit" data-request-validate>
    <div class="alert alert-danger" data-validate-error>
        <!-- Validation Message -->
    </div>

    <div>
        <label>Name</label>
        <input name="name" />
    </div>

    <button data-attach-loading>
        Submit
    </button>
</form>
```

The `data-validate-error` attribute marks the container for the first error message. The framework sets the content of the container to the error message and makes it visible.

```html
<div data-validate-error></div>
```

To display every error message, include an element with the `data-message` attribute inside the container. The framework copies the element once for each message and sets its content.

```html
<div class="alert alert-danger" data-validate-error>
    <p data-message></p>
</div>
```

### Showing Errors Next to Each Field

To show the message for an individual field, add an element with the `data-validate-for` attribute and pass the field name as the value.

```html
<!-- Input field -->
<input name="phone" />

<!-- Validation message for the field -->
<div data-validate-for="phone"></div>
```

When the element is empty, the framework fills it with the validation text from the server. Otherwise, it displays the text you wrote instead.

```html
<div data-validate-for="phone">
    Oops.. phone number is invalid!
</div>
```

### Showing Errors as Flash Messages Too

When you use the `data-request-validate` attribute together with the [`data-request-flash` attribute](./flash-messages.md), validation errors show inside the form and as a flash message.

```html
<form
    data-request-validate
    data-request-flash>
```

To show validation errors inside the form only, exclude the **validate** type from the flash messages.

```html
<form
    data-request-validate
    data-request-flash="-validate">
```

## Validating a Field as the User Types

To validate a single field when its value changes, add the `data-track-input` attribute next to the `data-request` attribute on the field. The AJAX framework sends a request when the user types something in the field.

```html
<form data-request-validate>
    <div>
        <label>Username</label>
        <input name="username" data-request="onCheckUsername" data-track-input />
    </div>
</form>
```

Use a dedicated AJAX handler to validate the field. If it throws no exception, the field is valid.

```php
function onCheckUsername()
{
    if (true) {
        throw new ValidationException(['username' => 'Username is taken!']);
    }
}
```

## Styling Invalid Fields with JavaScript

To style the invalid fields themselves, listen to the `ajax:invalid-field` event to mark each field, and the `ajax:promise` event to reset the form on a new submission. The `ajax:invalid-field` event fires on the window object for each invalid field, with the `element`, `fieldName`, `errorMsg` and `isFirst` values in `event.detail`. See the [JavaScript API](./javascript-api.md) for the other AJAX events.

The following applies the `is-invalid` class, which pairs with the [Bootstrap validation styles](https://getbootstrap.com/docs/5.3/forms/validation/) and a sibling `invalid-feedback` element. Substitute any class you prefer.

```js
addEventListener('ajax:invalid-field', function(event) {
    const { element, fieldName, errorMsg, isFirst } = event.detail;
    element.classList.add('is-invalid');
});

addEventListener('ajax:promise', function(event) {
    event.target.closest('form').querySelectorAll('.is-invalid').forEach(function(el) {
        el.classList.remove('is-invalid');
    });
});
```

## Complete Example

The following form calls the `onSubmitForm` handler with a loading submit button, validates the form fields, then displays a success flash message.

The `data-request-flash` attribute [enables flash messages](./flash-messages.md) for the success message and the validation message. The `data-attach-loading` attribute displays a [loading indicator](./loaders.md) and prevents double submissions from misclicks.

```html
<form
    data-request="onSubmitForm"
    data-request-validate
    data-request-flash>
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

The `onSubmitForm` handler applies rules to the POST data sent by the client. If validation fails, it throws a `ValidationException`. Otherwise it sets a `Flash::success` message.

The `onCheckUsername` handler checks whether a username is available. It is hard-coded to reject the names **admin** and **jeff**. The check runs twice: when the user types in the field and when the user submits the form.

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
* [Validation service](../../backend/services/validation.md)
* [Validation trait](../../backend/data/model-traits.md)
* [Flash Messages](./flash-messages.md)
:::
