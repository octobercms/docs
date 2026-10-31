---
previousPath: extend/lists/filters.md
subtitle: Add filters above a backend list so users can narrow down the records it shows.
---
# Filtering Records

Filters appear above a list and let users narrow down its records, for example by category, status or date. You define each filter as a scope in a **scopes.yaml** file, usually stored in the model's configuration directory, then point the list configuration to it.

```yaml
# config_list.yaml

# ...

# Displays the list filter
filter: $/acme/blog/models/post/scopes.yaml
```

## Adding Filters to a List

The [List Controller](./list-controller.md) and [Relation Controller](../relations/relation-controller.md) behaviors support filters. Add a **filter** property to the behavior configuration, as shown above, and the available filters are shown above the list. The property refers to a filter scopes file or supplies an array with the configuration.

## Defining Filter Scopes

::: aside
The available filter scope properties can be found on the [filter scope definitions](../../handbook/filter-scopes.md) page.
:::

The filter scopes file contains a set of **scopes**. Each scope is an aspect by which the list can be filtered. The following example shows a typical filter scopes file.

```yaml
# scopes.yaml
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

The `conditions` property specifies a raw where query statement to apply to the list query, and its format depends on the scope type. See [Filter Scopes](../../handbook/filter-scopes.md) for every scope type and property.

## Filter Dependencies

A scope can depend on other scopes by defining the `dependsOn` property. When a scope it depends on changes, the scope resets and updates on the server, so you can change the options it provides.

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

In this example, the `city` scope refreshes when the `country` scope changes. A scope that defines the `dependsOn` property is passed all current scope objects of the Filter widget, including their current values, keyed by the scope names.

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

### Filtering Scopes in the Model

To change scope properties based on other scope values, such as hiding a scope, override the `filterScopes` method in the model. The method takes two arguments: `$scopes` is an object holding the scopes already defined by the scope configuration, and `$context` is the active filter context.

```php
public function filterScopes($scopes, $context = null)
{
    if ($scopes->disable_roles->value) {
        $scopes->roles->hidden = true;
    }
}
```

This logic hides the `roles` scope when the `disable_roles` scope is checked. It runs when the filter first loads, and again whenever a scope dependency updates the filter. Here are the matching filter scope definitions.

```yaml
disable_roles:
    type: checkbox
    label: Disable Roles

roles:
    type: text
    label: Role
    dependsOn: disable_roles
```

#### See Also

::: also
* [Filter Scopes](../../handbook/filter-scopes.md)
* [Extending Filter Scopes](./extending.md#extending-filter-scopes)
* [Custom Filter Widgets](./filter-widgets.md)
* [Field Dependencies](../forms/field-dependencies.md)
:::
