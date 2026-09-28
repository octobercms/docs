import{_ as p,r as s,o,c as l,e as a,a as c,s as u}from"./chunks/framework.CXcwiNg-.js";const v=JSON.parse('{"title":"Group 范围 - October CMS - 3.x","titleTemplate":false,"description":"过滤器范围","frontmatter":{"subtitle":"过滤器范围","shortname":"Group"},"headers":[{"level":2,"title":"PHP 接口","slug":"php-接口","link":"#php-接口","children":[]}],"relativePath":"3.x/zh-cn/element/filter/scope-group.md","filePath":"3.x/zh-cn/element/filter/scope-group.md"}'),r={name:"3.x/zh-cn/element/filter/scope-group.md"};function i(k,n,d,g,y,m){const t=s("pre-heading"),e=s("post-heading");return o(),l("div",null,[a(t),n[0]||(n[0]=c("h1",null,"Group 范围",-1)),a(e),n[1]||(n[1]=u(`<p><code>group</code> - 使用多个项目的分组进行过滤，通常通过关联模型或预定义选项数组。</p><p>要按模型过滤，请指定 <code>modelClass</code> 和 <code>nameFrom</code> 属性以指定要使用的模型和属性。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">roles</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Role
    <span class="token key atrule">type</span><span class="token punctuation">:</span> group
    <span class="token key atrule">nameFrom</span><span class="token punctuation">:</span> name
    <span class="token key atrule">modelClass</span><span class="token punctuation">:</span> October\\Test\\Models\\Role
</code></pre></div><p>以下属性可用于过滤器。</p><div class="table"><table tabindex="0"><thead><tr><th>属性</th><th>描述</th></tr></thead><tbody><tr><td><strong>options</strong></td><td>过滤器的可用选项，以数组形式。</td></tr><tr><td><strong>optionsMethod</strong></td><td>从模型上定义的方法或静态方法获取选项，例如 <code>Class::method</code>。</td></tr><tr><td><strong>optionsScope</strong></td><td>将<a href="./../filter-scopes.html">模型范围方法</a>应用于选项查询。</td></tr><tr><td><strong>conditions</strong></td><td>用于过滤器的自定义 SQL select 语句。</td></tr><tr><td><strong>nameFrom</strong></td><td>模型类中使用的列名，用于显示名称。默认值：<code>name</code>。</td></tr><tr><td><strong>modelClass</strong></td><td>用于可用过滤记录的模型类。</td></tr><tr><td><strong>modelScope</strong></td><td>将<a href="./../filter-scopes.html">模型范围方法</a>应用于过滤器查询。</td></tr><tr><td><strong>matchMode</strong></td><td>确定选择的应用方式，可选 <code>include</code>、<code>exclude</code> 或 <code>toggle</code>。默认值：<code>include</code></td></tr></tbody></table></div><p>要按数组过滤，请指定 <code>options</code> 属性。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">status</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Role
    <span class="token key atrule">type</span><span class="token punctuation">:</span> group
    <span class="token key atrule">options</span><span class="token punctuation">:</span>
        <span class="token key atrule">developer</span><span class="token punctuation">:</span> Developer
        <span class="token key atrule">publisher</span><span class="token punctuation">:</span> Publisher
</code></pre></div><p>您可以将自定义 SQL 作为字符串传递给条件，其中 <code>:value</code> 包含过滤值。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">status</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Role
    <span class="token key atrule">type</span><span class="token punctuation">:</span> group
    <span class="token key atrule">conditions</span><span class="token punctuation">:</span> role in (<span class="token punctuation">:</span>value)
    <span class="token comment"># ...</span>
</code></pre></div><p>您也可以将 <code>default</code> 值作为包含所选键的数组传递。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">status</span><span class="token punctuation">:</span>
    <span class="token comment"># ...</span>
    <span class="token key atrule">default</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> developer
        <span class="token punctuation">-</span> publisher
</code></pre></div><p>使用 <code>matchMode</code> 属性控制过滤器的应用方式，通过包含或排除所选项目。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">status</span><span class="token punctuation">:</span>
    <span class="token comment"># ...</span>
    <span class="token key atrule">matchMode</span><span class="token punctuation">:</span> toggle
</code></pre></div><h2 id="php-接口"><a href="#php-接口" class="header-anchor">#</a> PHP 接口</h2><p>您可以使用以下示例在模型中定义自定义 <code>modelScope</code>。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">roles</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Role
    <span class="token key atrule">type</span><span class="token punctuation">:</span> group
    <span class="token key atrule">nameFrom</span><span class="token punctuation">:</span> name
    <span class="token key atrule">modelClass</span><span class="token punctuation">:</span> October\\Test\\Models\\Role
    <span class="token key atrule">modelScope</span><span class="token punctuation">:</span> groupFilter
</code></pre></div><p><strong>scopeGroupFilter</strong> 方法定义，其中值在 <code>$scope-&gt;value</code> 中找到。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">scopeGroupFilter</span><span class="token punctuation">(</span><span class="token variable">$query</span><span class="token punctuation">,</span> <span class="token variable">$scope</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token variable">$query</span><span class="token operator">-&gt;</span><span class="token function">whereHas</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;roles&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token variable">$q</span><span class="token punctuation">)</span> <span class="token keyword">use</span> <span class="token punctuation">(</span><span class="token variable">$scope</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token variable">$q</span><span class="token operator">-&gt;</span><span class="token function">whereIn</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;id&#39;</span><span class="token punctuation">,</span> <span class="token variable">$scope</span><span class="token operator">-&gt;</span><span class="token property">value</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>您可以通过将模型方法传递给 <code>optionsMethod</code> 属性来动态提供选项。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">roles</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Role
    <span class="token key atrule">type</span><span class="token punctuation">:</span> group
    <span class="token key atrule">nameFrom</span><span class="token punctuation">:</span> name
    <span class="token key atrule">modelClass</span><span class="token punctuation">:</span> October\\Test\\Models\\Role
    <span class="token key atrule">optionsMethod</span><span class="token punctuation">:</span> getRoleGroupOptions
</code></pre></div><p><strong>getRoleGroupOptions</strong> 方法定义。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">getRoleGroupOptions</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token function">whereNull</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;parent_id&#39;</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token function">pluck</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;name&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;id&#39;</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>optionsScope</code> 属性允许您将范围应用于查找可用选项的默认查询。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">roles</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Role
    <span class="token key atrule">type</span><span class="token punctuation">:</span> group
    <span class="token key atrule">nameFrom</span><span class="token punctuation">:</span> name
    <span class="token key atrule">modelClass</span><span class="token punctuation">:</span> October\\Test\\Models\\Role
    <span class="token key atrule">optionsScope</span><span class="token punctuation">:</span> applyRoleOptionsFilter
</code></pre></div><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">scopeApplyRoleOptionsFilter</span><span class="token punctuation">(</span><span class="token variable">$query</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token variable">$query</span><span class="token operator">-&gt;</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;id&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;&lt;&gt;&#39;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,25))])}const f=p(r,[["render",i]]);export{v as __pageData,f as default};
