---
subtitle: Управляет вложенными данными форм с использованием связанных записей.
---
# Контроллер связей

Класс `Backend\Behaviors\RelationController` — это поведение контроллера, используемое для простого управления сложными [связями моделей](../database/model.md) на странице.

Поведение связей зависит от типов связей, указанных ниже. Для использования поведения связей вы должны добавить определение `Backend\Behaviors\RelationController` в поле `$implement` класса контроллера. Также должно быть определено свойство класса `$relationConfig`, значение которого должно ссылаться на YAML-файл, используемый для настройки свойств поведения.

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
Очень часто контроллер связей используется вместе с [контроллером форм](./form-controller.md).
:::

## Настройка поведения связей

Файл конфигурации, указанный в свойстве `$relationConfig`, определяется в формате YAML. Файл должен быть размещён в [директории представлений контроллера](../system/views.md). Необходимая конфигурация зависит от типа связи между целевой моделью и связанной моделью.

Поле первого уровня в файле конфигурации связей определяет имя связи в целевой модели. Например.

```php
class Invoice extends Model
{
    public $hasMany = [
        'items' => \Acme\Pay\Models\InvoiceItem::class,
    ];
}
```

Модель `Invoice` со связью `items` должна определить поле первого уровня с тем же именем связи.

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

Следующие свойства используются для каждого определения имени связи.

Свойство | Описание
------------- | -------------
**label** | метка для связи в единственном числе, обязательно.
**view** | конфигурация, специфичная для контейнера представления, см. ниже.
**manage** | конфигурация, специфичная для всплывающего окна управления, см. ниже.
**pivot** | ссылка на файл определения полей формы, используется для связей с данными сводной таблицы.
**emptyMessage** | сообщение для отображения, когда связь пуста, необязательно.
**readOnly** | отключает возможность добавления, обновления, удаления или создания связей. По умолчанию: `false`
**deferredBinding** | [откладывает все действия привязки с использованием ключа сессии](../database/relations.md), когда он доступен. По умолчанию: `false`
**popupSize** | изменяет размер всплывающих окон управления, варианты: `giant`, `huge`, `large`, `small`, `tiny` или `adaptive`. По умолчанию: `huge`
**valueFrom** | определяет пользовательский атрибут модели для использования в качестве исходного значения. По умолчанию берётся из имени определения.

Эти значения конфигурации могут быть указаны для свойств **view** или **manage**, где применимо к типу рендеринга списка, формы или обоих.

Свойство | Тип | Описание
------------- | ------------- | -------------
**form** | Форма | ссылка на файл определения полей формы, см. [поля формы панели управления](../../element/form-fields.md).
**list** | Список | ссылка на файл определения столбцов списка, см. [столбцы списка панели управления](../../element/list-columns.md).
**showFlash** | Оба | включает отображение flash-сообщений после успешного действия. По умолчанию: `true`
**showSearch** | Список | отображает поле ввода для поиска записей. По умолчанию: `false`
**showSorting** | Список | отображает ссылку сортировки на каждом столбце. По умолчанию: `true`
**showSetup** | Список | отображает кнопку настройки для конфигурации столбцов списка и записей на странице. По умолчанию: `false`
**defaultSort** | Список | устанавливает столбец и направление сортировки по умолчанию, когда пользовательские предпочтения не определены. Поддерживает строку или массив с ключами `column` и `direction`. Направление может быть `asc` для восходящего (по умолчанию) или `desc` для нисходящего порядка.
**recordsPerPage** | Список | максимальное количество строк для отображения на каждой странице.
**noRecordsMessage** | Список | сообщение для отображения, когда записи не найдены, может ссылаться на [строку локализации](../system/localization.md).
**conditions** | Список | указывает сырое выражение where-запроса для применения к запросу модели списка.
**scope** | Список | указывает метод [области запроса модели](../database/model.md), определённый в связанной модели формы, для применения к запросу списка всегда. Модель, к которой будет прикреплена эта связь (т.е. родительская модель), передаётся в этот метод области вторым параметром (`$query` — первый).
**searchMode** | Список | определяет стратегию поиска: содержать все слова, любое слово или точную фразу. Поддерживаемые варианты: `all`, `any`, `exact`. По умолчанию: `all`.
**searchScope** | Список | указывает метод [области запроса модели](../database/model.md), определённый в связанной модели формы, для применения к поисковому запросу, первый аргумент будет содержать поисковый термин.
**filter** | Список | ссылка на файл определения областей фильтрации, см. [фильтры списков панели управления](../lists/filters.md).
**customPageName** | Список | указывает пользовательское имя переменной для использования в URL страницы для пагинированных записей. Установите `false` для отключения сохранения номера страницы в URL.

