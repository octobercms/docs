# Database attachments

- [File attachments](#file-attachments)
    - [Creating new attachments](#creating-attachments)
    - [Viewing attachments](#viewing-attachments)
    - [Usage example](#attachments-usage-example)
    - [Validation example](#attachments-validation-example)


<a name="file-attachments"></a>
## File attachments

Models can support file attachments using a subset of the [polymorphic relationship](../database/relations#polymorphic-relations). The `$attachOne` or `$attachMany` relations are designed for linking a file to a database record called "attachments". In almost all cases the `System\Models\File` model is used to safekeep this relationship where reference to the files are stored as records in the `system_files` table and have a polymorphic relation to the parent model.

In the examples below the model has a single Avatar attachment model and many Photo attachment models.

A single file attachment:

    public $attachOne = [
        'avatar' => 'System\Models\File'
    ];

Multiple file attachments:

    public $attachMany = [
        'photos' => 'System\Models\File'
    ];

Note: In the above examples, the key name used is identical to the file upload field name. When creating the polymorphic relationship between your model and the `System\Models\File` model, if you have a column that shares the same name as the file upload field name, this can cause unexpected results.


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
    
Sometimes it may also be useful to create a `File` instance directly from (raw) data:

    $file = (new System\Models\File)->fromData('Some content', 'sometext.txt');

For multiple attach relations (`$attachMany`), you may use the `create` method on the relationship instead, notice the file object is associated to the `data` attribute. This approach can be used for singular relations too, if you prefer.

    $model->avatar()->create(['data' => Input::file('file_input')]);

Alternatively, you can prepare a File model before hand, then manually associate the relationship later. Notice the `is_public` attribute must be set explicitly using this approach.

    $file = new System\Models\File;
    $file->data = Input::file('file_input');
    $file->is_public = true;
    $file->save();

    $model->avatar()->add($file);
    
You can also add a file from a URL. To work this method, you need install cURL PHP Extension.

    $file = new System\Models\File;
    $file->fromUrl('https://example.com/uploads/public/path/to/avatar.jpg');

    $user->avatar()->add($file);
    
Occasionally you may need to change a file name. You may do so by using second method parameter.

    $file->fromUrl('https://example.com/uploads/public/path/to/avatar.jpg', 'somefilename.jpg');
    

<a name="viewing-attachments"></a>
### Viewing attachments

The `getPath` method returns the full URL of an uploaded public file. The following code would print something like **example.com/uploads/public/path/to/avatar.jpg**

    echo $model->avatar->getPath();

Returning multiple attachment file paths:

    foreach ($model->photos as $photo) {
        echo $photo->getPath();
    }

The `getLocalPath` method will return an absolute path of an uploaded file in the local filesystem.

    echo $model->avatar->getLocalPath();

To output the file contents directly, use the `output` method, this will include the necessary headers for downloading the file:

    echo $model->avatar->output();

You can resize an image with the `getThumb` method. The method takes 3 parameters - image width, image height and the options parameter. The following options are supported:

Option | Description
------------- | -------------
**mode** | auto, exact, portrait, landscape, crop, fit. Default: auto
**quality** | 0 - 100. Default: 90
**interlace** | boolean: false (default), true
**extension** | auto, jpg, png, webp, gif. Default: jpg

The **width** and **height** parameters should be specified as a number or as the **auto** word for the automatic proportional scaling.

    echo $model->avatar->getThumb(100, 100, ['mode' => 'crop']);

Display image on a page:

    <img src="{{ model.avatar.getThumb(100, 100, {'mode':'exact', 'quality': 80, 'extension': 'webp'}) }}" alt="Description Image" />

#### Viewing Modes

The `mode` option allows you to specify how the image should be resized. Here are the available modes:

* `auto` will automatically choose between `portrait` and `landscape` based on the image's orientation
* `exact` will resize to the exact dimensions given, without preserving aspect ratio
* `portrait` will resize to the given height and adapt the width to preserve aspect ratio
* `landscape` will resize to the given width and adapt the height to preserve aspect ratio
* `crop` will crop to the given dimensions after fitting as much of the image as possible inside those
* `fit` will fit the image inside the given maximal dimensions, keeping the aspect ratio

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

If you need to access the owner of a file, you can use the `attachment` property of the `File` model:

    public $morphTo = [
        'attachment' => []
    ];
    
Example:  

    $user = $file->attachment;
    
For more information read the [polymorphic relationships](../database/relations#polymorphic-relations)

<a name="attachments-validation-example"></a>
### Validation example

The example below uses [array validation](../services/validation#validating-arrays) to validate `$attachMany` relationships.

    use October\Rain\Database\Traits\Validation;
    use System\Models\File;
    use Model;
    
    class Gallery extends Model
    {
        use Validation;

        public $attachMany = [
            'photos' => File::class
        ];
    
        public $rules = [
            'photos'   => 'required',
            'photos.*' => 'image|max:1000|dimensions:min_width=100,min_height=100'
        ];
    
        /* some other code */
    }

For more information on the `attribute.*` syntax used above, see [validating arrays](../services/validation#validating-arrays).
