# Command Line Interface

- [Setup & Maintenance](#maintenance-commands)
    - [Install command](#console-install-command)
    - [System update](#console-update-command)
    - [Database migration](#console-up-command)
    - [Change Backend user password](#change-backend-user-password-command)
- [Plugin management](#plugin-commands)
    - [Install plugin](#plugin-install-command)
    - [Refresh plugin](#plugin-refresh-command)
    - [Rollback plugin](#plugin-rollback-command)
    - [List plugin](#plugin-list-command)
    - [Disable plugin](#plugin-disable-command)
    - [Enable plugin](#plugin-enable-command)
    - [Remove plugin](#plugin-remove-command)
- [Theme management](#theme-commands)
    - [Install theme](#theme-install-command)
    - [List themes](#theme-list-command)
    - [Enable theme](#theme-use-command)
    - [Remove theme](#theme-remove-command)
    - [Sync theme](#theme-sync-command)
- [Utilities](#utility-commands)
    - [Clear application cache](#cache-clear-command)
    - [Remove demo data](#october-fresh-command)
    - [Mirror public directory](#cache-clear-command)
    - [Enable DotEnv configuration](#october-env-command)
    - [Miscellaneous commands](#october-util-command)

October CMS includes several command-line interface (CLI) commands and utilities that allow to install October, update it, as well as speed up the development process. The console commands are based on Laravel's [Artisan](http://laravel.com/docs/artisan) tool. You may [develop your own console commands](../console/development) or speed up development with the provided [scaffolding commands](../console/scaffolding).

<a name="maintenance-commands"></a>
## Setup & Maintenance

<a name="console-install-command"></a>
### Install command

The `october:install` command will guide you through the process of setting up October CMS for the first time. It will ask for the database configuration, application URL, encryption key and administrator details.

    php artisan october:install

You also may wish to inspect **config/app.php** and **config/cms.php** to change any additional configuration.

> **Note**: You cannot run `october:install` after running `october:env`. `october:env` takes the existing configuration values and puts them in the `.env` file while replacing the original values with calls to `env()` within the configuration files. `october:install` cannot now replace those calls to `env()` within the configuration files as that would be overly complex to manage.

<a name="console-update-command"></a>
### System update

The `october:update` command will request updates from the October gateway. It will update the core application and plugin files, then perform a database migration.

    php artisan october:update

> **IMPORTANT**: If you are using [using composer](#console-install-composer) do **NOT** run this command without first making sure that `cms.disableCoreUpdates` is set to true. Doing so will cause conflicts between the marketplace version of October and the version available through composer. In order to update the core October installation when using composer run `composer update` instead.

<a name="console-up-command"></a>
### Database migration

The `october:up` command will perform a database migration, creating database tables and executing seed scripts, provided by the system and [plugin version history](../plugin/updates). The migration command can be run multiple times, it will only execute a migration or seed script once, which means only new changes are applied.

    php artisan october:up

The inverse command `october:down` will reverse all migrations, dropping database tables and deleting data. Care should be taken when using this command. The [plugin refresh command](#plugin-refresh-command) is a useful alternative for debugging a single plugin.

    php artisan october:down

<a name="change-backend-user-password-command"></a>
### Change Backend user password

The `october:passwd` command will allow the password of a Backend user or administrator to be changed via the command-line. This is useful if someone gets locked out of their October CMS install, or for changing the password for the default administrator account.

    php artisan october:passwd username password

You may provide the username/email and password as both the first and second argument, or you may leave the arguments blank, in which case the command will be run interactively.

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


<a name="plugin-rollback-command"></a>
### Rollback plugin

`plugin:rollback` - Rollback the specified plugin's migrations. The second parameter is optional, if specified the rollback process will stop at the specified version.

    php artisan plugin:rollback AuthorName.PluginName 1.2.3

<a name="plugin-list-command"></a>
### List Plugins

`plugin:list` - Displays a list of installed plugins.

    php artisan plugin:list

<a name="plugin-disable-command"></a>
### Disable Plugin

`plugin:disable` - Disable an existing plugin.

    php artisan plugin:disable AuthorName.PluginName

<a name="plugin-enable-command"></a>
### Enable Plugin

`plugin:enable` - Enable a disabled plugin.

    php artisan plugin:enable AuthorName.PluginName

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

<a name="theme-sync-command"></a>
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

```bash
php artisan october:mirror public
```

>**Note:** By default the symlinks created will be absolute symlinks, to create them as relative symlinks instead include the `--relative` option:

```bash
php artisan october:mirror public --relative
```

<a name="october-env-command"></a>
### Enable DotEnv configuration

`october:env` - changes common configuration values to [DotEnv syntax](../setup/configuration#dotenv-configuration).

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
