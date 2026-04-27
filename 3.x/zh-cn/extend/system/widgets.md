---
subtitle: 解决不同任务的自包含功能块。
---
# 小部件

小部件是可复用的控件，具有用户界面和后端控制器（小部件类），用于准备小部件数据和处理由小部件用户界面生成的 AJAX 请求。

## 通用小部件

小部件是 [CMS 组件](../../cms/themes/components.md)的后端等效物。它们相似之处在于都是模块化的功能包，提供局部视图并使用别名命名。关键区别在于后端小部件使用 YAML 标记进行配置，并手动绑定到后端控制器。

小部件类位于插件目录的 **widgets** 目录中。内部目录名称与以小写形式书写的小部件类名匹配。小部件可以提供资源文件和局部视图。以下是小部件目录结构的示例：

::: dir
├── `widgets`
|   ├── form
|   |   ├── partials
|   |   |   └── _form.php  _← 局部视图文件_
|   |   └── assets
|   |       ├── js
|   |       |   └── form.js  _← JavaScript 文件_
|   |       └── css
|   |           └── form.css  _← 样式表文件_
|   └── Form.php  _← 小部件类_
:::

### 类定义

通用小部件类必须继承 `Backend\Classes\WidgetBase` 类。与任何其他插件类一样，通用小部件控制器应属于[插件命名空间](./plugins.md)。以下是小部件类定义的示例。

```php
namespace Backend\Widgets;

use Backend\Classes\WidgetBase;

class Lists extends WidgetBase
{
    /**
     * @var string defaultAlias to identify this widget.
     */
    protected $defaultAlias = 'list';

    // ...
}
```

小部件类必须包含一个 **render()** 方法，通过渲染小部件局部视图来生成小部件标记。示例：

```php
public function render()
{
    return $this->makePartial('list');
}
```

要向局部视图传递变量，你可以将它们添加到 `$vars` 属性。

```php
public function render()
{
    $this->vars['var'] = 'value';

    return $this->makePartial('list');
}
```

或者，你可以将变量传递给 makePartial() 方法的第二个参数：

```php
public function render()
{
    return $this->makePartial('list', ['var' => 'value']);
}
```

## 将小部件绑定到控制器

::: aside
绑定到控制器也是使 [AJAX 处理程序可用](./ajax.md)所必需的。
:::

在你可以在后端页面或局部视图中使用小部件之前，应将其绑定到后端控制器。使用小部件的 `bindToController` 方法将其绑定到控制器。初始化小部件的最佳位置是控制器的 `beforeDisplay` 方法，该方法从构造函数中调用。

例如，创建一个新的小部件实例并将其绑定到控制器。注意构造函数将控制器作为第一个参数。

```php
public function beforeDisplay()
{
    $myWidget = new MyWidgetClass($this);
    $myWidget->alias = 'myWidget';
    $myWidget->bindToController();
}
```

绑定小部件后，你可以在控制器的视图或局部视图中通过其别名使用 `$this->widget` 属性访问它。

```php
<?= $this->widget->myWidget->render() ?>
```

## 在 AJAX 处理程序之前运行代码

有时你可能希望在 AJAX 处理程序执行之前执行代码。在小部件中定义 `init` 方法允许代码在每个 AJAX 处理程序之前运行。

```php
function init()
{
    // From a widget class
}
```

#### 另请参阅

::: also
* [表单小部件](../forms/form-widgets.md)
* [过滤器小部件](../lists/filter-widgets.md)
* [报表小部件](../backend/report-widgets.md)
:::
