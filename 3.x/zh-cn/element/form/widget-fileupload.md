---
subtitle: 表单小部件
shortname: File Upload
---
# File Upload 字段

`fileupload` - 渲染一个用于图片或常规文件的文件上传器。

```yaml
avatar:
    label: Avatar
    type: fileupload
    mode: image
    imageHeight: 260
    imageWidth: 260
```

以下[字段属性](../form-fields.md)受支持且常用。

属性 | 描述
------------- | -------------
**label** | 向用户显示表单字段时使用的名称。
**default** | 指定默认字符串值，可选。
**comment** | 在字段下方放置描述性注释。
**mode** | 预期的文件类型，可选 file 或 image。默认值：`image`
**size** | 对于多文件上传，容器的大小。可用选项：tiny、small、large、huge、giant。默认值：`large`
**imageWidth** | 如果使用 image 类型，图片将被调整到此宽度，可选
**imageHeight** | 如果使用 image 类型，图片将被调整到此高度，可选
**fileTypes** | 上传器接受的文件扩展名，可选。例如：`zip,txt`
**mimeTypes** | 上传器接受的 MIME 类型，可以是文件扩展名或完全限定名称，可选。例如：`bin,txt`
**maxFilesize** | 上传器接受的文件大小（以 Mb 为单位），可选。默认值：来自 "upload_max_filesize" 参数值
**maxFiles** | 允许上传的最大文件数量
**useCaption** | 允许为文件设置标题和描述。默认值：`true`
**thumbOptions** | 用于生成缩略图的附加[调整大小选项](../../extend/services/resizer.md)，或传递 `false` 以禁用缩略图生成。
**deferredBinding** | 上传文件时使用延迟绑定（如果可用）。禁用此选项可在上传时立即附加文件，而不是在保存时。默认值：`true`

::: tip
与 [Media Finder 表单小部件](./widget-mediafinder.md)不同，File Upload 表单小部件使用[数据库文件附件](../../extend/database/attachments.md)，因此字段名称应为关联模型上 `attachOne` 或 `attachMany` 关系属性的名称。
:::
