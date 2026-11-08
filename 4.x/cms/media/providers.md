# Providers

Media Manager uses the Local Disk provider by default. You need to install the Flysystem S3 package before you can use Amazon S3 features.

```bash
composer require league/flysystem-aws-s3-v3 "^3.0"
```

After you change Media Manager configuration, you should reset its cache. You can do that with pressing the **Refresh** button in the Media Manager toolbar.

## Local Disk

By default Media Manager works with the **storage/app/media** subdirectory of the installation directory. In order to use Amazon S3, you should update the system configuration found in the **config/filesystems.php** config file and follow the instructions found in this article.

```php
'media' => [
    'driver' => 'local',
    'root' => storage_path('app/media'),
    'url' => '/storage/app/media',
    'visibility' => 'public',
    'throw' => false,
],
```

## Configuring Amazon S3 access

To use Amazon S3 with October CMS, you need an S3 bucket, a folder in the bucket and an API user. The [Storing October CMS Media on Amazon S3](https://octobercms.com/support/article/storing-october-cms-media-on-amazon-s3) tutorial walks through creating them in the AWS Console.

Open the **config/filesystems.php** script and find the **disks** section. It already contains media configuration, you need to change the `driver` to **s3** and replace the API credentials and bucket information parameters:

Parameter | Value
------------- | -------------
**driver** | the storage driver to use, local or s3.
**key** | the **Access Key ID** value of the API user.
**secret** | the **Secret Access Key** value of the API user.
**bucket** | your bucket name.
**region** | the bucket region code, for example `us-west-2` for US West (Oregon). See the [AWS documentation](https://docs.aws.amazon.com/general/latest/gr/s3.html#s3_region) for the code of your bucket region.
**url** | the public path of the folder in the bucket.

Example configuration after update:

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

Save the **config/filesystems.php** script and congratulations! Now you're ready to use Amazon S3 with October CMS. Note that you can also configure Amazon CloudFront CDN  to work with your bucket. This topic is not covered in this document, please refer to [CloudFront documentation](https://aws.amazon.com/cloudfront/). After you configure CloudFront, you will need to update the **url** parameter in the filesystems configuration.

## Troubleshooting

The most common issue with using remote services is the SSL connection problem. If you get SSL errors, make sure that your server has fresh SSL certificates of public Certificate Authorities (CA).
