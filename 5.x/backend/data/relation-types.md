---
previousPath: extend/database/relations.md#relationship-types
subtitle: The relation types available to models and their parameters.
---
# Relation Types

Relations are defined as properties on the model class. Each entry is keyed by the relation name, with the related model class as the first value followed by any parameters.

```php
public $hasMany = [
    'posts' => [\Acme\Blog\Models\Post::class, 'order' => 'published_at desc']
];
```

## Available Relations

**Standard**

Relation | Description
------------- | -------------
[`hasOne`](./relation-types/has-one.md) | one related model that holds a foreign key to this model.
[`hasMany`](./relation-types/has-many.md) | many related models that hold a foreign key to this model.
[`belongsTo`](./relation-types/belongs-to.md) | the model this model holds a foreign key to.
[`belongsToMany`](./relation-types/belongs-to-many.md) | many related models linked through a join table.

**Through**

Relation | Description
------------- | -------------
[`hasOneThrough`](./relation-types/has-one-through.md) | one distant model reached through an intermediate model.
[`hasManyThrough`](./relation-types/has-many-through.md) | many distant models reached through an intermediate model.

**Polymorphic**

Relation | Description
------------- | -------------
[`morphOne`](./relation-types/morph-one.md) | one related model that can belong to more than one type of model.
[`morphMany`](./relation-types/morph-many.md) | many related models that can belong to more than one type of model.
[`morphTo`](./relation-types/morph-to.md) | the owning model of a polymorphic relation, which can be of any type.
[`morphToMany`](./relation-types/morph-to-many.md) | many related models linked through a polymorphic join table.
[`morphedByMany`](./relation-types/morphed-by-many.md) | the inverse of a polymorphic many-to-many relation.

**Attachments**

Relation | Description
------------- | -------------
[`attachOne`](./relation-types/attach-one.md) | a single file attachment.
[`attachMany`](./relation-types/attach-many.md) | multiple file attachments.

## Common Parameters

The following parameters are supported by all relations.

Parameter | Description
------------- | -------------
**order** | sorting order for multiple records.
**conditions** | filters the relation using a raw where query statement.
**scope** | filters the relation using a [model query scope](./model-queries.md) method, or a static method as `[Class::class, 'method']` that receives the query.
**push** | if set to `false`, this relation will not be saved via the `push` method. Default: `true`
**delete** | if set to `true`, the related model will be deleted if the primary model is deleted or relationship is destroyed. Default: `false`
**softDelete** | if set to `true`, the related model will be soft deleted if the [primary model is soft deleted](./model-traits/soft-delete.md). Default: `false`
**replicate** | if set to `true`, the related model will be duplicated or associated via the `replicate` method. Default: `false`
**relationClass** | specify a custom relation class, which must inherit the class of the relation type, for example `October\Rain\Database\Relations\BelongsTo`.

#### See Also

::: also
* [Relationships](./relationships.md)
:::
