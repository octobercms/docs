---
subtitle: 轻松处理文件上传。
---
# 文件上传

October CMS 提供了通过表单提交上传文件的简单功能。该功能通过 AJAX 框架选择性启用，以获得最佳性能。

## 上传文件

要在表单上启用文件上传，请在 HTML 表单标签上包含 `data-request-files` 属性。以下是上传文件的最小示例。

```html
<form data-request="onUploadFiles" data-request-files>
    <div>
        <label>Single File</label>
        <input name="single_file" type="file">
    </div>

    <button data-attach-loading>
        Upload
    </button>
</form>
```

::: aside
查看[请求和输入文章](../../extend/services/request-input.md)了解 `files()` 函数上可用方法的更多信息。
:::

在你的 [AJAX 处理程序](../ajax/handlers.md) 中，使用 `files()` 辅助函数访问上传的文件，并调用 `store` 方法将文件保存到[存储磁盘](../../extend/services/storage.md)。返回值是已保存文件的本地文件路径。

以下代码使用生成的文件名将上传文件存储在 **storage/app/userfiles** 目录中。

```php
function onUploadFiles()
{
    $filePath = files('single_file')->store('userfiles');

    // ...

    Flash::success('File saved');
}
```

### 上传多个文件

当文件输入包含 `multiple` 属性时，`files()` 辅助函数将返回一个数组。

```html
<div>
    <label>Multi File</label>
    <input name="multi_file[]" type="file" multiple>
</div>
```

```php
function onUploadFiles()
{
    $filePaths = [];

    foreach (files('multi_file') as $file) {
        $filePaths[] = $file->store('userfiles');
    }

    // ...

    Flash::success('File saved');
}
```

### 验证文件上传

与[常规表单验证](./validation.md)一样，可以使用 `Request` 门面和 `validate` 方法来验证文件。验证多个项目时使用 `.*` 后缀。以下代码检查上传的文件是否为图片且大小不超过 1MB。

```php
function onUploadFiles()
{
    Request::validate([
        'single_file' => 'required|image|max:1024',
        'multi_file.*' => 'required|image|max:1024',
    ]);

    Flash::success('Files are valid!');
}
```

## 上传到模型

当使用配置了[文件附件](../../extend/database/attachments.md)的模型时，包括使用[文件上传小部件](../../element/form/widget-fileupload.md)的 Tailor 模型，你可以直接在模型上保存文件上传。

最简单的方法是使用 `files()` 辅助函数直接在模型上设置属性。这支持单个和多个文件上传。

```php
function onUploadFiles()
{
    $model = new MyModel;

    $model->avatar = files('single_file');

    $model->save();

    // ...

    Flash::success('File saved');
}
```

你也可以直接将属性设置为 `System\Models\File` 模型对象，以满足各种用例。

```php
$model->avatar = (new File)->fromFile('/path/to/somefile.jpg');

$model->avatar = (new File)->fromData('Some content', 'sometext.txt');

$model->avatar = (new File)->fromUrl('https://example.tld/path/to/avatar.jpg');
```

查看[文件附件文章](../../extend/database/attachments.md)了解更多关于使用基于模型的文件附件的信息。

#### 参见

::: also
* [请求和输入](../../extend/services/request-input.md)
* [存储磁盘](../../extend/services/storage.md)
* [文件附件](../../extend/database/attachments.md)
:::
