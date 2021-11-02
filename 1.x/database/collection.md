# Collections

All multi-result sets returned by a model are an instance of the `Illuminate\Database\Eloquent\Collection` object, including results retrieved via the `get` method or accessed via a relationship. The `Collection` object extends the [base collection](../services/collections.md), so it naturally inherits dozens of methods used to fluently work with the underlying array of models.

All collections also serve as iterators, allowing you to loop over them as if they were simple PHP arrays:

    $users = User::where('is_active', true)->get();

    foreach ($users as $user) {
        echo $user->name;
    }

However, collections are much more powerful than arrays and expose a variety of map / reduce operations using an intuitive interface. For example, let's filter all active models and gather the name for each filtered user:

    $users = User::get();

    $names = $users->filter(function ($user) {
            return $user->is_active === true;
        })
        ->map(function ($user) {
            return $user->name;
        });

> **Note:** While most model collection methods return a new instance of an `Eloquent` collection, the `pluck`, `keys`, `zip`, `collapse`, `flatten` and `flip` methods return a base collection instance. Likewise, if a `map` operation returns a collection that does not contain any models, it will be automatically cast to a base collection.

## Available methods

All model collections extend the base collection object; therefore, they inherit all of the powerful methods provided by the base collection class.

In addition, the `Illuminate\Database\Eloquent\Collection` class provides a superset of methods to aid with managing your model collections. Most methods return `Illuminate\Database\Eloquent\Collection` instances; however, some methods return a base `Illuminate\Support\Collection` instance.

**contains($key, $operator = null, $value = null)**

The `contains` method may be used to determine if a given model instance is contained by the collection. This method accepts a primary key or a model instance:

    $users->contains(1);

    $users->contains(User::find(1));

**diff($items)**

The `diff` method returns all of the models that are not present in the given collection:

    use App\User;

    $users = $users->diff(User::whereIn('id', [1, 2, 3])->get());

**except($keys)**

The `except` method returns all of the models that do not have the given primary keys:

    $users = $users->except([1, 2, 3]);

**find($key)**

The `find` method finds a model that has a given primary key. If `$key` is a model instance, `find` will attempt to return a model matching the primary key. If `$key` is an array of keys, find will return all models which match the `$keys` using `whereIn()`:

    $users = User::all();

    $user = $users->find(1);

**fresh($with = [])**

The `fresh` method retrieves a fresh instance of each model in the collection from the database. In addition, any specified relationships will be eager loaded:

    $users = $users->fresh();

    $users = $users->fresh('comments');

**intersect($items)**

The `intersect` method returns all of the models that are also present in the given collection:

    use App\User;

    $users = $users->intersect(User::whereIn('id', [1, 2, 3])->get());

**load($relations)**

The `load` method eager loads the given relationships for all models in the collection:

    $users->load('comments', 'posts');

    $users->load('comments.author');

**loadMissing($relations)**

The `loadMissing` method eager loads the given relationships for all models in the collection if the relationships are not already loaded:

    $users->loadMissing('comments', 'posts');

    $users->loadMissing('comments.author');

**modelKeys()**

The `modelKeys` method returns the primary keys for all models in the collection:

    $users->modelKeys();

    // [1, 2, 3, 4, 5]

**makeVisible($attributes)**

The `makeVisible` method makes attributes visible that are typically "hidden" on each model in the collection:

    $users = $users->makeVisible(['address', 'phone_number']);

**makeHidden($attributes)**

The `makeHidden` method hides attributes that are typically "visible" on each model in the collection:

    $users = $users->makeHidden(['address', 'phone_number']);

**only($keys)**

The `only` method returns all of the models that have the given primary keys:

    $users = $users->only([1, 2, 3]);

**unique($key = null, $strict = false)**

The `unique` method returns all of the unique models in the collection. Any models of the same type with the same primary key as another model in the collection are removed.

    $users = $users->unique();

## Custom collections

If you need to use a custom `Collection` object with your own extension methods, you may override the `newCollection` method on your model:

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

Once you have defined a `newCollection` method, you will receive an instance of your custom collection anytime the model returns a `Collection` instance. If you would like to use a custom collection for every model in your plugin or application, you should override the `newCollection` method on a model base class that is extended by all of your models.

    use October\Rain\Database\Collection as CollectionBase;

    class CustomCollection extends CollectionBase
    {
    }

## Data feed

A data feed allows you to combine multiple model classes into a single collection. This can be useful for creating feeds and streams of data while supporting the use of pagination. It works by adding model objects in a prepared state, before the `get` method is called, which are then combined to make a collection that behaves the same as a regular dataset.

The `DataFeed` class mimics a regular model and supports `limit` and `paginate` methods.

### Creating a new feed

The next example will combine the User, Post and Comment models in to a single collection and returns the first 10 records.

    $feed = new October\Rain\Database\DataFeed;
    $feed->add('user', new User);
    $feed->add('post', Post::where('category_id', 7));

    $feed->add('comment', function() {
        $comment = new Comment;
        return $comment->where('approved', true);
    });

    $results = $feed->limit(10)->get();

### Processing results

The `get` method will return a `Collection` object that contains the results. Records can be differentiated by using the `tag_name` attribute which was set as the first parameter when the model was added.

    foreach ($results as $result) {

        if ($result->tag_name == 'post')
            echo "New Blog Post: " . $record->title;

        elseif ($result->tag_name == 'comment')
            echo "New Comment: " . $record->content;

        elseif ($result->tag_name == 'user')
            echo "New User: " . $record->name;

    }

### Ordering results

Results can be ordered by a single database column, either shared default used by all datasets or individually specified with the `add` method. The direction of results must also be shared.

    // Ordered by updated_at if it exists, otherwise created_at
    $feed->add('user', new User, 'ifnull(updated_at, created_at)');

    // Ordered by id
    $feed->add('comments', new Comment, 'id');

    // Ordered by name (specified default below)
    $feed->add('posts', new Post);

    // Specifies the default column and the direction
    $feed->orderBy('name', 'asc')->get();
