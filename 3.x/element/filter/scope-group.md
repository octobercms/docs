# Group

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
