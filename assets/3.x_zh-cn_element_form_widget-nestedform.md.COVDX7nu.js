import{_ as o,r as e,o as l,c as p,e as n,a as c,s as r}from"./chunks/framework.CXcwiNg-.js";const h=JSON.parse('{"title":"Nested Form 字段 - October CMS - 3.x","titleTemplate":false,"description":"表单小部件","frontmatter":{"subtitle":"表单小部件","shortname":"Nested Form"},"headers":[{"level":4,"title":"另请参阅","slug":"另请参阅","link":"#另请参阅","children":[]}],"relativePath":"3.x/zh-cn/element/form/widget-nestedform.md","filePath":"3.x/zh-cn/element/form/widget-nestedform.md"}'),d={name:"3.x/zh-cn/element/form/widget-nestedform.md"};function u(i,a,k,m,y,f){const s=e("pre-heading"),t=e("post-heading");return l(),p("div",null,[n(s),a[0]||(a[0]=c("h1",null,"Nested Form 字段",-1)),n(t),a[1]||(a[1]=r(`<p><code>nestedform</code> - 使用关联记录或 <a href="./../../extend/system/models.html">jsonable 属性</a>渲染嵌套表单。字段可以内联定义或使用外部 yaml 文件。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">content</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> nestedform
    <span class="token key atrule">showPanel</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
    <span class="token key atrule">form</span><span class="token punctuation">:</span>
        <span class="token key atrule">fields</span><span class="token punctuation">:</span>
            <span class="token key atrule">added_at</span><span class="token punctuation">:</span>
                <span class="token key atrule">label</span><span class="token punctuation">:</span> Date Added
                <span class="token key atrule">type</span><span class="token punctuation">:</span> datepicker
            <span class="token key atrule">details</span><span class="token punctuation">:</span>
                <span class="token key atrule">label</span><span class="token punctuation">:</span> Details
                <span class="token key atrule">type</span><span class="token punctuation">:</span> textarea
            <span class="token key atrule">title</span><span class="token punctuation">:</span>
                <span class="token key atrule">label</span><span class="token punctuation">:</span> This the title
                <span class="token key atrule">type</span><span class="token punctuation">:</span> text
</code></pre></div><p>以下<a href="./../form-fields.html">字段属性</a>受支持且常用。</p><div class="table"><table tabindex="0"><thead><tr><th>属性</th><th>描述</th></tr></thead><tbody><tr><td><strong>label</strong></td><td>向用户显示表单字段时使用的名称。</td></tr><tr><td><strong>comment</strong></td><td>在字段下方放置描述性注释。</td></tr><tr><td><strong>form</strong></td><td>内联字段定义或表单字段定义文件的引用。</td></tr><tr><td><strong>showPanel</strong></td><td>将表单放在面板容器内。默认值：<code>true</code></td></tr><tr><td><strong>defaultCreate</strong></td><td>如果未找到关联记录，尝试创建一个。默认值：<code>false</code></td></tr></tbody></table></div><p>将字符串传递给 <code>form</code> 属性以引用外部 yaml 文件。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">profile</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Profile
    <span class="token key atrule">type</span><span class="token punctuation">:</span> nestedform
    <span class="token key atrule">form</span><span class="token punctuation">:</span> $/october/demo/models/profile/fields.yaml
</code></pre></div><p>与其他表单一样，嵌套表单小部件支持使用选项卡，只需将字段放在 <code>form</code> 定义的 <code>tabs</code> 或 <code>secondaryTabs</code> 属性下即可。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">tabbed_content</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> nestedform
    <span class="token key atrule">form</span><span class="token punctuation">:</span>
        <span class="token key atrule">tabs</span><span class="token punctuation">:</span>
            <span class="token key atrule">fields</span><span class="token punctuation">:</span>
                <span class="token comment"># ...</span>
</code></pre></div><h4 id="另请参阅"><a href="#另请参阅" class="header-anchor">#</a> 另请参阅</h4><div class="custom-block also"><ul><li><a href="./widget-repeater.html">Repeater 表单小部件</a></li></ul></div>`,10))])}const _=o(d,[["render",u]]);export{h as __pageData,_ as default};
