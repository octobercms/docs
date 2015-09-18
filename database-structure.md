# Database structure and seeding

- [Introduction](#introduction)
- [Migration structure](#migration-structure)
    - [Creating tables](#creating-tables)
    - [Renaming / dropping tables](#renaming-and-dropping-tables)
    - [Creating columns](#creating-columns)
    - [Modifying columns](#modifying-columns)
    - [Dropping columns](#dropping-columns)
    - [Creating indexes](#creating-indexes)
    - [Dropping indexes](#dropping-indexes)
    - [Foreign key constraints](#foreign-key-constraints)
- [Seeder structure](#seeder-structure)
    - [Calling additional seeders](#calling-additional-seeders)

<a name="introduction"></a>
## Introduction

Migrations and seed files allow you to build, modify and populate database tables. They are primarily used by a [plugin update file](../plugins/updates) and are paired with the version history of a plugin. All classes are stored in the `updates` directory of a plugin. Migrations should tell a story about your database history and this story can be played both forwards and backwards to build up and tear down the tables.

<a name="migration-structure"></a>
## Migration structure

A migration file should define a class that extends the `October\Rain\Database\Updates\Migration` class and contains two methods: `up` and `down`. The `up` method is used to add new tables, columns, or indexes to your database, while the `down` method should simply reverse the operations performed by the `up` method. Within both of these methods you may use the [schema builder](#creating-tables) to expressively create and modify tables. For example, let's look at a sample migration that creates a `october_blog_posts` table:

    <?php namespace Acme\Blog\Updates;

    use Schema;
    use October\Rain\Database\Updates\Migration;

    class CreatePostsTable extends Migration
    {
        public function up()
        {
            Schema::create('october_blog_posts', function($table)
            {
                $table->engine = 'InnoDB';
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
            Schema::drop('october_blog_posts');
        }
    }

<a name="creating-tables"></a>
### Creating tables

To create a new database table, use the `create` method on the `Schema` facade. The `create` method accepts two arguments. The first is the name of the table, while the second is a `Closure` which receives an object used to define the new table:

    Schema::create('users', function ($table) {
        $table->increments('id');
    });

Of course, when creating the table, you may use any of the schema builder's [column methods](#creating-columns) to define the table's columns.

#### Checking for table / column existence

You may easily check for the existence of a table or column using the `hasTable` and `hasColumn` methods:

    if (Schema::hasTable('users')) {
        //
    }

    if (Schema::hasColumn('users', 'email')) {
        //
    }

#### Connection & storage engine

If you want to perform a schema operation on a database connection that is not your default connection, use the `connection` method:

    Schema::connection('foo')->create('users', function ($table) {
        $table->increments('id');
    });

To set the storage engine for a table, set the `engine` property on the schema builder:

    Schema::create('users', function ($table) {
        $table->engine = 'InnoDB';

        $table->increments('id');
    });

<a name="renaming-and-dropping-tables"></a>
### Renaming / dropping tables

To rename an existing database table, use the `rename` method:

    Schema::rename($from, $to);

To drop an existing table, you may use the `drop` or `dropIfExists` methods:

    Schema::drop('users');

    Schema::dropIfExists('users');

<a name="creating-columns"></a>
### Creating columns

To update an existing table, we will use the `table` method on the `Schema` facade. Like the `create` method, the `table` method accepts two arguments, the name of the table and a `Closure` that receives an object we can use to add columns to the table:

    Schema::table('users', function ($table) {
        $table->string('email');
    });

#### Available Column Types

Of course, the schema builder contains a variety of column types that you may use when building your tables:

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
`$table->double('column', 15, 8);`  |  DOUBLE equivalent with precision, 15 digits in total and 8 after the decimal point.
`$table->enum('choices', ['foo', 'bar']);` | ENUM equivalent for the database.
`$table->float('amount');`  |  FLOAT equivalent for the database.
`$table->increments('id');`  |  Incrementing ID (primary key) using a "UNSIGNED INTEGER" equivalent.
`$table->integer('votes');`  |  INTEGER equivalent for the database.
`$table->json('options');`  |  JSON equivalent for the database.
`$table->jsonb('options');`  |  JSONB equivalent for the database.
`$table->longText('description');`  |  LONGTEXT equivalent for the database.
`$table->mediumInteger('numbers');`  |  MEDIUMINT equivalent for the database.
`$table->mediumText('description');`  |  MEDIUMTEXT equivalent for the database.
`$table->morphs('taggable');`  |  Adds INTEGER `taggable_id` and STRING `taggable_type`.
`$table->nullableTimestamps();`  |  Same as `timestamps()`, except allows NULLs.
`$table->rememberToken();`  |  Adds `remember_token` as VARCHAR(100) NULL.
`$table->smallInteger('votes');`  |  SMALLINT equivalent for the database.
`$table->softDeletes();`  |  Adds `deleted_at` column for soft deletes.
`$table->string('email');`  |  VARCHAR equivalent column.
`$table->string('name', 100);`  |  VARCHAR equivalent with a length.
`$table->text('description');`  |  TEXT equivalent for the database.
`$table->time('sunrise');`  |  TIME equivalent for the database.
`$table->tinyInteger('numbers');`  |  TINYINT equivalent for the database.
`$table->timestamp('added_on');`  |  TIMESTAMP equivalent for the database.
`$table->timestamps();`  |  Adds `created_at` and `updated_at` columns.

#### Column modifiers

In addition to the column types listed above, there are several other column "modifiers" which you may use while adding the column. For example, to make the column "nullable", you may use the `nullable` method:

    Schema::table('users', function ($table) {
        $table->string('email')->nullable();
    });

Below is a list of all the available column modifiers. This list does not include the [index modifiers](#creating-indexes):

Modifier  | Description
------------- | -------------
`->nullable()`  |  Allow NULL values to be inserted into the column
`->default($value)`  |  Specify a "default" value for the column
`->unsigned()`  |  Set `integer` columns to `UNSIGNED`
`->first()`  |  Place the column "first" in the table (MySQL Only)
`->after('column')`  |  Place the column "after" another column (MySQL Only)

<a name="modifying-columns"></a>
### Modifying columns

The `change` method allows you to modify an existing column to a new type, or modify the column's attributes. For example, you may wish to increase the size of a string column. To see the `change` method in action, let's increase the size of the `name` column from 25 to 50:

    Schema::table('users', function ($table) {
        $table->string('name', 50)->change();
    });

We could also modify a column to be nullable:

    Schema::table('users', function ($table) {
        $table->string('name', 50)->nullable()->change();
    });

<a name="renaming-columns"></a>
#### Renaming columns

To rename a column, you may use the `renameColumn` method on the Schema builder:

    Schema::table('users', function ($table) {
        $table->renameColumn('from', 'to');
    });

> **Note:** Renaming columns in a table with a `enum` column is not currently supported.

<a name="dropping-columns"></a>
### Dropping columns

To drop a column, use the `dropColumn` method on the Schema builder:

    Schema::table('users', function ($table) {
        $table->dropColumn('votes');
    });

You may drop multiple columns from a table by passing an array of column names to the `dropColumn` method:

    Schema::table('users', function ($table) {
        $table->dropColumn(['votes', 'avatar', 'location']);
    });

<a name="creating-indexes"></a>
### Creating indexes

The schema builder supports several types of indexes. First, let's look at an example that specifies a column's values should be unique. To create the index, we can simply chain the `unique` method onto the column definition:

    $table->string('email')->unique();

Alternatively, you may create the index after defining the column. For example:

    $table->unique('email');

You may even pass an array of columns to an index method to create a compound index:

    $table->index(['account_id', 'created_at']);

In most cases you should specify a name for the index manually as the second argument, to avoid the system automatically generating one that is too long:

    $table->index(['account_id', 'created_at'], 'account_created');

#### Available index types

Command  | Description
------------- | -------------
`$table->primary('id');`  |  Add a primary key.
`$table->primary(['first', 'last']);`  |  Add composite keys.
`$table->unique('email');`  |  Add a unique index.
`$table->index('state');`  |  Add a basic index.

<a name="dropping-indexes"></a>
### Dropping indexes

To drop an index, you must specify the index's name. If no name was specified manually, the system will automatically generate one, simply concatenate the table name, the name of the indexed column, and the index type. Here are some examples:

Command  | Description
------------- | -------------
`$table->dropPrimary('users_id_primary');`  |  Drop a primary key from the "users" table.
`$table->dropUnique('users_email_unique');`  |  Drop a unique index from the "users" table.
`$table->dropIndex('geo_state_index');`  |  Drop a basic index from the "geo" table.

<a name="foreign-key-constraints"></a>
### Foreign key constraints

There is also support for creating foreign key constraints, which are used to force referential integrity at the database level. For example, let's define a `user_id` column on the `posts` table that references the `id` column on a `users` table:

    Schema::table('posts', function ($table) {
        $table->integer('user_id')->unsigned();

        $table->foreign('user_id')->references('id')->on('users');
    });

As before, you may specify a name for the constraint manually by passing a second argument to the `foreign` method:

    $table->foreign('user_id', 'user_foreign')
        ->references('id')
        ->on('users');

You may also specify the desired action for the "on delete" and "on update" properties of the constraint:

    $table->foreign('user_id')
          ->references('id')
          ->on('users')
          ->onDelete('cascade');

To drop a foreign key, you may use the `dropForeign` method. Foreign key constraints use the same naming convention as indexes. So, if one is not specified manually, we will concatenate the table name and the columns in the constraint then suffix the name with "_foreign":

    $table->dropForeign('posts_user_id_foreign');

<a name="seeder-structure"></a>
## Seeder structure

Like migration files, a seeder class only contains one method by default: `run`and should extend the `Seeder` class. The `run` method is called when the update process is executed. Within this method, you may insert data into your database however you wish. You may use the [query builder](../database/query) to manually insert data or you may use your [model classes](../database/model). In the example below, we'll create a new user using the `User` model inside the `run` method:

    <?php namespace Acme\Users\Updates;

    use Seeder;
    use Acme\Users\Models\User;

    class SeedUsersTable extends Seeder
    {
        public function run()
        {
            $user = User::create([
                'email'                 => 'user@user.com',
                'login'                 => 'user',
                'password'              => 'user',
                'password_confirmation' => 'user',
                'first_name'            => 'Adam',
                'last_name'             => 'Person',
                'is_activated'          => true
            ]);
        }
    }

Alternatively, the same can be achieved using the `Db::table` [query builder](../database/query) method:

    public function run()
    {
        $user = Db::table('users')->create([
            'email'                 => 'user@user.com',
            'login'                 => 'user',
            [...]
        ]);
    }

<a name="calling-additional-seeders"></a>
### Calling additional seeders

Within the `DatabaseSeeder` class, you may use the `call` method to execute additional seed classes. Using the `call` method allows you to break up your database seeding into multiple files so that no single seeder class becomes overwhelmingly large. Simply pass the name of the seeder class you wish to run:

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->call('Acme\Users\Updates\UserTableSeeder');
        $this->call('Acme\Users\Updates\PostsTableSeeder');
        $this->call('Acme\Users\Updates\CommentsTableSeeder');
    }
