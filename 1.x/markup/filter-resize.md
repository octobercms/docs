# | resize

The `| resize` filter attempts to resize the provided image source using the provided resizing configuration and outputs a URL to the resized image.

```twig
<img src="{{ 'banner.jpg' | media | resize(1920, 1080) }}" />
```

If the filter can successfully resize the provided image, then a URL to the October image resizer (`/resize/$id/$targetUrl`) will be rendered as the output of this filter until the image has been successfully resized. Once the image has been resized any future calls to this filter with the specific image and configuration combination will instead output a direct URL to the resized image.

This means that the actual work of resizing the image is delayed until the browser requests a specific image which prevents the resizing of the images from blocking the rendering of a page. It also means that several resize requests can be handled at once in parallel as the browser will make multiple requests at the same time for resized images with each request able to handle just resizing its own image.

>**NOTE:** If the filter is unable to process the provided image, then it will instead return the original URL unmodified.

The filter accepts three parameters: `| resize(int $width [, int $height , array $options])`.

See the [image resizing docs](../services/image-resizing.md#resize-parameters) for more information on the parameters.

- [List of locations images can be resized from](../services/image-resizing.md#resize-sources)

>**Note:** The image resizing functionality requires a cache driver that persists cache data between requests in order to function, `array` is not a supported cache driver if you wish to use this functionality.
