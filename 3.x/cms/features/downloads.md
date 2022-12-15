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

#### See Also

::: also
* [Responses and Views](../../extend/services/response-view.md)
:::
