---
subtitle: A widget specifically made for use in a filter.
---
# Filter Widgets

With filter widgets you can add new scope types to the backend filters. They provide features that are common to filtering lists. Filter widgets must be registered in the [plugin registration file](../extending.md).

Filter Widget classes reside inside the **filterwidgets** directory of the plugin directory. The inner directory name matches the name of the widget class written in lowercase. Widgets can supply assets and partials. An example form widget directory structure looks like this.

::: dir
├── `filterwidgets`
|   ├── discount
|   |   ├── partials
|   |   |   └── _discount.htm  _← Partial File_
|   |   |   └── _discount_form.htm
|   |   └── assets
|   |       ├── js
|   |       |   └── discount.js  _← JavaScript File_
|   |       └── css
|   |           └── discount.css  _← StyleSheet File_
|   └── Discount.php  _← Widget Class_
:::

## Class Definition

The `create:filterwidget` command generates a backend filter widget, view and basic asset files. The first argument specifies the author and plugin name. The second argument specifies the form widget class name.

```bash
php artisan create:filterwidget Acme.Blog Discount
```

The filter widget classes must extend the `Backend\Classes\FilterWidgetBase` class. A registered widget can be used in the backend [filter field definition](../../element/filter-scopes.md) file. Example form widget class definition.

```php
namespace Backend\FilterWidgets;

use Backend\Classes\FilterWidgetBase;

class Discount extends FilterWidgetBase
{
    public function render() {}

    public function renderForm() {}
}
```

## Filter Widget Properties

Filter widgets may have properties that can be set using the [filter scope configuration](../../element/filter-scopes.md). Simply define the configurable properties on the class and then call the `fillFromConfig` method to populate them inside the `init` method definition.

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

The property values then become available to set from the [filter scope definition](../../element/filter-scopes.md) when using the widget.

```yaml
discount:
    label: Discount
    type: discount
    allowSearch: true
```

## Filter Widget Registration

Plugins should register filter widgets by overriding the `registerFilterWidgets` method inside the [plugin registration file](../extending.md). The method returns an array containing the widget class in the keys and widget short code as the value. Example:

```php
public function registerFilterWidgets()
{
    return [
        \Backend\FilterWidgets\Discount::class => 'discount',
    ];
}
```

The short code is used when referencing the widget in the filter scope definitions and it should be a unique value to avoid conflicts with other filter fields.

## Displaying the Filter State

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

## Displaying the Filter Form

When a user clicks on the filter label, a form is displayed so that they may specify how to apply the filter. The `renderForm` method is used to display the filter form and should correspond to a `_discount_form.php` partial.

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
The `$value` variable will contain an array of the selected values. This array will be merged with the `$scope` variable for convenience, so you can access the active value via `$scope->value`. In summary, use `$value` to check if a scope is applied and `$scope` to access the values.
:::

## Capturing the Filter Value

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

## Applying the Scope to the Query

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
