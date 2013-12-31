There are two ways you can install October, either using the Wizard or Command-line installation process. Before you proceed, you should check that your server meets the minimum system requirements.

#### Minimum System Requirements

October CMS has a few system requirements:

* PHP 5.4 or higher with **safe_mode** and **open_basedir** restrictions disabled
* PDO PHP Extension
* cURL PHP Extension
* MCrypt PHP Extension
* ZipArchive PHP Library

As of PHP 5.5, some OS distributions may require you to manually install the PHP JSON extension. When using Ubuntu, this can be done via ``apt-get install php5-json``.

#### Wizard installation (Recommended)

##### Installation steps

1. Prepare a directory on your server that is empty. It can be a sub-directory, domain root or a sub-domain.
2. Unpack the installer archive to the prepared sub-directory, domain root or a sub-domain.
3. Grant writing permissions on the installation directory and all its subdirectories and files.
4. Navigate to the install.php script in your web browser.
5. Follow the installation instructions.

#### Command-line installation (Advanced)

The command-line interface (CLI) method of installation requires [Composer](http://getcomposer.org/) to manage its dependencies.

Download the application source code by using the `create-project` in your terminal:

```
composer create-project october/october --prefer-dist
```

Next, run the CLI installation wizard and follow the prompts:

```
php artisan october:install
```

#### Troubleshooting installation

Reserved for common problems faced during installation.