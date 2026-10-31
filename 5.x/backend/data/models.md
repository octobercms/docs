---
previousPath: extend/system/models.md
subtitle: Create a model class that maps a database table to a PHP object so you can read and write its records.
---
# Defining Models

A model is a PHP class that represents one database table. You use it to query the table and to insert, update and delete records. October CMS models are based on [Laravel Eloquent](http://laravel.com/docs/eloquent) and add features such as array-based relations, model traits and events.

```php
namespace Acme\Blog\Models;

use Model;

class Post extends Model
{
    protected $table = 'acme_blog_posts';
}
```

## Creating a Model

The `create:model` command generates the files for a new model. The first argument is the plugin code, and the second argument is the model class name.

```bash
php artisan create:model Acme.Blog Post
```

This creates the model class, a configuration directory with **fields.yaml** and **columns.yaml** files, and a migration that creates the table. Add `--no-migration` to skip the migration, `--soft-deletes` to add soft deletion, or `--no-timestamps` to turn off timestamps.

Model classes live in the **models** subdirectory of a plugin.

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

The configuration directory name is the model class name in lowercase. It holds the model's [form field definitions](../../handbook/form-fields.md) and [list column definitions](../../handbook/list-columns.md).

Create one model class for each database table. All model classes extend the `Model` class. The `$table` property sets the database table for the model. The table name is the author, plugin and pluralized record name in snake case, for example `acme_blog_posts`.

## Setting Model Properties

Models support the standard properties below, in addition to those provided by [model traits](./model-traits.md).

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
**$visible** | values are fields made visible when [serializing the model data](./serialization.md).
**$hidden** | values are fields made hidden when [serializing the model data](./serialization.md).
**$connection** | string that contains the [connection name](../../setup/database.md) that's utilised by the model by default.

### Changing the Primary Key

Models assume each table has a primary key column named `id`. Define a `$primaryKey` property to use a different column.

```php
class Post extends Model
{
    protected $primaryKey = 'id';
}
```

### Using a Non-Incrementing Key

Models assume the primary key is an incrementing integer, so the key is cast to an integer automatically. To use a non-incrementing or non-numeric primary key, set the public `$incrementing` property to `false`.

```php
class Message extends Model
{
    public $incrementing = false;
}
```

### Managing Timestamps

By default, a model expects `created_at` and `updated_at` columns to exist on your table. If you do not want these columns managed automatically, set the `$timestamps` property to `false`.

```php
class Post extends Model
{
    public $timestamps = false;
}
```

To customize the format of your timestamps, set the `$dateFormat` property. This property controls how date attributes are stored in the database, and their format when the model is serialized to an array or JSON.

```php
class Post extends Model
{
    protected $dateFormat = 'U';
}
```

### Storing Values as JSON

Attribute names listed in the `$jsonable` property are encoded as JSON when saved and decoded when fetched from the database.

```php
class Post extends Model
{
    protected $jsonable = ['data'];
}
```

## Responding to Model Events

Models fire events at points in their life cycle, such as when they are saved or deleted. To run code at one of these points, override the matching method in your model class.

```php
public function beforeCreate()
{
    $this->slug = Str::slug($this->name);
}
```

The following methods are available.

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

When a new model is saved for the first time, the `beforeCreate` and `afterCreate` events fire. When an existing model is saved, the `beforeUpdate` and `afterUpdate` events fire. The `beforeSave` and `afterSave` events fire in both cases.

### Canceling a Save

Return `false` from an event to cancel the `save` or `update` operation.

```php
public function beforeCreate()
{
    if (!$this->isValid()) {
        return false;
    }
}
```

### Checking Changed Values

Use the `original` attribute to read the values the model had before it changed.

```php
public function afterUpdate()
{
    if ($this->title !== $this->original['title']) {
        // Title has changed
    }
}
```

### Reading Deferred Relations in Events

Relations created with [deferred binding](./relationships.md#deferred-binding), such as file attachments, are not yet available inside model events. To read them early, call the `withDeferred` query method on the relation.

```php
public function beforeCreate()
{
    $avatar = $this->avatar()->withDeferred()->first();

    $gallery = $this->gallery()->withDeferred()->get();
}
```

### Binding to Events on a Single Model

To listen to [local events](../services/events.md) on a single model instance, use the `bindEvent` method. The event name is the method name prefixed with `model.`.

```php
$flight = new Flight;
$flight->bindEvent('model.beforeCreate', function() use ($flight) {
    $flight->slug = Str::slug($flight->name);
});
```

## Extending Models from Other Plugins

Models are [equipped to use behaviors](../panel/behaviors.md), so you can extend them with the static `extend` method. The method takes a closure that receives the model object.

Inside the closure you can add relations to the model. This example adds a `profile` relation of the [has one](./relation-types/has-one.md) type to the `User` model.

```php
User::extend(function($model) {
    $model->hasOne['profile'] = [Profile::class, 'key' => 'user_id'];
});
```

You can also bind to local events. The following code listens for the `model.beforeSave` event.

```php
User::extend(function($model) {
    $model->bindEvent('model.beforeSave', function() use ($model) {
        // ...
    });
});
```

A few methods extend protected model properties.

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

Place this code in the `boot` method of your [plugin registration file](../plugins/extending.md). It runs on every request, so your extensions are available everywhere.

#### See Also

::: also
* [Migrations & Seeding](./migrations.md)
* [Model Queries](./model-queries.md)
* [Relation Types](./relation-types.md)
* [Model Traits](./model-traits.md)
:::
