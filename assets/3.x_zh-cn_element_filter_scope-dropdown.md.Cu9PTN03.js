import{_ as p,r as s,o,c,e as a,a as l,s as u}from"./chunks/framework.CXcwiNg-.js";const v=JSON.parse('{"title":"Dropdown 范围 - October CMS - 3.x","titleTemplate":false,"description":"过滤器范围","frontmatter":{"subtitle":"过滤器范围","shortname":"Dropdown"},"headers":[{"level":2,"title":"PHP 接口","slug":"php-接口","link":"#php-接口","children":[]}],"relativePath":"3.x/zh-cn/element/filter/scope-dropdown.md","filePath":"3.x/zh-cn/element/filter/scope-dropdown.md"}'),r={name:"3.x/zh-cn/element/filter/scope-dropdown.md"};function i(d,n,k,g,y,m){const t=s("pre-heading"),e=s("post-heading");return o(),c("div",null,[a(t),n[0]||(n[0]=l("h1",null,"Dropdown 范围",-1)),a(e),n[1]||(n[1]=u(`<p><code>dropdown</code> - 使用多个项目中的单个选择进行过滤。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">status</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> dropdown
    <span class="token key atrule">options</span><span class="token punctuation">:</span>
        <span class="token key atrule">pending</span><span class="token punctuation">:</span> Pending
        <span class="token key atrule">active</span><span class="token punctuation">:</span> Active
        <span class="token key atrule">closed</span><span class="token punctuation">:</span> Closed
</code></pre></div><p>以下属性可用于过滤器。</p><div class="table"><table tabindex="0"><thead><tr><th>属性</th><th>描述</th></tr></thead><tbody><tr><td><strong>options</strong></td><td>过滤器的可用选项，以数组形式。</td></tr><tr><td><strong>optionsMethod</strong></td><td>从模型上定义的方法或静态方法获取选项，例如 <code>Class::method</code>。</td></tr><tr><td><strong>conditions</strong></td><td>用于过滤器的自定义 SQL select 语句。</td></tr><tr><td><strong>emptyOption</strong></td><td>没有可用选项时显示的文本。</td></tr><tr><td><strong>modelScope</strong></td><td>将<a href="./../../extend/database/model.html">模型查询范围</a>方法应用于过滤器查询，可以是模型方法名或静态 PHP 类方法（<code>Class::method</code>）。第一个参数将包含小部件将其值附加到的模型查询，即父模型。</td></tr></tbody></table></div><p>您可以将自定义 SQL 作为字符串传递给条件，其中 <code>:value</code> 包含过滤值。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">status</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> dropdown
    <span class="token key atrule">conditions</span><span class="token punctuation">:</span> status = <span class="token punctuation">:</span>value
    <span class="token comment"># ...</span>
</code></pre></div><p>下拉过滤器不显示标签，<code>emptyOption</code> 属性可用于设置默认状态。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">status</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> dropdown
    <span class="token key atrule">emptyOption</span><span class="token punctuation">:</span> Select Status
    <span class="token comment"># ...</span>
</code></pre></div><h2 id="php-接口"><a href="#php-接口" class="header-anchor">#</a> PHP 接口</h2><p>您可以使用以下示例在模型中定义自定义 <code>modelScope</code>。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">status</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Status
    <span class="token key atrule">type</span><span class="token punctuation">:</span> dropdown
    <span class="token key atrule">modelScope</span><span class="token punctuation">:</span> applyStatusCode
    <span class="token key atrule">options</span><span class="token punctuation">:</span>
        <span class="token key atrule">active</span><span class="token punctuation">:</span> Active
        <span class="token key atrule">deleted</span><span class="token punctuation">:</span> Deleted
</code></pre></div><p><strong>scopeApplyStatusCode</strong> 方法定义，其中值在 <code>$scope-&gt;value</code> 中找到。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">scopeApplyStatusCode</span><span class="token punctuation">(</span><span class="token variable">$query</span><span class="token punctuation">,</span> <span class="token variable">$scope</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$scope</span><span class="token operator">-&gt;</span><span class="token property">value</span> <span class="token operator">===</span> <span class="token string single-quoted-string">&#39;active&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token variable">$query</span><span class="token operator">-&gt;</span><span class="token function">withoutTrashed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$scope</span><span class="token operator">-&gt;</span><span class="token property">value</span> <span class="token operator">===</span> <span class="token string single-quoted-string">&#39;deleted&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token variable">$query</span><span class="token operator">-&gt;</span><span class="token function">onlyTrashed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>您可以通过将模型方法传递给 <code>optionsMethod</code> 属性来动态提供选项。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">status</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Status
    <span class="token key atrule">type</span><span class="token punctuation">:</span> dropdown
    <span class="token key atrule">optionsMethod</span><span class="token punctuation">:</span> getStatusOptions
</code></pre></div><p><strong>getStatusOptions</strong> 方法定义。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">getStatusOptions</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span>
        <span class="token string single-quoted-string">&#39;active&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;Active&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;deleted&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;Deleted&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,17))])}const f=p(r,[["render",i]]);export{v as __pageData,f as default};
