---
previousPath: extend/services/storage.md
subtitle: Read and write files on local and cloud disks using a single filesystem API.
---
# Storage

October CMS provides a filesystem abstraction through Laravel and the [Flysystem](https://github.com/thephpleague/flysystem) PHP package. It includes drivers for local filesystems and Amazon S3, and the API is the same for each, so you can switch between storage options without changing your code.

```php
Storage::put('file.txt', 'Contents');

$contents = Storage::get('file.txt');
```

## Choosing a Disk

The `Storage` facade works with any of your configured disks. For example, use the `put` method on the facade to store an avatar on the default disk. If you call methods on the `Storage` facade without first calling the `disk` method, the call goes to the default disk.

```php
$user = User::find($id);

Storage::put(
    'avatars/'.$user->id,
    file_get_contents(Request::file('avatar')->getRealPath())
);
```

When you use multiple disks, access a specific disk with the `disk` method on the `Storage` facade. You can then chain methods to run them on that disk.

```php
$disk = Storage::disk('s3');

$contents = Storage::disk('local')->get('file.jpg');
```

## Retrieving Files

The `get` method retrieves the contents of a file. It returns the raw string contents of the file.

```php
$contents = Storage::get('file.jpg');
```

The `exists` method checks if a file exists on the disk.

```php
$exists = Storage::disk('s3')->exists('file.jpg');
```

#### File Meta Information

The `size` method returns the size of the file in bytes.

```php
$size = Storage::size('file1.jpg');
```

The `lastModified` method returns the UNIX timestamp of the last time the file was modified.

```php
$time = Storage::lastModified('file1.jpg');
```

## Storing Files

The `put` method stores a file on disk. You can also pass a PHP `resource` to the `put` method, which uses Flysystem's underlying stream support. We recommend streams when you work with large files.

```php
Storage::put('file.jpg', $contents);

Storage::put('file.jpg', $resource);
```

The `copy` method copies an existing file to a new location on the disk.

```php
Storage::copy('old/file1.jpg', 'new/file1.jpg');
```

The `move` method moves an existing file to a new location.

```php
Storage::move('old/file1.jpg', 'new/file1.jpg');
```

#### Prepending / Appending to Files

The `prepend` and `append` methods insert content at the beginning or end of a file.

```php
Storage::prepend('file.log', 'Prepended Text');

Storage::append('file.log', 'Appended Text');
```

## Deleting Files

The `delete` method accepts a single file name or an array of files to remove from the disk.

```php
Storage::delete('file.jpg');

Storage::delete(['file1.jpg', 'file2.jpg']);
```

## Working with Directories

#### Get All Files Within a Directory

The `files` method returns an array of all the files in a directory. To include the files in all sub-directories, use the `allFiles` method.

```php
$files = Storage::files($directory);

$files = Storage::allFiles($directory);
```

#### Get All Directories Within a Directory

The `directories` method returns an array of all the directories in a directory. To include all of its sub-directories, use the `allDirectories` method.

```php
$directories = Storage::directories($directory);

// Recursive...
$directories = Storage::allDirectories($directory);
```

#### Create a Directory

The `makeDirectory` method creates the directory, including any sub-directories it needs.

```php
Storage::makeDirectory($directory);
```

#### Delete a Directory

The `deleteDirectory` method removes a directory and all of its files from the disk.

```php
Storage::deleteDirectory($directory);
```

## Configuring Disks

The filesystem configuration file is located at **config/filesystems.php**. In this file you configure all of your "disks". Each disk represents a storage driver and storage location. The configuration file includes example configurations for each supported driver, so update it to reflect your storage preferences and credentials.

You can configure as many disks as you like, and even have multiple disks that use the same driver.

#### The Local Driver

When you use the `local` driver, all file operations are relative to the `root` directory defined in your configuration file. By default, this value is set to the `storage/app/private` directory. So the following method stores a file in `storage/app/private/file.txt`.

```php
Storage::disk('local')->put('file.txt', 'Contents');
```

#### The S3 Driver

Before using the S3 driver, install the Flysystem S3 package with the Composer package manager.

```bash
composer require league/flysystem-aws-s3-v3 "^3.0"
```

The S3 driver configuration is located in your **config/filesystems.php** configuration file. This file contains an example configuration array for an S3 driver, which you can change to use your own S3 configuration and credentials.

#### See Also

::: also
* [Media & Storage](../../setup/media-storage.md)
* [Request & Input](./request-input.md)
* [Laravel File Storage](https://laravel.com/docs/12.x/filesystem)
:::
