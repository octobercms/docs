import{_ as n,r as t,o,c as p,e,a as l,s as i}from"./chunks/framework.CXcwiNg-.js";const x=JSON.parse('{"title":"this.param - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Доступ к параметрам страницы","slug":"доступ-к-параметрам-страницы","link":"#доступ-к-параметрам-страницы","children":[]}],"relativePath":"1.x/ru/markup/this-param.md","filePath":"1.x/ru/markup/this-param.md"}'),c={name:"1.x/ru/markup/this-param.md"};function d(m,a,u,_,h,g){const s=t("pre-heading"),r=t("post-heading");return o(),p("div",null,[e(s),a[0]||(a[0]=l("h1",null,"this.param",-1)),e(r),a[1]||(a[1]=i(`<p>Используйте переменную <code>this.param</code>, чтобы получить массив с URL-параметрами.</p><h2 id="доступ-к-параметрам-страницы"><a href="#доступ-к-параметрам-страницы" class="header-anchor">#</a> Доступ к параметрам страницы</h2><p>Пример:</p><div class="language- extra-class"><pre class="language-text"><code>url = &quot;/account/:tab&quot;
==

{% if this.param.tab == &#39;details&#39; %}

    &lt;p&gt;Here are all your details&lt;/p&gt;

{% elseif this.param.tab == &#39;history&#39; %}

    &lt;p&gt;You are viewing a blast from the past&lt;/p&gt;

{% endif %}
</code></pre></div><p>Другой пример:</p><div class="language- extra-class"><pre class="language-text"><code>url = &quot;/account/:post_id&quot;
==
{% set name = &#39;post_id&#39; %}

&lt;p&gt;The post ID is: {{ this.param[name] }}&lt;/p&gt;
</code></pre></div>`,6))])}const v=n(c,[["render",d]]);export{x as __pageData,v as default};
