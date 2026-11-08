---
subtitle: "Install October CMS and log in for the first time"
---
# Install October CMS

October CMS can be installed in just a few minutes. Choose the method that suits your setup.

## Wizard Installer

The wizard installer is the simplest way to get started, no command line needed.

1. [Download the installer archive](https://octobercms.com/download) from the October CMS website.
1. Extract the archive to a directory on your web server.
1. Open the directory in your browser (e.g. `http://localhost/mysite`). The setup wizard will launch automatically.
1. Follow the on-screen steps to configure your database and create an administrator account.

When the wizard finishes, your site is ready. Visit the URL to see the frontend, or add `/admin` to log into the admin panel.

::: tip
You can proceed without a license key to explore October CMS locally. To unlock updates and marketplace access, create an account at [octobercms.com](https://octobercms.com) and add a license key later.
:::

## Using Composer

If you already have PHP and Composer set up on your machine, you can install October CMS from the command line. See the [Installation guide](../../../4.x/setup/installation.md) in the developer documentation.

## Local Development Environments

If you would rather not install PHP and a database on your computer yourself, these tutorials set up a local environment that runs October CMS for you:

- [Installing October CMS with DDEV](https://octobercms.com/support/article/installing-october-cms-with-ddev), a Docker-based environment.
- [Installing October CMS with Laravel Sail](https://octobercms.com/support/article/installing-october-cms-with-laravel-sail), the Docker-based environment from Laravel.
- [Installing October CMS with Laragon](https://octobercms.com/support/article/installing-october-cms-with-laragon), a local environment for Windows.

When you are done, come back here to log into the backend.

## Log Into the Backend

Regardless of which method you used, the backend is where you manage your website. Visit your site's URL followed by `/admin`:

```
http://your-site-url/admin
```

Enter your administrator credentials to access the dashboard, your site's control center.

## Next Steps

Your site is installed and running. Continue to [Exploring the Backend](../backend/backend-tour.md) to start building.
