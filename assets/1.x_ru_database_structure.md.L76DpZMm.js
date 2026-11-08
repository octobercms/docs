import{_ as o,r as t,o as r,c,e as a,a as l,s}from"./chunks/framework.CXcwiNg-.js";const $=JSON.parse('{"title":"Структура базы данных и начальные данные - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Введение","slug":"введение","link":"#введение","children":[]},{"level":2,"title":"Структура миграции (Migration Structure)","slug":"структура-миграции-migration-structure","link":"#структура-миграции-migration-structure","children":[{"level":3,"title":"Создание таблиц (Creating Tables)","slug":"создание-таблиц-creating-tables","link":"#создание-таблиц-creating-tables","children":[{"level":4,"title":"Проверка существование таблицы / столбца","slug":"проверка-существование-таблицы-столбца","link":"#проверка-существование-таблицы-столбца","children":[]},{"level":4,"title":"Подключение и Движок Хранилища (Connection & Storage Engine)","slug":"подключение-и-движок-хранилища-connection-storage-engine","link":"#подключение-и-движок-хранилища-connection-storage-engine","children":[]}]},{"level":3,"title":"Переименование/удаление таблиц (Renaming / Dropping Tables)","slug":"переименование-удаление-таблиц-renaming-dropping-tables","link":"#переименование-удаление-таблиц-renaming-dropping-tables","children":[]},{"level":3,"title":"Создание столбцов (Creating Columns)","slug":"создание-столбцов-creating-columns","link":"#создание-столбцов-creating-columns","children":[{"level":4,"title":"Доступные типы столбцов (Available Column Types)","slug":"доступные-типы-столбцов-available-column-types","link":"#доступные-типы-столбцов-available-column-types","children":[]},{"level":4,"title":"Модификация столбцов (Column Modifiers)","slug":"модификация-столбцов-column-modifiers","link":"#модификация-столбцов-column-modifiers","children":[]}]},{"level":3,"title":"Изменение столбцов (Modifying Columns)","slug":"изменение-столбцов-modifying-columns","link":"#изменение-столбцов-modifying-columns","children":[{"level":4,"title":"Переименование столбцов (Renaming Columns)","slug":"переименование-столбцов-renaming-columns","link":"#переименование-столбцов-renaming-columns","children":[]}]},{"level":3,"title":"Удаление столбцов (Dropping Columns)","slug":"удаление-столбцов-dropping-columns","link":"#удаление-столбцов-dropping-columns","children":[]},{"level":3,"title":"Создание индексов (Creating Indexes)","slug":"создание-индексов-creating-indexes","link":"#создание-индексов-creating-indexes","children":[{"level":4,"title":"Доступные типа индексов (Available Index Types)","slug":"доступные-типа-индексов-available-index-types","link":"#доступные-типа-индексов-available-index-types","children":[]}]},{"level":3,"title":"Удаление индексов (Dropping Indexes)","slug":"удаление-индексов-dropping-indexes","link":"#удаление-индексов-dropping-indexes","children":[]},{"level":3,"title":"Ограничения внешнего ключа (Foreign Key Constraints)","slug":"ограничения-внешнего-ключа-foreign-key-constraints","link":"#ограничения-внешнего-ключа-foreign-key-constraints","children":[]}]},{"level":2,"title":"Структура начальных данных (Seeder structure)","slug":"структура-начальных-данных-seeder-structure","link":"#структура-начальных-данных-seeder-structure","children":[{"level":3,"title":"Вызов дополнительных наполнителей","slug":"вызов-дополнительных-наполнителеи","link":"#вызов-дополнительных-наполнителеи","children":[]}]}],"relativePath":"1.x/ru/database/structure.md","filePath":"1.x/ru/database/structure.md"}'),i={name:"1.x/ru/database/structure.md"};function u(g,e,p,m,h,b){const d=t("pre-heading"),n=t("post-heading");return r(),c("div",null,[a(d),e[0]||(e[0]=l("h1",null,"Структура базы данных и начальные данные",-1)),a(n),e[1]||(e[1]=s(`<p><a name="introduction" class="anchor"></a></p><h2 id="введение"><a href="#введение" class="header-anchor">#</a> Введение</h2><p>Миграции и начальные данные позволяют Вам изменять и заполнять таблицы в БД при помощи файла <code>version.yaml</code>, который содержит в себе информацию о версиях плагина и находится в его папке в подпапке <strong>updates</strong>. Миграции должны описывать историю изменений базы данных, и эта история может быть воспроизведена как вперед, так и назад, чтобы создавать и удалять таблицы.</p><p><a name="migration-structure" class="anchor"></a></p><h2 id="структура-миграции-migration-structure"><a href="#структура-миграции-migration-structure" class="header-anchor">#</a> Структура миграции (Migration Structure)</h2><p>Файл с миграцией должен содержать в себе класс, который является наследником класса <code>October\\Rain\\Database\\Updates\\Migration</code>, и должен содержать два публичных метода: <code>up()</code> и <code>down()</code>. Имя класса должно совпадать с именем файла. Пример:</p><pre><code>&lt;?php namespace Acme\\Blog\\Updates;

use Schema;
use October\\Rain\\Database\\Updates\\Migration;

class CreatePostsTable extends Migration
{
    public function up()
    {
        Schema::create(&#39;october_blog_posts&#39;, function($table)
        {
            $table-&gt;engine = &#39;InnoDB&#39;;
            $table-&gt;increments(&#39;id&#39;);
            $table-&gt;string(&#39;title&#39;);
            $table-&gt;string(&#39;slug&#39;)-&gt;index();
            $table-&gt;text(&#39;excerpt&#39;)-&gt;nullable();
            $table-&gt;text(&#39;content&#39;);
            $table-&gt;timestamp(&#39;published_at&#39;)-&gt;nullable();
            $table-&gt;boolean(&#39;is_published&#39;)-&gt;default(false);
            $table-&gt;timestamps();
        });
    }

    public function down()
    {
        Schema::drop(&#39;october_blog_posts&#39;);
    }
}
</code></pre><p><a name="creating-tables" class="anchor"></a></p><h3 id="создание-таблиц-creating-tables"><a href="#создание-таблиц-creating-tables" class="header-anchor">#</a> Создание таблиц (Creating Tables)</h3><p>Используйте метод <code>create</code> фасада <code>Schema</code>, чтобы создать новую таблицу. Метода принимает два аргумента: название таблицы и <code>Closure</code>:</p><pre><code>Schema::create(&#39;users&#39;, function ($table) {
    $table-&gt;increments(&#39;id&#39;);
});
</code></pre><p>Разумеется, что при создании таблицы Вы можете использовать любой из <a href="#creating-columns">методов</a> для определения столбцов таблицы.</p><h4 id="проверка-существование-таблицы-столбца"><a href="#проверка-существование-таблицы-столбца" class="header-anchor">#</a> Проверка существование таблицы / столбца</h4><p>Вы можете легко проверить существование таблицы или столбца при помощи методов <code>hasTable</code> и <code>hasColumn</code>:</p><pre><code>if (Schema::hasTable(&#39;users&#39;)) {
    //
}

if (Schema::hasColumn(&#39;users&#39;, &#39;email&#39;)) {
    //
}
</code></pre><h4 id="подключение-и-движок-хранилища-connection-storage-engine"><a href="#подключение-и-движок-хранилища-connection-storage-engine" class="header-anchor">#</a> Подключение и Движок Хранилища (Connection &amp; Storage Engine)</h4><p>Если требуется использовать подключение, отличное от дефолтного, используйте метод <code>connection</code>:</p><pre><code>Schema::connection(&#39;foo&#39;)-&gt;create(&#39;users&#39;, function ($table) {
    $table-&gt;increments(&#39;id&#39;);
});
</code></pre><p>Для установки движка таблицы, задайте свойство <code>engine</code>:</p><pre><code>Schema::create(&#39;users&#39;, function ($table) {
    $table-&gt;engine = &#39;InnoDB&#39;;

    $table-&gt;increments(&#39;id&#39;);
});
</code></pre><p><a name="renaming-and-dropping-tables" class="anchor"></a></p><h3 id="переименование-удаление-таблиц-renaming-dropping-tables"><a href="#переименование-удаление-таблиц-renaming-dropping-tables" class="header-anchor">#</a> Переименование/удаление таблиц (Renaming / Dropping Tables)</h3><p>Используйте метод <code>rename</code>, чтобы переименовать существующую таблицу:</p><pre><code>Schema::rename($from, $to);
</code></pre><p>Используйте метод <code>drop</code> или <code>dropIfExists</code>, чтобы удалить существующую таблицу:</p><pre><code>Schema::drop(&#39;users&#39;);

Schema::dropIfExists(&#39;users&#39;);
</code></pre><p><a name="creating-columns" class="anchor"></a></p><h3 id="создание-столбцов-creating-columns"><a href="#создание-столбцов-creating-columns" class="header-anchor">#</a> Создание столбцов (Creating Columns)</h3><p>Для изменения существующей таблицы используйте метод <code>table</code> фасада <code>Schema</code>. Подобно методу <code>create</code> метод <code>table</code> принимает два аргумента: имя таблицы и замыкание, которое получает в качестве аргумента объект. Добавление столбца в таблицу:</p><pre><code>Schema::table(&#39;users&#39;, function ($table) {
    $table-&gt;string(&#39;email&#39;);
});
</code></pre><h4 id="доступные-типы-столбцов-available-column-types"><a href="#доступные-типы-столбцов-available-column-types" class="header-anchor">#</a> Доступные типы столбцов (Available Column Types)</h4><p>Перечень доступных типов в классе конструкторе схемы:</p><div class="table"><table tabindex="0"><thead><tr><th>Команда</th><th>Описание</th></tr></thead><tbody><tr><td><code>$table-&gt;bigIncrements(&#39;id&#39;);</code></td><td>Incrementing ID (primary key) using a &quot;UNSIGNED BIG INTEGER&quot; equivalent.</td></tr><tr><td><code>$table-&gt;bigInteger(&#39;votes&#39;);</code></td><td>BIGINT equivalent for the database.</td></tr><tr><td><code>$table-&gt;binary(&#39;data&#39;);</code></td><td>BLOB equivalent for the database.</td></tr><tr><td><code>$table-&gt;boolean(&#39;confirmed&#39;);</code></td><td>BOOLEAN equivalent for the database.</td></tr><tr><td><code>$table-&gt;char(&#39;name&#39;, 4);</code></td><td>CHAR equivalent with a length.</td></tr><tr><td><code>$table-&gt;date(&#39;created_at&#39;);</code></td><td>DATE equivalent for the database.</td></tr><tr><td><code>$table-&gt;dateTime(&#39;created_at&#39;);</code></td><td>DATETIME equivalent for the database.</td></tr><tr><td><code>$table-&gt;decimal(&#39;amount&#39;, 5, 2);</code></td><td>DECIMAL equivalent with a precision and scale.</td></tr><tr><td><code>$table-&gt;double(&#39;column&#39;, 15, 8);</code></td><td>DOUBLE equivalent with precision, 15 digits in total and 8 after the decimal point.</td></tr><tr><td><code>$table-&gt;enum(&#39;choices&#39;, [&#39;foo&#39;, &#39;bar&#39;]);</code></td><td>ENUM equivalent for the database.</td></tr><tr><td><code>$table-&gt;float(&#39;amount&#39;);</code></td><td>FLOAT equivalent for the database.</td></tr><tr><td><code>$table-&gt;increments(&#39;id&#39;);</code></td><td>Incrementing ID (primary key) using a &quot;UNSIGNED INTEGER&quot; equivalent.</td></tr><tr><td><code>$table-&gt;integer(&#39;votes&#39;);</code></td><td>INTEGER equivalent for the database.</td></tr><tr><td><code>$table-&gt;json(&#39;options&#39;);</code></td><td>JSON equivalent for the database.</td></tr><tr><td><code>$table-&gt;jsonb(&#39;options&#39;);</code></td><td>JSONB equivalent for the database.</td></tr><tr><td><code>$table-&gt;longText(&#39;description&#39;);</code></td><td>LONGTEXT equivalent for the database.</td></tr><tr><td><code>$table-&gt;mediumInteger(&#39;numbers&#39;);</code></td><td>MEDIUMINT equivalent for the database.</td></tr><tr><td><code>$table-&gt;mediumText(&#39;description&#39;);</code></td><td>MEDIUMTEXT equivalent for the database.</td></tr><tr><td><code>$table-&gt;morphs(&#39;taggable&#39;);</code></td><td>Adds INTEGER <code>taggable_id</code> and STRING <code>taggable_type</code>.</td></tr><tr><td><code>$table-&gt;nullableTimestamps();</code></td><td>Same as <code>timestamps()</code>, except allows NULLs.</td></tr><tr><td><code>$table-&gt;rememberToken();</code></td><td>Adds <code>remember_token</code> as VARCHAR(100) NULL.</td></tr><tr><td><code>$table-&gt;smallInteger(&#39;votes&#39;);</code></td><td>SMALLINT equivalent for the database.</td></tr><tr><td><code>$table-&gt;softDeletes();</code></td><td>Adds <code>deleted_at</code> column for soft deletes.</td></tr><tr><td><code>$table-&gt;string(&#39;email&#39;);</code></td><td>VARCHAR equivalent column.</td></tr><tr><td><code>$table-&gt;string(&#39;name&#39;, 100);</code></td><td>VARCHAR equivalent with a length.</td></tr><tr><td><code>$table-&gt;text(&#39;description&#39;);</code></td><td>TEXT equivalent for the database.</td></tr><tr><td><code>$table-&gt;time(&#39;sunrise&#39;);</code></td><td>TIME equivalent for the database.</td></tr><tr><td><code>$table-&gt;tinyInteger(&#39;numbers&#39;);</code></td><td>TINYINT equivalent for the database.</td></tr><tr><td><code>$table-&gt;timestamp(&#39;added_on&#39;);</code></td><td>TIMESTAMP equivalent for the database.</td></tr><tr><td><code>$table-&gt;timestamps();</code></td><td>Adds <code>created_at</code> and <code>updated_at</code> columns.</td></tr></tbody></table></div><h4 id="модификация-столбцов-column-modifiers"><a href="#модификация-столбцов-column-modifiers" class="header-anchor">#</a> Модификация столбцов (Column Modifiers)</h4><p>В дополнение к типам, перечисленным выше, доступны модификаторы столбцов, которые можно использовать при добавлении столбца. Добавим столбцу возможность принимать значения <code>NULL</code>:</p><pre><code>Schema::table(&#39;users&#39;, function ($table) {
    $table-&gt;string(&#39;email&#39;)-&gt;nullable();
});
</code></pre><p>Ниже приведен список доступных модификаторов. Список не включает индексные модификаторы <a href="#creating-indexes">index modifiers</a>:</p><div class="table"><table tabindex="0"><thead><tr><th>Модификатор</th><th>Описание</th></tr></thead><tbody><tr><td><code>-&gt;nullable()</code></td><td>Allow NULL values to be inserted into the column</td></tr><tr><td><code>-&gt;default($value)</code></td><td>Specify a &quot;default&quot; value for the column</td></tr><tr><td><code>-&gt;unsigned()</code></td><td>Set <code>integer</code> columns to <code>UNSIGNED</code></td></tr><tr><td><code>-&gt;first()</code></td><td>Place the column &quot;first&quot; in the table (MySQL Only)</td></tr><tr><td><code>-&gt;after(&#39;column&#39;)</code></td><td>Place the column &quot;after&quot; another column (MySQL Only)</td></tr></tbody></table></div><p><a name="modifying-columns" class="anchor"></a></p><h3 id="изменение-столбцов-modifying-columns"><a href="#изменение-столбцов-modifying-columns" class="header-anchor">#</a> Изменение столбцов (Modifying Columns)</h3><p>Используйте метод <code>change</code>, чтобы изменить тип существующего столбца или его атрибуты. Например, увеличим размер <code>name</code> с 25 до 50:</p><pre><code>Schema::table(&#39;users&#39;, function ($table) {
    $table-&gt;string(&#39;name&#39;, 50)-&gt;change();
});
</code></pre><p>Также разрешим ячейке принимать значение <code>NULL</code>:</p><pre><code>Schema::table(&#39;users&#39;, function ($table) {
    $table-&gt;string(&#39;name&#39;, 50)-&gt;nullable()-&gt;change();
});
</code></pre><p><a name="renaming-columns" class="anchor"></a></p><h4 id="переименование-столбцов-renaming-columns"><a href="#переименование-столбцов-renaming-columns" class="header-anchor">#</a> Переименование столбцов (Renaming Columns)</h4><p>Используйте метод <code>renameColumn</code>, чтобы переименовать столбец:</p><pre><code>Schema::table(&#39;users&#39;, function ($table) {
    $table-&gt;renameColumn(&#39;from&#39;, &#39;to&#39;);
});
</code></pre><blockquote><p><strong>Примечание:</strong> Переименование столбцов типа <code>enum</code> на текущий момент не поддерживается.</p></blockquote><p><a name="dropping-columns" class="anchor"></a></p><h3 id="удаление-столбцов-dropping-columns"><a href="#удаление-столбцов-dropping-columns" class="header-anchor">#</a> Удаление столбцов (Dropping Columns)</h3><p>Используйте метод <code>dropColumn</code>, чтобы удалить столбец:</p><pre><code>Schema::table(&#39;users&#39;, function ($table) {
    $table-&gt;dropColumn(&#39;votes&#39;);
});
</code></pre><p>Вы также можете удалить сразу несколько столбцов:</p><pre><code>Schema::table(&#39;users&#39;, function ($table) {
    $table-&gt;dropColumn([&#39;votes&#39;, &#39;avatar&#39;, &#39;location&#39;]);
});
</code></pre><p><a name="creating-indexes" class="anchor"></a></p><h3 id="создание-индексов-creating-indexes"><a href="#создание-индексов-creating-indexes" class="header-anchor">#</a> Создание индексов (Creating Indexes)</h3><p>Используйте метод <code>unique</code>, чтобы создать индексы:</p><pre><code>$table-&gt;string(&#39;email&#39;)-&gt;unique();
</code></pre><p>Создание индекса для существующего столбца:</p><pre><code>$table-&gt;unique(&#39;email&#39;);
</code></pre><p>Индекс на основе нескольких столбцов:</p><pre><code>$table-&gt;index([&#39;account_id&#39;, &#39;created_at&#39;]);
</code></pre><p>October автоматически генерирует имя индекса, но можно указать его самому в качестве второго параметра:</p><pre><code>$table-&gt;index([&#39;account_id&#39;, &#39;created_at&#39;], &#39;account_created&#39;);
</code></pre><h4 id="доступные-типа-индексов-available-index-types"><a href="#доступные-типа-индексов-available-index-types" class="header-anchor">#</a> Доступные типа индексов (Available Index Types)</h4><div class="table"><table tabindex="0"><thead><tr><th>Команда</th><th>Описание</th></tr></thead><tbody><tr><td><code>$table-&gt;primary(&#39;id&#39;);</code></td><td>Add a primary key.</td></tr><tr><td><code>$table-&gt;primary([&#39;first&#39;, &#39;last&#39;]);</code></td><td>Add composite keys.</td></tr><tr><td><code>$table-&gt;unique(&#39;email&#39;);</code></td><td>Add a unique index.</td></tr><tr><td><code>$table-&gt;index(&#39;state&#39;);</code></td><td>Add a basic index.</td></tr></tbody></table></div><p><a name="dropping-indexes" class="anchor"></a></p><h3 id="удаление-индексов-dropping-indexes"><a href="#удаление-индексов-dropping-indexes" class="header-anchor">#</a> Удаление индексов (Dropping Indexes)</h3><p>Для удаление индекса нужно указать его имя. По умолчанию, система автоматически создает имя, соединяя название таблицы, столбца и тип индекса. Примеры:</p><div class="table"><table tabindex="0"><thead><tr><th>Команда</th><th>Описание</th></tr></thead><tbody><tr><td><code>$table-&gt;dropPrimary(&#39;users_id_primary&#39;);</code></td><td>Удалить primary key из таблицы &quot;users&quot;.</td></tr><tr><td><code>$table-&gt;dropUnique(&#39;users_email_unique&#39;);</code></td><td>Удалить уникальный индекс из таблицы &quot;users&quot;.</td></tr><tr><td><code>$table-&gt;dropIndex(&#39;geo_state_index&#39;);</code></td><td>Удалить обычный индекс из таблицы &quot;geo&quot;.</td></tr></tbody></table></div><p><a name="foreign-key-constraints" class="anchor"></a></p><h3 id="ограничения-внешнего-ключа-foreign-key-constraints"><a href="#ограничения-внешнего-ключа-foreign-key-constraints" class="header-anchor">#</a> Ограничения внешнего ключа (Foreign Key Constraints)</h3><p>October CMS поддерживает создание внешних ключей, которые служат для обеспечения целостности данных на уровне БД. Например, определим столбец <code>user_id</code> в таблице <code>posts</code>, который ссылается на столбец <code>id</code> таблицы <code>users</code>:</p><pre><code>Schema::table(&#39;posts&#39;, function ($table) {
    $table-&gt;integer(&#39;user_id&#39;)-&gt;unsigned();

    $table-&gt;foreign(&#39;user_id&#39;)-&gt;references(&#39;id&#39;)-&gt;on(&#39;users&#39;);
});
</code></pre><p>Вы можете указать имя для ограничения вручную, передав второй аргумент методу <code>foreign</code>:</p><pre><code>$table-&gt;foreign(&#39;user_id&#39;, &#39;user_foreign&#39;)
    -&gt;references(&#39;id&#39;)
    -&gt;on(&#39;users&#39;);
</code></pre><p>Вы также можете указать желаемое действие для свойств &quot;on delete&quot; и &quot;on update&quot;:</p><pre><code>$table-&gt;foreign(&#39;user_id&#39;)
      -&gt;references(&#39;id&#39;)
      -&gt;on(&#39;users&#39;)
      -&gt;onDelete(&#39;cascade&#39;);
</code></pre><p>Используйте метод <code>dropForeign</code>, чтобы удалить внешний ключ. Название внешнего ключа формируется аналогично названию индексов. Пример:</p><pre><code>$table-&gt;dropForeign(&#39;posts_user_id_foreign&#39;);
</code></pre><p><a name="seeder-structure" class="anchor"></a></p><h2 id="структура-начальных-данных-seeder-structure"><a href="#структура-начальных-данных-seeder-structure" class="header-anchor">#</a> Структура начальных данных (Seeder structure)</h2><p>По умолчанию класс-наполнитель содержит только один метод: <code>run</code> и должен расширять класс <code>Seeder</code>. Метод <code>run</code> вызывается при запуске обновления. В методе <code>run</code> Вы можете вставлять произвольные данные в БД любым удобным способом. Вы можете использовать <a href="./../database/query.html">конструктор запросов</a> для ручной вставки или использовать <a href="./../database/model.html">модель</a>. Пример:</p><pre><code>&lt;?php namespace Acme\\Users\\Updates;

use Seeder;
use Acme\\Users\\Models\\User;

class SeedUsersTable extends Seeder
{
    public function run()
    {
        $user = User::create([
            &#39;email&#39;                 =&gt; &#39;user@user.com&#39;,
            &#39;login&#39;                 =&gt; &#39;user&#39;,
            &#39;password&#39;              =&gt; &#39;user&#39;,
            &#39;password_confirmation&#39; =&gt; &#39;user&#39;,
            &#39;first_name&#39;            =&gt; &#39;Adam&#39;,
            &#39;last_name&#39;             =&gt; &#39;Person&#39;,
            &#39;is_activated&#39;          =&gt; true
        ]);

        $user = Db::table(&#39;users&#39;)-&gt;create([
            &#39;email&#39;                 =&gt; &#39;user@user.com&#39;,
            &#39;login&#39;                 =&gt; &#39;user&#39;,
            [...]
        ]);
    }
}
</code></pre><p><a name="calling-additional-seeders" class="anchor"></a></p><h3 id="вызов-дополнительных-наполнителеи"><a href="#вызов-дополнительных-наполнителеи" class="header-anchor">#</a> Вызов дополнительных наполнителей</h3><p>В классе <code>DatabaseSeeder</code> можно использовать метод <code>call</code> для запуска дополнительных классов-наполнителей.м Просто передай методу желаемый класс-наполнитель для его запуска:</p><pre><code>/**
 * Run the database seeds.
 *
 * @return void
 */
public function run()
{
    Model::unguard();

    $this-&gt;call(&#39;Acme\\Users\\Updates\\UserTableSeeder&#39;);
    $this-&gt;call(&#39;Acme\\Users\\Updates\\PostsTableSeeder&#39;);
    $this-&gt;call(&#39;Acme\\Users\\Updates\\CommentsTableSeeder&#39;);
}
</code></pre>`,89))])}const v=o(i,[["render",u]]);export{$ as __pageData,v as default};
