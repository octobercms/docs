---
subtitle: 使用关联记录管理嵌套表单数据。
---
# 关联控制器

`Backend\Behaviors\RelationController` 类是一个控制器行为，用于轻松管理页面上复杂的[模型](../database/model.md)关联关系。

关联行为依赖于下面指定的关联类型。要使用关联行为，您应该将 `Backend\Behaviors\RelationController` 定义添加到控制器类的 `$implement` 字段中。同时，应定义 `$relationConfig` 类属性，其值应引用用于配置行为属性的 YAML 文件。

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

::: tip
通常关联控制器与[表单控制器](./form-controller.md)一起使用。
:::

## 配置关联行为

在 `$relationConfig` 属性中引用的配置文件以 YAML 格式定义。该文件应放置在[控制器的视图目录](../system/views.md)中。所需的配置取决于目标模型和关联模型之间的关联类型。

关联配置文件中的第一层字段定义了目标模型中的关联名称。例如：

```php
class Invoice extends Model
{
    public $hasMany = [
        'items' => \Acme\Pay\Models\InvoiceItem::class,
    ];
}
```

具有名为 `items` 关联的 `Invoice` 模型应使用相同的关联名称定义第一层字段。

```yaml
# config_relation.yaml
items:
    label: Invoice Line Item
    view:
        list: $/acme/pay/models/invoiceitem/columns.yaml
        toolbarButtons: create|delete
        recordsPerPage: 10
    manage:
        form: $/acme/pay/models/invoiceitem/fields.yaml
```

以下属性用于每个关联名称定义。

属性 | 描述
------------- | -------------
**label** | 关联的标签，使用单数形式，必需。
**view** | 特定于视图容器的配置，见下文。
**manage** | 特定于管理弹出窗口的配置，见下文。
**pivot** | 表单字段定义文件的引用，用于具有中间表数据的关联。
**emptyMessage** | 关联为空时显示的消息，可选。
**readOnly** | 禁用添加、更新、删除或创建关联的功能。默认值：`false`
**deferredBinding** | 当会话密钥可用时，[使用会话密钥延迟所有绑定操作](../database/relations.md)。默认值：`false`
**popupSize** | 更改所用管理弹出窗口的大小，可选值：`giant`、`huge`、`large`、`small`、`tiny` 或 `adaptive`。默认值：`huge`
**valueFrom** | 定义用于源值的自定义模型属性。默认值来自定义名称。

这些配置值可为 **view** 或 **manage** 属性指定，适用于列表、表单或两者兼有的渲染类型。

属性 | 类型 | 描述
------------- | ------------- | -------------
**form** | 表单 | 表单字段定义文件的引用，参见[后台表单字段](../../element/form-fields.md)。
**list** | 列表 | 列表列定义文件的引用，参见[后台列表列](../../element/list-columns.md)。
**showFlash** | 两者 | 在成功操作后启用闪存消息的显示。默认值：`true`
**showSearch** | 列表 | 显示用于搜索记录的输入框。默认值：`false`
**showSorting** | 列表 | 在每列上显示排序链接。默认值：`true`
**showSetup** | 列表 | 显示设置按钮以配置列表列和每页记录数。默认值：`false`
**defaultSort** | 列表 | 当用户未定义偏好时，设置默认排序列和方向。支持字符串或带有 `column` 和 `direction` 键的数组。方向可以是 `asc`（升序，默认）或 `desc`（降序）。
**recordsPerPage** | 列表 | 每页显示的最大行数。
**noRecordsMessage** | 列表 | 未找到记录时显示的消息，可引用[本地化字符串](../system/localization.md)。
**conditions** | 列表 | 指定应用于列表模型查询的原始 where 查询语句。
**scope** | 列表 | 指定在关联表单模型中定义的[模型查询作用域](../database/model.md)方法，始终应用于列表查询。此关联将附加到的模型（即父模型）作为第二个参数传递给此作用域方法（`$query` 是第一个参数）。
**searchMode** | 列表 | 定义搜索策略，可包含所有词、任意词或精确短语。支持的选项：`all`、`any`、`exact`。默认值：`all`。
**searchScope** | 列表 | 指定在关联表单模型中定义的[模型查询作用域](../database/model.md)方法，应用于搜索查询，第一个参数将包含搜索词。
**filter** | 列表 | 过滤器作用域定义文件的引用，参见[后台列表过滤器](../lists/filters.md)。
**customPageName** | 列表 | 指定在页面 URL 中用于分页记录的自定义变量名。设置为 `false` 可禁用在 URL 中存储页码。

