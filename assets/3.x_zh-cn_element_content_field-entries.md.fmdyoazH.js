import{_ as o,r as s,o as p,c as l,e as n,a as c,s as r}from"./chunks/framework.CXcwiNg-.js";const v=JSON.parse('{"title":"Entries 字段 - October CMS - 3.x","titleTemplate":false,"description":"内容字段","frontmatter":{"subtitle":"内容字段","shortname":"Entries"},"headers":[{"level":2,"title":"应用条件","slug":"应用条件","link":"#应用条件","children":[{"level":3,"title":"SQL 查询条件","slug":"sql-查询条件","link":"#sql-查询条件","children":[]},{"level":3,"title":"PHP 查询范围","slug":"php-查询范围","link":"#php-查询范围","children":[]}]},{"level":2,"title":"定义反向关系","slug":"定义反向关系","link":"#定义反向关系","children":[]},{"level":2,"title":"列表列显示","slug":"列表列显示","link":"#列表列显示","children":[{"level":3,"title":"显示为计数器","slug":"显示为计数器","link":"#显示为计数器","children":[]}]},{"level":2,"title":"高级记录管理","slug":"高级记录管理","link":"#高级记录管理","children":[{"level":4,"title":"另请参阅","slug":"另请参阅","link":"#另请参阅","children":[]}]}],"relativePath":"3.x/zh-cn/element/content/field-entries.md","filePath":"3.x/zh-cn/element/content/field-entries.md"}'),u={name:"3.x/zh-cn/element/content/field-entries.md"};function i(d,a,k,g,y,h){const e=s("pre-heading"),t=s("post-heading");return p(),l("div",null,[n(e),a[0]||(a[0]=c("h1",null,"Entries 字段",-1)),n(t),a[1]||(a[1]=r(`<p><code>entries</code> - 通过 UUID 或 handle 链接到其他条目。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">author</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Author
    <span class="token key atrule">type</span><span class="token punctuation">:</span> entries
    <span class="token key atrule">source</span><span class="token punctuation">:</span> &lt;uuid<span class="token punctuation">|</span>handle<span class="token punctuation">&gt;</span>
</code></pre></div><p>支持以下属性。</p><div class="table"><table tabindex="0"><thead><tr><th>属性</th><th>描述</th></tr></thead><tbody><tr><td><strong>source</strong></td><td>关联的蓝图 UUID 或 handle 名称。</td></tr><tr><td><strong>maxItems</strong></td><td>限制可以选择的条目数量。</td></tr><tr><td><strong>displayMode</strong></td><td>修改字段的显示方式。支持的值：<code>relation</code>、<code>recordfinder</code>、<code>taglist</code>、<code>controller</code>。默认值：<code>relation</code>。</td></tr><tr><td><strong>conditions</strong></td><td>指定应用于模型查询的原始 where 查询语句。</td></tr><tr><td><strong>modelScope</strong></td><td>将<a href="./../../extend/database/model.html">模型查询范围</a>方法应用于<strong>关联表单模型</strong>，可以是模型方法名或静态 PHP 类方法（<code>Class::method</code>）。</td></tr><tr><td><strong>inverse</strong></td><td>当定义为反向关系时，源蓝图中关联字段的名称。</td></tr></tbody></table></div><p>要限制可选择项目的数量，请使用 <code>maxItems</code> 属性。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">author</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> entries
    <span class="token key atrule">maxItems</span><span class="token punctuation">:</span> <span class="token number">1</span>
</code></pre></div><p>要显示记录查找器而不是典型控件，请使用 <code>displayMode</code> 属性。此模式仅在可选择一个项目时可用。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">author</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> entries
    <span class="token key atrule">displayMode</span><span class="token punctuation">:</span> recordfinder
</code></pre></div><p>当有多个项目可用时，<code>displayMode</code> 支持使用标签列表选择项目。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">author</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> entries
    <span class="token key atrule">displayMode</span><span class="token punctuation">:</span> taglist
</code></pre></div><h2 id="应用条件"><a href="#应用条件" class="header-anchor">#</a> 应用条件</h2><p>您可以使用以下方法通过 SQL 或 PHP 限制关联查询。在示例中，关联记录有一个名为 <code>is_featured</code> 的字段，渲染为复选框。我们可以将关联记录限制为仅那些已标记此复选框的记录。</p><h3 id="sql-查询条件"><a href="#sql-查询条件" class="header-anchor">#</a> SQL 查询条件</h3><p>您可以使用 <code>conditions</code> 属性通过原始 SQL 查询限制关联模型。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">categories</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Categories
    <span class="token key atrule">type</span><span class="token punctuation">:</span> entries
    <span class="token key atrule">source</span><span class="token punctuation">:</span> Blog\\Category
    <span class="token key atrule">conditions</span><span class="token punctuation">:</span> is_featured = true
</code></pre></div><h3 id="php-查询范围"><a href="#php-查询范围" class="header-anchor">#</a> PHP 查询范围</h3><p>您可以使用 <code>scope</code> 属性通过 PHP 方法限制关联查询。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">basic_entries</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Basic Entry
    <span class="token key atrule">type</span><span class="token punctuation">:</span> entries
    <span class="token key atrule">source</span><span class="token punctuation">:</span> Basic\\Entry
    <span class="token key atrule">scope</span><span class="token punctuation">:</span> App\\Classes\\ScopeHelper<span class="token punctuation">:</span><span class="token punctuation">:</span>applyScope
</code></pre></div><p>这将引用 <code>App\\Classes\\ScopeHelper</code> 类，该类可能是位于 <strong>app/classes/ScopeHelper.php</strong> 的文件，例如。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">namespace</span> <span class="token package">App<span class="token punctuation">\\</span>Classes</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">ScopeHelper</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">function</span> <span class="token function-definition function">applyScope</span><span class="token punctuation">(</span><span class="token variable">$query</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token variable">$query</span><span class="token operator">-&gt;</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;is_featured&#39;</span><span class="token punctuation">,</span> <span class="token constant boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="定义反向关系"><a href="#定义反向关系" class="header-anchor">#</a> 定义反向关系</h2><p>在某些情况下，您可能希望反向访问关系，例如查找属于某个类别的所有文章。<code>inverse</code> 属性可用于在相反方向链接关系，其中属性值设置为源蓝图中的字段名称。</p><p>例如，如果 <strong>Blog\\Post</strong> 蓝图已经定义了 <code>categories</code> 关系。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">categories</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> entries
    <span class="token key atrule">source</span><span class="token punctuation">:</span> Blog\\Category
</code></pre></div><p><strong>Blog\\Category</strong> 蓝图可以包含一个 <code>posts</code> 字段，作为源蓝图（上方）中 <code>categories</code> 字段的 <code>inverse</code>。可以通过将 <code>hidden</code> 值设置为 <code>true</code> 来从表单中排除该字段，这是可选的。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">posts</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> entries
    <span class="token key atrule">source</span><span class="token punctuation">:</span> Blog\\Post
    <span class="token key atrule">inverse</span><span class="token punctuation">:</span> categories
    <span class="token key atrule">hidden</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre></div><h2 id="列表列显示"><a href="#列表列显示" class="header-anchor">#</a> 列表列显示</h2><p>默认情况下，entries 字段将显示为指向关联记录的超链接。</p><h3 id="显示为计数器"><a href="#显示为计数器" class="header-anchor">#</a> 显示为计数器</h3><p>要将列表列显示为关联记录的计数器，您可以使用以下<a href="./../list-columns.html">列配置</a>。<code>relation</code> 属性应设置为字段名称，<code>relationCount</code> 设置为 <code>true</code>，列类型为 <code>number</code>。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">categories</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Categories
    <span class="token key atrule">type</span><span class="token punctuation">:</span> entries
    <span class="token comment"># ...</span>
    <span class="token key atrule">column</span><span class="token punctuation">:</span>
        <span class="token key atrule">relation</span><span class="token punctuation">:</span> categories
        <span class="token key atrule">relationCount</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
        <span class="token key atrule">type</span><span class="token punctuation">:</span> number
</code></pre></div><h2 id="高级记录管理"><a href="#高级记录管理" class="header-anchor">#</a> 高级记录管理</h2><p>要在表单中创建、更新和删除项目，请将 <code>displayMode</code> 设置为 controller 以显示高级管理模式，由<a href="./../../extend/forms/relation-controller.html">关联控制器行为</a>提供支持。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">author</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> entries
    <span class="token key atrule">displayMode</span><span class="token punctuation">:</span> controller
</code></pre></div><p>如果蓝图将 <code>navigation</code> 设置为 <code>false</code>，则默认按钮将显示 <strong>Create</strong> 和 <strong>Delete</strong>。如果定义了导航，则按钮显示 <strong>Add</strong> 和 <strong>Remove</strong>。您可以使用 <code>toolbarButtons</code> 属性自定义按钮。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">author</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> entries
    <span class="token key atrule">toolbarButtons</span><span class="token punctuation">:</span> create<span class="token punctuation">|</span>add<span class="token punctuation">|</span>remove<span class="token punctuation">|</span>delete
</code></pre></div><p>关联控制器中使用的各种消息取自源蓝图的 <code>customMessages</code> 属性，您也可以使用字段定义上的 <code>customMessages</code> 进行修改。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">author</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> entries
    <span class="token key atrule">customMessages</span><span class="token punctuation">:</span>
        <span class="token key atrule">buttonCreate</span><span class="token punctuation">:</span> New Author
        <span class="token key atrule">titleUpdateForm</span><span class="token punctuation">:</span> Update Author
        <span class="token key atrule">titleCreateForm</span><span class="token punctuation">:</span> Create Author
</code></pre></div><h4 id="另请参阅"><a href="#另请参阅" class="header-anchor">#</a> 另请参阅</h4><div class="custom-block also"><ul><li><a href="./field-nesteditems.html">嵌套项目内容字段</a></li></ul></div>`,40))])}const f=o(u,[["render",i]]);export{v as __pageData,f as default};
