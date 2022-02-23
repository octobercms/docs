# Introduction

October includes a framework that brings a full suite of AJAX capabilities which allow you to load data from the server without a browser page refresh. The same library can be used in [CMS themes](../cms/themes.md) and anywhere in the [back-end administration area](../backend/controllers-ajax#using-ajax-handlers).

The AJAX framework comes in two flavors, you may either use [the JavaScript API](../ajax/javascript-api.md) or [the data attributes API](../ajax/attributes-api.md). The data attributes API doesn't require any JavaScript knowledge to use AJAX with October.

## Including the framework

The AJAX framework is optional in your [CMS theme](../cms/themes.md), to use the library you should include it by placing the `{% framework %}` tag anywhere inside your [page](../cms/pages.md) or [layout](../cms/layouts.md). This adds a reference to the October front-end JavaScript library. The library requires jQuery so it should be loaded first, for example:

```twig
<script src="{{ 'assets/javascript/jquery.js'|theme }}"></script>

{% framework %}
```

The `{% framework %}` tag supports the optional **extras** parameter. If this parameter is specified, the tag adds StyleSheet and JavaScript files for [extra features](../ajax/extras.md), including form validation and loading indicators.

```twig
{% framework extras %}
```

## How AJAX requests work

A page can issue an AJAX request either prompted by data attributes or by using JavaScript. Each request invokes an **event handler** -- also called an [AJAX handler](../ajax/handlers.md) -- on the server and can update page elements using partials. AJAX requests work best with forms, since the form data is automatically sent to the server. Here is request workflow:

1. The client browser issues an AJAX request by providing the handler name and other optional parameters.
2. The server finds the [AJAX handler](../ajax/handlers.md) and executes it.
3. The handler executes the required business logic and updates the environment by injecting page variables.
4. The server [renders partials](../ajax/update-partials.md) requested by the client with the `update` option.
5. The server sends the response, containing the rendered partials markup.
6. The client-side framework updates page elements with the partials data received from the server.

> **Note**: Depending on the page context a [CMS partial](../cms/partials.md) or [backend partial](../backend/views-partials.md) view will be rendered.

## Usage example

Below is a simple example that uses the data attributes API to define an AJAX enabled form. The form will issue an AJAX request to the **onTest** handler and requests that the result container be updated with the **mypartial** partial markup.

```html
<!-- AJAX enabled form -->
<form data-request="onTest" data-request-update="mypartial: '#myDiv'">

    <!-- Input two values -->
    <input name="value1"> + <input name="value2">

    <!-- Action button -->
    <button type="submit">Calculate</button>

</form>

<!-- Result container -->
<div id="myDiv"></div>
```

> **Note**: The form data for `value1` and `value2` are automatically sent with the AJAX request.

The **mypartial** partial contains markup that reads the `result` variable.

```twig
The result is {{ result }}
```

The **onTest** handler method accessed the form data using the `input` [helper method](../services/helper.md#method-input) and the result is passed to the `result` page variable.

```php
function onTest()
{
    $this->page['result'] = input('value1') + input('value2');
}
```

The example could be read like this: "When the form is submitted, issue an AJAX request to the **onTest** handler. When the handler finishes, render the **mypartial** partial and inject its contents to the **#myDiv** element."
