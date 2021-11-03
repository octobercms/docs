# Структура базы данных и начальные данные

<a name="introduction" class="anchor"></a>
## Введение

Миграции и начальные данные позволяют Вам изменять и заполнять таблицы в БД при помощи файла `version.yaml`, который содержит в себе информацию о версиях плагина и находится в его папке в подпапке **updates**. Миграции должны описывать историю изменений базы данных, и эта история может быть воспроизведена как вперед, так и назад, чтобы создавать и удалять таблицы.

<a name="migration-structure" class="anchor"></a>
## Структура миграции (Migration Structure)

Файл с миграцией должен содержать в себе класс, который является наследником класса `October\Rain\Database\Updates\Migration`, и должен содержать два публичных метода: `up()` и `down()`. Имя класса должно совпадать с именем файла. Пример:

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

<a name="creating-tables" class="anchor"></a>
### Создание таблиц (Creating Tables)

Используйте метод `create` фасада `Schema`, чтобы создать новую таблицу. Метода принимает два аргумента: название таблицы и `Closure`:

    Schema::create('users', function ($table) {
        $table->increments('id');
    });

Разумеется, что при создании таблицы Вы можете использовать любой из [методов](#creating-columns) для определения столбцов таблицы.

#### Проверка существование таблицы / столбца

Вы можете легко проверить существование таблицы или столбца при помощи методов `hasTable` и `hasColumn`:

    if (Schema::hasTable('users')) {
        //
    }

    if (Schema::hasColumn('users', 'email')) {
        //
    }

#### Подключение и Движок Хранилища (Connection & Storage Engine)

Если требуется использовать подключение, отличное от дефолтного, используйте метод `connection`:

    Schema::connection('foo')->create('users', function ($table) {
        $table->increments('id');
    });

Для установки движка таблицы, задайте свойство `engine`:

    Schema::create('users', function ($table) {
        $table->engine = 'InnoDB';

        $table->increments('id');
    });

<a name="renaming-and-dropping-tables" class="anchor"></a>
### Переименование/удаление таблиц (Renaming / Dropping Tables)

Используйте метод `rename`, чтобы переименовать существующую таблицу:

    Schema::rename($from, $to);

Используйте метод `drop` или `dropIfExists`, чтобы удалить существующую таблицу:

    Schema::drop('users');

    Schema::dropIfExists('users');

<a name="creating-columns" class="anchor"></a>
### Создание столбцов (Creating Columns)

Для изменения существующей таблицы используйте метод `table` фасада `Schema`. Подобно методу `create` метод `table` принимает два аргумента: имя таблицы и замыкание, которое получает в качестве аргумента объект. Добавление столбца в таблицу:

    Schema::table('users', function ($table) {
        $table->string('email');
    });

#### Доступные типы столбцов (Available Column Types)

Перечень доступных типов в классе конструкторе схемы:

Команда  | Описание
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

#### Модификация столбцов (Column Modifiers)

В дополнение к типам, перечисленным выше, доступны модификаторы столбцов, которые можно использовать при добавлении столбца. Добавим столбцу возможность принимать значения `NULL`:

    Schema::table('users', function ($table) {
        $table->string('email')->nullable();
    });

Ниже приведен список доступных модификаторов. Список не включает индексные модификаторы [index modifiers](#creating-indexes):

Модификатор  | Описание
------------- | -------------
`->nullable()`  |  Allow NULL values to be inserted into the column
`->default($value)`  |  Specify a "default" value for the column
`->unsigned()`  |  Set `integer` columns to `UNSIGNED`
`->first()`  |  Place the column "first" in the table (MySQL Only)
`->after('column')`  |  Place the column "after" another column (MySQL Only)

<a name="modifying-columns" class="anchor"></a>
### Изменение столбцов (Modifying Columns)

Используйте метод `change`, чтобы изменить тип существующего столбца или его атрибуты. Например, увеличим размер `name` с 25 до 50:

    Schema::table('users', function ($table) {
        $table->string('name', 50)->change();
    });

Также разрешим ячейке принимать значение `NULL`:

    Schema::table('users', function ($table) {
        $table->string('name', 50)->nullable()->change();
    });

<a name="renaming-columns" class="anchor"></a>
#### Переименование столбцов (Renaming Columns)

Используйте метод `renameColumn`, чтобы переименовать столбец:

    Schema::table('users', function ($table) {
        $table->renameColumn('from', 'to');
    });

> **Примечание:** Переименование столбцов типа `enum` на текущий момент не поддерживается.

<a name="dropping-columns" class="anchor"></a>
### Удаление столбцов (Dropping Columns)

Используйте метод `dropColumn`, чтобы удалить столбец:

    Schema::table('users', function ($table) {
        $table->dropColumn('votes');
    });

Вы также можете удалить сразу несколько столбцов:

    Schema::table('users', function ($table) {
        $table->dropColumn(['votes', 'avatar', 'location']);
    });

<a name="creating-indexes" class="anchor"></a>
### Создание индексов (Creating Indexes)

Используйте метод `unique`, чтобы создать индексы:

    $table->string('email')->unique();

Создание индекса для существующего столбца:

    $table->unique('email');

Индекс на основе нескольких столбцов:

    $table->index(['account_id', 'created_at']);

October автоматически генерирует имя индекса, но можно указать его самому в качестве второго параметра:

    $table->index(['account_id', 'created_at'], 'account_created');

#### Доступные типа индексов (Available Index Types)

Команда  | Описание
------------- | -------------
`$table->primary('id');`  |  Add a primary key.
`$table->primary(['first', 'last']);`  |  Add composite keys.
`$table->unique('email');`  |  Add a unique index.
`$table->index('state');`  |  Add a basic index.

<a name="dropping-indexes" class="anchor"></a>
### Удаление индексов (Dropping Indexes)

Для удаление индекса нужно указать его имя. По умолчанию, система автоматически создает имя, соединяя название таблицы, столбца и тип индекса. Примеры:

Команда  | Описание
------------- | -------------
`$table->dropPrimary('users_id_primary');`  |  Удалить primary key из таблицы "users".
`$table->dropUnique('users_email_unique');`  |  Удалить уникальный индекс из таблицы "users".
`$table->dropIndex('geo_state_index');`  |  Удалить обычный индекс из таблицы "geo".

<a name="foreign-key-constraints" class="anchor"></a>
### Ограничения внешнего ключа (Foreign Key Constraints)

October CMS поддерживает создание внешних ключей, которые служат для обеспечения целостности данных на уровне БД. Например, определим столбец `user_id` в таблице `posts`, который ссылается на столбец `id` таблицы `users`:

    Schema::table('posts', function ($table) {
        $table->integer('user_id')->unsigned();

        $table->foreign('user_id')->references('id')->on('users');
    });


Вы можете указать имя для ограничения вручную, передав второй аргумент методу `foreign`:

    $table->foreign('user_id', 'user_foreign')
        ->references('id')
        ->on('users');

Вы также можете указать желаемое действие для свойств "on delete" и "on update":

    $table->foreign('user_id')
          ->references('id')
          ->on('users')
          ->onDelete('cascade');

Используйте метод `dropForeign`, чтобы удалить внешний ключ. Название внешнего ключа формируется аналогично названию индексов. Пример:

    $table->dropForeign('posts_user_id_foreign');

<a name="seeder-structure" class="anchor"></a>
## Структура начальных данных (Seeder structure)

По умолчанию класс-наполнитель содержит только один метод: `run` и должен расширять класс `Seeder`. Метод `run` вызывается при запуске обновления. В методе `run` Вы можете вставлять произвольные данные в БД любым удобным способом. Вы можете использовать [конструктор запросов](../database/query) для ручной вставки или использовать [модель](../database/model). Пример:

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

            $user = Db::table('users')->create([
                'email'                 => 'user@user.com',
                'login'                 => 'user',
                [...]
            ]);
        }
    }

<a name="calling-additional-seeders" class="anchor"></a>
### Вызов дополнительных наполнителей

В классе `DatabaseSeeder` можно использовать метод `call` для запуска дополнительных классов-наполнителей.м Просто передай методу желаемый класс-наполнитель для его запуска:

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
