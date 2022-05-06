---
subtitle: Learn how to install and manage plugins and themes.
---
# Installing Plugins & Themes

## Project Management

October CMS includes these commands for managing your project.

### Synchronize Project

`project:sync` installs all plugins and themes belonging to a project.

```bash
php artisan project:sync
```

<a id="oc-set-project"></a>
### Set Project

`project:set` sets the license key for the current installation.

```bash
php artisan project:set <license key>
```

## Plugin Management

October CMS includes a number of commands for managing plugins.

### Install Plugin

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

### Check Dependencies

`plugin:check` - performs a system wide check of installed plugin dependencies. This command will spin over every theme and plugin that is currently installed and check to see if its dependencies are also installed. If it finds any missing requirements, it will attempt to install them.

```bash
php artisan plugin:check
```

<a id="oc-refresh-plugin"></a>
### Refresh Plugin

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

### List Plugins

`plugin:list` - Displays a list of installed plugins and their version numbers.

```bash
php artisan plugin:list
```

### Disable Plugin

`plugin:disable` - Disable an existing plugin.

```bash
php artisan plugin:disable AuthorName.PluginName
```

### Enable Plugin

`plugin:enable` - Enable a disabled plugin.

```bash
php artisan plugin:enable AuthorName.PluginName
```

### Remove Plugin

`plugin:remove` - destroys the plugin's database tables and deletes the plugin files from the filesystem.

```bash
php artisan plugin:remove AuthorName.PluginName
```

## Theme Management

October includes a number of commands for managing themes.

### Install Theme

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
php artisan theme:install AuthorName.ThemeName --from=git@github.com:authorname/themename-theme.git --want=dev-develop
```

Use the `--oc` option if your package name has the `oc` prefix.

```bash
php artisan theme:install AuthorName.ThemeName --from=git@github.com:authorname/oc-themename-theme.git --oc
```

### Check Protected

`theme:check` - performs a system wide check of themes to see if they should be flagged read-only and protected from changes. This command will spin over every theme and check if it has been installed with composer, if so, a [theme lock file](../cms/themes/child-themes.md) is added and a child theme is created.

```bash
php artisan theme:check
```

### List Themes

`theme:list` - list installed themes.

```bash
php artisan theme:list
```

### Enable Theme

`theme:use` - switch the active theme. The following example will switch to the theme in `/themes/rainlab-vanilla`

```bash
php artisan theme:use rainlab-vanilla
```

### Remove Theme

`theme:remove` - delete a theme. The following example will delete the directory `/themes/rainlab-vanilla`

```bash
php artisan theme:remove rainlab-vanilla
```

### Copy Theme

`theme:copy` - duplicates an existing theme to create a new one, including the creation of child themes.

```bash
php artisan theme:copy <source-theme> [destination-theme]
```
