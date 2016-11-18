# AJAX Extra features

- [Loading indicator](#loader-stripe)
- [Form validation](#ajax-validation)
    - [Throwing a validation error](#throw-validation-exception)
    - [Displaying error messages](#error-messages)
    - [Displaying errors with fields](#field-errors)
- [Loading button](#loader-button)
- [Flash messages](#ajax-flash)
- [Usage example](#usage-example)

When using the AJAX framework, you have the option to specify the **extras** suffix which includes additional StyleSheet and JavaScript files. These features are useful when working with AJAX requests in front-end CMS pages.

    {% framework extras %}

<a name="loader-stripe"></a>
## Loading indicator

The first feature you should notice is a loading indicator that is displayed on the top of the page when an AJAX request runs. The indicator hooks in to [global events](../ajax/javascript-api#global-events) used by the AJAX framework.

When an AJAX request starts the `ajaxPromise` event is fired that displays the indicator and puts the mouse cursor in a loading state. The `ajaxFail` and `ajaxDone` events are used to detect when the request finishes, where the indicator is hidden again.

<a name="ajax-validation"></a>
## Form validation

You may specify the `data-request-validate` attribute on a form to enable validation features.

    <form
        data-request="onSubmit"
        data-request-validate>
        <!-- ... -->
    </form>

<a name="throw-validation-exception"></a>
### Throwing a validation error

In the server side AJAX handler you may throw a [validation exception](../services/error-log#validation-exception) using the `ValidationException` class to make a field invalid, where the first argument is an array. The array should use field names for the keys and the error messages for the values.

    function onSubmit()
    {
        throw new ValidationException(['name' => 'You must give a name!']);
    }

> **Note**: You can also pass an instance of the [validation service](../services/validation) as the first argument of the exception.

<a name="error-messages"></a>
### Displaying error messages

Inside the form, you may display the first error message by using the `data-validate-error` attribute on a container element. The content inside the container will be set to the error message and the element will be made visible.

    <div data-validate-error></div>

To display multiple error messages, include an element with the `data-message` attribute. In this example the paragraph tag will be duplicated and set with content for each message that exists.

    <div class="alert alert-danger" data-validate-error>
        <p data-message></p>
    </div>

<a name="field-errors"></a>
### Displaying errors with fields

Alternatively, you can show validation messages for individual fields by defining an element that uses the `data-validate-for` attribute, passing the field name as the value.

    <!-- Input field -->
    <input name="phone" />

    <!-- Validation message for the field -->
    <div data-validate-for="phone"></div>

If the element is left empty, it will be populated with the validation text from the server. Otherwise you can specify any text you like and it will be displayed instead.

    <div data-validate-for="phone">
        Oops.. phone number is invalid!
    </div>

<a name="loader-button"></a>
## Loading button

When any element contains the `data-attach-loading` attribute, the CSS class `oc-loader` will be added to it during the AJAX request. This class will spawn a *loading spinner* on button and anchor elements using the `:after` CSS selector.

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

To remain consistent with AJAX based flash messages, you can render a [standard flash message](../markup/tag-flash) when the page loads by placing this code in your page or layout.

    {% flash %}
        <p
            data-control="flash-message"
            class="flash-message fade {{ type }}"
            data-interval="5">
            {{ message }}
        </p>
    {% endflash %}

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

        <div class="alert alert-danger" data-validate-error>
            <p data-message></p>
        </div>

    </form>

The AJAX event handler looks at the POST data sent by the client and applies some rules to the validator. If the validation fails, a `ValidationException` is thrown, otherwise a `Flash::success` message is returned.

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
