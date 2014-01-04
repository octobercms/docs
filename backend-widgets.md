Widgets are the back-end equivalent of front-end [Components](Components). They are similar because they are modular bundles of functionality, supply partials and are named using aliases. The key difference is that they use YAML markup for their configuration and bind themselves to the Backend controller page.

Widget classes can reside in a Plugin or a Module inside the **Widgets/** folder. Widgets can supply assets and partials inside a folder using the same name. An example structure looks like this:

```
Widgets/List.php                    <== Widget class
Widgets/List/partials/list.htm      <== Widget view file
Widgets/List/assets/js/list.js      <== Widget JavaScript file
Widgets/List/assets/css/list.css    <== Widget StyleSheet file
```

The widget class must contain a **render()** method for producing the widget markup, usually contained in a view file of the same name (list.htm).

### Basic widgets

A basic widget extends the **Modules\Backend\Classes\WidgetBase** class and can be used for any general purpose.

```php
<?php namespace Modules\Backend\Widgets;

use Modules\Backend\Classes\WidgetBase;

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

### Form widgets

Form widgets extend the **Modules\Backend\Classes\FormWidgetBase** class and are used specifically as Form fields. They provide features that are common to supplying data for models.

```php
<?php namespace Modules\Backend\Widgets;

use Modules\Backend\Classes\FormWidgetBase;

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