# 存储

October CMS 借助 Laravel 和出色的 [Flysystem](https://github.com/thephpleague/flysystem) PHP 包提供了强大的文件系统抽象。Flysystem 集成提供了简单易用的驱动程序，用于处理本地文件系统和 Amazon S3。更棒的是，在这些存储选项之间切换非常简单，因为每个系统的 API 保持不变。

## 配置

文件系统配置文件位于 `config/filesystems.php`。在此文件中，你可以配置所有的"磁盘"。每个磁盘代表一个特定的存储驱动程序和存储位置。配置文件中包含了每个支持的驱动程序的示例配置。因此，只需修改配置以反映你的存储偏好和凭据即可。

当然，你可以配置任意数量的磁盘，甚至可以有多个使用相同驱动程序的磁盘。

#### 本地驱动程序

使用 `local` 驱动程序时，请注意所有文件操作都相对于配置文件中定义的 `root` 目录。默认情况下，此值设置为 `storage/app` 目录。因此，以下方法将在 `storage/app/file.txt` 中存储文件：

```php
Storage::disk('local')->put('file.txt', 'Contents');
```

#### 其他驱动程序先决条件

在使用 S3 驱动程序之前，你需要通过 Composer 包管理器安装 Flysystem S3 包。

```bash
composer require league/flysystem-aws-s3-v3 "^3.0"
```

S3 驱动程序配置信息位于你的 `config/filesystems.php` 配置文件中。此文件包含 S3 驱动程序的示例配置数组。你可以使用自己的 S3 配置和凭据自由修改此数组。

## 基本用法

### 获取磁盘实例

`Storage` 门面可用于与你配置的任何磁盘交互。例如，你可以使用门面上的 `put` 方法将头像存储在默认磁盘上。如果你在没有先调用 `disk` 方法的情况下调用 `Storage` 门面上的方法，该方法调用将自动传递给默认磁盘：

```php
$user = User::find($id);

Storage::put(
    'avatars/'.$user->id,
    file_get_contents(Request::file('avatar')->getRealPath())
);
```

使用多个磁盘时，你可以使用 `Storage` 门面上的 `disk` 方法访问特定磁盘。当然，你可以继续链式调用方法以在磁盘上执行操作：

```php
$disk = Storage::disk('s3');

$contents = Storage::disk('local')->get('file.jpg')
```

### 获取文件

`get` 方法可用于获取给定文件的内容。该方法将返回文件的原始字符串内容：

```php
$contents = Storage::get('file.jpg');
```

`exists` 方法可用于确定给定文件是否存在于磁盘上：

```php
$exists = Storage::disk('s3')->exists('file.jpg');
```

#### 文件元信息

`size` 方法可用于获取文件的大小（以字节为单位）：

```php
$size = Storage::size('file1.jpg');
```

`lastModified` 方法返回文件最后修改时间的 UNIX 时间戳：

```php
$time = Storage::lastModified('file1.jpg');
```

### 存储文件

`put` 方法可用于在磁盘上存储文件。你也可以将 PHP `resource` 传递给 `put` 方法，它将使用 Flysystem 的底层流支持。在处理大文件时，强烈建议使用流：

```php
Storage::put('file.jpg', $contents);

Storage::put('file.jpg', $resource);
```

`copy` 方法可用于将现有文件复制到磁盘上的新位置：

```php
Storage::copy('old/file1.jpg', 'new/file1.jpg');
```

`move` 方法可用于将现有文件移动到新位置：

```php
Storage::move('old/file1.jpg', 'new/file1.jpg');
```

#### 向文件前置 / 追加内容

`prepend` 和 `append` 方法允许你轻松地在文件的开头或结尾插入内容：

```php
Storage::prepend('file.log', 'Prepended Text');

Storage::append('file.log', 'Appended Text');
```

### 删除文件

`delete` 方法接受单个文件名或要从磁盘中移除的文件数组：

```php
Storage::delete('file.jpg');

Storage::delete(['file1.jpg', 'file2.jpg']);
```

### 目录

#### 获取目录中的所有文件

`files` 方法返回给定目录中所有文件的数组。如果你想获取给定目录（包括所有子目录）中所有文件的列表，可以使用 `allFiles` 方法：

```php
$files = Storage::files($directory);

$files = Storage::allFiles($directory);
```

#### 获取目录中的所有子目录

`directories` 方法返回给定目录中所有目录的数组。此外，你可以使用 `allDirectories` 方法获取给定目录及其所有子目录中的所有目录列表：

```php
$directories = Storage::directories($directory);

// 递归...
$directories = Storage::allDirectories($directory);
```

#### 创建目录

`makeDirectory` 方法将创建给定的目录，包括任何所需的子目录：

```php
Storage::makeDirectory($directory);
```

#### 删除目录

最后，`deleteDirectory` 可用于从磁盘中移除目录及其所有文件：

```php
Storage::deleteDirectory($directory);
```
