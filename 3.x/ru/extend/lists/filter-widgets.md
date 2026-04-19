---
subtitle: Виджет, специально созданный для использования в фильтре.
---
# Виджеты фильтров

С помощью виджетов фильтров вы можете добавлять новые типы областей в фильтры панели управления. Они предоставляют функции, общие для фильтрации списков. Виджеты фильтров должны быть зарегистрированы в [файле регистрации плагина](../extending.md).

Классы виджетов фильтров находятся внутри директории **filterwidgets** плагина. Имя внутренней директории совпадает с именем класса виджета в нижнем регистре. Виджеты могут предоставлять ресурсы и частичные представления. Пример структуры директории виджета фильтра выглядит так.

::: dir
├── `filterwidgets`
|   ├── discount
|   |   ├── partials
|   |   |   └── _discount.php  _← Файл частичного представления_
|   |   |   └── _discount_form.php
|   |   └── assets
|   |       ├── js
|   |       |   └── discount.js  _← JavaScript-файл_
|   |       └── css
|   |           └── discount.css  _← Файл стилей_
|   └── Discount.php  _← Класс виджета_
:::

## Определение класса

Команда `create:filterwidget` генерирует виджет фильтра панели управления, представление и базовые файлы ресурсов. Первый аргумент указывает имя автора и плагина. Второй аргумент указывает имя класса виджета формы.

```bash
php artisan create:filterwidget Acme.Blog Discount
```

Классы виджетов фильтров должны наследовать класс `Backend\Classes\FilterWidgetBase`. Зарегистрированный виджет может использоваться в файле [определения областей фильтра](../../element/filter-scopes.md) панели управления. Пример определения класса виджета фильтра.

```php
namespace Backend\FilterWidgets;

use Backend\Classes\FilterWidgetBase;

class Discount extends FilterWidgetBase
{
    public function render() {}

    public function renderForm() {}
}
```

## Свойства виджета фильтра

Виджеты фильтров могут иметь свойства, которые можно задать с помощью [конфигурации областей фильтра](../../element/filter-scopes.md). Просто определите настраиваемые свойства в классе, а затем вызовите метод `fillFromConfig` для их заполнения внутри определения метода `init`.

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

Значения свойств затем становятся доступными для установки из [определения областей фильтра](../../element/filter-scopes.md) при использовании виджета.

```yaml
discount:
    label: Discount
    type: discount
    allowSearch: true
```

## Регистрация виджета фильтра

Плагины должны регистрировать виджеты фильтров, переопределяя метод `registerFilterWidgets` в [файле регистрации плагина](../extending.md). Метод возвращает массив, содержащий класс виджета в ключах и короткий код виджета в значении. Пример:

```php
public function registerFilterWidgets()
{
    return [
        \Backend\FilterWidgets\Discount::class => 'discount',
    ];
}
```

Короткий код используется при ссылке на виджет в определениях областей фильтра и должен быть уникальным значением для предотвращения конфликтов с другими полями фильтра.

## Отображение состояния фильтра

Основная цель виджета фильтра — применение области к запросу модели, что означает сначала получение значений от пользователя. Метод `render` используется для отображения начального состояния фильтра, а свойство `filterScope` будет содержать активное значение вместе с другими настроенными свойствами.

```php
public function render()
{
    $this->vars['scope'] = $this->filterScope;
    $this->vars['name'] = $this->getScopeName();
    $this->vars['value'] = $this->getLoadValue();

    return $this->makePartial('discount');
}
```

На базовом уровне виджет фильтра должен показывать метку и своё текущее состояние пользователю. Содержимое также обёрнуто в ссылку, которая используется для отображения формы фильтра.

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

## Отображение формы фильтра

Когда пользователь нажимает на метку фильтра, отображается форма, чтобы он мог указать, как применить фильтр. Метод `renderForm` используется для отображения формы фильтра и должен соответствовать частичному представлению `_discount_form.php`.

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

Содержимое должно включать значения формы и кнопки для применения или очистки фильтра. Тег HTML-формы не требуется, и все поля ввода должны принадлежать массиву ввода `Filter[]`. Наиболее распространённое место для хранения отфильтрованного значения — атрибут `value`.

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
Переменная `$value` будет содержать массив выбранных значений. Этот массив будет объединён с переменной `$scope` для удобства, поэтому вы можете получить доступ к активному значению через `$scope->value`. Подводя итог: используйте `$value` для проверки, применена ли область, и `$scope` для доступа к значениям.
:::

## Захват значения фильтра

Метод `getActiveValue` используется для захвата отфильтрованных значений формы и их сохранения. Он должен возвращать массив (или null) и использовать данные обратной отправки для нахождения значений. Если существует значение обратной отправки `clearScope`, это означает, что область хочет быть очищена. Вы можете использовать вспомогательный метод `hasPostValue` для проверки, было ли найдено значение и не является ли оно пустой строкой.

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

## Применение области к запросу

После захвата значения фильтра оно может быть применено к запросу с помощью метода `applyScopeToQuery`. Значение может быть взято из свойства `filterScope->value`, где имя `value` берётся из значений формы фильтра.

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

## Работа со встроенными фильтрами

Встроенные фильтры — это фильтры, которые могут существовать как часть основного интерфейса фильтра вместо отображения во всплывающей форме. Соответственно, внутри класса виджета фильтра метод `renderForm` не требуется, и только метод `render` используется для отображения содержимого фильтра.

Пример ниже показывает встроенный фильтр поиска с кнопкой поиска. Важно помнить, что поскольку фильтр встроенный, имена полей ввода являются общими для основной формы, поэтому поле ввода поиска использует переменную `$name` вместо общего имени `Filter`.

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

Следующий пример показывает встроенный элемент управления выбора «шариками».

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
