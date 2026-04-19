---
subtitle: 列表列
shortname: Image
---
# Image 列

`image` 列显示图片列，并提供调整输出大小的选项。

```yaml
avatar:
    label: Avatar
    type: image
```

支持以下属性。

属性 | 描述
------------- | -------------
**sortable** | 禁用列排序。默认值：`false`
**width** | 要使用的图片缩略图宽度，可选。
**height** | 要使用的图片缩略图高度，可选。
**options** | [图片调整大小](../../extend/services/resizer.md)选项。
**limit** | 显示的最大图片数量。默认值：`3`

使用 `sortable` 属性禁用排序。

```yaml
avatar:
    label: Avatar
    type: image
    sortable: false
```

使用 `width` 和 `height` 属性指定自定义图片大小。

```yaml
avatar:
    label: Avatar
    type: image
    width: 150
    height: 150
```

使用 `options` 属性指定调整大小选项。

```yaml
avatar:
    label: Avatar
    type: image
    options:
        quality: 80
```

有关支持的选项的更多信息，请参阅[图片调整大小文章](../../extend/services/resizer.md)。

#### 另请参阅

::: also
* [图片调整大小](../../extend/services/resizer.md)
:::
