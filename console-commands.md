# Command Line Interface

- [Setup & Maintenance](#maintenance-commands)
    - [Install Command](#console-install-command)
    - [System Update](#console-update-command)
    - [Database Migration](#console-up-command)
    - [Change Backend User Password](#change-backend-user-password-command)
- [Project Management](#project-commands)
    - [Synchronize Project](#project-sync-command)
    - [Set Project](#project-set-command)
- [Plugin Management](#plugin-commands)
    - [Install Plugin](#plugin-install-command)
    - [Refresh Plugin](#plugin-refresh-command)
    - [Rollback Plugin](#plugin-rollback-command)
    - [List Plugin](#plugin-list-command)
    - [Disable Plugin](#plugin-disable-command)
    - [Enable Plugin](#plugin-enable-command)
    - [Remove Plugin](#plugin-remove-command)
- [Theme Management](#theme-commands)
    - [Install Theme](#theme-install-command)
    - [List Themes](#theme-list-command)
    - [Enable Theme](#theme-use-command)
    - [Remove Theme](#theme-remove-command)
    <!-- - [Sync Theme](#theme-sync-command) -->
- [Utilities](#utility-commands)
    - [Clear Application Cache](#cache-clear-command)
    - [Remove Demo Data](#october-fresh-command)
    - [Mirror Public Directory](#cache-clear-command)
    - [Miscellaneous Commands](#october-util-command)

October CMS includes several command-line interface (CLI) commands and utilities that allow to manage various aspects of the platform, as well as speed up the development process. The console commands are based on Laravel's [Artisan](http://laravel.com/docs/artisan) tool. You may [develop your own console commands](../console/development) or speed up development with the provided [scaffolding commands](../console/scaffolding).

<a name="maintenance-commands"></a>
## Setup & Maintenance

<a name="console-install-command"></a>
### Install Command

The `october:install` command will guide you through the process of setting up October CMS for the first time. It will ask for the database configuration, application URL, encryption key and administrator details.

    php artisan october:install

You also may wish to inspect **config/app.php** and **config/cms.php** to change any additional configuration.

> **Note**: You cannot run `october:install` after running `october:env`. `october:env` takes the existing configuration values and puts them in the `.env` file while replacing the original values with calls to `env()` within the configuration files. `october:install` cannot now replace those calls to `env()` within the configuration files as that would be overly complex to manage.

<a name="console-update-command"></a>
### System Update

The `october:update` command will request updates from the October gateway. It will update the core application and plugin files, then perform a database migration.

    php artisan october:update

<a name="console-up-command"></a>
### Database Migration

The `october:migrate` command will perform a database migration, creating database tables and executing seed scripts, provided by the system and [plugin version history](../plugin/updates). The migration command can be run multiple times, it will only execute a migration or seed script once, which means only new changes are applied.

    php artisan october:migrate

The inverse command `october:down` will reverse all migrations, dropping database tables and deleting data. Care should be taken when using this command. The [plugin refresh command](#plugin-refresh-command) is a useful alternative for debugging a single plugin.

    php artisan october:down

<a name="change-backend-user-password-command"></a>
### Change Backend User Password

The `october:passwd` command allows the password of a backend administrator to be changed via the command line. This is useful if you are locked out of your October CMS install, or for changing the password for the default administrator account.

    php artisan october:passwd username password

For the first argument you may pass either the login name or email address. For the second argument you may optionally pass the desired password, otherwise you will be prompted to enter one.

<a name="project-commands"></a>
## Project Management

October CMS includes these commands for managing your project.

<a name="project-sync-command"></a>
### Synchronize Project

`project:sync` installs all plugins and themes belonging to a project.

    php artisan project:sync

<a name="project-set-command"></a>
### Set Project

`project:set` sets the project ID on the current installation.

    php artisan project:set <project identifier>

<a name="plugin-commands"></a>
## Plugin Management

October CMS includes a number of commands for managing plugins.

<a name="plugin-install-command"></a>
### Install Plugin

`plugin:install` - downloads and installs the plugin by its name. The next example will install a plugin called **AuthorName.PluginName**.

    php artisan plugin:install AuthorName.PluginName

Note that your installation should be bound to a project in order to use this command. You can create projects on October CMS website, in the [Account / Projects](https://octobercms.com/account/project/dashboard) section.

<a name="plugin-refresh-command"></a>
### Refresh Plugin

`plugin:refresh` - destroys the plugin's database tables and recreates them. This command is useful for development.

    php artisan plugin:refresh AuthorName.PluginName

<a name="plugin-rollback-command"></a>
### Rollback Plugin

`plugin:rollback` - Rollback the specified plugin's migrations. The second parameter is optional, if specified the rollback process will stop at the specified version.

    php artisan plugin:rollback AuthorName.PluginName 1.2.3

<a name="plugin-list-command"></a>
### List Plugins

`plugin:list` - Displays a list of installed plugins and their version numbers.

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
### Remove Plugin

`plugin:remove` - destroys the plugin's database tables and deletes the plugin files from the filesystem.

    php artisan plugin:remove AuthorName.PluginName

<a name="theme-commands"></a>
## Theme Management

October includes a number of commands for managing themes.

<a name="theme-install-command"></a>
### Install Theme

`theme:install` - download and install a theme from the [Marketplace](https://octobercms.com/themes/). The following example will install the theme in `/themes/authorname-themename`

    php artisan theme:install AuthorName.ThemeName

If you wish to install the theme in a custom directory, simply provide the second argument. The following example will download `AuthorName.ThemeName` and install it in `/themes/my-theme`

    php artisan theme:install AuthorName.ThemeName my-theme

<a name="theme-list-command"></a>
### List Themes

`theme:list` - list installed themes. Use the **-m** option to include popular themes in the Marketplace.

    php artisan theme:list

<a name="theme-use-command"></a>
### Enable Theme

`theme:use` - switch the active theme. The following example will switch to the theme in `/themes/rainlab-vanilla`

    php artisan theme:use rainlab-vanilla

<a name="theme-remove-command"></a>
### Remove Theme

`theme:remove` - delete a theme. The following example will delete the directory `/themes/rainlab-vanilla`

    php artisan theme:remove rainlab-vanilla

<!--
<a name="theme-sync-command"></a>
### Sync Theme

`theme:sync` - Sync a theme's content between the filesystem and database when `cms.databaseTemplates` is enabled.

    php artisan theme:sync

By default the theme that will be synced is the currently active one. You can specify any theme to sync by passing the desired theme's code:

    php artisan theme:sync my-custom-theme

By default the sync direction will be from the database to the filesytem (i.e. you're syncing changes on a remote host to the filesystem for tracking in a version control system). However, you can change the direction of the sync by specifying `--target=database`. This is useful if you have changed the underlying files that make up the theme and you want to force the site to pick up your changes even if they have made changes of their own that are stored in the database.

    php artisan theme:sync --target=database

By default the command requires user interaction to confirm that they want to complete the sync (including information about the amount of paths affected, the theme targeted, and the target & source of the sync). To override the need for user interaction (i.e. if running this command in a deploy / build script of some sort) just pass the `--force` option:

    php artisan theme:sync --force

Unless otherwise specified, the command will sync all the valid paths (determined by the Halcyon model instances returned to the `system.console.theme.sync.getAvailableModelClasses` event) available in the theme. To manually specify specific paths to be synced pass a comma separated list of paths to the `--paths` option:

php artisan theme:sync --paths=partials/header.htm,content/contact.md

-->

<a name="utility-commands"></a>
## Utilities

October CMS includes a number of utility commands.

<a name="cache-clear-command"></a>
### Clear Application Cache

`cache:clear` - clears the application, twig and combiner cache directories. Example:

    php artisan cache:clear

<a name="october-fresh-command"></a>
### Remove Demo Data

`october:fresh` - removes the demo theme and plugin that ships with October CMS.

    php artisan october:fresh

<a name="cache-clear-command"></a>
### Mirror Public Directory

`october:mirror` - creates a mirrored copy of the public files needed to serve the application, using symbolic linking. This command is used when [setting up a public folder](../setup/configuration#public-folder).

    php artisan october:mirror public

By default the symlinks created will be absolute symlinks, to create them as relative symlinks instead include the `--relative` option.

    php artisan october:mirror public --relative

<a name="october-util-command"></a>
### Miscellaneous Commands

`october:util` - a generic command to perform general utility tasks, such as cleaning up files or combining files. The arguments passed to this command will determine the task used.

#### Compile Assets

Outputs combined system files for JavaScript (js), StyleSheets (less), client side language (lang), or everything (assets).

    php artisan october:util compile assets
    php artisan october:util compile lang
    php artisan october:util compile js
    php artisan october:util compile less

To combine without minification, pass the `--debug` option.

    php artisan october:util compile js --debug

#### Pull All Repos

This will execute the command `git pull` on all theme and plugin directories.

    php artisan october:util git pull

#### Purge Thumbnails

Deletes all generated thumbnails in the uploads directory.

    php artisan october:util purge thumbs
