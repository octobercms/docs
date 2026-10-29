import{_ as p,r as s,o,c as i,e as t,a as c,s as r}from"./chunks/framework.CXcwiNg-.js";const f=JSON.parse('{"title":"Dictionary Inspector 类型 - October CMS - 3.x","titleTemplate":false,"description":"Inspector 类型","frontmatter":{"subtitle":"Inspector 类型","shortname":"Dictionary"},"headers":[{"level":2,"title":"额外验证","slug":"额外验证","link":"#额外验证","children":[]}],"relativePath":"3.x/zh-cn/element/inspector/type-dictionary.md","filePath":"3.x/zh-cn/element/inspector/type-dictionary.md"}'),l={name:"3.x/zh-cn/element/inspector/type-dictionary.md"};function u(g,n,k,d,q,y){const a=s("pre-heading"),e=s("post-heading");return o(),i("div",null,[t(a),n[0]||(n[0]=c("h1",null,"Dictionary Inspector 类型",-1)),t(e),n[1]||(n[1]=r(`<p><code>dictionary</code> Inspector 类型允许通过由两列组成的表格的简单用户界面创建键值对。<code>default</code> 参数（如果指定）应包含一个键值对象。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">defineProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span>
        <span class="token string single-quoted-string">&#39;options&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
            <span class="token string single-quoted-string">&#39;title&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;Options&#39;</span><span class="token punctuation">,</span>
            <span class="token string single-quoted-string">&#39;type&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;dictionary&#39;</span><span class="token punctuation">,</span>
            <span class="token string single-quoted-string">&#39;default&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;option1&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;Option 1&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>生成的输出是与所选选项对应的字符串值，例如：</p><div class="language-json extra-class"><pre class="language-json"><code><span class="token property">&quot;options&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token property">&quot;option1&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Option 1&quot;</span><span class="token punctuation">,</span> <span class="token property">&quot;option2&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Option 2&quot;</span><span class="token punctuation">}</span>
</code></pre></div><p>以下<a href="./../inspector-types.html">配置值</a>常用。</p><div class="table"><table tabindex="0"><thead><tr><th>属性</th><th>描述</th></tr></thead><tbody><tr><td><strong>title</strong></td><td>属性的标题。</td></tr><tr><td><strong>description</strong></td><td>属性的简要描述，可选。</td></tr><tr><td><strong>default</strong></td><td>指定默认的键值数组，可选。</td></tr></tbody></table></div><h2 id="额外验证"><a href="#额外验证" class="header-anchor">#</a> 额外验证</h2><p><code>dictionary</code> 编辑器支持对整个集合（<code>required</code> 和 <code>length</code> 验证器）以及键和值分别进行验证。有关更多详细信息，请参阅<a href="./../inspector-types.html">验证描述</a>。<code>validationKey</code> 和 <code>validationValue</code> 定义键和值的验证，例如：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">defineProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span>
        <span class="token string single-quoted-string">&#39;options&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
            <span class="token string single-quoted-string">&#39;title&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;Options&#39;</span><span class="token punctuation">,</span>
            <span class="token string single-quoted-string">&#39;type&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;dictionary&#39;</span><span class="token punctuation">,</span>
            <span class="token string single-quoted-string">&#39;validation&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
                <span class="token string single-quoted-string">&#39;required&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
                    <span class="token string single-quoted-string">&#39;message&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;Please create options&#39;</span>
                <span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token string single-quoted-string">&#39;length&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
                    <span class="token string single-quoted-string">&#39;min&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
                        <span class="token string single-quoted-string">&#39;value&#39;</span> <span class="token operator">=&gt;</span> <span class="token number">2</span><span class="token punctuation">,</span>
                        <span class="token string single-quoted-string">&#39;message&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;Create at least two options.&#39;</span>
                    <span class="token punctuation">]</span>
                <span class="token punctuation">]</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token string single-quoted-string">&#39;validationKey&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
                <span class="token string single-quoted-string">&#39;regex&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
                    <span class="token string single-quoted-string">&#39;pattern&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;^[a-z]+$&#39;</span><span class="token punctuation">,</span>
                    <span class="token string single-quoted-string">&#39;message&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;Keys can contain only lowercase Latin letters&#39;</span>
                <span class="token punctuation">]</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token string single-quoted-string">&#39;validationValue&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
                <span class="token string single-quoted-string">&#39;regex&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
                    <span class="token string single-quoted-string">&#39;pattern&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;^[a-zA-Z0-9]+$&#39;</span><span class="token punctuation">,</span>
                    <span class="token string single-quoted-string">&#39;message&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;Values can contain only Latin letters and digits&#39;</span>
                <span class="token punctuation">]</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,9))])}const m=p(l,[["render",u]]);export{f as __pageData,m as default};
