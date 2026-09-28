import{_ as o,r as e,o as p,c,e as t,a as l,s as r}from"./chunks/framework.CXcwiNg-.js";const w=JSON.parse('{"title":"Создание компонента - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Введение","slug":"введение","link":"#введение","children":[]},{"level":2,"title":"Определение класса компонента","slug":"определение-класса-компонента","link":"#определение-класса-компонента","children":[{"level":3,"title":"Регистрация компонента","slug":"регистрация-компонента","link":"#регистрация-компонента","children":[]}]},{"level":2,"title":"Свойства компонента","slug":"своиства-компонента","link":"#своиства-компонента","children":[{"level":3,"title":"Выпадающий список","slug":"выпадающии-список","link":"#выпадающии-список","children":[]},{"level":3,"title":"Список страниц","slug":"список-страниц","link":"#список-страниц","children":[]}]},{"level":2,"title":"Параметры маршрутизации","slug":"параметры-маршрутизации","link":"#параметры-маршрутизации","children":[]},{"level":2,"title":"Обработка цикла выполнения страницы","slug":"обработка-цикла-выполнения-страницы","link":"#обработка-цикла-выполнения-страницы","children":[{"level":3,"title":"Обработчики страницы","slug":"обработчики-страницы","link":"#обработчики-страницы","children":[]},{"level":3,"title":"Инициализация компонента","slug":"инициализация-компонента","link":"#инициализация-компонента","children":[]},{"level":3,"title":"Завершение с ответом","slug":"завершение-с-ответом","link":"#завершение-с-ответом","children":[]}]},{"level":2,"title":"AJAX-обработчики","slug":"ajax-обработчики","link":"#ajax-обработчики","children":[]},{"level":2,"title":"Разметка по умолчанию","slug":"разметка-по-умолчанию","link":"#разметка-по-умолчанию","children":[]},{"level":2,"title":"Фрагменты компонента","slug":"фрагменты-компонента","link":"#фрагменты-компонента","children":[{"level":3,"title":"\\"self\\"","slug":"self","link":"#self","children":[]},{"level":3,"title":"Уникальный идентификатор","slug":"уникальныи-идентификатор","link":"#уникальныи-идентификатор","children":[]}]},{"level":2,"title":"Отображение фрагментов из кода","slug":"отображение-фрагментов-из-кода","link":"#отображение-фрагментов-из-кода","children":[]},{"level":2,"title":"Добавление CSS и JS файлов на страницу","slug":"добавление-css-и-js-фаилов-на-страницу","link":"#добавление-css-и-js-фаилов-на-страницу","children":[]}],"relativePath":"1.x/ru/plugin/components.md","filePath":"1.x/ru/plugin/components.md"}'),i={name:"1.x/ru/plugin/components.md"};function d(u,n,g,m,h,k){const a=e("pre-heading"),s=e("post-heading");return p(),c("div",null,[t(a),n[0]||(n[0]=l("h1",null,"Создание компонента",-1)),t(s),n[1]||(n[1]=r(`<p><a name="introduction"></a></p><h2 id="введение"><a href="#введение" class="header-anchor">#</a> Введение</h2><p>Файлы и папки компонента находятся в папке плагина в подпапке <strong>/components</strong>. Каждый компонент имеет свой PHP файл, в котором находится класс, описывающий этот компонент, и необязательную папку с фрагментами. Название этой папки должно быть написано строчными буквами и совпадать с названием класса компонента. Пример:</p><pre><code>plugins/
  acme/
    myplugin/
      components/
        componentname/       &lt;=== Component partials directory
          default.htm        &lt;=== Component default markup (optional)
        ComponentName.php    &lt;=== Component class file
      Plugin.php
</code></pre><p><a name="component-class-definition"></a></p><h2 id="определение-класса-компонента"><a href="#определение-класса-компонента" class="header-anchor">#</a> Определение класса компонента</h2><p><strong>Файл с классом компонента</strong> содержит в себе <a href="#component-properties">свойства</a> и возможности компонента. Его название должно совпадать с названием класса. Этот класс должен расширять класс <code>\\Cms\\Classes\\ComponentBase</code>. Пример содержимого файла plugins/acme/blog/components/BlogPosts.php:</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">namespace</span> <span class="token package">Acme<span class="token punctuation">\\</span>Blog<span class="token punctuation">\\</span>Components</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">BlogPosts</span> <span class="token keyword">extends</span> <span class="token class-name class-name-fully-qualified"><span class="token punctuation">\\</span>Cms<span class="token punctuation">\\</span>Classes<span class="token punctuation">\\</span>ComponentBase</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">componentDetails</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">[</span>
            <span class="token string single-quoted-string">&#39;name&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;Blog Posts&#39;</span><span class="token punctuation">,</span>
            <span class="token string single-quoted-string">&#39;description&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;Displays a collection of blog posts.&#39;</span>
        <span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// This array becomes available on the page as {{ component.posts }}</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">posts</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;First Post&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;Second Post&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;Third Post&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Метод <code>componentDetails()</code> является обязательным и должен вернуть массив с двумя ключами: <code>name</code> и <code>description</code>. Имя и описание отображаются в административном интерфейсе сайта.</p><p>Когда компонент добавлен на страницу или в шаблон, его методы и свойства становятся доступными для использования через переменную компонента, которая совпадает с его названием или алиасом. Пример добавления компонента BlogPost на страницу:</p><pre><code>url = &quot;/blog&quot;

[blogPosts]
==
</code></pre><p>Теперь Вы можете получить доступ к методу <code>posts()</code> через переменную <code>blogPosts</code>.</p><div class="language-twig extra-class"><pre class="language-twig"><code><span class="token twig language-twig"><span class="token delimiter punctuation">{%</span> <span class="token tag-name keyword">for</span> post <span class="token operator">in</span> blogPosts<span class="token punctuation">.</span>posts <span class="token delimiter punctuation">%}</span></span>
    <span class="token twig language-twig"><span class="token delimiter punctuation">{{</span> post <span class="token delimiter punctuation">}}</span></span>
<span class="token twig language-twig"><span class="token delimiter punctuation">{%</span> <span class="token tag-name keyword">endfor</span> <span class="token delimiter punctuation">%}</span></span>
</code></pre></div><p><a name="component-registration"></a></p><h3 id="регистрация-компонента"><a href="#регистрация-компонента" class="header-anchor">#</a> Регистрация компонента</h3><p>Все компоненты должны быть указаны в методе <code>registerComponents()</code> <a href="./../plugin/registration.html#component-registration">класса регистрации плагина</a>. Пример регистрации компонента:</p><pre><code>public function registerComponents()
{
    return [
        &#39;October\\Demo\\Components\\Todo&#39; =&gt; &#39;demoTodo&#39;
    ];
}
</code></pre><p>Теперь компонент <strong>Todo</strong> с алиасом <strong>demoTodo</strong> доступен для использования. Вы можете найти больше информации в разделе <a href="./../cms/components.html">Компоненты</a>.</p><p><a name="component-properties"></a></p><h2 id="своиства-компонента"><a href="#своиства-компонента" class="header-anchor">#</a> Свойства компонента</h2><p>Когда Вы добавляете компонент на страницу или шаблон, то Вы также можете изменять его свойства. Свойства компонента определяются при помощи метода <code>defineProperties()</code> в классе компонента. Пример:</p><pre><code>public function defineProperties()
{
    return [
        &#39;maxItems&#39; =&gt; [
             &#39;title&#39;             =&gt; &#39;Max items&#39;,
             &#39;description&#39;       =&gt; &#39;The most amount of todo items allowed&#39;,
             &#39;default&#39;           =&gt; 10,
             &#39;type&#39;              =&gt; &#39;string&#39;,
             &#39;validationPattern&#39; =&gt; &#39;^[0-9]+$&#39;,
             &#39;validationMessage&#39; =&gt; &#39;The Max Items property can contain only numeric symbols&#39;
        ]
    ];
}
</code></pre><p>Метод должен вернуть массив с названием свойств и их параметрами. Название свойства используется для доступа к его значениям в классе компонента. Параметры свойств:</p><div class="table"><table tabindex="0"><thead><tr><th>Key</th><th>Description</th></tr></thead><tbody><tr><td><strong>title</strong></td><td>обязательное. Название свойства (используется в административном интерфейсе).</td></tr><tr><td><strong>description</strong></td><td>обязательное. Описание свойства (используется в административном интерфейсе).</td></tr><tr><td><strong>default</strong></td><td>необязательное. Значение свойства по умолчанию.</td></tr><tr><td><strong>type</strong></td><td>необязательное. Тип свойства. Допустимые типы: <strong>string</strong>, <strong>checkbox</strong> и <strong>dropdown</strong>. По умолчанию: <strong>string</strong>.</td></tr><tr><td><strong>validationPattern</strong></td><td>необязательное. Регулярное выражение для проверки значения свойства. Применяется только к свойствам типа <strong>string</strong>.</td></tr><tr><td><strong>validationMessage</strong></td><td>сообщение об ошибке, если значение не прошло проверку.</td></tr><tr><td><strong>required</strong></td><td>необязательное. Указывает на то, что поле является обязательным для заполнения. Использует validationMessage при пустом значении.</td></tr><tr><td><strong>placeholder</strong></td><td>placeholder для свойств типа <strong>string</strong> и <strong>dropdown</strong>.</td></tr><tr><td><strong>options</strong></td><td>массив опций для свойств типа <strong>dropdown</strong>.</td></tr><tr><td><strong>depends</strong></td><td>массив с именами свойств, от которых зависит свойство типа <strong>dropdown</strong>. См. <a href="#dropdown-properties">ниже</a>.</td></tr><tr><td><strong>group</strong></td><td>необязательное. Группирует несколько свойств в fieldset.</td></tr><tr><td><strong>showExternalParam</strong></td><td>определяет возможность ввода произвольного параметра (стрелочка справа в текстовом поле). По умолчанию: <strong>true</strong>.</td></tr></tbody></table></div><p>Внутри компонента Вы можете получить значение свойства при помощи метода <code>property()</code>:</p><pre><code>$this-&gt;property(&#39;maxItems&#39;);
</code></pre><p>Если значение не определено, то Вы можете подставить значение по умолчанию в качестве второго аргумента метода <code>property()</code>:</p><pre><code>$this-&gt;property(&#39;maxItems&#39;, 6);
</code></pre><p>Вы также можете получить все свойства в виде массива:</p><pre><code>$properties = $this-&gt;getProperties();
</code></pre><p><a name="dropdown-properties"></a></p><h3 id="выпадающии-список"><a href="#выпадающии-список" class="header-anchor">#</a> Выпадающий список</h3><p>Опции выпадающего списка могут быть статическими или динамическими. Статические опции задаются в виде массива и присваиваются элементу <code>options</code> массива, который описывает свойство. Пример:</p><pre><code>public function defineProperties()
{
    return [
        &#39;units&#39; =&gt; [
            &#39;title&#39;       =&gt; &#39;Units&#39;,
            &#39;type&#39;        =&gt; &#39;dropdown&#39;,
            &#39;default&#39;     =&gt; &#39;imperial&#39;,
            &#39;placeholder&#39; =&gt; &#39;Select units&#39;,
            &#39;options&#39;     =&gt; [&#39;metric&#39;=&gt;&#39;Metric&#39;, &#39;imperial&#39;=&gt;&#39;Imperial&#39;]
        ]
    ];
}
</code></pre><p>Чтобы задать опции динамически, нужно удалить элемент <code>options</code> из массива, описывающий свойство, и определить метод, который будет их возвращать. Метод должен иметь название в следующем формате: <code>get*Property*Options()</code>, где <strong>Property</strong> - имя свойства. Пример:</p><pre><code>public function defineProperties()
{
    return [
        &#39;country&#39; =&gt; [
            &#39;title&#39;   =&gt; &#39;Country&#39;,
            &#39;type&#39;    =&gt; &#39;dropdown&#39;,
            &#39;default&#39; =&gt; &#39;us&#39;
        ]
    ];
}

public function getCountryOptions()
{
    return [&#39;us&#39;=&gt;&#39;United states&#39;, &#39;ca&#39;=&gt;&#39;Canada&#39;];
}
</code></pre><p>Динамический выпадающий список может зависеть от других свойств. Например, список с областями может зависеть от выбранной страны. Зависимость устанавливается при помощи параметра <code>depends</code> в массиве с описанием свойства. Пример:</p><pre><code>public function defineProperties()
{
    return [
        &#39;country&#39; =&gt; [
            &#39;title&#39;       =&gt; &#39;Country&#39;,
            &#39;type&#39;        =&gt; &#39;dropdown&#39;,
            &#39;default&#39;     =&gt; &#39;us&#39;
        ],
        &#39;state&#39; =&gt; [
            &#39;title&#39;       =&gt; &#39;State&#39;,
            &#39;type&#39;        =&gt; &#39;dropdown&#39;,
            &#39;default&#39;     =&gt; &#39;dc&#39;,
            &#39;depends&#39;     =&gt; [&#39;country&#39;],
            &#39;placeholder&#39; =&gt; &#39;Select a state&#39;
        ]
    ];
}
</code></pre><p>Для того, чтобы получить список областей, Вы должны знать выбранную страну. Инспектор отправляет все значения в обработчик <code>getPropertyOptions()</code>. Таким образом, Вы можете сделать следующее:</p><pre><code>public function getStateOptions()
{
    $countryCode = Request::input(&#39;country&#39;); // Load the country property value from POST

    $states = [
        &#39;ca&#39; =&gt; [&#39;ab&#39;=&gt;&#39;Alberta&#39;, &#39;bc&#39;=&gt;&#39;British columbia&#39;],
        &#39;us&#39; =&gt; [&#39;al&#39;=&gt;&#39;Alabama&#39;, &#39;ak&#39;=&gt;&#39;Alaska&#39;]
    ];

    return $states[$countryCode];
}
</code></pre><p><a name="page-list-properties"></a></p><h3 id="список-страниц"><a href="#список-страниц" class="header-anchor">#</a> Список страниц</h3><p>Иногда в компонентах нужно сделать выпадающий список с выбором страницы. В следующем примере показано, как это сделать:</p><pre><code>public function defineProperties()
{
        return [
            &#39;postPage&#39; =&gt; [
                &#39;title&#39; =&gt; &#39;Post page&#39;,
                &#39;type&#39; =&gt; &#39;dropdown&#39;,
                &#39;default&#39; =&gt; &#39;blog/post&#39;
            ]
        ];
}

public function getPostPageOptions()
{
    return Page::sortBy(&#39;baseFileName&#39;)-&gt;lists(&#39;baseFileName&#39;, &#39;baseFileName&#39;);
}
</code></pre><p><a name="routing-parameters"></a></p><h2 id="параметры-маршрутизации"><a href="#параметры-маршрутизации" class="header-anchor">#</a> Параметры маршрутизации</h2><p>Компоненты могут получить доступ к параметрам маршрутизации, которые определяются в <a href="./../cms/pages.html#url-syntax">URL страницы</a>.</p><pre><code>// Returns the URL segment value, eg: /page/:post_id
$postId = $this-&gt;param(&#39;post_id&#39;);
</code></pre><p>Также для этого Вы можете использовать свойства компонента.</p><p>Вариант 1:</p><pre><code>url = &quot;/blog/hard-coded-page&quot;

[blogPost]
id = &quot;2&quot;
</code></pre><p>Вариант 2:</p><div class="language- extra-class"><pre class="language-text"><code>url = &quot;/blog/:my_custom_parameter&quot;

[blogPost]
id = &quot;{{ :my_custom_parameter }}&quot;
</code></pre></div><p>В обоих случаях Вы можете получить значение при помощи метода <code>property()</code>:</p><pre><code>$this-&gt;property(&#39;id&#39;);
</code></pre><p>Используйте метод <code>paramName()</code>, чтобы получить имя параметра:</p><pre><code>$this-&gt;paramName(&#39;id&#39;); // Вернет &quot;my_custom_parameter&quot;
</code></pre><p><a name="page-cycle"></a></p><h2 id="обработка-цикла-выполнения-страницы"><a href="#обработка-цикла-выполнения-страницы" class="header-anchor">#</a> Обработка цикла выполнения страницы</h2><p>Компоненты могут быть включены в события обработки страницы при помощи переопределения метода <code>onRun()</code> в классе компонента. CMS будет выполнять этот метод каждый раз, когда будет загружена страница или шаблон. Внутри этого метода Вы можете определять переменные, доступные на странице шаблона, через свойство <code>page</code>:</p><pre><code>public function onRun()
{
    // This code will be executed when the page or layout is
    // loaded and the component is attached to it.

    $this-&gt;page[&#39;var&#39;] = &#39;value&#39;; // Inject some variable to the page
}
</code></pre><p><a name="page-cycle-handlers"></a></p><h3 id="обработчики-страницы"><a href="#обработчики-страницы" class="header-anchor">#</a> Обработчики страницы</h3><p>Когда страница загружается, OctoberCMS выполняет функции, которые могут быть определены в <a href="./../cms/themes.html#php-section">PHP секции</a> страницы, шаблона или в классе компонента. Последовательность выполнения обработчиков:</p><ol><li><code>onInit()</code> - функция шаблона.</li><li><code>onInit()</code> - функция страницы.</li><li><code>onStart()</code> - функция шаблона.</li><li><code>onRun()</code> - метод компонента, привязанного к шаблону.</li><li><code>onBeforePageStart()</code> - функция шаблона.</li><li><code>onStart()</code> - функция страницы.</li><li><code>onRun()</code> - метод компонента, привязанного к странице.</li><li><code>onEnd()</code> - функция страницы.</li><li><code>onEnd()</code> - функция шаблона.</li></ol><p><a name="page-cycle-init"></a></p><h3 id="инициализация-компонента"><a href="#инициализация-компонента" class="header-anchor">#</a> Инициализация компонента</h3><p>Иногда вам может потребоваться выполнить код во время создания экземпляра класса компонента. Вы можете переопределить метод <code>init</code> в классе компонентов для обработки любой логики инициализации, который будет выполняться до обработчиков AJAX и до жизненного цикла выполнения страницы. Например, этот метод можно использовать для динамического присоединения другого компонента к странице.</p><pre><code>public function init()
{
    $this-&gt;addComponent(&#39;Acme\\Blog\\Components\\BlogPosts&#39;, &#39;blogPosts&#39;);
}
</code></pre><p><a name="page-cycle-response"></a></p><h3 id="завершение-с-ответом"><a href="#завершение-с-ответом" class="header-anchor">#</a> Завершение с ответом</h3><p>Также как и все методы <a href="./../cms/layouts.html#layout-life-cycle">жизненного цикла выполнения страницы</a>, метод <code>onRun()</code> в компоненте может остановить цикл и вернуть ответ браузеру. Пример с сообщением об отказе в доступе:</p><pre><code>public function onRun()
{
    if (true) {
        return Response::make(&#39;Access denied!&#39;, 403);
    }
}
</code></pre><p><a name="ajax-handlers"></a></p><h2 id="ajax-обработчики"><a href="#ajax-обработчики" class="header-anchor">#</a> AJAX-обработчики</h2><p>Компоненты могут обрабатывать события AJAX. Обработчики задаются в классе компонента так же, как и в <a href="./../cms/ajax.html#ajax-handlers">странице или шаблоне</a>. Пример обработчика:</p><pre><code>public function onAddItem()
{
    $value1 = post(&#39;value1&#39;);
    $value2 = post(&#39;value2&#39;);
    $this-&gt;page[&#39;result&#39;] = $value1 + $value2;
}
</code></pre><p>Более подробно об использовании AJAX в компонентах написано <a href="./../cms/ajax.html#components-ajax-handlers">в этой статье</a>.</p><p><a name="default-markup"></a></p><h2 id="разметка-по-умолчанию"><a href="#разметка-по-умолчанию" class="header-anchor">#</a> Разметка по умолчанию</h2><p>Компонент по умолчанию может выводить произвольный html код при помощи фрагментов, которые находятся в папке <strong>/plugins/AUTHOR/PLUGINNAME/components/COMPONENTNAME/</strong>. Изначально там находится только один файл - <strong>default.htm</strong>, который выводит свое содержимое на страницу или в шаблон в том месте, где вставлен тег <code>{% component %}</code>. Пример:</p><pre><code>url = &quot;/todo&quot;

[demoTodo]
==
{% component &#39;demoTodo&#39; %}
</code></pre><p>Шаблон по умолчанию также может принимать параметры, которые переопределяют <a href="#component-properties">свойства компонента</a>, в момент отображения:</p><pre><code>{% component &#39;demoTodo&#39; maxItems=&quot;7&quot; %}
</code></pre><p>Эти параметры не будут доступны в методе <code>onRun()</code> (так как они задаются после отображения страницы), но их можно использовать в методе <code>onRender()</code> класса компонента перед тем, как будет отображен шаблон по умолчанию.</p><pre><code>public function onRender()
{
    // This code will be executed before the default component
    // markup is rendered on the page or layout.

    $this-&gt;page[&#39;var&#39;] = &#39;Maximum items allowed: &#39; . $this-&gt;property(&#39;maxItems&#39;);
}
</code></pre><p><a name="component-partials"></a></p><h2 id="фрагменты-компонента"><a href="#фрагменты-компонента" class="header-anchor">#</a> Фрагменты компонента</h2><p>В дополнение к разметке по умолчанию, компоненты также могут использовать фрагменты. Если у компонента Demo ToDo есть фрагмент с навигацией, то он будет находиться в <strong>/plugins/october/demo/components/todo/pagination.htm</strong> и отображаться на странице, используя:</p><div class="language-twig extra-class"><pre class="language-twig"><code><span class="token twig language-twig"><span class="token delimiter punctuation">{%</span> <span class="token tag-name keyword">partial</span> <span class="token string"><span class="token punctuation">&#39;</span>demoTodo::pagination<span class="token punctuation">&#39;</span></span> <span class="token delimiter punctuation">%}</span></span>
</code></pre></div><p>Вы можете использовать контекстно-зависимый метод для отображения фрагмента. Если он вызывается внутри фрагмента компонента, то будет ссылаться на самого себя. Если он вызывается внутри фрагмента темы, то будет сканировать все компоненты, используемые на странице/шаблоне, и использовать их.</p><p>A relaxed method can be used that is contextual. If called inside a component partial, it will directly refer to itself. If called inside a theme partial, it will scan all components used on the page/layout for a matching partial name and use that.</p><div class="language-twig extra-class"><pre class="language-twig"><code><span class="token twig language-twig"><span class="token delimiter punctuation">{%</span> <span class="token tag-name keyword">partial</span> <span class="token string"><span class="token punctuation">&#39;</span>@pagination<span class="token punctuation">&#39;</span></span> <span class="token delimiter punctuation">%}</span></span>
</code></pre></div><p>Несколько компонентов могут использовать фрагмент, который находится в папке <strong>components/partials</strong>, как запасной вариант, когда обычный фрагмент компонента не может быть найден. Например, общий фрагмент, расположенный в <strong>/plugins/acme/blog/components/partials/shared.htm</strong>, может быть отображен на странице любым компонентом таким образом:</p><div class="language-twig extra-class"><pre class="language-twig"><code><span class="token twig language-twig"><span class="token delimiter punctuation">{%</span> <span class="token tag-name keyword">partial</span> <span class="token string"><span class="token punctuation">&#39;</span>@shared<span class="token punctuation">&#39;</span></span> <span class="token delimiter punctuation">%}</span></span>
</code></pre></div><p><a name="referencing-self"></a></p><h3 id="self"><a href="#self" class="header-anchor">#</a> &quot;self&quot;</h3><p>Компонент может ссылаться на самого себя в фрагментах при помощи переменной <code>__SELF__</code>. По умолчанию она вернет название компонента или <a href="./../cms/components.html#aliases">алиас</a>.</p><div class="language-twig extra-class"><pre class="language-twig"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">data-request</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token twig language-twig"><span class="token delimiter punctuation">{{</span>__SELF__<span class="token delimiter punctuation">}}</span></span>::onEventHandler<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    [...]
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>Компоненты могут также ссылаться на свои собственные свойства.</p><div class="language-twig extra-class"><pre class="language-twig"><code><span class="token twig language-twig"><span class="token delimiter punctuation">{%</span> <span class="token tag-name keyword">for</span> item <span class="token operator">in</span> __SELF__<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token delimiter punctuation">%}</span></span>
    <span class="token twig language-twig"><span class="token delimiter punctuation">{{</span> item <span class="token delimiter punctuation">}}</span></span>
<span class="token twig language-twig"><span class="token delimiter punctuation">{%</span> <span class="token tag-name keyword">endfor</span> <span class="token delimiter punctuation">%}</span></span>
</code></pre></div><p>Пример вывода фрагмента в фрагменте:</p><div class="language-twig extra-class"><pre class="language-twig"><code><span class="token twig language-twig"><span class="token delimiter punctuation">{%</span> <span class="token tag-name keyword">partial</span> __SELF__<span class="token operator">~</span><span class="token string"><span class="token punctuation">&quot;</span>::screenshot-list<span class="token punctuation">&quot;</span></span> <span class="token delimiter punctuation">%}</span></span>
</code></pre></div><p><a name="unique-identifier"></a></p><h3 id="уникальныи-идентификатор"><a href="#уникальныи-идентификатор" class="header-anchor">#</a> Уникальный идентификатор</h3><p>Если компонент вызывается дважды на одной и той же странице, то свойство <code>id</code> может быть использовано для ссылки на каждый экземпляр.</p><div class="language-twig extra-class"><pre class="language-twig"><code><span class="token twig language-twig"><span class="token delimiter punctuation">{{</span>__SELF__<span class="token punctuation">.</span>id<span class="token delimiter punctuation">}}</span></span>
</code></pre></div><p>При обновлении страницы ID изменяется:</p><div class="language-twig extra-class"><pre class="language-twig"><code><span class="token comment">&lt;!-- ID: demoTodo527c532e9161b --&gt;</span>
<span class="token twig language-twig"><span class="token delimiter punctuation">{%</span> <span class="token tag-name keyword">component</span> <span class="token string"><span class="token punctuation">&#39;</span>demoTodo<span class="token punctuation">&#39;</span></span> <span class="token delimiter punctuation">%}</span></span>

<span class="token comment">&lt;!-- ID: demoTodo527c532ec4c33 --&gt;</span>
<span class="token twig language-twig"><span class="token delimiter punctuation">{%</span> <span class="token tag-name keyword">component</span> <span class="token string"><span class="token punctuation">&#39;</span>demoTodo<span class="token punctuation">&#39;</span></span> <span class="token delimiter punctuation">%}</span></span>
</code></pre></div><p><a name="render-partial-method"></a></p><h2 id="отображение-фрагментов-из-кода"><a href="#отображение-фрагментов-из-кода" class="header-anchor">#</a> Отображение фрагментов из кода</h2><p>Вы можете отобразить фрагменты компонента при помощи метода <code>renderPartial</code>. Он проверит компонент на наличие фрагмента <code>component-partial.htm</code> и вернет результат в виде строки. Второй аргумент используется для передачи произвольных переменных.</p><pre><code>$content = $this-&gt;renderPartial(&#39;component-partial.htm&#39;);

$content = $this-&gt;renderPartial(&#39;component-partial.htm&#39;, [
    &#39;name&#39; =&gt; &#39;John Smith&#39;
]);
</code></pre><p>Пример отображения фрагмента при помощи <a href="./../cms/ajax.html#ajax-handlers">AJAX-обработчика</a>:</p><pre><code>function onGetTemplate()
{
    return [&#39;#someDiv&#39; =&gt; $this-&gt;renderPartial(&#39;component-partial.htm&#39;)];
}
</code></pre><p>Другой пример показывает, как можно переопределить весь ответ на просмотр страницы, возвращая XML-ответ при помощи фасада <code>Response</code> из метода <code>onRun</code>:</p><pre><code>public function onRun()
{
    $content = $this-&gt;renderPartial(&#39;default.htm&#39;);
    return Response::make($content)-&gt;header(&#39;Content-Type&#39;, &#39;text/xml&#39;);
}
</code></pre><p><a name="component-assets"></a></p><h2 id="добавление-css-и-js-фаилов-на-страницу"><a href="#добавление-css-и-js-фаилов-на-страницу" class="header-anchor">#</a> Добавление CSS и JS файлов на страницу</h2><p>Компоненты могут добавлять CSS или JS файлы на страницу или в шаблон при помощи методов <code>addCss()</code> и <code>addJs()</code> соответственно. Их можно использовать в методе <code>onRun()</code>. Пример:</p><pre><code>public function onRun()
{
    $this-&gt;addJs(&#39;/plugins/acme/blog/assets/javascript/blog-controls.js&#39;);
}
</code></pre><p>Если путь до файла начинается с (/), тогда он будет относительно корня сайта, иначе - папки компонента.</p>`,122))])}const y=o(i,[["render",d]]);export{w as __pageData,y as default};