Эти значения конфигурации могут быть указаны только для свойства **view**.

Свойство | Тип | Описание
------------- | ------------- | -------------
**showCheckboxes** | Список | отображает флажки рядом с каждой записью.
**recordUrl** | Список | связывает каждую запись списка с другой страницей. Например: **users/update/:id**. Часть `:id` заменяется идентификатором записи.
**customViewPath** | Список | указывает пользовательский путь представления для переопределения частичных представлений, используемых списком.
**recordOnClick** | Список | пользовательский JavaScript-код для выполнения при клике на запись.
**toolbarPartial** | Оба | ссылка на файл частичного представления контроллера с кнопками панели инструментов. Например: `_relation_toolbar.php`. Это свойство переопределяет свойство `toolbarButtons`.
**toolbarButtons** | Оба | набор отображаемых кнопок. Может быть отформатирован как массив или строка, разделённая вертикальной чертой, или установлен в `false` для скрытия кнопок. Доступные варианты: `create`, `update`, `delete`, `add`, `remove`, `link` и `unlink`. Пример: `add|remove`.
**structure** | Список | параметры для включения [сортировки записей](../lists/structures.md) для списка.

Эти значения конфигурации могут быть указаны только для свойства **manage**.

Свойство | Тип | Описание
------------- | ------------- | -------------
**title** | Оба | заголовок всплывающего окна, может ссылаться на [строку локализации](../system/localization.md).
**context** | Форма | контекст отображаемой формы. Может быть строкой или массивом с ключами: `create`, `update`.

### Пользовательские сообщения

Укажите свойство `customMessages` для переопределения сообщений по умолчанию, используемых контроллером связей. Значения могут быть обычным текстом или ссылаться на [строку локализации](../system/localization.md).

```yaml
customMessages:
    buttonCreate: Make Thing
    buttonDelete: Destroy Thing
```

Вы также можете изменять сообщения в контексте отображаемого связанного поля. Следующий пример переопределит сообщение `createButton` только для связи `items`.

```yaml
items:
    customMessages:
        buttonCreate: New Item!
```

Следующие сообщения доступны для переопределения.

::: details Просмотр списка доступных сообщений
Сообщение | Сообщение по умолчанию
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

### Вложенные определения

Контроллер связей поддерживает вложение связей, другими словами, управление связями через связи. Вложенная связь использует стандартный синтаксис вложения полей. Например, определение связи `countries[cities]` делает связь `cities` доступной для управления через связь `countries`.

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
Вложенные определения связей предназначены для бесшовной работы с [виджетом формы связей](../../element/form/widget-relation.md), когда свойство `useController` установлено в `true`.
:::

## Типы связей

Способ отображения менеджера связей зависит от определения связи в целевой модели. Тип связи также определяет требования к конфигурации, которые показаны **жирным шрифтом**. Доступны следующие типы связей:

### Has Many

1. Связанные записи отображаются как список (`view.list`).
1. Клик по записи отобразит форму обновления (`manage.form`).
1. Клик по **Добавить** отобразит список выбора (`manage.list`).
1. Клик по **Создать** отобразит форму создания (`manage.form`).
1. Клик по **Удалить** уничтожит запись(и).
1. Клик по **Убрать** разорвёт связь.

Например, если **Запись блога** имеет множество **Комментариев**, целевая модель устанавливается как запись блога и отображается список комментариев, используя столбцы из определения `list`. Клик по комментарию открывает всплывающую форму с полями, определёнными в `form`, для обновления комментария. Комментарии можно создавать таким же образом. Ниже приведён пример файла конфигурации поведения связей.

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

### Belongs to Many

1. Связанные записи отображаются как список (`view.list`).
1. Клик по **Добавить** отобразит список выбора (`manage.list`).
1. Клик по **Создать** отобразит форму создания (`manage.form`).
1. Клик по **Удалить** уничтожит запись(и) сводной таблицы.
1. Клик по **Убрать** разорвёт связь.

Например, если **Пользователь** принадлежит многим **Ролям**, целевая модель устанавливается как пользователь и отображается список ролей, используя столбцы из определения `list`. Существующие роли могут быть добавлены и удалены у пользователя. Ниже приведён пример файла конфигурации поведения связей.

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

### Belongs to Many (с данными сводной таблицы)

1. Связанные записи отображаются как список (`view.list`).
1. Клик по записи отобразит форму обновления (`pivot.form`).
1. Клик по **Добавить** отобразит список выбора (`manage.list`), затем форму ввода данных (`pivot.form`).
1. Клик по **Убрать** уничтожит запись(и) сводной таблицы.

