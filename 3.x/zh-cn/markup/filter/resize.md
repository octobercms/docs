---
subtitle: Twig 过滤器
---
# |resize

`|resize` 过滤器尝试使用提供的调整大小配置来调整所提供图像源的大小，并输出调整后图像的 URL。

```twig
{{ 'image.jpg'|resize(100, 100) }}
```

该过滤器接受三个参数：`|resize(width, height, options)`。

如果过滤器能够调整所提供图像的大小，则返回指向图像调整器的 URL（例如：`/resize/filename.png`）。对于后续请求，将直接返回调整后图像的 URL。如果过滤器无法处理所提供的图像，则会返回原始 URL，不做任何修改。

以下代码将把 banner.jpg 媒体图像调整为 1920 x 1080 的比例。

```twig
<img src="{{ 'banner.jpg'|media|resize(1920, 1080) }}" />
```

您还可以传递第三个选项参数。以下示例将裁剪图像。

```twig
<img src="{{ 'banner.jpg'|resize(800, 600, { mode: 'crop' }) }}" />
```

有关可用的 `options` 参数的更多信息，请参阅[图像调整器文章](../../extend/services/resizer.md)。

## 自定义文件名

调整器默认会为调整后的图像分配一个随机文件名。您可以通过将 `filename` 选项设置为 `true` 来使用原始文件名。

```twig
<img src="{{ 'banner.jpg'|resize(800, 600, { filename: true }) }}" />
```

`filename` 选项还支持以字符串形式指定自定义文件名。文件名不应包含扩展名，因为将使用原始扩展名。

```twig
<img src="{{ 'banner.jpg'|resize(800, 600, { filename: 'my-seo-friendly-name' }) }}" />
```

您可以使用 `extension` 选项修改扩展名。此过程将尝试从一种文件类型转换为另一种，例如将 JPG 转换为 PNG 文件。

```twig
<img src="{{ 'banner.jpg'|resize(800, 600, {
    filename: 'my-seo-friendly-name',
    extension: 'png'
}) }}" />
```

## 自定义文件夹名称

使用自定义文件名时，文件名仍会包含一个尾部哈希值以确保在调整器资源目录中的唯一性。在大多数情况下，这足以满足基本的 SEO 需求。例如，文件在系统中将如下所示。

- `.../800_600_0_0_auto/my-seo-friendly-name_001a14981ffe90700046616c5f415467.png`

可以指定 `group` 作为文件夹名称，这将把图像放置在专用的资源组中。

```twig
<img src="{{ 'banner.jpg'|resize(800, 600, {
    filename: 'my-seo-friendly-name',
    group: '2024-banners'
}) }}" />
```

例如，上面的代码将把文件放置在以下目录中：

- `.../800_600_0_0_auto/2024-banners/my-seo-friendly-name.png`

但是请注意，这种方法可能容易出现命名冲突。如果使用相同的名称和调整选项调整不同的文件大小，它将输出原始文件，因为路径中没有添加唯一的哈希值。

## 可用来源

您可以从多个来源引用图像，包括以下路径：

- `/app`
- `/plugins`
- `/themes`
- `/modules`
- `/storage/app/uploads`
- `/storage/app/media`

例如：

```twig
{{ '/plugins/acme/blog/assets/images/someimage.png'|resize(...) }}
```

## PHP 接口

您可以在 PHP 中使用 `System\Classes\ResizeImages` 和 `resize` 方法来调整图像大小。返回值是调整后图像的 URL 位置。

```php
ResizeImages::resize('path/to/asset.jpg');
```

该方法接受宽度（第二个参数）、高度（第三个参数）和[调整器选项](../../extend/services/resizer.md)（第四个参数）。

```php
ResizeImages::resize('path/to/asset.jpg', 800, 600, ['mode' => 'crop']);
```

#### 参见

::: also
* [调整器服务](../../extend/services/resizer.md)
:::
