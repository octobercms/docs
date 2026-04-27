---
subtitle: Простая загрузка файлов.
---
# Загрузка файлов

October CMS предоставляет простые возможности для загрузки файлов через отправку форм. Эта функция является опциональной для AJAX-фреймворка для обеспечения лучшей производительности.

## Загрузка файлов

Чтобы включить загрузку файлов в форме, добавьте атрибут `data-request-files` на HTML-тег формы. Ниже приведён минимальный пример загрузки файла.

```html
<form data-request="onUploadFiles" data-request-files>
    <div>
        <label>Single File</label>
        <input name="single_file" type="file">
    </div>

    <button data-attach-loading>
        Upload
    </button>
</form>
```

::: aside
Обратитесь к [статье о запросах и вводе](../../extend/services/request-input.md), чтобы узнать больше о доступных методах функции `files()`.
:::

Внутри вашего [AJAX-обработчика](../ajax/handlers.md) используйте вспомогательную функцию `files()` для доступа к загруженному файлу и вызовите метод `store` для сохранения файла на [диск хранилища](../../extend/services/storage.md). Возвращаемое значение — локальный путь к сохранённому файлу.

Следующий пример сохраняет загруженный файл в директорию **storage/app/userfiles** с автоматически сгенерированным именем.

```php
function onUploadFiles()
{
    $filePath = files('single_file')->store('userfiles');

    // ...

    Flash::success('File saved');
}
```

### Загрузка нескольких файлов

Когда к полю ввода файла добавлен атрибут `multiple`, вспомогательная функция `files()` возвращает массив.

```html
<div>
    <label>Multi File</label>
    <input name="multi_file[]" type="file" multiple>
</div>
```

```php
function onUploadFiles()
{
    $filePaths = [];

    foreach (files('multi_file') as $file) {
        $filePaths[] = $file->store('userfiles');
    }

    // ...

    Flash::success('File saved');
}
```

### Валидация загружаемых файлов

Как и при [обычной валидации форм](./validation.md), файлы можно валидировать с помощью фасада `Request` и метода `validate`. Используйте суффикс `.*` при валидации нескольких элементов. Следующий пример проверяет, что загруженный файл является изображением и его размер не превышает 1 МБ.

```php
function onUploadFiles()
{
    Request::validate([
        'single_file' => 'required|image|max:1024',
        'multi_file.*' => 'required|image|max:1024',
    ]);

    Flash::success('Files are valid!');
}
```

## Загрузка в модели

При работе с моделями, настроенными для использования [файловых вложений](../../extend/database/attachments.md), включая модели Tailor, использующие [виджет загрузки файлов](../../element/form/widget-fileupload.md), вы можете сохранять загруженные файлы непосредственно в модели.

Простейший подход — установить атрибут модели напрямую с помощью вспомогательной функции `files()`. Это поддерживает загрузку одного и нескольких файлов.

```php
function onUploadFiles()
{
    $model = new MyModel;

    $model->avatar = files('single_file');

    $model->save();

    // ...

    Flash::success('File saved');
}
```

Вы также можете установить атрибут непосредственно в объект модели `System\Models\File` для различных сценариев использования.

```php
$model->avatar = (new File)->fromFile('/path/to/somefile.jpg');

$model->avatar = (new File)->fromData('Some content', 'sometext.txt');

$model->avatar = (new File)->fromUrl('https://example.tld/path/to/avatar.jpg');
```

Обратитесь к [статье о файловых вложениях](../../extend/database/attachments.md), чтобы узнать больше о работе с файловыми вложениями моделей.

#### См. также

::: also
* [Запросы и ввод](../../extend/services/request-input.md)
* [Диски хранилища](../../extend/services/storage.md)
* [Файловые вложения](../../extend/database/attachments.md)
:::
