import{_ as a,r as t,o as l,c,e as s,a as r,s as p}from"./chunks/framework.CXcwiNg-.js";const f=JSON.parse('{"title":"{% styles %} - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Injecting styles","slug":"injecting-styles","link":"#injecting-styles","children":[]}],"relativePath":"1.x/markup/tag-styles.md","filePath":"1.x/markup/tag-styles.md"}'),i={name:"1.x/markup/tag-styles.md"};function d(g,e,h,m,y,u){const n=t("pre-heading"),o=t("post-heading");return l(),c("div",null,[s(n),e[0]||(e[0]=r("h1",null,"{% styles %}",-1)),s(o),e[1]||(e[1]=p(`<p>The <code>{% styles %}</code> tag renders CSS links to stylesheet files injected by the application. The tag is commonly defined in the HEAD section of a page or layout:</p><pre><code>&lt;head&gt;
    ...
    {% styles %}
&lt;/head&gt;
</code></pre><blockquote><p><strong>Note</strong>: This tag should appear once only in a given page cycle to prevent duplicated references.</p></blockquote><h2 id="injecting-styles"><a href="#injecting-styles" class="header-anchor">#</a> Injecting styles</h2><p>Links to StyleSheet files can be injected in PHP either by <a href="./../plugin/components.html#injecting-page-assets-with-components">components</a> or <a href="./../cms/pages.html#injecting-page-assets-programmatically">pages programmatically</a>.</p><pre><code>function onStart()
{
    $this-&gt;addCss(&#39;assets/css/hello.css&#39;);
}
</code></pre><p>You can also inject raw markup to the <code>{% styles %}</code> tag by using the <strong>styles</strong> anonymous <a href="./../cms/layouts.html#placeholders">placeholder</a>. Use the <code>{% put %}</code> tag in pages or layouts to add content to the placeholder:</p><pre><code>{% put styles %}
    &lt;link href=&quot;/themes/demo/assets/css/page.css&quot; rel=&quot;stylesheet&quot; /&gt;
{% endput %}
</code></pre>`,8))])}const k=a(i,[["render",d]]);export{f as __pageData,k as default};
