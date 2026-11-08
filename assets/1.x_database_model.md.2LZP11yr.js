import{_ as d,r as a,o as i,c as l,e as s,a as e,d as o,s as c}from"./chunks/framework.CXcwiNg-.js";const v=JSON.parse('{"title":"Models - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Defining models","slug":"defining-models","link":"#defining-models","children":[{"level":3,"title":"Supported properties","slug":"supported-properties","link":"#supported-properties","children":[{"level":4,"title":"Primary key","slug":"primary-key","link":"#primary-key","children":[]},{"level":4,"title":"Incrementing","slug":"incrementing","link":"#incrementing","children":[]},{"level":4,"title":"Timestamps","slug":"timestamps","link":"#timestamps","children":[]},{"level":4,"title":"Values stored as JSON","slug":"values-stored-as-json","link":"#values-stored-as-json","children":[]}]}]},{"level":2,"title":"Retrieving models","slug":"retrieving-models","link":"#retrieving-models","children":[{"level":3,"title":"Retrieving multiple models","slug":"retrieving-multiple-models","link":"#retrieving-multiple-models","children":[{"level":4,"title":"Accessing column values","slug":"accessing-column-values","link":"#accessing-column-values","children":[]},{"level":4,"title":"Adding additional constraints","slug":"adding-additional-constraints","link":"#adding-additional-constraints","children":[]},{"level":4,"title":"Collections","slug":"collections","link":"#collections","children":[]},{"level":4,"title":"Chunking results","slug":"chunking-results","link":"#chunking-results","children":[]}]},{"level":3,"title":"Retrieving a single model","slug":"retrieving-a-single-model","link":"#retrieving-a-single-model","children":[{"level":4,"title":"Not found exceptions","slug":"not-found-exceptions","link":"#not-found-exceptions","children":[]}]},{"level":3,"title":"Retrieving aggregates","slug":"retrieving-aggregates","link":"#retrieving-aggregates","children":[]}]},{"level":2,"title":"Inserting & updating models","slug":"inserting-updating-models","link":"#inserting-updating-models","children":[{"level":3,"title":"Basic inserts","slug":"basic-inserts","link":"#basic-inserts","children":[]},{"level":3,"title":"Basic updates","slug":"basic-updates","link":"#basic-updates","children":[{"level":4,"title":"Update or Insert / upsert() (Batch query to process multiple rows in one DB call)","slug":"update-or-insert-upsert-batch-query-to-process-multiple-rows-in-one-db-call","link":"#update-or-insert-upsert-batch-query-to-process-multiple-rows-in-one-db-call","children":[]}]},{"level":3,"title":"Mass assignment","slug":"mass-assignment","link":"#mass-assignment","children":[{"level":4,"title":"Other creation methods","slug":"other-creation-methods","link":"#other-creation-methods","children":[]}]}]},{"level":2,"title":"Deleting models","slug":"deleting-models","link":"#deleting-models","children":[{"level":4,"title":"Deleting an existing model by key","slug":"deleting-an-existing-model-by-key","link":"#deleting-an-existing-model-by-key","children":[]},{"level":4,"title":"Deleting models by query","slug":"deleting-models-by-query","link":"#deleting-models-by-query","children":[]}]},{"level":2,"title":"Query scopes","slug":"query-scopes","link":"#query-scopes","children":[{"level":4,"title":"Utilizing a query scope","slug":"utilizing-a-query-scope","link":"#utilizing-a-query-scope","children":[]},{"level":4,"title":"Dynamic scopes","slug":"dynamic-scopes","link":"#dynamic-scopes","children":[]}]},{"level":2,"title":"Events","slug":"events","link":"#events","children":[{"level":3,"title":"Basic usage","slug":"basic-usage","link":"#basic-usage","children":[]}]},{"level":2,"title":"Extending models","slug":"extending-models","link":"#extending-models","children":[]}],"relativePath":"1.x/database/model.md","filePath":"1.x/database/model.md"}'),h={name:"1.x/database/model.md"};function u(m,t,p,g,f,y){const n=a("pre-heading"),r=a("post-heading");return i(),l("div",null,[s(n),t[0]||(t[0]=e("h1",null,"Models",-1)),s(r),t[1]||(t[1]=e("p",null,[o("October provides a beautiful and simple Active Record implementation for working with your database, based on "),e("a",{href:"http://laravel.com/docs/eloquent",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[o("Eloquent by Laravel"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),o(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),o(),e("span",{class:"sr-only"},"(opens new window)")])]),o('. Each database table has a corresponding "Model" which is used to interact with that table. Models allow you to query for data in your tables, as well as insert new records into the table.')],-1)),t[2]||(t[2]=c(`<p>Model classes reside in the <strong>models</strong> subdirectory of a plugin directory. An example of a model directory structure:</p><pre><code>plugins/
  acme/
    blog/
      models/
        user/             &lt;=== Model config directory
          columns.yaml    &lt;=== Model config files
          fields.yaml     &lt;==^
        User.php          &lt;=== Model class
      Plugin.php
</code></pre><p>The model configuration directory could contain the model&#39;s <a href="./../backend/lists.html#defining-list-columns">list column</a> and <a href="./../backend/forms.html#defining-form-fields">form field</a> definitions. The model configuration directory name matches the model class name written in lowercase.</p><h2 id="defining-models"><a href="#defining-models" class="header-anchor">#</a> Defining models</h2><p>In most cases, you should create one model class for each database table. All model classes must extend the <code>Model</code> class. The most basic representation of a model used inside a Plugin looks like this:</p><pre><code>namespace Acme\\Blog\\Models;

use Model;

class Post extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = &#39;acme_blog_posts&#39;;
}
</code></pre><p>The <code>$table</code> protected field specifies the database table corresponding the model. The table name is a snake case name of the author, plugin and pluralized record type name.</p><h3 id="supported-properties"><a href="#supported-properties" class="header-anchor">#</a> Supported properties</h3><p>There are some standard properties that can be found on models, in addition to those provided by <a href="./traits.html">model traits</a>. For example:</p><pre><code>class User extends Model
{
    protected $primaryKey = &#39;id&#39;;

    public $exists = false;

    protected $dates = [&#39;last_seen_at&#39;];

    public $timestamps = true;

    protected $jsonable = [&#39;permissions&#39;];

    protected $guarded = [&#39;*&#39;];
}
</code></pre><div class="table"><table tabindex="0"><thead><tr><th>Property</th><th>Description</th></tr></thead><tbody><tr><td><strong>$primaryKey</strong></td><td>primary key name used to identify the model.</td></tr><tr><td><strong>$incrementing</strong></td><td>boolean that if false indicates that the primary key is not an incrementing integer value.</td></tr><tr><td><strong>$exists</strong></td><td>boolean that if true indicates that the model exists.</td></tr><tr><td><strong>$dates</strong></td><td>values are converted to an instance of Carbon/DateTime objects after fetching.</td></tr><tr><td><strong>$timestamps</strong></td><td>boolean that if true will automatically set created_at and updated_at fields.</td></tr><tr><td><strong>$jsonable</strong></td><td>values are encoded as JSON before saving and converted to arrays after fetching.</td></tr><tr><td><strong>$fillable</strong></td><td>values are fields accessible to <a href="#mass-assignment">mass assignment</a>.</td></tr><tr><td><strong>$guarded</strong></td><td>values are fields guarded from <a href="#mass-assignment">mass assignment</a>.</td></tr><tr><td><strong>$visible</strong></td><td>values are fields made visible when <a href="./../database/serialization.html">serializing the model data</a>.</td></tr><tr><td><strong>$hidden</strong></td><td>values are fields made hidden when <a href="./../database/serialization.html">serializing the model data</a>.</td></tr><tr><td><strong>$connection</strong></td><td>string that contains the <a href="./../database/basics.html#multiple-database-connections">connection name</a> that&#39;s utilised by the model by default.</td></tr></tbody></table></div><h4 id="primary-key"><a href="#primary-key" class="header-anchor">#</a> Primary key</h4><p>Models will assume that each table has a primary key column named <code>id</code>. You may define a <code>$primaryKey</code> property to override this convention.</p><pre><code>class Post extends Model
{
    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = &#39;id&#39;;
}
</code></pre><h4 id="incrementing"><a href="#incrementing" class="header-anchor">#</a> Incrementing</h4><p>Models will assume that the primary key is an incrementing integer value, which means that by default the primary key will be cast to an integer automatically. If you wish to use a non-incrementing or a non-numeric primary key you must set the public <code>$incrementing</code> property to false.</p><pre><code>class Message extends Model
{
    /**
     * The primary key for the model is not an integer.
     *
     * @var bool
     */
    public $incrementing = false;
}
</code></pre><h4 id="timestamps"><a href="#timestamps" class="header-anchor">#</a> Timestamps</h4><p>By default, a model will expect <code>created_at</code> and <code>updated_at</code> columns to exist on your tables. If you do not wish to have these columns managed automatically, set the <code>$timestamps</code> property on your model to <code>false</code>:</p><pre><code>class Post extends Model
{
    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;
}
</code></pre><p>If you need to customize the format of your timestamps, set the <code>$dateFormat</code> property on your model. This property determines how date attributes are stored in the database, as well as their format when the model is serialized to an array or JSON:</p><pre><code>class Post extends Model
{
    /**
     * The storage format of the model&#39;s date columns.
     *
     * @var string
     */
    protected $dateFormat = &#39;U&#39;;
}
</code></pre><h4 id="values-stored-as-json"><a href="#values-stored-as-json" class="header-anchor">#</a> Values stored as JSON</h4><p>When attributes names are passed to the <code>$jsonable</code> property, the values will be serialized and deserialized from the database as JSON:</p><pre><code>class Post extends Model
{
    /**
     * @var array Attribute names to encode and decode using JSON.
     */
    protected $jsonable = [&#39;data&#39;];
}
</code></pre><h2 id="retrieving-models"><a href="#retrieving-models" class="header-anchor">#</a> Retrieving models</h2><p>When requesting data from the database the model will retrieve values primarily using the <code>get</code> or <code>first</code> methods, depending on whether you wish to <a href="#retrieving-multiple-models">retrieve multiple models</a> or <a href="#retrieving-a-single-model">retrieve a single model</a> respectively. Queries that derive from a Model return an instance of <a href="./../api/october/rain/database/builder.html">October\\Rain\\Database\\Builder</a>.</p><blockquote><p><strong>Note</strong>: All model queries have <a href="./../database/query.html#in-memory-caching">in-memory caching enabled</a> by default. While the cache should automatically invalidate itself most of the time, sometimes you will need to use the <code>$model-&gt;reload()</code> method to flush the cache for more complex use cases.</p></blockquote><h3 id="retrieving-multiple-models"><a href="#retrieving-multiple-models" class="header-anchor">#</a> Retrieving multiple models</h3><p>Once you have created a model and <a href="./../database/structure.html#migration-structure">its associated database table</a>, you are ready to start retrieving data from your database. Think of each model as a powerful <a href="./../database/query.html">query builder</a> allowing you to query the database table associated with the model. For example:</p><pre><code>$flights = Flight::all();
</code></pre><h4 id="accessing-column-values"><a href="#accessing-column-values" class="header-anchor">#</a> Accessing column values</h4><p>If you have a model instance, you may access the column values of the model by accessing the corresponding property. For example, let&#39;s loop through each <code>Flight</code> instance returned by our query and echo the value of the <code>name</code> column:</p><pre><code>foreach ($flights as $flight) {
    echo $flight-&gt;name;
}
</code></pre><h4 id="adding-additional-constraints"><a href="#adding-additional-constraints" class="header-anchor">#</a> Adding additional constraints</h4><p>The <code>all</code> method will return all of the results in the model&#39;s table. Since each model serves as a <a href="./../database/query.html">query builder</a>, you may also add constraints to queries, and then use the <code>get</code> method to retrieve the results:</p><pre><code>$flights = Flight::where(&#39;active&#39;, 1)
    -&gt;orderBy(&#39;name&#39;, &#39;desc&#39;)
    -&gt;take(10)
    -&gt;get();
</code></pre><blockquote><p><strong>Note:</strong> Since models are query builders, you should familiarize yourself with all of the methods available on the <a href="./../database/query.html">query builder</a>. You may use any of these methods in your model queries.</p></blockquote><h4 id="collections"><a href="#collections" class="header-anchor">#</a> Collections</h4><p>For methods like <code>all</code> and <code>get</code> which retrieve multiple results, an instance of a <code>Collection</code> will be returned. This class provides <a href="./../database/collection.html">a variety of helpful methods</a> for working with your results. Of course, you can simply loop over this collection like an array:</p><pre><code>foreach ($flights as $flight) {
    echo $flight-&gt;name;
}
</code></pre><h4 id="chunking-results"><a href="#chunking-results" class="header-anchor">#</a> Chunking results</h4><p>If you need to process thousands of records, use the <code>chunk</code> command. The <code>chunk</code> method will retrieve a &quot;chunk&quot; of models, feeding them to a given <code>Closure</code> for processing. Using the <code>chunk</code> method will conserve memory when working with large result sets:</p><pre><code>Flight::chunk(200, function ($flights) {
    foreach ($flights as $flight) {
        //
    }
});
</code></pre><p>The first argument passed to the method is the number of records you wish to receive per &quot;chunk&quot;. The Closure passed as the second argument will be called for each chunk that is retrieved from the database.</p><h3 id="retrieving-a-single-model"><a href="#retrieving-a-single-model" class="header-anchor">#</a> Retrieving a single model</h3><p>In addition to retrieving all of the records for a given table, you may also retrieve single records using <code>find</code> and <code>first</code>. Instead of returning a collection of models, these methods return a single model instance:</p><pre><code>// Retrieve a model by its primary key
$flight = Flight::find(1);

// Retrieve the first model matching the query constraints
$flight = Flight::where(&#39;active&#39;, 1)-&gt;first();
</code></pre><h4 id="not-found-exceptions"><a href="#not-found-exceptions" class="header-anchor">#</a> Not found exceptions</h4><p>Sometimes you may wish to throw an exception if a model is not found. This is particularly useful in routes or controllers. The <code>findOrFail</code> and <code>firstOrFail</code> methods will retrieve the first result of the query. However, if no result is found, a <code>Illuminate\\Database\\Eloquent\\ModelNotFoundException</code> will be thrown:</p><pre><code>$model = Flight::findOrFail(1);

$model = Flight::where(&#39;legs&#39;, &#39;&gt;&#39;, 100)-&gt;firstOrFail();
</code></pre><p>When <a href="./../services/router.html">developing an API</a>, if the exception is not caught, a <code>404</code> HTTP response is automatically sent back to the user, so it is not necessary to write explicit checks to return <code>404</code> responses when using these methods:</p><pre><code>Route::get(&#39;/api/flights/{id}&#39;, function ($id) {
    return Flight::findOrFail($id);
});
</code></pre><h3 id="retrieving-aggregates"><a href="#retrieving-aggregates" class="header-anchor">#</a> Retrieving aggregates</h3><p>You may also use <code>count</code>, <code>sum</code>, <code>max</code>, and other <a href="./../database/query.html#aggregates">aggregate functions</a> provided by the query builder. These methods return the appropriate scalar value instead of a full model instance:</p><pre><code>$count = Flight::where(&#39;active&#39;, 1)-&gt;count();

$max = Flight::where(&#39;active&#39;, 1)-&gt;max(&#39;price&#39;);
</code></pre><h2 id="inserting-updating-models"><a href="#inserting-updating-models" class="header-anchor">#</a> Inserting &amp; updating models</h2><p>Inserting and updating data are the cornerstone feature of models, it makes the process effortless when compared to traditional SQL statements.</p><h3 id="basic-inserts"><a href="#basic-inserts" class="header-anchor">#</a> Basic inserts</h3><p>To create a new record in the database, simply create a new model instance, set attributes on the model, then call the <code>save</code> method:</p><pre><code>$flight = new Flight;
$flight-&gt;name = &#39;Sydney to Canberra&#39;;
$flight-&gt;save();
</code></pre><p>In this example, we simply create a new instance of the <code>Flight</code> model and assign the <code>name</code> attribute. When we call the <code>save</code> method, a record will be inserted into the database. The <code>created_at</code> and <code>updated_at</code> timestamps will automatically be set too, so there is no need to set them manually.</p><h3 id="basic-updates"><a href="#basic-updates" class="header-anchor">#</a> Basic updates</h3><p>The <code>save</code> method may also be used to update models that already exist in the database. To update a model, you should retrieve it, set any attributes you wish to update, and then call the <code>save</code> method. Again, the <code>updated_at</code> timestamp will automatically be updated, so there is no need to manually set its value:</p><pre><code>$flight = Flight::find(1);
$flight-&gt;name = &#39;Darwin to Adelaide&#39;;
$flight-&gt;save();
</code></pre><p>Updates can also be performed against any number of models that match a given query. In this example, all flights that are <code>active</code> and have a <code>destination</code> of <code>San Diego</code> will be marked as delayed:</p><pre><code>Flight::where(&#39;is_active&#39;, true)
    -&gt;where(&#39;destination&#39;, &#39;Perth&#39;)
    -&gt;update([&#39;delayed&#39; =&gt; true]);
</code></pre><p>The <code>update</code> method expects an array of column and value pairs representing the columns that should be updated.</p><h4 id="update-or-insert-upsert-batch-query-to-process-multiple-rows-in-one-db-call"><a href="#update-or-insert-upsert-batch-query-to-process-multiple-rows-in-one-db-call" class="header-anchor">#</a> Update or Insert / <code>upsert()</code> (Batch query to process multiple rows in one DB call)</h4><p>If you would like to perform multiple &quot;upserts&quot; in a single query, then you should use the <code>upsert</code> method instead. The method&#39;s first argument consists of the values to insert or update, while the second argument lists the column(s) that uniquely identify records within the associated table. The method&#39;s third and final argument is an array of the columns that should be updated if a matching record already exists in the database. The <code>upsert</code> method will automatically set the <code>created_at</code> and <code>updated_at</code> timestamps if timestamps are enabled on the model:</p><pre><code>MyVendor\\MyPlugin\\Models\\Flight::upsert([
    [&#39;departure&#39; =&gt; &#39;Oakland&#39;, &#39;destination&#39; =&gt; &#39;San Diego&#39;, &#39;price&#39; =&gt; 99],
    [&#39;departure&#39; =&gt; &#39;Chicago&#39;, &#39;destination&#39; =&gt; &#39;New York&#39;, &#39;price&#39; =&gt; 150]
], [&#39;departure&#39;, &#39;destination&#39;], [&#39;price&#39;]);
</code></pre><blockquote><p><strong>Note::</strong> All databases except SQL Server require the columns in the second argument of the <code>upsert</code> method to have a &quot;primary&quot; or &quot;unique&quot; index.</p></blockquote><h3 id="mass-assignment"><a href="#mass-assignment" class="header-anchor">#</a> Mass assignment</h3><p>You may also use the <code>create</code> method to save a new model in a single line. The inserted model instance will be returned to you from the method. However, before doing so, you will need to specify either a <code>fillable</code> or <code>guarded</code> attribute on the model, as all models protect against mass-assignment. Note that neither <code>fillable</code> or <code>guarded</code> affect the submission of backend forms, only the use of <code>create</code> or <code>fill</code> method.</p><p>A mass-assignment vulnerability occurs when a user passes an unexpected HTTP parameter through a request, and that parameter changes a column in your database you did not expect. For example, a malicious user might send an <code>is_admin</code> parameter through an HTTP request, which is then mapped onto your model&#39;s <code>create</code> method, allowing the user to escalate themselves to an administrator.</p><p>To get started, you should define which model attributes you want to make mass assignable. You may do this using the <code>$fillable</code> property on the model. For example, let&#39;s make the <code>name</code> attribute of our <code>Flight</code> model mass assignable:</p><pre><code>class Flight extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [&#39;name&#39;];
}
</code></pre><p>Once we have made the attributes mass assignable, we can use the <code>create</code> method to insert a new record in the database. The <code>create</code> method returns the saved model instance:</p><pre><code>$flight = Flight::create([&#39;name&#39; =&gt; &#39;Flight 10&#39;]);
</code></pre><p>While <code>$fillable</code> serves as a &quot;white list&quot; of attributes that should be mass assignable, you may also choose to use <code>$guarded</code>. The <code>$guarded</code> property should contain an array of attributes that you do not want to be mass assignable. All other attributes not in the array will be mass assignable. So, <code>$guarded</code> functions like a &quot;black list&quot;. Of course, you should use either <code>$fillable</code> or <code>$guarded</code> - not both:</p><pre><code>class Flight extends Model
{
    /**
     * The attributes that aren&#39;t mass assignable.
     *
     * @var array
     */
    protected $guarded = [&#39;price&#39;];
}
</code></pre><p>In the example above, all attributes <strong>except for <code>price</code></strong> will be mass assignable.</p><h4 id="other-creation-methods"><a href="#other-creation-methods" class="header-anchor">#</a> Other creation methods</h4><p>Sometimes you may wish to only instantiate a new instance of a model. You can do this using the <code>make</code> method. The <code>make</code> method will simply return a new instance without saving or creating anything.</p><pre><code>$flight = Flight::make([&#39;name&#39; =&gt; &#39;Flight 10&#39;]);

// Functionally the same as...
$flight = new Flight;
$flight-&gt;fill([&#39;name&#39; =&gt; &#39;Flight 10&#39;]);
</code></pre><p>There are two other methods you may use to create models by mass assigning attributes: <code>firstOrCreate</code> and <code>firstOrNew</code>. The <code>firstOrCreate</code> method will attempt to locate a database record using the given column / value pairs. If the model can not be found in the database, a record will be inserted with the given attributes.</p><p>The <code>firstOrNew</code> method, like <code>firstOrCreate</code> will attempt to locate a record in the database matching the given attributes. However, if a model is not found, a new model instance will be returned. Note that the model returned by <code>firstOrNew</code> has not yet been persisted to the database. You will need to call <code>save</code> manually to persist it:</p><pre><code>// Retrieve the flight by the attributes, otherwise create it
$flight = Flight::firstOrCreate([&#39;name&#39; =&gt; &#39;Flight 10&#39;]);

// Retrieve the flight by the attributes, or instantiate a new instance
$flight = Flight::firstOrNew([&#39;name&#39; =&gt; &#39;Flight 10&#39;]);
</code></pre><h2 id="deleting-models"><a href="#deleting-models" class="header-anchor">#</a> Deleting models</h2><p>To delete a model, call the <code>delete</code> method on a model instance:</p><pre><code>$flight = Flight::find(1);

$flight-&gt;delete();
</code></pre><h4 id="deleting-an-existing-model-by-key"><a href="#deleting-an-existing-model-by-key" class="header-anchor">#</a> Deleting an existing model by key</h4><p>In the example above, we are retrieving the model from the database before calling the <code>delete</code> method. However, if you know the primary key of the model, you may delete the model without retrieving it. To do so, call the <code>destroy</code> method:</p><pre><code>Flight::destroy(1);

Flight::destroy([1, 2, 3]);

Flight::destroy(1, 2, 3);
</code></pre><h4 id="deleting-models-by-query"><a href="#deleting-models-by-query" class="header-anchor">#</a> Deleting models by query</h4><p>You may also run a delete query on a set of models. In this example, we will delete all flights that are marked as inactive:</p><pre><code>$deletedRows = Flight::where(&#39;active&#39;, 0)-&gt;delete();
</code></pre><blockquote><p><strong>Note</strong>: It is important to mention that <a href="#model-events">model events</a> will not fire when deleting records directly from a query.</p></blockquote><h2 id="query-scopes"><a href="#query-scopes" class="header-anchor">#</a> Query scopes</h2><p>Scopes allow you to define common sets of constraints that you may easily re-use throughout your application. For example, you may need to frequently retrieve all users that are considered &quot;popular&quot;. To define a scope, simply prefix a model method with <code>scope</code>:</p><pre><code>class User extends Model
{
    /**
     * Scope a query to only include popular users.
     */
    public function scopePopular($query)
    {
        return $query-&gt;where(&#39;votes&#39;, &#39;&gt;&#39;, 100);
    }

    /**
     * Scope a query to only include active users.
     */
    public function scopeActive($query)
    {
        return $query-&gt;where(&#39;is_active&#39;, 1);
    }
}
</code></pre><h4 id="utilizing-a-query-scope"><a href="#utilizing-a-query-scope" class="header-anchor">#</a> Utilizing a query scope</h4><p>Once the scope has been defined, you may call the scope methods when querying the model. However, you do not need to include the <code>scope</code> prefix when calling the method. You can even chain calls to various scopes, for example:</p><pre><code>$users = User::popular()-&gt;active()-&gt;orderBy(&#39;created_at&#39;)-&gt;get();
</code></pre><h4 id="dynamic-scopes"><a href="#dynamic-scopes" class="header-anchor">#</a> Dynamic scopes</h4><p>Sometimes you may wish to define a scope that accepts parameters. To get started, just add your additional parameters to your scope. Scope parameters should be defined after the <code>$query</code> argument:</p><pre><code>class User extends Model
{
    /**
     * Scope a query to only include users of a given type.
     */
    public function scopeApplyType($query, $type)
    {
        return $query-&gt;where(&#39;type&#39;, $type);
    }
}
</code></pre><p>Now you may pass the parameters when calling the scope:</p><pre><code>$users = User::applyType(&#39;admin&#39;)-&gt;get();
</code></pre><h2 id="events"><a href="#events" class="header-anchor">#</a> Events</h2><p>Models fire several events, allowing you to hook into various points in the model&#39;s lifecycle. Events allow you to easily execute code each time a specific model class is saved or updated in the database. Events are defined by overriding special methods in the class, the following method overrides are available:</p><div class="table"><table tabindex="0"><thead><tr><th>Event</th><th>Description</th></tr></thead><tbody><tr><td><strong>beforeCreate</strong></td><td>before the model is saved, when first created.</td></tr><tr><td><strong>afterCreate</strong></td><td>after the model is saved, when first created.</td></tr><tr><td><strong>beforeSave</strong></td><td>before the model is saved, either created or updated.</td></tr><tr><td><strong>afterSave</strong></td><td>after the model is saved, either created or updated.</td></tr><tr><td><strong>beforeValidate</strong></td><td>before the supplied model data is validated.</td></tr><tr><td><strong>afterValidate</strong></td><td>after the supplied model data has been validated.</td></tr><tr><td><strong>beforeUpdate</strong></td><td>before an existing model is saved.</td></tr><tr><td><strong>afterUpdate</strong></td><td>after an existing model is saved.</td></tr><tr><td><strong>beforeDelete</strong></td><td>before an existing model is deleted.</td></tr><tr><td><strong>afterDelete</strong></td><td>after an existing model is deleted.</td></tr><tr><td><strong>beforeRestore</strong></td><td>before a soft-deleted model is restored.</td></tr><tr><td><strong>afterRestore</strong></td><td>after a soft-deleted model has been restored.</td></tr><tr><td><strong>beforeFetch</strong></td><td>before an existing model is populated.</td></tr><tr><td><strong>afterFetch</strong></td><td>after an existing model has been populated.</td></tr></tbody></table></div><p>An example of using an event:</p><pre><code>/**
 * Generate a URL slug for this model
 */
public function beforeCreate()
{
    $this-&gt;slug = Str::slug($this-&gt;name);
}
</code></pre><blockquote><p><strong>Note:</strong> Relationships created with <a href="./relations.html#deferred-binding">deferred-binding</a> (i.e: file attachments) will not be available in the <code>afterSave</code> model event if they have not been committed yet. To access uncommitted bindings, use the <code>withDeferred($sessionKey)</code> method on the relation. Example: <code>$this-&gt;images()-&gt;withDeferred(post(&#39;_session_key&#39;))-&gt;get();</code></p></blockquote><h3 id="basic-usage"><a href="#basic-usage" class="header-anchor">#</a> Basic usage</h3><p>Whenever a new model is saved for the first time, the <code>beforeCreate</code> and <code>afterCreate</code> events will fire. If a model already existed in the database and the <code>save</code> method is called, the <code>beforeUpdate</code> / <code>afterUpdate</code> events will fire. However, in both cases, the <code>beforeSave</code> / <code>afterSave</code> events will fire.</p><p>For example, let&#39;s define an event listener that populates the slug attribute when a model is first created:</p><pre><code>/**
 * Generate a URL slug for this model
 */
public function beforeCreate()
{
    $this-&gt;slug = Str::slug($this-&gt;name);
}
</code></pre><p>Returning <code>false</code> from an event will cancel the <code>save</code> / <code>update</code> operation:</p><pre><code>public function beforeCreate()
{
    if (!$user-&gt;isValid()) {
        return false;
    }
}
</code></pre><p>It&#39;s possible to access old values using the <code>original</code> attribute. For example:</p><pre><code>public function afterUpdate()
{
    if ($this-&gt;title != $this-&gt;original[&#39;title&#39;]) {
        // title changed
    }
}
</code></pre><p>You can externally bind to <a href="./../services/events.html">local events</a> for a single instance of a model using the <code>bindEvent</code> method. The event name should be the same as the method override name, prefixed with <code>model.</code>.</p><pre><code>$flight = new Flight;
$flight-&gt;bindEvent(&#39;model.beforeCreate&#39;, function() use ($model) {
    $model-&gt;slug = Str::slug($model-&gt;name);
})
</code></pre><h2 id="extending-models"><a href="#extending-models" class="header-anchor">#</a> Extending models</h2><p>Since models are <a href="./../services/behaviors.html">equipped to use behaviors</a>, they can be extended with the static <code>extend</code> method. The method takes a closure and passes the model object into it.</p><p>Inside the closure you can add relations to the model. Here we extend the <code>Backend\\Models\\User</code> model to include a profile (has one) relationship referencing the <code>Acme\\Demo\\Models\\Profile</code> model.</p><pre><code>\\Backend\\Models\\User::extend(function($model) {
    $model-&gt;hasOne[&#39;profile&#39;] = [&#39;Acme\\Demo\\Models\\Profile&#39;, &#39;key&#39; =&gt; &#39;user_id&#39;];
});
</code></pre><p>This approach can also be used to bind to <a href="#events">local events</a>, the following code listens for the <code>model.beforeSave</code> event.</p><pre><code>\\Backend\\Models\\User::extend(function($model) {
    $model-&gt;bindEvent(&#39;model.beforeSave&#39;, function() use ($model) {
        // ...
    });
});
</code></pre><blockquote><p><strong>Note:</strong> Typically the best place to place code is within your plugin registration class <code>boot</code> method as this will be run on every request ensuring that the extensions you make to the model are available everywhere.</p></blockquote><p>Additionally, a few methods exist to extend protected model properties.</p><pre><code>\\Backend\\Models\\User::extend(function($model) {
    // add cast attributes
    $model-&gt;addCasts([
        &#39;some_extended_field&#39; =&gt; &#39;int&#39;,
    ]);

    // add a date attribute
    $model-&gt;addDateAttribute(&#39;updated_at&#39;);

    // add fillable or jsonable fields
    // these methods accept one or more strings, or an array of strings
    $model-&gt;addFillable(&#39;first_name&#39;);
    $model-&gt;addJsonable(&#39;some_data&#39;);
});
</code></pre>`,134))])}const w=d(h,[["render",u]]);export{v as __pageData,w as default};
