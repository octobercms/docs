---
previousPath: [extend/database/model.md, extend/database/collection.md, extend/database/pagination.md]
subtitle: Retrieve, insert, update and delete records with a model, then work with the results as collections or paginate them.
---
# Model Queries

Every model acts as a [query builder](./query-builder.md) for its database table. Use it to retrieve, insert, update and delete records. Queries that start from a model return an instance of `October\Rain\Database\Builder`, and you get results with the `get` method for many records or the `first` method for one.

```php
$flights = Flight::where('active', 1)
    ->orderBy('name', 'desc')
    ->take(10)
    ->get();

foreach ($flights as $flight) {
    echo $flight->name;
}
```

## Retrieving Multiple Models

Once you have created a model and [its database table](./migrations.md), you can retrieve records. The `all` method returns every record in the model's table.

```php
$flights = Flight::all();
```

To read a column value, access the matching property on the model instance.

```php
foreach ($flights as $flight) {
    echo $flight->name;
}
```

### Adding Constraints

To filter the results, add constraints to the query, then call the `get` method.

```php
$flights = Flight::where('active', 1)
    ->orderBy('name', 'desc')
    ->take(10)
    ->get();
```

Models are query builders, so you can use any method available on the [query builder](./query-builder.md) in your model queries.

### Processing Large Result Sets in Chunks

To process thousands of records, use the `chunk` method. It retrieves a "chunk" of models at a time and passes each chunk to a `Closure`. This saves memory when working with large result sets.

```php
Flight::chunk(200, function ($flights) {
    foreach ($flights as $flight) {
        //
    }
});
```

The first argument is the number of records per chunk. The `Closure` in the second argument is called for each chunk retrieved from the database.

## Retrieving a Single Model

The `find` and `first` methods return a single model instance instead of a collection.

```php
// Retrieve a model by its primary key
$flight = Flight::find(1);

// Retrieve the first model matching the query constraints
$flight = Flight::where('active', 1)->first();
```

### Throwing an Exception When Not Found

The `findOrFail` and `firstOrFail` methods retrieve the first result of the query. If no result is found, they throw an `Illuminate\Database\Eloquent\ModelNotFoundException`. This is useful in routes and controllers.

```php
$model = Flight::findOrFail(1);

$model = Flight::where('legs', '>', 100)->firstOrFail();
```

When [developing an API](../services/routing.md), an uncaught exception sends a `404` HTTP response back to the user automatically. You do not need explicit checks to return `404` responses when using these methods.

```php
Route::get('/api/flights/{id}', function ($id) {
    return Flight::findOrFail($id);
});
```

### Retrieving Aggregates