这些配置值只能为 **view** 属性指定。

属性 | 类型 | 描述
------------- | ------------- | -------------
**showCheckboxes** | 列表 | 在每条记录旁边显示复选框。
**recordUrl** | 列表 | 将每条列表记录链接到另一个页面。例如：**users/update/:id**。`:id` 部分将被替换为记录标识符。
**customViewPath** | 列表 | 指定自定义视图路径以覆盖列表使用的局部视图。
**recordOnClick** | 列表 | 点击记录时执行的自定义 JavaScript 代码。
**toolbarPartial** | 两者 | 包含工具栏按钮的控制器局部视图文件引用。例如：`_relation_toolbar.php`。此属性会覆盖 `toolbarButtons` 属性。
**toolbarButtons** | 两者 | 要显示的按钮集合。可以格式化为数组或管道分隔的字符串，或设置为 `false` 以不显示按钮。可用选项有：`create`、`update`、`delete`、`add`、`remove`、`link` 和 `unlink`。示例：`add|remove`。
**structure** | 列表 | 用于启用列表[记录排序](../lists/structures.md)的选项。

这些配置值只能为 **manage** 属性指定。

属性 | 类型 | 描述
------------- | ------------- | -------------
**title** | 两者 | 弹出窗口标题，可引用[本地化字符串](../system/localization.md)。
**context** | 表单 | 显示的表单上下文。可以是字符串或带有 `create`、`update` 键的数组。

### 自定义消息

指定 `customMessages` 属性可覆盖关联控制器使用的默认消息。值可以是纯文本或引用[本地化字符串](../system/localization.md)。

```yaml
customMessages:
    buttonCreate: Make Thing
    buttonDelete: Destroy Thing
```

您还可以在显示的关联字段上下文中修改消息。以下示例将仅覆盖 `items` 关联的 `createButton` 消息。

```yaml
items:
    customMessages:
        buttonCreate: New Item!
```

以下消息可作为自定义消息进行覆盖。

::: details 查看可用消息列表
消息 | 默认消息
------------- | -------------
**buttonCreate** | Create :name
**buttonCreateForm** | Create
**buttonCancelForm** | Cancel
**buttonCloseForm** | Close
**buttonUpdate** | Update :name
**buttonUpdateForm** | Update
**buttonAdd** | Add :name
**buttonAddMany** | Add Selected
**buttonAddForm** | Add
**buttonLink** | Link :name
**buttonDelete** | Delete
**buttonDeleteMany** | Delete Selected
**buttonRemove** | Remove
**buttonRemoveMany** | Remove Selected
**buttonUnlink** | Unlink
**buttonUnlinkMany** | Unlink Selected
**confirmDelete** | Are you sure?
**confirmUnlink** | Are you sure?
**titlePreviewForm** | Preview :name
**titleCreateForm** | Create :name
**titleUpdateForm** | Update :name
**titleLinkForm** | Link a New :name
**titleAddForm** | Add a New :name
**titlePivotForm** | Related :name Data
**flashCreate** | :name Created
**flashUpdate** | :name Updated
**flashDelete** | :name Deleted
**flashAdd** | :name Added
**flashLink** | :name Linked
**flashRemove** | :name Removed
**flashUnlink** | :name Unlinked
:::

### 嵌套定义

关联控制器支持嵌套关联，换句话说，可以通过关联来管理关联。嵌套关联使用标准的字段嵌套语法。例如，`countries[cities]` 关联定义使 `cities` 关联可以通过 `countries` 关联来管理。

```yaml
countries:
    label: Country
    form: $/acme/location/models/country/fields.yaml
    list: $/acme/location/models/country/columns.yaml

countries[cities]:
    label: City
    form: $/acme/location/models/city/fields.yaml
    list: $/acme/location/models/city/columns.yaml
```

::: tip
嵌套关联定义被设计为可与[关联表单小部件](../../element/form/widget-relation.md)无缝配合使用，需将 `useController` 属性设置为 `true`。
:::

## 关联类型

关联管理器的显示方式取决于目标模型中的关联定义。关联类型也将决定配置要求，这些以**粗体**显示。以下关联类型可用：

### 一对多（Has Many）

1. 关联记录以列表形式显示（`view.list`）。
1. 点击记录将显示更新表单（`manage.form`）。
1. 点击 **添加** 将显示选择列表（`manage.list`）。
1. 点击 **创建** 将显示创建表单（`manage.form`）。
1. 点击 **删除** 将销毁记录。
1. 点击 **移除** 将解除关联关系。

