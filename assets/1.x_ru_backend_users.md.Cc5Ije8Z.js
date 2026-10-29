import{_ as n,r as s,o as r,c,e as t,a as i,s as l}from"./chunks/framework.CXcwiNg-.js";const f=JSON.parse('{"title":"Пользователи и права - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Ограничение доступа","slug":"ограничение-доступа","link":"#ограничение-доступа","children":[]},{"level":2,"title":"Ограничение доступа к административным страницам","slug":"ограничение-доступа-к-административным-страницам","link":"#ограничение-доступа-к-административным-страницам","children":[]},{"level":2,"title":"Ограничение доступа к функционалу","slug":"ограничение-доступа-к-функционалу","link":"#ограничение-доступа-к-функционалу","children":[]}],"relativePath":"1.x/ru/backend/users.md","filePath":"1.x/ru/backend/users.md"}'),d={name:"1.x/ru/backend/users.md"};function p(g,e,u,h,m,_){const o=s("pre-heading"),a=s("post-heading");return r(),c("div",null,[t(o),e[0]||(e[0]=i("h1",null,"Пользователи и права",-1)),t(a),e[1]||(e[1]=l(`<p><a name="permission-registration" class="anchor"></a></p><h2 id="ограничение-доступа"><a href="#ограничение-доступа" class="header-anchor">#</a> Ограничение доступа</h2><p>Плагины могут создавать свои права при помощи метода <code>registerPermissions()</code>, который находится в классе <a href="./../plugin/registration.html#navigation-permissions">регистрации плагина</a>. Права представляют из себя массив, где значение - это описание доступа, а ключ - название доступа. Название доступа состоит из имени автора плагина, его названия и названия функционала. Пример:</p><pre><code>public function registerPermissions()
{
    return [
        &#39;acme.blog.access_posts&#39; =&gt; [
            &#39;label&#39; =&gt; &#39;Manage the blog posts&#39;,
            &#39;tab&#39; =&gt; &#39;Blog&#39;
        ],
        &#39;acme.blog.access_categories&#39; =&gt; [
            &#39;label&#39; =&gt; &#39;Manage the blog categories&#39;,
            &#39;tab&#39; =&gt; &#39;Blog&#39;
        ]
    ];
}
</code></pre><p><a name="page-access" class="anchor"></a></p><h2 id="ограничение-доступа-к-административным-страницам"><a href="#ограничение-доступа-к-административным-страницам" class="header-anchor">#</a> Ограничение доступа к административным страницам</h2><p>В классе контроллера Вы можете указать права, которые необходимо иметь пользователю для получения доступа к страницам контроллера. Это делается при помощи свойства <code>$requiredPermissions</code> типа массив, в котором перечисляются ключи указанные в методе <code>$registerPermissions</code>. Если права пользователя совпадают с одним из значений массива, то OctoberCMS пустит пользователя на нужную ему страницу. Пример:</p><pre><code>&lt;?php namespace Acme\\Blog\\Controllers;

use Backend\\Classes\\BackendController;

class Posts extends BackendController
{
    public $requiredPermissions = [&#39;acme.blog.access_posts&#39;];
</code></pre><p>Вы можете использовать символ <code>*</code> для не строгой проверки. В следующем примере контроллер доступен для всех пользователей, которые имеют права и начинаются с &quot;acme.blog.&quot;:</p><pre><code>public $requiredPermissions = [&#39;acme.blog.*&#39;];
</code></pre><p><a name="features" class="anchor"></a></p><h2 id="ограничение-доступа-к-функционалу"><a href="#ограничение-доступа-к-функционалу" class="header-anchor">#</a> Ограничение доступа к функционалу</h2><p>Модель, в которой хранится информация о зарегистрированных пользователях имеет методы для проверки прав: <code>hasPermission()</code> и <code>hasAccess()</code>. Вы можете использовать их, чтобы ограничить доступ к некоторому функционалу административного интерфейса. Оба метода принимают два параметра: название доступа (или массив с названиями) и необязательный параметр, который указывает на то, что все значения в первом параметре являются обязательными.</p><p>Метод <code>hasAccess()</code> возвращает <strong>true</strong> для всех доступов, если пользователь - администратор. Метод <code>hasPermission()</code> - более строгий. В следующем примере показано, как использовать эти методы в контроллере:</p><pre><code>if ($this-&gt;user-&gt;hasAccess(&#39;acme.blog.*&#39;))
    ...

if ($this-&gt;user-&gt;hasPermission([&#39;acme.blog.access_posts&#39;, &#39;acme.blog.access_categories&#39;]))
    ...
</code></pre><p>Вы также можете применять эти методы в представлениях, чтобы скрыть определенные элементы:</p><pre><code>&lt;?php if ($this-&gt;user-&gt;hasAccess(&#39;acme.blog.delete_categories&#39;)): ?&gt;
    &lt;button
        type=&quot;button&quot;
        class=&quot;oc-icon-trash-o btn-icon danger pull-right&quot;
        data-request=&quot;onDelete&quot;
        data-load-indicator=&quot;Deleting Category...&quot;
        data-request-confirm=&quot;Do you really want to delete this category?&quot;&gt;
    &lt;/button&gt;
&lt;?php endif ?&gt;
</code></pre>`,17))])}const q=n(d,[["render",p]]);export{f as __pageData,q as default};
