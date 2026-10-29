import{_ as c,r as t,o as i,c as r,e as p,a as n,s as e,d as a}from"./chunks/framework.CXcwiNg-.js";const y=JSON.parse('{"title":"插件 - October CMS - 3.x","titleTemplate":false,"description":"通过扩展 CMS 来添加新功能的基础。","frontmatter":{"subtitle":"通过扩展 CMS 来添加新功能的基础。"},"headers":[{"level":3,"title":"目录结构","slug":"目录结构","link":"#目录结构","children":[]},{"level":3,"title":"插件命名空间","slug":"插件命名空间","link":"#插件命名空间","children":[]},{"level":2,"title":"注册文件","slug":"注册文件","link":"#注册文件","children":[{"level":3,"title":"基本插件信息","slug":"基本插件信息","link":"#基本插件信息","children":[]}]},{"level":2,"title":"启动和初始化","slug":"启动和初始化","link":"#启动和初始化","children":[]},{"level":2,"title":"依赖定义","slug":"依赖定义","link":"#依赖定义","children":[]},{"level":2,"title":"版本历史","slug":"版本历史","link":"#版本历史","children":[{"level":3,"title":"插件依赖","slug":"插件依赖","link":"#插件依赖","children":[]}]},{"level":2,"title":"插件版本文件","slug":"插件版本文件","link":"#插件版本文件","children":[{"level":3,"title":"重要更新","slug":"重要更新","link":"#重要更新","children":[]},{"level":3,"title":"迁移和种子文件","slug":"迁移和种子文件","link":"#迁移和种子文件","children":[{"level":4,"title":"另请参阅","slug":"另请参阅","link":"#另请参阅","children":[]}]}]}],"relativePath":"3.x/zh-cn/extend/system/plugins.md","filePath":"3.x/zh-cn/extend/system/plugins.md"}'),u={name:"3.x/zh-cn/extend/system/plugins.md"};function d(k,s,g,h,m,f){const o=t("pre-heading"),l=t("post-heading");return i(),r("div",null,[p(o),s[0]||(s[0]=n("h1",null,"插件",-1)),p(l),s[1]||(s[1]=e(`<div class="custom-block aside"><p>插件通过唯一的代码来标识，例如，名为 <code>Acme.Blog</code> 的插件位于 <strong>plugins/acme/blog</strong> 目录中。</p></div><p>本文介绍插件及其注册功能。注册过程允许插件声明其功能，如 CMS 组件或后端导航和页面。以下是插件可以实现的一些功能示例。</p><ol><li>创建数据库表结构和种子数据。</li><li>定义 <a href="./../cms-components.html">CMS 组件</a>。</li><li>定义<a href="./../backend/permissions.html">用户权限</a>。</li><li>添加<a href="./../settings/settings.html">设置页面</a>、<a href="./../backend/navigation.html">导航项</a>、<a href="./../lists/list-controller.html">列表</a>和<a href="./../forms/form-controller.html">表单</a>。</li><li>修改<a href="./../extending.html">核心或其他插件的功能</a>。</li><li>提供类、<a href="./../system/controllers.html">后端控制器</a>、视图、资源文件和其他文件。</li></ol><h3 id="目录结构"><a href="#目录结构" class="header-anchor">#</a> 目录结构</h3><p>插件位于应用程序目录的 <strong>plugins</strong> 目录中。以下是一个插件目录结构的示例。</p><pre class="dir-container"><code><p>├── <code>plugins</code>
|   └── acme  <em>← 作者名称</em>
|       └── blog  <em>← 插件名称</em>
|           ├── classes
|           ├── components
|           ├── controllers
|           ├── models
|           ├── updates
|           └── Plugin.php  <em>← 注册文件</em></p>
</code></pre><p>并非所有插件目录都是必需的。唯一必需的文件是下面描述的 <strong>Plugin.php</strong>。如果你的插件只提供单个组件，你的插件目录可以更加简单，如下所示。</p><pre class="dir-container"><code><p>├── plugins
|   └── acme
|       └── blog
|           ├── <code>components</code>
|           └── Plugin.php</p>
</code></pre><h3 id="插件命名空间"><a href="#插件命名空间" class="header-anchor">#</a> 插件命名空间</h3>`,9)),s[2]||(s[2]=n("p",null,[a("插件命名空间是必不可少的，特别是如果你打算在 "),n("a",{href:"https://octobercms.com/plugins",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[a("October CMS 市场"),n("span",null,[n("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[n("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),a(),n("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),a(),n("span",{class:"sr-only"},"(opens new window)")])]),a("上发布插件。当你在市场上注册为作者时，系统会要求你提供一个作者代码，该代码应该用作你所有插件的根命名空间。你只能在注册时指定一次作者代码。市场提供的默认作者代码由作者的名和姓组成：JohnSmith。代码在注册后不能更改。你的所有插件命名空间都应该定义在根命名空间下，例如 "),n("code",null,"JohnSmith\\Blog"),a("。")],-1)),s[3]||(s[3]=e(`<h2 id="注册文件"><a href="#注册文件" class="header-anchor">#</a> 注册文件</h2><p><code>create:plugin</code> 命令会为插件生成一个文件夹和基本文件。第一个参数指定作者和插件名称。</p><div class="language-bash extra-class"><pre class="language-bash"><code>php artisan create:plugin Acme.Blog
</code></pre></div><p><strong>Plugin.php</strong> 文件，即插件注册文件，是一个声明插件核心功能和信息的初始化脚本。注册文件可以提供以下内容：</p><ol><li>关于插件的信息，包括名称和作者。</li><li>用于扩展 CMS 的注册方法。</li></ol><p>注册脚本应使用插件命名空间。注册脚本应定义一个名为 <code>Plugin</code> 的类，该类继承 <code>System\\Classes\\PluginBase</code> 类。插件注册类唯一必需的方法是 <code>pluginDetails</code>。以下是一个插件注册文件的示例。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">namespace</span> <span class="token package">Acme<span class="token punctuation">\\</span>Blog</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">Plugin</span> <span class="token keyword">extends</span> <span class="token class-name class-name-fully-qualified"><span class="token punctuation">\\</span>System<span class="token punctuation">\\</span>Classes<span class="token punctuation">\\</span>PluginBase</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">pluginDetails</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">[</span>
            <span class="token string single-quoted-string">&#39;name&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;Blog Plugin&#39;</span><span class="token punctuation">,</span>
            <span class="token string single-quoted-string">&#39;description&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;Provides some really cool blog features.&#39;</span><span class="token punctuation">,</span>
            <span class="token string single-quoted-string">&#39;author&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;ACME Corporation&#39;</span><span class="token punctuation">,</span>
            <span class="token string single-quoted-string">&#39;icon&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;icon-leaf&#39;</span>
        <span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">registerComponents</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">[</span>
            <span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\\</span>Acme<span class="token punctuation">\\</span>Blog<span class="token punctuation">\\</span>Components<span class="token punctuation">\\</span>Post</span><span class="token operator">::</span><span class="token keyword">class</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;blogPost&#39;</span>
        <span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="基本插件信息"><a href="#基本插件信息" class="header-anchor">#</a> 基本插件信息</h3><p><code>pluginDetails</code> 是插件注册类的必需方法。它应该返回一个包含以下键的数组：</p><div class="table"><table tabindex="0"><thead><tr><th>键</th><th>描述</th></tr></thead><tbody><tr><td><strong>name</strong></td><td>插件名称，必填。</td></tr><tr><td><strong>description</strong></td><td>插件描述，必填。</td></tr><tr><td><strong>author</strong></td><td>插件作者名称，必填。</td></tr><tr><td><strong>icon</strong></td><td>插件图标的名称。完整的可用图标列表可在<a href="./../../element/available-icons.html">可用图标文档</a>中找到。此字体提供的任何图标名称都是有效的，例如 <strong>icon-glass</strong>、<strong>icon-music</strong>，可选。</td></tr><tr><td><strong>iconSvg</strong></td><td>用于替代标准图标的 SVG 图标。SVG 图标应为矩形，并且可以支持颜色，可选。</td></tr><tr><td><strong>homepage</strong></td><td>作者网站地址的链接，可选。</td></tr><tr><td><strong>hint</strong></td><td>用于在管理面板中<a href="./controllers.html">路由控制器 URL</a> 的较短代码，可选。</td></tr></tbody></table></div><h2 id="启动和初始化"><a href="#启动和初始化" class="header-anchor">#</a> 启动和初始化</h2><p>插件注册文件可以包含两个方法 <code>boot</code> 和 <code>register</code>。通过这些方法，你可以执行任何操作，例如注册路由或附加事件处理程序。</p><p><code>register</code> 方法在插件注册时立即调用。<code>boot</code> 方法在请求被路由之前调用。因此，如果你的操作依赖于其他插件，你应该使用 boot 方法。例如，在 <code>boot</code> 方法中你可以扩展模型。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">boot</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name static-context">User</span><span class="token operator">::</span><span class="token function">extend</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token variable">$model</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token variable">$model</span><span class="token operator">-&gt;</span><span class="token property">hasOne</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;author&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\\</span>Acme<span class="token punctuation">\\</span>Blog<span class="token punctuation">\\</span>Models<span class="token punctuation">\\</span>Author</span><span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="custom-block tip"><p><code>boot</code> 方法是可选的，不定义它有助于提高性能。此外，只有 <code>boot</code> 方法支持通过应用容器进行依赖注入。</p></div><p>插件还可以提供一个名为 <strong>init.php</strong> 的文件，其中包含自定义初始化逻辑。以下是一些示例内容。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token class-name static-context">App</span><span class="token operator">::</span><span class="token function">before</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token comment">// Logic when the request starts, after routes are registered</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name static-context">App</span><span class="token operator">::</span><span class="token function">after</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token comment">// Logic the request has finished, after the response is sent</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="依赖定义"><a href="#依赖定义" class="header-anchor">#</a> 依赖定义</h2><p>插件可以通过在插件注册文件中定义 <code>$require</code> 属性来依赖其他插件，该属性应包含被视为依赖项的插件名称数组。依赖于 <strong>Acme.User</strong> 插件的插件可以通过以下方式声明此依赖：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">namespace</span> <span class="token package">Acme<span class="token punctuation">\\</span>Blog</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">Plugin</span> <span class="token keyword">extends</span> <span class="token class-name class-name-fully-qualified"><span class="token punctuation">\\</span>System<span class="token punctuation">\\</span>Classes<span class="token punctuation">\\</span>PluginBase</span>
<span class="token punctuation">{</span>
    <span class="token comment">/**
     * @var array require these plugins
     */</span>
    <span class="token keyword">public</span> <span class="token variable">$require</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;Acme.User&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre></div><p>依赖定义将影响插件的运行方式以及更新过程如何应用迁移。安装过程会尝试自动安装所有依赖项，但是如果系统中检测到一个插件缺少任何依赖项，它将被禁用以防止系统错误。</p><p>依赖定义可以很复杂，但应注意防止循环引用。依赖关系图应始终是有向的，循环依赖被视为设计错误。</p><h2 id="版本历史"><a href="#版本历史" class="header-anchor">#</a> 版本历史</h2><p>插件维护变更日志来记录代码中的任何更改或改进是一种良好的实践。除了编写关于更改的注释外，此过程还具有按正确顺序执行<a href="./../database/structure.html">迁移和种子文件</a>的有用功能。</p><p>变更日志存储在插件 <strong>updates</strong> 目录中的一个名为 <code>version.yaml</code> 的 YAML 文件中，该文件与迁移和种子文件共存。此示例展示了一个典型的插件更新目录结构：</p><pre class="dir-container"><code><p>├── plugins
|   └── author
|       └── myplugin
|           ├── <code>updates</code>
|           |   ├── <code>version.yaml</code>  <em>← 版本文件</em>
|           |   ├── create_tables.php  <em>← 数据库脚本</em>
|           |   ├── seed_the_database.php
|           |   └── create_another_table.php
|           └── Plugin.php</p>
</code></pre><h3 id="插件依赖"><a href="#插件依赖" class="header-anchor">#</a> 插件依赖</h3><p>更新按照特定顺序应用，基于插件注册文件中定义的依赖关系。有依赖的插件在其所有依赖项都更新完毕之前不会被更新。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">namespace</span> <span class="token package">Acme<span class="token punctuation">\\</span>Blog</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">Plugin</span> <span class="token keyword">extends</span> <span class="token class-name class-name-fully-qualified"><span class="token punctuation">\\</span>System<span class="token punctuation">\\</span>Classes<span class="token punctuation">\\</span>PluginBase</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token variable">$require</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;Acme.User&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在上面的示例中，<strong>Acme.Blog</strong> 插件在 <strong>Acme.User</strong> 插件完全更新之前不会被更新。</p><h2 id="插件版本文件"><a href="#插件版本文件" class="header-anchor">#</a> 插件版本文件</h2>`,31)),s[4]||(s[4]=n("p",null,[n("strong",null,"version.yaml"),a(" 文件，即插件版本文件，包含版本注释并按正确顺序引用数据库脚本。请阅读"),n("a",{href:"./../database/structure.html"},"数据库结构"),a("文章以了解迁移文件的信息。如果你打算将插件提交到"),n("a",{href:"https://octobercms.com/help/site/marketplace",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[a("市场"),n("span",null,[n("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[n("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),a(),n("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),a(),n("span",{class:"sr-only"},"(opens new window)")])]),a("，则需要此文件。以下是一个插件版本文件的示例。")],-1)),s[5]||(s[5]=e(`<div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">v1.0.1</span><span class="token punctuation">:</span> First version
<span class="token key atrule">v1.0.2</span><span class="token punctuation">:</span> Second version
<span class="token key atrule">v1.0.3</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Update with a migration and seed
    <span class="token punctuation">-</span> create_tables.php
    <span class="token punctuation">-</span> seed_the_database.php
<span class="token key atrule">v2.0.0</span><span class="token punctuation">:</span> Important update
<span class="token key atrule">v2.0.1</span><span class="token punctuation">:</span> Latest version
</code></pre></div><div class="custom-block tip"><p><code>version.yaml</code> 文件应始终在第一行使用描述更改的文本更新，其余行用于更新脚本。对于更详细的更新，请考虑使用专用的变更日志文件。</p></div><p>如上所示，应该有一个代表版本号的键，后面跟着更新消息，更新消息可以是字符串或包含更新消息的数组。对于引用迁移或种子文件的更新，脚本文件名行可以放在任何位置。以下是一个没有关联更新文件的注释示例。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">v1.0.1</span><span class="token punctuation">:</span> A single comment that uses no update scripts.
</code></pre></div><h3 id="重要更新"><a href="#重要更新" class="header-anchor">#</a> 重要更新</h3><p>有时插件需要引入会破坏已在使用该插件的网站的功能。为了防止更改被自动部署，你应该增加版本字符串的<strong>主要</strong>段（<code>major.minor.patch</code>）。以下是一个重要更新注释的示例。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">v2.1.0</span><span class="token punctuation">:</span> This is an important update from v1 that contains breaking changes.
</code></pre></div><p>当从 <code>v1</code> 版本标记新版本 <code>v2</code> 时，更改不会作为常规更新的一部分被部署。用户必须通过 Composer 重新安装插件才能获取最新版本。</p><h3 id="迁移和种子文件"><a href="#迁移和种子文件" class="header-anchor">#</a> 迁移和种子文件</h3><p>如前所述，更新还定义了何时应用<a href="./../database/structure.html">迁移和种子文件</a>。包含注释和更新的更新行：</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">v1.1.1</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> This update will execute the two scripts below.
    <span class="token punctuation">-</span> some_upgrade_file.php
    <span class="token punctuation">-</span> some_seeding_file.php
</code></pre></div><p>更新文件名应使用 <em>snake_case</em>，而包含的 PHP 类应使用 <em>CamelCase</em>。对于名为 <strong>some_upgrade_file.php</strong> 的文件，对应的类将是 <code>SomeUpgradeFile</code>。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token keyword">namespace</span> <span class="token package">Acme<span class="token punctuation">\\</span>Blog<span class="token punctuation">\\</span>Updates</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">Schema</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">October<span class="token punctuation">\\</span>Rain<span class="token punctuation">\\</span>Database<span class="token punctuation">\\</span>Updates<span class="token punctuation">\\</span>Migration</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * some_upgrade_file.php
 */</span>
<span class="token keyword">class</span> <span class="token class-name-definition class-name">SomeUpgradeFile</span> <span class="token keyword">extends</span> <span class="token class-name">Migration</span>
<span class="token punctuation">{</span>
    <span class="token comment">///</span>
<span class="token punctuation">}</span>
</span></code></pre></div><h4 id="另请参阅"><a href="#另请参阅" class="header-anchor">#</a> 另请参阅</h4><div class="custom-block also"><ul><li><a href="./../database/structure.html">数据库迁移和种子</a></li></ul></div>`,15))])}const b=c(u,[["render",d]]);export{y as __pageData,b as default};
