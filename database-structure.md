Database tables and seed data is managed using a version information file **version.yaml** found 
in the **updates** folder of a plugin.

An example plugin updates folder:

```
/plugins
  /author
    /myplugin
      /updates                    <=== Updates folder
        version.yaml              <=== Version Information File
        create_posts_table.php    <=== Database scripts
        create_comments_table.php <==^
        some_seeding_file.php     <==^
        some_upgrade_file.php     <==^
```

An example version information file:

```yaml
1.0.1:
    - Added some upgrade file and some seeding
    - some_upgrade_file.php
    - some_seeding_file.php
1.0.2:
    - Create blog post comments table
    - create_comments_table.php
1.0.3: Bug fix update that uses no scripts
1.0.4: Another fix
1.0.5: 
    - Create blog settings table
    - create_blog_settings_table.php
```

> **Note:** For updates with scripts, the first line is always the comment, then subsequent lines are script file names.

An example of a structure file:

```php
<?php namespace Plugins\October\Blog\Updates;

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
            $table->boolean('published')->default(false);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('october_blog_posts');
    }
}
```

An example of a seed file:
```php
<?php namespace Plugins\October\Users\Updates;

use Plugins\October\Users\Models\User;
use October\Rain\Database\Updates\Seeder;

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
            'activated'             => 1
        ]);
    }
}
```