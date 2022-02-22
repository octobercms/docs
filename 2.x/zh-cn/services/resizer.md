# 图像调整器

## 介绍

October CMS 附带一个图像调整器，可让您更改支持的图像的形状和大小。要调整图像大小，请使用 `Resizer` 外观上的 `open` 方法来定位文件路径。

```php
$image = Resizer::open('path/to/image.jpg');
```

您还可以从  [page request input](../services/request-input.md)传递上传的文件。.

```php
$image = Resizer::open(Input::file('field_name'));
```

要调整图像大小，请在对象上调用 `resize` 方法来执行调整大小。第一个参数是图像宽度，第二个参数是图像高度，第三个参数是 [调整参数大小](#resize-parameters) 选项的数组.

```php
$image->resize(800, 600, ['mode' => 'crop']);
```

宽度和高度参数也是可选的，例如，要使用现有宽度并仅调整高度，请将第二个参数传递为 `null`。然后使用基于 `mode` 选项的原始图像比例(自动比例缩放)计算该值。

```php
$image->resize(800, null, [...]);
```

最后，使用 `save` 方法将调整大小的图像保存到新位置。

```php
$image->save('path/to/new/file.jpg');
```

> **注意**: 还有一个 `|resize` [标记过滤器](../markup/filter-resize.md) 可用于调整主题中的图像大小。

### 调整参数大小

在 options 数组中支持以下元素：

键 | 说明 | 默认 | 选项
--- | --- | --- | ---
`mode` | 图像应如何适应尺寸 | `auto` | `exact`, `portrait`, `landscape`, `auto`, `fit`, or `crop`
`offset` | 偏移调整大小图像的裁剪 | `[0,0]` | [left, top]
`quality` | 调整大小图像的质量 | `90` | `0-100`
`sharpen` | 锐化图像的量 | `0` | `0-100`

### 可用模式

`mode` 选项允许您指定如何调整图像大小。可用模式如下：

模式 | 描述
--- | ---
`auto` | 根据图像的方向在 `portrait` and `landscape` 之间自动选择
`exact` |调整到给定的确切尺寸，不保留纵横比
`portrait` | 调整到给定的高度并调整宽度以保持纵横比
`landscape` | 调整到给定的宽度并调整高度以保持纵横比
`crop` | 在将尽可能多的图像拟合到这些图像中后，裁剪到给定的尺寸
`fit` | 使图像适合给定的最大尺寸，保持纵横比 
