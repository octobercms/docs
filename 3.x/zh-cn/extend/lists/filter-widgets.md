---
subtitle: 专门用于过滤器的小部件。
---
# 过滤器小部件

通过过滤器小部件，您可以向后台过滤器添加新的作用域类型。它们提供了过滤列表的常见功能。过滤器小部件必须在[插件注册文件](../extending.md)中注册。

过滤器小部件类位于插件目录的 **filterwidgets** 目录中。内部目录名称与小写的小部件类名匹配。小部件可以提供资源文件和局部视图。过滤器小部件目录结构示例如下。

::: dir
├── `filterwidgets`
|   ├── discount
|   |   ├── partials
|   |   |   └── _discount.php  _← 局部视图文件_
|   |   |   └── _discount_form.php
|   |   └── assets
|   |       ├── js
|   |       |   └── discount.js  _← JavaScript 文件_
|   |       └── css
|   |           └── discount.css  _← 样式表文件_
|   └── Discount.php  _← 小部件类_
:::

## 类定义

`create:filterwidget` 命令生成后台过滤器小部件、视图和基本资源文件。第一个参数指定作者和插件名称。第二个参数指定表单小部件类名。

```bash
php artisan create:filterwidget Acme.Blog Discount
```

过滤器小部件类必须继承 `Backend\Classes\FilterWidgetBase` 类。注册后的小部件可以在后台[过滤器字段定义](../../element/filter-scopes.md)文件中使用。过滤器小部件类定义示例。

```php
namespace Backend\FilterWidgets;

use Backend\Classes\FilterWidgetBase;

class Discount extends FilterWidgetBase
{
    public function render() {}

    public function renderForm() {}
}
```

## 过滤器小部件属性

过滤器小部件可以具有使用[过滤器作用域配置](../../element/filter-scopes.md)设置的属性。只需在类上定义可配置属性，然后在 `init` 方法定义中调用 `fillFromConfig` 方法来填充它们。

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

使用小部件时，属性值可以从[过滤器作用域定义](../../element/filter-scopes.md)中设置。

```yaml
discount:
    label: Discount
    type: discount
    allowSearch: true
```

## 过滤器小部件注册

插件应通过在[插件注册文件](../extending.md)中覆盖 `registerFilterWidgets` 方法来注册过滤器小部件。该方法返回一个数组，键为小部件类，值为小部件短代码。示例：

```php
public function registerFilterWidgets()
{
    return [
        \Backend\FilterWidgets\Discount::class => 'discount',
    ];
}
```

短代码在过滤器作用域定义中引用小部件时使用，它应该是唯一值以避免与其他过滤器字段冲突。

## 显示过滤器状态

过滤器小部件的主要目的是对模型的查询应用作用域，这意味着首先需要从用户捕获值。`render` 方法用于显示过滤器的初始状态，`filterScope` 属性将包含活动值以及其他配置属性。

```php
public function render()
{
    $this->vars['scope'] = $this->filterScope;
    $this->vars['name'] = $this->getScopeName();
    $this->vars['value'] = $this->getLoadValue();

    return $this->makePartial('discount');
}
```

在基本级别上，过滤器小部件应向用户显示标签及其当前状态。内容还包装在一个锚点中，用于显示过滤器表单。

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

## 显示过滤器表单

当用户点击过滤器标签时，将显示一个表单，以便他们可以指定如何应用过滤器。`renderForm` 方法用于显示过滤器表单，应对应于 `_discount_form.php` 局部视图。

```php
public function renderForm()
{
    $this->vars['allowSearch'] = $this->allowSearch;
    $this->vars['scope'] = $this->filterScope;
    $this->vars['name'] = $this->getScopeName();
    $this->vars['value'] = $this->getLoadValue();

    return $this->makePartial('discount_form');
}
```

内容应包含表单值和应用或清除过滤器的按钮。不需要表单 HTML 标签，所有输入应属于 `Filter[]` 输入数组。存储过滤值的最常见位置是 `value` 属性。

```php
<div class="filter-box">
    <div class="filter-facet">
        <div class="facet-item is-grow">
            <select name="Filter[value]" class="form-control form-control-sm custom-select <?= $allowSearch ? '' : 'select-no-search' ?>">
                <option value="1" <?= $scope->value === '1' ? 'selected="selected"' : '' ?>>has a discount</option>
                <option value="0" <?= $scope->value === '0' ? 'selected="selected"' : '' ?>>does not have a discount</option>
            </select>
        </div>
    </div>
    <div class="filter-buttons">
        <button class="btn btn-sm btn-primary" data-filter-action="apply">
            Apply
        </button>
        <div class="flex-grow-1"></div>
        <button class="btn btn-sm btn-secondary" data-filter-action="clear">
            Clear
        </button>
    </div>
</div>
```

::: tip
`$value` 变量将包含所选值的数组。为方便起见，此数组将与 `$scope` 变量合并，因此您可以通过 `$scope->value` 访问活动值。总之，使用 `$value` 检查作用域是否已应用，使用 `$scope` 访问值。
:::

## 捕获过滤器值

`getActiveValue` 方法用于捕获过滤器表单值并存储它们。它应返回一个数组（或 null），并使用回发数据查找值。如果存在 `clearScope` 回发值，则表示作用域要被清除。您可以使用 `hasPostValue` 辅助方法检查值是否已找到且不是空字符串。

```php
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

## 将作用域应用于查询

一旦捕获了过滤器值，就可以使用 `applyScopeToQuery` 方法将其应用于查询。该值可以从 `filterScope->value` 属性获取，其中 `value` 名称来自过滤器表单值。

```php
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

## 使用内联过滤器

内联过滤器是可以作为主过滤器界面一部分存在的过滤器，而不是将它们显示为弹出表单。因此，在过滤器小部件类中，`renderForm` 方法不是必需的，只有 `render` 方法用于显示过滤器内容。

下面的示例展示了带有搜索按钮的内联搜索过滤器。需要注意的是，由于过滤器是内联的，输入字段名称在主表单中是共享的，因此搜索输入使用 `$name` 变量，而不是通用的 `Filter` 名称。

```php
<?php
    $activeValue = $scope->scopeValue !== null ? $scope->value : $scope->default;
?>
<div
    class="filter-scope scope-inline"
    data-scope-name="<?= $scope->scopeName ?>">
    <input
        placeholder="<?= e($this->getHeaderValue($scope)) ?>"
        name="<?= $name ?>[value]"
        value="<?= e($activeValue) ?>"
        class="form-control form-control-sm" />
    <button
        class="btn btn-sm btn-search"
        data-filter-action="apply">
        <i class="icon-search"></i>
    </button>
</div>
```

下面的示例展示了一个内联气泡选择器控件。

```php
<?php
    $activeValue = $scope->scopeValue !== null ? $scope->value : $scope->default;
?>
<div
    data-scope-name="<?= $scope->scopeName ?>"
    data-control="balloon-selector"
    data-selector-allow-empty
    class="filter-scope scope-inline control-balloon-selector form-control-sm">
    <ul class="list-unstyled m-0">
        <?php foreach ((array) $scope->options as $key => $value): ?>
            <li
                data-value="<?= $key ?>"
                class="small <?= $key === $activeValue ? 'active' : '' ?>"
                data-filter-action="apply">
                <?= $value ?>
            </li>
        <?php endforeach ?>
    </ul>
    <!-- Hidden input to store the selected filter value -->
    <input type="hidden" name="<?= $name ?>[value]" value="<?= $activeValue ?>">
</div>
```
