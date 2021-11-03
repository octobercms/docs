# Списки

<a name="introduction" class="anchor"></a>
## Введение

`Список` - это контроллер, используемый для отображения списка записей на странице с возможностью добавления новых, сортировки и поиска. По умолчанию действие контроллера `index()` отображает список, но его можно отобразить где угодно. Вы также можете отобразить несколько списков на странице.

Список зависит от [столбцов](#form-fields) и класса [модели](../database/model). Для того, чтобы использовать список, Вы должны указать его в свойстве `$implement` класса контроллера. Также должно быть определено свойство `$listConfig`, значение которого - YAML файл, используемый для настройки списка.

    namespace Acme\Blog\Controllers;

    class Categories extends \Backend\Classes\Controller
    {
        public $implement = ['Backend.Behaviors.ListController'];

        public $listConfig = 'list_config.yaml';
    }

> **Примечание:** Очень часто список используются вместе с [формами](../backend/forms) в одном контроллере.

<a name="configuring-list" class="anchor"></a>
## Настройка списка

Конфигурационный файл, на который ссылается переменная `$listConfig`, должен иметь YAML формат и находиться в папке с представлением контроллера. Ниже представлен типичный файл с настройками:

    # ===================================
    #  List Behavior Config
    # ===================================

    title: Blog Posts
    list: ~/plugins/acme/blog/models/post/columns.yaml
    modelClass: Acme\Blog\Models\Post
    recordUrl: acme/blog/posts/update/:id

Следующие параметры являются обязательными:

Параметр | Описание
------------- | -------------
**title** | заголовок списка.
**list** | ссылка на файл, определяющий отображаемые [столбцы](#list-columns) в таблице.
**modelClass** | имя класса модели, из которой будут загружаться данные.

Параметры конфигурации, перечисленные ниже, не являются обязательными.

Параметр | Описание
------------- | -------------
**filter** | [настройка фильтра](#adding-filters).
**recordUrl** | добавить ссылку к каждой записи. Например: **users/update:id**. Где `:id` - уникальный идентификатор записи в таблице. Это позволяет связать списки и [формы](../backend/forms).
**recordOnClick** | произвольный JavaScript код, который выполняется при клике на запись.
**noRecordsMessage** | текст, который будет отображаться при отсутствии записей. Можно использовать [переведенную строку](../plugin/localization).
**recordsPerPage** | количество записей на странице. По умолчанию: 0 (отображаются все)
**toolbar** | ссылка на файл с настройками тулбара или массив с настройками (см. ниже).
**showSorting** | отображать сортировку на каждом столбце. По умолчанию: true.
**defaultSort** | сортировка по умолчанию. Поддерживается строка или массив с ключами: `column` и `direction`.
**showCheckboxes** | отображает чекбоксы к каждой записи. По умолчанию: false.
**showSetup** | отображает кнопку с настройками списка. По умолчанию: false.
**showTree** | отображает записи в виде дерева. По умолчанию: false.
**treeExpanded** | отображает сразу развернутое дерево. По умолчанию: false.

<a name="adding-toolbar" class="anchor"></a>
### Тулбар

Чтобы добавить тулбар к списку, нужно добавить следующие настройки в конфигурационный YAML файл списка:

    toolbar:
        buttons: list_toolbar
        search:
            prompt: Find records

Параметры тулбара:

Параметр | Описание
------------- | -------------
**buttons** | ссылка на фрагмент контроллера с кнопками. Пример: **_list_toolbar.htm**
**search** | ссылка на конфигурационный файл виджета с поиском или массив с настройками.

Настройки виджета с поиском:

Параметр | Описание
------------- | -------------
**prompt** | placeholder (можно использовать [переведенную строку](../plugin/localization)).
**mode** | определяет формат поиска. Можно использовать: all (все), any (любое из), exact (точное совпадение). По умолчанию: all.
**scope** | определяет [метод для изменения запроса](../database/model#query-scopes).

Тулбар может содержать в себе различные кнопки, [индикаторы](../backend/controls#scoreboards) или графики. Пример фрагмента с кнопкой, при нажатии на которую появляется форма создания новой записи:

    <div data-control="toolbar">
        <a
            href="<?= Backend::url('acme/blog/posts/create') ?>"
            class="btn btn-primary oc-icon-plus">New Post</a>
    </div>

<a name="adding-filters" class="anchor"></a>
### Фильтрация

Добавьте следующие настройки в конфигурационный YAML файл списка для отображения фильтра:

    filter: config_filter.yaml

Параметр **filter** должен указывать на [файл](#list-filters) или массив с настройками.

<a name="list-columns" class="anchor"></a>
## Столбцы списка

Отображаемые столбцы списка задаются в YAML файле, который находится в подпапке папки **models**. Имя подпапки должно совпадать с именем класса модели и пишется строчными буквами. Название же самого файла может быть любым, но лучше использовать **columns.yaml** и **list_columns.yaml**. Пример:

    plugins/
      acme/
        blog/
          models/                  <=== папка модели
            post/                  <=== папка с настройками модели
              list_columns.yaml    <=== файл с настройками списка
            Post.php               <=== класс модели


Следующий пример показывает типичное содержимое файла `list_columns.yaml`.

    # ===================================
    #  List Column Definitions
    # ===================================

    columns:
        name: Name
        email: Email

<a name="column-options" class="anchor"></a>
### Свойства столбцов

Для каждого столбца можно задать следующие свойства (если применимо):

Параметр | Описание
------------- | -------------
**label** | название столбца.
**type** | формат отображения (см. [Типы столбцов](#column-types)).
**default** | значение по умолчанию.
**searchable** | включить это поле в результаты поиска. По умолчанию: false.
**invisible** | определяет, будет ли этот столбец скрыт по умолчанию. По умолчанию: false.
**sortable** | добавляет возможность сортировки. По умолчанию: true.
**clickable** | если `false`, то отключает клик по столбцу. По умолчанию: true.
**select** | определяет произвольный SQL select запрос.
**valueFrom** | определяет атрибут модели.
**relation** | определяет столбец отношений.
**cssClass** | добавляет CSS класс к контейнеру столбца.
**width** | определяет ширину столбца в пикселях или процентах.

<a name="column-types" class="anchor"></a>
## Типы столбцов

<style>
    .collection-method-list {
        column-count: 3; -moz-column-count: 3; -webkit-column-count: 3;
        column-gap: 2em; -moz-column-gap: 2em; -webkit-column-gap: 2em;
    }

    .collection-method-list a {
        display: block;
    }
</style>

<div class="content-list collection-method-list" markdown="1">

- [Text](#column-text)
- [Number](#column-number)
- [Switch](#column-switch)
- [Date & Time](#column-datetime)
- [Date](#column-date)
- [Time](#column-time)
- [Time since](#column-timesince)
- [Time tense](#column-timetense)
- [Select](#column-select)
- [Relation](#column-relation)
- [Partial](#column-partial)

</div>

<a name="column-text" class="anchor"></a>
### Text

`text` - отображает столбец с текстом. Выравнивание по левому краю.

    full_name:
        label: Full Name
        type: text

<a name="column-number" class="anchor"></a>
### Number

`number` - отображает столбец с числами. Выравнивание по правому краю.

    age:
        label: Age
        type: number

<a name="column-switch" class="anchor"></a>
### Switch

`switch` - отображает столбец со значениями true или false.

    enabled:
        label: Enabled
        type: switch

<a name="column-datetime" class="anchor"></a>
### Date & Time

`datetime` - отображает столбец с временем и датой. Пример: **Thu, Dec 25, 1975 2:15 PM**.

    created_at:
        label: Date
        type: datetime

Вы также можете указать произвольный формат даты. Например: **Thursday 25th of December 1975 02:15:16 PM**:

    created_at:
        label: Date
        type: datetime
        format: l jS \of F Y h:i:s A

<a name="column-date" class="anchor"></a>
### Date

`date` - отображает столбец с датой **M j Y**

    created_at:
        label: Date
        type: date

<a name="column-time" class="anchor"></a>
### Time

`time` - отображает столбец со временем **g:i a**

    created_at:
        label: Date
        type: time

<a name="column-timesince" class="anchor"></a>
### Time since

`timesince` - отображает столбец с разницей во времени. Пример: **10 minutes ago**

    created_at:
        label: Date
        type: timesince

<a name="column-timetense" class="anchor"></a>
### Time tense

`timetense` - отображает столбец со временем. Пример: **Today at 12:49**, **Yesterday at 4:00** or **18 Sep 2015 at 14:33**.

    created_at:
        label: Date
        type: timetense

<a name="column-select" class="anchor"></a>
### Select

`select` - позволяет создать колонку, используя произвольный SQL select запрос.

    full_name:
        label: Full Name
        select: concat(first_name, ' ', last_name)

<a name="column-relation" class="anchor"></a>
### Relation

`relation` - позволяет отображать связанные столбцы. Значением этого параметра должно быть Имя Активной Записи [отношения](../database/model#relationships) Вашей модели. Пример:

    group:
        label: Group
        relation: groups
        select: name

Если [отношение](../database/relations) использует аргумент **count**, то Вы можете отобразить число, используя параметры: `valueFrom` и `default`.

    users_count:
        label: Users
        relation: users_count
        valueFrom: count
        default: 0

<a name="column-partial" class="anchor"></a>
### Partial

`partial` - отображает фрагмент. Параметр `path` указывает на **.htm** файл с содержимым ячейки. Внутри фрагмента доступные следующие переменные: `$value` - значение ячейки по умолчанию, `$record` - модель и `$column` - экземпляр класса `Backend\Classes\ListColumn`.

    content:
        type: partial
        path: ~/plugins/acme/blog/models/comments/_content_column.htm

<a name="displaying-list" class="anchor"></a>
## Отображение списка

Обычно списки отображаются в [представлении](../backend/controllers-views-ajax/#introduction) в методе `index` при помощи метода `listRender()`. Пример:

    <?= $this->listRender() ?>

<a name="multiple-list-definitions" class="anchor"></a>
## Использование нескольких списков

Вы можете использовать несколько списков в одном контроллере, если укажите в свойстве `$listConfig` массив, в котором ключ - название списка, а значение - ссылка на файл с настройками.

    public $listConfig = [
        'templates' => 'config_templates_list.yaml',
        'layouts' => 'config_layouts_list.yaml'
    ];

Передайте ключ в метод `listRender()` для отображения нужного списка:

    <?= $this->listRender('templates') ?>

<a name="list-filters" class="anchor"></a>
## Использование фильтра

Вы можете [отфильтровать](#adding-filters) элементы в списке по нужному полю. Пример:

    # ===================================
    # Filter Scope Definitions
    # ===================================

    scopes:

        category:
            label: Category
            modelClass: Acme\Blog\Models\Category
            conditions: category_id in (:filtered)
            nameFrom: name

        status:
            label: Status
            type: group
            conditions: status in (:filtered)
            options:
                pending: Pending
                active: Active
                closed: Closed

        published:
            label: Hide published
            type: checkbox
            conditions: is_published <> true

        approved:
            label: Approved
            type: switch
            conditions:
                - is_approved <> true
                - is_approved = true

        created_at:
            label: Date
            type: date
            conditions: created_at >= ':filtered'


        published_at:
            label: Date
            type: daterange
            conditions: created_at >= ':after' AND created_at <= ':before'


<a name="filter-scope-options" class="anchor"></a>
### Параметры фильтра

Вы можете указать следующие параметры для каждого фильтра:

Параметр | Описание
------------- | -------------
**label** | название фильтра.
**type** | [тип фильтра](#scope-types). По умолчанию: group.
**conditions** | дополнительное условие.
**scope** | [метод запроса](../database/model#query-scopes).
**options** | список значений или название метода в модели `modelClass`.
**nameFrom** | имя поля, которое нужно использовать в качестве названий.

<a name="scope-types" class="anchor"></a>
### Доступные типы фильтра

Вы можете использовать следующие типы фильтров:

Type | Description
------------- | -------------
**group** | отображает группу элементов.
**checkbox** | отображает чекбокс.
**switch** | отображает переключатель между двумя предварительно установленными условиями.
**date** | отображает выбор даты.
**daterange** | отображает выбор промежутка между двумя датами. Параметры `:before` и `:after` передаются в **conditions**.

<a name="extend-list-behavior" class="anchor"></a>
## Изменение списка

Вы можете изменить список следующими способами:

- [Переопределить контроллер](#overriding-action)
- [Изменить столбцы списка](#extend-list-columns)
- [Изменить запрос к модели](#extend-model-query)

<a name="overriding-action" class="anchor"></a>
### Переопределение контроллера

Вы можете использовать свою собственную логику в контроллере в методе `index()`, а затем, при необходимости, отобразить список.

    public function index()
    {
        //
        // Do any custom code here
        //

        // Call the ListController behavior index() method
        $this->asExtension('ListController')->index();
    }

<a name="extend-list-columns" class="anchor"></a>
### Изменение столбцов списка

Вы можете добавить новые столбцы в список, используя метод `extendListColumns`. Он принимает два аргумента: **$list** и **$model**. Пример:

    class Categories extends \Backend\Classes\Controller
    {
        public $implement = ['Backend.Behaviors.ListController'];

        public $listConfig = 'list_config.yaml';
    }


    Categories::extendListColumns(function($list, $model) {

        if (!$model instanceof MyModel)
            return;

        $list->addColumns([
            'my_column' => [
                'label' => 'My Column'
            ]
        ]);

    });

Также Вы можете переопределить метод `listExtendColumns` в классе контроллера.

    class Categories extends \Backend\Classes\Controller
    {
        [...]

        public function listExtendColumns($list)
        {
            $list->addColumns([...]);
        }
    }

Доступные методы объекта `$list`:

Метод | Описание
------------- | -------------
**addColumns** | добавляет новые столбцы в список
**removeColumn** | удаляет столбцы из списка

<a name="extend-model-query" class="anchor"></a>
### Изменение запроса к модели

Вы можете переопределить метод `listExtendQuery`, чтобы изменить запрос к модели при отображении списка внутри класса контроллера. Пример:

    public function listExtendQuery($query)
    {
        $query->withTrashed();
    }

Вы также можете переопределить метод `listFilterExtendQuery`, чтобы изменить запрос к модели при фильтрации списка внутри класса контроллера. Пример:

    public function listFilterExtendQuery($query, $scope)
    {
        if ($scope->scopeName == 'status') {
            $query->where('status', '<>', 'all');
        }
    }
