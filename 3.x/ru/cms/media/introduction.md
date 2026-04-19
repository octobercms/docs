# Введение

October CMS поставляется со встроенным менеджером медиа, что упрощает публикацию крупных ресурсов, таких как видео и фотографии. Эти ресурсы затем можно вставлять на страницы и в файлы контента через пользовательский интерфейс.

![image](https://github.com/octobercms/docs/blob/develop/images/media-manager.png?raw=true)

## Ссылки на медиа

В большинстве случаев при вставке медиа-ресурсов в контент используется полный URL. Однако также можно генерировать эти URL из их относительных путей в директории медиа с помощью [Twig-фильтра](../../markup/filter/media.md) `|media`.

```twig
{{ 'relative/path/to/asset.jpg'|media }}
```

::: tip
Обратитесь к [статье о фильтре Media](../../markup/filter/media.md), чтобы узнать больше.
:::

## Параметры конфигурации

Существует несколько параметров для тонкой настройки менеджера медиа, определённых в файле **config/media.php**.

```php
/*
|--------------------------------------------------------------------------
| Ignored Files and Patterns
|--------------------------------------------------------------------------
|
| The media manager wil ignore file names and patterns specified here
|
*/

'ignore_files' => ['.svn', '.git', '.DS_Store', '.AppleDouble'],

'ignore_patterns' => ['^\..*'],
```

Конфигурация, определяющая место хранения медиа-файлов, находится в файле системной конфигурации. Обратитесь к [статье о провайдерах](./providers.md) для использования сторонних провайдеров, таких как Amazon S3.

## Аудио- и видеоплееры

По умолчанию система использует HTML5-теги audio и video для воспроизведения аудио- и видеофайлов:

```html
<video src="video.mp4" controls></video>
```

или

```html
<audio src="audio.mp3" controls></audio>
```

Это поведение можно переопределить. Если существуют CMS-фрагменты **oc-audio-player.htm** и **oc-video-player.htm**, они будут использоваться для отображения аудио- и видеоконтента. Внутри фрагментов используйте переменную **src** для вывода ссылки на исходный файл. Пример:

```html
<video src="{{ src }}" width="320" height="200" controls preload></video>
```

Если вы не хотите использовать HTML5-плеер, вы можете предоставить любую другую разметку в фрагментах. Существует [сторонний скрипт](https://html5media.info/), обеспечивающий поддержку HTML5-тегов video и audio в старых браузерах.

Поскольку фрагменты написаны на Twig, вы можете автоматизировать добавление альтернативных видеоисточников на основе соглашения об именовании. Например, если существует соглашение о наличии видео в меньшем разрешении для каждого видео в полном разрешении, и файл меньшего разрешения имеет расширение "iphone.mp4", сгенерированная разметка может выглядеть так:

```twig
<video controls>
    <source
        src="{{ src }}"
        media="only screen and (min-device-width: 568px)"></source>
    <source
        src="{{ src|replace({'.mp4': '.iphone.mp4'}) }}"
        media="only screen and (max-device-width: 568px)"></source>
</video>
```

## События

Менеджер медиа предоставляет [несколько событий](../../extend/extending.md), которые можно прослушивать для улучшения расширяемости.

Событие | Описание | Параметры
------------- | ------------- | -------------
**folder.delete** | Вызывается при удалении папки | `(string) $path`
**file.delete** | Вызывается при удалении файла | `(string) $path`
**folder.rename** | Вызывается при переименовании папки | `(string) $originalPath`, `(string) $newPath`
**file.rename** | Вызывается при переименовании файла | `(string) $originalPath`, `(string) $newPath`
**folder.create** | Вызывается при создании папки | `(string) $newFolderPath`
**folder.move** | Вызывается при перемещении папки | `(string) $path`, `(string) $dest`
**file.move** | Вызывается при перемещении файла | `(string) $path`, `(string) $dest`
**file.upload** | Вызывается при загрузке файла | `(string) $filePath`, `(\Symfony\Component\HttpFoundation\File\UploadedFile) $uploadedFile`

Для подключения к этим событиям расширьте класс `Media\Widgets\MediaManager` напрямую.

```php
Media\Widgets\MediaManager::extend(function($widget) {
    $widget->bindEvent('file.rename', function ($originalPath, $newPath) {
        // Update custom references to path here
    });
});
```

Или слушайте глобально через фасад `Event` (каждое событие имеет префикс `media.`, и первым параметром передаётся экземпляр объекта `Media\Widgets\MediaManager`).

```php
Event::listen('media.file.rename', function($widget, $originalPath, $newPath) {
    // Update custom references to path here
});
```
