---
subtitle: Добавляет функции управления списками на любую страницу панели управления.
---
# Контроллер списков

Класс `Backend\Behaviors\ListController` — это поведение контроллера, используемое для простого добавления списка записей на страницу. Поведение предоставляет сортируемый и доступный для поиска список с необязательными ссылками на записи. Поведение предоставляет действие контроллера `index`, однако список может быть отрендерен в любом месте, и можно использовать множественные определения списков.

Поведение списка зависит от определений [столбцов списка](../../element/list-columns.md) и [класса модели](../database/model.md). Для использования поведения списка вы должны добавить его в свойство `$implement` класса контроллера. Также должно быть определено свойство класса `$listConfig`, и его значение должно ссылаться на YAML-файл, используемый для настройки свойств поведения.

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
Очень часто контроллеры списков и [форм](../forms/form-controller.md) используются вместе в одном контроллере.
:::

## Настройка поведения списка

Файл конфигурации, указанный в свойстве `$listConfig`, определяется в формате YAML. Файл должен быть размещён в [директории представлений](../system/controllers.md) контроллера. Ниже приведён пример типичного файла конфигурации поведения списка.

```yaml
# config_list.yaml
title: Blog Posts
list: ~/plugins/acme/blog/models/post/columns.yaml
modelClass: Acme\Blog\Models\Post
recordUrl: acme/blog/posts/update/:id
```

Следующие свойства являются обязательными в файле конфигурации списка.

Свойство | Описание
------------- | -------------
**title** | заголовок для этого списка.
**list** | массив конфигурации или ссылка на файл определения столбцов списка, см. [столбцы списка](../../element/list-columns.md).
**modelClass** | имя класса модели, данные списка загружаются из этой модели.

Ниже перечислены необязательные свойства конфигурации.

Свойство | Описание
------------- | -------------
**filter** | конфигурация фильтра, см. [фильтры списка](./filters.md).
**recordUrl** | ссылка каждой записи списка на другую страницу. Например: **users/update:id**. Часть `:id` заменяется идентификатором записи. Это позволяет связать поведение списка и [поведение формы](../forms/form-controller.md).
**recordOnClick** | пользовательский JavaScript-код, выполняемый при нажатии на запись.
**noRecordsMessage** | сообщение, отображаемое при отсутствии записей, может ссылаться на [строку локализации](../system/localization.md).
**deleteMessage** | сообщение, отображаемое при массовом удалении записей, может ссылаться на [строку локализации](../system/localization.md).
**noRecordsDeletedMessage** | сообщение, отображаемое при запуске действия массового удаления, но когда ни одна запись не была удалена, может ссылаться на [строку локализации](../system/localization.md).
**recordsPerPage** | количество записей на странице, используйте 0 для отключения пагинации. По умолчанию: `0`
**perPageOptions** | варианты количества элементов на странице. По умолчанию: `[20, 40, 80, 100, 120]`
**showPageNumbers** | отображает номера страниц при пагинации. Отключите для улучшения производительности списка при работе с большими таблицами. По умолчанию: `true`
**toolbar** | ссылка на файл конфигурации виджета панели инструментов или массив с конфигурацией (см. ниже).
**showSorting** | отображает ссылку сортировки на каждом столбце. По умолчанию: `true`
**defaultSort** | устанавливает столбец и направление сортировки по умолчанию, когда пользовательские настройки не определены. Поддерживает строку или массив с ключами `column` и `direction`. Направление может быть `asc` для сортировки по возрастанию (по умолчанию) или `desc` для сортировки по убыванию.
**showCheckboxes** | отображает флажки рядом с каждой записью. По умолчанию: `false`.
**showSetup** | отображает кнопку настройки столбцов списка. По умолчанию: `false`.
**structure** | включает структурированный список, подробнее см. в статье о [сортировке записей](./structures.md).
**customViewPath** | указывает пользовательский путь к представлениям для переопределения частичных представлений, используемых списком, необязательно.
**customPageName** | указывает пользовательское имя переменной для использования в URL страницы для пагинированных записей. Установите `false` для отключения сохранения номера страницы в URL. По умолчанию: `page`.

### Добавление панели инструментов

