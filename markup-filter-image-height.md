# | imageHeight

The `| imageHeight` filter attempts to identify the width in pixels of the provided image source.

>**NOTE:** This filter does not support thumbnail (already resized) versions of FileModels being passed as the image source.

    {% set resizedImage = 'banner.jpg' | media | resize(1920, 1080) %}
    <img src="{{ resizedImage }}" height="{{ resizedImage | imageHeight }}" />

See the [image resizing docs](../services/image-resizing#resize-sources) for more information on what image sources are supported.