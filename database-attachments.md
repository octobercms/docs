Active Record models can support file attachments using a polymorphic relationship.

### Model Definitions

#### A single file attachment
```php
public $morphOne = [
    'avatar' => ['Modules\System\Models\File', 'name' => 'attachment']
];
```

#### Multiple file attachments
```php
public $morphMany = [
    'photos' => ['Modules\System\Models\File', 'name' => 'attachment']
];
```

### Creating new attachments

#### Add a file saved from postback
```php
$model->avatar()->create(['data' => Input::file('file_input')]);
```

#### Add a protected a file
```php
$model->avatar()->create(['public' => false, 'data' => Input::file('file_input')]);
```

*Note the public attribute must come before the data attribute*

#### Add a prepared File object
```php
$file = new Modules\System\Models\File;
$file->data = Input::file('file_input');
$file->save();

$model->avatar()->attach($file);
```

### Viewing attachments

#### Returning the public file path
```php
// Returns http://mysite.com/uploads/public/path/to/avatar.jpg
echo $model->avatar->getPath();
```

#### Returning multiple attachment file paths
```php
foreach ($model->photos as $photo) {
    echo $photo->getPath();
}
```

#### Resizing an image attachment
```php
//                   getThumb($width, $height, $options)
echo $model->avatar->getThumb(100, 100, ['mode' => 'crop']);
```

Supported options:

* **mode** - auto, exact, portrait, landscape, crop (default: auto)
* **quality** - 0-100 (default: 95)
* **extension** - jpg, png, gif (default: png)

---


## Usage Example

Inside your model define a relationship to the **Modules\System\Models\File** class, for example:

```php
class Post extends Model
{
    public $morphOne = [
        'featured_image' => ['Modules\System\Models\File', 'name' => 'attachment']
    ];
}
```

### Uploading a file

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

// Look for the postback data 'example_file' in the HTML form above
$fileFromPost = Input::file('example_file');

// If it exists, save it as the featured image of the Blog Post model
if ($fileFromPost)
    $post->featured_image()->create(['data' => $fileFromPost]);
```

### Viewing the uploaded file

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
