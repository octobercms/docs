---
previousPath: extend/database/relations.md#polymorphic-many-to-many
subtitle: Define a many-to-many relation shared across more than one type of model.
---
# Morph To Many

`$morphToMany` defines a many-to-many polymorphic relation, where the related models are shared across more than one type of model using a single join table. For example, posts and videos can share one list of tags.

```php
class Post extends Model
{
    public $morphToMany = [
        'tags' => [\Acme\Blog\Models\Tag::class, 'name' => 'taggable']
    ];
}
```

## Table Structure

The `taggables` join table stores the tag ID alongside the owner, using the `taggable_id` and `taggable_type` columns.

```
posts
    id - integer
    name - string

videos
    id - integer
    name - string

tags
    id - integer
    name - string

taggables
    tag_id - integer
    taggable_id - integer
    taggable_type - string
```

## Accessing the Relation

Access the related models using a property with the same name as the relation.

```php
foreach (Post::find(1)->tags as $tag) {
    // ...
}
```

## Parameters

The following parameters are supported by `morphToMany` relations.

Parameter | Description
------------- | -------------
**name** | the name used for the polymorphic columns on the join table, for example `taggable`. Required.
**table** | the name of the join table. Default: the name in plural form, for example `taggables`.
**key** | the key column name of the defining model (inside pivot table).
**otherKey** | the key column name of the related model (inside pivot table).
**parentKey** | the key column name of the defining model (inside defining model table). Default: `id`.
**relatedKey** | the key column name of the related model (inside related model table). Default: `id`.
**pivot** | an array of pivot columns found in the join table, available via `$model->pivot`.
**timestamps** | if `true`, the join table contains `created_at` and `updated_at` columns. Default: `false`.

The [common parameters](../relation-types.md#common-parameters) are also supported.

## Inverse Relation

Define the inverse on the `Tag` model using a [`morphedByMany` relation](./morphed-by-many.md), with one relation for each type of owning model.

```php
class Tag extends Model
{
    public $morphedByMany = [
        'posts' => [\Acme\Blog\Models\Post::class, 'name' => 'taggable'],
        'videos' => [\Acme\Blog\Models\Video::class, 'name' => 'taggable']
    ];
}
```

#### See Also

::: also
* [Morphed By Many](./morphed-by-many.md)
* [Belongs To Many](./belongs-to-many.md)
* [Relationships](../relationships.md)
:::
