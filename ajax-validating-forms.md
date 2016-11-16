# AJAX Validating Forms

- [Form validation](#ajax-validation)
    - [Throwing a validation error](#throw-validation-exception)
    - [Displaying the first error](#error-message)
    - [Displaying errors with fields](#field-errors)
- [Loading button](#loader-button)
- [Flash messages](#ajax-flash)
- [Usage example](#usage-example)

Validating forms and other features are available via the data attributes API, when using the `{% framework extras %}` tag in your page or layout.

<a name="ajax-validation"></a>
## Form validation

You may specify the `data-request-validate` attribute on a form to enable validation features.

    <form
        data-request="onSuccess"
        data-request-validate>
        <!-- ... -->
    </form>

<a name="throw-validation-exception"></a>
### Throwing a validation error

You may throw an exception using the `ValidationException` class to make a field invalid, where the first argument is an array. The array should use field names for the keys and the error message for the values.

    function onSuccess()
    {
        throw new ValidationException(['name' => 'You must give a name!']);
    }

You may also pass an instance of the [Validation service](../services/validation) to the exception.

    $validator = Validator::make(...);

    if ($validator->fails()) {
        throw new ValidationException($validator);
    }

<a name="error-message"></a>
### Displaying the first error

Alternatively, you may display the first error message by using the `data-validate-error` attribute on a container element.

    <div class="alert alert-danger" data-validate-error></div>

To use a wrapper element use an element with the `data-message` attribute. In this example the message will be appended to the paragraph and the parent container will only show with an error.

    <div class="alert alert-danger" data-validate-error>
        <p data-message></p>
    </div>

<a name="field-errors"></a>
### Displaying errors with fields

You can show validation messages for individual fields by defining an element that uses the `data-validate-for` attribute, passing the field name as the value.

    <!-- Input field -->
    <input name="phone" />

    <!-- Validation message for the field -->
    <div data-validate-for="phone"></div>

If the element is left empty, it will be populated with the validation text from the server. Otherwise you can specify any text you like and it will be displayed instead.

    <div data-validate-for="phone">Oops.. phone number is invalid!</div>

<a name="loader-button"></a>
## Loading button

When any element contains the `data-attach-loading` attribute, the CSS class `oc-loader` will be added to during the AJAX request. This class will spawn a *loading spinner* on button and anchor elements using the `:after` CSS selector.

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


<a name="ajax-flash"></a>
## Flash messages

Specify the `data-request-flash` attribute on a form to enable the use of flash messages on successful AJAX requests.

    <form
        data-request="onSuccess"
        data-request-flash>
        <!-- ... -->
    </form>

Combined with use of the `Flash` facade in the event handler, a flash message will appear after the request finishes.

    function onSuccess()
    {
        Flash::success('You did it!')
    }

<a name="usage-example"></a>
## Usage example

Below is a complete example of form validation. It calls the `onDoSomething` event handler that triggers a loading submit button, performs validation on the form fields, then displays a successful flash message.

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

        <div class="alert alert-danger" data-validate-error></div>

    </form>

The AJAX event handler looks at the POST data sent by the client, applies some rules to the validator. If the validation fails, a `ValidationException` is thrown, otherwise a `Flash::success` message is returned.

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
