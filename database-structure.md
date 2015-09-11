# Database structure and updates

- [Updates files](#update-files)
- [Update process](#update-process)
- [Migration files](#migration-files)
- [Data seeding files](#data-seeding-files)

October provides a simple way of managing the database structure and contents with the database scripts (migrations and seed files). The database scripts can be provided by plugins.

<a name="update-files" class="anchor" href="#update-files"></a>
## Update files

Database tables and seed data is managed using a version information file `version.yaml` found in the **updates** subdirectory of a plugin directory. An example plugin updates folder:

    plugins/
      acme/
        blog/
          updates/                       <=== Updates folder
            version.yaml                 <=== Version Information File
            create_posts_table.php       <=== Database scripts
            create_comments_table.php    <=== Migration script
            some_seeding_file.php        <=== Seeding script
            some_upgrade_file.php        <=== Seeding script

The version information file defines the plugin version and refers to the migration and seeding files. All migration and seeding files should be associated with a plugin version. Example of the **version.yaml** file:

    1.0.1:
        - Added some upgrade file and some seeding.
        - some_upgrade_file.php
        - some_seeding_file.php
    1.0.2:
        - Create blog post comments table.
        - create_comments_table.php
    1.0.3: Bug fix update that uses no scripts.
    1.0.4: Another fix.
    1.0.5:
        - Create blog settings table.
        - create_blog_settings_table.php

For updates that refer to migration or seeding files, the first line is always the comment, then subsequent lines are script file names.

An example of a comment with no associated update files:

    1.0.1: A single comment that uses no update scripts.
    1.0.2:
        - Alternative comment with no update files.

An update line with a comment and update scripts:

    1.0.3:
        - This update will execute the two scripts below.
        - some_upgrade_file.php
        - some_seeding_file.php

<a name="important-updates" class="anchor" href="#important-updates"></a>
### Important updates

Sometimes a plugin needs to introduce features that will break websites already using the plugin. If an update comment in the **version.yaml** file begins with three exclamation marks (`!!!`) then it will be considered *Important* and will require the user to confirm before updating. An example of an important update comment:

    1.1.0: !!! This is an important update that contains breaking changes.

When the system detects an important update it will provide three options to proceed:

1. Confirm update
1. Skip this plugin (once only)
1. Skip this plugin (always)

Confirming the comment will update the plugin as usual, or if the comment is skipped it will not be updated.

<a name="update-process" class="anchor" href="#update-process"></a>
## Update process

Any given [update file](#update-files) will only be applied once after a successful execution. October executes the update process automatically when any of the following occurs:

1. When an administrator signs in to the back-end.

2. When the system is updated with the built-in Update feature in the back-end.

3. When the console command `php artisan october:up` is called in the command line from the application directory.

Updates are applied in a specific order, based on the [defined dependencies in the plugin registration file](../plugin/registration#dependency-definitions). Plugins that are dependant will not be updated until all their dependencies have been updated first.

> **Note:** The plugin [initialization process](../plugin/registration#routing-initialization) is disabled during the update process, this should be a consideration in migration and seeding scripts.

<a name="migration-files" class="anchor" href="#migration-files"></a>
## Migration files

October migrations use the Laravel's [Schema Builder](http://laravel.com/docs/5.0/schema). The migration file should define a class that extends the `October\Rain\Database\Updates\Migration` class. The class should define two public methods - `up()` and `down()`.  The class name should match the script file name written in CamelCase. Inside the migration files the `Author\Plugin\Updates` [namespace](../plugin/registration#namespaces) should be used. An example of a structure file:

    namespace Acme\Blog\Updates;

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

<a name="data-seeding-files" class="anchor" href="#data-seeding-files"></a>
## Data seeding files

Use the the data seeding files to add, update or remove records in the database when a plugin changes its version. The file should define a class that extends the `Seeder` class. The class should define the public method `run()`. The class name should match the script file name written in CamelCase. Inside the seeding files the `Author\Plugin\Updates` [namespace](../plugin/registration#namespaces) should be used. An example of a seeding file:

    namespace Acme\Users\Updates;

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
