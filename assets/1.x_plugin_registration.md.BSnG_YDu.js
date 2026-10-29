import{_ as a,r,o as d,c as u,e as o,a as e,s as i,d as t}from"./chunks/framework.CXcwiNg-.js";const v=JSON.parse('{"title":"Registration - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":3,"title":"Directory structure","slug":"directory-structure","link":"#directory-structure","children":[]},{"level":3,"title":"Plugin namespaces","slug":"plugin-namespaces","link":"#plugin-namespaces","children":[]},{"level":2,"title":"Registration file","slug":"registration-file","link":"#registration-file","children":[{"level":3,"title":"Registration methods","slug":"registration-methods","link":"#registration-methods","children":[]},{"level":3,"title":"Basic plugin information","slug":"basic-plugin-information","link":"#basic-plugin-information","children":[]}]},{"level":2,"title":"Routing and initialization","slug":"routing-and-initialization","link":"#routing-and-initialization","children":[]},{"level":2,"title":"Dependency definitions","slug":"dependency-definitions","link":"#dependency-definitions","children":[]},{"level":2,"title":"Extending Twig","slug":"extending-twig","link":"#extending-twig","children":[]},{"level":2,"title":"Navigation menus","slug":"navigation-menus","link":"#navigation-menus","children":[]},{"level":2,"title":"Registering middleware","slug":"registering-middleware","link":"#registering-middleware","children":[]},{"level":2,"title":"Elevated permissions","slug":"elevated-permissions","link":"#elevated-permissions","children":[]}],"relativePath":"1.x/plugin/registration.md","filePath":"1.x/plugin/registration.md"}'),c={name:"1.x/plugin/registration.md"};function g(h,n,p,m,f,b){const s=r("pre-heading"),l=r("post-heading");return d(),u("div",null,[o(s),n[0]||(n[0]=e("h1",null,"Registration",-1)),o(l),n[1]||(n[1]=i(`<p>Plugins are the foundation for adding new features to the CMS by extending it. This article describes the component registration. The registration process allows plugins to declare their features such as <a href="./components.html">components</a> or back-end menus and pages. Some examples of what a plugin can do:</p><ol><li>Define <a href="./components.html">components</a>.</li><li>Define <a href="./../backend/users.html">user permissions</a>.</li><li>Add <a href="./settings.html#backend-settings-pages">settings pages</a>, <a href="#navigation-menus">menu items</a>, <a href="./../backend/lists.html">lists</a> and <a href="./../backend/forms.html">forms</a>.</li><li>Create <a href="./updates.html">database table structures and seed data</a>.</li><li>Alter <a href="./events.html">functionality of the core or other plugins</a>.</li><li>Provide classes, <a href="./../backend/controllers-ajax.html">back-end controllers</a>, views, assets, and other files.</li></ol><h3 id="directory-structure"><a href="#directory-structure" class="header-anchor">#</a> Directory structure</h3><p>Plugins reside in the <strong>/plugins</strong> subdirectory of the application directory. An example of a plugin directory structure:</p><pre><code>plugins/
  acme/              &lt;=== Author name
    blog/            &lt;=== Plugin name
      classes/
      components/
      controllers/
      models/
      updates/
      ...
      Plugin.php     &lt;=== Plugin registration file
</code></pre><p>Not all plugin directories are required. The only required file is the <strong>Plugin.php</strong> described below. If your plugin provides only a single <a href="./components.html">component</a>, your plugin directory could be much simpler, like this:</p><pre><code>plugins/
  acme/              &lt;=== Author name
    blog/            &lt;=== Plugin name
      components/
      Plugin.php     &lt;=== Plugin registration file
</code></pre>`,7)),n[2]||(n[2]=e("blockquote",null,[e("p",null,[e("strong",null,"Note:"),t(" if you are developing a plugin for the "),e("a",{href:"http://octobercms.com/help/site/marketplace",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[t("Marketplace"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),t(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),t(),e("span",{class:"sr-only"},"(opens new window)")])]),t(", the "),e("a",{href:"./updates.html"},"updates/version.yaml"),t(" file is required.")])],-1)),n[3]||(n[3]=e("h3",{id:"plugin-namespaces"},[e("a",{href:"#plugin-namespaces",class:"header-anchor"},"#"),t(" Plugin namespaces")],-1)),n[4]||(n[4]=e("p",null,[t("Plugin namespaces are very important, especially if you are going to publish your plugins on the "),e("a",{href:"http://octobercms.com/plugins",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[t("October Marketplace"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),t(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),t(),e("span",{class:"sr-only"},"(opens new window)")])]),t(". When you register as an author on the Marketplace you will be asked for the author code which should be used as a root namespace for all your plugins. You can specify the author code only once, when you register. The default author code offered by the Marketplace consists of the author first and last name: JohnSmith. The code cannot be changed after you register. All your plugin namespaces should be defined under the root namespace, for example "),e("code",null,"\\JohnSmith\\Blog"),t(".")],-1)),n[5]||(n[5]=i(`<h2 id="registration-file"><a href="#registration-file" class="header-anchor">#</a> Registration file</h2><p>The <strong>Plugin.php</strong> file, called the <em>Plugin registration file</em>, is an initialization script that declares a plugin&#39;s core functions and information. Registration files can provide the following:</p><ol><li>Information about the plugin, its name, and author.</li><li>Registration methods for extending the CMS.</li></ol><p>Registration scripts should use the plugin namespace. The registration script should define a class with the name <code>Plugin</code> that extends the <code>\\System\\Classes\\PluginBase</code> class. The only required method of the plugin registration class is <code>pluginDetails</code>. An example Plugin registration file:</p><pre><code>namespace Acme\\Blog;

class Plugin extends \\System\\Classes\\PluginBase
{
    public function pluginDetails()
    {
        return [
            &#39;name&#39; =&gt; &#39;Blog Plugin&#39;,
            &#39;description&#39; =&gt; &#39;Provides some really cool blog features.&#39;,
            &#39;author&#39; =&gt; &#39;ACME Corporation&#39;,
            &#39;icon&#39; =&gt; &#39;icon-leaf&#39;
        ];
    }

    public function registerComponents()
    {
        return [
            &#39;Acme\\Blog\\Components\\Post&#39; =&gt; &#39;blogPost&#39;
        ];
    }
}
</code></pre><h3 id="registration-methods"><a href="#registration-methods" class="header-anchor">#</a> Registration methods</h3><p>The following methods are supported in the plugin registration class:</p><div class="table"><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><strong>pluginDetails()</strong></td><td>returns information about the plugin.</td></tr><tr><td><strong>register()</strong></td><td>register method, called when the plugin is first registered.</td></tr><tr><td><strong>boot()</strong></td><td>boot method, called right before the request route.</td></tr><tr><td><strong>registerMarkupTags()</strong></td><td>registers <a href="#extending-twig">additional markup tags</a> that can be used in the CMS.</td></tr><tr><td><strong>registerComponents()</strong></td><td>registers any <a href="./components.html#component-registration">front-end components</a> used by this plugin.</td></tr><tr><td><strong>registerNavigation()</strong></td><td>registers <a href="#navigation-menus">back-end navigation menu items</a> for this plugin.</td></tr><tr><td><strong>registerPermissions()</strong></td><td>registers any <a href="./../backend/users.html#registering-permissions">back-end permissions</a> used by this plugin.</td></tr><tr><td><strong>registerSettings()</strong></td><td>registers any <a href="./settings.html#settings-link-registration">back-end configuration links</a> used by this plugin.</td></tr><tr><td><strong>registerFormWidgets()</strong></td><td>registers any <a href="./../backend/widgets.html#form-widget-registration">back-end form widgets</a> supplied by this plugin.</td></tr><tr><td><strong>registerReportWidgets()</strong></td><td>registers any <a href="./../backend/widgets.html#report-widget-registration">back-end report widgets</a>, including the dashboard widgets.</td></tr><tr><td><strong>registerListColumnTypes()</strong></td><td>registers any <a href="./../backend/lists.html#custom-column-types">custom list column types</a> supplied by this plugin.</td></tr><tr><td><strong>registerMailLayouts()</strong></td><td>registers any <a href="./mail.html#registering-mail-layouts-templates-partials">mail view layouts</a> supplied by this plugin.</td></tr><tr><td><strong>registerMailTemplates()</strong></td><td>registers any <a href="./mail.html#registering-mail-layouts-templates-partials">mail view templates</a> supplied by this plugin.</td></tr><tr><td><strong>registerMailPartials()</strong></td><td>registers any <a href="./mail.html#registering-mail-layouts-templates-partials">mail view partials</a> supplied by this plugin.</td></tr><tr><td><strong>registerSchedule()</strong></td><td>registers <a href="./../plugin/scheduling.html#defining-schedules">scheduled tasks</a> that are executed on a regular basis.</td></tr></tbody></table></div><h3 id="basic-plugin-information"><a href="#basic-plugin-information" class="header-anchor">#</a> Basic plugin information</h3><p>The <code>pluginDetails</code> is a required method of the plugin registration class. It should return an array containing the following keys:</p>`,10)),n[6]||(n[6]=e("div",{class:"table"},[e("table",{tabindex:"0"},[e("thead",null,[e("tr",null,[e("th",null,"Key"),e("th",null,"Description")])]),e("tbody",null,[e("tr",null,[e("td",null,[e("strong",null,"name")]),e("td",null,"the plugin name, required.")]),e("tr",null,[e("td",null,[e("strong",null,"description")]),e("td",null,"the plugin description, required.")]),e("tr",null,[e("td",null,[e("strong",null,"author")]),e("td",null,"the plugin author name, required.")]),e("tr",null,[e("td",null,[e("strong",null,"icon")]),e("td",null,[t("a name of the plugin icon. The full list of available icons can be found in the "),e("a",{href:"https://octobercms.com/docs/ui/icon",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[t("UI documentation"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),t(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),t(),e("span",{class:"sr-only"},"(opens new window)")])]),t(". Any icon names provided by this font are valid, for example "),e("strong",null,"icon-glass"),t(", "),e("strong",null,"icon-music"),t(", optional.")])]),e("tr",null,[e("td",null,[e("strong",null,"iconSvg")]),e("td",null,"an SVG icon to be used in place of the standard icon. The SVG icon should be a rectangle and can support colors, optional.")]),e("tr",null,[e("td",null,[e("strong",null,"homepage")]),e("td",null,"a link to the author's website address, optional.")])])])],-1)),n[7]||(n[7]=i(`<h2 id="routing-and-initialization"><a href="#routing-and-initialization" class="header-anchor">#</a> Routing and initialization</h2><p>Plugin registration files can contain two methods <code>boot</code> and <code>register</code>. With these methods you can do anything you like, like register routes or attach handlers to events.</p><p>The <code>register</code> method is called immediately when the plugin is registered. The <code>boot</code> method is called right before a request is routed. So if your actions rely on another plugin, you should use the boot method. For example, inside the <code>boot</code> method you can extend models:</p><pre><code>public function boot()
{
    User::extend(function($model) {
        $model-&gt;hasOne[&#39;author&#39;] = [&#39;Acme\\Blog\\Models\\Author&#39;];
    });
}
</code></pre><blockquote><p><strong>Note:</strong> The <code>boot</code> and <code>register</code> methods are not called during the update process to protect the system from critical errors. To overcome this limitation use <a href="#elevated-plugin">elevated permissions</a>.</p></blockquote><p>Plugins can also supply a file named <strong>routes.php</strong> that contain custom routing logic, as defined in the <a href="./../services/router.html">router service</a>. For example:</p><pre><code>Route::group([&#39;prefix&#39; =&gt; &#39;api_acme_blog&#39;], function() {

    Route::get(&#39;cleanup_posts&#39;, function(){ return Posts::cleanUp(); });

});
</code></pre><h2 id="dependency-definitions"><a href="#dependency-definitions" class="header-anchor">#</a> Dependency definitions</h2><p>A plugin can depend upon other plugins by defining a <code>$require</code> property in the <a href="#registration-file">Plugin registration file</a>, the property should contain an array of plugin names that are considered requirements. A plugin that depends on the <strong>Acme.User</strong> plugin can declare this requirement in the following way:</p><pre><code>namespace Acme\\Blog;

class Plugin extends \\System\\Classes\\PluginBase
{
    /**
     * @var array Plugin dependencies
     */
    public $require = [&#39;Acme.User&#39;];

    [...]
}
</code></pre><p>Dependency definitions will affect how the plugin operates and <a href="./../plugin/updates.html#update-process">how the update process applies updates</a>. The installation process will attempt to install any dependencies automatically, however if a plugin is detected in the system without any of its dependencies it will be disabled to prevent system errors.</p><p>Dependency definitions can be complex but care should be taken to prevent circular references. The dependency graph should always be directed and a circular dependency is considered a design error.</p><h2 id="extending-twig"><a href="#extending-twig" class="header-anchor">#</a> Extending Twig</h2><p>Custom Twig filters and functions can be registered in the CMS with the <code>registerMarkupTags</code> method of the plugin registration class. The next example registers two Twig filters and two functions.</p><pre><code>public function registerMarkupTags()
{
    return [
        &#39;filters&#39; =&gt; [
            // A global function, i.e str_plural()
            &#39;plural&#39; =&gt; &#39;str_plural&#39;,

            // A local method, i.e $this-&gt;makeTextAllCaps()
            &#39;uppercase&#39; =&gt; [$this, &#39;makeTextAllCaps&#39;]
        ],
        &#39;functions&#39; =&gt; [
            // A static method call, i.e Form::open()
            &#39;form_open&#39; =&gt; [&#39;October\\Rain\\Html\\Form&#39;, &#39;open&#39;],

            // Using an inline closure
            &#39;helloWorld&#39; =&gt; function() { return &#39;Hello World!&#39;; }
        ]
    ];
}

public function makeTextAllCaps($text)
{
    return strtoupper($text);
}
</code></pre><h2 id="navigation-menus"><a href="#navigation-menus" class="header-anchor">#</a> Navigation menus</h2><p>Plugins can extend the back-end navigation menus by overriding the <code>registerNavigation</code> method of the <a href="#registration-file">Plugin registration class</a>. This section shows you how to add menu items to the back-end navigation area. An example of registering a top-level navigation menu item with two sub-menu items:</p><pre><code>public function registerNavigation()
{
    return [
        &#39;blog&#39; =&gt; [
            &#39;label&#39;       =&gt; &#39;Blog&#39;,
            &#39;url&#39;         =&gt; Backend::url(&#39;acme/blog/posts&#39;),
            &#39;icon&#39;        =&gt; &#39;icon-pencil&#39;,
            &#39;permissions&#39; =&gt; [&#39;acme.blog.*&#39;],
            &#39;order&#39;       =&gt; 500,
            // Set counter to false to prevent the default behaviour of the main menu counter being a sum of
            // its side menu counters
            &#39;counter&#39;     =&gt; [&#39;\\Author\\Plugin\\Classes\\MyMenuCounterService&#39;, &#39;getBlogMenuCount&#39;],
            &#39;counterLabel&#39;=&gt; &#39;Label describing a dynamic menu counter&#39;,
            // Optionally you can set a badge value instead of a counter to display a string instead of a numerical counter
            &#39;badge&#39;       =&gt; &#39;New&#39;

            &#39;sideMenu&#39; =&gt; [
                &#39;posts&#39; =&gt; [
                    &#39;label&#39;       =&gt; &#39;Posts&#39;,
                    &#39;icon&#39;        =&gt; &#39;icon-copy&#39;,
                    &#39;url&#39;         =&gt; Backend::url(&#39;acme/blog/posts&#39;),
                    &#39;permissions&#39; =&gt; [&#39;acme.blog.access_posts&#39;],
                    &#39;counter&#39;     =&gt; 2,
                    &#39;counterLabel&#39;=&gt; &#39;Label describing a static menu counter&#39;,
                ],
                &#39;categories&#39; =&gt; [
                    &#39;label&#39;       =&gt; &#39;Categories&#39;,
                    &#39;icon&#39;        =&gt; &#39;icon-copy&#39;,
                    &#39;url&#39;         =&gt; Backend::url(&#39;acme/blog/categories&#39;),
                    &#39;permissions&#39; =&gt; [&#39;acme.blog.access_categories&#39;],
                ]
            ]
        ]
    ];
}
</code></pre><p>When you register the back-end navigation you can use <a href="./localization.html">localization strings</a> for the <code>label</code> values. Back-end navigation can also be controlled by the <code>permissions</code> values and correspond to defined <a href="./../backend/users.html">back-end user permissions</a>. The order in which the back-end navigation appears on the overall navigation menu items, is controlled by the <code>order</code> value. Higher numbers mean that the item will appear later on in the order of menu items while lower numbers mean that it will appear earlier on.</p><p>To make the sub-menu items visible, you may <a href="./../backend/controllers-ajax.html#setting-the-navigation-context">set the navigation context</a> in the back-end controller using the <code>BackendMenu::setContext</code> method. This will make the parent menu item active and display the children in the side menu.</p>`,20)),n[8]||(n[8]=e("div",{class:"table"},[e("table",{tabindex:"0"},[e("thead",null,[e("tr",null,[e("th",null,"Key"),e("th",null,"Description")])]),e("tbody",null,[e("tr",null,[e("td",null,[e("strong",null,"label")]),e("td",null,"specifies the menu label localization string key, required.")]),e("tr",null,[e("td",null,[e("strong",null,"icon")]),e("td",null,[t("an icon name from the "),e("a",{href:"https://octobercms.com/docs/ui/icon",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[t("October CMS icon collection"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),t(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),t(),e("span",{class:"sr-only"},"(opens new window)")])]),t(", optional.")])]),e("tr",null,[e("td",null,[e("strong",null,"iconSvg")]),e("td",null,"an SVG icon to be used in place of the standard icon, the SVG icon should be a rectangle and can support colors, optional.")]),e("tr",null,[e("td",null,[e("strong",null,"url")]),e("td",null,[t("the URL the menu item should point to (ex. "),e("code",null,"Backend::url('author/plugin/controller/action')"),t(", required.")])]),e("tr",null,[e("td",null,[e("strong",null,"counter")]),e("td",null,"a numeric value to output near the menu icon. The value should be a number or a callable returning a number, optional.")]),e("tr",null,[e("td",null,[e("strong",null,"counterLabel")]),e("td",null,"a string value to describe the numeric reference in counter, optional.")]),e("tr",null,[e("td",null,[e("strong",null,"badge")]),e("td",null,"a string value to output in place of the counter, the value should be a string and will override the badge property if set, optional.")]),e("tr",null,[e("td",null,[e("strong",null,"attributes")]),e("td",null,"an associative array of attributes and values to apply to the menu item, optional.")]),e("tr",null,[e("td",null,[e("strong",null,"permissions")]),e("td",null,"an array of permissions the backend user must have in order to view the menu item (Note: direct access of URLs still requires separate permission checks), optional.")]),e("tr",null,[e("td",null,[e("strong",null,"code")]),e("td",null,[t("a string value that acts as an unique identifier for that menu option. "),e("strong",null,"NOTE"),t(": This is a system generated value and should not be provided when registering the navigation items.")])]),e("tr",null,[e("td",null,[e("strong",null,"owner")]),e("td",null,[t('a string value that specifies the menu items owner plugin or module in the format "Author.Plugin". '),e("strong",null,"NOTE"),t(": This is a system generated value and should not be provided when registering the navigation items.")])])])])],-1)),n[9]||(n[9]=i(`<h2 id="registering-middleware"><a href="#registering-middleware" class="header-anchor">#</a> Registering middleware</h2><p>To register a custom middleware, you can apply it directly to a Backend controller in your plugin by using <a href="./../backend/controllers-ajax.html#controller-middleware">Controller middleware</a>, or you can extend a Controller class by using the following method.</p><pre><code>public function boot()
{
    \\Cms\\Classes\\CmsController::extend(function($controller) {
        $controller-&gt;middleware(&#39;Path\\To\\Custom\\Middleware&#39;);
    });
}
</code></pre><p>Alternatively, you can push it directly into the Kernel via the following.</p><pre><code>public function boot()
{
    // Add a new middleware to beginning of the stack.
    $this-&gt;app[&#39;Illuminate\\Contracts\\Http\\Kernel&#39;]
         -&gt;prependMiddleware(&#39;Path\\To\\Custom\\Middleware&#39;);

    // Add a new middleware to end of the stack.
    $this-&gt;app[&#39;Illuminate\\Contracts\\Http\\Kernel&#39;]
         -&gt;pushMiddleware(&#39;Path\\To\\Custom\\Middleware&#39;);
}
</code></pre><h2 id="elevated-permissions"><a href="#elevated-permissions" class="header-anchor">#</a> Elevated permissions</h2><p>By default plugins are restricted from accessing certain areas of the system. This is to prevent critical errors that may lock an administrator out from the back-end. When these areas are accessed without elevated permissions, the <code>boot</code> and <code>register</code> <a href="#routing-and-initialization">initialization methods</a> for the plugin will not fire.</p><div class="table"><table tabindex="0"><thead><tr><th>Request</th><th>Description</th></tr></thead><tbody><tr><td><strong>/combine</strong></td><td>the asset combiner generator URL</td></tr><tr><td><strong>/backend/system/updates</strong></td><td>the site updates context</td></tr><tr><td><strong>/backend/system/install</strong></td><td>the installer path</td></tr><tr><td><strong>/backend/backend/auth</strong></td><td>the backend authentication path (login, logout)</td></tr><tr><td><strong>october:up</strong></td><td>the CLI command that runs all pending migrations</td></tr><tr><td><strong>october:update</strong></td><td>the CLI command that triggers the update process</td></tr><tr><td><strong>october:env</strong></td><td>the CLI command that converts configuration files to environment variables in a <code>.env</code> file</td></tr><tr><td><strong>october:version</strong></td><td>the CLI command that detects the version of October CMS that is installed</td></tr></tbody></table></div><p>Define the <code>$elevated</code> property to grant elevated permissions for your plugin.</p><pre><code>/**
 * @var bool Plugin requires elevated permissions.
 */
public $elevated = true;
</code></pre>`,10))])}const w=a(c,[["render",g]]);export{v as __pageData,w as default};
