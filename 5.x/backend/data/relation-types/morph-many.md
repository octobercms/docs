---
previousPath: extend/database/relations.md#polymorphic-one-to-many
subtitle: Define a one-to-many relation where the related models can belong to more than one type of model.
---
# Morph Many

`$morphMany` defines a one-to-many polymorphic relation, where the related models can belong to more than one type of model. For example, users can comment on both posts and videos, with every comment stored in a single `comments` table.

```php
class Post extends Model
{
    public $morphMany = [
        'comments' => [\Acme\Blog\Models\Comment::class, 'name' => 'commentable']
    ];
}
```

## Table Structure

The `comments` table stores the owner using two columns. The `commentable_id` column contains the ID of the owning post or video, while `commentable_type` contains the class name of the owning model.

```
posts
    id - integer
    title - string
    body - text

videos
    id - integer
    title - string
    url - string

comments
    id - integer
    body - text
    commentable_id - integer
    commentable_type - string
```

## Model Structure

Each owning model defines a `$morphMany` relation, and the `Comment` model defines a [`morphTo` relation](./morph-to.md) with the name used for the columns.

```php
class Comment extends Model
{
    public $morphTo = [
        'commentable' => []
    ];
}

class Video extends Model
{
    public $morphMany = [
        'comments' => [\Acme\Blog\Models\Comment::class, 'name' => 'commentable']
    ];
}
```

## Accessing the Relation

Access the related models using a property with the same name as the relation.

```php
foreach (Post::find(1)->comments as $comment) {
    // ...
}
```

From a comment, the `commentable` relation returns either a `Post` or `Video` instance, depending on which type of model owns it.

```php
$commentable = Comment::find(1)->commentable;
```

## Parameters

The following parameters are supported by `morphMany` relations.

Parameter | Description
------------- | -------------
**name** | the name of the [`morphTo` relation](./morph-to.md) on the related model, for example `commentable`. Required.
**type** | the column on the related model that stores the owner model type. Default: the name with a `_type` suffix.
**id** | the column on the related model that stores the owner ID. Default: the name with an `_id` suffix.
**key** | the column on this model that the owner ID refers to. Default: `id`.

The [common parameters](../relation-types.md#common-parameters) are also supported.

#### See Also

::: also
* [Morph To](./morph-to.md)
* [Morph One](./morph-one.md)
* [Relationships](../relationships.md)
:::
