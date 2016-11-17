# AJAX Updating Partials

- [Pulling partial updates](#pulling-updates)
    - [Update definition](#update-definition)
- [Pushing partial updates](#pushing-updates)
- [Passing variables to partials](#passing-variables)

When a handler executes it may prepare partials that are updated on the page, either by pushing or pulling, which can be rendered with some supplied variables.

<a name="pulling-updates"></a>
## Pulling partial updates

The client browser may request partials to be updated from the server when it performs an AJAX request, which is considered *pulling a content update*. The following code renders the **mytime** partial inside the `#myDiv` element on the page after calling the `onRefreshTime` [event handler](../ajax/handlers).

    <div id="myDiv">{% partial 'mytime' %}</div>

The [data attributes API](../ajax/attributes-api) uses the `data-request-update` attribute.

    <!-- Attributes API -->
    <button
        data-request="onRefreshTime"
        data-request-update="mytime: '#myDiv'">
        Go
    </button>

The [JavaScript API](../ajax/javascript-api) uses the `update` configuration option:

    <!-- JavaScript API -->
    $.request('onRefreshTime', {
        update: { mytime: '#myDiv' }
    })

<a name="update-definition"></a>
### Update definition

The definition of what should be updated is specified as a JSON-like object where:

- the left side (key) is the **partial name**
- the right side (value) is the **target element** to update

The following will request to update the `#myDiv` element with **mypartial** contents.

    mypartial: '#myDiv'

Multiple partials are separated by commas.

    firstpartial: '#myDiv', secondpartial: '#otherDiv'

If the partial name contains a slash or a dash, it is important to 'quote' the left side.

    'folder/mypartial': '#myDiv', 'my-partial': '#myDiv'

The target element will always be on the right side since it can also be a HTML element in JavaScript.

    mypartial: document.getElementById('myDiv')

<a name="pushing-updates"></a>
## Pushing partial updates

Comparatively, [AJAX handlers](../ajax/handlers) can *push content updates* to the client-side browser from the server-side. To push an update the handler returns an array where the key is a HTML element to update (using a simple CSS selector) and the value is the content to update.

The following example will update an element on the page with the id **myDiv** using the contents found inside the partial **mypartial**. The `onRefreshTime` handler calls the `renderPartial` method to render the partial contents in PHP.

    function onRefreshTime()
    {
        return [
            '#myDiv' => $this->renderPartial('mypartial')
        ];
    }

> **Note:** The key name must start with an identifier `#` or class `.` character to trigger a content update.

<a name="passing-variables"></a>
## Passing variables to partials

Depending on the execution context, an [AJAX event handler](../ajax/handlers) makes variables available to partials differently.

- Use `$this[]` inside a page or layout [PHP section](../cms/themes#php-section).
- Use `$this->page[]` inside a [component class](../plugin/components#ajax-handlers).
- Use `$this->vars[]` in the [back-end area](../backend/controllers-ajax#ajax).

These examples will provide the **result** variable to a partial for each context:

    // From page or layout PHP code section
    $this['result'] = 'Hello world!';

    // From a component class
    $this->page['result'] = 'Hello world!';

    // From a backend controller or widget
    $this->vars['result'] = 'Hello world!';

This value can then be accessed using Twig in the partial:

    <!-- Hello world! -->
    {{ result }}