例如，如果一篇**博客文章**有多条**评论**，目标模型设置为博客文章，使用 `list` 定义中的列显示评论列表。点击评论会打开一个弹出表单，其中包含 `form` 中定义的字段用于更新评论。也可以用同样的方式创建评论。以下是关联行为配置文件的示例。

```yaml
# config_relation.yaml
comments:
    label: Comment
    manage:
        form: $/acme/blog/models/comment/fields.yaml
        list: $/acme/blog/models/comment/columns.yaml
    view:
        list: $/acme/blog/models/comment/columns.yaml
        toolbarButtons: create|delete
```

### 多对多（Belongs to Many）

1. 关联记录以列表形式显示（`view.list`）。
1. 点击 **添加** 将显示选择列表（`manage.list`）。
1. 点击 **创建** 将显示创建表单（`manage.form`）。
1. 点击 **删除** 将销毁中间表记录。
1. 点击 **移除** 将解除关联关系。

例如，如果一个**用户**属于多个**角色**，目标模型设置为用户，使用 `list` 定义中的列显示角色列表。可以向用户添加和移除现有角色。以下是关联行为配置文件的示例。

```yaml
# config_relation.yaml
roles:
    label: Role
    view:
        list: $/acme/user/models/role/columns.yaml
        toolbarButtons: add|remove
    manage:
        list: $/acme/user/models/role/columns.yaml
        form: $/acme/user/models/role/fields.yaml
```

### 多对多（带中间表数据）

1. 关联记录以列表形式显示（`view.list`）。
1. 点击记录将显示更新表单（`pivot.form`）。
1. 点击 **添加** 将显示选择列表（`manage.list`），然后显示数据输入表单（`pivot.form`）。
1. 点击 **移除** 将销毁中间表记录。

继续**多对多**关联的示例，如果角色还带有过期日期，点击角色将打开一个弹出表单，其中包含 `pivot` 中定义的字段用于更新过期日期。以下是关联行为配置文件的示例。

```yaml
# config_relation.yaml
roles:
    label: Role
    view:
        list: $/acme/user/models/role/columns.yaml
    manage:
        list: $/acme/user/models/role/columns.yaml
    pivot:
        form: $/acme/user/models/role/fields.yaml
```

在定义表单字段和列表列时，中间表数据可通过 `pivot` 关联获得，请参见以下示例。

```yaml
# config_relation.yaml
teams:
    label: Team
    view:
        list:
            columns:
                name:
                    label: Name
                pivot[team_color]:
                    label: Team color
    manage:
        list:
            columns:
                name:
                    label: Name
    pivot:
        form:
            fields:
                pivot[team_color]:
                    label: Team color
```

### 属于（Belongs To）

1. 关联记录以预览表单形式显示（`view.form`）。
1. 点击 **创建** 将显示创建表单（`manage.form`）。
1. 点击 **更新** 将显示更新表单（`manage.form`）。
1. 点击 **关联** 将显示选择列表（`manage.list`）。
1. 点击 **取消关联** 将解除关联关系。
1. 点击 **删除** 将销毁记录。

例如，如果一个**手机**属于一个**人**，关联管理器将显示一个包含 `form` 中定义字段的表单。点击关联按钮将显示可与手机关联的人员列表。点击取消关联按钮将解除手机与人员的关联。

```yaml
# config_relation.yaml
person:
    label: Person
    view:
        form: $/acme/user/models/person/fields.yaml
        toolbarButtons: link|unlink
    manage:
        form: $/acme/user/models/person/fields.yaml
        list: $/acme/user/models/person/columns.yaml
```

### 一对一（Has One）

1. 关联记录以预览表单形式显示（`view.form`）。
1. 点击 **创建** 将显示创建表单（`manage.form`）。
1. 点击 **更新** 将显示更新表单（`manage.form`）。
1. 点击 **关联** 将显示选择列表（`manage.list`）。
1. 点击 **取消关联** 将解除关联关系。
1. 点击 **删除** 将销毁记录。

例如，如果一个**人**有一个**手机**，关联管理器将显示包含 `form` 中为手机定义的字段的表单。点击更新按钮时，会显示一个弹出窗口，字段变为可编辑。如果该人已有手机，则更新字段，否则为其创建新手机。

