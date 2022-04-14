# Model Queries

When requesting data from the database the model will retrieve values primarily using the `get` or `first` methods, depending on whether you wish to [retrieve multiple models](#oc-retrieving-multiple-models) or [retrieve a single model](#oc-retrieving-a-single-model) respectively. Queries that derive from a Model return an instance of [October\Rain\Database\Builder](../api/october/rain/database/builder).

<a id="oc-retrieving-multiple-models"></a>
### Retrieving Multiple Models

Once you have created a model and [its associated database table](../database/structure.md#oc-migration-structure), you are ready to start retrieving data from your database. Think of each model as a powerful [query builder](../database/query.md) allowing you to query the database table associated with the model. For example:

```php
$flights = Flight::all();
```

#### Accessing column values

If you have a model instance, you may access the column values of the model by accessing the corresponding property. For example, let's loop through each `Flight` instance returned by our query and echo the value of the `name` column:

```php
foreach ($flights as $flight) {
    echo $flight->name;
}
```

#### Adding additional constraints

The `all` method will return all of the results in the model's table. Since each model serves as a [query builder](../database/query.md), you may also add constraints to queries, and then use the `get` method to retrieve the results:

```php
$flights = Flight::where('active', 1)
    ->orderBy('name', 'desc')
    ->take(10)
    ->get();
```

> **Note**: Since models are query builders, you should familiarize yourself with all of the methods available on the [query builder](../database/query.md). You may use any of these methods in your model queries.

#### Collections

For methods like `all` and `get` which retrieve multiple results, an instance of a `Collection` will be returned. This class provides [a variety of helpful methods](../database/collection.md) for working with your results. Of course, you can simply loop over this collection like an array:

```php
foreach ($flights as $flight) {
    echo $flight->name;
}
```

#### Chunking results

If you need to process thousands of records, use the `chunk` command. The `chunk` method will retrieve a "chunk" of models, feeding them to a given `Closure` for processing. Using the `chunk` method will conserve memory when working with large result sets:

```php
Flight::chunk(200, function ($flights) {
    foreach ($flights as $flight) {
        //
    }
});
```

The first argument passed to the method is the number of records you wish to receive per "chunk". The Closure passed as the second argument will be called for each chunk that is retrieved from the database.

<a id="oc-retrieving-a-single-model"></a>
### Retrieving a Single Model

In addition to retrieving all of the records for a given table, you may also retrieve single records using `find` and `first`. Instead of returning a collection of models, these methods return a single model instance:

```php
// Retrieve a model by its primary key
$flight = Flight::find(1);

// Retrieve the first model matching the query constraints
$flight = Flight::where('active', 1)->first();
```

#### Not found exceptions

Sometimes you may wish to throw an exception if a model is not found. This is particularly useful in routes or controllers. The `findOrFail` and `firstOrFail` methods will retrieve the first result of the query. However, if no result is found, a `Illuminate\Database\Eloquent\ModelNotFoundException` will be thrown:

```php
$model = Flight::findOrFail(1);

$model = Flight::where('legs', '>', 100)->firstOrFail();
```

When [developing an API](../services/router.md), if the exception is not caught, a `404` HTTP response is automatically sent back to the user, so it is not necessary to write explicit checks to return `404` responses when using these methods:

```php
Route::get('/api/flights/{id}', function ($id) {
    return Flight::findOrFail($id);
});
```

### Retrieving Aggregates

You may also use `count`, `sum`, `max`, and other [aggregate functions](../database/query.md#oc-aggregates) provided by the query builder. These methods return the appropriate scalar value instead of a full model instance:

```php
$count = Flight::where('active', 1)->count();

$max = Flight::where('active', 1)->max('price');
```

## Inserting & Updating Models

Inserting and updating data are the cornerstone feature of models, it makes the process effortless when compared to traditional SQL statements.

### Basic Inserts

To create a new record in the database, simply create a new model instance, set attributes on the model, then call the `save` method:

```php
$flight = new Flight;
$flight->name = 'Sydney to Canberra';
$flight->save();
```

In this example, we simply create a new instance of the `Flight` model and assign the `name` attribute. When we call the `save` method, a record will be inserted into the database. The `created_at` and `updated_at` timestamps will automatically be set too, so there is no need to set them manually.

### Basic Updates

The `save` method may also be used to update models that already exist in the database. To update a model, you should retrieve it, set any attributes you wish to update, and then call the `save` method. Again, the `updated_at` timestamp will automatically be updated, so there is no need to manually set its value:

```php
$flight = Flight::find(1);
$flight->name = 'Darwin to Adelaide';
$flight->save();
```

Updates can also be performed against any number of models that match a given query. In this example, all flights that are `active` and have a `destination` of `San Diego` will be marked as delayed:

```php
Flight::where('is_active', true)
    ->where('destination', 'Perth')
    ->update(['delayed' => true]);
```

The `update` method expects an array of column and value pairs representing the columns that should be updated.

<a id="oc-mass-assignment"></a>
### Mass Assignment

You may also use the `create` method to save a new model in a single line. The inserted model instance will be returned to you from the method. However, before doing so, you will need to specify either a `fillable` or `guarded` attribute on the model, as all models protect against mass-assignment. Note that neither `fillable` or `guarded` affect the submission of backend forms, only the use of `create` or `fill` method.

A mass-assignment vulnerability occurs when a user passes an unexpected HTTP parameter through a request, and that parameter changes a column in your database you did not expect. For example, a malicious user might send an `is_admin` parameter through an HTTP request, which is then mapped onto your model's `create` method, allowing the user to escalate themselves to an administrator.

To get started, you should define which model attributes you want to make mass assignable. You may do this using the `$fillable` property on the model. For example, let's make the `name` attribute of our `Flight` model mass assignable:

```php
class Flight extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name'];
}
```

Once we have made the attributes mass assignable, we can use the `create` method to insert a new record in the database. The `create` method returns the saved model instance:

```php
$flight = Flight::create(['name' => 'Flight 10']);
```

While `$fillable` serves as a "white list" of attributes that should be mass assignable, you may also choose to use `$guarded`. The `$guarded` property should contain an array of attributes that you do not want to be mass assignable. All other attributes not in the array will be mass assignable. So, `$guarded` functions like a "black list". Of course, you should use either `$fillable` or `$guarded` - not both:

```php
class Flight extends Model
{
    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = ['price'];
}
```

In the example above, all attributes **except for `price`** will be mass assignable.

#### Other creation methods

Sometimes you may wish to only instantiate a new instance of a model. You can do this using the `make` method. The `make` method will simply return a new instance without saving or creating anything.

```php
$flight = Flight::make(['name' => 'Flight 10']);

// Functionally the same as...
$flight = new Flight;
$flight->fill(['name' => 'Flight 10']);
```

There are two other methods you may use to create models by mass assigning attributes: `firstOrCreate` and `firstOrNew`. The `firstOrCreate` method will attempt to locate a database record using the given column / value pairs. If the model can not be found in the database, a record will be inserted with the given attributes.

The `firstOrNew` method, like `firstOrCreate` will attempt to locate a record in the database matching the given attributes. However, if a model is not found, a new model instance will be returned. Note that the model returned by `firstOrNew` has not yet been persisted to the database. You will need to call `save` manually to persist it:

```php
// Retrieve the flight by the attributes, otherwise create it
$flight = Flight::firstOrCreate(['name' => 'Flight 10']);

// Retrieve the flight by the attributes, or instantiate a new instance
$flight = Flight::firstOrNew(['name' => 'Flight 10']);
```

## Deleting Models

To delete a model, call the `delete` method on a model instance:

```php
$flight = Flight::find(1);

$flight->delete();
```

#### Deleting an existing model by key

In the example above, we are retrieving the model from the database before calling the `delete` method. However, if you know the primary key of the model, you may delete the model without retrieving it. To do so, call the `destroy` method:

```php
Flight::destroy(1);

Flight::destroy([1, 2, 3]);

Flight::destroy(1, 2, 3);
```

#### Deleting Models by query

You may also run a delete query on a set of models. In this example, we will delete all flights that are marked as inactive:

```php
$deletedRows = Flight::where('active', 0)->delete();
```

> **Note**: It is important to mention that [model events](#oc-model-events) will not fire when deleting records directly from a query.

<a id="oc-query-scopes"></a>
## Query Scopes

Scopes allow you to define common sets of constraints that you may easily re-use throughout your application. For example, you may need to frequently retrieve all users that are considered "popular". To define a scope, simply prefix a model method with `scope`:

```php
class User extends Model
{
    /**
     * Scope a query to only include popular users.
     */
    public function scopePopular($query)
    {
        return $query->where('votes', '>', 100);
    }

    /**
     * Scope a query to only include active users.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', 1);
    }
}
```

#### Utilizing a query scope

Once the scope has been defined, you may call the scope methods when querying the model. However, you do not need to include the `scope` prefix when calling the method. You can even chain calls to various scopes, for example:

```php
$users = User::popular()->active()->orderBy('created_at')->get();
```

#### Dynamic scopes

Sometimes you may wish to define a scope that accepts parameters. To get started, just add your additional parameters to your scope. Scope parameters should be defined after the `$query` argument:

```php
class User extends Model
{
    /**
     * Scope a query to only include users of a given type.
     */
    public function scopeApplyType($query, $type)
    {
        return $query->where('type', $type);
    }
}
```

Now you may pass the parameters when calling the scope:

```php
$users = User::applyType('admin')->get();
```

<a id="oc-model-events"></a>
## Events

Models fire several events, allowing you to hook into various points in the model's lifecycle. Events allow you to easily execute code each time a specific model class is saved or updated in the database. Events are defined by overriding special methods in the class, the following method overrides are available:

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

An example of using an event:

```php
/**
 * Generate a URL slug for this model
 */
public function beforeCreate()
{
    $this->slug = Str::slug($this->name);
}
```

> **Note**: Relationships created with [deferred-binding](relations#oc-deferred-binding) (i.e: file attachments) will not be available in the `afterSave` model event if they have not been committed yet. To access uncommitted bindings, use the `withDeferred($sessionKey)` method on the relation. Example: `$this->images()->withDeferred(post('_session_key'))->get();`

### Basic Usage

Whenever a new model is saved for the first time, the `beforeCreate` and `afterCreate` events will fire. If a model already existed in the database and the `save` method is called, the `beforeUpdate` / `afterUpdate` events will fire. However, in both cases, the `beforeSave` / `afterSave` events will fire.

For example, let's define an event listener that populates the slug attribute when a model is first created:

```php
/**
 * Generate a URL slug for this model
 */
public function beforeCreate()
{
    $this->slug = Str::slug($this->name);
}
```

Returning `false` from an event will cancel the `save` / `update` operation:

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
    if ($this->title != $this->original['title']) {
        // title changed
    }
}
```

You can externally bind to [local events](../services/events.md) for a single instance of a model using the `bindEvent` method. The event name should be the same as the method override name, prefixed with `model.`.

```php
$flight = new Flight;
$flight->bindEvent('model.beforeCreate', function() use ($model) {
    $model->slug = Str::slug($model->name);
});
```

## Extending Models

Since models are [equipped to use behaviors](../services/behaviors.md), they can be extended with the static `extend` method. The method takes a closure and passes the model object into it.

Inside the closure you can add relations to the model. Here we extend the `Backend\Models\User` model to include a profile (has one) relationship referencing the `Acme\Demo\Models\Profile` model.

```php
\Backend\Models\User::extend(function($model) {
    $model->hasOne['profile'] = ['Acme\Demo\Models\Profile', 'key' => 'user_id'];
});
```

This approach can also be used to bind to [local events](#oc-model-events), the following code listens for the `model.beforeSave` event.

```php
\Backend\Models\User::extend(function($model) {
    $model->bindEvent('model.beforeSave', function() use ($model) {
        // ...
    });
});
```

Additionally, a few methods exist to extend protected model properties.

```php
\Backend\Models\User::extend(function($model) {
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

> **Note**: Typically the best place to place code is within your plugin registration class `boot` method as this will be run on every request ensuring that the extensions you make to the model are available everywhere.
