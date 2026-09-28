import{_ as o,r as s,o as l,c as p,e as n,a as c,s as u}from"./chunks/framework.CXcwiNg-.js";const g=JSON.parse('{"title":"Summary Column - October CMS - 4.x","titleTemplate":false,"description":"List Column","frontmatter":{"subtitle":"List Column","shortname":"Summary"},"headers":[],"relativePath":"4.x/element/lists/column-summary.md","filePath":"4.x/element/lists/column-summary.md"}'),r={name:"4.x/element/lists/column-summary.md"};function m(i,a,d,k,y,_){const e=s("pre-heading"),t=s("post-heading");return l(),p("div",null,[n(e),a[0]||(a[0]=c("h1",null,"Summary Column",-1)),n(t),a[1]||(a[1]=u(`<p><code>summary</code> - generates a summary value, strips HTML and limits length to the closest word boundary.</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">html_content</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Content
    <span class="token key atrule">type</span><span class="token punctuation">:</span> summary
</code></pre></div><p>The default summary length is 40 characters, you may adjust it with the <code>limitChars</code> option.</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">html_content</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Content
    <span class="token key atrule">type</span><span class="token punctuation">:</span> summary
    <span class="token key atrule">limitChars</span><span class="token punctuation">:</span> <span class="token number">100</span>
</code></pre></div><p>To limit by word count instead, specify the <code>limitWords</code> option instead. You may also change the end suffix characters with the <code>endChars</code> option.</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">html_content</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Content
    <span class="token key atrule">type</span><span class="token punctuation">:</span> summary
    <span class="token key atrule">limitWords</span><span class="token punctuation">:</span> <span class="token number">10</span>
    <span class="token key atrule">endChars</span><span class="token punctuation">:</span> <span class="token string">&quot;...&quot;</span>
</code></pre></div>`,6))])}const C=o(r,[["render",m]]);export{g as __pageData,C as default};
