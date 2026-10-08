import{_ as n,r as t,o as d,c,e as o,a as r,s}from"./chunks/framework.CXcwiNg-.js";const _=JSON.parse('{"title":"Шаблоны ( Макеты, Layouts ) - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Введение","slug":"введение","link":"#введение","children":[]},{"level":2,"title":"Заменители ( Placeholders )","slug":"заменители-placeholders","link":"#заменители-placeholders","children":[]},{"level":2,"title":"Динамический шаблон","slug":"динамическии-шаблон","link":"#динамическии-шаблон","children":[{"level":3,"title":"Жизненный цикл шаблонов","slug":"жизненныи-цикл-шаблонов","link":"#жизненныи-цикл-шаблонов","children":[]}]}],"relativePath":"1.x/ru/cms/layouts.md","filePath":"1.x/ru/cms/layouts.md"}'),p={name:"1.x/ru/cms/layouts.md"};function h(i,e,g,m,u,f){const l=t("pre-heading"),a=t("post-heading");return d(),c("div",null,[o(l),e[0]||(e[0]=r("h1",null,"Шаблоны ( Макеты, Layouts )",-1)),o(a),e[1]||(e[1]=s(`<p><a name="introduction"></a></p><h2 id="введение"><a href="#введение" class="header-anchor">#</a> Введение</h2><p>Шаблоны определяют каркас страницы, т.е. все, что повторяется на странице: шапка, подвал и т.д. Шаблоны часто содержат следующие html-теги: <code>head</code>, <code>title</code>, <code>body</code>.</p><p>Шаблоны находятся в папке с темой в подпапке <strong>/layouts</strong> и должны иметь расширение <strong>htm</strong>. Внутри шаблона должен использоваться тег <code>{% page %}</code> для отображения содержимого страницы. Простой пример шаблона (макета, layout):</p><pre><code>&lt;html&gt;
    &lt;body&gt;
        {% page %}
    &lt;/body&gt;
&lt;/html&gt;
</code></pre><p>Для того, чтобы <a href="./../cms/pages.html">страница</a> могла использовать шаблон, необходимо в <a href="./../cms/themes.html#configuration-section">Конфигурацях</a> указать его название. Помните, если шаблон находится в подпапке, то ее тоже надо указать. Пример главной страницы, которая использует шаблон <code>default.htm</code>:</p><pre><code>url = &quot;/&quot;
layout = &quot;default&quot;
==
&lt;p&gt;Hello, world!&lt;/p&gt;
</code></pre><p>Теперь при отображении страницы должен появиться следующий код:</p><pre><code>&lt;html&gt;
    &lt;body&gt;
        &lt;p&gt;Hello, world!&lt;/p&gt;
    &lt;/body&gt;
&lt;/html&gt;
</code></pre><p>Обратите внимание на то, что Вы можете использовать <a href="./../cms/partials.html">фрагменты</a> в шаблонах. Например, у Вас есть фрагмент с набором стилей и скриптов. Теперь, если Вы захотите добавить еще один скрипт или файл со стилями, Вам не надо будет редактировать каждый шаблон по отдельности. Достаточно будет изменить только фрагмент.</p><p>Раздел <a href="./../cms/themes.html#configuration-section">Конфигурации</a> необязателен для шаблонов и используются только в административной части сайта. Поддерживаемые параметры: <strong>name</strong> и <strong>description</strong>. Пример шаблона с описанием:</p><pre><code>description = &quot;Basic layout example&quot;
==
&lt;html&gt;
    &lt;body&gt;
        {% page %}
    &lt;/body&gt;
&lt;/html&gt;
</code></pre><p><a name="placeholders"></a></p><h2 id="заменители-placeholders"><a href="#заменители-placeholders" class="header-anchor">#</a> Заменители ( Placeholders )</h2><p>Заменители позволяют страницам вставлять содержимое в шаблон при помощи тега <code>{% placeholder name %}</code>. Пример шаблона с заполнителем <strong>head</strong>:</p><pre><code>&lt;html&gt;
    &lt;head&gt;
        {% placeholder head %}
    &lt;/head&gt;
    ...
</code></pre><p>Страницы могут вставлять содержимое в заменители при помощи тегов <code>{% put %}</code> и <code>{% endput %}</code>. Следующий пример показывает, как страница вставляет CSS файл в заменитель <strong>head</strong>, который использовался в предыдущем примере:</p><pre><code>url = &quot;/my-page&quot;
layout = &quot;default&quot;
==
{% put head %}
    &lt;link href=&quot;/themes/demo/assets/css/page.css&quot; rel=&quot;stylesheet&quot;&gt;
{% endput %}

&lt;p&gt;The page content goes here.&lt;/p&gt;
</code></pre><p>Вы можете найти больше информации о заменителях <a href="./../markup/tag-placeholder.html">в Руководстве по Разметке</a>.</p><p><a name="dynamic-layouts"></a></p><h2 id="динамическии-шаблон"><a href="#динамическии-шаблон" class="header-anchor">#</a> Динамический шаблон</h2><p>В шаблонах, как и в страницах, можно использовать любые возможности Twig (см. <a href="./../cms/pages.html#dynamic-pages">Динамические страницы</a>).</p><p><a name="layout-life-cycle"></a></p><h3 id="жизненныи-цикл-шаблонов"><a href="#жизненныи-цикл-шаблонов" class="header-anchor">#</a> Жизненный цикл шаблонов</h3><p>Внутри <a href="./../cms/themes.html#php-section">PHP раздела</a> Вы можете задать следующие функции: <code>onInit()</code>, <code>OnStart ()</code>, <code>onBeforePageStart ()</code> и <code>OnEnd ()</code>.</p><p>Функция <code>onInit()</code> выполняется, когда все компоненты инициализированы, но перед обработкой AJAX запросов. Функция <code>onStart()</code> выполняется в начале процесса загрузки страницы. <code>onBeforePageStart()</code> - после работы <a href="./../cms/components.html">компонентов</a>, но перед выполнением функции <code>onStart()</code> страницы. Функция <code>onEnd()</code> выполняется после того, как страница была отображена. Последовательность выполнения обработчиков:</p><ol><li>Шаблон - <code>onInit()</code>.</li><li>Страница - <code>onInit()</code>.</li><li>Шаблон - <code>onStart()</code>.</li><li>Компоненты шаблона м- <code>onRun()</code>.</li><li>Шаблон - <code>onBeforePageStart()</code>.</li><li>Страница - <code>onStart()</code>.</li><li>Компоненты страницы - <code>onRun()</code>.</li><li>Страница - <code>onEnd()</code>.</li><li>Шаблон - <code>onEnd()</code>.</li></ol>`,27))])}const S=n(p,[["render",h]]);export{_ as __pageData,S as default};
