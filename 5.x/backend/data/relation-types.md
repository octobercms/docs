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
[`hasOne`](#has-one) | one related model that holds a foreign key to this model.
[`hasMany`](#has-many) | many related models that hold a foreign key to this model.
[`belongsTo`](#belongs-to) | the model this model holds a foreign key to.
[`belongsToMany`](#belongs-to-many) | many related models linked through a join table.

**Through**

Relation | Description
------------- | -------------
[`hasOneThrough`](#has-one-through) | one distant model reached through an intermediate model.
[`hasManyThrough`](#has-many-through) | many distant models reached through an intermediate model.

**Polymorphic**

Relation | Description
------------- | -------------
[`morphOne`](#morph-one) | one related model that can belong to more than one type of model.
[`morphMany`](#morph-many) | many related models that can belong to more than one type of model.
[`morphTo`](#morph-to) | the owning model of a polymorphic relation, which can be of any type.
[`morphToMany`](#morph-to-many) | many related models linked through a polymorphic join table.
[`morphedByMany`](#morphed-by-many) | the inverse of a polymorphic many-to-many relation.

**Attachments**

Relation | Description
------------- | -------------
[`attachOne`](#attach-one) | a single file attachment.
[`attachMany`](#attach-many) | multiple file attachments.

## Common Parameters

The following parameters are supported by all relations.

Parameter | Description
------------- | -------------
**order** | sorting order for multiple records.
**conditions** | filters the relation using a raw where query statement.
**scope** | filters the relation using a [model query scope](./model-queries.md) method, or a static method as `[Class::class, 'method']` that receives the query.
**push** | if set to `false`, this relation will not be saved via the `push` method. Default: `true`
**delete** | if set to `true`, the related model will be deleted if the primary model is deleted or relationship is destroyed. Default: `false`
**softDelete** | if set to `true`, the related model will be soft deleted if the [primary model is soft deleted](./model-traits.md#soft-deleting). Default: `false`
**replicate** | if set to `true`, the related model will be duplicated or associated via the `replicate` method. Default: `false`
**relationClass** | specify a custom relation class, which must inherit the class of the relation type, for example `October\Rain\Database\Relations\BelongsTo`.

## Has One

`$hasOne` - defines a one-to-one relation, where the related model holds a foreign key to this model.

```php
public $hasOne = [
    'phone' => \Acme\Blog\Models\Phone::class
];
```

The following parameters are supported.

Parameter | Description
------------- | -------------
**key** | the foreign key column on the related model. Default: the model name with an `_id` suffix, for example `user_id`.
**otherKey** | the column on this model that the foreign key refers to. Default: `id`.

The [common parameters](#common-parameters) are also supported.

```php
public $hasOne = [
    'phone' => [\Acme\Blog\Models\Phone::class, 'key' => 'my_user_id', 'otherKey' => 'my_id']
];
```

## Has Many

`$hasMany` - defines a one-to-many relation, where the related models hold a foreign key to this model.

```php
public $hasMany = [
    'comments' => \Acme\Blog\Models\Comment::class
];
```

The following parameters are supported.

Parameter | Description
------------- | -------------
**key** | the foreign key column on the related model. Default: the model name with an `_id` suffix, for example `post_id`.
**otherKey** | the column on this model that the foreign key refers to. Default: `id`.

The [common parameters](#common-parameters) are also supported.

```php
public $hasMany = [
    'comments' => [\Acme\Blog\Models\Comment::class, 'key' => 'my_post_id', 'otherKey' => 'my_id']
];
```

## Belongs To

`$belongsTo` - defines the inverse of a `hasOne` or `hasMany` relation, where this model holds the foreign key.

```php
public $belongsTo = [
    'user' => \Acme\Blog\Models\User::class
];
```

The following parameters are supported.

Parameter | Description
------------- | -------------
**key** | the foreign key column on this model. Default: the relation name with an `_id` suffix, for example `user_id`.
**otherKey** | the column on the related model that the foreign key refers to. Default: `id`.
**default** | returns a default model when the relation is empty. Set to `true` for an empty model, or an array of attributes to fill it with.

The [common parameters](#common-parameters) are also supported.

```php
public $belongsTo = [
    'user' => [\Acme\Blog\Models\User::class, 'key' => 'my_user_id', 'default' => ['name' => 'Guest']]
];
```

## Belongs To Many

`$belongsToMany` - defines a many-to-many relation using a join table. The inverse relation is also defined with `$belongsToMany`.

```php
public $belongsToMany = [
    'roles' => \Acme\Blog\Models\Role::class
];
```

The following parameters are supported.

Parameter | Description
------------- | -------------
**table** | the name of the join table. Default: both model names in alphabetical order, for example `role_user`.
**key** | the key column name of the defining model (inside pivot table). Default: the model name with an `_id` suffix, for example `user_id`.
**otherKey** | the key column name of the related model (inside pivot table). Default: the model name with an `_id` suffix, for example `role_id`.
**parentKey** | the key column name of the defining model (inside defining model table). Default: `id`.
**relatedKey** | the key column name of the related model (inside related model table). Default: `id`.
**pivot** | an array of pivot columns found in the join table, available via `$model->pivot`.
**timestamps** | if `true`, the join table contains `created_at` and `updated_at` columns. Default: `false`.
**detach** | if set to `false`, the related model will not be detached when the primary model is deleted or the relationship is destroyed. Default: `true`.
**pivotModel** | a custom model class for the pivot relation. Default: `October\Rain\Database\Pivot`.
**pivotSortable** | a sort order column for the pivot table, used with the [`SortableRelation` trait](./model-traits.md#sortable-relation).
**pivotKey** | an incrementing ID column for the pivot table, used with a custom `pivotModel` that allows duplicate relations.

The [common parameters](#common-parameters) are also supported.

```php
public $belongsToMany = [
    'roles' => [
        \Acme\Blog\Models\Role::class,
        'table' => 'acme_blog_role_user',
        'pivot' => ['is_primary'],
        'timestamps' => true
    ]
];
```

To allow duplicate relations, the join table needs an incrementing primary key, set with `pivotKey`, and a `pivotModel` that extends `October\Rain\Database\Pivot` with the `$incrementing` property set to `true`.

## Has One Through

`$hasOneThrough` - defines a relation to one distant model through an intermediate model, for example a supplier's user history through its user.

```php
public $hasOneThrough = [
    'userHistory' => [
        \Acme\Supplies\Models\History::class,
        'through' => \Acme\Supplies\Models\User::class
    ]
];
```

The following parameters are supported.

Parameter | Description
------------- | -------------
**through** | the intermediate model class. Required.
**key** | the foreign key on the intermediate model.
**throughKey** | the foreign key on the final model.
**otherKey** | the local key on this model.
**secondOtherKey** | the local key on the intermediate model.

The [common parameters](#common-parameters) are also supported.

## Has Many Through

`$hasManyThrough` - defines a relation to many distant models through an intermediate model, for example a country's posts through its users.

```php
public $hasManyThrough = [
    'posts' => [
        \Acme\Blog\Models\Post::class,
        'through' => \Acme\Blog\Models\User::class
    ]
];
```

The following parameters are supported.

Parameter | Description
------------- | -------------
**through** | the intermediate model class. Required.
**key** | the foreign key on the intermediate model.
**throughKey** | the foreign key on the final model.
**otherKey** | the local key on this model.
**secondOtherKey** | the local key on the intermediate model.

The [common parameters](#common-parameters) are also supported.

## Morph One

`$morphOne` - defines a one-to-one polymorphic relation, where the related model can belong to more than one type of model.

```php
public $morphOne = [
    'photo' => [\Acme\Blog\Models\Photo::class, 'name' => 'imageable']
];
```

The following parameters are supported.

Parameter | Description
------------- | -------------
**name** | the name of the [`morphTo` relation](#morph-to) on the related model, for example `imageable`. Required.
**type** | the column on the related model that stores the owner model type. Default: the name with a `_type` suffix.
**id** | the column on the related model that stores the owner ID. Default: the name with an `_id` suffix.
**key** | the column on this model that the owner ID refers to. Default: `id`.

The [common parameters](#common-parameters) are also supported.

The related table stores the owner using the `id` and `type` columns, for example `imageable_id` and `imageable_type`.

## Morph Many

`$morphMany` - defines a one-to-many polymorphic relation, where the related models can belong to more than one type of model.

```php
public $morphMany = [
    'comments' => [\Acme\Blog\Models\Comment::class, 'name' => 'commentable']
];
```

The following parameters are supported.

Parameter | Description
------------- | -------------
**name** | the name of the [`morphTo` relation](#morph-to) on the related model, for example `commentable`. Required.
**type** | the column on the related model that stores the owner model type. Default: the name with a `_type` suffix.
**id** | the column on the related model that stores the owner ID. Default: the name with an `_id` suffix.
**key** | the column on this model that the owner ID refers to. Default: `id`.

The [common parameters](#common-parameters) are also supported.

The related table stores the owner using the `id` and `type` columns, for example `commentable_id` and `commentable_type`.

## Morph To

`$morphTo` - defines the inverse of a `morphOne` or `morphMany` relation, returning the owning model of any type. The definition does not include a model class.

```php
public $morphTo = [
    'imageable' => []
];
```

The following parameters are supported.

Parameter | Description
------------- | -------------
**name** | the name used to find the type and ID columns. Default: the relation name.
**type** | the column on this model that stores the owner model type. Default: the name with a `_type` suffix.
**id** | the column on this model that stores the owner ID. Default: the name with an `_id` suffix.

The [common parameters](#common-parameters) are also supported.

The type column stores the owner class name by default. Register a morph map, usually in the `boot` method of the plugin registration file, to store a custom name instead.

```php
\October\Rain\Database\Relations\Relation::morphMap([
    'staff' => \Acme\Blog\Models\Staff::class,
    'product' => \Acme\Blog\Models\Product::class
]);
```

## Morph To Many

`$morphToMany` - defines a many-to-many polymorphic relation, where the related models are shared across more than one type of model using a single join table.

```php
public $morphToMany = [
    'tags' => [\Acme\Blog\Models\Tag::class, 'name' => 'taggable']
];
```

The following parameters are supported.

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

The [common parameters](#common-parameters) are also supported.

The join table stores the related key with the owner ID and type, for example `tag_id`, `taggable_id` and `taggable_type`.

## Morphed By Many

`$morphedByMany` - defines the inverse of a `morphToMany` relation, with one relation for each type of owning model.

```php
public $morphedByMany = [
    'posts' => [\Acme\Blog\Models\Post::class, 'name' => 'taggable'],
    'videos' => [\Acme\Blog\Models\Video::class, 'name' => 'taggable']
];
```

The parameters are the same as the [`morphToMany` relation](#morph-to-many), where `name` is required. The [common parameters](#common-parameters) are also supported.

## Attach One

`$attachOne` - defines a single file attachment, stored using the `System\Models\File` model.

```php
public $attachOne = [
    'avatar' => \System\Models\File::class
];
```

The following parameters are supported.

Parameter | Description
------------- | -------------
**public** | set to `false` to store the file in the protected uploads directory, which is not accessible from the web. Default: `true`.
**key** | the column on this model that the attachment refers to. Default: `id`.

The [common parameters](#common-parameters) are also supported.

## Attach Many

`$attachMany` - defines multiple file attachments, stored using the `System\Models\File` model.

```php
public $attachMany = [
    'photos' => \System\Models\File::class
];
```

The following parameters are supported.

Parameter | Description
------------- | -------------
**public** | set to `false` to store the files in the protected uploads directory, which is not accessible from the web. Default: `true`.
**key** | the column on this model that the attachments refer to. Default: `id`.

The [common parameters](#common-parameters) are also supported.

#### See Also

::: also
* [Relationships](./relationships.md)
:::
