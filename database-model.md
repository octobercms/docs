# Active Record Model

- [Introduction](#introduction)
- [Attribute modifiers](#attribute-modifiers)
- [Model events](#model-events)
- [Model validation](#model-validation)
- [File attachments](#file-attachments)
- [Deferred binding](#deferred-binding)
- [Extending models](#extending-models)

October provides the option of using an Active Record pattern to access the database, through the use of the `Model` class. The class extends and shares the features of [Eloquent ORM provided by Laravel](http://laravel.com/docs/eloquent).

<a name="introduction" class="anchor" href="#introduction"></a>
## Introduction

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

<a name="class-definition" class="anchor" href="#class-definition"></a>
### Class definition

You should create one model class for each database table. All model classes must extend the `Model` class. The most basic representation of a model used inside a Plugin looks like this:

    namespace Acme\Blog\Models;

    use Model;

    class Post extends Model {

        protected $table = 'acme_blog_posts';

    }

The `$table` protected field specifies the database table corresponding the model. The table name is a snake case name of the author, plugin and pluralized record type name.

<a name="attribute-modifiers" class="anchor" href="#attribute-modifiers"></a>
## Attribute modifiers

October models can apply modifiers to the attribute values when the model is loaded or saved to the database. The modifiers are defined with the model class properties as arrays. For example:

    class User extends \October\Rain\Database\Model
    {
        protected $hashable = ['password'];

        protected $purgeable = ['password_confirmation'];

        protected $jsonable = ['permissions'];

        protected $encryptable = ['api_key'];

        protected $slugs = ['slug' => 'name'];
    }

The following attribute modifiers are supported:

Property | Description
------------- | -------------
**$hashable** | values are hashed, they can be verified but cannot be reversed. Requires trait: `October\Rain\Database\Traits\Hashable`.
**$purgeable** | attributes are removed before attempting to save to the database. Requires trait: `October\Rain\Database\Traits\Purgeable`.
**$jsonable** | values are encoded as JSON before saving and converted to arrays after fetching.
**$encryptable** | values are encrypted and decrypted for storing sensitive data. Requires trait: `October\Rain\Database\Traits\Encryptable`.
**$slugs** | key attributes are generated as unique url names (slugs) based on value attributes. Requires trait: `October\Rain\Database\Traits\Sluggable`.
**$dates** | values are converted to an instance of Carbon/DateTime objects after fetching.
**$timestamps** | boolean that if true will automatically set created_at and updated_at fields.

The following attribute declarations are supported:

Property | Description
------------- | -------------
**$fillable** | values are fields accessible to mass assignment.
**$guarded** | values are fields guarded from mass assignment.
**$visible** | values are fields made visible when converting the model to JSON or an array.
**$hidden** | values are fields made hidden when converting the model to JSON or an array.

<a name="model-events" class="anchor" href="#model-events"></a>
## Model events

You can handle different model life cycle events by defining special methods in the model class. The following events are available:

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

    public function beforeCreate()
    {
        // Generate a URL slug for this model
        $this->slug = Str::slug($this->name);
    }

<a name="model-validation" class="anchor" href="#model-validation"></a>
## Model validation

October models use Laravel's built-in [Validator class](http://laravel.com/docs/validation). The validation rules are defined in the model class as a property named `$rules` and the class must use the trait `October\Rain\Database\Traits\Validation`:

    class User extends \October\Rain\Database\Model
    {
        use \October\Rain\Database\Traits\Validation;

        public $rules = [
            'name'                  => 'required|between:4,16',
            'email'                 => 'required|email',
            'password'              => 'required|alpha_num|between:4,8|confirmed',
            'password_confirmation' => 'required|alpha_num|between:4,8'
        ];
    }

> **Note**: You're free to use the [array syntax](http://laravel.com/docs/validation#basic-usage) for validation rules as well.

Models validate themselves automatically when the `save()` method is called.

    $user = new User;
    $user->name = 'Adam Person';
    $user->email = 'a.person@email.address.com';
    $user->password = 'passw0rd';

    // Returns false if model is invalid
    $success = $user->save();

> **Note:** You can also validate a model at any time using the `validate()` method.

<a name="retrieving-validation-errors" class="anchor" href="#retrieving-validation-errors"></a>
### Retrieving validation errors

When a model fails to validate, a `Illuminate\Support\MessageBag` object is attached to the model. The object which contains validation failure messages. Retrieve the validation errors message collection instance with `errors()` method or `$validationErrors` property. Retrieve all validation errors with `errors()->all()`. Retrieve errors for a *specific* attribute using `validationErrors->get('attribute')`.

> **Note:** The Model leverages Laravel's MessagesBag object which has a [simple and elegant method](http://laravel.com/docs/validation#working-with-error-messages) of formatting errors.

<a name="overriding-validation" class="anchor" href="#overriding-validation"></a>
### Overriding validation

The `forceSave()` method validates the model and saves regardless of whether or not there are validation errors.

    $user = new User;

    // Creates a user without validation
    $user->forceSave();

<a name="custom-error-messages" class="anchor" href="#custom-error-messages"></a>
### Custom error messages

Just like the Laravel Validator, you can set custom error messages using the [same syntax](http://laravel.com/docs/validation#custom-error-messages).

    class User extends \October\Rain\Database\Model
    {
        public $customMessages = [
           'required' => 'The :attribute field is required.',
            ...
        ];
    }

<a name="custom-attribute-names" class="anchor" href="#custom-attribute-names"></a>
### Custom attribute names

You may also set custom attribute names with the `$attributeNames` array.

    class User extends \October\Rain\Database\Model
    {
        public $attributeNames = [
           'email' => 'Email Address',
            ...
        ];
    }

<a name="custom-validation-rules" class="anchor" href="#custom-validation-rules"></a>
### Custom validation rules

You can also create custom validation rules the [same way](http://laravel.com/docs/validation#custom-validation-rules) you would for the Laravel Validator.

<a name="file-attachments" class="anchor" href="#file-attachments"></a>
## File attachments

Models can support file attachments using a subset of the [polymorphic relationship](#relation-polymorph). The `$attachOne` or `$attachMany` relations are designed for linking a file to a database record called "attachments". In almost all cases the `System\Models\File` model is used to safekeep this relationship.

In the examples below the model has a single Avatar attachment model and many Photo attachment models.

A single file attachment:

    public $attachOne = [
        'avatar' => ['System\Models\File']
    ];

Multiple file attachments:

    public $attachMany = [
        'photos' => ['System\Models\File']
    ];

Protected attachments are uploaded to the application's **uploads/protected** directory which is not accessible for the direct access from the Web. A protected file attachment is defined by setting the *public* argument to `false`:

    public $attachOne = [
        'avatar' => ['System\Models\File', 'public' => false]
    ];

<a name="creating-attachments" class="anchor" href="#creating-attachments"></a>
### Creating new attachments

Attach a file uploaded with a form:

    $model->avatar = Input::file('file_input');

Attach a prepared File object:

    $file = new System\Models\File;
    $file->data = Input::file('file_input');
    $file->save();

    $model->avatar()->add($file);

<a name="viewing-attachments" class="anchor" href="#viewing-attachments"></a>
### Viewing attachments

The `getPath()` method returns the full URL of an uploaded public file. The following code would print something like **...mysite.com/uploads/public/path/to/avatar.jpg**

    echo $model->avatar->getPath();

Returning multiple attachment file paths:

    foreach ($model->photos as $photo) {
        echo $photo->getPath();
    }

The `getLocalPath()` method will return an absolute path of an uploaded file in the local filesystem.

    echo $model->avatar->getLocalPath();

To output the file contents directly, use the `output()` method, this will include the necessary headers for downloading the file:

    echo $model->avatar->output();

You can resize an image with the `getThumb()` method. The method takes 3 parameters - image width, image height and the options parameter. The following options are supported:

Option | Description
------------- | -------------
**mode** | auto, exact, portrait, landscape, crop. Default: auto
**quality** | 0 - 100. Default: 95
**extension** | auto, jpg, png, gif. Default: jpg

The **width** and **height** parameters should be specified as a number or as the **auto** word for the automatic proportional scaling.

    echo $model->avatar->getThumb(100, 100, ['mode' => 'crop']);

<a name="attachments-usage-example" class="anchor" href="#attachments-usage-example"></a>
### Usage example

This section shows a full usage example of the model attachments feature - from defining the relation in a model to displaying the uploaded image on a page.

Inside your model define a relationship to the `System\Models\File` class, for example:

    class Post extends Model
    {
        public $attachOne = [
            'featured_image' => ['System\Models\File']
        ];
    }

Build a form for uploading a file:

    <?= Form::open(['files' => true]) ?>

        <input name="example_file" type="file">

        <button type="submit">Upload File</button>

    <?= Form::close() ?>

Process the uploaded file on the server and attach it to a model:

    // Find the Blog Post model
    $post = Post::find(1);

    // Save the featured image of the Blog Post model
    if (Input::hasFile('example_file')) {
        $post->featured_image = Input::file('example_file');
    }

Alternatively you use the [deferred binding](#deferred-binding):

    // Find the Blog Post model
    $post = Post::find(1);

    // Look for the postback data 'example_file' in the HTML form above
    $fileFromPost = Input::file('example_file');

    // If it exists, save it as the featured image with a deferred session key
    if ($fileFromPost) {
        $post->featured_image()->create(['data' => $fileFromPost], $sessionKey);
    }

Display the uploaded file on a page:

    // Find the Blog Post model again
    $post = Post::find(1);

    // Look for the featured image address, otherwise use a default one
    if ($post->featured_image) {
        $featuredImage = $post->featured_image->getPath();
    }
    else {
        $featuredImage = 'http://placehold.it/220x300';
    }

    <img src="<?= $featuredImage ?>" alt="Featured Image">

<a name="deferred-binding" class="anchor" href="#deferred-binding"></a>
## Deferred binding

Deferred bindings allow you to postpone model relationships binding until the master record commits the changes. This is particularly useful if you need to prepare some models (such as file uploads) and associate them to another model that doesn't exist yet.

You can defer any number of **slave** models against a **master** model using a **session key**. When the master record is saved along with the session key, the relationships to slave records are updated automatically for you. Deferred bindings are supported in the back-end [Form behavior](../backend/form) automatically, but you may want to use this feature in other places.

<a name="deferred-session-key" class="anchor" href="#deferred-session-key"></a>
### Generating a session key

The session key is required for deferred bindings. You can think of a session key as of a transaction identifier. The same session key should be used for binding/unbinding relationships and saving the master model. You can generate the session key with PHP `uniqid()` function. Note that the [form helper](../cms/markup#forms) generates a hidden field containing the session key automatically.

    $sessionKey = uniqid('session_key', true);

<a name="defer-binding" class="anchor" href="#deferr-binding"></a>
### Defer a relation binding

The comment in the next example will not be added to the post unless the post is saved.

    $comment = new Comment;
    $comment->content = "Hello world!";
    $comment->save();

    $post = new Post;
    $post->comments()->add($comment, $sessionKey);

> **Note**: the `$post` object has not been saved but the relationship will be created if the saving happens.

<a name="defer-unbinding" class="anchor" href="#defer-unbinding"></a>
### Defer a relation unbinding

The comment in the next example will not be deleted unless the post is saved.

    $comment = Comment::find(1);
    $post = Post::find(1);
    $post->comments()->delete($comment, $sessionKey);

<a name="list-all-bindings" class="anchor" href="#list-all-bindings"></a>
### List all bindings

Use the `withDeferred()` method of a relation to load all records, including deferred. The results will include existing relations as well.

    $post->comments()->withDeferred($sessionKey)->get();

<a name="cancel-all-bindings" class="anchor" href="#cancel-all-bindings"></a>
### Cancel all bindings

It's a good idea to cancel deferred binding and delete the slave objects rather than leaving them as orphans.

    $post->cancelDeferred($sessionKey);

<a name="commit-all-bindings" class="anchor" href="#commit-all-bindings"></a>
### Commit all bindings

You can commit (bind or unbind) all deferred bindings when you save the master model by providing the session key with the second argument of the `save()` method.

    $post = new Post;
    $post->title = "First blog post";
    $post->save(null, $sessionKey);

The same approach works with the model's `create()` method:

    $post = Post::create(['title' => 'First blog post'], $sessionKey);

<a name="lazily-commit-bindings" class="anchor" href="#lazily-commit-bindings"></a>
### Lazily commit bindings

If you are unable to supply the `$sessionKey` when saving, you can commit the bindings at any time using the the next code:

    $post->commitDeferred($sessionKey);

<a name="cleanup-bindings" class="anchor" href="#cleanup-bindings"></a>
### Clean up orphaned bindings

Destroys all bindings that have not been committed and are older than 1 day:

    October\Rain\Database\Models\DeferredBinding::cleanUp(1);

> **Note:** October automatically destroys deferred bindings that are older than 5 days. It happens when a back-end user logs into the system.

<a name="extending-models" class="anchor" href="#extending-models"></a>
## Extending models

Models can be extended with the static `extend()` method. The method takes a closure and passes the model object into it. Inside the closure you can add relations to the model::

    User::extend(function($model) {
        $model->hasOne['author'] = ['Author', 'key' => 'user_id'];
    });
