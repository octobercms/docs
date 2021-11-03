# Импорт и экспорт

<a name="introduction" class="anchor"></a>
## Введение

**Поведение Импорт-Экспорт** - модификатор контроллера, который позволяет настроить импорт и экспорт данных при помощи двух страниц: "Импорт" и "Экспорт". Страница "Импорт" позволяет пользователю загрузить CSV файл и внести новые значения в таблицу в базе данных. Страница "Экспорт" позволяет скачать данные из таблицы в CSV файл. При этом используются два действия контроллера - `import()` и `export()` соответственно.

Чтобы использовать импорт и экспорт, Вам необходимо добавить свойства `$implement` и `$importExportConfig` в контроллер:

    namespace Acme\Shop\Controllers;

    class Products extends Controller
    {
        public $implement = [
            'Backend.Behaviors.ImportExportController',
        ];

        public $importExportConfig = 'config_import_export.yaml';

        // [...]
    }

<a name="configuring-import-export" class="anchor"></a>
## Настройка поведения

Файл **config_import_export.yaml** должен лежать в [папке с представлениями](../backend/controllers-views-ajax/#introduction) контроллера. Пример содержимого:

    # ===================================
    #  Import/Export Behavior Config
    # ===================================

    import:
        title: Import subscribers
        modelClass: Acme\Campaign\Models\SubscriberImport
        list: $/acme/campaign/models/subscriber/columns.yaml

    export:
        title: Export subscribers
        modelClass: Acme\Campaign\Models\SubscriberExport
        list: $/acme/campaign/models/subscriber/columns.yaml

Параметр | Описание
------------- | -------------
**defaultRedirect** | страница, на которую будет перенаправлен пользователь по умолчанию.
**import** | массив с настройками или ссылка на файл с настройками страницы Импорта.
**export** | массив с настройками или ссылка на файл с настройками страницы Экспорта.

<a name="import-page" class="anchor"></a>
### Страница Импорта

Добавьте следующие настройки в YAML файл для создания страницы Импорта:

    import:
        title: Import subscribers
        modelClass: Acme\Campaign\Models\SubscriberImport
        list: $/acme/campaign/models/subscriberimport/columns.yaml
        redirect: acme/campaign/subscribers

Параметры конфигурации:

Параметры | Описание
------------- | -------------
**title** | название страницы, можно использовать [локализацию](../plugin/localization).
**list** | определяет столбцы списка доступных для импорта.
**form** | дополнительные поля, опционально.
**redirect** | страница, на которую будет перенаправлен пользователь после окончания импорта, опционально.
**permissions** | права, которые должен иметь пользователь для выполнения операции, опционально.

<a name="export-page" class="anchor"></a>
### Страница Экспорта

Добавьте следующие настройки в YAML файл для создания страницы Экспорта:

    export:
        title: Export subscribers
        modelClass: Acme\Campaign\Models\SubscriberExport
        list: $/acme/campaign/models/subscriberexport/columns.yaml
        redirect: acme/campaign/subscribers

Параметры конфигурации:

Параметры | Описание
------------- | -------------
**title** | название страницы, можно использовать [локализацию](../plugin/localization).
**fileName** | название файла, по умолчанию **export.csv**.
**list** | определяет столбцы списка доступных для экспорта.
**form** | дополнительные поля, опционально.
**redirect** | страница, на которую будет перенаправлен пользователь после окончания экспорта, опционально.
**useList** | [интеграция со списком](#list-behavior-integration), **true** или **false**, по умолчанию **false**, опционально.

<a name="import-export-views" class="anchor"></a>
## Представления

Для каждой страницы Импорта и Экспорта должен существовать свой файл [представления](../backend/controllers-views-ajax/#introduction) **import.htm** и **export.htm** соответственно.

Поведение предоставляет доступ к двум методам в классе контроллера: `importRender()` и `exportRender()`, которые нужны для отображения элементов формы импорта и экспорта.

<a name="import-view" class="anchor"></a>
### Импорт

Представление **import.htm** отображает форму для импорта данных. Обычно страница содержит хлебные крошки, элемент формы импорта и кнопку. Атрибут **data-request** должен указывать на AJAX обработчик `onImport`. Ниже представлен пример содержимого файла import.htm:

    <?= Form::open(['class' => 'layout']) ?>

        <div class="layout-row">
            <?= $this->importRender() ?>
        </div>

        <div class="form-buttons">
            <button
                type="submit"
                data-control="popup"
                data-handler="onImportLoadForm"
                data-keyboard="false"
                class="btn btn-primary">
                Import records
            </button>
        </div>

    <?= Form::close() ?>

<a name="export-view" class="anchor"></a>
### Экспорт

Представление **export.htm** отображает форму для экспорта данных. Обычно страница содержит хлебные крошки, элемент формы экспорта и кнопку. Атрибут **data-request** должен указывать на AJAX обработчик `onExport`. Ниже представлен пример содержимого файла export.htm:

    <?= Form::open(['class' => 'layout']) ?>

        <div class="layout-row">
            <?= $this->exportRender() ?>
        </div>

        <div class="form-buttons">
            <button
                type="submit"
                data-control="popup"
                data-handler="onExportLoadForm"
                data-keyboard="false"
                class="btn btn-primary">
                Export records
            </button>
        </div>

    <?= Form::close() ?>

<a name="import-model" class="anchor"></a>
## Модель Импорта

Для импорта данных необходимо создать специальную модель, которая расширяет класс `Backend\Models\ImportModel`. Пример:

    class SubscriberImport extends \Backend\Models\ImportModel
    {
        /**
         * @var array The rules to be applied to the data.
         */
        public $rules = [];

        public function importData($results, $sessionKey = null)
        {
            foreach ($results as $row => $data) {

                try {
                    $subscriber = new Subscriber;
                    $subscriber->fill($data);
                    $subscriber->save();

                    $this->logCreated();
                }
                catch (\Exception $ex) {
                    $this->logError($row, $ex->getMessage());
                }

            }
        }
    }

Класс должен содержать метод `importData()`, который используется для импорта данных. Параметр `$results` будет содержать массив с данными. Параметр `$sessionKey` содержит ключ сессии, который используется для запроса.

Метод | Описание
------------- | -------------
`logUpdated()` | Вызывается, когда запись обновлена.
`logCreated()` | Вызывается при создании записи.
`logError(rowIndex, message)` | Вызывается, когда существует проблема, связанная с импортом записи.
`logWarning(rowIndex, message)` | Используется для обеспечения "мягкого предупреждение", например, изменение значения.
`logSkipped(rowIndex, message)` | Используется, когда вся строка данных не была импортирована.

<a name="export-model" class="anchor"></a>
## Модель Экспорта

Для экспорта данных необходимо создать специальную модель, которая расширяет класс `Backend\Models\ExportModel`. Пример:

    class SubscriberExport extends \Backend\Models\ExportModel
    {
        public function exportData($columns, $sessionKey = null)
        {
            $subscribers = Subscriber::all();
            $subscribers->each(function($subscriber) use ($columns) {
                $subscriber->addVisible($columns);
            });
            return $subscribers->toArray();
        }
    }

Класс должен содержать метод `exportData()`, который используется для экспорта данных. Параметр `$columns` содержит название столбцов для экспорта. Параметр `$sessionKey` содержит ключ сессии, который используется для запроса.

<a name="custom-options" class="anchor"></a>
## Пользовательские поля

Формы импорта и экспорта также поддерживают произвольные поля, которые могут быть добавлены при помощи параметра **form** в файле с настройками импорта и экспорта. Значения этих полей передаются в модель импорта / экспорта и доступны во время обработки.

    import:
        [...]
        form: $/acme/campaign/models/subscriberimport/fields.yaml

    export:
        [...]
        form: $/acme/campaign/models/subscriberexport/fields.yaml

Пример содержимого файла `fields.yaml`:

    # ===================================
    #  Form Field Definitions
    # ===================================

    fields:

        auto_create_lists:
            label: Automatically create lists
            type: checkbox
            default: true


Значение поля **auto_create_lists** может быть получено при помощи `$this->auto_create_lists` внутри метода `importData()` или `exportData()`:

    class SubscriberImport extends \Backend\Models\ImportModel
    {
        public function importData($results, $sessionKey = null)
        {
            if ($this->auto_create_lists) {
                // Do something
            }

            [...]
        }
    }

<a name="list-behavior-integration" class="anchor"></a>
## Интеграция со списком

Вы можете использовать [списки](../backend/lists) для экспорта данных. Для этого необходимо добавить `Backend.Behaviors.ListController` в свойство `$implement` класса контроллера. Пример:

    export:
        useList: true

Если вы используете [несколько списков](../backend/lists#multiple-list-definitions):

    export:
        useList: orders
        fileName: orders.csv
