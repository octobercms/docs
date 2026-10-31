---
previousPath: setup/deployment.md
subtitle: Deploy an October CMS project to a private or shared server, with or without Composer.
---
# Deployment

Deploy an October CMS project with Composer when you have shell access to the server, or with the official Deploy plugin when shell access is limited.

::: aside
Before deploying a site to production, apply the recommended [production configuration](./configuration.md#production-configuration).
:::

## Deploying with Composer

Use this approach when you have SSH access and Composer is installed on the target server. Deploying an October CMS project with Composer works the same as deploying any other Composer project:

1. Clone the project repository on the server.
1. Copy the `auth.json` file to the server manually.
1. Run `composer install` in the project directory.
1. Update the configuration files.

```bash
git clone git@github.com:yourorg/myproject.git
cd myproject
composer install
```

The Composer [auth.json](https://getcomposer.org/doc/articles/http-basic-authentication.md) file from your source October CMS installation must be added to the server. October CMS generates this file when you first install it. It holds the license key information that authenticates Composer requests to the October CMS Gateway.

Alternatively, recreate the **auth.json** file with the `project:set` artisan command before running `composer install`.

```bash
php artisan project:set <license key>
```

## Deploying without Composer

<VideoBlockLink src="https://www.youtube.com/watch?v=Lx9X3CfXwfw" title="Deploy Tutorial" description="This video describes how to deploy your project to a remote server without Composer." prompt="Watch the tutorial"/>

If you don't have SSH access to the server, or can't run Composer commands for any reason, deploy the project with the official <LinkWithIcon text="Deploy Plugin" icon="https://d2f5cg397c40hu.cloudfront.net/storage/app/uploads/public/optimized/local/c99/b52/eb1c99b52eb1dde393bb7ef60e4c861b062.png" href="https://octobercms.com/plugin/rainlab-deploy"/>.

The Deploy plugin uses a local installation of October CMS to run Composer commands on your own computer, then deploys the generated files to your server. From there, you can update the installation directly on the server with the one-click updater. If a one-click update fails, use the Deploy plugin to repair the installation without command line access.

#### See Also

::: also
* [Production Configuration](./configuration.md#production-configuration)
* [Web Server Configuration](./web-server.md)
* [Development Workflow](./development-workflow.md)
:::
