---
subtitle: Добавляет функции управления формами на любую страницу панели управления.
---
# Контроллер форм

Класс `Backend\Behaviors\FormController` — это поведение контроллера, используемое для простого добавления функциональности форм на страницу панели управления. Поведение предоставляет три страницы: Создание, Обновление и Предпросмотр. Страница Предпросмотр является версией страницы Обновления только для чтения. При использовании поведения формы вам не нужно определять действия `create`, `update` и `preview` в контроллере — поведение делает это за вас. Однако вы должны предоставить соответствующие файлы представлений.

Поведение формы зависит от [определений полей](../../element/form-fields.md) формы и [класса модели](../database/model.md). Для использования поведения формы вы должны добавить его в свойство `$implement` класса контроллера. Также должно быть определено свойство класса `$formConfig`, значение которого должно ссылаться на YAML-файл, используемый для настройки свойств поведения.

```php
namespace Acme\Blog\Controllers;

class Categories extends \Backend\Classes\Controller
{
    public $implement = [
        \Backend\Behaviors\FormController::class
    ];

    public $formConfig = 'config_form.yaml';
}
```

::: tip
Очень часто контроллер формы и [контроллер списка](../lists/list-controller.md) используются вместе в одном контроллере.
:::

## Настройка поведения формы

Файл конфигурации, указанный в свойстве `$formConfig`, определяется в формате YAML. Файл должен быть размещён в [директории представлений контроллера](../system/views.md). Ниже приведён пример типичного файла конфигурации поведения формы.

```yaml
# config_form.yaml
name: Blog Category
form: $/acme/blog/models/post/fields.yaml
modelClass: Acme\Blog\Post

create:
    title: New Blog Post

update:
    title: Edit Blog Post

preview:
    title: View Blog Post
```

Следующие свойства обязательны в файле конфигурации формы.

Свойство | Описание
------------- | -------------
**name** | имя объекта, управляемого этой формой.
**form** | массив конфигурации или ссылка на файл определения полей формы, см. [поля формы](../../element/form-fields.md).
**modelClass** | имя класса модели, данные формы загружаются и сохраняются в эту модель.

Перечисленные ниже свойства конфигурации являются необязательными. Определите их, если хотите, чтобы поведение формы поддерживало страницы Создание, Обновление или Предпросмотр.

Свойство | Описание
------------- | -------------
**design** | отображать форму с использованием определённого режима дизайна при рендеринге (см. ниже).
**defaultRedirect** | используется как запасная страница перенаправления, если не определена конкретная страница перенаправления.
**create** | массив конфигурации или ссылка на файл конфигурации для страницы Создание.
**update** | массив конфигурации или ссылка на файл конфигурации для страницы Обновление.
**preview** | массив конфигурации или ссылка на файл конфигурации для страницы Предпросмотр.
**customMessages** | настройка сообщений, используемых в контроллере форм.
**permissions** | применение ограничений к определённым действиям, предоставляемым контроллером форм.

### Страница создания

Для поддержки страницы Создание добавьте следующую конфигурацию в YAML-файл.

```yaml
create:
    title: New Blog Post
    redirect: acme/blog/posts/update/:id
    redirectClose: acme/blog/posts
```

Для страницы Создание поддерживаются следующие свойства.

Свойство | Описание
------------- | -------------
**title** | заголовок страницы, может ссылаться на [строку локализации](../system/localization.md).
**redirect** | страница перенаправления при сохранении записи.
**redirectClose** | страница перенаправления при сохранении записи и отправке переменной **close** с запросом.
**form** | переопределяет определения полей формы по умолчанию только для страницы создания.

### Страница обновления

Для поддержки страницы Обновление добавьте следующую конфигурацию в YAML-файл.

```yaml
update:
    title: Edit Blog Post
    redirect: acme/blog/posts
```

Для страницы Обновление поддерживаются следующие свойства.

Свойство | Описание
------------- | -------------
**title** | заголовок страницы, может ссылаться на [строку локализации](../system/localization.md).
**redirect** | страница перенаправления при сохранении записи.
**redirectClose** | страница перенаправления при сохранении записи и отправке переменной **close** с запросом.
**form** | переопределяет определения полей формы по умолчанию только для страницы обновления.

### Страница предпросмотра

Для поддержки страницы Предпросмотр добавьте следующую конфигурацию в YAML-файл:

```yaml
preview:
    title: View Blog Post
```

Для страницы Предпросмотр поддерживаются следующие свойства.

Свойство  | Описание
------------- | -------------
**title** | заголовок страницы, может ссылаться на [строку локализации](../system/localization.md).
**form** | переопределяет определения полей формы по умолчанию только для страницы предпросмотра.

### Пользовательские сообщения

Укажите свойство `customMessages` для переопределения сообщений по умолчанию, используемых контроллером форм. Значения могут быть обычным текстом или ссылаться на [строку локализации](../system/localization.md).