You can use `count`, `sum`, `max` and the other [aggregate functions](./query-builder.md#calculating-aggregates) of the query builder. These methods return a scalar value instead of a model instance.

```php
$count = Flight::where('active', 1)->count();

$max = Flight::where('active', 1)->max('price');
```

## Inserting Models

To create a new record, create a new model instance, set its attributes, then call the `save` method.

```php
$flight = new Flight;
$flight->name = 'Sydney to Canberra';
$flight->save();
```

Calling `save` inserts a record into the database. The `created_at` and `updated_at` timestamps are set automatically.

## Updating Models

The `save` method also updates models that already exist in the database. Retrieve the model, set the attributes you want to change, then call `save`. The `updated_at` timestamp is updated automatically.

```php
$flight = Flight::find(1);
$flight->name = 'Darwin to Adelaide';
$flight->save();
```

### Updating Many Models at Once

To update every model that matches a query, call the `update` method with an array of column and value pairs. In this example, all flights that are active and have a destination of `Perth` are marked as delayed.

```php
Flight::where('is_active', true)
    ->where('destination', 'Perth')
    ->update(['delayed' => true]);
```

## Mass Assignment

The `create` method saves a new model in a single line and returns the inserted model instance. Before you use it, define either a `$fillable` or `$guarded` property on the model, because all models protect against mass assignment. Neither property affects backend form submissions. They only apply to the `create` and `fill` methods.

A mass assignment vulnerability occurs when a user passes an unexpected HTTP parameter that changes a database column you did not expect. For example, a malicious user might send an `is_admin` parameter that is passed to your model's `create` method, letting the user make themselves an administrator.

Use the `$fillable` property to list the attributes that are mass assignable. This example makes the `name` attribute of the `Flight` model mass assignable.

```php
class Flight extends Model
{
    /**
     * @var array fillable attributes that are mass assignable.
     */
    protected $fillable = ['name'];
}
```

You can now use the `create` method to insert a new record.

```php
$flight = Flight::create(['name' => 'Flight 10']);
```

### Guarding Attributes

While `$fillable` is an "allow list", the `$guarded` property is a "block list". It contains the attributes that are not mass assignable, and all other attributes are. Use either `$fillable` or `$guarded`, not both.

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

In this example, all attributes **except for `price`** are mass assignable.

### Other Creation Methods

The `make` method returns a new model instance without saving it.

```php
$flight = Flight::make(['name' => 'Flight 10']);

// Functionally the same as...
$flight = new Flight;
$flight->fill(['name' => 'Flight 10']);
```

Two other methods create models by mass assigning attributes.

- `firstOrCreate` looks for a record matching the given column and value pairs. If none is found, it inserts a record with those attributes.
- `firstOrNew` also looks for a matching record, but if none is found, it returns a new model instance that is not yet saved. Call `save` to persist it.

```php
// Retrieve the flight by the attributes, otherwise create it
$flight = Flight::firstOrCreate(['name' => 'Flight 10']);

// Retrieve the flight by the attributes, or instantiate a new instance
$flight = Flight::firstOrNew(['name' => 'Flight 10']);
```

## Deleting Models

To delete a model, call the `delete` method on a model instance.

```php
$flight = Flight::find(1);

$flight->delete();
```

If you know the primary key, you can delete the model without retrieving it by calling the `destroy` method.

```php
Flight::destroy(1);

Flight::destroy([1, 2, 3]);

Flight::destroy(1, 2, 3);
```

You can also run a delete query on a set of models. This example deletes all inactive flights.

```php
$deletedRows = Flight::where('active', 0)->delete();
```

::: warning
[Model events](./models.md#responding-to-model-events) do not fire when you delete records directly from a query.
:::

## Reusing Constraints with Query Scopes

Scopes define common sets of constraints that you can reuse across your application. For example, you might often retrieve all users that are "popular". To define a scope, prefix a model method with `scope`.

```php
class User extends Model
{
    /**
     * scopePopular query to only include popular users.
     */
    public function scopePopular($query)
    {
        return $query->where('votes', '>', 100);
    }

    /**
     * scopeActive query to only include active users.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', 1);
    }
}
```

Call the scope methods without the `scope` prefix when querying the model. You can chain several scopes together.

```php
$users = User::popular()->active()->orderBy('created_at')->get();
```

### Passing Parameters to a Scope

Add parameters to a scope after the `$query` argument.

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

Then pass the parameters when calling the scope.

```php
$users = User::applyType('admin')->get();
```

## Working with Collections

Every multi-result set returned by a model is an instance of `October\Rain\Database\Collection`, including results from the `get` method and from a relationship. This class extends the base collection, so it inherits dozens of [collection methods](./collection-methods.md) for working with the underlying array of models.

Collections are iterators, so you can loop over them like PHP arrays.

```php
$users = User::where('is_active', true)->get();

foreach ($users as $user) {
    echo $user->name;
}
```

Collections also support map and reduce operations. This example filters the active users and gathers the name of each one.

```php
$users = User::get();

$names = $users->filter(function ($user) {
        return $user->is_active === true;
    })
    ->map(function ($user) {
        return $user->name;
    });
```

::: tip
Most model collection methods return a new instance of an `Eloquent` collection. The `pluck`, `keys`, `zip`, `collapse`, `flatten` and `flip` methods return a base collection instance instead. Likewise, if a `map` operation returns a collection that contains no models, it is cast to a base collection.
:::

### Model Collection Methods

The `October\Rain\Database\Collection` class adds the methods below for managing collections of models. Most return `October\Rain\Database\Collection` instances, while some return a base `Illuminate\Support\Collection` instance. For the full list of inherited methods, see [Collection Methods](./collection-methods.md).

**contains($key, $operator = null, $value = null)**

The `contains` method checks whether a model instance is in the collection. It accepts a primary key or a model instance.

```php
$users->contains(1);

$users->contains(User::find(1));
```

**diff($items)**

The `diff` method returns all models that are not present in the given collection.

```php
use App\User;

$users = $users->diff(User::whereIn('id', [1, 2, 3])->get());
```

**except($keys)**

The `except` method returns all models that do not have the given primary keys.

```php
$users = $users->except([1, 2, 3]);
```

**find($key)**

The `find` method finds a model that has the given primary key. If `$key` is a model instance, `find` returns a model matching its primary key. If `$key` is an array of keys, `find` returns all models matching the `$keys` using `whereIn()`.

```php
$users = User::all();

$user = $users->find(1);
```

**fresh($with = [])**

The `fresh` method retrieves a fresh instance of each model in the collection from the database. Any relationships you specify are eager loaded.

```php
$users = $users->fresh();

$users = $users->fresh('comments');
```

**intersect($items)**

The `intersect` method returns all models that are also present in the given collection.

```php
use App\User;

$users = $users->intersect(User::whereIn('id', [1, 2, 3])->get());
```

**load($relations)**

The `load` method eager loads the given relationships for all models in the collection.

```php
$users->load('comments', 'posts');

$users->load('comments.author');
```

**loadMissing($relations)**

The `loadMissing` method eager loads the given relationships for all models in the collection, if they are not already loaded.

```php
$users->loadMissing('comments', 'posts');

$users->loadMissing('comments.author');
```

**modelKeys()**

The `modelKeys` method returns the primary keys of all models in the collection.

```php
$users->modelKeys();

// [1, 2, 3, 4, 5]
```

**makeVisible($attributes)**

The `makeVisible` method makes attributes visible that are normally "hidden" on each model in the collection.

```php
$users = $users->makeVisible(['address', 'phone_number']);
```

**makeHidden($attributes)**

The `makeHidden` method hides attributes that are normally "visible" on each model in the collection.

```php
$users = $users->makeHidden(['address', 'phone_number']);
```

**only($keys)**

The `only` method returns all models that have the given primary keys.

```php
$users = $users->only([1, 2, 3]);
```

**unique($key = null, $strict = false)**

The `unique` method returns all unique models in the collection. Models of the same type with the same primary key as another model in the collection are removed.

```php
$users = $users->unique();
```

### Using a Custom Collection

To use a custom `Collection` object with your own methods, override the `newCollection` method on your model.

```php
class User extends Model
{
    /**
     * Create a new Collection instance.
     */
    public function newCollection(array $models = [])
    {
        return new CustomCollection($models);
    }
}
```

The model then returns an instance of your custom collection wherever it would return a `Collection` instance. To use a custom collection for every model in your plugin or application, override the `newCollection` method on a base model class that all your models extend.

```php
use October\Rain\Database\Collection as CollectionBase;

class CustomCollection extends CollectionBase
{
}
```

## Paginating Results

The `paginate` method splits results into pages. It sets the limit and offset based on the current page, which is read from the `?page` query string argument of the HTTP request. The paginator also adds this value to the links it generates. The only required argument is the number of items to show per page.

```php
$users = User::paginate(15);
```

You can call `paginate` after setting other constraints on the query, such as `where` clauses.

```php
$users = User::where('votes', '>', 100)->paginate(15);
```

To set the page number yourself, pass it as the second argument. This example shows `15` items per page and requests page `2`.

```php
$users = User::where('votes', '>', 100)->paginate(15, 2);
```

The same methods work on the [query builder](./query-builder.md).

```php
$users = Db::table('users')->paginate(15);
```

::: warning
Pagination operations that use a `groupBy` statement cannot be executed efficiently. If you need a `groupBy` with a paginated result set, query the database and [create a paginator manually](#creating-a-paginator-manually).
:::

### Simple Pagination

If you only need "Next" and "Previous" links, use the `simplePaginate` method. It runs a more efficient query, which helps with large datasets when you do not need a link for each page number.

```php
$users = User::where('votes', '>', 100)->simplePaginate(15);

$users = Db::table('users')->simplePaginate(15);
```

### Setting the Page Number

By default, the paginator takes the current page number from the `?page` query string. The `paginateAtPage` and `simplePaginateAtPage` methods take the number of records per page as the first argument and the current page number as the second.

```php
$recordsPerPage = 15;
$currentPage = 1;

$users = User::paginateAtPage($recordsPerPage, $currentPage);

$users = User::simplePaginateAtPage($recordsPerPage, $currentPage);
```

### Using a Custom Query String Name

The `paginateCustom` and `simplePaginateCustom` methods read the page number from a custom query string name. This example uses the `?secondPage` query string.

```php
$recordsPerPage = 15;

$users = User::paginateCustom($recordsPerPage, 'secondPage');

$users = User::simplePaginateCustom($recordsPerPage, 'secondPage');
```

::: tip
The `paginateAtPage`, `simplePaginateAtPage`, `paginateCustom` and `simplePaginateCustom` methods are available on model queries and relations, not on `Db::table` queries.
:::

### Displaying Paginated Results

The `paginate` method returns an instance of `Illuminate\Pagination\LengthAwarePaginator`, and the `simplePaginate` method returns an instance of `Illuminate\Pagination\Paginator`. These objects provide methods that describe the result set, and you can loop over them like an array.

Display the results and render the page links using PHP or the [pager Twig function](../../handbook/twig-functions/pager.md).

```php
<div class="container">
    <?php foreach ($users as $user): ?>
        <?= $user->name ?>
    <?php endforeach ?>
</div>

<?= $users->links() ?>
```

The `links` and `render` methods render links to the other pages in the result set. Each link contains the correct `?page` query string variable. The generated HTML is compatible with the [Bootstrap CSS framework](https://getbootstrap.com).

::: tip
When calling the `render` method from a Twig template, use the `|raw` filter so the HTML links are not escaped.
:::

### Customizing Pagination Links

The `setPath` method sets the URI the paginator uses for links. For example, to generate links like `http://example.tld/custom/url?page=N`, pass `custom/url` to the `setPath` method.

```php
$users = User::paginate(15);
$users->setPath('custom/url');
echo $users->render();
```

To add to the query string of pagination links, use the `appends` method. This example appends `&sort=votes` to each link.

```php
echo $users->appends(['sort' => 'votes'])->render();
```

To append a hash fragment to the paginator's URLs, use the `fragment` method. This example appends `#foo` to the end of each link.

```php
echo $users->fragment('foo')->render();
```

### Paginator Helper Methods

Paginator instances provide the following methods for more pagination information.

```php
$results->count()
$results->currentPage()
$results->hasMorePages()
$results->lastPage() // Not available when using simplePaginate
$results->nextPageUrl()
$results->perPage()
$results->previousPageUrl()
$results->total() // Not available when using simplePaginate
$results->url($page)
```

### Returning Paginated Results as JSON

The paginator classes implement the `Illuminate\Contracts\Support\Jsonable` contract and provide the `toJson` method. You can also convert a paginator to JSON by returning it from a route or AJAX handler.

```php
Route::get('users', function () {
    return User::paginate();
});
```

The JSON includes meta information such as `total`, `current_page` and `last_page`. The result objects are in the `data` key. Here is an example of the JSON returned from a route.

```json
{
    "total": 50,
    "per_page": 15,
    "current_page": 1,
    "last_page": 4,
    "next_page_url": "http://octobercms.app?page=2",
    "prev_page_url": null,
    "from": 1,
    "to": 15,
    "data":[
        {
            // Result Object
        },
        {
            // Result Object
        }
    ]
}
```

### Creating a Paginator Manually

To paginate an array of items yourself, create either an `Illuminate\Pagination\Paginator` or an `Illuminate\Pagination\LengthAwarePaginator` instance.

- The `Paginator` class does not need the total number of items in the result set, so it has no methods for retrieving the index of the last page. It corresponds to the `simplePaginate` method.
- The `LengthAwarePaginator` class accepts almost the same arguments, but requires the total number of items in the result set. It corresponds to the `paginate` method.

When creating a paginator manually, "slice" the array of results you pass to it yourself. The [array_slice](http://php.net/manual/en/function.array-slice.php) PHP function can help with this.

#### See Also

::: also
* [Defining Models](./models.md)
* [Relationships](./relationships.md)
* [Collection Methods](./collection-methods.md)
* [CMS Pagination](../../themes/ajax/pagination.md)
* [Pager Twig function](../../handbook/twig-functions/pager.md)
:::
