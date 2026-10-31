---
previousPath: extend/services/resizer.md
subtitle: Resize and crop images in PHP, either saving the result to disk or serving it from a URL.
---
# Resizer

October CMS includes an image resizer that changes the size and shape of supported images. Use it to create thumbnails or to fit images to fixed dimensions.

```php
$image = Resizer::open('path/to/image.jpg');

$image->resize(800, 600, ['mode' => 'crop']);

$image->save('path/to/new/file.jpg');
```

## Resizing a File on Disk

Use the `open` method of the `Resizer` facade to open an image from a file path.

```php
$image = Resizer::open('path/to/image.jpg');
```

You can also pass an uploaded file from the [page request input](./request-input.md).

```php
$image = Resizer::open(Input::file('field_name'));
```

Call the `resize` method to resize the image. The first argument is the width, the second argument is the height, and the third argument is an array of resize options.

```php
$image->resize(800, 600, ['mode' => 'crop']);
```

The width and height are optional. Pass `null` for either one, and it is calculated from the original image ratio, which scales the image proportionally. For example, to set the width and calculate the height, pass `null` as the second argument.

```php
$image->resize(800, null, [...]);
```

Use the `save` method to save the resized image to a new location.

```php
$image->save('path/to/new/file.jpg');
```

### Resize Options

The options array supports the following keys.

Key | Description | Default | Options
--- | --- | --- | ---
`mode` | How the image should be fitted to dimensions | `auto` | `exact`, `portrait`, `landscape`, `auto`, `fit`, or `crop`
`offset` | Offset the crop of the resized image | `[0,0]` | [left, top]
`quality` | Quality of the resized image | `90` | `0-100`
`sharpen` | Amount to sharpen the image | `0` | `0-100`

### Resize Modes

The `mode` option sets how the image is resized. The following modes are available.

Mode | Description
--- | ---
`auto` | Automatically choose between `portrait` and `landscape` based on the image's orientation
`exact` | Resize to the exact dimensions given, without preserving aspect ratio
`portrait` | Resize to the given height and adapt the width to preserve aspect ratio
`landscape` | Resize to the given width and adapt the height to preserve aspect ratio
`crop` | Crop to the given dimensions after fitting as much of the image as possible inside those
`fit` | Fit the image inside the given maximal dimensions, keeping the aspect ratio

## Resizing an Image for the Browser

Use the `System\Classes\ResizeImages` class to resize an image and serve it from a URL.

```php
$url = \System\Classes\ResizeImages::resize($image, $width, $height, $options);
```

To resize a media library item, first resolve its URL with the `url` method of the `Media\Classes\MediaLibrary` class.

```php
$image = \Media\Classes\MediaLibrary::url('relative/path/to/asset.jpg');

$url = \System\Classes\ResizeImages::resize($image, $width, $height, $options);
```

::: tip
In your themes, use the [`|resize` filter](../../handbook/twig-filters/resize.md) to resize images.
:::

#### See Also

::: also
* [Resize Filter](../../handbook/twig-filters/resize.md)
* [Media Filter](../../handbook/twig-filters/media.md)
* [File Attachments](../data/attachments.md)
:::
