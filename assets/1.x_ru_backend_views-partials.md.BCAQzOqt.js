import{_ as r,r as e,o as s,c as l,e as a,a as d,s as i}from"./chunks/framework.CXcwiNg-.js";const b=JSON.parse('{"title":"Представления и Фрагменты - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Фрагменты","slug":"фрагменты","link":"#фрагменты","children":[{"level":3,"title":"Подсказки","slug":"подсказки","link":"#подсказки","children":[]},{"level":3,"title":"Проверка видимости подсказки","slug":"проверка-видимости-подсказки","link":"#проверка-видимости-подсказки","children":[]}]},{"level":2,"title":"Шаблоны и дочерние шаблоны","slug":"шаблоны-и-дочерние-шаблоны","link":"#шаблоны-и-дочерние-шаблоны","children":[{"level":3,"title":"Форма с боковой панелью","slug":"форма-с-боковои-панелью","link":"#форма-с-боковои-панелью","children":[]}]}],"relativePath":"1.x/ru/backend/views-partials.md","filePath":"1.x/ru/backend/views-partials.md"}'),c={name:"1.x/ru/backend/views-partials.md"};function p(h,t,g,m,u,_){const n=e("pre-heading"),o=e("post-heading");return s(),l("div",null,[a(n),t[0]||(t[0]=d("h1",null,"Представления и Фрагменты",-1)),a(o),t[1]||(t[1]=i(`<p><a name="partials" class="anchor"></a></p><h2 id="фрагменты"><a href="#фрагменты" class="header-anchor">#</a> Фрагменты</h2><p>Фрагменты в административной части сайта - это файлы с расширением <strong>htm</strong>, которые находятся в папке с представлениями контроллера. Их название должно начинаться с <strong>_</strong>: <em>_partial.htm</em>. Фрагменты можно отобразить на административной странице или в другом фрагменте. Для этого используется метод <code>makePartial()</code>, который принимает два параметра - название фрагмента и массив с произвольными значениями. Пример:</p><pre><code>&lt;?= $this-&gt;makePartial(&#39;sidebar&#39;, [&#39;showHeader&#39; =&gt; true]) ?&gt;
</code></pre><p><a name="hints" class="anchor"></a></p><h3 id="подсказки"><a href="#подсказки" class="header-anchor">#</a> Подсказки</h3><p>Вы можете отображать информативные панели в административной части сайта, называемые подсказками, а пользователи могут скрывать их. Первым параметром должен быть уникальный ключ, который помогает отслеживать видимость подсказки. Второй параметр - название фрагмента. Третий - массив с произвольными значениями, которые можно использовать во фрагменте.</p><pre><code>&lt;?= $this-&gt;makeHintPartial(&#39;my_hint_key&#39;, &#39;my_hint_partial&#39;, [&#39;foo&#39; =&gt; &#39;bar&#39;]) ?&gt;
</code></pre><p>Вы можете запретить пользователям скрывать подсказку, указав в качестве первого параметра <em>null</em>. Пример:</p><pre><code>&lt;?= $this-&gt;makeHintPartial(null, &#39;my_hint_partial&#39;) ?&gt;
</code></pre><p>Доступны следующие свойства:</p><div class="table"><table tabindex="0"><thead><tr><th>Свойство</th><th>Описание</th></tr></thead><tbody><tr><td><strong>type</strong></td><td>Цвет подсказки. Доступны следующие значения: danger, info, success, warning. По умолчанию: info.</td></tr><tr><td><strong>title</strong></td><td>Заголовок подсказки.</td></tr><tr><td><strong>subtitle</strong></td><td>Подзаголовок.</td></tr><tr><td><strong>icon</strong></td><td>Добавляет иконку к заголовку.</td></tr></tbody></table></div><p><a name="checking-hints" class="anchor"></a></p><h3 id="проверка-видимости-подсказки"><a href="#проверка-видимости-подсказки" class="header-anchor">#</a> Проверка видимости подсказки</h3><p>Используйте метод <code>isBackendHintHidden</code>, чтобы проверить скрыл ли пользователь подсказку. Метод принимает один параметр - уникальный ключ (название подсказки), который был указан в <code>makeHintPartial</code>. Возвращает <em>true</em> или <em>false</em>. Пример:</p><pre><code>&lt;?php if ($this-&gt;isBackendHintHidden(&#39;my_hint_key&#39;)): ?&gt;
    &lt;!-- Do something when the hint is hidden --&gt;
&lt;?php endif ?&gt;
</code></pre><p><a name="layouts" class="anchor"></a></p><h2 id="шаблоны-и-дочерние-шаблоны"><a href="#шаблоны-и-дочерние-шаблоны" class="header-anchor">#</a> Шаблоны и дочерние шаблоны</h2><p>Шаблоны административных страниц могут находится в папке плагина в подпапке <strong>layouts/</strong>. Также объект контроллера может иметь свойство <code>$layout</code>. Значение по умолчанию - <code>default</code>.</p><pre><code>/**
 * @var string Layout to use for the view.
 */
public $layout = &#39;mycustomlayout&#39;;
</code></pre><p>Вы можете указать произвольный класс тега BODY при помощи свойства контроллера <code>$bodyClass</code>.</p><pre><code>/**
 * @var string Body CSS class to add to the layout.
 */
public $bodyClass = &#39;compact-container&#39;;
</code></pre><p>По умолчанию доступны следующие классы:</p><ul><li><strong>compact-container</strong> - убирает padding со всех сторон.</li><li><strong>slim-container</strong> - убирает padding слева и справа.</li><li><strong>breadcrumb-flush</strong> - хлебные крошки располагаются вплотную к следующему элементу.</li></ul><p><a name="layout-form-with-sidebar" class="anchor"></a></p><h3 id="форма-с-боковои-панелью"><a href="#форма-с-боковои-панелью" class="header-anchor">#</a> Форма с боковой панелью</h3><p>Вы можете работать с шаблонами также как и с фрагментами. Пример:</p><pre><code>$this-&gt;bodyClass = &#39;compact-container&#39;; // Сначала добавим класс в контроллер

&lt;!-- Форма --&gt;
&lt;?php Block::put(&#39;form-contents&#39;) ?&gt;
    Main content
&lt;?php Block::endPut() ?&gt;

&lt;!-- Боковая панель --&gt;
&lt;?php Block::put(&#39;form-sidebar&#39;) ?&gt;
    Side content
&lt;?php Block::endPut() ?&gt;

&lt;!-- Отображаем дочерний шаблон --&gt;
&lt;?php Block::put(&#39;body&#39;) ?&gt;
    &lt;?= Form::open([&#39;class&#39;=&gt;&#39;layout stretch&#39;]) ?&gt;
        &lt;?= $this-&gt;makeLayout(&#39;form-with-sidebar&#39;) ?&gt;
    &lt;?= Form::close() ?&gt;
&lt;?php Block::endPut() ?&gt;
</code></pre><p>Последний блок с кодом переопределяет <strong>body</strong> и оборачивает все в HTML тег <code>&lt;form /&gt;</code>, после чего отображает дочерний шаблон <strong>form-with-sidebar</strong>, который находится по следующему пути: <code>modules\\backend\\layouts\\form-with-sidebar.htm</code>.</p>`,29))])}const k=r(c,[["render",p]]);export{b as __pageData,k as default};
