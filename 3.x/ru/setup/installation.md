---
subtitle: Learn how to install October CMS on a server.
---
# Installation

<VideoBlockLink src="https://www.youtube.com/watch?v=RHUwCvo7xng" title="Installation Tutorial" description="This video describes how to create a project, purchase a license and install October CMS for the first time." prompt="Watch the tutorial" />

## Minimum System Requirements

Before installing October CMS, ensure the target system meets the minimum requirements:

* PHP version 8.0.0 or higher
* Composer 2.0 or higher
* PDO PHP Extension
* cURL PHP Extension
* OpenSSL PHP Extension
* Mbstring PHP Extension
* ZipArchive PHP Extension
* GD PHP Extension
* SimpleXML PHP Extension.

Supported database servers:

* MySQL 5.7 or MariaDB 10.2. For older versions of MySQL or MariaDB, you may need to [configure the index lengths](../setup/database-config.md#oc-index-lengths-using-mysql-mariadb) to support the utf8mb4 character set.
* PostgreSQL 9.6
* SQLite 3.8.8.

Supported web servers:

* Apache
* Nginx
* Lighttpd
* Microsoft IIS

## Installing October CMS

::: aside
You should configure a virtual host on the web server to access the installation directory. For local development you can use [Laravel Sail](../resources/using-laravel-sail.md), [Valet](https://laravel.com/docs/valet), [Laragon](https://laragon.org/) or the built-in Laravel development server.
:::

October CMS is a PHP web application that uses [Composer](http://getcomposer.org/) to manage its dependencies. Ensure that Composer is installed before you begin. The [License Key](https://octobercms.com/help/site/projects#project-id) will be required to complete the installation.

To install the platform, initialize a project using the `create-project` command in the terminal. The following command creates a new project in a directory called *myoctober*:

```bash
composer create-project october/october myoctober
```

When the command finishes, enter the project directory:

```bash
cd myoctober
```

Run the installation command:

```bash
php artisan october:install
```

The last step is the migration command that will initialize the database. Alternatively, October CMS can initialize the database when you first access the backend panel.

```bash
php artisan october:migrate
```

When the process finishes, you can access the backend panel in a browser and create the administrator user profile. If you are using the built-in web server, you can launch it with the following command:

```bash
php artisan serve
```

::: warning
If you are installing the platform on a production web server, review the recommendations listed in the [Production Configuration](../setup/configuration.md#production-configuration) article.
:::

## Bleeding Edge Updates

To receive bleeding edge updates of October CMS, target the `develop` branch in the composer.json file:

```json
"october/all": "dev-develop",
"october/rain": "dev-develop",
```

The `develop` branch includes updates that are not released in the stable channel yet. There can be the latest bug fixes and features, but at the same time, it can contain unfinished work. Enabling bleeding edge updates is not recommended for production environments.

::: tip
The `dev-develop` notation may also apply to some plugins and themes.
:::

## Troubleshooting Installation

Several typical issues can occur during or after installation.

::: details The installation freezes after entering the license key
It can happen in some environments when pasting the license key contents. Press the ENTER key several times to allow the installation process to continue.
:::

::: details An error "Specified key was too long" is displayed during migration
It can happen with older versions of MySQL or MariaDB. [Configuring the index lengths](../setup/database-config.md#index-lengths-using-mysql-mariadb) to support the utf8mb4 character set can help to resolve this issue.
:::

::: details A blank screen is displayed when opening the application
Check the permissions are set correctly on the /storage files and subdirectories. They must be writable for the web server.
:::

::: details The backend panel displays "Page not found" (404)
If the application cannot find the database then a 404 page will be shown for the back-end. Try enabling [debug mode](../setup/configuration.md#debug-mode) to see the underlying error message.
:::

::: details An error 500 is displayed when updating the application
The request timeout on the web server should be increased or disabled. For example, Apache's FastCGI sometimes has the -idle-timeout option set to 30 seconds.
:::

#### See Also

::: also
* [Production Configuration](../setup/configuration.md#production-configuration)
:::
