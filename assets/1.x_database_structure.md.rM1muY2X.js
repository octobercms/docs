import{_ as d,r as t,o as r,c as s,e as a,a as i,s as l}from"./chunks/framework.CXcwiNg-.js";const y=JSON.parse('{"title":"Structure & Seeding - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Migration structure","slug":"migration-structure","link":"#migration-structure","children":[{"level":3,"title":"Creating tables","slug":"creating-tables","link":"#creating-tables","children":[{"level":4,"title":"Checking for table / column existence","slug":"checking-for-table-column-existence","link":"#checking-for-table-column-existence","children":[]},{"level":4,"title":"Connection & storage engine","slug":"connection-storage-engine","link":"#connection-storage-engine","children":[]}]},{"level":3,"title":"Renaming / dropping tables","slug":"renaming-dropping-tables","link":"#renaming-dropping-tables","children":[]},{"level":3,"title":"Creating columns","slug":"creating-columns","link":"#creating-columns","children":[{"level":4,"title":"Available Column Types","slug":"available-column-types","link":"#available-column-types","children":[]},{"level":4,"title":"Column modifiers","slug":"column-modifiers","link":"#column-modifiers","children":[]}]},{"level":3,"title":"Modifying columns","slug":"modifying-columns","link":"#modifying-columns","children":[{"level":4,"title":"Renaming columns","slug":"renaming-columns","link":"#renaming-columns","children":[]}]},{"level":3,"title":"Dropping columns","slug":"dropping-columns","link":"#dropping-columns","children":[]},{"level":3,"title":"Creating indexes","slug":"creating-indexes","link":"#creating-indexes","children":[{"level":4,"title":"Available index types","slug":"available-index-types","link":"#available-index-types","children":[]}]},{"level":3,"title":"Dropping indexes","slug":"dropping-indexes","link":"#dropping-indexes","children":[]},{"level":3,"title":"Foreign key constraints","slug":"foreign-key-constraints","link":"#foreign-key-constraints","children":[]}]},{"level":2,"title":"Seeder structure","slug":"seeder-structure","link":"#seeder-structure","children":[{"level":3,"title":"Calling additional seeders","slug":"calling-additional-seeders","link":"#calling-additional-seeders","children":[]}]}],"relativePath":"1.x/database/structure.md","filePath":"1.x/database/structure.md"}'),c={name:"1.x/database/structure.md"};function u(h,e,m,p,g,b){const o=t("pre-heading"),n=t("post-heading");return r(),s("div",null,[a(o),e[0]||(e[0]=i("h1",null,"Structure & Seeding",-1)),a(n),e[1]||(e[1]=l(`<p>Migrations and seed files allow you to build, modify and populate database tables. They are primarily used by a <a href="./../plugin/updates.html">plugin update file</a> and are paired with the version history of a plugin. All classes are stored in the <code>updates</code> directory of a plugin. Migrations should tell a story about your database history and this story can be played both forwards and backwards to build up and tear down the tables.</p><h2 id="migration-structure"><a href="#migration-structure" class="header-anchor">#</a> Migration structure</h2><p>A migration file should define a class that extends the <code>October\\Rain\\Database\\Updates\\Migration</code> class and contains two methods: <code>up</code> and <code>down</code>. The <code>up</code> method is used to add new tables, columns, or indexes to your database, while the <code>down</code> method should simply reverse the operations performed by the <code>up</code> method. Within both of these methods you may use the <a href="#creating-tables">schema builder</a> to expressively create and modify tables. For example, let&#39;s look at a sample migration that creates a <code>october_blog_posts</code> table:</p><pre><code>&lt;?php namespace Acme\\Blog\\Updates;

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
</code></pre><h3 id="creating-tables"><a href="#creating-tables" class="header-anchor">#</a> Creating tables</h3><p>To create a new database table, use the <code>create</code> method on the <code>Schema</code> facade. The <code>create</code> method accepts two arguments. The first is the name of the table, while the second is a <code>Closure</code> which receives an object used to define the new table:</p><pre><code>Schema::create(&#39;users&#39;, function ($table) {
    $table-&gt;increments(&#39;id&#39;);
});
</code></pre><p>Of course, when creating the table, you may use any of the schema builder&#39;s <a href="#creating-columns">column methods</a> to define the table&#39;s columns.</p><h4 id="checking-for-table-column-existence"><a href="#checking-for-table-column-existence" class="header-anchor">#</a> Checking for table / column existence</h4><p>You may easily check for the existence of a table or column using the <code>hasTable</code> and <code>hasColumn</code> methods:</p><pre><code>if (Schema::hasTable(&#39;users&#39;)) {
    //
}

if (Schema::hasColumn(&#39;users&#39;, &#39;email&#39;)) {
    //
}
</code></pre><h4 id="connection-storage-engine"><a href="#connection-storage-engine" class="header-anchor">#</a> Connection &amp; storage engine</h4><p>If you want to perform a schema operation on a database connection that is not your default connection, use the <code>connection</code> method:</p><pre><code>Schema::connection(&#39;foo&#39;)-&gt;create(&#39;users&#39;, function ($table) {
    $table-&gt;increments(&#39;id&#39;);
});
</code></pre><p>To set the storage engine for a table, set the <code>engine</code> property on the schema builder:</p><pre><code>Schema::create(&#39;users&#39;, function ($table) {
    $table-&gt;engine = &#39;InnoDB&#39;;

    $table-&gt;increments(&#39;id&#39;);
});
</code></pre><h3 id="renaming-dropping-tables"><a href="#renaming-dropping-tables" class="header-anchor">#</a> Renaming / dropping tables</h3><p>To rename an existing database table, use the <code>rename</code> method:</p><pre><code>Schema::rename($from, $to);
</code></pre><p>To drop an existing table, you may use the <code>drop</code> or <code>dropIfExists</code> methods:</p><pre><code>Schema::drop(&#39;users&#39;);

Schema::dropIfExists(&#39;users&#39;);
</code></pre><h3 id="creating-columns"><a href="#creating-columns" class="header-anchor">#</a> Creating columns</h3><p>To update an existing table, we will use the <code>table</code> method on the <code>Schema</code> facade. Like the <code>create</code> method, the <code>table</code> method accepts two arguments, the name of the table and a <code>Closure</code> that receives an object we can use to add columns to the table:</p><pre><code>Schema::table(&#39;users&#39;, function ($table) {
    $table-&gt;string(&#39;email&#39;);
});
</code></pre><h4 id="available-column-types"><a href="#available-column-types" class="header-anchor">#</a> Available Column Types</h4><p>Of course, the schema builder contains a variety of column types that you may use when building your tables:</p><div class="table"><table tabindex="0"><thead><tr><th>Command</th><th>Description</th></tr></thead><tbody><tr><td><code>$table-&gt;bigIncrements(&#39;id&#39;);</code></td><td>Incrementing ID (primary key) using a &quot;UNSIGNED BIG INTEGER&quot; equivalent.</td></tr><tr><td><code>$table-&gt;bigInteger(&#39;votes&#39;);</code></td><td>BIGINT equivalent for the database.</td></tr><tr><td><code>$table-&gt;binary(&#39;data&#39;);</code></td><td>BLOB equivalent for the database.</td></tr><tr><td><code>$table-&gt;boolean(&#39;confirmed&#39;);</code></td><td>BOOLEAN equivalent for the database.</td></tr><tr><td><code>$table-&gt;char(&#39;name&#39;, 4);</code></td><td>CHAR equivalent with a length.</td></tr><tr><td><code>$table-&gt;date(&#39;created_at&#39;);</code></td><td>DATE equivalent for the database.</td></tr><tr><td><code>$table-&gt;dateTime(&#39;created_at&#39;);</code></td><td>DATETIME equivalent for the database.</td></tr><tr><td><code>$table-&gt;decimal(&#39;amount&#39;, 5, 2);</code></td><td>DECIMAL equivalent with a precision and scale.</td></tr><tr><td><code>$table-&gt;double(&#39;column&#39;, 15, 8);</code></td><td>DOUBLE equivalent with precision, 15 digits in total and 8 after the decimal point.</td></tr><tr><td><code>$table-&gt;enum(&#39;choices&#39;, [&#39;foo&#39;, &#39;bar&#39;]);</code></td><td>ENUM equivalent for the database.</td></tr><tr><td><code>$table-&gt;float(&#39;amount&#39;);</code></td><td>FLOAT equivalent for the database.</td></tr><tr><td><code>$table-&gt;increments(&#39;id&#39;);</code></td><td>Incrementing ID (primary key) using a &quot;UNSIGNED INTEGER&quot; equivalent.</td></tr><tr><td><code>$table-&gt;integer(&#39;votes&#39;);</code></td><td>INTEGER equivalent for the database.</td></tr><tr><td><code>$table-&gt;json(&#39;options&#39;);</code></td><td>JSON equivalent for the database.</td></tr><tr><td><code>$table-&gt;jsonb(&#39;options&#39;);</code></td><td>JSONB equivalent for the database.</td></tr><tr><td><code>$table-&gt;longText(&#39;description&#39;);</code></td><td>LONGTEXT equivalent for the database.</td></tr><tr><td><code>$table-&gt;mediumInteger(&#39;numbers&#39;);</code></td><td>MEDIUMINT equivalent for the database.</td></tr><tr><td><code>$table-&gt;mediumText(&#39;description&#39;);</code></td><td>MEDIUMTEXT equivalent for the database.</td></tr><tr><td><code>$table-&gt;morphs(&#39;taggable&#39;);</code></td><td>Adds INTEGER <code>taggable_id</code> and STRING <code>taggable_type</code>.</td></tr><tr><td><code>$table-&gt;nullableTimestamps();</code></td><td>Same as <code>timestamps()</code>, except allows NULLs.</td></tr><tr><td><code>$table-&gt;rememberToken();</code></td><td>Adds <code>remember_token</code> as VARCHAR(100) NULL.</td></tr><tr><td><code>$table-&gt;smallInteger(&#39;votes&#39;);</code></td><td>SMALLINT equivalent for the database.</td></tr><tr><td><code>$table-&gt;softDeletes();</code></td><td>Adds <code>deleted_at</code> column for soft deletes.</td></tr><tr><td><code>$table-&gt;string(&#39;email&#39;);</code></td><td>VARCHAR equivalent column.</td></tr><tr><td><code>$table-&gt;string(&#39;name&#39;, 100);</code></td><td>VARCHAR equivalent with a length.</td></tr><tr><td><code>$table-&gt;text(&#39;description&#39;);</code></td><td>TEXT equivalent for the database.</td></tr><tr><td><code>$table-&gt;time(&#39;sunrise&#39;);</code></td><td>TIME equivalent for the database.</td></tr><tr><td><code>$table-&gt;tinyInteger(&#39;numbers&#39;);</code></td><td>TINYINT equivalent for the database.</td></tr><tr><td><code>$table-&gt;timestamp(&#39;added_on&#39;);</code></td><td>TIMESTAMP equivalent for the database.</td></tr><tr><td><code>$table-&gt;timestamps();</code></td><td>Adds <code>created_at</code> and <code>updated_at</code> columns.</td></tr></tbody></table></div><h4 id="column-modifiers"><a href="#column-modifiers" class="header-anchor">#</a> Column modifiers</h4><p>In addition to the column types listed above, there are several other column &quot;modifiers&quot; which you may use while adding the column. For example, to make the column &quot;nullable&quot;, you may use the <code>nullable</code> method:</p><pre><code>Schema::table(&#39;users&#39;, function ($table) {
    $table-&gt;string(&#39;email&#39;)-&gt;nullable();
});
</code></pre><p>Below is a list of all the available column modifiers. This list does not include the <a href="#creating-indexes">index modifiers</a>:</p><div class="table"><table tabindex="0"><thead><tr><th>Modifier</th><th>Description</th></tr></thead><tbody><tr><td><code>-&gt;nullable()</code></td><td>Allow NULL values to be inserted into the column</td></tr><tr><td><code>-&gt;default($value)</code></td><td>Specify a &quot;default&quot; value for the column</td></tr><tr><td><code>-&gt;unsigned()</code></td><td>Set <code>integer</code> columns to <code>UNSIGNED</code></td></tr><tr><td><code>-&gt;first()</code></td><td>Place the column &quot;first&quot; in the table (MySQL Only)</td></tr><tr><td><code>-&gt;after(&#39;column&#39;)</code></td><td>Place the column &quot;after&quot; another column (MySQL Only)</td></tr><tr><td><code>-&gt;comment(&#39;my comment&#39;)</code></td><td>Add a comment to a column (MySQL Only)</td></tr></tbody></table></div><h3 id="modifying-columns"><a href="#modifying-columns" class="header-anchor">#</a> Modifying columns</h3><p>The <code>change</code> method allows you to modify an existing column to a new type, or modify the column&#39;s attributes. For example, you may wish to increase the size of a string column. To see the <code>change</code> method in action, let&#39;s increase the size of the <code>name</code> column from 25 to 50:</p><pre><code>Schema::table(&#39;users&#39;, function ($table) {
    $table-&gt;string(&#39;name&#39;, 50)-&gt;change();
});
</code></pre><p>We could also modify a column to be nullable:</p><pre><code>Schema::table(&#39;users&#39;, function ($table) {
    $table-&gt;string(&#39;name&#39;, 50)-&gt;nullable()-&gt;change();
});
</code></pre><h4 id="renaming-columns"><a href="#renaming-columns" class="header-anchor">#</a> Renaming columns</h4><p>To rename a column, you may use the <code>renameColumn</code> method on the Schema builder:</p><pre><code>Schema::table(&#39;users&#39;, function ($table) {
    $table-&gt;renameColumn(&#39;from&#39;, &#39;to&#39;);
});
</code></pre><blockquote><p><strong>Note:</strong> Renaming columns in a table with a <code>enum</code> column is not currently supported.</p></blockquote><h3 id="dropping-columns"><a href="#dropping-columns" class="header-anchor">#</a> Dropping columns</h3><p>To drop a column, use the <code>dropColumn</code> method on the Schema builder:</p><pre><code>Schema::table(&#39;users&#39;, function ($table) {
    $table-&gt;dropColumn(&#39;votes&#39;);
});
</code></pre><p>You may drop multiple columns from a table by passing an array of column names to the <code>dropColumn</code> method:</p><pre><code>Schema::table(&#39;users&#39;, function ($table) {
    $table-&gt;dropColumn([&#39;votes&#39;, &#39;avatar&#39;, &#39;location&#39;]);
});
</code></pre><h3 id="creating-indexes"><a href="#creating-indexes" class="header-anchor">#</a> Creating indexes</h3><p>The schema builder supports several types of indexes. First, let&#39;s look at an example that specifies a column&#39;s values should be unique. To create the index, we can simply chain the <code>unique</code> method onto the column definition:</p><pre><code>$table-&gt;string(&#39;email&#39;)-&gt;unique();
</code></pre><p>Alternatively, you may create the index after defining the column. For example:</p><pre><code>$table-&gt;unique(&#39;email&#39;);
</code></pre><p>You may even pass an array of columns to an index method to create a compound index:</p><pre><code>$table-&gt;index([&#39;account_id&#39;, &#39;created_at&#39;]);
</code></pre><p>In most cases you should specify a name for the index manually as the second argument, to avoid the system automatically generating one that is too long:</p><pre><code>$table-&gt;index([&#39;account_id&#39;, &#39;created_at&#39;], &#39;account_created&#39;);
</code></pre><h4 id="available-index-types"><a href="#available-index-types" class="header-anchor">#</a> Available index types</h4><div class="table"><table tabindex="0"><thead><tr><th>Command</th><th>Description</th></tr></thead><tbody><tr><td><code>$table-&gt;primary(&#39;id&#39;);</code></td><td>Add a primary key.</td></tr><tr><td><code>$table-&gt;primary([&#39;first&#39;, &#39;last&#39;]);</code></td><td>Add composite keys.</td></tr><tr><td><code>$table-&gt;unique(&#39;email&#39;);</code></td><td>Add a unique index.</td></tr><tr><td><code>$table-&gt;index(&#39;state&#39;);</code></td><td>Add a basic index.</td></tr></tbody></table></div><h3 id="dropping-indexes"><a href="#dropping-indexes" class="header-anchor">#</a> Dropping indexes</h3><p>To drop an index, you must specify the index&#39;s name. If no name was specified manually, the system will automatically generate one, simply concatenate the table name, the name of the indexed column, and the index type. Here are some examples:</p><div class="table"><table tabindex="0"><thead><tr><th>Command</th><th>Description</th></tr></thead><tbody><tr><td><code>$table-&gt;dropPrimary(&#39;users_id_primary&#39;);</code></td><td>Drop a primary key from the &quot;users&quot; table.</td></tr><tr><td><code>$table-&gt;dropUnique(&#39;users_email_unique&#39;);</code></td><td>Drop a unique index from the &quot;users&quot; table.</td></tr><tr><td><code>$table-&gt;dropIndex(&#39;geo_state_index&#39;);</code></td><td>Drop a basic index from the &quot;geo&quot; table.</td></tr></tbody></table></div><h3 id="foreign-key-constraints"><a href="#foreign-key-constraints" class="header-anchor">#</a> Foreign key constraints</h3><p>There is also support for creating foreign key constraints, which are used to force referential integrity at the database level. For example, let&#39;s define a <code>user_id</code> column on the <code>posts</code> table that references the <code>id</code> column on a <code>users</code> table:</p><pre><code>Schema::table(&#39;posts&#39;, function ($table) {
    $table-&gt;integer(&#39;user_id&#39;)-&gt;unsigned();

    $table-&gt;foreign(&#39;user_id&#39;)-&gt;references(&#39;id&#39;)-&gt;on(&#39;users&#39;);
});
</code></pre><p>As before, you may specify a name for the constraint manually by passing a second argument to the <code>foreign</code> method:</p><pre><code>$table-&gt;foreign(&#39;user_id&#39;, &#39;user_foreign&#39;)
    -&gt;references(&#39;id&#39;)
    -&gt;on(&#39;users&#39;);
</code></pre><p>You may also specify the desired action for the &quot;on delete&quot; and &quot;on update&quot; properties of the constraint:</p><pre><code>$table-&gt;foreign(&#39;user_id&#39;)
      -&gt;references(&#39;id&#39;)
      -&gt;on(&#39;users&#39;)
      -&gt;onDelete(&#39;cascade&#39;);
</code></pre><p>To drop a foreign key, you may use the <code>dropForeign</code> method. Foreign key constraints use the same naming convention as indexes. So, if one is not specified manually, we will concatenate the table name and the columns in the constraint then suffix the name with &quot;_foreign&quot;:</p><pre><code>$table-&gt;dropForeign(&#39;posts_user_id_foreign&#39;);
</code></pre><h2 id="seeder-structure"><a href="#seeder-structure" class="header-anchor">#</a> Seeder structure</h2><p>Like migration files, a seeder class only contains one method by default: <code>run</code>and should extend the <code>Seeder</code> class. The <code>run</code> method is called when the update process is executed. Within this method, you may insert data into your database however you wish. You may use the <a href="./../database/query.html">query builder</a> to manually insert data or you may use your <a href="./../database/model.html">model classes</a>. In the example below, we&#39;ll create a new user using the <code>User</code> model inside the <code>run</code> method:</p><pre><code>&lt;?php namespace Acme\\Users\\Updates;

use Seeder;
use Acme\\Users\\Models\\User;

class SeedUsersTable extends Seeder
{
    public function run()
    {
        $user = User::create([
            &#39;email&#39;                 =&gt; &#39;user@example.com&#39;,
            &#39;login&#39;                 =&gt; &#39;user&#39;,
            &#39;password&#39;              =&gt; &#39;password123&#39;,
            &#39;password_confirmation&#39; =&gt; &#39;password123&#39;,
            &#39;first_name&#39;            =&gt; &#39;Actual&#39;,
            &#39;last_name&#39;             =&gt; &#39;Person&#39;,
            &#39;is_activated&#39;          =&gt; true
        ]);
    }
}
</code></pre><p>Alternatively, the same can be achieved using the <code>Db::table</code> <a href="./../database/query.html">query builder</a> method:</p><pre><code>public function run()
{
    $user = Db::table(&#39;users&#39;)-&gt;insert([
        &#39;email&#39;                 =&gt; &#39;user@example.com&#39;,
        &#39;login&#39;                 =&gt; &#39;user&#39;,
        [...]
    ]);
}
</code></pre><h3 id="calling-additional-seeders"><a href="#calling-additional-seeders" class="header-anchor">#</a> Calling additional seeders</h3><p>Within the <code>DatabaseSeeder</code> class, you may use the <code>call</code> method to execute additional seed classes. Using the <code>call</code> method allows you to break up your database seeding into multiple files so that no single seeder class becomes overwhelmingly large. Simply pass the name of the seeder class you wish to run:</p><pre><code>/**
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
</code></pre>`,77))])}const v=d(c,[["render",u]]);export{y as __pageData,v as default};
