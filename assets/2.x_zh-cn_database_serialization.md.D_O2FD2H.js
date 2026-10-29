import{_ as t,r as n,o,c,e as a,a as l,s as r}from"./chunks/framework.CXcwiNg-.js";const f=JSON.parse('{"title":"序列化 - October CMS - 2.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"基本用法","slug":"基本用法","link":"#基本用法","children":[{"level":4,"title":"序列化为数组","slug":"序列化为数组","link":"#序列化为数组","children":[]},{"level":4,"title":"将模型转换为 JSON","slug":"将模型转换为-json","link":"#将模型转换为-json","children":[]}]},{"level":2,"title":"隐藏 JSON 属性","slug":"隐藏-json-属性","link":"#隐藏-json-属性","children":[]},{"level":2,"title":"追加 JSON 值","slug":"追加-json-值","link":"#追加-json-值","children":[]}],"relativePath":"2.x/zh-cn/database/serialization.md","filePath":"2.x/zh-cn/database/serialization.md"}'),i={name:"2.x/zh-cn/database/serialization.md"};function u(k,s,d,g,h,m){const p=n("pre-heading"),e=n("post-heading");return o(),c("div",null,[a(p),s[0]||(s[0]=l("h1",null,"序列化",-1)),a(e),s[1]||(s[1]=r(`<p>在构建 JSON API 时，您通常需要将模型和关系转换为数组或 JSON。 模型提供了一些便捷方法，以及对序列化中的属性控制。</p><h2 id="基本用法"><a href="#基本用法" class="header-anchor">#</a> 基本用法</h2><h4 id="序列化为数组"><a href="#序列化为数组" class="header-anchor">#</a> 序列化为数组</h4><p>要将模型及其加载的 <a href="./relations.html">关联</a> 转换为数组，您可以使用 <code>toArray</code> 方法。 这是一个递归的方法，因此所有的属性和关联(包括关联的关联)都将转化成数组：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token variable">$user</span> <span class="token operator">=</span> <span class="token class-name static-context">User</span><span class="token operator">::</span><span class="token function">with</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;roles&#39;</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">return</span> <span class="token variable">$user</span><span class="token operator">-&gt;</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>您还可以将 <a href="./collections.html">集合</a> 转换为数组：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token variable">$users</span> <span class="token operator">=</span> <span class="token class-name static-context">User</span><span class="token operator">::</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">return</span> <span class="token variable">$users</span><span class="token operator">-&gt;</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="将模型转换为-json"><a href="#将模型转换为-json" class="header-anchor">#</a> 将模型转换为 JSON</h4><p>要将模型转换为 JSON，您可以使用 <code>toJson</code> 方法。 与<code>toArray</code>一样，<code>toJson</code>方法是递归的，所以所有的属性和关联都会被转换成JSON：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token variable">$user</span> <span class="token operator">=</span> <span class="token class-name static-context">User</span><span class="token operator">::</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">return</span> <span class="token variable">$user</span><span class="token operator">-&gt;</span><span class="token function">toJson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>也可以把模型或集合转成字符串，方法 <code>toJson</code> 将自动调用：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token variable">$user</span> <span class="token operator">=</span> <span class="token class-name static-context">User</span><span class="token operator">::</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword type-casting">string</span><span class="token punctuation">)</span> <span class="token variable">$user</span><span class="token punctuation">;</span>
</code></pre></div><p>由于模型和集合在转化为字符串的时候会转成 JSON， 因此可以在应用的路由或控制器中直接返回模型对象：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;users&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name static-context">User</span><span class="token operator">::</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="隐藏-json-属性"><a href="#隐藏-json-属性" class="header-anchor">#</a> 隐藏 JSON 属性</h2><p>有时要将模型数组或 JSON 中的某些属性进行隐藏，比如密码，则可以在模型中添加 <code>$hidden</code> 属性：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token keyword">namespace</span> <span class="token package">Acme<span class="token punctuation">\\</span>Blog<span class="token punctuation">\\</span>Models</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">Model</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">User</span> <span class="token keyword">extends</span> <span class="token class-name">Model</span>
<span class="token punctuation">{</span>
    <span class="token comment">/**
     * 应为数组隐藏的属性。。
     *
     * @var array
     */</span>
    <span class="token keyword">protected</span> <span class="token variable">$hidden</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;password&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></code></pre></div><p>此外，也可以使用属性 <code>$visible</code> 定义一个模型数组和 JSON 可见的白名单。转化后的数组或 JSON 不会出现其他的属性：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">class</span> <span class="token class-name-definition class-name">User</span> <span class="token keyword">extends</span> <span class="token class-name">Model</span>
<span class="token punctuation">{</span>
    <span class="token comment">/**
     * 数组中的属性会被展示。
     *
     * @var array
     */</span>
    <span class="token keyword">protected</span> <span class="token variable">$visible</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;first_name&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;last_name&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="追加-json-值"><a href="#追加-json-值" class="header-anchor">#</a> 追加 JSON 值</h2><p>有时，需要在数组或 JSON 中添加一些数据库中不存在字段的对应属性。要实现这个功能，首先要定义一个 <a href="./../database/mutators.html">修改器</a>:</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">class</span> <span class="token class-name-definition class-name">User</span> <span class="token keyword">extends</span> <span class="token class-name">Model</span>
<span class="token punctuation">{</span>
    <span class="token comment">/**
     * 为用户获取管理员标识。
     *
     * @return bool
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">getIsAdminAttribute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">attributes</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;admin&#39;</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string single-quoted-string">&#39;yes&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>创建修改器后，将属性名称添加到模型的 <code>appends</code> 属性中：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">class</span> <span class="token class-name-definition class-name">User</span> <span class="token keyword">extends</span> <span class="token class-name">Model</span>
<span class="token punctuation">{</span>
    <span class="token comment">/**
     * 追加到模型数组表单的修改器。
     *
     * @var array
     */</span>
    <span class="token keyword">protected</span> <span class="token variable">$appends</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;is_admin&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>使用 <code>append</code> 方法追加属性后，它将包含在模型的数组和 JSON 中。<code>appends</code> 数组中的属性也将遵循模型上配置的 <code>visible</code> 和 <code>hidden</code> 设置。</p>`,25))])}const y=t(i,[["render",u]]);export{f as __pageData,y as default};
