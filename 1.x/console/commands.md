# Command List

October includes several command-line interface (CLI) commands and utilities that allow to install October, update it, as well as speed up the development process. The console commands are based on Laravel's [Artisan](http://laravel.com/docs/artisan) tool. You may [develop your own console commands](../console/development) or speed up development with the provided [scaffolding commands](../console/scaffolding).

## Console installation

Console installation can be performed using the native system or with [Composer](http://getcomposer.org/) to manage dependencies. Either approach will download the October application files and can be used right away. If you plan on using a database, be sure to run the [install command](#console-install-command) after installation.

### Quick start install

Run this in your terminal to get the latest copy of October:

    curl -s https://octobercms.com/api/installer | php

Or if you don't have curl:

    php -r "eval('?>'.file_get_contents('https://octobercms.com/api/installer'));"

### Composer install

Download the application source code by using `create-project` in your terminal. The following command will install to a directory called **/myoctober**.

    composer create-project october/october myoctober

Once this task has finished, open the file **config/cms.php** and enable the `disableCoreUpdates` setting. This will disable core updates from being delivered by the October gateway.

    'disableCoreUpdates' => true,

When updating October, use the composer update command as normal before performing a [database migration](#database-migration).

    composer update

Composer is configured to look inside plugin directories for composer dependencies and these will be included in updates.

> **Note:** To use composer with an October instance that has been installed using the [Wizard installation](../setup/installation#wizard-installation), simply copy the `tests/` directory and `composer.json` file from [GitHub](https://github.com/octobercms/october) into your October instance and then run `composer install`.

## Setup & Maintenance

### Install command

The `october:install` command will guide you through the process of setting up OctoberCMS for the first time. It will ask for the database configuration, application URL, encryption key and administrator details.

    php artisan october:install

You also may wish to inspect **config/app.php** and **config/cms.php** to change any additional configuration.

> **Note:** You cannot run `october:install` after running `october:env`. `october:env` takes the existing configuration values and puts them in the `.env` file while replacing the original values with calls to `env()` within the configuration files. `october:install` cannot now replace those calls to `env()` within the configuration files as that would be overly complex to manage.

### System update

The `october:update` command will request updates from the October gateway. It will update the core application and plugin files, then perform a database migration.

    php artisan october:update

> **IMPORTANT**: If you are using [using composer](#console-install-composer) do **NOT** run this command without first making sure that `cms.disableCoreUpdates` is set to true. Doing so will cause conflicts between the marketplace version of October and the version available through composer. In order to update the core October installation when using composer run `composer update` instead.

### Database migration

The `october:up` command will perform a database migration, creating database tables and executing seed scripts, provided by the system and [plugin version history](../plugin/updates). The migration command can be run multiple times, it will only execute a migration or seed script once, which means only new changes are applied.

    php artisan october:up

The inverse command `october:down` will reverse all migrations, dropping database tables and deleting data. Care should be taken when using this command. The [plugin refresh command](#refresh-plugin) is a useful alternative for debugging a single plugin.

    php artisan october:down

### Change Backend user password

The `october:passwd` command will allow the password of a Backend user or administrator to be changed via the command-line. This is useful if someone gets locked out of their October CMS install, or for changing the password for the default administrator account.

    php artisan october:passwd username password

You may provide the username/email and password as both the first and second argument, or you may leave the arguments blank, in which case the command will be run interactively.

## Plugin management

October includes a number of commands for managing plugins.

### Install plugin

`plugin:install` - downloads and installs the plugin by its name. The next example will install a plugin called **AuthorName.PluginName**. Note that your installation should be bound to a project in order to use this command. You can create projects on October website, in the [Account / Projects](https://octobercms.com/account/project/dashboard) section.

    php artisan plugin:install AuthorName.PluginName

### Refresh plugin

`plugin:refresh` - destroys the plugin's database tables and recreates them. This command is useful for development.

    php artisan plugin:refresh AuthorName.PluginName


### Rollback plugin

`plugin:rollback` - Rollback the specified plugin's migrations. The second parameter is optional, if specified the rollback process will stop at the specified version.

    php artisan plugin:rollback AuthorName.PluginName 1.2.3

### List Plugins

`plugin:list` - Displays a list of installed plugins.

    php artisan plugin:list

### Disable Plugin

`plugin:disable` - Disable an existing plugin.

    php artisan plugin:disable AuthorName.PluginName

### Enable Plugin

`plugin:enable` - Enable a disabled plugin.

    php artisan plugin:enable AuthorName.PluginName

### Remove plugin

`plugin:remove` - destroys the plugin's database tables and deletes the plugin files from the filesystem.

    php artisan plugin:remove AuthorName.PluginName

## Theme management

October includes a number of commands for managing themes.

### Install theme

`theme:install` - download and install a theme from the [Marketplace](https://octobercms.com/themes/). The following example will install the theme in `/themes/authorname-themename`

    php artisan theme:install AuthorName.ThemeName

If you wish to install the theme in a custom directory, simply provide the second argument. The following example will download `AuthorName.ThemeName` and install it in `/themes/my-theme`

    php artisan theme:install AuthorName.ThemeName my-theme

### List themes

`theme:list` - list installed themes. Use the **-m** option to include popular themes in the Marketplace.

    php artisan theme:list

### Enable theme

`theme:use` - switch the active theme. The following example will switch to the theme in `/themes/rainlab-vanilla`

    php artisan theme:use rainlab-vanilla

### Remove theme

`theme:remove` - delete a theme. The following example will delete the directory `/themes/rainlab-vanilla`

    php artisan theme:remove rainlab-vanilla

### Sync theme

`theme:sync` - Sync a theme's content between the filesystem and database when `cms.databaseTemplates` is enabled.

```bash
php artisan theme:sync
```

By default the theme that will be synced is the currently active one. You can specify any theme to sync by passing the desired theme's code:

```bash
php artisan theme:sync my-custom-theme
```

By default the sync direction will be from the database to the filesytem (i.e. you're syncing changes on a remote host to the filesystem for tracking in a version control system). However, you can change the direction of the sync by specifying `--target=database`. This is useful if you have changed the underlying files that make up the theme and you want to force the site to pick up your changes even if they have made changes of their own that are stored in the database.

```bash
php artisan theme:sync --target=database
```

By default the command requires user interaction to confirm that they want to complete the sync (including information about the amount of paths affected, the theme targeted, and the target & source of the sync). To override the need for user interaction (i.e. if running this command in a deploy / build script of some sort) just pass the `--force` option:

```bash
php artisan theme:sync --force
```

Unless otherwise specified, the command will sync all the valid paths (determined by the Halcyon model instances returned to the `system.console.theme.sync.getAvailableModelClasses` event) available in the theme. To manually specify specific paths to be synced pass a comma separated list of paths to the `--paths` option:

```bash
php artisan theme:sync --paths=partials/header.htm,content/contact.md
```

## Utilities

October includes a number of utility commands.

### Clear application cache

`cache:clear` - clears the application, twig and combiner cache directories. Example:

    php artisan cache:clear

### Remove demo data

`october:fresh` - removes the demo theme and plugin that ships with October.

    php artisan october:fresh

### Mirror public directory

`october:mirror` - creates a mirrored copy of the public files needed to serve the application, using symbolic linking. This command is used when [setting up a public folder](../setup/configuration#public-folder).

```bash
php artisan october:mirror public
```

>**Note:** By default the symlinks created will be absolute symlinks, to create them as relative symlinks instead include the `--relative` option:

```bash
php artisan october:mirror public --relative
```

### Enable DotEnv configuration

`october:env` - changes common configuration values to [DotEnv syntax](../setup/configuration#dotenv-configuration).

    php artisan october:env

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
