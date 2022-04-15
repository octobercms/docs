---
subtitle: Discover how to use AJAX in the backend panel.
---
# AJAX

The backend uses the same [AJAX library as the CMS](../../cms/ajax/introduction.md) pages. The library is loaded automatically on the backend pages.

## Backend AJAX Handlers

The backend AJAX handlers can be defined in the controller class or [widgets](widgets.md). In the controller class the AJAX handlers are defined as public methods with the name starting with "on" string: **onCreateTemplate**, **onGetTemplateList**, etc.

Backend AJAX handlers can return an array of data, throw an exception or redirect to another page. You can use `$this->vars` to set variables and the controller's `makePartial` method to render a partial and return its contents as a part of the response data.

```php
public function onOpenTemplate()
{
    if (post('someVar') !== 'someValue') {
        throw new ApplicationException('Invalid value');
    }

    $this->vars['foo'] = 'bar';

    return [
        'partialContents' => $this->makePartial('some-partial')
    ];
}
```

### Triggering AJAX Requests

The AJAX request can be triggered with the data attributes API or the JavaScript API. Please see the [frontend AJAX library](../ajax/introduction) for details. The following example shows how to trigger a request with a backend button.

```html
<button
    type="button"
    data-request="onDoSomething"
    class="btn btn-default">
    Do Something
</button>
```

## Behavior AJAX Handlers

Since behaviors will combine their methods to the parent controller, all AJAX handlers that are defined in a behavior are available to the controller. In some cases you may want to override an AJAX handler in the controller, you may do this by calling the `asExtension` method.

The controller AJAX handler takes priority, then requests the `Backend\Behaviors\FormController` behavior and calls its handler.

```php
function onDoSomething()
{
    // Custom logic here
    // ...

    // Call the extension handler
    return $this->asExtension('FormController')->doSomething();
}
```

## Widget AJAX Handlers

Widgets implement the same AJAX approach as the backend controllers. The AJAX handlers are public methods of the widget class with names starting with the **on** prefix. The only difference between the widget AJAX handlers and backend controller's AJAX handlers is that you should use the widget's `getEventHandler` method to return the widget's handler name when you refer to it in the widget partials.

```php
<a
    href="javascript:;"
    data-request="<?= $this->getEventHandler('onPaginate') ?>"
    title="Next page">Next</a>
```

When called from a widget class or partial the AJAX handler will target itself. For example, if the widget uses the alias of **mywidget** the handler will be targeted with `mywidget::onName`. The above would output the following attribute value:

```html
data-request="mywidget::onPaginate"
```
