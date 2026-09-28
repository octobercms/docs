import{_ as p,r as s,o,c,e as a,a as l,s as u}from"./chunks/framework.CXcwiNg-.js";const h=JSON.parse('{"title":"Область Dropdown - October CMS - 3.x","titleTemplate":false,"description":"Область фильтрации","frontmatter":{"subtitle":"Область фильтрации","shortname":"Dropdown"},"headers":[{"level":2,"title":"PHP-интерфейс","slug":"php-интерфеис","link":"#php-интерфеис","children":[]}],"relativePath":"3.x/ru/element/filter/scope-dropdown.md","filePath":"3.x/ru/element/filter/scope-dropdown.md"}'),r={name:"3.x/ru/element/filter/scope-dropdown.md"};function d(i,n,k,g,y,m){const t=s("pre-heading"),e=s("post-heading");return o(),c("div",null,[a(t),n[0]||(n[0]=l("h1",null,"Область Dropdown",-1)),a(e),n[1]||(n[1]=u(`<p><code>dropdown</code> — фильтрация с помощью одиночного выбора из нескольких элементов.</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">status</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> dropdown
    <span class="token key atrule">options</span><span class="token punctuation">:</span>
        <span class="token key atrule">pending</span><span class="token punctuation">:</span> Pending
        <span class="token key atrule">active</span><span class="token punctuation">:</span> Active
        <span class="token key atrule">closed</span><span class="token punctuation">:</span> Closed
</code></pre></div><p>Для фильтра доступны следующие свойства.</p><div class="table"><table tabindex="0"><thead><tr><th>Свойство</th><th>Описание</th></tr></thead><tbody><tr><td><strong>options</strong></td><td>доступные опции для фильтра, как массив.</td></tr><tr><td><strong>optionsMethod</strong></td><td>получает опции из метода, определённого в модели или как статический метод, например <code>Class::method</code>.</td></tr><tr><td><strong>conditions</strong></td><td>пользовательское SQL-выражение select для фильтра.</td></tr><tr><td><strong>emptyOption</strong></td><td>текст для отображения, когда нет доступных вариантов.</td></tr><tr><td><strong>modelScope</strong></td><td>применяет метод <a href="./../../extend/database/model.html">области запроса модели</a> к запросу фильтра, может быть именем метода модели или статическим методом PHP-класса (<code>Class::method</code>). Первый аргумент будет содержать запрос модели, к которому виджет прикрепляет своё значение, т.е. родительскую модель.</td></tr></tbody></table></div><p>Вы можете передать пользовательский SQL в conditions как строку, где <code>:value</code> содержит фильтруемое значение.</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">status</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> dropdown
    <span class="token key atrule">conditions</span><span class="token punctuation">:</span> status = <span class="token punctuation">:</span>value
    <span class="token comment"># ...</span>
</code></pre></div><p>Фильтр dropdown не отображает метку, свойство <code>emptyOption</code> может использоваться для задания состояния по умолчанию.</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">status</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> dropdown
    <span class="token key atrule">emptyOption</span><span class="token punctuation">:</span> Select Status
    <span class="token comment"># ...</span>
</code></pre></div><h2 id="php-интерфеис"><a href="#php-интерфеис" class="header-anchor">#</a> PHP-интерфейс</h2><p>Вы можете определить пользовательский <code>modelScope</code> в модели, используя следующий пример.</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">status</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Status
    <span class="token key atrule">type</span><span class="token punctuation">:</span> dropdown
    <span class="token key atrule">modelScope</span><span class="token punctuation">:</span> applyStatusCode
    <span class="token key atrule">options</span><span class="token punctuation">:</span>
        <span class="token key atrule">active</span><span class="token punctuation">:</span> Active
        <span class="token key atrule">deleted</span><span class="token punctuation">:</span> Deleted
</code></pre></div><p>Определение метода <strong>scopeApplyStatusCode</strong>, где значение находится в <code>$scope-&gt;value</code>.</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">scopeApplyStatusCode</span><span class="token punctuation">(</span><span class="token variable">$query</span><span class="token punctuation">,</span> <span class="token variable">$scope</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$scope</span><span class="token operator">-&gt;</span><span class="token property">value</span> <span class="token operator">===</span> <span class="token string single-quoted-string">&#39;active&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token variable">$query</span><span class="token operator">-&gt;</span><span class="token function">withoutTrashed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$scope</span><span class="token operator">-&gt;</span><span class="token property">value</span> <span class="token operator">===</span> <span class="token string single-quoted-string">&#39;deleted&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token variable">$query</span><span class="token operator">-&gt;</span><span class="token function">onlyTrashed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Вы можете динамически предоставлять опции, передав метод модели в свойство <code>optionsMethod</code>.</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">status</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Status
    <span class="token key atrule">type</span><span class="token punctuation">:</span> dropdown
    <span class="token key atrule">optionsMethod</span><span class="token punctuation">:</span> getStatusOptions
</code></pre></div><p>Определение метода <strong>getStatusOptions</strong>.</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">getStatusOptions</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span>
        <span class="token string single-quoted-string">&#39;active&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;Active&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;deleted&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;Deleted&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,17))])}const f=p(r,[["render",d]]);export{h as __pageData,f as default};
