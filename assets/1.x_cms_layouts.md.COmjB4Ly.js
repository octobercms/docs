import{_ as l,r as t,o as i,c as s,e as o,a as c,s as d}from"./chunks/framework.CXcwiNg-.js";const x=JSON.parse('{"title":"Layouts - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Placeholders","slug":"placeholders","link":"#placeholders","children":[]},{"level":2,"title":"Dynamic layouts","slug":"dynamic-layouts","link":"#dynamic-layouts","children":[{"level":3,"title":"Layout execution life cycle","slug":"layout-execution-life-cycle","link":"#layout-execution-life-cycle","children":[]}]}],"relativePath":"1.x/cms/layouts.md","filePath":"1.x/cms/layouts.md"}'),r={name:"1.x/cms/layouts.md"};function h(u,e,p,g,m,f){const a=t("pre-heading"),n=t("post-heading");return i(),s("div",null,[o(a),e[0]||(e[0]=c("h1",null,"Layouts",-1)),o(n),e[1]||(e[1]=d(`<p>Layouts define the page scaffold, that is everything that repeats on a page, such as a header and footer. Layouts often contain the HTML tag as well as the HEAD, TITLE and BODY tags.</p><p>Layout templates reside in the <strong>/layouts</strong> subdirectory of a theme directory. Layout template files should have the <strong>htm</strong> extension. Inside the layout file you should use the <code>{% page %}</code> tag to output the page content. Simplest layout example:</p><pre><code>&lt;html&gt;
    &lt;body&gt;
        {% page %}
    &lt;/body&gt;
&lt;/html&gt;
</code></pre><p>To use a layout for a <a href="./pages.html">page</a> the page should refer the layout file name (without extension) in the <a href="./themes.html#configuration-section">Configuration</a> section. Remember that if you refer a layout from a <a href="./themes.html#subdirectories">subdirectory</a> you should specify the subdirectory name. Example page template using the default.htm layout:</p><pre><code>url = &quot;/&quot;
layout = &quot;default&quot;
==
&lt;p&gt;Hello, world!&lt;/p&gt;
</code></pre><p>When this page is requested its content is merged with the layout, or more precisely - the layout&#39;s <code>{% page %}</code> tag is replaced with the page content. The previous examples would generate the following markup:</p><pre><code>&lt;html&gt;
    &lt;body&gt;
        &lt;p&gt;Hello, world!&lt;/p&gt;
    &lt;/body&gt;
&lt;/html&gt;
</code></pre><p>Note that you can render <a href="./partials.html">partials</a> in layouts. This lets you to share the common markup elements between different layouts. For example, you can have a partial that outputs the website CSS and JavaScript links. This approach simplifies the resource management - if you want to add a JavaScript reference you should modify a single partial instead of editing all the layouts.</p><p>The <a href="./themes.html#configuration-section">Configuration</a> section is optional for layouts. The supported configuration parameters are <strong>name</strong> and <strong>description</strong>. The parameters are optional and used in the back-end user interface. Example layout template with a description:</p><pre><code>description = &quot;Basic layout example&quot;
==
&lt;html&gt;
    &lt;body&gt;
        {% page %}
    &lt;/body&gt;
&lt;/html&gt;
</code></pre><h2 id="placeholders"><a href="#placeholders" class="header-anchor">#</a> Placeholders</h2><p>Placeholders allow pages to inject content to the layout. Placeholders are defined in the layout templates with the <code>{% placeholder %}</code> tag. The next example shows a layout template with a placeholder <strong>head</strong> defined in the HTML HEAD section.</p><pre><code>&lt;html&gt;
    &lt;head&gt;
        {% placeholder head %}
    &lt;/head&gt;
    ...
</code></pre><p>Pages can inject content to placeholders with the <code>{% put %}</code> and <code>{% endput %}</code> tags. The following example demonstrates a simple page template which injects a CSS link to the placeholder <strong>head</strong> defined in the previous example.</p><pre><code>url = &quot;/my-page&quot;
layout = &quot;default&quot;
==
{% put head %}
    &lt;link href=&quot;/themes/demo/assets/css/page.css&quot; rel=&quot;stylesheet&quot;&gt;
{% endput %}

&lt;p&gt;The page content goes here.&lt;/p&gt;
</code></pre><p>More information on placeholders can be found <a href="./../markup/tag-placeholder.html">in the Markup guide</a>.</p><h2 id="dynamic-layouts"><a href="#dynamic-layouts" class="header-anchor">#</a> Dynamic layouts</h2><p>Layouts, like pages, can use any Twig features. Please refer to the <a href="./pages.html#dynamic-pages">Dynamic pages</a> documentation for details.</p><h3 id="layout-execution-life-cycle"><a href="#layout-execution-life-cycle" class="header-anchor">#</a> Layout execution life cycle</h3><p>Inside the layout&#39;s <a href="./themes.html#php-section">PHP section</a> you can define the following functions for handling the page execution life cycle: <code>onInit</code>, <code>onStart</code>, <code>onBeforePageStart</code> and <code>onEnd</code>.</p><p>The <code>onInit</code> function is executed when all components are initialized and before AJAX requests are handled. The <code>onStart</code> function is executed in the beginning of the page processing. The <code>onBeforePageStart</code> function is executed after the layout <a href="./components.html">components</a> ran, but before the page&#39;s <code>onStart</code> function is executed. The <code>onEnd</code> function is executed after the page is rendered. The sequence the handlers are executed is following:</p><ol><li>Layout <code>onInit()</code> function.</li><li>Page <code>onInit()</code> function.</li><li>Layout <code>onStart()</code> function.</li><li>Layout components <code>onRun()</code> method.</li><li>Layout <code>onBeforePageStart()</code> function.</li><li>Page <code>onStart()</code> function.</li><li>Page components <code>onRun()</code> method.</li><li>Page <code>onEnd()</code> function.</li><li>Layout <code>onEnd()</code> function.</li></ol>`,22))])}const T=l(r,[["render",h]]);export{x as __pageData,T as default};
