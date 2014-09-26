# Installation

- [Minimum System Requirements](#system-requirements)
- [Wizard installation](#wizard-installation)
- [Apache configuration](#apache-configuration)
- [Nginx configuration](#nginx-configuration)
- [Lighttpd configuration](#lighttd-configuration)
- [Setting up the crontab](#crontab-setup)
- [Command-line installation](#command-line-installation)

There are two ways you can install October, either using the Wizard or Command-line installation process.
Before you proceed, you should check that your server meets the minimum system requirements.

<a name="system-requirements" class="anchor" href="#system-requirements"></a>
## Minimum System Requirements

October CMS has a few system requirements:

1. PHP 5.4 or higher with **safe_mode** restrictions disabled
1. PDO PHP Extension
1. cURL PHP Extension
1. MCrypt PHP Extension
1. ZipArchive PHP Library
1. GD PHP Library

As of PHP 5.5, some OS distributions may require you to manually install the PHP JSON extension.
When using Ubuntu, this can be done via ``apt-get install php5-json``.

<a name="wizard-installation" class="anchor" href="#wizard-installation"></a>
## Wizard installation

The wizard installation is a recommended way to install October. It is simpler than the command-line installation and doesn't require any special skills.

1. Prepare a directory on your server that is empty. It can be a sub-directory, domain root or a sub-domain.
1. [Download the installer archive file](https://github.com/octobercms/install/archive/master.zip).
1. Unpack the installer archive to the prepared directory.
1. Grant writing permissions on the installation directory and all its subdirectories and files.
1. Navigate to the install.php script in your web browser.
1. Follow the installation instructions.

### Troubleshooting installation

1. **The page appears empty when opening the installer**: This might be caused by using older versions of PHP, check that you are running PHP version 5.4 or higher.

1. **An error 500 is displayed when downloading the application files**: You may need to increase or disable the timeout limit on your webserver. For example, Apache's FastCGI sometimes has the `-idle-timeout` option set to 30 seconds.

<a name="apache-configuration" class="anchor" href="#apache-configuration"></a>
## Apache configuration

If your webserver is running Apache there are some extra system requirements:

1. mod_rewrite should be installed
1. AllowOverride option should be switched on

In some cases you may need to uncomment this line in the `.htaccess` file:

    ##
    ## You may need to uncomment the following line for some hosting environments,
    ## if you have installed to a subdirectory, enter the name here also.
    ##
    # RewriteBase /

If you have installed to a subdirectory, you should add the name of the subdirectory also:

    RewriteBase /mysubdirectory/

<a name="nginx-configuration" class="anchor" href="#nginx-configuration"></a>
## Nginx configuration

There are small changes required to configure your site in Nginx.

`nano /etc/nginx/sites-available/default`

Use the following code in **server** section.

```lua
if (!-e $request_filename)
{
    rewrite ^/(.*)$ /index.php?/$1 break;
    break;
}
rewrite themes/.*/(layouts|pages|partials)/.*.htm /index.php break;
rewrite uploads/protected/.* /index.php break;
```

<a name="lighttd-configuration" class="anchor" href="#lighttd-configuration"></a>
## Lighttpd configuration

If your webserver is running Lighttpd you can use the following configuration to run OctoberCMS.

Open your site configuration file with your favorite editor.

`nano /etc/lighttpd/conf-enabled/sites.conf`

Paste the following code in the editor and change the **host address** and  **server.document-root** to match your project.

```lua
$HTTP["host"] =~ "example.domain.com" {
    server.document-root = "/var/www/example/"

    url.rewrite-once = (
        "^/(plugins|modules/(system|backend|cms))/(([\w-]+/)+|/|)assets/([\w-]+/)+[-\w^&'@{}[\],$=!#().%+~/ ]+\.(jpg|jpeg|gif|png|svg|swf|avi|mpg|mpeg|mp3|flv|ico|css|js|woff|ttf)(\?.*|)$" => "$0",
        "^/(system|themes/[\w-]+)/assets/([\w-]+/)+[-\w^&'@{}[\],$=!#().%+~/ ]+\.(jpg|jpeg|gif|png|svg|swf|avi|mpg|mpeg|mp3|flv|ico|css|js|woff|ttf)(\?.*|)$" => "$0",
        "^/uploads/public/[\w-]+/.*$" => "$0",
        "^/(favicon\.ico|robots\.txt|sitemap\.xml)$" => "$0",
        "(.*)" => "/index.php$1"
    )
}
```

<a name="crontab-setup" class="anchor" href="#crontab-setup"></a>
## Setting up the crontab

By default *queued jobs* are executed using a simple database driven [Queue driver for Laravel](http://laravel.com/docs/queues) and repeating *scheduled tasks* are managed by [Dispatcher](https://github.com/indatus/dispatcher).

For these automated tasks to operate correctly, you should add the following to your Crontab using `crontab -e` and replace **/path/to/artisan** with the absolute path to the *artisan* file in the root directory of October:

```php
* * * * * php /path/to/artisan queue:cron 1>> /dev/null 2>&1
* * * * * php /path/to/artisan scheduled:run 1>> /dev/null 2>&1
```

> **Note**: If you are adding this to `/etc/cron.d` you'll need to specify a user immediately after `* * * * *`.

<a name="command-line-installation" class="anchor" href="#command-line-installation"></a>
## Command-line installation

If you feel more comfortable with a command-line, there is a CLI install process on the [Console interface page](console#console-install).
