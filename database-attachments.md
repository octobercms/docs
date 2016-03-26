# Database attachments

- [File attachments](#file-attachments)
    - [Creating new attachments](#creating-attachments)
    - [Viewing attachments](#viewing-attachments)
    - [Usage example](#attachments-usage-example)


<a name="file-attachments"></a>
## File attachments

Models can support file attachments using a subset of the [polymorphic relationship](../database/relations#polymorphic-relations). The `$attachOne` or `$attachMany` relations are designed for linking a file to a database record called "attachments". In almost all cases the `System\Models\File` model is used to safekeep this relationship.

In the examples below the model has a single Avatar attachment model and many Photo attachment models.

A single file attachment:

    public $attachOne = [
        'avatar' => 'System\Models\File'
    ];

Multiple file attachments:

    public $attachMany = [
        'photos' => 'System\Models\File'
    ];

Protected attachments are uploaded to the application's **uploads/protected** directory which is not accessible for the direct access from the Web. A protected file attachment is defined by setting the *public* argument to `false`:

    public $attachOne = [
        'avatar' => ['System\Models\File', 'public' => false]
    ];

<a name="creating-attachments"></a>
### Creating new attachments

For singular attach relations (`$attachOne`), you may create an attachment directly via the model relationship, by setting its value using the `Input::file` method, which reads the file data from an input upload.

    $model->avatar = Input::file('file_input');

You may also pass a string to the `data` attribute that contains an absolute path to a local file.

    $model->avatar = '/path/to/somefile.jpg';

For multiple attach relations (`$attachMany`), you may use the `create()` method on the relationship instead, notice the file object is assocated to the `data` attribute. This approach can be used for singular relations too, if you prefer.

    $model->avatar()->create(['data' => Input::file('file_input')]);

Alternatively, you can prepare a File model before hand, then manually associate the relationship later. Notice the `is_public` attribute must be set explicitly using this approach.

    $file = new System\Models\File;
    $file->data = Input::file('file_input');
    $file->is_public = true;
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
            'featured_image' => 'System\Models\File'
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

Alternatively, you can use [deferred binding](../database/relations#deferred-binding) to defer the relationship:

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
