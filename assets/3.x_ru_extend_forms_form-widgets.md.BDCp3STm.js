import{_ as p,r as s,o,c,e as a,a as l,s as i}from"./chunks/framework.CXcwiNg-.js";const v=JSON.parse('{"title":"Виджеты форм - October CMS - 3.x","titleTemplate":false,"description":"Виджет, специально созданный для использования в качестве поля формы.","frontmatter":{"subtitle":"Виджет, специально созданный для использования в качестве поля формы."},"headers":[{"level":3,"title":"Определение класса","slug":"определение-класса","link":"#определение-класса","children":[]},{"level":3,"title":"Свойства виджета формы","slug":"своиства-виджета-формы","link":"#своиства-виджета-формы","children":[]},{"level":3,"title":"Регистрация виджета формы","slug":"регистрация-виджета-формы","link":"#регистрация-виджета-формы","children":[]},{"level":3,"title":"Загрузка данных формы","slug":"загрузка-данных-формы","link":"#загрузка-данных-формы","children":[]},{"level":3,"title":"Сохранение данных формы","slug":"сохранение-данных-формы","link":"#сохранение-данных-формы","children":[]}],"relativePath":"3.x/ru/extend/forms/form-widgets.md","filePath":"3.x/ru/extend/forms/form-widgets.md"}'),r={name:"3.x/ru/extend/forms/form-widgets.md"};function u(k,n,d,g,m,f){const t=s("pre-heading"),e=s("post-heading");return o(),c("div",null,[a(t),n[0]||(n[0]=l("h1",null,"Виджеты форм",-1)),a(e),n[1]||(n[1]=i(`<p>С помощью виджетов форм вы можете добавлять новые типы элементов управления в формы панели управления. Они предоставляют функции, общие для предоставления данных для моделей. Виджеты форм должны быть зарегистрированы в <a href="./../extending.html">файле регистрации плагина</a>.</p><p>Классы виджетов форм находятся внутри директории <strong>formwidgets</strong> плагина. Имя внутренней директории совпадает с именем класса виджета в нижнем регистре. Виджеты могут предоставлять ресурсы и частичные представления. Пример структуры директории виджета формы выглядит так.</p><pre class="dir-container"><code><p>├── <code>formwidgets</code>
|   ├── colorpicker
|   |   ├── partials
|   |   |   └── _colorpicker.php  <em>← Файл частичного представления</em>
|   |   └── assets
|   |       ├── js
|   |       |   └── colorpicker.js  <em>← JavaScript-файл</em>
|   |       └── css
|   |           └── colorpicker.css  <em>← Файл стилей</em>
|   └── ColorPicker.php  <em>← Класс виджета</em></p>
</code></pre><h3 id="определение-класса"><a href="#определение-класса" class="header-anchor">#</a> Определение класса</h3><p>Команда <code>create:formwidget</code> генерирует виджет формы панели управления, представление и базовые файлы ресурсов. Первый аргумент указывает имя автора и плагина. Второй аргумент указывает имя класса виджета формы.</p><div class="language-bash extra-class"><pre class="language-bash"><code>php artisan create:formwidget Acme.Blog ColorPicker
</code></pre></div><p>Классы виджетов форм должны наследовать класс <code>Backend\\Classes\\FormWidgetBase</code>. Зарегистрированный виджет может использоваться в файле <a href="./../../element/form-fields.html">определения полей формы</a> панели управления. Пример определения класса виджета формы.</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">namespace</span> <span class="token package">Backend<span class="token punctuation">\\</span>FormWidgets</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">Backend<span class="token punctuation">\\</span>Classes<span class="token punctuation">\\</span>FormWidgetBase</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">ColorPicker</span> <span class="token keyword">extends</span> <span class="token class-name">FormWidgetBase</span>
<span class="token punctuation">{</span>
    <span class="token comment">/**
     * @var string defaultAlias to identify this widget.
     */</span>
    <span class="token keyword">protected</span> <span class="token variable">$defaultAlias</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;colorpicker&#39;</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="своиства-виджета-формы"><a href="#своиства-виджета-формы" class="header-anchor">#</a> Свойства виджета формы</h3><p>Виджеты форм могут иметь свойства, которые можно задать с помощью <a href="./../../element/form-fields.html">конфигурации полей формы</a>. Просто определите настраиваемые свойства в классе, а затем вызовите метод <code>fillFromConfig</code> для их заполнения внутри определения метода <code>init</code>.</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">class</span> <span class="token class-name-definition class-name">DatePicker</span> <span class="token keyword">extends</span> <span class="token class-name">FormWidgetBase</span>
<span class="token punctuation">{</span>
    <span class="token comment">//</span>
    <span class="token comment">// Configurable properties</span>
    <span class="token comment">//</span>

    <span class="token comment">/**
     * @var string mode for display: datetime, date, time.
     */</span>
    <span class="token keyword">public</span> <span class="token variable">$mode</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;datetime&#39;</span><span class="token punctuation">;</span>

    <span class="token comment">/**
     * @var string minDate is the minimum/earliest date that can be selected.
     * eg: 2000-01-01
     */</span>
    <span class="token keyword">public</span> <span class="token variable">$minDate</span> <span class="token operator">=</span> <span class="token constant">null</span><span class="token punctuation">;</span>

    <span class="token comment">/**
     * @var string maxDate is the maximum/latest date that can be selected.
     * eg: 2020-12-31
     */</span>
    <span class="token keyword">public</span> <span class="token variable">$maxDate</span> <span class="token operator">=</span> <span class="token constant">null</span><span class="token punctuation">;</span>

    <span class="token comment">//</span>
    <span class="token comment">// Object properties</span>
    <span class="token comment">//</span>

    <span class="token comment">/**
     * {@inheritDoc}
     */</span>
    <span class="token keyword">protected</span> <span class="token variable">$defaultAlias</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;datepicker&#39;</span><span class="token punctuation">;</span>

    <span class="token comment">/**
     * {@inheritDoc}
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token function">fillFromConfig</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
            <span class="token string single-quoted-string">&#39;mode&#39;</span><span class="token punctuation">,</span>
            <span class="token string single-quoted-string">&#39;minDate&#39;</span><span class="token punctuation">,</span>
            <span class="token string single-quoted-string">&#39;maxDate&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Значения свойств затем становятся доступными для установки из <a href="./../../element/form-fields.html">определения полей формы</a> при использовании виджета.</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">born_at</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Date of Birth
    <span class="token key atrule">type</span><span class="token punctuation">:</span> datepicker
    <span class="token key atrule">mode</span><span class="token punctuation">:</span> date
    <span class="token key atrule">minDate</span><span class="token punctuation">:</span> <span class="token datetime number">1984-04-12</span>
    <span class="token key atrule">maxDate</span><span class="token punctuation">:</span> <span class="token datetime number">2014-04-23</span>
</code></pre></div><h3 id="регистрация-виджета-формы"><a href="#регистрация-виджета-формы" class="header-anchor">#</a> Регистрация виджета формы</h3><p>Плагины должны регистрировать виджеты форм, переопределяя метод <code>registerFormWidgets</code> в <a href="./../extending.html">файле регистрации плагина</a>. Метод возвращает массив, содержащий класс виджета в ключах и короткий код виджета в значении. Пример:</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">registerFormWidgets</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span>
        <span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\\</span>Backend<span class="token punctuation">\\</span>FormWidgets<span class="token punctuation">\\</span>ColorPicker</span><span class="token operator">::</span><span class="token keyword">class</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;colorpicker&#39;</span><span class="token punctuation">,</span>
        <span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\\</span>Backend<span class="token punctuation">\\</span>FormWidgets<span class="token punctuation">\\</span>DatePicker</span><span class="token operator">::</span><span class="token keyword">class</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;datepicker&#39;</span>
    <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Короткий код является необязательным и может использоваться при ссылке на виджет в <a href="./form-controller.html">определениях полей формы</a>. Он должен быть уникальным значением для предотвращения конфликтов с другими полями формы.</p><h3 id="загрузка-данных-формы"><a href="#загрузка-данных-формы" class="header-anchor">#</a> Загрузка данных формы</h3><p>Основная цель виджета формы — взаимодействие с вашей моделью, что означает в большинстве случаев загрузку и сохранение значения через базу данных. При рендеринге виджет формы запрашивает своё сохранённое значение с помощью метода <code>getLoadValue</code>. Методы <code>getId</code> и <code>getFieldName</code> вернут уникальный идентификатор и имя для HTML-элемента, используемого в форме. Эти значения часто передаются в частичное представление виджета при рендеринге.</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">vars</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;id&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">vars</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;name&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token function">getFieldName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">vars</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;value&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token function">getLoadValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token function">makePartial</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;myformwidget&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>На базовом уровне виджет формы может отправить введённое пользователем значение обратно с помощью элемента input. Из приведённого выше примера, внутри частичного представления <strong>myformwidget</strong> элемент может быть отрендерен с использованием подготовленных переменных.</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token php language-php"><span class="token delimiter important">&lt;?=</span> <span class="token variable">$id</span> <span class="token delimiter important">?&gt;</span></span><span class="token punctuation">&quot;</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token php language-php"><span class="token delimiter important">&lt;?=</span> <span class="token variable">$name</span> <span class="token delimiter important">?&gt;</span></span><span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token php language-php"><span class="token delimiter important">&lt;?=</span> <span class="token function">e</span><span class="token punctuation">(</span><span class="token variable">$value</span><span class="token punctuation">)</span> <span class="token delimiter important">?&gt;</span></span><span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
</code></pre></div><h3 id="сохранение-данных-формы"><a href="#сохранение-данных-формы" class="header-anchor">#</a> Сохранение данных формы</h3><p>Когда приходит время принять пользовательский ввод и сохранить его в базе данных, виджет формы внутренне вызывает <code>getSaveValue</code> для запроса значения. Для изменения этого поведения просто переопределите метод в вашем классе виджета формы.</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">getSaveValue</span><span class="token punctuation">(</span><span class="token variable">$value</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token variable">$value</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>В некоторых случаях вы намеренно не хотите, чтобы какое-либо значение сохранялось, например, виджет формы, отображающий информацию без сохранения. Верните специальную константу <code>FormField::NO_SAVE_DATA</code> из класса <code>Backend\\Classes\\FormField</code>, чтобы значение было проигнорировано.</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">getSaveValue</span><span class="token punctuation">(</span><span class="token variable">$value</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\\</span>Backend<span class="token punctuation">\\</span>Classes<span class="token punctuation">\\</span>FormField</span><span class="token operator">::</span><span class="token constant">NO_SAVE_DATA</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,27))])}const y=p(r,[["render",u]]);export{v as __pageData,y as default};
