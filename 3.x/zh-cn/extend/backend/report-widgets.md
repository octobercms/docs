---
subtitle: 专为仪表盘使用而设计的部件。
---
# 报表部件

报表部件可用于后端仪表盘和其他后端报表容器中。报表部件必须在[插件注册文件](../extending.md)中注册。

报表部件类位于插件的 **reportwidgets** 目录中。与任何其他插件类一样，通用部件控制器应属于插件命名空间。与所有后端部件类似，报表部件使用局部视图和特殊的目录布局。目录布局示例：

::: dir
├── `reportwidgets`
|   ├── trafficsources
|   |   └── partials
|   |       └── _widget.php  _← Partial File_
|   └── TrafficSources.php  _← Widget Class_
:::

## 类定义

`create:reportwidget` 命令用于生成后端报表部件、视图和基本资源文件。第一个参数指定作者和插件名称。第二个参数指定报表部件类名。

```bash
php artisan create:reportwidget Acme.Blog TopPosts
```

报表部件类必须扩展 `Backend\Classes\ReportWidgetBase` 类。报表部件类定义示例如下。该类应重写 `render` 方法以渲染部件本身。

```php
namespace RainLab\GoogleAnalytics\ReportWidgets;

use Backend\Classes\ReportWidgetBase;

class TrafficSources extends ReportWidgetBase
{
    public function render()
    {
        return $this->makePartial('widget');
    }
}
```

部件局部视图可以包含您想在部件中显示的任何 HTML 标记。标记应包裹在具有 **report-widget** 类的 DIV 元素中。建议使用 H3 元素来输出部件标题。部件局部视图示例：

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

在报表部件中，您可以使用任何[图表或指标](https://octobercms.com/docs/ui/chart)、列表或您希望的任何其他标记。请记住，报表部件扩展了通用后端部件，您可以在报表部件中使用任何部件功能。下一个示例展示了列表报表部件标记。

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

## 报表部件属性

报表部件可以拥有用户通过 Inspector 管理的属性：

![image](https://raw.githubusercontent.com/octobercms/docs/develop/images/report-widget-inspector.png)

属性应在部件类的 `defineProperties` 方法中定义。属性在 [Inspector 类型](../../element/inspector-types.md)中描述。

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

## 报表部件注册

插件可以通过在[插件注册文件](../extending.md)中重写 `registerReportWidgets` 方法来注册报表部件。该方法应返回一个数组，键中包含部件类，值中包含部件配置（标签、上下文和所需权限）。

```php
public function registerReportWidgets()
{
    return [
        \RainLab\GoogleAnalytics\ReportWidgets\TrafficOverview::class => [
            'label' => 'Google Analytics traffic overview',
            'context' => 'dashboard',
            'permissions' => [
                'rainlab.googleanalytics.widgets.traffic_overview',
            ],
        ],
        \RainLab\GoogleAnalytics\ReportWidgets\TrafficSources::class => [
            'label' => 'Google Analytics traffic sources',
            'context' => 'dashboard',
            'permissions' => [
                'rainlab.googleanaltyics.widgets.traffic_sources',
            ],
        ]
    ];
}
```

**label** 元素定义了"添加部件"弹出窗口中的部件名称。**context** 元素定义了部件可以使用的上下文。October 的报表部件系统允许在任何页面上托管报表容器，并且容器上下文名称是唯一的。仪表盘页面上的部件容器使用 **dashboard** 上下文。
