# Вложения файлов

Модели могут поддерживать вложения файлов, используя подмножество [полиморфных связей](./relations.md). Связи `$attachOne` или `$attachMany` предназначены для привязки файла к записи базы данных, называемой «вложениями». Практически во всех случаях модель `System\Models\File` используется для поддержания этой связи, где ссылки на файлы хранятся как записи в таблице `system_files` и имеют полиморфную связь с родительской моделью.

В примерах ниже модель имеет одну модель вложения Avatar и много моделей вложений Photo.

Одно вложение файла:

```php
public $attachOne = [
    'avatar' => \System\Models\File::class
];
```

Несколько вложений файлов:

```php
public $attachMany = [
    'photos' => \System\Models\File::class
];
```

::: warning
Во избежание конфликта имён убедитесь, что таблица базы данных вашей модели не имеет атрибута с тем же именем, что и ваша связь вложения.
:::

Защищённые вложения загружаются в директорию **uploads/protected** приложения, которая недоступна для прямого доступа из Web. Защищённое вложение файла определяется путём установки свойства `public` в `false`.

```php
public $attachOne = [
    'avatar' => [\System\Models\File::class, 'public' => false]
];
```

## Создание новых вложений

Для связей единичного вложения (`$attachOne`) вы можете создать вложение напрямую через связь модели, установив его значение с помощью функции `files`, которая читает данные файла из загрузки input.

```php
$model->avatar = files('file_input');
```

Для ассоциации нового файла из локального пути используйте модель `System\Models\File` и метод `fromFile`.

```php
$model->avatar = (new File)->fromFile('/path/to/somefile.jpg');
```

Для создания файла напрямую из (необработанных) данных используйте метод `fromData`, чтобы передать содержимое (первый аргумент) и имя файла (второй аргумент).

```php
$model->avatar = (new File)->fromData('Some content', 'sometext.txt');
```

Вы также можете добавить файл из URL с помощью метода `fromUrl`. Для использования этого метода необходимо установить расширение cURL PHP.

```php
$model->avatar = (new File)->fromUrl('https://example.tld/path/to/avatar.jpg');
```

Опционально вы можете указать пользовательское имя файла (второй аргумент).

```php
$model->avatar = (new File)->fromUrl('https://example.tld/avatar.jpg', 'customname.jpg');
```

### Обработка множественных вложений

Для связей множественных вложений (`$attachMany`) вы можете передать массив значений из функции `files()`.

```php
$model->photos = (array) files('multi_file');
```

Вы можете использовать метод `create` для добавления файла к существующей связи, обратите внимание, что объект файла ассоциируется с атрибутом `data`. Этот подход также может использоваться для единичных связей, если вы предпочитаете.

```php
$model->photos()->create(['data' => files('file_input')]);
```

Вы можете использовать метод `add` для связи, чтобы работать напрямую с моделью `System\Models\File`.

```php
$model->photos()->add(
    $model->photos()->make()->fromFile('/path/to/somefile.jpg')
);
```

Альтернативно вы можете подготовить модель File заранее, а затем вручную ассоциировать связь позже. Обратите внимание, что атрибут `is_public` должен быть установлен явно при этом подходе.

```php
$file = new \System\Models\File;
$file->data = files('file_input');
$file->is_public = true;
$file->save();

$model->photos()->add($file);
```

## Просмотр вложений

Метод `getUrl` возвращает полный URL загруженного публичного файла. Следующий код выведет что-то вроде **example.tld/uploads/public/path/to/avatar.jpg**.

```php
echo $model->avatar->getUrl();
```

Возврат путей множественных вложений.

```php
foreach ($model->photos as $photo) {
    echo $photo->getUrl();
}
```

Отображение файла на странице с помощью Twig.

```twig
<img src="{{ model.avatar.url }}" alt="Description Image" />
```

### Доступ к локальному пути

Метод `getLocalPath` вернёт абсолютный путь загруженного файла в локальной файловой системе. При использовании внешнего драйвера, такого как S3, этот метод скачает содержимое во временное расположение в локальной файловой системе.

