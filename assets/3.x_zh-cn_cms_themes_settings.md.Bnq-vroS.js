import{_ as p,r as n,o,c as l,e as a,a as c,s as r}from"./chunks/framework.CXcwiNg-.js";const v=JSON.parse('{"title":"主题设置 - October CMS - 3.x","titleTemplate":false,"description":"了解如何自定义主题管理功能。","frontmatter":{"subtitle":"了解如何自定义主题管理功能。"},"headers":[{"level":2,"title":"主题信息文件","slug":"主题信息文件","link":"#主题信息文件","children":[]},{"level":2,"title":"版本文件","slug":"版本文件","link":"#版本文件","children":[]},{"level":2,"title":"主题预览图片","slug":"主题预览图片","link":"#主题预览图片","children":[]},{"level":2,"title":"主题依赖","slug":"主题依赖","link":"#主题依赖","children":[]},{"level":2,"title":"主题自定义","slug":"主题自定义","link":"#主题自定义","children":[{"level":3,"title":"在 CSS 中使用主题数据","slug":"在-css-中使用主题数据","link":"#在-css-中使用主题数据","children":[]},{"level":3,"title":"将主题数据与合并资产一起使用","slug":"将主题数据与合并资产一起使用","link":"#将主题数据与合并资产一起使用","children":[]}]}],"relativePath":"3.x/zh-cn/cms/themes/settings.md","filePath":"3.x/zh-cn/cms/themes/settings.md"}'),u={name:"3.x/zh-cn/cms/themes/settings.md"};function i(k,s,d,g,m,h){const t=n("pre-heading"),e=n("post-heading");return o(),l("div",null,[a(t),s[0]||(s[0]=c("h1",null,"主题设置",-1)),a(e),s[1]||(s[1]=r(`<p>主题目录可以包含 <strong>theme.yaml</strong>、<strong>version.yaml</strong> 和 <strong>assets/images/theme-preview.png</strong> 文件。这些文件对于本地开发是可选的，但对于在 October CMS 市场上发布的主题是必需的。</p><h2 id="主题信息文件"><a href="#主题信息文件" class="header-anchor">#</a> 主题信息文件</h2><p>主题信息文件 <strong>theme.yaml</strong> 包含主题描述、作者名称、作者网站 URL 和一些其他信息。该文件应放置在主题根目录中：</p><pre class="dir-container"><code><p>├── themes
|   └── website
|       ├── pages
|       ├── layouts
|       ├── partials
|       ├── content
|       ├── assets
|       └── <code>theme.yaml</code>  <em>← 信息文件</em></p>
</code></pre><p><strong>theme.yaml</strong> 文件支持以下字段：</p><div class="table"><table tabindex="0"><thead><tr><th>字段</th><th>描述</th></tr></thead><tbody><tr><td><strong>name</strong></td><td>指定主题名称，必填。</td></tr><tr><td><strong>author</strong></td><td>指定作者名称，必填。</td></tr><tr><td><strong>homepage</strong></td><td>指定作者网站 URL，必填。</td></tr><tr><td><strong>description</strong></td><td>主题描述，必填。</td></tr><tr><td><strong>previewImage</strong></td><td>自定义预览图片，相对于主题目录的路径，例如：<code>assets/images/preview.png</code>，可选。</td></tr><tr><td><strong>code</strong></td><td>主题代码，可选。该值在 October CMS 市场上用于初始化主题代码值。</td></tr><tr><td><strong>authorCode</strong></td><td>主题作者代码，可选。该值在 October CMS 市场上用于定义主题所有者。</td></tr><tr><td><strong>form</strong></td><td>配置数组或表单字段定义文件的引用，用于主题自定义，可选。</td></tr><tr><td><strong>require</strong></td><td>用于主题依赖的插件名称数组，可选。</td></tr></tbody></table></div><p>主题信息文件示例：</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;October CMS Demo&quot;</span>
<span class="token key atrule">description</span><span class="token punctuation">:</span> <span class="token string">&quot;Demonstrates the basic concepts of the front-end theming.&quot;</span>
<span class="token key atrule">author</span><span class="token punctuation">:</span> <span class="token string">&quot;October CMS&quot;</span>
<span class="token key atrule">homepage</span><span class="token punctuation">:</span> <span class="token string">&quot;https://octobercms.com&quot;</span>
<span class="token key atrule">code</span><span class="token punctuation">:</span> <span class="token string">&quot;Demo&quot;</span>
<span class="token key atrule">authorCode</span><span class="token punctuation">:</span> <span class="token string">&quot;Acme&quot;</span>
</code></pre></div><h2 id="版本文件"><a href="#版本文件" class="header-anchor">#</a> 版本文件</h2><p>主题版本文件 <strong>version.yaml</strong> 定义当前主题版本和更新日志。该文件应放置在主题根目录中。</p><pre class="dir-container"><code><p>├── themes
|   └── website
|       ├── ...
|       └── theme.yaml
|       └── <code>version.yaml</code>  <em>← 版本文件</em></p>
</code></pre><p>该文件包含以下格式。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">v1.0.1</span><span class="token punctuation">:</span> Theme initialization
<span class="token key atrule">v1.0.2</span><span class="token punctuation">:</span> Added more features
<span class="token key atrule">v1.0.3</span><span class="token punctuation">:</span> Some features are removed
</code></pre></div><h2 id="主题预览图片"><a href="#主题预览图片" class="header-anchor">#</a> 主题预览图片</h2><p>主题预览图片用于后端主题选择器。图片文件 <strong>theme-preview.png</strong> 应放置在主题的 <strong>assets/images</strong> 目录中：</p><pre class="dir-container"><code><p>├── themes
|   └── website
|       ├── ...
|       └── assets
|           └── images
|               └── <code>theme-preview.png</code>  <em>← 预览图片</em></p>
</code></pre><p>图片宽度应至少为 600px。理想的宽高比为 1.5，例如 600x400px。</p><h2 id="主题依赖"><a href="#主题依赖" class="header-anchor">#</a> 主题依赖</h2><p>主题可以通过在主题信息文件中定义 <strong>require</strong> 选项来依赖插件，该选项应提供一个被视为需求的插件名称数组。依赖 <strong>Acme.Blog</strong> 和 <strong>Acme.User</strong> 的主题可以如此定义此需求：</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;October CMS Demo&quot;</span>
<span class="token comment"># [...]</span>

<span class="token key atrule">require</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token string">&quot;Acme.User&quot;</span>
    <span class="token punctuation">-</span> <span class="token string">&quot;Acme.Blog&quot;</span>
</code></pre></div><p>当主题首次安装时，系统将尝试同时安装所需的插件。为了获得流畅的体验，请考虑同时<a href="./../../extend/resources/publishing-packages.html">将这些插件添加到 Composer 依赖列表</a>中。</p><h2 id="主题自定义"><a href="#主题自定义" class="header-anchor">#</a> 主题自定义</h2><p>主题可以通过在主题信息文件中定义 <code>form</code> 键来支持配置值。此键应包含配置数组或表单字段定义文件的引用，更多信息请参阅<a href="./../../element/form-fields.html">表单字段定义</a>。</p><p>以下是如何定义一个名为 <strong>site_name</strong> 的网站名称配置字段的示例：</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> My Theme
<span class="token comment"># [...]</span>

<span class="token key atrule">form</span><span class="token punctuation">:</span>
    <span class="token key atrule">fields</span><span class="token punctuation">:</span>
        <span class="token key atrule">site_name</span><span class="token punctuation">:</span>
            <span class="token key atrule">label</span><span class="token punctuation">:</span> Site name
            <span class="token key atrule">comment</span><span class="token punctuation">:</span> The website name as it should appear on the front<span class="token punctuation">-</span>end
            <span class="token key atrule">default</span><span class="token punctuation">:</span> My Amazing Site<span class="token tag">!</span>
</code></pre></div><p>然后可以在任何主题模板中使用名为 <code>this.theme</code> 的<a href="./../../markup/property/this-theme.html">全局 Twig 变量</a>来访问该值。</p><div class="language-twig extra-class"><pre class="language-twig"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span>Welcome to <span class="token twig language-twig"><span class="token delimiter punctuation">{{</span> this<span class="token punctuation">.</span>theme<span class="token punctuation">.</span>site_name <span class="token delimiter punctuation">}}</span></span>!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>您也可以在单独的文件中定义配置，其中路径相对于主题。以下定义将从主题内的 <strong>config/fields.yaml</strong> 文件中获取表单字段。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> My Theme
<span class="token comment"># [...]</span>

<span class="token key atrule">form</span><span class="token punctuation">:</span> config/fields.yaml
</code></pre></div><p><strong>themes/demo/config/fields.yaml</strong>:</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">fields</span><span class="token punctuation">:</span>
    <span class="token key atrule">site_name</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Site name
        <span class="token key atrule">comment</span><span class="token punctuation">:</span> The website name as it should appear on the front<span class="token punctuation">-</span>end
        <span class="token key atrule">default</span><span class="token punctuation">:</span> My Amazing Site<span class="token tag">!</span>
</code></pre></div><h3 id="在-css-中使用主题数据"><a href="#在-css-中使用主题数据" class="header-anchor">#</a> 在 CSS 中使用主题数据</h3><p>有时您可能希望在主题样式表中包含视觉偏好。您可以使用 CSS 自定义属性（变量）来使这些值可用。在以下示例中，我们将使用<a href="./../../element/form/widget-colorpicker.html">颜色选择器字段类型</a>来指定自定义链接颜色。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">form</span><span class="token punctuation">:</span>
    <span class="token key atrule">fields</span><span class="token punctuation">:</span>
        <span class="token comment"># [...]</span>

        <span class="token key atrule">link_color</span><span class="token punctuation">:</span>
            <span class="token key atrule">label</span><span class="token punctuation">:</span> Link color
            <span class="token key atrule">type</span><span class="token punctuation">:</span> colorpicker
</code></pre></div><p>使用上面的示例，我们可以定义一个 <a href="./partials.html">CMS 部件</a>，使用本地样式表将选定的值传递给 CSS。然后将该部件包含在<a href="./layouts.html">主题布局</a>的 <code>&lt;head&gt;</code> 标签内。</p><div class="language-html extra-class"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
    <span class="token selector">:root</span> <span class="token punctuation">{</span>
        <span class="token selector">--my-color:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> this.theme.link_color <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><div class="custom-block tip"><p>自定义属性名称区分大小写，因此 <code>--my-color</code> 将被视为与 <code>--My-color</code> 不同的自定义属性。</p></div><p>现在在您的样式表中，可以通过在 <code>var()</code> 函数内指定自定义属性名称来代替常规属性值，在任何地方使用该自定义属性。</p><div class="language-css extra-class"><pre class="language-css"><code><span class="token selector">a</span> <span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--my-color<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="将主题数据与合并资产一起使用"><a href="#将主题数据与合并资产一起使用" class="header-anchor">#</a> 将主题数据与合并资产一起使用</h3><p>使用 <code>|theme</code> <a href="./../markup/filter-theme.html">过滤器和合并器</a>合并的资产可以将值传递给支持的过滤器，例如 LESS 过滤器。只需在定义表单字段时指定 <code>assetVar</code> 选项，该值应包含所需的变量名称。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">form</span><span class="token punctuation">:</span>
    <span class="token key atrule">fields</span><span class="token punctuation">:</span>
        <span class="token comment"># [...]</span>

        <span class="token key atrule">link_color</span><span class="token punctuation">:</span>
            <span class="token key atrule">label</span><span class="token punctuation">:</span> Link color
            <span class="token key atrule">type</span><span class="token punctuation">:</span> colorpicker
            <span class="token key atrule">assetVar</span><span class="token punctuation">:</span> <span class="token string">&#39;link-color&#39;</span>
</code></pre></div><p>在上面的示例中，选定的颜色值将在 LESS 文件中以 <code>@link-color</code> 的形式可用。假设我们有以下样式表引用：</p><div class="language-twig extra-class"><pre class="language-twig"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token twig language-twig"><span class="token delimiter punctuation">{{</span> <span class="token punctuation">[</span><span class="token string"><span class="token punctuation">&#39;</span>assets/less/theme.less<span class="token punctuation">&#39;</span></span><span class="token punctuation">]</span><span class="token operator">|</span>theme <span class="token delimiter punctuation">}}</span></span><span class="token punctuation">&quot;</span></span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>stylesheet<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>使用 <strong>themes/yourtheme/assets/less/theme.less</strong> 中的一些示例内容：</p><div class="language-less extra-class"><pre class="language-less"><code><span class="token selector">a</span> <span class="token punctuation">{</span> <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">@link-color</span> <span class="token punctuation">}</span>
</code></pre></div>`,46))])}const f=p(u,[["render",i]]);export{v as __pageData,f as default};
