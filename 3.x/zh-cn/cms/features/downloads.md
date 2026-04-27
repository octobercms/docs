---
subtitle: 轻松处理文件下载。
---
# 文件下载

October CMS 提供了在响应中下载文件的简单功能。该功能通过 AJAX 框架选择性启用，以获得最佳性能。

## 下载按钮

要启用文件下载，请在 HTML 表单或按钮标签上包含 `data-request-download` 属性。以下是下载文件的最小示例。

```html
<button data-request="onExport" data-request-download>
    Download
</button>
```

如果在请求触发器上设置了 `data-request-download="..."` 属性，该属性中的文件名将被赋予下载的文件。以下代码生成一个名为 **data.csv** 的文件。

```html
<button data-request="onExport" data-request-download="data.csv">
    Download Document
</button>
```

要在新的浏览器窗口中打开文件（通常用于预览 PDF），请将 `data-browser-target` 属性设置为 `_blank`。

```html
<button data-request="onExport" data-request-download data-browser-target="_blank">
    Open in New Window
</button>
```

::: tip
当使用下载属性时，响应可以是下载或[常规 AJAX 更新](../ajax/update-partials.md)。
:::

## 下载响应

在你的 [AJAX 处理程序](../ajax/handlers.md) 中，你可以返回一个[文件下载](../../extend/services/response-view.md) `Response` 类型，其中 `download` 方法接受本地磁盘文件路径。

```php
public function onExport()
{
    return Response::download(base_path('app/files/installer.zip'));
}
```

要将字符串转换为可下载的响应而无需将内容写入磁盘，请使用 `streamDownload` 方法，该方法接受一个回调函数（第一个参数）和文件名（第二个参数）。

```php
public function onExport()
{
    return Response::streamDownload(function() {
        echo 'CSV Contents...';
    }, 'export.csv');
}
```

你也可以使用[存储服务](../../extend/services/storage.md)从媒体库或任何存储引擎下载文件。使用 `Storage` 门面和 `disk` 方法指定磁盘名称（第一个参数），然后链式调用 `download` 方法并传入要下载的文件名（第一个参数）。

```php
public function onExport()
{
    return Storage::disk('media')->download('archive.zip');
}
```

当使用[模型文件附件](../../extend/database/attachments.md)时，你可以在文件对象上调用 `download` 方法。

```php
public function onDownload()
{
    // ...

    return $model->avatar->download();
}
```


## 使用示例

以下示例展示了一个 CMS 页面，可用于使用自定义文件名下载[模型文件附件](../../extend/database/attachments.md)。它接受附件的 `id` 和 `disk_name` 参数来验证文件，然后使用从 `file_name` 参数（可选）获取的自定义文件名将响应返回给浏览器。

::: cmstemplate
```ini
## pages/download-file.htm

title = "Download File"
url = "/download-file/:id/:disk_name/:file_name?"
layout = "default"
```
```php
function onStart()
{
    $file = System\Models\File::find($this->param('id'));
    if (!$file || !$file->isPublic()) {
        throw new NotFoundException;
    }

    if ($file->disk_name !== $this->param('disk_name')) {
        throw new NotFoundException;
    }

    $customFileName = $this->param('file_name');
    if ($customFileName) {
        $file->file_name = $customFileName;
    }

    return $file->download();
}
```
```twig
```
:::

然后你可以在 Twig 中使用以下标记链接到此页面，其中 `file` 变量是 `System\Models\File` 的实例。

```twig
{{ 'download-file'|page({
    id: file.id,
    disk_name: file.disk_name,
    file_name: 'my-custom-name.png'
}) }}
```

::: tip
如果你打算内联显示文件（例如作为图片），请改用 `$file->output()` 方法。
:::

#### 参见

::: also
* [响应和视图](../../extend/services/response-view.md)
:::
