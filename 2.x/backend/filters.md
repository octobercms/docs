# Filters

October CMS provides features for filtering database records. For behaviors that support filters, you can define a **filter** option to enable the feature. Scopes are often stored in the model configuration directory as **scopes.yaml**.

## Configuring a Behavior

The [List Behavior](../backend/lists.md) and [Relation Behavior](../backend/relations.md) can be filtered by [adding a filter definition](../backend/lists.md#oc-filtering-the-list) to the configuration.

```yaml
# ===================================
#  List Behavior Config
# ===================================

# ...

# Displays the list filter
filter: $/october/test/models/user/scopes.yaml
```

## Defining Filter Scopes

Similarly filters are driven by their own configuration file that contain filter scopes, each scope is an aspect by which the list can be filtered. The next example shows a typical contents of the filter definition file.

```yaml
# ===================================
# Filter Scope Definitions
# ===================================

scopes:

    category:
        label: Category
        modelClass: Acme\Blog\Models\Category
        conditions: category_id in (:filtered)
        nameFrom: name

    status:
        label: Status
        type: group
        conditions: status in (:filtered)
        options:
            pending: Pending
            active: Active
            closed: Closed

    published:
        label: Hide published
        type: checkbox
        default: 1
        conditions: is_published <> true

    approved:
        label: Approved
        type: switch
        default: 2
        conditions:
            - is_approved <> true
            - is_approved = true

    created_at:
        label: Date
        type: date
        conditions: created_at >= ':filtered'

    published_at:
        label: Date
        type: daterange
        conditions: created_at >= ':after' AND created_at <= ':before'
```

<a id="oc-scope-options"></a>
### Scope Options

For each scope you can specify these options (where applicable):

Option | Description
------------- | -------------
**label** | a name when displaying the filter scope to the user.
**type** | defines how this scope should be rendered (see [Scope types](#oc-available-scope-types) below). Default: group.
**conditions** | enables or disables condition functions or specifies a raw where query statement to apply to each condition, see the scope type definition for details.
**modelScope** | specifies a [query scope method](../database/model.md#oc-query-scopes) defined in the **list model** to apply to the list query. The first argument will contain the query object (as per a regular scope method) and the second argument will contain the filtered value(s)
**options** | options to use if filtering by multiple items, this option can specify an array or a method name in the `modelClass` model.
**emptyOption** | an optional label for an intentional empty selection.
**nameFrom** | if filtering by multiple items, the attribute to display for the name, taken from all records of the `modelClass` model.
**default** | can either be integer (switch, checkbox, number) or array (group, date range, number range) or string (date).
**permissions** | the [permissions](users.md#oc-users-and-permissions) that the current backend user must have in order for the filter scope to be used. Supports either a string for a single permission or an array of permissions of which only one is needed to grant access.
**dependsOn** | a string or an array of other scope names that this scope [depends on](#oc-filter-scope-dependencies). When the other scopes are modified, this scope will update.

<a id="oc-filter-scope-dependencies"></a>
### Filter Dependencies

Filter scopes can declare dependencies on other scopes by defining the `dependsOn` [scope option](#oc-scope-options), which provide a server-side solution for updating scopes when their dependencies are modified. When the scopes that are declared as dependencies change, the defining scope will update dynamically. This provides an opportunity to change the available options to be provided to the scope.

```yaml
country:
    label: Country
    type: group
    conditions: country_id in (:filtered)
    modelClass: October\Test\Models\Location
    options: getCountryOptions

city:
    label: City
    type: group
    conditions: city_id in (:filtered)
    modelClass: October\Test\Models\Location
    options: getCityOptions
    dependsOn: country
```

In the above example, the `city` scope will refresh when the `country` scope has changed. Any scope that defines the `dependsOn` property will be passed all current scope objects for the Filter widget, including their current values, as an array that is keyed by the scope names.

```php
public function getCountryOptions()
{
    return Country::lists('name', 'id');
}

public function getCityOptions($scopes = null)
{
    if (!empty($scopes['country']->value)) {
        return City::whereIn('country_id', array_keys($scopes['country']->value))
            ->lists('name', 'id')
        ;
    }
    else {
        return City::lists('name', 'id');
    }
}
```

> **Note**: Scope dependencies with `type: group` are only supported at this stage.

<a id="oc-available-scope-types"></a>
## Available Scope Types

These types can be used to determine how the filter scope should be displayed.

<div class="content-list" markdown="1">

- [Text](#filter-text)
- [Number](#filter-number)
- [Group](#filter-group)
- [Checkbox](#filter-checkbox)
- [Switch](#filter-switch)
- [Date](#filter-date)
- [Date Range](#filter-daterange)
- [Clear](#filter-clear)

</div>

<a name="filter-text"></a>
### Text

`text` - filter using a plain text input with either `exact` or `contains` condition logic.

```yaml
username:
    label: Username
    type: text
```

To only allow finding the exact text pass **exact** as a `condition`. To find results that contain any part of the text pass **contains** to the conditions instead.

```yaml
username:
    label: Username
    type: text
    conditions:
        exact: true
```

You may pass custom SQL to the conditions as a string where `:value` contains the filtered value.

```yaml
username:
    label: Username
    type: text
    conditions:
        exact: username = :value
        contains: username like '%:value%'
```

Alternatively, you may define a custom `modelScope` in the model using the following example.

```yaml
username:
    label: Username
    type: text
    modelScope: textFilter
```

The **scopeTextFilter** method definition.

```php
function scopeTextFilter($query, $scope)
{
    if ($scope->condition === 'exact') {
        $query->where('username', $scope->value);
    }
    else {
        $query->where('username', 'LIKE', "%{$scope->value}%");
    }
}
```

<a name="filter-number"></a>
### Number

`number` - filter using a numeric value using `exact`, `between`, `greater` and `lesser` condition logic.

```yaml
age:
    label: Age
    type: number
    default: 14
    conditions:
        greater: true
```

You may pass custom SQL to the conditions as a string where `:value` contains the filtered value.

```yaml
age:
    label: Age
    type: number
    conditions:
        greater: age >= :value
        between: age >= ':min' and age <= ':max'
```

Alternatively, you may define a custom `modelScope` in the model using the following example.

```yaml
age:
    label: Age
    type: text
    modelScope: numberFilter
```

The **scopeNumberFilter** method definition.

```php
function scopeNumberFilter($query, $scope)
{
    if ($scope->condition === 'equals') {
        $query->where('age', $scope->value);
    }
    elseif ($scope->condition === 'between') {
        $query
            ->where('age', '>=', $scope->min)
            ->where('age', '<=', $scope->max);
    }
    elseif ($scope->condition === 'greater') {
        $query->where('age', '>=', $scope->value);
    }
    else {
        $query->where('age', '<=', $scope->value);
    }
}
```

<a name="filter-group"></a>
### Group

`group` - filters the list by a group of items, usually by a related model and requires a `nameFrom` or `options` definition. Eg: Status name as open, closed, etc.

```yaml
status:
    label: Status
    type: group
    conditions: status in (:filtered)
    default:
        pending: Pending
        active: Active
    options:
        pending: Pending
        active: Active
        closed: Closed
```

<a name="filter-checkbox"></a>
### Checkbox

`checkbox` - used as a binary checkbox to apply a predefined condition or query to the list, either on or off. Use 0 for off and 1 for on for default value

```yaml
published:
    label: Hide published
    type: checkbox
    default: 1
    conditions: is_published <> true
```

<a name="filter-switch"></a>
### Switch

`switch` - used as a switch to toggle between two predefined conditions or queries to the list, either indeterminate, on or off. Use 0 for off, 1 for indeterminate and 2 for on for default value

```yaml
approved:
    label: Approved
    type: switch
    default: 1
    conditions:
        - is_approved <> true
        - is_approved = true
```

<a name="filter-date"></a>
### Date

`date` - displays a date picker for a single date to be selected. The values available to be used in the conditions property are:

- `:filtered`: The selected date formatted as `Y-m-d`
- `:before`: The selected date formatted as `Y-m-d 00:00:00`, converted from the backend timezone to the app timezone
- `:after`: The selected date formatted as `Y-m-d 23:59:59`, converted from the backend timezone to the app timezone

```yaml
created_at:
    label: Date
    type: date
    minDate: '2001-01-23'
    maxDate: '2030-10-13'
    yearRange: 10
    conditions: created_at >= ':filtered'
```

<a name="filter-daterange"></a>
### Date Range

`daterange` - displays a date picker for two dates to be selected as a date range. The values available to be used in the conditions property are:

 - `:before`: The selected "before" date formatted as `Y-m-d H:i:s`
 - `:beforeDate`: The selected "before" date formatted as `Y-m-d`
 - `:after`: The selected "after" date formatted as `Y-m-d H:i:s`
 - `:afterDate`: The selected "after" date formatted as `Y-m-d`

```yaml
published_at:
    label: Date
    type: daterange
    minDate: '2001-01-23'
    maxDate: '2030-10-13'
    yearRange: 10
    conditions: created_at >= ':after' AND created_at <= ':before'
```

To use default value for Date and Date Range

```php
\MyController::extendListFilterScopes(function($filter) {
    $widget->addScopes([
        'Date Test' => [
            'label' => 'Date Test',
            'type' => 'daterange',
            'default' => $this->myDefaultTime(),
            'conditions' => "created_at >= ':after' AND created_at <= ':before'"
        ],
    ]);
});

// Return value must be instance of carbon
public function myDefaultTime()
{
    return [
        0 => Carbon::parse('2012-02-02'),
        1 => Carbon::parse('2012-04-02'),
    ];
}
```

<a name="filter-clear"></a>
### Clear

`clear` - adds a button that clears all the filters and their values.

```yaml
clear:
    label: Clear Filters
    type: clear
```
