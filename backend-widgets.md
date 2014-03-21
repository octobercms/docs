# Widgets

- [Generic Widgets](#standard-widgets)
- [Form Widgets](#form-widgets)
- [Report Widgets](#report-widgets)



<a name="standard-widgets"></a>
## Generic Widgets

Widgets are the back-end equivalent of front-end [Components](/docs/extensibility/components). They are similar because they are modular bundles of functionality, supply partials and are named using aliases. The key difference is that they use YAML markup for their configuration and bind themselves to the Backend controller page.

Widget classes can reside in a Plugin or a Module inside the **/widgets** folder. Widgets can supply assets and partials inside a folder using the same name. An example structure looks like this:

```
widgets/list.php                    <== Widget class
widgets/list/partials/list.htm      <== Widget view file
widgets/list/assets/js/list.js      <== Widget JavaScript file
widgets/list/assets/css/list.css    <== Widget StyleSheet file
```

#### Class definition

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

The widget class must contain a **render()** method for producing the widget markup, usually contained in a view file of the same name (list.htm).


<a name="form-widgets"></a>
## Form Widgets

Plugins can register form widgets by overriding the **registerFormWidgets()** method in the plugin registration class. The method should return an array containing the widget classes in the keys and widget name and context in the values. Example:

```php
public function registerFormWidgets()
{
    return [
        ['Backend\FormWidgets\CodeEditor' => 'codeeditor']
    ];
}
```


#### Class definition

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



<a name="report-widgets"></a>
## Report Widgets

Plugins can register dashboard widgets by overriding the **registerReportWidgets()** method in the plugin registration class. The method should return an array containing the widget classes in the keys and widget name and context in the values. Example:

```php
public function registerReportWidgets()
{
    return [
        'RainLab\GoogleAnalytics\ReportWidgets\TrafficOverview'=>[
            'name'=>'Google Analytics traffic overview',
            'context'=>'dashboard'
        ],
        'RainLab\GoogleAnalytics\ReportWidgets\TrafficSources'=>[
            'name'=>'Google Analytics traffic sources',
            'context'=>'dashboard'
        ]
    ];
}
```

The **name** element defines the widget name for the Add Widget popup window. The **context** element defines the context where the widget could be used. October's report widget system allows to host the report container on any page, and the container context name is unique. The widget container on the Dashboard page uses the **dashboard** context.

#### Report widget classes

The report widget classes should extend the **Backend\Classes\ReportWidgetBase** class. The class should override the **render()** method in order to render the widget itself. Similarly to all backend widgets, report widgets use partials and a special directory layout. Example directory layout:

```
plugins/
  rainlab/                  <=== Author name
    googleanalytics/        <=== Plugin name
      reportwidgets/        <=== Report widgets directoru
        TrafficSources      <=== Widget files directory
          partials
            _widget.htm
        TrafficSources.php  <=== Widget class file

```

Example report widget script:

```php
<?php namespace RainLab\GoogleAnalytics\ReportWidgets;

use Backend\Classes\ReportWidgetBase;

class TrafficSources extends ReportWidgetBase
{
    public function render()
    {
        return $this->makePartial('widget');
    }
}
```

The widget partial cound contain any HTML markup you want to display in the widget. The markup should be wrapped into the DIV element with the **report-widget** class. Using H3 element to output the widget header is preferrable. Example widget partial:

```php
<div class="report-widget">
    <h3>Traffic sources</h3>

    <div 
        class="control-chart"
        data-control="chart-pie" 
        data-size="200"
        data-center-text="180"
    >
        <ul>
            <li>Direct <span>1000</span></li>
            <li>Social networks <span>800</span></li>
        </ul>
    </div>
</div>
```

![image](https://raw2.github.com/octobercms/docs/master/images/traffic-sources.png)

Inside report widgets you can use any [charts or indicators](backend-charts-and-indicators.md), lists or any other markup you wish. Remember that the report widgets extend the [back-end widgets](backend-widgets.md) and you can use any widget functionality in your report widgets.

#### Example list reprot widget markup

```php
<div class="report-widget">
    <h3>Top pages</h3>

    <div class="table-container">
        <table class="table data" data-provides="rowlink">
            <thead>
                <tr>
                    <th><span>Page URL</span></th>
                    <th><span>Pageviews</span></th>
                    <th><span>% Pageviews</span></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>/</td>
                    <td>90</td>
                    <td>
                        <div class="progress">
                            <div class="bar" style="90%"></div>
                            <a href="/">90%</a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>/docs</td>
                    <td>10</td>
                    <td>
                        <div class="progress">
                            <div class="bar" style="10%"></div>
                            <a href="/docs">10%</a>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
```

#### Defining report widget properties

Report widgets could have properties that users can manage with the Inspector:

![image](https://github.com/octobercms/docs/blob/master/images/report-widget-inspector.png?raw=true)

The properties should be defined in the **defineProperties()** method of the widget class. Note that the [components](extensibility-components.md) use the same way to define properties. Example:

```php
public function defineProperties()
{
    return [
        'title' => [
            'title' => 'Widget title',
            'default' => 'Top Pages',
            'type'=>'string',
            'validationPattern'=>'^.+$',
            'validationMessage'=>'The Widget Title is required.'
        ],
        'days' => [
            'title' => 'Number of days to display data for',
            'default' => '7',
            'type'=>'string',
            'validationPattern'=>'^[0-9]+$'
        ]
    ];
}
```

The method should return an array with the property names in keys, and a property configuration in values. The property configuration array could have the following keys:

* **title** - specifies the property title, required.
* **default** - specifies the property default value. It's used if the user didn't provide a value yet. Optional.
* **type** - specifies the property type. Currently supported types are string, checkbox. Required.
* **description** - the detailed proprety description, optional
* **validationPattern** - the validation pattern, regular expression. Applicable only for string properties.
* **validationMessage** - error messsage to display if the validation fails.

In the widget code and it's partials you can access property values with the **property()** method:

```php
<h3><?= e($this->property('title')) ?></h3>
```
