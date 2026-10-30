---
previousPath: extend/database/relations.md#has-one-through
subtitle: Access one distant model through an intermediate model.
---
# Has One Through

`$hasOneThrough` links to a single distant model through an intermediate model. For example, if each supplier has one user, and each user has one history record, the supplier can access the user's history through the user.

```php
class Supplier extends Model
{
    public $hasOneThrough = [
        'userHistory' => [
            \Acme\Supplies\Models\History::class,
            'through' => \Acme\Supplies\Models\User::class
        ]
    ];
}
```

The first value is the final model to access, and the `through` parameter is the intermediate model.

## Table Structure

The `history` table has no `supplier_id` column. Instead, the relation finds the user with a matching `supplier_id`, then uses its ID to query the `history` table.

```
suppliers
    id - integer

users
    id - integer
    supplier_id - integer

history
    id - integer
    user_id - integer
```

## Accessing the Relation

Access the distant model using a property with the same name as the relation.

```php
$history = Supplier::find(1)->userHistory;
```

## Custom Keys

The usual foreign key conventions are used for the query. Use the `key`, `throughKey`, `otherKey` and `secondOtherKey` parameters to change them, as shown for the [`hasManyThrough` relation](./has-many-through.md#custom-keys).

## Parameters

The following parameters are supported by `hasOneThrough` relations.

Parameter | Description
------------- | -------------
**through** | the intermediate model class. Required.
**key** | the foreign key on the intermediate model.
**throughKey** | the foreign key on the final model.
**otherKey** | the local key on this model.
**secondOtherKey** | the local key on the intermediate model.

The [common parameters](../relation-types.md#common-parameters) are also supported.

#### See Also

::: also
* [Has Many Through](./has-many-through.md)
* [Relationships](../relationships.md)
:::
