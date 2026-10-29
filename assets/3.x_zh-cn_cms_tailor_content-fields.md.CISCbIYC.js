import{_ as l,r as s,o,c as p,e as n,a as c,s as r}from"./chunks/framework.CXcwiNg-.js";const f=JSON.parse('{"title":"内容字段 - October CMS - 3.x","titleTemplate":false,"description":"从定义内容的表单字段开始。","frontmatter":{"subtitle":"从定义内容的表单字段开始。"},"headers":[{"level":2,"title":"列表和过滤器属性","slug":"列表和过滤器属性","link":"#列表和过滤器属性","children":[{"level":3,"title":"字段配置","slug":"字段配置","link":"#字段配置","children":[]},{"level":3,"title":"外部配置","slug":"外部配置","link":"#外部配置","children":[]}]},{"level":2,"title":"表单字段验证","slug":"表单字段验证","link":"#表单字段验证","children":[]},{"level":2,"title":"修改核心字段","slug":"修改核心字段","link":"#修改核心字段","children":[{"level":4,"title":"另请参阅","slug":"另请参阅","link":"#另请参阅","children":[]}]}],"relativePath":"3.x/zh-cn/cms/tailor/content-fields.md","filePath":"3.x/zh-cn/cms/tailor/content-fields.md"}'),d={name:"3.x/zh-cn/cms/tailor/content-fields.md"};function u(i,a,k,m,g,y){const e=s("pre-heading"),t=s("post-heading");return o(),p("div",null,[n(e),a[0]||(a[0]=c("h1",null,"内容字段",-1)),n(t),a[1]||(a[1]=r(`<div class="custom-block aside"><p>您可以通过<a href="./../../extend/tailor-fields.html">扩展 Tailor</a> 来构建自定义内容字段。</p></div><p>内容字段是 Tailor 模块的基石，定义了字段应如何配置和显示。这些定义通常位于蓝图的 <strong>fields</strong> 属性下。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">fields</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Full Name
        <span class="token key atrule">type</span><span class="token punctuation">:</span> text
</code></pre></div><div class="custom-block tip"><p>可在<a href="./../../element/form-fields.html">后端元素部分</a>找到可用字段的完整列表。</p></div><p>对于每个字段，您可以在适用的情况下指定以下通用属性。</p><div class="table"><table tabindex="0"><thead><tr><th>属性</th><th>描述</th></tr></thead><tbody><tr><td><strong>label</strong></td><td>向用户显示表单字段时使用的名称。</td></tr><tr><td><strong>shortLabel</strong></td><td>在列表和过滤器中使用的较短标签。</td></tr><tr><td><strong>type</strong></td><td>定义此字段的渲染方式，参见<a href="./../../element/form-fields.html">表单字段定义</a>。默认值：text。</td></tr><tr><td><strong>span</strong></td><td>将表单字段对齐到一侧。选项：auto、left、right、row、full、adaptive。默认值：<code>full</code>。</td></tr><tr><td><strong>spanClass</strong></td><td>与 span <code>row</code> 选项一起使用，将表单显示为 Bootstrap 网格，例如 <code>spanClass: col-4</code>。</td></tr><tr><td><strong>size</strong></td><td>为使用它的字段指定字段大小，例如 textarea 字段。</td></tr><tr><td><strong>placeholder</strong></td><td>如果字段支持占位符值。</td></tr><tr><td><strong>comment</strong></td><td>在字段下方放置描述性注释。</td></tr><tr><td><strong>commentAbove</strong></td><td>在字段上方放置注释。</td></tr><tr><td><strong>commentHtml</strong></td><td>允许注释中使用 HTML 标记。默认值：<code>false</code>。</td></tr><tr><td><strong>default</strong></td><td>指定字段的默认值。对于 <code>dropdown</code>、<code>checkboxlist</code>、<code>radio</code> 和 <code>balloon-selector</code> 小部件，您可以在此指定一个选项键使其默认被选中。</td></tr><tr><td><strong>tab</strong></td><td>将字段分配到选项卡。</td></tr><tr><td><strong>validation</strong></td><td>定义表单字段的验证规则，参见<a href="./../../extend/services/validation.html">验证文章</a>了解规则定义。</td></tr><tr><td><strong>trigger</strong></td><td>使用<a href="./../../element/form-fields.html">触发器事件</a>为此字段指定条件。</td></tr><tr><td><strong>preset</strong></td><td>允许字段值由另一个字段的值初始设置，通过<a href="./../../element/form-fields.html">输入预设转换器</a>进行转换。</td></tr><tr><td><strong>translatable</strong></td><td>在蓝图定义中使用 <code>multisite</code> 时禁用此字段的翻译。</td></tr></tbody></table></div><h2 id="列表和过滤器属性"><a href="#列表和过滤器属性" class="header-anchor">#</a> 列表和过滤器属性</h2><p>在列表或过滤器中显示字段时，每个字段都有自己的默认设置。您可以按字段覆盖这些设置，这适合进行小的调整。对于更复杂的用例，我们建议将列和范围与字段分开定义（见下文）。</p><div class="table"><table tabindex="0"><thead><tr><th>属性</th><th>描述</th></tr></thead><tbody><tr><td><strong>column</strong></td><td>定义字段在列表中的显示方式，参见<a href="./../../element/list-columns.html">列表列定义</a>。</td></tr><tr><td><strong>scope</strong></td><td>定义字段在过滤器中的显示方式，参见<a href="./../../element/filter-scopes.html">过滤器范围定义</a>。</td></tr></tbody></table></div><h3 id="字段配置"><a href="#字段配置" class="header-anchor">#</a> 字段配置</h3><p>例如，可以使用字段的 <code>column</code> 或 <code>scope</code> 属性为每个指定不同的标签。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">myfield</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Form Label
    <span class="token key atrule">column</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> List Label
    <span class="token key atrule">scope</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Filter Label
</code></pre></div><p>如果将它们设置为 <code>false</code>，则字段将被禁用并阻止其显示。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">myfield</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Form Label
    <span class="token key atrule">column</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
    <span class="token key atrule">scope</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
</code></pre></div><p><code>column</code> 类型可以设置为 <code>invisible</code>，使其默认从列表中隐藏。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">myfield</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Form Label
    <span class="token key atrule">column</span><span class="token punctuation">:</span> invisible
</code></pre></div><h3 id="外部配置"><a href="#外部配置" class="header-anchor">#</a> 外部配置</h3><p>您可以使用蓝图中的 <code>columns</code> 和 <code>scopes</code> 属性将范围和列与表单字段分开定义。使用外部配置时，默认视图将被替换为仅已定义的字段。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">scopes</span><span class="token punctuation">:</span>
    <span class="token key atrule">myfield</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Filter Label
        <span class="token comment"># [...]</span>

<span class="token key atrule">columns</span><span class="token punctuation">:</span>
    <span class="token key atrule">myfield</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> List Label
        <span class="token comment"># [...]</span>

<span class="token key atrule">fields</span><span class="token punctuation">:</span>
    <span class="token key atrule">myfield</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Form Label
        <span class="token comment"># [...]</span>
</code></pre></div><div class="custom-block tip"><p><strong>columns</strong> 或 <strong>scopes</strong> 定义要有效，必须存在 <strong>fields</strong> 定义。要从表单中隐藏定义，使用 <code>hidden: true</code> 将其从表单中隐藏，然后使用 <code>hidden: false</code> 在列或范围中显示。</p></div><p>列表列有可以使用的简写值。传递字符串将替换标签，传递 <code>true</code> 将包含默认列，传递 <code>false</code> 将移除该列，传递 <code>invisible</code> 将使该列不可见。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">columns</span><span class="token punctuation">:</span>
    <span class="token key atrule">myfield</span><span class="token punctuation">:</span> List Label   <span class="token comment"># 新标签</span>
    <span class="token key atrule">myfield</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>         <span class="token comment"># 显示</span>
    <span class="token key atrule">myfield</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>        <span class="token comment"># 隐藏</span>
    <span class="token key atrule">myfield</span><span class="token punctuation">:</span> invisible    <span class="token comment"># 不可见</span>
    <span class="token key atrule">myfield</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">...</span><span class="token punctuation">]</span>        <span class="token comment"># 配置数组</span>
</code></pre></div><p>过滤器范围与列表列有类似的简写值。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">scopes</span><span class="token punctuation">:</span>
    <span class="token key atrule">myfield</span><span class="token punctuation">:</span> Filter Label <span class="token comment"># 新标签</span>
    <span class="token key atrule">myfield</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>         <span class="token comment"># 显示</span>
    <span class="token key atrule">myfield</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>        <span class="token comment"># 隐藏</span>
    <span class="token key atrule">myfield</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">...</span><span class="token punctuation">]</span>        <span class="token comment"># 配置数组</span>
</code></pre></div><h2 id="表单字段验证"><a href="#表单字段验证" class="header-anchor">#</a> 表单字段验证</h2><p>您可以使用 <code>validation</code> 字段属性为表单字段指定验证规则，参见<a href="./../../extend/services/validation.html">验证文章</a>了解规则定义。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">fields</span><span class="token punctuation">:</span>
    <span class="token key atrule">myfield</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Featured Text
        <span class="token key atrule">validation</span><span class="token punctuation">:</span> <span class="token string">&quot;required|min:15&quot;</span>
</code></pre></div><p>验证规则也可以在蓝图文件中使用 <code>validation</code> 蓝图属性进行外部定义。这允许您设置自定义属性名称和验证消息。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">validation</span><span class="token punctuation">:</span>
    <span class="token key atrule">rules</span><span class="token punctuation">:</span>
        <span class="token key atrule">myfield</span><span class="token punctuation">:</span> <span class="token string">&quot;required|min:15&quot;</span>
    <span class="token key atrule">attributeNames</span><span class="token punctuation">:</span>
        <span class="token key atrule">myfield</span><span class="token punctuation">:</span> My Field
    <span class="token key atrule">customMessages</span><span class="token punctuation">:</span>
        <span class="token key atrule">myfield.min</span><span class="token punctuation">:</span> <span class="token string">&quot;My field has to be at least 15 characters long&quot;</span>

<span class="token key atrule">fields</span><span class="token punctuation">:</span>
    <span class="token key atrule">myfield</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Form Label
        <span class="token comment"># [...]</span>
</code></pre></div><p><code>unique</code> 验证规则会自动配置，不需要指定表名。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">unique_field</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Unique Field
    <span class="token key atrule">validation</span><span class="token punctuation">:</span> unique
</code></pre></div><p><code>required</code> 验证规则支持 <strong>create</strong> 和 <strong>update</strong> 修饰符，分别仅在模型创建或更新时应用。以下规则仅在模型尚不存在时为必填。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">password</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Password
    <span class="token key atrule">validation</span><span class="token punctuation">:</span> <span class="token string">&quot;required:create&quot;</span>
</code></pre></div><h2 id="修改核心字段"><a href="#修改核心字段" class="header-anchor">#</a> 修改核心字段</h2><p>每个蓝图记录都有几个核心字段，由<a href="./models.html">模型上的属性定义</a>。您可以在特定条件下修改这些字段。</p><p>Entry 默认为启用状态；但是您可以通过为 <code>is_enabled</code> 字段指定新的默认值来修改此行为。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">fields</span><span class="token punctuation">:</span>
    <span class="token key atrule">is_enabled</span><span class="token punctuation">:</span>
        <span class="token key atrule">default</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
</code></pre></div><p><code>title</code> 字段的占位符是根据蓝图名称生成的；但是您可以根据用例将其自定义为更有用的内容。例如，<em>名字和姓氏</em>、<em>活动标题</em> 或 <em>地点名称</em>。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">fields</span><span class="token punctuation">:</span>
    <span class="token key atrule">title</span><span class="token punctuation">:</span>
        <span class="token key atrule">placeholder</span><span class="token punctuation">:</span> Event Title
</code></pre></div><p>在某些情况下，<code>title</code> 字段可能不是必需的，例如使用<a href="./blueprints.html">单条目蓝图</a>时，您可以将 <code>hidden</code> 属性设置为 <code>true</code>。隐藏标题将禁用此字段的内置验证。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">fields</span><span class="token punctuation">:</span>
    <span class="token key atrule">title</span><span class="token punctuation">:</span>
        <span class="token key atrule">hidden</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre></div><h4 id="另请参阅"><a href="#另请参阅" class="header-anchor">#</a> 另请参阅</h4><div class="custom-block also"><ul><li><a href="./../../element/form-fields.html">定义表单字段</a></li><li><a href="./../../extend/tailor-fields.html">构建 Tailor 字段</a></li></ul></div>`,43))])}const v=l(d,[["render",u]]);export{f as __pageData,v as default};
