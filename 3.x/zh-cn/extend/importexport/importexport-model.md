---
subtitle: 了解如何自定义导入和导出过程。
---
# 导入导出模型

导入和导出模型定义了处理导入或导出操作时使用的逻辑，分别继承 `Backend\Models\ImportModel` 和 `Backend\Models\ExportModel` 模型。这些模型设计用于与[导入导出控制器](./importexport-controller.md)配合使用，但也可以直接在 PHP 中使用。

## 导入模型

要导入数据，您应该为此过程创建一个专用模型，该模型继承 `Backend\Models\ImportModel` 类。以下是一个类定义示例：

```php
class SubscriberImport extends \Backend\Models\ImportModel
{
    /**
     * @var array rules to be applied to the data.
     */
    public $rules = [];

    public function importData($results, $sessionKey = null)
    {
        foreach ($results as $row => $data) {

            try {
                $subscriber = new Subscriber;
                $subscriber->fill($data);
                $subscriber->save();

                $this->logCreated();
            }
            catch (Exception $ex) {
                $this->logError($row, $ex->getMessage());
            }

        }
    }
}
```

该类必须定义一个名为 `importData` 的方法，用于处理导入的数据。第一个参数 `$results` 将包含一个含有要导入数据的数组。第二个参数 `$sessionKey` 将包含请求使用的会话密钥。

方法 | 描述
------------- | -------------
`logUpdated()` | 当记录被更新时调用。
`logCreated()` | 当记录被创建时调用。
`logError(rowIndex, message)` | 当导入记录出现问题时调用。
`logWarning(rowIndex, message)` | 用于提供软警告，例如修改值。
`logSkipped(rowIndex, message)` | 当整行数据未被导入（跳过）时使用。

### 使用 PHP 导入

使用 `importFile` 方法从存储在磁盘上的本地文件手动处理导入。

```php
$importModel = new MyImportClass;

$importModel->file_format = 'json';

$importModel->importFile('/path/to/import/file.json');
```

如果文件来自上传文件，请使用 `Input` facade 访问本地路径。

```php
$importModel->importFile(
    Input::file('file')->getRealPath()
);
```

## 导出模型

要导出数据，您应该创建一个继承 `Backend\Models\ExportModel` 类的专用模型。以下是一个示例：

```php
class SubscriberExport extends \Backend\Models\ExportModel
{
    public function exportData($columns, $sessionKey = null)
    {
        $subscribers = Subscriber::all();

        $subscribers->each(function($subscriber) use ($columns) {
            $subscriber->addVisible($columns);
        });

        return $subscribers->toArray();
    }
}
```

该类必须定义一个名为 `exportData` 的方法，用于返回导出数据。第一个参数 `$columns` 是要导出的列名数组。第二个参数 `$sessionKey` 将包含请求使用的会话密钥。

### 使用 PHP 导出

使用 `exportDownload` 方法手动处理导出并返回下载响应。

```php
$exportColumns = ['id', 'title'];

$exportModel = new MyExportClass;

$exportModel->file_format = 'json';

return $exportModel->exportDownload('myexportfile.json', ['columns' => $exportColumns]);
```

## 自定义选项

导入和导出表单都支持自定义选项，这些选项可以通过表单字段引入，分别在导入或导出配置中的 **form** 选项中定义。这些值然后传递给导入/导出模型，并在处理过程中可用。

```yaml
# config_import_export.yaml
import:
    # ...
    form: $/acme/campaign/models/subscriberimport/fields.yaml

export:
    # ...
    form: $/acme/campaign/models/subscriberexport/fields.yaml
```

指定的表单字段将显示在导入/导出页面上。以下是 `fields.yaml` 文件内容的示例：

```yaml
# fields.yaml
fields:

    auto_create_lists:
        label: Automatically create lists
        type: checkbox
        default: true
```

上面名为 **auto_create_lists** 的表单字段的值可以在导入模型的 `importData` 方法中使用 `$this->auto_create_lists` 访问。如果这是导出模型，该值将在 `exportData` 方法中可用。

```php
class SubscriberImport extends \Backend\Models\ImportModel
{
    public function importData($results, $sessionKey = null)
    {
        if ($this->auto_create_lists) {
            // Do something
        }

        // ...
    }
}
```
