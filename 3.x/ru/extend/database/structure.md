# Миграции и наполнение

Файлы миграций и наполнения позволяют создавать, изменять и заполнять таблицы базы данных. Они используются в первую очередь в [файле обновлений плагина](../system/plugins.md) и связаны с историей версий плагина. Все классы хранятся в директории `updates` плагина. Миграции должны рассказывать историю вашей базы данных, и эту историю можно воспроизводить как вперёд, так и назад для создания и удаления таблиц.

Вы можете сгенерировать файл миграции с помощью инструмента командной строки. Первый аргумент указывает автора и имя плагина. Второй аргумент указывает имя миграции.

```bash
php artisan create:migration Acme.Blog CreatePostsTable
```

## Структура миграции

Файл миграции должен определять класс, расширяющий класс `October\Rain\Database\Updates\Migration`, и содержать два метода: `up` и `down`. Метод `up` используется для добавления новых таблиц, столбцов или индексов в базу данных, а метод `down` должен просто отменять операции, выполненные методом `up`. В обоих этих методах вы можете использовать построитель схемы для выразительного создания и изменения таблиц. Например, рассмотрим миграцию, которая создаёт таблицу `october_blog_posts`:

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

## Создание таблиц

::: aside
При создании таблицы вы можете использовать любые методы столбцов построителя схемы для определения столбцов таблицы (см. ниже).
:::

Для создания новой таблицы базы данных используйте метод `create` фасада `Schema`. Метод `create` принимает два аргумента. Первый — это имя таблицы, а второй — `Closure`, которая получает объект для определения новой таблицы.

```php
Schema::create('users', function ($table) {
    $table->increments('id');
});
```

Вы можете проверить существование таблицы или столбца с помощью методов `hasTable` и `hasColumn`.

```php
if (Schema::hasTable('users')) {
    //
}

if (Schema::hasColumn('users', 'email')) {
    //
}
```

### Подключение и движок хранения

Если вы хотите выполнить операцию схемы на подключении к базе данных, отличном от вашего подключения по умолчанию, используйте метод `connection`.

```php
Schema::connection('foo')->create('users', function ($table) {
    $table->increments('id');
});
```

Для установки движка хранения таблицы задайте свойство `engine` в построителе схемы.

```php
Schema::create('users', function ($table) {
    $table->engine = 'InnoDB';
    $table->increments('id');
});
```

## Переименование / Удаление таблиц

Для переименования существующей таблицы базы данных используйте метод `rename`.

```php
Schema::rename($from, $to);
```

Для удаления существующей таблицы вы можете использовать методы `drop` или `dropIfExists`.

```php
Schema::drop('users');

Schema::dropIfExists('users');
```

## Создание столбцов

Для обновления существующей таблицы мы используем метод `table` фасада `Schema`. Как и метод `create`, метод `table` принимает два аргумента: имя таблицы и `Closure`, которая получает объект, используемый для добавления столбцов в таблицу:

```php
Schema::table('users', function ($table) {
    $table->string('email');
});
```

### Доступные типы столбцов

Построитель схемы содержит множество типов столбцов, которые вы можете использовать при построении таблиц.

