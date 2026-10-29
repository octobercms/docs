import{_ as r,r as t,o as a,c as p,e as o,a as s,s as d}from"./chunks/framework.CXcwiNg-.js";const f=JSON.parse('{"title":"{% content %} - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Переменные","slug":"переменные","link":"#переменные","children":[]}],"relativePath":"1.x/ru/markup/tag-content.md","filePath":"1.x/ru/markup/tag-content.md"}'),l={name:"1.x/ru/markup/tag-content.md"};function u(m,e,i,h,g,_){const n=t("pre-heading"),c=t("post-heading");return a(),p("div",null,[o(n),e[0]||(e[0]=s("h1",null,"{% content %}",-1)),o(c),e[1]||(e[1]=d(`<p>Тег <code>{% content %}</code> отображает <a href="./../cms/content.html">блок с содержимым</a> на странице. Для этого Вы должны указать название файла в качестве параметра:</p><pre><code>{% content &quot;contacts.htm&quot; %}
</code></pre><p>Вы также можете указать название папки, в котором лежит файл:</p><pre><code>{% content &quot;sidebar/content.htm&quot; %}
</code></pre><blockquote><p><strong>Примечание</strong>: В разделе <a href="./../cms/themes.html#subdirectories">Темы ( Themes )</a> Вы сможете найти больше информации о работе с подпапками.</p></blockquote><p>Вы можете отобразить содержимое как простой текст:</p><pre><code>{% content &quot;readme.txt&quot; %}
</code></pre><p>или как Markdown:</p><pre><code>{% content &quot;changelog.md&quot; %}
</code></pre><p>Также блоки с содержимым могут быть использованы вместе с <a href="./../cms/layouts.html#placeholders">плейсхолдерами шаблонов</a>:</p><pre><code>{% put sidebar %}
    {% content &#39;sidebar-content.htm&#39; %}
{% endput %}
</code></pre><p><a name="variables"></a></p><h2 id="переменные"><a href="#переменные" class="header-anchor">#</a> Переменные</h2><p>Вы можете передавать параметры в блоки с содержимым, указав их после названия файла:</p><pre><code>{% content &quot;welcome.htm&quot; name=user.name %}
</code></pre><p>Вы также можете указать произвольные переменные:</p><pre><code>{% content &quot;location.htm&quot; city=&quot;Vancouver&quot; country=&quot;Canada&quot; %}
</code></pre><p>Пример:</p><pre><code>&lt;p&gt;Country: {country}, city: {city}.&lt;/p&gt;
</code></pre><p>Кроме того, Вы можете передавать коллекцию переменных:</p><pre><code>{% content &quot;welcome.htm&quot; likes=[
    {name:&#39;Dogs&#39;},
    {name:&#39;Fishing&#39;},
    {name:&#39;Golf&#39;}
] %}
</code></pre><p>Пример:</p><pre><code>&lt;ul&gt;
    {likes}
        &lt;li&gt;{name}&lt;/li&gt;
    {/likes}
&lt;/ul&gt;
</code></pre><blockquote><p><strong>Примечание</strong>: Twig синтаксис не поддерживается в блоках с содержимым.</p></blockquote>`,24))])}const k=r(l,[["render",u]]);export{f as __pageData,k as default};