```yaml
customMessages:
    notFound: Did not find the thing
    flashCreate: New thing created
    flashUpdate: Updated that thing
    flashDelete: Thing is gone
```

Вы также можете изменять сообщения в контексте отображаемой формы. Следующий пример переопределит сообщение `notFound` только для контекста `update`.

```yaml
update:
    customMessages:
        notFound: Nothing found when updating
```

Следующие сообщения доступны для переопределения.

::: details Просмотр списка доступных сообщений
Сообщение | Сообщение по умолчанию
------------- | -------------
**notFound** | Form record with an ID of :id could not be found.
**flashCreate** | :name Created
**flashUpdate** | :name Updated
**flashDelete** | :name Deleted
:::

### Ограничение разрешениями

Укажите свойство `permissions` для применения ограничений к действиям, предоставляемым контроллером форм. Используйте [значения разрешений](../backend/permissions.md), которые текущий пользователь панели управления должен иметь для использования поля. Поддерживается строка для одного разрешения или массив разрешений, из которых достаточно одного для предоставления доступа.

```yaml
permissions:
    modelCreate: admins.manage.create
    modelDelete: admins.manage.delete
```

Следующие свойства доступны для переопределения в качестве необходимых разрешений.

::: details Просмотр списка доступных сообщений
Сообщение | Сообщение по умолчанию
------------- | -------------
**modelCreate** | требуется для создания новых записей.
**modelUpdate** | требуется для изменения существующих записей.
**modelPreview** | требуется для предпросмотра существующих записей.
**modelDelete** | требуется для удаления существующих записей.
:::

## Определение полей формы

::: aside
Доступные свойства полей формы можно найти на странице [определения полей формы](../../element/form-fields.md).
:::

Поля формы определяются в YAML-файле. Конфигурация полей формы используется поведением формы для создания элементов управления формы и привязки их к полям модели.

Файл размещается в поддиректории директории **models** плагина. Имя поддиректории совпадает с именем класса модели в нижнем регистре. Имя файла не имеет значения, но **fields.yaml** и **form_fields.yaml** — распространённые имена. Пример расположения файла полей формы:

::: dir
├── plugins
|   └── acme
|       └── blog
|           └── `models`
|               ├── post  _← Директория конфигурации_
|               |   └── fields.yaml  _← Файл конфигурации_
|               └── Post.php  _← Класс модели_
:::

Поля могут быть размещены в трёх областях: **внешняя область**, **основные вкладки** или **вторичные вкладки**. Следующий пример показывает типичное содержимое файла определения полей формы.

```yaml
# fields.yaml
fields:
    blog_title:
        label: Blog Title
        description: The title for this blog

    published_at:
        label: Published date
        description: When this blog post was published
        type: datepicker

    # [...]

tabs:
    fields:
        # [...]

secondaryTabs:
    fields:
        # [...]
```

## Представления формы

Для каждой поддерживаемой формой страницы — Создание, Обновление и Предпросмотр — вы должны предоставить [файл представления](../backend/controllers-ajax.md) с соответствующим именем: **create.php**, **update.php** и **preview.php**.

Поведение формы добавляет два метода к классу контроллера: `formRender`, `formRenderDesign` и `formRenderPreview`. Эти методы рендерят элементы управления формы, настроенные с помощью описанного выше YAML-файла.

### Представление создания

Представление **create.php** представляет страницу Создание, позволяющую пользователям создавать новые записи. Типичная страница Создание содержит хлебные крошки, саму форму и кнопки формы. Атрибут **data-request** должен ссылаться на AJAX-обработчик `onSave`, предоставляемый поведением формы. Ниже приведено содержимое типичного файла представления создания.

```php
<?= Form::open(['class' => 'd-flex flex-column h-100']) ?>

    <div class="flex-grow-1">
        <?= $this->formRender() ?>
    </div>

    <div class="form-buttons">
        <div data-control="loader-container">
            <button
                type="button"
                data-request="onSave"
                data-request-data="{ close: true }"
                data-request-message="Creating Category..."
                data-hotkey="ctrl+enter, cmd+enter"
                class="btn btn-default">
                Create and Close
            </button>
            <span class="btn-text">
                or <a href="<?= Backend::url('acme/blog/categories') ?>">Cancel</a>
            </span>
        </div>
    </div>

<?= Form::close() ?>
```

Для отслеживания несохранённых изменений и отображения предупреждения при уходе со страницы формы добавьте атрибут `data-change-monitor` к открывающему тегу формы.

```php
<?= Form::open(['class' => '...', 'data-change-monitor' => true]) ?>
```

### Представление обновления

