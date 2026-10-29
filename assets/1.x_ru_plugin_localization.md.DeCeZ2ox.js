import{_ as p,r as l,o as s,c,e as t,a as e,d as a,s as i}from"./chunks/framework.CXcwiNg-.js";const b=JSON.parse('{"title":"Перевод плагина (локализация) - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Папка с переводом (локализацией) и структура файлов","slug":"папка-с-переводом-локализациеи-и-структура-фаилов","link":"#папка-с-переводом-локализациеи-и-структура-фаилов","children":[]},{"level":2,"title":"Доступ к строкам перевода (локализации)","slug":"доступ-к-строкам-перевода-локализации","link":"#доступ-к-строкам-перевода-локализации","children":[]},{"level":2,"title":"Переопределение строк перевода (локализации)","slug":"переопределение-строк-перевода-локализации","link":"#переопределение-строк-перевода-локализации","children":[]}],"relativePath":"1.x/ru/plugin/localization.md","filePath":"1.x/ru/plugin/localization.md"}'),g={name:"1.x/ru/plugin/localization.md"};function d(h,n,u,m,f,_){const o=l("pre-heading"),r=l("post-heading");return s(),c("div",null,[t(o),n[0]||(n[0]=e("h1",null,"Перевод плагина (локализация)",-1)),t(r),n[1]||(n[1]=e("p",null,[a("Вы можете добавлять новые переводы для своего плагина в папку "),e("strong",null,"author/myplugin/lang"),a(". Они регистрируются автоматически. Переведенные строки появляются автоматически в интерфейсе меню, лэйблах и других элементах административного интерфейса, если Вы подставили ключ перевода вместо реальной строки (система попытается найти и загрузить его из файла локализации). В других случаях Вам нужно будет загрузить строку локализации при помощи "),e("a",{href:"#accessing-strings"},"API"),a(".")],-1)),n[2]||(n[2]=e("blockquote",null,[e("p",null,[e("strong",null,"Примечание"),a(": Для перевода содержимого сайта используйте плагин "),e("a",{href:"http://octobercms.com/plugin/rainlab-translate",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[a("Rainlab Translate"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),a(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),a(),e("span",{class:"sr-only"},"(opens new window)")])]),a(".")])],-1)),n[3]||(n[3]=i(`<p><a name="file-structure" href="#file-structure" class="anchor"></a></p><h2 id="папка-с-переводом-локализациеи-и-структура-фаилов"><a href="#папка-с-переводом-локализациеи-и-структура-фаилов" class="header-anchor">#</a> Папка с переводом (локализацией) и структура файлов</h2><p>Пример структуры мультиязычного плагина:</p><pre><code>plugins/
  acme/
    todo/             &lt;=== Папка плагина
      lang/           &lt;=== Папка с переводами
        en/           &lt;=== Папка языка перевода
          lang.php    &lt;=== Файл перевода
        fr/
          lang.php
</code></pre><p>Файл <strong>lang.php</strong> может возвратить массив любой глубины. Например:</p><pre><code>&lt;?php

return [
    &#39;app&#39; =&gt; [
        &#39;name&#39; =&gt; &#39;OctoberCMS&#39;,
        &#39;tagline&#39; =&gt; &#39;Getting back to basics&#39;
    ]
];
</code></pre><p><a name="accessing-strings" href="#accessing-strings" class="anchor"></a></p><h2 id="доступ-к-строкам-перевода-локализации"><a href="#доступ-к-строкам-перевода-локализации" class="header-anchor">#</a> Доступ к строкам перевода (локализации)</h2><p>Строки локализации могут быть получены при помощи класса <code>Lang</code>. Параметр - ключ строки перевода, который состоит из имени плагина, имени файла локализации и пути к строке локализации внутри массива, возвращенного из файла. Следующий пример отображает строку <strong>app.name</strong> из файла plugins/acme/blog/lang/en/lang.php (язык здесь установлен с помощью параметра <code>locale</code> в конфигурационном файле <code>app/config/app.php</code>):</p><pre><code>echo Lang::get(&#39;acme.blog::lang.app.name&#39;);
</code></pre><p><a name="overriding" href="#overriding" class="anchor"></a></p><h2 id="переопределение-строк-перевода-локализации"><a href="#переопределение-строк-перевода-локализации" class="header-anchor">#</a> Переопределение строк перевода (локализации)</h2><p>Пользователи могут переопределить строки локализации плагина без изменения файлов плагина. Сделать это можно путем добавления необходимых файлов в директорию <strong>app/lang</strong>. Для примера давайте переопределим перевод плагина <strong>acme/blog</strong>, создав файл в следующей папке:</p><pre><code>lang/               &lt;=== App localization directory
  en/               &lt;=== Language directory
    acme/           &lt;=== Plugin / Module directory
      blog/         &lt;===^
        lang.php    &lt;=== Localization override file
</code></pre><p>Файл может содержать только строку, которую нам требуется переопределить. Поэтому нет необходимости полностью заменять весь файл. Пример:</p><pre><code>&lt;?php

return [
    &#39;app&#39; =&gt; [
        &#39;name&#39; =&gt; &#39;OctoberCMS!&#39;
    ]
];
</code></pre>`,16))])}const x=p(g,[["render",d]]);export{b as __pageData,x as default};
