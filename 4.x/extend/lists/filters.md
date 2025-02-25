---
subtitle: Learn how to filter records found in a list.
---
# Filtering Records

October CMS provides features for filtering database records. For behaviors that support filters, you can define a **filter** option to enable the feature. Scopes are often stored in the model configuration directory as **scopes.yaml**.

## Configuring a Behavior

The [List Controller](./list-controller.md) and [Relation Controller](../forms/relation-controller.md) backend behaviors can be filtered by adding a **filter** property to the configuration. When defined, the available filters are shown above the list.

```yaml
# config_list.yaml

# ...

# Displays the list filter
filter: $/october/test/models/user/scopes.yaml
```

## Defining Filter Scopes

::: aside
The available filter scope properties can be found on the [filter scope definitions](../../element/filter-scopes.md) page.
:::

Similarly filters are driven by their own configuration file that contain filter **scopes**. Each scope is an aspect by which the list can be filtered. The next example shows a typical contents of the filter definition file.

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

### Filter Dependencies

Filter scopes can declare dependencies on other scopes by defining the `dependsOn` property, which provide a server-side solution for updating scopes when their dependencies are modified. When the scopes that are declared as dependencies change, the defining scope will reset and update dynamically. This provides an opportunity to change the available options to be provided to the scope.

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

You can filter the filter scope definitions by overriding the `filterScopes` method inside the Model used. This allows you to manipulate visibility and other scope properties based on other scope values. The method takes two arguments **$scopes** will represent an object of the scopes already defined by the scope configuration and **$context** represents the active filter context.

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
