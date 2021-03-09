# Media Manager

- [Configuration Options](#configuration-options)
- [Audio and Video Players](#audio-and-video-players)
- [Events](#events)

October CMS ships with a media manager built in, making it easy to publish larger assets such as video and photos. These assets can then be inserted to your pages and content files via the user interface.

![image](https://github.com/octobercms/docs/blob/master/images/media-manager.png?raw=true) {.img-responsive .frame}

<a name="media-links"></a>
## Linking to Media

In most cases the complete URL will be used when inserting media assets in to your content. However, it is also possible to generate these URLs from their relative paths in the media directory using the `|media` [filter](../markup/filter-media).

    {{ 'relative/path/to/asset.jpg'|media }}

<a name="configuration-options"></a>
## Configuration Options

There are several options that allow you to fine-tune the Media Manager, which are defined in **config/media.php** file.

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

The configuration that specifies where media files are kept is in the system configuration file, see the [Providers article](../media/providers) on using third party providers such as Amazon S3.

#### SVG uploads are disabled by default

For security reasons, uploading SVG graphic files is disabled in October CMS by default. This is because there is potential for malicious code to be executed when the SVG file renders on the page. If your website is open to the public, we recommend leaving this setting as normal.

To allow the use of SVG files in the backend, simply add it to the list of image extensions.

    'image_extensions' => [..., 'svg'],

<a name="audio-and-video-players"></a>
## Audio and Video Players

By default the system uses HTML5 audio and video tags to render audio and video files:

    <video src="video.mp4" controls></video>

or

    <audio src="audio.mp3" controls></audio>

This behavior can be overridden. If there are **oc-audio-player.htm** and **oc-video-player.htm** CMS partials, they will be used for displaying audio and video contents. Inside the partials use the variable **src** to output a link to the source file. Example:

    <video src="{{ src }}" width="320" height="200" controls preload></video>

If you don't want to use HTML5 player you can provide any other markup in the partials. There's a [third-party script](https://html5media.info/) that enables support of HTML5 video and audio tags in older browsers.

As the partials are written with Twig, you can automate adding alternative video sources based on a naming convention. For example, if there's a convention that there's always a smaller resolution video for each full resolution video, and the smaller resolution file has extension "iphone.mp4", the generated markup could look like this:

    <video controls>
        <source
            src="{{ src }}"
            media="only screen and (min-device-width: 568px)"></source>
        <source
            src="{{ src|replace({'.mp4': '.iphone.mp4'}) }}"
            media="only screen and (max-device-width: 568px)"></source>
    </video>

<a name="events"></a>
## Events

The Media Manager provides a few [events](../services/events) that you can listen for in order to improve extensibility.

Event | Description | Parameters
------------- | ------------- | -------------
**folder.delete** | Called when a folder is deleted | `(string) $path`
**file.delete** | Called when a file is deleted | `(string) $path`
**folder.rename** | Called when a folder is renamed | `(string) $originalPath`, `(string) $newPath`
**file.rename** | Called when a file is renamed | `(string) $originalPath`, `(string) $newPath`
**folder.create** | Called when a folder is created | `(string) $newFolderPath`
**folder.move** | Called when a folder is moved | `(string) $path`, `(string) $dest`
**file.move** | Called when a file is moved | `(string) $path`, `(string) $dest`
**file.upload** | Called when a file is uploaded | `(string) $filePath`, `(\Symfony\Component\HttpFoundation\File\UploadedFile) $uploadedFile`

To hook into these events, either extend the `Media\Widgets\MediaManager` class directly

    \Media\Widgets\MediaManager::extend(function($widget) {
        $widget->bindEvent('file.rename', function ($originalPath, $newPath) {
            // Update custom references to path here
        });
    });

Or listen globally via the `Event` facade (each event is prefixed with `media.` and will be passed the instantiated `Media\Widgets\MediaManager` object as the first parameter)

    \Event::listen('media.file.rename', function($widget, $originalPath, $newPath) {
        // Update custom references to path here
    });
