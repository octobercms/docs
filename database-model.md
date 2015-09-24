# Active Record Model

- [Introduction](#introduction)
- [Standard attributes](#standard-attributes)
- [Model events](#model-events)
- [File attachments](#file-attachments)
- [Extending models](#extending-models)

October provides the option of using an Active Record pattern to access the database, through the use of the `Model` class. The class extends and shares the features of [Eloquent ORM provided by Laravel](http://laravel.com/docs/eloquent).

<a name="introduction"></a>
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

<a name="class-definition"></a>
### Class definition

You should create one model class for each database table. All model classes must extend the `Model` class. The most basic representation of a model used inside a Plugin looks like this:

    namespace Acme\Blog\Models;

    use Model;

    class Post extends Model {

        protected $table = 'acme_blog_posts';

    }

The `$table` protected field specifies the database table corresponding the model. The table name is a snake case name of the author, plugin and pluralized record type name.

<a name="standard-attributes"></a>
## Standard attributes

There are some standard attributes that can be found on models, in addition to those provided by [model traits](traits).

October models can apply modifiers to the attribute values when the model is loaded or saved to the database. The modifiers are defined with the model class properties as arrays. For example:

    class User extends Model
    {
        protected $exists = false;

        protected $dates = ['last_seen_at'];

        protected $timestamps = true;

        protected $jsonable = ['permissions'];
    }

Property | Description
------------- | -------------
**$exists** | boolean that if true indicates that the model exists.
**$dates** | values are converted to an instance of Carbon/DateTime objects after fetching.
**$timestamps** | boolean that if true will automatically set created_at and updated_at fields.
**$jsonable** | values are encoded as JSON before saving and converted to arrays after fetching.
**$fillable** | values are fields accessible to mass assignment.
**$guarded** | values are fields guarded from mass assignment.
**$visible** | values are fields made visible when converting the model to JSON or an array.
**$hidden** | values are fields made hidden when converting the model to JSON or an array.

<a name="model-events"></a>
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

<a name="file-attachments"></a>
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

<a name="creating-attachments"></a>
### Creating new attachments

Attach a file uploaded with a form:

    $model->avatar = Input::file('file_input');

Attach a prepared File object:

    $file = new System\Models\File;
    $file->data = Input::file('file_input');
    $file->save();

    $model->avatar()->add($file);

<a name="viewing-attachments"></a>
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

<a name="attachments-usage-example"></a>
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

Alternatively you use the [deferred binding](../database/relations#deferred-binding):

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

<a name="extending-models"></a>
## Extending models

Models can be extended with the static `extend()` method. The method takes a closure and passes the model object into it. Inside the closure you can add relations to the model::

    User::extend(function($model) {
        $model->hasOne['author'] = ['Author', 'key' => 'user_id'];
    });
