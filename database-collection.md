# Database Collection

- [Access methods](#access-methods)
- [Data feed](#data-feed)

A Database Collection represents an array of results, typically of populated Models. October extends [Eloquent collections](http://laravel.com/docs/eloquent#collections) with new classes described in this article.

<a name="access-methods" class="anchor" href="#access-methods"></a>
## Access methods

A collection is returned any time there are multiple records from a model query, either via the get method or a relationship. This collection object can be iterated over like an array, it also has a variety of other helpful methods described below.

    $collection = User::all();
    $collection = User::where('name', 'Joe')->get();
    $collection = User::find(3)->groups;

All of the above methods will return a `$collection`.

#### Converting to JSON or array

Collections may also be converted to a PHP array or JSON:

    $phpArray = $collection->toArray();

    $jsonString = $collection->toJson();

#### Finding the first match

The `first()` method will return the first object that matches the condition.

    $found = $collection->first(function($model) {
        return $model->color == 'red';
    });

#### Iterating the collection

The `each()` method lets you easily cycle through every object inside.

    $collection->each(function($model) {
        $model->is_cool = true;
    });

#### Checking for a key

The `contains()` method will return true if the collection has a model inside with the primary key value specified.

    if ($collection->contains(3)) {
        // Collection has a Model with ID of 3
    }

<a name="data-feed" class="anchor" href="#data-feed"></a>
## Data feed (Experimental)

A data feed allows you to combine multiple model classes into a single collection. This can be useful for creating feeds and streams of data while supporting the use of pagination. It works by adding model objects in a prepared state, before the `get()` method is called, which are then combined to make a collection that behaves the same as a regular dataset.

The `DataFeed` class mimics a regular Active Record model and supports `limit()` and `paginate()` methods.

<a name="data-feed-usage" class="anchor" href="#data-feed-usage"></a>
### Usage

The next example will combine the User, Post and Comment models in to a single collection and returns the first 10 records.

    $feed = new October\Rain\Database\DataFeed;
    $feed->add('user', new User);
    $feed->add('post', Post::where('category_id', 7));

    $feed->add('comment', function() {
        $comment = new Comment;
        return $comment->where('approved', true);
    });

    $results = $feed->limit(10)->get();

<a name="data-feed-processing" class="anchor" href="#data-feed-processing"></a>
### Processing results

The `get()` method will return a `Collection` object that contains the results. Records can be differentiated by using the `tag_name` attribute which was set as the first parameter when the model was added.

    foreach ($results as $result) {

        if ($result->tag_name == 'post')
            echo "New Blog Post: " . $record->title;

        elseif ($result->tag_name == 'comment')
            echo "New Comment: " . $record->content;

        elseif ($result->tag_name == 'user')
            echo "New User: " . $record->name;

    }

<a name="data-feed-ordering" class="anchor" href="#data-feed-ordering"></a>
### Ordering results

Results can be ordered by a single database column, either shared default used by all datasets or individually specified with the `add()` method. The direction of results must also be shared.

    // Ordered by updated_at if it exists, otherwise created_at
    $feed->add('user', new User, 'ifnull(updated_at, created_at)');

    // Ordered by id
    $feed->add('comments', new Comment, 'id');

    // Ordered by name (specified default below)
    $feed->add('posts', new Post);

    // Specifies the default column and the direction
    $feed->orderBy('name', 'asc')->get();