Продолжая пример со связями **Belongs To Many**, если роль также имеет дату истечения, клик по роли откроет всплывающую форму с полями, определёнными в `pivot`, для обновления даты истечения. Ниже приведён пример файла конфигурации поведения связей.

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

Данные сводной таблицы доступны при определении полей формы и столбцов списка через связь `pivot`, см. пример ниже.

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

### Belongs To

1. Связанная запись отображается как форма предпросмотра (`view.form`).
1. Клик по **Создать** отобразит форму создания (`manage.form`).
1. Клик по **Обновить** отобразит форму обновления (`manage.form`).
1. Клик по **Связать** отобразит список выбора (`manage.list`).
1. Клик по **Отвязать** разорвёт связь.
1. Клик по **Удалить** уничтожит запись.

Например, если **Телефон** принадлежит **Человеку**, менеджер связей отобразит форму с полями, определёнными в `form`. Клик по кнопке Связать отобразит список людей для ассоциации с телефоном. Клик по кнопке Отвязать разорвёт связь телефона с человеком.

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

### Has One

1. Связанная запись отображается как форма предпросмотра (`view.form`).
1. Клик по **Создать** отобразит форму создания (`manage.form`).
1. Клик по **Обновить** отобразит форму обновления (`manage.form`).
1. Клик по **Связать** отобразит список выбора (`manage.list`).
1. Клик по **Отвязать** разорвёт связь.
1. Клик по **Удалить** уничтожит запись.

Например, если **Человек** имеет один **Телефон**, менеджер связей отобразит форму с полями, определёнными в `form`, для Телефона. При клике на кнопку Обновить появится всплывающее окно с редактируемыми полями. Если у Человека уже есть Телефон, поля обновляются, в противном случае создаётся новый Телефон.

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

## Отображение менеджера связей

Прежде чем связи могут управляться на любой странице, целевая модель должна быть инициализирована в контроллере вызовом метода `initRelation`.

```php
$post = Post::where('id', 7)->first();
$this->initRelation($post);
```

::: tip
[Контроллер форм](./form-controller.md) автоматически инициализирует модель при действиях создания, обновления и предпросмотра.
:::

Менеджер связей затем может быть отображён для указанного определения связи вызовом метода `relationRender`. Например, если вы хотите отобразить менеджер связей на странице [Предпросмотр](./form-controller.md), содержимое представления **preview.htm** может выглядеть так.

```php
<?= $this->formRenderPreview() ?>

<?= $this->relationRender('comments') ?>
```

Вы можете указать менеджеру связей рендериться в режиме только для чтения, передав свойство вторым аргументом.

```php
<?= $this->relationRender('comments', ['readOnly' => true]) ?>
```

## Расширение поведения связей

Иногда вам может потребоваться изменить поведение связей по умолчанию, и для этого существует несколько способов.

### Расширение конфигурации связей

Предоставляет возможность манипулировать конфигурацией связей. Следующий пример может использоваться для подстановки другого файла columns.yaml на основе свойства вашей модели.

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

### Расширение виджета представления

Предоставляет возможность манипулировать виджетом представления. Например, вы можете переключать showCheckboxes на основе свойства вашей модели.

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

#### Как удалить столбец

Поскольку виджет ещё не завершил инициализацию в этой точке цикла выполнения, вы не можете вызвать `$widget->removeColumn()`. Метод `addColumns()`, описанный в [документации контроллера списков](../lists/list-controller.md), будет работать как ожидается, но для удаления столбца нам нужно прослушивать событие 'list.extendColumns' внутри метода `relationExtendViewWidget()`. Следующий пример показывает, как удалить столбец.

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

### Расширение виджета управления

Предоставляет возможность манипулировать виджетом управления вашей связи.

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

### Расширение виджета сводной таблицы

Предоставляет возможность манипулировать виджетом сводной таблицы вашей связи.

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

### Расширение виджетов фильтрации

Существует два виджета фильтрации, которые могут быть расширены следующими методами: один для режима представления и один для режима управления `RelationController`.

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

Примеры программного добавления или удаления областей фильтрации можно найти в разделе **Расширение областей фильтрации** [документации контроллера списков](../lists/list-controller.md).

### Расширение обновления результатов

Виджет представления часто обновляется, когда виджет управления вносит изменение. Вы можете использовать этот метод для внедрения дополнительных контейнеров при этом процессе. Верните массив с дополнительными значениями для отправки в браузер, например:

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

#### См. также

::: also
* [Виджет формы связей](../../element/form/widget-relation.md)
* [Контентное поле записей](../../element/content/field-entries.md)
:::
