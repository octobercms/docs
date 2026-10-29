import{_ as e,r as n,o,c,e as t,a as l,s as u}from"./chunks/framework.CXcwiNg-.js";const q=JSON.parse('{"title":"{% page %} - October CMS - 2.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[],"relativePath":"2.x/zh-cn/markup/tag-page.md","filePath":"2.x/zh-cn/markup/tag-page.md"}'),g={name:"2.x/zh-cn/markup/tag-page.md"};function r(i,a,d,k,m,_){const s=n("pre-heading"),p=n("post-heading");return o(),c("div",null,[t(s),a[0]||(a[0]=l("h1",null,"{% page %}",-1)),t(p),a[1]||(a[1]=u(`<p>{% page %}\` 标签将 <a href="./../cms/pages.html">页面</a> 的内容呈现到布局模板中。</p><p>有关基本示例，请参阅 <a href="./../cms/layouts.html">布局</a>.</p><p><code>{% page %}</code> 标签解析来自页面模板的原始标记。 页面模板可以将内容注入占位符以及定义原始标记。</p><div class="language- extra-class"><pre class="language-text"><code>description=&quot;示例布局&quot;
==
&lt;html&gt;
    &lt;head&gt;
        {% placeholder head %}
    &lt;/head&gt;
    &lt;body&gt;
        {% page %}
        ...
</code></pre></div><p>将内容放在&quot;head&quot;占位符中。</p><div class="language- extra-class"><pre class="language-text"><code>description=&quot;示例页面&quot;
==
{% put head %}
    &lt;meta name=&quot;foo&quot; content=&quot;bar&quot;&gt;
{% endput %}

&lt;p&gt;我的内容.&lt;/p&gt;
</code></pre></div><p>使用模板呈现的页面将导致：</p><div class="language-html extra-class"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>foo<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>bar<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>我的内容.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
        ...
</code></pre></div>`,8))])}const f=e(g,[["render",r]]);export{q as __pageData,f as default};
