# Media Finder

`mediafinder` - renders a field for selecting an item from the media manager library. Expanding the field displays the media manager to locate a file. The resulting selection is a string as the relative path to the file.

```yaml
whitepaper_file:
    label: Whitepaper PDF
    type: mediafinder
```

Option | Description
------------- | -------------
**mode** | the expected file type, either `file`, `folder` or `image`. Default: `file`.
**imageWidth** | if using image type, the preview image will be displayed to this width, optional.
**imageHeight** | if using image type, the preview image will be displayed to this height, optional.
**maxItems** | maximum number of items that can be selected.
**thumbOptions** | additional [resize options](../../extend/services/resizer.md) for generating the thumbnail, or pass `false` to disable thumb generation.

Set the `mode` to **image** to display a preview of the selected image.

```yaml
background_image:
    label: Background Image
    type: mediafinder
    mode: image
```

You may set the `mode` to **folder** to only allow selecting a media folder path.

```yaml
media_gallery:
    label: Media Gallery
    type: mediafinder
    mode: folder
```

::: tip
Unlike the [File Upload form widget](./widget-fileupload.md), the Media Finder form widget stores its data as a string representing the path to the media files selected within the Media Library. It should associate to a normal attribute on your model.
:::
