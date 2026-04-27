# 图像调整大小

## 介绍

October CMS 附带了一个图像调整器，可让你更改支持的图像的形状和大小。

## 调整磁盘上的文件大小

要调整图像大小，请使用 `Resizer` 门面上的 `open` 方法指向文件路径。

```php
$image = Resizer::open('path/to/image.jpg');
```

你也可以从[页面请求输入](./request-input.md)中传入上传的文件。

```php
$image = Resizer::open(Input::file('field_name'));
```

要调整图像大小，请在对象上调用 `resize` 方法来执行调整大小操作。第一个参数是图像宽度，第二个参数是图像高度，第三个参数是调整大小参数的数组。

```php
$image->resize(800, 600, ['mode' => 'crop']);
```

宽度和高度参数也是可选的，例如，要使用现有宽度仅调整高度，请将第二个参数传递为 `null`。然后根据 `mode` 选项，使用原始图像比例计算此值（自动等比缩放）。

```php
$image->resize(800, null, [...]);
```

最后，使用 `save` 方法将调整大小后的图像保存到新位置。

```php
$image->save('path/to/new/file.jpg');
```

### 调整大小参数

选项数组中支持以下元素：

键 | 描述 | 默认值 | 选项
--- | --- | --- | ---
`mode` | 图像应如何适应尺寸 | `auto` | `exact`、`portrait`、`landscape`、`auto`、`fit` 或 `crop`
`offset` | 调整大小图像的裁剪偏移量 | `[0,0]` | [左, 上]
`quality` | 调整大小后图像的质量 | `90` | `0-100`
`sharpen` | 图像锐化量 | `0` | `0-100`

### 可用模式

`mode` 选项允许你指定图像应如何调整大小。可用的模式如下：

模式 | 描述
--- | ---
`auto` | 根据图像的方向自动在 `portrait` 和 `landscape` 之间选择
`exact` | 调整为给定的精确尺寸，不保持宽高比
`portrait` | 调整为给定的高度，并调整宽度以保持宽高比
`landscape` | 调整为给定的宽度，并调整高度以保持宽高比
`crop` | 在尽可能多地将图像放入给定尺寸后，裁剪为给定尺寸
`fit` | 将图像放入给定的最大尺寸内，保持宽高比

## 调整文件大小并输出到浏览器

`System\Classes\ResizeImages` 类可用于调整图像大小并通过 URL 提供：

```php
$url = \System\Classes\ResizeImages::resize($image, $width, $height, $options);
```

如果你正在调整媒体库项目的大小，应使用 `Media\Classes\MediaLibrary` 类和 `url` 方法解析媒体路径。

```php
$image = \Media\Classes\MediaLibrary::url('relative/path/to/asset.jpg');

$url = \System\Classes\ResizeImages::resize($image, $width, $height, $options);
```

::: tip
还有一个 `|resize` [标记过滤器](../../markup/filter/resize.md)可用于在主题中调整图像大小。
:::

#### 参见

::: also
* [调整大小过滤器](../../markup/filter/resize.md)
* [媒体过滤器](../../markup/filter/media.md)
:::
