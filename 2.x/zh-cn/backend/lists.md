# 列表

**List Behavior** 是一个控制器修饰符，用于轻松地将记录列表添加到页面。 该行为提供了可排序和可搜索的列表及其记录上的可选链接。 该行为提供了控制器操作`索引`，但是列表可以在任何地方呈现，并且可以使用多个列表定义。

列表行为取决于列表 [列表字段](#defining-list-columns) 和 [模型类](../database/model.md)。 为了使用列表行为，您应该将其添加到控制器类的 `$implement` 属性中。 此外，应定义 `$listConfig` 类属性，其值应参考用于配置行为选项的 YAML 文件。

```php
namespace Acme\Blog\Controllers;

class Categories extends \Backend\Classes\Controller
{
    public $implement = [
        \Backend\Behaviors\ListController::class
    ];

    public $listConfig = 'list_config.yaml';
}
```

> **注意**：列表和 [表单行为](../backend/forms.md) 通常在同一个控制器中一起使用。

## 配置列表行为

`$listConfig` 属性中引用的配置文件以 YAML 格式定义。 该文件应放置在控制器的 [视图目录](controllers-ajax.md) 中。 下面是一个典型的列表行为配置文件示例：

```yaml
# ===================================
#  List Behavior Config[列表行为配置]
# ===================================

title: 博客文章
list: ~/plugins/acme/blog/models/post/columns.yaml
modelClass: Acme\Blog\Models\Post
recordUrl: acme/blog/posts/update/:id
```

列表配置文件中需要以下字段：

字段 | 描述
------------- | -------------
**title** | 此列表的标题。
**list** | 配置数组或对列表字段定义文件的引用，请参阅 [列表字段](#defining-list-columns)。
**modelClass** | 一个模型类名，列表数据是从这个模型加载的。

下面列出的配置选项是可选的。

选项 | 描述
------------- | -------------
**filter** | 过滤器配置，参见[过滤列表](#filtering-the-list)。
**recordUrl** | 将每个列表记录链接到另一个页面。例如：**users/update:id**。 `:id` 部分被替换为记录标识符。这允许您链接列表行为和 [表单行为](forms.md)。
**recordOnClick** | 单击记录时要执行的自定义 JavaScript 代码。
**noRecordsMessage** | 未找到记录时显示的消息，可以参考 [多语言字符串](../plugin/localization.md)。
**deleteMessage** | 批量删除记录时显示的消息，可以参考 [多语言字符串](../plugin/localization.md)。
**noRecordsDeletedMessage** | 当触发批量删除操作但没有删除记录时显示的消息，可以引用 [多语言字符串](../plugin/localization.md)。
**recordsPerPage** | 每页显示的记录，使用 0 表示无分页。默认值：0
**perPageOptions** | 每页项目数的选项。默认值：[20、40、80、100、120]
**showPageNumbers** | 显示带分页的页码。在处理大型表时禁用此选项以提高列表性能。默认值：true
**toolbar** | 参考工具栏小部件配置文件，或具有配置的数组(见下文)。
**showSorting** | 在每一列上显示排序链接。默认值：true
**defaultSort** | 当未定义用户首选项时，设置默认的排序列和方向。支持带有键 `column` 和 `direction` 的字符串或数组。
**showCheckboxes** | 在每条记录旁边显示复选框。默认值：false。
**showSetup** | 显示列表字段设置按钮。默认值：false。
**structure** | 启用结构化列表，请参阅 [排序和重新排序文章](../backend/reorder.md) 了解更多详细信息。
**customViewPath** | 指定自定义视图路径以覆盖列表使用的部件，可选。

### 添加工具栏

要在列表中包含工具栏，请将以下配置添加到列表配置 YAML 文件中：

```yaml
toolbar:
    buttons: list_toolbar
    search:
        prompt: 查找记录
```

工具栏配置允许：

选项 | 描述
------------- | -------------
**buttons** | 使用工具栏按钮对控制器部件文件的引用。 例如：**_list_toolbar.htm**
**search** | 对搜索小部件配置文件或带有配置的数组的引用。

搜索配置支持以下选项：

选项 | 描述
------------- | -------------
**prompt** | 没有活动搜索时显示的占位符，可以参考 [多语言字符串](../plugin/localization.md)。
**mode** | 将搜索策略定义为包含所有单词、任何单词或精确短语。 支持的选项： all(全部), any(任意), exact(精确)。 默认值：all。
**scope** | 指定**列表模型**中定义的 [查询范围方法](../database/model.md#oc-query-scopes) 以应用于搜索查询。 第一个参数将包含查询对象(根据常规范围方法)，第二个将包含搜索词，第三个将是要搜索的字段的数组。
**searchOnEnter** | 将此设置为 true 将使搜索小部件在开始搜索之前等待按下 Enter 键(默认行为是在有人在搜索字段中输入内容后自动开始搜索，然后暂停片刻)。 默认值：false。

上面提到的工具栏按钮应该包含带有一些按钮的工具栏部件定义。 部件还可以包含带有图表的 [记分板控件](controls.md#oc-scoreboards)。 带有 **新帖子** 按钮的工具栏部分示例，指的是 [表单行为](forms.md) 提供的 **create** 操作：
```php
<div data-control="toolbar">
    <a
        href="<?= Backend::url('acme/blog/posts/create') ?>"
        class="btn btn-primary oc-icon-plus">新帖子</a>
</div>
```

### 过滤列表

要按用户定义的输入过滤列表，请将以下列表配置添加到 YAML 文件：

```yaml
filter: config_filter.yaml
```

**filter** 选项应引用 [过滤器配置文件](#using-list-filters) 路径或提供带有配置的数组。

## 定义列表字段

列表字段是使用 YAML 文件定义的。 列表行为使用字段配置来创建记录表并在表单元格中显示模型字段。 该文件被放置在插件的 **models** 目录的子目录中。 子目录名称与小写的模型类名称相匹配。 文件名无关紧要，但 **columns.yaml** 和 **list_columns.yaml** 是常用名称。 示例列表字段文件位置：

```
plugins/
  acme/
    blog/
      models/                <=== 插件模型目录
        post/                <=== 模型配置目录
          list_columns.yaml  <=== 模型列表字段配置文件
        Post.php             <=== 模型类
```

下一个示例显示了列表字段定义文件的典型内容。

```yaml
# ===================================
#  List Column Definitions[列表字段定义]
# ===================================

columns:
    name: 姓名
    email: 电子邮件
```

### 字段选项

对于每一字段都可以指定这些选项(如果适用)：

选项 | 描述
------------- | -------------
**label** | 向用户显示列表字段时的名称。
**type** | 定义如何呈现此字段(请参阅下面的 [字段类型](#available-column-types))。
**default** | 如果值为空，则指定字段的默认值。
**searchable** | 将此字段包含在列表搜索结果中。默认值：false。
**invisible** | 指定此字段是否默认隐藏。默认值：false。
**sortable** | 指定此字段是否可以排序。默认值：true。
**clickable** | 如果设置为 false，则禁用单击字段时的默认单击行为。默认值：true。
**select** | 定义用于该值的自定义 SQL 选择语句。
**valueFrom** | 定义用于源值的模型属性。
**displayFrom** | 定义用于显示值的模型属性。
**relation** | 定义模型关系字段。
**relationCount** | 将相关记录的数量显示为字段值。必须与 `relation` 选项一起使用。默认值：false
**cssClass** | 将 CSS 类分配给字段容器。
**headCssClass** | 将 CSS 类分配给字段标题容器。
**width** | 设置字段宽，可以以百分比 (10%) 或像素 (50px) 指定。可能有一个没有指定宽度的字段，它将被拉伸自适应。
**align** | 指定字段对齐方式。可能的值是 `left`、`right` 和 `center`。
**permissions** | 当前后端用户必须拥有的 [权限](users.md#oc-users-and-permissions) 才能使用该列。支持单个权限的字符串或仅需要一个权限即可授予访问权限的权限数组。

### 自定义值选择

可以更改每列字段的源值和显示值。如果要从另一字段获取字段值，请使用 `valueFrom` 选项。

```yaml
other_name:
    label: 好东西
    valueFrom: name
```

如果要保留源字段值但显示与模型属性不同的值，请使用 `displayFrom` 选项。

```yaml
status_code:
    label: 状态
    displayFrom: status_label
```

这主要适用于 [模型存取器](../database/mutators.md#oc-accessors-mutators) 用于修改显示值的情况。这在您想要显示某个值但按不同值排序和搜索时很有用。

```php
public function getStatusLabelAttribute()
{
    return title_case($this->status_code);
}
```

### 嵌套字段选择

在某些情况下，从嵌套数据结构中检索字段值是有意义的，例如 [模型关联](../database/relations.md) 字段或 [jsonable 数组](../database/model.md #property-jsonable)。这样做的唯一缺点是该字段不能使用可搜索或可排序的选项。

```yaml
content[title]:
    name: 标题
    sortable: false
```

上面的示例将分别在 PHP 中查找相当于 `$record->content->title` 或 `$record->content['title']` 的值。为了使该字段可搜索并且出于性能原因，我们建议使用 [模型事件](../database/model.md#oc-events) 在本地数据库表中复制其值。

## 可用的字段类型

有多种字段类型可用于 **type** 设置，它们控制列表字段的显示方式。除了下面指定的原生字段类型外，您还可以[定义自定义字段类型](#custom-column-types)。

<div class="content-list" markdown="1">

- [文本](#column-text)
- [图片](#column-image)
- [数字](#column-number)
- [开关](#column-switch)
- [日期和时间](#column-datetime)
- [日期](#column-date)
- [时间](#column-time)
- [时间差](#column-timesince)
- [时态](#column-timetense)
- [Select](#column-select)
- [选择](#column-selectable)
- [关系](#column-relation)
- [部件](#column-partial)
- [颜色选择器](#column-colorpicker)

</div>
<a name="column-text"></a>

### 文本

`text` - 显示一个文本字段，左对齐

```yaml
full_name:
    label: 姓名
    type: text
```

<a name="column-image"></a>
### 图片

`image` - 显示带有调整输出大小选项的图像字段。

```yaml
avatar:
    label: 头像
    type: image
    sortable: false
    width: 150
    height: 150
    options:
        quality: 80
```

有关支持哪些选项的更多信息，请参阅 [图像调整大小文章](../services/resizer.md#oc-resize-parameters)。

<a name="column-number"></a>
### 数字

`number` - 显示一个数字字段，右对齐

```yaml
age:
    label: 年龄
    type: number
```

您还可以指定自定义数字格式，例如货币 **$99.00**。

```yaml
price:
    label: 价格
    type: number
    format: "$%.2f"
```

> **注意**：`text`和`number`字段都支持`format`属性作为字符串值，该属性遵循[PHP sprintf()函数](https://secure.php)的格式化规则.net/manual/en/function.sprintf.php)

<a name="column-switch"></a>
### 开关

`switch` - 显示布尔字段的开或关状态。

```yaml
enabled:
    label: 启用
    type: switch
```

您可以通过将数组传递给带有 false 和 true 标签的 `options` 值来自定义开关文本。

```yaml
enabled:
    label: 启用
    type: switch
    options:
        - 关
        - 开
```

<a name="column-datetime"></a>
### 日期和时间

`datetime` - 将字段值显示为格式化的日期和时间。下一个示例将日期显示为 **Thu, Dec 25, 1975 2:15 PM**。

```yaml
created_at:
    label: 日期
    type: datetime
```

您还可以指定自定义日期格式，例如 **Thursday 25th of December 1975 02:15:16 PM**。

```yaml
created_at:
    label: 日期
    type: datetime
    format: l jS \of F Y h:i:s A
```

显示值会自动转换为后端时区首选项，您可以使用 `useTimezone` 选项禁用它。

```yaml
created_at:
    label: 日期
    type: datetime
    useTimezone: false
```

> **注意**：`useTimezone` 选项也适用于其他与日期和时间相关的字段类型，包括 `date`、`time`、`timesince` 和 `timetense`。

<a name="column-date"></a>
### 日期

`date` - 将字段值显示为日期格式 **M j, Y**。

```yaml
created_at:
    label: 日期
    type: date
```

默认情况下，后端时区首选项不会应用于此值。如果日期包含时间，您可以使用 `useTimezone` 选项转换时区。

```yaml
created_at:
    label: 日期
    type: date
    useTimezone: true
```

> **注意**：默认情况下，`date` 和 `time` 字段不应用后端时区转换，因为转换都需要日期和时间。

<a name="column-time"></a>
### 时间

`time` - 将字段值显示为时间格式 **g:i A**。

```yaml
created_at:
    label: 日期
    type: time
```

<a name="column-timesince"></a>
### 时间差

`timesince` - 显示从值到当前时间的人类可读时间差。例如：**10分钟前**

```yaml
created_at:
    label: 日期
    type: timesince
```

<a name="column-timetense"></a>
### 时态

`timetense` - 使用当前日期的语法时态显示24小时制时间和日期。例如：**今天 12:49**、**昨天 4:00** 或 **2015 年 9 月 18 日 14:33**。

```yaml
created_at:
    label: 日期
    type: timetense
```

<a name="column-select"></a>
### Select

`select` - 允许使用自定义选择语句创建字段。任何有效的 SQL SELECT 语句都可以在这里使用。

```yaml
full_name:
    label: 姓名
    select: concat(first_name, ' ', last_name)
```

<a name="column-selectable"></a>
### 选择

`selectable` - 获取字段值并将其与记录的可用选项中的值匹配。以下面的数组为例，如果记录值设置为 `open`，那么 **Open** 值会显示在字段中。

```php
['open' => 'Open', 'closed' => 'Closed']
```

可用选项在模型上定义为 [下拉选项](forms.md#oc-field-dropdown)。

```yaml
status:
    label: 状态
    type: selectable
```

它们也可以在 `options` 值中明确指定。

```yaml
status:
    label: 状态
    type: selectable
    options:
        pending: 未处理
        active: 处理
```

<a name="column-relation"></a>
### 关系

`relation` - 允许显示相关字段，您可以提供关系选项。此选项的值必须是模型上活动记录[关系](../database/relations.md) 的名称。在下一个示例中，**name** 值将被转换为相关模型中的名称属性(例如：`$model->name`)。

```yaml
group_name:
    label: 组
    relation: groups
    select: name
```

要显示相关记录数量的字段，请使用`relationCount`选项。

```yaml
users_count:
    label: 用户
    relation: users
    relationCount: true
    type: number
```

> **注意**：注意不要将关系命名为与现有数据库字段相同。例如，使用名称 `group_id` 可能会由于命名冲突而破坏组关系。

<a name="column-partial"></a>
### 部件

`partial` - 渲染部件，`path` 值可以引用部件视图文件，否则字段名称用作部件名称。

```yaml
content:
    label: 内容
    type: partial
    path: ~/plugins/acme/blog/models/comment/_content_column.htm
```

在部件内部，这些变量可用：`$value` 是默认单元格值，`$record` 是用于单元格的模型，`$column` 是配置的类对象 `Backend\Classes\ListColumn`。这是 **_content_column.htm** 文件的一些示例内容。

```php
<?php if ($record->is_active): ?>
    <?= e($value) ?>
<?php endif ?>
```

<a name="column-colorpicker"></a>
### 颜色选择器

`colorpicker` - 显示颜色选择器字段中的颜色

```yaml
color:
    label: 背景
    type: colorpicker
```

## 显示列表

通常列表显示在索引 [视图](controllers-ajax.md) 文件中。由于列表包括工具栏，因此视图文件将仅包含单个 `listRender` 方法调用。

```php
<?= $this->listRender() ?>
```

## 多个列表定义

列表行为可以使用命名定义支持同一控制器中的多个列表。 `$listConfig` 属性可以定义为一个数组，其中键是定义名称，值是配置文件。

```php
public $listConfig = [
    'templates' => 'config_templates_list.yaml',
    'layouts' => 'config_layouts_list.yaml'
];
```

然后可以通过在调用 `listRender` 方法时将定义名称作为第一个参数传递过来，以此显示不同列表：

```php
<?= $this->listRender('templates') ?>
```

## 使用列表过滤器

可以通过 [添加过滤器定义](#filtering-the-list) 到列表配置来过滤列表。类似地，过滤器由它们自己的包含过滤器范围的配置文件驱动，每个范围都是可以过滤列表的一个方面。下一个示例显示了过滤器定义文件的典型内容。

```yaml
# ===================================
# Filter Scope Definitions [过滤范围定义]
# ===================================

scopes:

    category:
        label: 类别
        modelClass: Acme\Blog\Models\Category
        conditions: category_id in (:filtered)
        nameFrom: name

    status:
        label: 状态
        type: group
        conditions: status in (:filtered)
        options:
            pending: Pending
            active: Active
            closed: Closed

    published:
        label: 隐藏已发布
        type: checkbox
        default: 1
        conditions: is_published <> true

    approved:
        label: 批准
        type: switch
        default: 2
        conditions:
            - is_approved <> true
            - is_approved = true

    created_at:
        label: 日期
        type: date
        conditions: created_at >= ':filtered'

    published_at:
        label: 日期
        type: daterange
        conditions: created_at >= ':after' AND created_at <= ':before'
```

### 范围选项

对于每个范围，您可以指定这些选项(如果适用)：

选项 | 描述
------------- | -------------
**label** | 向用户显示过滤器范围时的名称。
**type** | 定义应如何呈现此范围(请参阅下面的 [范围类型](#available-scope-types))。默认值：group。
**conditions** | 指定要应用于列表模型查询的原始 where 查询语句，`:filtered` 参数表示过滤后的值。
**scope** | 指定**列表模型**中定义的[查询范围方法](../database/model.md#oc-query-scopes)以应用于列表查询。第一个参数将包含查询对象(根据常规范围方法)，第二个参数将包含过滤后的值
**options** | 如果按多个项目过滤时使用的选项，此选项可以在 `modelClass` 模型中指定数组或方法名称。
**emptyOption** | 故意为空的选择的可选标签。
**nameFrom** | 如果按多个项目过滤，则为名称显示的属性，取自`modelClass`模型的所有记录。
**default** | 可以是整数(开关、复选框、数字)或数组(组、日期范围、数字范围)或字符串(日期)。
**permissions** | 当前后端用户必须拥有的 [权限](users.md#oc-users-and-permissions) 才能使用过滤器范围。支持单个权限的字符串或仅需要一个权限即可授予访问的权限数组。
**dependsOn** | 此范围[依赖](#filter-scope-dependencies)的字符串或其他范围名称的数组。当修改其他范围时，此范围将更新。

### 过滤依赖项

过滤器作用域可以通过定义`dependsOn` [作用域选项](#scope-options)来声明对其他作用域的依赖关系，它提供了一个服务器端解决方案，用于在修改它们的依赖关系时更新作用域。当声明为依赖项的范围发生变化时，定义范围将动态更新。这提供了更改要提供给范围的可用选项的机会。

```yaml
country:
    label: 国家
    type: group
    conditions: country_id in (:filtered)
    modelClass: October\Test\Models\Location
    options: getCountryOptions

city:
    label: 城市
    type: group
    conditions: city_id in (:filtered)
    modelClass: October\Test\Models\Location
    options: getCityOptions
    dependsOn: country
```

在上面的示例中，当 `country` 范围发生变化时，`city` 范围将刷新。任何定义了 `dependsOn` 属性的作用域都将作为由作用域名称作为键的数组传递给过滤器小部件的所有当前作用域对象，包括它们的当前值。

```php
public function getCountryOptions()
{
    return Country::lists('name', 'id');
}

public function getCityOptions($scopes = null)
{
    if (!empty($scopes['country']->value)) {
        return City::whereIn('country_id', array_keys($scopes['country']->value))
            ->lists('name', 'id')
        ;
    }
    else {
        return City::lists('name', 'id');
    }
}
```

> **注意**：仅在此阶段支持具有 `type: group` 的范围依赖项。

### 可用范围类型

这些类型可用于确定应如何显示过滤器范围。

<div class="content-list" markdown="1">

- [分组](#filter-group)
- [复选框](#filter-checkbox)
- [开关](#filter-switch)
- [日期](#filter-date)
- [日期范围](#filter-daterange)
- [数字](#filter-number)
- [数字范围](#filter-numberrange)
- [文本](#filter-text)

</div>
<a name="filter-group"></a>

### 分组

`group` - 按一组项目过滤列表，通常按相关模型，并且需要 `nameFrom` 或 `options` 定义。例如：状态名称为打开、关闭等。

```yaml
status:
    label: 状态
    type: group
    conditions: status in (:filtered)
    default:
        pending: 待办
        active: 处理
    options:
        pending: 待办
        active: 处理
        closed: 关闭
```

<a name="filter-checkbox"></a>
### 复选框

`checkbox` - 用作二进制复选框以将预定义的条件或查询应用于列表，打开或关闭。使用 0 表示关闭，使用 1 表示默认值

```yaml
published:
    label: 隐藏已发布
    type: checkbox
    default: 1
    conditions: is_published <> true
```

<a name="filter-switch"></a>
### 开关

`switch` - 用作在两个预定义条件或对列表的查询之间切换的开关，可以是不确定的，也可以是打开的或关闭的。使用 0 表示关闭，1 表示不确定，2 表示默认值

```yaml
approved:
    label: 批准
    type: switch
    default: 1
    conditions:
        - is_approved <> true
        - is_approved = true
```

<a name="filter-date"></a>
### 日期

`date` - 显示要选择的单个日期的日期选择器。可在条件属性中使用的值是：

- `:filtered`: 选择的日期格式为 `Y-m-d`
- `:before`：选择的日期格式为 `Y-m-d 00:00:00`，从后端时区转换为应用时区
- `:after`：选择的日期格式为 `Y-m-d 23:59:59`，从后端时区转换为应用时区

```yaml
created_at:
    label: 日期
    type: date
    minDate: '2001-01-23'
    maxDate: '2030-10-13'
    yearRange: 10
    conditions: created_at >= ':filtered'
```

<a name="filter-daterange"></a>
### 日期范围

`daterange` - 显示两个日期的日期选择器作为日期范围。 可在条件属性中使用的值是：

  - `:before`：选定的`之前`日期，格式为 `Y-m-d H:i:s`
  - `:beforeDate`：选定的`之前`日期，格式为 `Y-m-d`
  - `:after`：选定的`之后`日期，格式为 `Y-m-d H:i:s`
  - `:afterDate`：选定的`之后`日期，格式为 `Y-m-d`

```yaml
published_at:
    label: 日期
    type: daterange
    minDate: '2001-01-23'
    maxDate: '2030-10-13'
    yearRange: 10
    conditions: created_at >= ':after' AND created_at <= ':before'
```

使用日期和日期范围的默认值

```php
\MyController::extendListFilterScopes(function($filter) {
    $widget->addScopes([
        'Date Test' => [
            'label' => '日期测试',
            'type' => 'daterange',
            'default' => $this->myDefaultTime(),
            'conditions' => "created_at >= ':after' AND created_at <= ':before'"
        ],
    ]);
});

// 返回值必须是 carbon 的实例
public function myDefaultTime()
{
    return [
        0 => Carbon::parse('2012-02-02'),
        1 => Carbon::parse('2012-04-02'),
    ];
}
```

<!--
You may also wish to set `useTimezone: false` to prevent a timezone conversion between the date that is displayed and the date stored in the database, since by default the backend timezone preference is applied to the display value.

    published_at:
        label: 日期
        type: daterange
        minDate: '2001-01-23'
        maxDate: '2030-10-13'
        yearRange: 10
        conditions: created_at >= ':after' AND created_at <= ':before'
        useTimezone: false

> **Note**: the `useTimezone` option also applies to the `date` filter type as well.
-->

<a name="filter-number"></a>
### 数字

`number` - 显示单个数字的输入。 该值可在条件属性中用作 `:filtered`。

```yaml
age:
    label: 年龄
    type: number
    default: 14
    conditions: age >= ':filtered'
```

<a name="filter-numberrange"></a>
### 数字范围

`numberrange` - 显示两个数字的输入，作为数字范围。 可在条件属性中使用的值是：

- `:min`: 最小值，默认为 -2147483647
- `:max`: 最大值，默认为 2147483647

您可以将最小值留空以搜索直到最大值的所有内容。反之亦然，您可以将最大值留空以搜索至最小值的所有内容。

```yaml
visitors:
    label: 访客人数
    type: numberrange
    default:
        0: 10
        1: 20
    conditions: visitors >= ':min' and visitors <= ':max'
```

<a name="filter-text"></a>
### 文本

`text` - 显示要输入的字符串。 您可以指定将在输入大小属性中注入`size`属性(默认值：10)。

```yaml
username:
    label: 用户名
    type: text
    conditions: username = :value
    size: 2
```

## 扩展列表行为

有时您可能希望修改默认列表行为，有几种方法可以做到这一点。

### 覆盖控制器操作

您可以在控制器中为 `index` 操作方法使用自己的逻辑，然后可以选择调用 List 行为 `index` 父方法。

```php
public function index()
{
    //
    // 在这里放任何自定义代码
    //

    // 调用 ListController 行为 index() 方法
    $this->asExtension('ListController')->index();
}
```

### 覆盖视图

`ListController` 行为有一个主容器视图，您可以通过在控制器目录中创建一个名为 `_list_container.htm` 的特殊文件来覆盖它。以下示例将向列表添加侧边栏：

```php
<?php if ($toolbar): ?>
    <?= $toolbar->render() ?>
<?php endif ?>

<?php if ($filter): ?>
    <?= $filter->render() ?>
<?php endif ?>

<div class="row row-flush">
    <div class="col-sm-3">
        [在此处插入侧边栏]
    </div>
    <div class="col-sm-9 list-with-sidebar">
        <?= $list->render() ?>
    </div>
</div>
```

该行为将调用一个`Lists`小部件，该小部件还包含许多您可以覆盖的视图。这可以通过指定一个 `customViewPath` 选项来实现，如 [列表配置选项](#configuring-the-list-behavior) 中所述。小部件将首先在此路径中查找视图，然后回退到默认位置。

```yaml
# 自定义视图路径
customViewPath: $/acme/blog/controllers/reviews/list
```

> **注意**：最好使用子目录，例如 `list`，以避免冲突。

例如，要修改列表正文行标记，请在控制器目录中创建一个名为 `list/_list_body_row.htm` 的文件。

```php
<tr>
    <?php foreach ($columns as $key => $column): ?>
        <td><?= $this->getColumnValue($record, $column) ?></td>
    <?php endforeach ?>
</tr>
```

### 扩展列表字段

您可以通过调用控制器类上的`extendListColumns`静态方法从外部扩展另一个控制器的列。此方法可以接受两个参数，**$list** 将代表 Lists 小部件对象，**$model** 代表列表使用的模型。以这个控制器为例：

```php
class Categories extends \Backend\Classes\Controller
{
    public $implement = ['Backend.Behaviors.ListController'];

    public $listConfig = 'list_config.yaml';
}
```

使用 `extendListColumns` 方法，您可以向此控制器呈现的任何列表添加额外的列。最好检查 **$model** 的类型是否正确。这是一个例子：

```php
Categories::extendListColumns(function($list, $model) {
    if (!$model instanceof MyModel) {
        return;
    }

    $list->addColumns([
        'my_column' => [
            'label' => '我的栏目'
        ]
    ]);

});
```

您还可以通过覆盖控制器类中的 `listExtendColumns` 方法在内部扩展列表字段。

```php
class Categories extends \Backend\Classes\Controller
{
    // ...

    public function listExtendColumns($list)
    {
        $list->addColumns([...]);
    }
}
```

$list 对象可以使用以下方法。

方法 | 描述
------------- | -------------
**addColumns** | 向列表中添加新字段
**removeColumn** | 从列表中删除一字段

每个方法都采用类似于 [列表字段配置](#defining-list-columns) 的字段数组。

### 注入 CSS 行类

您可以通过在控制器类上添加 `listInjectRowClass` 方法来注入自定义 css 行类。此方法可以采用两个参数，**$record** 将表示单个模型记录，**$definition** 包含 List 小部件定义的名称。您可以返回包含您行类的任何字符串值。这些类将添加到行的 HTML 标记中。

```php
class Lessons extends \Backend\Classes\Controller
{
    // ...

    public function listInjectRowClass($lesson, $definition = null)
    {
        // 回顾过去的教训
        if ($lesson->lesson_date->lt(Carbon::today())) {
            return 'strike';
        }
    }
}
```

一个特殊的 CSS 类 `nolink` 可用于强制行不可点击，即使为 List 小部件定义了 `recordUrl` 或 `recordOnClick` 选项。在事件中返回此类将允许您使记录不可点击 - 例如，对于软删除的行或信息行：

```php
public function listInjectRowClass($record, $value)
{
    if ($record->trashed()) {
        return 'nolink';
    }
}
```

### 覆盖字段 URL

您可以通过覆盖 `listOverrideRecordUrl` 方法来指定字段记录的单击操作。此方法可以返回新后端 URL 的字符串或具有复杂定义的数组。

```php
public function listOverrideRecordUrl($record, $definition = null)
{
    if ($record->is_active) {
        return 'acme/test/services/preview/' . $record->id;
    }
}
```

要覆盖 onclick 行为，请返回一个带有 `onclick` 键的数组，并将 `url` 更改为 null。

```php
public function listOverrideRecordUrl($record, $definition = null)
{
    if ($record->is_banned) {
        return ['onclick' => "alert('Unable to click')", 'url' => null];
    }
}
```

要使列完全不可点击，请返回一个数组，其中 `clickable` 键设置为 false。

```php
public function listOverrideRecordUrl($record, $definition = null)
{
    if ($record->is_disabled) {
        return ['clickable' => false];
    }
}
```

### 扩展过滤器范围

您可以通过调用控制器类上的 `extendListFilterScopes` 静态方法从外部扩展另一个控制器的过滤器范围。此方法可以采用参数 **$filter** 来表示过滤器小部件对象。以这个控制器为例：

```php
Categories::extendListFilterScopes(function($filter) {
    // 将自定义 CSS 类添加到过滤器小部件本身
    $filter->cssClasses = array_merge($filter->cssClasses, ['my', 'array', 'of', 'classes']);

    $filter->addScopes([
        'my_scope' => [
            'label' => '我的过滤范围'
        ]
    ]);
});
```

> 提供的范围数组类似于 [列表过滤器配置](#using-list-filters)。

您也可以在内部将过滤器范围扩展到控制器类，只需覆盖 `listFilterExtendScopes` 方法。

```php
class Categories extends \Backend\Classes\Controller
{
    // ...

    public function listFilterExtendScopes($filter)
    {
        $filter->addScopes([...]);
    }
}
```

$filter 对象可以使用以下方法。

方法 | 描述
------------- | -------------
**addScopes** | 为过滤器小部件添加新范围
**removeScope** | 从过滤器小部件中删除范围

### 扩展模型查询

可以通过覆盖控制器类中的 `listExtendQuery` 方法来扩展列表 [数据库模型](../database/model.md) 的查找查询。此示例将通过将 **withTrashed** 范围应用于查询来确保软删除的记录包含在列表数据中：

```php
public function listExtendQuery($query)
{
    $query->withTrashed();
}
```

在同一个控制器中处理多个列表定义时，可以使用 `listExtendQuery` 的第二个参数，其中包含定义的名称：

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

您还可以加入其他表格以帮助搜索和排序。下面将加入 `post_statuses` 表，并在查询中引入 `status_sort_order` 和 `status_name` 字段。

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

[列表过滤器](#using-list-filters) 模型查询也可以通过覆盖 `listFilterExtendQuery` 方法来扩展：

```php
public function listFilterExtendQuery($query, $scope)
{
    if ($scope->scopeName == 'status') {
        $query->where('status', '<>', 'all');
    }
}
```

### 扩展记录集合

列表使用的记录集合可以通过覆盖控制器类中的 `listExtendRecords` 方法来扩展。此示例使用 [记录集合](../database/collection.md) 上的 `sort` 方法来更改记录的排序顺序。

```php
public function listExtendRecords($records)
{
    return $records->sort(function ($a, $b) {
        return $a->computedVal() > $b->computedVal();
    });
}
```

### 自定义字段类型

自定义列表字段类型可以通过[插件注册类](../plugin/registration.md#oc-registration-methods)的`registerListColumnTypes`方法在后端注册。该方法应返回一个数组，其中键是类型名称，值是可调用函数。可调用函数接收三个参数，本机`$value`、`$column` 定义对象和模型`$record` 对象。

```php
public function registerListColumnTypes()
{
    return [
        // 本地方法，即 $this->evalUppercaseListColumn()
        'uppercase' => [$this, 'evalUppercaseListColumn'],

        // 使用内联闭包
        'loveit' => function($value) { return 'I love '. $value; }
    ];
}

public function evalUppercaseListColumn($value, $column, $record)
{
    return strtoupper($value);
}
```

使用自定义列表字段类型就像使用 `type` 选项按名称调用它一样简单。

```yaml
# ===================================
#  List Column Definitions[列出列表字段]
# ===================================

columns:
    secret_code:
        label: 密码
        type: uppercase
```
