---
subtitle: Define the inverse of a polymorphic many-to-many relation.
---
# Morphed By Many

`$morphedByMany` defines the inverse of a [`morphToMany`](./morph-to-many.md) relation, with one relation for each type of owning model. For example, a `Tag` shared by posts and videos defines a `posts` relation and a `videos` relation.

```php
class Tag extends Model
{
    public $morphedByMany = [
        'posts' => [\Acme\Blog\Models\Post::class, 'name' => 'taggable'],
        'videos' => [\Acme\Blog\Models\Video::class, 'name' => 'taggable']
    ];
}
```

## Accessing the Relation

Access the owning models of one type using the property for that relation.

```php
foreach (Tag::find(1)->videos as $video) {
    // ...
}
```

## Parameters

The parameters are the same as the [`morphToMany` relation](./morph-to-many.md#parameters), where `name` is required. The [common parameters](../relation-types.md#common-parameters) are also supported.

#### See Also

::: also
* [Morph To Many](./morph-to-many.md)
* [Relationships](../relationships.md)
:::
