# 迁移和种子填充

迁移和种子文件允许您构建、修改和填充数据库表。它们主要由[插件更新文件](../system/plugins.md)使用，并与插件的版本历史配对。所有类都存储在插件的 `updates` 目录中。迁移应该讲述关于数据库历史的故事，这个故事可以正向和反向播放来构建和拆除表。

您可以使用命令行脚手架工具生成迁移文件。第一个参数指定作者和插件名称。第二个参数指定迁移名称。

```bash
php artisan create:migration Acme.Blog CreatePostsTable
```

## 迁移结构

迁移文件应该定义一个继承 `October\Rain\Database\Updates\Migration` 类的类，并包含两个方法：`up` 和 `down`。`up` 方法用于向数据库添加新表、列或索引，而 `down` 方法应该简单地反转 `up` 方法执行的操作。在这两个方法中，您都可以使用 Schema 构建器来表达性地创建和修改表。例如，让我们看一个创建 `october_blog_posts` 表的示例迁移：

```php
use October\Rain\Database\Schema\Blueprint;
use October\Rain\Database\Updates\Migration;

return new class extends Migration
{
    public function up()
    {
        Schema::create('october_blog_posts', function($table)
        {
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

## 创建表

::: aside
创建表时，您可以使用 Schema 构建器的任何列方法来定义表的列（见下文）。
:::

要创建新的数据库表，请使用 `Schema` 门面上的 `create` 方法。`create` 方法接受两个参数。第一个是表的名称，第二个是一个 `Closure`，它接收一个用于定义新表的对象。

```php
Schema::create('users', function ($table) {
    $table->increments('id');
});
```

您可以使用 `hasTable` 和 `hasColumn` 方法检查表或列是否存在。

```php
if (Schema::hasTable('users')) {
    //
}

if (Schema::hasColumn('users', 'email')) {
    //
}
```

### 连接和存储引擎

如果您想在非默认数据库连接上执行 Schema 操作，请使用 `connection` 方法。

```php
Schema::connection('foo')->create('users', function ($table) {
    $table->increments('id');
});
```

要设置表的存储引擎，请在 Schema 构建器上设置 `engine` 属性。

```php
Schema::create('users', function ($table) {
    $table->engine = 'InnoDB';
    $table->increments('id');
});
```

## 重命名 / 删除表

要重命名现有的数据库表，请使用 `rename` 方法。

```php
Schema::rename($from, $to);
```

要删除现有表，您可以使用 `drop` 或 `dropIfExists` 方法。

```php
Schema::drop('users');

