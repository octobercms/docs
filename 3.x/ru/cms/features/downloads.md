---
subtitle: Простое скачивание файлов.
---
# Скачивание файлов

October CMS предоставляет простые возможности для скачивания файлов в ответах. Эта функция является опциональной для AJAX-фреймворка для обеспечения лучшей производительности.

## Кнопки скачивания

Чтобы включить скачивание файлов, добавьте атрибут `data-request-download` на HTML-тег формы или кнопки. Ниже приведён минимальный пример скачивания файла.

```html
<button data-request="onExport" data-request-download>
    Download
</button>
```

Если атрибут `data-request-download="..."` задан на элементе запроса, имя файла в этом атрибуте будет присвоено загружаемому файлу. Следующий пример создаёт файл с именем **data.csv**.

```html
<button data-request="onExport" data-request-download="data.csv">
    Download Document
</button>
```

Чтобы открыть файл в новом окне браузера, что обычно используется для предварительного просмотра PDF, установите атрибут `data-browser-target` в значение `_blank`.

```html
<button data-request="onExport" data-request-download data-browser-target="_blank">
    Open in New Window
</button>
```

::: tip
При использовании атрибута download ответ может быть как скачиванием, так и [обычным AJAX-обновлением](../ajax/update-partials.md).
:::

## Ответы для скачивания

Внутри вашего [AJAX-обработчика](../ajax/handlers.md) вы можете вернуть тип ответа `Response` для [скачивания файла](../../extend/services/response-view.md), где метод `download` принимает локальный путь к файлу на диске.

```php
public function onExport()
{
    return Response::download(base_path('app/files/installer.zip'));
}
```

Чтобы преобразовать строку в ответ для скачивания без записи содержимого на диск, используйте метод `streamDownload`, который принимает callback-функцию (первый аргумент) и имя файла (второй аргумент).

```php
public function onExport()
{
    return Response::streamDownload(function() {
        echo 'CSV Contents...';
    }, 'export.csv');
}
```

Вы также можете использовать [сервис хранилища](../../extend/services/storage.md) для скачивания файлов из медиатеки или любого хранилища. Используйте фасад `Storage` и метод `disk` для указания имени диска (первый аргумент), затем вызовите метод `download` с именем файла для скачивания (первый аргумент).

```php
public function onExport()
{
    return Storage::disk('media')->download('archive.zip');
}
```

При работе с [файловыми вложениями модели](../../extend/database/attachments.md) вы можете вызвать метод `download` на объекте файла.

```php
public function onDownload()
{
    // ...

    return $model->avatar->download();
}
```


## Пример использования

Следующий пример показывает CMS-страницу, которую можно использовать для скачивания [файлового вложения модели](../../extend/database/attachments.md) с пользовательским именем файла. Она принимает параметры `id` и `disk_name` для валидации файла, а затем возвращает ответ браузеру с пользовательским именем файла из параметра `file_name` (необязательный).

::: cmstemplate
```ini
## pages/download-file.htm

title = "Download File"
url = "/download-file/:id/:disk_name/:file_name?"
layout = "default"
```
```php
function onStart()
{
    $file = System\Models\File::find($this->param('id'));
    if (!$file || !$file->isPublic()) {
        throw new NotFoundException;
    }

    if ($file->disk_name !== $this->param('disk_name')) {
        throw new NotFoundException;
    }

    $customFileName = $this->param('file_name');
    if ($customFileName) {
        $file->file_name = $customFileName;
    }

    return $file->download();
}
```
```twig
```
:::

Вы можете создать ссылку на эту страницу в Twig с помощью следующей разметки, где переменная `file` является экземпляром `System\Models\File`.

```twig
{{ 'download-file'|page({
    id: file.id,
    disk_name: file.disk_name,
    file_name: 'my-custom-name.png'
}) }}
```

::: tip
Если вы хотите отобразить файл встроенным, например как изображение, вызовите метод `$file->output()`.
:::

#### См. также

::: also
* [Ответы и представления](../../extend/services/response-view.md)
:::
