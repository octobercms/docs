---
subtitle: 为任何后台页面添加列表管理功能。
---
# 列表控制器

`Backend\Behaviors\ListController` 类是一个控制器行为，用于轻松地向页面添加记录列表。该行为提供可排序和可搜索的列表，记录上可选择性地添加链接。该行为提供控制器操作 `index`，但列表可以在任何地方渲染，并且可以使用多个列表定义。

列表行为依赖于列表[列定义](../../element/list-columns.md)和[模型类](../database/model.md)。要使用列表行为，您应该将其添加到控制器类的 `$implement` 属性中。同时，应定义 `$listConfig` 类属性，其值应引用用于配置行为属性的 YAML 文件。

```php
namespace Acme\Blog\Controllers;

class Categories extends \Backend\Classes\Controller
{
    public $implement = [
        \Backend\Behaviors\ListController::class
    ];

    public $listConfig = 'config_list.yaml';
}
```

::: tip
通常列表和[表单控制器](../forms/form-controller.md)会在同一个控制器中一起使用。
:::

## 配置列表行为

在 `$listConfig` 属性中引用的配置文件以 YAML 格式定义。该文件应放置在控制器的[视图目录](../system/controllers.md)中。以下是一个典型的列表行为配置文件示例。

```yaml
# config_list.yaml
title: Blog Posts
list: ~/plugins/acme/blog/models/post/columns.yaml
modelClass: Acme\Blog\Models\Post
recordUrl: acme/blog/posts/update/:id
```

以下属性在列表配置文件中是必需的。

属性 | 描述
------------- | -------------
**title** | 此列表的标题。
**list** | 配置数组或列表列定义文件的引用，参见[列表列](../../element/list-columns.md)。
**modelClass** | 模型类名，列表数据从此模型加载。

以下列出的配置属性是可选的。

属性 | 描述
------------- | -------------
**filter** | 过滤器配置，参见[列表过滤器](./filters.md)。
**recordUrl** | 将每条列表记录链接到另一个页面。例如：**users/update:id**。`:id` 部分将被替换为记录标识符。这允许您将列表行为与[表单行为](../forms/form-controller.md)链接起来。
**recordOnClick** | 点击记录时执行的自定义 JavaScript 代码。
**noRecordsMessage** | 未找到记录时显示的消息，可引用[本地化字符串](../system/localization.md)。
**deleteMessage** | 批量删除记录时显示的消息，可引用[本地化字符串](../system/localization.md)。
**noRecordsDeletedMessage** | 触发批量删除操作但没有记录被删除时显示的消息，可引用[本地化字符串](../system/localization.md)。
**recordsPerPage** | 每页显示的记录数，使用 0 表示不分页。默认值：`0`
**perPageOptions** | 每页项目数的选项。默认值：`[20, 40, 80, 100, 120]`
**showPageNumbers** | 分页时显示页码。禁用此项可在处理大型表时提高列表性能。默认值：`true`
**toolbar** | 工具栏小部件配置文件的引用，或包含配置的数组（见下文）。
**showSorting** | 在每列上显示排序链接。默认值：`true`
**defaultSort** | 当用户未定义偏好时，设置默认排序列和方向。支持字符串或带有 `column` 和 `direction` 键的数组。方向可以是 `asc`（升序，默认）或 `desc`（降序）。
**showCheckboxes** | 在每条记录旁边显示复选框。默认值：`false`。
**showSetup** | 显示列表列设置按钮。默认值：`false`。
**structure** | 启用结构化列表，详情请参阅[记录排序文章](./structures.md)。
**customViewPath** | 指定自定义视图路径以覆盖列表使用的局部视图，可选。
**customPageName** | 指定在页面 URL 中用于分页记录的自定义变量名。设置为 `false` 可禁用在 URL 中存储页码。默认值：`page`。

### 添加工具栏

要在列表中包含工具栏，请在列表配置 YAML 文件中添加以下配置：

```yaml
toolbar:
    buttons: list_toolbar
    search:
        prompt: Find records
```

工具栏配置允许：

属性 | 描述
------------- | -------------
**buttons** | 包含工具栏按钮的控制器局部视图文件引用。例如：**_list_toolbar.htm**
**search** | 搜索小部件配置文件的引用，或包含配置的数组。

搜索配置支持以下属性：

