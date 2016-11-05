# Active Record Model

- [Introduction](#introduction)
- [Defining models](#defining-models)
    - [Standard properties](#standard-properties)
- [Retrieving multiple models](#retrieving-multiple-models)
- [Retrieving single models / aggregates](#retrieving-single-models)
    - [Retrieving aggregates](#retrieving-aggregates)
- [Inserting & updating models](#inserting-and-updating-models)
    - [Basic inserts](#basic-inserts)
    - [Basic updates](#basic-updates)
    - [Mass assignment](#mass-assignment)
- [Deleting models](#deleting-models)
- [Query scopes](#query-scopes)
- [Events](#events)
- [Extending models](#extending-models)

<a name="introduction"></a>
## Introduction

October provides a beautiful and simple Active Record implementation for working with your database, based on [Eloquent by Laravel](http://laravel.com/docs/eloquent). Each database table has a corresponding "Model" which is used to interact with that table. Models allow you to query for data in your tables, as well as insert new records into the table.

Model classes reside in the **models** subdirectory of a plugin directory. An example of a model directory structure:

    plugins/
      acme/
        blog/
          models/
            user/             <=== Model config directory
              columns.yaml    <=== Model config files
              fields.yaml     <==^
            User.php          <=== Model class
          Plugin.php

The model configuration directory could contain the model's [list column](../backend/lists#list-columns) and [form field](../backend/forms#form-fields) definitions. The model configuration directory name matches the model class name written in lowercase.

<a name="defining-models"></a>
## Defining models

In most cases, you should create one model class for each database table. All model classes must extend the `Model` class. The most basic representation of a model used inside a Plugin looks like this:

    namespace Acme\Blog\Models;

    use Model;

    class Post extends Model
    {
        /**
         * The table associated with the model.
         *
         * @var string
         */
        protected $table = 'acme_blog_posts';
    }

The `$table` protected field specifies the database table corresponding the model. The table name is a snake case name of the author, plugin and pluralized record type name.

<a name="standard-properties"></a>
### Standard properties

There are some standard properties that can be found on models, in addition to those provided by [model traits](traits). For example:

    class User extends Model
    {
        protected $primaryKey = 'id';

        public $exists = false;

        protected $dates = ['last_seen_at'];

        public $timestamps = true;

        protected $jsonable = ['permissions'];

        protected $guarded = ['*'];
    }

Property | Description
------------- | -------------
**$primaryKey** | primary key name used to identify the model.
**$exists** | boolean that if true indicates that the model exists.
**$dates** | values are converted to an instance of Carbon/DateTime objects after fetching.
**$timestamps** | boolean that if true will automatically set created_at and updated_at fields.
**$jsonable** | values are encoded as JSON before saving and converted to arrays after fetching.
**$fillable** | values are fields accessible to [mass assignment](#mass-assignment).
**$guarded** | values are fields guarded from [mass assignment](#mass-assignment).
**$visible** | values are fields made visible when [serializing the model data](../database/serialization).
**$hidden** | values are fields made hidden when [serializing the model data](../database/serialization).

#### Primary keys

Models will assume that each table has a primary key column named `id`. You may define a `$primaryKey` property to override this convention.

    class Post extends Model
    {
        /**
         * The primary key for the model.
         *
         * @var string
         */
        protected $primaryKey = 'id';
    }

#### Timestamps

By default, a model will expect `created_at` and `updated_at` columns to exist on your tables. If you do not wish to have these columns managed automatically, set the `$timestamps` property on your model to `false`:

    class Post extends Model
    {
        /**
         * Indicates if the model should be timestamped.
         *
         * @var bool
         */
        public $timestamps = false;
    }

If you need to customize the format of your timestamps, set the `$dateFormat` property on your model. This property determines how date attributes are stored in the database, as well as their format when the model is serialized to an array or JSON:

    class Post extends Model
    {
        /**
         * The storage format of the model's date columns.
         *
         * @var string
         */
        protected $dateFormat = 'U';
    }

#### Values stored as JSON

When attributes names are passed to the `$jsonable` property, the values will be serialized and deserialized from the database as JSON:

    class Post extends Model
    {
        /**
         * @var array Attribute names to encode and decode using JSON.
         */
        protected $jsonable = ['data'];
    }

<a name="retrieving-multiple-models"></a>
## Retrieving multiple models

Once you have created a model and [its associated database table](../database/structure#migration-structure), you are ready to start retrieving data from your database. Think of each model as a powerful [query builder](../database/query) allowing you to query the database table associated with the model. For example:

    $flights = Flight::all();

#### Accessing column values

If you have a model instance, you may access the column values of the model by accessing the corresponding property. For example, let's loop through each `Flight` instance returned by our query and echo the value of the `name` column:

    foreach ($flights as $flight) {
        echo $flight->name;
    }

#### Adding additional constraints

The `all` method will return all of the results in the model's table. Since each model serves as a [query builder](../database/query), you may also add constraints to queries, and then use the `get` method to retrieve the results:

    $flights = Flight::where('active', 1)
        ->orderBy('name', 'desc')
        ->take(10)
        ->get();

> **Note:** Since models are query builders, you should familiarize yourself with all of the methods available on the [query builder](../database/query). You may use any of these methods in your model queries.

#### Collections

For methods like `all` and `get` which retrieve multiple results, an instance of a `Collection` will be returned. This class provides [a variety of helpful methods](../database/collection) for working with your results. Of course, you can simply loop over this collection like an array:

    foreach ($flights as $flight) {
        echo $flight->name;
    }

#### Chunking results

If you need to process thousands of records, use the `chunk` command. The `chunk` method will retrieve a "chunk" of models, feeding them to a given `Closure` for processing. Using the `chunk` method will conserve memory when working with large result sets:

    Flight::chunk(200, function ($flights) {
        foreach ($flights as $flight) {
            //
        }
    });

The first argument passed to the method is the number of records you wish to receive per "chunk". The Closure passed as the second argument will be called for each chunk that is retrieved from the database.

<a name="retrieving-single-models"></a>
## Retrieving single models / aggregates

In addition to retrieving all of the records for a given table, you may also retrieve single records using `find` and `first`. Instead of returning a collection of models, these methods return a single model instance:

    // Retrieve a model by its primary key
    $flight = Flight::find(1);

    // Retrieve the first model matching the query constraints
    $flight = Flight::where('active', 1)->first();

#### Not found exceptions

Sometimes you may wish to throw an exception if a model is not found. This is particularly useful in routes or controllers. The `findOrFail` and `firstOrFail` methods will retrieve the first result of the query. However, if no result is found, a `Illuminate\Database\Eloquent\ModelNotFoundException` will be thrown:

    $model = Flight::findOrFail(1);

    $model = Flight::where('legs', '>', 100)->firstOrFail();

When [developing an API](../services/router), if the exception is not caught, a `404` HTTP response is automatically sent back to the user, so it is not necessary to write explicit checks to return `404` responses when using these methods:

    Route::get('/api/flights/{id}', function ($id) {
        return Flight::findOrFail($id);
    });

<a name="retrieving-aggregates"></a>
### Retrieving aggregates

You may also use `count`, `sum`, `max`, and other [aggregate functions](../database/query#aggregates) provided by the query builder. These methods return the appropriate scalar value instead of a full model instance:

    $count = Flight::where('active', 1)->count();

    $max = Flight::where('active', 1)->max('price');

<a name="inserting-and-updating-models"></a>
## Inserting & updating models

Inserting and updating data are the cornerstone feature of models, it makes the process effortless when compared to traditional SQL statements.

<a name="basic-inserts"></a>
### Basic inserts

To create a new record in the database, simply create a new model instance, set attributes on the model, then call the `save` method:

    $flight = new Flight;
    $flight->name = 'Sydney to Canberra';
    $flight->save();

In this example, we simply create a new instance of the `Flight` model and assign the `name` attribute. When we call the `save` method, a record will be inserted into the database. The `created_at` and `updated_at` timestamps will automatically be set too, so there is no need to set them manually.

<a name="basic-updates"></a>
### Basic updates

The `save` method may also be used to update models that already exist in the database. To update a model, you should retrieve it, set any attributes you wish to update, and then call the `save` method. Again, the `updated_at` timestamp will automatically be updated, so there is no need to manually set its value:

    $flight = Flight::find(1);
    $flight->name = 'Darwin to Adelaide';
    $flight->save();

Updates can also be performed against any number of models that match a given query. In this example, all flights that are `active` and have a `destination` of `San Diego` will be marked as delayed:

    Flight::where('is_active', true)
        ->where('destination', 'Perth')
        ->update(['delayed' => true]);

The `update` method expects an array of column and value pairs representing the columns that should be updated.

<a name="mass-assignment"></a>
### Mass assignment

You may also use the `create` method to save a new model in a single line. The inserted model instance will be returned to you from the method. However, before doing so, you will need to specify either a `fillable` or `guarded` attribute on the model, as all models protect against mass-assignment.

A mass-assignment vulnerability occurs when a user passes an unexpected HTTP parameter through a request, and that parameter changes a column in your database you did not expect. For example, a malicious user might send an `is_admin` parameter through an HTTP request, which is then mapped onto your model's `create` method, allowing the user to escalate themselves to an administrator.

To get started, you should define which model attributes you want to make mass assignable. You may do this using the `$fillable` property on the model. For example, let's make the `name` attribute of our `Flight` model mass assignable:

    class Flight extends Model
    {
        /**
         * The attributes that are mass assignable.
         *
         * @var array
         */
        protected $fillable = ['name'];
    }

Once we have made the attributes mass assignable, we can use the `create` method to insert a new record in the database. The `create` method returns the saved model instance:

    $flight = Flight::create(['name' => 'Flight 10']);

While `$fillable` serves as a "white list" of attributes that should be mass assignable, you may also choose to use `$guarded`. The `$guarded` property should contain an array of attributes that you do not want to be mass assignable. All other attributes not in the array will be mass assignable. So, `$guarded` functions like a "black list". Of course, you should use either `$fillable` or `$guarded` - not both:

    class Flight extends Model
    {
        /**
         * The attributes that aren't mass assignable.
         *
         * @var array
         */
        protected $guarded = ['price'];
    }

In the example above, all attributes **except for `price`** will be mass assignable.

#### Other creation methods

Sometimes you may wish to only instantiate a new instance of a model. You can do this using the `make` method. The `make` method will simply return a new instance without saving or creating anything.

    $flight = Flight::make(['name' => 'Flight 10']);

    // Functionally the same as...
    $flight = new Flight;
    $flight->fill(['name' => 'Flight 10']);

There are two other methods you may use to create models by mass assigning attributes: `firstOrCreate` and `firstOrNew`. The `firstOrCreate` method will attempt to locate a database record using the given column / value pairs. If the model can not be found in the database, a record will be inserted with the given attributes.

The `firstOrNew` method, like `firstOrCreate` will attempt to locate a record in the database matching the given attributes. However, if a model is not found, a new model instance will be returned. Note that the model returned by `firstOrNew` has not yet been persisted to the database. You will need to call `save` manually to persist it:

    // Retrieve the flight by the attributes, otherwise create it
    $flight = Flight::firstOrCreate(['name' => 'Flight 10']);

    // Retrieve the flight by the attributes, or instantiate a new instance
    $flight = Flight::firstOrNew(['name' => 'Flight 10']);

<a name="deleting-models"></a>
## Deleting models

To delete a model, call the `delete` method on a model instance:

    $flight = Flight::find(1);

    $flight->delete();

#### Deleting an existing model by key

In the example above, we are retrieving the model from the database before calling the `delete` method. However, if you know the primary key of the model, you may delete the model without retrieving it. To do so, call the `destroy` method:

    Flight::destroy(1);

    Flight::destroy([1, 2, 3]);

    Flight::destroy(1, 2, 3);

#### Deleting models by query

You may also run a delete query on a set of models. In this example, we will delete all flights that are marked as inactive:

    $deletedRows = Flight::where('active', 0)->delete();

> **Note**: It is important to mention that [model events](#model-events) will not fire when deleting records directly from a query.

<a name="query-scopes"></a>
## Query scopes

Scopes allow you to define common sets of constraints that you may easily re-use throughout your application. For example, you may need to frequently retrieve all users that are considered "popular". To define a scope, simply prefix a model method with `scope`:

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

#### Utilizing a query scope

Once the scope has been defined, you may call the scope methods when querying the model. However, you do not need to include the `scope` prefix when calling the method. You can even chain calls to various scopes, for example:

    $users = User::popular()->active()->orderBy('created_at')->get();

#### Dynamic scopes

Sometimes you may wish to define a scope that accepts parameters. To get started, just add your additional parameters to your scope. Scope parameters should be defined after the `$query` argument:

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

Now you may pass the parameters when calling the scope:

    $users = User::applyType('admin')->get();

<a name="events"></a>
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

    /**
     * Generate a URL slug for this model
     */
    public function beforeCreate()
    {
        $this->slug = Str::slug($this->name);
    }

<a name="basic-usage"></a>
### Basic usage

Whenever a new model is saved for the first time, the `beforeCreate` and `afterCreate` events will fire. If a model already existed in the database and the `save` method is called, the `beforeUpdate` / `afterUpdate` events will fire. However, in both cases, the `beforeSave` / `afterSave` events will fire.

For example, let's define an event listener that populates the slug attribute when a model is first created:

    /**
     * Generate a URL slug for this model
     */
    public function beforeCreate()
    {
        $this->slug = Str::slug($this->name);
    }

Returning `false` from an event will cancel the `save` / `update` operation:

    public function beforeCreate()
    {
        if (!$user->isValid()) {
            return false;
        }
    }

You can externally bind to [local events](../services/events) for a single instance of a model using the `bindEvent` method. The event name should be the same as the method override name, prefixed with `model.`.

    $flight = new Flight;
    $flight->bindEvent('model.beforeCreate', function() use ($model) {
        $model->slug = Str::slug($model->name);
    })

<a name="extending-models"></a>
## Extending models

Since models are [equipped to use behaviors](../services/behaviors), they can be extended with the static `extend()` method. The method takes a closure and passes the model object into it. Inside the closure you can add relations to the model:

    User::extend(function($model) {
        $model->hasOne['author'] = ['Author', 'key' => 'user_id'];
    });

Or even bind to local events:

    User::extend(function($model) {
        $model->bindEvent('model.beforeSave', function() use ($model) {
            // ...
        });
    });
