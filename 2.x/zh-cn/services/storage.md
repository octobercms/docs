# 存储

由于 Laravel 和出色的 [Flysystem](https://github.com/thephpleague/flysystem) PHP 包，October CMS 提供了强大的文件系统抽象。 Flysystem 集成提供简单易用的驱动程序，用于处理本地文件系统、Amazon S3 和 Rackspace 云存储。 更好的是，在这些存储选项之间切换非常简单，因为每个系统的 API 保持不变。

## 配置

文件系统配置文件位于`config/filesystems.php`。 在此文件中，您可以配置所有`磁盘`。 每个磁盘代表一个特定的存储驱动程序和存储位置。 每个支持的驱动程序的示例配置都包含在配置文件中。 因此，只需修改配置以反映您的存储偏好和凭据。

当然，您可以配置任意数量的磁盘，甚至可以有多个磁盘使用相同的驱动程序。

#### 本地驱动程序

使用 `local` 驱动程序时，请注意所有文件操作都相对于配置文件中定义的 `root` 目录。 默认情况下，此值设置为 `storage/app` 目录。 因此，以下方法会将文件存储在 `storage/app/file.txt` 中：

```php
Storage::disk('local')->put('file.txt', 'Contents');
```

#### 其他驱动程序先决条件

在使用 S3 或 Rackspace 驱动程序之前，您需要安装 [Drivers 插件](https://octobercms.com/plugin/october-drivers)。

## 基本用法

### 获取磁盘实例

`Storage` 外观可用于与您配置的任何磁盘进行交互。 例如，您可以使用外观上的 `put` 方法将头像存储在默认磁盘上。 如果你调用 `Storage` 门面的方法而不先调用 `disk` 方法，方法调用将自动传递到默认磁盘：

```php
$user = User::find($id);

Storage::put(
    'avatars/'.$user->id,
    file_get_contents(Request::file('avatar')->getRealPath())
);
```

当使用多个磁盘时，您可以使用 `Storage` 门面的 `disk` 方法访问特定磁盘。 当然，你可以继续链式方法在磁盘上执行方法：

```php
$disk = Storage::disk('s3');

$contents = Storage::disk('local')->get('file.jpg')
```

### 检索文件

`get` 方法可用于检索给定文件的内容。 该方法将返回文件的原始字符串内容：

```php
$contents = Storage::get('file.jpg');
```

`exists` 方法可用于确定给定文件是否存在于磁盘上：

```php
$exists = Storage::disk('s3')->exists('file.jpg');
```

#### 文件元信息

`size` 方法可用于获取文件的大小(以字节为单位)：

```php
$size = Storage::size('file1.jpg');
```

`lastModified` 方法返回文件最后一次修改的 UNIX 时间戳：

```php
$time = Storage::lastModified('file1.jpg');
```

### 存储文件

`put` 方法可用于在磁盘上存储文件。 你也可以将 PHP 的`resource` 传递给`put` 方法，这将使用Flysystem 的底层流支持。 处理大文件时强烈建议使用流：

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

#### 前置/附加到文件

`prepend` 和 `append` 方法允许您轻松地在文件的开头或结尾插入内容：

```php
Storage::prepend('file.log', 'Prepended Text');

Storage::append('file.log', 'Appended Text');
```

### 删除文件

`delete` 方法接受单个文件名或要从磁盘中删除的文件数组：

```php
Storage::delete('file.jpg');

Storage::delete(['file1.jpg', 'file2.jpg']);
```

### 目录

#### 获取目录中的所有文件

`files` 方法返回给定目录中所有文件的数组。 如果您想检索给定目录中所有文件的列表，包括所有子目录，您可以使用 `allFiles` 方法：

```php
$files = Storage::files($directory);

$files = Storage::allFiles($directory);
```

#### 获取目录中的所有目录

`directories` 方法返回给定目录中所有目录的数组。 此外，您可以使用 `allDirectories` 方法获取给定目录及其所有子目录中所有目录的列表：

```php
$directories = Storage::directories($directory);

// 递归...
$directories = Storage::allDirectories($directory);
```

#### 创建目录

`makeDirectory` 方法将创建给定的目录，包括任何需要的子目录：

```php
Storage::makeDirectory($directory);
```

#### 删除目录

最后，`deleteDirectory` 可以用来从磁盘中删除一个目录，包括它的所有文件：

```php
Storage::deleteDirectory($directory);
```
