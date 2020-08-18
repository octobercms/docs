# Image Resizing

- [Resize parameters](#resize-parameters)
- [Resize sources](#resize-sources)

<a name="resize-parameters">
## Resize Parameters

If `$width` or `$height` is falsey or `'auto'`, that value is calculated using original image ratio (automatic proportional scaling).

The following options are supported:

Key | Description | Default | Options
--- | --- | --- | ---
`mode` | How the image should be fitted to dimensions | `auto` | `exact`, `portrait`, `landscape`, `auto`, `fit`, or `crop`
`offset` | Offset the crop of the resized image | `[0,0]` | [left, top]
`quality` | Quality of the resized image | `90` | `0-100`
`sharpen` | Amount to sharpen the image | `0` | `0-100`

<a name="available-modes">
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

<a name="resize-sources">
## Resize sources

The available sources that images can be resized from are as follows:

- Plugins
- Themes
- Media Library
- Uploads Directory
- Models that extend the `\October\Rain\Database\Attach\File` model

Available sources can be extend by listening to the [`system.resizer.getAvailableSources` event](../api/system/resizer/getavailablesources)