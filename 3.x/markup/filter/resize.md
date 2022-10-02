---
subtitle: Twig Filter
---
# |resize

The `|resize` filter attempts to resize the provided image source using the provided resizing configuration and outputs a URL to the resized image.

```twig
{{ 'image.jpg'|resize(100, 100) }}
```

The filter accepts three arguments: `|resize(width, height, options)`.

If the filter can resize the provided image, then a URL to the image resizer (eg: `/resize/filename.png`) is returned. For subsequent requests, a direct URL to the resized image is returned. If the filter is unable to process the provided image, then it will instead return the original URL unmodified.

This will resize a banner.jpg media image to 1920 x 1080 ratio.

```twig
<img src="{{ 'banner.jpg'|media|resize(1920, 1080) }}" />
```

You can also pass a third options argument. This example will crop the image instead.

```twig
<img src="{{ 'banner.jpg'|resize(800, 600, { mode: 'crop' }) }}" />
```

See the [image resizer article](../../extend/services/resizer.md) for more information on the available `options` parameters.

## Available Sources

You may reference images from multiple sources, including the following paths:

- `/app`
- `/plugins`
- `/themes`
- `/modules`
- `/storage/app/uploads`
- `/storage/app/media`

For example:

```twig
{{ '/plugins/acme/blog/assets/images/someimage.png'|resize(...) }}
```
