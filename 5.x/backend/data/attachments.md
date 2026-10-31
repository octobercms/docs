---
previousPath: extend/database/attachments.md
subtitle: Attach uploaded files to a model, then display, resize, output or download them.
---
# File Attachments

File attachments link files to a model record, such as a user's avatar or a gallery of photos. Define them with the `$attachOne` or `$attachMany` relations, which use the `System\Models\File` model to store each file as a record in the `system_files` table with a polymorphic relation to the parent model.

```php
class User extends Model
{
    public $attachOne = [
        'avatar' => \System\Models\File::class
    ];
}
```

```php
$user->avatar = files('avatar');
$user->save();

echo $user->avatar->getUrl();
```

## Defining Attachments

Use [`$attachOne`](./relation-types/attach-one.md) for a single file and [`$attachMany`](./relation-types/attach-many.md) for multiple files. The examples on this page use a model with one `avatar` attachment and many `photos` attachments.

```php
public $attachOne = [
    'avatar' => \System\Models\File::class
];

public $attachMany = [
    'photos' => \System\Models\File::class
];
```

::: warning
To avoid a naming collision, make sure your model's database table does not already have an attribute with the same name as your attachment relationship.
:::

### Protecting Attachments from Public Access

Protected attachments are uploaded to the application's **uploads/protected** directory, which cannot be accessed directly from the web. To define a protected attachment, set the `public` property to `false`.

```php
public $attachOne = [
    'avatar' => [\System\Models\File::class, 'public' => false]
];
```

## Attaching Files

For single attachments (`$attachOne`), set the relationship value to the result of the `files` function, which reads the file data from an input upload.

```php
$model->avatar = files('file_input');
```

To attach a file from a local path, use the `fromFile` method of the `System\Models\File` model.

```php
$model->avatar = (new File)->fromFile('/path/to/somefile.jpg');
```

To create a file from raw data, use the `fromData` method. Pass the contents as the first argument and a file name as the second.

```php
$model->avatar = (new File)->fromData('Some content', 'sometext.txt');
```

To add a file from a URL, use the `fromUrl` method. This method requires the cURL PHP extension.

```php
$model->avatar = (new File)->fromUrl('https://example.tld/path/to/avatar.jpg');
```

You can pass a custom file name as the second argument.

```php
$model->avatar = (new File)->fromUrl('https://example.tld/avatar.jpg', 'customname.jpg');
```

### Attaching Multiple Files

For multiple attachments (`$attachMany`), pass an array of values from the `files()` function.

```php
$model->photos = (array) files('multi_file');
```

To append a file to an existing relationship, use the `create` method and pass the file to the `data` attribute. This also works for single attachments.

```php
$model->photos()->create(['data' => files('file_input')]);
```

To work directly with a `System\Models\File` model, use the `add` method on the relationship.

```php
$model->photos()->add(
    $model->photos()->make()->fromFile('/path/to/somefile.jpg')
);
```

You can also prepare a File model beforehand and associate it later. With this approach, you must set the `is_public` attribute explicitly.

```php
$file = new \System\Models\File;
$file->data = files('file_input');
$file->is_public = true;
$file->save();

$model->photos()->add($file);
```

## Displaying Attachments

The `getUrl` method returns the full URL of an uploaded public file. The following code prints something like **example.tld/uploads/public/path/to/avatar.jpg**.

```php
echo $model->avatar->getUrl();
```

For multiple attachments, loop over the relation.

```php
foreach ($model->photos as $photo) {
    echo $photo->getUrl();
}
```

In Twig, use the `url` property.

```twig
<img src="{{ model.avatar.url }}" alt="Description Image" />
```

### Accessing the Local Path

The `getLocalPath` method returns the absolute path of an uploaded file in the local filesystem. If you use an external driver such as S3, this method downloads the contents to a temporary location in the local filesystem.

```php
echo $model->avatar->getLocalPath();
```

## Resizing Images

The `getThumbUrl` method resizes an image. It takes three parameters: the image width, the image height and an options array. Set the **width** and **height** to a number, or to the word **auto** for automatic proportional scaling.

```php
echo $model->avatar->getThumbUrl(100, 100, ['mode' => 'crop']);
```

In Twig, use the `thumbUrl` method.

```twig
<img src="{{ model.avatar.thumbUrl(100, 100, { mode: 'exact', quality: 80, extension: 'webp' }) }}" alt="Description Image" />
```

See the [image resizer article](../services/resizer.md) for the available `getThumbUrl` options.

## Outputting and Downloading Files

To output the file contents directly, use the `output` method. It returns a [response object](../services/response-view.md) with the headers needed to display the file in a browser.

```php
return $model->avatar->output();
```

To send the contents to the browser, chain the `send` method.

```php
$model->avatar->output()->send();
```

To download the file, return the `download` method as the response.

```php
return $model->avatar->download();
```

## Validating Attachments

The example below uses [array validation](../services/validation.md) to validate an `$attachMany` relationship.

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
        'photos' => ['required'],
        'photos.*' => ['image', 'max:1000', 'dimensions:min_width=100,min_height=100'],
    ];
}
```

For more on the `attribute.*` syntax used above, see the [validation article](../services/validation.md) on validating arrays.

## Accessing the File Owner

To access the owner of a file, use the `attachment` property of the `File` model. It is defined as a [morph to](./relation-types/morph-to.md) relation.

```php
public $morphTo = [
    'attachment' => []
];
```

For example:

```php
$user = $file->attachment;
```

## Uploading a File from a Form

This example shows the full process, from defining the relation in a model to displaying the uploaded image on a page.

Inside your model, define a relationship to the `System\Models\File` class.

```php
class Post extends Model
{
    public $attachOne = [
        'featured_image' => \System\Models\File::class
    ];
}
```

Build a form for uploading a file.

```php
<?= Form::open(['files' => true]) ?>

    <input name="example_file" type="file">

    <button type="submit">Upload File</button>

<?= Form::close() ?>
```

Process the uploaded file on the server and attach it to a model.

```php
// Find the Blog Post model
$post = Post::find(1);

// Save the featured image of the Blog Post model
if (Input::hasFile('example_file')) {
    $post->featured_image = Input::file('example_file');
}
```

You can also use [deferred binding](./relationships.md#deferred-binding) to defer the relationship.

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

Display the uploaded file on a page.

```php
<?php
// Find the Blog Post model again
$post = Post::find(1);

// Look for the featured image address, otherwise use a default one
if ($post->featured_image) {
    $featuredImage = $post->featured_image->getUrl();
}
else {
    $featuredImage = 'http://placehold.it/220x300';
}
?>

<img src="<?= $featuredImage ?>" alt="Featured Image" />
```

#### See Also

::: also
* [Attach One](./relation-types/attach-one.md)
* [Attach Many](./relation-types/attach-many.md)
* [Relationships](./relationships.md)
* [Image Resizer](../services/resizer.md)
:::
