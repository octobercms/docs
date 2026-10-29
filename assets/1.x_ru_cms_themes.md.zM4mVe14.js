import{_ as p,r as a,o as i,c,e as l,a as t,s,d as n}from"./chunks/framework.CXcwiNg-.js";const k=JSON.parse('{"title":"Темы ( Themes ) - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Введение","slug":"введение","link":"#введение","children":[]},{"level":2,"title":"Структура папок","slug":"структура-папок","link":"#структура-папок","children":[{"level":3,"title":"Подпапки","slug":"подпапки","link":"#подпапки","children":[]}]},{"level":2,"title":"Структура шаблона","slug":"структура-шаблона","link":"#структура-шаблона","children":[{"level":3,"title":"Раздел конфигурации","slug":"раздел-конфигурации","link":"#раздел-конфигурации","children":[]},{"level":3,"title":"Раздел PHP кода","slug":"раздел-php-кода","link":"#раздел-php-кода","children":[]},{"level":3,"title":"Раздел Twig разметки","slug":"раздел-twig-разметки","link":"#раздел-twig-разметки","children":[]}]}],"relativePath":"1.x/ru/cms/themes.md","filePath":"1.x/ru/cms/themes.md"}'),u={name:"1.x/ru/cms/themes.md"};function h(g,e,d,m,f,v){const o=a("pre-heading"),r=a("post-heading");return i(),c("div",null,[l(o),e[0]||(e[0]=t("h1",null,"Темы ( Themes )",-1)),l(r),e[1]||(e[1]=s('<p><a name="introduction"></a></p><h2 id="введение"><a href="#введение" class="header-anchor">#</a> Введение</h2><p>Темы определяют внешний вид Вашего сайта или веб-приложения, используя файлы. Поэтому вы можете использовать любую систему контроля версий для работы с ними. На этой странице Вы найдете подробное описание работы с темами в October. Больше информации о <a href="./../cms/pages.html">страницах</a>, <a href="./../cms/partials.html">чанках</a>, <a href="./../cms/layouts.html">макетах</a> и <a href="./../cms/content.html">файлах содержимого</a> можно найти в соответствующих статьях.</p><p>Темы - это папки, которые находятся по умолчанию в папке <strong>/themes</strong> и могут содержать следующие объекты:</p>',4)),e[2]||(e[2]=t("div",{class:"table"},[t("table",{tabindex:"0"},[t("thead",null,[t("tr",null,[t("th",null,"Объект"),t("th",null,"Описание")])]),t("tbody",null,[t("tr",null,[t("td",null,[t("a",{href:"./../cms/pages.html"},"Страницы")]),t("td",null,"страницы сайта.")]),t("tr",null,[t("td",null,[t("a",{href:"./../cms/partials.html"},"Фрагменты")]),t("td",null,"содержит повторно используемые куски HTML-разметки.")]),t("tr",null,[t("td",null,[t("a",{href:"./../cms/layouts.html"},"Макеты")]),t("td",null,"определяет каркас страницы.")]),t("tr",null,[t("td",null,[t("a",{href:"./../cms/content.html"},"Содержимое")]),t("td",null,[n("текст, HTML или "),t("a",{href:"http://daringfireball.net/projects/markdown/syntax",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[n("Markdown"),t("span",null,[t("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[t("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),n(),t("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),n(),t("span",{class:"sr-only"},"(opens new window)")])]),n(" блоки, которые можно редактировать независимо от страницы или макета.")])]),t("tr",null,[t("td",null,[t("strong",null,"Asset files")]),t("td",null,"файлы вроде изображений, CSS и JavaScript файлов.")])])])],-1)),e[3]||(e[3]=s(`<p><a name="directory-structure"></a></p><h2 id="структура-папок"><a href="#структура-папок" class="header-anchor">#</a> Структура папок</h2><p>Ниже Вы можете увидеть пример структуры папок темы. Каждая тема в October представлена отдельной папкой. Пример содержимого папки с темой &quot;website&quot;.</p><pre><code>themes/
  website/           &lt;=== Тема начинается здесь
    pages/           &lt;=== Папка со страницами
      home.htm
    layouts/         &lt;=== Папка с макетами
      default.htm
    partials/        &lt;=== Папка с фрагментами
      sidebar.htm
    content/         &lt;=== Папка с контентом
      intro.htm
    assets/          &lt;=== Папка с файлами
      css/
        my-styles.css
      js/
      images/
</code></pre><blockquote><p>Активная тема задается параметром <strong>activeTheme</strong> в файле config/cms.php или <strong>Theme Selector</strong> на странице настроек System &gt; CMS &gt; Front-end Theme, переопределяя значение в файле config/cms.php.</p></blockquote><p><a name="subdirectories"></a></p><h3 id="подпапки"><a href="#подпапки" class="header-anchor">#</a> Подпапки</h3><p>October поддерживает одноуровневые подпапки для страниц, фрагментов, макетов и файлов содержимого (папка <strong>assets</strong> может содержать любую структуру). Это упрощает организацию крупных сайтов. Ниже Вы можете увидеть пример структуры папок, где папки страниц и чанков содержат подпапку <strong>blog</strong>, а папка content - подпапку <strong>home</strong>.</p><pre><code>themes/
  website/
    pages/
      home.htm
      blog/                  &lt;=== Подпапка
        archive.htm
        category.htm
    partials/
      sidebar.htm
      blog/                  &lt;=== Подпапка
        category-list.htm
    content/
      footer-contacts.txt
      home/                  &lt;=== Подпапка
        intro.htm
    ...
</code></pre><p>Укажите имя подпапки перед именем шаблона, чтобы отобразить его содержимое. Пример отображения чанка из подпапки:</p><div class="language-twig extra-class"><pre class="language-twig"><code><span class="token twig language-twig"><span class="token delimiter punctuation">{%</span> <span class="token tag-name keyword">partial</span> <span class="token string"><span class="token punctuation">&quot;</span>blog/category-list<span class="token punctuation">&quot;</span></span> <span class="token delimiter punctuation">%}</span></span>
</code></pre></div><blockquote><p><strong>Примечание:</strong> Пути к шаблонам всегда абсолютны. Если в чанке Вы отображаете другой чанк из той же подпапки, то Вам все равно нужно указать имя подпапки.</p></blockquote><p><a name="template-structure"></a></p><h2 id="структура-шаблона"><a href="#структура-шаблона" class="header-anchor">#</a> Структура шаблона</h2><p>Шаблоны страниц, фрагментов и макетов могут включать в себя 3 раздела: <strong>конфигурация</strong>, <strong>PHP код</strong> и <strong>Twig разметка</strong>, которые отделены друг от друга при помощи <code>==</code>. Пример:</p><div class="language- extra-class"><pre class="language-text"><code>url = &quot;/blog&quot;
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
</code></pre></div><p><a name="configuration-section"></a></p><h3 id="раздел-конфигурации"><a href="#раздел-конфигурации" class="header-anchor">#</a> Раздел конфигурации</h3>`,18)),e[4]||(e[4]=t("p",null,[n("В разделе конфигруации задаются параметры шаблона. Поддерживаемые параметры специфичны для различных шаблонов и описаны в соответствующих статьях документации. Раздел конфигурации использует простой "),t("a",{href:"http://en.wikipedia.org/wiki/INI_file",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[n("INI формат"),t("span",null,[t("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[t("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),n(),t("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),n(),t("span",{class:"sr-only"},"(opens new window)")])]),n(", где значения строковых параметров заключены в кавычки. Пример раздела конфигурации для шаблона страницы:")],-1)),e[5]||(e[5]=s(`<div class="language-ini extra-class"><pre class="language-ini"><code><span class="token key attr-name">url</span> <span class="token punctuation">=</span> <span class="token value attr-value">&quot;<span class="token inner-value">/blog</span>&quot;</span>
<span class="token key attr-name">layout</span> <span class="token punctuation">=</span> <span class="token value attr-value">&quot;<span class="token inner-value">default</span>&quot;</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">component</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">parameter</span> <span class="token punctuation">=</span> <span class="token value attr-value">&quot;<span class="token inner-value">value</span>&quot;</span>
</code></pre></div><p><a name="php-section"></a></p><h3 id="раздел-php-кода"><a href="#раздел-php-кода" class="header-anchor">#</a> Раздел PHP кода</h3><p>Код в разделе PHP выполняется каждый раз перед тем, как шаблон будет отображен. Раздел PHP не обязателен и его содержимое зависит от типа шаблона, где он определен. Он может содержать необязательные открывающие и закрывающие PHP теги, чтобы поддерживать подстветку синтаксиса в редакторах. Открывающие и закрывающие теги всегда должны быть заданы с новой строки.</p><div class="language- extra-class"><pre class="language-text"><code>url = &quot;/blog&quot;
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
</code></pre></div><p>В разделе PHP Вы можете задать только функции и ссылаться на пространство имен с помощью ключевого слова <code>use</code>. Другой PHP код не разрешен потому, что во время парсинга страницы происходит конвертация раздела в класс. Пример:</p><div class="language- extra-class"><pre class="language-text"><code>url = &quot;/blog&quot;
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
</code></pre></div><p><a name="twig-section"></a></p><h3 id="раздел-twig-разметки"><a href="#раздел-twig-разметки" class="header-anchor">#</a> Раздел Twig разметки</h3>`,9)),e[6]||(e[6]=t("p",null,[n("Раздел Twig определяет разметку, которая будет отображена согласно шаблону. Здесь Вы можете использовать "),t("a",{href:"./../cms/markup.html"},"функции, фильтры и Twig теги, предоставляемые October"),n(", а также все оригинальные функции, фильтры и теги "),t("a",{href:"https://twig.symfony.com/doc/",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[n("Twig"),t("span",null,[t("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[t("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),n(),t("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),n(),t("span",{class:"sr-only"},"(opens new window)")])]),n(". Содержимое в разделе Twig зависит от типа шаблона (страница, макет или фрагмент). Вы можете найти больше информации о конкретных Twig объектах "),t("a",{href:"./../markup.html"},"далее в документации"),n(".")],-1))])}const _=p(u,[["render",h]]);export{k as __pageData,_ as default};
