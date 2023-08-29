---
subtitle: Filter Scope
---
# Group

`group` - filter using a group of multiple items, usually by a related model or an array of predefined options.

To filter by a model, specify the `modelClass` and `nameFrom` properties to specify which model and attribute to use.

```yaml
roles:
    label: Role
    type: group
    nameFrom: name
    modelClass: October\Test\Models\Role
```

The following properties are available for the filter.

Property | Description
------------- | -------------
**options** | available options for the filter, as an array.
**optionsMethod** | take options from a method defined on the model or as a static method, eg `Class::method`.
**conditions** | a custom SQL select statement to use for the filter.
**nameFrom** | the column name to use in the model class, used for displaying the name. Default: `name`.
**modelClass** | class of the model to use for the available filter records
nameFrom
**modelScope** | applies a [query scope method](../../extend/database/model.md) to the filter query, can be a model method name or a static PHP class method (`Class::method`). The first argument will contain the model that the widget will be attaching its value to, i.e. the parent model.

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

## PHP Interface

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
