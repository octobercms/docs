import{_ as o,r as n,o as p,c as l,e as a,a as c,s as r}from"./chunks/framework.CXcwiNg-.js";const y=JSON.parse('{"title":"主题填充 - October CMS - 3.x","titleTemplate":false,"description":"使用示例内容填充蓝图和数据库记录。","frontmatter":{"subtitle":"使用示例内容填充蓝图和数据库记录。"},"headers":[{"level":2,"title":"目录结构","slug":"目录结构","link":"#目录结构","children":[]},{"level":2,"title":"导入蓝图","slug":"导入蓝图","link":"#导入蓝图","children":[]},{"level":2,"title":"导入语言","slug":"导入语言","link":"#导入语言","children":[]},{"level":2,"title":"导入数据","slug":"导入数据","link":"#导入数据","children":[{"level":3,"title":"示例数据文件","slug":"示例数据文件","link":"#示例数据文件","children":[]}]},{"level":2,"title":"填充主题","slug":"填充主题","link":"#填充主题","children":[]}],"relativePath":"3.x/zh-cn/cms/themes/seeding-themes.md","filePath":"3.x/zh-cn/cms/themes/seeding-themes.md"}'),u={name:"3.x/zh-cn/cms/themes/seeding-themes.md"};function i(d,s,k,g,h,m){const t=n("pre-heading"),e=n("post-heading");return p(),l("div",null,[a(t),s[0]||(s[0]=c("h1",null,"主题填充",-1)),a(e),s[1]||(s[1]=r(`<p>主题支持从填充脚本导入示例内容的功能，包括数据库内容和 <a href="./../../cms/tailor/introduction.html">Tailor 蓝图</a>。主题内一个名为 <strong>seeds</strong> 的特定文件夹及其目录结构用于提供内容。</p><h2 id="目录结构"><a href="#目录结构" class="header-anchor">#</a> 目录结构</h2><p>下面是一个示例填充目录结构。<strong>blueprints</strong> 目录包含主题使用的所有蓝图模板，它们会自动导入到 <strong>app/blueprints</strong> 目录中，其中包含一个名为 <strong>mywebsite</strong> 的嵌套目录。<strong>data.yaml</strong> 文件包含如何将内容导入数据库的指令。</p><pre class="dir-container"><code><p>├── themes
|   └── mywebsite
|       └── <code>seeds</code>  <em>← 主题填充目录</em>
|           ├── blueprints
|           |   └── post.yaml  <em>← 蓝图文件</em>
|           ├── lang
|           |   └── en.json  <em>← 语言文件</em>
|           ├── data
|           |   └── blog-posts.json  <em>← 数据文件</em>
|           └── data.yaml  <em>← 填充脚本</em></p>
</code></pre><h2 id="导入蓝图"><a href="#导入蓝图" class="header-anchor">#</a> 导入蓝图</h2><div class="custom-block aside"><p>由于蓝图不依赖于任何特定的文件或目录结构，因此可以自由移动。</p></div><p>导入蓝图时，只需将蓝图文件放在 <strong>blueprints</strong> 目录中即可。它不使用任何配置，填充时所有蓝图会简单地复制到 <strong>app/blueprints</strong> 目录。在该目录内会创建一个与主题同名的新目录。蓝图将放置在这个新目录中。</p><h2 id="导入语言"><a href="#导入语言" class="header-anchor">#</a> 导入语言</h2><p>作为可选功能，可以通过将 <a href="./../../extend/system/localization.html">JSON 语言文件</a>放在 <strong>lang</strong> 目录中来将语言导入到 <strong>app/lang</strong> 目录。这使得翻译蓝图内的标签和其他描述成为可能。如果应用程序语言目录中已存在语言文件，则语言字符串将合并在一起。</p><h2 id="导入数据"><a href="#导入数据" class="header-anchor">#</a> 导入数据</h2><p><strong>data.yaml</strong> 文件包含用于将内容导入数据库的特定格式。在下面的示例中，两组数据被导入到数据库中用于 Tailor 条目内容。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token punctuation">-</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> Blog Post Data
    <span class="token key atrule">class</span><span class="token punctuation">:</span> Tailor\\Models\\RecordImport
    <span class="token key atrule">file</span><span class="token punctuation">:</span> seeds/data/blog<span class="token punctuation">-</span>posts.json
    <span class="token key atrule">attributes</span><span class="token punctuation">:</span>
        <span class="token key atrule">file_format</span><span class="token punctuation">:</span> json
        <span class="token key atrule">blueprint_uuid</span><span class="token punctuation">:</span> edcd102e<span class="token punctuation">-</span>0525<span class="token punctuation">-</span>4e4d<span class="token punctuation">-</span>b07e<span class="token punctuation">-</span>633ae6c18db6
<span class="token punctuation">-</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> Blog Category Data
    <span class="token key atrule">class</span><span class="token punctuation">:</span> Tailor\\Models\\RecordImport
    <span class="token key atrule">file</span><span class="token punctuation">:</span> seeds/data/blog<span class="token punctuation">-</span>categories.json
    <span class="token key atrule">attributes</span><span class="token punctuation">:</span>
        <span class="token key atrule">file_format</span><span class="token punctuation">:</span> json
        <span class="token key atrule">blueprint_uuid</span><span class="token punctuation">:</span> b022a74b<span class="token punctuation">-</span>15e6<span class="token punctuation">-</span>4c6b<span class="token punctuation">-</span>9eb9<span class="token punctuation">-</span>17efc5103543
</code></pre></div><p>YAML 文件应定义一个数组，其中数组中的每个项目支持以下属性。</p><div class="table"><table tabindex="0"><thead><tr><th>属性</th><th>描述</th></tr></thead><tbody><tr><td><strong>name</strong></td><td>为导入步骤命名，向用户显示。</td></tr><tr><td><strong>class</strong></td><td>引用一个扩展 <code>Backend\\Models\\ImportModel</code> 接口的模型。</td></tr><tr><td><strong>file</strong></td><td>引用包含要导入内容的 JSON 数据文件。</td></tr><tr><td><strong>attributes</strong></td><td>导入前要在导入模型上设置的属性列表。</td></tr></tbody></table></div><h3 id="示例数据文件"><a href="#示例数据文件" class="header-anchor">#</a> 示例数据文件</h3><p>以下是一个可用于导入博客分类的 JSON 文件示例。JSON 数组中的每个项目都会在数据库中生成一条具有提供属性的导入记录。提供 <strong>id</strong> 属性允许记录在多次导入之间建立关联。</p><div class="language-json extra-class"><pre class="language-json"><code><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Announcements&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;slug&quot;</span><span class="token operator">:</span> <span class="token string">&quot;announcements&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
        <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;News&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;slug&quot;</span><span class="token operator">:</span> <span class="token string">&quot;news&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre></div><h2 id="填充主题"><a href="#填充主题" class="header-anchor">#</a> 填充主题</h2><p><code>theme:seed</code> artisan 命令用于填充主题。</p><div class="language-bash extra-class"><pre class="language-bash"><code>php artisan theme:seed <span class="token operator">&lt;</span>theme name<span class="token operator">&gt;</span>
</code></pre></div><p>您还可以使用 <code>--root</code> 选项来指示命令将蓝图导入到根目录而不是嵌套目录中。</p><div class="language-bash extra-class"><pre class="language-bash"><code>php artisan theme:seed <span class="token operator">&lt;</span>theme name<span class="token operator">&gt;</span> <span class="token parameter variable">--root</span>
</code></pre></div><div class="custom-block tip"><p>您也可以通过导航到<strong>设置 → 前端主题 → 管理 → 填充内容</strong>来使用管理面板填充主题。</p></div>`,23))])}const _=o(u,[["render",i]]);export{y as __pageData,_ as default};
