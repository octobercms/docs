---
previousPath: extend/database/relations.md#defining-the-inverse-relation
subtitle: Define the inverse of a hasOne or hasMany relation where this model holds the foreign key.
---
# Belongs To

`$belongsTo` defines the inverse of a [`hasOne`](./has-one.md) or [`hasMany`](./has-many.md) relation, where this model holds the foreign key. For example, a `Phone` model belongs to the `User` that owns it.

```php
class Phone extends Model
{
    public $belongsTo = [
        'user' => \Acme\Blog\Models\User::class
    ];
}
```

## Accessing the Relation

Access the related model using a property with the same name as the relation.

```php
$user = Phone::find(1)->user;
```

## Custom Keys

The relation looks for a foreign key named after the relation with an `_id` suffix, in this case `user_id` on the phone, which refers to the `id` column of the user. Use the `key` and `otherKey` parameters to change these columns.

```php
public $belongsTo = [
    'user' => [\Acme\Blog\Models\User::class, 'key' => 'my_user_id', 'otherKey' => 'my_id']
];
```

## Default Models

A `belongsTo` relation can return a default model when the relation is empty, which removes the need for conditional checks in your code. This is often called the [Null Object pattern](https://en.wikipedia.org/wiki/Null_Object_pattern). Set the `default` parameter to `true` to return an empty model.

```php
public $belongsTo = [
    'user' => [\Acme\Blog\Models\User::class, 'default' => true]
];
```

Pass an array to fill the default model with attributes.

```php
public $belongsTo = [
    'user' => [
        \Acme\Blog\Models\User::class,
        'default' => ['name' => 'Guest']
    ]
];
```

## Parameters

The following parameters are supported by `belongsTo` relations.

Parameter | Description
------------- | -------------
**key** | the foreign key column on this model. Default: the relation name with an `_id` suffix, for example `user_id`.
**otherKey** | the column on the related model that the foreign key refers to. Default: `id`.
**default** | returns a default model when the relation is empty. Set to `true` for an empty model, or an array of attributes to fill it with.

The [common parameters](../relation-types.md#common-parameters) are also supported.

#### See Also

::: also
* [Has One](./has-one.md)
* [Has Many](./has-many.md)
* [Relationships](../relationships.md)
:::
