---
previousPath: resources/installing-packages.md
subtitle: Install, manage and remove plugins and themes from the command line.
---
# Installing Plugins & Themes

You install plugins and themes from the [Marketplace](https://octobercms.com/plugins) or a Git repository with Artisan commands. This command installs a plugin called **AuthorName.PluginName**.

```bash
php artisan plugin:install AuthorName.PluginName
```

The [Console Commands](./console-commands.md) reference lists every command on this page with its options.

## Installing a Plugin

The `plugin:install` command downloads and installs a plugin by its name. Use the `--want` option to install a specific plugin version.

```bash
php artisan plugin:install AuthorName.PluginName --want=1.0
```

### Installing a Plugin from Git

Install a plugin from a remote source with the `--from` option.

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

## Installing a Theme

The `theme:install` command downloads and installs a theme from the [Marketplace](https://octobercms.com/themes/). This example installs the theme in `/themes/authorname-themename`.

```bash
php artisan theme:install AuthorName.ThemeName
```

### Installing a Theme from Git

Install a theme from a remote source with the `--from` option.

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

## Installing Everything in a Project

The `project:sync` command installs all plugins and themes that belong to your project.

```bash
php artisan project:sync
```

<a id="oc-set-project"></a>
### Setting the License Key

The `project:set` command sets the license key for the current installation.

```bash
php artisan project:set <license key>
```

## Managing Plugins

### Listing Plugins

The `plugin:list` command displays the installed plugins and their version numbers.

```bash
php artisan plugin:list
```

### Disabling and Enabling a Plugin

The `plugin:disable` command disables an existing plugin.

```bash
php artisan plugin:disable AuthorName.PluginName
```

The `plugin:enable` command enables a disabled plugin.

```bash
php artisan plugin:enable AuthorName.PluginName
```

### Checking Plugin Dependencies

The `plugin:check` command checks the dependencies of every installed theme and plugin. If it finds any missing requirements, it tries to install them.

```bash
php artisan plugin:check
```

### Rebuilding Plugin Database Tables

The `plugin:refresh` command destroys a plugin's database tables and recreates them. This is useful during development.

```bash
php artisan plugin:refresh AuthorName.PluginName
```

Use the `--rollback` option to destroy the database tables without recreating them.

```bash
php artisan plugin:refresh AuthorName.PluginName --rollback
```

You can also give the `--rollback` option a version number to stop at that version.

```bash
php artisan plugin:refresh AuthorName.PluginName --rollback=1.0.3
```

### Removing a Plugin

The `plugin:remove` command destroys a plugin's database tables and deletes the plugin files from the filesystem.

```bash
php artisan plugin:remove AuthorName.PluginName
```

## Managing Themes

### Listing Themes

The `theme:list` command lists the installed themes.

```bash
php artisan theme:list
```

### Switching the Active Theme

The `theme:use` command switches the active theme. This example switches to the theme in `/themes/rainlab-vanilla`.

```bash
php artisan theme:use rainlab-vanilla
```

### Protecting Themes Installed with Composer

The `theme:check` command checks every theme to see whether it should be flagged as read-only and protected from changes. If a theme was installed with Composer, the command adds a [theme lock file](../themes/child-themes.md) and creates a child theme.

```bash
php artisan theme:check
```

### Copying a Theme

The `theme:copy` command duplicates an existing theme to create a new one, and can also create child themes.

```bash
php artisan theme:copy <source-theme> [destination-theme]
```

### Removing a Theme

The `theme:remove` command deletes a theme. This example deletes the directory `/themes/rainlab-vanilla`.

```bash
php artisan theme:remove rainlab-vanilla
```

#### See Also

::: also
* [Console Commands](./console-commands.md)
* [Development Workflow](./development-workflow.md)
* [Child Themes](../themes/child-themes.md)
:::
