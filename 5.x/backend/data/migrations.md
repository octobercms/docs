---
previousPath: extend/database/structure.md
subtitle: Create and change database tables with migrations, and fill them with data using seeders.
---
# Migrations & Seeding

Migrations build and change your plugin's database tables, and seeders fill them with data. Both live in the plugin's **updates** directory and run in order from the plugin's [version history](../plugins/versions.md), so the database can be built up and torn down step by step.

```php
use October\Rain\Database\Schema\Blueprint;
use October\Rain\Database\Updates\Migration;

return new class extends Migration
{
    public function up()
    {
        Schema::create('acme_blog_posts', function(Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->string('slug')->index();
            $table->text('excerpt')->nullable();
            $table->text('content');
            $table->timestamp('published_at')->nullable();
            $table->boolean('is_published')->default(false);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('acme_blog_posts');
    }
};
```

## Creating a Migration

Generate a migration file with the `create:migration` command. The first argument is the plugin code, and the second argument is the migration name.

```bash
php artisan create:migration Acme.Blog CreatePostsTable
```

The command creates the file in the plugin's **updates** directory. Add the file name to a version in the plugin's **version.yaml** file so it runs when the plugin updates.

```yaml
v1.0.2:
    - Create the posts table
    - create_posts_table.php
```

A migration class extends `October\Rain\Database\Updates\Migration` and contains two methods.

- The `up` method adds new tables, columns or indexes to your database.
- The `down` method reverses the operations performed by the `up` method.

Inside both methods, use the schema builder to create and modify tables, as shown in the example above.

## Creating Tables

