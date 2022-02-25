# 介绍

October CMS 附带了一个内置的媒体管理器，可以轻松发布更多的资产，例如视频和照片。然后可以通过用户界面将这些资产插入到您的页面和内容文件中。

![image](https://i.ibb.co/wNfs7KK/media-manager.png)

## 链接到媒体

在大多数情况下，将媒体资产插入您的内容时将使用完整的 URL。但是，也可以使用 `|media` [过滤器](../markup/filter-media.md) 从它们在媒体目录中的相对路径生成这些 URL。

```twig
{{ 'relative/path/to/asset.jpg'|media }}
```

您还可以使用`MediaLibrary` 类在 PHP 中生成 URL。

```php
\Media\Classes\MediaLibrary::url('relative/path/to/asset.jpg');
```

## 配置选项

有几个选项允许您微调媒体管理器，这些选项在 **config/media.php** 文件中定义。

```php
/*
|--------------------------------------------------------------------------
| Ignored Files and Patterns[忽略的文件和模式]
|--------------------------------------------------------------------------
|
| The media manager wil ignore file names and patterns specified here[媒体管理器将忽略此处指定的文件名和模式]
|
*/

'ignore_files' => ['.svn', '.git', '.DS_Store', '.AppleDouble'],

'ignore_patterns' => ['^\..*'],
```

指定媒体文件保存位置的配置在系统配置文件中，请参阅有关使用第三方提供商(例如 Amazon S3)的[提供商文章](../media/providers.md)。

#### SVG 上传默认禁用

出于安全原因，默认情况下在October CMS 中禁用上传 SVG 图形文件。这是因为当 SVG 文件呈现在页面上时，可能会执行恶意代码。如果您的管理区域向公众开放，我们建议您保持正常设置。

要允许在后端使用 SVG 文件，只需将其添加到图像扩展名列表中即可。

```php
'image_extensions' => [..., 'svg'],
```

## 音频和视频播放器

默认情况下，系统使用 HTML5 音频和视频标签来渲染音频和视频文件：

```html
<video src="video.mp4" controls></video>
```

或者

```html
<audio src="audio.mp3" controls></audio>
```

此行为可以被覆盖。如果有 **oc-audio-player.htm** 和 **oc-video-player.htm** CMS 部件，它们将用于显示音频和视频内容。在部件内部使用变量 **src** 输出到源文件的链接。例子：

```html
<video src="{{ src }}" width="320" height="200" controls preload></video>
```

如果您不想使用 HTML5 播放器，您可以在部件中提供任何其他标记。 有一个 [第三方脚本](https://html5media.info/) 可以在旧浏览器中支持 HTML5 视频和音频标签。

由于部件是用 Twig 编写的，因此您可以根据命名约定自动添加替代视频源。 例如，如果约定每个全分辨率视频总是有一个较小分辨率的视频，并且较小分辨率的文件具有扩展名`huawei.mp4`，则生成的标记可能如下所示：

```twig
<video controls>
    <source
        src="{{ src }}"
        media="only screen and (min-device-width: 568px)"></source>
    <source
        src="{{ src|replace({'.mp4': '.huawei.mp4'}) }}"
        media="only screen and (max-device-width: 568px)"></source>
</video>
```

## 事件

媒体管理器提供了一些 [事件](../services/events.md)，您可以监听它们以提高可扩展性。

事件 |说明 |参数
------------- | ------------- | -------------
**folder.delete** | 删除文件夹时调用 | `(string) $path`
**file.delete** | 删除文件时调用 | `(string) $path`
**folder.rename** | 重命名文件夹时调用 | `(string)$originalPath`,`(string)$newPath`
**file.rename** | 重命名文件时调用 | `(string)$originalPath`,`(string)$newPath`
**folder.create** | 创建文件夹时调用 | `(string)$newFolderPath`
**folder.move** | 移动文件夹时调用 | `(string) $path`,`(string)$dest`
**file.move** | 移动文件时调用 | `(string) $path`,`(string)$dest`
**file.upload** | 上传文件时调用 | `(string)$filePath`,`(\Symfony\Component\HttpFoundation\File\UploadedFile) $uploadedFile`

要挂钩这些事件，请直接扩展`Media\Widgets\MediaManager` 类

``php
\Media\Widgets\MediaManager::extend(function($widget) {
    $widget->bindEvent('file.rename', function ($originalPath, $newPath) {
        // 在此处更新对路径的自定义引用
    });
});
```

或者通过 `Event` 门面全局监听(每个事件都以 `media.` 为前缀，并将被实例化的 `Media\Widgets\MediaManager` 对象作为第一个参数传递)

```php
\Event::listen('media.file.rename', function($widget, $originalPath, $newPath) {
    // 在此处更新对路径的自定义引用
});
```
