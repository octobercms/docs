# Связи

<a name="introduction" class="anchor"></a>
## Введение

`Связи` - это модификатор контроллера, которой позволяет управлять сложными отношениями [модели](./database-model) на странице.

Для того, чтобы использовать связи, Вы должны указать их в перемененной `$implement` в классе контроллера. Также должна быть определена переменная `$relationConfig`, значение которой - YAML файл с настройками.

    namespace Acme\Projects\Controllers;

    class Projects extends Controller
    {
        public $implement = [
            'Backend.Behaviors.FormController',
            'Backend.Behaviors.RelationController',
        ];

        public $formConfig = 'config_form.yaml';
        public $relationConfig = 'config_relation.yaml';
    }

> **Важно:** Очень часто связи используются вместе с [формами](./backend-forms).

<a name="configuring-relation" class="anchor"></a>
## Настройка

Файл с настройками, на который ссылается переменная `$relationConfig`, должен иметь YAML формат и находиться в папке с [представлением](./backend-controllers-views-ajax#introduction) контроллера.

Рассмотрим модель *Invoice*:

    class Invoice {
        public $hasMany = [
            'items' => ['Acme\Pay\Models\InvoiceItem'],
        ];
    }

в которой указана связь с моделью *InvoiceItem*. Эта связь имеет название `items`, которое также используется в YAML файле с настройками:

    # ===================================
    #  Relation Behavior Config
    # ===================================

    items:
        label: Invoice Line Item
        view:
            list: $/acme/pay/models/invoiceitem/columns.yaml
            toolbarButtons: create|delete
        manage:
            form: $/acme/pay/models/invoiceitem/fields.yaml
            recordsPerPage: 10

Вы можете использовать следующие параметры для настройки связи:

Параметр | Описание
------------- | -------------
**label** | метка связи, обязательно.
**view** | параметр определяет вид контейнера, см. ниже.
**manage** | параметр определяет вид модального окна, см. ниже.
**pivot** | ссылка на файл с описанием полей формы, которая используется для [связи с таблицей данных](#belongs-to-many-pivot).
**emptyMessage** | сообщение при отсутствии связей, необязательно.
**readOnly** | отключает возможность добавлять, обновлять, удалять или создавать отношения. По умолчанию: false
**deferredBinding** | [откладывает все обязательные действия, используя ключ сессии](./database-model#deferred-binding) когда это возможно. По умолчанию: false

Параметр | Тип | Описание
------------- | ------------- | -------------
**form** | Форма | ссылка на YAML файл с [настройками формы](backend-forms#form-fields).
**list** | Список | ссылка на YAML файл с [настройками списка](backend-lists#list-columns).
**showSearch** | Список | отображает форму для поиска записи. По умолчанию: false
**showSorting** | Список | позволяет сортировать записи. По умолчанию: true
**defaultSort** | Список | указывает столбец и направление для сортировки по умолчанию. Разрешается использование строки или массива, где ключ - `column`, значение - `direction`.
**recordsPerPage** | Список | максимальное количество строк на странице.
**conditions** | Список | дополнительное условие фильтрации.
**scope** | Список | определяет [метод для изменения запроса](./database-model#query-scopes).
**showCheckboxes** | Список | отображает чекбокс для каждой строки.
**recordUrl** | Список | добавляет ссылку для каждой строки. Пример: **users/update/:id**. Где `:id` - идентификатор записи.
**recordOnClick** | Список | произвольный JavaScript код, который выполняется при клике на запись.
**toolbarPartial** | Форма и Список | ссылка на фрагмент контроллера с тулбаром. Пример: **_relation_toolbar.htm**. Этот параметр переопределяет *toolbarButtons*.
**toolbarButtons** | Форма и Список | позволяет отобразить кнопки: add, create, update, delete, remove, link, unlink. Пример: **add\|remove** или `false`, чтобы ничего не показывать.
**title** | Форма и Список | заголовок модального окна, можно использовать [локализацию](./plugin-localization).
**context** | Форма | контекст отображаемой формы. Строка или массив с ключами: create, update.

<a name="relationship-types" class="anchor"></a>
## Типы

Отображение менеджера связей зависит от типа отношений. Каждый тип имеет свои требования к конфигурации, которые выделены **жирным шрифтом**. Доступны следующие типы связей:

- [Has many](#has-many)
- [Belongs to many](#belongs-to-many)
- [Belongs to Many (with Pivot Data)](#belongs-to-many-pivot)
- [Belongs to](#belongs-to)
- [Has one](#has-one)

<a name="has-many" class="anchor"></a>
### Has many

1. Связанные записи отображаются в виде списка. (**view.list**).
1. При нажатии на запись отобразится форма для редактирования (**manage.form**).
1. При нажатии на кнопку *Add* на панели инструментов отобразится список выбора (**manage.list**).
1. При нажатии на кнопку *Create* на панели управления отобразится форма для создания (**manage.form**).
1. При нажатии на кнопку *Delete* запись/записи удаляется/удаляются.
1. При нажатии на кнопку *Remove* удаляются отношения.

Например, если *запись в блоге* имеет много *комментариев*, то в качестве главной модели устанавливается запись, и отображается список комментариев, используя колонки из **списка**. При нажатии на комментарий отображается всплывающая форма с полями, определенными в **форме** "Обновить комментарий". Комментарии могут быть созданы таким же образом. Ниже приведен пример конфигурационного файла:

    # ===================================
    #  Relation Behavior Config
    # ===================================

    comments:
        label: Comment
        manage:
            form: $/acme/blog/models/comment/fields.yaml
            list: $/acme/blog/models/comment/columns.yaml
        view:
            list: $/acme/blog/models/comment/columns.yaml
            toolbarButtons: create|delete

<a name="belongs-to-many" class="anchor"></a>
### Belongs to many

1. Связанные записи отображаются в виде списка (**view.list**).
1. При нажатии на кнопку *Add* на панели инструментов отобразится список выбора (**manage.list**).
1. При нажатии на кнопку *Create* на панели управления отобразится форма для создания (**manage.form**).
1. При нажатии на кнопку *Delete* запись/записи из таблицы удаляется/удаляются.
1. При нажатии на кнопку *Remove* удаляются отношения.

Например, если *пользователь* принадлежит к нескольким *ролям*, то в качестве главной модели устанавливается  пользователь, и отображается список ролей, используя колонки из **списка**. Роли пользователя могут быть добавлены или удалены. Ниже приведен пример конфигурационного файла:

    # ===================================
    #  Relation Behavior Config
    # ===================================

    roles:
        label: Role
        view:
            list: $/acme/user/models/role/columns.yaml
            toolbarButtons: add|remove
        manage:
            list: $/acme/user/models/role/columns.yaml
            form: $/acme/user/models/role/fields.yaml

<a name="belongs-to-many-pivot" class="anchor"></a>
### Belongs to many (with Pivot Data)

1. Связанные записи отображаются в виде списка (**view.list**).
1. При нажатии на запись отобразится форма с данными для редактирования (**pivot.form**).
1. При нажатии на кнопку *Add* на панели инструментов отобразится список (**manage.list**) выбора и форма для ввода данных (**pivot.form**).
1. При нажатии на кнопку Удалить таблица с данными удаляется.

Рассмотрим предыдущий пример. Роль может иметь ограниченный срок действия. При нажатии на нее отобразится всплывающая форма, которая позволяет изменить дату окончания этого срока. Ниже приведен пример конфигурационного файла:

    # ===================================
    #  Relation Behavior Config
    # ===================================

    roles:
        label: Role
        view:
            list: $/acme/user/models/role/columns.yaml
        manage:
            list: $/acme/user/models/role/columns.yaml
        pivot:
            form: $/acme/user/models/role/fields.yaml

Сводные данные доступны при определении полей формы и столбцов списка через `pivot`. Пример:

    # ===================================
    #  Relation Behavior Config
    # ===================================

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

> **Note:** Сводные данные (на данный момент) не поддерживаются [отолежнным связыванием](./database-relations#deferred-binding), таким образом родительская модель должна существовать заранее.

<a name="belongs-to" class="anchor"></a>
### Belongs to

1. Связанная запись отображаются в виде формы предпросмотра (**view.form**).
1. При нажатии на кнопку *Create* отобразится форма создания (**manage.form**).
1. При нажатии на кнопку *Update* отобразится форма изменения (**manage.form**).
1. При нажатии на кнопку *Link* к отобразится список выбора (**manage.list**).
1. При нажатии на кнопку *Unlink* связь исчезнет.
1. При нажатии на кнопку *Delete* запись удаляется.

Например, если *телефон* принадлежит *человеку*, то менеджер связей отобразит **форму** с определенными полями. При нажатии на кнопку "Link" отобразится список людей, к которым можно привязать телефон. При нажатии на кнопку "Unlink" связь исчезнет.

    # ===================================
    #  Relation Behavior Config
    # ===================================

    person:
        label: Person
        view:
            form: $/acme/user/models/person/fields.yaml
            toolbarButtons: link|unlink
        manage:
            form: $/acme/user/models/person/fields.yaml
            list: $/acme/user/models/person/columns.yaml

<a name="has-one" class="anchor"></a>
### Has one

1. Связанная запись отображаются в виде формы предпросмотра (**view.form**).
1. При нажатии на кнопку *Create* отобразится форма создания (**manage.form**).
1. При нажатии на кнопку *Update* отобразится форма изменения (**manage.form**).
1. При нажатии на кнопку *Link* к отобразится список выбора (**manage.list**).
1. При нажатии на кнопку *Unlink* связь исчезнет.
1. При нажатии на кнопку *Delete* запись удаляется.

Например, если *человек* имеет один *телефонный номер*, то менеджер связей отобразит **форму** с определенными полями. При нажатии на кнопку "Изменить" отобразится форма для редактирования. Если человек уже имеет телефон, то он обновится, иначе будет добавлен новый номер.

    # ===================================
    #  Relation Behavior Config
    # ===================================

    phone:
        label: Phone
        view:
            form: $/acme/user/models/phone/fields.yaml
            toolbarButtons: update|delete
        manage:
            form: $/acme/user/models/phone/fields.yaml
            list: $/acme/user/models/phone/columns.yaml

<a name="relation-display" class="anchor"></a>
## Менеджер связей

Целевая модель должна быть сначала инициализирована в контроллере путем вызова метода `initRelation()` для того, чтобы управлять отношениями на любой странице.

    $post = Post::where('id', 7)->first();
    $this->initRelation($post);

> **Note:** На страницах Создания, Редактирования и Предпросмотра модель инициализируется автоматически.

Вы можете отобразить менеджер связи на определенной странице при помощи метода `relationRender()`. Например для страницы [Предпросмотра](./backend-forms#form-preview-view), содержимое файла **preview.htm** может выглядеть так:

    <?= $this->formRenderPreview() ?>

    <?= $this->relationRender('comments') ?>

Вы можете отобразить менеджер связи в режиме "только чтение", передав массив `['readOnly' => true]` в качестве второго аргумента:

    <?= $this->relationRender('comments', ['readOnly' => true]) ?>
