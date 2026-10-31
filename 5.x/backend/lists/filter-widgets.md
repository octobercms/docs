---
previousPath: extend/lists/filter-widgets.md
subtitle: Build your own scope type for backend list filters with a filter widget.
---
# Custom Filter Widgets

A filter widget adds a new scope type to backend list filters. Build one when the built-in [filter scopes](../../handbook/filter-scopes.md) don't provide the filter you need.

```bash
php artisan create:filterwidget Acme.Blog Discount
```

The `create:filterwidget` command generates a filter widget class, its views and basic asset files. The first argument is the author and plugin name, and the second is the filter widget class name.

## Creating a Filter Widget

Filter widget classes live in the **filterwidgets** directory of a plugin. The inner directory is named after the widget class in lowercase, and holds the widget's partials and assets.

::: dir
├── `filterwidgets`
|   ├── discount
|   |   ├── partials
|   |   |   └── _discount.php  _← Partial File_
|   |   |   └── _discount_form.php
|   |   └── assets
|   |       ├── js
|   |       |   └── discount.js  _← JavaScript File_
|   |       └── css
|   |           └── discount.css  _← StyleSheet File_
|   └── Discount.php  _← Widget Class_
:::

Filter widget classes must extend the `Backend\Classes\FilterWidgetBase` class. The `render` method displays the filter state, and the `renderForm` method displays the filter form.

```php
namespace Backend\FilterWidgets;

use Backend\Classes\FilterWidgetBase;

class Discount extends FilterWidgetBase
{
    public function render() {}

    public function renderForm() {}
}
```

## Registering a Filter Widget

Plugins should register their filter widgets by overriding the `registerFilterWidgets` method in the [plugin registration file](../plugins/extending.md). The method returns an array with the widget class as the key and the widget short code as the value.

```php
public function registerFilterWidgets()
{
    return [
        \Backend\FilterWidgets\Discount::class => 'discount',
    ];
}
```

Use the short code as the scope `type` in the [filter scope definitions](../../handbook/filter-scopes.md), and make it unique to avoid conflicts with other filter scopes.

## Adding Widget Properties

Filter widgets may have properties that are set in the [filter scope configuration](../../handbook/filter-scopes.md). Define the configurable properties on the class, then call the `fillFromConfig` method in the `init` method to populate them.

```php
class Discount extends FilterWidgetBase
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

The property values can then be set in the [filter scope definition](../../handbook/filter-scopes.md) that uses the widget.

```yaml
discount:
    label: Discount
    type: discount
    allowSearch: true
```

## Displaying the Filter State

A filter widget applies a scope to the model query, so it first needs to capture a value from the user. The `render` method displays the initial state of the filter. The `filterScope` property contains the active value along with the other configured properties.

```php
public function render()
{
    $this->vars['scope'] = $this->filterScope;
    $this->vars['name'] = $this->getScopeName();
    $this->vars['value'] = $this->getLoadValue();

    return $this->makePartial('discount');
}
```

The partial should show a label and the current state of the filter. Wrap the contents in an anchor, which is used to open the filter form.

```php
<a
    href="javascript:;"
    class="filter-scope <?= $value ? 'active' : '' ?>"
    data-scope-name="<?= $name ?>"
>
    <span class="filter-label"><?= e(__($scope->label)) ?></span>
    <?php if ($value): ?>
        <span class="filter-setting">1</span>
    <?php endif ?>
</a>
```

## Displaying the Filter Form

When a user clicks the filter label, a form opens where they choose how to apply the filter. The `renderForm` method displays this form and should render a `_discount_form.php` partial.

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

The partial contains the form values and the buttons to apply or clear the filter. A form HTML tag is not required, and all inputs should belong to the `Filter[]` input array. The most common place to store the filtered value is the `value` attribute.

```php
<div class="filter-box">
    <div class="filter-facet">
        <div class="facet-item is-grow">
            <select name="Filter[value]" class="form-control form-control-sm custom-select <?= $allowSearch ? '' : 'select-no-search' ?>">
                <option value="1" <?= $scope->value === '1' ? 'selected="selected"' : '' ?>><?= __("has a discount") ?></option>
                <option value="0" <?= $scope->value === '0' ? 'selected="selected"' : '' ?>><?= __("does not have a discount") ?></option>
            </select>
        </div>
    </div>
    <div class="filter-buttons">
        <button class="btn btn-sm btn-primary" data-filter-action="apply">
            <?= __("Apply") ?>
        </button>
        <div class="flex-grow-1"></div>
        <button class="btn btn-sm btn-secondary" data-filter-action="clear">
            <?= __("Clear") ?>
        </button>
    </div>
</div>
```

::: tip
The `$value` variable contains an array of the selected values. This array is merged with the `$scope` variable for convenience, so you can access the active value with `$scope->value`. In short, use `$value` to check if a scope is applied and `$scope` to access the values.
:::

## Capturing the Filter Value

The `getActiveValue` method captures the values of the filter form so they can be stored. It should return an array (or null) and read the values from the postback data. If the `clearScope` postback value exists, the scope should be cleared. Use the `hasPostValue` helper method to check that a value was found and is not an empty string.

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

## Applying the Scope to the Query

Once a filter value has been captured, apply it to the query in the `applyScopeToQuery` method. Read the value from the `filterScope->value` property, where the `value` name comes from the filter form inputs.

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

## Working with Inline Filters

Inline filters are shown as part of the main filter bar, instead of in a popover form. An inline filter widget does not need the `renderForm` method, and only uses the `render` method to display its contents.

The example below shows an inline search filter with a search button. Since the filter is inline, its input names are shared with the main form, so the search input uses the `$name` variable instead of the generic `Filter` name.

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
        <i class="ph ph-magnifying-glass"></i>
    </button>
</div>
```

The next example shows an inline balloon selector control.

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
                data-value="<?= e($key) ?>"
                class="small <?= $key === $activeValue ? 'active' : '' ?>"
                data-filter-action="apply">
                <?= e($value) ?>
            </li>
        <?php endforeach ?>
    </ul>
    <!-- Hidden input to store the selected filter value -->
    <input type="hidden" name="<?= $name ?>[value]" value="<?= e($activeValue) ?>">
</div>
```

#### See Also

::: also
* [Filtering Records](./filters.md)
* [Filter Scopes](../../handbook/filter-scopes.md)
* [Widgets](../panel/widgets.md)
* [Custom Form Widgets](../forms/form-widgets.md)
:::
