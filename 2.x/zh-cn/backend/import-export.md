# 导入和导出

**Import Export Behavior** 是一个控制器修饰符，提供用于导入和导出数据的功能。 该行为提供了两个页面，分别称为 Import 和 Export。 导入页面允许用户上传 CSV 文件并将列与数据库匹配。 导出页面正好相反，它允许用户从数据库中下载列作为 CSV 文件。 该行为提供控制器操作`import()`和`export()`。

行为配置分为两部分定义，每一部分都依赖于一个特殊的模型类以及一个列表和表单字段定义文件。 要使用导入和导出行为，您应该将其添加到控制器类的 `$implement` 属性中。 此外，应定义 `$importExportConfig` 类属性，其值应参考用于配置行为选项的 YAML 文件。

```php
namespace Acme\Shop\Controllers;

class Products extends Controller
{
    public $implement = [
        \Backend\Behaviors\ImportExportController::class
    ];

    public $importExportConfig = 'config_import_export.yaml';

    // [...]
}
```

## 配置行为

`$importExportConfig` 属性中引用的配置文件以 YAML 格式定义。 该文件应放置在控制器的 [视图目录](controllers-ajax.md) 中。 下面是一个配置文件的例子：

```yaml
# ===================================
#  Import/Export Behavior Config[导入/导出行为配置]
# ===================================

import:
    title: 导入订阅者
    modelClass: Acme\Campaign\Models\SubscriberImport
    list: $/acme/campaign/models/subscriber/columns.yaml

export:
    title: 导出订阅者
    modelClass: Acme\Campaign\Models\SubscriberExport
    list: $/acme/campaign/models/subscriber/columns.yaml
```

