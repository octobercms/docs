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

## Wizard Installation

<VideoBlockLink src="https://www.youtube.com/watch?v=ypyOiVCxaQg" title="Wizard Tutorial" description="This video guides you through the process of installing October CMS using the easy-to-use Wizard installer." prompt="Watch the tutorial" />

The wizard installation is an alternative way to install October CMS without using Composer. It is simpler than the command-line installation and doesn't require any special skills.

1. Prepare a directory on your server that is empty. It can be a sub-directory, domain root or a sub-domain.
1. [Download the installer archive file](https://octobercms.com/download).
1. Unpack the installer archive to the prepared directory.
1. Grant writing permissions on the installation directory and all its subdirectories and files.
1. Navigate to the `install.php` script in your web browser.
1. Follow the installation instructions.

![image](https://github.com/octobercms/docs/blob/develop/images/wizard-installer.png?raw=true)

## Troubleshooting Installation

Several typical issues can occur during or after installation.

::: details The installation freezes after entering the license key
It can happen in some environments when pasting the license key contents. Press the ENTER key several times to allow the installation process to continue.
:::

::: details An error "Unable to get local issuer certificate" is displayed during installation
The complete error may read `cURL error 60: SSL certificate problem: unable to get local issuer certificate`.

Download [this certificate file](https://curl.se/ca/cacert.pem) and save it as `cacert.pem`. Open your **php.ini** file and insert or edit the following line. You may need to restart Apache for the changes to take effect.
```
curl.cainfo = "/path/to/cacert.pem"
```
:::

::: details An error "Specified key was too long" is displayed during migration
The complete error may read `SQLSTATE[42000]: Syntax error or access violation: 1071 Specified key was too long; max key length is 767 bytes`

This can happen with older versions of MySQL or MariaDB. [Configuring the index lengths](../setup/database-config.md#index-lengths-using-mysql-mariadb) to support the utf8mb4 character set can help to resolve this issue.
:::

::: details A blank screen is displayed when opening the application
Check the permissions are set correctly on the /storage files and subdirectories. They must be writable for the web server.
:::

::: details Invalid security token error when logging in
Check to ensure no missing subdirectories in the storage/framework path. You may need to add the [sessions, cache and views directories](https://github.com/octobercms/october-private/tree/develop/storage/framework).
:::

::: details The backend panel displays "Page not found" (404)
If the application cannot find the database then a 404 page will be shown for the back-end. Try enabling [debug mode](../setup/configuration.md#debug-mode) to see the underlying error message.
:::

::: details An error 500 is displayed when updating the application
The request timeout on the web server should be increased or disabled. For example, Apache's FastCGI sometimes has the -idle-timeout option set to 30 seconds.
:::

::: details Zend OPcache API is restricted by "restrict_api" configuration directive
This issue can appear when internals try to use the OPcache internals. This can be disabled by setting the **force_bytecode_invalidation** configuration to `false` inside the **config/cms.php** file.
:::

::: details Invalid credentials (HTTP 403) for '...", aborting.
This error can appear in Composer when your project license has expired, try logging in to your account and check that the project has an active license. If the license is active, you can reset it with the `project:set` artisan command.
:::

#### See Also

::: also
* [Production Configuration](../setup/configuration.md#production-configuration)
:::
