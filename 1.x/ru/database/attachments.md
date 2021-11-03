# Прикрепление файлов

<a name="file-attachments" class="anchor" ></a>
## Прикрепление файла к модели

Вы можете прикреплять файлы к модели, используя [полиморфные связи](../database/relations.md#polymorphic-relations).

In the examples below the model has a single Avatar attachment model and many Photo attachment models.

Пример прикрепления одного файла (аватара):

    public $attachOne = [
        'avatar' => 'System\Models\File'
    ];

Пример прикрепления нескольких файлов (фотографий):

    public $attachMany = [
        'photos' => 'System\Models\File'
    ];

Вы можете запретить/разрешить прямой доступ к файлам, используя дополнительный параметр *public*:

    public $attachOne = [
        'avatar' => ['System\Models\File', 'public' => false]
    ];

Все защищенные файлы лежат в папке **uploads/protected**.

<a name="creating-attachments" class="anchor" ></a>
### Creating new attachments

Вы можете использовать метод `Input::file`, чтобы сразу прикрепить файл (`$attachOne`) к модели:

    $model->avatar = Input::file('file_input');

Или указать абсолютный путь до файла:

    $model->avatar = '/path/to/somefile.jpg';

Используйте метод `create()`, чтобы прикрепить сразу несколько файлов (`$attachMany`):

    $model->avatar()->create(['data' => Input::file('file_input')]);

Или сначала создайте модель `File`:

    $file = new System\Models\File;
    $file->data = Input::file('file_input');
    $file->is_public = true;
    $file->save();

    $model->avatar()->add($file);

<a name="viewing-attachments" class="anchor" ></a>
### Просмотр прикрепленных файлов

Метод `getPath()` возвращает полный путь до загруженного файла. Пример:
**http://mysite.com/uploads/public/path/to/avatar.jpg**

    // один файл
    echo $model->avatar->getPath();

    // несколько файлов
    foreach ($model->photos as $photo) {
        echo $photo->getPath();
    }

Метод `getLocalPath()` возвращает абсолютный путь до загруженного файла.

    echo $model->avatar->getLocalPath();

Используйте метод `output()` для отображения содержимого файла:

    echo $model->avatar->output();

Вы можете изменить размер изображения при помощи метода `getThumb()`. Он принимает 3 параметра - ширину изображения (число или **auto**), высоту (число или **auto**) и массив со следующими элементами:

Ключ | Значение
------------- | -------------
**mode** | auto, exact, portrait, landscape, crop. По умолчанию: auto
**quality** | 0 - 100. По умолчанию: 95
**extension** | auto, jpg, png, gif. По умолчанию: jpg

Пример:

    echo $model->avatar->getThumb(100, 100, ['mode' => 'crop']);

<a name="attachments-usage-example" class="anchor" ></a>
### Примеры

В этом разделе представлены все примеры использования моделей для прикрепления файлов - от определения связей, до отображения загруженного изображения на странице.

Связь с классом `System\Models\File` определяется внутри модели. Пример:

    class Post extends Model
    {
        public $attachOne = [
            'featured_image' => 'System\Models\File'
        ];
    }

Создаем форму для загрузки файла:

    <?= Form::open(['files' => true]) ?>

        <input name="example_file" type="file">

        <button type="submit">Upload File</button>

    <?= Form::close() ?>

Процесс загрузки файла на сервер и его привязка к модели:

    // Поиск модели
    $post = Post::find(1);

    // Сохранение изображения
    if (Input::hasFile('example_file')) {
        $post->featured_image = Input::file('example_file');
    }

В качестве альтернативы Вы можете использовать [отложенное связывание](../database/relations.md#deferred-binding):

    // Поиск модели
    $post = Post::find(1);

    // Получаем файл из формы
    $fileFromPost = Input::file('example_file');

    // Сохранение изображения, если оно существует
    if ($fileFromPost) {
        $post->featured_image()->create(['data' => $fileFromPost], $sessionKey);
    }

Отображение файла на странице:

    // Поиск модели
    $post = Post::find(1);

    // Используем изображение по умолчанию, если его нет в статье
    if ($post->featured_image) {
        $featuredImage = $post->featured_image->getPath();
    }
    else {
        $featuredImage = 'http://placehold.it/220x300';
    }

    <img src="<?= $featuredImage ?>" alt="Featured Image">
