# AJAX

## Using AJAX Handlers

The backend AJAX framework uses the same [AJAX library](../ajax/introduction.md) as the front-end pages. The library is loaded automatically on the backend pages.

### Backend AJAX Handlers

The backend AJAX handlers can be defined in the controller class or [widgets](widgets.md). In the controller class the AJAX handlers are defined as public methods with the name starting with "on" string: **onCreateTemplate**, **onGetTemplateList**, etc.

Back-end AJAX handlers can return an array of data, throw an exception or redirect to another page (see [AJAX event handlers](../ajax/handlers.md)). You can use `$this->vars` to set variables and the controller's `makePartial` method to render a partial and return its contents as a part of the response data.

```php
public function onOpenTemplate()
{
    if (Request::input('someVar') != 'someValue') {
        throw new ApplicationException('Invalid value');
    }

    $this->vars['foo'] = 'bar';

    return [
        'partialContents' => $this->makePartial('some-partial')
    ];
}
```

### Triggering AJAX Requests

The AJAX request can be triggered with the data attributes API or the JavaScript API. Please see the [front-end AJAX library](../ajax/introduction) for details. The following example shows how to trigger a request with a backend button.

```html
<button
    type="button"
    data-request="onDoSomething"
    class="btn btn-default">
    Do something
</button>
```

> **Note**: You can specifically target the AJAX handler of a widget using a prefix `widget::onName`. See the [widget AJAX handler article](../backend/widgets.md#oc-ajax-handlers) for more details.