```yaml
# config_relation.yaml
phone:
    label: Phone
    view:
        form: $/acme/user/models/phone/fields.yaml
        toolbarButtons: update|delete
    manage:
        form: $/acme/user/models/phone/fields.yaml
        list: $/acme/user/models/phone/columns.yaml
```

## 显示关联管理器

在任何页面上管理关联之前，必须先在控制器中通过调用 `initRelation` 方法初始化目标模型。

```php
$post = Post::where('id', 7)->first();
$this->initRelation($post);
```

::: tip
[表单控制器](./form-controller.md)会在其创建、更新和预览操作中自动初始化模型。
:::

然后可以通过调用 `relationRender` 方法为指定的关联定义显示关联管理器。例如，如果您想在[预览](./form-controller.md)页面上显示关联管理器，**preview.htm** 视图内容可以如下所示。

```php
<?= $this->formRenderPreview() ?>

<?= $this->relationRender('comments') ?>
```

您可以通过将属性作为第二个参数传递来指示关联管理器以只读模式渲染。

```php
<?= $this->relationRender('comments', ['readOnly' => true]) ?>
```

## 扩展关联行为

有时您可能希望修改默认的关联行为，有几种方式可以实现。

### 扩展关联配置

提供了操作关联配置的机会。以下示例可用于根据模型的属性注入不同的 columns.yaml 文件。

```php
public function relationExtendConfig($config, $field, $model)
{
    // Make sure the model and field matches those you want to manipulate
    if (!$model instanceof MyModel || $field !== 'myField') {
        return;
    }

    // Show a different list for business customers
    if ($model->mode == 'b2b') {
        $config->view['list'] = '$/author/plugin_name/models/mymodel/b2b_columns.yaml';
    }
}
```

### 扩展视图小部件

提供了操作视图小部件的机会。例如，您可能希望根据模型的属性切换 showCheckboxes。

```php
public function relationExtendViewWidget($widget, $field, $model)
{
    // Make sure the model and field matches those you want to manipulate
    if (!$model instanceof MyModel || $field !== 'myField') {
        return;
    }

    if ($model->constant) {
        $widget->showCheckboxes = false;
    }
}
```

#### 如何移除列

由于在运行时周期的这个阶段小部件尚未完成初始化，您无法调用 `$widget->removeColumn()`。如[列表控制器文档](../lists/list-controller.md)中所述，`addColumns()` 方法将按预期工作，但要移除列，我们需要在 `relationExtendViewWidget()` 方法中监听 'list.extendColumns' 事件。以下示例展示了如何移除列。

```php
public function relationExtendViewWidget($widget, $field, $model)
{
    // Make sure the model and field matches those you want to manipulate
    if (!$model instanceof MyModel || $field !== 'myField') {
        return;
    }

    // This will work
    $widget->bindEvent('list.extendColumns', function () use ($widget) {
        $widget->removeColumn('my_column');
    });
}
```

### 扩展管理小部件

提供了操作关联的管理小部件的机会。

```php
public function relationExtendManageWidget($widget, $field, $model)
{
    // Make sure the field is the expected one
    if ($field !== 'myField') {
        return;
    }

    // Manipulate widget as needed
}
```

### 扩展中间表小部件

提供了操作关联的中间表小部件的机会。

```php
public function relationExtendPivotWidget($widget, $field, $model)
{
    // Make sure the field is the expected one
    if ($field !== 'myField') {
        return;
    }

    // Manipulate widget as needed
}
```

### 扩展过滤器小部件

有两个过滤器小部件可以使用以下方法进行扩展，一个用于 `RelationController` 的视图模式，一个用于管理模式。

```php
public function relationExtendViewFilterWidget($widget, $field, $model)
{
    // Extends the view filter widget
}

public function relationExtendManageFilterWidget($widget, $field, $model)
{
    // Extends the manage filter widget
}
```

有关如何以编程方式在过滤器小部件中添加或移除作用域的示例，请参阅[列表控制器文档](../lists/list-controller.md)中的**扩展过滤器作用域**部分。

### 扩展刷新结果

当管理小部件进行更改时，视图小部件通常会被刷新，您可以使用此方法在此过程中注入额外的容器。返回一个包含要发送到浏览器的额外值的数组，例如：

```php
public function relationExtendRefreshResults($field)
{
    // Make sure the field is the expected one
    if ($field !== 'myField') {
        return;
    }

    return ['#myCounter' => 'Total records: 6'];
}
```

#### 另请参阅

::: also
* [关联表单小部件](../../element/form/widget-relation.md)
* [条目内容字段](../../element/content/field-entries.md)
:::
