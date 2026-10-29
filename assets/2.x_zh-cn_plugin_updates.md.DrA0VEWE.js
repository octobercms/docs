import{_ as c,r as e,o as r,c as i,e as p,a,s as t,d as n}from"./chunks/framework.CXcwiNg-.js";const y=JSON.parse('{"title":"版本更新 - October CMS - 2.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":3,"title":"插件依赖","slug":"插件依赖","link":"#插件依赖","children":[]},{"level":2,"title":"插件版本文件","slug":"插件版本文件","link":"#插件版本文件","children":[{"level":3,"title":"重要更新","slug":"重要更新","link":"#重要更新","children":[]},{"level":3,"title":"迁移和种子文件","slug":"迁移和种子文件","link":"#迁移和种子文件","children":[]}]}],"relativePath":"2.x/zh-cn/plugin/updates.md","filePath":"2.x/zh-cn/plugin/updates.md"}'),u={name:"2.x/zh-cn/plugin/updates.md"};function d(k,s,g,m,h,_){const o=e("pre-heading"),l=e("post-heading");return r(),i("div",null,[p(o),s[0]||(s[0]=a("h1",null,"版本更新",-1)),p(l),s[1]||(s[1]=t(`<p>插件维护更改日志以记录代码中的任何更改或改进是一种很好的做法。 除了编写有关更改的注释外，此过程还具有按正确顺序执行 <a href="./../database/structure.html">迁移和种子文件</a> 的实用功能。</p><p>更改日志存储在插件的 <strong>/updates</strong> 目录中名为 <code>version.yaml</code> 的 YAML 文件中，该文件与迁移和种子文件共存。 这个例子显示了一个典型的插件更新目录结构:</p><div class="language- extra-class"><pre class="language-text"><code>plugins/
  author/
    myplugin/
      updates/                    &lt;=== 更新目录
        version.yaml                &lt;=== 插件版本文件
        create_tables.php           &lt;=== 数据库脚本
        seed_the_database.php       &lt;=== 迁移文件
        create_another_table.php    &lt;=== 迁移文件
</code></pre></div><h3 id="插件依赖"><a href="#插件依赖" class="header-anchor">#</a> 插件依赖</h3><p>根据<a href="./../plugin/registration.html#oc-dependency-definitions">插件注册文件中定义的依赖项</a>，以特定顺序更新应用。在所有依赖项都首先更新之前，不会更新依赖的插件。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token keyword">namespace</span> <span class="token package">Acme<span class="token punctuation">\\</span>Blog</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">Plugin</span> <span class="token keyword">extends</span> <span class="token class-name class-name-fully-qualified"><span class="token punctuation">\\</span>System<span class="token punctuation">\\</span>Classes<span class="token punctuation">\\</span>PluginBase</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token variable">$require</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;Acme.User&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></code></pre></div><p>在上面的示例中，<strong>Acme.Blog</strong> 插件在 <strong>Acme.User</strong> 插件完全更新之前不会更新。</p><h2 id="插件版本文件"><a href="#插件版本文件" class="header-anchor">#</a> 插件版本文件</h2>`,8)),s[2]||(s[2]=a("p",null,[a("strong",null,"version.yaml"),n(" 文件称为 "),a("em",null,"插件版本文件"),n("，包含版本注释并以正确的顺序引用数据库脚本。 请阅读 "),a("a",{href:"./../database/structure.html"},"数据库结构"),n(" 文章以获取有关迁移文件的信息。 如果您要将插件提交到 "),a("a",{href:"https://octobercms.com/help/site/marketplace",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[n("Marketplace"),a("span",null,[a("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[a("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),n(),a("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),n(),a("span",{class:"sr-only"},"(opens new window)")])]),n("，则需要此文件。 这是插件版本文件的示例:")],-1)),s[3]||(s[3]=t(`<div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">v1.0.1</span><span class="token punctuation">:</span> 第一版
<span class="token key atrule">v1.0.2</span><span class="token punctuation">:</span> 第二版
<span class="token key atrule">v1.0.3</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> 使用迁移和种子更新
    <span class="token punctuation">-</span> create_tables.php
    <span class="token punctuation">-</span> seed_the_database.php
<span class="token key atrule">v2.0.0</span><span class="token punctuation">:</span> 重要更新
<span class="token key atrule">v2.0.1</span><span class="token punctuation">:</span> 最新版本
</code></pre></div><blockquote><p><strong>注意</strong>:<code>version.yaml</code> 文件应始终使用第一行描述更改的文本信息，其余行用于更新脚本。 对于更详细的更新，请考虑使用专用的更改日志文件。</p></blockquote><p>正如你在上面看到的，应该有一个表示版本号的键，后面跟着更新消息，它是一个字符串或一个包含更新消息的数组。 对于涉及迁移或种子文件的更新，脚本文件名的行可以放置在任何位置。 没有关联更新文件的注释示例。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">v1.0.1</span><span class="token punctuation">:</span> 不使用更新脚本的单个注释。
</code></pre></div><p><a id="oc-important-updates"></a></p><h3 id="重要更新"><a href="#重要更新" class="header-anchor">#</a> 重要更新</h3><p>有时插件需要引入一些功能，这些功能会破坏已经使用该插件的网站。 为了防止自动部署更改，您应该增加版本字符串的 <strong>major</strong> 段(<code>major.minor.patch</code>)。 下面是一个重要更新注释的示例。。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">v2.1.0</span><span class="token punctuation">:</span> 这是 v1 的重要更新，其中包含重大更改。
</code></pre></div><p>当从版本<code>v1</code>标记新版本<code>v2</code>时，更改不会作为常规更新的一部分进行部署。 用户必须重新安装插件才能通过 Composer 接收最新版本。</p><p><a id="oc-migration-files"></a></p><h3 id="迁移和种子文件"><a href="#迁移和种子文件" class="header-anchor">#</a> 迁移和种子文件</h3><p>如前所述，更新还定义了何时应用 <a href="./../database/structure.html">迁移和种子文件</a>。 带有注释和更新的示例:</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">v1.1.1</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> 此更新将执行以下两个脚本。
    <span class="token punctuation">-</span> some_upgrade_file.php
    <span class="token punctuation">-</span> some_seeding_file.php
</code></pre></div><p>更新文件名应使用 <em>snake_case</em> 而包含的 PHP 类应使用 <em>CamelCase</em>。 对于名为 <strong>some_upgrade_file.php</strong> 的文件，相应的类将是 <code>SomeUpgradeFile</code>。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token keyword">namespace</span> <span class="token package">Acme<span class="token punctuation">\\</span>Blog<span class="token punctuation">\\</span>Updates</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">Schema</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">October<span class="token punctuation">\\</span>Rain<span class="token punctuation">\\</span>Database<span class="token punctuation">\\</span>Updates<span class="token punctuation">\\</span>Migration</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * some_upgrade_file.php
 */</span>
<span class="token keyword">class</span> <span class="token class-name-definition class-name">SomeUpgradeFile</span> <span class="token keyword">extends</span> <span class="token class-name">Migration</span>
<span class="token punctuation">{</span>
    <span class="token comment">///</span>
<span class="token punctuation">}</span>
</span></code></pre></div>`,15))])}const f=c(u,[["render",d]]);export{y as __pageData,f as default};
