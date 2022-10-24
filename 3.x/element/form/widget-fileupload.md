---
subtitle: Form Widget
---
# File Upload

`fileupload` - renders a file uploader for images or regular files.

```yaml
avatar:
    label: Avatar
    type: fileupload
    mode: image
    imageHeight: 260
    imageWidth: 260
```

Option | Description
------------- | -------------
**mode** | the expected file type, either file or image. Default: `image`
**size** | for multiple uploads, the size of the container. Available options: tiny, small, large, huge, giant. Default: `large`
**imageWidth** | if using image type, the image will be resized to this width, optional
**imageHeight** | if using image type, the image will be resized to this height, optional
**fileTypes** | file extensions that are accepted by the uploader, optional. Eg: `zip,txt`
**mimeTypes** | MIME types that are accepted by the uploader, either as file extension or fully qualified name, optional. Eg: `bin,txt`
**maxFilesize** | file size in Mb that are accepted by the uploader, optional. Default: from "upload_max_filesize" param value
**maxFiles** | maximum number of files allowed to be uploaded
**useCaption** | allows a title and description to be set for the file. Default: `true`
**prompt** | text to display for the upload button, applies to files only, optional
**thumbOptions** | additional [resize options](../../extend/services/resizer.md) for generating the thumbnail, or pass `false` to disable thumb generation.
**deferredBinding** | use deferred binding when uploading a file, when available. Disable this to attach the file immediately on upload instead of when saving. Default: `true`

::: tip
Unlike the [Media Finder form widget](./widget-mediafinder.md), the File Upload form widget uses [database file attachments](../../extend/database/attachments.md) so the field name be that of an `attachOne` or `attachMany` relationship attribute on your associated model.
:::
