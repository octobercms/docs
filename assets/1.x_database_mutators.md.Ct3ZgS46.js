import{_ as d,r as n,o as l,c,e as s,a as e,d as t,s as o}from"./chunks/framework.CXcwiNg-.js";const v=JSON.parse('{"title":"Mutators - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Accessors & mutators","slug":"accessors-mutators","link":"#accessors-mutators","children":[{"level":4,"title":"Defining an accessor","slug":"defining-an-accessor","link":"#defining-an-accessor","children":[]},{"level":4,"title":"Defining a mutator","slug":"defining-a-mutator","link":"#defining-a-mutator","children":[]}]},{"level":2,"title":"Date mutators","slug":"date-mutators","link":"#date-mutators","children":[]},{"level":2,"title":"Attribute casting","slug":"attribute-casting","link":"#attribute-casting","children":[{"level":4,"title":"Array casting","slug":"array-casting","link":"#array-casting","children":[]}]}],"relativePath":"1.x/database/mutators.md","filePath":"1.x/database/mutators.md"}'),u={name:"1.x/database/mutators.md"};function h(p,a,m,f,y,b){const r=n("pre-heading"),i=n("post-heading");return l(),c("div",null,[s(r),a[0]||(a[0]=e("h1",null,"Mutators",-1)),s(i),a[1]||(a[1]=e("p",null,[t("Accessors and mutators allow you to format attributes when retrieving them from a model or setting their value. For example, you may want to use the "),e("a",{href:"./../services/encryption.html"},"encryption service"),t(" to encrypt a value while it is stored in the database, and then automatically decrypt the attribute when you access it on the model.")],-1)),a[2]||(a[2]=e("p",null,[t("In addition to custom accessors and mutators, you can also automatically cast date fields to "),e("a",{href:"https://github.com/briannesbitt/Carbon",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[t("Carbon"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),t(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),t(),e("span",{class:"sr-only"},"(opens new window)")])]),t(" instances or even "),e("a",{href:"#attribute-casting"},"cast text values to JSON"),t(".")],-1)),a[3]||(a[3]=o(`<h2 id="accessors-mutators"><a href="#accessors-mutators" class="header-anchor">#</a> Accessors &amp; mutators</h2><h4 id="defining-an-accessor"><a href="#defining-an-accessor" class="header-anchor">#</a> Defining an accessor</h4><p>To define an accessor, create a <code>getFooAttribute</code> method on your model where <code>Foo</code> is the &quot;camel&quot; cased name of the column you wish to access. In this example, we&#39;ll define an accessor for the <code>first_name</code> attribute. The accessor will automatically be called when attempting to retrieve the value of <code>first_name</code>:</p><pre><code>&lt;?php namespace Acme\\Blog\\Models;

use Model;

class User extends Model
{
    /**
     * Get the user&#39;s first name.
     *
     * @param  string  $value
     * @return string
     */
    public function getFirstNameAttribute($value)
    {
        return ucfirst($value);
    }
}
</code></pre><p>As you can see, the original value of the column is passed to the accessor, allowing you to manipulate and return the value. To access the value of the accessor, you may simply access the <code>first_name</code> attribute:</p><pre><code>$user = User::find(1);

$firstName = $user-&gt;first_name;
</code></pre><h4 id="defining-a-mutator"><a href="#defining-a-mutator" class="header-anchor">#</a> Defining a mutator</h4><p>To define a mutator, define a <code>setFooAttribute</code> method on your model where <code>Foo</code> is the &quot;camel&quot; cased name of the column you wish to access. In this example, let&#39;s define a mutator for the <code>first_name</code> attribute. This mutator will be automatically called when we attempt to set the value of the <code>first_name</code> attribute on the model:</p><pre><code>&lt;?php namespace Acme\\Blog\\Models;

use Model;

class User extends Model
{
    /**
     * Set the user&#39;s first name.
     *
     * @param  string  $value
     * @return string
     */
    public function setFirstNameAttribute($value)
    {
        $this-&gt;attributes[&#39;first_name&#39;] = strtolower($value);
    }
}
</code></pre><p>The mutator will receive the value that is being set on the attribute, allowing you to manipulate the value and set the manipulated value on the model&#39;s internal <code>$attributes</code> property. For example, if we attempt to set the <code>first_name</code> attribute to <code>Sally</code>:</p><pre><code>$user = User::find(1);

$user-&gt;first_name = &#39;Sally&#39;;
</code></pre><p>Here the <code>setFirstNameAttribute</code> function will be called with the value <code>Sally</code>. The mutator will then apply the <code>strtolower</code> function to the name and set its value in the internal <code>$attributes</code> array.</p><h2 id="date-mutators"><a href="#date-mutators" class="header-anchor">#</a> Date mutators</h2>`,13)),a[4]||(a[4]=e("p",null,[t("By default, Models in October will convert the "),e("code",null,"created_at"),t(" and "),e("code",null,"updated_at"),t(" columns to instances of a "),e("a",{href:"https://github.com/briannesbitt/Carbon",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[t("Carbon"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),t(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),t(),e("span",{class:"sr-only"},"(opens new window)")])]),t(" object, which provides an assortment of helpful methods and extends the native PHP "),e("code",null,"DateTime"),t(" class.")],-1)),a[5]||(a[5]=o(`<p>You may customize which fields are automatically mutated, and even completely disable this mutation, by overriding the <code>$dates</code> property of your model:</p><pre><code>class User extends Model
{
    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [&#39;created_at&#39;, &#39;updated_at&#39;, &#39;disabled_at&#39;];
}
</code></pre><p>When a column is considered a date, you may set its value to a UNIX timestamp, date string (<code>Y-m-d</code>), date-time string, and of course a <code>DateTime</code> / <code>Carbon</code> instance, and the date&#39;s value will automatically be correctly stored in your database:</p><pre><code>$user = User::find(1);

$user-&gt;disabled_at = Carbon::now();

$user-&gt;save();
</code></pre>`,4)),a[6]||(a[6]=e("p",null,[t("As noted above, when retrieving attributes that are listed in your "),e("code",null,"$dates"),t(" property, they will automatically be cast to "),e("a",{href:"https://github.com/briannesbitt/Carbon",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[t("Carbon"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),t(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),t(),e("span",{class:"sr-only"},"(opens new window)")])]),t(" instances, allowing you to use any of Carbon's methods on your attributes:")],-1)),a[7]||(a[7]=o(`<pre><code>$user = User::find(1);

return $user-&gt;disabled_at-&gt;getTimestamp();
</code></pre><p>By default, timestamps are formatted as <code>&#39;Y-m-d H:i:s&#39;</code>. If you need to customize the timestamp format, set the <code>$dateFormat</code> property on your model. This property determines how date attributes are stored in the database, as well as their format when the model is serialized to an array or JSON:</p><pre><code>class Flight extends Model
{
    /**
     * The storage format of the model&#39;s date columns.
     *
     * @var string
     */
    protected $dateFormat = &#39;U&#39;;
}
</code></pre><h2 id="attribute-casting"><a href="#attribute-casting" class="header-anchor">#</a> Attribute casting</h2><p>The <code>$casts</code> property on your model provides a convenient method of converting attributes to common data types. The <code>$casts</code> property should be an array where the key is the name of the attribute being cast, while the value is the type you wish to cast to the column to. The supported cast types are: <code>integer</code>, <code>real</code>, <code>float</code>, <code>double</code>, <code>string</code>, <code>boolean</code>, <code>object</code> and <code>array</code>.</p><p>For example, let&#39;s cast the <code>is_admin</code> attribute, which is stored in our database as an integer (<code>0</code> or <code>1</code>) to a boolean value:</p><pre><code>class User extends Model
{
    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        &#39;is_admin&#39; =&gt; &#39;boolean&#39;,
    ];
}
</code></pre><p>Now the <code>is_admin</code> attribute will always be cast to a boolean when you access it, even if the underlying value is stored in the database as an integer:</p><pre><code>$user = User::find(1);

if ($user-&gt;is_admin) {
    //
}
</code></pre><h4 id="array-casting"><a href="#array-casting" class="header-anchor">#</a> Array casting</h4><p>The <code>array</code> cast type is particularly useful when working with columns that are stored as serialized JSON. For example, if your database has a <code>TEXT</code> field type that contains serialized JSON, adding the <code>array</code> cast to that attribute will automatically deserialize the attribute to a PHP array when you access it on your Eloquent model:</p><pre><code>class User extends Model
{
    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        &#39;options&#39; =&gt; &#39;array&#39;,
    ];
}
</code></pre><p>Once the cast is defined, you may access the <code>options</code> attribute and it will automatically be deserialized from JSON into a PHP array. When you set the value of the <code>options</code> attribute, the given array will automatically be serialized back into JSON for storage:</p><pre><code>$user = User::find(1);

$options = $user-&gt;options;

$options[&#39;key&#39;] = &#39;value&#39;;

$user-&gt;options = $options;

$user-&gt;save();
</code></pre>`,14))])}const w=d(u,[["render",h]]);export{v as __pageData,w as default};
