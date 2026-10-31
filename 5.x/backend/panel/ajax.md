---
previousPath: extend/system/ajax.md
subtitle: Handle AJAX requests in backend controllers, behaviors and widgets.
---
# Backend AJAX

The backend panel uses the same [AJAX framework as CMS pages](../../themes/ajax/introduction.md), loaded automatically on every backend page. An AJAX handler is a public method whose name starts with `on`, defined in a controller or a widget.

```php
public function onDoSomething()
{
    Flash::success('Done!');
}
```

```html
<button
    type="button"
    data-request="onDoSomething"
    class="btn btn-default">
    Do Something
</button>
```

## Defining an AJAX Handler

Define AJAX handlers in the controller class as public methods with names starting with `on`, such as **onCreateTemplate** or **onGetTemplateList**.

A handler can return an array of data, throw an exception or redirect to another page. Use `$this->vars` to set variables, and the `makePartial` method of the controller to render a partial and return its contents as part of the response data.

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

## Calling a Handler from the Page

Trigger an AJAX request with the data attributes API or the JavaScript API. The button in the example above uses the `data-request` attribute. See the [AJAX framework](../../themes/ajax/introduction.md) for all the ways to send a request and handle the response.

## Overriding a Behavior Handler

Behaviors add their methods to the controller, so every AJAX handler defined in a behavior is available to the controller. To override a behavior handler, define a handler with the same name in the controller. The controller handler takes priority, and it can still call the behavior handler with the `asExtension` method.

```php
public function update_onSave($recordId = null, $context = null)
{
    // Custom logic here
    // ...

    // Call the behavior handler
    return $this->asExtension('FormController')->update_onSave($recordId, $context);
}
```

## Handling AJAX in a Widget

Widgets handle AJAX requests the same way as backend controllers. Their handlers are public methods of the widget class with names starting with `on`. The difference is that you refer to a widget handler with the `getEventHandler` method in the widget partials.

```php
<a
    href="javascript:;"
    data-request="<?= $this->getEventHandler('onPaginate') ?>"
    title="Next page">Next</a>
```

The method prefixes the handler name with the widget alias, so the request targets the widget itself. For example, if the widget uses the alias **mywidget**, the above outputs the following attribute value.

```html
data-request="mywidget::onPaginate"
```

The widget must be [bound to the controller](./widgets.md#adding-a-widget-to-a-page) for its handlers to be available.

#### See Also

::: also
* [AJAX Framework Guide](../../themes/ajax/introduction.md)
* [AJAX Handlers](../../themes/ajax/handlers.md)
* [Widgets](./widgets.md)
:::
