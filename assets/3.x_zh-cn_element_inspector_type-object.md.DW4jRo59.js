import{_ as e,r as s,o,c,e as t,a as r,s as i}from"./chunks/framework.CXcwiNg-.js";const m=JSON.parse('{"title":"Object Inspector 类型 - October CMS - 3.x","titleTemplate":false,"description":"Inspector 类型","frontmatter":{"subtitle":"Inspector 类型","shortname":"Object"},"headers":[],"relativePath":"3.x/zh-cn/element/inspector/type-object.md","filePath":"3.x/zh-cn/element/inspector/type-object.md"}'),l={name:"3.x/zh-cn/element/inspector/type-object.md"};function u(g,n,k,d,q,y){const a=s("pre-heading"),p=s("post-heading");return o(),c("div",null,[t(a),n[0]||(n[0]=r("h1",null,"Object Inspector 类型",-1)),t(p),n[1]||(n[1]=i(`<p><code>object</code> Inspector 类型允许定义具有用户可编辑的特定属性的对象。对象属性通过 <code>properties</code> 属性指定。该属性的值是一个数组，其结构与 Inspector 属性数组相同。</p><p>上面的示例创建了一个具有三个属性的对象。其中两个显示为文本字段，第三个显示为下拉列表。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">defineProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span>
        <span class="token string single-quoted-string">&#39;address&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
            <span class="token string single-quoted-string">&#39;title&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;Address&#39;</span><span class="token punctuation">,</span>
            <span class="token string single-quoted-string">&#39;type&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;object&#39;</span><span class="token punctuation">,</span>
            <span class="token string single-quoted-string">&#39;properties&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
                <span class="token string single-quoted-string">&#39;streetAddress&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
                    <span class="token string single-quoted-string">&#39;title&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;Street Address&#39;</span><span class="token punctuation">,</span>
                    <span class="token string single-quoted-string">&#39;type&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;string&#39;</span>
                <span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token string single-quoted-string">&#39;city&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
                    <span class="token string single-quoted-string">&#39;title&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;City&#39;</span><span class="token punctuation">,</span>
                    <span class="token string single-quoted-string">&#39;type&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;string&#39;</span>
                <span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token string single-quoted-string">&#39;country&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
                    <span class="token string single-quoted-string">&#39;title&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;Country&#39;</span><span class="token punctuation">,</span>
                    <span class="token string single-quoted-string">&#39;type&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;dropdown&#39;</span><span class="token punctuation">,</span>
                    <span class="token string single-quoted-string">&#39;options&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
                        <span class="token string single-quoted-string">&#39;us&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;US&#39;</span><span class="token punctuation">,</span>
                        <span class="token string single-quoted-string">&#39;ca&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;Canada&#39;</span>
                    <span class="token punctuation">]</span>
                <span class="token punctuation">]</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>生成的输出是一个对象，例如：</p><div class="language-json extra-class"><pre class="language-json"><code><span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;streetAddress&quot;</span><span class="token operator">:</span> <span class="token string">&quot;321-210 Second ave&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;city&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Springfield&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;country&quot;</span><span class="token operator">:</span> <span class="token string">&quot;us&quot;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>以下<a href="./../inspector-types.html">配置值</a>常用且受支持。</p><div class="table"><table tabindex="0"><thead><tr><th>属性</th><th>描述</th></tr></thead><tbody><tr><td><strong>title</strong></td><td>属性的标题。</td></tr><tr><td><strong>description</strong></td><td>属性的简要描述，可选。</td></tr><tr><td><strong>properties</strong></td><td>嵌套属性定义的数组。</td></tr><tr><td><strong>default</strong></td><td>默认填充的项目数组，包含键和值。</td></tr><tr><td><strong>ignoreIfPropertyEmpty</strong></td><td>设置为一个值数组，如果值为空，则应从输出中排除。</td></tr></tbody></table></div><div class="custom-block warning"><p>此类型不支持由 <code>showExternalParam</code> 属性指定的外部参数编辑器。</p></div><p>对象属性可以是 Inspector 支持的任何类型，包括其他对象。如果对象的某个字段为空，有一种方法可以从 Inspector 值中完全排除该对象。该字段通过 <code>ignoreIfPropertyEmpty</code> 参数标识。例如：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">defineProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span>
        <span class="token string single-quoted-string">&#39;address&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
            <span class="token string single-quoted-string">&#39;title&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;Address&#39;</span><span class="token punctuation">,</span>
            <span class="token string single-quoted-string">&#39;type&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;object&#39;</span><span class="token punctuation">,</span>
            <span class="token string single-quoted-string">&#39;ignoreIfPropertyEmpty&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;title&#39;</span><span class="token punctuation">,</span>
            <span class="token string single-quoted-string">&#39;properties&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
                <span class="token string single-quoted-string">&#39;streetAddress&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
                    <span class="token string single-quoted-string">&#39;title&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;Street Address&#39;</span><span class="token punctuation">,</span>
                    <span class="token string single-quoted-string">&#39;type&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;string&#39;</span>
                <span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token string single-quoted-string">&#39;city&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
                    <span class="token string single-quoted-string">&#39;title&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;City&#39;</span><span class="token punctuation">,</span>
                    <span class="token string single-quoted-string">&#39;type&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;string&#39;</span>
                <span class="token punctuation">]</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在上面的示例中，如果未指定街道地址，则对象（&quot;address&quot;）将从 Inspector 输出中完全删除。如果在其他对象属性上定义了任何验证规则且必需属性为空，则这些规则将被忽略。</p><p>编辑器的 <code>default</code> 值（如果指定）应为与 <code>properties</code> 配置参数中定义的属性相同的对象。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">defineProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span>
        <span class="token string single-quoted-string">&#39;address&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
            <span class="token string single-quoted-string">&#39;title&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;Address&#39;</span><span class="token punctuation">,</span>
            <span class="token string single-quoted-string">&#39;type&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;object&#39;</span><span class="token punctuation">,</span>
            <span class="token string single-quoted-string">&#39;properties&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span><span class="token comment">/*...*/</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token string single-quoted-string">&#39;default&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
                <span class="token string single-quoted-string">&#39;streetAddress&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;321-210 Second ave&#39;</span><span class="token punctuation">,</span>
                <span class="token string single-quoted-string">&#39;city&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;Springfield&#39;</span><span class="token punctuation">,</span>
                <span class="token string single-quoted-string">&#39;country&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;us&#39;</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,13))])}const _=e(l,[["render",u]]);export{m as __pageData,_ as default};
