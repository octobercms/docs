import{_ as r,r as o,o as s,c as i,e as t,a as d,s as l}from"./chunks/framework.CXcwiNg-.js";const b=JSON.parse('{"title":"Serialization - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Basic usage","slug":"basic-usage","link":"#basic-usage","children":[{"level":4,"title":"Converting a model to an array","slug":"converting-a-model-to-an-array","link":"#converting-a-model-to-an-array","children":[]},{"level":4,"title":"Converting a model to JSON","slug":"converting-a-model-to-json","link":"#converting-a-model-to-json","children":[]}]},{"level":2,"title":"Hiding attributes from JSON","slug":"hiding-attributes-from-json","link":"#hiding-attributes-from-json","children":[]},{"level":2,"title":"Appending values to JSON","slug":"appending-values-to-json","link":"#appending-values-to-json","children":[]}],"relativePath":"1.x/database/serialization.md","filePath":"1.x/database/serialization.md"}'),c={name:"1.x/database/serialization.md"};function h(p,e,u,m,g,y){const a=o("pre-heading"),n=o("post-heading");return s(),i("div",null,[t(a),e[0]||(e[0]=d("h1",null,"Serialization",-1)),t(n),e[1]||(e[1]=l(`<p>When building JSON APIs, you will often need to convert your models and relationships to arrays or JSON. Models includes convenient methods for making these conversions, as well as controlling which attributes are included in your serializations.</p><h2 id="basic-usage"><a href="#basic-usage" class="header-anchor">#</a> Basic usage</h2><h4 id="converting-a-model-to-an-array"><a href="#converting-a-model-to-an-array" class="header-anchor">#</a> Converting a model to an array</h4><p>To convert a model and its loaded <a href="./relations.html">relationships</a> to an array, you may use the <code>toArray</code> method. This method is recursive, so all attributes and all relations (including the relations of relations) will be converted to arrays:</p><pre><code>$user = User::with(&#39;roles&#39;)-&gt;first();

return $user-&gt;toArray();
</code></pre><p>You may also convert <a href="./collections.html">collections</a> to arrays:</p><pre><code>$users = User::all();

return $users-&gt;toArray();
</code></pre><h4 id="converting-a-model-to-json"><a href="#converting-a-model-to-json" class="header-anchor">#</a> Converting a model to JSON</h4><p>To convert a model to JSON, you may use the <code>toJson</code> method. Like <code>toArray</code>, the <code>toJson</code> method is recursive, so all attributes and relations will be converted to JSON:</p><pre><code>$user = User::find(1);

return $user-&gt;toJson();
</code></pre><p>Alternatively, you may cast a model or collection to a string, which will automatically call the <code>toJson</code> method:</p><pre><code>$user = User::find(1);

return (string) $user;
</code></pre><p>Since models and collections are converted to JSON when cast to a string, you can return Model objects directly from your application&#39;s routes, AJAX handlers or controllers:</p><pre><code>Route::get(&#39;users&#39;, function () {
    return User::all();
});
</code></pre><h2 id="hiding-attributes-from-json"><a href="#hiding-attributes-from-json" class="header-anchor">#</a> Hiding attributes from JSON</h2><p>Sometimes you may wish to limit the attributes, such as passwords, that are included in your model&#39;s array or JSON representation. To do so, add a <code>$hidden</code> property definition to your model:</p><pre><code>&lt;?php namespace Acme\\Blog\\Models;

use Model;

class User extends Model
{
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [&#39;password&#39;];
}
</code></pre><p>Alternatively, you may use the <code>$visible</code> property to define a white-list of attributes that should be included in your model&#39;s array and JSON representation:</p><pre><code>class User extends Model
{
    /**
     * The attributes that should be visible in arrays.
     *
     * @var array
     */
    protected $visible = [&#39;first_name&#39;, &#39;last_name&#39;];
}
</code></pre><h2 id="appending-values-to-json"><a href="#appending-values-to-json" class="header-anchor">#</a> Appending values to JSON</h2><p>Occasionally, you may need to add array attributes that do not have a corresponding column in your database. To do so, first define an <a href="./../database/mutators.html">accessor</a> for the value:</p><pre><code>class User extends Model
{
    /**
     * Get the administrator flag for the user.
     *
     * @return bool
     */
    public function getIsAdminAttribute()
    {
        return $this-&gt;attributes[&#39;admin&#39;] == &#39;yes&#39;;
    }
}
</code></pre><p>Once you have created the accessor, add the attribute name to the <code>appends</code> property on the model:</p><pre><code>class User extends Model
{
    /**
     * The accessors to append to the model&#39;s array form.
     *
     * @var array
     */
    protected $appends = [&#39;is_admin&#39;];
}
</code></pre><p>Once the attribute has been added to the <code>appends</code> list, it will be included in both the model&#39;s array and JSON forms. Attributes in the <code>appends</code> array will also respect the <code>visible</code> and <code>hidden</code> settings configured on the model.</p>`,25))])}const f=r(c,[["render",h]]);export{b as __pageData,f as default};
