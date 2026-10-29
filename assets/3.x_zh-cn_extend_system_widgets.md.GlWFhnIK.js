import{_ as p,r as s,o,c,e as a,a as l,s as i}from"./chunks/framework.CXcwiNg-.js";const v=JSON.parse('{"title":"小部件 - October CMS - 3.x","titleTemplate":false,"description":"解决不同任务的自包含功能块。","frontmatter":{"subtitle":"解决不同任务的自包含功能块。"},"headers":[{"level":2,"title":"通用小部件","slug":"通用小部件","link":"#通用小部件","children":[{"level":3,"title":"类定义","slug":"类定义","link":"#类定义","children":[]}]},{"level":2,"title":"将小部件绑定到控制器","slug":"将小部件绑定到控制器","link":"#将小部件绑定到控制器","children":[]},{"level":2,"title":"在 AJAX 处理程序之前运行代码","slug":"在-ajax-处理程序之前运行代码","link":"#在-ajax-处理程序之前运行代码","children":[{"level":4,"title":"另请参阅","slug":"另请参阅","link":"#另请参阅","children":[]}]}],"relativePath":"3.x/zh-cn/extend/system/widgets.md","filePath":"3.x/zh-cn/extend/system/widgets.md"}'),r={name:"3.x/zh-cn/extend/system/widgets.md"};function u(k,n,d,g,h,m){const t=s("pre-heading"),e=s("post-heading");return o(),c("div",null,[a(t),n[0]||(n[0]=l("h1",null,"小部件",-1)),a(e),n[1]||(n[1]=i(`<p>小部件是可复用的控件，具有用户界面和后端控制器（小部件类），用于准备小部件数据和处理由小部件用户界面生成的 AJAX 请求。</p><h2 id="通用小部件"><a href="#通用小部件" class="header-anchor">#</a> 通用小部件</h2><p>小部件是 <a href="./../../cms/themes/components.html">CMS 组件</a>的后端等效物。它们相似之处在于都是模块化的功能包，提供局部视图并使用别名命名。关键区别在于后端小部件使用 YAML 标记进行配置，并手动绑定到后端控制器。</p><p>小部件类位于插件目录的 <strong>widgets</strong> 目录中。内部目录名称与以小写形式书写的小部件类名匹配。小部件可以提供资源文件和局部视图。以下是小部件目录结构的示例：</p><pre class="dir-container"><code><p>├── <code>widgets</code>
|   ├── form
|   |   ├── partials
|   |   |   └── _form.php  <em>← 局部视图文件</em>
|   |   └── assets
|   |       ├── js
|   |       |   └── form.js  <em>← JavaScript 文件</em>
|   |       └── css
|   |           └── form.css  <em>← 样式表文件</em>
|   └── Form.php  <em>← 小部件类</em></p>
</code></pre><h3 id="类定义"><a href="#类定义" class="header-anchor">#</a> 类定义</h3><p>通用小部件类必须继承 <code>Backend\\Classes\\WidgetBase</code> 类。与任何其他插件类一样，通用小部件控制器应属于<a href="./plugins.html">插件命名空间</a>。以下是小部件类定义的示例。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">namespace</span> <span class="token package">Backend<span class="token punctuation">\\</span>Widgets</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">Backend<span class="token punctuation">\\</span>Classes<span class="token punctuation">\\</span>WidgetBase</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">Lists</span> <span class="token keyword">extends</span> <span class="token class-name">WidgetBase</span>
<span class="token punctuation">{</span>
    <span class="token comment">/**
     * @var string defaultAlias to identify this widget.
     */</span>
    <span class="token keyword">protected</span> <span class="token variable">$defaultAlias</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;list&#39;</span><span class="token punctuation">;</span>

    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre></div><p>小部件类必须包含一个 <strong>render()</strong> 方法，通过渲染小部件局部视图来生成小部件标记。示例：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token function">makePartial</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;list&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>要向局部视图传递变量，你可以将它们添加到 <code>$vars</code> 属性。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">vars</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;var&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;value&#39;</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token function">makePartial</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;list&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>或者，你可以将变量传递给 makePartial() 方法的第二个参数：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token function">makePartial</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;list&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;var&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;value&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="将小部件绑定到控制器"><a href="#将小部件绑定到控制器" class="header-anchor">#</a> 将小部件绑定到控制器</h2><div class="custom-block aside"><p>绑定到控制器也是使 <a href="./ajax.html">AJAX 处理程序可用</a>所必需的。</p></div><p>在你可以在后端页面或局部视图中使用小部件之前，应将其绑定到后端控制器。使用小部件的 <code>bindToController</code> 方法将其绑定到控制器。初始化小部件的最佳位置是控制器的 <code>beforeDisplay</code> 方法，该方法从构造函数中调用。</p><p>例如，创建一个新的小部件实例并将其绑定到控制器。注意构造函数将控制器作为第一个参数。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">beforeDisplay</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token variable">$myWidget</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyWidgetClass</span><span class="token punctuation">(</span><span class="token variable">$this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token variable">$myWidget</span><span class="token operator">-&gt;</span><span class="token property">alias</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;myWidget&#39;</span><span class="token punctuation">;</span>
    <span class="token variable">$myWidget</span><span class="token operator">-&gt;</span><span class="token function">bindToController</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>绑定小部件后，你可以在控制器的视图或局部视图中通过其别名使用 <code>$this-&gt;widget</code> 属性访问它。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?=</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">widget</span><span class="token operator">-&gt;</span><span class="token property">myWidget</span><span class="token operator">-&gt;</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token delimiter important">?&gt;</span></span>
</code></pre></div><h2 id="在-ajax-处理程序之前运行代码"><a href="#在-ajax-处理程序之前运行代码" class="header-anchor">#</a> 在 AJAX 处理程序之前运行代码</h2><p>有时你可能希望在 AJAX 处理程序执行之前执行代码。在小部件中定义 <code>init</code> 方法允许代码在每个 AJAX 处理程序之前运行。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">function</span> <span class="token function-definition function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// From a widget class</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="另请参阅"><a href="#另请参阅" class="header-anchor">#</a> 另请参阅</h4><div class="custom-block also"><ul><li><a href="./../forms/form-widgets.html">表单小部件</a></li><li><a href="./../lists/filter-widgets.html">过滤器小部件</a></li><li><a href="./../backend/report-widgets.html">报表小部件</a></li></ul></div>`,26))])}const y=p(r,[["render",u]]);export{v as __pageData,y as default};
