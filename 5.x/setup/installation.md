---
previousPath: setup/installation.md
subtitle: Install October CMS with Composer, DDEV or the wizard and sign in to the backend panel for the first time.
---
# Installation

October CMS is a PHP application that you install with Composer. Follow the steps on this page to go from an empty directory to a running website with a backend panel.

```bash
composer create-project october/october myoctober
cd myoctober
php artisan october:install
php artisan october:migrate
```

<VideoBlockLink src="https://www.youtube.com/watch?v=RHUwCvo7xng" title="Installation Tutorial" description="This video describes how to create a project, purchase a license and install October CMS for the first time." prompt="Watch the tutorial" />

## System Requirements

Check that your system meets these requirements before you begin.

* PHP version 8.2.0 or higher
* Composer 2.0 or higher
* PDO PHP Extension
* cURL PHP Extension
* OpenSSL PHP Extension
* Mbstring PHP Extension
* ZipArchive PHP Extension
* GD PHP Extension
* SimpleXML PHP Extension

Supported database servers:

* MySQL 5.7 or MariaDB 10.2. For older versions of MySQL or MariaDB, you may need to [configure the index lengths](./database.md#oc-index-lengths-using-mysql-mariadb) to support the utf8mb4 character set.
* PostgreSQL 9.6
* SQLite 3.8.8

Supported web servers:

* Apache
* Nginx
* Lighttpd
* Microsoft IIS

You also need a [License Key](https://octobercms.com/help/site/projects#project-id) to complete the installation.

## Installing with Composer

::: aside
Configure a virtual host on your web server that points to the installation directory. For local development you can use [DDEV](#installing-with-ddev), [Valet](https://laravel.com/docs/valet), [Laragon](https://laragon.org/) or the built-in Laravel development server.
:::

October CMS uses [Composer](http://getcomposer.org/) to manage its dependencies, so make sure Composer is installed first.

**1. Create the project.** The `create-project` command downloads October CMS into a new directory. This example uses a directory called *myoctober*.

```bash
composer create-project october/october myoctober
```

**2. Enter the project directory.**

```bash
cd myoctober
```

**3. Run the installer.** The installer asks for your language, application URL, backend URL, database connection, whether to install the demo theme, and your license key. It then installs the remaining dependencies.

```bash
php artisan october:install
```

**4. Migrate the database.** This command creates the database tables. You can skip it and let October CMS initialize the database when you first open the backend panel.

```bash
php artisan october:migrate
```

**5. Open the backend panel.** Visit the backend URL in your browser (`/admin` by default) and create the administrator account. If you don't have a web server set up, start the built-in one with this command.

```bash
php artisan serve
```

::: warning
If you are installing on a production web server, review the recommendations in [Production Configuration](./configuration.md#production-configuration).
:::

## Installing with DDEV

::: aside
The web server runs inside a container, so you call commands with `ddev artisan` and `ddev composer` instead of `php artisan` and `composer`.
:::

[DDEV](https://ddev.com/) is a Docker-based tool that provides the web server, PHP and database for a local development environment. Use it when you don't want to install PHP and Composer on your operating system. Install [Docker](https://www.docker.com/get-started/) and [DDEV](https://ddev.readthedocs.io/en/stable/users/install/) before you begin.

Create a directory for the project and enter it. The directory name becomes the project name and local site address.

```bash
mkdir myoctober && cd myoctober
```

Configure the environment with the Laravel project type, which October CMS is compatible with.

```bash
ddev config --project-type=laravel --webserver-type=apache-fpm
```

Start the containers. The first run may take a few minutes while the images download.

```bash
ddev start
```

Install October CMS in the project directory.

```bash
ddev composer create-project october/october ./
```

Run the installation command.

```bash
ddev artisan october:install --no-interaction
```

Open the website in a browser.

```bash
ddev launch
```

## Installing with the Wizard

<VideoBlockLink src="https://www.youtube.com/watch?v=ypyOiVCxaQg" title="Wizard Tutorial" description="This video guides you through installing October CMS with the Wizard installer." prompt="Watch the tutorial" />

The wizard installs October CMS from your browser, without Composer or the command line.

1. Prepare an empty directory on your server. It can be a subdirectory, the domain root or a subdomain.
1. [Download the installer archive file](https://octobercms.com/download).
1. Unpack the installer archive into the prepared directory.
1. Grant write permissions on the installation directory and all its subdirectories and files.
1. Open the `install.php` script in your web browser.
1. Follow the installation instructions.

![image](https://github.com/octobercms/docs/blob/develop/images/wizard-installer.png?raw=true)

## Troubleshooting Installation

These are the most common issues during or after installation.

::: details The installation freezes after entering the license key
This can happen in some environments when you paste the license key. Press the ENTER key several times to let the installation continue.
:::

::: details An error "Unable to get local issuer certificate" is displayed during installation
The complete error may read `cURL error 60: SSL certificate problem: unable to get local issuer certificate`.

Download [this certificate file](https://curl.se/ca/cacert.pem) and save it as `cacert.pem`. Open your **php.ini** file and insert or edit the following line. You may need to restart Apache for the change to take effect.
```
curl.cainfo = "/path/to/cacert.pem"
```
:::

::: details An error "Specified key was too long" is displayed during migration
The complete error may read `SQLSTATE[42000]: Syntax error or access violation: 1071 Specified key was too long; max key length is 767 bytes`

This can happen with older versions of MySQL or MariaDB. [Configure the index lengths](./database.md#oc-index-lengths-using-mysql-mariadb) to support the utf8mb4 character set.
:::

::: details A blank screen is displayed when opening the application
Check that the permissions are set correctly on the **storage** directory, its subdirectories and files. The web server must be able to write to them.
:::

::: details Invalid security token error when logging in
Check that no subdirectories are missing from the **storage/framework** path. It must contain the **sessions**, **cache** and **views** directories.
:::

::: details The backend panel displays "Page not found" (404)
If the application cannot find the database, the backend shows a 404 page. Enable [debug mode](./configuration.md#debug-mode) to see the underlying error message.
:::

::: details An error 500 is displayed when updating the application
Increase or disable the request timeout on the web server. For example, Apache's FastCGI sometimes has the `-idle-timeout` option set to 30 seconds.
:::

::: details Zend OPcache API is restricted by "restrict_api" configuration directive
This issue can appear when October CMS tries to use the OPcache internals. Set the **force_bytecode_invalidation** configuration to `false` in the **config/cms.php** file to stop it.
:::

::: details Invalid credentials (HTTP 403) for '...', aborting.
Composer shows this error when the **auth.json** file is missing on your server or your project license has expired. Log in to your account and check that the project has an active license. If the license is active, reset it with the `project:set` artisan command.
:::

#### See Also

::: also
* [Production Configuration](./configuration.md#production-configuration)
* [Web Server Configuration](./web-server.md)
* [DDEV Documentation](https://ddev.readthedocs.io/en/stable/)
:::
