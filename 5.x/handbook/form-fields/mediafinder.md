---
previousPath: element/form/widget-mediafinder.md
subtitle: Form Field
shortname: Media Finder
---
# Media Finder Field

`mediafinder` - renders a field for selecting an item from the media manager library. Expanding the field displays the media manager to locate a file. The resulting selection is a string as the relative path to the file.

```yaml
whitepaper_file:
    label: Whitepaper PDF
    type: mediafinder
```

The following [field properties](../form-fields.md) are supported and commonly used.

Property | Description
------------- | -------------
**label** | a name when displaying the form field to the user.
**default** | specifies a default string value, optional.
**comment** | places a descriptive comment below the field.
**mode** | the expected file type, either `file`, `folder` or `image`. Default: `file`.
**imageWidth** | if using image type, the width the preview thumbnail is generated at. Together with `imageHeight` it sets the shape of the preview, optional.
**imageHeight** | if using image type, the height the preview thumbnail is generated at, optional.
**cropWidth** | if using image type, an image of another shape is cropped to the shape of this width and `cropHeight` when it is selected, optional.
**cropHeight** | the height used together with `cropWidth`, optional.
**maxItems** | maximum number of items that can be selected.
**thumbOptions** | additional [resize options](../../backend/services/resizer.md) for generating the thumbnail, or pass `false` to disable thumb generation.
**useCopyPaste** | shows the select all, copy and paste toolbar buttons when selecting multiple items. Default: `false`.

Set the `mode` to **image** to display a preview of the selected image.

```yaml
background_image:
    label: Background Image
    type: mediafinder
    mode: image
```

You may set the `mode` to **folder** to only allow selecting a media folder path.

```yaml
media_folder:
    label: Media Folder
    type: mediafinder
    mode: folder
```

::: tip
Unlike the [File Upload form widget](./fileupload.md), the Media Finder form widget stores its data as a string representing the path to the media files selected within the Media Library. It should associate to a normal attribute on your model.
:::

## Selecting Multiple Items

The media finder will attempt to guess if multiple items can be selected based on the [jsonable attribute](../../backend/data/models.md) in the model, which is a requirement for storing multiple items.

You may limit the number of items that can be selected using the `maxItems` property.

```yaml
media_gallery:
    label: Image
    type: mediafinder
    mode: image
    maxItems: 10
```

### Copying and Pasting Items

When selecting multiple items, enable the `useCopyPaste` property to add **Select All**, **Copy Selected** and **Paste** buttons to the toolbar. This lets the user copy a selection from one media finder field and paste it into another.

```yaml
media_gallery:
    label: Image
    type: mediafinder
    mode: image
    maxItems: 10
    useCopyPaste: true
```

The copied items are held in the browser and can be pasted into any media finder field that also has this property enabled. Items already present in the target field are skipped, and the `maxItems` limit is respected when pasting.

## Previewing Images

In `image` mode, each selected image shows as a thumbnail in a tile beside its file name. The `imageWidth` and `imageHeight` properties set the size the thumbnail is generated at. When both are set, the tile also takes their shape.

```yaml
background_image:
    label: Background Image
    type: mediafinder
    mode: image
    imageWidth: 300
    imageHeight: 200
```

A field that sets only one of these properties, or neither, shows a square tile. A field with a [crop size](#cropping-to-a-size) and neither property shows its preview in the shape of the crop.

## Cropping Images

The media manager that opens from the field has a **Crop & Insert** button beside the **Insert** button. It opens the selected image in a crop popup, where the user moves and resizes a selection over the image. The selected part is saved to the media library as a new file, and the new file is inserted in the field. The original image is left as it is.

The new file is saved in a **cropped-images** folder beside the original. The popup has three selection modes.

Selection Mode | Description
------------- | -------------
**Normal** | a selection of any shape.
**Fixed Ratio** | a selection in the shape of the width and height entered, for example 16 and 9.
**Fixed Size** | a selection in the shape of the width and height entered, saved no larger than that size.

Cropping adds a file to the media library, so the button is only shown to users with the **Upload Media** permission.

### Cropping to a Size

Use the `cropWidth` and `cropHeight` properties to give every image selected for the field the same shape. Both properties must be set, and the field must use the `image` mode.

```yaml
banner:
    label: Banner
    type: mediafinder
    mode: image
    cropWidth: 1200
    cropHeight: 500
```

When the user inserts an image of another shape, the crop popup opens with its selection held to the shape of the crop size. The selected part is saved as a new file, no larger than the crop size, and the new file is the one the field stores. Closing the popup leaves that image out of the field.

An image that already has the shape is inserted as it is, whatever its size. Shapes within one percent of each other are treated as the same. When several images are inserted at once, each image that needs cropping opens the popup in turn.

The **Crop & Insert** button is not shown for a field with a crop size, since inserting an image crops it when needed. A user without the **Upload Media** permission is not asked to crop, and the image is inserted as it is.

::: tip
The field stores the path it is given, and the shape of the image is not checked when the form is saved. Use the [File Upload form widget](./fileupload.md#cropping-images) when the shape must be enforced on the server.
:::
