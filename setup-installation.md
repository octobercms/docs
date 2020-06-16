# Installation

- [Minimum system requirements](#system-requirements)
- [Wizard installation](#wizard-installation)
    - [Troubleshooting installation](#troubleshoot-installation)
- [Command-line installation](#command-line-installation)
- [Post-installation steps](#post-install-steps)
    - [Delete installation files](#delete-install-files)
    - [Review configuration](#config-review)
    - [Setting up the scheduler](#crontab-setup)
    - [Setting up queue workers](#queue-setup)

There are two ways you can install October, either using the [Wizard installer](#wizard-installation) or [Command-line installation](../console/commands#console-install) instructions. Before you proceed, you should check that your server meets the minimum system requirements.

<a name="system-requirements"></a>
## Minimum system requirements

October CMS has some server requirements for web hosting:

1. PHP version 7.2 or higher
1. PDO PHP Extension (and relevant driver for the database you want to connect to)
1. cURL PHP Extension
1. OpenSSL PHP Extension
1. Mbstring PHP Extension
1. ZipArchive PHP Extension
1. GD PHP Extension
1. SimpleXML PHP Extension

Some OS distributions may require you to manually install some of the required PHP extensions.

When using Ubuntu, the following command can be run to install all required extensions:

```bash
sudo apt-get update &&
sudo apt-get install php php-ctype php-curl php-xml php-fileinfo php-gd php-json php-mbstring php-mysql php-sqlite3 php-zip
```

Some OS distributions may require you to manually install the PHP JSON and XML extensions. For example, when using Ubuntu this can be done via `apt-get install php7.2-json` and `apt-get install php7.2-xml` respectively.

When using the SQL Server database engine, you will need to install the [group concatenation](https://groupconcat.codeplex.com/) user-defined aggregate.

<a name="wizard-installation"></a>
## Wizard installation

The wizard installation is a recommended way to install October. It is simpler than the command-line installation and doesn't require any special skills.

1. Prepare a directory on your server that is empty. It can be a sub-directory, domain root or a sub-domain.
1. [Download the installer archive file](http://octobercms.com/download).
1. Unpack the installer archive to the prepared directory.
1. Grant writing permissions on the installation directory and all its subdirectories and files.
1. Navigate to the install.php script in your web browser.
1. Follow the installation instructions.

![image](https://github.com/octobercms/docs/blob/master/images/wizard-installer.png?raw=true) {.img-responsive .frame}

<a name="troubleshoot-installation"></a>
### Troubleshooting installation

1. **An error 500 is displayed when downloading the application files**: You may need to increase or disable the timeout limit on your webserver. For example, Apache's FastCGI sometimes has the `-idle-timeout` option set to 30 seconds.

1. **A blank screen is displayed when opening the application**: Check the permissions are set correctly on the `/storage` files and folders, they should be writable for the web server.

1. **An error code "liveConnection" is displayed**: The installer will test a connection to the installation server using port 80. Check that your webserver can create outgoing connections on port 80 via PHP. Contact your hosting provider or this is often found in the server firewall settings.

1. **The back-end area displays "Page not found" (404)**: If the application cannot find the database then a 404 page will be shown for the back-end. Try enabling [debug mode](../setup/configuration#debug-mode) to see the underlying error message.

> **Note:** A detailed installation log can be found in the `install_files/install.log` file.

<a name="command-line-installation"></a>
## Command-line installation

If you feel more comfortable with a command-line or want to use composer, there is a CLI install process on the [Console interface page](../console/commands#console-install).

<a name="post-install-steps"></a>
## Post-installation steps

There are some things you may need to set up after the installation is complete.

<a name="delete-install-files"></a>
### Delete installation files

If you have used the [Wizard installer](#wizard-installation), for security reasons you should verify the installation files have been deleted. The October installer attempts to cleanup after itself, but you should always verify that they have been successfullly removed:

    install_files/      <== Installation directory
    install.php         <== Installation script

<a name="config-review"></a>
### Review configuration

Configuration files are stored in the **config** directory of the application. While each file contains descriptions for each setting, it is important to review the [common configuration options](../setup/configuration) available for your circumstances.

For example, in production environments you may want to enable [CSRF protection](../setup/configuration#csrf-protection). While in development environments, you may want to enable [bleeding edge updates](../setup/configuration#edge-updates).

While most configuration is optional, we strongly recommend disabling [debug mode](../setup/configuration#debug-mode) for production environments. You may also want to use a [public folder](../setup/configuration#public-folder) for additional security.

<a name="crontab-setup"></a>
### Setting up the scheduler

For *scheduled tasks* to operate correctly, you should add the following Cron entry to your server. Editing the crontab is commonly performed with the command `crontab -e`.

    * * * * * php /path/to/artisan schedule:run >> /dev/null 2>&1

Be sure to replace **/path/to/artisan** with the absolute path to the *artisan* file in the root directory of October. This Cron will call the command scheduler every minute. Then October evaluates any scheduled tasks and runs the tasks that are due.

> **Note**: If you are adding this to `/etc/cron.d` you'll need to specify a user immediately after `* * * * *`.

<a name="queue-setup"></a>
### Setting up queue workers

You may optionally set up an external queue for processing *queued jobs*, by default these will be handled asynchronously by the platform. This behavior can be changed by setting the `default` parameter in the `config/queue.php`.

If you decide to use the `database` queue driver, it is a good idea to add a Crontab entry for the command `php artisan queue:work --once` to process the first available job in the queue.
