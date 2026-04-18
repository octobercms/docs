---
subtitle: "Install October CMS and log in for the first time"
---
# Installation

October CMS can be installed in just a few minutes. Choose the method that suits your setup.

## Wizard Installer

The wizard installer is the simplest way to get started — no command line needed.

1. [Download the installer archive](https://octobercms.com/download) from the October CMS website.
1. Extract the archive to a directory on your web server.
1. Open the directory in your browser (e.g. `http://localhost/mysite`) — the setup wizard will launch automatically.
1. Follow the on-screen steps to configure your database and create an administrator account.

When the wizard finishes, your site is ready. Visit the URL to see the frontend, or add `/admin` to log into the admin panel.

::: tip
You can proceed without a license key to explore October CMS locally. To unlock updates and marketplace access, create an account at [octobercms.com](https://octobercms.com) and add a license key later.
:::

## DDEV

[DDEV](https://ddev.com/) is a Docker-based local development tool that handles PHP, the database, and the web server in an isolated container. Install [Docker](https://www.docker.com/get-started/) and [DDEV](https://ddev.readthedocs.io/en/stable/) first, then run:

```bash
mkdir my-october-site && cd my-october-site
```

Configure DDEV for a Laravel project:

```bash
ddev config --project-type=laravel --webserver-type=apache-fpm
```

Start the environment:

```bash
ddev start
```

Install October CMS:

```bash
ddev composer create-project october/october
```

Run the installer:

```bash
ddev artisan october:install --no-interaction
```

Open your site in the browser:

```bash
ddev launch
```

Your site is now running. Add `/admin` to the URL to access the admin panel and create your first administrator account.

## Using Composer Directly?

If you already have PHP and Composer set up on your machine, you can install October CMS from the command line without DDEV. See the [Installation guide](../../../4.x/setup/installation.md) in the developer documentation.

## Log Into the Backend

Regardless of which method you used, the backend is where you manage your website. Visit your site's URL followed by `/admin`:

```
http://your-site-url/admin
```

Enter your administrator credentials to access the dashboard — your site's control center.

## Next Steps

Your site is installed and running. Continue to [Exploring the Backend](../backend/backend-tour.md) to start building.