Для включения панели инструментов в список добавьте следующую конфигурацию в YAML-файл конфигурации списка:

```yaml
toolbar:
    buttons: list_toolbar
    search:
        prompt: Find records
```

Конфигурация панели инструментов поддерживает:

Свойство | Описание
------------- | -------------
**buttons** | ссылка на файл частичного представления контроллера с кнопками панели инструментов. Например: **_list_toolbar.htm**
**search** | ссылка на файл конфигурации виджета поиска или массив с конфигурацией.

Конфигурация поиска поддерживает следующие свойства:

Свойство | Описание
------------- | -------------
**prompt** | подсказка, отображаемая при отсутствии активного поиска, может ссылаться на [строку локализации](../system/localization.md).
**mode** | определяет стратегию поиска: содержать все слова, любое слово или точную фразу. Поддерживаемые варианты: `all`, `any`, `exact`. По умолчанию: `all`.
**scope** | указывает метод [области запроса модели](../database/model.md), определённый в **модели списка**, для применения к поисковому запросу. Первый аргумент будет содержать объект запроса (как в обычном методе области), второй — поисковый термин, а третий — массив столбцов для поиска.
**searchOnEnter** | при установке значения true виджет поиска будет ожидать нажатия клавиши Enter перед началом поиска (поведение по умолчанию — автоматический поиск после ввода текста и короткой паузы). По умолчанию: `false`.

