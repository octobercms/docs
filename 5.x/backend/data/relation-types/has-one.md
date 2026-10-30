---
previousPath: extend/database/relations.md#one-to-one
subtitle: Define a one-to-one relation where the related model holds the foreign key.
---
# Has One

`$hasOne` defines a one-to-one relation, where the related model holds a foreign key to this model. For example, a `User` model might have one `Phone`.

```php
class User extends Model
{
    public $hasOne = [
        'phone' => \Acme\Blog\Models\Phone::class
    ];
}
```

## Accessing the Relation

Access the related model using a property with the same name as the relation.

```php
$phone = User::find(1)->phone;
```

## Custom Keys

The relation assumes the `Phone` model has a `user_id` foreign key, based on the model name, which refers to the `id` column of the user. Use the `key` and `otherKey` parameters to change these columns.

```php
public $hasOne = [
    'phone' => [\Acme\Blog\Models\Phone::class, 'key' => 'my_user_id', 'otherKey' => 'my_id']
];
```

## Parameters

The following parameters are supported by `hasOne` relations.

Parameter | Description
------------- | -------------
**key** | the foreign key column on the related model. Default: the model name with an `_id` suffix, for example `user_id`.
**otherKey** | the column on this model that the foreign key refers to. Default: `id`.

The [common parameters](../relation-types.md#common-parameters) are also supported.

## Inverse Relation

Define the inverse on the `Phone` model using a [`belongsTo` relation](./belongs-to.md), so the phone can access the user that owns it.

```php
class Phone extends Model
{
    public $belongsTo = [
        'user' => \Acme\Blog\Models\User::class
    ];
}
```

#### See Also

::: also
* [Belongs To](./belongs-to.md)
* [Has Many](./has-many.md)
* [Relationships](../relationships.md)
:::
