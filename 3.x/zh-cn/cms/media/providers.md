# 提供者

媒体管理器默认使用本地磁盘提供者。在使用 Amazon S3 功能之前，您需要安装 Flysystem S3 包。

```bash
composer require league/flysystem-aws-s3-v3 "^3.0"
```

更改媒体管理器配置后，您应该重置其缓存。可以通过按下媒体管理器工具栏中的 **刷新** 按钮来完成此操作。

## 本地磁盘

默认情况下，媒体管理器使用安装目录下的 **storage/app/media** 子目录。要使用 Amazon S3，您需要更新 **config/filesystems.php** 配置文件中的系统配置，并按照本文中的说明进行操作。

```php
'media' => [
    'driver' => 'local',
    'root' => storage_path('app/media'),
    'url' => '/storage/app/media',
    'visibility' => 'public',
    'throw' => false,
],
```

## 配置 Amazon S3 访问

要在 October CMS 中使用 Amazon S3，您需要创建 S3 存储桶、存储桶中的文件夹以及 API 用户。

注册 Amazon AWS 账户或使用现有账户登录 AWS 控制台。打开 S3 管理面板。创建一个新的存储桶并为其分配任意名称（存储桶的名称将成为公共文件 URL 的一部分）。

默认情况下，S3 存储桶中的文件无法被直接访问。要将存储桶设为公开，请返回存储桶列表并点击该存储桶。点击右侧边栏中的 **Properties** 按钮。展开 **Permissions** 选项卡。点击 **Edit bucket policy** 链接。将以下代码粘贴到策略弹出窗口中。将存储桶名称替换为您的实际存储桶名称：

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

点击 **Save** 按钮以应用策略。该策略为存储桶中的所有文件夹和目录提供公共只读访问权限。如果您计划将存储桶用于其他用途，可以为存储桶中的特定文件夹设置公共访问权限，只需在 **Resource** 值中指定目录名称即可：

```
"arn:aws:s3:::BUCKETNAME/media/*"
```

您还需要创建一个 API 用户，供 October CMS 用于管理存储桶文件。在 AWS 控制台中转到 IAM 部分。转到 Users 选项卡并创建一个新用户。用户名无关紧要。创建新用户时，请确保选中 "Generate an access key for each user" 复选框。AWS 创建用户后，您可以查看安全凭据——用户的 **Access Key ID** 和 **Secret Access Key**。复制密钥并将其保存到临时文本文件中。

返回用户列表并点击刚创建的用户。在 **Permissions** 部分点击 **Attach Policy** 按钮。在列表中选择 **AmazonS3FullAccess** 策略，然后点击 **Attach Policy** 按钮。

现在您已拥有更新 October CMS 配置所需的所有信息。打开 **config/filesystems.php** 脚本并找到 **disks** 部分。其中已包含媒体配置，您需要将 `driver` 更改为 **s3** 并替换 API 凭据和存储桶信息参数：

参数 | 值
------------- | -------------
**driver** | 要使用的存储驱动，local 或 s3。
**key** | 之前创建的用户的 **Access Key ID** 值。
**secret** | 之前创建的用户的 **Secret Access Key** 值。
**bucket** | 您的存储桶名称。
**region** | 存储桶区域代码，请参见下文。
**url** | 存储桶中文件夹的公共路径，请参见下文。

您可以在 S3 管理控制台的存储桶属性中找到存储桶区域。属性选项卡会显示区域名称，例如 Oregon。S3 驱动配置需要存储桶代码。使用下表查找您存储桶的代码。您也可以参阅 [AWS 文档](http://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region)。

区域 | 代码
------------- | -------------
**US East (Ohio)** | us-east-2
**US East (N. Virginia)** | us-east-1
**US West (N. California)** | us-west-1
**US West (Oregon)** | us-west-2
**Asia Pacific (Hong Kong)** | ap-east-1
**Asia Pacific (Mumbai)** | ap-south-1
**Asia Pacific (Osaka-Local)** | ap-northeast-3
**Asia Pacific (Seoul)** | ap-northeast-2
**Asia Pacific (Singapore)** | ap-southeast-1
**Asia Pacific (Sydney)** | ap-southeast-2
**Asia Pacific (Tokyo)** | ap-northeast-1
**Canada (Central)** | ca-central-1
**China (Beijing)** | cn-north-1
**China (Ningxia)** | cn-northwest-1
**EU (Frankfurt)** | eu-central-1
**EU (Ireland)** | eu-west-1
**EU (London)** | eu-west-2
**EU (Paris)** | eu-west-3
**EU (Stockholm)** | eu-north-1
**South America (São Paulo)** | sa-east-1
**Middle East (Bahrain)** | me-south-1

要获取文件夹的 URL，请打开 AWS 控制台并转到 S3 部分。导航到存储桶并点击之前创建的文件夹。将任意文件上传到该文件夹并点击该文件。点击右侧边栏中的 **Properties** 按钮。文件 URL 在 **Link** 参数中。复制 URL 并从中删除文件名和末尾的斜杠。

更新后的示例配置：

```php
'disks' => [
    // ...
    'media' => [
        'driver' => 's3',
        'key'    => 'XXXXXXXXXXXXXXXXXXXX',
        'secret' => 'xxxXxXX+XxxxxXXxXxxxxxxXxxXXXXXXXxxxX9Xx',
        'region' => 'us-west-2',
        'bucket' => 'my-bucket',
        'url' => 'https://s3-us-west-2.amazonaws.com/your-bucket-name',
        'visibility' => 'public',
        'throw' => false
    ],
    // ...
]
```

保存 **config/filesystems.php** 脚本，恭喜！现在您可以在 October CMS 中使用 Amazon S3 了。请注意，您还可以配置 Amazon CloudFront CDN 与您的存储桶配合使用。本文档不涵盖此主题，请参阅 [CloudFront 文档](http://aws.amazon.com/cloudfront/)。配置 CloudFront 后，您需要更新 filesystems 配置中的 **url** 参数。

## 故障排除

使用远程服务时最常见的问题是 SSL 连接问题。如果您遇到 SSL 错误，请确保您的服务器拥有最新的公共证书颁发机构 (CA) SSL 证书。
