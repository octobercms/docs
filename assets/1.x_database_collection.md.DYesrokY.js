import{_ as a,r as o,o as r,c as d,e as t,a as l,s as c}from"./chunks/framework.CXcwiNg-.js";const $=JSON.parse('{"title":"Collections - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Available methods","slug":"available-methods","link":"#available-methods","children":[]},{"level":2,"title":"Custom collections","slug":"custom-collections","link":"#custom-collections","children":[]},{"level":2,"title":"Data feed","slug":"data-feed","link":"#data-feed","children":[{"level":3,"title":"Creating a new feed","slug":"creating-a-new-feed","link":"#creating-a-new-feed","children":[]},{"level":3,"title":"Processing results","slug":"processing-results","link":"#processing-results","children":[]},{"level":3,"title":"Ordering results","slug":"ordering-results","link":"#ordering-results","children":[]}]}],"relativePath":"1.x/database/collection.md","filePath":"1.x/database/collection.md"}'),i={name:"1.x/database/collection.md"};function h(p,e,u,m,g,f){const n=o("pre-heading"),s=o("post-heading");return r(),d("div",null,[t(n),e[0]||(e[0]=l("h1",null,"Collections",-1)),t(s),e[1]||(e[1]=c(`<p>All multi-result sets returned by a model are an instance of the <code>Illuminate\\Database\\Eloquent\\Collection</code> object, including results retrieved via the <code>get</code> method or accessed via a relationship. The <code>Collection</code> object extends the <a href="./../services/collections.html">base collection</a>, so it naturally inherits dozens of methods used to fluently work with the underlying array of models.</p><p>All collections also serve as iterators, allowing you to loop over them as if they were simple PHP arrays:</p><pre><code>$users = User::where(&#39;is_active&#39;, true)-&gt;get();

foreach ($users as $user) {
    echo $user-&gt;name;
}
</code></pre><p>However, collections are much more powerful than arrays and expose a variety of map / reduce operations using an intuitive interface. For example, let&#39;s filter all active models and gather the name for each filtered user:</p><pre><code>$users = User::get();

$names = $users-&gt;filter(function ($user) {
        return $user-&gt;is_active === true;
    })
    -&gt;map(function ($user) {
        return $user-&gt;name;
    });
</code></pre><blockquote><p><strong>Note:</strong> While most model collection methods return a new instance of an <code>Eloquent</code> collection, the <code>pluck</code>, <code>keys</code>, <code>zip</code>, <code>collapse</code>, <code>flatten</code> and <code>flip</code> methods return a base collection instance. Likewise, if a <code>map</code> operation returns a collection that does not contain any models, it will be automatically cast to a base collection.</p></blockquote><h2 id="available-methods"><a href="#available-methods" class="header-anchor">#</a> Available methods</h2><p>All model collections extend the base collection object; therefore, they inherit all of the powerful methods provided by the base collection class.</p><p>In addition, the <code>Illuminate\\Database\\Eloquent\\Collection</code> class provides a superset of methods to aid with managing your model collections. Most methods return <code>Illuminate\\Database\\Eloquent\\Collection</code> instances; however, some methods return a base <code>Illuminate\\Support\\Collection</code> instance.</p><p><strong>contains($key, $operator = null, $value = null)</strong></p><p>The <code>contains</code> method may be used to determine if a given model instance is contained by the collection. This method accepts a primary key or a model instance:</p><pre><code>$users-&gt;contains(1);

$users-&gt;contains(User::find(1));
</code></pre><p><strong>diff($items)</strong></p><p>The <code>diff</code> method returns all of the models that are not present in the given collection:</p><pre><code>use App\\User;

$users = $users-&gt;diff(User::whereIn(&#39;id&#39;, [1, 2, 3])-&gt;get());
</code></pre><p><strong>except($keys)</strong></p><p>The <code>except</code> method returns all of the models that do not have the given primary keys:</p><pre><code>$users = $users-&gt;except([1, 2, 3]);
</code></pre><p><strong>find($key)</strong></p><p>The <code>find</code> method finds a model that has a given primary key. If <code>$key</code> is a model instance, <code>find</code> will attempt to return a model matching the primary key. If <code>$key</code> is an array of keys, find will return all models which match the <code>$keys</code> using <code>whereIn()</code>:</p><pre><code>$users = User::all();

$user = $users-&gt;find(1);
</code></pre><p><strong>fresh($with = [])</strong></p><p>The <code>fresh</code> method retrieves a fresh instance of each model in the collection from the database. In addition, any specified relationships will be eager loaded:</p><pre><code>$users = $users-&gt;fresh();

$users = $users-&gt;fresh(&#39;comments&#39;);
</code></pre><p><strong>intersect($items)</strong></p><p>The <code>intersect</code> method returns all of the models that are also present in the given collection:</p><pre><code>use App\\User;

$users = $users-&gt;intersect(User::whereIn(&#39;id&#39;, [1, 2, 3])-&gt;get());
</code></pre><p><strong>load($relations)</strong></p><p>The <code>load</code> method eager loads the given relationships for all models in the collection:</p><pre><code>$users-&gt;load(&#39;comments&#39;, &#39;posts&#39;);

$users-&gt;load(&#39;comments.author&#39;);
</code></pre><p><strong>loadMissing($relations)</strong></p><p>The <code>loadMissing</code> method eager loads the given relationships for all models in the collection if the relationships are not already loaded:</p><pre><code>$users-&gt;loadMissing(&#39;comments&#39;, &#39;posts&#39;);

$users-&gt;loadMissing(&#39;comments.author&#39;);
</code></pre><p><strong>modelKeys()</strong></p><p>The <code>modelKeys</code> method returns the primary keys for all models in the collection:</p><pre><code>$users-&gt;modelKeys();

// [1, 2, 3, 4, 5]
</code></pre><p><strong>makeVisible($attributes)</strong></p><p>The <code>makeVisible</code> method makes attributes visible that are typically &quot;hidden&quot; on each model in the collection:</p><pre><code>$users = $users-&gt;makeVisible([&#39;address&#39;, &#39;phone_number&#39;]);
</code></pre><p><strong>makeHidden($attributes)</strong></p><p>The <code>makeHidden</code> method hides attributes that are typically &quot;visible&quot; on each model in the collection:</p><pre><code>$users = $users-&gt;makeHidden([&#39;address&#39;, &#39;phone_number&#39;]);
</code></pre><p><strong>only($keys)</strong></p><p>The <code>only</code> method returns all of the models that have the given primary keys:</p><pre><code>$users = $users-&gt;only([1, 2, 3]);
</code></pre><p><strong>unique($key = null, $strict = false)</strong></p><p>The <code>unique</code> method returns all of the unique models in the collection. Any models of the same type with the same primary key as another model in the collection are removed.</p><pre><code>$users = $users-&gt;unique();
</code></pre><h2 id="custom-collections"><a href="#custom-collections" class="header-anchor">#</a> Custom collections</h2><p>If you need to use a custom <code>Collection</code> object with your own extension methods, you may override the <code>newCollection</code> method on your model:</p><pre><code>class User extends Model
{
    /**
     * Create a new Collection instance.
     */
    public function newCollection(array $models = [])
    {
        return new CustomCollection($models);
    }
}
</code></pre><p>Once you have defined a <code>newCollection</code> method, you will receive an instance of your custom collection anytime the model returns a <code>Collection</code> instance. If you would like to use a custom collection for every model in your plugin or application, you should override the <code>newCollection</code> method on a model base class that is extended by all of your models.</p><pre><code>use October\\Rain\\Database\\Collection as CollectionBase;

class CustomCollection extends CollectionBase
{
}
</code></pre><h2 id="data-feed"><a href="#data-feed" class="header-anchor">#</a> Data feed</h2><p>A data feed allows you to combine multiple model classes into a single collection. This can be useful for creating feeds and streams of data while supporting the use of pagination. It works by adding model objects in a prepared state, before the <code>get</code> method is called, which are then combined to make a collection that behaves the same as a regular dataset.</p><p>The <code>DataFeed</code> class mimics a regular model and supports <code>limit</code> and <code>paginate</code> methods.</p><h3 id="creating-a-new-feed"><a href="#creating-a-new-feed" class="header-anchor">#</a> Creating a new feed</h3><p>The next example will combine the User, Post and Comment models in to a single collection and returns the first 10 records.</p><pre><code>$feed = new October\\Rain\\Database\\DataFeed;
$feed-&gt;add(&#39;user&#39;, new User);
$feed-&gt;add(&#39;post&#39;, Post::where(&#39;category_id&#39;, 7));

$feed-&gt;add(&#39;comment&#39;, function() {
    $comment = new Comment;
    return $comment-&gt;where(&#39;approved&#39;, true);
});

$results = $feed-&gt;limit(10)-&gt;get();
</code></pre><h3 id="processing-results"><a href="#processing-results" class="header-anchor">#</a> Processing results</h3><p>The <code>get</code> method will return a <code>Collection</code> object that contains the results. Records can be differentiated by using the <code>tag_name</code> attribute which was set as the first parameter when the model was added.</p><pre><code>foreach ($results as $result) {

    if ($result-&gt;tag_name == &#39;post&#39;)
        echo &quot;New Blog Post: &quot; . $record-&gt;title;

    elseif ($result-&gt;tag_name == &#39;comment&#39;)
        echo &quot;New Comment: &quot; . $record-&gt;content;

    elseif ($result-&gt;tag_name == &#39;user&#39;)
        echo &quot;New User: &quot; . $record-&gt;name;

}
</code></pre><h3 id="ordering-results"><a href="#ordering-results" class="header-anchor">#</a> Ordering results</h3><p>Results can be ordered by a single database column, either shared default used by all datasets or individually specified with the <code>add</code> method. The direction of results must also be shared.</p><pre><code>// Ordered by updated_at if it exists, otherwise created_at
$feed-&gt;add(&#39;user&#39;, new User, &#39;ifnull(updated_at, created_at)&#39;);

// Ordered by id
$feed-&gt;add(&#39;comments&#39;, new Comment, &#39;id&#39;);

// Ordered by name (specified default below)
$feed-&gt;add(&#39;posts&#39;, new Post);

// Specifies the default column and the direction
$feed-&gt;orderBy(&#39;name&#39;, &#39;asc&#39;)-&gt;get();
</code></pre>`,65))])}const b=a(i,[["render",h]]);export{$ as __pageData,b as default};
