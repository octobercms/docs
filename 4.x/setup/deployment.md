---
subtitle: Deploy October CMS project to a private or shared server.
---
# Deployment

::: aside
When deploying a site to production, make sure that you have implemented the recommended [production configuration](./configuration.md).
:::

October CMS projects can be deployed using Composer with command line (shell) access, and the official Deploy plugin when shell access is limited.

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

If you don't have SSH access to the server or can't run Composer commands for any reason, you can deploy the project using the official [Deploy plugin](https://octobercms.com/plugin/rainlab-deploy). The [Deploying October CMS with the Deploy Plugin](https://octobercms.com/support/article/deploying-october-cms-with-the-deploy-plugin) tutorial walks through the process.

#### See Also

::: also
* [Production Configuration](../setup/configuration.md)
* [Managing Projects with Git](https://octobercms.com/support/article/managing-october-cms-projects-with-git)
:::
