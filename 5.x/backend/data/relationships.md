---
previousPath: extend/database/relations.md
subtitle: Query, eager load and save related records through a model's relationships, including deferred binding for records that do not exist yet.
---
# Relationships

Relationships connect a model to other models, such as a blog post that has many comments or an order that belongs to a user. You define a relationship as an array property on the model, as described in [Relation Types](./relation-types.md), then use it to query, load and save related records.

```php
class User extends Model
{
    public $hasMany = [
        'posts' => \Acme\Blog\Models\Post::class
    ];
}
```

```php
$user = User::find(1);

// Query the relationship with constraints
$posts = $user->posts()->where('is_active', 1)->get();

// Access the related records as a property
foreach ($user->posts as $post) {
    // ...
}
```

## Querying Relations

Every relationship can be called as a method. The method returns an instance of the relationship without running its query. Relationships are also [query builders](./query-builder.md), so you can chain constraints onto the relationship before the SQL runs against your database.

The examples below use a `User` model that [has many](./relation-types/has-many.md) `Post` models, as defined at the top of this page.

### Using the Relationship Method

Call the `posts` method to query the **posts** relationship and add constraints to it. You can chain any [query builder](./query-builder.md) method on the relationship.

```php
$user = User::find(1);

$posts = $user->posts()->where('is_active', 1)->get();

$post = $user->posts()->first();
```

### Using a Dynamic Property

If you do not need extra constraints, access the relationship as a property. For example, the `$user->posts` property returns all of the user's posts.

```php
$user = User::find(1);

foreach ($user->posts as $post) {
    // ...
}
```

