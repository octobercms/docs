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

<a id="oc-defining-filter-scopes"></a>
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
        conditions: category_id in (:value)
        nameFrom: name

    status:
        label: Status
        type: group
        conditions: status in (:value)
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
        conditions:
            after: created_at >= ':value'
            between: created_at >= ':after' AND created_at <= ':before'
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
**default** | supply a default value for the filter, as either array, string or integer depending on the filter value.
**permissions** | the [permissions](users.md#oc-users-and-permissions) that the current backend user must have in order for the filter scope to be used. Supports either a string for a single permission or an array of permissions of which only one is needed to grant access.
**dependsOn** | a string or an array of other scope names that this scope [depends on](#oc-filter-scope-dependencies). When the other scopes are modified, this scope will reset.
**nameFrom** | a model attribute name used for displaying the filter label. Default: name.
**valueFrom** | defines a model attribute to use for the source value. Default comes from the scope name.

<a id="oc-filter-scope-dependencies"></a>
### Filter Dependencies

Filter scopes can declare dependencies on other scopes by defining the `dependsOn` [scope option](#oc-scope-options), which provide a server-side solution for updating scopes when their dependencies are modified. When the scopes that are declared as dependencies change, the defining scope will reset and update dynamically. This provides an opportunity to change the available options to be provided to the scope.

```yaml
country:
    label: Country
    type: group
    conditions: country_id in (:value)
    modelClass: October\Test\Models\Location
    options: getCountryOptions

city:
    label: City
    type: group
    conditions: city_id in (:value)
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
        return City::whereIn('country_id', $scopes['country']->value)->lists('name', 'id');
    }
    else {
        return City::lists('name', 'id');
    }
}
```

You can filter the filter scope definitions by overriding the `filterScopes` method inside the Model used. This allows you to manipulate visibility and other scope properties based on other scope values. The method takes two arguments **$scopes** will represent an object of the fields already defined by the [scope configuration](#oc-defining-filter-scopes) and **$context** represents the active filter context.

```php
public function filterScopes($scopes, $context = null)
{
    if ($scopes->disable_roles->value) {
        $scopes->roles->hidden = true;
    }
}
```

The above logic will hide the `roles` scope if the `disable_roles` value is checked. The logic will be applied when the filter first loads and also when updated by a scope dependency. For example, here is the associated filter scope definitions.

```yaml
disable_roles:
    type: checkbox
    label: Disable Roles

roles:
    type: text
    label: Role
    dependsOn: disable_roles
```

<a id="oc-available-scope-types"></a>
## Available Scope Types

These types can be used to determine how the filter scope should be displayed.

<div class="content-list" markdown="1">

- [Checkbox](#filter-checkbox)
- [Switch](#filter-switch)
- [Text](#filter-text)
- [Number](#filter-number)
- [Dropdown](#filter-dropdown)
- [Group](#filter-group)
- [Date](#filter-date)

</div>

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

`switch` - used as a switch to toggle between two predefined conditions or queries to the list, either indeterminate, on or off. Use 0 for off, 1 for indeterminate and 2 for on for default value.

```yaml
approved:
    label: Approved
    type: switch
    default: 1
    conditions:
        - is_approved <> true
        - is_approved = true
```

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

The **scopeTextFilter** method definition where the value is found in `$scope->value`.

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

You may pass custom SQL to the conditions as a string where `:value`, `:min` and `:max` contain the filtered values.

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

The **scopeNumberFilter** method definition with values found in `$scope->value`, `$scope->min` and `$scope->max`.

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

<a name="filter-dropdown"></a>
### Dropdown

`dropdown` - filter using a single selection of multiple items.

```yaml
status:
    label: Status
    type: dropdown
    options:
        pending: Pending
        active: Active
        closed: Closed
```

You may pass custom SQL to the conditions as a string where `:value` contains the filtered value.

```yaml
status:
    label: Status
    type: dropdown
    conditions: status = :value
    # ...
```


You may dynamically supply `options` by passing a model method.

```yaml
roles:
    label: Status
    type: dropdown
    options: getStatusOptions
```

<a name="filter-group"></a>
### Group

`group` - filter using a group of multiple items, usually by a related model or an array of predefined options.

To filter by a model, specify the `modelClass` and `nameFrom` properties to specify which model and attribute to use.

```yaml
roles:
    type: group
    label: Role
    nameFrom: name
    modelClass: October\Test\Models\Role
```

To filter by an array, specify an `options` property.

```yaml
status:
    label: Role
    type: group
    options:
        developer: Developer
        publisher: Publisher
```

You may pass custom SQL to the conditions as a string where `:value` contains the filtered value.

```yaml
status:
    label: Role
    type: group
    conditions: role in (:value)
    # ...
```

You may also pass a `default` value as an array with selected keys.

```yaml
status:
    # ...
    default:
        - developer
        - publisher
```

You may define a custom `modelScope` in the model using the following example.

```yaml
roles:
    label: Role
    type: group
    nameFrom: name
    modelClass: October\Test\Models\Role
    modelScope: groupFilter
```

The **scopeGroupFilter** method definition where the value is found in `$scope->value`.

```php
public function scopeGroupFilter($query, $scope)
{
    return $query->whereHas('roles', function($q) use ($scope) {
        $q->whereIn('id', $scope->value);
    });
}
```

You may dynamically supply `options` by passing a model method.

```yaml
roles:
    label: Role
    type: group
    nameFrom: name
    modelClass: October\Test\Models\Role
    options: getRoleGroupOptions
```

The **getRoleGroupOptions** method definition.

```php
public function getRoleGroupOptions()
{
    return $this->whereNull('parent_id')->pluck('name', 'id')->all();
}
```

<a name="filter-date"></a>
### Date

`date` - filer using a date value using `equals`, `between`, `before` and `after` condition logic.

```yaml
created_at:
    label: Created
    type: date
```

To only allow finding the exact date pass **equals** as a `condition`. To find results that contain any part of the text pass **between**, **before** or **after** to the conditions instead.

```yaml
created_at:
    label: Created
    type: date
    conditions:
        equals: true
```

You may pass a `default` value, ensuring it is wrapped in quotes to represent a string.

```yaml
created_at:
    label: Created
    type: date
    default: '2020-01-02'
```

You may set the `minDate` and `maxDate` to determine the minimum and maximum available date range.

```yaml
created_at:
    label: Date
    type: date
    minDate: '2001-01-23'
    maxDate: '2030-10-13'
```

You may pass custom SQL to the conditions as a string with supporting values.

```yaml
created_at:
    label: Created
    type: date
    conditions:
        before: created_at <= ':value'
        between: created_at >= ':after' AND created_at <= ':before'
```

The following parameters are supported.

- `:value`: selected date formatted as `Y-m-d 00:00:00`
- `:valueDate`: selected date formatted as `Y-m-d`
- `:before`: before date formatted as `Y-m-d 00:00:00`
- `:beforeDate`: before date formatted as `Y-m-d`
- `:after`: afterwards date formatted as `Y-m-d 00:00:00`
- `:afterDate`: afterwards date formatted as `Y-m-d`

Alternatively, you may define a custom `modelScope` in the model using the following example.

```yaml
created_at:
    label: Created
    type: date
    modelScope: dateFilter
```

The **scopeDateFilter** method definition with values found in `$scope->value`, `$scope->before` and `$scope->after`.

```php
function scopeDateFilter($query, $scope)
{
    if ($scope->condition === 'equals') {
        $query->where('created_at', $scope->value);
    }
    elseif ($scope->condition === 'between') {
        $query
            ->where('created_at', '>=', $scope->after)
            ->where('created_at', '<=', $scope->before);
    }
    elseif ($scope->condition === 'after') {
        $query->where('created_at', '>=', $scope->after);
    }
    else {
        $query->where('created_at', '<=', $scope->before);
    }
}
```
