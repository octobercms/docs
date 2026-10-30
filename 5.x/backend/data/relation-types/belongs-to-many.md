---
previousPath: extend/database/relations.md#many-to-many
subtitle: Define a many-to-many relation that links models through a join table.
---
# Belongs To Many

`$belongsToMany` defines a many-to-many relation, where models are linked through a join table. For example, a user can have many roles, and each role is shared by many users.

```php
class User extends Model
{
    public $belongsToMany = [
        'roles' => \Acme\Blog\Models\Role::class
    ];
}
```

## Table Structure

A many-to-many relation needs three tables: `users`, `roles` and a join table called `role_user`. The join table name combines both model names in alphabetical order and contains the `user_id` and `role_id` columns. Create it in a [migration](../migrations.md).

```php
Schema::create('role_user', function($table) {
    $table->integer('user_id')->unsigned();
    $table->integer('role_id')->unsigned();
    $table->primary(['user_id', 'role_id']);
});
```

## Accessing the Relation

Access the related models using a property with the same name as the relation.

```php
$user = User::find(1);

foreach ($user->roles as $role) {
    // ...
}
```

Call the relation as a method to add further constraints to the query.

```php
$roles = User::find(1)->roles()->orderBy('name')->get();
```

## Custom Table and Keys

Use the `table` parameter to name the join table, and the `key` and `otherKey` parameters to name its columns. The `key` is the foreign key of the model defining the relation, while the `otherKey` is the foreign key of the model being joined.

```php
public $belongsToMany = [
    'roles' => [
        \Acme\Blog\Models\Role::class,
        'table' => 'acme_blog_role_user',
        'key' => 'my_user_id',
        'otherKey' => 'my_role_id'
    ]
];
```

## Pivot Data

Each related model has a `pivot` attribute representing its row in the join table. Only the model keys are available by default, so list any extra columns using the `pivot` parameter.

```php
public $belongsToMany = [
    'roles' => [
        \Acme\Blog\Models\Role::class,
        'pivot' => ['column1', 'column2']
    ]
];
```

The columns are then available on each related model.

```php
foreach ($user->roles as $role) {
    echo $role->pivot->column1;
}
```

Set the `timestamps` parameter to `true` to maintain `created_at` and `updated_at` columns on the join table automatically.

```php
public $belongsToMany = [
    'roles' => [\Acme\Blog\Models\Role::class, 'timestamps' => true]
];
```

To represent the join table with your own model, use the `pivotModel` parameter. The class should extend `October\Rain\Database\Pivot`.

```php
public $belongsToMany = [
    'roles' => [
        \Acme\Blog\Models\Role::class,
        'pivotModel' => \Acme\Blog\Models\UserRolePivot::class
    ]
];
```

## Allowing Duplicate Relations

To attach the same model more than once, each time with different pivot data, give the join table an incrementing primary key instead of a composite one.

```php
Schema::create('role_user', function($table) {
    $table->increments('id');
    $table->integer('user_id')->unsigned();
    $table->integer('role_id')->unsigned();
});
```

Set the `pivotKey` parameter to the incrementing column, along with a custom `pivotModel`.

```php
public $belongsToMany = [
    'roles' => [
        \Acme\Blog\Models\Role::class,
        'pivotModel' => \Acme\Blog\Models\UserRolePivot::class,
        'pivotKey' => 'id'
    ]
];
```

The pivot model sets the `$incrementing` property to `true`.

```php
class UserRolePivot extends \October\Rain\Database\Pivot
{
    public $incrementing = true;
}
```

## Parameters

The following parameters are supported by `belongsToMany` relations.

Parameter | Description
------------- | -------------
**table** | the name of the join table. Default: both model names in alphabetical order, for example `role_user`.
**key** | the key column name of the defining model (inside pivot table). Default: the model name with an `_id` suffix, for example `user_id`.
**otherKey** | the key column name of the related model (inside pivot table). Default: the model name with an `_id` suffix, for example `role_id`.
**parentKey** | the key column name of the defining model (inside defining model table). Default: `id`.
**relatedKey** | the key column name of the related model (inside related model table). Default: `id`.
**pivot** | an array of pivot columns found in the join table, available via `$model->pivot`.
**timestamps** | if `true`, the join table contains `created_at` and `updated_at` columns. Default: `false`.
**detach** | if set to `false`, the related model will not be detached when the primary model is deleted or the relationship is destroyed. Default: `true`.
**pivotModel** | a custom model class for the pivot relation. Default: `October\Rain\Database\Pivot`.
**pivotSortable** | a sort order column for the pivot table, used with the [`SortableRelation` trait](../model-traits/sortable-relation.md).
**pivotKey** | an incrementing ID column for the pivot table, used with a custom `pivotModel` that allows duplicate relations.

The [common parameters](../relation-types.md#common-parameters) are also supported.

## Inverse Relation

The inverse of a many-to-many relation is also a `$belongsToMany` relation, defined on the related model. All the same table and key parameters are available.

```php
class Role extends Model
{
    public $belongsToMany = [
        'users' => \Acme\Blog\Models\User::class
    ];
}
```

#### See Also

::: also
* [Morph To Many](./morph-to-many.md)
* [Sortable Relation Trait](../model-traits/sortable-relation.md)
* [Relationships](../relationships.md)
:::
