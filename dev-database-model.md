# Active Record Model

- [Basic Usage](#basic-usage)
- [Relationships](#relationships)
- [Attribute Modifiers](#attribute-modifiers)
- [Joined Eager Loading](#joined-eager-loading)
- [Model Events](#model-events)
- [Model Validation](#model-validation)
- [File Attachments](#file-attachments)
- [Deferred Binding](#deferred-binding)
- [Extending Models](#extending-models)
- [Further Reading](#further-reading)



<a name="basic-usage"></a>
## Basic Usage

October provides the option of using an Active Record pattern to access the database, through the use of a Model class. The class is based on the [Eloquent ORM provided by Laravel](http://laravel.com/docs/eloquent).

The most basic representation of a Model used inside a Plugin looks like this:

```php
namespace PluginAuthor\PluginName\Models;

class User extends \Model {
  protected $table = 'pluginauthor_pluginname_users';
}
```



<a name="relationships"></a>
## Relations

The following relations are available, along with their optional and required arguments:

- **$hasOne** - has a single related model that belongs to it. Optional: primaryKey.
- **$hasMany** - has many related models that belong to. Optional: primaryKey.
- **$belongsTo** - owned by another related model (slave). Optional: foreignKey.
- **$belongsToMany** - owned by multiple related models. Optional: table, primaryKey, foreignKey, pivotData.
- **$morphTo** - polymorphic version of belongs to. Optional: name, type, id.
- **$morphOne** - polymorphic version of has one. Optional: type, id. Required: name.
- **$morphMany** - polymorphic version of has many. Optional: type, id. Required: name.
- **$attachOne** - single file attachment. Optional: public.
- **$attachMany** - multiple file attachments. Optional: public.
- **$hasManyThrough** - has many related models through another model. Optional: primaryKey, throughKey. Required: through.

> **Note:**  The key arguments are in the context of the defining model. The defining [primary] model is identified by a `primaryKey` and the foreign model is identified by a `foreignKey`.

An example of defining a relationship:

```php
class BlogPost extends Model
{
  public $belongsTo = [
    'user' => ['User', 'foreignKey' => 'user_id']
  ];

  public $belongsToMany = [
    'categories' => ['Category', 'table' => 'october_blog_posts_categories']
  ];

  public $attachMany = [
    'featured_images' => ['System\Models\File']
  ];
}
```

Default relationship filters can be used on all relations:

- **order** - sorting order for multiple records.
- **conditions** - applies a where statement. (TODO)

```
  public $belongsToMany = [
    'categories' => ['Category', 'order' => 'name desc', 'conditions' => 'active = 1']
  ];
```



<a name="attribute-modifiers"></a>
## Attribute modifiers

Specified attributes can be modified automatically when handling their values. For example:

```php
class User extends \October\Rain\Database\Model
{
    protected $hashable = ['password'];

    protected $purgeable = ['password_confirmation'];

    protected $jsonable = ['permissions'];

    protected $encryptable = ['api_key'];

    protected $sluggable = ['slug' => 'name'];
}
```

* **$hashable** - values are hashed, they can be verified but cannot be reversed
* **$purgeable** - attributes are removed before attempting to save to the database
* **$jsonable** - values are encoded as JSON before saving and converted to arrays after fetching
* **$encryptable** - values are encrypted and decrypted for storing sensitive data
* **$sluggable** - key attributes are generated as unique url names (slugs) based on value attributes




<a name="joined-eager-loading"></a>
## Joined Eager Loading

Similar to the standard [Eager Loading](http://laravel.com/docs/eloquent#eager-loading), you eager load and join a relation to the main query. Mainly useful for `belongsToMany` relationships.

```php
Post::joinWith('category')->select("concat(posts.name, ' - ', category.name)")->get();
Post::joinWith('comments')->where('comments.user_id', 6)->count();
```

This will also eager load the relation.



<a name="model-events"></a>
## Model Events

The following events are available:

- **beforeCreate** - before the model is saved, when first created.
- **afterCreate** - after the model is saved, when first created.
- **beforeSave** - before the model is saved, either created or updated.
- **afterSave** - after the model is saved, either created or updated.
- **beforeValidate** - before the supplied model data is validated.
- **afterValidate** - after the supplied model data has been validated.
- **beforeUpdate** - before an existing model is saved.
- **afterUpdate** - after an existing model is saved.
- **beforeDelete** - before an existing model is deleted.
- **afterDelete** - after an existing model is deleted.
- **beforeRestore** - before a soft-deleted model is restored.
- **afterRestore** - after a soft-deleted model has been restored.
- **beforeFetch** - before an exisiting model is populated.
- **afterFetch** - after an exisiting model has been populated.

An example of using an event:

```php
public function beforeCreate()
{
  // Generate a URL slug for this model
  $this->slug = Str::slug($this->name);
}
```



<a name="model-validation"></a>
## Model Validation

October models use Laravel's built-in [Validator class](http://laravel.com/docs/validation).
Defining validation rules are defined in the model class as a variable named `$rules`:

```php
class User extends \October\Rain\Database\Model
{
  public $rules = [
    'name'                  => 'required|between:4,16',
    'email'                 => 'required|email',
    'password'              => 'required|alpha_num|between:4,8|confirmed',
    'password_confirmation' => 'required|alpha_num|between:4,8',
  ];
}
```

> **Note**: you're free to use the [array syntax](http://laravel.com/docs/validation#basic-usage) for validation rules as well.

Models validate themselves automatically when the `save()` method is called.

```php
$user = new User;
$user->name = 'Adam Person';
$user->email = 'a.person@email.address.com';
$user->password = 'passw0rd';

// Returns false if model is invalid
$success = $user->save();
```

> **Note:** You can also validate a model at any time using the `validate()` method.

#### Retrieving Validation Errors

When a model fails to validate, a `Illuminate\Support\MessageBag` object is attached to the object which contains validation failure messages.

Retrieve the validation errors message collection instance with `errors()` method or `validationErrors` property.

Retrieve all validation errors with `errors()->all()`. Retrieve errors for a *specific* attribute using `validationErrors->get('attribute')`.

> **Note:** The Model leverages Laravel's MessagesBag object which has a [simple and elegant method](http://laravel.com/docs/validation#working-with-error-messages) of formatting errors.

#### Overriding Validation

`forceSave()` validates the model but saves regardless of whether or not there are validation errors.

```php
$user = new User;

// Creates a user without validation
$user->forceSave();
```

#### Custom Error Messages

Just like the Laravel Validator, you can set custom error messages using the [same syntax](http://laravel.com/docs/validation#custom-error-messages).

```php
class User extends \October\Rain\Database\Model
{
  public $customMessages = [
    'required' => 'The :attribute field is required.',
    ...
  ];
}
```

#### Custom Validation Rules

You can also create custom validation rules the [same way](http://laravel.com/docs/validation#custom-validation-rules) you would for the Laravel Validator.



<a name="file-attachments"></a>
## File Attachments

Active Record models can support file attachments using a polymorphic relationship.

#### Model Definitions

A single file attachment
```php
public $attachOne = [
    'avatar' => ['System\Models\File']
];
```

Multiple file attachments
```php
public $attachMany = [
    'photos' => ['System\Models\File']
];
```

A protected file attachment
```php
public $attachOne = [
    'avatar' => ['System\Models\File', 'public' => false]
];
```

#### Creating new attachments

Add a file saved from postback
```php
$model->avatar()->create(['data' => Input::file('file_input')]);
```

Add a protected a file
```php
$model->avatar()->create(['public' => false, 'data' => Input::file('file_input')]);
```

Add a prepared File object
```php
$file = new System\Models\File;
$file->data = Input::file('file_input');
$file->save();

$model->avatar()->attach($file);
```

#### Viewing attachments

Returning the public file path
```php
// Returns http://mysite.com/uploads/public/path/to/avatar.jpg
echo $model->avatar->getPath();
```

Returning multiple attachment file paths
```php
foreach ($model->photos as $photo) {
    echo $photo->getPath();
}
```

Resizing an image attachment
```php
//                   getThumb($width, $height, $options)
echo $model->avatar->getThumb(100, 100, ['mode' => 'crop']);
```

Supported options:

* **mode** - auto, exact, portrait, landscape, crop (default: auto)
* **quality** - 0-100 (default: 95)
* **extension** - jpg, png, gif (default: png)

#### Usage Example

Inside your model define a relationship to the **System\Models\File** class, for example:

```php
class Post extends Model
{
    public $attachOne = [
        'featured_image' => ['System\Models\File']
    ];
}
```

Uploading a file

A simple HTML form for uploading a file.

```html
<?= Form::open(['files' => true]) ?>

    <input name="example_file" type="file">

    <button type="submit">Upload File</button>

<?= Form::close() ?>
```

Processing the file upload on the server

```php
// Find the Blog Post model
$post = Post::find(1);

// Save the featured image of the Blog Post model
if (Input::hasFile('example_file'))
    $post->featured_image = Input::file('example_file');
```

Alternatively, if you need to use deferred bindings

```php
// Find the Blog Post model
$post = Post::find(1);

// Look for the postback data 'example_file' in the HTML form above
$fileFromPost = Input::file('example_file');

// If it exists, save it as the featured image with a deferred session key
if ($fileFromPost)
    $post->featured_image()->create(['data' => $fileFromPost], $sessionKey);
```

Viewing the uploaded file

Looking for the featured image

```php
// Find the Blog Post model again
$post = Post::find(1);

// Look for the featured image address, otherwise use a default one
if ($post->featured_image)
    $featuredImage = $post->featured_image->getPath();
else
    $featuredImage = 'http://placehold.it/220x300';
```

Displaying the results

```html
<img src="<?= $featuredImage ?>" alt="Featured Image">
```



<a name="deferred-binding"></a>
## Deferred Binding

Deferred bindings allow you to postpone model relationships until the master record commits the changes.
This is particularly useful if you need to prepare some models (such as file uploads) and associate
them to another model that doesn't exist yet.

You can defer any number of **slave** models against a **master** model using a **session key**. 
When the master record is saved along with the session key, the relationships to slave records 
are updated automatically for you.

#### Generating a session key
```php
$sessionKey = uniqid('session_key', true);
```

#### Defer a relation binding
```php
$comment = new Comment;
$comment->content = "Hello world!";
$comment->save();

$post = new Post;
$post->comments()->add($comment, $sessionKey);
```
> **Note**: The ```$post``` object has not been saved but the relationship will be created if the saving happens.

#### Defer a relation unbinding
```php
$comment = Comment::find(1);
$post = Post::find(1);
$post->comments()->delete($comment, $sessionKey);
```
The comment will not be deleted unless the post is saved.

#### List all bindings
```php
$post->comments()->withDeferred($sessionKey)->get();
```
The results will include existing relations as well.

#### Cancel all bindings
```php
$post->cancelDeferred($sessionKey);
```

This will delete the slave objects rather than leaving them as orphans.

#### Commit all bindings
```php
$post = new Post;
$post->title = "First blog post";
$post->save(null, $sessionKey);
```

Alternatively
```php
$post = Post::create(['title' => 'First blog post'], $sessionKey);
```

#### Lazily commit bindings

If you are unable to supply the ```$sessionKey``` when saving, you can commit the bindings at any time using.

```php
$post->commitDeferred($sessionKey);
```

#### Clean up orphaned bindings
```php
October\Rain\Database\DeferredBinding::cleanUp(5);
```
Destroys all bindings that have not been committed and are older than 5 days.



<a name="extending-models"></a>
## Extending models

Models can be extended by hooking in to the constructor. For example, to add another relation:

```php
User::extend(function($model) {
    $model->hasOne['author'] = ['Author', 'foreignKey' => 'user_id'];
});
```



<a name="further-reading"></a>
## Further Reading

* [Eloquent ORM - Laravel documentation](http://laravel.com/docs/eloquent)
* [Active record pattern - Wikipedia](http://en.wikipedia.org/wiki/Active_record_pattern)
