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

## Composer

If you have PHP and [Composer](https://getcomposer.org/) on your computer, you can install October CMS from the terminal. You will need your [license key](https://octobercms.com/help/site/projects#project-id) to complete the installation, and your computer should meet the [system requirements](../../../4.x/setup/installation.md#minimum-system-requirements).

Create a new project in a directory called *myoctober*:

```bash
composer create-project october/october myoctober
```

Enter the project directory and run the installer. It asks for your language, application URL, backend URL, database connection, whether to install the demo theme, and your license key.

```bash
cd myoctober
php artisan october:install
```

When the installer finishes, create the database tables:

```bash
php artisan october:migrate
```

If you don't have a web server set up, start the built-in one and open the address it shows in your browser:

```bash
php artisan serve
```

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

Enter your administrator credentials to access the dashboard, your site's control center. If you installed with Composer, the first visit asks you to create the administrator account.

## Next Steps

Your site is installed and running. Continue to [Exploring the Backend](../backend/backend-tour.md) to start building.
