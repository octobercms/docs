# Installation

- [Installing Composer](#install-composer)
- [Installing October CMS](#install-october)
- [Post-Installation Steps](#post-install-steps)
    - [Review Configuration](#config-review)
    - [Setting Up The Scheduler](#crontab-setup)
    - [Setting Up Queue Workers](#queue-setup)
- [Minimum System Requirements](#system-requirements)
- [Troubleshooting Installation](#troubleshoot-installation)

[Watch **October CMS Installation Tutorial** on YouTube](https://www.youtube.com/watch?v=RHUwCvo7xng)

October CMS is a web application platform with a simple and intuitive interface. A web platform provides a consistent structure with an emphasis on reusability so you can focus on building something unique while we handle the boring bits.

October CMS makes one bold but obvious assumption: clients don't build websites; developers do. When platforms have a client-centric development process, it only results in one thing: an unhappy developer.

Whether you're new to web development or have years of experience, October CMS is a platform that makes it easy to create bespoke experiences for you and your clients. We hope you enjoy your journey with us and discover happiness in simplicity.

To run October CMS locally, we recommend the following software:

- [Laravel Valet for macOS](https://laravel.com/docs/valet)
- [Laragon for Windows 10](https://laragon.org/)

<a name="install-composer"></a>
## Installing Composer

October CMS uses [Composer](http://getcomposer.org/) to manage its dependencies. So before getting started, you will need to make sure you have Composer installed.

You should also check that your computer or server meets the [minimum system requirements](#system-requirements) for running the PHP application.

<a name="install-october"></a>
## Installing October CMS

You can then create a new October CMS project by using `create-project` command in your terminal. The following creates a new project in a directory called **myoctober**.

    composer create-project october/october myoctober

When the task finishes, run the installation command to guide you through the next steps.

    php artisan october:install

Next, migrate the database with the following command.

    php artisan october:migrate

You can then serve the application and open it in your browser.

    php artisan serve

> **Note**: If you are using a project, continue reading the [Projects article](https://octobercms.com/help/site/projects) for information on how to set up your project.

<a name="post-install-steps"></a>
## Post-Installation Steps

There are some things you may need to set up after the installation is complete.

<a name="config-review"></a>
### Review Configuration

Configuration files are stored in the **config** directory of the application. While each file contains descriptions for each setting, it is important to review the [common configuration options](../setup/configuration) available for your circumstances.

For example, in production environments you may want to do the following:

- Enable [CSRF protection](../setup/configuration#csrf-protection)
- Disable [debug mode](../setup/configuration#debug-mode)
- Use a [public folder](../setup/configuration#public-folder) for additional security

<a name="crontab-setup"></a>
### Setting Up The Scheduler

For *scheduled tasks* to operate correctly, you should add the following Cron entry to your server. Editing the crontab is commonly performed with the command `crontab -e`.

    * * * * * php /path/to/artisan schedule:run >> /dev/null 2>&1

Be sure to replace **/path/to/artisan** with the absolute path to the *artisan* file in the root directory of October CMS. This Cron will call the command scheduler every minute. Then October CMS evaluates any scheduled tasks and runs the tasks that are due.

> **Note**: If you are adding this to `/etc/cron.d` you'll need to specify a user immediately after `* * * * *`.

<a name="queue-setup"></a>
### Setting Up Queue Workers

You may optionally set up an external queue for processing *queued jobs*, by default these will be handled asynchronously by the platform. This behavior can be changed by setting the `default` parameter in the `config/queue.php`.

If you decide to use the `database` queue driver, it is a good idea to add a Crontab entry for the command `php artisan queue:work --once` to process the first available job in the queue.

You can also run the queue as a daemon process with

    php artisan queue:work

<a name="system-requirements"></a>
## Minimum System Requirements

October CMS has some server requirements for web hosting:

1. PHP version 7.2.9 or higher
1. Composer 2.0 or higher
1. PDO PHP Extension (and relevant driver for the database you want to connect to)
1. cURL PHP Extension
1. OpenSSL PHP Extension
1. Mbstring PHP Extension
1. ZipArchive PHP Extension
1. GD PHP Extension
1. SimpleXML PHP Extension

Support is provided for these databases with minimum requirements:

1. MySQL 5.7 or MariaDB 10.2
1. PostgreSQL 9.6
1. SQLite 3.8.8

Some OS distributions may require you manually install some of the necessary PHP extensions.

When using Ubuntu, the following command can be run to install all required extensions:

    sudo apt-get update &&
    sudo apt-get install php php-ctype php-curl php-xml php-fileinfo php-gd php-json php-mbstring php-mysql php-sqlite3 php-zip

When using the SQL Server database engine, you will need to install the [group concatenation](https://github.com/orlando-colamatteo/ms-sql-server-group-concat-sqlclr) user-defined aggregate.

<a name="troubleshoot-installation"></a>
## Troubleshooting Installation

1. **The installation hangs or freezes when I enter the license key**: This can happen in some environments when pasting the key contents. Press the ENTER key multiple times to allow the installation process to continue.

1. **A blank screen is displayed when opening the application**: Check the permissions are set correctly on the `/storage` files and folders, they should be writable for the web server.

1. **The back-end area displays "Page not found" (404)**: If the application cannot find the database then a 404 page will be shown for the back-end. Try enabling [debug mode](../setup/configuration#debug-mode) to see the underlying error message.

1. **An error 500 is displayed when updating the application**: You may need to increase or disable the timeout limit on your webserver. For example, Apache's FastCGI sometimes has the `-idle-timeout` option set to 30 seconds.

> **Note**: A detailed system log can be found in the `storage/logs` directory.
