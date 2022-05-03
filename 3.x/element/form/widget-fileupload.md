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
**size** | for multiple uploads, the size of the container. Available options: tiny, small, large, huge, giant, adaptive. Default: `large`
**imageWidth** | if using image type, the image will be resized to this width, optional
**imageHeight** | if using image type, the image will be resized to this height, optional
**fileTypes** | file extensions that are accepted by the uploader, optional. Eg: `zip,txt`
**mimeTypes** | MIME types that are accepted by the uploader, either as file extension or fully qualified name, optional. Eg: `bin,txt`
**maxFilesize** | file size in Mb that are accepted by the uploader, optional. Default: from "upload_max_filesize" param value
**maxFiles** | maximum number of files allowed to be uploaded
**useCaption** | allows a title and description to be set for the file. Default: `true`
**prompt** | text to display for the upload button, applies to files only, optional
**thumbOptions** | additional [resize options](../services/resizer.md#oc-resize-parameters) for generating the thumbnail
**attachOnUpload** | Automatically attaches the uploaded file on upload if the parent record exists instead of using deferred binding to attach on save of the parent record. Default: false

> **Note**: Unlike the [Media Finder form widget](#widget-mediafinder), the File Upload form widget uses [database file attachments](../database/attachments.md) so the field name be that of an `attachOne` or `attachMany` relationship attribute on your associated model.
