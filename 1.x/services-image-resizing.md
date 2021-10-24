# Image Resizing

- [Resize parameters](#resize-parameters)
- [Available modes](#available-modes)
- [Resize sources](#resize-sources)

>**Note:** The image resizing functionality requires a cache driver that persists cache data between requests in order to function, `array` is not a supported cache driver if you wish to use this functionality.

<a name="resize-parameters"></a>
## Resize Parameters

The basic parameters provided to the ImageResizer are `(int) $width`, `(int) $height`, and `(array) $options`.

If `$width` or `$height` is falsey or `'auto'`, that value is calculated using original image ratio (automatic proportional scaling).

The following elements are supported in the options array are supported:

Key | Description | Default | Options
--- | --- | --- | ---
`mode` | How the image should be fitted to dimensions | `auto` | `exact`, `portrait`, `landscape`, `auto`, `fit`, or `crop`
`offset` | Offset the crop of the resized image | `[0,0]` | [left, top]
`quality` | Quality of the resized image | `90` | `0-100`
`sharpen` | Amount to sharpen the image | `0` | `0-100`

<a name="available-modes"></a>
### Available Modes

The `mode` option allows you to specify how the image should be resized. The available modes are as follows:

Mode | Description
--- | ---
`auto` | Automatically choose between `portrait` and `landscape` based on the image's orientation
`exact` | Resize to the exact dimensions given, without preserving aspect ratio
`portrait` | Resize to the given height and adapt the width to preserve aspect ratio
`landscape` | Resize to the given width and adapt the height to preserve aspect ratio
`crop` | Crop to the given dimensions after fitting as much of the image as possible inside those
`fit` | Fit the image inside the given maximal dimensions, keeping the aspect ratio

<a name="resize-sources"></a>
## Resize sources

The available sources that images can be resized from are as follows:

- Plugins
- Themes
- Media Library
- Uploads Directory
- Models that extend the `\October\Rain\Database\Attach\File` model

Available sources can be extended by listening to the [`system.resizer.getAvailableSources` event](../api/system/resizer/getavailablesources)
