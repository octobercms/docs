---
subtitle: 为页面添加导入和导出功能。
---
# 导入导出控制器

`Backend\Behaviors\ImportExportController` 类是一个控制器行为，提供导入和导出数据的功能。该行为提供两个页面：导入和导出。导入页面允许用户上传 CSV 文件并将列匹配到数据库。导出页面则相反，允许用户将数据库中的列下载为 CSV 文件。该行为提供控制器操作 `import()` 和 `export()`。

导入和导出行为配置分为两部分定义，每部分依赖于一个特殊的模型类以及列表和表单字段定义文件。要使用此行为，您应该将其添加到控制器类的 `$implement` 属性中。同时，应定义 `$importExportConfig` 类属性，其值应引用用于配置行为属性的 YAML 文件。

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

在 `$importExportConfig` 属性中引用的配置文件以 YAML 格式定义。该文件应放置在控制器的[视图目录](../system/views.md)中。以下是一个配置文件示例。

```yaml
# config_import_export.yaml
import:
    title: Import Subscribers
    modelClass: Acme\Campaign\Models\SubscriberImport
    list: $/acme/campaign/models/subscriber/columns.yaml

export:
    title: Export Subscribers
    modelClass: Acme\Campaign\Models\SubscriberExport
    list: $/acme/campaign/models/subscriber/columns.yaml
```

以下列出的配置属性是可选的。如果希望行为支持导入页面或导出页面（或两者），请定义这些属性。

属性 | 描述
------------- | -------------
**defaultRedirect** | 未定义特定重定向页面时用作后备的重定向页面。
**import** | 导入页面的配置数组或配置文件引用。
**export** | 导出页面的配置数组或配置文件引用。
**defaultFormatOptions** | 默认 CSV 格式选项的配置数组或配置文件引用。

### 导入页面

要支持导入页面，请在 YAML 文件中添加以下配置。

```yaml
import:
    title: Import Subscribers
    modelClass: Acme\Campaign\Models\SubscriberImport
    list: $/acme/campaign/models/subscriberimport/columns.yaml
    redirect: acme/campaign/subscribers
```

导入页面支持以下配置属性。

属性 | 描述
------------- | -------------
**title** | 页面标题，可引用[本地化字符串](../system/localization.md)。
**list** | 定义可用于导入的列表列。
**form** | 提供用作导入选项的额外字段，可选。
**redirect** | 导入完成时的重定向页面，可选。
**permissions** | 执行操作所需的用户权限，可选。

### 导出页面

要支持导出页面，请在 YAML 文件中添加以下配置。

```yaml
export:
    title: Export Subscribers
    modelClass: Acme\Campaign\Models\SubscriberExport
    list: $/acme/campaign/models/subscriberexport/columns.yaml
    redirect: acme/campaign/subscribers
```

导出页面支持以下配置属性：

属性 | 描述
------------- | -------------
**title** | 页面标题，可引用[本地化字符串](../system/localization.md)。
**fileName** | 导出文件使用的文件名（不含扩展名）。默认值：`export`
**list** | 定义可用于导出的列表列。
**form** | 提供用作导出选项的额外字段，可选。
**redirect** | 导出完成时的重定向页面，可选。
**useList** | 设置为 true 或列表定义的值以启用与列表的集成。默认值：`false`。

### 格式选项

要覆盖默认格式选项，请在 YAML 文件中添加以下配置：

```yaml
defaultFormatOptions:
    fileFormat: json
```

以下配置属性（全部可选）支持格式选项，包括其适用的格式类型。

属性 | 描述 | 格式
-------- | ----------- | ------
**fileFormat** | 文件格式，可选 `json`、`csv` 或 `csv_custom`，默认值：`json`。 |
**customJson** | 为 `json` 格式类型使用自定义格式。 | JSON
**firstRowTitles** | 第一行包含标题，仅导入。 | CSV
**delimiter** | 分隔符字符。 | CSV（自定义）
**enclosure** | 包围符字符。 | CSV（自定义）
**escape** | 转义字符。 | CSV（自定义）
**encoding** | 文件编码，仅导入。 | CSV（自定义）

## 导入和导出视图

对于导入和导出页面功能，您应该提供具有对应名称的[视图文件](../system/views.md)——**import.htm** 和 **export.htm**。

导入/导出行为向控制器类添加两个方法：`importRender` 和 `exportRender`。这些方法按照上述 YAML 配置文件渲染导入和导出部分。

### 导入视图

**import.htm** 视图代表允许用户导入数据的导入页面。典型的导入页面包含面包屑导航、导入部分本身和提交按钮。**data-request** 属性应引用行为提供的 `onImport` AJAX 处理程序。以下是典型 import.htm 视图文件的内容。

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
            Import records
        </button>
    </div>

<?= Form::close() ?>
```

### 导出视图

**export.htm** 视图代表允许用户从数据库导出文件的导出页面。典型的导出页面包含面包屑导航、导出部分本身和提交按钮。**data-request** 属性应引用行为提供的 `onExport` AJAX 处理程序。以下是典型 export.htm 表单的内容。

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
            Export records
        </button>
    </div>

<?= Form::close() ?>
```

## 与列表行为集成

还有一种替代的导出数据方法，使用[列表行为](../lists/list-controller.md)来提供导出数据。要使用此功能，您应该在控制器类的 `$implement` 字段中添加 `Backend\Behaviors\ListController` 定义。您不需要使用导出视图，所有设置将从列表中获取。以下是唯一需要的配置：

```yaml
export:
    useList: true
```

然后只需在[列表工具栏](../lists/list-controller.md)中添加一个导出按钮：

```php
<a
    href="<?= Backend::url('acme/campaign/subscribers/export') ?>"
    class="btn btn-default oc-icon-download">
    Export Records
</a>
```

同样，要添加导入按钮，代码如下所示：

```php
<a
    href="<?= Backend::url('acme/campaign/subscribers/import') ?>"
    class="btn btn-default oc-icon-upload">
    Import Records
</a>
```


如果您使用[多个列表定义](../lists/list-controller.md)，则可以提供列表定义。

```yaml
export:
    useList: orders
    fileName: orders.csv
```

`useList` 选项还支持扩展配置属性。

```yaml
export:
    useList:
        definition: orders
        raw: true
```

支持以下配置属性：

属性 | 描述
------------- | -------------
**definition** | 用于获取记录的列表定义，可选。
**raw** | 从记录输出原始属性值，默认值：false。
