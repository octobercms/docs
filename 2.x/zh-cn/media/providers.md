# 供应商

默认情况下，媒体管理器使用本地磁盘提供程序。 您需要先安装 [驱动插件](https://octobercms.com/plugin/october-drivers)，然后才能使用 Amazon S3 或 Rackspace CDN 功能。

> **注意**：更改媒体管理器配置后，您应该重置其缓存。 您可以通过按下媒体管理器工具栏中的 **Refresh** 按钮来实现。

## 本地磁盘

默认情况下，媒体管理器使用安装目录的 **storage/app/media** 子目录。 为了使用 Amazon S3 或 Rackspace CDN，您应该更新 **config/system.php** 配置文件中的系统配置，并按照本文中的说明进行操作。

```php
'storage' => [
    'media' => [
        'disk'   => 'local',
        'folder' => 'media',
        'path'   => '/storage/app/media',
    ],
],
```

## 配置 Amazon S3 访问

要将 Amazon S3 与 October CMS 一起使用，您应该创建 S3 存储桶、存储桶中的文件夹和 API 用户。

注册 Amazon AWS 账户或使用您现有的账户登录 AWS 控制台。 打开 S3 管理面板。 创建一个新存储桶并为其分配任意名称(存储桶的名称将成为您的公共文件 URL 的一部分)。

在存储桶中创建 **media** 文件夹。 文件夹名称无关紧要。 该文件夹将是您媒体库的根目录。

默认情况下，无法直接访问 S3 存储桶中的文件。 要公开存储桶，请返回存储桶列表并单击存储桶。 单击右侧栏中的**Properties**按钮。 展开**Permissions**选项卡。 单击**Edit bucket policy** 链接。 将以下代码粘贴到策略弹出窗口。 将存储桶名称替换为您的实际存储桶名称：

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

单击**Save**按钮以应用该策略。该策略授予公共只读访问存储桶中所有文件夹和目录的权限。如果您打算将存储桶用于其他需要，可以设置对存储桶中特定文件夹的公共访问权限，只需在 **Resource** 值中指定目录名称：

    "arn:aws:s3:::BUCKETNAME/media/*"

您还应该创建一个 API 用户，October CMS 将使用该用户来管理存储桶文件。在 AWS 控制台中，转到 IAM 部分。转到用户选项卡并创建一个新用户。用户名无关紧要。创建新用户时，请确保选中"为每个用户生成访问密钥"复选框。 AWS 创建用户后，它允许您查看安全凭证 - 用户 **Access Key ID** 和 **Secret Access Key**。复制密钥并将它们放入临时文本文件中。

返回用户列表并单击您刚刚创建的用户。在 **Permissions** 部分，单击 **Attach Policy** 按钮。在列表中选择 **AmazonS3FullAccess** 策略，然后单击 **Attach Policy** 按钮。

现在您拥有更新 October CMS 配置的所有信息。打开 **config/filesystem.php** 脚本并找到 **disks** 部分。它已经包含s3配置，需要替换API凭证和bucket信息参数：

参数 |值
------------- | -------------
**key** | 您之前创建的用户的 **Access Key ID** 值。
**secret** | 您之前创建的用户的 **Secret Access Key** 值。
**bucket** | 您的存储桶名称。
**region** | 存储桶区域代码，见下文。

您可以在 S3 管理控制台的存储桶属性中找到存储桶区域。 "属性"选项卡显示区域名称，例如俄勒冈州。 S3 驱动程序配置需要存储桶代码。 使用此表查找存储桶的代码(您也可以查看 [AWS 文档](http://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region))：

地区 | 代码
------------- | -------------
<span class="nowrap">**美国东部 (俄亥俄州)**</span> | us-east-2
<span class="nowrap">**美国东部 (弗吉尼亚北部)**</span> | us-east-1
<span class="nowrap">**美国西部 (加利福尼亚北部)**</span> | us-west-1
<span class="nowrap">**美国西部 (俄勒冈州)**</span> | us-west-2
<span class="nowrap">**亚太地区 (香港)**</span> | ap-east-1
<span class="nowrap">**亚太地区 (孟买)**</span> | ap-south-1
<span class="nowrap">**亚太地区 (大阪本地)**</span> | ap-northeast-3
<span class="nowrap">**亚太地区 (汉城)**</span> | ap-northeast-2
<span class="nowrap">**亚太地区 (新加坡)**</span> | ap-southeast-1
<span class="nowrap">**亚太地区 (悉尼)**</span> | ap-southeast-2
<span class="nowrap">**亚太地区 (东京)**</span> | ap-northeast-1
<span class="nowrap">**加拿大 (中央)**</span> | ca-central-1
<span class="nowrap">**中国 (北京)**</span> | cn-north-1
<span class="nowrap">**中国 (宁夏)**</span> | cn-northwest-1
<span class="nowrap">**欧盟 (法兰克福)**</span> | eu-central-1
<span class="nowrap">**欧盟 (爱尔兰)**</span> | eu-west-1
<span class="nowrap">**欧盟 (伦敦)**</span> | eu-west-2
<span class="nowrap">**欧盟 (巴黎)**</span> | eu-west-3
<span class="nowrap">**欧盟 (斯德哥尔摩)**</span> | eu-north-1
<span class="nowrap">**南美洲 (圣保罗)**</span> | sa-east-1
<span class="nowrap">**中东 (巴林)**</span> | me-south-1

更新后的示例配置:

```php
'disks' => [
    // ...
    's3' => [
        'driver' => 's3',
        'key'    => 'XXXXXXXXXXXXXXXXXXXX',
        'secret' => 'xxxXxXX+XxxxxXXxXxxxxxxXxxXXXXXXXxxxX9Xx',
        'region' => 'us-west-2',
        'bucket' => 'my-bucket'
    ],
    // ...
]
```

保存 **config/filesystem.php** 脚本并打开 **config/system.php** 脚本。 找到**storage**部分。 在**media**参数中更新**disk**、**folder**和**path**参数：

参数 | 值
------------- | -------------
**disk** | 使用 **s3** 值。
**folder** | 您在 S3 存储桶中创建的文件夹的名称。
**path** | 存储桶中文件夹的公共路径，见下文。

要获取文件夹的路径，请打开 AWS 控制台并转到 S3 部分。 导航到存储桶并单击您之前创建的文件夹。 将任何文件上传到文件夹并单击该文件。 单击右侧栏中的**Properties**按钮。 文件 URL 在 **Link** 参数中。 复制 URL 并从中删除文件名和尾部斜杠。

示例存储配置：

```php
'storage' => [
    // ...
    'media' => [
        'disk'   => 's3',
        'folder' => 'media',
        'path' => 'https://s3-us-west-2.amazonaws.com/your-bucket-name/media'
    ]
]
```

恭喜！现在您已准备好将 Amazon S3 与 October CMS 结合使用。请注意，您还可以配置 Amazon CloudFront CDN 以使用您的存储桶。本文档未涉及该主题，请参阅[CloudFront 文档](http://aws.amazon.com/cloudfront/)。配置 CloudFront 后，您需要更新存储配置中的 **path** 参数。

## 配置 Rackspace CDN 访问

要将 Rackspace CDN 与 October CMS 一起使用，您应该创建 Rackspace CDN 容器、容器中的文件夹和 API 用户。

登录 Rackspace 管理控制台并导航到存储/文件页面。创建一个新容器。容器名称无关紧要，它将成为您的公共文件 URL 的一部分。为新容器选择 **Public (Enabled CDN)** 类型。

在容器中创建 **media** 文件夹。文件夹名称无关紧要。该文件夹将是您媒体库的根目录。

您应该创建一个 API 用户，October CMS 将使用它来管理 CDN 容器中的文件。在 Rackspace 控制台中打开帐户/用户管理页面。点击**Create user**按钮。填写用户名(例如october.cdn.api)、密码、安全问题和答案。在 **Product Access** 部分选择 **Custom**，然后在 CDN 行中选择 **Admin**。在 **Account** 部分使用 **No Access** 角色，在 **Contact Information** 部分使用 **Technical Contact** 类型。保存用户帐户。保存帐户后，您将看到"登录详细信息"部分，其中 **API 密钥** 行包含您需要在 OctoberCMS 配置文件中使用的值。

现在您拥有更新 OctoberCMS 配置的所有信息。打开 **config/filesystem.php** 脚本并找到 **disks** 部分。它已经包含了 Rackspace 配置，需要替换 API 凭证和容器信息参数：

参数 |值
------------- | -------------
**username** | Rackspace 用户名(例如 october.cdn.api)。
**key** | 您可以从 Rackspace 用户配置文件页面复制的用户 **API 密钥**。
**container** | 容器名称。
**region** | 存储桶区域代码，见下文。
**endpoint** | 保持原样。
**region** | 您可以在 Rackspace 控制面板的 CDN 容器列表中找到该区域。 代码是一个 3 个字母的值，例如它是 **ORD** 代表芝加哥。

更新后的示例配置:

```php
'disks' => [
    // ...
    'rackspace' => [
        'driver'    => 'rackspace',
        'username'  => 'october.api.cdn',
        'key'       => 'xx00000000xxxxxx0x0x0x000xx0x0x0',
        'container' => 'my-bucket',
        'endpoint'  => 'https://identity.api.rackspacecloud.com/v2.0/',
        'region'    => 'ORD'
    ],
    // ...
]
```

保存 **config/filesystem.php** 脚本并打开 **config/system.php** 脚本。 找到**storage**部分。 在**media**参数中更新**disk**、**folder**和**path**参数：

参数 | 值
------------- | -------------
**disk** | 使用 **rackspace** 值。
**folder** | 您在 CDN 容器中创建的文件夹的名称。
**path** | 容器中文件夹的公共路径，见下文。

要获取文件夹的路径，请转到 Rackspace 控制台中的 CDN 容器列表。 单击容器并打开媒体文件夹。 上传任何文件。 文件上传后，点击它。 该文件将在新的浏览器选项卡中打开。 复制文件 URL 并从中删除文件名和尾部斜杠。

示例存储配置：

```php
'storage' => [
    // ...
    'media' => [
        'disk'   => 'rackspace',
        'folder' => 'media',
        'path' => 'https://xxxxxxxxx-xxxxxxxxx.r00.cf0.rackcdn.com/media'
    ]
]
```

恭喜！ 现在您已准备好将 Rackspace CDN 与 October CMS 一起使用。

## 故障排除

使用远程服务最常见的问题是 SSL 连接问题。 如果您收到 SSL 错误，请确保您的服务器具有公共证书颁发机构 (CA) 的新 SSL 证书。

## 中国大陆地区特别说明

中国大陆地区可以优先选择阿里云OSS,您可以选择[阿里云 OSS](https://octobercms.com/plugin/jc91715-oss)插件进行扩展。由于此插件开发者已停止维护，若不兼容October CMS2您可以咨询中国大陆建站合作商[超越无限建站](https://www.bbctop.com)