Deferred bindings allow you to postpone model relationships until the master record commits the changes.
This is particularly useful if you need to prepare some models (such as file uploads) and associate
them to another model that doesn't exist yet.

You can defer any number of **slave** models against a **master** model using a **session key**. 
When the master record is saved along with the session key, the relationships to slave records 
are updated automatically for you.

##### Generating a session key
```php
$sessionKey = uniqid('session_key', true);
```

##### Defer a relation binding
```php
$comment = new Comment;
$comment->content = "Hello world!";
$comment->save();

$post = new Post;
$post->comments()->add($comment, $sessionKey);
```
> **Note**: The ```$post``` object has not been saved but the relationship will be created if the saving happens.

##### Defer a relation unbinding
```php
$comment = Comment::find(1);
$post = Post::find(1);
$post->comments()->delete($comment, $sessionKey);
```
The comment will not be deleted unless the post is saved.

##### List all bindings
```php
$post->comments()->withDeferred($sessionKey)->get();
```
The results will include exisiting relations aswell.

##### Cancel all bindings
```php
$post->cancelDeferred($sessionKey);
```

This will delete the slave objects rather than leaving them as orphans.

##### Commit all bindings
```php
$post = new Post;
$post->title = "First blog post";
$post->save(null, $sessionKey);
```

Alternatively
```php
$post = Post::create(['title' => 'First blog post'], $sessionKey);
```

##### Lazily commit bindings

If you are unable to supply the ```$sessionKey``` when saving, you can commit the bindings at any time using.

```php
$post->commitDeferred($sessionKey);
```

##### Clean up orphaned bindings
```php
DeferredBinding::cleanUp(5);
```
Destroys all bindings that have not been committed and are older than 5 days.
