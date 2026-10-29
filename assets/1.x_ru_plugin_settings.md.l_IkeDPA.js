import{_ as a,r as n,o as c,c as i,e as t,a as r,s as l}from"./chunks/framework.CXcwiNg-.js";const S=JSON.parse('{"title":"Настройка и конфигурация плагина - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Введение","slug":"введение","link":"#введение","children":[]},{"level":2,"title":"Настройка базы данных","slug":"настроика-базы-данных","link":"#настроика-базы-данных","children":[{"level":3,"title":"Запись в модель с настройками","slug":"запись-в-модель-с-настроиками","link":"#запись-в-модель-с-настроиками","children":[]},{"level":3,"title":"Чтение из модели с настройками","slug":"чтение-из-модели-с-настроиками","link":"#чтение-из-модели-с-настроиками","children":[]}]},{"level":2,"title":"Страницы с настройками","slug":"страницы-с-настроиками","link":"#страницы-с-настроиками","children":[{"level":3,"title":"Добавление ссылки на страницу с настройками в меню","slug":"добавление-ссылки-на-страницу-с-настроиками-в-меню","link":"#добавление-ссылки-на-страницу-с-настроиками-в-меню","children":[]},{"level":3,"title":"Настройка контекста","slug":"настроика-контекста","link":"#настроика-контекста","children":[]}]},{"level":2,"title":"Файл конфигурации","slug":"фаил-конфигурации","link":"#фаил-конфигурации","children":[]}],"relativePath":"1.x/ru/plugin/settings.md","filePath":"1.x/ru/plugin/settings.md"}'),d={name:"1.x/ru/plugin/settings.md"};function g(p,e,h,u,m,f){const s=n("pre-heading"),o=n("post-heading");return c(),i("div",null,[t(s),e[0]||(e[0]=r("h1",null,"Настройка и конфигурация плагина",-1)),t(o),e[1]||(e[1]=l(`<p><a name="introduction" class="anchor"></a></p><h2 id="введение"><a href="#введение" class="header-anchor">#</a> Введение</h2><p>Существует два способа настройки плагина: при помощи форм в административном интерфейсе и при помощи файлов конфигурации. Формы предоставляют больше возможностей, но их применение требует особых знаний. Поэтому на начальном этапе разработки лучше использовать файлы с настройками.</p><p><a name="database-settings" class="anchor"></a></p><h2 id="настроика-базы-данных"><a href="#настроика-базы-данных" class="header-anchor">#</a> Настройка базы данных</h2><p>Вы можете создавать модели для хранения настроек в БД при помощи реализации поведения <code>SettingsModel</code> в классе модели. Эта модель может быть также использована для создания форм с настройками в административной части сайта. Вам не нужно самим создавать таблицы в базе данных и контроллеры для создания форм.</p><p>Класс с настройками модели должен расширять класс <code>Model</code> и реализовывать поведение <code>System.Behaviors.SettingsModel</code>. Модели с настройками, так же как и другие модели, должны находиться в подпапке <strong>models</strong> плагина. Модель в следующем примере должна находиться в <code>plugins/acme/demo/models/Settings.php</code>.</p><pre><code>&lt;?php namespace Acme\\Demo\\Models;

use Model;

class Settings extends Model
{
    public $implement = [&#39;System.Behaviors.SettingsModel&#39;];

    // A unique code
    public $settingsCode = &#39;acme_demo_settings&#39;;

    // Reference to field configuration
    public $settingsFields = &#39;fields.yaml&#39;;
}
</code></pre><p>Свойство <code>$settingsCode</code> является обязательным для модели с настройками. Оно содержит уникальный ключ, который используется для сохранения настроек в базе данных.</p><p>Свойство <code>$settingsFields</code> также является обязательным, если Вы собираетесь добавить форму с настройками, используя эту модель. Свойство содержит имя YAML файла, в котором находится описание <a href="./../backend/forms.html">полей</a>. Этот файл должен находиться в папке, название которой совпадает с названием класса модели. Для предыдущего примера структура папок должна выглядеть так:</p><pre><code>plugins/
  acme/
    demo/
      models/
        settings/        &lt;=== Папка модели
          fields.yaml    &lt;=== Поля
        Settings.php     &lt;=== Файл с классом
</code></pre><p>Модели с настройками могут быть зарегистрированы в <a href="./../plugin/registration.html#backend-settings">регистрационном файле плагина</a>, чтобы они появились на странице с настройками, но это не обязательно. Вы можете задавать и получать значения так же, как и в любых других моделях.</p><p><a name="writing-settings" class="anchor"></a></p><h3 id="запись-в-модель-с-настроиками"><a href="#запись-в-модель-с-настроиками" class="header-anchor">#</a> Запись в модель с настройками</h3><p>Модель с настройками имеет статический метод <code>set</code>, который позволяет сохранить отдельные или множественные значения. Вы также можете использовать стандартные функции модели для записи свойств модели и сохранения самой модели. Пример:</p><pre><code>use Acme\\Demo\\Models\\Settings;

...

// Set a single value
Settings::set(&#39;api_key&#39;, &#39;ABCD&#39;);

// Set an array of values
Settings::set([&#39;api_key&#39; =&gt; &#39;ABCD&#39;]);

// Set object values
$settings = Settings::instance();
$settings-&gt;api_key = &#39;ABCD&#39;;
$settings-&gt;save();
</code></pre><p><a name="reading-settings" class="anchor"></a></p><h3 id="чтение-из-модели-с-настроиками"><a href="#чтение-из-модели-с-настроиками" class="header-anchor">#</a> Чтение из модели с настройками</h3><p>Модель с настройками имеет статический метод <code>get</code>, который позволяет получать отдельные значения. Кроме того, при создании экземпляра класса модели при помощи метода <code>instance</code>, Вы можете напрямую получить значения из БД.</p><pre><code>// Outputs: ABCD
echo Settings::instance()-&gt;api_key;

// Get a single value
echo Settings::get(&#39;api_key&#39;);

// Get a value and return a default value if it doesn&#39;t exist
echo Settings::get(&#39;is_activated&#39;, true);
</code></pre><p><a name="backend-pages" class="anchor"></a></p><h2 id="страницы-с-настроиками"><a href="#страницы-с-настроиками" class="header-anchor">#</a> Страницы с настройками</h2><p>В административной части сайта находится специальный раздел с настройками и конфигурациями. В него можно попасть, если кликнуть на ссылку <strong>Settings (Настройки)</strong> в главном меню. Эта страница содержит список ссылок на странице с настройками, которые зарегистрированы системой или плагинами.</p><p><a name="link-registration" class="anchor"></a></p><h3 id="добавление-ссылки-на-страницу-с-настроиками-в-меню"><a href="#добавление-ссылки-на-страницу-с-настроиками-в-меню" class="header-anchor">#</a> Добавление ссылки на страницу с настройками в меню</h3><p>Список ссылок на страницы с настройками может быть изменен при помощи метода <code>registerSettings</code> внутри <a href="./../plugin/registration.html#registration-file">класса регистрации плагина</a>. Когда Вы добавляете новую ссылку, то у Вас есть два пути: создать ссылку на определенную страницу или на страницу с моделью. В следующем примере показано, как создать ссылку на страницу:</p><pre><code>public function registerSettings()
{
    return [
        &#39;location&#39; =&gt; [
            &#39;label&#39;       =&gt; &#39;Locations&#39;,
            &#39;description&#39; =&gt; &#39;Manage available user countries and states.&#39;,
            &#39;category&#39;    =&gt; &#39;Users&#39;,
            &#39;icon&#39;        =&gt; &#39;icon-globe&#39;,
            &#39;url&#39;         =&gt; Backend::url(&#39;acme/user/locations&#39;),
            &#39;order&#39;       =&gt; 500,
            &#39;keywords&#39;    =&gt; &#39;geography place placement&#39;
        ]
    ];
}
</code></pre><blockquote><p><strong>Примечание:</strong> Страницы с настройками должны определять <a href="./../plugin/settings.html#settings-page-context">контекст</a> для того, чтобы отметить соответствующий пункт в меню. Для модели контекст определяется автоматически.</p></blockquote><p>Следующий пример показывает, как создать ссылку на модель с настройками.</p><pre><code>public function registerSettings()
{
    return [
        &#39;settings&#39; =&gt; [
            &#39;label&#39;       =&gt; &#39;User Settings&#39;,
            &#39;description&#39; =&gt; &#39;Manage user based settings.&#39;,
            &#39;category&#39;    =&gt; &#39;Users&#39;,
            &#39;icon&#39;        =&gt; &#39;icon-cog&#39;,
            &#39;class&#39;       =&gt; &#39;Acme\\User\\Models\\Settings&#39;,
            &#39;order&#39;       =&gt; 500,
            &#39;keywords&#39;    =&gt; &#39;security location&#39;,
            &#39;permissions&#39; =&gt; [&#39;acme.users.access_settings&#39;]
        ]
    ];
}
</code></pre><p>Произвольный параметр <code>keywords</code> используется для поиска. Если он не задан, то поиск будет производиться по метке и описанию.</p><p><a name="settings-page-context" class="anchor"></a></p><h3 id="настроика-контекста"><a href="#настроика-контекста" class="header-anchor">#</a> Настройка контекста</h3><p>Как и в <a href="./../backend/controllers-views-ajax.html#navigation-context">контроллере</a>, страница с настройками должна определять контекст. Это необходимо для того, чтобы найти текущий пункт меню и сделать его активным. Обычно это делается в конструкторе контроллера:</p><pre><code>public function __construct()
{
    parent::__construct();

    [...]

    BackendMenu::setContext(&#39;October.System&#39;, &#39;system&#39;, &#39;settings&#39;);
    SettingsManager::setContext(&#39;You.Plugin&#39;, &#39;settings&#39;);
}
</code></pre><p>Первый аргумент метода <code>setContext</code> - <strong>author.plugin</strong>. Далее идет ключ, который вы указали в методе <code>registerSettings</code>.</p><p><a name="file-configuration" class="anchor"></a></p><h2 id="фаил-конфигурации"><a href="#фаил-конфигурации" class="header-anchor">#</a> Файл конфигурации</h2><p>Плагины могут содержать в себе конфигурационный файл <code>config.php</code> в подпапке <code>config</code>. Пример содержимого файла:</p><pre><code>&lt;?php

return [
    &#39;maxItems&#39; =&gt; 10,
    &#39;display&#39; =&gt; 5
];
</code></pre><p>Используйте класс <code>Config</code> для получения доступа к значениям, которые определены в конфигурационном файле. Метод <code>Config::get($name, $default=null)</code> принимает в качестве первого параметра имя в следующем формате: <strong>Acme.Demo::maxItems</strong>. Второй параметр определяет значение по умолчанию, которое нужно вернуть, если конфигурационный параметр не существует. Пример:</p><pre><code>use Config;

...

$maxItems = Config::get(&#39;acme.demo::maxItems&#39;, 50);
</code></pre><p>Настройки плагина могут быть перезаписаны в файле <code>config/ИМЯАВТОРА/НАЗВАНИЕПЛАГИНА/config.php</code>. Внутри файла Вы можете вернуть только те параметры, которые Вы хотите перезаписать:</p><pre><code>&lt;?php

return [
    &#39;maxItems&#39; =&gt; 20
];
</code></pre><p>Если Вы хотите использовать различные настройки для разных окружений (<strong>dev</strong>, <strong>production</strong> и т.д.), то просто создайте еще один файл в <code>config/ИМЯАВТОРА/НАЗВАНИЕПЛАГИНА/ОКРУЖЕНИЕ/config.php</code>. Пример:</p><p><strong>config/author/plugin/production/config.php:</strong></p><pre><code>&lt;?php

return [
    &#39;maxItems&#39; =&gt; 25
];
</code></pre><p>Теперь, когда <code>APP_ENV</code> - <strong>production</strong>, <code>maxItems</code> будет равен 25.</p>`,48))])}const k=a(d,[["render",g]]);export{S as __pageData,k as default};
