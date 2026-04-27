# 介绍

October CMS 内置了媒体管理器，方便您发布视频和照片等大型资源文件。这些资源可以通过用户界面插入到页面和内容文件中。

![image](https://github.com/octobercms/docs/blob/develop/images/media-manager.png?raw=true)

## 链接到媒体

在大多数情况下，将媒体资源插入到内容中时会使用完整的 URL。不过，也可以使用 `|media` [Twig 过滤器](../../markup/filter/media.md)从媒体目录中的相对路径生成这些 URL。

```twig
{{ 'relative/path/to/asset.jpg'|media }}
```

::: tip
查看[媒体过滤器文章](../../markup/filter/media.md)了解更多信息。
:::

## 配置选项

有几个选项允许您微调媒体管理器，这些选项在 **config/media.php** 文件中定义。

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

指定媒体文件存储位置的配置位于系统配置文件中，请参阅[提供者文章](./providers.md)了解如何使用 Amazon S3 等第三方提供者。

## 音频和视频播放器

默认情况下，系统使用 HTML5 音频和视频标签来渲染音频和视频文件：

```html
<video src="video.mp4" controls></video>
```

或

```html
<audio src="audio.mp3" controls></audio>
```

此行为可以被覆盖。如果存在 **oc-audio-player.htm** 和 **oc-video-player.htm** CMS 局部模板，它们将用于显示音频和视频内容。在局部模板中使用变量 **src** 来输出源文件的链接。示例：

```html
<video src="{{ src }}" width="320" height="200" controls preload></video>
```

如果您不想使用 HTML5 播放器，可以在局部模板中提供任何其他标记。有一个[第三方脚本](https://html5media.info/)可以在旧版浏览器中启用 HTML5 视频和音频标签的支持。

由于局部模板是用 Twig 编写的，您可以根据命名约定自动添加替代视频源。例如，如果有一个约定：每个全分辨率视频都有一个较小分辨率的视频，且较小分辨率的文件扩展名为 "iphone.mp4"，则生成的标记可能如下所示：

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

## 事件

媒体管理器提供了[一些事件](../../extend/extending.md)，您可以监听这些事件以提高可扩展性。

事件 | 描述 | 参数
------------- | ------------- | -------------
**folder.delete** | 当文件夹被删除时调用 | `(string) $path`
**file.delete** | 当文件被删除时调用 | `(string) $path`
**folder.rename** | 当文件夹被重命名时调用 | `(string) $originalPath`, `(string) $newPath`
**file.rename** | 当文件被重命名时调用 | `(string) $originalPath`, `(string) $newPath`
**folder.create** | 当文件夹被创建时调用 | `(string) $newFolderPath`
**folder.move** | 当文件夹被移动时调用 | `(string) $path`, `(string) $dest`
**file.move** | 当文件被移动时调用 | `(string) $path`, `(string) $dest`
**file.upload** | 当文件被上传时调用 | `(string) $filePath`, `(\Symfony\Component\HttpFoundation\File\UploadedFile) $uploadedFile`

要挂钩这些事件，可以直接扩展 `Media\Widgets\MediaManager` 类。

```php
Media\Widgets\MediaManager::extend(function($widget) {
    $widget->bindEvent('file.rename', function ($originalPath, $newPath) {
        // Update custom references to path here
    });
});
```

或者通过 `Event` 门面进行全局监听（每个事件都以 `media.` 为前缀，并且会将实例化的 `Media\Widgets\MediaManager` 对象作为第一个参数传递）。

```php
Event::listen('media.file.rename', function($widget, $originalPath, $newPath) {
    // Update custom references to path here
});
```