Dynamic properties are "lazy loading", which means they only load the relationship data when you access them. To preload relationships you know you will access, use [eager loading](#eager-loading-relations). Eager loading greatly reduces the number of SQL queries needed to load a model's relations.

### Filtering by Relationship Existence

To limit results to records that have a related record, pass the relationship name to the `has` method. For example, this retrieves all blog posts that have at least one comment.

```php
// Retrieve all posts that have at least one comment...
$posts = Post::has('comments')->get();
```

You can also specify an operator and count.

```php
// Retrieve all posts that have three or more comments...
$posts = Post::has('comments', '>=', 3)->get();
```

Use "dot" notation for nested `has` statements. This example retrieves all posts that have at least one comment with votes.

```php
// Retrieve all posts that have at least one comment with votes...
$posts = Post::has('comments.votes')->get();
```

To add "where" conditions to a `has` query, use the `whereHas` and `orWhereHas` methods. This lets you add custom constraints to the relationship, such as checking the content of a comment.

```php
// Retrieve all posts with at least one comment containing words like foo%
$posts = Post::whereHas('comments', function ($query) {
    $query->where('content', 'like', 'foo%');
})->get();
```

#### Inline Relationship Existence Queries

To check a relationship's existence with a single condition, use the `whereRelation`, `orWhereRelation`, `whereMorphRelation` or `orWhereMorphRelation` methods.

```php
$posts = Post::whereRelation('comments', 'is_approved', false)->get();
```

To search relation columns, use the `searchWhereRelation` or `orSearchWhereRelation` methods. Like [search queries](./query-builder.md), they take the search term as the first argument, the relationship name as the second and the search columns as the third, then run a case insensitive LIKE query.

```php
$posts = Post::searchWhereRelation('foo bar', 'author', ['name', 'bio'])->get();
```

### Filtering by Relationship Absence

To limit results to records without a related record, pass the relationship name to the `doesntHave` and `orDoesntHave` methods.

```php
$posts = Post::doesntHave('comments')->get();
```

The `whereDoesntHave` and `orWhereDoesntHave` methods add extra constraints to your `doesntHave` queries.

```php
$posts = Post::whereDoesntHave('comments', function ($query) {
    $query->where('content', 'like', 'code%');
})->get();
```

### Counting Related Records

The `withCount` method adds a `{relation}_count` column to the selected models with the number of related records.

```php
$users = User::withCount('roles')->get();

foreach ($users as $user) {
    echo $user->roles_count;
}
```

The `withCount` method supports several relations along with extra query constraints.

```php
$posts = Post::withCount(['votes', 'comments' => function ($query) {
    $query->where('content', 'like', 'foo%');
}])->get();

echo $posts[0]->votes_count;
echo $posts[0]->comments_count;
```

To load the count column after the model is retrieved, use the `loadCount` method.

```php
$user = User::first();
$user->loadCount('roles');
```

The `loadCount` method also supports extra query constraints.

```php
$user->loadCount(['roles' => function ($query) {
    $query->where('clearance', '>', 5);
}])
```

## Eager Loading Relations

Relationship data accessed as a property is "lazy loaded", so it is not loaded until you first access the property. Models can instead "eager load" relationships when you query the parent model. Eager loading solves the N + 1 query problem. To see the problem, consider a `Book` model that [belongs to](./relation-types/belongs-to.md) an `Author`.

```php
class Book extends Model
{
    public $belongsTo = [
        'author' => \Acme\Blog\Models\Author::class
    ];
}
```

Now retrieve all books and their authors.

```php
$books = Book::all();

foreach ($books as $book) {
    echo $book->author->name;
}
```

This loop runs 1 query to retrieve all the books, then another query for each book to retrieve its author. With 25 books, the loop runs 26 queries.

Eager loading reduces this to 2 queries. Use the `with` method to name the relationships to eager load.

```php
$books = Book::with('author')->get();

foreach ($books as $book) {
    echo $book->author->name;
}
```

Only two queries run for this operation.

```sql
select * from books

select * from authors where id in (1, 2, 3, 4, 5, ...)
```

### Eager Loading Multiple Relationships

To eager load several relationships at once, pass more arguments to the `with` method.

```php
$books = Book::with('author', 'publisher')->get();
```

### Eager Loading Nested Relationships

To eager load nested relationships, use "dot" syntax. This example eager loads all the books' authors and all the authors' personal contacts in one statement.

```php
$books = Book::with('author.contacts')->get();
```

### Constraining Eager Loads

To add query constraints to an eager loading query, pass an array with a `Closure` to the `with` method.

```php
$users = User::with([
    'posts' => function ($query) {
        $query->where('title', 'like', '%first%');
    }
])->get();
```

This example only eager loads posts whose `title` column contains the word `first`. You can call other [query builder](./query-builder.md) methods to customize the eager loading operation further.

```php
$users = User::with([
    'posts' => function ($query) {
        $query->orderBy('created_at', 'desc');
    }
])->get();
```

### Eager Loading After Retrieval

To eager load a relationship after the parent model is retrieved, use the `load` method. This is useful when you decide at runtime whether to load related models.

```php
$books = Book::all();

if ($someCondition) {
    $books->load('author', 'publisher');
}
```

To add query constraints, pass a `Closure` to the `load` method.

```php
$books->load([
    'author' => function ($query) {
        $query->orderBy('published_date', 'asc');
    }
]);
```

## Inserting Related Models

You can save related models through a relationship, using either the relationship method or a dynamic property. For example, to insert a new `Comment` for a `Post` model, insert it directly from the relationship instead of setting the `post_id` attribute yourself.

### Adding Models with the Relationship Method

Use the `add` method to associate a model with a relationship.

```php
$comment = new Comment(['message' => 'A new comment.']);

$post = Post::find(1);

$comment = $post->comments()->add($comment);
```

This example calls the `comments` method to get an instance of the relationship, rather than using the `comments` dynamic property. The `add` method sets the correct `post_id` value on the new `Comment` model.

To save several related models, use the `addMany` method.

```php
$post = Post::find(1);

$post->comments()->addMany([
    new Comment(['message' => 'A new comment.']),
    new Comment(['message' => 'Another comment.']),
]);
```

### Creating Related Models from Attributes

The `add` and `addMany` methods take a full model instance. The `create` method instead takes an array of attributes, creates a model and inserts it into the database.

```php
$post = Post::find(1);

$comment = $post->comments()->create([
    'message' => 'A new comment.',
]);
```

The attributes are restricted by the model's "fillable" definition, so review [mass assignment](./model-queries.md#mass-assignment) before using the `create` method.

### Removing Related Models

The `remove` method disassociates a model from a relationship, leaving it as an orphaned record.

```php
$post->comments()->remove($comment);
```

For many-to-many relations, the record is removed from the relationship's collection instead.

```php
$post->categories()->remove($category);
```

For a "belongs to" relationship, use the `dissociate` method, which does not need the related model.

```php
$post->author()->dissociate();
```

### Setting Relations with a Dynamic Property

You can set a relationship through its property, the same way you access it. This overwrites any relationship that existed before. Save the model afterwards, as you would with any attribute.

```php
$post->author = $author;

$post->comments = [$comment1, $comment2];

$post->save();
```

You can also set the relationship using the primary key, which is useful when working with HTML forms.

```php
// Assign to author with ID of 3
$post->author = 3;

// Assign comments with IDs of 1, 2 and 3
$post->comments = [1, 2, 3];

$post->save();
```

To disassociate a relationship, assign `null` to the property.

```php
$post->author = null;

$post->comments = null;

$post->save();
```

Relationships set on a model that does not exist yet are held in memory until the model is saved, similar to [deferred binding](#deferred-binding). In this example, the post does not exist yet, so the `post_id` attribute cannot be set on the comment. The association waits until the post is created by calling the `save` method.

```php
$comment = Comment::find(1);

$post = new Post;

$post->comments = [$comment];

$post->save();
```

## Managing Many-to-Many Relations

Models provide extra helper methods for [belongs to many](./relation-types/belongs-to-many.md) relationships. For example, a user can have many roles and a role can have many users.

### Attaching and Detaching Records

To attach a role to a user, use the `attach` method. It inserts a record in the intermediate table that joins the models.

```php
$user = User::find(1);

$user->roles()->attach($roleId);
```

You can also pass an array of extra data to insert into the intermediate table.

```php
$user->roles()->attach($roleId, ['expires' => $expires]);
```

To remove a role from a user, use the `detach` method. It removes the record from the intermediate table, and both models remain in the database.

```php
// Detach a single role from the user...
$user->roles()->detach($roleId);

// Detach all roles from the user...
$user->roles()->detach();
```

The `attach` and `detach` methods also accept arrays of IDs.

```php
$user = User::find(1);

$user->roles()->detach([1, 2, 3]);

$user->roles()->attach([1 => ['expires' => $expires], 2, 3]);
```

### Adding Records with Pivot Data

For many-to-many relationships, the `add` method accepts an array of intermediate "pivot" table attributes as its second argument.

```php
$user = User::find(1);

$pivotData = ['expires' => $expires];

$user->roles()->add($role, $pivotData);
```

When the second argument is a string, it sets the session key used by [deferred binding](#deferred-binding). In that case, pass the pivot data as the third argument.

```php
$user->roles()->add($role, $sessionKey, $pivotData);
```

### Syncing Records

The `sync` method takes an array of IDs to place on the intermediate table. IDs that are not in the array are removed from the intermediate table, so only the given IDs remain after the operation.

```php
$user->roles()->sync([1, 2, 3]);
```

You can also pass intermediate table values with the IDs.

```php
$user->roles()->sync([1 => ['expires' => true], 2, 3]);
```

## Touching Parent Timestamps

When a model belongs to another model, such as a `Comment` that belongs to a `Post`, you may want to update the parent's `updated_at` timestamp when the child changes. Add a `touches` property to the child model containing the names of the relationships to touch. This works for `belongsTo` and `belongsToMany` relationships.

```php
class Comment extends Model
{
    /**
     * All of the relationships to be touched.
     */
    protected $touches = ['post'];

    /**
     * Relations
     */
    public $belongsTo = [
        'post' => \Acme\Blog\Models\Post::class
    ];
}
```

Now, when you update a `Comment`, the owning `Post` has its `updated_at` column updated as well.

```php
$comment = Comment::find(1);

$comment->text = 'Edit to this comment!';

$comment->save();
```

## Deferred Binding

Deferred binding postpones relationship changes until the parent record is saved. Use it to prepare related models, such as file uploads, for a model that does not exist yet.

You defer any number of **slave** models against a **master** model using a **session key**. When the master record is saved with the session key, its relationships to the slave records are updated automatically. The backend [Form behavior](../forms/form-controller.md) supports deferred binding automatically, and you can use it in other places too.

### Generating a Session Key

Deferred binding requires a session key, which works like a transaction identifier. Use the same session key to bind and unbind relationships and to save the master model. You can generate a session key with the PHP `uniqid()` function. The [form helper](../../handbook/twig-functions/form.md) generates a hidden field containing the session key automatically.

```php
$sessionKey = uniqid('session_key', true);
```

### Deferring a Relation Binding

In this example, the comment is only added to the post when the post is saved.

```php
$comment = new Comment;
$comment->content = "Hello world!";
$comment->save();

$post = new Post;
$post->comments()->add($comment, $sessionKey);
```

::: tip
The `$post` object has not been saved, but the relationship is created when it is saved.
:::

### Deferring a Relation Unbinding

In this example, the comment is only removed from the post when the post is saved.

```php
$comment = Comment::find(1);
$post = Post::find(1);
$post->comments()->remove($comment, $sessionKey);
```

### Listing All Bindings

Use the `withDeferred` method of a relation to load all records, including deferred ones. The results also include existing relations.

```php
$post->comments()->withDeferred($sessionKey)->get();
```

### Canceling All Bindings

Cancel deferred bindings and delete the slave objects, rather than leaving them as orphans.

```php
$post->cancelDeferred($sessionKey);
```

### Committing All Bindings

To commit (bind or unbind) all deferred bindings when you save the master model, pass the session key to the `save` method. You can pass it as the `sessionKey` option or as the second argument.

```php
$post = new Post;
$post->title = "First blog post";
$post->save(['sessionKey' => $sessionKey]);

// Same as above
$post->save(null, $sessionKey);
```

The same approach works with the model's `create` method.

```php
$post = Post::create(['title' => 'First blog post'], $sessionKey);
```

### Committing Bindings Later

If you cannot supply the `$sessionKey` when saving, commit the bindings at any time with the `commitDeferred` method.

```php
$post->commitDeferred($sessionKey);
```

### Cleaning Up Orphaned Bindings

This destroys all bindings that have not been committed and are older than 1 day.

```php
October\Rain\Database\Models\DeferredBinding::cleanUp(1);
```

::: tip
October CMS automatically destroys deferred bindings that are older than 5 days using garbage collection.
:::

### Disabling Deferred Binding

You might need to turn off deferred binding for a model, for example when you load it from a separate database connection. To do this, make sure the model's `sessionKey` property is `null` before the deferred binding hooks in the internal save method run. Bind to the model's `model.saveInternal` event to set it.

```php
public function __construct()
{
    parent::__construct(...func_get_args());

    $this->bindEvent('model.saveInternal', function () {
        $this->sessionKey = null;
    });
}
```

::: tip
This turns off deferred binding entirely for any model you apply this override to.
:::

#### See Also

::: also
* [Relation Types](./relation-types.md)
* [Common Relation Parameters](./relation-types.md#common-parameters)
* [Model Queries](./model-queries.md)
* [File Attachments](./attachments.md)
:::
