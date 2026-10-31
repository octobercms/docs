---
previousPath: extend/system/plugins.md#version-history
subtitle: Record each plugin version in a version.yaml file and run migration and seed scripts when the plugin updates.
---
# Version History

The **version.yaml** file in a plugin's **updates** directory is the plugin's change log. Each entry describes a version, and it can name [migration and seed files](../data/migrations.md) that run in order when the plugin is installed or updated.

```yaml
v1.0.1: First version
v1.0.2:
    - Create the posts table
    - create_posts_table.php
```

The file sits in the **updates** directory alongside the migration and seed files it refers to.

::: dir
├── plugins
|   └── author
|       └── myplugin
|           ├── `updates`
|           |   ├── `version.yaml`  _← Version File_
|           |   ├── create_tables.php  _← Database Script_
|           |   ├── seed_the_database.php
|           |   └── create_another_table.php
|           └── Plugin.php
:::

The `create:plugin` command creates this file with a first version entry. The file is required if you plan to submit the plugin to the [Marketplace](https://octobercms.com/help/site/marketplace).

## Writing Version Entries

Each key is a version number, and its value is the update message. The value is either a string or an array. A version with only a comment uses a string.

```yaml
v1.0.1: A single comment that uses no update scripts.
```

A version that runs scripts uses an array of update messages and script file names. Lines that are script file names can be placed in any position.

```yaml
v1.0.1: First version
v1.0.2: Second version
v1.0.3:
    - Update with a migration and seed
    - create_tables.php
    - seed_the_database.php
v2.0.0: Important update
v2.0.1: Latest version
```

::: tip
Always use the first line for a text message that describes the changes, and the remaining lines for update scripts. For more verbose notes, consider using a dedicated changelog file.
:::

## Running Migrations and Seeds on Update

A version entry defines when [migration and seed files](../data/migrations.md) are applied. When the plugin updates to that version, the listed scripts run in the order they appear.

```yaml
v1.1.1:
    - This update will execute the two scripts below.
    - some_upgrade_file.php
    - some_seeding_file.php
```

Name the update file in *snake_case* and its PHP class in *CamelCase*. For a file named **some_upgrade_file.php**, the class is `SomeUpgradeFile`.

```php
<?php namespace Acme\Blog\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

/**
 * some_upgrade_file.php
 */
class SomeUpgradeFile extends Migration
{
    ///
}
```

A migration file may also return an anonymous class, as shown in the [Migrations & Seeding](../data/migrations.md) article. The `create:migration` command creates the file in the **updates** directory, and you then add its file name to a version entry.

To apply new versions, run the `october:migrate` command. It only runs scripts that have not run before. During development, the `plugin:refresh` command destroys a single plugin's database tables and recreates them.

```bash
php artisan october:migrate

php artisan plugin:refresh Acme.Blog
```

## Releasing Breaking Changes

When a new version would break websites already using the plugin, increase the **major** segment of the version string (`major.minor.patch`). This stops the change from being deployed automatically.

```yaml
v2.1.0: This is an important update from v1 that contains breaking changes.
```

When you tag a new version `v2` after version `v1`, the changes are not deployed as part of a regular update. The user must install the plugin again to receive the latest version through Composer.

## Controlling Update Order with Dependencies

Updates are applied in an order based on the dependencies defined in the plugin registration file. A plugin is not updated until all of its dependencies have been updated first.

```php
namespace Acme\Blog;

class Plugin extends \System\Classes\PluginBase
{
    public $require = ['Acme.User'];
}
```

In this example, the **Acme.Blog** plugin is not updated until the **Acme.User** plugin is fully updated. See [Requiring Other Plugins](./introduction.md#requiring-other-plugins) for more about dependencies.

#### See Also

::: also
* [Migrations & Seeding](../data/migrations.md)
* [Plugin Structure](./introduction.md)
* [Console Commands](../../setup/console-commands.md)
:::
