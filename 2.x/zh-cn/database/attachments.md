# 文件附件

模型可以使用 [多态关联](../database/relations.md#relation-polymorphic-relations) 的子集来支持文件附件。 `$attachOne` 或 `$attachMany` 关联设计用于将文件链接到称为"附件"的数据库记录。 几乎所有情况下，`System\Models\File` 模型都用于维护这种关系，其中对文件的引用作为记录存储在 `system_files` 表中，并且与父模型具有多态关联。

在下面的示例中，模型有一个 Avatar 附件模型和许多照片附件模型。

单个文件附件：

```php
public $attachOne = [
    'avatar' => 'System\Models\File'
];
```

多个文件附件：

```php
public $attachMany = [
    'photos' => 'System\Models\File'
];
```

> **注意**：确保模型的数据库表中没有与附件关联使用相同名称的属性。 如果是这样，则会导致命名冲突并产生问题。

受保护的附件被上传到应用程序的 **uploads/protected** 目录，从 Web 直接访问无法访问该目录。 通过将 *public* 参数设置为 `false` 来定义受保护的文件附件：

```php
public $attachOne = [
    'avatar' => ['System\Models\File', 'public' => false]
];
```

## 创建新附件

对于单一的附加关联(`$attachOne`)，您可以通过模型关联直接创建一个附件，方法是使用 `Input::file` 方法设置其值，该方法从上传输入中读取文件数据。

```php
$model->avatar = Input::file('file_input');
```

您还可以将字符串传递给 `data` 属性，其中包含本地文件的绝对路径。

```php
$model->avatar = '/path/to/somefile.jpg';
```

有时，直接从(原始)数据创建`文件`实例也可能很有用：

```php
$file = (new System\Models\File)->fromData('Some content', 'sometext.txt');
```

对于多个附加关联(`$attachMany`)，您可以在关联上使用`create`方法，注意文件对象与`data`属性相关联。 如果您愿意，这种方法也可以用于单数关系。

```php
$model->avatar()->create(['data' => Input::file('file_input')]);
```

或者，您可以事先准备一个文件模型，然后手动关联关系。 请注意，必须使用`is_public`这种方法设置显式属性。

```php
$file = new System\Models\File;
$file->data = Input::file('file_input');
$file->is_public = true;
$file->save();

$model->avatar()->add($file);
```

您还可以从 URL 添加文件。 要使用此方法，您需要安装 cURL PHP 扩展。

```php
$file = new System\Models\File;
$file->fromUrl('https://example.com/uploads/public/path/to/avatar.jpg');

$user->avatar()->add($file);
```

有时您可能需要更改文件名。 您可以通过使用第二个方法参数来做到这一点。

```php
$file->fromUrl('https://example.com/uploads/public/path/to/avatar.jpg', 'somefilename.jpg');
```

## 查看附件

`getPath` 方法返回上传的公共文件的完整 URL。 以下代码将打印类似 **example.com/uploads/public/path/to/avatar.jpg**

```php
echo $model->avatar->getPath();
```

返回多个附件文件路径：

```php
foreach ($model->photos as $photo) {
    echo $photo->getPath();
}
```

`getLocalPath` 方法将返回本地文件系统中上传文件的绝对路径。

```php
echo $model->avatar->getLocalPath();
```

要直接输出文件内容，请使用 `output` 方法，这将包括下载文件所需的头文件：

```php
echo $model->avatar->output();
```

您可以使用 `getThumb` 方法调整图像大小。 该方法采用 3 个参数 - 图像宽度、图像高度和选项参数。

**width** 和 **height** 参数应指定为数字或 **auto** 字词，以实现自动比例缩放。

```php
echo $model->avatar->getThumb(100, 100, ['mode' => 'crop']);
```

在页面上显示图像。

```twig
<img src="{{ model.avatar.getThumb(100, 100, {'mode':'exact', 'quality': 80, 'extension': 'webp'}) }}" alt="Description Image" />
```

在 [图像调整器文章](../services/resizer.md#oc-resize-parameters) 上阅读有关 `getThumb` 可用选项的更多信息。

## 用法示例

本节展示了模型附件功能的完整使用示例——从定义模型中的关联到在页面上显示上传的图像。

在您的模型中定义与 `System\Models\File` 类的关系，例如：

```php
class Post extends Model
{
    public $attachOne = [
        'featured_image' => 'System\Models\File'
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
// 查找博客文章模型
$post = Post::find(1);

// 保存博客文章模型的特色图片
if (Input::hasFile('example_file')) {
    $post->featured_image = Input::file('example_file');
}
```

或者，您可以使用 [延迟绑定](../database/relations.md#oc-deferred-binding) 来延迟关联：

```php
// 查找博客文章模型
$post = Post::find(1);

// 在上面的 HTML 表单中查找回发数据“example_file”
$fileFromPost = Input::file('example_file');

// 如果存在，将其保存为带有延迟会话密钥的特色图像
if ($fileFromPost) {
    $post->featured_image()->create(['data' => $fileFromPost], $sessionKey);
}
```

在页面上显示上传的文件：

```php
// 再次找到博客帖子模型
$post = Post::find(1);

// 寻找特色图片地址，否则使用默认的
if ($post->featured_image) {
    $featuredImage = $post->featured_image->getPath();
}
else {
    $featuredImage = 'http://placehold.it/220x300';
}

<img src="<?= $featuredImage ?>" alt="Featured Image" />
```

如果需要访问文件的所有者，可以使用 `File` 模型的 `attachment` 属性：

```php
public $morphTo = [
    'attachment' => []
];
```

例子：

```php
$user = $file->attachment;
```

有关更多信息，请阅读 [多态关联](../database/relations.md#relation-polymorphic-relations)

## 验证示例

下面的示例使用 [数组验证](../services/validation.md#oc-validating-arrays) 来验证 `$attachMany` 关联。

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
        'photos'   => 'required',
        'photos.*' => 'image|max:1000|dimensions:min_width=100,min_height=100'
    ];

    /* 其他一些代码 */
}
```

有关上面使用的 `attribute.*` 语法的更多信息，请参阅 [验证数组](../services/validation.md#oc-validating-arrays)。
