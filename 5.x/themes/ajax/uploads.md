---
previousPath: cms/features/uploads.md
subtitle: Upload files through an AJAX form and save them to a storage disk or a model.
---
# File Uploads

To upload files through an AJAX form, add the `data-request-files` attribute to the form tag. File uploads are opt-in, so other requests stay fast.

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

## Saving an Uploaded File

::: aside
View the [request and input article](../../backend/services/request-input.md) to learn more about the methods available on the `files()` function.
:::

Inside your [AJAX handler](./handlers.md), use the `files()` helper function to access the uploaded file, then call the `store` method to save it to [a storage disk](../../backend/services/storage.md). The method returns the local path of the saved file.

The following stores the upload in the **storage/app/userfiles** directory with a generated file name.

```php
function onUploadFiles()
{
    $filePath = files('single_file')->store('userfiles');

    // ...

    Flash::success('File saved');
}
```

### Uploading Multiple Files

When the file input has the `multiple` attribute, the `files()` helper returns an array.

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

### Validating File Uploads

As with [regular form validation](./validation.md), validate files with the `validate` method of the `Request` facade. Use the `.*` suffix to validate multiple items. The following checks that each upload is an image no larger than 1MB.

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

## Saving Uploads to a Model

Models configured with [file attachments](../../backend/data/attachments.md) can save uploads directly. This includes Tailor models that use the [File upload widget](../../handbook/form-fields/fileupload.md).

Set the attribute on the model to the result of the `files()` helper. This works for single and multiple file uploads.

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

You can also set the attribute to a `System\Models\File` model object.

```php
$model->avatar = (new File)->fromFile('/path/to/somefile.jpg');

$model->avatar = (new File)->fromData('Some content', 'sometext.txt');

$model->avatar = (new File)->fromUrl('https://example.tld/path/to/avatar.jpg');
```

See the [file attachments article](../../backend/data/attachments.md) to learn more about model file attachments.

#### See Also

::: also
* [Requests and Input](../../backend/services/request-input.md)
* [Storage Disks](../../backend/services/storage.md)
* [File Attachments](../../backend/data/attachments.md)
:::
