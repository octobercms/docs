# Command List

October CMS includes several command-line interface (CLI) commands and utilities that allow you to manage various aspects of the platform, as well as speed up the development process. The console commands are based on Laravel's [Artisan](http://laravel.com/docs/artisan) tool. You may [develop your own console commands](../console/development.md) or speed up development with the provided [scaffolding commands](../console/scaffolding.md).

## Setup & Maintenance

### System Update

The `october:update` command will request updates from the October gateway. It will update the core application and plugin files, then perform a database migration.

    php artisan october:update

<a id="oc-database-migration"></a>
### Database Migration

The `october:migrate` command will perform a database migration, creating database tables and executing seed scripts, provided by the system and [plugin version history](../plugin/updates.md). The migration command can be run multiple times, it will only execute a migration or seed script once, which means only new changes are applied.

    php artisan october:migrate

The `--rollback` option will reverse all migrations, dropping database tables and deleting data. Care should be taken when using this command. The [plugin refresh command](#oc-refresh-plugin) is a useful alternative for debugging a single plugin.

    php artisan october:migrate --rollback

### Change Backend User Password

The `october:passwd` command allows the password of a backend administrator to be changed via the command line. This is useful if you are locked out of your October CMS install, or for changing the password for the default administrator account.

    php artisan october:passwd username password

For the first argument you may pass either the login name or email address. For the second argument you may optionally pass the desired password, otherwise you will be prompted to enter one.

## Project Management

October CMS includes these commands for managing your project.

### Synchronize Project

`project:sync` installs all plugins and themes belonging to a project.

    php artisan project:sync

<a id="oc-set-project"></a>
### Set Project

`project:set` sets the license key for the current installation.

    php artisan project:set <license key>

## Plugin Management

October CMS includes a number of commands for managing plugins.

### Install Plugin

`plugin:install` - downloads and installs the plugin by its name. The next example will install a plugin called **AuthorName.PluginName**.

    php artisan plugin:install AuthorName.PluginName

You may install a plugin from a remote source using the `--from` option.

    php artisan plugin:install AuthorName.PluginName --from=git@github.com:authorname/pluginname-plugin.git

Use the `--want` option to specify a target branch or version.

    php artisan plugin:install AuthorName.PluginName --from=git@github.com:authorname/pluginname-plugin.git --want=dev-develop

Use the `--oc` option if your package name has the `oc` prefix.

    php artisan plugin:install AuthorName.PluginName --from=git@github.com:authorname/pluginname-plugin.git --oc

### Check Dependencies

`plugin:check` - performs a system wide check of installed plugin dependencies. This command will spin over every theme and plugin that is currently installed and check to see if its dependencies are also installed. If it finds any missing requirements, it will attempt to install them.

    php artisan plugin:check

<a id="oc-refresh-plugin"></a>
### Refresh Plugin

`plugin:refresh` - destroys the plugin's database tables and recreates them. This command is useful for development.

    php artisan plugin:refresh AuthorName.PluginName

Use the `--rollback` option to only destroy the database tables without recreating them.

    php artisan plugin:refresh AuthorName.PluginName --rollback

You may also specify a version number with the `--rollback` option to stop at a specified version.

    php artisan plugin:refresh AuthorName.PluginName --rollback=1.0.3

### List Plugins

`plugin:list` - Displays a list of installed plugins and their version numbers.

    php artisan plugin:list

### Disable Plugin

`plugin:disable` - Disable an existing plugin.

    php artisan plugin:disable AuthorName.PluginName

### Enable Plugin

`plugin:enable` - Enable a disabled plugin.

    php artisan plugin:enable AuthorName.PluginName

### Remove Plugin

`plugin:remove` - destroys the plugin's database tables and deletes the plugin files from the filesystem.

    php artisan plugin:remove AuthorName.PluginName

## Theme Management

October includes a number of commands for managing themes.

### Install Theme

`theme:install` - download and install a theme from the [Marketplace](https://octobercms.com/themes/). The following example will install the theme in `/themes/authorname-themename`

    php artisan theme:install AuthorName.ThemeName

You may install a theme from a remote source using the `--from` option.

    php artisan theme:install AuthorName.ThemeName --from=git@github.com:authorname/themename-theme.git

Use the `--want` option to specify a target branch or version.

    php artisan theme:install AuthorName.ThemeName --from=git@github.com:authorname/themename-theme.git --want=dev-develop

Use the `--oc` option if your package name has the `oc` prefix.

    php artisan theme:install AuthorName.ThemeName --from=git@github.com:authorname/oc-themename-theme.git --oc

### Check Protected

`theme:check` - performs a system wide check of themes to see if they should be flagged read-only and protected from changes. This command will spin over every theme and check if it has been installed with composer, if so, a [theme lock file](../cms/themes.md#oc-child-themes) is added and a child theme is created.

    php artisan theme:check

### List Themes

`theme:list` - list installed themes.

    php artisan theme:list

### Enable Theme

`theme:use` - switch the active theme. The following example will switch to the theme in `/themes/rainlab-vanilla`

    php artisan theme:use rainlab-vanilla

### Remove Theme

`theme:remove` - delete a theme. The following example will delete the directory `/themes/rainlab-vanilla`

    php artisan theme:remove rainlab-vanilla

### Copy Theme

`theme:copy` - duplicates an existing theme to create a new one, including the creation of child themes.

    php artisan theme:copy <source-theme> [destination-theme]

The following command creates a new theme called `demo-copy` from the source theme `demo` by copying the directory and its contents. The `.themelock` file will be removed during this process.

    php artisan theme:copy demo demo-copy

To create a child theme that inherits the parent theme, specify the `--child` option.

    php artisan theme:copy demo demo-child --child

If using [database-driven themes](../cms/themes#oc-database-driven-themes), you may sync the database changes to the filesystem with the `--import-db` option.

    php artisan theme:copy demo --import-db

To delete all the database templates at the same time, use the `--purge-db` option.

    php artisan theme:copy demo --import-db --purge-db

## Utilities

October CMS includes a number of utility commands.

### Clear Application Cache

`cache:clear` - clears the application, twig and combiner cache directories. Example:

    php artisan cache:clear

### Remove Demo Data

`october:fresh` - removes the demo theme and plugin that ships with October CMS.

    php artisan october:fresh

### Mirror Public Directory

`october:mirror` - will mirror all asset and resource files to the [public folder](../setup/deployment.md#oc-public-folder) using symbolic linking.

    php artisan october:mirror

If you want to specify a custom folder, you can pass it as the second argument, which is relative to the base directory.

    php artisan october:mirror mypublicfolder

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

#### Purge Uploads

Deletes files in the uploads directory that do not exist in the `system_files` table.

    php artisan october:util purge uploads

#### Purge Orphans

Deletes records in `system_files` table that do not belong to any other model.

    php artisan october:util purge orphans
