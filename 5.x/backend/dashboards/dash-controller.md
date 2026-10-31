---
previousPath: extend/dashboards/dash-controller.md
subtitle: Add dashboards of charts, tables and indicators to the admin panel from your plugin.
---
# Dash Controller

The backend dashboard displays reports, such as charts, tables and indicators, built from data supplied by data sources. Administrators can build their own dashboards, and plugins can register ready-made dashboards along with new data sources and report widgets.

```php
public function registerDashboards()
{
    return [
        'dashboards' => [
            'sales' => '$/acme/shop/dashboards/sales.yaml'
        ]
    ];
}
```

## Registering a Plugin Dashboard

Plugins supply their own dashboards by overriding the `registerDashboards` method in the [plugin registration file](../plugins/extending.md#registration-methods), as shown above. Each dashboard is keyed by a unique code, which is also used in its URL, and refers to a YAML file containing the dashboard definition.

The definition file supports the same properties as a dashboard in the Dash Behavior configuration. The optional `permissions` property hides the dashboard from users without any of the listed permissions. Set `showInterval` to `false` when the reports do not use the date range picker.

```yaml
name: Sales
icon: ph ph-shopping-cart
permissions:
    - acme.shop.view_sales

reports:
    sales_title:
        row: 1
        width: 20
        type: section-title
        title: Sales
```

Each report sets its position with `row` and `width`, and its kind with `type`. The other report properties match the widget settings in the dashboard editor, for example `chartType: doughnut` for a chart, or `metric` and `goal` for an indicator.

Registered dashboards appear on the backend dashboard as system dashboards, listed after the existing ones. Administrators can rename, hide, reorder and customize them, and the **Reset to Default** button restores the registered layout. A dashboard that has not been customized always follows the latest definition from the plugin, and it is removed when the plugin is disabled or uninstalled. A customized dashboard is kept as a regular dashboard that can be deleted.

The same method also registers [report widgets](./report-widgets.md) and [data sources](./data-sources.md) with the `widgets` and `dataSources` keys. When a plugin only registers dashboards, the method can return them directly.

```php
public function registerDashboards()
{
    return [
        'sales' => '$/acme/shop/dashboards/sales.yaml'
    ];
}
```

### Choosing a Report Type

October CMS includes the following report types. Use the code as the `type` of a report.

Type | Code | Description
------------- | ------------- | -------------
**Indicator** | `indicator` | displays a single data source metric value, such as the total number of pageviews over the selected dashboard period. Set a **Goal** to show the progress toward a target value.
**Table** | `table` | displays multiple dimension values and metrics, like product names, numbers of units sold, and total sales amount.
**Chart** | `chart` | supports line, bar, pie and doughnut charts. In line charts, the horizontal axis shows dimension values, while the vertical axis shows metric values. Pie and doughnut charts show a slice for each dimension value.
**Section Title** | `section-title` | shows a static section title, such as 'Traffic Information'. This widget can also display the currently selected reporting interval.
**Text Notice** | `notice` | contains a static title and paragraph text to present any information related to the dashboard.

The built-in types are flexible enough for most reporting needs, such as displaying sales or traffic information. When they are not enough, you can [create a report widget](./vue-report-widgets.md) with its own appearance and behavior.

### Setting the Default Date Range

Use the following properties in the dashboard YAML file to set the default date range and grouping interval.

Property | Description
------------- | -------------
**defaultStart** | default start date keyword. Supported values: `today`, `week`, `month`, `quarter`, `year`. Default: `month`.
**defaultEnd** | default end date keyword. Supported values: `today`, `week`, `month`, `quarter`, `year`. Default: `today`.
**defaultInterval** | default grouping interval. Supported values: `day`, `week`, `month`, `quarter`, `year`. Default: `day`.
**defaultCompare** | default comparison mode. Supported values: `none`, `prev-period`, `prev-year`. Default: `none`.

For example, the following finance dashboard shows data from the start of the year, grouped by month.

```yaml
name: Finance
icon: ph ph-chart-bar
defaultStart: year
defaultEnd: today
defaultInterval: month
```

In a Dash Behavior configuration file, which can define several dashboards, the same properties go under the dashboard code, such as `finance:`.

These defaults apply when the user first visits the dashboard and no date range is selected in the URL. Once the user selects a different range, their selection takes precedence.

## Supplying Data with Data Sources

Most built-in report types work with server-side data sources. A data source supplies structured data as dimensions, metrics and metric values. This lets the same report type display different data. For instance, the Table report can display CMS traffic or eCommerce sales, depending on which data source it uses and which of its dimensions and metrics it refers to.

For most reporting needs, include a [data source](./data-sources.md) in your plugin rather than creating a custom report widget.

This documentation uses the following terms when describing data sources and reports.

- **Dimension** is an aspect or category of data used to organize and group information in a report. Dimensions often represent qualitative data, such as product names or page names, which split the data into meaningful units. For example, in a sales report, Product could be a dimension that groups sales data by product.
- **Metric** is a quantitative measurement that provides values for a dimension, such as sales figures, traffic counts or conversion rates. For instance, if Product Name is a dimension, the metric could be the number of units sold or the revenue for each product.
- **Dimension field** is additional information related to a dimension that is displayed in reports. For the Product dimension, it makes sense to register a Brand dimension field.

Although you specify table column names for metrics and dimensions, the dashboard system does not depend on where the data comes from. Your data source class decides how to generate the data, which does not have to come from a database. The `ReportQueryBuilder` class simplifies building database-driven data sources, but its use is optional.

::: tip
When creating database-driven data sources, index the dimension, dimension field and metric columns for optimal query performance.
:::

#### See Also

::: also
* [Data Sources](./data-sources.md)
* [Report Widgets](./report-widgets.md)
* [Vue Report Widgets](./vue-report-widgets.md)
:::
