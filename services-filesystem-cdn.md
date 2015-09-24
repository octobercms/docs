# Filesystem / CDN

- [Introduction](#introduction)
- [Configuration](#configuration)
- [Basic usage](#basic-usage)
    - [Obtaining disk instances](#obtaining-disk-instances)
    - [Retrieving files](#retrieving-files)
    - [Storing files](#storing-files)
    - [Deleting files](#deleting-files)
    - [Directories](#directories)

<a name="introduction"></a>
## Introduction

October provides a powerful filesystem abstraction thanks to Laravel and the wonderful [Flysystem](https://github.com/thephpleague/flysystem) PHP package. The Flysystem integration provides simple to use drivers for working with local filesystems, Amazon S3, and Rackspace Cloud Storage. Even better, it's amazingly simple to switch between these storage options as the API remains the same for each system.

<a name="configuration"></a>
## Configuration

The filesystem configuration file is located at `config/filesystems.php`. Within this file you may configure all of your "disks". Each disk represents a particular storage driver and storage location. Example configurations for each supported driver is included in the configuration file. So, simply modify the configuration to reflect your storage preferences and credentials.

Of course, you may configure as many disks as you like, and may even have multiple disks that use the same driver.

#### The local driver

When using the `local` driver, note that all file operations are relative to the `root` directory defined in your configuration file. By default, this value is set to the `storage/app` directory. Therefore, the following method would store a file in `storage/app/file.txt`:

    Storage::disk('local')->put('file.txt', 'Contents');

#### Other driver prerequisites

Before using the S3 or Rackspace drivers, you will need to install [Drivers plugin](http://octobercms.com/plugin/october-drivers).

<a name="basic-usage"></a>
## Basic usage

<a name="obtaining-disk-instances"></a>
### Obtaining disk instances

The `Storage` facade may be used to interact with any of your configured disks. For example, you may use the `put` method on the facade to store an avatar on the default disk. If you call methods on the `Storage` facade without first calling the `disk` method, the method call will automatically be passed to the default disk:

    $user = User::find($id);

    Storage::put(
        'avatars/'.$user->id,
        file_get_contents(Request::file('avatar')->getRealPath())
    );

When using multiple disks, you may access a particular disk using the `disk` method on the `Storage` facade. Of course, you may continue to chain methods to execute methods on the disk:

    $disk = Storage::disk('s3');

    $contents = Storage::disk('local')->get('file.jpg')

<a name="retrieving-files"></a>
### Retrieving files

The `get` method may be used to retrieve the contents of a given file. The raw string contents of the file will be returned by the method:

    $contents = Storage::get('file.jpg');

The `exists` method may be used to determine if a given file exists on the disk:

    $exists = Storage::disk('s3')->exists('file.jpg');

#### File meta information

The `size` method may be used to get the size of the file in bytes:

    $size = Storage::size('file1.jpg');

The `lastModified` method returns the UNIX timestamp of the last time the file was modified:

    $time = Storage::lastModified('file1.jpg');

<a name="storing-files"></a>
### Storing files

The `put` method may be used to store a file on disk. You may also pass a PHP `resource` to the `put` method, which will use Flysystem's underlying stream support. Using streams is greatly recommended when dealing with large files:

    Storage::put('file.jpg', $contents);

    Storage::put('file.jpg', $resource);

The `copy` method may be used to copy an existing file to a new location on the disk:

    Storage::copy('old/file1.jpg', 'new/file1.jpg');

The `move` method may be used to move an existing file to a new location:

    Storage::move('old/file1.jpg', 'new/file1.jpg');

#### Prepending / appending to files

The `prepend` and `append` methods allow you to easily insert content at the beginning or end of a file:

    Storage::prepend('file.log', 'Prepended Text');

    Storage::append('file.log', 'Appended Text');

<a name="deleting-files"></a>
### Deleting files

The `delete` method accepts a single filename or an array of files to remove from the disk:

    Storage::delete('file.jpg');

    Storage::delete(['file1.jpg', 'file2.jpg']);

<a name="directories"></a>
### Directories

#### Get all files within a directory

The `files` method returns an array of all of the files in a given directory. If you would like to retrieve a list of all files within a given directory including all sub-directories, you may use the `allFiles` method:

    $files = Storage::files($directory);

    $files = Storage::allFiles($directory);

#### Get all directories within a directory

The `directories` method returns an array of all the directories within a given directory. Additionally, you may use the `allDirectories` method to get a list of all directories within a given directory and all of its sub-directories:

    $directories = Storage::directories($directory);

    // Recursive...
    $directories = Storage::allDirectories($directory);

#### Create a directory

The `makeDirectory` method will create the given directory, including any needed sub-directories:

    Storage::makeDirectory($directory);

#### Delete a directory

Finally, the `deleteDirectory` may be used to remove a directory, including all of its files, from the disk:

    Storage::deleteDirectory($directory);
