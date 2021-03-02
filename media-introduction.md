# Media Manager

- [Configuration Options](#configuration-options)
- [Audio and Video Players](#audio-and-video-players)
- [Events](#events)

<a name="configuration-options"></a>
## Configuration Options

There are several options that allow you to fine-tune the Media Manager. All of them could be defined in **config/system.php** file, in the **storage.media** section, for example:

    'storage' => [
        ...
        'media' => [
            ...
            'ignore' => ['.svn', '.git', '.DS_Store'],
            'image_extensions => ['png', 'jpg'],
        ]
    ],


Parameter | Value
------------- | -------------
**ignore** | a list of file and directory names to ignore. Defaults to ['.svn', '.git', '.DS_Store'].
**ttl** | specifies the cache time-to-live, in minutes. The default value is 10. The cache invalidates automatically when Library items are added, updated or deleted.
**image_extensions** | file extensions corresponding to the Image document type. The default value is **['gif', 'png', 'jpg', 'jpeg', 'bmp']**.
**video_extensions** | file extensions corresponding to the Video document type. The default value is **['mp4', 'avi', 'mov', 'mpg']**.
**audio_extensions** | file extensions corresponding to the Audio document type. The default value is **['mp3', 'wav', 'wma', 'm4a']**.

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

    Media\Widgets\MediaManager::extend(function($widget) {
        $widget->bindEvent('file.rename', function ($originalPath, $newPath) {
            // Update custom references to path here
        });
    });

Or listen globally via the `Event` facade (each event is prefixed with `media.` and will be passed the instantiated `Media\Widgets\MediaManager` object as the first parameter)

    Event::listen('media.file.rename', function($widget, $originalPath, $newPath) {
        // Update custom references to path here
    });
