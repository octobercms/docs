import{_ as i,r as t,o as l,c as d,e as a,a as e,d as n,s as c}from"./chunks/framework.CXcwiNg-.js";const y=JSON.parse('{"title":"Developer Guide - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Writing documentation","slug":"writing-documentation","link":"#writing-documentation","children":[]},{"level":2,"title":"Exceptions to PSR standards","slug":"exceptions-to-psr-standards","link":"#exceptions-to-psr-standards","children":[{"level":3,"title":"Controller methods can have a single underscore","slug":"controller-methods-can-have-a-single-underscore","link":"#controller-methods-can-have-a-single-underscore","children":[]},{"level":3,"title":"Subsequent expressions are on a new line","slug":"subsequent-expressions-are-on-a-new-line","link":"#subsequent-expressions-are-on-a-new-line","children":[]}]},{"level":2,"title":"Developer standards and patterns","slug":"developer-standards-and-patterns","link":"#developer-standards-and-patterns","children":[{"level":3,"title":"Vendor naming","slug":"vendor-naming","link":"#vendor-naming","children":[]},{"level":3,"title":"Repository naming","slug":"repository-naming","link":"#repository-naming","children":[]},{"level":3,"title":"PHP Variable naming","slug":"php-variable-naming","link":"#php-variable-naming","children":[]},{"level":3,"title":"HTML element naming","slug":"html-element-naming","link":"#html-element-naming","children":[]},{"level":3,"title":"View file naming","slug":"view-file-naming","link":"#view-file-naming","children":[]},{"level":3,"title":"Class naming","slug":"class-naming","link":"#class-naming","children":[]},{"level":3,"title":"Event naming","slug":"event-naming","link":"#event-naming","children":[]},{"level":3,"title":"Database table naming","slug":"database-table-naming","link":"#database-table-naming","children":[]},{"level":3,"title":"Component naming","slug":"component-naming","link":"#component-naming","children":[]},{"level":3,"title":"Controller naming","slug":"controller-naming","link":"#controller-naming","children":[]},{"level":3,"title":"Model naming","slug":"model-naming","link":"#model-naming","children":[]},{"level":3,"title":"Model scopes","slug":"model-scopes","link":"#model-scopes","children":[]},{"level":3,"title":"Class guidance","slug":"class-guidance","link":"#class-guidance","children":[]}]},{"level":2,"title":"Environment configuration","slug":"environment-configuration","link":"#environment-configuration","children":[{"level":3,"title":"Use strict mode with MySQL","slug":"use-strict-mode-with-mysql","link":"#use-strict-mode-with-mysql","children":[]}]}],"relativePath":"1.x/help/developer-guide.md","filePath":"1.x/help/developer-guide.md"}'),h={name:"1.x/help/developer-guide.md"};function p(m,o,u,g,f,v){const r=t("pre-heading"),s=t("post-heading");return l(),d("div",null,[a(r),o[0]||(o[0]=e("h1",null,"Developer Guide",-1)),a(s),o[1]||(o[1]=e("h2",{id:"writing-documentation"},[e("a",{href:"#writing-documentation",class:"header-anchor"},"#"),n(" Writing documentation")],-1)),o[2]||(o[2]=e("p",null,"Your contributions to the October documentation are very welcome. Please follow the next rules if you want to contribute. How to style perfect October documentation pages:",-1)),o[3]||(o[3]=e("ol",null,[e("li",null,"Each page that has at least one H2 header should have a TOC list. The TOC list should be the first element after the H1 header. The TOC should have links to all H2 headers on the page."),e("li",null,"There should be an introductory text below the TOC, even if there is the Introduction section. You may want to get rid of the Introduction section if it's not really needed. Don't leave the TOC alone."),e("li",null,"Try to use only H2 and H3 headers."),e("li",null,[n("Each H2 and H3 header should have a link defined as "),e("code",null,'<a name="page-cycle-handlers"></a>')]),e("li",null,"Only use UL tags for TOC lists."),e("li",null,"Avoid short, 1 sentence, paragraphs. Merge short paragraphs and try to be a bit more verbose."),e("li",null,"Avoid short hanging paragraphs below code sections. Merge such paragraphs with the text above the code blocks."),e("li",null,[n("Use the inline "),e("code",null,"code"),n(" tags for everything related to code - variable names, function names, syntax examples, etc.")]),e("li",null,[n("Use the "),e("strong",null,"strong"),n(" tag for everything else.")]),e("li",null,"Don't hesitate to make cross links to other documentation articles. Adding links to the same article in the same paragraph is not necessary."),e("li",null,[n("See the "),e("a",{href:"https://github.com/octobercms/docs/blob/develop/1.x/cms/pages.md",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[n("cms-pages.md"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),n(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),n(),e("span",{class:"sr-only"},"(opens new window)")])]),n(" or "),e("a",{href:"https://github.com/octobercms/docs/blob/develop/1.x/cms/themes.md",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[n("cms-themes.md"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),n(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),n(),e("span",{class:"sr-only"},"(opens new window)")])]),n(" files for your reference.")])],-1)),o[4]||(o[4]=c(`<h2 id="exceptions-to-psr-standards"><a href="#exceptions-to-psr-standards" class="header-anchor">#</a> Exceptions to PSR standards</h2><p>There are some exceptions to the PSR standard used by October.</p><h3 id="controller-methods-can-have-a-single-underscore"><a href="#controller-methods-can-have-a-single-underscore" class="header-anchor">#</a> Controller methods can have a single underscore</h3><p>PSR-2 states that methods must be in <strong>camelCase</strong>. However, in Backend controllers October will prefix AJAX handlers with the action name to define a controlled context. For example:</p><pre><code>public function index()
{
    // This is the index page (index action)
}

public function index_onDoSomething()
{
    // AJAX handler only works on the index action
}

public function onDoSomethingElse()
{
    // AJAX handler works globally for all actions
}
</code></pre><p>An exception must be granted for these scenarios.</p><h3 id="subsequent-expressions-are-on-a-new-line"><a href="#subsequent-expressions-are-on-a-new-line" class="header-anchor">#</a> Subsequent expressions are on a new line</h3><p>PSR-2 does not explicitly state that subsequent expressions should be on the same line as the closing parenthesis.</p><p>The following code is considered valid and is recommended for better spacing between logic:</p><pre><code>if ($expr1) {
    // if body
}
elseif ($expr2) {
    // elseif body
}
else {
    // else body;
}

try {
    // try body
}
catch (FirstExceptionType $e) {
    // catch body
}
catch (OtherExceptionType $e) {
    // catch body
}
</code></pre><p>This is an acceptable preference based on a technicality, PSR-1 and PSR-2 are not explicit when using SHOULD, MUST, etc. in this case. However, at the time of writing, the PSR-2 codesniffer rules say it&#39;s not valid, so an exception may be required.</p><h2 id="developer-standards-and-patterns"><a href="#developer-standards-and-patterns" class="header-anchor">#</a> Developer standards and patterns</h2><p>This section describes some standards that we highly recommend to follow for everybody, especially if you are going to publish your products on the Marketplace.</p><h3 id="vendor-naming"><a href="#vendor-naming" class="header-anchor">#</a> Vendor naming</h3><p>The vendor or author code in a namespace must begin with an uppercase character and should not contain underscores or dashes. These are examples of valid names:</p><pre><code>Acme.Blog
RainLab.User
Happygilmore.Golf
</code></pre><p>These are examples of names that are <strong>not</strong> valid:</p><pre><code>acme.blog
rainLab.user
Happy_gilmore.Golf
</code></pre><h3 id="repository-naming"><a href="#repository-naming" class="header-anchor">#</a> Repository naming</h3><p>When publishing work to a repository, such as Git, use the following naming as a convention. Plugins should be named with a <code>-plugin</code> suffix and optional <code>oc-</code> prefix.</p><pre><code>blog-plugin
oc-blog-plugin
</code></pre><p>Themes should be named with the <code>-theme</code> suffix and optional <code>oc-</code> prefix.</p><pre><code>happy-theme
oc-happy-theme
</code></pre><h3 id="php-variable-naming"><a href="#php-variable-naming" class="header-anchor">#</a> PHP Variable naming</h3><p>Use <strong>camelCase</strong> everywhere except for the following:</p><ol><li>Database attributes and relationships should use <strong>snake_case</strong></li><li>Postback parameters and HTML elements should use <strong>snake_case</strong></li><li>Language keys should use <strong>snake_case</strong></li></ol><h3 id="html-element-naming"><a href="#html-element-naming" class="header-anchor">#</a> HTML element naming</h3><p>Form element names should use snake_case (underscores)</p><pre><code>&lt;input name=&quot;first_name&quot;&gt;
</code></pre><p>Where the name is an array, the array keys can be either StudlyCase or snake_case.</p><pre><code>&lt;input name=&quot;ForumMember[first_name]&quot;&gt;
&lt;input name=&quot;forum_member[first_name]&quot;&gt;
</code></pre><p>Element IDs should be camel case or hyphen-case (dashes)</p><pre><code>&lt;div id=&quot;firstNameGroup&quot;&gt;
    &lt;input id=&quot;firstName&quot;&gt;
&lt;/div&gt;

&lt;div id=&quot;first-name-group&quot;&gt;
    &lt;input id=&quot;first-name&quot;&gt;
&lt;/div&gt;
</code></pre><p>Element classes names should use hyphen-case (dashes)</p><pre><code>&lt;div class=&quot;form-group&quot;&gt;
    &lt;input class=&quot;form-control&quot;&gt;
&lt;/div&gt;
</code></pre><h3 id="view-file-naming"><a href="#view-file-naming" class="header-anchor">#</a> View file naming</h3><p>Partial views should begin with an underscore character. Whereas Controller and Layout views do not begin with an underscore character. Since views are often found in a single folder, the underscore (_) and dash (-) characters can be used to organise the files. A dash is used as a substitute for a space character. An underscore is used as a substitute for a slash character (folder or namespace).</p><pre><code>index_fancy-layout.htm       &lt;== Index\\Fancy layout
form-with-sidebar.htm        &lt;== Form with sidebar
_field-container.htm         &lt;== Field container (partial)
_field_baloon-selector.htm   &lt;== Field\\Baloon Selector (partial)
</code></pre><p>View files must end with the <code>.htm</code> file extension.</p><h3 id="class-naming"><a href="#class-naming" class="header-anchor">#</a> Class naming</h3><p>Classes commonly are placed in the <code>classes</code> directory. There is a number of class suffixes and prefixes that we recommend to use.</p><ol><li>Manager</li><li>Builder</li><li>Writer</li><li>Reader</li><li>Handler</li><li>Container</li><li>Protocol</li><li>Target</li><li>Converter</li><li>Controller</li><li>View</li><li>Factory</li><li>Entity</li><li>Engine</li><li>Bag</li></ol><blockquote><p>Don&#39;t get naming paralysis. Yes, names are very important but they&#39;re not important enough to waste huge amounts of time on. If you can&#39;t think up a good name in five minutes, move on.</p></blockquote><h3 id="event-naming"><a href="#event-naming" class="header-anchor">#</a> Event naming</h3><p>When specifying <a href="./../../docs/services/events.html">event names</a>. The term <em>after</em> is not used in Events, only the term <em>before</em> is used. For example:</p><ol><li><strong>beforeSetAttribute</strong> - this event comes <em>before</em> any default logic.</li><li><strong>setAttribute</strong> - this event comes <em>after</em> any default logic.</li></ol><p>Where possible events should cover global and local versions. Global events should be prefixed with the module or plugin name. For example:</p><pre><code>// For global events, it is prefixed with the module or plugin code
Event::fire(&#39;cms.page.end&#39;);

// For local events, the prefix is not required
$this-&gt;fireEvent(&#39;page.end&#39;);
</code></pre><p>Avoid using terms such as <em>onSomething</em> in event names since the word <em>bind</em>/<em>fire</em> represent this action word.</p><p>It is good practise to always pass the calling object as the first parameter to the global event, the local event should not need this. Local events take priority over global events when halting, or come first when processing.</p><pre><code>// Local event
if ($this-&gt;fireEvent(&#39;beforeAddContent&#39;, [$message, $view], true) === false)
    return;

// Global event
if (Event::fire(&#39;mailer.beforeAddContent&#39;, [$this, $message, $view], true) === false)
    return;
</code></pre><p>When expecting multiple results, it is easy to combine the arrays like so:</p><pre><code>// Combine local and global event results
$eventResults = array_merge(
    $this-&gt;fireEvent(&#39;form.beforeRefresh&#39;, [$saveData]),
    Event::fire(&#39;backend.form.beforeRefresh&#39;, [$this, $saveData])
);
</code></pre><h3 id="database-table-naming"><a href="#database-table-naming" class="header-anchor">#</a> Database table naming</h3><p>Tables names should be prefixed with the author and plugin name.</p><pre><code>acme_blog_xxx
</code></pre><p>Boolean column names should be prefixed with <code>is_</code></p><pre><code>is_activated
is_visible
</code></pre><p>This is because the model attributes can conflict, for example, <code>public $visible;</code> in the Model class conflicts with a database column with the same name. Some column names are exceptions, for example <code>notify_user</code>.</p><p>If your plugin extends tables belonging to other plugins, the added column names should be prefixed with the author and plugin name:</p><pre><code>acme_blog_category_id
</code></pre><p>The author and plugin name acronym is acceptable too:</p><pre><code>ab_category_id
</code></pre><h3 id="component-naming"><a href="#component-naming" class="header-anchor">#</a> Component naming</h3><p>Component classes are commonly place in the <code>components</code> directory. The name of a component should represent its primary function.</p><p>To display a list of records, use the <code>List</code> suffix, eg:</p><pre><code>ProductList
ProductReviewList
CategoryList
</code></pre><p>To display a single record, use the <code>Details</code> suffix, eg:</p><pre><code>ProductDetails
CategoryDetails
</code></pre><p>Using the suffix helps avoid conflicts with controller and model names. Alternatively you can name components without the suffix, for cases when the name is descriptive and does not conflict:</p><pre><code>ProductReviews
CustomerCheckout
SeoDirectory
UserProfile
</code></pre><h3 id="controller-naming"><a href="#controller-naming" class="header-anchor">#</a> Controller naming</h3><p>Controllers are commonly are placed in <code>controllers</code> directory, for back-end controllers. The name of a controller should be a plural, for example:</p><pre><code>People
Products
Categories
ProductCategories
</code></pre><h3 id="model-naming"><a href="#model-naming" class="header-anchor">#</a> Model naming</h3><p>Models are commonly are placed in <code>models</code> directory. The name of a model should be a singular, for example:</p><pre><code>Person
Product
Category
ProductCategory
</code></pre><p>When extending other models, you should prefix the field with at least the plugin name.</p><pre><code>User::extend(function($model) {
    $model-&gt;hasOne[&#39;forum_member&#39;] = [&#39;RainLab\\Forum\\Models\\Member&#39;];
});
</code></pre><p>The fully qualified plugin name is also acceptable, for example:</p><pre><code>$user-&gt;rainlab_forum_member
</code></pre><h3 id="model-scopes"><a href="#model-scopes" class="header-anchor">#</a> Model scopes</h3><p>If a model scope returns a query object, used for chaining, they should be prefixed with <code>apply</code> to indicate they are being applied to the query. Defined as:</p><pre><code>public function scopeApplyUser($query, $user)
{
    return $query-&gt;where(&#39;user_id&#39;, $user-&gt;id);
}
</code></pre><p>Then applied to the model as:</p><pre><code>$model-&gt;applyUser($user);
</code></pre><p>Whilst <code>apply</code> is the ideal prefix name, here are some other prefixes we recommended for chained scopes:</p><pre><code>- is
- for
- with
- without
- filter
</code></pre><p>If a scope returns anything other than a query then any name can be used. Some acceptable names for non-chained scopes:</p><pre><code>- find
- get
- list
- lists
</code></pre><h3 id="class-guidance"><a href="#class-guidance" class="header-anchor">#</a> Class guidance</h3><p>These points are to be considered in a relaxed fashion:</p><ol><li>In classes, properties and methods should be declared as <code>protected</code> in favor of <code>private</code>. So all classes can be used as base classes.</li><li>If a property contains a single value (not an array), make the property <code>public</code> instead of a get/set approach.</li><li>If a property contains a collection (is an array), make the property <code>protected</code> with get <code>getProperties</code>, <code>getProperty</code> and <code>setProperty</code>.</li></ol><h2 id="environment-configuration"><a href="#environment-configuration" class="header-anchor">#</a> Environment configuration</h2><h3 id="use-strict-mode-with-mysql"><a href="#use-strict-mode-with-mysql" class="header-anchor">#</a> Use strict mode with MySQL</h3>`,95)),o[5]||(o[5]=e("p",null,[n("When MySQL "),e("a",{href:"http://dev.mysql.com/doc/refman/5.0/en/sql-mode.html",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[n("STRICT_TRANS_TABLES mode"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),n(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),n(),e("span",{class:"sr-only"},"(opens new window)")])]),n(" is enabled the server performs strict data type validation. It is highly recommended to keep this mode enabled in MySQL during the development. This allows you to find errors before your code gets to a client's server with the enabled strict mode. The mode can be enabled in my.cnf (Unix) or my.ini (Windows) file:")],-1)),o[6]||(o[6]=e("pre",null,[e("code",null,`sql_mode=STRICT_TRANS_TABLES
`)],-1))])}const w=i(h,[["render",p]]);export{y as __pageData,w as default};