Команда  | Описание
------------- | -------------
`$table->bigIncrements('id');`  |  Автоинкрементный ID (первичный ключ) с использованием эквивалента «UNSIGNED BIG INTEGER».
`$table->bigInteger('votes');`  |  Эквивалент BIGINT для базы данных.
`$table->binary('data');`  |  Эквивалент BLOB для базы данных.
`$table->boolean('confirmed');`  |  Эквивалент BOOLEAN для базы данных.
`$table->char('name', 4);`  |  Эквивалент CHAR с указанием длины.
`$table->date('created_at');`  |  Эквивалент DATE для базы данных.
`$table->dateTime('created_at');`  |  Эквивалент DATETIME для базы данных.
`$table->decimal('amount', 5, 2);`  |  Эквивалент DECIMAL с указанием точности и масштаба.
`$table->double('column', 15, 8);`  |  Эквивалент DOUBLE с точностью, 15 цифр всего и 8 после запятой.
`$table->enum('choices', ['foo', 'bar']);` | Эквивалент ENUM для базы данных.
`$table->float('amount');`  |  Эквивалент FLOAT для базы данных.
`$table->increments('id');`  |  Автоинкрементный ID (первичный ключ) с использованием эквивалента «UNSIGNED INTEGER».
`$table->integer('votes');`  |  Эквивалент INTEGER для базы данных.
`$table->json('options');`  |  Эквивалент JSON для базы данных.
`$table->jsonb('options');`  |  Эквивалент JSONB для базы данных.
`$table->longText('description');`  |  Эквивалент LONGTEXT для базы данных.
`$table->mediumInteger('numbers');`  |  Эквивалент MEDIUMINT для базы данных.
`$table->mediumText('description');`  |  Эквивалент MEDIUMTEXT для базы данных.
`$table->morphs('taggable');`  |  Добавляет INTEGER `taggable_id` и STRING `taggable_type`.
`$table->nullableTimestamps();`  |  Аналогично `timestamps()`, но допускает NULL.
`$table->rememberToken();`  |  Добавляет `remember_token` как VARCHAR(100) NULL.
`$table->smallInteger('votes');`  |  Эквивалент SMALLINT для базы данных.
`$table->softDeletes();`  |  Добавляет столбец `deleted_at` для мягкого удаления.
`$table->string('email');`  |  Эквивалент столбца VARCHAR.
`$table->string('name', 100);`  |  Эквивалент VARCHAR с указанием длины.
`$table->text('description');`  |  Эквивалент TEXT для базы данных.
`$table->time('sunrise');`  |  Эквивалент TIME для базы данных.
`$table->tinyInteger('numbers');`  |  Эквивалент TINYINT для базы данных.
`$table->timestamp('added_on');`  |  Эквивалент TIMESTAMP для базы данных.
`$table->timestamps();`  |  Добавляет столбцы `created_at` и `updated_at`.

### Модификаторы столбцов

Помимо перечисленных выше типов столбцов, существует несколько «модификаторов» столбцов, которые вы можете использовать при добавлении столбца. Например, чтобы сделать столбец «допускающим NULL», используйте метод `nullable`.

```php
Schema::table('users', function ($table) {
    $table->string('email')->nullable();
});
```

Ниже приведён список всех доступных модификаторов столбцов. Этот список не включает модификаторы индексов.

Модификатор  | Описание
------------- | -------------
`->nullable()`  |  Разрешить вставку NULL-значений в столбец
`->default($value)`  |  Указать значение «по умолчанию» для столбца
`->unsigned()`  |  Установить столбцы `integer` как `UNSIGNED`
`->first()`  |  Поместить столбец «первым» в таблице (только MySQL)
`->after('column')`  |  Поместить столбец «после» другого столбца (только MySQL)
`->comment('my comment')`  |  Добавить комментарий к столбцу (только MySQL)

## Изменение столбцов

Метод `change` позволяет изменить существующий столбец на новый тип или модифицировать атрибуты столбца. Например, вы можете захотеть увеличить размер строкового столбца. Чтобы увидеть метод `change` в действии, увеличим размер столбца `name` с 25 до 50.

```php
Schema::table('users', function ($table) {
    $table->string('name', 50)->change();
});
```

Мы также можем сделать столбец допускающим NULL:

```php
Schema::table('users', function ($table) {
    $table->string('name', 50)->nullable()->change();
});
```

### Переименование столбцов

Для переименования столбца используйте метод `renameColumn` построителя схемы.

```php
Schema::table('users', function ($table) {
    $table->renameColumn('from', 'to');
});
```

::: info
Переименование столбцов в таблице со столбцом типа `enum` в настоящее время не поддерживается.
:::

### Удаление столбцов

Для удаления столбца используйте метод `dropColumn` построителя схемы.

```php
Schema::table('users', function ($table) {
    $table->dropColumn('votes');
});
```

Вы можете удалить несколько столбцов из таблицы, передав массив имён столбцов в метод `dropColumn`.

```php
Schema::table('users', function ($table) {
    $table->dropColumn(['votes', 'avatar', 'location']);
});
```

## Создание индексов

Построитель схемы поддерживает несколько типов индексов. Сначала рассмотрим пример, указывающий, что значения столбца должны быть уникальными. Для создания индекса мы можем просто добавить метод `unique` к определению столбца.

