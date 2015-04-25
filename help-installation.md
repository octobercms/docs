# Installation

- [Minimum System Requirements](#system-requirements)
- [Wizard installation](#wizard-installation)
- [Command-line installation](#command-line-installation)
- [Webserver configuration](#webserver-configuration)
- [Post-install configuration](#post-install-config)
- [Environment configuration](#environment-config)

There are two ways you can install October, either using the Wizard or Command-line installation process.
Before you proceed, you should check that your server meets the minimum system requirements.

<a name="system-requirements" class="anchor" href="#system-requirements"></a>
## Minimum System Requirements

October CMS has some server requirements for web hosting:

1. PHP version 5.4 or higher
1. PDO PHP Extension
1. cURL PHP Extension
1. OpenSSL PHP Extension
1. MCrypt PHP Extension
1. Mbstring PHP Library
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

![image](https://github.com/octobercms/docs/blob/master/images/wizard-installer.png?raw=true) {.img-responsive .frame}

<a name="troubleshoot-installation" class="anchor" href="#troubleshoot-installation"></a>
### Troubleshooting installation

1. **An error 500 is displayed when downloading the application files**: You may need to increase or disable the timeout limit on your webserver. For example, Apache's FastCGI sometimes has the `-idle-timeout` option set to 30 seconds.

> **Note:** A detailed installation log can be found in the `install_files/install.log` file.

<a name="command-line-installation" class="anchor" href="#command-line-installation"></a>
## Command-line installation

If you feel more comfortable with a command-line and want to use composer, there is a CLI install process on the [Console interface page](console#console-install).

<a name="webserver-configuration" class="anchor" href="#webserver-configuration"></a>
## Web server configuration

October has basic configuration that should be applied to your webserver. Common webservers and their configuration can be found below.

- [Apache configuration](#apache-configuration)
- [Nginx configuration](#nginx-configuration)
- [Lighttpd configuration](#lighttd-configuration)

<a name="apache-configuration" class="anchor" href="#apache-configuration"></a>
### Apache configuration

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
### Nginx configuration

There are small changes required to configure your site in Nginx.

`nano /etc/nginx/sites-available/default`

Use the following code in **server** section. If you have installed October into a subdirectory, replace `/` with the directory October was installed under:

    location / {
        try_files $uri $uri/ /index.php$is_args$args;
    }

    rewrite ^themes/.*/(layouts|pages|partials)/.*.htm /index.php break;
    rewrite ^bootstrap/.* /index.php break;
    rewrite ^config/.* /index.php break;
    rewrite ^vendor/.* /index.php break;
    rewrite ^storage/cms/.* /index.php break;
    rewrite ^storage/logs/.* /index.php break;
    rewrite ^storage/framework/.* /index.php break;
    rewrite ^storage/temp/protected/.* /index.php break;
    rewrite ^storage/app/uploads/protected/.* /index.php break;

<a name="lighttd-configuration" class="anchor" href="#lighttd-configuration"></a>
### Lighttpd configuration

If your webserver is running Lighttpd you can use the following configuration to run OctoberCMS.

Open your site configuration file with your favorite editor.

`nano /etc/lighttpd/conf-enabled/sites.conf`

Paste the following code in the editor and change the **host address** and  **server.document-root** to match your project.

    $HTTP["host"] =~ "example.domain.com" {
        server.document-root = "/var/www/example/"

        url.rewrite-once = (
            "^/(plugins|modules/(system|backend|cms))/(([\w-]+/)+|/|)assets/([\w-]+/)+[-\w^&'@{}[\],$=!#().%+~/ ]+\.(jpg|jpeg|gif|png|svg|swf|avi|mpg|mpeg|mp3|flv|ico|css|js|woff|ttf)(\?.*|)$" => "$0",
            "^/(system|themes/[\w-]+)/assets/([\w-]+/)+[-\w^&'@{}[\],$=!#().%+~/ ]+\.(jpg|jpeg|gif|png|svg|swf|avi|mpg|mpeg|mp3|flv|ico|css|js|woff|ttf)(\?.*|)$" => "$0",
            "^/storage/app/uploads/public/[\w-]+/.*$" => "$0",
            "^/storage/temp/public/[\w-]+/.*$" => "$0",
            "^/(favicon\.ico|robots\.txt|sitemap\.xml)$" => "$0",
            "(.*)" => "/index.php$1"
        )
    }

<a name="post-install-config" class="anchor" href="#post-install-config"></a>
## Post-install configuration

There are some things you may need to set up after the installation is complete.

- [Delete installation files](#delete-install-files)
- [Setting up the crontab](#crontab-setup)
- [Setting up queue workers](#queue-setup)

<a name="delete-install-files" class="anchor" href="#delete-install-files"></a>
### Delete installation files

If you have used the [Wizard installation](#wizard-installation) you should delete the installation files for security reasons. October will never delete files from your system automatically, so you should delete these files and directories manually:

    install_files/      <== Installation directory
    install.php         <== Installation script

<a name="crontab-setup" class="anchor" href="#crontab-setup"></a>
### Setting up the crontab

For *scheduled tasks* to operate correctly, you should add the following to your Crontab using `crontab -e` and replace **/path/to/artisan** with the absolute path to the *artisan* file in the root directory of October:

    * * * * * php /path/to/artisan schedule:run 1>> /dev/null 2>&1

> **Note**: If you are adding this to `/etc/cron.d` you'll need to specify a user immediately after `* * * * *`.

<a name="queue-setup" class="anchor" href="#queue-setup"></a>
### Setting up queue workers

You may optionally set up an external queue for processing *queued jobs*, by default these will be handled asynchronously by the platform. This behavior can be changed by setting the `default` parameter in the `config/queue.php`.

If you decide to use the `database` queue driver, it is a good idea to add a Crontab entry for the command `php artisan queue:work` to process the first available job in the queue.

<a name="environment-config" class="anchor" href="#environment-config"></a>
## Environment configuration

It is often helpful to have different configuration values based on the environment the application is running in. You can do this by setting the `APP_ENV` environment variable which by default it is set to **production**. There are two common ways to change this value:

1. Set `APP_ENV` value directly with your webserver.

    For example, in Apache this line can be added to the `.htaccess` or `httpd.config` file:

        SetEnv APP_ENV "dev"

2. Create a **.env** file in the root directory with the following content:

        APP_ENV=dev

In both of the above examples, the environment is set to the new value `dev`. Configuration files can now be created in the path **config/dev** and will override the application's base configuration.

For example, to use a different MySQL database for the `dev` environment only, create a file called **config/dev/database.php** using this content:

    <?php

    return [
        'connections' => [
            'mysql' => [
                'host'      => 'localhost',
                'port'      => '',
                'database'  => 'database',
                'username'  => 'root',
                'password'  => '',
            ]
        ]
    ];
