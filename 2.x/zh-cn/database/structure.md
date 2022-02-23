# 迁移和播种机(Seeding)

迁移和种子文件允许您构建、修改和填充数据库表。 它们主要由 [插件更新文件](../plugin/updates.md) 使用，并与插件的版本历史记录配对。 所有类都存储在插件的`updates`目录中。 迁移应该记录一个关于您的数据库修改历史，并且这个历史可以向前和向后回滚，以建立和拆除表。

<a id="oc-migration-structure"></a>
## 迁移结构

迁移文件应该定义一个扩展 `October\Rain\Database\Updates\Migration` 类并包含两个方法： `up` 和 `down`。`up` 方法是用于新增数据库的数据表、字段或者索引的，而`down` 方法应该与 `up` 方法的执行操作相反。在这两种方法中，您都可以使用 [结构生成器](#creating-tables) 来创建和修改表。 例如，让我们看一个创建 `october_blog_posts` 表的示例迁移：

```php
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
```

### 创建表

要创建一个新的数据库表，请使用 `Schema`门面上的 create 方法。 `create` 方法接受两个参数。 第一个是表的名称，而第二个是一个`Closure`，它接收一个用于定义新表的对象：

```php
Schema::create('users', function ($table) {
    $table->increments('id');
});
```

在创建数据表时，你可以使用结构生成器的任何 [字段方法](#oc-creating-columns) 去定义数据表的字段。

#### 检查表/列是否存在

你可以使用`hasTable` 和 `hasColumn`方法轻松的检查数据表和字段是否存在：

```php
if (Schema::hasTable('users')) {
    //
}

if (Schema::hasColumn('users', 'email')) {
    //
}
```

#### 数据库连接和存储引擎

如果你想要对非默认连接的数据库连接执行结构操作，请使用`connection` 方法：

```php
Schema::connection('foo')->create('users', function ($table) {
    $table->increments('id');
});
```

要为表设置存储引擎，请在结构生成器上设置 `engine` 属性：

```php
Schema::create('users', function ($table) {
    $table->engine = 'InnoDB';

    $table->increments('id');
});
```

### 重命名 / 删除 数据表

重命名一个存在的数据库表，请使用 `rename`方法：

```php
Schema::rename($from, $to);
```

删除一个存在的数据表，你可以使用`drop` 或者 `dropIfExists`方法

```php
Schema::drop('users');

Schema::dropIfExists('users');
```

<a id="oc-creating-columns"></a>
### 创建字段

在`Schema` 门面中可以使用`table`方法来更新已存在的数据表。和 `create`方法一样，`table` 方法接受两个参数：一个是数据表的名字，另一个是`Closure`，它接收我们可以用来向表中添加字段的对象：

```php
Schema::table('users', function ($table) {
    $table->string('email');
});
```

#### 可用的字段类型

数据库结构生成器包含构建表时可以指定的各种字段类型：

命令  |  描述
------------- | -------------
`$table->bigIncrements('id');`  |  递增 ID(主键)，相当于「UNSIGNED BIG INTEGER」
`$table->bigInteger('votes');`  | 相当于 BIGINT
`$table->binary('data');`  |  相当于 BLOB
`$table->boolean('confirmed');`  |  相当于 BOOLEAN
`$table->char('name', 4);`  |  相当于带有长度的 CHAR
`$table->date('created_at');`  |  相当于 DATE
`$table->dateTime('created_at');`  |  相当于 DATETIME
`$table->decimal('amount', 5, 2);`  |  相当于带有精度与基数 DECIMAL
`$table->double('column', 15, 8);`  |  相当于带有精度与基数 DOUBLE, 共 15 位，小数点后 8 位
`$table->enum('choices', ['foo', 'bar']);` | 相当于 ENUM
`$table->float('amount');`  |  相当于带有精度与基数 FLOAT
`$table->increments('id');`  |  递增的 ID (主键)，相当于「UNSIGNED INTEGER」
`$table->integer('votes');`  |  相当于 INTEGER
`$table->json('options');`  |  相当于 JSON
`$table->jsonb('options');`  |  相当于 JSONB
`$table->longText('description');`  |  相当于 LONGTEXT
`$table->mediumInteger('numbers');`  |  相当于 MEDIUMINT
`$table->mediumText('description');`  |  相当于 MEDIUMTEXT
`$table->morphs('taggable');`  |  相当于加入递增的 `taggable_id` 与字符串 `taggable_type`
`$table->nullableTimestamps();`  | 相当于可空版本的 `timestamps()` 字段
`$table->rememberToken();`  |  相当于可空版本 VARCHAR(100) NULL 的 `remember_token` 字段
`$table->smallInteger('votes');`  |  相当于 SMALLINT
`$table->softDeletes();`  |  相当于为软删除添加一个可空的 `deleted_at` 字段
`$table->string('email');`  |  相当于 VARCHAR
`$table->string('name', 100);`  |  相当于带长度的 VARCHAR
`$table->text('description');`  | 相当于 TEXT
`$table->time('sunrise');`  |  相当于 TIME
`$table->tinyInteger('numbers');`  |  相当于 TINYINT
`$table->timestamp('added_on');`  |  相当于 TIMESTAMP
`$table->timestamps();`  |  相当于可空的 `created_at` 和 `updated_at` TIMESTAMP

### 字段修饰

除了上述列出的字段类型之外，还有几个可以在添加字段到数据库表时使用的 “修饰符”。例如，如果要把字段设置为 “可空 "， 你可以使用 `nullable` 方法

```php
Schema::table('users', function ($table) {
    $table->string('email')->nullable();
});
```

以下是所有可用的字段修饰符的列表。此列表不包括 [索引修饰符](#creating-indexes)：

命令  |  描述
------------- | -------------
`->nullable()`  |  此字段允许写入 NULL 值
`->default($value)`  |  为字段指定 "默认" 值
`->unsigned()`  |  设置 INTEGER 类型的字段为 UNSIGNED
`->first()`  |  将此字段放置在数据表的 "首位" (MySQL)
`->after('column')`  |   将此字段放置在其它字段 "之后" (MySQL)
`->comment('my comment')`  |  为字段增加注释 (MySQL)

### 修改字段

`change` 方法可以将现有的字段类型修改为新的类型或修改属性。
比如，你可能想增加字符串字段的长度，可以使用 `change` 方法把 `name` 字段的长度从 25 增加到 50：

```php
Schema::table('users', function ($table) {
    $table->string('name', 50)->change();
});
```

我们同样可以将字段修改为可空:

```php
Schema::table('users', function ($table) {
    $table->string('name', 50)->nullable()->change();
});
```

#### 重命名字段

可以使用结构生成器上的 `renameColumn` 方法来重命名字段。

```php
Schema::table('users', function ($table) {
    $table->renameColumn('from', 'to');
});
```

> **注意**: 当前不支持 enum 类型的字段重命名

### 删除字段

可以使用结构生成器上的 `dropColumn` 方法来删除字段。

```php
Schema::table('users', function ($table) {
    $table->dropColumn('votes');
});
```

你可以传递一个字段数组给 `dropColumn` 方法来删除多个字段：

```php
Schema::table('users', function ($table) {
    $table->dropColumn(['votes', 'avatar', 'location']);
});
```

### 创建索引

结构生成器支持多种类型的索引。首先，先指定字段值唯一，即简单地在字段定义之后链式调用 `unique` 方法来创建索引，例如：

```php
$table->string('email')->unique();
```

或者，你也可以在定义完字段之后创建索引。例如：

```php
$table->unique('email');
```

你甚至可以将数组传递给索引方法来创建一个复合(或合成)索引：

```php
$table->index(['account_id', 'created_at']);
```

在大多数情况下，您应该手动指定索引名称作为第二个参数，以避免系统自动生成一个过长的索引：

```php
$table->index(['account_id', 'created_at'], 'account_created');
```

#### 可用的索引类型

Command  | Description
------------- | -------------
`$table->primary('id');`  |  添加主键
`$table->primary(['first', 'last']);`  |  添加复合键
`$table->unique('email');`  |  添加唯一索引
`$table->index('state');`  |  添加普通索引

<a id="oc-index-lengths-using-mysql-mariadb"></a>
####  MySQL / MariaDB 的索引长度

默认情况下，October CMS 使用 `utf8mb4` 字符集。 如果运行低于 v5.7.7 的 MySQL 版本或低于 v10.2.2 的 MariaDB，则需要手动配置迁移生成的默认字符串长度，以便 MySQL 为它们创建索引。 要配置默认字符串长度，请将以下内容添加到您的 **config/database.php** 配置文件中的键 `connections.mysql` 下。

```php
'varcharmax' => 191,
```

### 重命名索引

若要重命名索引，你需要调用 `renameIndex`方法。此方法接受当前索引名称作为其第一个参数，并将所需名称作为其第二个参数:

```php
$table->renameIndex('from', 'to')
```

### 删除索引

要删除索引，您必须指定索引的名称。如果没有手动指定名称，系统会自动生成一个，只需将表名、索引列的名称和索引类型连接起来即可。这里有些例子：

命令  |  描述
------------- | -------------
`$table->dropPrimary('users_id_primary');`  |  从 `users` 表中删除主键
`$table->dropUnique('users_email_unique');`  |  从 `users` 表中删除唯一索引
`$table->dropIndex('geo_state_index');`  |  从 `geo` 表中删除基本索引

### 外键约束

还支持创建用于在数据库层中的强制引用完整性的外键约束。例如，让我们在 `posts` 表上定义一个引用 `users` 表的 id 字段的 `user_id` 字段：

```php
Schema::table('posts', function ($table) {
    $table->integer('user_id')->unsigned();

    $table->foreign('user_id')->references('id')->on('users');
});
```

和之前一样，您可以通过将第二个参数传递给 `foreign` 方法来手动指定约束的名称：

```php
$table->foreign('user_id', 'user_foreign')
    ->references('id')
    ->on('users');
```

还可以为 `on delete` 和`on update` 属性指定所需的操作：

```php
$table->foreign('user_id')
        ->references('id')
        ->on('users')
        ->onDelete('cascade');
```

要删除外键，您可以使用 `dropForeign` 方法。 外键约束使用与索引相同的命名约定。 因此，如果没有手动指定，我们将连接表名和约束中的字段，然后在名称后缀"_foreign"：

```php
$table->dropForeign('posts_user_id_foreign');
```

## 播种机结构

像迁移文件一样，种子类默认只包含一个方法：`run`，并且应该扩展`Seeder`类。 执行更新过程时会调用 `run` 方法。 在此方法中，您可以根据需要将数据插入数据库。 您可以使用 [查询生成器](../database/query.md) 手动插入数据，也可以使用 [模型类](../database/model.md)。 在下面的示例中，我们将使用 `run` 方法中的 `User` 模型创建一个新用户：

```php
<?php namespace Acme\Users\Updates;

use Seeder;
use Acme\Users\Models\User;

class SeedUsersTable extends Seeder
{
    public function run()
    {
        $user = User::create([
            'email' => 'user@example.com',
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

或者，也可以使用 `Db::table` [查询生成器](../database/query.md) 方法来实现：

```php
public function run()
{
    $user = Db::table('users')->insert([
        'email' => 'user@example.com',
        'login' => 'user',
        // ...
    ]);
}
```

### 调用其他播种机

在 `DatabaseSeeder` 类中，您可以使用 `call` 方法来执行其他种子类。 使用 `call` 方法允许您将数据库种子分解为多个文件，这样单个种子类就不会变得非常大。 只需传递您希望运行的种子类的名称：

```php
/**
 * 运行数据库种子
 *
 * @return void
 */
public function run()
{
    Model::unguard();

    $this->call(\Acme\Users\Updates\UserTableSeeder::class);
    $this->call(\Acme\Users\Updates\PostsTableSeeder::class);
    $this->call(\Acme\Users\Updates\CommentsTableSeeder::class);
}
```