下面列出的配置选项是可选的。 如果您希望行为支持 [导入](#oc-import-page) 或 [导出](#oc-export-page) 或两者，请定义它们。

选项 | 描述
------------- | -------------
**defaultRedirect** | 当没有定义特定的重定向页面时，用作后备重定向页面。
**import** | 配置数组或对导入页面的配置文件的引用。
**export** | 配置数组或对导出页面的配置文件的引用。
**defaultFormatOptions** | 配置数组或对默认 CSV 格式选项的配置文件的引用。

<a id="oc-import-page"></a>
### 导入页面

要支持导入页面，请将以下配置添加到 YAML 文件：

```yaml
import:
    title: 导入订阅者
    modelClass: Acme\Campaign\Models\SubscriberImport
    list: $/acme/campaign/models/subscriberimport/columns.yaml
    redirect: acme/campaign/subscribers
```

导入页面支持以下配置选项：

选项 | 描述
------------- | -------------
**title** | 页面标题，可以引用 [多语言字符串](../plugin/localization.md)。
**list** | 定义可用于导入的列表列。
**form** | 提供用作导入选项的附加字段，可选。
**redirect** | 导入完成时的重定向页面，可选
**permissions** | 执行操作所需的用户权限，可选

<a id="oc-export-page"></a>
### 导出页面

要支持导出页面，请将以下配置添加到 YAML 文件中：

```yaml
export:
    title: 导出订阅者
    modelClass: Acme\Campaign\Models\SubscriberExport
    list: $/acme/campaign/models/subscriberexport/columns.yaml
    redirect: acme/campaign/subscribers
```

导出页面支持以下配置选项：

选项 | 描述
------------- | -------------
**title** | 页面标题，可以引用 [多语言字符串](../plugin/localization.md)。
**fileName** | 用于导出文件的文件名，默认为 **export.csv**。
**list** | 定义可用于导出的列表列。
**form** | 提供用作导出选项的附加字段，可选。
**redirect** | 导出完成时的重定向页面，可选。
**useList** | 设置为 true 或列表定义的值以启用 [与列表集成](#oc-list-behavior-integration)，默认值：false。

### 格式选项

要覆盖默认的 CSV 格式选项，请将以下配置添加到 YAML 文件中：

```yaml
defaultFormatOptions:
    delimiter: ';'
    enclosure: '"'
    escape: '\'
    encoding: 'utf-8'
```

格式选项支持以下配置选项(都是可选的)：

选项 | 描述
------------- | -------------
**delimiter** | 分隔符
**enclosure** | 包围字符
**escape** | 转义字符
**encoding** | 文件编码(仅用于导入)。

## 导入和导出视图

对于每个页面功能的 [导入](#oc-import-page) 和 [导出](#oc-export-page)，您应该提供具有相应名称的 [视图文件](controllers-ajax.md) - **import.htm** 和**export.htm**。

导入/导出行为向控制器类添加了两个方法：`importRender` 和 `exportRender`。 这些方法根据上述 YAML 配置文件呈现导入和导出部件。

### 导入视图

**import.htm** 视图表示允许用户导入数据的导入页面。 典型的导入页面包含面包屑、导入部分本身和提交按钮。 **data-request** 属性应引用行为提供的 `onImport` AJAX 处理程序。 下面是典型的 import.htm 视图文件的内容。
```php
<?= Form::open(['class' => 'layout']) ?>

    <div class="layout-row">
        <?= $this->importRender() ?>
    </div>

    <div class="form-buttons">
        <button
            type="submit"
            data-control="popup"
            data-handler="onImportLoadForm"
            data-keyboard="false"
            class="btn btn-primary">
            导入记录
        </button>
    </div>

<?= Form::close() ?>
```

### 导出视图

**export.htm** 视图表示允许用户从数据库中导出文件的导出页面。 典型的导出页面包含面包屑、导出部分本身和提交按钮。 **data-request** 属性应引用行为提供的 `onExport` AJAX 处理程序。 下面是典型的 export.htm 表单的内容。
```php
<?= Form::open(['class' => 'layout']) ?>

    <div class="layout-row">
        <?= $this->exportRender() ?>
    </div>

    <div class="form-buttons">
        <button
            type="submit"
            data-control="popup"
            data-handler="onExportLoadForm"
            data-keyboard="false"
            class="btn btn-primary">
            导出记录
        </button>
    </div>

<?= Form::close() ?>
```

## 定义导入模型

对于导入数据，您应该创建一个扩展`Backend\Models\ImportModel`类的专用模型。 这是一个示例类定义：

```php
class SubscriberImport extends \Backend\Models\ImportModel
{
    /**
     * @var array 要应用到数据的规则。
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
            catch (\Exception $ex) {
                $this->logError($row, $ex->getMessage());
            }

        }
    }
}
```

该类必须定义一个名为`importData`的方法，用于处理导入的数据。 第一个参数 `$results` 将包含一个包含要导入的数据的数组。 第二个参数 `$sessionKey` 将包含用于请求的会话密钥。

方法 | 描述
------------- | -------------
`logUpdated()` | 更新记录时调用。
`logCreated()` | 创建记录时调用。
`logError(rowIndex, message)` | 当导入记录出现问题时调用。
`logWarning(rowIndex, message)` | 用于提供软警告，例如修改值。
`logSkipped(rowIndex, message)` | 在未导入(跳过)整行数据时使用。

## 定义导出模型

对于导出数据，您应该创建一个扩展 `Backend\Models\ExportModel` 类的专用模型。 这是一个例子：

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

该类必须定义一个名为`exportData`的方法，用于返回导出数据。第一个参数`$columns`是要导出的列名数组。第二个参数 `$sessionKey` 将包含用于请求的会话密钥。

## 自定义选项

导入和导出表单都支持可以使用表单字段引入的自定义选项，分别在导入或导出配置中的 **form** 选项中定义。然后将这些值传递给导入/导出模型，并在处理过程中可用。

```yaml
import:
    # ...
    form: $/acme/campaign/models/subscriberimport/fields.yaml

export:
    # ...
    form: $/acme/campaign/models/subscriberexport/fields.yaml
```

指定的表单字段将出现在导入/导出页面上。这是一个示例 `fields.yaml` 文件内容：

```yaml
# ===================================
#  Form Field Definitions[表单字段定义]
# ===================================

fields:

    auto_create_lists:
        label: 自动创建列表
        type: checkbox
        default: true
```

上面名为 **auto_create_lists** 的表单字段的值可以使用导入模型的 `importData` 方法中的 `$this->auto_create_lists` 访问。如果这是导出模型，则该值将在 `exportData` 方法中可用。

```php
class SubscriberImport extends \Backend\Models\ImportModel
{
    public function importData($results, $sessionKey = null)
    {
        if ($this->auto_create_lists) {
            // 做些什么
        }

        // ...
    }
}
```

<a id="oc-list-behavior-integration"></a>
## 与列表行为集成

有另一种导出数据的方法，它使用 [列表行为](lists.md) 来提供导出数据。为了使用这个特性，你应该在控制器类的 `$implement` 字段中定义 `Backend.Behaviors.ListController`。您不需要使用导出视图，所有设置都将从列表中提取。这是唯一需要的配置：

```yaml
export:
    useList: true
```

如果您使用 [多个列表定义](lists.md#oc-multiple-list-definitions)，那么您可以提供列表定义：

```yaml
export:
    useList: orders
    fileName: orders.csv
```

`useList` 选项还支持扩展配置选项。

```yaml
export:
    useList:
        definition: orders
        raw: true
```

支持以下配置选项：

选项 | 描述
------------- | -------------
**definition** | 从列表定义源记录，可选。
**raw** | 从记录中输出原始属性值，默认值：false。
