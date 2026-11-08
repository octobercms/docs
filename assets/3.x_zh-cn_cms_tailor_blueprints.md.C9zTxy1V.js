import{_ as o,r as n,o as l,c,e as t,a as p,s as r}from"./chunks/framework.CXcwiNg-.js";const f=JSON.parse('{"title":"蓝图 - October CMS - 3.x","titleTemplate":false,"description":"网站内容的模板结构。","frontmatter":{"subtitle":"网站内容的模板结构。"},"headers":[{"level":2,"title":"Entry","slug":"entry","link":"#entry","children":[{"level":3,"title":"Entry 变体","slug":"entry-变体","link":"#entry-变体","children":[{"level":4,"title":"单条目","slug":"单条目","link":"#单条目","children":[]},{"level":4,"title":"结构条目","slug":"结构条目","link":"#结构条目","children":[]},{"level":4,"title":"流条目","slug":"流条目","link":"#流条目","children":[]}]},{"level":3,"title":"内容组","slug":"内容组","link":"#内容组","children":[]},{"level":3,"title":"自定义消息","slug":"自定义消息","link":"#自定义消息","children":[]},{"level":3,"title":"禁用必填字段","slug":"禁用必填字段","link":"#禁用必填字段","children":[]},{"level":3,"title":"页面查找器配置","slug":"页面查找器配置","link":"#页面查找器配置","children":[]}]},{"level":2,"title":"Global","slug":"global","link":"#global","children":[]},{"level":2,"title":"Mixin","slug":"mixin","link":"#mixin","children":[{"level":3,"title":"使用混入","slug":"使用混入","link":"#使用混入","children":[{"level":4,"title":"另请参阅","slug":"另请参阅","link":"#另请参阅","children":[]}]}]}],"relativePath":"3.x/zh-cn/cms/tailor/blueprints.md","filePath":"3.x/zh-cn/cms/tailor/blueprints.md"}'),d={name:"3.x/zh-cn/cms/tailor/blueprints.md"};function u(i,a,k,g,y,m){const s=n("pre-heading"),e=n("post-heading");return l(),c("div",null,[t(s),a[0]||(a[0]=p("h1",null,"蓝图",-1)),t(e),a[1]||(a[1]=r(`<h2 id="entry"><a href="#entry" class="header-anchor">#</a> Entry</h2><p>Entry 蓝图是用于定义网站区域的标准内容结构。内容结构和条目可以通过不同的方式组织，我们在这里进行更详细的描述。</p><p><code>entry</code> 类型支持多个条目，当没有其他变体适用时应使用此类型。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">handle</span><span class="token punctuation">:</span> Team\\Member
<span class="token key atrule">type</span><span class="token punctuation">:</span> entry
<span class="token key atrule">name</span><span class="token punctuation">:</span> Team Member

<span class="token key atrule">fields</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> First Name
        <span class="token key atrule">type</span><span class="token punctuation">:</span> text
</code></pre></div><p>Entry 蓝图支持以下属性。</p><div class="table"><table tabindex="0"><thead><tr><th>属性</th><th>描述</th></tr></thead><tbody><tr><td><strong>handle</strong></td><td>用于标识条目的有意义且唯一的代码。</td></tr><tr><td><strong>type</strong></td><td>蓝图类型，可以是 <code>entry</code>、<code>single</code>、<code>structure</code> 或 <code>stream</code> 的变体。</td></tr><tr><td><strong>name</strong></td><td>处理此条目时显示的标签。</td></tr><tr><td><strong>fields</strong></td><td>属于该组的表单字段，参见<a href="./../../element/form-fields.html">后端表单字段</a>。</td></tr><tr><td><strong>groups</strong></td><td>引用一组表单字段，将条目置于分组模式（见下文）。</td></tr><tr><td><strong>structure</strong></td><td>使用 <code>structure</code> 类型时提供的结构配置。</td></tr><tr><td><strong>drafts</strong></td><td>为此条目启用草稿功能。默认值：<code>false</code></td></tr><tr><td><strong>softDeletes</strong></td><td>为此条目启用软删除。默认值：<code>true</code></td></tr><tr><td><strong>multisite</strong></td><td>为此条目启用多站点，在组、区域设置或所有站点之间同步记录。支持的值：<code>true</code>、<code>false</code>、<code>sync</code>、<code>locale</code>、<code>all</code>。默认值：<code>false</code></td></tr><tr><td><strong>pagefinder</strong></td><td>将蓝图类型包含在<a href="./../../element/form/widget-pagefinder.html">页面查找器表单小部件</a>中，支持的值：<code>true</code>、<code>false</code>、<code>item</code>、<code>list</code> 或数组（见下文）。默认值：<code>true</code></td></tr><tr><td><strong>defaultSort</strong></td><td>由 <code>entry</code> 和 <code>stream</code> 类型使用，当用户未定义偏好时设置默认排序列和方向。支持字符串或包含 <code>column</code> 和 <code>direction</code> 键的数组。方向可以是 <code>asc</code>（升序，默认）或 <code>desc</code>（降序）。</td></tr><tr><td><strong>customMessages</strong></td><td>自定义用户界面中使用的消息（见下文）。</td></tr><tr><td><strong>showExport</strong></td><td>显示用于导出记录的工具栏按钮。默认值：<code>true</code>。</td></tr><tr><td><strong>showImport</strong></td><td>显示用于导入记录的工具栏按钮。默认值：<code>true</code>。</td></tr></tbody></table></div><h3 id="entry-变体"><a href="#entry-变体" class="header-anchor">#</a> Entry 变体</h3><p>Entry 类型本身没有特定行为，但有几种变体可用于组织内容。以下类型是 Entry 的变体。</p><ul><li><strong>entry</strong> 是用于通用目的的基本条目。</li><li><strong>single</strong> 是具有专用字段的单条目，例如：联系我们页面。</li><li><strong>structure</strong> 是条目的定义结构，例如：文档页面。</li><li><strong>stream</strong> 是带时间戳的条目流，例如：博客文章。</li></ul><h4 id="单条目"><a href="#单条目" class="header-anchor">#</a> 单条目</h4><p><code>single</code> 类型将为每个部分定义强制使用单个条目。这对于一次性内容很有用，例如首页或联系我们页面。以下定义了一个带有欢迎信息（<code>welcome_message</code>）文本字段的 <strong>Homepage</strong> 部分。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">handle</span><span class="token punctuation">:</span> Homepage
<span class="token key atrule">type</span><span class="token punctuation">:</span> single
<span class="token key atrule">name</span><span class="token punctuation">:</span> Homepage Content

<span class="token key atrule">fields</span><span class="token punctuation">:</span>
    <span class="token key atrule">welcome_message</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Welcome Message
        <span class="token key atrule">type</span><span class="token punctuation">:</span> text
</code></pre></div><h4 id="结构条目"><a href="#结构条目" class="header-anchor">#</a> 结构条目</h4><p><code>structure</code> 类型允许多个结构化条目，支持父子关系。这对于嵌套内容很有用，例如文档部分。<code>structure</code> 类型的条目可排序，可以通过在列表视图中拖拽来调整排序顺序。以下定义了一个带有文章内容（<code>article_content</code>）markdown 字段的 <strong>Documentation</strong> 树形部分。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">handle</span><span class="token punctuation">:</span> Docs\\Article
<span class="token key atrule">type</span><span class="token punctuation">:</span> structure
<span class="token key atrule">name</span><span class="token punctuation">:</span> Documentation Article

<span class="token key atrule">fields</span><span class="token punctuation">:</span>
    <span class="token key atrule">content</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Article Content
        <span class="token key atrule">type</span><span class="token punctuation">:</span> markdown
</code></pre></div><p>默认情况下结构支持无限嵌套，但是您可以使用 <code>structure</code> 属性中的 <code>maxDepth</code> 来指定树的最大深度。在下一个示例中，只能有顶层和第二层。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token comment"># ...</span>
<span class="token key atrule">type</span><span class="token punctuation">:</span> structure

<span class="token key atrule">structure</span><span class="token punctuation">:</span>
    <span class="token key atrule">maxDepth</span><span class="token punctuation">:</span> <span class="token number">2</span>
    <span class="token comment"># ...</span>
</code></pre></div><p><code>structure</code> 属性支持以下值。</p><div class="table"><table tabindex="0"><thead><tr><th>属性</th><th>描述</th></tr></thead><tbody><tr><td><strong>maxDepth</strong></td><td>结构的最大深度。默认值：<code>0</code> 表示无限制。</td></tr><tr><td><strong>treeExpanded</strong></td><td>树节点是否默认展开。默认值：<code>true</code></td></tr><tr><td><strong>showReorder</strong></td><td>显示用于重新排序记录的界面。默认值：<code>true</code></td></tr><tr><td><strong>showSorting</strong></td><td>允许对记录排序，排序时禁用结构。默认值：<code>true</code></td></tr></tbody></table></div><h4 id="流条目"><a href="#流条目" class="header-anchor">#</a> 流条目</h4><p><code>stream</code> 类型用于基于时间的条目，通常按时间顺序列出。这对于发布最近活动很有用，例如博客部分。以下定义了一个带有文章内容（<code>content</code>）富文本编辑器字段的 <strong>Blog</strong> 信息流部分。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">handle</span><span class="token punctuation">:</span> Blog\\Post
<span class="token key atrule">type</span><span class="token punctuation">:</span> stream
<span class="token key atrule">name</span><span class="token punctuation">:</span> Blog Post

<span class="token key atrule">fields</span><span class="token punctuation">:</span>
    <span class="token key atrule">content</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Post Content
        <span class="token key atrule">type</span><span class="token punctuation">:</span> richeditor
</code></pre></div><p><code>defaultSort</code> 属性用于设置蓝图记录以列表形式显示时的默认排序列。默认情况下将设置为发布日期。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">handle</span><span class="token punctuation">:</span> Blog\\Post
<span class="token key atrule">type</span><span class="token punctuation">:</span> stream
<span class="token key atrule">name</span><span class="token punctuation">:</span> Blog Post

<span class="token key atrule">defaultSort</span><span class="token punctuation">:</span>
    <span class="token key atrule">column</span><span class="token punctuation">:</span> title
    <span class="token key atrule">direction</span><span class="token punctuation">:</span> asc
</code></pre></div><h3 id="内容组"><a href="#内容组" class="header-anchor">#</a> 内容组</h3><p>所有条目可选地支持为一个部分定义多个内容组。例如，博客部分可能有常规文章和精选文章，这是两个条目组。</p><p>条目组由部分蓝图文件中的 <strong>groups</strong> 属性定义，可以为每种类型指定不同的 <strong>fields</strong>。选定的组值可通过记录上的 <code>content_group</code> 属性获取。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">handle</span><span class="token punctuation">:</span> Blog\\Post
<span class="token key atrule">type</span><span class="token punctuation">:</span> stream
<span class="token key atrule">name</span><span class="token punctuation">:</span> Blog Post

<span class="token key atrule">groups</span><span class="token punctuation">:</span>
    <span class="token key atrule">regular_post</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> Regular Post
        <span class="token key atrule">fields</span><span class="token punctuation">:</span>
            <span class="token comment"># ...</span>

    <span class="token key atrule">featured_post</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> Featured Post
        <span class="token key atrule">fields</span><span class="token punctuation">:</span>
            <span class="token comment"># ...</span>
</code></pre></div><div class="custom-block tip"><p>建议使用<a href="#mixin">混入蓝图</a>来分组通用字段定义。</p></div><h3 id="自定义消息"><a href="#自定义消息" class="header-anchor">#</a> 自定义消息</h3><p>指定 <code>customMessages</code> 属性来覆盖界面使用的默认消息。值可以是纯文本或引用<a href="./../../extend/system/localization.html">本地化字符串</a>。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">customMessages</span><span class="token punctuation">:</span>
    <span class="token key atrule">buttonCreate</span><span class="token punctuation">:</span> Create New Event
</code></pre></div><p>以下是可作为自定义消息覆盖的可用消息。</p><details class="custom-block details"><summary>查看可用消息列表</summary><div class="table"><table tabindex="0"><thead><tr><th>消息</th><th>默认消息</th></tr></thead><tbody><tr><td><strong>buttonCreate</strong></td><td>Create :name Entry</td></tr><tr><td><strong>titleIndexList</strong></td><td>Manage :name Entries</td></tr><tr><td><strong>titleCreateForm</strong></td><td>Create :name</td></tr><tr><td><strong>titleUpdateForm</strong></td><td>Update :name</td></tr><tr><td><strong>pagefinderItemType</strong></td><td>:name Entry</td></tr><tr><td><strong>pagefinderListType</strong></td><td>All :name Entries</td></tr></tbody></table></div></details><h3 id="禁用必填字段"><a href="#禁用必填字段" class="header-anchor">#</a> 禁用必填字段</h3><p>条目记录要求在保存之前填写 <code>title</code> 和 <code>slug</code> 字段，此外 <code>slug</code> 字段还必须唯一。您可以通过在蓝图中覆盖这些字段来修改此功能。可以将 <code>validation</code> 属性设置为 <strong>false</strong>，或将 <code>hidden</code> 属性设置为 <strong>true</strong> 将其从用户界面中隐藏。以下示例将禁用两个字段的验证并隐藏 slug 字段。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">fields</span><span class="token punctuation">:</span>
    <span class="token key atrule">title</span><span class="token punctuation">:</span>
        <span class="token key atrule">validation</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>

    <span class="token key atrule">slug</span><span class="token punctuation">:</span>
        <span class="token key atrule">hidden</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre></div><h3 id="页面查找器配置"><a href="#页面查找器配置" class="header-anchor">#</a> 页面查找器配置</h3><p>默认情况下，所有条目都包含在<a href="./../../element/form/widget-pagefinder.html">页面查找器</a>查询值中。可以通过将 <strong>pagefinder</strong> 设置为 <code>false</code> 来禁用。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">pagefinder</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
</code></pre></div><p>您可以将页面查找器上下文限制为仅允许将页面作为单个 <code>item</code>（例如博客文章）或 <code>list</code> 项目列表（例如所有博客文章）来定位，或设置为 <code>all</code> 时将同时显示两者。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">pagefinder</span><span class="token punctuation">:</span> item
<span class="token key atrule">pagefinder</span><span class="token punctuation">:</span> list
</code></pre></div><p>页面查找器将自动解析 <code>id</code>、<code>code</code>、<code>slug</code> 和 <code>fullslug</code> 属性，并将它们用作<a href="./../themes/pages.html">页面 URL 参数</a>中的替换值。您可以使用 <strong>pagefinder</strong> 属性将自定义 <strong>replacements</strong> 指定为数组，包括上述可选的 <strong>context</strong>。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">pagefinder</span><span class="token punctuation">:</span>
    <span class="token key atrule">context</span><span class="token punctuation">:</span> list
    <span class="token key atrule">replacements</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
</code></pre></div><p>每个替换键应匹配一个 URL 参数名称，并使用点表示法路径指向属性值。以下是博客文章页面的 URL 示例。</p><div class="language-ini extra-class"><pre class="language-ini"><code><span class="token key attr-name">url</span> <span class="token punctuation">=</span> <span class="token value attr-value">&quot;<span class="token inner-value">/blog/post/:author/:category/:slug/:id</span>&quot;</span>
</code></pre></div><p>以下 <strong>replacements</strong> 将把 <code>:author</code> 参数设置为关联作者的 slug 属性值，并将 <code>:category</code> 参数设置为第一个关联分类的 slug 属性值。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">pagefinder</span><span class="token punctuation">:</span>
    <span class="token key atrule">replacements</span><span class="token punctuation">:</span>
        <span class="token key atrule">author</span><span class="token punctuation">:</span> author.slug
        <span class="token key atrule">category</span><span class="token punctuation">:</span> categories.0.slug
</code></pre></div><h2 id="global"><a href="#global" class="header-anchor">#</a> Global</h2><p>Global 用于定义网站的全局可用内容。字段值通常在 <a href="./../../cms/themes/layouts.html">CMS 布局</a>中使用，包含社交网络链接等设置。</p><p>以下定义了一个带有 Facebook 链接（<code>facebook_link</code>）文本字段的 <strong>Footer Config</strong> 全局。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">handle</span><span class="token punctuation">:</span> Site\\Footer
<span class="token key atrule">type</span><span class="token punctuation">:</span> global
<span class="token key atrule">name</span><span class="token punctuation">:</span> Footer Config

<span class="token key atrule">fields</span><span class="token punctuation">:</span>
    <span class="token key atrule">facebook_link</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Facebook Link
        <span class="token key atrule">type</span><span class="token punctuation">:</span> text
</code></pre></div><p>Global 蓝图支持以下属性。</p><div class="table"><table tabindex="0"><thead><tr><th>属性</th><th>描述</th></tr></thead><tbody><tr><td><strong>handle</strong></td><td>用于标识条目的有意义且唯一的代码。</td></tr><tr><td><strong>name</strong></td><td>处理此条目时显示的标签。</td></tr><tr><td><strong>fields</strong></td><td>属于该组的表单字段，参见<a href="./../../element/form-fields.html">后端表单字段</a>。</td></tr><tr><td><strong>multisite</strong></td><td>为此条目启用多站点，支持的值：<code>true</code>、<code>false</code>。默认值：<code>false</code></td></tr><tr><td><strong>formSize</strong></td><td>设置表单大小，支持的值：<code>tiny</code>、<code>small</code>、<code>medium</code>、<code>large</code>、<code>huge</code>、<code>giant</code>、<code>adaptive</code>。默认值：<code>huge</code>。</td></tr></tbody></table></div><h2 id="mixin"><a href="#mixin" class="header-anchor">#</a> Mixin</h2><p>Mixin 是一组字段，用于在定义内容结构时避免重复。例如，Location 字段可能在多个地方使用，但我们可以使用混入定义只定义一次。</p><p>以下定义了一个带有国家（<code>country_code</code>）和州/省（<code>state_code</code>）文本字段的 <strong>Location</strong> 集合。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">handle</span><span class="token punctuation">:</span> Fields\\Location
<span class="token key atrule">type</span><span class="token punctuation">:</span> mixin
<span class="token key atrule">name</span><span class="token punctuation">:</span> Location

<span class="token key atrule">fields</span><span class="token punctuation">:</span>
    <span class="token key atrule">country_code</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Country
        <span class="token key atrule">type</span><span class="token punctuation">:</span> text

    <span class="token key atrule">state_code</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> State
        <span class="token key atrule">type</span><span class="token punctuation">:</span> text
</code></pre></div><p>Mixin 蓝图支持以下属性。</p><div class="table"><table tabindex="0"><thead><tr><th>属性</th><th>描述</th></tr></thead><tbody><tr><td><strong>handle</strong></td><td>用于标识条目的有意义且唯一的代码。</td></tr><tr><td><strong>name</strong></td><td>处理此条目时显示的标签。</td></tr><tr><td><strong>fields</strong></td><td>属于该组的表单字段，参见<a href="./../../element/form-fields.html">后端表单字段</a>。</td></tr></tbody></table></div><div class="custom-block tip"><p>建议在混入文件和字段名称前加下划线（_），以便于识别蓝图类型。例如：<code>_location_fields.yaml</code></p></div><h3 id="使用混入"><a href="#使用混入" class="header-anchor">#</a> 使用混入</h3><p>要在条目中包含这些字段，与任何其他表单字段一样，使用 <strong>mixin</strong> 类型并在 <code>source</code> 属性中引用 UUID 或 handle。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">_location_fields</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> mixin
    <span class="token key atrule">source</span><span class="token punctuation">:</span> Fields\\Location
</code></pre></div><p>有关使用混入的更多信息，请参阅<a href="./../../element/content/field-mixin.html">混入字段</a>。</p><h4 id="另请参阅"><a href="#另请参阅" class="header-anchor">#</a> 另请参阅</h4><div class="custom-block also"><ul><li><a href="./../../element/content/field-mixin.html">混入内容字段</a></li></ul></div>`,67))])}const v=o(d,[["render",u]]);export{f as __pageData,v as default};
