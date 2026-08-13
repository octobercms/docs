# Available Commands

October CMS includes several command-line interface (CLI) commands and utilities that allow you to manage various aspects of the platform, as well as speed up the development process. The console commands are based on Laravel's [Artisan](http://laravel.com/docs/artisan) tool. You may [develop your own console commands](../extend/console-commands.md) using plugins.

## Setup & Maintenance

### Command - `october:update`

The `october:update` command updates the platform. It will update the core application and plugin files, then perform a database migration.

```bash
php artisan october:update
```

This is the same as running the following commands.

```bash
composer update
php artisan october:migrate
```

### Command - `october:migrate`

The `october:migrate` command will perform a database migration, creating database tables and executing seed scripts, provided by the system and [plugin version history](../extend/system/plugins.md). The migration command can be run multiple times, it will only execute a migration or seed script once, which means only new changes are applied.

```bash
php artisan october:migrate
```

::: tip
This command does not migrate Tailor blueprints. Use the `tailor:migrate` command to [migrate blueprint changes](../cms/tailor/introduction.md#oc-migrating-blueprints).
:::

The `--rollback` option will reverse all migrations, dropping database tables and deleting data. Care should be taken when using this command. The `plugin:refresh` command is a useful alternative for debugging a single plugin.

```bash
php artisan october:migrate --rollback
```

The `--skip-errors` flag can be used to suppress any errors and force the migration path to complete. Care should be taken with this flag since some errors are necessary to ensure data integrity.

```bash
php artisan october:migrate --skip-errors
```

### Command - `october:passwd`

The `october:passwd` command allows the password of a backend administrator to be changed via the command line. This is useful if you are locked out of your October CMS install, or for changing the password for the default administrator account.

```bash
php artisan october:passwd username password
```

For the first argument you may pass either the login name or email address. For the second argument you may optionally pass the desired password, otherwise you will be prompted to enter one.

### Command - `october:optimize`

The `october:optimize` will cache the framework and platform files for performance.

```bash
php artisan october:optimize
```

## Project Management

### Command - `project:sync`

`project:sync` installs all plugins and themes belonging to a project.

```bash
php artisan project:sync
```

### Command - `project:set`

`project:set` sets the license key for the current installation.

```bash
php artisan project:set <license key>
```

## Plugin Management

### Command - `plugin:install`

`plugin:install` - downloads and installs the plugin by its name. The next example will install a plugin called **AuthorName.PluginName**.

```bash
php artisan plugin:install AuthorName.PluginName
```

You may install a plugin from a remote source using the `--from` option.

```bash
php artisan plugin:install AuthorName.PluginName --from=git@github.com:authorname/pluginname-plugin.git
```

Use the `--want` option to specify a target branch or version.

```bash
php artisan plugin:install AuthorName.PluginName --from=git@github.com:authorname/pluginname-plugin.git --want=dev-develop
```

Use the `--oc` option if your package name has the `oc` prefix.

```bash
php artisan plugin:install AuthorName.PluginName --from=git@github.com:authorname/pluginname-plugin.git --oc
```

### Command - `plugin:check`

`plugin:check` - performs a system wide check of installed plugin dependencies. This command will spin over every theme and plugin that is currently installed and check to see if its dependencies are also installed. If it finds any missing requirements, it will attempt to install them.

```bash
php artisan plugin:check
```

### Command - `plugin:refresh`

`plugin:refresh` - destroys the plugin's database tables and recreates them. This command is useful for development.

```bash
php artisan plugin:refresh AuthorName.PluginName
```

Use the `--rollback` option to only destroy the database tables without recreating them.

```bash
php artisan plugin:refresh AuthorName.PluginName --rollback
```

You may also specify a version number with the `--rollback` option to stop at a specified version.

```bash
php artisan plugin:refresh AuthorName.PluginName --rollback=1.0.3
```

### Command - `plugin:list`

`plugin:list` - Displays a list of installed plugins and their version numbers.

```bash
php artisan plugin:list
```

### Command - `plugin:disable`

`plugin:disable` - Disable an existing plugin.

```bash
php artisan plugin:disable AuthorName.PluginName
```

### Command - `plugin:enable`

`plugin:enable` - Enable a disabled plugin.

```bash
php artisan plugin:enable AuthorName.PluginName
```

### Command - `plugin:remove`

`plugin:remove` - destroys the plugin's database tables and deletes the plugin files from the filesystem.

```bash
php artisan plugin:remove AuthorName.PluginName
```

## Theme Management

### Command - `theme:install`

`theme:install` - download and install a theme from the [Marketplace](https://octobercms.com/themes/). The following example will install the theme in `/themes/authorname-themename`

```bash
php artisan theme:install AuthorName.ThemeName
```

You may install a theme from a remote source using the `--from` option.

```bash
php artisan theme:install AuthorName.ThemeName --from=git@github.com:authorname/themename-theme.git
```

Use the `--want` option to specify a target branch or version.

```bash
php artisan theme:install AuthorName.ThemeName --from=git@github.com:authorname/themename-theme.git
```--want=dev-develop

Use the `--oc` option if your package name has the `oc` prefix.

```bash
php artisan theme:install AuthorName.ThemeName --from=git@github.com:authorname/oc-themename-theme.git --oc
```

### Command - `theme:check`

`theme:check` - performs a system wide check of themes to see if they should be flagged read-only and protected from changes. This command will spin over every theme and check if it has been installed with composer, if so, a [theme lock file](../cms/themes.md#oc-child-themes) is added and a child theme is created.

```bash
php artisan theme:check
```

### Command - `theme:list`

`theme:list` - list installed themes.

```bash
php artisan theme:list
```

### Command - `theme:use`

`theme:use` - switch the active theme. The following example will switch to the theme in `/themes/rainlab-vanilla`

```bash
php artisan theme:use rainlab-vanilla
```

### Command - `theme:remove`

`theme:remove` - delete a theme. The following example will delete the directory `/themes/rainlab-vanilla`

```bash
php artisan theme:remove rainlab-vanilla
```

### Command - `theme:copy`

`theme:copy` - duplicates an existing theme to create a new one, including the creation of child themes.

```bash
php artisan theme:copy <source-theme> [destination-theme]
```

The following command creates a new theme called `demo-copy` from the source theme `demo` by copying the directory and its contents. The `.themelock` file will be removed during this process.

```bash
php artisan theme:copy demo demo-copy
```

To create a child theme that inherits the parent theme, specify the `--child` option.

```bash
php artisan theme:copy demo demo-child --child
```

If using [database-driven themes](../cms/themes.md#oc-database-driven-themes), you may sync the database changes to the filesystem with the `--import-db` option.

```bash
php artisan theme:copy demo --import-db
```

To delete all the database templates at the same time, use the `--purge-db` option.

```bash
php artisan theme:copy demo --import-db --purge-db
```

## Scaffolding

The scaffolding commands generate the boilerplate files for common October CMS objects. Unless noted otherwise, the first argument is the plugin namespace (eg: `Acme.Blog`), and most commands accept the `--overwrite` (or `-o`) option to replace existing files.

### Command - `create:plugin`

The `create:plugin` command generates the files and directories for a new [plugin](../extend/system/plugins.md). The argument specifies the author and plugin name.

```bash
php artisan create:plugin Acme.Blog
```

### Command - `create:theme`

The `create:theme` command generates a new [theme](../cms/themes/themes.md) directory with a starter layout, home page and configuration files. The argument specifies the theme name.

```bash
php artisan create:theme "My Theme"
```

### Command - `create:model`

The `create:model` command generates the files for a new [model](../extend/system/models.md). The second argument specifies the model name.

```bash
php artisan create:model Acme.Blog Post
```

Use the `--soft-deletes` option to implement soft deletion, and the `--no-timestamps` option to disable automatic timestamps.

### Command - `create:migration`

The `create:migration` command generates a new [migration](../extend/database/structure.md) file. The second argument specifies the migration name.

```bash
php artisan create:migration Acme.Blog AddStatusColumn
```

Use the `--create` option to name a table to be created, or the `--table` option to name a table to be modified.

### Command - `create:controller`

The `create:controller` command generates the files for a new backend [controller](../extend/system/controllers.md). The second argument specifies the controller name.

```bash
php artisan create:controller Acme.Blog Posts
```

Use the `--model` option to define which model name to use, and the `--design` option to specify a design (`basic`, `sidebar`, `survey`, `popup`, `custom`).

### Command - `create:component`

The `create:component` command generates a new plugin [component](../extend/cms-components.md). The second argument specifies the component class name.

```bash
php artisan create:component Acme.Blog BlogPosts
```

### Command - `create:formwidget`

The `create:formwidget` command generates a new [form widget](../extend/forms/form-widgets.md). The second argument specifies the form widget name.

```bash
php artisan create:formwidget Acme.Blog PostList
```

### Command - `create:filterwidget`

The `create:filterwidget` command generates a new [filter widget](../extend/lists/filters.md). The second argument specifies the filter widget name.

```bash
php artisan create:filterwidget Acme.Blog HasDiscount
```

### Command - `create:reportwidget`

The `create:reportwidget` command generates a new [report widget](../extend/dashboards/report-widgets.md). The second argument specifies the report widget name.

```bash
php artisan create:reportwidget Acme.Blog TopPages
```

### Command - `create:contentfield`

The `create:contentfield` command generates a new [Tailor content field](../extend/tailor-fields.md). The second argument specifies the content field name.

```bash
php artisan create:contentfield Acme.Blog IconPicker
```

### Command - `create:command`

The `create:command` command generates a new [console command](../extend/console-commands.md). The second argument specifies the command class name.

```bash
php artisan create:command Acme.Blog ProcessJobs
```

### Command - `create:job`

The `create:job` command generates a new [queue job](../extend/services/queue.md) class. The second argument specifies the job class name.

```bash
php artisan create:job Acme.Blog ImportPosts
```

Use the `--sync` option to indicate that the job should be synchronous.

### Command - `create:factory`

The `create:factory` command generates a new model factory class. The second argument specifies the factory class name.

```bash
php artisan create:factory Acme.Blog PostFactory
```

### Command - `create:seeder`

The `create:seeder` command generates a new database seeder class. The second argument specifies the seeder class name.

```bash
php artisan create:seeder Acme.Blog PostSeeder
```

### Command - `create:test`

The `create:test` command generates a new [test](../extend/system/unit-testing.md) class. The second argument specifies the test class name, which must end in `Test`.

```bash
php artisan create:test Acme.Blog UserTest
```

## Utilities

### Command - `cache:clear`

`cache:clear` - clears the application, twig and combiner cache directories. Example:

```bash
php artisan cache:clear
```

### Command - `october:fresh`

`october:fresh` - removes the demo theme and plugin that ships with October CMS.

```bash
php artisan october:fresh
```

### Command - `october:mirror`

`october:mirror` - will mirror all asset and resource files to the [public folder](../setup/deployment.md#oc-public-folder) using symbolic linking.

```bash
php artisan october:mirror
```

### Command - `october:util`

`october:util` - a generic command to perform general utility tasks, such as cleaning up files or combining files. The arguments passed to this command will determine the task used.

#### Compile Assets

Outputs combined system files for JavaScript (js), StyleSheets (less), client side language (lang), or everything (assets).

```bash
php artisan october:util compile assets
php artisan october:util compile lang
php artisan october:util compile js
php artisan october:util compile less
```

To combine without minification, pass the `--debug` option.

```bash
php artisan october:util compile js --debug
```

#### Pull All Repos

This will execute the command `git pull` on all theme and plugin directories.

```bash
php artisan october:util git pull
```

#### Purge Thumbnails

Deletes all generated thumbnails in the uploads directory.

```bash
php artisan october:util purge thumbs
```

#### Purge Uploads

Deletes files in the uploads directory that do not exist in the `system_files` table.

```bash
php artisan october:util purge uploads
```

#### Purge Orphans

Deletes records in `system_files` table that do not belong to any other model.

```bash
php artisan october:util purge orphans
```

#### See Also

::: also
* [Creating Console Commands](../extend/console-commands.md)
:::
