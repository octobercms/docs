---
previousPath: extend/dashboards/data-sources.md
subtitle: Supply your plugin data to dashboard charts, tables and indicators with a data source class.
---
# Data Sources

A data source supplies data to dashboard reports as dimensions and metrics, so the built-in charts, tables and indicators can display it. A data source is a class that registers its dimensions and metrics, and returns data for them from the `fetchData` method.

```php
use Db;
use Carbon\Carbon;
use Dashboard\Classes\ReportMetric;
use Dashboard\Classes\ReportDimension;
use Dashboard\Classes\ReportDimensionField;
use Dashboard\Classes\ReportDataSourceBase;
use Dashboard\Classes\ReportFetchData;
use Dashboard\Classes\ReportFetchDataResult;
use Dashboard\Classes\ReportQueryBuilder;

class MyReportDataSource extends ReportDataSourceBase
{
    public function __construct()
    {
        // Register dimensions and metrics here
    }

    protected function fetchData(ReportFetchData $data): ReportFetchDataResult
    {
        // Construct and return a ReportFetchDataResult object,
        // or use the ReportQueryBuilder class to do the hard work.
    }
}
```

Data sources extend the `Dashboard\Classes\ReportDataSourceBase` class. Each data source must register at least one metric and one dimension, and implement the `fetchData` method, which returns a `ReportFetchDataResult` object. When your data comes from the database, the `ReportQueryBuilder` class builds and runs the query for you, based on the requested dimension and metrics. See the [Dash Controller](./dash-controller.md#supplying-data-with-data-sources) for an introduction to dimensions and metrics.

## Registering a Data Source

Plugins register their data sources in the [plugin registration file](../plugins/extending.md#registration-methods) (Plugin.php), using the `dataSources` key of the `registerDashboards` method. The keys of the array are the data source classes, and the values hold a label.

```php
public function registerDashboards()
{
    return [
        'dataSources' => [
            MyReportDataSource::class => [
                'label' => 'My Custom Data Source' // This can be a reference to a localization string
            ]
        ]
    ];
}
```

Every plugin can register any number of data sources. Create a data source for each type of data your plugin provides. For example, if a plugin offers both customer and sales data, two separate data sources make the widgets simpler to configure.

Use the `permissions` key to limit a data source to administrators with any of the listed permissions. Other administrators cannot select the data source or load its data.

```php
'dataSources' => [
    MyReportDataSource::class => [
        'label' => 'My Custom Data Source',
        'permissions' => ['acme.shop.view_reports']
    ]
]
```

Data sources can also be registered at runtime with the `registerDataSourceClass` method of the `Dashboard\Classes\DashManager` class, which accepts the permissions as an optional third argument.

## Building an Example Data Source

The rest of this page builds a data source for a simple ecommerce plugin, which displays sales data for products and categories as a table, a chart and an indicator. The plugin uses the following tables.

![image](https://raw.githubusercontent.com/octobercms/docs/develop/images/dashboards/data-source-data-structure.png)

### Registering Dimensions

Data sources register their metrics and dimensions in the constructor. Use the `registerDimension` method to register a dimension. The following registers the product dimension.

```php
const DIMENSION_PRODUCT = 'product';

public function __construct()
{
    $this->registerDimension(new ReportDimension(
        self::DIMENSION_PRODUCT,
        'acme_shop_products.id',
        'Product',
        'product_name'
    ));
}
```

The `registerDimension` method accepts a `ReportDimension` object. The constructor of `ReportDimension` takes the following arguments.

Argument | Type | Description
-------- | ---- | -----------
**$code** | `string` | specifies the dimension referral code. Your data source uses this code to tell dimensions apart in `fetchData` calls. It can be a simple string, for example, "city".
**$databaseColumnName** | `string` | specifies the dimension column name in the data source table. The query builders use the column name to construct database queries. Including the table name (`acme_shop_products` in this case) along with the column name is often necessary to avoid ambiguity when the data source query includes multiple tables. If your data source is not database-driven, any value can be used for this argument. In most instances, the dimension column corresponds to the primary key in the dimension table.
**$displayName** | `string` | specifies the dimension name used in reports. For example, in the Table widget, this could become the title of the dimension column. It is also used in the dimension dropdown of the widget configuration popup. The value can be a static string, or a reference to a localization string.
**$labelColumnName** | `?string` | specifies the name of the column for the dimension label. Use this column to provide a user-friendly label for the dimension. If this argument is not provided, the value of `$databaseColumnName` is used as the dimension label. When the label column name is provided, widget dimension sorting and filters use the dimension label value.

The `registerDimension` method returns the registered dimension object, allowing for chaining.

After registering the data source and dimension, you can see them in the dashboard widget configurator.

![image](https://raw.githubusercontent.com/octobercms/docs/develop/images/dashboards/dimension-dropdown.png)

### Registering Metrics

The products have two metrics: sale amount and quantity. Register them with the `registerMetric` method of the data source class.

```php
const METRIC_TOTAL_AMOUNT = 'total_amount';
const METRIC_TOTAL_QUANTITY = 'total_quantity';

public function __construct()
{
    ...

    $this->registerMetric(new ReportMetric(
        self::METRIC_TOTAL_AMOUNT,
        'acme_shop_sales.total',
        'Total amount',
        ReportMetric::AGGREGATE_SUM
    ));

    $this->registerMetric(new ReportMetric(
        self::METRIC_TOTAL_QUANTITY,
        'acme_shop_sales.quantity',
        'Quantity',
        ReportMetric::AGGREGATE_SUM
    ));
}
```

The `registerMetric` method accepts a `ReportMetric` object. The constructor of this class takes the following arguments.

Argument | Type | Description
-------- | ---- | -----------
**$code** | `string` | the metric referral code.
**$databaseColumnName** | `string` | the metric column name. Provide the table name along with the field name to avoid ambiguity in SQL queries.
**$displayName** | `string` | the metric name used in reports.
**$aggregateFunction** | `string` | the aggregate function for the metric. One of the `ReportMetric::AGGREGATE_XXX` constants.
**$intlFormatOptions** | `?array` | client-side formatting options, compatible with the `Intl.NumberFormat()` constructor options argument. Skip the argument to use the default formatting options.

The dashboard can aggregate metric data using one of the following functions.

```php
ReportMetric::AGGREGATE_SUM
ReportMetric::AGGREGATE_AVG
ReportMetric::AGGREGATE_MIN
ReportMetric::AGGREGATE_MAX
ReportMetric::AGGREGATE_COUNT
ReportMetric::AGGREGATE_NONE
ReportMetric::AGGREGATE_COUNT_DISTINCT
ReportMetric::AGGREGATE_COUNT_DISTINCT_NOT_NULL
```

Both metrics are totals, so the `SUM` function suits them best, and both constructors use `ReportMetric::AGGREGATE_SUM`.

After registering the metrics, you can add them to a dashboard widget configuration.

![image](https://raw.githubusercontent.com/octobercms/docs/develop/images/dashboards/metrics.png)

### Returning the Data

Data sources implement the `fetchData` method to return data for the requested dimension, metrics and dimension fields. The `ReportQueryBuilder` class provides a fluent interface for this.

The simplest way to implement `fetchData` is the `fromFetchData` static method, which configures the builder from the request data.

```php
protected function fetchData(ReportFetchData $data): ReportFetchDataResult
{
    if ($data->dimension->getCode() !== self::DIMENSION_PRODUCT) {
        throw new SystemException('Invalid dimension');
    }

    return ReportQueryBuilder::fromFetchData($data, 'acme_shop_products')
        ->dateColumn('acme_shop_sales.sale_date')
        ->onConfigureMetrics(function($query, $dimension, $metrics) {
            $query->leftJoin('acme_shop_sales', function($join) {
                $join->on('acme_shop_sales.product_id', '=', 'acme_shop_products.id');
            });
        })
        ->get($data->metricsConfiguration);
}
```

The `fromFetchData` method accepts the `ReportFetchData` object and the main table name. It configures the following from the request.

- The dimension and metrics
- Ordering, filtering, pagination and limits
- Date range and group interval settings
- The `totalsOnly` and `hideEmptyValues` flags

You then chain additional configuration.

- `dateColumn()` specifies the column used to filter by the date range the user selected.
- `timestampColumn()` is an optional column for relative time filtering, such as "past hour".
- `onConfigureMetrics()` is a callback to join tables or configure metric columns.
- `onConfigureQuery()` is a callback for additional query customization.

This configuration is enough to display the data source data in a table widget.

![image](https://raw.githubusercontent.com/octobercms/docs/develop/images/dashboards/table-all-data.png)

The use of `ReportQueryBuilder` is optional. The only requirement for the `fetchData` method is to return a `Dashboard\Classes\ReportFetchDataResult` object. If your data source does not use a database, or you need more control, you can load the data with native Laravel classes.

### Formatting Metric Values

By default, the dashboard formats metric data as numbers. If that does not suit a metric, you can configure it to display data in other formats. In the ecommerce example, the total amount should display as currency.

The final argument of the `ReportMetric` constructor takes an array of options compatible with the `options` argument of [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat), a browser API. The following configuration displays currency in the US format.

```php
$this->registerMetric(new ReportMetric(
    self::METRIC_TOTAL_AMOUNT,
    'acme_shop_sales.total',
    'Total amount',
    ReportMetric::AGGREGATE_SUM,
    [
        'style' => 'currency',
        'currency' => 'USD',
    ]
));
```

The dashboard displays the updated metric data as follows.

![image](https://raw.githubusercontent.com/octobercms/docs/develop/images/dashboards/currency.png)

### Displaying Extra Dimension Data

The products table has a `brand` column, and each product links to a row in the categories table. Dimension fields let reports display the brand and category names along with the product name.

Add dimension fields to a dimension in the data source constructor. The dimension object has an `addDimensionField` method, which accepts a configured dimension field object. The following adds fields for the brand and category names to the product dimension.

```php
$this->registerDimension(new ReportDimension(
    self::DIMENSION_PRODUCT,
    'acme_shop_products.id',
    'Product',
    'product_name'
))->addDimensionField(new ReportDimensionField(
    'oc_field_brand',
    'Brand',
    'brand',
    true,
    true
))->addDimensionField(new ReportDimensionField(
    'oc_field_category',
    'Category',
    'acme_shop_categories.category_name',
    true,
    true
));
```

The `ReportDimensionField` constructor takes these arguments.

Argument | Type | Description
-------- | ---- | -----------
**$code** | `string` | specifies the field referral code. The code must begin with the `oc_field_` prefix.
**$displayName** | `string` | specifies the field name to use in reports. For example, in the Table widget, this could become the title of the dimension column. It is also used in the dimension dropdown of the widget configuration popup. The value can be a static string, or a reference to a localization string.
**$columnName** | `?string` | optional database column name for filtering or sorting. Provide the column name to enable sorting and filtering. In most cases, you should specify a value for this argument.
**$sortable** | `bool` | specifies if the field is sortable.
**$filterable** | `bool` | specifies if the field is filterable.

After registration, the dimension field appears in the dashboard widget configurators.

![image](https://raw.githubusercontent.com/octobercms/docs/develop/images/dashboards/dimension-fields.png)

Next, return data for the dimension fields. `ReportQueryBuilder` does not do this automatically, so configure its underlying query to add a join and the matching columns in the `onConfigureQuery` callback.

```php
ReportQueryBuilder::fromFetchData($data, 'acme_shop_products')
    ->dateColumn('acme_shop_sales.sale_date')
    ->onConfigureMetrics(function($query, $dimension, $metrics) {
        $query->leftJoin('acme_shop_sales', function($join) {
            $join->on('acme_shop_sales.product_id', '=', 'acme_shop_products.id');
        });
    })
    ->onConfigureQuery(function($query, $dimension, $metrics) {
        $query->leftJoin('acme_shop_categories', function($join) {
            $join->on('acme_shop_categories.id', '=', 'acme_shop_products.category_id');
        });

        $query->addSelect([
            Db::raw('max(acme_shop_products.brand) as oc_field_brand'),
            Db::raw('max(acme_shop_categories.category_name) as oc_field_category'),
        ]);
    })
    ->get($data->metricsConfiguration);
```

The query is grouped by the product ID column (the dimension), so every other column needs an aggregate function to avoid MySQL errors. That is why the brand and category use the `max` function.

The dimension fields are now available in the dashboard. Users can configure widgets to sort data by the brand or category column.

![image](https://raw.githubusercontent.com/octobercms/docs/develop/images/dashboards/dimension-fields-table.png)

### Using the Data Source in Reports

A configured data source is ready for use in all types of dashboard widgets without additional setup. For example, you can configure the Chart widget to display the top products.

![image](https://raw.githubusercontent.com/octobercms/docs/develop/images/dashboards/chart-widget.png)

In this example, the chart widget is set up as follows.

- Chart type: Bar
- Direction: Horizontal
- Data source: Our test data source
- Dimension: Product
- Metrics: Total amount
- Limit: 5
- Sort by: Total amount
- Sort order: Descending
- Display: Dashboard interval

You can also configure the Indicator widget to display totals, with the option to filter the data by a specific brand or category.

![image](https://raw.githubusercontent.com/octobercms/docs/develop/images/dashboards/indicator-widgets.png)

In this example, the Smartphones Indicator widget is set up as follows.

- Data source: Our test data source
- Dimension: Product
- Value: Total amount
- Filters attribute: Category
- Filter operation: Equals
- Value: Smartphones

![image](https://raw.githubusercontent.com/octobercms/docs/develop/images/dashboards/indicator-smartphones.png)

The iPhones Indicator widget uses the following filter configuration.

- Attribute: Product
- Operation: Includes
- Value: iPhone

![image](https://raw.githubusercontent.com/octobercms/docs/develop/images/dashboards/indicator-iphones.webp)

## Building Queries Manually

For more control, build the query step by step with the fluent interface instead of `fromFetchData`.

```php
protected function fetchData(ReportFetchData $data): ReportFetchDataResult
{
    return ReportQueryBuilder::table('acme_shop_products')
        ->dimension($data->dimension)
        ->metrics($data->metrics)
        ->orderBy($data->orderRule)
        ->filters($data->dimensionFilters)
        ->limit($data->limit)
        ->groupInterval($data->groupInterval)
        ->hideEmptyValues($data->hideEmptyDimensionValues)
        ->dateRange($data->dateStart, $data->dateEnd, 'acme_shop_sales.sale_date')
        ->totalsOnly($data->totalsOnly)
        ->onConfigureMetrics(function($query, $dimension, $metrics) {
            $query->leftJoin('acme_shop_sales', function($join) {
                $join->on('acme_shop_sales.product_id', '=', 'acme_shop_products.id');
            });
        })
        ->get($data->metricsConfiguration);
}
```

### Grouping by a Date Interval

For date-based dimensions, you can use named methods instead of passing interval constants.

```php
ReportQueryBuilder::fromFetchData($data, 'orders')
    ->dateColumn('order_date')
    ->groupByYear()    // or groupByMonth(), groupByWeek(), groupByDay(), groupByQuarter()
    ->get($data->metricsConfiguration);
```

### Applying Configuration Conditionally

Use the `when()` method to apply configuration only when a condition is met.

```php
ReportQueryBuilder::fromFetchData($data, 'orders')
    ->dateColumn('order_date')
    ->when($data->limit, fn($builder) => $builder->limit($data->limit))
    ->when($onlyCompleted, fn($builder) => $builder->onConfigureQuery(
        fn($query) => $query->where('status', 'completed')
    ))
    ->get($data->metricsConfiguration);
```

### Reading the Request

The `ReportFetchData` object passed to `fetchData` has the following properties.

Property | Type | Description
-------- | ---- | -----------
**$dimension** | `ReportDimension` | the dimension to group the data by
**$dimensionCode** | `string` | the dimension code string
**$metrics** | `array` | the metrics to return (array of `ReportMetric` objects)
**$metricCodes** | `array` | the metric code strings
**$metricsConfiguration** | `array` | the report metrics configuration (array of `ReportMetricConfiguration` objects)
**$dateStart** | `?Carbon` | the start date
**$dateEnd** | `?Carbon` | the end date
**$compareDateStart** | `?Carbon` | the comparison period start date (for period-over-period comparisons)
**$compareDateEnd** | `?Carbon` | the comparison period end date
**$startTimestamp** | `?int` | optional starting timestamp for relative intervals (e.g., past hour)
**$dimensionFilters** | `array` | the filters to apply to the dimension values (array of `ReportDimensionFilter` objects)
**$groupInterval** | `?string` | the group interval (one of the `GROUP_INTERVAL_*` constants: DAY, WEEK, MONTH, QUARTER, YEAR, FULL)
**$orderRule** | `?ReportDataOrderRule` | the data ordering rule
**$limit** | `?int` | the maximum number of records to return
**$paginationParams** | `?ReportDataPaginationParams` | the pagination parameters
**$hideEmptyDimensionValues** | `bool` | indicates whether empty dimension values must be removed from the dataset
**$totalsOnly** | `bool` | indicates that the method should only return total values for metrics, and not rows
**$resetCache** | `bool` | indicates that the cache should be reset

### ReportQueryBuilder Methods

The `ReportQueryBuilder` class supports the following methods.

Method | Description
------ | -----------
`table($name)` | Static constructor, creates a builder for the given table
`fromFetchData($data, $table)` | Static constructor, creates a builder from ReportFetchData
`dimension($dimension)` | Sets the dimension to group by
`metrics($metrics)` | Sets the metrics array
`addMetric($metric)` | Adds a single metric
`orderBy($rule)` | Sets the ordering rule
`filters($filters)` | Sets dimension filters
`limit($limit)` | Sets maximum number of results
`paginate($params)` | Sets pagination parameters
`groupInterval($interval)` | Sets the grouping interval
`groupByDay()` | Groups by day
`groupByWeek()` | Groups by week
`groupByMonth()` | Groups by month
`groupByQuarter()` | Groups by quarter
`groupByYear()` | Groups by year
`withoutGrouping()` | Disables grouping (full interval)
`dateRange($start, $end, $column)` | Sets date range and optional column
`dateColumn($column)` | Sets the date column for filtering
`sinceTimestamp($ts, $column)` | Sets relative timestamp filtering
`timestampColumn($column)` | Sets the timestamp column
`hideEmptyValues($hide)` | Hides null dimension values
`totalsOnly($totals)` | Returns only totals, not rows
`onConfigureQuery($callback)` | Registers query customization callback
`onConfigureMetrics($callback)` | Registers metrics configuration callback
`onConfigureMetric($callback)` | Registers per-metric configuration callback
`when($condition, $callback)` | Conditionally applies configuration
`get($metricsConfig, $urlTemplate)` | Executes query and returns results
`toSql()` | Returns the SQL string (for debugging)

## Returning Pre-Aggregated Data

`ReportQueryBuilder` and `ReportDataQueryBuilder` aggregate data at the SQL level using `GROUP BY` and aggregate functions. The query builders tell the framework about this, so the results are only normalized (gap-filled with missing periods) and not aggregated again in PHP.

If your data source performs its own aggregation, for example by fetching pre-grouped data from an external API or by using custom SQL, set the pre-aggregated flag on the result to prevent double aggregation.

```php
protected function fetchData(ReportFetchData $data): ReportFetchDataResult
{
    // Data is already aggregated by the group interval
    $rows = $this->fetchFromExternalApi($data);

    $result = new ReportFetchDataResult($rows);
    $result->setPreAggregated();

    return $result;
}
```

When the result is pre-aggregated, the framework still normalizes the data for date dimensions, filling in missing date periods with null values, but does not aggregate metric values again. This matters for aggregate functions like `COUNT` and `AVG`, where aggregating again would produce incorrect results.

::: tip
If your data source returns raw daily rows and relies on the framework to aggregate them into weeks, months and so on, do **not** set this flag. The framework handles the aggregation automatically.
:::

Pre-aggregated date rows are keyed by the first date of their group, for example the Monday of a week or the first day of a month, including a group that begins before the selected date range. When widgets display totals or relative bars, return the totals with the `setMetricTotals` method of the result, because adding up grouped rows gives the wrong total for metrics such as unique visitors.

```php
$result->setMetricTotals(['unique_visitors' => $totalUniqueVisitors]);
```

## Showing a Message in the Widget

To show a message inside the widget, for example when an external service is not configured, throw an `ApplicationException` from the `fetchData` method.

## Formatting Values with a Callback

`Intl.NumberFormat` handles most numeric formatting, such as currencies, percentages and compact notation. Some metrics need custom string transformations that standard number formatting cannot produce, for example displaying durations as "2:30h" instead of "150" minutes.

The `setDisplayFormatter` method defines a server-side callback that formats metric values into readable strings. Tables and indicators display the formatted value, while charts use the raw numeric values.

```php
$this->registerMetric(
    (new ReportMetric(
        self::METRIC_DURATION,
        'acme_entries.duration_minutes',
        'Duration',
        ReportMetric::AGGREGATE_SUM
    ))->setDisplayFormatter(function ($value) {
        $totalMinutes = (int) $value;
        $hours = intdiv($totalMinutes, 60);
        $minutes = $totalMinutes % 60;
        return sprintf('%d:%02dh', $hours, $minutes);
    })
);
```

When a display formatter is set:

- **Tables** display the formatted string in cell values and totals, such as "2:30h".
- **Indicators** display the formatted string as the main value.
- **Charts** use the raw numeric values, since formatting would break graph rendering.

You can combine `setDisplayFormatter` with `intlFormatOptions`. If both are set, the display formatter takes precedence for tables and indicators, while `intlFormatOptions` serves as a fallback where server-side formatting is not available.

```php
$this->registerMetric(
    (new ReportMetric(
        self::METRIC_DURATION,
        'acme_entries.duration_minutes',
        'Duration',
        ReportMetric::AGGREGATE_SUM,
        ['style' => 'unit', 'unit' => 'minute'] // Fallback for charts
    ))->setDisplayFormatter(function ($value) {
        // Used for tables and indicators
        $hours = intdiv((int) $value, 60);
        $minutes = (int) $value % 60;
        return sprintf('%d:%02dh', $hours, $minutes);
    })
);
```

## Upgrading from ReportDataQueryBuilder

The original `ReportDataQueryBuilder` class is still available for backward compatibility. It uses a constructor with 15 parameters.

```php
use Dashboard\Classes\ReportDataQueryBuilder;

$reportQueryBuilder = new ReportDataQueryBuilder(
    'acme_shop_products',      // Table name
    $data->dimension,          // Dimension
    $data->metrics,            // Metrics array
    $data->orderRule,          // Order rule
    $data->dimensionFilters,   // Filters
    $data->limit,              // Limit
    $data->paginationParams,   // Pagination
    $data->groupInterval,      // Group interval
    $data->hideEmptyDimensionValues,  // Hide empty values
    $data->dateStart,          // Date start
    $data->dateEnd,            // Date end
    $data->startTimestamp,     // Start timestamp
    'sale_date',               // Date column
    null,                      // Timestamp column
    $data->totalsOnly          // Totals only
);

$reportQueryBuilder->onConfigureMetrics(function($query, $dimension, $metrics) {
    // Configure metrics...
});

return $reportQueryBuilder->getFetchDataResult($data->metricsConfiguration);
```

The class also provides a `fromFetchData` static method as a shorthand.

```php
$reportQueryBuilder = ReportDataQueryBuilder::fromFetchData(
    $data,
    'acme_shop_products',
    'sale_date',  // Date column
    null          // Timestamp column
);
```

New implementations should use `ReportQueryBuilder`, which has a cleaner fluent interface. The equivalent of the shorthand above is `ReportQueryBuilder::fromFetchData($data, 'acme_shop_products')->dateColumn('sale_date')`, followed by `->get($data->metricsConfiguration)`.

#### See Also

::: also
* [Dash Controller](./dash-controller.md)
* [Report Widgets](./report-widgets.md)
* [Vue Report Widgets](./vue-report-widgets.md)
:::
