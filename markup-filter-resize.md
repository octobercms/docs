# |resize

The `|resize` filter attempts to resize the provided image source using the provided resizing configuration and outputs a URL to the resized image.

    {{ 'image.jpg'|resize(100, 100) }}

The filter accepts three arguments: `|resize(width, height, options)`.

If the filter can resize the provided image, then a URL to the image resizer (eg: `/resize/filename.png`) is returned. For subsequent requests, the a direct URL to the resized image is returned. If the filter is unable to process the provided image, then it will instead return the original URL unmodified.

This will resize a banner.jpg media image to 1920 x 1080 ratio.

    <img src="{{ 'banner.jpg'|media|resize(1920, 1080) }}" />

You can also pass a third options argument. This example will crop the image instead.

    <img src="{{ 'banner.jpg'|resize(800, 600, { mode: 'crop' }) }}" />

See the [image resizer article](../services-resizer.md#resize-parameters) for more information on the available `options` parameters.
