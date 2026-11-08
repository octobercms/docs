import{_ as n,r as e,o as p,c as o,e as t,a as i,s as c}from"./chunks/framework.CXcwiNg-.js";const x=JSON.parse('{"title":"this.param - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Accessing page parameters","slug":"accessing-page-parameters","link":"#accessing-page-parameters","children":[]}],"relativePath":"1.x/markup/this-param.md","filePath":"1.x/markup/this-param.md"}'),l={name:"1.x/markup/this-param.md"};function m(d,a,g,h,u,_){const s=e("pre-heading"),r=e("post-heading");return p(),o("div",null,[t(s),a[0]||(a[0]=i("h1",null,"this.param",-1)),t(r),a[1]||(a[1]=c(`<p>You can access the current URL parameters via <code>this.param</code> and it returns a PHP array.</p><h2 id="accessing-page-parameters"><a href="#accessing-page-parameters" class="header-anchor">#</a> Accessing page parameters</h2><p>This example demonstrates how to access the <code>tab</code> URL parameter in a page.</p><div class="language- extra-class"><pre class="language-text"><code>url = &quot;/account/:tab&quot;
==
{% if this.param.tab == &#39;details&#39; %}

    &lt;p&gt;Here are all your details&lt;/p&gt;

{% elseif this.param.tab == &#39;history&#39; %}

    &lt;p&gt;You are viewing a blast from the past&lt;/p&gt;

{% endif %}
</code></pre></div><p>If the parameter name is also a variable, then array syntax can be used.</p><div class="language- extra-class"><pre class="language-text"><code>url = &quot;/account/:post_id&quot;
==
{% set name = &#39;post_id&#39; %}

&lt;p&gt;The post ID is: {{ this.param[name] }}&lt;/p&gt;
</code></pre></div>`,6))])}const v=n(l,[["render",m]]);export{x as __pageData,v as default};
