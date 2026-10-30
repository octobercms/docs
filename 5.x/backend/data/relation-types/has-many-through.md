---
previousPath: extend/database/relations.md#has-many-through
subtitle: Access many distant models through an intermediate model.
---
# Has Many Through

`$hasManyThrough` provides a short-cut to many distant models through an intermediate model. For example, a `Country` model might have many `Post` models through its `User` models.

```php
class Country extends Model
{
    public $hasManyThrough = [
        'posts' => [
            \Acme\Blog\Models\Post::class,
            'through' => \Acme\Blog\Models\User::class
        ]
    ];
}
```

The first value is the final model to access, and the `through` parameter is the intermediate model.

## Table Structure

The `posts` table has no `country_id` column. Instead, the relation finds the users with a matching `country_id`, then uses their IDs to query the `posts` table.

```
countries
    id - integer
    name - string

users
    id - integer
    country_id - integer
    name - string

posts
    id - integer
    user_id - integer
    title - string
```

## Accessing the Relation

Access the distant models using a property with the same name as the relation.

```php
$posts = Country::find(1)->posts;
```

## Custom Keys

The usual foreign key conventions are used for the query. Use the `key`, `throughKey`, `otherKey` and `secondOtherKey` parameters to change them.

```php
public $hasManyThrough = [
    'posts' => [
        \Acme\Blog\Models\Post::class,
        'through' => \Acme\Blog\Models\User::class,
        'key' => 'my_country_id',
        'throughKey' => 'my_user_id',
        'otherKey' => 'my_id',
        'secondOtherKey' => 'id'
    ]
];
```

## Parameters

The following parameters are supported by `hasManyThrough` relations.

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
* [Has One Through](./has-one-through.md)
* [Relationships](../relationships.md)
:::
