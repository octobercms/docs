import{_ as p,r as n,o,c,e as a,a as l,s as r}from"./chunks/framework.CXcwiNg-.js";const f=JSON.parse('{"title":"序列化 - October CMS - 3.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"基本用法","slug":"基本用法","link":"#基本用法","children":[{"level":4,"title":"将模型转换为数组","slug":"将模型转换为数组","link":"#将模型转换为数组","children":[]},{"level":4,"title":"将模型转换为 JSON","slug":"将模型转换为-json","link":"#将模型转换为-json","children":[]}]},{"level":2,"title":"从 JSON 中隐藏属性","slug":"从-json-中隐藏属性","link":"#从-json-中隐藏属性","children":[]},{"level":2,"title":"向 JSON 追加值","slug":"向-json-追加值","link":"#向-json-追加值","children":[]}],"relativePath":"3.x/zh-cn/extend/database/serialization.md","filePath":"3.x/zh-cn/extend/database/serialization.md"}'),i={name:"3.x/zh-cn/extend/database/serialization.md"};function u(k,s,d,g,h,m){const e=n("pre-heading"),t=n("post-heading");return o(),c("div",null,[a(e),s[0]||(s[0]=l("h1",null,"序列化",-1)),a(t),s[1]||(s[1]=r(`<p>在构建 JSON API 时，您通常需要将模型和关联转换为数组或 JSON。模型包含执行这些转换的便捷方法，以及控制序列化中包含哪些属性。</p><h2 id="基本用法"><a href="#基本用法" class="header-anchor">#</a> 基本用法</h2><h4 id="将模型转换为数组"><a href="#将模型转换为数组" class="header-anchor">#</a> 将模型转换为数组</h4><p>要将模型及其加载的<a href="./relations.html">关联</a>转换为数组，您可以使用 <code>toArray</code> 方法。此方法是递归的，因此所有属性和所有关联（包括关联的关联）都将转换为数组：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token variable">$user</span> <span class="token operator">=</span> <span class="token class-name static-context">User</span><span class="token operator">::</span><span class="token function">with</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;roles&#39;</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">return</span> <span class="token variable">$user</span><span class="token operator">-&gt;</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>您也可以将<a href="./collections.html">集合</a>转换为数组：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token variable">$users</span> <span class="token operator">=</span> <span class="token class-name static-context">User</span><span class="token operator">::</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">return</span> <span class="token variable">$users</span><span class="token operator">-&gt;</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="将模型转换为-json"><a href="#将模型转换为-json" class="header-anchor">#</a> 将模型转换为 JSON</h4><p>要将模型转换为 JSON，您可以使用 <code>toJson</code> 方法。与 <code>toArray</code> 一样，<code>toJson</code> 方法是递归的，因此所有属性和关联都将转换为 JSON：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token variable">$user</span> <span class="token operator">=</span> <span class="token class-name static-context">User</span><span class="token operator">::</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">return</span> <span class="token variable">$user</span><span class="token operator">-&gt;</span><span class="token function">toJson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>或者，您可以将模型或集合转换为字符串，这将自动调用 <code>toJson</code> 方法：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token variable">$user</span> <span class="token operator">=</span> <span class="token class-name static-context">User</span><span class="token operator">::</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword type-casting">string</span><span class="token punctuation">)</span> <span class="token variable">$user</span><span class="token punctuation">;</span>
</code></pre></div><p>由于模型和集合在转换为字符串时会转换为 JSON，您可以直接从应用程序的路由、AJAX 处理程序或控制器返回 Model 对象：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;users&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name static-context">User</span><span class="token operator">::</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="从-json-中隐藏属性"><a href="#从-json-中隐藏属性" class="header-anchor">#</a> 从 JSON 中隐藏属性</h2><p>有时您可能希望限制模型数组或 JSON 表示中包含的属性，例如密码。为此，请在模型中添加 <code>$hidden</code> 属性定义：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">namespace</span> <span class="token package">Acme<span class="token punctuation">\\</span>Blog<span class="token punctuation">\\</span>Models</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">Model</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">User</span> <span class="token keyword">extends</span> <span class="token class-name">Model</span>
<span class="token punctuation">{</span>
    <span class="token comment">/**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */</span>
    <span class="token keyword">protected</span> <span class="token variable">$hidden</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;password&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>或者，您可以使用 <code>$visible</code> 属性来定义应包含在模型数组和 JSON 表示中的属性白名单：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">class</span> <span class="token class-name-definition class-name">User</span> <span class="token keyword">extends</span> <span class="token class-name">Model</span>
<span class="token punctuation">{</span>
    <span class="token comment">/**
     * The attributes that should be visible in arrays.
     *
     * @var array
     */</span>
    <span class="token keyword">protected</span> <span class="token variable">$visible</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;first_name&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;last_name&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="向-json-追加值"><a href="#向-json-追加值" class="header-anchor">#</a> 向 JSON 追加值</h2><p>有时，您可能需要添加在数据库中没有对应列的数组属性。为此，首先为该值定义一个<a href="./mutators.html">访问器</a>：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">class</span> <span class="token class-name-definition class-name">User</span> <span class="token keyword">extends</span> <span class="token class-name">Model</span>
<span class="token punctuation">{</span>
    <span class="token comment">/**
     * Get the administrator flag for the user.
     *
     * @return bool
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">getIsAdminAttribute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">attributes</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;admin&#39;</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string single-quoted-string">&#39;yes&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>创建访问器后，将属性名称添加到模型的 <code>appends</code> 属性中：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">class</span> <span class="token class-name-definition class-name">User</span> <span class="token keyword">extends</span> <span class="token class-name">Model</span>
<span class="token punctuation">{</span>
    <span class="token comment">/**
     * The accessors to append to the model&#39;s array form.
     *
     * @var array
     */</span>
    <span class="token keyword">protected</span> <span class="token variable">$appends</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;is_admin&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>属性添加到 <code>appends</code> 列表后，它将包含在模型的数组和 JSON 形式中。<code>appends</code> 数组中的属性也将遵循模型上配置的 <code>visible</code> 和 <code>hidden</code> 设置。</p>`,25))])}const y=p(i,[["render",u]]);export{f as __pageData,y as default};
