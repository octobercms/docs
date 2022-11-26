---
subtitle: Deploy October CMS project to a private or shared server.
---
# Deployment

October CMS projects can be deployed using Composer and the official Deploy plugin.

## Deploying with Composer

That scenario applies if you have SSH access and have Composer installed on the target server. Deploying October CMS projects with Composer is the same as deploying any other Composer project:

* clone the project repository on the server.
* copy the `auth.json` file manually to the server.
* run `composer install` in the project directory.
* update the configuration files.

Keep in mind that the Composer's [auth.json](https://getcomposer.org/doc/articles/http-basic-authentication.md) file from your source October CMS installation must be added to the server. The file is automatically generated when you install October CMS for the first time. It includes the license key information and is required for authenticating Composer requests to the October CMS Gateway.

Alternatively, you can recreate the **auth.json** file with the `project:set` artisan command before running composer install.

```bash
php artisan project:set <license key>
```

## Deploying without Composer

<VideoBlockLink src="https://www.youtube.com/watch?v=Lx9X3CfXwfw" title="One-click Deploy" description="This video describes how to deploy your project to a remote server without Composer." prompt="Watch the tutorial"/>

If you don't have SSH access to the server or can't run Composer commands for any reason, there is an option to deploy an October CMS project using the official <LinkWithIcon text="Deploy Plugin" icon="https://d2f5cg397c40hu.cloudfront.net/storage/app/uploads/public/optimized/local/c99/b52/eb1c99b52eb1dde393bb7ef60e4c861b062.png" href="https://octobercms.com/plugin/rainlab-deploy"/>.
