import{_ as p,r as s,o,c,e as a,a as l,s as i}from"./chunks/framework.CXcwiNg-.js";const b=JSON.parse('{"title":"Filtering Records - October CMS - 3.x","titleTemplate":false,"description":"Learn how to filter records found in a list.","frontmatter":{"subtitle":"Learn how to filter records found in a list."},"headers":[{"level":2,"title":"Configuring a Behavior","slug":"configuring-a-behavior","link":"#configuring-a-behavior","children":[]},{"level":2,"title":"Defining Filter Scopes","slug":"defining-filter-scopes","link":"#defining-filter-scopes","children":[{"level":3,"title":"Filter Dependencies","slug":"filter-dependencies","link":"#filter-dependencies","children":[]}]}],"relativePath":"3.x/extend/lists/filters.md","filePath":"3.x/extend/lists/filters.md"}'),r={name:"3.x/extend/lists/filters.md"};function u(k,n,d,y,g,h){const e=s("pre-heading"),t=s("post-heading");return o(),c("div",null,[a(e),n[0]||(n[0]=l("h1",null,"Filtering Records",-1)),a(t),n[1]||(n[1]=i(`<p>October CMS provides features for filtering database records. For behaviors that support filters, you can define a <strong>filter</strong> option to enable the feature. Scopes are often stored in the model configuration directory as <strong>scopes.yaml</strong>.</p><h2 id="configuring-a-behavior"><a href="#configuring-a-behavior" class="header-anchor">#</a> Configuring a Behavior</h2><p>The <a href="./list-controller.html">List Controller</a> and <a href="./../forms/relation-controller.html">Relation Controller</a> backend behaviors can be filtered by adding a <strong>filter</strong> property to the configuration. When defined, the available filters are shown above the list.</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token comment"># config_list.yaml</span>

<span class="token comment"># ...</span>

<span class="token comment"># Displays the list filter</span>
<span class="token key atrule">filter</span><span class="token punctuation">:</span> $/october/test/models/user/scopes.yaml
</code></pre></div><h2 id="defining-filter-scopes"><a href="#defining-filter-scopes" class="header-anchor">#</a> Defining Filter Scopes</h2><div class="custom-block aside"><p>The available filter scope properties can be found on the <a href="./../../element/filter-scopes.html">filter scope definitions</a> page.</p></div><p>Similarly filters are driven by their own configuration file that contain filter <strong>scopes</strong>. Each scope is an aspect by which the list can be filtered. The next example shows a typical contents of the filter definition file.</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token comment"># scopes.yaml</span>
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
</code></pre></div><h3 id="filter-dependencies"><a href="#filter-dependencies" class="header-anchor">#</a> Filter Dependencies</h3><p>Filter scopes can declare dependencies on other scopes by defining the <code>dependsOn</code> property, which provide a server-side solution for updating scopes when their dependencies are modified. When the scopes that are declared as dependencies change, the defining scope will reset and update dynamically. This provides an opportunity to change the available options to be provided to the scope.</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">country</span><span class="token punctuation">:</span>
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
</code></pre></div><p>In the above example, the <code>city</code> scope will refresh when the <code>country</code> scope has changed. Any scope that defines the <code>dependsOn</code> property will be passed all current scope objects for the Filter widget, including their current values, as an array that is keyed by the scope names.</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">getCountryOptions</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
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
</code></pre></div><p>You can filter the filter scope definitions by overriding the <code>filterScopes</code> method inside the Model used. This allows you to manipulate visibility and other scope properties based on other scope values. The method takes two arguments <strong>$scopes</strong> will represent an object of the scopes already defined by the scope configuration and <strong>$context</strong> represents the active filter context.</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">filterScopes</span><span class="token punctuation">(</span><span class="token variable">$scopes</span><span class="token punctuation">,</span> <span class="token variable">$context</span> <span class="token operator">=</span> <span class="token constant">null</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$scopes</span><span class="token operator">-&gt;</span><span class="token property">disable_roles</span><span class="token operator">-&gt;</span><span class="token property">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token variable">$scopes</span><span class="token operator">-&gt;</span><span class="token property">roles</span><span class="token operator">-&gt;</span><span class="token property">hidden</span> <span class="token operator">=</span> <span class="token constant boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>The above logic will hide the <code>roles</code> scope if the <code>disable_roles</code> value is checked. The logic will be applied when the filter first loads and also when updated by a scope dependency. For example, here is the associated filter scope definitions.</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">disable_roles</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> checkbox
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Disable Roles

<span class="token key atrule">roles</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> text
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Role
    <span class="token key atrule">dependsOn</span><span class="token punctuation">:</span> disable_roles
</code></pre></div>`,17))])}const m=p(r,[["render",u]]);export{b as __pageData,m as default};
