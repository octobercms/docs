import{_ as p,r as s,o,c,e as a,a as l,s as i}from"./chunks/framework.CXcwiNg-.js";const v=JSON.parse('{"title":"表单小部件 - October CMS - 3.x","titleTemplate":false,"description":"专门用于表单字段的小部件。","frontmatter":{"subtitle":"专门用于表单字段的小部件。"},"headers":[{"level":3,"title":"类定义","slug":"类定义","link":"#类定义","children":[]},{"level":3,"title":"表单小部件属性","slug":"表单小部件属性","link":"#表单小部件属性","children":[]},{"level":3,"title":"表单小部件注册","slug":"表单小部件注册","link":"#表单小部件注册","children":[]},{"level":3,"title":"加载表单数据","slug":"加载表单数据","link":"#加载表单数据","children":[]},{"level":3,"title":"保存表单数据","slug":"保存表单数据","link":"#保存表单数据","children":[]}],"relativePath":"3.x/zh-cn/extend/forms/form-widgets.md","filePath":"3.x/zh-cn/extend/forms/form-widgets.md"}'),r={name:"3.x/zh-cn/extend/forms/form-widgets.md"};function u(k,n,d,g,m,h){const t=s("pre-heading"),e=s("post-heading");return o(),c("div",null,[a(t),n[0]||(n[0]=l("h1",null,"表单小部件",-1)),a(e),n[1]||(n[1]=i(`<p>通过表单小部件，您可以向后台表单添加新的控件类型。它们提供了为模型提供数据的常见功能。表单小部件必须在<a href="./../extending.html">插件注册文件</a>中注册。</p><p>表单小部件类位于插件的 <strong>formwidgets</strong> 目录中。内部目录名称与小写的小部件类名匹配。小部件可以提供资源文件和局部视图。表单小部件目录结构示例如下。</p><pre class="dir-container"><code><p>├── <code>formwidgets</code>
|   ├── colorpicker
|   |   ├── partials
|   |   |   └── _colorpicker.php  <em>← 局部视图文件</em>
|   |   └── assets
|   |       ├── js
|   |       |   └── colorpicker.js  <em>← JavaScript 文件</em>
|   |       └── css
|   |           └── colorpicker.css  <em>← 样式表文件</em>
|   └── ColorPicker.php  <em>← 小部件类</em></p>
</code></pre><h3 id="类定义"><a href="#类定义" class="header-anchor">#</a> 类定义</h3><p><code>create:formwidget</code> 命令生成后台表单小部件、视图和基本资源文件。第一个参数指定作者和插件名称。第二个参数指定表单小部件类名。</p><div class="language-bash extra-class"><pre class="language-bash"><code>php artisan create:formwidget Acme.Blog ColorPicker
</code></pre></div><p>表单小部件类必须继承 <code>Backend\\Classes\\FormWidgetBase</code> 类。注册后的小部件可以在后台<a href="./../../element/form-fields.html">表单字段定义</a>文件中使用。表单小部件类定义示例。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">namespace</span> <span class="token package">Backend<span class="token punctuation">\\</span>FormWidgets</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">Backend<span class="token punctuation">\\</span>Classes<span class="token punctuation">\\</span>FormWidgetBase</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">ColorPicker</span> <span class="token keyword">extends</span> <span class="token class-name">FormWidgetBase</span>
<span class="token punctuation">{</span>
    <span class="token comment">/**
     * @var string defaultAlias to identify this widget.
     */</span>
    <span class="token keyword">protected</span> <span class="token variable">$defaultAlias</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;colorpicker&#39;</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="表单小部件属性"><a href="#表单小部件属性" class="header-anchor">#</a> 表单小部件属性</h3><p>表单小部件可以具有使用<a href="./../../element/form-fields.html">表单字段配置</a>设置的属性。只需在类上定义可配置属性，然后在 <code>init</code> 方法定义中调用 <code>fillFromConfig</code> 方法来填充它们。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">class</span> <span class="token class-name-definition class-name">DatePicker</span> <span class="token keyword">extends</span> <span class="token class-name">FormWidgetBase</span>
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
</code></pre></div><p>使用小部件时，属性值可以从<a href="./../../element/form-fields.html">表单字段定义</a>中设置。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">born_at</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Date of Birth
    <span class="token key atrule">type</span><span class="token punctuation">:</span> datepicker
    <span class="token key atrule">mode</span><span class="token punctuation">:</span> date
    <span class="token key atrule">minDate</span><span class="token punctuation">:</span> <span class="token datetime number">1984-04-12</span>
    <span class="token key atrule">maxDate</span><span class="token punctuation">:</span> <span class="token datetime number">2014-04-23</span>
</code></pre></div><h3 id="表单小部件注册"><a href="#表单小部件注册" class="header-anchor">#</a> 表单小部件注册</h3><p>插件应通过在<a href="./../extending.html">插件注册文件</a>中覆盖 <code>registerFormWidgets</code> 方法来注册表单小部件。该方法返回一个数组，键为小部件类，值为小部件短代码。示例：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">registerFormWidgets</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span>
        <span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\\</span>Backend<span class="token punctuation">\\</span>FormWidgets<span class="token punctuation">\\</span>ColorPicker</span><span class="token operator">::</span><span class="token keyword">class</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;colorpicker&#39;</span><span class="token punctuation">,</span>
        <span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\\</span>Backend<span class="token punctuation">\\</span>FormWidgets<span class="token punctuation">\\</span>DatePicker</span><span class="token operator">::</span><span class="token keyword">class</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;datepicker&#39;</span>
    <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>短代码是可选的，可在<a href="./form-controller.html">表单字段定义</a>中引用小部件时使用，它应该是唯一值以避免与其他表单字段冲突。</p><h3 id="加载表单数据"><a href="#加载表单数据" class="header-anchor">#</a> 加载表单数据</h3><p>表单小部件的主要目的是与模型交互，这意味着在大多数情况下通过数据库加载和保存值。当表单小部件渲染时，它将使用 <code>getLoadValue</code> 方法请求其存储的值。<code>getId</code> 和 <code>getFieldName</code> 方法将返回表单中使用的 HTML 元素的唯一标识符和名称。这些值通常在渲染时传递给小部件局部视图。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">vars</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;id&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">vars</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;name&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token function">getFieldName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">vars</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;value&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token function">getLoadValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token function">makePartial</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;myformwidget&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在基本级别上，表单小部件可以使用 input 元素将用户输入值发送回去。从上面的示例中，在 <strong>myformwidget</strong> 局部视图中，可以使用准备好的变量渲染元素。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token php language-php"><span class="token delimiter important">&lt;?=</span> <span class="token variable">$id</span> <span class="token delimiter important">?&gt;</span></span><span class="token punctuation">&quot;</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token php language-php"><span class="token delimiter important">&lt;?=</span> <span class="token variable">$name</span> <span class="token delimiter important">?&gt;</span></span><span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token php language-php"><span class="token delimiter important">&lt;?=</span> <span class="token function">e</span><span class="token punctuation">(</span><span class="token variable">$value</span><span class="token punctuation">)</span> <span class="token delimiter important">?&gt;</span></span><span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
</code></pre></div><h3 id="保存表单数据"><a href="#保存表单数据" class="header-anchor">#</a> 保存表单数据</h3><p>当需要获取用户输入并将其存储到数据库时，表单小部件将在内部调用 <code>getSaveValue</code> 来请求值。要修改此行为，只需在表单小部件类中覆盖该方法即可。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">getSaveValue</span><span class="token punctuation">(</span><span class="token variable">$value</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token variable">$value</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在某些情况下，您故意不希望给出任何值，例如，仅显示信息而不保存任何内容的表单小部件。返回从 <code>Backend\\Classes\\FormField</code> 类派生的特殊常量 <code>FormField::NO_SAVE_DATA</code> 可使该值被忽略。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">getSaveValue</span><span class="token punctuation">(</span><span class="token variable">$value</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\\</span>Backend<span class="token punctuation">\\</span>Classes<span class="token punctuation">\\</span>FormField</span><span class="token operator">::</span><span class="token constant">NO_SAVE_DATA</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,27))])}const y=p(r,[["render",u]]);export{v as __pageData,y as default};
