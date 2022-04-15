# Models

October CMS provides a beautiful and simple Active Record implementation for working with your database, based on [Eloquent by Laravel](http://laravel.com/docs/eloquent). Each database table has a corresponding "Model" which is used to interact with that table. Models allow you to query for data in your tables, as well as insert new records into the table.

Model classes reside in the **models** subdirectory of a plugin directory. An example of a model directory structure:

::: dir
├── plugins
|   └── acme
|       └── blog
|           ├── `models`
|           |   ├── post             _<== Config Directory_
|           |   |   ├── fields.yaml  _<== Config File_
|           |   |   └── columns.yaml _<== Config File_
|           |   └── Post.php         _<== Model Class_
|           └── Plugin.php
:::

The model configuration directory could contain the model's [form field and list column definitions](../../element/definitions.md). The model configuration directory name matches the model class name written in lowercase.

## Defining Models

In most cases, you should create one model class for each database table. All model classes must extend the `Model` class. The most basic representation of a model used inside a Plugin looks like this:

```php
namespace Acme\Blog\Models;

use Model;

class Post extends Model
{
    /**
     * @var string table associated with the model.
     */
    protected $table = 'acme_blog_posts';
}
```

The `$table` protected field specifies the database table corresponding the model. The table name is a snake case name of the author, plugin and pluralized record type name.

<a id="oc-supported-properties"></a>
### Supported Properties

There are some standard properties that can be found on models, in addition to those provided by [model traits](traits.md). For example:

```php
class User extends Model
{
    protected $primaryKey = 'id';

    public $exists = false;

    protected $dates = ['last_seen_at'];

    public $timestamps = true;

    protected $jsonable = ['permissions'];

    protected $guarded = ['*'];
}
```

Property | Description
------------- | -------------
**$primaryKey** | primary key name used to identify the model.
**$incrementing** | boolean that if false indicates that the primary key is not an incrementing integer value.
**$exists** | boolean that if true indicates that the model exists.
**$dates** | values are converted to an instance of Carbon/DateTime objects after fetching.
**$timestamps** | boolean that if true will automatically set created_at and updated_at fields.
**$jsonable** | values are encoded as JSON before saving and converted to arrays after fetching.
**$fillable** | values are fields accessible to [mass assignment](#oc-mass-assignment).
**$guarded** | values are fields guarded from [mass assignment](#oc-mass-assignment).
**$visible** | values are fields made visible when [serializing the model data](../database/serialization.md).
**$hidden** | values are fields made hidden when [serializing the model data](../database/serialization.md).
**$connection** | string that contains the [connection name](../database/basics.md#oc-multiple-database-connections) that's utilised by the model by default.

#### Primary key

Models will assume that each table has a primary key column named `id`. You may define a `$primaryKey` property to override this convention.

```php
class Post extends Model
{
    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'id';
}
```

#### Incrementing

Models will assume that the primary key is an incrementing integer value, which means that by default the primary key will be cast to an integer automatically. If you wish to use a non-incrementing or a non-numeric primary key you must set the public `$incrementing` property to false.

```php
class Message extends Model
{
    /**
     * The primary key for the model is not an integer.
     *
     * @var bool
     */
    public $incrementing = false;
}
```

#### Timestamps

By default, a model will expect `created_at` and `updated_at` columns to exist on your tables. If you do not wish to have these columns managed automatically, set the `$timestamps` property on your model to `false`:

```php
class Post extends Model
{
    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;
}
```

If you need to customize the format of your timestamps, set the `$dateFormat` property on your model. This property determines how date attributes are stored in the database, as well as their format when the model is serialized to an array or JSON:

```php
class Post extends Model
{
    /**
     * The storage format of the model's date columns.
     *
     * @var string
     */
    protected $dateFormat = 'U';
}
```

#### Values stored as JSON

When attributes names are passed to the `$jsonable` property, the values will be serialized and deserialized from the database as JSON:

```php
class Post extends Model
{
    /**
     * @var array Attribute names to encode and decode using JSON.
     */
    protected $jsonable = ['data'];
}
```

## Version History

It is good practice for plugins to maintain a change log that documents any changes or improvements in the code. In addition to writing notes about changes, this process has the useful ability to execute [migration and seed files](../database/structure.md) in their correct order.

The change log is stored in a YAML file called `version.yaml` inside the **updates** directory of a plugin, which co-exists with migration and seed files. This example displays a typical plugin updates directory structure:

::: dir
├── plugins
|   └── author
|       └── myplugin
|           ├── `updates`
|           |   ├── `version.yaml`     _<== Version File_
|           |   ├── create_tables.php _<== Database Script_
|           |   ├── seed_the_database.php
|           |   └── create_another_table.php
|           └── Plugin.php
:::

### Plugin Dependencies

Updates are applied in a specific order, based on the [defined dependencies in the plugin registration file](../plugin/registration.md#oc-dependency-definitions). Plugins that are dependant will not be updated until all their dependencies have been updated first.

```php
<?php namespace Acme\Blog;

class Plugin extends \System\Classes\PluginBase
{
    public $require = ['Acme.User'];
}
```

In the example above the **Acme.Blog** plugin will not be updated until the **Acme.User** plugin has been fully updated.

## Plugin Version File

The **version.yaml** file, called the *Plugin Version File*, contains the version comments and refers to database scripts in the correct order. Please read the [Database structure](../database/structure.md) article for information about the migration files. This file is required if you're going to submit the plugin to the [Marketplace](https://octobercms.com/help/site/marketplace). Here is an example of a plugin version file:

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

> **Note**: The `version.yaml` file should always use the first line for a text update that describes the changes and the remaining lines for update scripts. For more verbose updates, consider using a dedicated changelog file.

As you can see above, there should be a key that represents the version number followed by the update message, which is either a string or an array containing update messages. For updates that refer to migration or seeding files, lines that are script file names can be placed in any position. An example of a comment with no associated update files.

```yaml
v1.0.1: A single comment that uses no update scripts.
```

<a id="oc-important-updates"></a>
### Important Updates

Sometimes a plugin needs to introduce features that will break websites already using the plugin. To prevent the changes from being deployed automatically, you should increase the **major** segment of the version string (`major.minor.patch`). An example of an important update comment is below.

```yaml
v2.1.0: This is an important update from v1 that contains breaking changes.
```

When tagging the new version `v2` from a version `v1` then the changes are not deployed as part of a regular update. The user must install the plugin again to receive the latest version via Composer.

<a id="oc-migration-files"></a>
### Migration and Seed Files

As previously described, updates also define when [migration and seed files](../database/structure.md) should be applied. An update line with a comment and updates:

```yaml
v1.1.1:
    - This update will execute the two scripts below.
    - some_upgrade_file.php
    - some_seeding_file.php
```

The update file name should use *snake_case* while the containing PHP class should use *CamelCase*. For a file named **some_upgrade_file.php** the corresponding class would be `SomeUpgradeFile`.

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
