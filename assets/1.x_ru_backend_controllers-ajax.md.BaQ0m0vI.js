import{_ as o,r as e,o as s,c as l,e as n,a as d,s as c}from"./chunks/framework.CXcwiNg-.js";const b=JSON.parse('{"title":"Контроллеры, Представления и AJAX - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Введение","slug":"введение","link":"#введение","children":[{"level":3,"title":"Создание контроллера","slug":"создание-контроллера","link":"#создание-контроллера","children":[]},{"level":3,"title":"Свойства контроллера","slug":"своиства-контроллера","link":"#своиства-контроллера","children":[]}]},{"level":2,"title":"Действия, представления и маршрутизация","slug":"деиствия-представления-и-маршрутизация","link":"#деиствия-представления-и-маршрутизация","children":[]},{"level":2,"title":"Передача данных в представление","slug":"передача-данных-в-представление","link":"#передача-данных-в-представление","children":[]},{"level":2,"title":"Настройка контекста навигации","slug":"настроика-контекста-навигации","link":"#настроика-контекста-навигации","children":[]},{"level":2,"title":"AJAX","slug":"ajax","link":"#ajax","children":[{"level":3,"title":"Обработчики","slug":"обработчики","link":"#обработчики","children":[]},{"level":3,"title":"Триггеры","slug":"триггеры","link":"#триггеры","children":[]}]}],"relativePath":"1.x/ru/backend/controllers-ajax.md","filePath":"1.x/ru/backend/controllers-ajax.md"}'),p={name:"1.x/ru/backend/controllers-ajax.md"};function i(h,t,g,u,m,f){const a=e("pre-heading"),r=e("post-heading");return s(),l("div",null,[n(a),t[0]||(t[0]=d("h1",null,"Контроллеры, Представления и AJAX",-1)),n(r),t[1]||(t[1]=c(`<p><a href="#introduction" name="introduction" class="anchor"></a></p><h2 id="введение"><a href="#введение" class="header-anchor">#</a> Введение</h2><p>В OctoberCMS имплементирован MVC паттерн. Контроллеры управляют административными страницами и реализуют различный функционал вроде форм и списков. В этой статье описано, как с ними работать.</p><p>Контроллер представляет из себя PHP скрипт, который находится в папке <strong>/plugins/author/pluginName/controllers</strong>. Представления контроллера - это <strong>htm</strong> файлы, находящиеся в папке, название которой совпадает с именем класса контроллера и должно быть написано строчными буквами. Папка с представлениями может также содержать файлы с настройками. Пример:</p><pre><code>plugins/
  acme/
    blog/
      controllers/
        users/                &lt;=== папка с представлениями
          _partial.htm        &lt;=== фрагмент
          config_form.yaml    &lt;=== файл с настройками
          index.htm           &lt;=== основной файл представления
        Users.php             &lt;=== класс контроллера
      Plugin.php
</code></pre><p><a name="class-definition" class="anchor"></a></p><h3 id="создание-контроллера"><a href="#создание-контроллера" class="header-anchor">#</a> Создание контроллера</h3><p>Класс контроллера должен расширять класс <code>\\Backend\\Classes\\Controller</code>. Как и любой класс плагина, он также должен принадлежать <a href="./../plugin/registration.html#namespaces">пространству имен</a>. Пример:</p><pre><code>namespace Acme\\Blog\\Controllers;

class Posts extends \\Backend\\Classes\\Controller {

    public function index()    // &lt;=== Действие
    {

    }
}
</code></pre><p>Обычно каждый контроллер работает только с одним типом данных (записи в блоге, категории и т.д.).</p><p><a name="controller-properties" class="anchor"></a></p><h3 id="своиства-контроллера"><a href="#своиства-контроллера" class="header-anchor">#</a> Свойства контроллера</h3><p>Основной класс контроллера имеет несколько свойств, которые позволяют настроить страницу нужным Вам образом:</p><div class="table"><table tabindex="0"><thead><tr><th>Property</th><th>Description</th></tr></thead><tbody><tr><td><strong>$fatalError</strong></td><td>позволяет хранить фатальные ошибки, чтобы потом отобразить их в представлении.</td></tr><tr><td><strong>$user</strong></td><td>содержит ссылку на объект пользователя.</td></tr><tr><td><strong>$suppressView</strong></td><td>позволяет предотвратить отображение представления. Может быть обновлен в методе действия или в конструкторе контроллера.</td></tr><tr><td><strong>$params</strong></td><td>массив параметров маршрутизации.</td></tr><tr><td><strong>$action</strong></td><td>имя метода действия, который будет выполнен при текущем запросе.</td></tr><tr><td><strong>$publicActions</strong></td><td>определяет массив действий, которые доступны без авторизации пользователя. Переменную можно переопределить в классе контроллера.</td></tr><tr><td><strong>$requiredPermissions</strong></td><td>права, которые необходимо иметь для просмотра этой страницы (см. <a href="./../backend/users.html">Пользователи и права</a>).</td></tr><tr><td><strong>$pageTitle</strong></td><td>заголовок страницы. Может быть изменен в методах действия.</td></tr><tr><td><strong>$bodyClass</strong></td><td>добавляет класс к тегу body. Используется для настройки шаблона. Переменная может быть определена в конструкторе контроллера.</td></tr><tr><td><strong>$guarded</strong></td><td>cетоды, которые не могут быть вызваны в качестве действий. Список может быть расширен в конструкторе контроллера.</td></tr><tr><td><strong>$layout</strong></td><td>опрделяет произвольный шаблон для контроллера (см. <a href="#layouts">шаблоны</a>).</td></tr></tbody></table></div><p><a name="actions-views-routing" class="anchor"></a></p><h2 id="деиствия-представления-и-маршрутизация"><a href="#деиствия-представления-и-маршрутизация" class="header-anchor">#</a> Действия, представления и маршрутизация</h2><p>Публичные методы контроллера, называемые <strong>actions</strong> или <strong>действия</strong>, соединены с <strong>файлами представлений</strong> страниц. В представлениях можно использовать HTML и PHP код. Пример содержимого файла <strong>index.htm</strong>, который соответствует действию <strong>index</strong>:</p><pre><code>&lt;h1&gt;Hello World&lt;/h1&gt;
</code></pre><p>URL этой страницы состоит из имени автора, названия плагина, названия контроллера и названия действия:</p><pre><code>http://yoursite.com/backend/acme/blog/users/index

backend/[author name]/[plugin name]/[controller name]/[action name]
</code></pre><p><a name="passing-data-to-views" class="anchor"></a></p><h2 id="передача-данных-в-представление"><a href="#передача-данных-в-представление" class="header-anchor">#</a> Передача данных в представление</h2><p>Вы можете передавать любые значения напрямую в представление при помощи свойства <code>$vars</code>:</p><pre><code>$this-&gt;vars[&#39;var&#39;] = &#39;value&#39;;
</code></pre><p>Пример содержимого файла представления:</p><pre><code>&lt;p&gt;The variable value is &lt;?= $var ?&gt;&lt;/p&gt;
</code></pre><p><a name="navigation-context" class="anchor"></a></p><h2 id="настроика-контекста-навигации"><a href="#настроика-контекста-навигации" class="header-anchor">#</a> Настройка контекста навигации</h2><p>Плагины могут создавать меню и подменю в административной части сайта. Контекст навигации определяет активный пункт. Он задается при помощи класса <code>BackendMenu</code>:</p><pre><code>BackendMenu::setContext(&#39;Acme.Blog&#39;, &#39;blog&#39;, &#39;categories&#39;);
</code></pre><p>Первый параметр - имя автора и название плагина. Второй - активный пункт меню. Третий - активный пункт подменю. Обычно <code>BackendMenu::setContext()</code> вызывается в конструкторе контроллера:</p><pre><code>namespace Acme\\Blog\\Controllers;

class Categories extends \\Backend\\Classes\\Controller {

public function __construct()
{
    parent::__construct();

    BackendMenu::setContext(&#39;Acme.Blog&#39;, &#39;blog&#39;, &#39;categories&#39;);
}
</code></pre><p>Вы также можете задать свое название страницы при помощи свойства класса контроллера <code>$pageTitle</code>:</p><pre><code>$this-&gt;pageTitle = &#39;Blog categories&#39;;
</code></pre><p><a name="ajax" class="anchor"></a></p><h2 id="ajax"><a href="#ajax" class="header-anchor">#</a> AJAX</h2><p>В административной части сайта Вы можете использовать все возможности <a href="./../cms/ajax.html">AJAX</a>.</p><p><a name="ajax-handlers" class="anchor"></a></p><h3 id="обработчики"><a href="#обработчики" class="header-anchor">#</a> Обработчики</h3><p>Обработчики AJAX могут быть определены в классе контроллера или <a href="./../backend/widgets.html">виджета</a>. В классе контроллера они определены как публичные методы с названием, начинающимся с &quot;on&quot;: <strong>onCreateTemplate</strong>, <strong>onGetTemplateList</strong> и т.д.</p><p>Обработчики могут вернуть массив данных, исключение или перенаправление на другую страницу. Вы можете использовать фрагменты при помощи метода <code>makePartial()</code> для отображения и обновления содержимого.</p><pre><code>public function onOpenTemplate()
{
    if (Request::input(&#39;someVar&#39;) != &#39;someValue&#39;)
        throw new ApplicationException(&#39;Invalid value&#39;);

    return [
        &#39;partialContents&#39; =&gt; $this-&gt;makePartial(&#39;some_partial&#39;, [
            &#39;var&#39; =&gt; &#39;value&#39;
        ])
    ];
}
</code></pre><p><a name="triggering-ajax-requests" class="anchor"></a></p><h3 id="триггеры"><a href="#триггеры" class="header-anchor">#</a> Триггеры</h3><p>Вы можете использовать AJAX при помощи <strong>Data Attributes API</strong> или <strong>JavaScript API</strong> (см. <a href="./../cms/ajax.html">AJAX</a>). Пример:</p><pre><code>&lt;button
    type=&quot;button&quot;
    data-request=&quot;onDoSomething&quot;
    class=&quot;btn btn-default&quot;&gt;
    Do something
&lt;/button&gt;
</code></pre>`,46))])}const _=o(p,[["render",i]]);export{b as __pageData,_ as default};
