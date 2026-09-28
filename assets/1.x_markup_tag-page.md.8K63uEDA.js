import{_ as p,r as t,o,c as l,e as n,a as c,s as u}from"./chunks/framework.CXcwiNg-.js";const f=JSON.parse('{"title":"{% page %} - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[],"relativePath":"1.x/markup/tag-page.md","filePath":"1.x/markup/tag-page.md"}'),g={name:"1.x/markup/tag-page.md"};function r(i,a,d,k,m,h){const s=t("pre-heading"),e=t("post-heading");return o(),l("div",null,[n(s),a[0]||(a[0]=c("h1",null,"{% page %}",-1)),n(e),a[1]||(a[1]=u(`<p>The <code>{% page %}</code> tag renders the contents of a <a href="./../cms/pages.html">page</a> into a layout template.</p><p>See <a href="./../cms/layouts.html">layouts</a> for a basic example.</p><p>The <code>{% page %}</code> tag parses the raw markup from a page template. A page template may inject content both into placeholder(s) as well as define raw markup.</p><div class="language- extra-class"><pre class="language-text"><code>description=&quot;example layout&quot;
==
&lt;html&gt;
    &lt;head&gt;
        {% placeholder head %}
    &lt;/head&gt;
    &lt;body&gt;
        {% page %}
        ...
</code></pre></div><div class="language- extra-class"><pre class="language-text"><code>description=&quot;example page&quot;
==
{% put head %}
    &lt;meta name=&quot;foo&quot; content=&quot;bar&quot;&gt;
{% endput %}

&lt;p&gt;My content.&lt;/p&gt;
</code></pre></div><p>The page rendered with the template would result in:</p><div class="language-html extra-class"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>foo<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>bar<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>My content.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
        ...
</code></pre></div>`,7))])}const x=p(g,[["render",r]]);export{f as __pageData,x as default};
