import{_ as i,r,o as c,c as d,e as o,a as e,s as l,d as t}from"./chunks/framework.CXcwiNg-.js";const v=JSON.parse('{"title":"Регистрация плагина - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Введение","slug":"введение","link":"#введение","children":[{"level":3,"title":"Структура плагина","slug":"структура-плагина","link":"#структура-плагина","children":[]},{"level":3,"title":"Пространство имен","slug":"пространство-имен","link":"#пространство-имен","children":[]}]},{"level":2,"title":"Файл регистрации","slug":"фаил-регистрации","link":"#фаил-регистрации","children":[{"level":3,"title":"Поддерживаемые методы","slug":"поддерживаемые-методы","link":"#поддерживаемые-методы","children":[]},{"level":3,"title":"Основная информация о плагине","slug":"основная-информация-о-плагине","link":"#основная-информация-о-плагине","children":[]}]},{"level":2,"title":"Роутинг и инициализация","slug":"роутинг-и-инициализация","link":"#роутинг-и-инициализация","children":[]},{"level":2,"title":"Определения зависимостей","slug":"определения-зависимостеи","link":"#определения-зависимостеи","children":[]},{"level":2,"title":"Twig","slug":"twig","link":"#twig","children":[]},{"level":2,"title":"Меню","slug":"меню","link":"#меню","children":[]}],"relativePath":"1.x/ru/plugin/registration.md","filePath":"1.x/ru/plugin/registration.md"}'),g={name:"1.x/ru/plugin/registration.md"};function p(u,n,h,m,f,b){const a=r("pre-heading"),s=r("post-heading");return c(),d("div",null,[o(a),n[0]||(n[0]=e("h1",null,"Регистрация плагина",-1)),o(s),n[1]||(n[1]=l(`<p><a name="introduction" class="anchor"></a></p><h2 id="введение"><a href="#введение" class="header-anchor">#</a> Введение</h2><p>Плагины являются основой для добавления новых функций в CMS, расширяя ее. В этой статье описывается процесс регистрации плагинов, который позволяет объявлять свои функции, такие как <a href="/docs/cms-components.html">компоненты</a> или внешние меню и страницы. Примеры того, что может сделать плагин:</p><ol><li>Определить <a href="/docs/cms-components.html">компоненты</a>.</li><li>Определить <a href="./../backend/users.html">права пользователя</a>.</li><li>Добавить <a href="./../plugin/settings.html#backend-pages">страницу с настройками</a>, <a href="#navigation-menus">меню</a>, <a href="./../backend/lists.html">списки</a> и <a href="./../backend/forms.html">формы</a>.</li><li>Создать <a href="./../plugin/updates.html">структуру базы данных и внести в нее данные</a>.</li><li>Изменить <a href="./../plugin/events.html">функциональность ядра или других плагинов</a>.</li><li>Описать классы, <a href="./../backend/controllers-views-ajax.html">контроллеры</a>, представления и другие файлы.</li></ol><p><a name="directory-structure" class="anchor"></a></p><h3 id="структура-плагина"><a href="#структура-плагина" class="header-anchor">#</a> Структура плагина</h3><p>Все плагины находятся в подпапке <strong>/plugins</strong>. Структура плагина выглядит следующим образом:</p><pre><code>plugins/
  acme/              &lt;=== Author name
    blog/            &lt;=== Plugin name
      classes/
      components/
      controllers/
      models/
      updates/
      ...
      Plugin.php     &lt;=== Plugin registration file
</code></pre><p>Но не все плагины обязаны иметь такую структуру. Например, если Ваш плагин предусматривает только один <a href="./../plugin/components.html">компонент</a>, то его содержимое может выглядеть так:</p><pre><code>plugins/
  acme/              &lt;=== Author name
    blog/            &lt;=== Plugin name
      components/
      Plugin.php     &lt;=== Plugin registration file
</code></pre><blockquote><p><strong>Примечание:</strong> если Вы являетесь разработчиком плагина для <a href="./../help/marketplace.html">Marketplace</a>, то наличие файла <a href="#migrations-version-history">updates/version.yaml</a> обязательно.</p></blockquote><p><a name="namespaces" class="anchor"></a></p><h3 id="пространство-имен"><a href="#пространство-имен" class="header-anchor">#</a> Пространство имен</h3>`,13)),n[2]||(n[2]=e("p",null,[t("Пространства имен плагинов очень важны, особенно если планируется, что Ваш плагин будет опубликован в "),e("a",{href:"http://octobercms.com/plugins",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[t("Маркетплейсе"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),t(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),t(),e("span",{class:"sr-only"},"(opens new window)")])]),t(". При регистрации в Маркетплейсе, Вам будет предложено ввести авторский код, который будет использован в качестве корневого имени директории для всех Ваших плагинов. Вы можете ввести этот код только один раз, когда проходите регистрацию. По умолчанию Вам будет предложен авторский код от "),e("a",{href:"./../help/marketplace.html"},"Marketplace"),t(", состоящий из Вашего имени и фамилии. Например: VasyaPupkin. Помните, что данный код невозможно будет поменять после регистрации. Все файлы плагина должны быть определены в корневой папке Вашего плагина. Например: "),e("code",null,"\\VasyaPupkin\\Blog"),t(".")],-1)),n[3]||(n[3]=l(`<p><a name="registration-file" class="anchor"></a></p><h2 id="фаил-регистрации"><a href="#фаил-регистрации" class="header-anchor">#</a> Файл регистрации</h2><p>Файл <strong>Plugin.php</strong>, называемый как <em>Регистрационный файл плагина</em> или <em>Файл регистрации плагина</em>, является скриптом инициализации, который объявляет основные функции и содержит в себе информацию о плагине. Он может содержать следующее:</p><ul><li>Информацию о плагине, его названии и авторе.</li><li>Регистрацию методов для расширения CMS.</li></ul><p>Скрипт регистрации должен содержать класс с именем <code>Plugin</code>, который расширяет <code>\\System\\Classes\\PluginBase</code> класс. Единственным обязательным методом класса регистрации плагина является <code>pluginDetails()</code>. Пример:</p><pre><code>namespace Acme\\Blog;

class Plugin extends \\System\\Classes\\PluginBase
{
    public function pluginDetails()
    {
        return [
            &#39;name&#39; =&gt; &#39;Blog Plugin&#39;,
            &#39;description&#39; =&gt; &#39;Provides some really cool blog features.&#39;,
            &#39;author&#39; =&gt; &#39;ACME Corporation&#39;,
            &#39;icon&#39; =&gt; &#39;icon-leaf&#39;
        ];
    }

    public function registerComponents()
    {
        return [
            &#39;Acme\\Blog\\Components\\Post&#39; =&gt; &#39;blogPost&#39;
        ];
    }
}
</code></pre><p><a name="registration-methods" class="anchor"></a></p><h3 id="поддерживаемые-методы"><a href="#поддерживаемые-методы" class="header-anchor">#</a> Поддерживаемые методы</h3><p>Следующие методы могут содержаться в регистрационном файле плагина:</p><div class="table"><table tabindex="0"><thead><tr><th>Метод</th><th>Описание</th></tr></thead><tbody><tr><td><strong>pluginDetails()</strong></td><td>возвращает информацию о плагине.</td></tr><tr><td><strong>register()</strong></td><td>метод регистрации. Вызывается, когда плагин впервые инициализируется.</td></tr><tr><td><strong>boot()</strong></td><td>метод загрузки. Вызывается непосредственно перед маршрутизацией запроса.</td></tr><tr><td><strong>registerMarkupTags()</strong></td><td>метод регистрирует <a href="#extending-twig">дополнительные теги</a>, которые могут быть использованы в CMS.</td></tr><tr><td><strong>registerComponents()</strong></td><td>метод регистрирует <a href="./../plugin/components.html#component-registration">компоненты</a>, используемые этим плагином.</td></tr><tr><td><strong>registerNavigation()</strong></td><td>метод регистрирует <a href="#navigation-menus">элементы меню в административной части сайта</a>.</td></tr><tr><td><strong>registerPermissions()</strong></td><td>метод регистрирует <a href="./../backend/users.html#permission-registration">права пользователей</a>, используемые этим плагином.</td></tr><tr><td><strong>registerSettings()</strong></td><td>метод регистрирует <a href="./../plugin/settings.html#link-registration">страницы с настройками</a>, используемые этим плагином.</td></tr><tr><td><strong>registerFormWidgets()</strong></td><td>метод регистрирует <a href="./../backend/widgets.html#form-widget-registration">виджеты с формами</a>, используемые этим плагином.</td></tr><tr><td><strong>registerReportWidgets()</strong></td><td>метод регистрирует <a href="./../backend/widgets.html#report-widget-registration">виджеты с отчетами</a>, включая виджеты для панели управления.</td></tr><tr><td><strong>registerMailTemplates()</strong></td><td>метод регистрирует <a href="/plugin-mail.html#mail-template-registration">почтовые шаблоны</a>.</td></tr><tr><td><strong>registerSchedule()</strong></td><td>метод регистрирует <a href="./../plugin/scheduling.html#defining-schedules">задачи</a>, которые выполняются на регулярной основе.</td></tr></tbody></table></div><p><a name="basic-plugin-information" class="anchor"></a></p><h3 id="основная-информация-о-плагине"><a href="#основная-информация-о-плагине" class="header-anchor">#</a> Основная информация о плагине</h3><p>Метод <code>pluginDetails()</code> является обязательным методом класса регистрации плагина. Он должен возвращать массив, состоящий из 4 ключей:</p>`,13)),n[4]||(n[4]=e("div",{class:"table"},[e("table",{tabindex:"0"},[e("thead",null,[e("tr",null,[e("th",null,"Ключ"),e("th",null,"Описание")])]),e("tbody",null,[e("tr",null,[e("td",null,[e("strong",null,"name")]),e("td",null,"имя плагина, обязательно.")]),e("tr",null,[e("td",null,[e("strong",null,"description")]),e("td",null,"описание плагина, обязательно.")]),e("tr",null,[e("td",null,[e("strong",null,"author")]),e("td",null,"автор, обязательно.")]),e("tr",null,[e("td",null,[e("strong",null,"icon")]),e("td",null,[t("иконка плагина. Полный список доступных иконок можно найти в "),e("a",{href:"https://octobercms.com/docs/ui/icon",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[t("UI документации"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),t(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),t(),e("span",{class:"sr-only"},"(opens new window)")])]),t(". Любое название иконок из этой коллекции, является действительным. Например: "),e("strong",null,"icon-glass"),t(", "),e("strong",null,"icon-music"),t(". Обязательно.")])]),e("tr",null,[e("td",null,[e("strong",null,"iconSvg")]),e("td",null,"SVG иконка, которая заменяет стандартную иконку плагина, необязательно.")]),e("tr",null,[e("td",null,[e("strong",null,"homepage")]),e("td",null,"ссылка на сайт автора плагина, необязательно.")])])])],-1)),n[5]||(n[5]=l(`<p><a name="routing-initialization" class="anchor"></a></p><h2 id="роутинг-и-инициализация"><a href="#роутинг-и-инициализация" class="header-anchor">#</a> Роутинг и инициализация</h2><p>Файлы регистрации плагина могут содержать два метода: <code>boot()</code> и <code>register()</code>. С этими методами Вы можете делать всё, что только пожелаете: зарегистрировать маршруты или привязать обработчики к событиям.</p><p>Метод <code>register()</code> вызывается непосредственно в тот момент, когда плагин регистрируется. Метод <code>boot()</code> вызывается прямо перед маршрутизацией запроса. Таким образом, если Ваши действия зависят от другого плагина, Вы должны использовать метод загрузки. Например, внутри метода <code>boot()</code> Вы можете расширить модели:</p><pre><code>public function boot()
{
    User::extend(function($model) {
        $model-&gt;hasOne[&#39;author&#39;] = [&#39;Acme\\Blog\\Models\\Author&#39;];
    });
}
</code></pre><blockquote><p><strong>Примечание:</strong> методы <code>boot()</code> и <code>register()</code> не вызываются в процессе обновления плагина, чтобы избежать критических ошибок.</p></blockquote><p>Плагины могут содержать файл <strong>routes.php</strong>, в котором может находиться произвольная <a href="./../services/router.html">логика маршрутизации</a>. Например:</p><pre><code>Route::group([&#39;prefix&#39; =&gt; &#39;api_acme_blog&#39;], function() {

    Route::get(&#39;cleanup_posts&#39;, function(){ return Posts::cleanUp(); });

});
</code></pre><p><a name="dependency-definitions" class="anchor"></a></p><h2 id="определения-зависимостеи"><a href="#определения-зависимостеи" class="header-anchor">#</a> Определения зависимостей</h2><p>Работа Вашего плагина может зависеть от других плагинов. Для этого укажите их в свойстве <code>$require</code> в <a href="#registration-file">Файле регистрации плагина</a>. Пример:</p><pre><code>namespace Acme\\Blog;

class Plugin extends \\System\\Classes\\PluginBase
{
    /**
     * @var array Plugin dependencies
     */
    public $require = [&#39;Acme.User&#39;];

    [...]
}
</code></pre><p><a name="extending-twig" class="anchor"></a></p><h2 id="twig"><a href="#twig" class="header-anchor">#</a> Twig</h2><p>Пользовательские Twig фильтры и функции могут быть зарегистрированы в CMS при помощи метода <code>registerMarkupTags()</code> в Файле регистрации плагина. Пример:</p><pre><code>public function registerMarkupTags()
{
    return [
        &#39;filters&#39; =&gt; [
            // A global function, i.e str_plural()
            &#39;plural&#39; =&gt; &#39;str_plural&#39;,

            // A local method, i.e $this-&gt;makeTextAllCaps()
            &#39;uppercase&#39; =&gt; [$this, &#39;makeTextAllCaps&#39;]
        ],
        &#39;functions&#39; =&gt; [
            // A static method call, i.e Form::open()
            &#39;form_open&#39; =&gt; [&#39;October\\Rain\\Html\\Form&#39;, &#39;open&#39;],

            // Using an inline closure
            &#39;helloWorld&#39; =&gt; function() { return &#39;Hello World!&#39;; }
        ]
    ];
}

public function makeTextAllCaps($text)
{
    return strtoupper($text);
}
</code></pre><p><a name="navigation-menus" class="anchor"></a></p><h2 id="меню"><a href="#меню" class="header-anchor">#</a> Меню</h2><p>Плагины могут расширять меню в административной части сайта, переопределяя метод<code>registerNavigation()</code> в <a href="#registration-file">Файле регистрации плагина</a>. Пример:</p><pre><code>public function registerNavigation()
{
    return [
        &#39;blog&#39; =&gt; [
            &#39;label&#39;       =&gt; &#39;Blog&#39;,
            &#39;url&#39;         =&gt; Backend::url(&#39;acme/blog/posts&#39;),
            &#39;icon&#39;        =&gt; &#39;icon-pencil&#39;,
            &#39;permissions&#39; =&gt; [&#39;acme.blog.*&#39;],
            &#39;order&#39;       =&gt; 500,

            &#39;sideMenu&#39; =&gt; [
                &#39;posts&#39; =&gt; [
                    &#39;label&#39;       =&gt; &#39;Posts&#39;,
                    &#39;icon&#39;        =&gt; &#39;icon-copy&#39;,
                    &#39;url&#39;         =&gt; Backend::url(&#39;acme/blog/posts&#39;),
                    &#39;permissions&#39; =&gt; [&#39;acme.blog.access_posts&#39;]
                ],
                &#39;categories&#39; =&gt; [
                    &#39;label&#39;       =&gt; &#39;Categories&#39;,
                    &#39;icon&#39;        =&gt; &#39;icon-copy&#39;,
                    &#39;url&#39;         =&gt; Backend::url(&#39;acme/blog/categories&#39;),
                    &#39;permissions&#39; =&gt; [&#39;acme.blog.access_categories&#39;]
                ]
            ]
        ]
    ];
}
</code></pre><p>Вы можете использовать <a href="./localization.html">строки локализации</a> для <code>label</code>. Вы также можете ограничить <a href="./../backend/users.html">доступ пользователей</a> к тем или иным пунктам меню.</p><p><a href="./../backend/controllers-ajax.html#navigation-context">Настройте контекст</a>, чтобы отобразить подменю в административной части сайта.</p>`,22))])}const k=i(g,[["render",p]]);export{v as __pageData,k as default};
