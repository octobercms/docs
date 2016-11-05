# Command Line Interface

- [Console installation](#console-install)
    - [Quick start install](#console-install-quick)
    - [Composer install](#console-install-composer)
- [Setup & Maintenance](#maintenance-commands)
    - [Install command](#console-install-command)
    - [System update](#console-update-command)
    - [Database migration](#console-up-command)
- [Plugin management](#plugin-commands)
    - [Install plugin](#plugin-install-command)
    - [Refresh plugin](#plugin-refresh-command)
    - [Remove plugin](#plugin-remove-command)
- [Theme management](#theme-commands)
    - [Install theme](#theme-install-command)
    - [List themes](#theme-list-command)
    - [Enable theme](#theme-use-command)
    - [Remove theme](#theme-remove-command)
- [Utilities](#utility-commands)
    - [Clear application cache](#cache-clear-command)
    - [Remove demo data](#october-fresh-command)
    - [Mirror public directory](#cache-clear-command)
    - [Enable DotEnv configuration](#october-env-command)
    - [Miscellaneous commands](#october-util-command)

October includes several command-line interface (CLI) commands and utilities that allow to install October, update it, as well as speed up the development process. The console commands are based on Laravel's [Artisan](http://laravel.com/docs/artisan) tool. You may [develop your own console commands](../console/development) or speed up development with the provided [scaffolding commands](../console/scaffolding).

<a name="console-install"></a>
## Console installation

Console installation can be performed using the native system or with [Composer](http://getcomposer.org/) to manage dependencies. Either approach will download the October application files and can be used right away. If you plan on using a database, be sure to run the [install command](#console-install-command) after installation.

<a name="console-install-quick"></a>
### Quick start install

Run this in your terminal to get the latest copy of October:

    curl -s https://octobercms.com/api/installer | php

Or if you don't have curl:

    php -r "eval('?>'.file_get_contents('https://octobercms.com/api/installer'));"

<a name="console-install-composer"></a>
### Composer install

Download the application source code by using `create-project` in your terminal. The following command will install to a directory called **/myoctober**.

    composer create-project october/october myoctober dev-master

Once this task has finished, open the file **config/cms.php** and enable the `disableCoreUpdates` setting. This will disable core updates from being delivered by the October gateway.

    'disableCoreUpdates' => true,

When updating October, use the composer update command as normal before performing a [database migration](#console-up-command).

    composer update

> **Note**: Composer is configured to look inside plugin directories for composer dependencies and these will be included in updates.

<a name="maintenance-commands"></a>
## Setup & Maintenance

<a name="console-install-command"></a>
### Install command

The `october:install` command will guide you through the process of setting up OctoberCMS for the first time. It will ask for the database configuration, application URL, encryption key and administrator details.

    php artisan october:install

You also may wish to inspect **config/app.php** and **config/cms.php** to change any additional configuration.

<a name="console-update-command"></a>
### System update

The `october:update` command will request updates from the October gateway. It will update the core application and plugin files, then perform a database migration.

    php artisan october:update

> **Note**: If you have [installed using composer](#console-install-composer), the core application files will not be downloaded and `composer update` should be called before running this command.

<a name="console-up-command"></a>
### Database migration

The `october:up` command will perform a database migration, creating database tables and executing seed scripts, provided by the system and [plugin version history](../plugin/updates). The migration command can be run multiple times, it will only execute a migration or seed script once, which means only new changes are applied.

    php artisan october:up

The inverse command `october:down` will reverse all migrations, dropping database tables and deleting data. Care should be taken when using this command. The [plugin refresh command](#plugin-refresh-command) is a useful alternative for debugging a single plugin.

    php artisan october:down

<a name="plugin-commands"></a>
## Plugin management

October includes a number of commands for managing plugins.

<a name="plugin-install-command"></a>
### Install plugin

`plugin:install` - downloads and installs the plugin by its name. The next example will install a plugin called **AuthorName.PluginName**. Note that your installation should be bound to a project in order to use this command. You can create projects on October website, in the [Account / Projects](https://octobercms.com/account/project/dashboard) section.

    php artisan plugin:install AuthorName.PluginName

<a name="plugin-refresh-command"></a>
### Refresh plugin

`plugin:refresh` - destroys the plugin's database tables and recreates them. This command is useful for development.

    php artisan plugin:refresh AuthorName.PluginName

<a name="plugin-remove-command"></a>
### Remove plugin

`plugin:remove` - destroys the plugin's database tables and deletes the plugin files from the filesystem.

    php artisan plugin:remove AuthorName.PluginName

<a name="theme-commands"></a>
## Theme management

October includes a number of commands for managing themes.

<a name="theme-install-command"></a>
### Install theme

`theme:install` - download and install a theme from the [Marketplace](https://octobercms.com/themes/). The following example will install the theme in `/themes/authorname-themename`

    php artisan theme:install AuthorName.ThemeName

If you wish to install the theme in a custom directory, simply provide the second argument. The following example will download `AuthorName.ThemeName` and install it in `/themes/my-theme`

    php artisan theme:install AuthorName.ThemeName my-theme

<a name="theme-list-command"></a>
### List themes

`theme:list` - list installed themes. Use the **-m** option to include popular themes in the Marketplace.

    php artisan theme:list

<a name="theme-use-command"></a>
### Enable theme

`theme:use` - switch the active theme. The following example will switch to the theme in `/themes/rainlab-vanilla`

    php artisan theme:use rainlab-vanilla

<a name="theme-remove-command"></a>
### Remove theme

`theme:remove` - delete a theme. The following example will delete the directory `/themes/rainlab-vanilla`

    php artisan theme:remove rainlab-vanilla

<a name="utility-commands"></a>
## Utilities

October includes a number of utility commands.

<a name="cache-clear-command"></a>
### Clear application cache

`cache:clear` - clears the application, twig and combiner cache directories. Example:

    php artisan cache:clear

<a name="october-fresh-command"></a>
### Remove demo data

`october:fresh` - removes the demo theme and plugin that ships with October.

    php artisan october:fresh

<a name="cache-clear-command"></a>
### Mirror public directory

`october:mirror` - creates a mirrored copy of the public files needed to serve the application, using symbolic linking. This command is used when [setting up a public folder](../setup/configuration#public-folder).

    php artisan october:mirror public/

<a name="october-env-command"></a>
### Enable DotEnv configuration

`october:env` - changes common configuration values to [DotEnv syntax](../setup/configuration#environment-config-extended).

    php artisan october:env

<a name="october-util-command"></a>
### Miscellaneous commands

`october:util` - a generic command to perform general utility tasks, such as cleaning up files or combining files. The arguments passed to this command will determine the task used.

#### Compile assets

Outputs combined system files for JavaScript (js), StyleSheets (less), client side language (lang), or everything (assets).

    php artisan october:util compile assets
    php artisan october:util compile lang
    php artisan october:util compile js
    php artisan october:util compile less

To combine without minification, pass the `--debug` option.

    php artisan october:util compile js --debug

#### Pull all repos

This will execute the command `git pull` on all theme and plugin directories.

    php artisan october:util git pull

#### Purge thumbnails

Deletes all generated thumbnails in the uploads directory.

    php artisan october:util purge thumbs
