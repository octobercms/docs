---
previousPath: extend/database/relations.md#polymorphic-one-to-one
subtitle: Define a one-to-one relation where the related model can belong to more than one type of model.
---
# Morph One

`$morphOne` defines a one-to-one polymorphic relation, where the related model can belong to more than one type of model. For example, staff members and products can each have one photo, stored in a single `photos` table.

```php
class Staff extends Model
{
    public $morphOne = [
        'photo' => [\Acme\Blog\Models\Photo::class, 'name' => 'imageable']
    ];
}
```

## Table Structure

The `photos` table stores the owner using two columns. The `imageable_id` column contains the ID of the owning staff member or product, while `imageable_type` contains the class name of the owning model.

```
staff
    id - integer
    name - string

products
    id - integer
    price - integer

photos
    id - integer
    path - string
    imageable_id - integer
    imageable_type - string
```

## Model Structure

Each owning model defines a `$morphOne` relation, and the `Photo` model defines a [`morphTo` relation](./morph-to.md) with the name used for the columns.

```php
class Photo extends Model
{
    public $morphTo = [
        'imageable' => []
    ];
}

class Product extends Model
{
    public $morphOne = [
        'photo' => [\Acme\Blog\Models\Photo::class, 'name' => 'imageable']
    ];
}
```

## Accessing the Relation

Access the related model using a property with the same name as the relation.

```php
$photo = Staff::find(1)->photo;
```

From the photo, the `imageable` relation returns either a `Staff` or `Product` instance, depending on which type of model owns it.

```php
$imageable = Photo::find(1)->imageable;
```

## Parameters

The following parameters are supported by `morphOne` relations.

Parameter | Description
------------- | -------------
**name** | the name of the [`morphTo` relation](./morph-to.md) on the related model, for example `imageable`. Required.
**type** | the column on the related model that stores the owner model type. Default: the name with a `_type` suffix.
**id** | the column on the related model that stores the owner ID. Default: the name with an `_id` suffix.
**key** | the column on this model that the owner ID refers to. Default: `id`.

The [common parameters](../relation-types.md#common-parameters) are also supported.

#### See Also

::: also
* [Morph To](./morph-to.md)
* [Morph Many](./morph-many.md)
* [Relationships](../relationships.md)
:::
