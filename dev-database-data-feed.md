# Data Feed

A data feed allows you to combine multiple model classes into a single Collection. This can be useful for creating feeds and streams of data while supporting the use of pagination.

It works by adding model objects in a prepared state, before the `get()` method is called, which are then combined to make a collection that behaves the same as a regular dataset.

The `DataFeed` class mimics a regular Active Record model and supports `limit()` and `paginate()` methods.

#### Usage instructions

```php
$feed = new October\Rain\Database\DataFeed;
$feed->add('user', new User);
$feed->add('post', Post::where('category_id', 7));

$feed->add('comment', function(){
    $comment = new Comment;
    return $comment->where('approved', true);
});

$results = $feed->limit(10)->get();
```

This example will combine the User, Post and Comment models in to a single collection and returns the first 10 records.

#### Processing results

The `get()` method will return a `Collection` object that contains the results. Records can be differentiated by using the `tag_name` attribute which was set as the first parameter when the model was added.

```php
foreach ($results as $result) {

    if ($result->tag_name == 'post')
        echo "New Blog Post: " . $record->title;

    elseif ($result->tag_name == 'comment')
        echo "New Comment: " . $record->content;

    elseif ($result->tag_name == 'user')
        echo "New User: " . $record->name;

}
```

#### Ordering results

Results can be ordered by a single database column, either shared default used by all datasets or individually specified with the `add()` method. The direction of results must also be shared.

```php
// Ordered by updated_at if it exists, otherwise created_at
$feed->add('user', new User, 'ifnull(updated_at, created_at)');

// Ordered by id
$feed->add('comments', new Comment, 'id');

// Ordered by name (specified default below)
$feed->add('posts', new Post);

// Specifies the default column and the direction
$feed->orderBy('name', 'asc')->get();
```