```php
$table->string('email')->unique();
```

Альтернативно вы можете создать индекс после определения столбца. Например:

```php
$table->unique('email');
```

Вы даже можете передать массив столбцов в метод индекса для создания составного индекса.

```php
$table->index(['account_id', 'created_at']);
```

В большинстве случаев следует указывать имя индекса вручную вторым аргументом, чтобы избежать автоматической генерации слишком длинного имени.

```php
$table->index(['account_id', 'created_at'], 'account_created');
```

#### Доступные типы индексов

Команда  | Описание
------------- | -------------
`$table->primary('id');`  |  Добавить первичный ключ.
`$table->primary(['first', 'last']);`  |  Добавить составные ключи.
`$table->unique('email');`  |  Добавить уникальный индекс.
`$table->index('state');`  |  Добавить базовый индекс.

### Переименование индексов

Для переименования индекса используйте метод `renameIndex`, предоставляемый построителем схемы. Этот метод принимает текущее имя индекса в качестве первого аргумента и желаемое имя в качестве второго.

```php
$table->renameIndex('from', 'to')
```

### Удаление индексов

Для удаления индекса вы должны указать его имя. Если имя не было указано вручную, система автоматически генерирует его, просто объединяя имя таблицы, имя индексируемого столбца и тип индекса. Вот несколько примеров:

Команда  | Описание
------------- | -------------
`$table->dropPrimary('users_id_primary');`  |  Удалить первичный ключ из таблицы «users».
`$table->dropUnique('users_email_unique');`  |  Удалить уникальный индекс из таблицы «users».
`$table->dropIndex('geo_state_index');`  |  Удалить базовый индекс из таблицы «geo».

### Ограничения внешних ключей

Также поддерживается создание ограничений внешних ключей, которые используются для обеспечения ссылочной целостности на уровне базы данных. Например, определим столбец `user_id` в таблице `posts`, который ссылается на столбец `id` таблицы `users`:

```php
Schema::table('posts', function ($table) {
    $table->integer('user_id')->unsigned();

    $table->foreign('user_id')->references('id')->on('users');
});
```

Как и ранее, вы можете указать имя ограничения вручную, передав второй аргумент в метод `foreign`:

```php
$table->foreign('user_id', 'user_foreign')
    ->references('id')
    ->on('users');
```

Вы также можете указать желаемое действие для свойств «on delete» и «on update» ограничения:

```php
$table->foreign('user_id')
    ->references('id')
    ->on('users')
    ->onDelete('cascade');
```

Для удаления внешнего ключа используйте метод `dropForeign`. Ограничения внешних ключей используют ту же конвенцию именования, что и индексы. Поэтому, если имя не указано вручную, мы объединяем имя таблицы и столбцы ограничения, а затем добавляем суффикс «_foreign»:

```php
$table->dropForeign('posts_user_id_foreign');
```

## Структура наполнителя

Как и файлы миграций, класс наполнителя по умолчанию содержит только один метод `run` и должен расширять класс `Seeder`. Метод `run` вызывается при выполнении процесса обновления. В этом методе вы можете вставлять данные в базу данных любым удобным способом. Вы можете использовать [конструктор запросов](./query.md) для ручной вставки данных или ваши [классы моделей](./model.md). В примере ниже мы создадим нового пользователя с помощью модели `User` внутри метода `run`.

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

Альтернативно то же самое может быть достигнуто с помощью метода `Db::table` [конструктора запросов](./query.md).

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

### Вызов дополнительных наполнителей

Внутри класса `DatabaseSeeder` вы можете использовать метод `call` для выполнения дополнительных классов наполнителей. Использование метода `call` позволяет разбить наполнение базы данных на несколько файлов, чтобы ни один класс наполнителя не стал слишком большим. Просто передайте имя класса наполнителя, который хотите запустить.

```php
public function run()
{
    $this->call(\Acme\Users\Updates\UserTableSeeder::class);
    $this->call(\Acme\Users\Updates\PostsTableSeeder::class);
    $this->call(\Acme\Users\Updates\CommentsTableSeeder::class);
}
```
