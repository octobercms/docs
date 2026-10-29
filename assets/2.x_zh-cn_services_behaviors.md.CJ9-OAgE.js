import{_ as c,r as t,o as l,c as i,e as p,a as n,d as a,s as u}from"./chunks/framework.CXcwiNg-.js";const b=JSON.parse('{"title":"行为 - October CMS - 2.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"与特征的比较","slug":"与特征的比较","link":"#与特征的比较","children":[]},{"level":2,"title":"扩展构造函数","slug":"扩展构造函数","link":"#扩展构造函数","children":[{"level":4,"title":"动态声明属性","slug":"动态声明属性","link":"#动态声明属性","children":[]},{"level":4,"title":"检索动态属性","slug":"检索动态属性","link":"#检索动态属性","children":[]},{"level":4,"title":"动态创建方法","slug":"动态创建方法","link":"#动态创建方法","children":[]},{"level":4,"title":"检查方法的存在","slug":"检查方法的存在","link":"#检查方法的存在","children":[]},{"level":4,"title":"列出所有可用的方法","slug":"列出所有可用的方法","link":"#列出所有可用的方法","children":[]},{"level":4,"title":"动态实现行为","slug":"动态实现行为","link":"#动态实现行为","children":[]}]},{"level":2,"title":"用法示例","slug":"用法示例","link":"#用法示例","children":[{"level":4,"title":"行为/扩展类","slug":"行为-扩展类","link":"#行为-扩展类","children":[]},{"level":4,"title":"扩展一个类","slug":"扩展一个类","link":"#扩展一个类","children":[]},{"level":4,"title":"使用扩展","slug":"使用扩展","link":"#使用扩展","children":[]},{"level":4,"title":"检测使用的扩展","slug":"检测使用的扩展","link":"#检测使用的扩展","children":[]},{"level":3,"title":"软定义","slug":"软定义","link":"#软定义","children":[]},{"level":3,"title":"使用Traits而不是基类","slug":"使用traits而不是基类","link":"#使用traits而不是基类","children":[]}]}],"relativePath":"2.x/zh-cn/services/behaviors.md","filePath":"2.x/zh-cn/services/behaviors.md"}'),k={name:"2.x/zh-cn/services/behaviors.md"};function r(d,s,g,h,m,f){const o=t("pre-heading"),e=t("post-heading");return l(),i("div",null,[p(o),s[0]||(s[0]=n("h1",null,"行为",-1)),p(e),s[1]||(s[1]=n("p",null,[a("行为为类添加了具有"),n("em",null,"私有特征"),a("的能力，也称为行为。 这些与 "),n("a",{href:"http://php.net/manual/en/language.oop5.traits.php",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[a("原生 PHP 特征"),n("span",null,[n("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[n("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),a(),n("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),a(),n("span",{class:"sr-only"},"(opens new window)")])]),a(" 类似，但它们有一些明显的好处：")],-1)),s[2]||(s[2]=u(`<ol><li>行为有自己的构造函数。</li><li>行为可以有私有或受保护的方法。</li><li>方法和属性名可以安全地冲突。</li><li>类可以动态扩展行为。</li></ol><h2 id="与特征的比较"><a href="#与特征的比较" class="header-anchor">#</a> 与特征的比较</h2><p>您可能会使用这样的 PHP 特征：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">class</span> <span class="token class-name-definition class-name">MyClass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">use</span> <span class="token package"><span class="token punctuation">\\</span>October<span class="token punctuation">\\</span>Rain<span class="token punctuation">\\</span>UtilityFunctions</span><span class="token punctuation">;</span>
    <span class="token keyword">use</span> <span class="token package"><span class="token punctuation">\\</span>October<span class="token punctuation">\\</span>Rain<span class="token punctuation">\\</span>DeferredBinding</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>以类似的方式使用行为：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">class</span> <span class="token class-name-definition class-name">MyClass</span> <span class="token keyword">extends</span> <span class="token class-name class-name-fully-qualified"><span class="token punctuation">\\</span>October<span class="token punctuation">\\</span>Rain<span class="token punctuation">\\</span>Extension<span class="token punctuation">\\</span>Extendable</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token variable">$implement</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
        <span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\\</span>October<span class="token punctuation">\\</span>Rain<span class="token punctuation">\\</span>UtilityFunctions</span><span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">,</span>
        <span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\\</span>October<span class="token punctuation">\\</span>Rain<span class="token punctuation">\\</span>DeferredBinding</span><span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>您可以在其中定义这样的特征：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">trait</span> <span class="token class-name-definition class-name">UtilityFunctions</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">echo</span> <span class="token string double-quoted-string">&quot;Hello from &quot;</span> <span class="token operator">.</span> <span class="token function">get_class</span><span class="token punctuation">(</span><span class="token variable">$this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>行为定义如下：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">class</span> <span class="token class-name-definition class-name">UtilityFunctions</span> <span class="token keyword">extends</span> <span class="token class-name class-name-fully-qualified"><span class="token punctuation">\\</span>October<span class="token punctuation">\\</span>Rain<span class="token punctuation">\\</span>Extension<span class="token punctuation">\\</span>ExtensionBase</span>
<span class="token punctuation">{</span>
    <span class="token keyword">protected</span> <span class="token variable">$parent</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">__construct</span><span class="token punctuation">(</span><span class="token variable">$parent</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">parent</span> <span class="token operator">=</span> <span class="token variable">$parent</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">echo</span> <span class="token string double-quoted-string">&quot;Hello from &quot;</span> <span class="token operator">.</span> <span class="token function">get_class</span><span class="token punctuation">(</span><span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">parent</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>扩展对象始终作为第一个参数传递给 Behavior 的构造函数。</p><p>总结一下：</p><ul><li>扩展 \\October\\Rain\\Extension\\ExtensionBase 以将您的类声明为行为</li><li>想要实现行为的类需要扩展\\October\\Rain\\Extension\\Extendable</li></ul><blockquote><p><strong>注意</strong>：参见<a href="#oc-using-traits-instead-of-base-classes">使用特征而不是基类</a></p></blockquote><h2 id="扩展构造函数"><a href="#扩展构造函数" class="header-anchor">#</a> 扩展构造函数</h2><p>任何使用 <code>Extendable</code> 或 <code>ExtendableTrait</code> 的类都可以使用静态 <code>extend</code> 方法扩展其构造函数。 参数应该传递一个闭包，该闭包将作为类构造函数的一部分调用。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token class-name class-name-fully-qualified static-context">MyNamespace<span class="token punctuation">\\</span>Controller</span><span class="token operator">::</span><span class="token function">extend</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token variable">$controller</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="动态声明属性"><a href="#动态声明属性" class="header-anchor">#</a> 动态声明属性</h4><p>可以通过调用<code>addDynamicProperty</code>并传递属性名称和值来在可扩展对象上声明属性。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token class-name static-context">Post</span><span class="token operator">::</span><span class="token function">extend</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token variable">$model</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token variable">$model</span><span class="token operator">-&gt;</span><span class="token function">addDynamicProperty</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;tagsCache&#39;</span><span class="token punctuation">,</span> <span class="token constant">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><blockquote><p><strong>注意</strong>：尝试直接在实现了 <strong>October\\Rain\\Extension\\ExtendableTrait</strong> 的对象上设置未声明的属性将会抛出异常。</p></blockquote><h4 id="检索动态属性"><a href="#检索动态属性" class="header-anchor">#</a> 检索动态属性</h4><p>动态创建的属性可以使用继承自的 getDynamicProperties 函数检索 可扩展特征。</p><p>因此检索所有动态属性将如下所示：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token variable">$model</span><span class="token operator">-&gt;</span><span class="token function">getDynamicProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>这将返回一个关联数组 [key =&gt; value]，其中键是动态属性名称 并且值是属性值。</p><p>如果我们知道我们想要什么属性，我们可以简单地将键(属性名称)附加到函数中：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token variable">$model</span><span class="token operator">-&gt;</span><span class="token function">getDynamicProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token variable">$key</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="动态创建方法"><a href="#动态创建方法" class="header-anchor">#</a> 动态创建方法</h4><p>可以通过调用<code>addDynamicMethod</code>并传递方法名称和可调用对象(如<code>Closure</code>)为可扩展对象创建方法。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token class-name static-context">Post</span><span class="token operator">::</span><span class="token function">extend</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token variable">$model</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token variable">$model</span><span class="token operator">-&gt;</span><span class="token function">addDynamicProperty</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;tagsCache&#39;</span><span class="token punctuation">,</span> <span class="token constant">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token variable">$model</span><span class="token operator">-&gt;</span><span class="token function">addDynamicMethod</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;getTagsAttribute&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">use</span> <span class="token punctuation">(</span><span class="token variable">$model</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">tagsCache</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">tagsCache</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">tagsCache</span> <span class="token operator">=</span> <span class="token variable">$model</span><span class="token operator">-&gt;</span><span class="token function">tags</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token function">lists</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;name&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="检查方法的存在"><a href="#检查方法的存在" class="header-anchor">#</a> 检查方法的存在</h4><p>您可以使用 <code>methodExists</code> 方法检查 <code>Extendable</code> 类中是否存在方法 - 类似于 PHP 的 <code>method_exists()</code> 函数。 这将检测通过<code>addDynamicMethod</code>调用添加的标准方法和动态方法。 <code>methodExists</code> 接受一个参数：用于检查是否存在的方法名称字符串。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token class-name static-context">Post</span><span class="token operator">::</span><span class="token function">extend</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token variable">$model</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token variable">$model</span><span class="token operator">-&gt;</span><span class="token function">addDynamicMethod</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;getTagsAttribute&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">use</span> <span class="token punctuation">(</span><span class="token variable">$model</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">tagsCache</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token variable">$post</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Post</span><span class="token punctuation">;</span>

<span class="token variable">$post</span><span class="token operator">-&gt;</span><span class="token function">methodExists</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;getTagsAttribute&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token variable">$post</span><span class="token operator">-&gt;</span><span class="token function">methodExists</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;missingMethod&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre></div><h4 id="列出所有可用的方法"><a href="#列出所有可用的方法" class="header-anchor">#</a> 列出所有可用的方法</h4><p>要检索 <code>Extendable</code> 类中所有可用方法的列表，可以使用 <code>getClassMethods</code> 方法。 此方法的操作类似于 PHP <code>get_class_methods()</code> 函数，因为它返回类中可用方法的数组，但除了类中定义的方法之外，它还将列出由扩展或通过 <code>addDynamicMethod</code> 调用提供的任何方法。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token class-name static-context">Post</span><span class="token operator">::</span><span class="token function">extend</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token variable">$model</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token variable">$model</span><span class="token operator">-&gt;</span><span class="token function">addDynamicMethod</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;getTagsAttribute&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">use</span> <span class="token punctuation">(</span><span class="token variable">$model</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">tagsCache</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token variable">$post</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Post</span><span class="token punctuation">;</span>

<span class="token variable">$methods</span> <span class="token operator">=</span> <span class="token variable">$post</span><span class="token operator">-&gt;</span><span class="token function">getClassMethods</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * $methods = [
 *   0 =&gt; &#39;__construct&#39;,
 *   1 =&gt; &#39;extend&#39;,
 *   2 =&gt; &#39;getTagsAttribute&#39;,
 *   ...
 * ];
 */</span>
</code></pre></div><h4 id="动态实现行为"><a href="#动态实现行为" class="header-anchor">#</a> 动态实现行为</h4><p>这种扩展构造函数的独特能力允许动态实现行为，例如：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token comment">/**
 * 扩展 RainLab.Users 控制器，使其包含 RelationController 行为
 */</span>
<span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\\</span>RainLab<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Controllers<span class="token punctuation">\\</span>Users</span><span class="token operator">::</span><span class="token function">extend</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token variable">$controller</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token comment">// 动态实现列表控制器行为</span>
    <span class="token variable">$controller</span><span class="token operator">-&gt;</span><span class="token function">implementClassWith</span><span class="token punctuation">(</span><span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\\</span>Backend<span class="token punctuation">\\</span>Behaviors<span class="token punctuation">\\</span>RelationController</span><span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 动态声明要使用的 RelationController 行为的 relationConfig 属性</span>
    <span class="token variable">$controller</span><span class="token operator">-&gt;</span><span class="token function">addDynamicProperty</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;relationConfig&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;$/myvendor/myplugin/controllers/users/config_relation.yaml&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="用法示例"><a href="#用法示例" class="header-anchor">#</a> 用法示例</h2><h4 id="行为-扩展类"><a href="#行为-扩展类" class="header-anchor">#</a> 行为/扩展类</h4><div class="language-php extra-class"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token keyword">namespace</span> <span class="token package">MyNamespace<span class="token punctuation">\\</span>Behaviors</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">FormController</span> <span class="token keyword">extends</span> <span class="token class-name class-name-fully-qualified"><span class="token punctuation">\\</span>October<span class="token punctuation">\\</span>Rain<span class="token punctuation">\\</span>Extension<span class="token punctuation">\\</span>ExtensionBase</span>
<span class="token punctuation">{</span>
    <span class="token comment">/**
     * @var 对扩展对象的引用。
     */</span>
    <span class="token keyword">protected</span> <span class="token variable">$controller</span><span class="token punctuation">;</span>

    <span class="token comment">/**
     * Constructor
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">__construct</span><span class="token punctuation">(</span><span class="token variable">$controller</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">controller</span> <span class="token operator">=</span> <span class="token variable">$controller</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">someMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string double-quoted-string">&quot;我来自FormController Behavior！&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">otherMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string double-quoted-string">&quot;你可能看不到我...&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre></div><h4 id="扩展一个类"><a href="#扩展一个类" class="header-anchor">#</a> 扩展一个类</h4><p>这个 <code>Controller</code> 类将实现 <code>FormController</code> 行为，然后方法将变得可用于(混合)该类。 我们将覆盖 <code>otherMethod</code> 方法。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token keyword">namespace</span> <span class="token package">MyNamespace</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">Controller</span> <span class="token keyword">extends</span> <span class="token class-name class-name-fully-qualified"><span class="token punctuation">\\</span>October<span class="token punctuation">\\</span>Rain<span class="token punctuation">\\</span>Extension<span class="token punctuation">\\</span>Extendable</span>
<span class="token punctuation">{</span>

    <span class="token comment">/**
     * 实现 FormController 行为
     */</span>
    <span class="token keyword">public</span> <span class="token variable">$implement</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
        <span class="token string single-quoted-string">&#39;MyNamespace.Behaviors.FormController&#39;</span>
    <span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">otherMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string double-quoted-string">&quot;我来自主控制器！&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre></div><h4 id="使用扩展"><a href="#使用扩展" class="header-anchor">#</a> 使用扩展</h4><div class="language-php extra-class"><pre class="language-php"><code><span class="token variable">$controller</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name class-name-fully-qualified">MyNamespace<span class="token punctuation">\\</span>Controller</span><span class="token punctuation">;</span>

<span class="token comment">// 打印：我来自FormController Behavior！</span>
<span class="token keyword">echo</span> <span class="token variable">$controller</span><span class="token operator">-&gt;</span><span class="token function">someMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 打印：我来自主控制器！</span>
<span class="token keyword">echo</span> <span class="token variable">$controller</span><span class="token operator">-&gt;</span><span class="token function">otherMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 打印：你可能看不到我...</span>
<span class="token keyword">echo</span> <span class="token variable">$controller</span><span class="token operator">-&gt;</span><span class="token function">asExtension</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;FormController&#39;</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token function">otherMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="检测使用的扩展"><a href="#检测使用的扩展" class="header-anchor">#</a> 检测使用的扩展</h4><p>要检查一个对象是否已经扩展了一个行为，你可以在对象上使用 <code>isClassExtendedWith</code> 方法。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token variable">$controller</span><span class="token operator">-&gt;</span><span class="token function">isClassExtendedWith</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;Backend.Behaviors.RelationController&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>下面是一个使用该方法动态扩展第三方插件的<code>UsersController</code>的示例，以避免阻止其他插件也扩展上述第三方插件。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token class-name static-context">UsersController</span><span class="token operator">::</span><span class="token function">extend</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token variable">$controller</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token comment">// 如果尚未实现，则实现行为</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token variable">$controller</span><span class="token operator">-&gt;</span><span class="token function">isClassExtendedWith</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;Backend.Behaviors.RelationController&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token variable">$controller</span><span class="token operator">-&gt;</span><span class="token property">implement</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;Backend.Behaviors.RelationController&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 如果尚未定义，则定义属性</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$controller</span><span class="token operator">-&gt;</span><span class="token property">relationConfig</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token variable">$controller</span><span class="token operator">-&gt;</span><span class="token function">addDynamicProperty</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;relationConfig&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 安全拼接配置</span>
    <span class="token variable">$myConfigPath</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;$/myvendor/myplugin/controllers/users/config_relation.yaml&#39;</span><span class="token punctuation">;</span>

    <span class="token variable">$controller</span><span class="token operator">-&gt;</span><span class="token property">relationConfig</span> <span class="token operator">=</span> <span class="token variable">$controller</span><span class="token operator">-&gt;</span><span class="token function">mergeConfig</span><span class="token punctuation">(</span>
        <span class="token variable">$controller</span><span class="token operator">-&gt;</span><span class="token property">relationConfig</span><span class="token punctuation">,</span>
        <span class="token variable">$myConfigPath</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre></div><h3 id="软定义"><a href="#软定义" class="header-anchor">#</a> 软定义</h3><p>如果行为类不存在，例如特征，则会抛出 <em>Class not found</em> 错误。 在某些情况下，如果系统中存在行为，您可能希望抑制此错误，以便有条件地执行。 您可以通过在类名的开头放置一个 <code>@</code> 符号来做到这一点。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">class</span> <span class="token class-name-definition class-name">User</span> <span class="token keyword">extends</span> <span class="token class-name class-name-fully-qualified"><span class="token punctuation">\\</span>October<span class="token punctuation">\\</span>Rain<span class="token punctuation">\\</span>Extension<span class="token punctuation">\\</span>Extendable</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token variable">$implement</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
        <span class="token string single-quoted-string">&#39;@&#39;</span><span class="token operator">.</span><span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\\</span>RainLab<span class="token punctuation">\\</span>Translate<span class="token punctuation">\\</span>Behaviors<span class="token punctuation">\\</span>TranslatableModel</span><span class="token operator">::</span><span class="token keyword">class</span>
    <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>如果类名 <code>RainLab\\Translate\\Behaviors\\TranslatableModel</code> 不存在，则不会抛出错误。 这等效于以下代码：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">class</span> <span class="token class-name-definition class-name">User</span> <span class="token keyword">extends</span> <span class="token class-name class-name-fully-qualified"><span class="token punctuation">\\</span>October<span class="token punctuation">\\</span>Rain<span class="token punctuation">\\</span>Extension<span class="token punctuation">\\</span>Extendable</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token variable">$implement</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">__construct</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">class_exists</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;\\RainLab\\Translate\\Behaviors\\TranslatableModel&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">implement</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\\</span>RainLab<span class="token punctuation">\\</span>Translate<span class="token punctuation">\\</span>Behaviors<span class="token punctuation">\\</span>TranslatableModel</span><span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword static-context">parent</span><span class="token operator">::</span><span class="token function">__construct</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><a id="oc-using-traits-instead-of-base-classes"></a></p><h3 id="使用traits而不是基类"><a href="#使用traits而不是基类" class="header-anchor">#</a> 使用Traits而不是基类</h3><p>有时您的类可能已经在源代码控制之外扩展了父类，因此您无法扩展<code>ExtensionBase</code>或<code>Extendable</code>类。 相反，您可以使用这些特征，并且您的类必须按如下方式实现。</p><p>首先让我们创建一个行为类，即。 可以由其他类实现。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token keyword">namespace</span> <span class="token package">MyNamespace<span class="token punctuation">\\</span>Behaviors</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">WaveBehaviour</span>
<span class="token punctuation">{</span>
    <span class="token keyword">use</span> <span class="token package"><span class="token punctuation">\\</span>October<span class="token punctuation">\\</span>Rain<span class="token punctuation">\\</span>Extension<span class="token punctuation">\\</span>ExtensionTrait</span><span class="token punctuation">;</span>

    <span class="token comment">/**
     * 使用 Extensiontrait 时，您的行为也必须实现此方法
     * @see \\October\\Rain\\Extension\\ExtensionBase
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">function</span> <span class="token function-definition function">extend</span><span class="token punctuation">(</span><span class="token keyword type-hint">callable</span> <span class="token variable">$callback</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword static-context">self</span><span class="token operator">::</span><span class="token function">extensionExtendCallback</span><span class="token punctuation">(</span><span class="token variable">$callback</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">wave</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">echo</span> <span class="token string double-quoted-string">&quot;*waves*&lt;br&gt;&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre></div><p>现在让我们使用 ExtendableTrait 创建能够实现行为的类。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">class</span> <span class="token class-name-definition class-name">AI</span>
<span class="token punctuation">{</span>
    <span class="token keyword">use</span> <span class="token package"><span class="token punctuation">\\</span>October<span class="token punctuation">\\</span>Rain<span class="token punctuation">\\</span>Extension<span class="token punctuation">\\</span>ExtendableTrait</span><span class="token punctuation">;</span>

    <span class="token comment">/**
     * @var array 此类实现的扩展。
     */</span>
    <span class="token keyword">public</span> <span class="token variable">$implement</span><span class="token punctuation">;</span>

    <span class="token comment">/**
     * Constructor
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">__construct</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token function">extendableConstruct</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">__get</span><span class="token punctuation">(</span><span class="token variable">$name</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token function">extendableGet</span><span class="token punctuation">(</span><span class="token variable">$name</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">__set</span><span class="token punctuation">(</span><span class="token variable">$name</span><span class="token punctuation">,</span> <span class="token variable">$value</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token function">extendableSet</span><span class="token punctuation">(</span><span class="token variable">$name</span><span class="token punctuation">,</span> <span class="token variable">$value</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">__call</span><span class="token punctuation">(</span><span class="token variable">$name</span><span class="token punctuation">,</span> <span class="token variable">$params</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token function">extendableCall</span><span class="token punctuation">(</span><span class="token variable">$name</span><span class="token punctuation">,</span> <span class="token variable">$params</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">function</span> <span class="token function-definition function">__callStatic</span><span class="token punctuation">(</span><span class="token variable">$name</span><span class="token punctuation">,</span> <span class="token variable">$params</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword static-context">self</span><span class="token operator">::</span><span class="token function">extendableCallStatic</span><span class="token punctuation">(</span><span class="token variable">$name</span><span class="token punctuation">,</span> <span class="token variable">$params</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">function</span> <span class="token function-definition function">extend</span><span class="token punctuation">(</span><span class="token keyword type-hint">callable</span> <span class="token variable">$callback</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword static-context">self</span><span class="token operator">::</span><span class="token function">extendableExtendCallback</span><span class="token punctuation">(</span><span class="token variable">$callback</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">youGotBrains</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">echo</span> <span class="token string double-quoted-string">&quot;我有一个人工智能！&lt;br&gt;&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>AI 类现在可以使用行为了。 让我们扩展它并让此类实现 WaveBehaviour。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token keyword">namespace</span> <span class="token package">MyNamespace<span class="token punctuation">\\</span>Classes</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">Robot</span> <span class="token keyword">extends</span> <span class="token class-name">AI</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token variable">$implement</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
        <span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\\</span>MyNamespace<span class="token punctuation">\\</span>Behaviors<span class="token punctuation">\\</span>WaveBehaviour</span><span class="token operator">::</span><span class="token keyword">class</span>
    <span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">identify</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">echo</span> <span class="token string double-quoted-string">&quot;我是机器人&lt;br&gt;&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">echo</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token function">youGotBrains</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">echo</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token function">wave</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre></div><p>您现在可以按如下方式使用Robot：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token variable">$robot</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Robot</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$robot</span><span class="token operator">-&gt;</span><span class="token function">identify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>这将输出：</p><div class="language- extra-class"><pre class="language-text"><code>我是机器人
我有一个人工智能！
*waves*
</code></pre></div><p>记住：</p><ul><li>使用 <code>ExtensionTrait</code> 时，应将 <code>ExtensionBase</code> 中的方法应用到该类。</li><li>使用 <code>ExtendableTrait</code> 时，应将 <code>Extendable</code> 中的方法应用于该类。</li></ul>`,73))])}const v=c(k,[["render",r]]);export{b as __pageData,v as default};
