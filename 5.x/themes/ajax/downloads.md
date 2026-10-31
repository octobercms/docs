---
previousPath: cms/features/downloads.md
subtitle: Send a file to the browser as a download from an AJAX handler.
---
# File Downloads

An AJAX handler can return a file download. When the response has a `Content-Disposition` header, the framework downloads the file in the browser using the filename sent by the server.

```html
<button data-request="onExport">
    Download
</button>
```

```php
public function onExport()
{
    return Response::download(base_path('app/files/installer.zip'));
}
```

::: tip
The same request can return either a download or a [regular AJAX update](./update-partials.md).
:::

## Returning a Download

Inside your [AJAX handler](./handlers.md), return a [file download](../../backend/services/response-view.md) `Response` type. The `download` method accepts the local disk file path, as shown above. To set the name of the downloaded file, pass it as the second argument.

```php
public function onExport()
{
    return Response::download(base_path('app/files/installer.zip'), 'setup.zip');
}
```

### Downloading Generated Content

To turn a string into a download without writing it to disk, use the `streamDownload` method. It accepts a callback (first argument) and a filename (second argument).

```php
public function onExport()
{
    return Response::streamDownload(function() {
        echo 'CSV Contents...';
    }, 'export.csv');
}
```

### Downloading from a Storage Disk

Use the [storage service](../../backend/services/storage.md) to download files from the media library or any storage engine. The `disk` method of the `Storage` facade takes the disk name (first argument). Chain the `download` method with the file name to download (first argument).

```php
public function onExport()
{
    return Storage::disk('media')->download('archive.zip');
}
```

### Downloading a Model Attachment

For [model file attachments](../../backend/data/attachments.md), call the `download` method on the file object.

```php
public function onDownload()
{
    // ...

    return $model->avatar->download();
}
```

## Opening a Download in a New Window

To open the file in a new browser window, such as to preview a PDF, set the `data-browser-target` attribute to `_blank`.

```html
<button data-request="onExport" data-browser-target="_blank">
    Open in New Window
</button>
```

## Linking to a Download Page

A CMS page can serve a file without AJAX. The following page downloads a [model file attachment](../../backend/data/attachments.md) with a custom file name. It takes the attachment `id` and `disk_name` parameters to validate the file, then returns the response to the browser with the file name from the optional `file_name` parameter.

::: cmstemplate
```ini
## pages/download-file.htm

title = "Download File"
url = "/download-file/:id/:disk_name/:file_name?"
layout = "default"
```
```php
function onStart()
{
    $file = System\Models\File::find($this->param('id'));
    if (!$file || !$file->isPublic()) {
        throw new NotFoundException;
    }

    if ($file->disk_name !== $this->param('disk_name')) {
        throw new NotFoundException;
    }

    $customFileName = $this->param('file_name');
    if ($customFileName) {
        $file->file_name = $customFileName;
    }

    return $file->download();
}
```
```twig
```
:::

Link to this page in Twig with the following markup, where the `file` variable is an instance of `System\Models\File`.

```twig
{{ 'download-file'|page({
    id: file.id,
    disk_name: file.disk_name,
    file_name: 'my-custom-name.png'
}) }}
```

::: tip
To display the file inline, such as an image, call the `$file->output()` method instead.
:::

#### See Also

::: also
* [Responses and Views](../../backend/services/response-view.md)
* [File Uploads](./uploads.md)
:::
