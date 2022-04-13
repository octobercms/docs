# Installing Packages

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

    php artisan theme:use vanilla

### Remove Theme

`theme:remove` - delete a theme. The following example will delete the directory `/themes/rainlab-vanilla`

    php artisan theme:remove vanilla

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
