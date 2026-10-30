---
previousPath: extend/database/relations.md#one-to-many
subtitle: Define a one-to-many relation where the related models hold the foreign key.
---
# Has Many

`$hasMany` defines a one-to-many relation, where any number of related models hold a foreign key to this model. For example, a blog `Post` might have many `Comment` models.

```php
class Post extends Model
{
    public $hasMany = [
        'comments' => \Acme\Blog\Models\Comment::class
    ];
}
```

## Accessing the Relation

Access the related models using a property with the same name as the relation, which returns a collection.

```php
$comments = Post::find(1)->comments;

foreach ($comments as $comment) {
    // ...
}
```

Call the relation as a method to add further constraints to the query.

```php
$comment = Post::find(1)->comments()->where('title', 'foo')->first();
```

## Custom Keys

The relation assumes the `Comment` model has a `post_id` foreign key, based on the model name, which refers to the `id` column of the post. Use the `key` and `otherKey` parameters to change these columns.

```php
public $hasMany = [
    'comments' => [\Acme\Blog\Models\Comment::class, 'key' => 'my_post_id', 'otherKey' => 'my_id']
];
```

## Parameters

The following parameters are supported by `hasMany` relations.

Parameter | Description
------------- | -------------
**key** | the foreign key column on the related model. Default: the model name with an `_id` suffix, for example `post_id`.
**otherKey** | the column on this model that the foreign key refers to. Default: `id`.

The [common parameters](../relation-types.md#common-parameters) are also supported.

## Inverse Relation

Define the inverse on the `Comment` model using a [`belongsTo` relation](./belongs-to.md), so each comment can access its parent post.

```php
class Comment extends Model
{
    public $belongsTo = [
        'post' => \Acme\Blog\Models\Post::class
    ];
}
```

#### See Also

::: also
* [Belongs To](./belongs-to.md)
* [Has One](./has-one.md)
* [Relationships](../relationships.md)
:::
