---
previousPath: [cms/media/introduction.md, cms/media/providers.md]
subtitle: Link to media files, configure the media manager, and choose where October CMS stores uploaded files, including Amazon S3.
---
# Media & Storage

The media manager is a built-in library for larger assets such as photos and video, which editors insert into pages and content through the backend panel. This page shows how to link to media files, where October CMS stores files, and how to move that storage to Amazon S3.

```twig
{{ 'relative/path/to/asset.jpg'|media }}
```

![image](https://github.com/octobercms/docs/blob/develop/images/media-manager.png?raw=true)

## Linking to Media Files

When editors insert media assets into content, the complete URL is usually used. You can also generate these URLs from their paths relative to the media directory with the [`|media` Twig filter](../handbook/twig-filters/media.md), as shown above.

## Where Files Are Stored

October CMS stores files on the disks defined in the `config/filesystems.php` file. Each disk can use a different driver, so you can keep some files on the local disk and others in cloud storage.

Disk | Stores
------------- | -------------
**uploads** | files attached to models with `System\Models\File`
**media** | files managed in the media manager
**resources** | automatically generated assets, such as thumbnails and combined JavaScript and CSS files
**assets** | theme asset files edited in the CMS editor, when [assets are stored in shared storage](../themes/database-themes.md#storing-assets-in-shared-storage)

By default, the media manager uses the local **storage/app/media** directory.

```php
'media' => [
    'driver' => 'local',
    'root' => storage_path('app/media'),
    'url' => '/storage/app/media',
    'visibility' => 'public',
    'throw' => false,
],
```

After you change the media manager configuration, reset its cache by clicking the **Refresh** button in the media manager toolbar.

## Storing Media on Amazon S3

To use Amazon S3, install the Flysystem S3 package first.

```bash
composer require league/flysystem-aws-s3-v3 "^3.0"
```

Then create an S3 bucket, a folder in the bucket and an API user, and update the disk configuration.

### Creating a Public Bucket

Sign up for an Amazon AWS account, or sign in to the AWS Console with your existing account, and open the S3 management panel. Create a new bucket with any name. The bucket name becomes part of your public file URLs.

By default, files in S3 buckets cannot be accessed directly. To make the bucket public, open the bucket's permissions and edit its bucket policy. Paste the following code, replacing `BUCKETNAME` with your bucket name:

```json
{
    "Version": "2008-10-17",
    "Id": "Policy1397632521960",
    "Statement": [
        {
            "Sid": "Stmt1397633323327",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::BUCKETNAME/*"
        }
    ]
}
```

::: tip
New S3 buckets block public access by default. Turn off the block public access settings for the bucket before you save a public bucket policy.
:::

Save the policy. It gives public read-only access to every folder in the bucket. If you use the bucket for other things too, you can make only a specific folder public by naming it in the **Resource** value:

```
"arn:aws:s3:::BUCKETNAME/media/*"
```

### Creating an API User

October CMS needs an API user to manage the bucket files. In the AWS Console, go to the IAM section and create a new user with any name. Create an access key for the user, then copy the **Access Key ID** and **Secret Access Key** somewhere safe.

Attach the **AmazonS3FullAccess** policy to the user.

### Configuring the Media Disk

Open the **config/filesystems.php** file and find the `media` disk in the **disks** section. Change the `driver` to `s3` and add the API credentials and bucket information:

Parameter | Value
------------- | -------------
**driver** | the storage driver to use, `local` or `s3`.
**key** | the **Access Key ID** of the user you created.
**secret** | the **Secret Access Key** of the user you created.
**bucket** | your bucket name.
**region** | the bucket region code, such as `us-west-2` for US West (Oregon). Find the code for your bucket's region in the [AWS documentation](http://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region).
**url** | the public URL of the folder in the bucket. To find it, upload any file to the folder, open the file in the S3 console, and copy its URL without the file name and trailing slash.

Example configuration:

```php
'disks' => [
    // ...
    'media' => [
        'driver' => 's3',
        'key'    => 'XXXXXXXXXXXXXXXXXXXX',
        'secret' => 'xxxXxXX+XxxxxXXxXxxxxxxXxxXXXXXXXxxxX9Xx',
        'region' => 'us-west-2',
        'bucket' => 'my-bucket',
        'url' => 'https://s3-us-west-2.amazonaws.com/my-bucket',
        'visibility' => 'public',
        'throw' => false
    ],
    // ...
]
```

Save the **config/filesystems.php** file and October CMS starts using Amazon S3 for media. You can also put the Amazon CloudFront CDN in front of your bucket, as described in the [CloudFront documentation](http://aws.amazon.com/cloudfront/). After you configure CloudFront, update the **url** parameter in the disk configuration.

::: tip
The most common issue with remote services is an SSL connection problem. If you get SSL errors, make sure your server has up-to-date SSL certificates from the public Certificate Authorities (CA).
:::

## Configuring the Media Manager

The **config/media.php** file contains options that fine-tune the media manager.

Option | Description
------------- | -------------
**item_cache_ttl** | the cache time-to-live, in minutes. The cache invalidates automatically when items are added, updated or deleted. Default: `10`.
**auto_rename** | set to `slug` to slug the names of uploaded files and of created or renamed folders. Reads the `MEDIA_AUTO_RENAME` environment variable.
**clean_vectors** | removes scripts and other potentially dangerous content from uploaded SVG files. Default: `true`.
**ignore_files** | file names the media manager ignores.
**ignore_patterns** | file name patterns the media manager ignores.
**default_extensions** | the file extensions allowed to be uploaded and stored.
**image_extensions** | the file extensions treated as images.
**video_extensions** | the file extensions treated as video.
**audio_extensions** | the file extensions treated as audio.

For example, the ignored files and patterns are set like this:

```php
/*
|--------------------------------------------------------------------------
| Ignored Files and Patterns
|--------------------------------------------------------------------------
|
| The media manager will ignore file names and patterns specified here
|
*/

'ignore_files' => ['.svn', '.git', '.DS_Store', '.AppleDouble'],

'ignore_patterns' => ['^\..*'],
```

## Customizing Audio and Video Players

By default, audio and video files inserted from the media manager render with HTML5 audio and video tags:

```html
<video src="video.mp4" controls></video>
```

or

```html
<audio src="audio.mp3" controls></audio>
```

To change this, create **oc-audio-player.htm** and **oc-video-player.htm** CMS partials in your theme. October CMS uses them to display audio and video content. Inside the partials, the **src** variable holds the link to the source file. For example:

```html
<video src="{{ src }}" width="320" height="200" controls preload></video>
```

The partials can contain any markup, so you are not limited to the HTML5 players.

Since the partials use Twig, you can add alternative video sources based on a naming convention. For example, if every full resolution video has a smaller version whose file name ends in "iphone.mp4", the markup could look like this:

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

## Responding to Media Manager Events

The media manager fires [events](../backend/plugins/extending.md) that you can listen to, for example to update your own references when a file moves.

Event | Description | Parameters
------------- | ------------- | -------------
**folder.delete** | Called when a folder is deleted | `(string) $path`
**file.delete** | Called when a file is deleted | `(string) $path`
**folder.rename** | Called when a folder is renamed | `(string) $originalPath`, `(string) $newPath`
**file.rename** | Called when a file is renamed | `(string) $originalPath`, `(string) $newPath`
**folder.create** | Called when a folder is created | `(string) $newFolderPath`
**folder.move** | Called when a folder is moved | `(string) $path`, `(string) $dest`
**file.move** | Called when a file is moved | `(string) $path`, `(string) $dest`
**file.beforeUpload** | Called before a file is uploaded | `(\Symfony\Component\HttpFoundation\File\UploadedFile) $uploadedFile`
**file.upload** | Called when a file is uploaded | `(string) $filePath`, `(\Symfony\Component\HttpFoundation\File\UploadedFile) $uploadedFile`

To hook into these events, extend the `Media\Widgets\MediaManager` class directly.

```php
Media\Widgets\MediaManager::extend(function($widget) {
    $widget->bindEvent('file.rename', function ($originalPath, $newPath) {
        // Update custom references to path here
    });
});
```

Or listen globally with the `Event` facade. Global event names are prefixed with `media.`, and the `Media\Widgets\MediaManager` object is passed as the first parameter.

```php
Event::listen('media.file.rename', function($widget, $originalPath, $newPath) {
    // Update custom references to path here
});
```

#### See Also

::: also
* [Media Filter](../handbook/twig-filters/media.md)
* [Media Finder Form Field](../handbook/form-fields/mediafinder.md)
* [Storage](../backend/services/storage.md)
* [Storing Themes in the Database](../themes/database-themes.md)
:::