属性 | 描述
------------- | -------------
**prompt** | 没有活动搜索时显示的占位符，可引用[本地化字符串](../system/localization.md)。
**mode** | 定义搜索策略，可包含所有词、任意词或精确短语。支持的选项：`all`、`any`、`exact`。默认值：`all`。
**scope** | 指定在**列表模型**中定义的[模型查询作用域](../database/model.md)方法，应用于搜索查询。第一个参数将包含查询对象（与常规作用域方法相同），第二个参数将包含搜索词，第三个参数将是要搜索的列的数组。
**searchOnEnter** | 将此设置为 true 将使搜索小部件等待按下 Enter 键后才开始搜索（默认行为是在有人在搜索字段中输入内容并暂停片刻后自动开始搜索）。默认值：`false`。

上面引用的工具栏按钮局部视图应包含带有一些按钮的工具栏控件定义。该局部视图也可以包含带有图表的[记分板控件](https://octobercms.com/docs/ui/scoreboard)。以下是一个工具栏局部视图的示例，其中 **New Post** 按钮引用了[表单行为](forms.md)提供的 **create** 操作：

```php
<div data-control="toolbar">
    <a href="<?= Backend::url('acme/blog/posts/create') ?>"
        class="btn btn-primary oc-icon-plus">
        New Post
    </a>
</div>
```

使用列表复选框时，您可以使用 `data-list-checked-trigger` 属性切换按钮的启用状态。

```php
<button
    type="button"
    class="btn btn-primary"
    data-list-checked-trigger>
    Delete Selected
</button>
```

您也可以使用 `data-list-checked-request` 属性将选中的值传递给 AJAX 请求。

```php
<button
    type="button"
    class="btn btn-primary"
    data-request="onDelete"
    data-list-checked-request>
    Delete Selected
</button>
```

### 过滤列表

要通过用户定义的输入过滤列表，请在 YAML 文件中添加以下列表配置：

```yaml
filter: $/acme/blog/models/post/scopes.yaml
```

**filter** 属性应引用[过滤器配置文件](./filters.md)路径或提供包含配置的数组。

## 定义列表列

::: aside
可用的列表列属性可在[列表列定义](../../element/list-columns.md)页面找到。
:::

列表列通过 YAML 文件定义。列配置被列表行为用于创建记录表和在表格单元格中显示模型列。该文件放置在插件 **models** 目录的子目录中。子目录名称与小写的模型类名匹配。文件名没有限制，但 **columns.yaml** 和 **list_columns.yaml** 是常用名称。列表列文件位置示例：

::: dir
├── plugins
|   └── acme
|       └── blog
|           └── `models`
|               ├── post  _← 配置目录_
|               |   └── columns.yaml  _← 配置文件_
|               └── Post.php  _← 模型类_
:::

以下示例展示了列表列定义文件的典型内容。

```yaml
# columns.yaml
columns:
    name: Name
    email: Email
```

## 显示列表

通常列表在[索引视图](../system/views.md)文件中显示。由于列表包含工具栏，视图文件将仅包含单个 `listRender` 方法调用。

```php
<?= $this->listRender() ?>
```

## 多个列表定义

列表行为可以使用命名定义在同一控制器中支持多个列表。`$listConfig` 属性可以定义为数组，其中键是定义名称，值是配置文件。

```php
public $listConfig = [
    'templates' => 'config_templates_list.yaml',
    'layouts' => 'config_layouts_list.yaml'
];
```

然后可以通过在调用 `listRender` 方法时将定义名称作为第一个参数传递来显示每个定义。

```php
<?= $this->listRender('templates') ?>
```

## 扩展列表行为

有时您可能希望修改默认的列表行为，有几种方式可以实现。

### 扩展列表配置

您可以使用 `listGetConfig` 方法动态扩展列表配置。

```php
public function listGetConfig($definition)
{
    $config = $this->asExtension('ListController')->listGetConfig($definition);

    // Implement structure dynamically
    $config->structure = [
        'showTree' => true
    ];

    return $config;
}
```

### 覆盖控制器操作

您可以在控制器中使用自己的逻辑来实现 `index` 操作方法，然后可选地调用列表行为的 `index` 父方法。

```php
public function index()
{
    //
    // Do any custom code here
    //

    // Call the ListController behavior index() method
    $this->asExtension('ListController')->index();
}
```

### 覆盖视图

`ListController` 行为有一个主容器视图，您可以通过在控制器目录中创建名为 `_list_container.php` 的特殊文件来覆盖它。以下示例将向列表添加侧边栏：

```php
<?php if ($toolbar): ?>
    <?= $toolbar->render() ?>
<?php endif ?>

<?php if ($filter): ?>
    <?= $filter->render() ?>
<?php endif ?>

<div class="row row-flush">
    <div class="col-sm-3">
        [Insert sidebar here]
    </div>
    <div class="col-sm-9 list-with-sidebar">
        <?= $list->render() ?>
    </div>
</div>
```

该行为将调用一个 `Lists` 小部件，该小部件还包含许多您可以覆盖的视图。这可以通过指定列表配置选项中描述的 `customViewPath` 属性来实现。小部件将首先在此路径中查找视图，然后回退到默认位置。

```yaml
# Custom view path
customViewPath: $/acme/blog/controllers/reviews/list
```

::: tip
使用子目录（例如名为 `list`）以避免冲突是一个好做法。
:::

例如，要修改列表主体行标记，请在控制器目录中创建名为 `list/_list_body_row.php` 的文件。

```php
<tr>
    <?php foreach ($columns as $key => $column): ?>
        <td><?= $this->getColumnValue($record, $column) ?></td>
    <?php endforeach ?>
</tr>
```

### 扩展列定义

您可以通过绑定 `backend.list.extendColumns` [全局事件](../services/event.md)从外部扩展另一个控制器的列。事件函数将接收一个 `$list` 参数，代表 `Backend\Widgets\Lists` 对象，您可以使用 `getController` 和 `getModel` 方法来检查执行上下文。

由于此事件可能影响所有列表，因此必须检查控制器和模型是否为正确的类型。以下是使用 `addColumns` 方法向事件日志列表添加新列并修改现有列的示例。

```php
Event::listen('backend.list.extendColumns', function($list) {
    if (
        !$list->getController() instanceof \System\Controllers\EventLogs ||
        !$list->getModel() instanceof \System\Models\EventLog
    ) {
        return;
    }

    // Add a new column
    $list->addColumns([
        'my_column' => [
            'label' => 'My Column'
        ]
    ]);

    // Modify an existing column
    $list->getColumn('title')->useConfig([
        'path' => 'column_title'
    ]);
});
```

您还可以通过在控制器类中覆盖 `listExtendColumns` 方法来内部扩展列表列。这只会影响 `ListController` 行为使用的列表。

```php
class Categories extends \Backend\Classes\Controller
{
    public $implement = [
        \Backend\Behaviors\ListController::class
    ];

    public function listExtendColumns($list)
    {
        $list->addColumns([...]);

        $list->getColumn(...);
    }
}
```

以下方法在 `$list` 对象上可用。

方法 | 描述
------------- | -------------
**addColumns** | 向列表添加新列
**removeColumn** | 从列表移除列
**getColumn** | 返回现有列定义

每个方法接受类似于[列表列配置](../../element/list-columns.md)的列数组。

### 注入 CSS 行类

您可以通过在控制器类上添加 `listInjectRowClass` 方法来注入自定义 CSS 行类。此方法可接受两个参数，**$record** 代表单个模型记录，**$definition** 包含列表小部件定义的名称。您可以返回包含行类的任何字符串值。这些类将被添加到行的 HTML 标记中。

```php
class Lessons extends \Backend\Classes\Controller
{
    // ...

    public function listInjectRowClass($lesson, $definition = null)
    {
        // Strike through past lessons
        if ($lesson->lesson_date->lt(Carbon::today())) {
            return 'strike';
        }
    }
}
```

有一个特殊的 CSS 类 `nolink`，即使列表小部件定义了 `recordUrl` 或 `recordOnClick` 属性，也可强制行不可点击。在事件中返回此类将允许您使记录不可点击——例如，用于软删除的行或信息行：

```php
public function listInjectRowClass($record, $value)
{
    if ($record->trashed()) {
        return 'nolink';
    }
}
```

### 覆盖列 URL

您可以通过覆盖 `listOverrideRecordUrl` 方法来指定列记录的点击操作。此方法可以返回一个字符串作为新的后台 URL 或一个包含复杂定义的数组。

```php
public function listOverrideRecordUrl($record, $definition = null)
{
    if ($record->is_active) {
        return "acme/test/services/preview/{$record->id}";
    }
}
```

要覆盖 onclick 行为，返回一个带有 `onclick` 键的数组，并将 `url` 设置为 null。

```php
public function listOverrideRecordUrl($record, $definition = null)
{
    if ($record->is_banned) {
        return ['onclick' => "alert('Unable to click')", 'url' => null];
    }
}
```

要使列完全不可点击，返回一个将 `clickable` 键设置为 false 的数组。

```php
public function listOverrideRecordUrl($record, $definition = null)
{
    if ($record->is_disabled) {
        return ['clickable' => false];
    }
}
```

### 扩展过滤器作用域

您可以通过绑定 `backend.filter.extendScopes` [全局事件](../services/event.md)来扩展另一个控制器的过滤器作用域。此方法可接受参数 `$filter`，代表 `Backend\Widgets\Filter` 对象，您可以使用 `getController`、`getModel` 和 `getContext` 方法来检查执行上下文。

由于此事件可能影响所有过滤器，因此必须检查控制器和模型是否为正确的类型。以下是使用 `addScopes` 方法向事件日志列表添加新字段并调整 CSS 类的示例。

```php
Event::listen('backend.filter.extendScopes', function($filter) {
    if (
        !$filter->getController() instanceof \System\Controllers\EventLogs ||
        !$filter->getModel() instanceof \System\Models\EventLog
    ) {
        return;
    }

    // Add a new scope
    $filter->addScopes([
        'my_scope' => [
            'label' => 'My Filter Scope'
        ]
    ]);

    // Add custom CSS classes to the filter widget
    $filter->cssClasses = array_merge(
        $filter->cssClasses,
        ['my-array', 'of-classes']
    );
});
```

您也可以在控制器类内部扩展过滤器作用域，只需覆盖 `listFilterExtendScopes` 方法。

```php
class Categories extends \Backend\Classes\Controller
{
    public $implement = [
        \Backend\Behaviors\ListController::class
    ];

    public function listFilterExtendScopes($filter)
    {
        $filter->addScopes([...]);
    }
}
```

以下方法在 `$filter` 对象上可用。可用的作用域与[列表过滤器配置](./filters.md)相同。

方法 | 描述
------------- | -------------
**addScopes** | 使用[列表过滤器配置](./filters.md)向过滤器小部件添加新作用域
**removeScope** | 从过滤器小部件移除作用域
**getScope** | 返回现有作用域定义

#### 扩展过滤器响应

`listExtendRefreshResults` 方法可以在列表更新时与 AJAX 更新响应交互，并应返回额外的局部视图更新数组。`listGetFilterWidget` 将返回过滤器小部件以访问作用域。

```php
public function listExtendRefreshResults($filter, $result)
{
    $statusCode = $this->listGetFilterWidget()->getScope('status_code')->value;

    return ['#my-partial-id' => $this->makePartial(...)];
}
```

### 扩展模型查询

可以通过在控制器类中覆盖 `listExtendQuery` 方法来扩展列表[数据库模型](../database/model.md)的查询。此示例将确保软删除的记录包含在列表数据中，方法是对查询应用 **withTrashed** 作用域。

```php
public function listExtendQuery($query)
{
    $query->withTrashed();
}
```

在同一控制器中处理多个列表定义时，您可以使用 `listExtendQuery` 的第二个参数，该参数包含定义的名称。

```php
public $listConfig = [
    'inbox' => 'config_inbox_list.yaml',
    'trashed' => 'config_trashed_list.yaml'
];

public function listExtendQuery($query, $definition)
{
    if ($definition === 'trashed') {
        $query->onlyTrashed();
    }
}
```

您也可以连接其他表以辅助搜索和排序。以下示例将连接 `post_statuses` 表并将 `status_sort_order` 和 `status_name` 列引入查询。

```php
public function listExtendQuery($query, $definition = null)
{
    $query->leftJoin('post_statuses', 'posts.status_id', 'post_statuses.id');

    $query->addSelect(
        'post_statuses.sort_order as status_sort_order',
        'post_statuses.name as status_name'
    );
}
```

也可以通过覆盖 `listFilterExtendQuery` 方法来扩展[列表过滤器](./filters.md)模型查询。

```php
public function listFilterExtendQuery($query, $scope)
{
    if ($scope->scopeName == 'status') {
        $query->where('status', '<>', 'all');
    }
}
```

### 扩展记录集合

可以通过在控制器类中覆盖 `listExtendRecords` 方法来扩展列表使用的记录集合。此示例使用[记录集合](../database/collection.md)上的 `sort` 方法来更改记录的排序顺序。

```php
public function listExtendRecords($records)
{
    return $records->sort(function ($a, $b) {
        return $a->computedVal() > $b->computedVal();
    });
}
```

### 自定义列类型

自定义列表列类型可以通过[插件注册文件](../extending.md)的 `registerListColumnTypes` 方法在后台注册。该方法应返回一个数组，其中键是类型名称，值是可调用函数。可调用函数接收三个参数：原生的 `$value`、`$column` 定义对象和模型 `$record` 对象。

```php
public function registerListColumnTypes()
{
    return [
        // A local method, i.e $this->evalUppercaseListColumn()
        'uppercase' => [$this, 'evalUppercaseListColumn'],

        // Using an inline closure
        'loveit' => function($value) { return "I love {$value}"; }
    ];
}

public function evalUppercaseListColumn($value, $column, $record)
{
    return strtoupper($value);
}
```

使用自定义列表列类型就像使用 `type` 属性按名称调用它一样简单。

```yaml
# columns.yaml
columns:
    secret_code:
        label: Secret code
        type: uppercase
```
