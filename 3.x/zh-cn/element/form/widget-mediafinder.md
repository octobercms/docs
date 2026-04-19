---
subtitle: 表单小部件
shortname: Media Finder
---
# Media Finder 字段

`mediafinder` - 渲染一个用于从媒体管理器库中选择项目的字段。展开该字段将显示媒体管理器以查找文件。选择的结果是一个表示文件相对路径的字符串。

```yaml
whitepaper_file:
    label: Whitepaper PDF
    type: mediafinder
```

以下[字段属性](../form-fields.md)受支持且常用。

属性 | 描述
------------- | -------------
**label** | 向用户显示表单字段时使用的名称。
**default** | 指定默认字符串值，可选。
**comment** | 在字段下方放置描述性注释。
**mode** | 预期的文件类型，可选 `file`、`folder` 或 `image`。默认值：`file`。
**imageWidth** | 如果使用 image 类型，预览图片将显示为此宽度，可选。
**imageHeight** | 如果使用 image 类型，预览图片将显示为此高度，可选。
**maxItems** | 可以选择的最大项目数量。
**thumbOptions** | 用于生成缩略图的附加[调整大小选项](../../extend/services/resizer.md)，或传递 `false` 以禁用缩略图生成。

将 `mode` 设置为 **image** 以显示所选图片的预览。

```yaml
background_image:
    label: Background Image
    type: mediafinder
    mode: image
```

您可以将 `mode` 设置为 **folder** 以仅允许选择媒体文件夹路径。

```yaml
media_folder:
    label: Media Folder
    type: mediafinder
    mode: folder
```

::: tip
与 [File Upload 表单小部件](./widget-fileupload.md)不同，Media Finder 表单小部件将数据存储为表示在媒体库中选择的媒体文件路径的字符串。它应关联到模型上的普通属性。
:::

## 选择多个项目

媒体查找器将根据模型中的 [jsonable 属性](../../extend/system/models.md)自动判断是否可以选择多个项目，这是存储多个项目的必要条件。

您可以使用 `maxItems` 属性限制可选择的项目数量。

```yaml
media_gallery:
    label: Image
    type: mediafinder
    mode: image
    maxItems: 10
```
