import{_ as n,r as s,o as a,c as i,e as t,a as c,s as d}from"./chunks/framework.CXcwiNg-.js";const y=JSON.parse('{"title":"Users & Permissions - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Users and Permissions","slug":"users-and-permissions","link":"#users-and-permissions","children":[]},{"level":2,"title":"Backend user helper","slug":"backend-user-helper","link":"#backend-user-helper","children":[]},{"level":2,"title":"Registering permissions","slug":"registering-permissions","link":"#registering-permissions","children":[]},{"level":2,"title":"Restricting access to back-end pages","slug":"restricting-access-to-back-end-pages","link":"#restricting-access-to-back-end-pages","children":[]},{"level":2,"title":"Restricting access to features","slug":"restricting-access-to-features","link":"#restricting-access-to-features","children":[]}],"relativePath":"1.x/backend/users.md","filePath":"1.x/backend/users.md"}'),h={name:"1.x/backend/users.md"};function l(p,e,u,g,m,f){const o=s("pre-heading"),r=s("post-heading");return a(),i("div",null,[t(o),e[0]||(e[0]=c("h1",null,"Users & Permissions",-1)),t(r),e[1]||(e[1]=d(`<p>The user management for the back-end includes features like roles, groups, permissions, password resets and sign-in throttling. Plugins can also register permissions that control access to the features in the back-end.</p><h2 id="users-and-permissions"><a href="#users-and-permissions" class="header-anchor">#</a> Users and Permissions</h2><p>Access to all parts of an OctoberCMS instance is controlled by the Permissions system. At the lowest level, there are Super Users (users with the <code>is_superuser</code> flag set to true), Administrators (users) and permissions. The <code>\\Backend\\Models\\User</code> models are the containers that hold all the important information about a user.</p><p>Super users have access to everything in the system and are only manageable by themselves or other superusers; they are not visible to nor editable by regular administrators, not even if an administrator has the <code>backend.manage_users</code> permission.</p><p>Permissions are string keys in the form of <code>author.plugin.permission_name</code> that are granted to users by either direct assignment on their Edit Administrator page or by inheritance through the user&#39;s Role.</p><p>When checking if a user has a specific permission, the permission settings for that user&#39;s role are inherited and then overridden by any permissions applied directly to that user. For example, if user <strong>Bob</strong> has role <strong>Genius</strong>, and role <strong>Genius</strong> has the <code>eat_cake</code> permission, but <strong>Bob</strong> has the <code>eat_cake</code> permission specifically set to deny then <strong>Bob</strong> will not get to <code>eat_cake</code>. However, if <strong>Bob</strong> has the permission <code>eat_vegetables</code> assigned directly to him, but the <strong>Genius</strong> role does not, then <strong>Bob</strong> still gets to <code>eat_vegetables</code>.</p><p>Roles (<code>\\Backend\\Models\\UserRole</code>) are groupings of permissions with a name and description used to identify the role. An Administrator can only have one role assigned to them at once. A Role could be assigned to multiple administrators. October ships with two system roles by default, <code>developer</code> and <code>publisher</code>. Any number of custom roles with their own combinations of permissions can be created and applied to users.</p><blockquote><p><strong>Note:</strong> Any user with the <code>manage_users</code> permissions can manage the assignment of roles, but only to other users (not to themselves), and roles can only be created or modified by a superuser.</p></blockquote><blockquote><p><strong>Note:</strong> System roles (<code>developer</code>, <code>publisher</code>, and any role with <code>is_system</code> set to <code>true</code>) cannot have their permissions changed through the Backend. They are assumed to have access to all permissions, unless a given permission specifies a specific role or roles that it applies to using the <code>roles</code> array key in the definition of the permission (in which case only that specified system role has access to it).</p></blockquote><p>Groups (<code>\\Backend\\Models\\UserGroup</code>) are an organizational tool for grouping administrators, they can be thought of as &quot;user categories&quot;. They have nothing to do with permissions and are strictly for organizational purposes. For instance, if you wanted to send an email to all users that are in the group <code>Head Office Staff</code>, you would simply do <code>Mail::sendTo(UserGroup::where(&#39;code&#39;, &#39;head-office-staff&#39;)-&gt;get()-&gt;users, &#39;author.plugin::mail.important_notification&#39;, $data);</code></p><h2 id="backend-user-helper"><a href="#backend-user-helper" class="header-anchor">#</a> Backend user helper</h2><p>The global <code>BackendAuth</code> facade can be used for managing administrative users, which primarily inherits the <code>October\\Rain\\Auth\\Manager</code> class. To register a new administrator user account, use the <code>BackendAuth::register</code> method.</p><pre><code>$user = BackendAuth::register([
    &#39;first_name&#39; =&gt; &#39;Some&#39;,
    &#39;last_name&#39; =&gt; &#39;User&#39;,
    &#39;login&#39; =&gt; &#39;someuser&#39;,
    &#39;email&#39; =&gt; &#39;some@website.tld&#39;,
    &#39;password&#39; =&gt; &#39;changeme&#39;,
    &#39;password_confirmation&#39; =&gt; &#39;changeme&#39;
]);
</code></pre><p>The <code>BackendAuth::check</code> method is a quick way to check if the user is signed in. To return the user model that is signed in, use <code>BackendAuth::getUser</code> instead. Additionally, the active user will be available as <code>$this-&gt;user</code> inside any <a href="./../backend/controllers-ajax.html">backend controller</a>.</p><pre><code>// Returns true if signed in.
$loggedIn = BackendAuth::check();

// Returns the signed in user
$user = BackendAuth::getUser();

// Returns the signed in user from a controller
$user = $this-&gt;user;
</code></pre><p>You may look up a user by their login name using the <code>BackendAuth::findUserByLogin</code> method.</p><pre><code>$user = BackendAuth::findUserByLogin(&#39;someuser&#39;);
</code></pre><p>You may authenticate a user by providing their login and password with <code>BackendAuth::authenticate</code>. You can also authenticate as a user simply by passing the <code>Backend\\Models\\User</code> model along with <code>BackendAuth::login</code>.</p><pre><code>// Authenticate user by credentials
$user = BackendAuth::authenticate([
    &#39;login&#39; =&gt; post(&#39;login&#39;),
    &#39;password&#39; =&gt; post(&#39;password&#39;)
]);

// Sign in as a specific user
BackendAuth::login($user);
</code></pre><h2 id="registering-permissions"><a href="#registering-permissions" class="header-anchor">#</a> Registering permissions</h2><p>Plugins can register back-end user permissions by overriding the <code>registerPermissions</code> method inside the <a href="./../plugin/registration.html#registration-file">Plugin registration class</a>. The permissions are defined as an array with keys corresponding the permission keys and values corresponding the permission descriptions. The permission keys consist of the author name, the plugin name and the feature name. Here is an example code:</p><pre><code>acme.blog.access_categories
</code></pre><p>The next example shows how to register back-end permission items. Permissions are defined with a permission key and description. In the back-end permission management user interface permissions are displayed as a checkbox list. Back-end controllers can use permissions defined by plugins for restricting the user access to <a href="#restricting-access-to-backend-pages">pages</a> or <a href="#restricting-access-to-features">features</a>.</p><pre><code>public function registerPermissions()
{
    return [
        &#39;acme.blog.access_posts&#39; =&gt; [
            &#39;label&#39; =&gt; &#39;Manage the blog posts&#39;,
            &#39;tab&#39; =&gt; &#39;Blog&#39;,
            &#39;order&#39; =&gt; 200,
        ],
        // ...
    ];
}
</code></pre><p>You may also specify a <code>roles</code> option as an array with each value as a role API code. When a role is created with this code, it becomes a system role that always grants this permission to users with that role.</p><pre><code>public function registerPermissions()
{
    return [
        &#39;acme.blog.access_categories&#39; =&gt; [
            &#39;label&#39; =&gt; &#39;Manage the blog categories&#39;,
            &#39;tab&#39; =&gt; &#39;Blog&#39;,
            &#39;order&#39; =&gt; 200,
            &#39;roles&#39; =&gt; [&#39;developer&#39;]
        ]
        // ...
    ];
}
</code></pre><h2 id="restricting-access-to-back-end-pages"><a href="#restricting-access-to-back-end-pages" class="header-anchor">#</a> Restricting access to back-end pages</h2><p>In a back-end controller class you can specify which permissions are required for access the pages provided by the controller. It&#39;s done with the <code>$requiredPermissions</code> controller&#39;s property. This property should contain an array of permission keys. If the user permissions match any permission from the list, the framework will let the user to see the controller pages.</p><pre><code>&lt;?php namespace Acme\\Blog\\Controllers;

use Backend\\Classes\\BackendController;

class Posts extends BackendController
{
    public $requiredPermissions = [&#39;acme.blog.access_posts&#39;];
}
</code></pre><p>You can also use the <strong>asterisk</strong> symbol to indicate the &quot;all permissions&quot; condition. In the next example the controller pages are accessible for all users who has any permissions starting with the &quot;acme.blog.&quot; string:</p><pre><code>public $requiredPermissions = [&#39;acme.blog.*&#39;];
</code></pre><h2 id="restricting-access-to-features"><a href="#restricting-access-to-features" class="header-anchor">#</a> Restricting access to features</h2><p>The back-end user model has methods that allow to determine whether the user has specific permissions. You can use this feature in order to limit the functionality of the back-end user interface. The permission methods supported by the back-end user are <code>hasAccess</code> and <code>hasPermission</code>. Both methods take two parameters: the permission key string (or an array of key strings) and an optional parameter indicating that all permissions listed with the first parameters are required.</p><p>The <code>hasAccess</code> method returns <strong>true</strong> for any permission if the user is a superuser (<code>is_superuser</code> set to <code>true</code>). The <code>hasPermission</code> method is more strict, only returning true if the user actually has the specified permissions either in their account or through their role. Generally, <code>hasAccess</code> is the preferred method to use as it respects the absolute power of the superuser. The following example shows how to use the methods in the controller code:</p><pre><code>if ($this-&gt;user-&gt;hasAccess(&#39;acme.blog.*&#39;)) {
    // ...
}

if ($this-&gt;user-&gt;hasPermission([
    &#39;acme.blog.access_posts&#39;,
    &#39;acme.blog.access_categories&#39;
])) {
    // ...
}
</code></pre><p>You can also use the methods in the back-end views for hiding user interface elements. The next examples demonstrates how you can hide a button on the Edit Category <a href="./forms.html">back-end form</a>:</p><pre><code>&lt;?php if ($this-&gt;user-&gt;hasAccess(&#39;acme.blog.delete_categories&#39;)): ?&gt;
    &lt;button
        type=&quot;button&quot;
        class=&quot;oc-icon-trash-o btn-icon danger pull-right&quot;
        data-request=&quot;onDelete&quot;
        data-load-indicator=&quot;Deleting Category...&quot;
        data-request-confirm=&quot;Do you really want to delete this category?&quot;&gt;
    &lt;/button&gt;
&lt;?php endif ?&gt;
</code></pre>`,37))])}const k=n(h,[["render",l]]);export{y as __pageData,k as default};
