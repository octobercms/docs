---
subtitle: Easily handle downloading files.
---
# File Downloads

October CMS provides simple features for downloading files in responses. The feature is opt-in to the AJAX framework for the best performance.

## Download Buttons

To enable file downloads, include the `data-request-download` attribute on a HTML form or button tag. The following is a minimal example of downloading a file.

```html
<button data-request="onExport" data-request-download>
    Download
</button>
```

If the `data-request-download="..."` attribute is set on the request trigger, the filename in this attribute will be given to the downloaded file. The following produces a file named **data.csv**.

```html
<button data-request="onExport" data-request-download="data.csv">
    Download Document
</button>
```

To open the file in a new browser window, typically used for previewing PDFs, set the `data-browser-target` attribute to `_blank`.

```html
<button data-request="onExport" data-request-download data-browser-target="_blank">
    Open in New Window
</button>
```

::: tip
When the download attribute is used, the response can be a download or a [regular AJAX update](../ajax/update-partials.md).
:::

## Download Responses

Inside your [AJAX handler](../ajax/handlers.md), you may return a [file download](../../extend/services/response-view.md) `Response` type where the `download` method accepts the local disk file path.

```php
public function onExport()
{
    return Response::download(base_path('app/files/installer.zip'));
}
```

To convert a string to a downloadable response without having to write the contents to disk, use the `streamDownload` method, which accepts a callback (first argument) and filename (second argument).

```php
public function onExport()
{
    return Response::streamDownload(function() {
        echo 'CSV Contents...';
    }, 'export.csv');
}
```

You may also use the [storage service](../../extend/services/storage.md) to download files from the media library or any storage engine. Use the `Storage` facade and `disk` method to specify the disk name (first argument), then chain the `download` method with the file name to download (first argument).

```php
public function onExport()
{
    return Storage::disk('media')->download('archive.zip');
}
```

When working with [model file attachments](../../extend/database/attachments.md), you may call the `download` method on the file object.

```php
public function onDownload()
{
    // ...

    return $model->avatar->download();
}
```


## Usage Example

The following example shows a CMS page that can be used to download a [model file attachment](../../extend/database/attachments.md) with a custom file name. It takes the attachment `id` and `disk_name` parameters to validate the file, before returning the response to the browser with a custom file name taken from the `file_name` parameter (optional).

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

You may then link to this page in Twig with the following markup, where the `file` variable is an instance of `System\Models\File`.

```twig
{{ 'download-file'|page({
    id: file.id,
    disk_name: file.disk_name,
    file_name: 'my-custom-name.png'
}) }}
```

#### See Also

::: also
* [Responses and Views](../../extend/services/response-view.md)
:::