Schema::dropIfExists('users');
```

## 创建列

要更新现有表，我们将使用 `Schema` 门面上的 `table` 方法。与 `create` 方法一样，`table` 方法接受两个参数，表的名称和一个 `Closure`，该 `Closure` 接收一个我们可以用来向表添加列的对象：

```php
Schema::table('users', function ($table) {
    $table->string('email');
});
```

### 可用的列类型

当然，Schema 构建器包含多种列类型，您可以在构建表时使用。

命令  | 描述
------------- | -------------
`$table->bigIncrements('id');`  |  使用"UNSIGNED BIG INTEGER"等效的自增 ID（主键）。
`$table->bigInteger('votes');`  |  数据库的 BIGINT 等效。
`$table->binary('data');`  |  数据库的 BLOB 等效。
`$table->boolean('confirmed');`  |  数据库的 BOOLEAN 等效。
`$table->char('name', 4);`  |  带长度的 CHAR 等效。
`$table->date('created_at');`  |  数据库的 DATE 等效。
`$table->dateTime('created_at');`  |  数据库的 DATETIME 等效。
`$table->decimal('amount', 5, 2);`  |  带精度和小数位的 DECIMAL 等效。
`$table->double('column', 15, 8);`  |  带精度的 DOUBLE 等效，共 15 位数字，小数点后 8 位。
`$table->enum('choices', ['foo', 'bar']);` | 数据库的 ENUM 等效。
`$table->float('amount');`  |  数据库的 FLOAT 等效。
`$table->increments('id');`  |  使用"UNSIGNED INTEGER"等效的自增 ID（主键）。
`$table->integer('votes');`  |  数据库的 INTEGER 等效。
`$table->json('options');`  |  数据库的 JSON 等效。
`$table->jsonb('options');`  |  数据库的 JSONB 等效。
`$table->longText('description');`  |  数据库的 LONGTEXT 等效。
`$table->mediumInteger('numbers');`  |  数据库的 MEDIUMINT 等效。
`$table->mediumText('description');`  |  数据库的 MEDIUMTEXT 等效。
`$table->morphs('taggable');`  |  添加 INTEGER `taggable_id` 和 STRING `taggable_type`。
`$table->nullableTimestamps();`  |  与 `timestamps()` 相同，但允许 NULL。
`$table->rememberToken();`  |  添加 `remember_token` 为 VARCHAR(100) NULL。
`$table->smallInteger('votes');`  |  数据库的 SMALLINT 等效。
`$table->softDeletes();`  |  添加用于软删除的 `deleted_at` 列。
`$table->string('email');`  |  VARCHAR 等效列。
`$table->string('name', 100);`  |  带长度的 VARCHAR 等效。
`$table->text('description');`  |  数据库的 TEXT 等效。
`$table->time('sunrise');`  |  数据库的 TIME 等效。
`$table->tinyInteger('numbers');`  |  数据库的 TINYINT 等效。
`$table->timestamp('added_on');`  |  数据库的 TIMESTAMP 等效。
`$table->timestamps();`  |  添加 `created_at` 和 `updated_at` 列。

### 列修饰符

除了上面列出的列类型外，还有几个其他列"修饰符"，您可以在添加列时使用。例如，要使列"可空"，您可以使用 `nullable` 方法。

```php
Schema::table('users', function ($table) {
    $table->string('email')->nullable();
});
```

以下是所有可用列修饰符的列表。此列表不包括索引修饰符。

修饰符  | 描述
------------- | -------------
`->nullable()`  |  允许向列中插入 NULL 值
`->default($value)`  |  为列指定"默认"值
`->unsigned()`  |  将 `integer` 列设置为 `UNSIGNED`
`->first()`  |  将列放在表的"第一个"位置（仅 MySQL）
`->after('column')`  |  将列放在另一列"之后"（仅 MySQL）
`->comment('my comment')`  |  为列添加注释（仅 MySQL）

## 修改列

`change` 方法允许您将现有列修改为新类型，或修改列的属性。例如，您可能希望增加字符串列的大小。要查看 `change` 方法的实际操作，让我们将 `name` 列的大小从 25 增加到 50。

```php
Schema::table('users', function ($table) {
    $table->string('name', 50)->change();
});
```

我们还可以将列修改为可空：

```php
Schema::table('users', function ($table) {
    $table->string('name', 50)->nullable()->change();
});
```

### 重命名列

要重命名列，您可以使用 Schema 构建器上的 `renameColumn` 方法。

```php
Schema::table('users', function ($table) {
    $table->renameColumn('from', 'to');
});
```

::: info
当前不支持重命名具有 `enum` 列的表中的列。
:::

### 删除列

要删除列，请使用 Schema 构建器上的 `dropColumn` 方法。

```php
Schema::table('users', function ($table) {
    $table->dropColumn('votes');
});
```

您可以通过向 `dropColumn` 方法传递列名数组来从表中删除多个列。

```php
Schema::table('users', function ($table) {
    $table->dropColumn(['votes', 'avatar', 'location']);
});
```

## 创建索引

Schema 构建器支持几种类型的索引。首先，让我们看一个指定列的值应该是唯一的示例。要创建索引，我们可以简单地在列定义上链接 `unique` 方法。

```php
$table->string('email')->unique();
```

或者，您可以在定义列之后创建索引。例如：

```php
$table->unique('email');
```

您甚至可以将列数组传递给索引方法来创建复合索引。

```php
$table->index(['account_id', 'created_at']);
```

在大多数情况下，您应该手动指定索引名称作为第二个参数，以避免系统自动生成的名称过长。

```php
$table->index(['account_id', 'created_at'], 'account_created');
```

#### 可用的索引类型

命令  | 描述
------------- | -------------
`$table->primary('id');`  |  添加主键。
`$table->primary(['first', 'last']);`  |  添加复合键。
`$table->unique('email');`  |  添加唯一索引。
`$table->index('state');`  |  添加基本索引。

### 重命名索引

要重命名索引，请使用 Schema 构建器蓝图提供的 `renameIndex` 方法。此方法接受当前索引名称作为其第一个参数，期望的名称作为其第二个参数。

```php
$table->renameIndex('from', 'to')
```

### 删除索引

要删除索引，您必须指定索引的名称。如果未手动指定名称，系统将自动生成一个，只需将表名、索引列的名称和索引类型连接起来。以下是一些示例：

命令  | 描述
------------- | -------------
`$table->dropPrimary('users_id_primary');`  |  从 "users" 表中删除主键。
`$table->dropUnique('users_email_unique');`  |  从 "users" 表中删除唯一索引。
`$table->dropIndex('geo_state_index');`  |  从 "geo" 表中删除基本索引。

### 外键约束

还支持创建外键约束，用于在数据库级别强制引用完整性。例如，让我们在 `posts` 表上定义一个 `user_id` 列，引用 `users` 表上的 `id` 列：

```php
Schema::table('posts', function ($table) {
    $table->integer('user_id')->unsigned();

    $table->foreign('user_id')->references('id')->on('users');
});
```

与之前一样，您可以通过向 `foreign` 方法传递第二个参数来手动指定约束名称：

```php
$table->foreign('user_id', 'user_foreign')
    ->references('id')
    ->on('users');
```

您还可以指定约束的"on delete"和"on update"属性的期望操作：

```php
$table->foreign('user_id')
    ->references('id')
    ->on('users')
    ->onDelete('cascade');
```

要删除外键，您可以使用 `dropForeign` 方法。外键约束使用与索引相同的命名约定。因此，如果未手动指定，我们将连接表名和约束中的列，然后加上 "_foreign" 后缀：

```php
$table->dropForeign('posts_user_id_foreign');
```

## 种子结构

与迁移文件一样，种子类默认只包含一个名为 `run` 的方法，并且应该继承 `Seeder` 类。更新过程执行时会调用 `run` 方法。在此方法中，您可以以任何方式将数据插入数据库。您可以使用[查询构建器](./query.md)手动插入数据，也可以使用[模型类](./model.md)。在下面的示例中，我们将在 `run` 方法中使用 `User` 模型创建一个新用户。

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

或者，使用 `Db::table` [查询构建器](./query.md)方法也可以实现相同的效果。

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

### 调用其他种子

在 `DatabaseSeeder` 类中，您可以使用 `call` 方法执行其他种子类。使用 `call` 方法允许您将数据库种子分成多个文件，以便任何单个种子类不会变得过于庞大。只需传递您希望运行的种子类的名称。

```php
public function run()
{
    $this->call(\Acme\Users\Updates\UserTableSeeder::class);
    $this->call(\Acme\Users\Updates\PostsTableSeeder::class);
    $this->call(\Acme\Users\Updates\CommentsTableSeeder::class);
}
```
