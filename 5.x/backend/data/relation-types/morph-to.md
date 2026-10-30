---
previousPath: extend/database/relations.md#custom-polymorphic-types
subtitle: Define the inverse of a polymorphic relation, returning an owner of any type.
---
# Morph To

`$morphTo` defines the inverse of a [`morphOne`](./morph-one.md) or [`morphMany`](./morph-many.md) relation, returning the owning model, which can be of more than one type. The definition does not include a model class, since the class is read from the type column.

```php
class Comment extends Model
{
    public $morphTo = [
        'commentable' => []
    ];
}
```

## Accessing the Relation

Access the owner using a property with the same name as the relation. It returns an instance of whichever model owns the record, for example a `Post` or a `Video`.

```php
$commentable = Comment::find(1)->commentable;
```

## Changing the Owner

Set the relation to a model, then save, to change the owner of the record.

```php
$comment = Comment::find(1);
$comment->commentable = Video::find(1);
$comment->save();
```

## Custom Polymorphic Types

The type column stores the full class name of the owner by default, such as `Acme\Blog\Models\Post`. Register a morph map to store a shorter name instead, which keeps the database independent of your class names. The `boot` method of the [plugin registration file](../../plugins/extending.md) is the usual place for this.

```php
\October\Rain\Database\Relations\Relation::morphMap([
    'post' => \Acme\Blog\Models\Post::class,
    'video' => \Acme\Blog\Models\Video::class
]);
```

## Parameters

The following parameters are supported by `morphTo` relations.

Parameter | Description
------------- | -------------
**name** | the name used to find the type and ID columns. Default: the relation name.
**type** | the column on this model that stores the owner model type. Default: the name with a `_type` suffix.
**id** | the column on this model that stores the owner ID. Default: the name with an `_id` suffix.

The [common parameters](../relation-types.md#common-parameters) are also supported.

#### See Also

::: also
* [Morph One](./morph-one.md)
* [Morph Many](./morph-many.md)
* [Relationships](../relationships.md)
:::
