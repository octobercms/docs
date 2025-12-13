---
subtitle: Adds reporting features to any backend page via a dashboard display.
---
# Dash Controller

October CMS features a flexible dashboard system capable of hosting multiple dashboards with configurable access. Each dashboard can contain multiple widgets to display various data types. October CMS comes with several widget types, including graph, table and others. The default widgets are sufficiently flexible to cover most common reporting scenarios, such as displaying sales or traffic information. In addition, developers can create new widget types for scenarios where the default widgets do not meet their needs.

## Data Sources

Most built-in dashboard widgets in October CMS work with server-side data sources. These data sources supply structured data in the form of dimensions, metrics, and metric values. This approach enables developers to use the same widget types with various data. For instance, the Table widget can display data regarding CMS traffic or eCommerce sales. In this scenario, the Table widget must be connected to different data sources and refer to various dimensions and metrics provided by those sources.

For most reporting needs, developers should include data sources in their plugins, rather than creating custom widgets.

This documentation uses the following terms when describing data sources and widgets:

- **Dimension** - is an aspect or category of data used for organizing and grouping information in a report. Dimensions often represent qualitative data, such as product names or page names, which help in segmenting the data into more meaningful and comprehensible units. For example, in a sales report, Product could be a dimension that categorizes sales data by different products.
- **Metric** - is a quantitative measurement that provides values for a dimension. Metrics represent the actual data points being measured, such as sales figures, traffic counts, or conversion rates. Metrics give numerical values to each category or unit defined by a dimension. For instance, if Product Name is a dimension, the corresponding metric could be the number of units sold or revenue generated for each product.
- **Dimension field** - dimensions can include dimension fields, which represent additional information related to a dimension and are displayed in reports. For the Product dimension, it is logical to register the Brand dimension field.

It's important to note that although you should specify table column names for metric and dimension objects, the dashboard system is data-nature agnostic. This means that in your data source class, you have the flexibility to decide how to generate the data, and it's not necessarily limited to data loaded from a database. There is a class `ReportDataQueryBuilder` that greatly simplifies building database-driven data sources, but its use is optional.

::: tip
When creating database-driven data sources, ensure that the dimension, dimension fields, and metric columns are indexed for optimal query performance.
:::

### Default Widget Types

October CMS includes the following widget types:

Type | Description
------------- | -------------
**Indicator** | displays a single data source metric value, such as the total number of pageviews over the selected dashboard period.
**Table** | capable of displaying multiple dimension values and metrics, like product names, numbers of units sold, and total sales amount.
**Chart** | supports line and bar charts. In line charts, the horizontal axis shows dimension values, while the vertical axis shows metric values.
**Section Title** | Shows a static section title, such as 'Traffic Information'. This widget can also display the currently selected reporting interval.
**Text Notice** | contains a static title and paragraph text to present any information related to the dashboard.

## Creating Default Plugin Dashboards

Plugins can create and install custom dashboards in October CMS by using the `syncAll` method on the Dashboard model. This method synchronizes dashboard definitions with the database, creating entries for each dashboard configuration.

```php
use Dashboard\Models\Dashboard;

...

Dashboard::syncAll($owner, [
    'my-dashboard' => [
        'name' => 'My Dashboard',
        'icon' => 'icon-chart-bar',
        'showInterval' => true
    ]
]);
```

The first argument is the owner class instance or class name that owns the dashboards. The second argument is an array of dashboard definitions keyed by their field/code name. Each definition should include a `name`, `icon`, and optionally `showInterval` to control whether the date interval selector is visible.
