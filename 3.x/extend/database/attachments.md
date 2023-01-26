# File Attachments

Models can support file attachments using a subset of the [polymorphic relationship](./relations.md). The `$attachOne` or `$attachMany` relations are designed for linking a file to a database record called "attachments". In almost all cases the `System\Models\File` model is used to safekeep this relationship where reference to the files are stored as records in the `system_files` table and have a polymorphic relation to the parent model.

In the examples below the model has a single Avatar attachment model and many Photo attachment models.

A single file attachment:

```php
public $attachOne = [
    'avatar' => \System\Models\File::class
];
```

Multiple file attachments:

```php
public $attachMany = [
    'photos' => \System\Models\File::class
];
```

::: warning
To avoid a naming collision, make sure that your model's database table does not already have an attribute that uses the same name as your attachment relationship.
:::

Protected attachments are uploaded to the application's **uploads/protected** directory which is not accessible for the direct access from the Web. A protected file attachment is defined by setting the `public` property to `false`.

```php
public $attachOne = [
    'avatar' => [\System\Models\File::class, 'public' => false]
];
```

## Creating New Attachments

For singular attach relations (`$attachOne`), you may create an attachment directly via the model relationship, by setting its value using the `files` function, which reads the file data from an input upload.

```php
$model->avatar = files('file_input');
```

To associate a new file from a local path, use the `System\Models\File` model and `fromFile` method.

```php
$model->avatar = (new File)->fromFile('/path/to/somefile.jpg');
```

To create a file directly from (raw) data, use the `fromData` method to pass the contents (first argument) and a file name (second argument).

```php
$model->avatar = (new File)->fromData('Some content', 'sometext.txt');
```

You can also add a file from a URL using the `fromUrl` method. To use this method, you need install cURL PHP Extension.

```php
$model->avatar = (new File)->fromUrl('https://example.tld/path/to/avatar.jpg');
```

Optionally, you may specify a custom file name (second argument).

```php
$model->avatar = (new File)->fromUrl('https://example.tld/avatar.jpg', 'customname.jpg');
```

### Handling Multiple Attachments

For multiple attach relations (`$attachMany`), you can pass an array of values from the `files()` function.

```php
$model->photos = (array) files('multi_file');
```

You may use the `create` method to append a file on an existing relationship instead, notice the file object is associated to the `data` attribute. This approach can be used for singular relations too, if you prefer.

```php
$model->photos()->create(['data' => files('file_input')]);
```

You may use the `add` method on the relationship to work directly with a `System\Models\File` model.

```php
$model->photos()->add((new File)->fromFile('/path/to/somefile.jpg'));
```

Alternatively, you can prepare a File model before hand, then manually associate the relationship later. Notice the `is_public` attribute must be set explicitly using this approach.

```php
$file = new System\Models\File;
$file->data = files('file_input');
$file->is_public = true;
$file->save();

$model->photos()->add($file);
```

## Viewing Attachments

The `getUrl` method returns the full URL of an uploaded public file. The following code would print something like **example.tld/uploads/public/path/to/avatar.jpg**.

```php
echo $model->avatar->getUrl();
```

Returning multiple attachment file paths.

```php
foreach ($model->photos as $photo) {
    echo $photo->getUrl();
}
```

Displaying a file on the page using Twig.

```twig
<img src="{{ model.avatar.url }}" alt="Description Image" />
```

### Accessing the Local Path

The `getLocalPath` method will return an absolute path of an uploaded file in the local filesystem. If using an external driver such as S3, this method will download the contents to a temporary location in the local filesystem.

```php
echo $model->avatar->getLocalPath();
```

## Resizing Thumbs

You can resize an image with the `getThumbUrl` method. The method takes 3 parameters - image width, image height and the options parameter.

The **width** and **height** parameters should be specified as a number or as the **auto** word for the automatic proportional scaling.

```php
echo $model->avatar->getThumbUrl(100, 100, ['mode' => 'crop']);
```

Displaying an image on the page using Twig.

```twig
<img src="{{ model.avatar.thumbUrl(100, 100, { mode: 'exact', quality: 80, extension: 'webp' }) }}" alt="Description Image" />
```

Read more about the available options for `getThumbUrl` on the [image resizer article](../services/resizer.md).

## Output and Download

To output the file contents directly, use the `output` method, this return a [response object](../services/response-view.md) that will include the necessary headers for displaying the file in a browser.

```php
return $model->avatar->output();
```

You can output the contents to the browser by chaining the `send` method.

```php
$model->avatar->output()->send();
```

Return the `download` method to download the file as a response.

```php
return $model->avatar->download();
```

## Usage Example

This section shows a full usage example of the model attachments feature - from defining the relation in a model to displaying the uploaded image on a page.

Inside your model define a relationship to the `System\Models\File` class, for example:

```php
class Post extends Model
{
    public $attachOne = [
        'featured_image' => \System\Models\File::class
    ];
}
```

Build a form for uploading a file:

```php
<?= Form::open(['files' => true]) ?>

    <input name="example_file" type="file">

    <button type="submit">Upload File</button>

<?= Form::close() ?>
```

Process the uploaded file on the server and attach it to a model:

```php
// Find the Blog Post model
$post = Post::find(1);

// Save the featured image of the Blog Post model
if (Input::hasFile('example_file')) {
    $post->featured_image = Input::file('example_file');
}
```

Alternatively, you can use [deferred binding](./relations.md) to defer the relationship.

```php
// Find the Blog Post model
$post = Post::find(1);

// Look for the postback data 'example_file' in the HTML form above
$fileFromPost = Input::file('example_file');

// If it exists, save it as the featured image with a deferred session key
if ($fileFromPost) {
    $post->featured_image()->create(['data' => $fileFromPost], $sessionKey);
}
```

Display the uploaded file on a page:

```php
// Find the Blog Post model again
$post = Post::find(1);

// Look for the featured image address, otherwise use a default one
if ($post->featured_image) {
    $featuredImage = $post->featured_image->getUrl();
}
else {
    $featuredImage = 'http://placehold.it/220x300';
}

<img src="<?= $featuredImage ?>" alt="Featured Image" />
```

If you need to access the owner of a file, you can use the `attachment` property of the `File` model:

```php
public $morphTo = [
    'attachment' => []
];
```

Example:

```php
$user = $file->attachment;
```

For more information read the [polymorphic relationships](./relations.md#relation-polymorphic-relations)

## Validation Example

The example below uses [array validation](../services/validation.md) to validate `$attachMany` relationships.

```php
use System\Models\File;
use Model;

class Gallery extends Model
{
    use \October\Rain\Database\Traits\Validation;

    public $attachMany = [
        'photos' => File::class
    ];

    public $rules = [
        'photos' => 'required',
        'photos.*' => 'image|max:1000|dimensions:min_width=100,min_height=100'
    ];
}
```

For more information on the `attribute.*` syntax used above, see the [validation article](../services/validation.md) on validating arrays.
