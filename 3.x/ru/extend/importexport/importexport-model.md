---
subtitle: Узнайте, как настроить процесс импорта и экспорта.
---
# Модель импорта и экспорта

Модели импорта и экспорта определяют логику, используемую при обработке действия импорта или экспорта, наследуя модели `Backend\Models\ImportModel` и `Backend\Models\ExportModel` соответственно. Эти модели предназначены для использования с [Контроллером импорта и экспорта](./importexport-controller.md), однако с ними можно работать напрямую в PHP.

## Модель импорта

Для импорта данных вы должны создать отдельную модель для этого процесса, которая наследует класс `Backend\Models\ImportModel`. Вот пример определения класса:

```php
class SubscriberImport extends \Backend\Models\ImportModel
{
    /**
     * @var array rules to be applied to the data.
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
            catch (Exception $ex) {
                $this->logError($row, $ex->getMessage());
            }

        }
    }
}
```

Класс должен определить метод `importData`, используемый для обработки импортированных данных. Первый параметр `$results` будет содержать массив с данными для импорта. Второй параметр `$sessionKey` будет содержать ключ сессии, используемый для запроса.

Метод | Описание
------------- | -------------
`logUpdated()` | Вызывается при обновлении записи.
`logCreated()` | Вызывается при создании записи.
`logError(rowIndex, message)` | Вызывается при возникновении проблемы с импортом записи.
`logWarning(rowIndex, message)` | Используется для мягкого предупреждения, например при изменении значения.
`logSkipped(rowIndex, message)` | Используется, когда вся строка данных не была импортирована (пропущена).

### Импорт с помощью PHP

Используйте метод `importFile` для ручной обработки импорта из локального файла, хранящегося на диске.

```php
$importModel = new MyImportClass;

$importModel->file_format = 'json';

$importModel->importFile('/path/to/import/file.json');
```

Если файл поступает из загруженного файла, используйте фасад `Input` для доступа к локальному пути.

```php
$importModel->importFile(
    Input::file('file')->getRealPath()
);
```

## Модель экспорта

Для экспорта данных вы должны создать отдельную модель, которая наследует класс `Backend\Models\ExportModel`. Вот пример:

```php
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
```

Класс должен определить метод `exportData`, используемый для возврата данных экспорта. Первый параметр `$columns` — это массив имён столбцов для экспорта. Второй параметр `$sessionKey` будет содержать ключ сессии, используемый для запроса.

### Экспорт с помощью PHP

Используйте метод `exportDownload` для ручной обработки экспорта и возврата ответа на скачивание.

```php
$exportColumns = ['id', 'title'];

$exportModel = new MyExportClass;

$exportModel->file_format = 'json';

return $exportModel->exportDownload('myexportfile.json', ['columns' => $exportColumns]);
```

## Пользовательские параметры

Обе формы импорта и экспорта поддерживают пользовательские параметры, которые могут быть добавлены с помощью полей формы, определённых в параметре **form** в конфигурации импорта или экспорта соответственно. Эти значения затем передаются в модель Импорта / Экспорта и доступны во время обработки.

```yaml
# config_import_export.yaml
import:
    # ...
    form: $/acme/campaign/models/subscriberimport/fields.yaml

export:
    # ...
    form: $/acme/campaign/models/subscriberexport/fields.yaml
```

Указанные поля формы будут отображаться на странице импорта/экспорта. Вот пример содержимого файла `fields.yaml`:

```yaml
# fields.yaml
fields:

    auto_create_lists:
        label: Automatically create lists
        type: checkbox
        default: true
```

Значение поля формы выше под названием **auto_create_lists** может быть доступно с помощью `$this->auto_create_lists` внутри метода `importData` модели импорта. Если бы это была модель экспорта, значение было бы доступно внутри метода `exportData`.

```php
class SubscriberImport extends \Backend\Models\ImportModel
{
    public function importData($results, $sessionKey = null)
    {
        if ($this->auto_create_lists) {
            // Do something
        }

        // ...
    }
}
```