```php
echo $model->avatar->getLocalPath();
```

## Изменение размера миниатюр

Вы можете изменить размер изображения с помощью метода `getThumbUrl`. Метод принимает 3 параметра — ширину изображения, высоту изображения и параметр опций.

Параметры **width** и **height** должны быть указаны как число или как слово **auto** для автоматического пропорционального масштабирования.

```php
echo $model->avatar->getThumbUrl(100, 100, ['mode' => 'crop']);
```

Отображение изображения на странице с помощью Twig.

```twig
<img src="{{ model.avatar.thumbUrl(100, 100, { mode: 'exact', quality: 80, extension: 'webp' }) }}" alt="Description Image" />
```

Подробнее о доступных параметрах `getThumbUrl` читайте в [статье об изменении размера изображений](../services/resizer.md).

## Вывод и скачивание

Для прямого вывода содержимого файла используйте метод `output`, который возвращает [объект ответа](../services/response-view.md), включающий необходимые заголовки для отображения файла в браузере.

```php
return $model->avatar->output();
```

Вы можете вывести содержимое в браузер, вызвав метод `send` по цепочке.

```php
$model->avatar->output()->send();
```

Верните метод `download` для скачивания файла в качестве ответа.

```php
return $model->avatar->download();
```

## Пример использования

Этот раздел показывает полный пример использования функции вложений модели — от определения связи в модели до отображения загруженного изображения на странице.

Внутри вашей модели определите связь с классом `System\Models\File`, например:

```php
class Post extends Model
{
    public $attachOne = [
        'featured_image' => \System\Models\File::class
    ];
}
```

Создайте форму для загрузки файла:

```php
<?= Form::open(['files' => true]) ?>

    <input name="example_file" type="file">

    <button type="submit">Upload File</button>

<?= Form::close() ?>
```

Обработайте загруженный файл на сервере и прикрепите его к модели:

```php
// Find the Blog Post model
$post = Post::find(1);

// Save the featured image of the Blog Post model
if (Input::hasFile('example_file')) {
    $post->featured_image = Input::file('example_file');
}
```

Альтернативно вы можете использовать [отложенную привязку](./relations.md) для отсрочки связи.

```php
// Find the Blog Post model
$post = Post::find(1);

// Look for the postback data 'example_file' in the HTML form above
$fileFromPost = Input::file('example_file');

// If it exists, save it as the featured image with a deferred session key
if ($fileFromPost) {
    $post->featured_image()->create(['data' => $fileFromPost], $sessionKey);
}
```

Отобразите загруженный файл на странице:

```php
<?php
// Find the Blog Post model again
$post = Post::find(1);

// Look for the featured image address, otherwise use a default one
if ($post->featured_image) {
    $featuredImage = $post->featured_image->getUrl();
}
else {
    $featuredImage = 'http://placehold.it/220x300';
}
?>

<img src="<?= $featuredImage ?>" alt="Featured Image" />
```

Если вам нужно получить доступ к владельцу файла, вы можете использовать свойство `attachment` модели `File`:

```php
public $morphTo = [
    'attachment' => []
];
```

Пример:

```php
$user = $file->attachment;
```

Для получения дополнительной информации читайте о [полиморфных связях](./relations.md#relation-polymorphic-relations)

## Пример валидации

Пример ниже использует [валидацию массива](../services/validation.md) для валидации связей `$attachMany`.

```php
use System\Models\File;
use Model;

class Gallery extends Model
{
    use \October\Rain\Database\Traits\Validation;

    public $attachMany = [
        'photos' => File::class
    ];

    public $rules = [
        'photos' => ['required'],
        'photos.*' => ['image', 'max:1000', 'dimensions:min_width=100,min_height=100'],
    ];
}
```

Для получения дополнительной информации о синтаксисе `attribute.*`, используемом выше, смотрите [статью о валидации](../services/validation.md) по валидации массивов.