To create a new database table, call the `create` method on the `Schema` facade. The first argument is the table name, and the second is a `Closure` that receives an object used to define the table. You can use any of the [column types](#available-column-types) below.

```php
Schema::create('users', function ($table) {
    $table->increments('id');
});
```

To check whether a table or column exists, use the `hasTable` and `hasColumn` methods.

```php
if (Schema::hasTable('users')) {
    //
}

if (Schema::hasColumn('users', 'email')) {
    //
}
```

### Using Another Connection or Storage Engine

To run a schema operation on a database connection that is not your default connection, use the `connection` method.

```php
Schema::connection('foo')->create('users', function ($table) {
    $table->increments('id');
});
```

To set the storage engine for a table, set the `engine` property on the schema builder.

```php
Schema::create('users', function ($table) {
    $table->engine = 'InnoDB';
    $table->increments('id');
});
```

## Renaming and Dropping Tables

To rename an existing database table, use the `rename` method.

```php
Schema::rename($from, $to);
```

To drop an existing table, use the `drop` or `dropIfExists` methods.

```php
Schema::drop('users');

Schema::dropIfExists('users');
```

## Adding Columns

To update an existing table, use the `table` method on the `Schema` facade. Like the `create` method, it takes the table name and a `Closure` that receives an object used to add columns.

```php
Schema::table('users', function ($table) {
    $table->string('email');
});
```

### Available Column Types

The schema builder provides the following column types.

Command  | Description
------------- | -------------
`$table->bigIncrements('id');`  |  Incrementing ID (primary key) using a "UNSIGNED BIG INTEGER" equivalent.
`$table->bigInteger('votes');`  |  BIGINT equivalent for the database.
`$table->binary('data');`  |  BLOB equivalent for the database.
`$table->boolean('confirmed');`  |  BOOLEAN equivalent for the database.
`$table->char('name', 4);`  |  CHAR equivalent with a length.
`$table->date('created_at');`  |  DATE equivalent for the database.
`$table->dateTime('created_at');`  |  DATETIME equivalent for the database.
`$table->decimal('amount', 5, 2);`  |  DECIMAL equivalent with a precision and scale.
`$table->double('amount');`  |  DOUBLE equivalent for the database.
`$table->enum('choices', ['foo', 'bar']);` | ENUM equivalent for the database.
`$table->float('amount');`  |  FLOAT equivalent for the database.
`$table->id();`  |  Alias of `bigIncrements('id')`.
`$table->increments('id');`  |  Incrementing ID (primary key) using a "UNSIGNED INTEGER" equivalent.
`$table->integer('votes');`  |  INTEGER equivalent for the database.
`$table->json('options');`  |  JSON equivalent for the database.
`$table->jsonb('options');`  |  JSONB equivalent for the database.
`$table->longText('description');`  |  LONGTEXT equivalent for the database.
`$table->mediumInteger('numbers');`  |  MEDIUMINT equivalent for the database.
`$table->mediumText('description');`  |  MEDIUMTEXT equivalent for the database.
`$table->morphs('taggable');`  |  Adds UNSIGNED BIGINT `taggable_id` and VARCHAR `taggable_type` columns with an index.
`$table->nullableTimestamps();`  |  Alias of `timestamps()`.
`$table->rememberToken();`  |  Adds `remember_token` as VARCHAR(100) NULL.
`$table->smallInteger('votes');`  |  SMALLINT equivalent for the database.
`$table->softDeletes();`  |  Adds `deleted_at` column for soft deletes.
`$table->string('email');`  |  VARCHAR equivalent column.
`$table->string('name', 100);`  |  VARCHAR equivalent with a length.
`$table->text('description');`  |  TEXT equivalent for the database.
`$table->time('sunrise');`  |  TIME equivalent for the database.
`$table->tinyInteger('numbers');`  |  TINYINT equivalent for the database.
`$table->timestamp('added_on');`  |  TIMESTAMP equivalent for the database.
`$table->timestamps();`  |  Adds nullable `created_at` and `updated_at` columns.

### Column Modifiers

Column modifiers change a column as you add it. For example, to make a column nullable, use the `nullable` method.

```php
Schema::table('users', function ($table) {
    $table->string('email')->nullable();
});
```

The following column modifiers are available. This list does not include the [index modifiers](#adding-indexes).

Modifier  | Description
------------- | -------------
`->nullable()`  |  Allow NULL values to be inserted into the column
`->default($value)`  |  Specify a "default" value for the column
`->unsigned()`  |  Set `integer` columns to `UNSIGNED`
`->first()`  |  Place the column "first" in the table (MySQL Only)
`->after('column')`  |  Place the column "after" another column (MySQL Only)
`->comment('my comment')`  |  Add a comment to a column (MySQL Only)

## Changing Columns

The `change` method changes an existing column's type or attributes. For example, this increases the size of the `name` column from 25 to 50.

```php
Schema::table('users', function ($table) {
    $table->string('name', 50)->change();
});
```

You can also make a column nullable.

```php
Schema::table('users', function ($table) {
    $table->string('name', 50)->nullable()->change();
});
```

::: tip
When you change a column, include every attribute the column should keep, such as `nullable` or `default`. Attributes left out of the definition are dropped.
:::

### Renaming Columns

To rename a column, use the `renameColumn` method.

```php
Schema::table('users', function ($table) {
    $table->renameColumn('from', 'to');
});
```

::: tip
Renaming columns in a table with an `enum` column is not currently supported.
:::

### Dropping Columns

To drop a column, use the `dropColumn` method.

```php
Schema::table('users', function ($table) {
    $table->dropColumn('votes');
});
```

To drop several columns at once, pass an array of column names to the `dropColumn` method.

```php
Schema::table('users', function ($table) {
    $table->dropColumn(['votes', 'avatar', 'location']);
});
```

## Adding Indexes

The schema builder supports several types of indexes. To make a column's values unique, chain the `unique` method onto the column definition.

```php
$table->string('email')->unique();
```

You can also create the index after defining the column.

```php
$table->unique('email');
```

Pass an array of columns to an index method to create a compound index.

```php
$table->index(['account_id', 'created_at']);
```

In most cases, pass a name for the index as the second argument. This stops the system from generating a name that is too long.

```php
$table->index(['account_id', 'created_at'], 'account_created');
```

### Available Index Types

Command  | Description
------------- | -------------
`$table->primary('id');`  |  Add a primary key.
`$table->primary(['first', 'last']);`  |  Add composite keys.
`$table->unique('email');`  |  Add a unique index.
`$table->index('state');`  |  Add a basic index.

### Renaming Indexes

To rename an index, use the `renameIndex` method. The first argument is the current index name, and the second is the new name.

```php
$table->renameIndex('from', 'to')
```

### Dropping Indexes

To drop an index, specify the index name. If you did not name the index, the system generated one by joining the table name, the indexed column name and the index type.

Command  | Description
------------- | -------------
`$table->dropPrimary('users_id_primary');`  |  Drop a primary key from the "users" table.
`$table->dropUnique('users_email_unique');`  |  Drop a unique index from the "users" table.
`$table->dropIndex('geo_state_index');`  |  Drop a basic index from the "geo" table.

## Adding Foreign Keys

Foreign key constraints enforce referential integrity at the database level. This example defines a `user_id` column on the `posts` table that references the `id` column on the `users` table.

```php
Schema::table('posts', function ($table) {
    $table->integer('user_id')->unsigned();

    $table->foreign('user_id')->references('id')->on('users');
});
```

To name the constraint, pass the name as the second argument to the `foreign` method.

```php
$table->foreign('user_id', 'user_foreign')
    ->references('id')
    ->on('users');
```

You can also set the action for the "on delete" and "on update" properties of the constraint.

```php
$table->foreign('user_id')
    ->references('id')
    ->on('users')
    ->onDelete('cascade');
```

To drop a foreign key, use the `dropForeign` method. Foreign keys use the same naming convention as indexes. If you did not name the constraint, the name is the table name and the constraint columns, followed by `_foreign`.

```php
$table->dropForeign('posts_user_id_foreign');
```

## Seeding Data

A seeder class extends the `Seeder` class and contains a `run` method. The `run` method is called when the update process runs the seeder. Inside it, insert data however you like, using the [query builder](./query-builder.md) or your [model classes](./model-queries.md). Add the seeder file name to the [version history](../plugins/versions.md) the same way as a migration.

```php
<?php namespace Acme\Users\Updates;

use Seeder;
use Acme\Users\Models\User;

class SeedUsersTable extends Seeder
{
    public function run()
    {
        $user = User::create([
            'email' => 'user@example.tld',
            'login' => 'user',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'first_name' => 'Actual',
            'last_name' => 'Person',
            'is_activated' => true
        ]);
    }
}
```

You can do the same with the `Db::table` [query builder](./query-builder.md) method.

```php
public function run()
{
    $user = Db::table('users')->insert([
        'email' => 'user@example.tld',
        'login' => 'user',
        // ...
    ]);
}
```

### Calling Additional Seeders

Within the `DatabaseSeeder` class, use the `call` method to run other seed classes. This lets you split seeding into several files so no single seeder class grows too large. Pass the name of the seeder class you want to run.

```php
public function run()
{
    $this->call(\Acme\Users\Updates\UserTableSeeder::class);
    $this->call(\Acme\Users\Updates\PostsTableSeeder::class);
    $this->call(\Acme\Users\Updates\CommentsTableSeeder::class);
}
```

#### See Also

::: also
* [Version History](../plugins/versions.md)
* [Defining Models](./models.md)
* [Query Builder](./query-builder.md)
:::
