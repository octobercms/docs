import{_ as r,r as a,o,c as p,e,a as l,s as i}from"./chunks/framework.CXcwiNg-.js";const x=JSON.parse('{"title":"this.param - October CMS - 2.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"访问页面参","slug":"访问页面参","link":"#访问页面参","children":[]}],"relativePath":"2.x/zh-cn/markup/this-param.md","filePath":"2.x/zh-cn/markup/this-param.md"}'),c={name:"2.x/zh-cn/markup/this-param.md"};function d(m,t,_,h,u,g){const n=a("pre-heading"),s=a("post-heading");return o(),p("div",null,[e(n),t[0]||(t[0]=l("h1",null,"this.param",-1)),e(s),t[1]||(t[1]=i(`<p>您可以通过 <code>this.param</code> 访问当前 URL 参数，它会返回一个 PHP 数组。</p><h2 id="访问页面参"><a href="#访问页面参" class="header-anchor">#</a> 访问页面参</h2><p>此示例演示如何访问页面中的 <code>tab</code> URL 参数。</p><div class="language- extra-class"><pre class="language-text"><code>url = &quot;/account/:tab&quot;
==
{% if this.param.tab == &#39;details&#39; %}

    &lt;p&gt;这是您的所有详细信息&lt;/p&gt;

{% elseif this.param.tab == &#39;history&#39; %}

    &lt;p&gt;你看到的是过去的爆炸&lt;/p&gt;

{% endif %}
</code></pre></div><p>如果参数名称也是变量，则可以使用数组语法。</p><div class="language- extra-class"><pre class="language-text"><code>url = &quot;/account/:post_id&quot;
==
{% set name = &#39;post_id&#39; %}

&lt;p&gt;帖子ID是: {{ this.param[name] }}&lt;/p&gt;
</code></pre></div>`,6))])}const v=r(c,[["render",d]]);export{x as __pageData,v as default};
