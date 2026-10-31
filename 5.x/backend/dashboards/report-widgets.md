---
previousPath: extend/dashboards/report-widgets.md
subtitle: Create dashboard widgets that render their own markup from a PHP class and a partial.
---
# Report Widgets

A report widget is a backend widget made for the dashboard. It renders its own markup from a partial, and users can configure it with the Inspector. Use one when the [built-in report types](./dash-controller.md#choosing-a-report-type) cannot show what you need.

```php
namespace Acme\Blog\ReportWidgets;

use Dashboard\Classes\ReportWidgetBase;

class TrafficSources extends ReportWidgetBase
{
    public function render()
    {
        return $this->makePartial('widget');
    }
}
```

## Creating a Report Widget

The `create:reportwidget` command generates a backend report widget, its view and basic asset files. The first argument is the author and plugin name, and the second is the report widget class name.

```bash
php artisan create:reportwidget Acme.Blog TopPosts
```

Report widget classes live in the **reportwidgets** directory of a plugin and belong to the plugin namespace. Like all backend widgets, report widgets use partials and their own directory layout.

::: dir
├── `reportwidgets`
|   ├── trafficsources
|   |   └── partials
|   |       └── _widget.php  _← Partial File_
|   └── TrafficSources.php  _← Widget Class_
:::

Report widget classes extend the `Dashboard\Classes\ReportWidgetBase` class, as shown above. The class should override the `render` method to render the widget.

### Writing the Widget Partial

The widget partial can contain any HTML markup you want to display in the widget. Wrap the markup in a DIV element with the **report-widget** class, and use an H3 element for the widget header.

```html
<div class="report-widget">
    <h3>Traffic sources</h3>

    <div
        class="control-chart"
        data-control="chart-pie"
        data-size="200"
        data-center-text="180">
        <ul>
            <li>Direct <span>1000</span></li>
            <li>Social networks <span>800</span></li>
        </ul>
    </div>
</div>
```

![image](https://raw.githubusercontent.com/octobercms/docs/develop/images/traffic-sources.png)

Inside report widgets you can use any [charts or indicators](https://octobercms.com/docs/ui/chart), lists or other markup. Report widgets extend the generic [backend widgets](../panel/widgets.md), so you can use any widget feature in them. The next example shows the markup of a list report widget.

```html
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
                            <div class="bar" style="width: 90%"></div>
                            <a href="/">90%</a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>/docs</td>
                    <td>10</td>
                    <td>
                        <div class="progress">
                            <div class="bar" style="width: 10%"></div>
                            <a href="/docs">10%</a>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
```

## Adding Widget Properties

Report widgets can have properties that users manage with the Inspector.

![image](https://raw.githubusercontent.com/octobercms/docs/develop/images/report-widget-inspector.png)

Define the properties in the `defineProperties` method of the widget class. The available property types are described in the [inspector types](../../handbook/inspector-types.md).

```php
public function defineProperties()
{
    return [
        'title' => [
            'title' => 'Widget title',
            'default' => 'Top Pages',
            'type' => 'string',
            'validation' => [
                'required' => [
                    'message' => 'The Widget Title is required.'
                ],
            ]
        ],
        'days' => [
            'title' => 'Number of days to display data for',
            'default' => '7',
            'type' => 'string',
            'validation' => [
                'regex' => [
                    'message' => 'The days property can contain only numeric symbols.',
                    'pattern' => '^[0-9]+$'
                ]
            ]
        ]
    ];
}
```

## Registering a Report Widget

Plugins register report widgets by overriding the `registerDashboards` method in the [plugin registration file](../plugins/extending.md#registration-methods) and using the `widgets` key. The keys of the array are the widget classes, and the values are the widget configuration: label, group and required permissions.

```php
public function registerDashboards()
{
    return [
        'widgets' => [
            \Acme\Blog\ReportWidgets\TrafficOverview::class => [
                'label' => 'Blog traffic overview',
                'group' => 'Widgets',
                'permissions' => [
                    'acme.blog.widgets.traffic_overview',
                ],
            ],
            \Acme\Blog\ReportWidgets\TrafficSources::class => [
                'label' => 'Blog traffic sources',
                'group' => 'Widgets',
                'permissions' => [
                    'acme.blog.widgets.traffic_sources',
                ],
            ]
        ]
    ];
}
```

The **label** element sets the widget name in the Add Widget popup window. The **group** element sets the menu where the widget can be selected.

### Adding a Widget to a Plugin Dashboard

Registered report widgets can be included in a [plugin dashboard](./dash-controller.md#registering-a-plugin-dashboard) by using the widget class as the report type, along with any widget properties.

```yaml
reports:
    traffic_overview:
        type: Acme\Blog\ReportWidgets\TrafficOverview
        row: 1
        width: 20
        days: 30
```

#### See Also

::: also
* [Dash Controller](./dash-controller.md)
* [Vue Report Widgets](./vue-report-widgets.md)
* [Widgets](../panel/widgets.md)
* [Inspector Types](../../handbook/inspector-types.md)
:::
