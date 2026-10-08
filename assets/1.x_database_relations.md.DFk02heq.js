import{_ as d,r as n,o as l,c,e as a,a as e,s as i,d as o}from"./chunks/framework.CXcwiNg-.js";const v=JSON.parse('{"title":"Relationships - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Defining relationships","slug":"defining-relationships","link":"#defining-relationships","children":[{"level":3,"title":"Detailed definitions","slug":"detailed-definitions","link":"#detailed-definitions","children":[]}]},{"level":2,"title":"Relationship types","slug":"relationship-types","link":"#relationship-types","children":[{"level":3,"title":"One To One","slug":"one-to-one","link":"#one-to-one","children":[{"level":4,"title":"Defining the inverse of the relation","slug":"defining-the-inverse-of-the-relation","link":"#defining-the-inverse-of-the-relation","children":[]},{"level":4,"title":"Default models","slug":"default-models","link":"#default-models","children":[]}]},{"level":3,"title":"One To Many","slug":"one-to-many","link":"#one-to-many","children":[{"level":4,"title":"Defining the inverse of the relation","slug":"defining-the-inverse-of-the-relation-1","link":"#defining-the-inverse-of-the-relation-1","children":[]}]},{"level":3,"title":"Many To Many","slug":"many-to-many","link":"#many-to-many","children":[{"level":4,"title":"Defining the inverse of the relationship","slug":"defining-the-inverse-of-the-relationship","link":"#defining-the-inverse-of-the-relationship","children":[]},{"level":4,"title":"Retrieving intermediate table columns","slug":"retrieving-intermediate-table-columns","link":"#retrieving-intermediate-table-columns","children":[]}]},{"level":3,"title":"Has Many Through","slug":"has-many-through","link":"#has-many-through","children":[]},{"level":3,"title":"Has One Through","slug":"has-one-through","link":"#has-one-through","children":[]},{"level":3,"title":"Polymorphic relations","slug":"polymorphic-relations","link":"#polymorphic-relations","children":[]},{"level":3,"title":"One To One","slug":"one-to-one-1","link":"#one-to-one-1","children":[{"level":4,"title":"Table structure","slug":"table-structure","link":"#table-structure","children":[]},{"level":4,"title":"Model structure","slug":"model-structure","link":"#model-structure","children":[]},{"level":4,"title":"Retrieving Polymorphic relations","slug":"retrieving-polymorphic-relations","link":"#retrieving-polymorphic-relations","children":[]}]},{"level":3,"title":"One To Many","slug":"one-to-many-1","link":"#one-to-many-1","children":[{"level":4,"title":"Table Structure","slug":"table-structure-1","link":"#table-structure-1","children":[]},{"level":4,"title":"Model Structure","slug":"model-structure-1","link":"#model-structure-1","children":[]},{"level":4,"title":"Retrieving The Relationship","slug":"retrieving-the-relationship","link":"#retrieving-the-relationship","children":[]}]},{"level":3,"title":"Many To Many","slug":"many-to-many-1","link":"#many-to-many-1","children":[{"level":4,"title":"Table structure","slug":"table-structure-2","link":"#table-structure-2","children":[]},{"level":4,"title":"Model structure","slug":"model-structure-2","link":"#model-structure-2","children":[]},{"level":4,"title":"Defining the inverse of the relationship","slug":"defining-the-inverse-of-the-relationship-1","link":"#defining-the-inverse-of-the-relationship-1","children":[]},{"level":4,"title":"Retrieving the relationship","slug":"retrieving-the-relationship-1","link":"#retrieving-the-relationship-1","children":[]},{"level":4,"title":"Custom Polymorphic types","slug":"custom-polymorphic-types","link":"#custom-polymorphic-types","children":[]}]}]},{"level":2,"title":"Querying relations","slug":"querying-relations","link":"#querying-relations","children":[{"level":3,"title":"Access via relationship method","slug":"access-via-relationship-method","link":"#access-via-relationship-method","children":[]},{"level":3,"title":"Access via dynamic property","slug":"access-via-dynamic-property","link":"#access-via-dynamic-property","children":[]},{"level":3,"title":"Querying relationship existence","slug":"querying-relationship-existence","link":"#querying-relationship-existence","children":[]}]},{"level":2,"title":"Eager loading","slug":"eager-loading","link":"#eager-loading","children":[{"level":4,"title":"Eager loading multiple relationships","slug":"eager-loading-multiple-relationships","link":"#eager-loading-multiple-relationships","children":[]},{"level":4,"title":"Nested eager loading","slug":"nested-eager-loading","link":"#nested-eager-loading","children":[]},{"level":3,"title":"Constraining eager loads","slug":"constraining-eager-loads","link":"#constraining-eager-loads","children":[]},{"level":3,"title":"Lazy eager loading","slug":"lazy-eager-loading","link":"#lazy-eager-loading","children":[]}]},{"level":2,"title":"Inserting related models","slug":"inserting-related-models","link":"#inserting-related-models","children":[{"level":3,"title":"Insert via relationship method","slug":"insert-via-relationship-method","link":"#insert-via-relationship-method","children":[{"level":4,"title":"Add method","slug":"add-method","link":"#add-method","children":[]},{"level":4,"title":"Remove method","slug":"remove-method","link":"#remove-method","children":[]},{"level":4,"title":"Adding with pivot data","slug":"adding-with-pivot-data","link":"#adding-with-pivot-data","children":[]},{"level":4,"title":"Create method","slug":"create-method","link":"#create-method","children":[]}]},{"level":3,"title":"Insert via dynamic property","slug":"insert-via-dynamic-property","link":"#insert-via-dynamic-property","children":[]},{"level":3,"title":"Many To Many relations","slug":"many-to-many-relations","link":"#many-to-many-relations","children":[{"level":4,"title":"Attaching / Detaching","slug":"attaching-detaching","link":"#attaching-detaching","children":[]},{"level":4,"title":"Syncing For convenience","slug":"syncing-for-convenience","link":"#syncing-for-convenience","children":[]}]},{"level":3,"title":"Touching parent timestamps","slug":"touching-parent-timestamps","link":"#touching-parent-timestamps","children":[]}]},{"level":2,"title":"Deferred binding","slug":"deferred-binding","link":"#deferred-binding","children":[{"level":3,"title":"Generating a session key","slug":"generating-a-session-key","link":"#generating-a-session-key","children":[]},{"level":3,"title":"Defer a relation binding","slug":"defer-a-relation-binding","link":"#defer-a-relation-binding","children":[]},{"level":3,"title":"Defer a relation unbinding","slug":"defer-a-relation-unbinding","link":"#defer-a-relation-unbinding","children":[]},{"level":3,"title":"List all bindings","slug":"list-all-bindings","link":"#list-all-bindings","children":[]},{"level":3,"title":"Cancel all bindings","slug":"cancel-all-bindings","link":"#cancel-all-bindings","children":[]},{"level":3,"title":"Commit all bindings","slug":"commit-all-bindings","link":"#commit-all-bindings","children":[]},{"level":3,"title":"Lazily commit bindings","slug":"lazily-commit-bindings","link":"#lazily-commit-bindings","children":[]},{"level":3,"title":"Clean up orphaned bindings","slug":"clean-up-orphaned-bindings","link":"#clean-up-orphaned-bindings","children":[]},{"level":3,"title":"Disable Deferred Binding","slug":"disable-deferred-binding","link":"#disable-deferred-binding","children":[]}]}],"relativePath":"1.x/database/relations.md","filePath":"1.x/database/relations.md"}'),h={name:"1.x/database/relations.md"};function p(m,t,u,g,y,f){const s=n("pre-heading"),r=n("post-heading");return l(),c("div",null,[a(s),t[0]||(t[0]=e("h1",null,"Relationships",-1)),a(r),t[1]||(t[1]=i(`<p>Database tables are often related to one another. For example, a blog post may have many comments, or an order could be related to the user who placed it. October makes managing and working with these relationships easy and supports several different types of relationships.</p><blockquote><p><strong>Note:</strong> If you are selecting specific columns in your query and want to load relationships as well, you need to make sure that the columns that contain the keying data (i.e. <code>id</code>, <code>foreign_key</code>, etc) are included in your select statement. Otherwise, October cannot connect the relations.</p></blockquote><h2 id="defining-relationships"><a href="#defining-relationships" class="header-anchor">#</a> Defining relationships</h2><p>Model relationships are defined as properties on your model classes. An example of defining relationships:</p><pre><code>class User extends Model
{
    public $hasMany = [
        &#39;posts&#39; =&gt; &#39;Acme\\Blog\\Models\\Post&#39;
    ]
}
</code></pre><p>Relationships like models themselves, also serve as powerful <a href="./query.html">query builders</a>, accessing relationships as functions provides powerful method chaining and querying capabilities. For example:</p><pre><code>$user-&gt;posts()-&gt;where(&#39;is_active&#39;, true)-&gt;get();
</code></pre><p>Accessing a relationship as a property is also possible:</p><pre><code>$user-&gt;posts;
</code></pre><blockquote><p><strong>Note</strong>: All relationship queries have <a href="./../database/query.html#in-memory-caching">in-memory caching enabled</a> by default. The <code>load($relation)</code> method won&#39;t force cache to flush. To reload the memory cache use the <code>reloadRelations()</code> or the <code>reload()</code> methods on the model object.</p></blockquote><h3 id="detailed-definitions"><a href="#detailed-definitions" class="header-anchor">#</a> Detailed definitions</h3><p>Each definition can be an array where the key is the relation name and the value is a detail array. The detail array&#39;s first value is always the related model class name and all other values are parameters that must have a key name.</p><pre><code>public $hasMany = [
    &#39;posts&#39; =&gt; [&#39;Acme\\Blog\\Models\\Post&#39;, &#39;delete&#39; =&gt; true]
];
</code></pre><p>The following are parameters that can be used with all relations:</p><div class="table"><table tabindex="0"><thead><tr><th>Argument</th><th>Description</th></tr></thead><tbody><tr><td><strong>order</strong></td><td>sorting order for multiple records.</td></tr><tr><td><strong>conditions</strong></td><td>filters the relation using a raw where query statement.</td></tr><tr><td><strong>scope</strong></td><td>filters the relation using a supplied scope method.</td></tr><tr><td><strong>push</strong></td><td>if set to false, this relation will not be saved via <code>push</code>, default: true.</td></tr><tr><td><strong>delete</strong></td><td>if set to true, the related model will be deleted if the primary model is deleted or relationship is destroyed, default: false.</td></tr><tr><td><strong>count</strong></td><td>if set to true, the result contains a <code>count</code> column only, used for counting relations, default: false.</td></tr></tbody></table></div><p>Example filter using <strong>order</strong> and <strong>conditions</strong>:</p><pre><code>public $belongsToMany = [
    &#39;categories&#39; =&gt; [
        &#39;Acme\\Blog\\Models\\Category&#39;,
        &#39;order&#39;      =&gt; &#39;name desc&#39;,
        &#39;conditions&#39; =&gt; &#39;is_active = 1&#39;
    ]
];
</code></pre><p>Example filter using <strong>scope</strong>:</p><pre><code>class Post extends Model
{
    public $belongsToMany = [
        &#39;categories&#39; =&gt; [
            &#39;Acme\\Blog\\Models\\Category&#39;,
            &#39;scope&#39; =&gt; &#39;isActive&#39;
        ]
    ];
}

class Category extends Model
{
    public function scopeIsActive($query)
    {
        return $query-&gt;where(&#39;is_active&#39;, true)-&gt;orderBy(&#39;name&#39;, &#39;desc&#39;);
    }
}
</code></pre><p>Example filter using <strong>count</strong>:</p><pre><code>public $belongsToMany = [
    &#39;users&#39; =&gt; [&#39;Backend\\Models\\User&#39;],
    &#39;users_count&#39; =&gt; [&#39;Backend\\Models\\User&#39;, &#39;count&#39; =&gt; true]
];
</code></pre><h2 id="relationship-types"><a href="#relationship-types" class="header-anchor">#</a> Relationship types</h2><p>The following relations types are available:</p><ul><li><a href="#one-to-one">One To One</a></li><li><a href="#one-to-many">One To Many</a></li><li><a href="#many-to-many">Many To Many</a></li><li><a href="#has-many-through">Has Many Through</a></li><li><a href="#polymorphic-relations">Polymorphic relations</a></li><li><a href="#many-to-many-polymorphic-relations">Many To Many Polymorphic relations</a></li></ul><h3 id="one-to-one"><a href="#one-to-one" class="header-anchor">#</a> One To One</h3><p>A one-to-one relationship is a very basic relation. For example, a <code>User</code> model might be associated with one <code>Phone</code>. To define this relationship, we add a <code>phone</code> entry to the <code>$hasOne</code> property on the <code>User</code> model.</p><pre><code>&lt;?php namespace Acme\\Blog\\Models;

use Model;

class User extends Model
{
    public $hasOne = [
        &#39;phone&#39; =&gt; &#39;Acme\\Blog\\Models\\Phone&#39;
    ];
}
</code></pre><p>Once the relationship is defined, we may retrieve the related record using the model property of the same name. These properties are dynamic and allow you to access them as if they were regular attributes on the model:</p><pre><code>$phone = User::find(1)-&gt;phone;
</code></pre><p>The model assumes the foreign key of the relationship based on the model name. In this case, the <code>Phone</code> model is automatically assumed to have a <code>user_id</code> foreign key. If you wish to override this convention, you may pass the <code>key</code> parameter to the definition:</p><pre><code>public $hasOne = [
    &#39;phone&#39; =&gt; [&#39;Acme\\Blog\\Models\\Phone&#39;, &#39;key&#39; =&gt; &#39;my_user_id&#39;]
];
</code></pre><p>Additionally, the model assumes that the foreign key should have a value matching the <code>id</code> column of the parent. In other words, it will look for the value of the user&#39;s <code>id</code> column in the <code>user_id</code> column of the <code>Phone</code> record. If you would like the relationship to use a value other than <code>id</code>, you may pass the <code>otherKey</code> parameter to the definition:</p><pre><code>public $hasOne = [
    &#39;phone&#39; =&gt; [&#39;Acme\\Blog\\Models\\Phone&#39;, &#39;key&#39; =&gt; &#39;my_user_id&#39;, &#39;otherKey&#39; =&gt; &#39;my_id&#39;]
];
</code></pre><h4 id="defining-the-inverse-of-the-relation"><a href="#defining-the-inverse-of-the-relation" class="header-anchor">#</a> Defining the inverse of the relation</h4><p>Now that we can access the <code>Phone</code> model from our <code>User</code>. Let&#39;s do the opposite and define a relationship on the <code>Phone</code> model that will let us access the <code>User</code> that owns the phone. We can define the inverse of a <code>hasOne</code> relationship using the <code>$belongsTo</code> property:</p><pre><code>class Phone extends Model
{
    public $belongsTo = [
        &#39;user&#39; =&gt; &#39;Acme\\Blog\\Models\\User&#39;
    ];
}
</code></pre><p>In the example above, the model will try to match the <code>user_id</code> from the <code>Phone</code> model to an <code>id</code> on the <code>User</code> model. It determines the default foreign key name by examining the name of the relationship definition and suffixing the name with <code>_id</code>. However, if the foreign key on the <code>Phone</code> model is not <code>user_id</code>, you may pass a custom key name using the <code>key</code> parameter on the definition:</p><pre><code>public $belongsTo = [
    &#39;user&#39; =&gt; [&#39;Acme\\Blog\\Models\\User&#39;, &#39;key&#39; =&gt; &#39;my_user_id&#39;]
];
</code></pre><p>If your parent model does not use <code>id</code> as its primary key, or you wish to join the child model to a different column, you may pass the <code>otherKey</code> parameter to the definition specifying your parent table&#39;s custom key:</p><pre><code>public $belongsTo = [
    &#39;user&#39; =&gt; [&#39;Acme\\Blog\\Models\\User&#39;, &#39;key&#39; =&gt; &#39;my_user_id&#39;, &#39;otherKey&#39; =&gt; &#39;my_id&#39;]
];
</code></pre><h4 id="default-models"><a href="#default-models" class="header-anchor">#</a> Default models</h4>`,41)),t[2]||(t[2]=e("p",null,[o("The "),e("code",null,"belongsTo"),o(" relationship lets you define a default model that will be returned if the given relationship is "),e("code",null,"null"),o(". This pattern is often referred to as the "),e("a",{href:"https://en.wikipedia.org/wiki/Null_Object_pattern",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[o("Null Object pattern"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),o(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),o(),e("span",{class:"sr-only"},"(opens new window)")])]),o(" and can help remove conditional checks in your code. In the following example, the "),e("code",null,"user"),o(" relation will return an empty "),e("code",null,"Acme\\Blog\\Models\\User"),o(" model if no "),e("code",null,"user"),o(" is attached to the post:")],-1)),t[3]||(t[3]=i(`<pre><code>public $belongsTo = [
    &#39;user&#39; =&gt; [&#39;Acme\\Blog\\Models\\User&#39;, &#39;default&#39; =&gt; true]
];
</code></pre><p>To populate the default model with attributes, you may pass an array to the <code>default</code> parameter:</p><pre><code>public $belongsTo = [
    &#39;user&#39; =&gt; [
        &#39;Acme\\Blog\\Models\\User&#39;,
        &#39;default&#39; =&gt; [&#39;name&#39; =&gt; &#39;Guest&#39;]
    ]
];
</code></pre><h3 id="one-to-many"><a href="#one-to-many" class="header-anchor">#</a> One To Many</h3><p>A one-to-many relationship is used to define relationships where a single model owns any amount of other models. For example, a blog post may have an infinite number of comments. Like all other relationships, one-to-many relationships are defined adding an entry to the <code>$hasMany</code> property on your model:</p><pre><code>class Post extends Model
{
    public $hasMany = [
        &#39;comments&#39; =&gt; &#39;Acme\\Blog\\Models\\Comment&#39;
    ];
}
</code></pre><p>Remember, the model will automatically determine the proper foreign key column on the <code>Comment</code> model. By convention, it will take the &quot;snake case&quot; name of the owning model and suffix it with <code>_id</code>. So for this example, we can assume the foreign key on the <code>Comment</code> model is <code>post_id</code>.</p><p>Once the relationship has been defined, we can access the collection of comments by accessing the <code>comments</code> property. Remember, since the model provides &quot;dynamic properties&quot;, we can access relationships as if they were defined as properties on the model:</p><pre><code>$comments = Post::find(1)-&gt;comments;

foreach ($comments as $comment) {
    //
}
</code></pre><p>Of course, since all relationships also serve as query builders, you can add further constraints to which comments are retrieved by calling the <code>comments</code> method and continuing to chain conditions onto the query:</p><pre><code>$comments = Post::find(1)-&gt;comments()-&gt;where(&#39;title&#39;, &#39;foo&#39;)-&gt;first();
</code></pre><p>Like the <code>hasOne</code> relation, you may also override the foreign and local keys by passing the <code>key</code> and <code>otherKey</code> parameters on the definition respectively:</p><pre><code>public $hasMany = [
    &#39;comments&#39; =&gt; [&#39;Acme\\Blog\\Models\\Comment&#39;, &#39;key&#39; =&gt; &#39;my_post_id&#39;, &#39;otherKey&#39; =&gt; &#39;my_id&#39;]
];
</code></pre><h4 id="defining-the-inverse-of-the-relation-1"><a href="#defining-the-inverse-of-the-relation-1" class="header-anchor">#</a> Defining the inverse of the relation</h4><p>Now that we can access all of a post&#39;s comments, let&#39;s define a relationship to allow a comment to access its parent post. To define the inverse of a <code>hasMany</code> relationship, define the <code>$belongsTo</code> property on the child model:</p><pre><code>class Comment extends Model
{
    public $belongsTo = [
        &#39;post&#39; =&gt; &#39;Acme\\Blog\\Models\\Post&#39;
    ];
}
</code></pre><p>Once the relationship has been defined, we can retrieve the <code>Post</code> model for a <code>Comment</code> by accessing the <code>post</code> &quot;dynamic property&quot;:</p><pre><code>$comment = Comment::find(1);

echo $comment-&gt;post-&gt;title;
</code></pre><p>In the example above, the model will try to match the <code>post_id</code> from the <code>Comment</code> model to an <code>id</code> on the <code>Post</code> model. It determines the default foreign key name by examining the name of the relationship and suffixing it with <code>_id</code>. However, if the foreign key on the <code>Comment</code> model is not <code>post_id</code>, you may pass a custom key name using the <code>key</code> parameter:</p><pre><code>public $belongsTo = [
    &#39;post&#39; =&gt; [&#39;Acme\\Blog\\Models\\Post&#39;, &#39;key&#39; =&gt; &#39;my_post_id&#39;]
];
</code></pre><p>If your parent model does not use <code>id</code> as its primary key, or you wish to join the child model to a different column, you may pass the <code>otherKey</code> parameter to the definition specifying your parent table&#39;s custom key:</p><pre><code>public $belongsTo = [
    &#39;post&#39; =&gt; [&#39;Acme\\Blog\\Models\\Post&#39;, &#39;key&#39; =&gt; &#39;my_post_id&#39;, &#39;otherKey&#39; =&gt; &#39;my_id&#39;]
];
</code></pre><h3 id="many-to-many"><a href="#many-to-many" class="header-anchor">#</a> Many To Many</h3><p>Many-to-many relations are slightly more complicated than <code>hasOne</code> and <code>hasMany</code> relationships. An example of such a relationship is a user with many roles, where the roles are also shared by other users. For example, many users may have the role of &quot;Admin&quot;. To define this relationship, three database tables are needed: <code>users</code>, <code>roles</code>, and <code>role_user</code>. The <code>role_user</code> table is derived from the alphabetical order of the related model names, and contains the <code>user_id</code> and <code>role_id</code> columns.</p><p>Below is an example that shows the <a href="./../plugin/updates.html#migration-files">database table structure</a> used to create the join table.</p><pre><code>Schema::create(&#39;role_user&#39;, function($table)
{
    $table-&gt;integer(&#39;user_id&#39;)-&gt;unsigned();
    $table-&gt;integer(&#39;role_id&#39;)-&gt;unsigned();
    $table-&gt;primary([&#39;user_id&#39;, &#39;role_id&#39;]);
});
</code></pre><p>Many-to-many relationships are defined adding an entry to the <code>$belongsToMany</code> property on your model class. For example, let&#39;s define the <code>roles</code> method on our <code>User</code> model:</p><pre><code>class User extends Model
{
    public $belongsToMany = [
        &#39;roles&#39; =&gt; &#39;Acme\\Blog\\Models\\Role&#39;
    ];
}
</code></pre><p>Once the relationship is defined, you may access the user&#39;s roles using the <code>roles</code> dynamic property:</p><pre><code>$user = User::find(1);

foreach ($user-&gt;roles as $role) {
    //
}
</code></pre><p>Of course, like all other relationship types, you may call the <code>roles</code> method to continue chaining query constraints onto the relationship:</p><pre><code>$roles = User::find(1)-&gt;roles()-&gt;orderBy(&#39;name&#39;)-&gt;get();
</code></pre><p>As mentioned previously, to determine the table name of the relationship&#39;s joining table, the model will join the two related model names in alphabetical order. However, you are free to override this convention. You may do so by passing the <code>table</code> parameter to the <code>belongsToMany</code> definition:</p><pre><code>public $belongsToMany = [
    &#39;roles&#39; =&gt; [&#39;Acme\\Blog\\Models\\Role&#39;, &#39;table&#39; =&gt; &#39;acme_blog_role_user&#39;]
];
</code></pre><p>In addition to customizing the name of the joining table, you may also customize the column names of the keys on the table by passing additional parameters to the <code>belongsToMany</code> definition. The <code>key</code> parameter is the foreign key name of the model on which you are defining the relationship, while the <code>otherKey</code> parameter is the foreign key name of the model that you are joining to:</p><pre><code>public $belongsToMany = [
    &#39;roles&#39; =&gt; [
        &#39;Acme\\Blog\\Models\\Role&#39;,
        &#39;table&#39;    =&gt; &#39;acme_blog_role_user&#39;,
        &#39;key&#39;      =&gt; &#39;my_user_id&#39;,
        &#39;otherKey&#39; =&gt; &#39;my_role_id&#39;
    ]
];
</code></pre><h4 id="defining-the-inverse-of-the-relationship"><a href="#defining-the-inverse-of-the-relationship" class="header-anchor">#</a> Defining the inverse of the relationship</h4><p>To define the inverse of a many-to-many relationship, you simply place another <code>$belongsToMany</code> property on your related model. To continue our user roles example, let&#39;s define the <code>users</code> relationship on the <code>Role</code> model:</p><pre><code>class Role extends Model
{
    public $belongsToMany = [
        &#39;users&#39; =&gt; &#39;Acme\\Blog\\Models\\User&#39;
    ];
}
</code></pre><p>As you can see, the relationship is defined exactly the same as its <code>User</code> counterpart, with the exception of simply referencing the <code>Acme\\Blog\\Models\\User</code> model. Since we&#39;re reusing the <code>$belongsToMany</code> property, all of the usual table and key customization options are available when defining the inverse of many-to-many relationships.</p><h4 id="retrieving-intermediate-table-columns"><a href="#retrieving-intermediate-table-columns" class="header-anchor">#</a> Retrieving intermediate table columns</h4><p>As you have already learned, working with many-to-many relations requires the presence of an intermediate join table. Models provide some very helpful ways of interacting with this table. For example, let&#39;s assume our <code>User</code> object has many <code>Role</code> objects that it is related to. After accessing this relationship, we may access the intermediate table using the <code>pivot</code> attribute on the models:</p><pre><code>$user = User::find(1);

foreach ($user-&gt;roles as $role) {
    echo $role-&gt;pivot-&gt;created_at;
}
</code></pre><p>Notice that each <code>Role</code> model we retrieve is automatically assigned a <code>pivot</code> attribute. This attribute contains a model representing the intermediate table, and may be used like any other model.</p><p>By default, only the model keys will be present on the <code>pivot</code> object. If your pivot table contains extra attributes, you must specify them when defining the relationship:</p><pre><code>public $belongsToMany = [
    &#39;roles&#39; =&gt; [
        &#39;Acme\\Blog\\Models\\Role&#39;,
        &#39;pivot&#39; =&gt; [&#39;column1&#39;, &#39;column2&#39;]
    ]
];
</code></pre><p>If you want your pivot table to have automatically maintained <code>created_at</code> and <code>updated_at</code> timestamps, use the <code>timestamps</code> parameter on the relationship definition:</p><pre><code>public $belongsToMany = [
    &#39;roles&#39; =&gt; [&#39;Acme\\Blog\\Models\\Role&#39;, &#39;timestamps&#39; =&gt; true]
];
</code></pre><p>If you would like to define a custom model to represent the intermediate table of your relationship, you may use <code>pivotModel</code> attribute when defining the relationship. Custom many-to-many pivot models should extend the <code>October\\Rain\\Database\\Pivot</code> class while custom polymorphic many-to-many pivot models should extend the <code>October\\Rain\\Database\\MorphPivot</code> class.</p><p>These are the parameters supported for <code>belongsToMany</code> relations:</p><div class="table"><table tabindex="0"><thead><tr><th>Argument</th><th>Description</th></tr></thead><tbody><tr><td><strong>table</strong></td><td>the name of the join table.</td></tr><tr><td><strong>key</strong></td><td>the key column name of the defining model (inside pivot table). Default value is combined from model name and <code>_id</code> suffix, i.e. <code>user_id</code></td></tr><tr><td><strong>parentKey</strong></td><td>the key column name of the defining model (inside defining model table). Default: id</td></tr><tr><td><strong>otherKey</strong></td><td>the key column name of the related model (inside pivot table). Default value is combined from model name and <code>_id</code> suffix, i.e. <code>role_id</code></td></tr><tr><td><strong>relatedKey</strong></td><td>the key column name of the related model (inside related model table). Default: id</td></tr><tr><td><strong>pivot</strong></td><td>an array of pivot columns found in the join table, attributes are available via <code>$model-&gt;pivot</code>.</td></tr><tr><td><strong>pivotModel</strong></td><td>specify a custom model class to return when accessing the pivot relation. Defaults to <code>October\\Rain\\Database\\Pivot</code> while for polymorphic relation <code>October\\Rain\\Database\\MorphPivot</code>.</td></tr><tr><td><strong>timestamps</strong></td><td>if true, the join table should contain <code>created_at</code> and <code>updated_at</code> columns. Default: false</td></tr></tbody></table></div><h3 id="has-many-through"><a href="#has-many-through" class="header-anchor">#</a> Has Many Through</h3><p>The has-many-through relationship provides a convenient short-cut for accessing distant relations via an intermediate relation. For example, a <code>Country</code> model might have many <code>Post</code> models through an intermediate <code>User</code> model. In this example, you could easily gather all blog posts for a given country. Let&#39;s look at the tables required to define this relationship:</p><pre><code>countries
    id - integer
    name - string

users
    id - integer
    country_id - integer
    name - string

posts
    id - integer
    user_id - integer
    title - string
</code></pre><p>Though <code>posts</code> does not contain a <code>country_id</code> column, the <code>hasManyThrough</code> relation provides access to a country&#39;s posts via <code>$country-&gt;posts</code>. To perform this query, the model inspects the <code>country_id</code> on the intermediate <code>users</code> table. After finding the matching user IDs, they are used to query the <code>posts</code> table.</p><p>Now that we have examined the table structure for the relationship, let&#39;s define it on the <code>Country</code> model:</p><pre><code>class Country extends Model
{
    public $hasManyThrough = [
        &#39;posts&#39; =&gt; [
            &#39;Acme\\Blog\\Models\\Post&#39;,
            &#39;through&#39; =&gt; &#39;Acme\\Blog\\Models\\User&#39;
        ],
    ];
}
</code></pre><p>The first argument passed to the <code>$hasManyThrough</code> relation is the name of the final model we wish to access, while the <code>through</code> parameter is the name of the intermediate model.</p><p>Typical foreign key conventions will be used when performing the relationship&#39;s queries. If you would like to customize the keys of the relationship, you may pass them as the <code>key</code>, <code>otherKey</code> and <code>throughKey</code> parameters to the <code>$hasManyThrough</code> definition. The <code>key</code> parameter is the name of the foreign key on the intermediate model, the <code>throughKey</code> parameter is the name of the foreign key on the final model, while the <code>otherKey</code> is the local key.</p><pre><code>public $hasManyThrough = [
    &#39;posts&#39; =&gt; [
        &#39;Acme\\Blog\\Models\\Post&#39;,
        &#39;key&#39;        =&gt; &#39;my_country_id&#39;,
        &#39;through&#39;    =&gt; &#39;Acme\\Blog\\Models\\User&#39;,
        &#39;throughKey&#39; =&gt; &#39;my_user_id&#39;,
        &#39;otherKey&#39;   =&gt; &#39;my_id&#39;
    ],
];
</code></pre><h3 id="has-one-through"><a href="#has-one-through" class="header-anchor">#</a> Has One Through</h3><p>The has-one-through relationship links models through a single intermediate relation. For example, if each supplier has one user, and each user is associated with one user history record, then the supplier model may access the user&#39;s history through the user. Let&#39;s look at the database tables necessary to define this relationship:</p><pre><code>users
    id - integer
    supplier_id - integer

suppliers
    id - integer

history
    id - integer
    user_id - integer
</code></pre><p>Though the <code>history</code> table does not contain a <code>supplier_id</code> column, the <code>hasOneThrough</code> relation can provide access to the user&#39;s history to the supplier model. Now that we have examined the table structure for the relationship, let&#39;s define it on the <code>Supplier</code> model:</p><pre><code>class Supplier extends Model
{
    public $hasOneThrough = [
        &#39;userHistory&#39; =&gt; [
            &#39;Acme\\Supplies\\Model\\History&#39;,
            &#39;through&#39; =&gt; &#39;Acme\\Supplies\\Model\\User&#39;
        ],
    ];
}
</code></pre><p>The first array parameter passed to the <code>$hasOneThrough</code> property is the name of the final model we wish to access, while the <code>through</code> key is the name of the intermediate model.</p><p>Typical foreign key conventions will be used when performing the relationship&#39;s queries. If you would like to customize the keys of the relationship, you may pass them as the <code>key</code>, <code>otherKey</code> and <code>throughKey</code> parameters to the <code>$hasManyThrough</code> definition. The <code>key</code> parameter is the name of the foreign key on the intermediate model, the <code>throughKey</code> parameter is the name of the foreign key on the final model, while the <code>otherKey</code> is the local key.</p><pre><code>public $hasOneThrough = [
    &#39;userHistory&#39; =&gt; [
        &#39;Acme\\Supplies\\Model\\History&#39;,
        &#39;key&#39;        =&gt; &#39;supplier_id&#39;,
        &#39;through&#39; =&gt; &#39;Acme\\Supplies\\Model\\User&#39;
        &#39;throughKey&#39; =&gt; &#39;user_id&#39;,
        &#39;otherKey&#39;   =&gt; &#39;id&#39;
    ],
];
</code></pre><h3 id="polymorphic-relations"><a href="#polymorphic-relations" class="header-anchor">#</a> Polymorphic relations</h3><p>Polymorphic relations allow a model to belong to more than one other model on a single association.</p><h3 id="one-to-one-1"><a href="#one-to-one-1" class="header-anchor">#</a> One To One</h3><h4 id="table-structure"><a href="#table-structure" class="header-anchor">#</a> Table structure</h4><p>A one-to-one polymorphic relation is similar to a simple one-to-one relation; however, the target model can belong to more than one type of model on a single association. For example, imagine you want to store photos for your staff members and for your products. Using polymorphic relationships, you can use a single <code>photos</code> table for both of these scenarios. First, let&#39;s examine the table structure required to build this relationship:</p><pre><code>staff
    id - integer
    name - string

products
    id - integer
    price - integer

photos
    id - integer
    path - string
    imageable_id - integer
    imageable_type - string
</code></pre><p>Two important columns to note are the <code>imageable_id</code> and <code>imageable_type</code> columns on the <code>photos</code> table. The <code>imageable_id</code> column will contain the ID value of the owning staff or product, while the <code>imageable_type</code> column will contain the class name of the owning model. The <code>imageable_type</code> column is how the ORM determines which &quot;type&quot; of owning model to return when accessing the <code>imageable</code> relation.</p><h4 id="model-structure"><a href="#model-structure" class="header-anchor">#</a> Model structure</h4><p>Next, let&#39;s examine the model definitions needed to build this relationship:</p><pre><code>class Photo extends Model
{
    public $morphTo = [
        &#39;imageable&#39; =&gt; []
    ];
}

class Staff extends Model
{
    public $morphOne = [
        &#39;photo&#39; =&gt; [&#39;Acme\\Blog\\Models\\Photo&#39;, &#39;name&#39; =&gt; &#39;imageable&#39;]
    ];
}

class Product extends Model
{
    public $morphOne = [
        &#39;photo&#39; =&gt; [&#39;Acme\\Blog\\Models\\Photo&#39;, &#39;name&#39; =&gt; &#39;imageable&#39;]
    ];
}
</code></pre><h4 id="retrieving-polymorphic-relations"><a href="#retrieving-polymorphic-relations" class="header-anchor">#</a> Retrieving Polymorphic relations</h4><p>Once your database table and models are defined, you may access the relationships via your models. For example, to access the photo for a staff member, we can simply use the <code>photo</code> dynamic property:</p><pre><code>$staff = Staff::find(1);

$photo = $staff-&gt;photo
</code></pre><p>You may also retrieve the owner of a polymorphic relation from the polymorphic model by accessing the name of the <code>morphTo</code> relationship. In our case, that is the <code>imageable</code> definition on the <code>Photo</code> model. So, we will access it as a dynamic property:</p><pre><code>$photo = Photo::find(1);

$imageable = $photo-&gt;imageable;
</code></pre><p>The <code>imageable</code> relation on the <code>Photo</code> model will return either a <code>Staff</code> or <code>Product</code> instance, depending on which type of model owns the photo.</p><h3 id="one-to-many-1"><a href="#one-to-many-1" class="header-anchor">#</a> One To Many</h3><h4 id="table-structure-1"><a href="#table-structure-1" class="header-anchor">#</a> Table Structure</h4><p>A one-to-many polymorphic relation is similar to a simple one-to-many relation; however, the target model can belong to more than one type of model on a single association. For example, imagine users of your application can &quot;comment&quot; on both posts and videos. Using polymorphic relationships, you may use a single <code>comments</code> table for both of these scenarios. First, let&#39;s examine the table structure required to build this relationship:</p><pre><code>posts
    id - integer
    title - string
    body - text

videos
    id - integer
    title - string
    url - string

comments
    id - integer
    body - text
    commentable_id - integer
    commentable_type - string
</code></pre><h4 id="model-structure-1"><a href="#model-structure-1" class="header-anchor">#</a> Model Structure</h4><p>Next, let&#39;s examine the model definitions needed to build this relationship:</p><pre><code>class Comment extends Model
{
    public $morphTo = [
        &#39;commentable&#39; =&gt; []
    ];
}

class Post extends Model
{
    public $morphMany = [
        &#39;comments&#39; =&gt; [&#39;Acme\\Blog\\Models\\Comment&#39;, &#39;name&#39; =&gt; &#39;commentable&#39;]
    ];
}

class Product extends Model
{
    public $morphMany = [
        &#39;comments&#39; =&gt; [&#39;Acme\\Blog\\Models\\Comment&#39;, &#39;name&#39; =&gt; &#39;commentable&#39;]
    ];
}
</code></pre><h4 id="retrieving-the-relationship"><a href="#retrieving-the-relationship" class="header-anchor">#</a> Retrieving The Relationship</h4><p>Once your database table and models are defined, you may access the relationships via your models. For example, to access all of the comments for a post, we can use the <code>comments</code> dynamic property:</p><pre><code>$post = Author\\Plugin\\Models\\Post::find(1);

foreach ($post-&gt;comments as $comment) {
    //
}
</code></pre><p>You may also retrieve the owner of a polymorphic relation from the polymorphic model by accessing the name of the <code>morphTo</code> relationship. In our case, that is the <code>commentable</code> definition on the <code>Comment</code> model. So, we will access it as a dynamic property:</p><pre><code>$comment = Author\\Plugin\\Models\\Comment::find(1);

$commentable = $comment-&gt;commentable;
</code></pre><p>The <code>commentable</code> relation on the <code>Comment</code> model will return either a <code>Post</code> or <code>Video</code> instance, depending on which type of model owns the comment.</p><p>You are also able to update the owner of the related model by setting the attribute with the name of the <code>morphTo</code> relationship, in this case <code>commentable</code>.</p><pre><code>$comment = Author\\Plugin\\Models\\Comment::find(1);
$video = Author\\Plugin\\Models\\Video::find(1);

$comment-&gt;commentable = $video;
$comment-&gt;save()
</code></pre><h3 id="many-to-many-1"><a href="#many-to-many-1" class="header-anchor">#</a> Many To Many</h3><h4 id="table-structure-2"><a href="#table-structure-2" class="header-anchor">#</a> Table structure</h4><p>In addition to &quot;one-to-one&quot; and &quot;one-to-many&quot; relations, you may also define &quot;many-to-many&quot; polymorphic relations. For example, a blog <code>Post</code> and <code>Video</code> model could share a polymorphic relation to a <code>Tag</code> model. Using a many-to-many polymorphic relation allows you to have a single list of unique tags that are shared across blog posts and videos. First, let&#39;s examine the table structure:</p><pre><code>posts
    id - integer
    name - string

videos
    id - integer
    name - string

tags
    id - integer
    name - string

taggables
    tag_id - integer
    taggable_id - integer
    taggable_type - string
</code></pre><h4 id="model-structure-2"><a href="#model-structure-2" class="header-anchor">#</a> Model structure</h4><p>Next, we&#39;re ready to define the relationships on the model. The <code>Post</code> and <code>Video</code> models will both have a <code>tags</code> relation defined in the <code>$morphToMany</code> property on the base model class:</p><pre><code>class Post extends Model
{
    public $morphToMany = [
        &#39;tags&#39; =&gt; [&#39;Acme\\Blog\\Models\\Tag&#39;, &#39;name&#39; =&gt; &#39;taggable&#39;]
    ];
}
</code></pre><h4 id="defining-the-inverse-of-the-relationship-1"><a href="#defining-the-inverse-of-the-relationship-1" class="header-anchor">#</a> Defining the inverse of the relationship</h4><p>Next, on the <code>Tag</code> model, you should define a relation for each of its related models. So, for this example, we will define a <code>posts</code> relation and a <code>videos</code> relation:</p><pre><code>class Tag extends Model
{
    public $morphedByMany = [
        &#39;posts&#39;  =&gt; [&#39;Acme\\Blog\\Models\\Post&#39;, &#39;name&#39; =&gt; &#39;taggable&#39;],
        &#39;videos&#39; =&gt; [&#39;Acme\\Blog\\Models\\Video&#39;, &#39;name&#39; =&gt; &#39;taggable&#39;]
    ];
}
</code></pre><h4 id="retrieving-the-relationship-1"><a href="#retrieving-the-relationship-1" class="header-anchor">#</a> Retrieving the relationship</h4><p>Once your database table and models are defined, you may access the relationships via your models. For example, to access all of the tags for a post, you can simply use the <code>tags</code> dynamic property:</p><pre><code>$post = Post::find(1);

foreach ($post-&gt;tags as $tag) {
    //
}
</code></pre><p>You may also retrieve the owner of a polymorphic relation from the polymorphic model by accessing the name of the relationship defined in the <code>$morphedByMany</code> property. In our case, that is the <code>posts</code> or <code>videos</code> methods on the <code>Tag</code> model. So, you will access those relations as dynamic properties:</p><pre><code>$tag = Tag::find(1);

foreach ($tag-&gt;videos as $video) {
    //
}
</code></pre><h4 id="custom-polymorphic-types"><a href="#custom-polymorphic-types" class="header-anchor">#</a> Custom Polymorphic types</h4><p>By default, the fully qualified class name is used to store the related model type. For instance, given the example above where a <code>Photo</code> may belong to <code>Staff</code> or a <code>Product</code>, the default <code>imageable_type</code> value is either <code>Acme\\Blog\\Models\\Staff</code> or <code>Acme\\Blog\\Models\\Product</code> respectively.</p><p>Using a custom polymorphic type lets you decouple your database from your application&#39;s internal structure. You may define a relationship &quot;morph map&quot; to provide a custom name for each model instead of the class name:</p><pre><code>use October\\Rain\\Database\\Relations\\Relation;

Relation::morphMap([
    &#39;staff&#39; =&gt; &#39;Acme\\Blog\\Models\\Staff&#39;,
    &#39;product&#39; =&gt; &#39;Acme\\Blog\\Models\\Product&#39;,
]);
</code></pre><p>The most common place to register the <code>morphMap</code> in the <code>boot</code> method of a <a href="./../plugin/registration.html#registration-methods">Plugin registration file</a>.</p><h2 id="querying-relations"><a href="#querying-relations" class="header-anchor">#</a> Querying relations</h2><p>Since all types of Model relationships can be called via functions, you may call those functions to obtain an instance of the relationship without actually executing the relationship queries. In addition, all types of relationships also serve as <a href="./query.html">query builders</a>, allowing you to continue to chain constraints onto the relationship query before finally executing the SQL against your database.</p><p>For example, imagine a blog system in which a <code>User</code> model has many associated <code>Post</code> models:</p><pre><code>class User extends Model
{
    public $hasMany = [
        &#39;posts&#39; =&gt; [&#39;Acme\\Blog\\Models\\Post&#39;]
    ];
}
</code></pre><h3 id="access-via-relationship-method"><a href="#access-via-relationship-method" class="header-anchor">#</a> Access via relationship method</h3><p>You may query the <strong>posts</strong> relationship and add additional constraints to the relationship using the <code>posts</code> method. This gives you the ability to chain any of the <a href="./query.html">query builder</a> methods on the relationship.</p><pre><code>$user = User::find(1);

$posts = $user-&gt;posts()-&gt;where(&#39;is_active&#39;, 1)-&gt;get();

$post = $user-&gt;posts()-&gt;first();
</code></pre><h3 id="access-via-dynamic-property"><a href="#access-via-dynamic-property" class="header-anchor">#</a> Access via dynamic property</h3><p>If you do not need to add additional constraints to a relationship query, you may simply access the relationship as if it were a property. For example, continuing to use our <code>User</code> and <code>Post</code> example models, we may access all of a user&#39;s posts using the <code>$user-&gt;posts</code> property instead.</p><pre><code>$user = User::find(1);

foreach ($user-&gt;posts as $post) {
    // ...
}
</code></pre><p>Dynamic properties are &quot;lazy loading&quot;, meaning they will only load their relationship data when you actually access them. Because of this, developers often use <a href="#eager-loading">eager loading</a> to pre-load relationships they know will be accessed after loading the model. Eager loading provides a significant reduction in SQL queries that must be executed to load a model&#39;s relations.</p><h3 id="querying-relationship-existence"><a href="#querying-relationship-existence" class="header-anchor">#</a> Querying relationship existence</h3><p>When accessing the records for a model, you may wish to limit your results based on the existence of a relationship. For example, imagine you want to retrieve all blog posts that have at least one comment. To do so, you may pass the name of the relationship to the <code>has</code> method:</p><pre><code>// Retrieve all posts that have at least one comment...
$posts = Post::has(&#39;comments&#39;)-&gt;get();
</code></pre><p>You may also specify an operator and count to further customize the query:</p><pre><code>// Retrieve all posts that have three or more comments...
$posts = Post::has(&#39;comments&#39;, &#39;&gt;=&#39;, 3)-&gt;get();
</code></pre><p>Nested <code>has</code> statements may also be constructed using &quot;dot&quot; notation. For example, you may retrieve all posts that have at least one comment and vote:</p><pre><code>// Retrieve all posts that have at least one comment with votes...
$posts = Post::has(&#39;comments.votes&#39;)-&gt;get();
</code></pre><p>If you need even more power, you may use the <code>whereHas</code> and <code>orWhereHas</code> methods to put &quot;where&quot; conditions on your <code>has</code> queries. These methods allow you to add customized constraints to a relationship constraint, such as checking the content of a comment:</p><pre><code>// Retrieve all posts with at least one comment containing words like foo%
$posts = Post::whereHas(&#39;comments&#39;, function ($query) {
    $query-&gt;where(&#39;content&#39;, &#39;like&#39;, &#39;foo%&#39;);
})-&gt;get();
</code></pre><h2 id="eager-loading"><a href="#eager-loading" class="header-anchor">#</a> Eager loading</h2><p>When accessing relationships as properties, the relationship data is &quot;lazy loaded&quot;. This means the relationship data is not actually loaded until you first access the property. However, models can &quot;eager load&quot; relationships at the time you query the parent model. Eager loading alleviates the N + 1 query problem. To illustrate the N + 1 query problem, consider a <code>Book</code> model that is related to <code>Author</code>:</p><pre><code>class Book extends Model
{
    public $belongsTo = [
        &#39;author&#39; =&gt; [&#39;Acme\\Blog\\Models\\Author&#39;]
    ];
}
</code></pre><p>Now let&#39;s retrieve all books and their authors:</p><pre><code>$books = Book::all();

foreach ($books as $book) {
    echo $book-&gt;author-&gt;name;
}
</code></pre><p>This loop will execute 1 query to retrieve all of the books on the table, then another query for each book to retrieve the author. So, if we have 25 books, this loop would run 26 queries: 1 for the original book, and 25 additional queries to retrieve the author of each book.</p><p>Thankfully we can use eager loading to reduce this operation to just 2 queries. When querying, you may specify which relationships should be eager loaded using the <code>with</code> method:</p><pre><code>$books = Book::with(&#39;author&#39;)-&gt;get();

foreach ($books as $book) {
    echo $book-&gt;author-&gt;name;
}
</code></pre><p>For this operation only two queries will be executed:</p><pre><code>select * from books

select * from authors where id in (1, 2, 3, 4, 5, ...)
</code></pre><h4 id="eager-loading-multiple-relationships"><a href="#eager-loading-multiple-relationships" class="header-anchor">#</a> Eager loading multiple relationships</h4><p>Sometimes you may need to eager load several different relationships in a single operation. To do so, just pass additional arguments to the <code>with</code> method:</p><pre><code>$books = Book::with(&#39;author&#39;, &#39;publisher&#39;)-&gt;get();
</code></pre><h4 id="nested-eager-loading"><a href="#nested-eager-loading" class="header-anchor">#</a> Nested eager loading</h4><p>To eager load nested relationships, you may use &quot;dot&quot; syntax. For example, let&#39;s eager load all of the book&#39;s authors and all of the author&#39;s personal contacts in one statement:</p><pre><code>$books = Book::with(&#39;author.contacts&#39;)-&gt;get();
</code></pre><h3 id="constraining-eager-loads"><a href="#constraining-eager-loads" class="header-anchor">#</a> Constraining eager loads</h3><p>Sometimes you may wish to eager load a relationship, but also specify additional query constraints for the eager loading query. Here&#39;s an example:</p><pre><code>$users = User::with([
    &#39;posts&#39; =&gt; function ($query) {
        $query-&gt;where(&#39;title&#39;, &#39;like&#39;, &#39;%first%&#39;);
    }
])-&gt;get();
</code></pre><p>In this example, the model will only eager load posts if the post&#39;s <code>title</code> column contains the word <code>first</code>. Of course, you may call other <a href="./query.html">query builder</a> methods to further customize the eager loading operation:</p><pre><code>$users = User::with([
    &#39;posts&#39; =&gt; function ($query) {
        $query-&gt;orderBy(&#39;created_at&#39;, &#39;desc&#39;);
    }
])-&gt;get();
</code></pre><h3 id="lazy-eager-loading"><a href="#lazy-eager-loading" class="header-anchor">#</a> Lazy eager loading</h3><p>Sometimes you may need to eager load a relationship after the parent model has already been retrieved. For example, this may be useful if you need to dynamically decide whether to load related models:</p><pre><code>$books = Book::all();

if ($someCondition) {
    $books-&gt;load(&#39;author&#39;, &#39;publisher&#39;);
}
</code></pre><p>If you need to set additional query constraints on the eager loading query, you may pass a <code>Closure</code> to the <code>load</code> method:</p><pre><code>$books-&gt;load([
    &#39;author&#39; =&gt; function ($query) {
        $query-&gt;orderBy(&#39;published_date&#39;, &#39;asc&#39;);
    }
]);
</code></pre><h2 id="inserting-related-models"><a href="#inserting-related-models" class="header-anchor">#</a> Inserting related models</h2><p>Just like you would <a href="#querying-relations">query a relationship</a>, October supports defining a relationship using a method or dynamic property approach. For example, perhaps you need to insert a new <code>Comment</code> for a <code>Post</code> model. Instead of manually setting the <code>post_id</code> attribute on the <code>Comment</code>, you may insert the <code>Comment</code> directly from the relationship.</p><h3 id="insert-via-relationship-method"><a href="#insert-via-relationship-method" class="header-anchor">#</a> Insert via relationship method</h3><p>October provides convenient methods for adding new models to relationships. Primarily models can be added to a relationship or removed from a relationship. In each case the relationship is associated or disassociated respectively.</p><h4 id="add-method"><a href="#add-method" class="header-anchor">#</a> Add method</h4><p>Use the <code>add</code> method to associate a new relationship.</p><pre><code>$comment = new Comment([&#39;message&#39; =&gt; &#39;A new comment.&#39;]);

$post = Post::find(1);

$comment = $post-&gt;comments()-&gt;add($comment);
</code></pre><p>Notice that we did not access the <code>comments</code> relationship as a dynamic property. Instead, we called the <code>comments</code> method to obtain an instance of the relationship. The <code>add</code> method will automatically add the appropriate <code>post_id</code> value to the new <code>Comment</code> model.</p><p>If you need to save multiple related models, you may use the <code>addMany</code> method:</p><pre><code>$post = Post::find(1);

$post-&gt;comments()-&gt;addMany([
    new Comment([&#39;message&#39; =&gt; &#39;A new comment.&#39;]),
    new Comment([&#39;message&#39; =&gt; &#39;Another comment.&#39;]),
]);
</code></pre><h4 id="remove-method"><a href="#remove-method" class="header-anchor">#</a> Remove method</h4><p>Comparatively, the <code>remove</code> method can be used to disassociate a relationship, making it an orphaned record.</p><pre><code>$post-&gt;comments()-&gt;remove($comment);
</code></pre><p>In the case of many-to-many relations, the record is removed from the relationship&#39;s collection instead.</p><pre><code>$post-&gt;categories()-&gt;remove($category);
</code></pre><p>In the case of a &quot;belongs to&quot; relationship, you may use the <code>dissociate</code> method, which doesn&#39;t require the related model passed to it.</p><pre><code>$post-&gt;author()-&gt;dissociate();
</code></pre><h4 id="adding-with-pivot-data"><a href="#adding-with-pivot-data" class="header-anchor">#</a> Adding with pivot data</h4><p>When working with a many-to-many relationship, the <code>add</code> method accepts an array of additional intermediate &quot;pivot&quot; table attributes as its second argument as an array.</p><pre><code>$user = User::find(1);

$pivotData = [&#39;expires&#39; =&gt; $expires];

$user-&gt;roles()-&gt;add($role, $pivotData);
</code></pre><p>The second argument of the <code>add</code> method can also specify the session key used by <a href="#deferred-binding">deferred binding</a> when passed as a string. In these cases the pivot data can be provided as the third argument instead.</p><pre><code>$user-&gt;roles()-&gt;add($role, $sessionKey, $pivotData);
</code></pre><h4 id="create-method"><a href="#create-method" class="header-anchor">#</a> Create method</h4><p>While <code>add</code> and <code>addMany</code> accept a full model instance, you may also use the <code>create</code> method, that accepts a PHP array of attributes, creates a model, and inserts it into the database.</p><pre><code>$post = Post::find(1);

$comment = $post-&gt;comments()-&gt;create([
    &#39;message&#39; =&gt; &#39;A new comment.&#39;,
]);
</code></pre><p>Before using the <code>create</code> method, be sure to review the documentation on attribute <a href="./model.html#mass-assignment">mass assignment</a> as the attributes in the PHP array are restricted by the model&#39;s &quot;fillable&quot; definition.</p><h3 id="insert-via-dynamic-property"><a href="#insert-via-dynamic-property" class="header-anchor">#</a> Insert via dynamic property</h3><p>Relationships can be set directly via their properties in the same way you would access them. Setting a relationship using this approach will overwrite any relationship that existed previously. The model should be saved afterwards like you would with any attribute.</p><pre><code>$post-&gt;author = $author;

$post-&gt;comments = [$comment1, $comment2];

$post-&gt;save();
</code></pre><p>Alternatively you may set the relationship using the primary key, this is useful when working with HTML forms.</p><pre><code>// Assign to author with ID of 3
$post-&gt;author = 3;

// Assign comments with IDs of 1, 2 and 3
$post-&gt;comments = [1, 2, 3];

$post-&gt;save();
</code></pre><p>Relationships can be disassociated by assigning the NULL value to the property.</p><pre><code>$post-&gt;author = null;

$post-&gt;comments = null;

$post-&gt;save();
</code></pre><p>Similar to <a href="#deferred-binding">deferred binding</a>, relationships defined on non-existent models are deferred in memory until they are saved. In this example the post does not exist yet, so the <code>post_id</code> attribute cannot be set on the comment via <code>$post-&gt;comments</code>. Therefore the association is deferred until the post is created by calling the <code>save</code> method.</p><pre><code>$comment = Comment::find(1);

$post = new Post;

$post-&gt;comments = [$comment];

$post-&gt;save();
</code></pre><h3 id="many-to-many-relations"><a href="#many-to-many-relations" class="header-anchor">#</a> Many To Many relations</h3><h4 id="attaching-detaching"><a href="#attaching-detaching" class="header-anchor">#</a> Attaching / Detaching</h4><p>When working with many-to-many relationships, Models provide a few additional helper methods to make working with related models more convenient. For example, let&#39;s imagine a user can have many roles and a role can have many users. To attach a role to a user by inserting a record in the intermediate table that joins the models, use the <code>attach</code> method:</p><pre><code>$user = User::find(1);

$user-&gt;roles()-&gt;attach($roleId);
</code></pre><p>When attaching a relationship to a model, you may also pass an array of additional data to be inserted into the intermediate table:</p><pre><code>$user-&gt;roles()-&gt;attach($roleId, [&#39;expires&#39; =&gt; $expires]);
</code></pre><p>Of course, sometimes it may be necessary to remove a role from a user. To remove a many-to-many relationship record, use the <code>detach</code> method. The <code>detach</code> method will remove the appropriate record out of the intermediate table; however, both models will remain in the database:</p><pre><code>// Detach a single role from the user...
$user-&gt;roles()-&gt;detach($roleId);

// Detach all roles from the user...
$user-&gt;roles()-&gt;detach();
</code></pre><p>For convenience, <code>attach</code> and <code>detach</code> also accept arrays of IDs as input:</p><pre><code>$user = User::find(1);

$user-&gt;roles()-&gt;detach([1, 2, 3]);

$user-&gt;roles()-&gt;attach([1 =&gt; [&#39;expires&#39; =&gt; $expires], 2, 3]);
</code></pre><h4 id="syncing-for-convenience"><a href="#syncing-for-convenience" class="header-anchor">#</a> Syncing For convenience</h4><p>You may also use the <code>sync</code> method to construct many-to-many associations. The <code>sync</code> method accepts an array of IDs to place on the intermediate table. Any IDs that are not in the given array will be removed from the intermediate table. So, after this operation is complete, only the IDs in the array will exist in the intermediate table:</p><pre><code>$user-&gt;roles()-&gt;sync([1, 2, 3]);
</code></pre><p>You may also pass additional intermediate table values with the IDs:</p><pre><code>$user-&gt;roles()-&gt;sync([1 =&gt; [&#39;expires&#39; =&gt; true], 2, 3]);
</code></pre><h3 id="touching-parent-timestamps"><a href="#touching-parent-timestamps" class="header-anchor">#</a> Touching parent timestamps</h3><p>When a model <code>belongsTo</code> or <code>belongsToMany</code> another model, such as a <code>Comment</code> which belongs to a <code>Post</code>, it is sometimes helpful to update the parent&#39;s timestamp when the child model is updated. For example, when a <code>Comment</code> model is updated, you may want to automatically &quot;touch&quot; the <code>updated_at</code> timestamp of the owning <code>Post</code>. Just add a <code>touches</code> property containing the names of the relationships to the child model:</p><pre><code>class Comment extends Model
{
    /**
     * All of the relationships to be touched.
     */
    protected $touches = [&#39;post&#39;];

    /**
     * Relations
     */
    public $belongsTo = [
        &#39;post&#39; =&gt; [&#39;Acme\\Blog\\Models\\Post&#39;]
    ];
}
</code></pre><p>Now, when you update a <code>Comment</code>, the owning <code>Post</code> will have its <code>updated_at</code> column updated as well:</p><pre><code>$comment = Comment::find(1);

$comment-&gt;text = &#39;Edit to this comment!&#39;;

$comment-&gt;save();
</code></pre><h2 id="deferred-binding"><a href="#deferred-binding" class="header-anchor">#</a> Deferred binding</h2><p>Deferred bindings allows you to postpone model relationships binding until the master record commits the changes. This is particularly useful if you need to prepare some models (such as file uploads) and associate them to another model that doesn&#39;t exist yet.</p><p>You can defer any number of <strong>slave</strong> models against a <strong>master</strong> model using a <strong>session key</strong>. When the master record is saved along with the session key, the relationships to slave records are updated automatically for you. Deferred bindings are supported in the back-end <a href="./../backend/form.html">Form behavior</a> automatically, but you may want to use this feature in other places.</p><h3 id="generating-a-session-key"><a href="#generating-a-session-key" class="header-anchor">#</a> Generating a session key</h3><p>The session key is required for deferred bindings. You can think of a session key as of a transaction identifier. The same session key should be used for binding/unbinding relationships and saving the master model. You can generate the session key with PHP <code>uniqid()</code> function. Note that the <a href="./../cms/markup.html#forms">form helper</a> generates a hidden field containing the session key automatically.</p><pre><code>$sessionKey = uniqid(&#39;session_key&#39;, true);
</code></pre><h3 id="defer-a-relation-binding"><a href="#defer-a-relation-binding" class="header-anchor">#</a> Defer a relation binding</h3><p>The comment in the next example will not be added to the post unless the post is saved.</p><pre><code>$comment = new Comment;
$comment-&gt;content = &quot;Hello world!&quot;;
$comment-&gt;save();

$post = new Post;
$post-&gt;comments()-&gt;add($comment, $sessionKey);
</code></pre><blockquote><p><strong>Note</strong>: the <code>$post</code> object has not been saved but the relationship will be created if the saving happens.</p></blockquote><h3 id="defer-a-relation-unbinding"><a href="#defer-a-relation-unbinding" class="header-anchor">#</a> Defer a relation unbinding</h3><p>The comment in the next example will not be deleted unless the post is saved.</p><pre><code>$comment = Comment::find(1);
$post = Post::find(1);
$post-&gt;comments()-&gt;remove($comment, $sessionKey);
</code></pre><h3 id="list-all-bindings"><a href="#list-all-bindings" class="header-anchor">#</a> List all bindings</h3><p>Use the <code>withDeferred</code> method of a relation to load all records, including deferred. The results will include existing relations as well.</p><pre><code>$post-&gt;comments()-&gt;withDeferred($sessionKey)-&gt;get();
</code></pre><h3 id="cancel-all-bindings"><a href="#cancel-all-bindings" class="header-anchor">#</a> Cancel all bindings</h3><p>It&#39;s a good idea to cancel deferred binding and delete the slave objects rather than leaving them as orphans.</p><pre><code>$post-&gt;cancelDeferred($sessionKey);
</code></pre><h3 id="commit-all-bindings"><a href="#commit-all-bindings" class="header-anchor">#</a> Commit all bindings</h3><p>You can commit (bind or unbind) all deferred bindings when you save the master model by providing the session key with the second argument of the <code>save</code> method.</p><pre><code>$post = new Post;
$post-&gt;title = &quot;First blog post&quot;;
$post-&gt;save(null, $sessionKey);
</code></pre><p>The same approach works with the model&#39;s <code>create</code> method:</p><pre><code>$post = Post::create([&#39;title&#39; =&gt; &#39;First blog post&#39;], $sessionKey);
</code></pre><h3 id="lazily-commit-bindings"><a href="#lazily-commit-bindings" class="header-anchor">#</a> Lazily commit bindings</h3><p>If you are unable to supply the <code>$sessionKey</code> when saving, you can commit the bindings at any time using the the next code:</p><pre><code>$post-&gt;commitDeferred($sessionKey);
</code></pre><h3 id="clean-up-orphaned-bindings"><a href="#clean-up-orphaned-bindings" class="header-anchor">#</a> Clean up orphaned bindings</h3><p>Destroys all bindings that have not been committed and are older than 1 day:</p><pre><code>October\\Rain\\Database\\Models\\DeferredBinding::cleanUp(1);
</code></pre><blockquote><p><strong>Note:</strong> October automatically destroys deferred bindings that are older than 5 days. It happens when a back-end user logs into the system.</p></blockquote><h3 id="disable-deferred-binding"><a href="#disable-deferred-binding" class="header-anchor">#</a> Disable Deferred Binding</h3><p>Sometimes you might need to disable deferred binding entirely for a given model, for instance if you are loading it from a separate database connection. In order to do that, you need to make sure that the model&#39;s <code>sessionKey</code> property is <code>null</code> before the pre and post deferred binding hooks in the internal save method are run. To do that, you can bind to the model&#39;s <code>model.saveInternal</code> event:</p><pre><code>public function __construct()
{
    $result = parent::__construct(...func_get_args());
    $this-&gt;bindEvent(&#39;model.saveInternal&#39;, function () {
        $this-&gt;sessionKey = null;
    });
    return $result;
}
</code></pre><blockquote><p><strong>Note:</strong> This will disable deferred binding entirely for any model&#39;s you apply this override to.</p></blockquote>`,255))])}const w=d(h,[["render",p]]);export{v as __pageData,w as default};
