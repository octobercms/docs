import{_ as p,r as a,o,c,e as s,a as l,s as u}from"./chunks/framework.CXcwiNg-.js";const h=JSON.parse('{"title":"Repeater 字段 - October CMS - 3.x","titleTemplate":false,"description":"表单小部件","frontmatter":{"subtitle":"表单小部件","shortname":"Repeater"},"headers":[{"level":2,"title":"分组重复器","slug":"分组重复器","link":"#分组重复器","children":[]},{"level":2,"title":"使用关联记录的示例","slug":"使用关联记录的示例","link":"#使用关联记录的示例","children":[]}],"relativePath":"3.x/zh-cn/element/form/widget-repeater.md","filePath":"3.x/zh-cn/element/form/widget-repeater.md"}'),r={name:"3.x/zh-cn/element/form/widget-repeater.md"};function k(i,n,d,g,y,m){const t=a("pre-heading"),e=a("post-heading");return o(),c("div",null,[s(t),n[0]||(n[0]=l("h1",null,"Repeater 字段",-1)),s(e),n[1]||(n[1]=u(`<p><code>repeater</code> - 使用关联记录或 <a href="./../../extend/system/models.html">jsonable 属性</a>渲染一组重复的表单字段。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">extra_information</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> repeater
    <span class="token key atrule">form</span><span class="token punctuation">:</span>
        <span class="token key atrule">fields</span><span class="token punctuation">:</span>
            <span class="token key atrule">added_at</span><span class="token punctuation">:</span>
                <span class="token key atrule">label</span><span class="token punctuation">:</span> Date Added
                <span class="token key atrule">type</span><span class="token punctuation">:</span> datepicker
            <span class="token key atrule">details</span><span class="token punctuation">:</span>
                <span class="token key atrule">label</span><span class="token punctuation">:</span> Details
                <span class="token key atrule">type</span><span class="token punctuation">:</span> textarea
</code></pre></div><p>以下<a href="./../form-fields.html">字段属性</a>受支持且常用。</p><div class="table"><table tabindex="0"><thead><tr><th>属性</th><th>描述</th></tr></thead><tbody><tr><td><strong>label</strong></td><td>向用户显示表单字段时使用的名称。</td></tr><tr><td><strong>default</strong></td><td>指定默认数组值，可选。</td></tr><tr><td><strong>comment</strong></td><td>在字段下方放置描述性注释。</td></tr><tr><td><strong>form</strong></td><td>内联字段定义或表单字段定义文件的引用。</td></tr><tr><td><strong>prompt</strong></td><td>为创建按钮显示的文本。默认值：Add new item。</td></tr><tr><td><strong>displayMode</strong></td><td>控制界面的显示方式，可选 <strong>accordion</strong> 或 <strong>builder</strong>。默认值：<code>accordion</code></td></tr><tr><td><strong>useTabs</strong></td><td>启用时显示选项卡，允许字段指定 <code>tab</code> 属性。默认值：<code>false</code></td></tr><tr><td><strong>itemsExpanded</strong></td><td>使用手风琴模式时，重复项目是否默认展开。默认值：<code>true</code>。</td></tr><tr><td><strong>titleFrom</strong></td><td>项目内用作折叠项目标题的字段名称，可选。</td></tr><tr><td><strong>minItems</strong></td><td>所需的最少项目数。不使用分组时预显示这些项目。例如，如果设置 <code>minItems: 1</code>，第一行将显示而不是隐藏。</td></tr><tr><td><strong>maxItems</strong></td><td>重复器内允许的最大项目数。</td></tr><tr><td><strong>groups</strong></td><td>引用一组表单字段，将重复器置于分组模式（见下文）。也可以使用内联定义。</td></tr><tr><td><strong>groupKeyFrom</strong></td><td>与保存数据一起存储的分组键属性。默认值：<code>_group</code></td></tr><tr><td><strong>showReorder</strong></td><td>显示用于排序项目的界面。默认值：true</td></tr><tr><td><strong>showDuplicate</strong></td><td>显示用于克隆项目的界面。默认值：true</td></tr></tbody></table></div><p><code>titleFrom</code> 属性可用于指定重复器折叠时使用的值。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">extra_information</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> repeater
    <span class="token key atrule">titleFrom</span><span class="token punctuation">:</span> title_when_collapsed
    <span class="token key atrule">form</span><span class="token punctuation">:</span>
        <span class="token key atrule">fields</span><span class="token punctuation">:</span>
            <span class="token comment"># ...</span>
            <span class="token key atrule">title_when_collapsed</span><span class="token punctuation">:</span>
                <span class="token key atrule">label</span><span class="token punctuation">:</span> This field is the title when collapsed
                <span class="token key atrule">type</span><span class="token punctuation">:</span> text
</code></pre></div><p>重复器字段通过将 <code>useTabs</code> 属性设置为 <code>true</code> 来支持使用选项卡。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">extra_information</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> repeater
    <span class="token key atrule">useTabs</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">form</span><span class="token punctuation">:</span>
        <span class="token key atrule">added_at</span><span class="token punctuation">:</span>
            <span class="token key atrule">label</span><span class="token punctuation">:</span> Date added
            <span class="token key atrule">type</span><span class="token punctuation">:</span> datepicker
            <span class="token key atrule">tab</span><span class="token punctuation">:</span> Date
        <span class="token key atrule">details</span><span class="token punctuation">:</span>
            <span class="token key atrule">label</span><span class="token punctuation">:</span> Details
            <span class="token key atrule">type</span><span class="token punctuation">:</span> textarea
            <span class="token key atrule">tab</span><span class="token punctuation">:</span> Details
</code></pre></div><h2 id="分组重复器"><a href="#分组重复器" class="header-anchor">#</a> 分组重复器</h2><p>重复器字段支持使用 <code>groups</code> 的分组模式，允许为每次迭代选择一组自定义字段。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">content</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> repeater
    <span class="token key atrule">prompt</span><span class="token punctuation">:</span> Add content block
    <span class="token key atrule">groups</span><span class="token punctuation">:</span> $/acme/blog/config/fields_repeater.yaml
</code></pre></div><p>这是一个分组配置文件的示例，位于 <strong>/plugins/acme/blog/config/fields_repeater.yaml</strong>。为了更好的组织，<code>groups</code> 可以为每个分组定义指定一个文件。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">groups</span><span class="token punctuation">:</span>
    <span class="token key atrule">textarea</span><span class="token punctuation">:</span> $/acme/blog/config/fields_textarea.yaml
    <span class="token key atrule">quote</span><span class="token punctuation">:</span> $/acme/blog/config/fields_quote.yaml
</code></pre></div><p>或者，定义可以与重复器内联指定。如果分组键以下划线（<code>_</code>）开头，则会被忽略。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">groups</span><span class="token punctuation">:</span>
    <span class="token key atrule">textarea</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> Textarea
        <span class="token key atrule">description</span><span class="token punctuation">:</span> Basic text field
        <span class="token key atrule">icon</span><span class="token punctuation">:</span> icon<span class="token punctuation">-</span>file<span class="token punctuation">-</span>text<span class="token punctuation">-</span>o
        <span class="token key atrule">fields</span><span class="token punctuation">:</span>
            <span class="token key atrule">text_area</span><span class="token punctuation">:</span>
                <span class="token key atrule">label</span><span class="token punctuation">:</span> Text Content
                <span class="token key atrule">type</span><span class="token punctuation">:</span> textarea
                <span class="token key atrule">size</span><span class="token punctuation">:</span> large

    <span class="token key atrule">quote</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> Quote
        <span class="token key atrule">description</span><span class="token punctuation">:</span> Quote item
        <span class="token key atrule">icon</span><span class="token punctuation">:</span> icon<span class="token punctuation">-</span>quote<span class="token punctuation">-</span>right
        <span class="token key atrule">fields</span><span class="token punctuation">:</span>
            <span class="token key atrule">quote_position</span><span class="token punctuation">:</span>
                <span class="token key atrule">span</span><span class="token punctuation">:</span> auto
                <span class="token key atrule">label</span><span class="token punctuation">:</span> Quote Position
                <span class="token key atrule">type</span><span class="token punctuation">:</span> radio
                <span class="token key atrule">options</span><span class="token punctuation">:</span>
                    <span class="token key atrule">left</span><span class="token punctuation">:</span> Left
                    <span class="token key atrule">center</span><span class="token punctuation">:</span> Center
                    <span class="token key atrule">right</span><span class="token punctuation">:</span> Right
            <span class="token key atrule">quote_content</span><span class="token punctuation">:</span>
                <span class="token key atrule">span</span><span class="token punctuation">:</span> auto
                <span class="token key atrule">label</span><span class="token punctuation">:</span> Details
                <span class="token key atrule">type</span><span class="token punctuation">:</span> textarea
</code></pre></div><p>每个分组必须指定唯一的键，定义支持以下选项。</p><div class="table"><table tabindex="0"><thead><tr><th>选项</th><th>描述</th></tr></thead><tbody><tr><td><strong>name</strong></td><td>分组的名称。</td></tr><tr><td><strong>description</strong></td><td>分组的简要描述。</td></tr><tr><td><strong>icon</strong></td><td>为分组定义图标，可选。</td></tr><tr><td><strong>titleFrom</strong></td><td>用于项目标题的字段名称，可选。</td></tr><tr><td><strong>fields</strong></td><td>属于该分组的表单字段。</td></tr><tr><td><strong>useTabs</strong></td><td>仅为该分组显示选项卡，可选。</td></tr></tbody></table></div><div class="custom-block tip"><p>分组键与保存的数据一起存储为 <code>_group</code> 属性。这可以通过 <code>groupKeyFrom</code> 选项进行自定义。</p></div><h2 id="使用关联记录的示例"><a href="#使用关联记录的示例" class="header-anchor">#</a> 使用关联记录的示例</h2><p>重复器表单小部件将自动检测模型属性是否为关联字段并使用它。以下提供了一个可供使用的示例实现。例如，如果您的模型使用引用 <strong>RepeaterItem</strong> 模型的 <code>hasMany</code> 关系，重复器将为每个项目使用此关联模型。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token variable">$hasMany</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token string single-quoted-string">&#39;extra_information&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
        <span class="token class-name static-context">RepeaterItem</span><span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;key&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;parent_id&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;delete&#39;</span> <span class="token operator">=&gt;</span> <span class="token constant boolean">true</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre></div><p>可以定义一个简单的<a href="./../../extend/database/structure.html">数据库表结构</a>，包括对父模型 <code>id</code> 的引用和用于动态属性的序列化 JSON <code>value</code>（见下文）。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token class-name static-context">Schema</span><span class="token operator">::</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;acme_blog_repeater_items&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token variable">$table</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token variable">$table</span><span class="token operator">-&gt;</span><span class="token function">increments</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;id&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token variable">$table</span><span class="token operator">-&gt;</span><span class="token function">integer</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;parent_id&#39;</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token function">unsigned</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token function">nullable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token function">index</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token variable">$table</span><span class="token operator">-&gt;</span><span class="token function">mediumText</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;value&#39;</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token function">nullable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token variable">$table</span><span class="token operator">-&gt;</span><span class="token function">integer</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;sort_order&#39;</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token function">nullable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token variable">$table</span><span class="token operator">-&gt;</span><span class="token function">timestamps</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>模型扩展 <code>October\\Rain\\Database\\ExpandoModel</code> 基类，以允许在模型上设置动态属性并以 JSON 格式保存在数据库中。模型可以<a href="./../../extend/database/attachments.html">包含附件</a>和任何其他关联字段。</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">use</span> <span class="token package">October<span class="token punctuation">\\</span>Rain<span class="token punctuation">\\</span>Database<span class="token punctuation">\\</span>ExpandoModel</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">RepeaterItem</span> <span class="token keyword">extends</span> <span class="token class-name">ExpandoModel</span>
<span class="token punctuation">{</span>
    <span class="token keyword">use</span> <span class="token package"><span class="token punctuation">\\</span>October<span class="token punctuation">\\</span>Rain<span class="token punctuation">\\</span>Database<span class="token punctuation">\\</span>Traits<span class="token punctuation">\\</span>Sortable</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token variable">$table</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;acme_blog_repeater_items&#39;</span><span class="token punctuation">;</span>

    <span class="token keyword">protected</span> <span class="token variable">$expandoPassthru</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;parent_id&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;sort_order&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token variable">$attachMany</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
        <span class="token string single-quoted-string">&#39;photos&#39;</span> <span class="token operator">=&gt;</span> <span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\\</span>System<span class="token punctuation">\\</span>Models<span class="token punctuation">\\</span>File</span><span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>最后，重复器项目可以指定为表单字段，附带表单字段定义，包括使用<a href="./../../extend/database/relations.html">模型关系</a>的字段。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">extra_information</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> repeater
    <span class="token key atrule">form</span><span class="token punctuation">:</span>
        <span class="token key atrule">fields</span><span class="token punctuation">:</span>
            <span class="token key atrule">title</span><span class="token punctuation">:</span>
                <span class="token key atrule">label</span><span class="token punctuation">:</span> title
            <span class="token key atrule">is_enabled</span><span class="token punctuation">:</span>
                <span class="token key atrule">label</span><span class="token punctuation">:</span> Enabled
                <span class="token key atrule">type</span><span class="token punctuation">:</span> switch
            <span class="token key atrule">photos</span><span class="token punctuation">:</span>
                <span class="token key atrule">label</span><span class="token punctuation">:</span> Photos
                <span class="token key atrule">type</span><span class="token punctuation">:</span> fileupload
                <span class="token key atrule">mode</span><span class="token punctuation">:</span> image
</code></pre></div>`,27))])}const f=p(r,[["render",k]]);export{h as __pageData,f as default};
