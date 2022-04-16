---
subtitle: Learn how to filter records found in a list.
---
# Filtering Records

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
**type** | defines how this scope should be , see [filter scope definitions](../../element/definitions.md). Default: group.
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
