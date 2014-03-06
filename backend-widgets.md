Widgets are the back-end equivalent of front-end [Components](/docs/extensibility/components). They are similar because they are modular bundles of functionality, supply partials and are named using aliases. The key difference is that they use YAML markup for their configuration and bind themselves to the Backend controller page.

Widget classes can reside in a Plugin or a Module inside the **/widgets** folder. Widgets can supply assets and partials inside a folder using the same name. An example structure looks like this:

```
widgets/list.php                    <== Widget class
widgets/list/partials/list.htm      <== Widget view file
widgets/list/assets/js/list.js      <== Widget JavaScript file
widgets/list/assets/css/list.css    <== Widget StyleSheet file
```

The widget class must contain a **render()** method for producing the widget markup, usually contained in a view file of the same name (list.htm).

#### Basic widgets

A basic widget extends the **Backend\Classes\WidgetBase** class and can be used for any general purpose.

```php
<?php namespace Backend\Widgets;

use Backend\Classes\WidgetBase;

class Lists extends WidgetBase
{
    public $defaultAlias = 'list';

    public function widgetDetails()
    {
        return [
            'name' => 'List Widget',
            'description' => 'Used for building back end lists.'
        ];
    }
}
```

#### Form widgets

Form widgets extend the **Backend\Classes\FormWidgetBase** class and are used specifically as Form fields. They provide features that are common to supplying data for models.

```php
<?php namespace Backend\Widgets;

use Backend\Classes\FormWidgetBase;

class CodeEditor extends FormWidgetBase
{
    public function widgetDetails()
    {
        return [
            'name' => 'Code Editor',
            'description' => 'Renders a code editor field.'
        ];
    }

    public function render() {}
}
```