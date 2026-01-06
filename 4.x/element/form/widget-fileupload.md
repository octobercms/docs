---
subtitle: Form Widget
shortname: File Upload
---
# File Upload Field

`fileupload` - renders a file uploader for images or regular files.

```yaml
avatar:
    label: Avatar
    type: fileupload
    mode: image
    imageHeight: 260
    imageWidth: 260
```

The following [field properties](../form-fields.md) are supported and commonly used.

Property | Description
------------- | -------------
**label** | a name when displaying the form field to the user.
**default** | specifies a default string value, optional.
**comment** | places a descriptive comment below the field.
**mode** | the expected file type, either `file` or `image`. Default: `image`
**size** | for multiple uploads, the size of the container. Available options: tiny, small, large, huge, giant. Default: `large`
**imageWidth** | if using image type, the preview will be resized to this width, optional.
**imageHeight** | if using image type, the preview will be resized to this height, optional.
**fileTypes** | file extensions that are accepted by the uploader, optional. Eg: `zip,txt`
**mimeTypes** | MIME types that are accepted by the uploader, either as file extension or fully qualified name, optional. Eg: `bin,application/octet-stream`
**maxFilesize** | file size in MB that are accepted by the uploader, optional. Default: from `upload_max_filesize` php.ini value.
**maxFiles** | maximum number of files allowed to be uploaded.
**useCaption** | allows a title and description to be set for the file. Default: `true`
**thumbOptions** | additional [resize options](../../extend/services/resizer.md) for generating the thumbnail, or pass `false` to disable thumb generation.
**deferredBinding** | use deferred binding when uploading a file, when available. Disable this to attach the file immediately on upload instead of when saving. Default: `true`

::: tip
Unlike the [Media Finder form widget](./widget-mediafinder.md), the File Upload form widget uses [database file attachments](../../extend/database/attachments.md) so the field name must be that of an `attachOne` or `attachMany` relationship attribute on your associated model.
:::

## Uploading Files

Use the `mode` property set to `file` to upload documents and other non-image files. You may also want to disable the caption field and set specific file types.

```yaml
documents:
    label: Documents
    type: fileupload
    mode: file
    useCaption: false
    fileTypes: pdf,docx,xlsx
```

Use the `maxFiles` property to limit the number of files that can be uploaded. When combined with an `attachMany` relationship, this allows for multiple file uploads with an upper limit.

```yaml
gallery:
    label: Gallery Images
    type: fileupload
    mode: image
    maxFiles: 10
```

## Restricting File Types

Use the `fileTypes` property to specify the allowed file extensions, as a comma-separated list.

```yaml
spreadsheet:
    label: Spreadsheet
    type: fileupload
    mode: file
    fileTypes: xls,xlsx,csv
```

The `mimeTypes` property can also restrict uploads by MIME type for additional security.

```yaml
document:
    label: PDF Document
    type: fileupload
    mode: file
    fileTypes: pdf
    mimeTypes: application/pdf
```

::: tip
When `mode` is set to `image` and no `fileTypes` are specified, the following image extensions are accepted by default: **avif**, **jpg**, **jpeg**, **bmp**, **png**, **webp**, **gif**, **svg**. These defaults can be customized globally via the `media.image_extensions` configuration value in `config/media.php`.
:::

## Thumbnail Options

Use the `thumbOptions` property to control how preview thumbnails are generated. This accepts the same options as the [image resizer](../../extend/services/resizer.md).

```yaml
photo:
    label: Photo
    type: fileupload
    mode: image
    imageWidth: 300
    imageHeight: 200
    thumbOptions:
        mode: crop
        extension: png
```

To disable thumbnail generation entirely, set `thumbOptions` to `false`.

```yaml
photo:
    label: Photo
    type: fileupload
    mode: image
    thumbOptions: false
```
