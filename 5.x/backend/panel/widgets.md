---
previousPath: extend/system/widgets.md
subtitle: Build reusable backend controls that render markup and handle their own AJAX requests.
---
# Widgets

A widget is a reusable control for backend pages. It has a user interface, and a widget class that prepares its data and handles the AJAX requests sent by that interface. Use a widget when the same control appears on more than one page.

```php
namespace Acme\Blog\Widgets;

use Backend\Classes\WidgetBase;

class Counter extends WidgetBase
{
    protected $defaultAlias = 'counter';

    public function render()
    {
        return $this->makePartial('counter');
    }
}
```

Widgets are the backend equivalent of [CMS components](../../themes/components.md). Both are modular bundles of functionality that supply partials and are named using aliases. The key difference is that backend widgets use YAML markup for their configuration and are bound to backend controllers manually.

## Creating a Widget

Widget classes live in the **widgets** directory of the plugin. The widget files live in a directory named after the widget class in lowercase, and include its partials and assets.

::: dir
├── `widgets`
|   ├── counter
|   |   ├── partials
|   |   |   └── _counter.php  _← Partial File_
|   |   └── assets
|   |       ├── js
|   |       |   └── counter.js  _← JavaScript File_
|   |       └── css
|   |           └── counter.css  _← StyleSheet File_
|   └── Counter.php  _← Widget Class_
:::

Widget classes extend the `Backend\Classes\WidgetBase` class and belong to the [plugin namespace](../plugins/introduction.md), as shown in the example above. The `$defaultAlias` property identifies the widget when no other alias is given.

### Rendering the Widget

The widget class must contain a `render` method that produces the widget markup, usually by rendering a widget partial.

```php
public function render()
{
    return $this->makePartial('counter');
}
```

To pass variables to the partial, add them to the `$vars` property.

```php
public function render()
{
    $this->vars['var'] = 'value';

    return $this->makePartial('counter');
}
```

You may also pass the variables as the second argument of the `makePartial` method.

```php
public function render()
{
    return $this->makePartial('counter', ['var' => 'value']);
}
```

## Adding a Widget to a Page

::: aside
Binding to a controller is also required to make [AJAX handlers available](./ajax.md).
:::

Bind a widget to a backend controller before using it in a page or partial. The best place to create a widget is the `beforeDisplay` method of the controller, which runs before every action and AJAX handler. The widget constructor takes the controller as its first argument. Call the `bindToController` method to bind it.

```php
public function beforeDisplay()
{
    $myWidget = new MyWidgetClass($this);
    $myWidget->alias = 'myWidget';
    $myWidget->bindToController();
}
```

Once bound, the widget is available by its alias using the `$this->widget` property in the controller views and partials.

```php
<?= $this->widget->myWidget->render() ?>
```

## Running Code Before AJAX Handlers

The widget constructor calls the `init` method of the widget. Since the widget is created before any AJAX handler runs, code in this method runs before every AJAX handler of the widget.

```php
function init()
{
    // From a widget class
}
```

#### See Also

::: also
* [Backend AJAX](./ajax.md)
* [Form Widgets](../forms/form-widgets.md)
* [Filter Widgets](../lists/filter-widgets.md)
* [Report Widgets](../dashboards/report-widgets.md)
:::
