# 小部件

小部件是解决不同任务的独立功能块。 小部件始终有一个用户界面和一个后端控制器(小部件类)，用于准备小部件数据并处理小部件用户界面生成的 AJAX 请求。

## 通用小部件

小部件是前端 [组件](../cms/components.md) 的后端等价物。 它们是相似的，因为它们是模块化的功能包，提供部分功能并使用别名命名。 关键区别在于后端小部件使用 YAML 标记进行配置并将自己绑定到后端页面。

小部件类驻留在插件目录的 **widgets** 目录中。 目录名称与小写字母编写的小部件类的名称相匹配。 小部件可以提供资产和部件。 一个示例小部件目录结构如下所示：

```
widgets/
  form/
    partials/
      _form.htm     <=== 部件文件
    assets/
      js/
        form.js     <=== JavaScript 文件
      css/
        form.css    <=== 样式表文件
  Form.php          <=== 小部件类
```

### 类定义

通用小部件类必须扩展 `Backend\Classes\WidgetBase` 类。 与任何其他插件类一样，通用小部件控制器应属于 [插件命名空间](../plugin/registration.md#oc-plugin-namespaces)。 小部件控制器类定义示例：

```php
namespace Backend\Widgets;

use Backend\Classes\WidgetBase;

class Lists extends WidgetBase
{
    /**
     * @var string 用于标识此小部件的唯一别名。
     */
    protected $defaultAlias = 'list';

    // ...
}
```

小部件类必须包含一个 **render()** 方法，用于通过渲染小部件来生成小部件标记。例子：

```php
public function render()
{
    return $this->makePartial('list');
}
```

要将变量传递给局部变量，您可以将它们添加到 `$vars` 属性。

```php
public function render()
{
    $this->vars['var'] = 'value';

    return $this->makePartial('list');
}
```

或者，您可以将变量传递给 makePartial() 方法的第二个参数：

```php
public function render()
{
    return $this->makePartial('list', ['var' => 'value']);
}
```

<a id="oc-ajax-handlers"></a>
### AJAX 处理程序

小部件实现与 [后端控制器](controllers-ajax#oc-ajax) 相同的 AJAX 方法。 AJAX 处理程序是小部件类的公共方法，其名称以 **on** 前缀开头。 小部件 AJAX 处理程序和后端控制器的 AJAX 处理程序之间的唯一区别是，当您在小部件中引用它时，您应该使用小部件的 `getEventHandler` 方法来返回小部件的处理程序名称。

```php
<a
    href="javascript:;"
    data-request="<?= $this->getEventHandler('onPaginate') ?>"
    title="Next page">下一页</a>
```

当从小部件类或部件调用时，AJAX 处理程序将以自身为目标。例如，如果小部件使用 **mywidget** 的别名，则处理程序将以 `mywidget::onName` 为目标。以上将输出以下属性值：

```html
data-request="mywidget::onPaginate"
```

### 将小部件绑定到控制器

小部件应绑定到 [后端控制器](controllers-ajax)，然后您才能开始在后端页面或部件页面中使用它。 使用小部件的 `bindToController` 方法将其绑定到控制器。 初始化小部件的最佳位置是控制器的构造函数。 例子：

```php
public function __construct()
{
    parent::__construct();

    $myWidget = new MyWidgetClass($this);
    $myWidget->alias = 'myWidget';
    $myWidget->bindToController();
}
```

绑定小部件后，您可以在控制器的视图中访问它或通过其别名部分访问它：

```php
<?= $this->widget->myWidget->render() ?>
```

<a id="oc-form-widgets"></a>
## 表单小部件

使用表单小部件，您可以将新的控件类型添加到后端 [表单](../backend/forms.md)。 它们提供了为模型提供数据的常见功能。 表单小部件必须在 [插件注册文件](../plugin/registration.md#oc-registration-methods) 中注册。

表单小部件类驻留在插件目录的 **formwidgets** 目录中。 目录名称与小写字母编写的小部件类的名称相匹配。 小部件可以提供资产和部件。表单小部件目录结构示例：

```
formwidgets/
  form/
    partials/
      _form.htm     <=== 部件文件
    assets/
      js/
        form.js     <=== JavaScript 文件
      css/
        form.css    <=== 样式表文件
  Form.php          <=== 小部件类
```

### 类定义

表单小部件类必须扩展 `Backend\Classes\FormWidgetBase` 类。 与任何其他插件类一样，通用小部件控制器应属于 [插件命名空间](../plugin/registration.md#oc-plugin-namespaces)。 已注册的小部件可以在后端 [表单字段定义](../backend/forms.md#oc-defining-form-fields) 文件中使用。 示例表单小部件类定义：

```php
namespace Backend\FormWidgets;

use Backend\Classes\FormWidgetBase;

class CodeEditor extends FormWidgetBase
{
    /**
     * @var string 用于标识此小部件的唯一别名。
     */
    protected $defaultAlias = 'codeeditor';

    public function render() {}
}
```

### 表单小部件属性

表单小部件可能具有可以使用 [表单字段配置](../backend/forms.md#oc-defining-form-fields) 设置的属性。 只需在类上定义可配置属性，然后调用 `fillFromConfig` 方法将它们填充到 `init` 方法定义中。

```php
class DatePicker extends FormWidgetBase
{
    //
    // 可配置的属性
    //

    /**
     * @var string 显示方式：日期时间、日期、时间。
     */
    public $mode = 'datetime';

    /**
     * @var string 可以选择的最小/最早日期。
     * eg: 2000-01-01
     */
    public $minDate = null;

    /**
     * @var string 可以选择的最大/最晚日期。
     * eg: 2020-12-31
     */
    public $maxDate = null;

    //
    // 对象属性
    //

    /**
     * {@inheritDoc}
     */
    protected $defaultAlias = 'datepicker';

    /**
     * {@inheritDoc}
     */
    public function init()
    {
        $this->fillFromConfig([
            'mode',
            'minDate',
            'maxDate',
        ]);
    }

    // ...
}
```

然后，在使用小部件时，可以从 [表单字段定义](../backend/forms.md#oc-defining-form-fields) 设置属性值。

```yaml
born_at:
    label: 出生日期
    type: datepicker
    mode: date
    minDate: 1984-04-12
    maxDate: 2014-04-23
```

### 表单小部件注册

插件应该通过覆盖 [插件注册类](../plugin/registration.md#oc-registration-file) 中的 `registerFormWidgets` 方法来注册表单小部件。 该方法返回一个数组，其中包含键中的小部件类和小部件短代码作为值。 例子：

```php
public function registerFormWidgets()
{
    return [
        \Backend\FormWidgets\CodeEditor::class => 'codeeditor',
        \Backend\FormWidgets\RichEditor::class => 'richeditor'
    ];
}
```

短代码是可选的，可以在[表单字段定义](forms.md#field-widget)中引用小部件时使用，它应该是一个唯一的值，以避免与其他表单字段冲突。

### 加载表单数据

表单小部件的主要目的是与您的模型交互，这意味着在大多数情况下通过数据库加载和保存值。 当表单小部件呈现时，它将使用 `getLoadValue` 方法请求其存储的值。 `getId` 和 `getFieldName` 方法将返回表单中使用的 HTML 元素的唯一标识符和名称。 这些值通常在渲染时传递给小部件。

```php
public function render()
{
    $this->vars['id'] = $this->getId();
    $this->vars['name'] = $this->getFieldName();
    $this->vars['value'] = $this->getLoadValue();

    return $this->makePartial('myformwidget');
}
```

在基本级别上，表单小部件可以使用输入元素将用户输入值发回。 从上面的示例中，在 **myformwidget** 部件中，可以使用准备好的变量呈现元素。

```php
<input id="<?= $id ?>" name="<?= $name ?>" value="<?= e($value) ?>" />
```

### 保存表单数据

当需要获取用户输入并将其存储在数据库中时，表单小部件将在内部调用`getSaveValue`来请求该值。 要修改此行为，只需覆盖表单小部件类中的方法。

```php
public function getSaveValue($value)
{
    return $value;
}
```

在某些情况下，您故意不希望提供任何值，例如，显示信息而不保存任何内容的表单小部件。 返回从 `Backend\Classes\FormField` 类派生的名为 `FormField::NO_SAVE_DATA` 的特殊常量，以忽略该值。

```php
public function getSaveValue($value)
{
    return \Backend\Classes\FormField::NO_SAVE_DATA;
}
```

## Filter Widgets

With filter widgets you can add new scope types to the backend [filters](../backend/filters.md). They provide features that are common to filtering lists. Filter widgets must be registered in the [Plugin registration file](../plugin/registration.md#oc-registration-methods).

Filter Widget classes reside inside the **filterwidgets** directory of the plugin directory. The inner directory name matches the name of the widget class written in lowercase. Widgets can supply assets and partials. An example form widget directory structure looks like this:

::: dir
├── `filterwidgets`
|   ├── discount
|   |   ├── partials
|   |   |   └── _discount.htm _<== Partial File_
|   |   |   └── _discount_form.htm
|   |   └── assets
|   |       ├── js
|   |       |   └── discount.js _<== JavaScript File_
|   |       └── css
|   |           └── discount.css _<== StyleSheet File_
|   └── Discount.php _<== Widget Class_
:::

### Class Definition

The filter widget classes must extend the `Backend\Classes\FilterWidgetBase` class. A registered widget can be used in the backend [filter field definition](../backend/filters.md#oc-defining-filter-scopes) file. Example form widget class definition:

```php
namespace Backend\FilterWidgets;

use Backend\Classes\FilterWidgetBase;

class Discount extends FilterWidgetBase
{
    public function render() {}

    public function renderForm() {}
}
```

### Filter Widget Properties

Filter widgets may have properties that can be set using the [form field configuration](../backend/filters.md#oc-defining-filter-scopes). Simply define the configurable properties on the class and then call the `fillFromConfig` method to populate them inside the `init` method definition.

```php
class Discount extends FormWidgetBase
{
    /**
     * @var bool allowSearch show the search input in the dropdown
     */
    public $allowSearch = false;

    /**
     * init the widget
     */
    public function init()
    {
        $this->fillFromConfig([
            'allowSearch',
        ]);
    }

    // ...
}
```

The property values then become available to set from the [form field definition](../backend/forms.md#oc-defining-form-fields) when using the widget.

```yaml
discount:
    label: Discount
    type: discount
    allowSearch: true
```

### Filter Widget Registration

Plugins should register filter widgets by overriding the `registerFilterWidgets` method inside the [Plugin registration class](../plugin/registration.md#oc-registration-file). The method returns an array containing the widget class in the keys and widget short code as the value. Example:

```php
public function registerFilterWidgets()
{
    return [
        \Backend\FilterWidgets\Discount::class => 'discount',
    ];
}
```

The short code is used when referencing the widget in the filter scope definitions and it should be a unique value to avoid conflicts with other filter fields.

### Displaying the Filter State

The main purpose of the filter widget is to apply a scope to the query of a model, which means capturing values from the user first. The `render` method is used to display the initial state of the filter and the `filterScope` property will contain active value along with other configured properties.

```php
/**
 * render the filter state
 */
public function render()
{
    $this->vars['scope'] = $this->filterScope;
    $this->vars['name'] = $this->getScopeName();
    $this->vars['value'] = $this->getLoadValue();

    return $this->makePartial('discount');
}
```

At a basic level the filter widget should show a label and its current state to the user. The contents are also wrapped in an anchor that is used to display the filter form.

```php
<a
    href="javascript:;"
    class="filter-scope <?= $value ? 'active' : '' ?>"
    data-scope-name="<?= $name ?>"
>
    <span class="filter-label"><?= e(trans($scope->label)) ?></span>
    <?php if ($value): ?>
        <span class="filter-setting">1</span>
    <?php endif ?>
</a>
```

### Displaying the Filter Form

When a user clicks on the filter label, a form is displayed so that they may specify how to apply the filter. The `renderForm` method is used to display the filter form and should correspond to a `_discount_form.htm` partial.

```php
/**
 * renderForm for the filter
 */
public function renderForm()
{
    $this->vars['allowSearch'] = $this->allowSearch;
    $this->vars['scope'] = $this->filterScope;
    $this->vars['name'] = $this->getScopeName();
    $this->vars['value'] = $this->getLoadValue();

    return $this->makePartial('discount_form');
}
```

The contents should contain the form values and buttons to apply or clear the filter. A form HTML tag is not required and all inputs should belong to the `Filter[]` input array. The most common place to store the filtered value is the `value` attribute.

```php
<div class="filter-box">
    <div class="filter-facet">
        <div class="facet-item is-grow">
            <select name="Filter[value]" class="form-control custom-select <?= $allowSearch ? '' : 'select-no-search' ?> input-sm">
                <option value="1" <?= $scope->value === '1' ? 'selected="selected"' : '' ?>>has a discount</option>
                <option value="0" <?= $scope->value === '0' ? 'selected="selected"' : '' ?>>does not have a discount</option>
            </select>
        </div>
    </div>
    <div class="filter-buttons">
        <button class="btn btn-xs btn-primary" data-filter-action="apply">
            Apply
        </button>
        <div class="flex-grow-1"></div>
        <button class="btn btn-xs btn-secondary" data-filter-action="clear">
            Clear
        </button>
    </div>
</div>
```

> **Note**: The `$value` variable will contain an array of the selected values. This array will be merged with the `$scope` variable for convenience, so you can access the active value via `$scope->value`. In summary, use `$value` to check if a scope is applied and `$scope` to access the values.

### Capturing the Filter Value

The `getActiveValue` method is used to capture the filtered form values and storing them. It should return an array (or null) and use postback data for finding the values. If the `clearScope` postback value exists, it means the scope wants to be cleared. You may use the `hasPostValue` helper method to check if the value was found and is not an empty string.

```php
/**
 * getActiveValue
 */
public function getActiveValue()
{
    if (post('clearScope')) {
        return null;
    }

    if (!$this->hasPostValue('value')) {
        return null;
    }

    return post('Filter');
}
```

### Applying the Scope to the Query

Once a filter value has been captured it can be applied to the query with the `applyScopeToQuery` method. The value can be taken from the `filterScope->value` property where the `value` name comes from the filter form values.

```php
/**
 * applyScopeToQuery
 */
public function applyScopeToQuery($query)
{
    $hasDiscount = $this->filterScope->value;

    if ($hasDiscount) {
        $query->where('discount', '>', 0);
    }
    else {
        $query->where('discount', 0);
    }
}
```

## 报告小部件

报表小部件可用于后端仪表板和其他后端报表容器。 报告小部件必须在 [插件注册文件](../plugin/registration.md) 中注册。

> 您可以使用`create:reportwidget` 命令轻松构建报表小部件。 有关详细信息，请参阅 [脚手架命令](../console/scaffolding.md#oc-create-a-report-widget)。

### 报告小部件类

报告小部件类应扩展 `Backend\Classes\ReportWidgetBase` 类。 与任何其他插件类一样，通用小部件控制器应属于 [插件命名空间](../plugin/registration.md#oc-plugin-namespaces)。 该类应覆盖 `render` 方法以呈现小部件本身。 与所有后端小部件类似，报表小部件使用部件和特殊的目录布局。 示例目录布局：

```
plugins/
  rainlab/                    <=== 作者名称
    googleanalytics/          <=== 插件名称
      reportwidgets/          <=== 报告小部件目录
        trafficsources        <=== 小部件文件目录
          partials
            _widget.htm
        TrafficSources.php    <=== 小部件类文件
```

报告小部件类定义示例：

```php
namespace RainLab\GoogleAnalytics\ReportWidgets;

use Backend\Classes\ReportWidgetBase;

class TrafficSources extends ReportWidgetBase
{
    public function render()
    {
        return $this->makePartial('widget');
    }
}
```

小部件可以包含您希望在小部件中显示的任何 HTML 标记。 标记应使用 **report-widget** 类包装到 DIV 元素中。 最好使用 H3 元素输出小部件标题。 小部件示例：

```html
<div class="report-widget">
    <h3>流量来源</h3>

    <div
        class="control-chart"
        data-control="chart-pie"
        data-size="200"
        data-center-text="180">
        <ul>
            <li>直接访问 <span>1000</span></li>
            <li>社交网络 <span>800</span></li>
        </ul>
    </div>
</div>
```

![image](https://i.ibb.co/dcbDJNM/traffic-sources.png)

在报告小部件中，您可以使用任何 [图表](https://octobercms.com/docs/ui/chart)、列表或您希望的任何其他标记。 请记住，报告小部件扩展了通用后端小部件，您可以在报告小部件中使用任何小部件功能。 下一个示例显示了一个列表报告小部件标记。

```html
<div class="report-widget">
    <h3>首页</h3>

    <div class="table-container">
        <table class="table data" data-provides="rowlink">
            <thead>
                <tr>
                    <th><span>页面网址</span></th>
                    <th><span>浏览量</span></th>
                    <th><span>% 浏览量</span></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>/</td>
                    <td>90</td>
                    <td>
                        <div class="progress">
                            <div class="bar" style="90%"></div>
                            <a href="/">90%</a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>/docs</td>
                    <td>10</td>
                    <td>
                        <div class="progress">
                            <div class="bar" style="10%"></div>
                            <a href="/docs">10%</a>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
```

### 报告小部件属性

报告小部件可能具有用户可以通过检查器管理的属性：

![image](https://i.ibb.co/gPCKDL8/report-widget-inspector.png)

属性应该在小部件类的 `defineProperties` 方法中定义。 [组件文章](../plugin/components.md#oc-component-properties) 中描述了这些属性。 例子：

```php
public function defineProperties()
{
    return [
        'title' => [
            'title' => '小部件标题',
            'default' => '首页',
            'type' => 'string',
            'validationPattern' => '^.+$',
            'validationMessage' => '小部件标题是必需的。'
        ],
        'days' => [
            'title' => '显示数据的天数',
            'default' => '7',
            'type' => 'string',
            'validationPattern' => '^[0-9]+$'
        ]
    ];
}
```

### 报告小部件注册

插件可以通过覆盖[插件注册类](../plugin/registration.md#oc-registration-file)中的`registerReportWidgets`方法来注册报告小部件。 该方法应返回一个数组，其中包含键中的小部件类和值中的小部件配置(标签、上下文和所需权限)。 例子：

```php
public function registerReportWidgets()
{
    return [
        \RainLab\GoogleAnalytics\ReportWidgets\TrafficOverview::class => [
            'label' => '谷歌流量分析概览',
            'context' => 'dashboard',
            'permissions' => [
                'rainlab.googleanalytics.widgets.traffic_overview',
            ],
        ],
        \RainLab\GoogleAnalytics\ReportWidgets\TrafficSources::class => [
            'label' => '谷歌流量分析来源',
            'context' => 'dashboard',
            'permissions' => [
                'rainlab.googleanaltyics.widgets.traffic_sources',
            ],
        ]
    ];
}
```

**label** 元素定义添加小部件弹出窗口的小部件名称。 **context** 元素定义了可以使用小部件的上下文。 October 的报表小部件系统允许在任何页面上托管报表容器，并且容器上下文名称是唯一的。 仪表板页面上的小部件容器使用 **dashboard** 上下文。