Частичное представление кнопок панели инструментов, упомянутое выше, должно содержать определение элемента управления панели инструментов с кнопками. Частичное представление также может содержать [элемент управления tablo](https://octobercms.com/docs/ui/scoreboard) с диаграммами. Пример частичного представления панели инструментов с кнопкой **New Post**, ссылающейся на действие **create**, предоставляемое [поведением формы](forms.md):

```php
<div data-control="toolbar">
    <a href="<?= Backend::url('acme/blog/posts/create') ?>"
        class="btn btn-primary oc-icon-plus">
        New Post
    </a>
</div>
```

При использовании флажков списка вы можете переключать состояние доступности кнопки с помощью атрибута `data-list-checked-trigger`.

```php
<button
    type="button"
    class="btn btn-primary"
    data-list-checked-trigger>
    Delete Selected
</button>
```

Вы также можете передать отмеченные значения в AJAX-запрос с помощью атрибута `data-list-checked-request`.

```php
<button
    type="button"
    class="btn btn-primary"
    data-request="onDelete"
    data-list-checked-request>
    Delete Selected
</button>
```

### Фильтрация списка

Для фильтрации списка по пользовательскому вводу добавьте следующую конфигурацию списка в YAML-файл:

```yaml
filter: $/acme/blog/models/post/scopes.yaml
```

Свойство **filter** должно ссылаться на путь к [файлу конфигурации фильтра](./filters.md) или содержать массив с конфигурацией.

## Определение столбцов списка

::: aside
Доступные свойства столбцов списка можно найти на странице [определений столбцов списка](../../element/list-columns.md).
:::

Столбцы списка определяются в YAML-файле. Конфигурация столбцов используется поведением списка для создания таблицы записей и отображения столбцов модели в ячейках таблицы. Файл размещается в поддиректории директории **models** плагина. Имя поддиректории совпадает с именем класса модели в нижнем регистре. Имя файла не имеет значения, но **columns.yaml** и **list_columns.yaml** являются общепринятыми именами. Пример расположения файла столбцов списка:

::: dir
├── plugins
|   └── acme
|       └── blog
|           └── `models`
|               ├── post  _← Директория конфигурации_
|               |   └── columns.yaml  _← Файл конфигурации_
|               └── Post.php  _← Класс модели_
:::

Следующий пример показывает типичное содержимое файла определений столбцов списка.

```yaml
# columns.yaml
columns:
    name: Name
    email: Email
```

## Отображение списка

Обычно списки отображаются в файле [представления index](../system/views.md). Поскольку списки включают панель инструментов, файл представления будет состоять исключительно из единственного вызова метода `listRender`.

```php
<?= $this->listRender() ?>
```

## Множественные определения списков

Поведение списка может поддерживать несколько списков в одном контроллере с помощью именованных определений. Свойство `$listConfig` может быть определено как массив, где ключ — это имя определения, а значение — файл конфигурации.

```php
public $listConfig = [
    'templates' => 'config_templates_list.yaml',
    'layouts' => 'config_layouts_list.yaml'
];
```

Каждое определение затем может быть отображено путём передачи имени определения в качестве первого аргумента при вызове метода `listRender`.

```php
<?= $this->listRender('templates') ?>
```

## Расширение поведения списка

Иногда вам может потребоваться изменить поведение списка по умолчанию, и есть несколько способов сделать это.

### Расширение конфигурации списка

Вы можете динамически расширить конфигурацию списка, используя метод `listGetConfig`.

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

### Переопределение действия контроллера

Вы можете использовать собственную логику для метода действия `index` в контроллере, а затем опционально вызвать родительский метод `index` поведения списка.

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

### Переопределение представлений

Поведение `ListController` имеет основное представление контейнера, которое вы можете переопределить, создав специальный файл с именем `_list_container.php` в директории контроллера. Следующий пример добавит боковую панель к списку:

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

Поведение создаёт виджет `Lists`, который также содержит множество представлений, которые вы можете переопределить. Это возможно путём указания свойства `customViewPath`, описанного в параметрах конфигурации списка. Виджет сначала будет искать представление по этому пути, а затем обратится к местоположению по умолчанию.

```yaml
# Custom view path
customViewPath: $/acme/blog/controllers/reviews/list
```

::: tip
Рекомендуется использовать поддиректорию, например `list`, чтобы избежать конфликтов.
:::

Например, для изменения разметки строки тела списка создайте файл `list/_list_body_row.php` в директории контроллера.

```php
<tr>
    <?php foreach ($columns as $key => $column): ?>
        <td><?= $this->getColumnValue($record, $column) ?></td>
    <?php endforeach ?>
</tr>
```

### Расширение определений столбцов

Вы можете расширить столбцы другого контроллера извне, привязавшись к [глобальному событию](../services/event.md) `backend.list.extendColumns`. Функция события принимает аргумент `$list`, который представляет объект `Backend\Widgets\Lists`, где вы можете использовать методы `getController` и `getModel` для проверки контекста выполнения.

Поскольку это событие потенциально может затронуть все списки, необходимо проверить, что контроллер и модель имеют правильный тип. Вот пример использования метода `addColumns` для добавления новых столбцов в список журнала событий и изменения существующего столбца.

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

Вы также можете расширить столбцы списка внутри класса контроллера, переопределив метод `listExtendColumns`. Это затронет только список, используемый поведением `ListController`.

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

Следующие методы доступны для объекта `$list`.

Метод | Описание
------------- | -------------
**addColumns** | добавляет новые столбцы в список
**removeColumn** | удаляет столбец из списка
**getColumn** | возвращает существующее определение столбца

Каждый метод принимает массив столбцов, аналогичный [конфигурации столбцов списка](../../element/list-columns.md).

### Внедрение CSS-класса строки

Вы можете внедрить пользовательский CSS-класс строки, добавив метод `listInjectRowClass` в класс контроллера. Этот метод может принимать два аргумента: **$record** будет представлять одну запись модели, а **$definition** содержит имя определения виджета списка. Вы можете вернуть любое строковое значение, содержащее ваши классы строк. Эти классы будут добавлены в HTML-разметку строки.

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

Специальный CSS-класс `nolink` доступен для принудительного отключения кликабельности строки, даже если свойства `recordUrl` или `recordOnClick` определены для виджета списка. Возврат этого класса в событии позволит сделать записи некликабельными — например, для мягко удалённых строк или информационных строк:

```php
public function listInjectRowClass($record, $value)
{
    if ($record->trashed()) {
        return 'nolink';
    }
}
```

### Переопределение URL столбца

Вы можете указать действие при нажатии на запись столбца, переопределив метод `listOverrideRecordUrl`. Этот метод может вернуть строку для нового URL панели управления или массив со сложным определением.

```php
public function listOverrideRecordUrl($record, $definition = null)
{
    if ($record->is_active) {
        return "acme/test/services/preview/{$record->id}";
    }
}
```

Для переопределения поведения onclick верните массив с ключом `onclick` и установите `url` в null.

```php
public function listOverrideRecordUrl($record, $definition = null)
{
    if ($record->is_banned) {
        return ['onclick' => "alert('Unable to click')", 'url' => null];
    }
}
```

Для полного отключения кликабельности столбца верните массив с ключом `clickable`, установленным в false.

```php
public function listOverrideRecordUrl($record, $definition = null)
{
    if ($record->is_disabled) {
        return ['clickable' => false];
    }
}
```

### Расширение областей фильтра

Вы можете расширить области фильтра другого контроллера, привязавшись к [глобальному событию](../services/event.md) `backend.filter.extendScopes`. Этот метод может принимать аргумент `$filter`, который будет представлять объект `Backend\Widgets\Filter`, где вы можете использовать методы `getController`, `getModel` и `getContext` для проверки контекста выполнения.

Поскольку это событие потенциально может затронуть все фильтры, необходимо проверить, что контроллер и модель имеют правильный тип. Вот пример использования метода `addScopes` для добавления новых полей в список журнала событий и настройки CSS-классов.

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

Вы также можете расширить области фильтра внутри класса контроллера, просто переопределив метод `listFilterExtendScopes`.

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

Следующие методы доступны для объекта `$filter`. Доступные области такие же, как в [конфигурации фильтров списка](./filters.md).

Метод | Описание
------------- | -------------
**addScopes** | добавляет новые области в виджет фильтра, используя [конфигурацию фильтров списка](./filters.md)
**removeScope** | удаляет область из виджета фильтра
**getScope** | возвращает существующее определение области

#### Расширение ответа фильтра

Метод `listExtendRefreshResults` может взаимодействовать с ответом AJAX-обновления при обновлении списка и должен возвращать массив дополнительных обновлений частичных представлений. Метод `listGetFilterWidget` вернёт виджет фильтра для доступа к областям.

```php
public function listExtendRefreshResults($filter, $result)
{
    $statusCode = $this->listGetFilterWidget()->getScope('status_code')->value;

    return ['#my-partial-id' => $this->makePartial(...)];
}
```

### Расширение запроса модели

Запрос поиска для [модели базы данных](../database/model.md) списка может быть расширен путём переопределения метода `listExtendQuery` внутри класса контроллера. Этот пример гарантирует, что мягко удалённые записи будут включены в данные списка, применяя область **withTrashed** к запросу.

```php
public function listExtendQuery($query)
{
    $query->withTrashed();
}
```

При работе с множественными определениями списков в одном контроллере вы можете использовать второй параметр `listExtendQuery`, который содержит имя определения.

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

Вы также можете объединять другие таблицы для улучшения поиска и сортировки. Следующий пример объединит таблицу `post_statuses` и добавит столбцы `status_sort_order` и `status_name` к запросу.

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

Запрос модели [фильтра списка](./filters.md) также может быть расширен путём переопределения метода `listFilterExtendQuery`.

```php
public function listFilterExtendQuery($query, $scope)
{
    if ($scope->scopeName == 'status') {
        $query->where('status', '<>', 'all');
    }
}
```

### Расширение коллекции записей

Коллекция записей, используемая списком, может быть расширена путём переопределения метода `listExtendRecords` внутри класса контроллера. Этот пример использует метод `sort` для [коллекции записей](../database/collection.md) для изменения порядка сортировки записей.

```php
public function listExtendRecords($records)
{
    return $records->sort(function ($a, $b) {
        return $a->computedVal() > $b->computedVal();
    });
}
```

### Пользовательские типы столбцов

Пользовательские типы столбцов списка могут быть зарегистрированы в панели управления с помощью метода `registerListColumnTypes` [файла регистрации плагина](../extending.md). Метод должен возвращать массив, где ключ — это имя типа, а значение — вызываемая функция. Вызываемая функция получает три аргумента: нативное значение `$value`, объект определения столбца `$column` и объект записи модели `$record`.

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

Использование пользовательского типа столбца списка заключается просто в вызове его по имени с помощью свойства `type`.

```yaml
# columns.yaml
columns:
    secret_code:
        label: Secret code
        type: uppercase
```
