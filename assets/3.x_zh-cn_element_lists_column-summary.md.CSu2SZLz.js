import{_ as o,r as n,o as p,c as l,e as s,a as c,s as r}from"./chunks/framework.CXcwiNg-.js";const h=JSON.parse('{"title":"Summary 列 - October CMS - 3.x","titleTemplate":false,"description":"列表列","frontmatter":{"subtitle":"列表列","shortname":"Summary"},"headers":[],"relativePath":"3.x/zh-cn/element/lists/column-summary.md","filePath":"3.x/zh-cn/element/lists/column-summary.md"}'),u={name:"3.x/zh-cn/element/lists/column-summary.md"};function m(i,a,d,k,y,_){const e=n("pre-heading"),t=n("post-heading");return p(),l("div",null,[s(e),a[0]||(a[0]=c("h1",null,"Summary 列",-1)),s(t),a[1]||(a[1]=r(`<p><code>summary</code> - 生成摘要值，去除 HTML 并将长度限制到最近的单词边界。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">html_content</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Content
    <span class="token key atrule">type</span><span class="token punctuation">:</span> summary
</code></pre></div><p>默认摘要长度为 40 个字符，您可以使用 <code>limitChars</code> 选项进行调整。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">html_content</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Content
    <span class="token key atrule">type</span><span class="token punctuation">:</span> summary
    <span class="token key atrule">limitChars</span><span class="token punctuation">:</span> <span class="token number">100</span>
</code></pre></div><p>要按单词数量限制，请指定 <code>limitWords</code> 选项。您也可以使用 <code>endChars</code> 选项更改结尾后缀字符。</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">html_content</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Content
    <span class="token key atrule">type</span><span class="token punctuation">:</span> summary
    <span class="token key atrule">limitWords</span><span class="token punctuation">:</span> <span class="token number">10</span>
    <span class="token key atrule">endChars</span><span class="token punctuation">:</span> <span class="token string">&quot;...&quot;</span>
</code></pre></div>`,6))])}const C=o(u,[["render",m]]);export{h as __pageData,C as default};
