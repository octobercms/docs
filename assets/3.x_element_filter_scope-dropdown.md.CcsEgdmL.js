import{_ as o,r as s,o as p,c as l,e as a,a as c,s as i}from"./chunks/framework.CXcwiNg-.js";const f=JSON.parse('{"title":"Dropdown Scope - October CMS - 3.x","titleTemplate":false,"description":"Filter Scope","frontmatter":{"subtitle":"Filter Scope","shortname":"Dropdown"},"headers":[{"level":2,"title":"PHP Interface","slug":"php-interface","link":"#php-interface","children":[]}],"relativePath":"3.x/element/filter/scope-dropdown.md","filePath":"3.x/element/filter/scope-dropdown.md"}'),r={name:"3.x/element/filter/scope-dropdown.md"};function u(d,n,k,g,y,h){const t=s("pre-heading"),e=s("post-heading");return p(),l("div",null,[a(t),n[0]||(n[0]=c("h1",null,"Dropdown Scope",-1)),a(e),n[1]||(n[1]=i(`<p><code>dropdown</code> - filter using a single selection of multiple items.</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">status</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> dropdown
    <span class="token key atrule">options</span><span class="token punctuation">:</span>
        <span class="token key atrule">pending</span><span class="token punctuation">:</span> Pending
        <span class="token key atrule">active</span><span class="token punctuation">:</span> Active
        <span class="token key atrule">closed</span><span class="token punctuation">:</span> Closed
</code></pre></div><p>The following properties are available for the filter.</p><div class="table"><table tabindex="0"><thead><tr><th>Property</th><th>Description</th></tr></thead><tbody><tr><td><strong>options</strong></td><td>available options for the filter, as an array.</td></tr><tr><td><strong>optionsMethod</strong></td><td>take options from a method defined on the model or as a static method, eg <code>Class::method</code>.</td></tr><tr><td><strong>conditions</strong></td><td>a custom SQL select statement to use for the filter.</td></tr><tr><td><strong>emptyOption</strong></td><td>text to display when there is no available selections.</td></tr><tr><td><strong>modelScope</strong></td><td>applies a <a href="./../../extend/database/model.html">model query scope</a> method to the filter query, can be a model method name or a static PHP class method (<code>Class::method</code>). The first argument will contain the model query that the widget will be attaching its value to, i.e. the parent model.</td></tr></tbody></table></div><p>You may pass custom SQL to the conditions as a string where <code>:value</code> contains the filtered value.</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">status</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> dropdown
    <span class="token key atrule">conditions</span><span class="token punctuation">:</span> status = <span class="token punctuation">:</span>value
    <span class="token comment"># ...</span>
</code></pre></div><p>The dropdown filter does not display a label, the <code>emptyOption</code> property can be used to set the default state.</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">status</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> dropdown
    <span class="token key atrule">emptyOption</span><span class="token punctuation">:</span> Select Status
    <span class="token comment"># ...</span>
</code></pre></div><h2 id="php-interface"><a href="#php-interface" class="header-anchor">#</a> PHP Interface</h2><p>You may define a custom <code>modelScope</code> in the model using the following example.</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">status</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Status
    <span class="token key atrule">type</span><span class="token punctuation">:</span> dropdown
    <span class="token key atrule">modelScope</span><span class="token punctuation">:</span> applyStatusCode
    <span class="token key atrule">options</span><span class="token punctuation">:</span>
        <span class="token key atrule">active</span><span class="token punctuation">:</span> Active
        <span class="token key atrule">deleted</span><span class="token punctuation">:</span> Deleted
</code></pre></div><p>The <strong>scopeApplyStatusCode</strong> method definition where the value is found in <code>$scope-&gt;value</code>.</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">scopeApplyStatusCode</span><span class="token punctuation">(</span><span class="token variable">$query</span><span class="token punctuation">,</span> <span class="token variable">$scope</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$scope</span><span class="token operator">-&gt;</span><span class="token property">value</span> <span class="token operator">===</span> <span class="token string single-quoted-string">&#39;active&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token variable">$query</span><span class="token operator">-&gt;</span><span class="token function">withoutTrashed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$scope</span><span class="token operator">-&gt;</span><span class="token property">value</span> <span class="token operator">===</span> <span class="token string single-quoted-string">&#39;deleted&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token variable">$query</span><span class="token operator">-&gt;</span><span class="token function">onlyTrashed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>You may dynamically supply options by passing a model method to the <code>optionsMethod</code> property.</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">status</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Status
    <span class="token key atrule">type</span><span class="token punctuation">:</span> dropdown
    <span class="token key atrule">optionsMethod</span><span class="token punctuation">:</span> getStatusOptions
</code></pre></div><p>The <strong>getStatusOptions</strong> method definition.</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">getStatusOptions</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span>
        <span class="token string single-quoted-string">&#39;active&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;Active&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;deleted&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;Deleted&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,17))])}const v=o(r,[["render",u]]);export{f as __pageData,v as default};
