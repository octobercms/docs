import{_ as o,r as e,o as l,c as p,e as s,a as c,s as r}from"./chunks/framework.CXcwiNg-.js";const h=JSON.parse('{"title":"Поле Nested Form - October CMS - 3.x","titleTemplate":false,"description":"Виджет формы","frontmatter":{"subtitle":"Виджет формы","shortname":"Nested Form"},"headers":[{"level":4,"title":"См. также","slug":"см-также","link":"#см-также","children":[]}],"relativePath":"3.x/ru/element/form/widget-nestedform.md","filePath":"3.x/ru/element/form/widget-nestedform.md"}'),d={name:"3.x/ru/element/form/widget-nestedform.md"};function u(i,a,k,m,y,f){const n=e("pre-heading"),t=e("post-heading");return l(),p("div",null,[s(n),a[0]||(a[0]=c("h1",null,"Поле Nested Form",-1)),s(t),a[1]||(a[1]=r(`<p><code>nestedform</code> — рендерит вложенную форму, используя связанную запись или <a href="./../../extend/system/models.html">атрибут jsonable</a>. Поля могут быть определены инлайн или с использованием внешнего yaml-файла.</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">content</span><span class="token punctuation">:</span>
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
</code></pre></div><p>Поддерживаются и обычно используются следующие <a href="./../form-fields.html">свойства поля</a>.</p><div class="table"><table tabindex="0"><thead><tr><th>Свойство</th><th>Описание</th></tr></thead><tbody><tr><td><strong>label</strong></td><td>имя при отображении поля формы пользователю.</td></tr><tr><td><strong>comment</strong></td><td>пояснительный комментарий под полем.</td></tr><tr><td><strong>form</strong></td><td>инлайн-определения полей или ссылка на файл определения полей формы.</td></tr><tr><td><strong>showPanel</strong></td><td>размещает форму внутри контейнера панели. По умолчанию: <code>true</code></td></tr><tr><td><strong>defaultCreate</strong></td><td>если связанная запись не найдена, попытаться создать её. По умолчанию: <code>false</code></td></tr></tbody></table></div><p>Передайте строку в свойство <code>form</code> для ссылки на внешний yaml-файл.</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">profile</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Profile
    <span class="token key atrule">type</span><span class="token punctuation">:</span> nestedform
    <span class="token key atrule">form</span><span class="token punctuation">:</span> $/october/demo/models/profile/fields.yaml
</code></pre></div><p>Как и любая другая форма, виджет вложенной формы поддерживает использование вкладок, размещая поля под свойствами <code>tabs</code> или <code>secondaryTabs</code> определения <code>form</code>.</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">tabbed_content</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> nestedform
    <span class="token key atrule">form</span><span class="token punctuation">:</span>
        <span class="token key atrule">tabs</span><span class="token punctuation">:</span>
            <span class="token key atrule">fields</span><span class="token punctuation">:</span>
                <span class="token comment"># ...</span>
</code></pre></div><h4 id="см-также"><a href="#см-также" class="header-anchor">#</a> См. также</h4><div class="custom-block also"><ul><li><a href="./widget-repeater.html">Виджет формы Repeater</a></li></ul></div>`,10))])}const _=o(d,[["render",u]]);export{h as __pageData,_ as default};