Представление **update.php** представляет страницу Обновление, позволяющую пользователям обновлять или удалять существующие записи. Типичная страница Обновление содержит хлебные крошки, саму форму и кнопки формы. Страница Обновление очень похожа на страницу Создание, но обычно имеет кнопку Удалить. Атрибут **data-request** должен ссылаться на AJAX-обработчик `onSave`, предоставляемый поведением формы. Ниже приведено содержимое типичного представления update.php.

```php
<?= Form::open(['class' => 'd-flex flex-column h-100']) ?>

    <div class="flex-grow-1">
        <?= $this->formRender() ?>
    </div>

    <div class="form-buttons">
        <div data-control="loader-container">
            <button
                type="button"
                data-request="onSave"
                data-request-data="{ close: true }"
                data-request-message="Saving Category..."
                data-hotkey="ctrl+enter, cmd+enter"
                class="btn btn-default">
                Save and Close
            </button>
            <button
                type="button"
                class="oc-icon-trash-o btn-icon danger pull-right"
                data-request="onDelete"
                data-request-message="Deleting Category..."
                data-request-confirm="Do you really want to delete this category?">
            </button>
            <span class="btn-text">
                or <a href="<?= Backend::url('acme/blog/categories') ?>">Cancel</a>
            </span>
        </div>
    </div>

<?= Form::close() ?>
```

### Представление предпросмотра

Представление **preview.php** представляет страницу Предпросмотр, позволяющую пользователям просматривать существующие записи в режиме только для чтения. Типичная страница Предпросмотр содержит хлебные крошки и саму форму. Ниже приведено содержимое типичного представления preview.php.

```php
<div class="form-preview">
    <?= $this->formRenderPreview() ?>
</div>
```

## Дизайны форм

Команда `create:controller` генерирует [контроллер](../system/controllers.md) и поддерживает опцию `--design` для реализации желаемого режима отображения, как описано ниже.

```bash
php artisan create:controller Acme.Blog Posts --design=popup
```

Дизайны форм полезны, когда нужно отображать форму без управления HTML-содержимым, что менее гибко, но может ускорить процесс создания форм.

```yaml
design:
    displayMode: basic
```

Свойство **design** в конфигурации поведения контролирует отображение формы. Поддерживаются следующие свойства.

Свойство | Описание
------------- | -------------
**displayMode** | указывает используемый режим отображения, поддерживаемые значения: `custom`, `basic`, `survey`, `sidebar`, `popup`. По умолчанию: `basic`
**horizontalMode** | показывать поля формы в горизонтальной ориентации. По умолчанию: `false`
**surveyMode** | отключает вкладки и отображает все поля на странице в секциях с заголовками. По умолчанию: `false`
**size** | размер контейнера страницы, поддерживаемые значения: шаг `50` между `400`-`1200`, `auto`. По умолчанию: `auto`
**sidebarSize** | ширина боковой панели в режиме `sidebar`, поддерживаемые значения: шаг `50` между `300`-`750`. По умолчанию: `300`

Используйте метод `formRenderDesign` для рендеринга дизайна формы внутри файлов представлений **create.php**, **update.php** и **preview.php**.

```php
<?= $this->formRenderDesign() ?>
```

### Режимы отображения

При использовании режима отображения **design** в конфигурации поведения содержимое представлений генерируется с использованием стандартного содержимого форм, предоставляемого системой.

Поддерживаются следующие значения **displayMode** с описаниями.

Режим отображения | Описание
------------- | -------------
**custom** | Рендеринг формы с использованием пользовательских файлов представлений (по умолчанию)
**basic** | Базовый макет для стандартных форм
**survey** | Макет опроса с использованием наложенных секций с заголовками
**sidebar** | Макет с боковой панелью, где вторичные вкладки рендерятся в боковой панели
**popup** | Содержимое формы управляется внутри всплывающих окон

Свойство **size** определяет размер контейнера страницы или размер всплывающего окна.

```yaml
design:
    displayMode: survey
    size: 950
```

### Режим отображения во всплывающем окне

Если **design** установлен на использование режима отображения `popup`, вам вообще не нужно создавать файлы представлений. Все функции управления формой содержатся внутри всплывающего окна.

```yaml
design:
    displayMode: popup
    size: 750
```

При интеграции с [контроллером списка](../lists/list-controller.md) установите свойство **recordOnClick** в `popup`, чтобы открывать представление управления при клике на запись.

```yaml
# config_list.yaml
recordOnClick: popup
```

**recordOnClick** также поддерживает передачу контекста в контроллер форм, например, установите значение `popup@preview` для контекста предпросмотра.

```yaml
# config_list.yaml
recordOnClick: popup@preview
```

Представление создания можно открыть с помощью AJAX-обработчика `onLoadPopupForm` в сочетании с элементом управления popup, как в примере ниже.

```html
<button
    type="button"
    data-control="popup"
    data-handler="onLoadPopupForm"
    class="btn btn-primary">
    New Item
</button>
```

