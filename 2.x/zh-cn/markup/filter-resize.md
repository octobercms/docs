# |resize

`|resize` 过滤器尝试使用提供的调整大小配置来调整提供的图像源的大小，并将 URL 输出到调整大小的图像。

```twig
{{ 'image.jpg'|resize(100, 100) }}
```

过滤器接受三个参数 : `|resize(width, height, options)`.

如果过滤器可以调整提供的图像大小，则返回图像调整大小的URL(例如: `/resize/filename.png`) 对于后续请求，将返回一个指向调整大小图像的直接 URL。 如果过滤器无法处理提供的图像，那么它将返回未修改的原始 URL。

这会将 banner.jpg 媒体图像的大小调整为 1920 x 1080 的比例。

```twig
<img src="{{ 'banner.jpg'|media|resize(1920, 1080) }}" />
```

您还可以传递第三个选项参数。 此示例将改为裁剪图像。

```twig
<img src="{{ 'banner.jpg'|resize(800, 600, { mode: 'crop' }) }}" />
```

有关可用 `options` 参数的更多信息，请参阅[图像调整器文章](../services/resizer.md#resize-parameters) f
