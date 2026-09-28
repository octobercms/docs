import{_ as n,r,o as s,c as d,e as a,a as l,s as i}from"./chunks/framework.CXcwiNg-.js";const y=JSON.parse('{"title":"Behaviors - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Purgeable","slug":"purgeable","link":"#purgeable","children":[]},{"level":2,"title":"Sortable","slug":"sortable","link":"#sortable","children":[]}],"relativePath":"1.x/database/behaviors.md","filePath":"1.x/database/behaviors.md"}'),c={name:"1.x/database/behaviors.md"};function p(h,e,m,b,u,g){const o=r("pre-heading"),t=r("post-heading");return s(),d("div",null,[a(o),e[0]||(e[0]=l("h1",null,"Behaviors",-1)),a(t),e[1]||(e[1]=i(`<p>Model behaviors are used to implement common functionality. Unlike <a href="./traits.html">Traits</a> these can be implemented either directly in a class or by extending the class. You can read more about behaviors <a href="./../services/behaviors.html">here</a>.</p><h2 id="purgeable"><a href="#purgeable" class="header-anchor">#</a> Purgeable</h2><p>Purged attributes will not be saved to the database when a model is created or updated. To purge attributes in your model, implement the <code>October.Rain.Database.Behaviors.Purgeable</code> behavior and declare a <code>$purgeable</code> property with an array containing the attributes to purge.</p><pre><code>class User extends Model
{
    public $implement = [
        &#39;October.Rain.Database.Behaviors.Purgeable&#39;
    ];

    /**
     * @var array List of attributes to purge.
     */
    public $purgeable = [];
}
</code></pre><p>You can also dynamically implement this behavior in a class.</p><pre><code>/**
 * Extend the RainLab.User user model to implement the purgeable behavior.
 */
RainLab\\User\\Models\\User::extend(function($model) {

    // Implement the purgeable behavior dynamically
    $model-&gt;implement[] = &#39;October.Rain.Database.Behaviors.Purgeable&#39;;

    // Declare the purgeable property dynamically for the purgeable behavior to use
    $model-&gt;addDynamicProperty(&#39;purgeable&#39;, []);
});
</code></pre><p>The defined attributes will be purged when the model is saved, before the <a href="#model-events">model events</a> are triggered, including validation. Use the <code>getOriginalPurgeValue</code> to find a value that was purged.</p><pre><code>return $user-&gt;getOriginalPurgeValue($propertyName);
</code></pre><h2 id="sortable"><a href="#sortable" class="header-anchor">#</a> Sortable</h2><p>Sorted models will store a number value in <code>sort_order</code> which maintains the sort order of each individual model in a collection. To store a sort order for your models, implement the <code>October\\Rain\\Database\\Behaviors\\Sortable</code> behavior and ensure that your schema has a column defined for it to use (example: <code>$table-&gt;integer(&#39;sort_order&#39;)-&gt;default(0);</code>).</p><pre><code>class User extends Model
{
    public $implement = [
        &#39;October.Rain.Database.Behaviors.Sortable&#39;
    ];
}
</code></pre><p>You can also dynamically implement this behavior in a class.</p><pre><code>/**
 * Extend the RainLab.User user model to implement the sortable behavior.
 */
RainLab\\User\\Models\\User::extend(function($model) {

    // Implement the sortable behavior dynamically
    $model-&gt;implement[] = &#39;October.Rain.Database.Behaviors.Sortable&#39;;
});
</code></pre><p>You may modify the key name used to identify the sort order by defining the <code>SORT_ORDER</code> constant:</p><pre><code>const SORT_ORDER = &#39;my_sort_order_column&#39;;
</code></pre><p>Use the <code>setSortableOrder</code> method to set the orders on a single record or multiple records.</p><pre><code>// Sets the order of the user to 1...
$user-&gt;setSortableOrder($user-&gt;id, 1);

// Sets the order of records 1, 2, 3 to 3, 2, 1 respectively...
$user-&gt;setSortableOrder([1, 2, 3], [3, 2, 1]);
</code></pre><blockquote><p><strong>Note:</strong> If implementing this behavior in a model where data (rows) already existed previously, the data set may need to be initialized before this behavior will work correctly. To do so, either manually update each row&#39;s <code>sort_order</code> column or run a query against the data to copy the record&#39;s <code>id</code> column to the <code>sort_order</code> column (ex. <code>UPDATE myvendor_myplugin_mymodelrecords SET sort_order = id</code>).</p></blockquote>`,18))])}const _=n(c,[["render",p]]);export{y as __pageData,_ as default};
