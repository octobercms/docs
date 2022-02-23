# Image Resizer

## Introduction

October CMS ships with an image resizer that lets you change the shape and size of supported images. To resize an image, use the `open` method on the `Resizer` facade to target a file path.

```php
$image = Resizer::open('path/to/image.jpg');
```

You may also pass an uploaded file from the [page request input](../services/request-input.md).

```php
$image = Resizer::open(Input::file('field_name'));
```

To resize the image, call the `resize` method on the object to perform the resize. The first argument is the image width, the second argument is the image height and the third argument is an array of [resize parameters](#resize-parameters) options.

```php
$image->resize(800, 600, ['mode' => 'crop']);
```

The width and height arguments are also optional, for example, to use the existing width and only adjust the height, pass the second argument as `null`. This value is then calculated using original image ratio (automatic proportional scaling) based on the `mode` option.

```php
$image->resize(800, null, [...]);
```

Finally, use the `save` method to save the resized image to a new location.

```php
$image->save('path/to/new/file.jpg');
```

> **Note**: There is also a `|resize` [markup filter](../markup/filter-resize.md) that can be used for resizing images in your themes.

<a id="oc-resize-parameters"></a>
### Resize Parameters

The following elements are supported in the options array are supported:

Key | Description | Default | Options
--- | --- | --- | ---
`mode` | How the image should be fitted to dimensions | `auto` | `exact`, `portrait`, `landscape`, `auto`, `fit`, or `crop`
`offset` | Offset the crop of the resized image | `[0,0]` | [left, top]
`quality` | Quality of the resized image | `90` | `0-100`
`sharpen` | Amount to sharpen the image | `0` | `0-100`

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
