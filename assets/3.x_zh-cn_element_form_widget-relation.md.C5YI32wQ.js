import{_ as o,r as n,o as p,c as l,e as s,a as c,s as r}from"./chunks/framework.CXcwiNg-.js";const f=JSON.parse('{"title":"Relation 字段 - October CMS - 3.x","titleTemplate":false,"description":"表单小部件","frontmatter":{"subtitle":"表单小部件","shortname":"Relation"},"headers":[{"level":2,"title":"应用条件","slug":"应用条件","link":"#应用条件","children":[{"level":3,"title":"SQL 查询条件","slug":"sql-查询条件","link":"#sql-查询条件","children":[]},{"level":3,"title":"PHP 查询范围","slug":"php-查询范围","link":"#php-查询范围","children":[]}]},{"level":2,"title":"关联控制器集成","slug":"关联控制器集成","link":"#关联控制器集成","children":[]}],"relativePath":"3.x/zh-cn/element/form/widget-relation.md","filePath":"3.x/zh-cn/element/form/widget-relation.md"}'),u={name:"3.x/zh-cn/element/form/widget-relation.md"};function d(i,a,k,y,g,m){const e=n("pre-heading"),t=n("post-heading");return p(),l("div",null,[s(e),a[0]||(a[0]=c("h1",null,"Relation 字段",-1)),s(t),a[1]||(a[1]=r(`<p><code>relation</code> - 根据字段关系类型渲染下拉列表或复选框列表。单数关系显示下拉列表，多数关系显示复选框列表。用于显示每个关系的标签来源于 <code>nameFrom</code> 或 <code>select</code> 定义。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">categories</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Categories
    <span class="token key atrule">type</span><span class="token punctuation">:</span> relation
</code></pre></div><p>以下<a href="./../form-fields.html">字段属性</a>受支持且常用。</p><div class="table"><table tabindex="0"><thead><tr><th>属性</th><th>描述</th></tr></thead><tbody><tr><td><strong>label</strong></td><td>向用户显示表单字段时使用的名称。</td></tr><tr><td><strong>comment</strong></td><td>在字段下方放置描述性注释。</td></tr><tr><td><strong>nameFrom</strong></td><td>用于显示关系标签的模型属性名称。默认值：<code>name</code>。</td></tr><tr><td><strong>excludeFrom</strong></td><td>用于在列表中排除相关键的父模型属性，可选。</td></tr><tr><td><strong>select</strong></td><td>用于名称的自定义 SQL select 语句。</td></tr><tr><td><strong>emptyOption</strong></td><td>没有可用选项时显示的文本。</td></tr><tr><td><strong>conditions</strong></td><td>指定应用于模型查询的原始 where 查询语句。</td></tr><tr><td><strong>modelScope</strong></td><td>将<a href="./../../extend/database/model.html">模型查询范围</a>方法应用于<strong>关联表单模型</strong>，可以是模型方法名或静态 PHP 类方法（<code>Class::method</code>）。</td></tr><tr><td><strong>defaultSort</strong></td><td>设置默认排序列和方向，支持字符串作为列名或包含 <code>column</code> 和 <code>direction</code> 键的数组。方向可以是 <code>asc</code>（升序，默认）或 <code>desc</code>（降序）。</td></tr><tr><td><strong>useController</strong></td><td>自动检测此字段是否配置了<a href="./../../extend/forms/relation-controller.html">关联控制器行为</a>并使用它。默认值：<code>true</code></td></tr><tr><td><strong>controller</strong></td><td>指定一个数组以手动配置与<a href="./../../extend/forms/relation-controller.html">关联控制器行为</a>的集成。</td></tr></tbody></table></div><p>使用 <code>nameFrom</code> 属性自定义关联记录使用的标签。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">categories</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Categories
    <span class="token key atrule">type</span><span class="token punctuation">:</span> relation
    <span class="token key atrule">nameFrom</span><span class="token punctuation">:</span> title
</code></pre></div><p>或者，您可以使用自定义 <code>select</code> 语句填充标签。任何有效的 SQL 语句都可以在此使用。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">user</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> User
    <span class="token key atrule">type</span><span class="token punctuation">:</span> relation
    <span class="token key atrule">select</span><span class="token punctuation">:</span> concat(first_name<span class="token punctuation">,</span> <span class="token string">&#39; &#39;</span><span class="token punctuation">,</span> last_name)
</code></pre></div><h2 id="应用条件"><a href="#应用条件" class="header-anchor">#</a> 应用条件</h2><p>您可以使用以下方法通过 SQL 或 PHP 条件过滤可用记录。</p><h3 id="sql-查询条件"><a href="#sql-查询条件" class="header-anchor">#</a> SQL 查询条件</h3><p>您可以使用 <code>conditions</code> 属性通过原始 SQL 查询限制关联模型。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">user</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> User
    <span class="token key atrule">type</span><span class="token punctuation">:</span> relation
    <span class="token key atrule">conditions</span><span class="token punctuation">:</span> is_featured = true
</code></pre></div><p>该值还支持从父模型属性解析的简单参数。参数名称以冒号（<code>:</code>）字符开头。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">country</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Country
    <span class="token key atrule">type</span><span class="token punctuation">:</span> relation

<span class="token key atrule">state</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> State
    <span class="token key atrule">type</span><span class="token punctuation">:</span> relation
    <span class="token key atrule">dependsOn</span><span class="token punctuation">:</span> country
    <span class="token key atrule">conditions</span><span class="token punctuation">:</span> custom_country_id = <span class="token punctuation">:</span>country_id
</code></pre></div><h3 id="php-查询范围"><a href="#php-查询范围" class="header-anchor">#</a> PHP 查询范围</h3><p>您可以使用 <code>modelScope</code> 属性提供用于过滤结果的模型范围。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">user</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> User
    <span class="token key atrule">type</span><span class="token punctuation">:</span> relation
    <span class="token key atrule">modelScope</span><span class="token punctuation">:</span> withTrashed
</code></pre></div><p><code>modelScope</code> 可用于连接两个关联字段，例如连接 <code>Country</code> 和 <code>State</code> 模型，其中可用的州按所选国家进行过滤。<code>dependsOn</code> 属性启用<a href="./../../extend/forms/field-dependencies.html">字段依赖</a>，并在选择 <code>country</code> 时更新 <code>state</code> 选项。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">country</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Country
    <span class="token key atrule">type</span><span class="token punctuation">:</span> relation

<span class="token key atrule">state</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> State
    <span class="token key atrule">type</span><span class="token punctuation">:</span> relation
    <span class="token key atrule">dependsOn</span><span class="token punctuation">:</span> country
    <span class="token key atrule">modelScope</span><span class="token punctuation">:</span> filterStates
</code></pre></div><p><code>modelScope</code> 值 <strong>filterStates</strong> 对应于 <code>State</code> 模型中定义的 <code>scopeFilterStates</code> 方法。提供给<a href="./../../extend/database/model.html">模型查询范围</a>的 <code>$model</code>（第二个参数）允许您捕获所选国家并过滤可用选项。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">scopeFilterStates</span><span class="token punctuation">(</span><span class="token variable">$query</span><span class="token punctuation">,</span> <span class="token variable">$model</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$countryId</span> <span class="token operator">=</span> <span class="token variable">$model</span><span class="token operator">-&gt;</span><span class="token property">country_id</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token variable">$query</span><span class="token operator">-&gt;</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;country_id&#39;</span><span class="token punctuation">,</span> <span class="token variable">$countryId</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="关联控制器集成"><a href="#关联控制器集成" class="header-anchor">#</a> 关联控制器集成</h2><p>如果控制器实现了<a href="./../../extend/forms/relation-controller.html">关联控制器行为</a>并且字段在那里定义，则将使用该定义来显示。将 <code>useController</code> 属性设置为 false 以禁用此功能。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">countries</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Categories
    <span class="token key atrule">type</span><span class="token punctuation">:</span> relation
    <span class="token key atrule">useController</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
</code></pre></div><p><code>controller</code> 属性可用于指定内联配置。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">products</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Products
    <span class="token key atrule">tab</span><span class="token punctuation">:</span> Products
    <span class="token key atrule">type</span><span class="token punctuation">:</span> relation
    <span class="token key atrule">controller</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Product
        <span class="token key atrule">list</span><span class="token punctuation">:</span> $/october/test/models/product/columns.yaml
        <span class="token key atrule">form</span><span class="token punctuation">:</span> $/october/test/models/product/fields.yaml
</code></pre></div>`,27))])}const v=o(u,[["render",d]]);export{f as __pageData,v as default};
