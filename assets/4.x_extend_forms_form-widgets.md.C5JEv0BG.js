import{_ as o,r as a,o as p,c as i,e as s,a as c,s as l}from"./chunks/framework.CXcwiNg-.js";const v=JSON.parse('{"title":"Form Widgets - October CMS - 4.x","titleTemplate":false,"description":"A widget specifically made for use as a form field.","frontmatter":{"subtitle":"A widget specifically made for use as a form field."},"headers":[{"level":3,"title":"Class Definition","slug":"class-definition","link":"#class-definition","children":[]},{"level":3,"title":"Form Widget Properties","slug":"form-widget-properties","link":"#form-widget-properties","children":[]},{"level":3,"title":"Form Widget Registration","slug":"form-widget-registration","link":"#form-widget-registration","children":[]},{"level":3,"title":"Loading Form Data","slug":"loading-form-data","link":"#loading-form-data","children":[]},{"level":3,"title":"Saving Form Data","slug":"saving-form-data","link":"#saving-form-data","children":[]}],"relativePath":"4.x/extend/forms/form-widgets.md","filePath":"4.x/extend/forms/form-widgets.md"}'),r={name:"4.x/extend/forms/form-widgets.md"};function u(d,n,k,m,g,h){const e=a("pre-heading"),t=a("post-heading");return p(),i("div",null,[s(e),n[0]||(n[0]=c("h1",null,"Form Widgets",-1)),s(t),n[1]||(n[1]=l(`<p>With form widgets you can add new control types to the backend forms. They provide features that are common to supplying data for models. Form widgets must be registered in the <a href="./../extending.html">plugin registration file</a>.</p><p>Form Widget classes reside inside the <strong>formwidgets</strong> directory of a plugin. The inner directory name matches the name of the widget class written in lowercase. Widgets can supply assets and partials. An example form widget directory structure looks like this.</p><pre class="dir-container"><code><p>├── <code>formwidgets</code>
|   ├── colorpicker
|   |   ├── partials
|   |   |   └── _colorpicker.php  <em>← Partial File</em>
|   |   └── assets
|   |       ├── js
|   |       |   └── colorpicker.js  <em>← JavaScript File</em>
|   |       └── css
|   |           └── colorpicker.css  <em>← StyleSheet File</em>
|   └── ColorPicker.php  <em>← Widget Class</em></p>
</code></pre><h3 id="class-definition"><a href="#class-definition" class="header-anchor">#</a> Class Definition</h3><p>The <code>create:formwidget</code> command generates a backend form widget, view and basic asset files. The first argument specifies the author and plugin name. The second argument specifies the form widget class name.</p><div class="language-bash extra-class"><pre class="language-bash"><code>php artisan create:formwidget Acme.Blog ColorPicker
</code></pre></div><p>The form widget classes must extend the <code>Backend\\Classes\\FormWidgetBase</code> class. A registered widget can be used in the backend <a href="./../../element/form-fields.html">form field definition</a> file. Example form widget class definition.</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">namespace</span> <span class="token package">Backend<span class="token punctuation">\\</span>FormWidgets</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">Backend<span class="token punctuation">\\</span>Classes<span class="token punctuation">\\</span>FormWidgetBase</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">ColorPicker</span> <span class="token keyword">extends</span> <span class="token class-name">FormWidgetBase</span>
<span class="token punctuation">{</span>
    <span class="token comment">/**
     * @var string defaultAlias to identify this widget.
     */</span>
    <span class="token keyword">protected</span> <span class="token variable">$defaultAlias</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;colorpicker&#39;</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="form-widget-properties"><a href="#form-widget-properties" class="header-anchor">#</a> Form Widget Properties</h3><p>Form widgets may have properties that can be set using the <a href="./../../element/form-fields.html">form field configuration</a>. Simply define the configurable properties on the class and then call the <code>fillFromConfig</code> method to populate them inside the <code>init</code> method definition.</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">class</span> <span class="token class-name-definition class-name">DatePicker</span> <span class="token keyword">extends</span> <span class="token class-name">FormWidgetBase</span>
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
</code></pre></div><p>The property values then become available to set from the <a href="./../../element/form-fields.html">form field definition</a> when using the widget.</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">born_at</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Date of Birth
    <span class="token key atrule">type</span><span class="token punctuation">:</span> datepicker
    <span class="token key atrule">mode</span><span class="token punctuation">:</span> date
    <span class="token key atrule">minDate</span><span class="token punctuation">:</span> <span class="token datetime number">1984-04-12</span>
    <span class="token key atrule">maxDate</span><span class="token punctuation">:</span> <span class="token datetime number">2014-04-23</span>
</code></pre></div><h3 id="form-widget-registration"><a href="#form-widget-registration" class="header-anchor">#</a> Form Widget Registration</h3><p>Plugins should register form widgets by overriding the <code>registerFormWidgets</code> method inside the <a href="./../extending.html">plugin registration file</a>. The method returns an array containing the widget class in the keys and widget short code as the value. Example:</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">registerFormWidgets</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span>
        <span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\\</span>Backend<span class="token punctuation">\\</span>FormWidgets<span class="token punctuation">\\</span>ColorPicker</span><span class="token operator">::</span><span class="token keyword">class</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;colorpicker&#39;</span><span class="token punctuation">,</span>
        <span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\\</span>Backend<span class="token punctuation">\\</span>FormWidgets<span class="token punctuation">\\</span>DatePicker</span><span class="token operator">::</span><span class="token keyword">class</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;datepicker&#39;</span>
    <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>The short code is optional and can be used when referencing the widget in the <a href="./form-controller.html">form field definitions</a>, it should be a unique value to avoid conflicts with other form fields.</p><h3 id="loading-form-data"><a href="#loading-form-data" class="header-anchor">#</a> Loading Form Data</h3><p>The main purpose of the form widget is to interact with your model, which means in most cases loading and saving the value via the database. When a form widget renders, it will request its stored value using the <code>getLoadValue</code> method. The <code>getId</code> and <code>getFieldName</code> methods will return a unique identifier and name for a HTML element used in the form. These values are often passed to the widget partial at render time.</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">vars</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;id&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">vars</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;name&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token function">getFieldName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">vars</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;value&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token function">getLoadValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token function">makePartial</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;myformwidget&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>At a basic level the form widget can send the user input value back using an input element. From the above example, inside the <strong>myformwidget</strong> partial the element can be rendered using the prepared variables.</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token php language-php"><span class="token delimiter important">&lt;?=</span> <span class="token variable">$id</span> <span class="token delimiter important">?&gt;</span></span><span class="token punctuation">&quot;</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token php language-php"><span class="token delimiter important">&lt;?=</span> <span class="token variable">$name</span> <span class="token delimiter important">?&gt;</span></span><span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token php language-php"><span class="token delimiter important">&lt;?=</span> <span class="token function">e</span><span class="token punctuation">(</span><span class="token variable">$value</span><span class="token punctuation">)</span> <span class="token delimiter important">?&gt;</span></span><span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
</code></pre></div><h3 id="saving-form-data"><a href="#saving-form-data" class="header-anchor">#</a> Saving Form Data</h3><p>When the time comes to take the user input and store it in the database, the form widget will call the <code>getSaveValue</code> internally to request the value. To modify this behavior simply override the method in your form widget class.</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">getSaveValue</span><span class="token punctuation">(</span><span class="token variable">$value</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token variable">$value</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>In some cases you intentionally don&#39;t want any value to be given, for example, a form widget that displays information without saving anything. Return the special constant called <code>FormField::NO_SAVE_DATA</code> derived from the <code>Backend\\Classes\\FormField</code> class to have the value ignored.</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">getSaveValue</span><span class="token punctuation">(</span><span class="token variable">$value</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\\</span>Backend<span class="token punctuation">\\</span>Classes<span class="token punctuation">\\</span>FormField</span><span class="token operator">::</span><span class="token constant">NO_SAVE_DATA</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,27))])}const w=o(r,[["render",u]]);export{v as __pageData,w as default};
