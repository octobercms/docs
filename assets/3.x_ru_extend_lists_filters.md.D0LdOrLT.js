import{_ as p,r as s,o,c,e as a,a as l,s as u}from"./chunks/framework.CXcwiNg-.js";const h=JSON.parse('{"title":"Фильтрация записей - October CMS - 3.x","titleTemplate":false,"description":"Узнайте, как фильтровать записи в списке.","frontmatter":{"subtitle":"Узнайте, как фильтровать записи в списке."},"headers":[{"level":2,"title":"Настройка поведения","slug":"настроика-поведения","link":"#настроика-поведения","children":[]},{"level":2,"title":"Определение областей фильтра","slug":"определение-областеи-фильтра","link":"#определение-областеи-фильтра","children":[{"level":3,"title":"Зависимости фильтров","slug":"зависимости-фильтров","link":"#зависимости-фильтров","children":[]}]}],"relativePath":"3.x/ru/extend/lists/filters.md","filePath":"3.x/ru/extend/lists/filters.md"}'),i={name:"3.x/ru/extend/lists/filters.md"};function k(r,n,d,y,g,m){const t=s("pre-heading"),e=s("post-heading");return o(),c("div",null,[a(t),n[0]||(n[0]=l("h1",null,"Фильтрация записей",-1)),a(e),n[1]||(n[1]=u(`<p>October CMS предоставляет возможности для фильтрации записей базы данных. Для поведений, поддерживающих фильтры, вы можете определить свойство <strong>filter</strong> для включения этой функции. Области обычно хранятся в директории конфигурации модели как <strong>scopes.yaml</strong>.</p><h2 id="настроика-поведения"><a href="#настроика-поведения" class="header-anchor">#</a> Настройка поведения</h2><p>Поведения панели управления <a href="./list-controller.html">Контроллер списков</a> и <a href="./../forms/relation-controller.html">Контроллер связей</a> могут быть отфильтрованы путём добавления свойства <strong>filter</strong> в конфигурацию. При определении доступные фильтры отображаются над списком.</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token comment"># config_list.yaml</span>

<span class="token comment"># ...</span>

<span class="token comment"># Displays the list filter</span>
<span class="token key atrule">filter</span><span class="token punctuation">:</span> $/october/test/models/user/scopes.yaml
</code></pre></div><h2 id="определение-областеи-фильтра"><a href="#определение-областеи-фильтра" class="header-anchor">#</a> Определение областей фильтра</h2><div class="custom-block aside"><p>Доступные свойства областей фильтра можно найти на странице <a href="./../../element/filter-scopes.html">определений областей фильтра</a>.</p></div><p>Аналогично фильтры управляются собственным файлом конфигурации, содержащим <strong>области</strong> фильтра. Каждая область — это аспект, по которому список может быть отфильтрован. Следующий пример показывает типичное содержимое файла определения фильтра.</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token comment"># scopes.yaml</span>
<span class="token key atrule">scopes</span><span class="token punctuation">:</span>

    <span class="token key atrule">category</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Category
        <span class="token key atrule">modelClass</span><span class="token punctuation">:</span> Acme\\Blog\\Models\\Category
        <span class="token key atrule">conditions</span><span class="token punctuation">:</span> category_id in (<span class="token punctuation">:</span>value)
        <span class="token key atrule">nameFrom</span><span class="token punctuation">:</span> name

    <span class="token key atrule">status</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Status
        <span class="token key atrule">type</span><span class="token punctuation">:</span> group
        <span class="token key atrule">conditions</span><span class="token punctuation">:</span> status in (<span class="token punctuation">:</span>value)
        <span class="token key atrule">options</span><span class="token punctuation">:</span>
            <span class="token key atrule">pending</span><span class="token punctuation">:</span> Pending
            <span class="token key atrule">active</span><span class="token punctuation">:</span> Active
            <span class="token key atrule">closed</span><span class="token punctuation">:</span> Closed

    <span class="token key atrule">published</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Hide published
        <span class="token key atrule">type</span><span class="token punctuation">:</span> checkbox
        <span class="token key atrule">default</span><span class="token punctuation">:</span> <span class="token number">1</span>
        <span class="token key atrule">conditions</span><span class="token punctuation">:</span> is_published &lt;<span class="token punctuation">&gt;</span> true

    <span class="token key atrule">approved</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Approved
        <span class="token key atrule">type</span><span class="token punctuation">:</span> switch
        <span class="token key atrule">default</span><span class="token punctuation">:</span> <span class="token number">2</span>
        <span class="token key atrule">conditions</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> is_approved &lt;<span class="token punctuation">&gt;</span> true
            <span class="token punctuation">-</span> is_approved = true

    <span class="token key atrule">created_at</span><span class="token punctuation">:</span>
        <span class="token key atrule">label</span><span class="token punctuation">:</span> Date
        <span class="token key atrule">type</span><span class="token punctuation">:</span> date
        <span class="token key atrule">conditions</span><span class="token punctuation">:</span>
            <span class="token key atrule">after</span><span class="token punctuation">:</span> created_at <span class="token punctuation">&gt;</span>= &#39;<span class="token punctuation">:</span>value&#39;
            <span class="token key atrule">between</span><span class="token punctuation">:</span> created_at <span class="token punctuation">&gt;</span>= &#39;<span class="token punctuation">:</span>after&#39; AND created_at &lt;= &#39;<span class="token punctuation">:</span>before&#39;
</code></pre></div><h3 id="зависимости-фильтров"><a href="#зависимости-фильтров" class="header-anchor">#</a> Зависимости фильтров</h3><p>Области фильтра могут объявлять зависимости от других областей, определяя свойство <code>dependsOn</code>, которое обеспечивает серверное решение для обновления областей при изменении их зависимостей. Когда области, объявленные как зависимости, изменяются, определяющая область сбрасывается и обновляется динамически. Это предоставляет возможность изменять доступные параметры, предоставляемые области.</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">country</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Country
    <span class="token key atrule">type</span><span class="token punctuation">:</span> group
    <span class="token key atrule">conditions</span><span class="token punctuation">:</span> country_id in (<span class="token punctuation">:</span>value)
    <span class="token key atrule">modelClass</span><span class="token punctuation">:</span> October\\Test\\Models\\Location
    <span class="token key atrule">options</span><span class="token punctuation">:</span> getCountryOptions

<span class="token key atrule">city</span><span class="token punctuation">:</span>
    <span class="token key atrule">label</span><span class="token punctuation">:</span> City
    <span class="token key atrule">type</span><span class="token punctuation">:</span> group
    <span class="token key atrule">conditions</span><span class="token punctuation">:</span> city_id in (<span class="token punctuation">:</span>value)
    <span class="token key atrule">modelClass</span><span class="token punctuation">:</span> October\\Test\\Models\\Location
    <span class="token key atrule">options</span><span class="token punctuation">:</span> getCityOptions
    <span class="token key atrule">dependsOn</span><span class="token punctuation">:</span> country
</code></pre></div><p>В приведённом выше примере область <code>city</code> обновится, когда область <code>country</code> изменится. Любая область, определяющая свойство <code>dependsOn</code>, получит все текущие объекты областей виджета фильтра, включая их текущие значения, в виде массива, индексированного по именам областей.</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">getCountryOptions</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name static-context">Country</span><span class="token operator">::</span><span class="token function">lists</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;name&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;id&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">getCityOptions</span><span class="token punctuation">(</span><span class="token variable">$scopes</span> <span class="token operator">=</span> <span class="token constant">null</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">empty</span><span class="token punctuation">(</span><span class="token variable">$scopes</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;country&#39;</span><span class="token punctuation">]</span><span class="token operator">-&gt;</span><span class="token property">value</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name static-context">City</span><span class="token operator">::</span><span class="token function">whereIn</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;country_id&#39;</span><span class="token punctuation">,</span> <span class="token variable">$scopes</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;country&#39;</span><span class="token punctuation">]</span><span class="token operator">-&gt;</span><span class="token property">value</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token function">lists</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;name&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;id&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name static-context">City</span><span class="token operator">::</span><span class="token function">lists</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;name&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;id&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Вы можете фильтровать определения областей фильтра, переопределив метод <code>filterScopes</code> внутри используемой модели. Это позволяет вам управлять видимостью и другими свойствами областей на основе значений других областей. Метод принимает два аргумента: <strong>$scopes</strong> будет представлять объект областей, уже определённых конфигурацией областей, а <strong>$context</strong> представляет активный контекст фильтра.</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">filterScopes</span><span class="token punctuation">(</span><span class="token variable">$scopes</span><span class="token punctuation">,</span> <span class="token variable">$context</span> <span class="token operator">=</span> <span class="token constant">null</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$scopes</span><span class="token operator">-&gt;</span><span class="token property">disable_roles</span><span class="token operator">-&gt;</span><span class="token property">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token variable">$scopes</span><span class="token operator">-&gt;</span><span class="token property">roles</span><span class="token operator">-&gt;</span><span class="token property">hidden</span> <span class="token operator">=</span> <span class="token constant boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Приведённая выше логика скроет область <code>roles</code>, если значение <code>disable_roles</code> отмечено. Логика будет применяться при первой загрузке фильтра, а также при обновлении зависимостью области. Например, вот соответствующие определения областей фильтра.</p><div class="language-yaml extra-class"><pre class="language-yaml"><code><span class="token key atrule">disable_roles</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> checkbox
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Disable Roles

<span class="token key atrule">roles</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> text
    <span class="token key atrule">label</span><span class="token punctuation">:</span> Role
    <span class="token key atrule">dependsOn</span><span class="token punctuation">:</span> disable_roles
</code></pre></div>`,17))])}const b=p(i,[["render",k]]);export{h as __pageData,b as default};
