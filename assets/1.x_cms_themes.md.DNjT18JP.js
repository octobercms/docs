import{_ as i,r as s,o as c,c as p,e as o,a as e,s as n,d as t}from"./chunks/framework.CXcwiNg-.js";const v=JSON.parse('{"title":"Themes - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Directory structure","slug":"directory-structure","link":"#directory-structure","children":[{"level":3,"title":"Subdirectories","slug":"subdirectories","link":"#subdirectories","children":[]}]},{"level":2,"title":"Template structure","slug":"template-structure","link":"#template-structure","children":[{"level":3,"title":"Configuration section","slug":"configuration-section","link":"#configuration-section","children":[]},{"level":3,"title":"PHP code section","slug":"php-code-section","link":"#php-code-section","children":[]},{"level":3,"title":"Twig markup section","slug":"twig-markup-section","link":"#twig-markup-section","children":[]}]},{"level":2,"title":"Theme Logging","slug":"theme-logging","link":"#theme-logging","children":[]},{"level":2,"title":"Database Driven Themes","slug":"database-driven-themes","link":"#database-driven-themes","children":[]}],"relativePath":"1.x/cms/themes.md","filePath":"1.x/cms/themes.md"}'),d={name:"1.x/cms/themes.md"};function h(u,a,g,m,f,b){const r=s("pre-heading"),l=s("post-heading");return c(),p("div",null,[o(r),a[0]||(a[0]=e("h1",null,"Themes",-1)),o(l),a[1]||(a[1]=n('<p>Themes define the appearance of your website or web application built with October. October themes are completely file-backed and can be managed with any version control system, for example, Git. This page gives you the high-level description of October themes. You will find more details about <a href="./pages.html">pages</a>, <a href="./partials.html">partials</a>, <a href="./layouts.html">layouts</a> and <a href="./content.html">content files</a> in the corresponding articles.</p><blockquote><p><strong>Note</strong>: Themes can store templates in the database if <code>cms.databaseTemplates</code> is enabled, see the <a href="#database-driven-themes">database driven themes</a> section for more information.</p></blockquote><p>Themes are directories that reside in the <strong>/themes</strong> directory by default. Themes can contain the following objects:</p>',3)),a[2]||(a[2]=e("div",{class:"table"},[e("table",{tabindex:"0"},[e("thead",null,[e("tr",null,[e("th",null,"Object"),e("th",null,"Description")])]),e("tbody",null,[e("tr",null,[e("td",null,[e("a",{href:"./pages.html"},"Pages")]),e("td",null,"represent the website pages.")]),e("tr",null,[e("td",null,[e("a",{href:"./partials.html"},"Partials")]),e("td",null,"contain reusable chunks of HTML markup.")]),e("tr",null,[e("td",null,[e("a",{href:"./layouts.html"},"Layouts")]),e("td",null,"define the page scaffold.")]),e("tr",null,[e("td",null,[e("a",{href:"./content.html"},"Content files")]),e("td",null,[t("text, HTML, or "),e("a",{href:"http://daringfireball.net/projects/markdown/syntax",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[t("Markdown"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),t(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),t(),e("span",{class:"sr-only"},"(opens new window)")])]),t(" blocks that can be edited separately from the page or layout.")])]),e("tr",null,[e("td",null,[e("strong",null,"Asset files")]),e("td",null,"are resource files like images, CSS and JavaScript files.")])])])],-1)),a[3]||(a[3]=n(`<h2 id="directory-structure"><a href="#directory-structure" class="header-anchor">#</a> Directory structure</h2><p>Below, you can see an example theme directory structure. Each October theme is represented with a separate directory and generally, one active theme is used for displaying the website. This example displays the &quot;website&quot; theme directory.</p><div class="language- extra-class"><pre class="language-text"><code>themes/
  website/           &lt;=== Theme Starts Here
    pages/           &lt;=== Page Files
      home.htm
    layouts/         &lt;=== Layout Files
      default.htm
    partials/        &lt;=== Partial Files
      sidebar.htm
    content/         &lt;=== Content Files
      intro.htm
    assets/          &lt;=== Asset Files
      css/
        my-styles.css
      js/
      images/
</code></pre></div><blockquote><p>The active theme is set with the <code>activeTheme</code> parameter in the <code>config/cms.php</code> file or with the Theme Selector on the System &gt; CMS &gt; Front-end Theme backend page. The theme set with the Theme Selector overrides the value in the <code>config/cms.php</code> file.</p></blockquote><h3 id="subdirectories"><a href="#subdirectories" class="header-anchor">#</a> Subdirectories</h3><p>October supports single level subdirectories for <strong>pages</strong>, <strong>partials</strong>, <strong>layouts</strong> and <strong>content</strong> files, while the <strong>assets</strong> directory can have any structure. This simplifies the organization of large websites. In the example directory structure below, you can see that the <strong>pages</strong> and <strong>partials</strong> directories contain the <strong>blog</strong> subdirectory, and the <strong>content</strong> directory contains the <strong>home</strong> subdirectory.</p><div class="language- extra-class"><pre class="language-text"><code>themes/
  website/
    pages/
      home.htm
      blog/                  &lt;=== Page Subdirectory
        archive.htm
        category.htm
    partials/
      sidebar.htm
      blog/                  &lt;=== Partial Subdirectory
        category-list.htm
    content/
      footer-contacts.txt
      home/                  &lt;=== Content Subdirectory
        intro.htm
    ...
</code></pre></div><p>To refer to a partial or a content file from a subdirectory, specify the subdirectory&#39;s name before the template&#39;s name. Example of rendering a partial from a subdirectory:</p><div class="language-twig extra-class"><pre class="language-twig"><code><span class="token twig language-twig"><span class="token delimiter punctuation">{%</span> <span class="token tag-name keyword">partial</span> <span class="token string"><span class="token punctuation">&quot;</span>blog/category-list<span class="token punctuation">&quot;</span></span> <span class="token delimiter punctuation">%}</span></span>
</code></pre></div><blockquote><p><strong>Note:</strong> The template paths are always absolute. If, in a partial, you render another partial from the same subdirectory, you still need to specify the subdirectory&#39;s name.</p></blockquote><h2 id="template-structure"><a href="#template-structure" class="header-anchor">#</a> Template structure</h2><p>Pages, partials and layout templates can include up to 3 sections: <strong>configuration</strong>, <strong>PHP code</strong>, and <strong>Twig markup</strong>. Sections are separated with the <code>==</code> sequence. For example:</p><div class="language- extra-class"><pre class="language-text"><code>url = &quot;/blog&quot;
layout = &quot;default&quot;
==
function onStart()
{
    $this[&#39;posts&#39;] = ...;
}
==
&lt;h3&gt;Blog archive&lt;/h3&gt;
{% for post in posts %}
    &lt;h4&gt;{{ post.title }}&lt;/h4&gt;
    {{ post.content }}
{% endfor %}
</code></pre></div><h3 id="configuration-section"><a href="#configuration-section" class="header-anchor">#</a> Configuration section</h3>`,14)),a[4]||(a[4]=e("p",null,[t("The configuration section sets the template parameters. Supported configuration parameters are specific for different CMS templates and described in their corresponding documentation articles. The configuration section uses the simple "),e("a",{href:"http://en.wikipedia.org/wiki/INI_file",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[t("INI format"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),t(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),t(),e("span",{class:"sr-only"},"(opens new window)")])]),t(", where string parameter values are enclosed within quotes. Example configuration section for a page template:")],-1)),a[5]||(a[5]=n(`<div class="language-ini extra-class"><pre class="language-ini"><code><span class="token key attr-name">url</span> <span class="token punctuation">=</span> <span class="token value attr-value">&quot;<span class="token inner-value">/blog</span>&quot;</span>
<span class="token key attr-name">layout</span> <span class="token punctuation">=</span> <span class="token value attr-value">&quot;<span class="token inner-value">default</span>&quot;</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">component</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">parameter</span> <span class="token punctuation">=</span> <span class="token value attr-value">&quot;<span class="token inner-value">value</span>&quot;</span>
</code></pre></div><h3 id="php-code-section"><a href="#php-code-section" class="header-anchor">#</a> PHP code section</h3><p>The code in the PHP section executes every time before the template is rendered. The PHP section is optional for all CMS templates and its contents depend on the template type where it is defined. The PHP code section can contain optional open and close PHP tags to enable syntax highlighting in text editors. The open and close tags should always be specified on a different line to the section separator <code>==</code>.</p><div class="language- extra-class"><pre class="language-text"><code>url = &quot;/blog&quot;
layout = &quot;default&quot;
==
&lt;?
function onStart()
{
    $this[&#39;posts&#39;] = ...;
}
?&gt;
==
&lt;h3&gt;Blog archive&lt;/h3&gt;
{% for post in posts %}
    &lt;h4&gt;{{ post.title }}&lt;/h4&gt;
    {{ post.content }}
{% endfor %}
</code></pre></div><p>In the PHP section, you can only define functions and refer to namespaces with the PHP <code>use</code> keyword. No other PHP code is allowed in the PHP section. This is because the PHP section is converted to a PHP class when the page is parsed. Example of using a namespace reference:</p><div class="language- extra-class"><pre class="language-text"><code>url = &quot;/blog&quot;
layout = &quot;default&quot;
==
&lt;?
use Acme\\Blog\\Classes\\Post;

function onStart()
{
    $this[&#39;posts&#39;] = Post::get();
}
?&gt;
==
</code></pre></div><p>As a general way of setting variables, you should use the array access method on <code>$this</code>, although for simplicity you can use <strong>object access as read-only</strong>, for example:</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token comment">// Write via array</span>
<span class="token variable">$this</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;foo&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;bar&#39;</span><span class="token punctuation">;</span>

<span class="token comment">// Read via array</span>
<span class="token keyword">echo</span> <span class="token variable">$this</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;foo&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">// Read-only via object</span>
<span class="token keyword">echo</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">foo</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="twig-markup-section"><a href="#twig-markup-section" class="header-anchor">#</a> Twig markup section</h3>`,9)),a[6]||(a[6]=e("p",null,[t("The Twig section defines the markup to be rendered by the template. In the Twig section, you can use functions, tags, and filters "),e("a",{href:"./../markup.html"},"provided by October"),t(", all the "),e("a",{href:"https://twig.symfony.com/doc/",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[t("native Twig features"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),t(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),t(),e("span",{class:"sr-only"},"(opens new window)")])]),t(", or those "),e("a",{href:"./../plugin/registration.html#extending-twig"},"provided by plugins"),t(". The content of the Twig section depends on the template type (page, layout, or partial). You can find more information about specific Twig objects further in the documentation.")],-1)),a[7]||(a[7]=n('<p>More information can be found <a href="./../markup.html">in the Markup guide</a>.</p><h2 id="theme-logging"><a href="#theme-logging" class="header-anchor">#</a> Theme Logging</h2><p>October CMS comes with a very useful feature, disabled by default, called Theme Logging.</p><p>Since layouts and pages store most of the data in flat files, it&#39;s possible for you or your clients to accidentally lose content. For example, switching the layout of a page will modify the scaffold of the page, and, as such, will result in data loss.</p><p>To enable Theme Logging, simply go to <strong>Settings -&gt; Log settings</strong> and enable <strong>Log theme changes</strong>. All changes are now logged.</p><p>The theme changelog can be viewed at <strong>Settings -&gt; Theme log</strong>. Each change has an overview of what has been added/removed, along with a copy of the changed file before and after. You can use this information to decide the appropriate action, to aid the reversion of these changes, if necessary.</p><h2 id="database-driven-themes"><a href="#database-driven-themes" class="header-anchor">#</a> Database Driven Themes</h2><p>October CMS comes with another very useful feature, disabled by default, called Database Driven Themes. When this feature is enabled (by setting <code>cms.databaseTemplates</code> to <code>true</code>, or <code>null</code> when <code>app.debug</code> is <code>false</code>); the database layer stores all modified CMS files in the database. Files that are not modified continue to be loaded from the filesystem. There is a <a href="./../console/commands.html#theme-sync-command"><code>theme:sync $themeDir</code></a> console command that can be used to sync changes between the filesystem and database.</p><p>Files modified in the database are cached to indicate that they should be loaded from the database.</p><blockquote><p><strong>Note</strong>: All CMS template objects (ex. <code>Layout</code>, <code>Page</code>, <code>Content</code>, <code>Partial</code>, <code>Meta</code>, etc) are stored in the database when this feature is enabled and a change is made to the template in question; however theme asset files will <strong>not</strong> be.</p></blockquote>',10))])}const w=i(d,[["render",h]]);export{v as __pageData,w as default};
