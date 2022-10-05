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

To use Amazon S3 with October CMS, you should create S3 bucket, folder in the bucket and API user.

Sign up for Amazon AWS account or sign in with your existing account to AWS Console. Open S3 management panel. Create a new bucket and assign it any name (the name of the bucket will be a part of your public file URLs).

By default files in S3 buckets cannot be accessed directly. To make the bucket public, return to the bucket list and click the bucket. Click **Properties** button in the right sidebar. Expand **Permissions** tab. Click **Edit bucket policy** link. Paste the following code to the policy popup window. Replace the bucket name with your actual bucket name:

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

Click **Save** button to apply the policy. The policy gives public read-only access to all folders and directories in the bucket. If you're going to use the bucket for other needs, it's possible to setup a public access to a specific folder in the bucket, just specify the directory name in the **Resource** value:

```
"arn:aws:s3:::BUCKETNAME/media/*"
```

You should also create an API user that October CMS will use for managing the bucket files. In AWS console go to IAM section. Go to Users tab and create a new user. The user name doesn't matter. Make sure that "Generate an access key for each user" checkbox is checked when you create a new user. After AWS creates a user, it allows you to see the security credentials - the user **Access Key ID** and **Secret Access Key**. Copy the keys and put them into a temporary text file.

Return to the user list and click the user you just created. In the **Permissions** section click **Attach Policy** button. Select **AmazonS3FullAccess** policy in the list and click **Attach Policy** button.

Now you have all the information to update October CMS configuration. Open **config/filesystems.php** script and find the **disks** section. It already contains media configuration, you need to change the `driver` to **s3** and replace the API credentials and bucket information parameters:

Parameter | Value
------------- | -------------
**driver** | the storage driver to use, local or s3.
**key** | the **Access Key ID** value of the user that you created before.
**secret** | the **Secret Access Key** value of the user that you created fore.
**bucket** | your bucket name.
**region** | the bucket region code, see below.
**url** | the public path of the folder in the bucket, see below.

You can find the bucket region in S3 management console, in the bucket properties. The Properties tab displays the region name, for example Oregon. S3 driver configuration requires a bucket code. Use this table to find code for your bucket. You can also take a look at [AWS documentation](http://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region).

Region | Code
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

To obtain the URL of the folder, open AWS console and go to S3 section. Navigate to the bucket and click the folder you created before. Upload any file to the folder and click the file. Click **Properties** button in the right sidebar. The file URL is in the **Link** parameter. Copy the URL and remove the file name and the trailing slash from it.

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
        'url' => 'https://s3-us-west-2.amazonaws.com/your-bucket-name'
        'visibility' => 'public',
        'throw' => false
    ],
    // ...
]
```

Save the **config/filesystems.php** script and congratulations! Now you're ready to use Amazon S3 with October CMS. Note that you can also configure Amazon CloudFront CDN  to work with your bucket. This topic is not covered in this document, please refer to [CloudFront documentation](http://aws.amazon.com/cloudfront/). After you configure CloudFront, you will need to update the **url** parameter in the filesystems configuration.

## Troubleshooting

The most common issue with using remote services is the SSL connection problem. If you get SSL errors, make sure that your server has fresh SSL certificates of public Certificate Authorities (CA).
