# 文件附件

模型可以使用[多态关联](./relations.md)的子集来支持文件附件。`$attachOne` 或 `$attachMany` 关联专为将文件链接到称为"附件"的数据库记录而设计。在几乎所有情况下，`System\Models\File` 模型用于维护此关联，其中对文件的引用作为记录存储在 `system_files` 表中，并与父模型有多态关联。

在以下示例中，模型有一个 Avatar 附件模型和多个 Photo 附件模型。

单个文件附件：

```php
public $attachOne = [
    'avatar' => \System\Models\File::class
];
```

多个文件附件：

```php
public $attachMany = [
    'photos' => \System\Models\File::class
];
```

::: warning
为避免命名冲突，请确保您模型的数据库表没有已经使用与附件关联相同名称的属性。
:::

受保护的附件上传到应用程序的 **uploads/protected** 目录，该目录无法从 Web 直接访问。通过将 `public` 属性设置为 `false` 来定义受保护的文件附件。

```php
public $attachOne = [
    'avatar' => [\System\Models\File::class, 'public' => false]
];
```

## 创建新附件

对于单数附加关联（`$attachOne`），您可以通过模型关联直接创建附件，使用 `files` 函数设置其值，该函数从输入上传读取文件数据。

```php
$model->avatar = files('file_input');
```

要从本地路径关联新文件，请使用 `System\Models\File` 模型和 `fromFile` 方法。

```php
$model->avatar = (new File)->fromFile('/path/to/somefile.jpg');
```

要直接从（原始）数据创建文件，请使用 `fromData` 方法传递内容（第一个参数）和文件名（第二个参数）。

```php
$model->avatar = (new File)->fromData('Some content', 'sometext.txt');
```

您还可以使用 `fromUrl` 方法从 URL 添加文件。要使用此方法，您需要安装 cURL PHP 扩展。

```php
$model->avatar = (new File)->fromUrl('https://example.tld/path/to/avatar.jpg');
```

可选地，您可以指定自定义文件名（第二个参数）。

```php
$model->avatar = (new File)->fromUrl('https://example.tld/avatar.jpg', 'customname.jpg');
```

### 处理多个附件

对于多数附加关联（`$attachMany`），您可以从 `files()` 函数传递一个值数组。

```php
$model->photos = (array) files('multi_file');
```

您可以使用 `create` 方法在现有关联上追加文件，请注意文件对象关联到 `data` 属性。此方法也可用于单数关联，如果您愿意的话。

```php
$model->photos()->create(['data' => files('file_input')]);
```

您可以在关联上使用 `add` 方法直接操作 `System\Models\File` 模型。

```php
$model->photos()->add(
    $model->photos()->make()->fromFile('/path/to/somefile.jpg')
);
```

或者，您可以预先准备一个 File 模型，然后手动关联关系。请注意，使用此方法时必须显式设置 `is_public` 属性。

```php
$file = new \System\Models\File;
$file->data = files('file_input');
$file->is_public = true;
$file->save();

$model->photos()->add($file);
```

## 查看附件

`getUrl` 方法返回已上传公共文件的完整 URL。以下代码将打印类似 **example.tld/uploads/public/path/to/avatar.jpg** 的内容。

```php
echo $model->avatar->getUrl();
```

返回多个附件文件路径。

```php
foreach ($model->photos as $photo) {
    echo $photo->getUrl();
}
```

使用 Twig 在页面上显示文件。

```twig
<img src="{{ model.avatar.url }}" alt="Description Image" />
```

### 访问本地路径

`getLocalPath` 方法将返回本地文件系统中已上传文件的绝对路径。如果使用外部驱动程序（如 S3），此方法将下载内容到本地文件系统中的临时位置。

```php
echo $model->avatar->getLocalPath();
```

## 调整缩略图大小

您可以使用 `getThumbUrl` 方法调整图片大小。该方法接受 3 个参数 - 图片宽度、图片高度和选项参数。

**宽度**和**高度**参数应指定为数字或 **auto** 关键字以实现自动比例缩放。

```php
echo $model->avatar->getThumbUrl(100, 100, ['mode' => 'crop']);
```

使用 Twig 在页面上显示图片。

```twig
<img src="{{ model.avatar.thumbUrl(100, 100, { mode: 'exact', quality: 80, extension: 'webp' }) }}" alt="Description Image" />
```

阅读[图像调整器文章](../services/resizer.md)了解有关 `getThumbUrl` 可用选项的更多信息。

## 输出和下载

要直接输出文件内容，请使用 `output` 方法，这将返回一个包含在浏览器中显示文件所需头部的[响应对象](../services/response-view.md)。

```php
return $model->avatar->output();
```

您可以通过链接 `send` 方法将内容输出到浏览器。

```php
$model->avatar->output()->send();
```

返回 `download` 方法以将文件作为响应下载。

```php
return $model->avatar->download();
```

## 用法示例

本节展示了模型附件功能的完整用法示例 - 从在模型中定义关联到在页面上显示上传的图片。

在您的模型中定义与 `System\Models\File` 类的关联，例如：

```php
class Post extends Model
{
    public $attachOne = [
        'featured_image' => \System\Models\File::class
    ];
}
```

构建一个用于上传文件的表单：

```php
<?= Form::open(['files' => true]) ?>

    <input name="example_file" type="file">

    <button type="submit">Upload File</button>

<?= Form::close() ?>
```

在服务器上处理上传的文件并将其附加到模型：

```php
// Find the Blog Post model
$post = Post::find(1);

// Save the featured image of the Blog Post model
if (Input::hasFile('example_file')) {
    $post->featured_image = Input::file('example_file');
}
```

或者，您可以使用[延迟绑定](./relations.md)来延迟关联。

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

在页面上显示上传的文件：

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

如果您需要访问文件的所有者，可以使用 `File` 模型的 `attachment` 属性：

```php
public $morphTo = [
    'attachment' => []
];
```

示例：

```php
$user = $file->attachment;
```

有关更多信息，请阅读[多态关联](./relations.md#relation-polymorphic-relations)

## 验证示例

以下示例使用[数组验证](../services/validation.md)来验证 `$attachMany` 关联。

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

有关上面使用的 `attribute.*` 语法的更多信息，请参阅[验证文章](../services/validation.md)中关于验证数组的部分。
