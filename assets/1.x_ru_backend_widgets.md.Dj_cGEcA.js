import{_ as s,r as e,o,c as l,e as n,a as i,s as d}from"./chunks/framework.CXcwiNg-.js";const b=JSON.parse('{"title":"Виджеты - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Универсальные виджеты","slug":"универсальные-виджеты","link":"#универсальные-виджеты","children":[{"level":3,"title":"Определение класса","slug":"определение-класса","link":"#определение-класса","children":[]},{"level":3,"title":"AJAX","slug":"ajax","link":"#ajax","children":[]},{"level":3,"title":"Привязка виджетов к контроллерам","slug":"привязка-виджетов-к-контроллерам","link":"#привязка-виджетов-к-контроллерам","children":[]}]},{"level":2,"title":"Виджеты форм","slug":"виджеты-форм","link":"#виджеты-форм","children":[{"level":3,"title":"Определение класса","slug":"определение-класса-1","link":"#определение-класса-1","children":[]},{"level":3,"title":"Регистрация виджета","slug":"регистрация-виджета","link":"#регистрация-виджета","children":[]}]},{"level":2,"title":"Виджеты отчетов","slug":"виджеты-отчетов","link":"#виджеты-отчетов","children":[{"level":3,"title":"Определение класса","slug":"определение-класса-2","link":"#определение-класса-2","children":[]},{"level":3,"title":"Свойства виджетов отчетов","slug":"своиства-виджетов-отчетов","link":"#своиства-виджетов-отчетов","children":[]},{"level":3,"title":"Регистрация виджета","slug":"регистрация-виджета-1","link":"#регистрация-виджета-1","children":[]}]}],"relativePath":"1.x/ru/backend/widgets.md","filePath":"1.x/ru/backend/widgets.md"}'),g={name:"1.x/ru/backend/widgets.md"};function c(p,t,h,u,f,m){const a=e("pre-heading"),r=e("post-heading");return o(),l("div",null,[n(a),t[0]||(t[0]=i("h1",null,"Виджеты",-1)),n(r),t[1]||(t[1]=d(`<p>Виджеты - автономные элементы страницы, которые выполняют различные задачи. Они всегда имеют пользовательский интерфейс и контроллер (класс виджета), который подготавливает и обрабатывает необходимые данные, используя AJAX.</p><p><a name="generic-widgets" class="anchor"></a></p><h2 id="универсальные-виджеты"><a href="#универсальные-виджеты" class="header-anchor">#</a> Универсальные виджеты</h2><p>Виджеты очень похожи на <a href="./../cms/components.html">Компоненты</a>. Это такие же элементы страницы, которые имеют свою логику, поддерживают фрагменты и используют алиасы в качестве названий. Ключевым отличием является то, что виджеты используют YAML разметку для описания настроек и привязаны к Административному интерфейсу.</p><p>Виджеты находятся в папке плагина в подпаке <strong>widgets</strong>. Название папки должно совпадать с именем класса виджета и должно быть написано строчными буквами. Виджеты могут использовать свои JS/CSS файлы и фрагменты. Пример:</p><pre><code>widgets/
  /form
    /partials
      _form.htm     &lt;=== Widget partial file
    /assets
      /js
        form.js     &lt;=== Widget JavaScript file
      /css
        form.css    &lt;=== Widget StyleSheet file
  Form.php          &lt;=== Widget class
</code></pre><p><a name="generic-class-definition" class="anchor"></a></p><h3 id="определение-класса"><a href="#определение-класса" class="header-anchor">#</a> Определение класса</h3><p>Класс универсального виджета должен расширять <code>Backend\\Classes\\WidgetBase</code> класс. Как и любой другой класс плагина, он также должен принадлежать <a href="./../plugin/registration.html#namespaces">пространству имен</a>. Пример:</p><pre><code>namespace Backend\\Widgets;

use Backend\\Classes\\WidgetBase;

class Lists extends WidgetBase
{
    protected $defaultAlias = &#39;list&#39;;

    public function widgetDetails()
    {
        return [
            &#39;name&#39;        =&gt; &#39;List Widget&#39;,
            &#39;description&#39; =&gt; &#39;Used for building back end lists.&#39;
        ];
    }

    ...
</code></pre><p>Класс виджета должен содержать метод <strong>render()</strong> для отображения содержимого. Пример:</p><pre><code>public function render()
{
    return $this-&gt;makePartial(&#39;list&#39;);
}
</code></pre><p>Вы можете использовать переменную <code>$vars</code>, чтобы передать произвольное значение во франмент</p><pre><code>public function render()
{
    $this-&gt;vars[&#39;var&#39;] = &#39;value&#39;;
    return $this-&gt;makePartial(&#39;list&#39;);
}
</code></pre><p>Вы также можете передать необходимые значения в качестве второго параметра метода <code>makePartial()</code>:</p><pre><code>public function render()
{
    $this-&gt;vars[&#39;var&#39;] = $value;
    return $this-&gt;makePartial(&#39;list&#39;, [&#39;var&#39;=&gt;&#39;value&#39;]);
}
</code></pre><p><a name="generic-ajax-handlers" class="anchor"></a></p><h3 id="ajax"><a href="#ajax" class="header-anchor">#</a> AJAX</h3><p>Виджеты могут использовать AJAX как и <a href="./../backend/controllers-views-ajax.html#ajax">контроллеры</a>. Обработчики AJAX являются публичными методами класса виджета с названием, начинающимся с <strong>on</strong>. Единственным отличием является то, что Вы должны использовать <code>getEventHandler()</code> в <code>data-request</code>. Пример:</p><pre><code>&lt;a
    href=&quot;javascript:;&quot;
    data-request=&quot;&lt;?= $this-&gt;getEventHandler(&#39;onPaginate&#39;) ?&gt;&quot;
    title=&quot;Next page&quot;&gt;Next&lt;/a&gt;
</code></pre><p><a name="generic-binding" class="anchor"></a></p><h3 id="привязка-виджетов-к-контроллерам"><a href="#привязка-виджетов-к-контроллерам" class="header-anchor">#</a> Привязка виджетов к контроллерам</h3><p>Виджет должен быть привязан к <a href="./../backend/controllers-views-ajax.html">контроллеру</a> перед тем, как его можно использовать на административных страницах или фрагментах. Для этого используется метод <code>bindToController()</code>. Пример:</p><pre><code>public function __construct()
{
    parent::__construct();

    $myWidget = new MyWidgetClass($this);
    $myWidget-&gt;alias = &#39;myWidget&#39;;
    $myWidget-&gt;bindToController();
}
</code></pre><p>После привязки виджет можно отобразить на странице или фрагменте при помощи его алиаса:</p><pre><code>&lt;?= $this-&gt;widget-&gt;myWidget-&gt;render() ?&gt;
</code></pre><p><a name="form-widgets" class="anchor"></a></p><h2 id="виджеты-форм"><a href="#виджеты-форм" class="header-anchor">#</a> Виджеты форм</h2><p>При помощи виджетов форм Вы можете расширить функциональность административных <a href="./$1.html">./backend-forms</a>. Виджеты этого типа должны быть зарегистрированы в <a href="./../plugin/registration.html#widget-registration">Файле регистрации плагина</a>.</p><p><a name="form-class-definition" class="anchor"></a></p><h3 id="определение-класса-1"><a href="#определение-класса-1" class="header-anchor">#</a> Определение класса</h3><p>Класс виджета форм должен расширять <code>Backend\\Classes\\FormWidgetBase</code> класс. Как и любой другой класс плагина, он также должен принадлежать <a href="./../plugin/registration.html#namespaces">пространству имен</a>. Зарегистрированный виджет может использоваться в <a href="./../backend/forms.html#form-fields">файле с описанием полей</a>. Пример:</p><pre><code>namespace Backend\\Widgets;

use Backend\\Classes\\FormWidgetBase;

class CodeEditor extends FormWidgetBase
{
    public function widgetDetails()
    {
        return [
            &#39;name&#39;        =&gt; &#39;Code Editor&#39;,
            &#39;description&#39; =&gt; &#39;Renders a code editor field.&#39;
        ];
    }

    public function render() {}
}
</code></pre><p><a name="form-widget-registration" class="anchor"></a></p><h3 id="регистрация-виджета"><a href="#регистрация-виджета" class="header-anchor">#</a> Регистрация виджета</h3><p>Плагины могут регистрировать виджеты переопределяя метод <code>registerFormWidgets()</code> внутри <a href="./../plugin/registration.html#widget-registration">Файла регистрации плагина</a>. Метод должен вернуть массив, где ключ - класс виджета, а значение - массив с меткой и кодом. Пример:</p><pre><code>public function registerFormWidgets()
{
    return [
        &#39;Backend\\FormWidgets\\CodeEditor&#39; =&gt; [
            &#39;label&#39; =&gt; &#39;Code editor&#39;,
            &#39;code&#39;  =&gt; &#39;codeeditor&#39;
        ]
    ];
}
</code></pre><p><strong>Метка</strong> определяет название виджета, а <strong>код</strong> можно использовать в настройках <a href="./../backend/forms.html#field-widget">формы</a>. Он должен быть уникальным, чтобы избежать конфликтов с другими полями формы.</p><p><a name="report-widgets" class="anchor"></a></p><h2 id="виджеты-отчетов"><a href="#виджеты-отчетов" class="header-anchor">#</a> Виджеты отчетов</h2><p>Виджеты отчетов могут использоваться на панели управления сайта, а также в некоторых других местах (где есть контейнеры отчетов). Виджеты этого типа должны быть также указаны в <a href="./../plugin/registration.html#widget-registration">Файле регистрации плагина</a>.</p><p><a name="report-class-definition" class="anchor"></a></p><h3 id="определение-класса-2"><a href="#определение-класса-2" class="header-anchor">#</a> Определение класса</h3><p>Класс виджета отчетов должен расширять <code>Backend\\Classes\\ReportWidgetBase</code> класс. Как и любой другой класс плагина, он также должен принадлежать <a href="./../plugin/registration.html#namespaces">пространству имен</a>. Класс виджета должен переопределять метод <strong>render()</strong> для отображения содержимого. Пример:</p><pre><code>plugins/
  rainlab/                    &lt;=== Author name
    googleanalytics/          &lt;=== Plugin name
      reportwidgets/          &lt;=== Report widgets directory
        trafficsources        &lt;=== Widget files directory
          partials
            _widget.htm
        TrafficSources.php    &lt;=== Widget class file
</code></pre><p>Пример содержимого файла <code>TrafficSources.php</code>:</p><pre><code>namespace RainLab\\GoogleAnalytics\\ReportWidgets;

use Backend\\Classes\\ReportWidgetBase;

class TrafficSources extends ReportWidgetBase
{
    public function render()
    {
        return $this-&gt;makePartial(&#39;widget&#39;);
    }
}
</code></pre><p>Фрагменты виджета могут содержать любую HMTL разметку. Весь код должен быть обернут в <code>DIV</code> с классом <strong>report-widget</strong>. Для отображения заголовков лучше использовать элемент <code>H3</code>. Пример фрагмента:</p><pre><code>&lt;div class=&quot;report-widget&quot;&gt;
    &lt;h3&gt;Traffic sources&lt;/h3&gt;

    &lt;div
        class=&quot;control-chart&quot;
        data-control=&quot;chart-pie&quot;
        data-size=&quot;200&quot;
        data-center-text=&quot;180&quot;&gt;
        &lt;ul&gt;
            &lt;li&gt;Direct &lt;span&gt;1000&lt;/span&gt;&lt;/li&gt;
            &lt;li&gt;Social networks &lt;span&gt;800&lt;/span&gt;&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/div&gt;
&lt;/div&gt;
</code></pre><p><img src="https://raw.githubusercontent.com/octobercms/docs/master/images/traffic-sources.png" alt="image"></p><p>Внутри виджетов отчетов Вы можете использовать любые <a href="./../backend/controls.html">элементы управления</a>, списки и т.д. Пример:</p><pre><code>&lt;div class=&quot;report-widget&quot;&gt;
    &lt;h3&gt;Top pages&lt;/h3&gt;

    &lt;div class=&quot;table-container&quot;&gt;
        &lt;table class=&quot;table data&quot; data-provides=&quot;rowlink&quot;&gt;
            &lt;thead&gt;
                &lt;tr&gt;
                    &lt;th&gt;&lt;span&gt;Page URL&lt;/span&gt;&lt;/th&gt;
                    &lt;th&gt;&lt;span&gt;Pageviews&lt;/span&gt;&lt;/th&gt;
                    &lt;th&gt;&lt;span&gt;% Pageviews&lt;/span&gt;&lt;/th&gt;
                &lt;/tr&gt;
            &lt;/thead&gt;
            &lt;tbody&gt;
                &lt;tr&gt;
                    &lt;td&gt;/&lt;/td&gt;
                    &lt;td&gt;90&lt;/td&gt;
                    &lt;td&gt;
                        &lt;div class=&quot;progress&quot;&gt;
                            &lt;div class=&quot;bar&quot; style=&quot;90%&quot;&gt;&lt;/div&gt;
                            &lt;a href=&quot;/&quot;&gt;90%&lt;/a&gt;
                        &lt;/div&gt;
                    &lt;/td&gt;
                &lt;/tr&gt;
                &lt;tr&gt;
                    &lt;td&gt;/docs&lt;/td&gt;
                    &lt;td&gt;10&lt;/td&gt;
                    &lt;td&gt;
                        &lt;div class=&quot;progress&quot;&gt;
                            &lt;div class=&quot;bar&quot; style=&quot;10%&quot;&gt;&lt;/div&gt;
                            &lt;a href=&quot;/docs&quot;&gt;10%&lt;/a&gt;
                        &lt;/div&gt;
                    &lt;/td&gt;
                &lt;/tr&gt;
            &lt;/tbody&gt;
        &lt;/table&gt;
    &lt;/div&gt;
&lt;/div&gt;
</code></pre><p><a name="report-properties" class="anchor"></a></p><h3 id="своиства-виджетов-отчетов"><a href="#своиства-виджетов-отчетов" class="header-anchor">#</a> Свойства виджетов отчетов</h3><p>Виджеты отчетов могут иметь свойства, которые пользователи могут изменять при помощи <strong>Инспектора</strong>:</p><p><img src="https://github.com/octobercms/docs/blob/develop/images/report-widget-inspector.png?raw=true" alt="image"></p><p><a href="./../plugin/components.html#component-properties">Свойства</a> должны быть определены в классе виджета в методе <code>defineProperties()</code>. Пример:</p><pre><code>public function defineProperties()
{
    return [
        &#39;title&#39; =&gt; [
            &#39;title&#39;             =&gt; &#39;Widget title&#39;,
            &#39;default&#39;           =&gt; &#39;Top Pages&#39;,
            &#39;type&#39;              =&gt; &#39;string&#39;,
            &#39;validationPattern&#39; =&gt; &#39;^.+$&#39;,
            &#39;validationMessage&#39; =&gt; &#39;The Widget Title is required.&#39;
        ],
        &#39;days&#39; =&gt; [
            &#39;title&#39;             =&gt; &#39;Number of days to display data for&#39;,
            &#39;default&#39;           =&gt; &#39;7&#39;,
            &#39;type&#39;              =&gt; &#39;string&#39;,
            &#39;validationPattern&#39; =&gt; &#39;^[0-9]+$&#39;
        ]
    ];
}
</code></pre><p><a name="report-widget-registration" class="anchor"></a></p><h3 id="регистрация-виджета-1"><a href="#регистрация-виджета-1" class="header-anchor">#</a> Регистрация виджета</h3><p>Плагины могут регистрировать виджеты переопределяя метод <code>registerReportWidgets()</code> внутри <a href="./../plugin/registration.html#widget-registration">Файла регистрации плагина</a>. Метод должен вернуть массив, где ключ - класс виджета, а значение - массив с меткой и контекстом. Пример:</p><pre><code>public function registerReportWidgets()
{
    return [
        &#39;RainLab\\GoogleAnalytics\\ReportWidgets\\TrafficOverview&#39; =&gt; [
            &#39;label&#39;   =&gt; &#39;Google Analytics traffic overview&#39;,
            &#39;context&#39; =&gt; &#39;dashboard&#39;
        ],
        &#39;RainLab\\GoogleAnalytics\\ReportWidgets\\TrafficSources&#39; =&gt; [
            &#39;label&#39;   =&gt; &#39;Google Analytics traffic sources&#39;,
            &#39;context&#39; =&gt; &#39;dashboard&#39;
        ]
    ];
}
</code></pre><p><strong>Метка</strong> определяет название виджета, а <strong>контекст</strong> - место, где его можно использовать.</p>`,63))])}const q=s(g,[["render",c]]);export{b as __pageData,q as default};
