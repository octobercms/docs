# 关系

**Relation Behavior** 是一个控制器修饰符，用于轻松管理页面上的复杂 [模型](../database/model.md) 关系。 不要与仅提供简单管理的[列关系](lists.md#oc-available-column-types) 或 [表单关系字段](forms.md#oc-relation) 混淆。

关系行为取决于[关系定义](#relationship-types)。 为了使用关系行为，您应该将 `Backend\Behaviors\RelationController` 定义添加到控制器类的 `$implement` 字段中。 此外，应定义 `$relationConfig` 类属性，其值应参考用于[配置行为选项](#configuring-the-relation-behavior) 的 YAML 文件。

```php
namespace Acme\Projects\Controllers;

class Projects extends Controller
{
    public $implement = [
        \Backend\Behaviors\FormController::class,
        \Backend\Behaviors\RelationController::class
    ];

    public $formConfig = 'config_form.yaml';
    public $relationConfig = 'config_relation.yaml';
}
```

> **注意**：关系行为通常与 [表单行为](forms.md) 一起使用。

## 配置关系行为

`$relationConfig` 属性中引用的配置文件以 YAML 格式定义。 该文件应放置在控制器的 [视图目录](controllers-ajax.md) 中。 所需的配置取决于目标模型和相关模型之间的 [关系类型](#relationship-types)。

关系配置文件中的第一级字段定义目标模型中的关系名称。 例如：

```php
class Invoice
{
    public $hasMany = [
        'items' => \Acme\Pay\Models\InvoiceItem::class,
    ];
}
```

具有名为 `items` 的关系的 *Invoice* 模型应使用相同的关系名称定义第一级字段：

```yaml
# ===================================
#  Relation Behavior Config[关系行为配置]
# ===================================

items:
    label: 发票
    view:
        list: $/acme/pay/models/invoiceitem/columns.yaml
        toolbarButtons: create|delete
    manage:
        form: $/acme/pay/models/invoiceitem/fields.yaml
        recordsPerPage: 10
```

然后对每个关系名称定义使用以下选项：

选项 | 描述
------------- | -------------
**label** | 关系的标签，单数时态，需要。
**view** | 特定于视图容器的配置，请参阅下文。
**manage** | 特定于管理弹出窗口的配置，请参阅下文。
**pivot** | 对表单字段定义文件的引用，用于 [与数据透视表数据的关系](#belongs-to-many-with-pivot-data)。
**emptyMessage** | 当关系为空时显示的消息，可选。
**readOnly** | 禁用添加、更新、删除或创建关系的能力。 默认值：false
**deferredBinding** | 当会话密钥可用时，[使用会话密钥延迟所有绑定操作](../database/relations.md#oc-deferred-binding)。 默认值：false

可以为 **view** 或 **manage** 选项指定这些配置值，适用于列表、表单或两者的渲染类型。

选项 | 类型 | 描述
------------- | ------------- | -------------
**form** | Form | 对表单字段定义文件的引用，请参阅 [后端表单字段](forms.md#oc-defining-form-fields)。
**list** | List | 对列表列定义文件的引用，请参阅 [后端列表列](lists.md#oc-defining-list-columns)。
**showFlash** | Both | 启用成功操作后显示闪现消息。 默认值：true
**showSearch** | List | 显示用于搜索记录的输入。默认值：false
**showSorting** | List | 在每一列上显示排序链接。默认值：true
**defaultSort** | List | 当未定义用户首选项时，设置默认的排序列和方向。支持带有 `column` 和 `direction` 键的字符串或数组。
**recordsPerPage** | List | 每页显示的最大行数。
**noRecordsMessage** | List | 未找到记录时显示的消息，可以参考 [多语言字符串](../plugin/localization.md)。
**conditions** | List | 指定要应用于列表模型查询的原始 where 查询语句。
**scope** | List | 指定在_相关表单模型_中定义的 [查询范围方法](../database/model.md#oc-query-scopes) 始终应用于列表查询。此关系将附加到的模型(即父模型)作为第二个参数(`$query` 是第一个)传递给此范围方法。
**searchMode** | List | 将搜索策略定义为包含所有单词、任何单词或精确短语。支持的选项：全部、任意、精确。默认值：全部。
**searchScope** | List | 指定**相关表单模型**中定义的[查询范围方法](../database/model.md#oc-query-scopes)应用于搜索查询，第一个参数将包含搜索词。
**filter** | List | 对过滤器范围定义文件的引用，请参阅 [后端列表过滤器](lists.md#oc-using-list-filters)。

只能为 **view** 选项指定这些配置值。

选项 | 类型 | 描述
------------- | ------------- | -------------
**showCheckboxes** | List | 在每条记录旁边显示复选框。
**recordUrl** | List | 将每个列表记录链接到另一个页面。 例如：**users/update/:id**。 `:id` 部分被替换为记录标识符。
**customViewPath** | List | 指定自定义视图路径以覆盖列表使用的部件。
**recordOnClick** | List | 单击记录时要执行的自定义 JavaScript 代码。
**toolbarPartial** | Both | 使用工具栏按钮对控制器部件文件的引用。 例如：**_relation_toolbar.htm**。 此选项覆盖 *toolbarButtons* 选项。
**toolbarButtons** | Both | 要显示的一组按钮。 这可以格式化为数组或管道分隔的字符串，或设置为 `false` 以不显示任何按钮。 可用选项有：`create`、`update`、`delete`、`add`、`remove`、`link`和`unlink`。 示例：`add|remove`。
**structure** | List | 为列表启用 [排序记录](../backend/reorder.md) 的选项。

只能为 **manage** 选项指定这些配置值。

选项 | 类型 | 描述
------------- | ------------- | -------------
**title** | Both | 弹出标题，可以引用 [多语言字符串](../plugin/localization.md)。
**context** | Form | 正在显示的表单的上下文。 可以是字符串或带键的数组：create, update。

### 自定义消息

指定 `customMessages` 选项以覆盖关系控制器使用的默认消息。 这些值可以是纯文本，也可以引用 [多语言字符串](../plugin/localization.md)。

```yaml
customMessages:
    buttonCreate: Make Thing
    buttonDelete: Destroy Thing
```

您还可以在显示的相关字段的上下文中修改消息。 以下将仅覆盖 `items` 关系的 `createButton` 消息。

```yaml
items:
    customMessages:
        buttonCreate: 新项目！
```

以下消息可作为自定义消息覆盖。

消息 | 默认消息
------------- | -------------
buttonCreate | 创建:name
buttonUpdate | 更新:name
buttonAdd | 添加:name
buttonLink | 关联:name
buttonDelete | 删除
buttonRemove | 移除
buttonUnlink | 取消关联
confirmDelete | 你确定吗？
confirmUnlink | 你确定吗？
titlePreviewForm | 预览:name
titleCreateForm | 创建:name
titleUpdateForm | 更新:name
titleLinkForm | 关联一个新的 :name
titleAddForm | 添加一个新的:name
titlePivotForm | 相关:name数据
flashCreate | :name 已创建
flashUpdate | :name 已更新
flashDelete | :name 已删除
flashAdd | :name 已添加
flashLink | :name 已关联
flashRemove | :name 已移除
flashUnlink | :name 未关联

## 关系类型

关系管理器的显示方式取决于目标模型中的关系定义。关系类型也将决定配置要求，这些以**粗体**显示。可以使用以下关系类型：

### 一对多关联

1. 相关记录显示为列表(**view.list**)。
1. 单击记录将显示更新表单(**manage.form**)。
1. 单击 *Add* 将显示一个选择列表 (**manage.list**)。
1. 点击*Create*会显示一个创建表单(**manage.form**)。
1. 点击 *Delete* 将销毁记录。
1. 单击 *Remove* 将移除关系。

例如，如果 *博客文章* 有许多 *评论*，则将目标模型设置为 blog post，并使用 **list** 定义中的列显示评论列表。单击评论会打开一个弹出表单，其中包含在 **form** 中定义的字段以更新评论。可以以相同的方式创建评论。以下是关系行为配置文件的示例：

```yaml
# ===================================
#  Relation Behavior Config[关系行为配置]
# ===================================

comments:
    label: 评论
    manage:
        form: $/acme/blog/models/comment/fields.yaml
        list: $/acme/blog/models/comment/columns.yaml
    view:
        list: $/acme/blog/models/comment/columns.yaml
        toolbarButtons: create|delete
```

### 多对多关联

1. 相关记录显示为列表(**view.list**)。
1. 单击 *Add* 将显示一个选择列表 (**manage.list**)。
1. 点击*Create*会显示一个创建表单(**manage.form**)。
1. 单击*Delete* 将销毁数据透视表记录。
1. 单击 *Remove* 将移除关系。

例如，如果 *用户* 属于许多 *角色*，则目标模型被设置为用户，并使用 **list** 定义中的列显示角色列表。 可以从用户中添加和删除现有角色。 以下是关系行为配置文件的示例：

```yaml
# ===================================
#  Relation Behavior Config[关系行为配置]
# ===================================

roles:
    label: 角色
    view:
        list: $/acme/user/models/role/columns.yaml
        toolbarButtons: add|remove
    manage:
        list: $/acme/user/models/role/columns.yaml
        form: $/acme/user/models/role/fields.yaml
```

### 多对多关联 (使用数据透视表)

> **注意**：[延迟绑定](../database/relations.md#oc-deferred-binding) 目前不支持透视数据，因此父模型应该存在。 如果您的关系行为配置具有 `deferredBinding: true`，则透视数据将**不**可用于列表配置(例如`pivot[attribute]`)。

1. 相关记录显示为列表(**view.list**)。
1. 单击记录将显示更新表单(**pivot.form**)。
1. 单击 *Add* 将显示一个选择列表 (**manage.list**)，然后是一个数据输入表单 (**pivot.form**)。
1. 单击 *Remove* 将销毁数据透视表记录。

继续 *多对多关联* 关系中的示例，如果角色也带有到期日期，则单击角色将打开一个弹出表单，其中包含在 **pivot** 中定义的字段以更新到期日期。 以下是关系行为配置文件的示例：

```yaml
# ===================================
#  Relation Behavior Config[关系行为配置]
# ===================================

roles:
    label: 角色
    view:
        list: $/acme/user/models/role/columns.yaml
    manage:
        list: $/acme/user/models/role/columns.yaml
    pivot:
        form: $/acme/user/models/role/fields.yaml
```

通过 `pivot` 关系定义表单字段和列表列时，可以使用透视数据，请参见下面的示例：

```yaml
# ===================================
#  Relation Behavior Config[关系行为配置]
# ===================================

teams:
    label: 团队
    view:
        list:
            columns:
                name:
                    label: 名称
                pivot[team_color]:
                    label: 团队颜色
    manage:
        list:
            columns:
                name:
                    label: 名称
    pivot:
        form:
            fields:
                pivot[team_color]:
                    label: 团队颜色
```

### 属于

1. 相关记录显示为预览表格(**view.form**)。
1. 点击*Create*会显示一个创建表单(**manage.form**)。
1. 单击 *Update* 将显示更新表单 (**manage.form**)。
1. 单击 *Link* 将显示一个选择列表 (**manage.list**)。
1. 单击 *Unlink* 将移除关系。
1. 点击*Delete*会销毁记录。

例如，如果 *电话* 属于 *人员*，则关系管理器将显示一个带有在 **form** 中定义的字段的表单。 单击链接按钮将显示与电话关联的人员列表。 单击取消链接按钮将取消电话与人员的关联。

```yaml
# ===================================
#  Relation Behavior Config[关系行为配置]
# ===================================

person:
    label: 人员
    view:
        form: $/acme/user/models/person/fields.yaml
        toolbarButtons: link|unlink
    manage:
        form: $/acme/user/models/person/fields.yaml
        list: $/acme/user/models/person/columns.yaml
```

### 一对一关联

1. 相关记录显示为预览表格(**view.form**)。
1. 点击*Create*会显示一个创建表单(**manage.form**)。
1. 单击 *Update* 将显示更新表单 (**manage.form**)。
1. 单击 *Link* 将显示一个选择列表 (**manage.list**)。
1. 单击 *Unlink* 将移除关系。
1. 点击*Delete*会销毁记录。

例如，如果*人员* 拥有一部*电话*，则关系管理器将显示带有在**form** 中为电话定义的字段的表单。 单击更新按钮时，会显示一个弹出窗口，其中包含现在可编辑的字段。 如果 人员 已经有电话，则字段会更新，否则会为他们创建一个新电话。

```yaml
# ===================================
#  Relation Behavior Config[关系行为配置]
# ===================================

phone:
    label: 电话
    view:
        form: $/acme/user/models/phone/fields.yaml
        toolbarButtons: update|delete
    manage:
        form: $/acme/user/models/phone/fields.yaml
        list: $/acme/user/models/phone/columns.yaml
```

## 显示关系管理器

在任何页面上管理关系之前，首先必须在控制器中通过调用`initRelation`方法来初始化目标模型。

```php
$post = Post::where('id', 7)->first();
$this->initRelation($post);
```

> **注意**：[表单行为](forms.md) 将在创建、更新和预览操作时自动初始化模型。

然后可以通过调用 `relationRender` 方法为指定的关系定义显示关系管理器。 例如，如果您想在 [预览](forms.md#oc-preview-view) 页面上显示关系管理器，则 **preview.htm** 视图内容可能如下所示：

```php
<?= $this->formRenderPreview() ?>

<?= $this->relationRender('comments') ?>
```

您可以通过将选项作为第二个参数传递来指示关系管理器以只读模式呈现：

```php
<?= $this->relationRender('comments', ['readOnly' => true]) ?>
```

## 扩展关系行为

有时您可能希望修改默认的关系行为，有几种方法可以做到这一点。

### 扩展关系配置

提供修改关系配置的机会。 以下示例可用于根据模型的属性注入不同的 columns.yaml 文件。

```php
public function relationExtendConfig($config, $field, $model)
{
    // 确保模型和字段与您要操作的匹配
    if (!$model instanceof MyModel || $field != 'myField') {
        return;
    }

    // 为企业客户显示不同的列表
    if ($model->mode == 'b2b') {
        $config->view['list'] = '$/author/plugin_name/models/mymodel/b2b_columns.yaml';
    }
}
```

### 扩展视图小部件

提供操作视图小部件的机会。例如，您可能希望根据模型的属性切换显示复选框。

```php
public function relationExtendViewWidget($widget, $field, $model)
{
    // 确保模型和字段与您要操作的匹配
    if (!$model instanceof MyModel || $field != 'myField') {
        return;
    }

    if ($model->constant) {
        $widget->showCheckboxes = false;
    }
}
```

#### 如何删除列

由于小部件在运行时尚未完成初始化，因此您不能调用 `$widget->removeColumn()`。 [列表控制器文档](../backend/lists.md#oc-extending-column-definitions) 中描述的 `addColumns()` 方法将按预期工作，但是要删除一个列，我们需要在 `relationExtendViewWidget()` 方法中监听 'list.extendColumns' 事件。 以下示例显示如何删除列。

```php
public function relationExtendViewWidget($widget, $field, $model)
{
    // 确保模型和字段与您要操作的匹配
    if (!$model instanceof MyModel || $field != 'myField') {
        return;
    }

    // 这将起作用
    $widget->bindEvent('list.extendColumns', function () use ($widget) {
        $widget->removeColumn('my_column');
    });
}
```

### 扩展管理小部件

提供操作关系的管理小部件的机会。

```php
public function relationExtendManageWidget($widget, $field, $model)
{
    // 确保该字段是预期的
    if ($field != 'myField') {
        return;
    }

    // 根据需要操作小部件
}
```

### 扩展透视小部件

提供一个机会来操作您的关系的透视小部件。

```php
public function relationExtendPivotWidget($widget, $field, $model)
{
    // 确保该字段是预期的
    if ($field != 'myField') {
        return;
    }

    // 根据需要操作小部件
}
```

### 扩展过滤器小部件

有两种过滤器小部件可以使用以下方法进行扩展，一种用于查看模式，一种用于`RelationController`的管理模式。

```php
public function relationExtendViewFilterWidget($widget, $field, $model)
{
    // 扩展视图过滤器小部件
}

public function relationExtendManageFilterWidget($widget, $field, $model)
{
    // 扩展管理过滤器小部件
}
```

关于如何在过滤器小部件中以编程方式添加或删除范围的示例可以在 [后端列表文档](../backend/lists.md#oc-extending-filter-scopes) 的 **扩展过滤器范围** 部分中找到。

### 扩展刷新结果

当管理小部件进行更改时，视图小部件通常会刷新，您可以在此过程发生时使用此方法注入额外的容器。返回一个包含额外值的数组以发送到浏览器，例如：

```php
public function relationExtendRefreshResults($field)
{
    // 确保该字段是预期的字段
    if ($field != 'myField') {
        return;
    }

    return ['#myCounter' => 'Total records: 6'];
}
```
