# Database Collection

- [Introduction](#introduction)
- [Usage examples](#usage-examples)
- [Custom collections](#custom-collections)
- [Data feed](#data-feed)
    - [Creating a new feed](#creating-feed)
    - [Processing results](#data-feed-processing)
    - [Ordering results](#data-feed-ordering)

<a name="introduction"></a>
## Introduction

All multi-result sets returned by a model are an instance of the `Illuminate\Database\Eloquent\Collection` object, including results retrieved via the `get` method or accessed via a relationship. The `Collection` object extends the [base collection](../services/collections), so it naturally inherits dozens of methods used to fluently work with the underlying array of models.

Of course, all collections also serve as iterators, allowing you to loop over them as if they were simple PHP arrays:

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

<a name="usage-examples"></a>
## Usage examples

Here are some examples of methods that will return a `Collection` object:

    $collection = User::all();
    $collection = User::where('name', 'Joe')->get();
    $collection = User::find(3)->groups;

#### Converting to JSON or array

Collections may also be converted to a PHP array or JSON:

    $phpArray = $collection->toArray();

    $jsonString = $collection->toJson();

#### Finding the first match

The `first` method will return the first object that matches the condition.

    $found = $collection->first(function($model) {
        return $model->color == 'red';
    });

#### Iterating the collection

The `each` method lets you easily cycle through every object inside.

    $collection->each(function($model) {
        $model->is_cool = true;
    });

#### Checking for a key

The `contains` method will return true if the collection has a model inside with the primary key value specified.

    if ($collection->contains(3)) {
        // Collection has a Model with ID of 3
    }

<a name="custom-collections"></a>
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

<a name="data-feed"></a>
## Data feed

A data feed allows you to combine multiple model classes into a single collection. This can be useful for creating feeds and streams of data while supporting the use of pagination. It works by adding model objects in a prepared state, before the `get` method is called, which are then combined to make a collection that behaves the same as a regular dataset.

The `DataFeed` class mimics a regular model and supports `limit` and `paginate` methods.

<a name="creating-feed"></a>
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

<a name="data-feed-processing"></a>
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

<a name="data-feed-ordering"></a>
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
