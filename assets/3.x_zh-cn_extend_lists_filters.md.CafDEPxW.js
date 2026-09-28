import{_ as p,r as s,o,c,e as a,a as l,s as u}from"./chunks/framework.CXcwiNg-.js";const h=JSON.parse('{"title":"过滤记录 - October CMS - 3.x","titleTemplate":false,"description":"了解如何过滤列表中的记录。","frontmatter":{"subtitle":"了解如何过滤列表中的记录。"},"headers":[{"level":2,"title":"配置行为","slug":"配置行为","link":"#配置行为","children":[]},{"level":2,"title":"定义过滤器作用域","slug":"定义过滤器作用域","link":"#定义过滤器作用域","children":[{"level":3,"title":"过滤器依赖","slug":"过滤器依赖","link":"#过滤器依赖","children":[]}]}],"relativePath":"3.x/zh-cn/extend/lists/filters.md","filePath":"3.x/zh-cn/extend/lists/filters.md"}'),i={name:"3.x/zh-cn/extend/lists/filters.md"};function k(r,n,d,y,g,m){const t=s("pre-heading"),e=s("post-heading");return o(),c("div",null,[a(t),n[0]||(n[0]=l("h1",null,"过滤记录",-1)),a(e),n[1]||(n[1]=u(`<p>October CMS 提供了过滤数据库记录的功能。对于支持过滤器的行为，您可以定义 <strong>filter</strong> 选项来启用该功能。作用域通常存储在模型配置目录中，命名为 <strong>scopes.yaml</strong>。</p><h2 id="配置行为"><a href="#配置行为" class="header-anchor">#</a> 配置行为</h2><p><a href="./list-controller.html">列表控制器</a>和<a href="./../forms/relation-controller.html">关联控制器</a>后台行为可以通过在配置中添加 <strong>filter</strong> 属性来进行过滤。定义后，可用的过滤器将显示在列表上方。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token comment"># config_list.yaml</span>

<span class="token comment"># ...</span>

<span class="token comment"># Displays the list filter</span>
<span class="token key atrule">filter</span><span class="token punctuation">:</span> $/october/test/models/user/scopes.yaml
</code></pre></div><h2 id="定义过滤器作用域"><a href="#定义过滤器作用域" class="header-anchor">#</a> 定义过滤器作用域</h2><div class="custom-block aside"><p>可用的过滤器作用域属性可在<a href="./../../element/filter-scopes.html">过滤器作用域定义</a>页面找到。</p></div><p>同样，过滤器由其自己的配置文件驱动，该文件包含过滤器<strong>作用域</strong>。每个作用域是列表可以被过滤的一个方面。以下示例展示了过滤器定义文件的典型内容。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token comment"># scopes.yaml</span>
<span class="token key atrule">scopes</span><span class="token punctuation">:</span>

    <span class="token key atrule">category</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Category
        <span class="token key atrule">modelClass</span><span class="token punctuation">:</span> Acme\\Blog\\Models\\Category
        <span class="token key atrule">conditions</span><span class="token punctuation">:</span> category_id in (<span class="token punctuation">:</span>value)
        <span class="token key atrule">nameFrom</span><span class="token punctuation">:</span> name

    <span class="token key atrule">status</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Status
        <span class="token key atrule">type</span><span class="token punctuation">:</span> group
        <span class="token key atrule">conditions</span><span class="token punctuation">:</span> status in (<span class="token punctuation">:</span>value)
        <span class="token key atrule">options</span><span class="token punctuation">:</span>
            <span class="token key atrule">pending</span><span class="token punctuation">:</span> Pending
            <span class="token key atrule">active</span><span class="token punctuation">:</span> Active
            <span class="token key atrule">closed</span><span class="token punctuation">:</span> Closed

    <span class="token key atrule">published</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Hide published
        <span class="token key atrule">type</span><span class="token punctuation">:</span> checkbox
        <span class="token key atrule">default</span><span class="token punctuation">:</span> <span class="token number">1</span>
        <span class="token key atrule">conditions</span><span class="token punctuation">:</span> is_published &lt;<span class="token punctuation">&gt;</span> true

    <span class="token key atrule">approved</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Approved
        <span class="token key atrule">type</span><span class="token punctuation">:</span> switch
        <span class="token key atrule">default</span><span class="token punctuation">:</span> <span class="token number">2</span>
        <span class="token key atrule">conditions</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> is_approved &lt;<span class="token punctuation">&gt;</span> true
            <span class="token punctuation">-</span> is_approved = true

    <span class="token key atrule">created_at</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Date
        <span class="token key atrule">type</span><span class="token punctuation">:</span> date
        <span class="token key atrule">conditions</span><span class="token punctuation">:</span>
            <span class="token key atrule">after</span><span class="token punctuation">:</span> created_at <span class="token punctuation">&gt;</span>= &#39;<span class="token punctuation">:</span>value&#39;
            <span class="token key atrule">between</span><span class="token punctuation">:</span> created_at <span class="token punctuation">&gt;</span>= &#39;<span class="token punctuation">:</span>after&#39; AND created_at &lt;= &#39;<span class="token punctuation">:</span>before&#39;
</code></pre></div><h3 id="过滤器依赖"><a href="#过滤器依赖" class="header-anchor">#</a> 过滤器依赖</h3><p>过滤器作用域可以通过定义 <code>dependsOn</code> 属性来声明对其他作用域的依赖关系，这提供了一种服务端解决方案，当依赖项被修改时更新作用域。当声明为依赖项的作用域发生更改时，定义的作用域将动态重置和更新。这提供了更改提供给作用域的可用选项的机会。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">country</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Country
    <span class="token key atrule">type</span><span class="token punctuation">:</span> group
    <span class="token key atrule">conditions</span><span class="token punctuation">:</span> country_id in (<span class="token punctuation">:</span>value)
    <span class="token key atrule">modelClass</span><span class="token punctuation">:</span> October\\Test\\Models\\Location
    <span class="token key atrule">options</span><span class="token punctuation">:</span> getCountryOptions

<span class="token key atrule">city</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> City
    <span class="token key atrule">type</span><span class="token punctuation">:</span> group
    <span class="token key atrule">conditions</span><span class="token punctuation">:</span> city_id in (<span class="token punctuation">:</span>value)
    <span class="token key atrule">modelClass</span><span class="token punctuation">:</span> October\\Test\\Models\\Location
    <span class="token key atrule">options</span><span class="token punctuation">:</span> getCityOptions
    <span class="token key atrule">dependsOn</span><span class="token punctuation">:</span> country
</code></pre></div><p>在上面的示例中，当 <code>country</code> 作用域发生更改时，<code>city</code> 作用域将刷新。任何定义了 <code>dependsOn</code> 属性的作用域都将接收过滤器小部件的所有当前作用域对象（包括其当前值），作为按作用域名称为键的数组传递。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">getCountryOptions</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name static-context">Country</span><span class="token operator">::</span><span class="token function">lists</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;name&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;id&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">getCityOptions</span><span class="token punctuation">(</span><span class="token variable">$scopes</span> <span class="token operator">=</span> <span class="token constant">null</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">empty</span><span class="token punctuation">(</span><span class="token variable">$scopes</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;country&#39;</span><span class="token punctuation">]</span><span class="token operator">-&gt;</span><span class="token property">value</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name static-context">City</span><span class="token operator">::</span><span class="token function">whereIn</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;country_id&#39;</span><span class="token punctuation">,</span> <span class="token variable">$scopes</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;country&#39;</span><span class="token punctuation">]</span><span class="token operator">-&gt;</span><span class="token property">value</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token function">lists</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;name&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;id&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name static-context">City</span><span class="token operator">::</span><span class="token function">lists</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;name&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;id&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>您可以通过在所使用的模型中覆盖 <code>filterScopes</code> 方法来过滤过滤器作用域定义。这允许您根据其他作用域值操纵可见性和其他作用域属性。该方法接受两个参数：<strong>$scopes</strong> 代表已由作用域配置定义的作用域对象，<strong>$context</strong> 代表当前活动的过滤器上下文。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">filterScopes</span><span class="token punctuation">(</span><span class="token variable">$scopes</span><span class="token punctuation">,</span> <span class="token variable">$context</span> <span class="token operator">=</span> <span class="token constant">null</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$scopes</span><span class="token operator">-&gt;</span><span class="token property">disable_roles</span><span class="token operator">-&gt;</span><span class="token property">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token variable">$scopes</span><span class="token operator">-&gt;</span><span class="token property">roles</span><span class="token operator">-&gt;</span><span class="token property">hidden</span> <span class="token operator">=</span> <span class="token constant boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>上述逻辑将在 <code>disable_roles</code> 值被选中时隐藏 <code>roles</code> 作用域。此逻辑将在过滤器首次加载时以及由作用域依赖更新时应用。例如，以下是关联的过滤器作用域定义。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">disable_roles</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> checkbox
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Disable Roles

<span class="token key atrule">roles</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> text
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Role
    <span class="token key atrule">dependsOn</span><span class="token punctuation">:</span> disable_roles
</code></pre></div>`,17))])}const b=p(i,[["render",k]]);export{h as __pageData,b as default};