## Расширение поведения формы

Иногда вам может потребоваться изменить поведение формы по умолчанию, и для этого существует несколько способов.

### Расширение конфигурации формы

Вы можете динамически расширить конфигурацию формы с помощью метода `formGetConfig`.

```php
public function formGetConfig()
{
    $config = $this->asExtension('FormController')->formGetConfig();

    $config->form = $this->makeConfig($config->form);

    // Set the active tab dynamically
    $config->form->tabs['activeTab'] = 'Activities';

    return $config;
}
```

### Переопределение действия контроллера

Вы можете использовать собственную логику для метода действия `create`, `update` или `preview` в контроллере, а затем опционально вызвать родительский метод поведения формы.

```php
public function update($recordId, $context = null)
{
    //
    // Do any custom code here
    //

    // Call the FormController behavior update() method
    return $this->asExtension('FormController')->update($recordId, $context);
}
```

### Переопределение данных сохранения формы

Вы можете использовать переопределение `formBeforeSave` (или эквивалентное) для изменения значений формы перед сохранением или обновлением. Для переопределения значения поля используйте метод `formSetSaveValue(key, value)`.

```php
public function formBeforeSave($model)
{
    // When locale dropdown is set to "custom", override with the _custom_locale text field
    if (post('MyModel[locale]') === 'custom') {
        $this->formSetSaveValue('locale', post('MyModel[_custom_locale]'));
    }
}
```

### Переопределение перенаправления контроллера

Вы можете указать URL для перенаправления после сохранения модели, переопределив метод `formGetRedirectUrl`. Этот метод возвращает адрес для перенаправления, где относительные URL считаются URL панели управления.

```php
public function formGetRedirectUrl($context = null, $model = null)
{
    return 'https://octobercms.com';
}
```

### Расширение запроса модели формы

Запрос поиска для [модели базы данных](../database/model.md) формы может быть расширен путём переопределения метода `formExtendQuery` внутри класса контроллера. Этот пример гарантирует, что мягко удалённые записи всё ещё могут быть найдены и обновлены, применяя область видимости **withTrashed** к запросу:

```php
public function formExtendQuery($query)
{
    $query->withTrashed();
}
```

### Расширение полей формы

Вы можете расширить поля другого контроллера извне, привязавшись к [глобальному событию](../services/event.md) `backend.form.extendFields`. Функция события получит аргумент `$form`, представляющий объект `Backend\Widgets\Form`, где вы можете использовать методы `getController`, `getModel` и `getContext` для проверки контекста выполнения.

Поскольку это событие может повлиять на все формы, важно проверить, что контроллер и модель имеют правильный тип. Вот пример использования метода `addFields` для добавления новых полей в форму настроек почты.

```php
Event::listen('backend.form.extendFields', function($form) {
    if (
        !$form->getController() instanceof \System\Controllers\Settings ||
        !$form->getModel() instanceof \System\Models\MailSetting
    ) {
        return;
    }

    $form->addFields([
        'my_field' => [
            'label' => 'My Field',
            'comment' => 'This is a custom field I have added.',
        ],
    ]);
});
```

Вы также можете расширить поля формы внутренне, переопределив метод `formExtendFields` внутри класса контроллера. Это повлияет только на форму, используемую поведением `FormController`.

```php
class Categories extends \Backend\Classes\Controller
{
    public $implement = [
        \Backend\Behaviors\FormController::class
    ];

    public function formExtendFields($form)
    {
        $form->addFields([...]);
    }
}
```

На объекте `$form` доступны следующие методы.

Метод | Описание
------------- | -------------
**addFields** | добавляет новые поля во внешнюю область
**addTabFields** | добавляет новые поля в область вкладок
**addSecondaryTabFields** | добавляет новые поля в область вторичных вкладок
**removeField** | удаляет поле из любой области

Каждый метод принимает массив полей, аналогичный [конфигурации полей формы](../../element/form-fields.md).

### Фильтрация полей формы

Как описано в [разделе зависимостей полей](./field-dependencies.md), вы также можете реализовать фильтрацию полей формы через расширение, подключившись к событию `form.filterFields`.

```php
User::extend(function ($model) {
    $model->bindEvent('model.form.filterFields', function ($formWidget, $fields, $context) use ($model) {
        if ($model->source_type === 'http') {
            $fields->source_url->hidden = false;
            $fields->git_branch->hidden = true;
        }
        elseif ($model->source_type === 'git') {
            $fields->source_url->hidden = false;
            $fields->git_branch->hidden = false;
        }
        else {
            $fields->source_url->hidden = true;
            $fields->git_branch->hidden = true;
        }
    });
});
```

## Валидация полей формы

Для валидации полей вашей формы вы можете использовать [трейт Validation](../database/traits.md) в вашей модели.
