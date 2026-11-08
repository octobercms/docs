import{_ as o,r as a,o as l,c as p,e as t,a as r,s as c}from"./chunks/framework.CXcwiNg-.js";const h=JSON.parse('{"title":"Nested Form Field - October CMS - 4.x","titleTemplate":false,"description":"Form Widget","frontmatter":{"subtitle":"Form Widget","shortname":"Nested Form"},"headers":[{"level":4,"title":"See Also","slug":"see-also","link":"#see-also","children":[]}],"relativePath":"4.x/element/form/widget-nestedform.md","filePath":"4.x/element/form/widget-nestedform.md"}'),d={name:"4.x/element/form/widget-nestedform.md"};function i(u,e,k,m,f,y){const n=a("pre-heading"),s=a("post-heading");return l(),p("div",null,[t(n),e[0]||(e[0]=r("h1",null,"Nested Form Field",-1)),t(s),e[1]||(e[1]=c(`<p><code>nestedform</code> - renders a nested form using a related record or <a href="./../../extend/system/models.html">jsonable attribute</a>. Fields can be defined inline or using an external yaml file.</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">content</span><span class="token punctuation">:</span>
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
</code></pre></div><p>The following <a href="./../form-fields.html">field properties</a> are supported and commonly used.</p><div class="table"><table tabindex="0"><thead><tr><th>Property</th><th>Description</th></tr></thead><tbody><tr><td><strong>label</strong></td><td>a name when displaying the form field to the user.</td></tr><tr><td><strong>comment</strong></td><td>places a descriptive comment below the field.</td></tr><tr><td><strong>form</strong></td><td>inline field definitions or a reference to form field definition file.</td></tr><tr><td><strong>showPanel</strong></td><td>places the form inside a panel container. Default: <code>true</code></td></tr><tr><td><strong>defaultCreate</strong></td><td>if a related record is not found, attempt to create one. Default: <code>false</code></td></tr></tbody></table></div><p>Pass a string to the <code>form</code> property to reference an external yaml file.</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">profile</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Profile
    <span class="token key atrule">type</span><span class="token punctuation">:</span> nestedform
    <span class="token key atrule">form</span><span class="token punctuation">:</span> $/october/demo/models/profile/fields.yaml
</code></pre></div><p>Like any other form, the nested form widget supports the use of tabs by placing the fields under the <code>tabs</code> or <code>secondaryTabs</code> properties of the <code>form</code> definition.</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">tabbed_content</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> nestedform
    <span class="token key atrule">form</span><span class="token punctuation">:</span>
        <span class="token key atrule">tabs</span><span class="token punctuation">:</span>
            <span class="token key atrule">fields</span><span class="token punctuation">:</span>
                <span class="token comment"># ...</span>
</code></pre></div><h4 id="see-also"><a href="#see-also" class="header-anchor">#</a> See Also</h4><div class="custom-block also"><ul><li><a href="./widget-repeater.html">Repeater Form Widget</a></li></ul></div>`,10))])}const b=o(d,[["render",i]]);export{h as __pageData,b as default};
