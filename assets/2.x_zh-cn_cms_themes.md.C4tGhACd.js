import{_ as p,r as a,o as i,c,e as o,a as n,d as t,s as e}from"./chunks/framework.CXcwiNg-.js";const w=JSON.parse('{"title":"主题 - October CMS - 2.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"目录结构","slug":"目录结构","link":"#目录结构","children":[{"level":3,"title":"子目录","slug":"子目录","link":"#子目录","children":[]}]},{"level":2,"title":"模板结构","slug":"模板结构","link":"#模板结构","children":[{"level":3,"title":"配置部分","slug":"配置部分","link":"#配置部分","children":[]},{"level":3,"title":"PHP 代码部分","slug":"php-代码部分","link":"#php-代码部分","children":[]},{"level":3,"title":"Twig标记部分","slug":"twig标记部分","link":"#twig标记部分","children":[]}]},{"level":2,"title":"数据库驱动的主题","slug":"数据库驱动的主题","link":"#数据库驱动的主题","children":[]},{"level":2,"title":"子主题","slug":"子主题","link":"#子主题","children":[{"level":3,"title":"主题锁定文件","slug":"主题锁定文件","link":"#主题锁定文件","children":[]}]},{"level":2,"title":"主题日志","slug":"主题日志","link":"#主题日志","children":[]}],"relativePath":"2.x/zh-cn/cms/themes.md","filePath":"2.x/zh-cn/cms/themes.md"}'),g={name:"2.x/zh-cn/cms/themes.md"};function u(h,s,d,m,k,v){const l=a("pre-heading"),r=a("post-heading");return i(),c("div",null,[o(l),s[0]||(s[0]=n("h1",null,"主题",-1)),o(r),s[1]||(s[1]=n("p",null,[t("主题定义了使用 October CMS 构建的网站或 Web 应用程序的外观。它们完全由文件支持，可以使用任何版本控制系统进行管理，例如 Git。此页面为您提供了October主题的高级描述。您将在相应的文章中找到有关 "),n("a",{href:"./pages.html"},"页面"),t("、"),n("a",{href:"./partials.html"},"部件"),t("、"),n("a",{href:"./layouts.html"},"布局"),t(" 和 "),n("a",{href:"./content.html"},"内容文件"),t(" 的更多详细信息。")],-1)),s[2]||(s[2]=n("p",null,[t("主题是默认情况下驻留在 "),n("strong",null,"themes"),t(" 目录中的目录。主题可以包含以下对象：")],-1)),s[3]||(s[3]=n("div",{class:"table"},[n("table",{tabindex:"0"},[n("thead",null,[n("tr",null,[n("th",null,"对象"),n("th",null,"描述")])]),n("tbody",null,[n("tr",null,[n("td",null,[n("a",{href:"./pages.html"},"页面")]),n("td",null,"代表网站页面。")]),n("tr",null,[n("td",null,[n("a",{href:"./partials.html"},"部件")]),n("td",null,"包含可重用的 HTML 标记块。")]),n("tr",null,[n("td",null,[n("a",{href:"./layouts.html"},"布局")]),n("td",null,"定义页面脚手架。")]),n("tr",null,[n("td",null,[n("a",{href:"./content.html"},"内容文件")]),n("td",null,[t("可以与页面或布局分开编辑的文本、HTML 或 "),n("a",{href:"http://daringfireball.net/projects/markdown/syntax",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[t("Markdown"),n("span",null,[n("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[n("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),t(),n("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),t(),n("span",{class:"sr-only"},"(opens new window)")])]),t(" 块。")])]),n("tr",null,[n("td",null,[n("strong",null,"资产文件")]),n("td",null,"是资源文件，如图像、CSS 和 JavaScript 文件。")])])])],-1)),s[4]||(s[4]=e(`<h2 id="目录结构"><a href="#目录结构" class="header-anchor">#</a> 目录结构</h2><p>下面，您可以看到一个示例主题目录结构。每个主题代表一个单独的目录，通常，一个主题是活动的以显示网站。此示例演示 <strong>website</strong> 主题目录。</p><div class="language- extra-class"><pre class="language-text"><code>themes/
  website/           &lt;===  主题从这里开始
    pages/           &lt;===  页面文件
      home.htm
    layouts/         &lt;===  布局文件
      default.htm
    partials/        &lt;===  部件文件
      sidebar.htm
    content/         &lt;===  内容文件
      intro.htm
    assets/          &lt;===  资产文件
      css/
        my-styles.css
      js/
      images/
</code></pre></div><blockquote><p>活动主题通过<code>config/cms.php</code> 文件中的<code>active_theme</code> 参数或System &gt; CMS &gt; Front-end(中文后台可在设置&gt;前端主题中选择)后端页面上的主题选择器设置。 使用主题选择器设置的主题会覆盖 <code>config/cms.php</code> 文件中的值。</p></blockquote><p><a id="oc-subdirectories"></a></p><h3 id="子目录"><a href="#子目录" class="header-anchor">#</a> 子目录</h3><p>October CMS 支持 <strong>pages</strong>、<strong>partials</strong>、<strong>layouts</strong> 和 <strong>content</strong> 文件的单级子目录，而 <strong>assets</strong> 目录可以具有无限的深度。 这种方法简化了大型网站的组织。 在下面的示例目录结构中，<strong>pages</strong> 和 <strong>partials</strong> 目录包含 <strong>blog</strong> 子目录，<strong>content</strong> 目录包含 <strong>home</strong> 子目录。</p><div class="language- extra-class"><pre class="language-text"><code>themes/
  website/
    pages/
      home.htm
      blog/                  &lt;===  页面子目录
        archive.htm
        category.htm
    partials/
      sidebar.htm
      blog/                  &lt;===  部件子目录
        category-list.htm
    content/
      footer-contacts.txt
      home/                  &lt;===  内容子目录
        intro.htm
    ...
</code></pre></div><p>要引用子目录中的模板，请在模板名称之前指定子目录的名称。 例如，从 <strong>blog</strong> 子目录渲染 <strong>category-list</strong> 部件。</p><div class="language-twig extra-class"><pre class="language-twig"><code><span class="token twig language-twig"><span class="token delimiter punctuation">{%</span> <span class="token tag-name keyword">partial</span> <span class="token string"><span class="token punctuation">&quot;</span>blog/category-list<span class="token punctuation">&quot;</span></span> <span class="token delimiter punctuation">%}</span></span>
</code></pre></div><blockquote><p><strong>注意</strong>：模板路径总是绝对的。 如果在一个部件中，您从同一子目录渲染另一个部件，您仍然需要指定子目录的名称。</p></blockquote><h2 id="模板结构"><a href="#模板结构" class="header-anchor">#</a> 模板结构</h2><p>页面、部件和布局模板最多可以包含 3 个部分：<strong>配置</strong>、<strong>PHP 代码</strong> 和 <strong>Twig 标记</strong>。 每个部分用 <code>==</code> 序列分隔。</p><div class="language- extra-class"><pre class="language-text"><code>url = &quot;/blog&quot;
layout = &quot;default&quot;
==
function onStart()
{
    $this[&#39;posts&#39;] = ...;
}
==
&lt;h3&gt;博客存档&lt;/h3&gt;
{% for post in posts %}
    &lt;h4&gt;{{ post.title }}&lt;/h4&gt;
    {{ post.content }}
{% endfor %}
</code></pre></div><p><a id="oc-configuration-section"></a></p><h3 id="配置部分"><a href="#配置部分" class="header-anchor">#</a> 配置部分</h3>`,16)),s[5]||(s[5]=n("p",null,[t("配置部分设置模板参数。 支持的配置参数特定于不同的 CMS 模板，并在其相应的文档文章中进行了描述。 配置部分使用简单的 "),n("a",{href:"http://en.wikipedia.org/wiki/INI_file",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[t("INI格式"),n("span",null,[n("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[n("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),t(),n("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),t(),n("span",{class:"sr-only"},"(opens new window)")])]),t("，其中字符串参数值用引号括起来。 页面模板的示例配置部分：")],-1)),s[6]||(s[6]=e(`<div class="language-ini extra-class"><pre class="language-ini"><code><span class="token key attr-name">url</span> <span class="token punctuation">=</span> <span class="token value attr-value">&quot;<span class="token inner-value">/blog</span>&quot;</span>
<span class="token key attr-name">layout</span> <span class="token punctuation">=</span> <span class="token value attr-value">&quot;<span class="token inner-value">default</span>&quot;</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">component</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">parameter</span> <span class="token punctuation">=</span> <span class="token value attr-value">&quot;<span class="token inner-value">value</span>&quot;</span>
</code></pre></div><p><a id="oc-php-section"></a></p><h3 id="php-代码部分"><a href="#php-代码部分" class="header-anchor">#</a> PHP 代码部分</h3><p>PHP 部分中的代码每次在呈现模板之前都会执行。 PHP 部分对于所有 CMS 模板都是可选的，其内容取决于定义它的模板类型。 PHP 代码部分可以包含可选的打开和关闭 PHP 标记，以在文本编辑器中启用语法高亮显示。 打开和关闭标签应始终在与节分隔符 <code>==</code> 不同的行上指定。</p><div class="language- extra-class"><pre class="language-text"><code>url = &quot;/blog&quot;
layout = &quot;default&quot;
==
&lt;?
function onStart()
{
    $this[&#39;posts&#39;] = ...;
}
?&gt;
==
&lt;h3&gt;博客存档&lt;/h3&gt;
{% for post in posts %}
    &lt;h4&gt;{{ post.title }}&lt;/h4&gt;
    {{ post.content }}
{% endfor %}
</code></pre></div><p>在 PHP 部分，您只能定义函数并使用 PHP <code>use</code> 关键字引用命名空间。 PHP 部分中不允许使用其他 PHP 代码。 这是因为在解析页面时，PHP 部分会转换为 PHP 类。 使用命名空间引用的示例：</p><div class="language- extra-class"><pre class="language-text"><code>url = &quot;/blog&quot;
layout = &quot;default&quot;
==
&lt;?
use Acme\\Blog\\Classes\\Post;

function onStart()
{
    $this[&#39;posts&#39;] = Post::get();
}
?&gt;
==
</code></pre></div><p>作为设置变量的一般方法，您应该在 <code>$this</code> 上使用数组访问方法，但为了简单起见，您可以使用 <strong>object 访问作为只读</strong>，例如：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token comment">// 通过数组写入</span>
<span class="token variable">$this</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;foo&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;bar&#39;</span><span class="token punctuation">;</span>

<span class="token comment">// 通过数组读取</span>
<span class="token keyword">echo</span> <span class="token variable">$this</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;foo&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">// 通过对象读取</span>
<span class="token keyword">echo</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">foo</span><span class="token punctuation">;</span>
</code></pre></div><p><a id="oc-twig-section"></a></p><h3 id="twig标记部分"><a href="#twig标记部分" class="header-anchor">#</a> Twig标记部分</h3>`,11)),s[7]||(s[7]=n("p",null,[t("Twig 部分定义了模板要呈现的标记。在 Twig 部分，您可以使用函数、标签和过滤器 "),n("a",{href:"./../markup.html"},"由 October CMS 提供"),t("，所有 "),n("a",{href:"https://twig.symfony.com/doc/",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[t("native Twig 功能"),n("span",null,[n("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[n("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),t(),n("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),t(),n("span",{class:"sr-only"},"(opens new window)")])]),t(" ，或那些"),n("a",{href:"./../plugin/registration.html#oc-extending-twig"},"由插件提供"),t("。 Twig 部分的内容取决于模板类型(页面、布局或部件)。您可以在文档中进一步找到有关特定 Twig 对象的更多信息。")],-1)),s[8]||(s[8]=e(`<p>可以在 <a href="./../markup.html">标记指南</a> 中找到更多信息。</p><h2 id="数据库驱动的主题"><a href="#数据库驱动的主题" class="header-anchor">#</a> 数据库驱动的主题</h2><p>在某些情况下，您可能无权写入文件系统以更改主题。数据库驱动的主题允许您将 CMS 模板的所有更改存储在数据库中。</p><p>要为单个主题启用此功能，请导航至 <strong>Settings(设置) &gt; Frontend Theme(前端主题)</strong>，选择 <strong>Edit Properties(编辑属性)</strong> 并选中名为 <strong>Save Changes in Database(在数据库中保存更改)</strong> 的复选框。</p><p>或者，您可以使用配置项 <code>cms.database_templates</code> 或使用环境变量为所有主题全局启用此功能。</p><pre><code>CMS_DB_TEMPLATES=true
</code></pre><blockquote><p><strong>注意</strong>：图像和样式表等资产文件不会保存在数据库中，并且无法在没有访问文件系统的情况下进行修改。</p></blockquote><p><a id="oc-child-themes"></a></p><h2 id="子主题"><a href="#子主题" class="header-anchor">#</a> 子主题</h2><p>子主题允许主题继承的可能性。当您有第三方主题或处于只读模式的主题时，这是一个很好的用途。子主题将引用父主题并将其用作备份。</p><p>如果父主题中存在名为&quot;home.htm&quot;的页面但子主题中不存在，则将其视为相同； URL 处于活动状态，您可以像往常一样打开页面。在后端区域保存页面时，会在子主题中创建一个新文件来覆盖内容。</p><p>要为主题启用此功能，请导航至 <strong>Settings(设置) &gt; Frontend Theme(前端主题)</strong>，选择 <strong>Edit Properties(编辑属性)</strong> 并从 <strong>Parent Theme(父主题)</strong> 下拉列表中选择父项。</p><h3 id="主题锁定文件"><a href="#主题锁定文件" class="header-anchor">#</a> 主题锁定文件</h3><p>从第三方安装主题时，需要注意的是，当主题更新时，所有文件都可能被覆盖。这可能会导致对主题所做的任何自定义丢失。作为一种安全机制，包含一个名为 <code>.themelock</code> 的文件以保护主题免受系统更新期间可能丢失的任何更改。</p><p>当文件<code>.themelock</code> 出现在主题目录中时：</p><ul><li>主题只能被选为父主题</li><li>主题不会出现在后端 UI 中</li><li>主题不能被选为活动的</li></ul><h2 id="主题日志"><a href="#主题日志" class="header-anchor">#</a> 主题日志</h2><p>由于布局和页面将大部分数据存储在静态文件中，您或您的客户可能会意外丢失内容。例如，切换页面布局会修改页面的结构，因此会导致数据丢失。</p><p>October CMS 可以记录对主题所做的每个更改，称为主题日志记录，默认情况下禁用此功能。要启用主题日志，请转至 <strong>设置 &gt; 日志设置</strong> 并启用 <strong>日志主题更改</strong>。</p><p>您现在可以通过 <strong>设置 &gt; 主题日志</strong> 查看主题更改日志，您可以在其中查看每个更改的概述。如有必要，您可以使用此信息来决定适当的操作来帮助恢复这些更改。</p>`,20))])}const b=p(g,[["render",u]]);export{w as __pageData,b as default};
