---
previousPath: element/form/widget-fileupload.md
subtitle: Form Field
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
**imageWidth** | if using image type, the width the preview thumbnail is generated at. Together with `imageHeight` it sets the shape of the preview, optional.
**imageHeight** | if using image type, the height the preview thumbnail is generated at, optional.
**cropWidth** | if using image type, crops uploaded images to the shape of this width and `cropHeight`, and scales them down to this size when they are larger, optional.
**cropHeight** | the height used together with `cropWidth`, optional.
**fileTypes** | file extensions that are accepted by the uploader, optional. Eg: `zip,txt`
**mimeTypes** | MIME types that are accepted by the uploader, either as file extension or fully qualified name, optional. Eg: `bin,application/octet-stream`
**maxFilesize** | file size in MB that are accepted by the uploader, optional. Default: from `upload_max_filesize` php.ini value.
**maxFiles** | maximum number of files allowed to be uploaded.
**useCaption** | allows a title and description to be set for the file. Default: `true`
**thumbOptions** | additional [resize options](../../backend/services/resizer.md) for generating the thumbnail, or pass `false` to disable thumb generation.
**deferredBinding** | use deferred binding when uploading a file, when available. Disable this to attach the file immediately on upload instead of when saving. Default: `true`

::: tip
Unlike the [Media Finder form widget](./mediafinder.md), the File Upload form widget uses [database file attachments](../../backend/data/attachments.md) so the field name must be that of an `attachOne` or `attachMany` relationship attribute on your associated model.
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

## Cropping Images

Use the `cropWidth` and `cropHeight` properties to give every image uploaded to the field the same shape. Both properties must be set, and the field must use the `image` mode.

```yaml
banner:
    label: Banner
    type: fileupload
    mode: image
    cropWidth: 1200
    cropHeight: 500
```

When the user picks an image of another shape, a crop popup opens before the upload begins. The user drags the image to position it and zooms to choose how much of it to keep. The selected part is then uploaded in place of the file that was picked. Closing the popup cancels the upload and leaves the field as it was.

An image that already has the shape is not cropped. It is uploaded as it is, or scaled down to the crop size when it is larger. Shapes within one percent of each other are treated as the same.

The crop size is also the largest size an image is stored at, and an image is never enlarged. When the selected part has fewer pixels than the crop size, it is stored at its own size. The popup shows a warning when the selected part is less than half the crop size, since it may look blurry when displayed. An image of the right shape that is this small opens the popup as well, to show the warning.

::: tip
The crop size is in real pixels. For an image that is displayed at 1200 by 500 and should stay sharp on high-density screens, set `cropWidth` to 2400 and `cropHeight` to 1000.
:::

When several images are picked at once, each image that needs cropping opens the popup in turn. Closing a popup skips that image and carries on with the rest.

Cropping redraws the image in the browser, which affects some file types.

File Type | Result
------------- | -------------
**JPEG, PNG** | keeps its file type.
**WebP** | keeps its file type in browsers that can save WebP, otherwise saved as PNG.
**AVIF, BMP, GIF** | saved as PNG, and the file extension changes to match. An animated GIF keeps only its first frame.
**SVG** | uploaded without cropping, since a vector image has no pixel size.

An animated GIF that already has the shape and is no larger than the crop size is uploaded as it is, with its animation.

The shape is checked again on the server when the file is uploaded, so an upload that goes around the popup is refused.

## Thumbnail Options

The preview of an uploaded image is a thumbnail shown in a tile beside the file name. The `imageWidth` and `imageHeight` properties set the size the thumbnail is generated at. When both are set, the tile also takes their shape, so a field with an `imageWidth` of 300 and an `imageHeight` of 200 shows a tile that is one and a half times as wide as it is tall. A field that sets only one of them, or neither, shows a square tile.

A field with a [crop size](#cropping-images) and neither of these properties shows its preview in the shape of the crop.

Use the `thumbOptions` property to control how preview thumbnails are generated. This accepts the same options as the [image resizer](../../backend/services/resizer.md).

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
