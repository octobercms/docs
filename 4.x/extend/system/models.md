---
subtitle: Map the database table columns directly to a PHP object.
---
# Models

October CMS provides a beautiful and simple Active Record implementation for working with your database, based on [Eloquent by Laravel](http://laravel.com/docs/eloquent). Each database table has a corresponding "Model" which is used to interact with that table. Models allow you to query for data in your tables, as well as insert new records into the table.

Model classes reside in the **models** subdirectory of a plugin directory. An example of a model directory structure.

::: dir
├── plugins
|   └── acme
|       └── blog
|           ├── `models`
|           |   ├── post  _← Config Directory_
|           |   |   ├── fields.yaml  _← Config File_
|           |   |   └── columns.yaml  _← Config File_
|           |   └── Post.php  _← Model Class_
|           └── Plugin.php
:::

The model configuration directory could contain the model's [form field definitions](../../element/form-fields.md). The model configuration directory name matches the model class name written in lowercase.

## Defining Models

The `create:model` command generates the files needed for a new model. The first argument specifies the author and plugin name. The second argument specifies the model class name.

```bash
php artisan create:model Acme.Blog Post
```

In most cases, you should create one model class for each database table. All model classes must extend the `Model` class. The most basic representation of a model used inside a Plugin looks like this.

```php
namespace Acme\Blog\Models;

use Model;

class Post extends Model
{
    protected $table = 'acme_blog_posts';
}
```

The `$table` protected field specifies the database table corresponding the model. The table name is a snake case name of the author, plugin and pluralized record type name.

### Supported Properties

There are some standard properties that can be found on models, in addition to those provided by [model traits](traits.md). For example:

```php
class User extends Model
{
    protected $primaryKey = 'id';

    public $exists = false;

    protected $dates = ['last_seen_at'];

    public $timestamps = true;

    protected $jsonable = ['permissions'];

    protected $guarded = ['*'];
}
```

Property | Description
------------- | -------------
**$primaryKey** | primary key name used to identify the model.
**$incrementing** | boolean that if false indicates that the primary key is not an incrementing integer value.
**$exists** | boolean that if true indicates that the model exists.
**$dates** | values are converted to an instance of Carbon/DateTime objects after fetching.
**$timestamps** | boolean that if true will automatically set created_at and updated_at fields.
**$jsonable** | values are encoded as JSON before saving and converted to arrays after fetching.
**$fillable** | values are fields accessible to mass assignment.
**$guarded** | values are fields guarded from mass assignment.
**$visible** | values are fields made visible when [serializing the model data](../database/serialization.md).
**$hidden** | values are fields made hidden when [serializing the model data](../database/serialization.md).
**$connection** | string that contains the [connection name](../../setup/database-config.md) that's utilised by the model by default.

#### Primary Key

Models will assume that each table has a primary key column named `id`. You may define a `$primaryKey` property to override this convention.

```php
class Post extends Model
{
    protected $primaryKey = 'id';
}
```

#### Incrementing

Models will assume that the primary key is an incrementing integer value, which means that by default the primary key will be cast to an integer automatically. If you wish to use a non-incrementing or a non-numeric primary key you must set the public `$incrementing` property to false.

```php
class Message extends Model
{
    public $incrementing = false;
}
```

#### Timestamps

By default, a model will expect `created_at` and `updated_at` columns to exist on your tables. If you do not wish to have these columns managed automatically, set the `$timestamps` property on your model to `false`.

```php
class Post extends Model
{
    public $timestamps = false;
}
```

If you need to customize the format of your timestamps, set the `$dateFormat` property on your model. This property determines how date attributes are stored in the database, as well as their format when the model is serialized to an array or JSON.

```php
class Post extends Model
{
    protected $dateFormat = 'U';
}
```

#### Values stored as JSON

When attributes names are passed to the `$jsonable` property, the values will be serialized and deserialized from the database as JSON.

```php
class Post extends Model
{
    protected $jsonable = ['data'];
}
```

## Model Events

Models fire several events, allowing you to hook into various points in the model's life cycle. Events allow you to easily execute code each time a specific model class is saved or updated in the database. Events are defined by overriding special methods in the class, the following method overrides are available:

Event | Description
------------- | -------------
**beforeCreate** | before the model is saved, when first created.
**afterCreate** | after the model is saved, when first created.
**beforeSave** | before the model is saved, either created or updated.
**afterSave** | after the model is saved, either created or updated.
**beforeValidate** | before the supplied model data is validated.
**afterValidate** | after the supplied model data has been validated.
**beforeUpdate** | before an existing model is saved.
**afterUpdate** | after an existing model is saved.
**beforeDelete** | before an existing model is deleted.
**afterDelete** | after an existing model is deleted.
**beforeRestore** | before a soft-deleted model is restored.
**afterRestore** | after a soft-deleted model has been restored.
**beforeFetch** | before an existing model is populated.
**afterFetch** | after an existing model has been populated.

The following is an example of using an event.

```php
public function beforeCreate()
{
    $this->slug = Str::slug($this->name);
}
```

### Basic Usage

Whenever a new model is saved for the first time, the `beforeCreate` and `afterCreate` events will fire. If a model already existed in the database and the `save` method is called, the `beforeUpdate` / `afterUpdate` events will fire. However, in both cases, the `beforeSave` / `afterSave` events will fire.

For example, let's define an event listener that populates the `slug` attribute when a model is first created.

```php
public function beforeCreate()
{
    $this->slug = Str::slug($this->name);
}
```

Returning `false` from an event will cancel the `save` / `update` operation.

```php
public function beforeCreate()
{
    if (!$user->isValid()) {
        return false;
    }
}
```

It's possible to access old values using the `original` attribute. For example:

```php
public function afterUpdate()
{
    if ($this->title !== $this->original['title']) {
        // Title has changed
    }
}
```

You may find relationships created using [deferred bindings](../database/relations.md) (i.e: file attachments) are not available inside model events yet. To access them early, use the `withDeferred` database query method on the relation.

```php
public function beforeCreate()
{
    $avatar = $this->avatar()->withDeferred()->first();

    $gallery = $this->gallery()->withDeferred()->get();
}
```

You can externally bind to [local events](../services/event.md) for a single instance of a model using the `bindEvent` method. The event name should be the same as the method override name, prefixed with `model.`.

```php
$flight = new Flight;
$flight->bindEvent('model.beforeCreate', function() use ($model) {
    $model->slug = Str::slug($model->name);
});
```

## Extending Models

Since models are [equipped to use behaviors](./behaviors.md), they can be extended with the static `extend` method. The method takes a closure and passes the model object into it.

Inside the closure you can add relations to the model. Here we extend the `User` model to include a profile (has one) relationship referencing the `Profile` model.

```php
User::extend(function($model) {
    $model->hasOne['profile'] = [Profile::class, 'key' => 'user_id'];
});
```

This approach can also be used to bind to local events, the following code listens for the `model.beforeSave` event.

```php
User::extend(function($model) {
    $model->bindEvent('model.beforeSave', function() use ($model) {
        // ...
    });
});
```

Additionally, a few methods exist to extend protected model properties.

```php
User::extend(function($model) {
    // Add cast attributes
    $model->addCasts([
        'some_extended_field' => 'int',
    ]);

    // Add a date attribute
    $model->addDateAttribute('updated_at');

    // Adds fillable or jsonable fields
    $model->addFillable('first_name');
    $model->addJsonable('some_data');
});
```

Typically the best place to place code is within your [plugin registration file](../extending.md) `boot` method as this will be run on every request ensuring that the extensions you make to the model are available everywhere.

#### See Also

::: also
* [Querying a Model](../database/model.md)
* [Model Traits](../database/traits.md)
:::
