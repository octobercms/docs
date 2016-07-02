# Version history

- [Introduction](#introduction)
- [Update process](#update-process)
    - [Plugin depedencies](#plugin-depedencies)
- [Plugin version file](#version-file)
    - [Important updates](#important-updates)
    - [Migration and seed files](#migration-seed-files)

<a name="introduction"></a>
## Introduction

It is good practice for plugins to maintain a change log that documents any changes or improvements in the code. In addition to writing notes about changes, this process has the useful ability to execute [migration and seed files](../database/structure) in their correct order.

The change log is stored in a YAML file called `version.yaml` inside the **/updates** directory of a plugin, which co-exists with migration and seed files. This example displays a typical plugin updates directory structure:

    plugins/
      author/
        myplugin/
          updates/                      <=== Updates directory
            version.yaml                <=== Plugin version file
            create_tables.php           <=== Database scripts
            seed_the_database.php       <=== Migration file
            create_another_table.php    <=== Migration file

<a name="update-process"></a>
## Update process

During an update the system will notify the user about recent changes to plugins, it can also prompt them about [important or breaking changes](#important-updates). Any given migration or seed file will only be excuted once after a successful update. October executes the update process automatically when any of the following occurs:

1. When an administrator signs in to the back-end.
1. When the system is updated using the update feature in the back-end area.
1. When the [console command](../console/commands#console-up-command) `php artisan october:up` is called in the command line from the application directory.

> **Note:** The plugin [initialization process](../plugin/registration#routing-initialization) is disabled during the update process, this should be a consideration in migration and seeding scripts.

<a name="plugin-depedencies"></a>
### Plugin depedencies

Updates are applied in a specific order, based on the [defined dependencies in the plugin registration file](../plugin/registration#dependency-definitions). Plugins that are dependant will not be updated until all their dependencies have been updated first.

    <?php namespace Acme\Blog;

    class Plugin extends \System\Classes\PluginBase
    {
        public $require = ['Acme.User'];
    }

In the example above the **Acme.Blog** plugin will not be updated until the **Acme.User** plugin has been fully updated.

<a name="version-file"></a>
## Plugin version file

The **version.yaml** file, called the *Plugin version file*, contains the version comments and refers to database scripts in the correct order. Please read the [Database structure](../database/structure) article for information about the migration files. This file is required if you're going to submit the plugin to the [Marketplace](http://octobercms.com/help/site/marketplace). Here is an example of a plugin version file:

    1.0.1: First version
    1.0.2: Second version
    1.0.3: Third version
    1.1.0: !!! Important update
    1.1.1:
        - Update with a migration and seed
        - create_tables.php
        - seed_the_database.php

As you can see above, there should be a key that represents the version number followed by the update message, which is either a string or an array containing the update message. For updates that refer to migration or seeding files, the first line is always the comment, then subsequent lines are script file names. An example of a comment with no associated update files:

    1.0.1: A single comment that uses no update scripts.

<a name="important-updates"></a>
### Important updates

Sometimes a plugin needs to introduce features that will break websites already using the plugin. If an update comment in the **version.yaml** file begins with three exclamation marks (`!!!`) then it will be considered *Important* and will require the user to confirm before updating. An example of an important update comment:

    1.1.0: !!! This is an important update that contains breaking changes.

When the system detects an important update it will provide three options to proceed:

1. Confirm update
1. Skip this plugin (once only)
1. Skip this plugin (always)

Confirming the comment will update the plugin as usual, or if the comment is skipped it will not be updated.

<a name="migration-seed-files"></a>
### Migration and seed files

As previously decribed, updates also define when [migration and seed files](../database/structure) should be applied. An update line with a comment and updates:

    1.1.1:
        - This update will execute the two scripts below.
        - some_upgrade_file.php
        - some_seeding_file.php

The update file name should use *snake_case* while the containing PHP class should use *CamelCase*. For a file named **some_upgrade_file.php** the corresponding class would be `SomeUpgradeFile`.

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
