import{_ as o,r as a,o as p,c,e as s,a as l,s as r}from"./chunks/framework.CXcwiNg-.js";const h=JSON.parse('{"title":"定义导航 - October CMS - 3.x","titleTemplate":false,"description":"用于在管理面板中管理内容的菜单项。","frontmatter":{"subtitle":"用于在管理面板中管理内容的菜单项。"},"headers":[{"level":2,"title":"额外导航","slug":"额外导航","link":"#额外导航","children":[{"level":4,"title":"另请参阅","slug":"另请参阅","link":"#另请参阅","children":[]}]}],"relativePath":"3.x/zh-cn/cms/tailor/navigation.md","filePath":"3.x/zh-cn/cms/tailor/navigation.md"}'),u={name:"3.x/zh-cn/cms/tailor/navigation.md"};function i(k,n,d,g,y,m){const t=a("pre-heading"),e=a("post-heading");return p(),c("div",null,[s(t),n[0]||(n[0]=l("h1",null,"定义导航",-1)),s(e),n[1]||(n[1]=r(`<p>在后端区域，条目将列在&quot;内容&quot;菜单项下，全局则列在&quot;设置&quot;菜单项下（默认情况下）。您可以使用蓝图文件中的 <strong>navigation</strong> 属性来控制此行为。以下代码将设置图标并指定显示顺序。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">navigation</span><span class="token punctuation">:</span>
    <span class="token key atrule">icon</span><span class="token punctuation">:</span> icon<span class="token punctuation">-</span>pencil
    <span class="token key atrule">order</span><span class="token punctuation">:</span> <span class="token number">200</span>
</code></pre></div><p><code>navigation</code> 和 <code>primaryNavigation</code> 定义支持以下属性。</p><div class="table"><table tabindex="0"><thead><tr><th>属性</th><th>描述</th></tr></thead><tbody><tr><td><strong>label</strong></td><td>指定菜单标签本地化字符串键，必填。</td></tr><tr><td><strong>order</strong></td><td>确定显示顺序时的数值权重。</td></tr><tr><td><strong>parent</strong></td><td>使用蓝图 handle 将导航项链接到父项。</td></tr><tr><td><strong>icon</strong></td><td>来自 <a href="./../../element/available-icons.html">October CMS 图标集合</a>的图标名称，可选。</td></tr><tr><td><strong>iconSvg</strong></td><td>用于替代标准图标的 SVG 图标，SVG 图标应为矩形且可支持颜色，可选。</td></tr></tbody></table></div><p>要将项目放置在&quot;设置&quot;区域，请将 <strong>parent</strong> 设置为 <code>settings</code>。<strong>category</strong> 定义可以是字符串或设置常量引用，例如 <code>CATEGORY_COLLECTIONS</code>。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">navigation</span><span class="token punctuation">:</span>
    <span class="token key atrule">parent</span><span class="token punctuation">:</span> settings
    <span class="token key atrule">category</span><span class="token punctuation">:</span> Collections
</code></pre></div><p>要将项目放置在&quot;内容&quot;区域，请将 <strong>parent</strong> 设置为 <code>content</code>。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">navigation</span><span class="token punctuation">:</span>
    <span class="token key atrule">parent</span><span class="token punctuation">:</span> content
</code></pre></div><p>要将项目放置为主导航项，需要 <strong>primaryNavigation</strong> 定义。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">primaryNavigation</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Blog
    <span class="token key atrule">icon</span><span class="token punctuation">:</span> icon<span class="token punctuation">-</span>copy
    <span class="token key atrule">order</span><span class="token punctuation">:</span> <span class="token number">500</span>

<span class="token key atrule">navigation</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Main Menu Item
</code></pre></div><p>要将项目放置为二级导航项，<strong>parent</strong> 属性应指定主导航项的 UUID 或 handle。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">navigation</span><span class="token punctuation">:</span>
    <span class="token key atrule">parent</span><span class="token punctuation">:</span> &lt;handle<span class="token punctuation">|</span>uuid<span class="token punctuation">&gt;</span>
</code></pre></div><p>要禁用二级导航，请为单个蓝图定义 <strong>primaryNavigation</strong>，而不使其成为任何其他蓝图的父级。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">primaryNavigation</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Page
    <span class="token key atrule">icon</span><span class="token punctuation">:</span> icon<span class="token punctuation">-</span>magic
    <span class="token key atrule">order</span><span class="token punctuation">:</span> <span class="token number">500</span>
</code></pre></div><p>您也可以通过将 <strong>navigation</strong> 属性设置为 <code>false</code> 来完全禁用导航。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">navigation</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
</code></pre></div><h2 id="额外导航"><a href="#额外导航" class="header-anchor">#</a> 额外导航</h2><p>使用 <code>extraNavigation</code> 属性来注册要包含在蓝图中的自定义导航项。该值是一个数组，匹配<a href="./../../extend/backend/navigation.html">后端导航规范</a>中的 <code>sideMenu</code> 定义。以下示例使用自定义显示类型包含两个部分和分隔线，<code>order</code> 属性用于按正确顺序排列项目。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">navigation</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Authors
    <span class="token key atrule">parent</span><span class="token punctuation">:</span> Blog\\Post
    <span class="token key atrule">icon</span><span class="token punctuation">:</span> icon<span class="token punctuation">-</span>user
    <span class="token key atrule">order</span><span class="token punctuation">:</span> <span class="token number">230</span>

<span class="token key atrule">extraNavigation</span><span class="token punctuation">:</span>
    <span class="token key atrule">_authors_section</span><span class="token punctuation">:</span>
        <span class="token key atrule">itemType</span><span class="token punctuation">:</span> section
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Authors
        <span class="token key atrule">order</span><span class="token punctuation">:</span> <span class="token number">210</span>

    <span class="token key atrule">_authors_ruler</span><span class="token punctuation">:</span>
        <span class="token key atrule">itemType</span><span class="token punctuation">:</span> ruler
        <span class="token key atrule">order</span><span class="token punctuation">:</span> <span class="token number">220</span>
</code></pre></div><p>您还可以通过指定 <code>url</code> 属性来注册指向<a href="./../../extend/system/controllers.html">插件引入的控制器</a>的链接。此属性应设置为控制器 URL，以下链接到 <strong>acme/blog/posts</strong> 控制器。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">navigation</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Authors
    <span class="token comment"># ...</span>

<span class="token key atrule">extraNavigation</span><span class="token punctuation">:</span>
    <span class="token key atrule">testimonials</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Testimonials
        <span class="token key atrule">order</span><span class="token punctuation">:</span> <span class="token number">210</span>
        <span class="token key atrule">icon</span><span class="token punctuation">:</span> icon<span class="token punctuation">-</span>group
        <span class="token key atrule">url</span><span class="token punctuation">:</span> acme/blog/posts
</code></pre></div><p>要在控制器内设置导航上下文，请在 <code>BackendMenu</code> 门面上使用 <code>setTailorContext</code> 方法。您也可以使用 <code>setTailorContextUuid</code> 方法指定蓝图 <code>uuid</code>。该方法接受蓝图的 <code>handle</code> 或 <code>uuid</code>（第一个参数）以及额外导航项使用的键（第二个参数）。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token class-name static-context">BackendMenu</span><span class="token operator">::</span><span class="token function">setTailorContext</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;Blog\\Post&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;testimonials&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name static-context">BackendMenu</span><span class="token operator">::</span><span class="token function">setTailorContextUuid</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;edcd102e-0525-4e4d-b07e-633ae6c18db6&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;testimonials&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="另请参阅"><a href="#另请参阅" class="header-anchor">#</a> 另请参阅</h4><div class="custom-block also"><ul><li><a href="./../../extend/backend/navigation.html">后端导航</a></li></ul></div>`,25))])}const b=o(u,[["render",i]]);export{h as __pageData,b as default};
