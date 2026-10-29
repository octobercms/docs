import{_ as l,r as t,o as r,c as i,e as p,a as s,d as n,s as e}from"./chunks/framework.CXcwiNg-.js";const f=JSON.parse('{"title":"修改器 - October CMS - 2.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"访问器 & 修改器","slug":"访问器-修改器","link":"#访问器-修改器","children":[{"level":4,"title":"定义一个访问器","slug":"定义一个访问器","link":"#定义一个访问器","children":[]},{"level":4,"title":"定义一个修改器","slug":"定义一个修改器","link":"#定义一个修改器","children":[]}]},{"level":2,"title":"日期转换器","slug":"日期转换器","link":"#日期转换器","children":[]},{"level":2,"title":"属性类型转换","slug":"属性类型转换","link":"#属性类型转换","children":[{"level":4,"title":"数组转换","slug":"数组转换","link":"#数组转换","children":[]}]}],"relativePath":"2.x/zh-cn/database/mutators.md","filePath":"2.x/zh-cn/database/mutators.md"}'),u={name:"2.x/zh-cn/database/mutators.md"};function k(d,a,g,h,m,v){const o=t("pre-heading"),c=t("post-heading");return r(),i("div",null,[p(o),a[0]||(a[0]=s("h1",null,"修改器",-1)),p(c),a[1]||(a[1]=s("p",null,[n("访问器和修改器允许您在从模型中检索属性或设置属性值时对其进行格式化。 例如，您可能希望使用 "),s("a",{href:"./../services/encryption.html"},"加密服务"),n(" 对存储在数据库中的值进行加密，然后在模型上访问该属性时自动解密该属性。")],-1)),a[2]||(a[2]=s("p",null,[n("除了自定义访问器和修改器，您还可以自动将日期字段转换为 "),s("a",{href:"https://github.com/briannesbitt/Carbon",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[n("Carbon"),s("span",null,[s("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[s("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),n(),s("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),n(),s("span",{class:"sr-only"},"(opens new window)")])]),n(" 实例，甚至 "),s("a",{href:"#oc-attribute-casting"},"将文本值转换为 JSON"),n("。")],-1)),a[3]||(a[3]=e(`<p><a id="oc-accessors-mutators"></a></p><h2 id="访问器-修改器"><a href="#访问器-修改器" class="header-anchor">#</a> 访问器 &amp; 修改器</h2><h4 id="定义一个访问器"><a href="#定义一个访问器" class="header-anchor">#</a> 定义一个访问器</h4><p>若要定义一个访问器， 则需在模型上创建一个 <code>getFooAttribute</code> 方法，要访问的 <code>Foo</code> 字段需使用&quot;驼峰式&quot;命名。 在这个示例中，我们将为 <code>first_name</code> 属性定义一个访问器。当模型尝试获取 <code>first_name</code> 属性时，将自动调用此访问器：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token keyword">namespace</span> <span class="token package">Acme<span class="token punctuation">\\</span>Blog<span class="token punctuation">\\</span>Models</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">Model</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">User</span> <span class="token keyword">extends</span> <span class="token class-name">Model</span>
<span class="token punctuation">{</span>
    <span class="token comment">/**
     * 获取用户的名字。
     *
     * @param  string  $value
     * @return string
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">getFirstNameAttribute</span><span class="token punctuation">(</span><span class="token variable">$value</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">ucfirst</span><span class="token punctuation">(</span><span class="token variable">$value</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre></div><p>如你所见，字段的原始值被传递到访问器中，允许你对它进行处理并返回结果。如果想获取被修改后的值，你可以在模型实例上访问 <code>first_name</code> 属性：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token variable">$user</span> <span class="token operator">=</span> <span class="token class-name static-context">User</span><span class="token operator">::</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token variable">$firstName</span> <span class="token operator">=</span> <span class="token variable">$user</span><span class="token operator">-&gt;</span><span class="token property">first_name</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="定义一个修改器"><a href="#定义一个修改器" class="header-anchor">#</a> 定义一个修改器</h4><p>若要定义一个修改器，则需在模型上面定义 <code>setFooAttribute</code> 方法。要访问的 <code>Foo</code> 字段使用&quot;驼峰式&quot;命名。让我们再来定义一个 <code>first_name</code> 属性的修改器。当我们尝试在模型上设置 <code>first_name</code> 属性值时，该修改器将被自动调用：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token keyword">namespace</span> <span class="token package">Acme<span class="token punctuation">\\</span>Blog<span class="token punctuation">\\</span>Models</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">Model</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">User</span> <span class="token keyword">extends</span> <span class="token class-name">Model</span>
<span class="token punctuation">{</span>
    <span class="token comment">/**
     * Set the user&#39;s first name.
     *
     * @param  string  $value
     * @return string
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">setFirstNameAttribute</span><span class="token punctuation">(</span><span class="token variable">$value</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">attributes</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;first_name&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">strtolower</span><span class="token punctuation">(</span><span class="token variable">$value</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre></div><p>修改器会获取属性已经被设置的值，允许你修改并且将其值设置到模型内部的 <code>$attributes</code> 属性上。举个例子，如果我们尝试将 <code>first_name</code> 属性的值设置为 <code>Sally</code>：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token variable">$user</span> <span class="token operator">=</span> <span class="token class-name static-context">User</span><span class="token operator">::</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token variable">$user</span><span class="token operator">-&gt;</span><span class="token property">first_name</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;Sally&#39;</span><span class="token punctuation">;</span>
</code></pre></div><p>在这个例子中， <code>setFirstNameAttribute</code> 方法在调用的时候接受 <code>Sally</code> 这个值作为参数。接着修改器会应用 <code>strtolower</code> 函数并将处理的结果设置到内部的 <code>$attributes</code> 数组。</p><h2 id="日期转换器"><a href="#日期转换器" class="header-anchor">#</a> 日期转换器</h2>`,14)),a[4]||(a[4]=s("p",null,[n("默认情况下，October 模型会将 "),s("code",null,"created_at"),n(" 和 "),s("code",null,"updated_at"),n(" 字段转换为"),s("a",{href:"https://github.com/briannesbitt/Carbon",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[n("Carbon"),s("span",null,[s("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[s("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),n(),s("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),n(),s("span",{class:"sr-only"},"(opens new window)")])]),n("实例，它继承了 PHP 原生的 "),s("code",null,"DateTime"),n(" 类并提供了各种有用的方法。你可以通过设置模型的 "),s("code",null,"$dates"),n(" 属性来添加其他日期属性：")],-1)),a[5]||(a[5]=e(`<p>您可以通过覆盖模型的<code>$dates</code>属性来自定义哪些字段会自动转换，甚至完全禁用此转换：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">class</span> <span class="token class-name-definition class-name">User</span> <span class="token keyword">extends</span> <span class="token class-name">Model</span>
<span class="token punctuation">{</span>
    <span class="token comment">/**
     * 应该转换为日期格式的属性.
     *
     * @var array
     */</span>
    <span class="token keyword">protected</span> <span class="token variable">$dates</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;created_at&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;updated_at&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;disabled_at&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>当某个字段是日期格式时，你可以将值设置为一个 UNIX 时间戳，日期时间(<code>Y-m-d</code>)字符串，或者 <code>DateTime</code> / <code>Carbon</code> 实例。日期值会被正确格式化并保存到你的数据库中：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token variable">$user</span> <span class="token operator">=</span> <span class="token class-name static-context">User</span><span class="token operator">::</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token variable">$user</span><span class="token operator">-&gt;</span><span class="token property">disabled_at</span> <span class="token operator">=</span> <span class="token class-name static-context">Carbon</span><span class="token operator">::</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token variable">$user</span><span class="token operator">-&gt;</span><span class="token function">save</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div>`,4)),a[6]||(a[6]=s("p",null,[n("就如上面所说，当获取到的属性包含在 "),s("code",null,"$dates"),n(" 属性中时，都会自动转换为 "),s("a",{href:"https://github.com/briannesbitt/Carbon",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[n("Carbon"),s("span",null,[s("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[s("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),n(),s("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),n(),s("span",{class:"sr-only"},"(opens new window)")])]),n(" 实例，允许你在属性上使用任意的 Carbon 方法：")],-1)),a[7]||(a[7]=e(`<div class="language-php extra-class"><pre class="language-php"><code><span class="token variable">$user</span> <span class="token operator">=</span> <span class="token class-name static-context">User</span><span class="token operator">::</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">return</span> <span class="token variable">$user</span><span class="token operator">-&gt;</span><span class="token property">disabled_at</span><span class="token operator">-&gt;</span><span class="token function">getTimestamp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>默认情况下，时间戳都将以 <code>&#39;Y-m-d H:i:s&#39;</code> 形式格式化。如果你需要自定义时间戳格式，可在模型中设置 <code>$dateFormat</code> 属性。这个属性决定了日期属性将以何种形式保存在数据库中，以及当模型序列化成数组或 JSON 时的格式：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">class</span> <span class="token class-name-definition class-name">Flight</span> <span class="token keyword">extends</span> <span class="token class-name">Model</span>
<span class="token punctuation">{</span>
    <span class="token comment">/**
     * 模型日期字段的存储格式。
     *
     * @var string
     */</span>
    <span class="token keyword">protected</span> <span class="token variable">$dateFormat</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;U&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p><a id="oc-attribute-casting"></a></p><h2 id="属性类型转换"><a href="#属性类型转换" class="header-anchor">#</a> 属性类型转换</h2><p>模型中的 <code>$casts</code> 属性提供了一个便利的方法来将属性转换为常见的数据类型。<code>$casts</code> 属性应是一个数组，且数组的键是那些需要被转换的属性名称，值则是你希望转换的数据类型。支持转换的数据类型有：<code>integer</code>, <code>real</code>, <code>float</code>, <code>double</code>, <code>string</code>, <code>boolean</code>, <code>object</code>和 <code>array</code>。</p><p>示例， 让我们把以整数(<code>0</code> 或 <code>1</code>)形式存储在数据库中的 <code>is_admin</code> 属性转成布尔值：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">class</span> <span class="token class-name-definition class-name">User</span> <span class="token keyword">extends</span> <span class="token class-name">Model</span>
<span class="token punctuation">{</span>
    <span class="token comment">/**
     * 这个属性应该被转换为原生类型.
     *
     * @var array
     */</span>
    <span class="token keyword">protected</span> <span class="token variable">$casts</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
        <span class="token string single-quoted-string">&#39;is_admin&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;boolean&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>现在当你访问 <code>is_admin</code> 属性时，虽然保存在数据库里的值是一个整数类型，但是返回值总是会被转换成布尔值类型：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token variable">$user</span> <span class="token operator">=</span> <span class="token class-name static-context">User</span><span class="token operator">::</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$user</span><span class="token operator">-&gt;</span><span class="token property">is_admin</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="数组转换"><a href="#数组转换" class="header-anchor">#</a> 数组转换</h4><p>当你在数据库存储序列化的 JSON 的数据时，<code>array</code> 类型的转换非常有用。比如：如果你的数据库具有被序列化为 JSON 的 <code>TEXT</code> 字段类型，并且在 Eloquent 模型中加入了 <code>array</code> 类型转换，那么当你访问的时候就会自动被转换为 PHP 数组：</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token keyword">class</span> <span class="token class-name-definition class-name">User</span> <span class="token keyword">extends</span> <span class="token class-name">Model</span>
<span class="token punctuation">{</span>
    <span class="token comment">/**
     * 这个属性应该被转换为原生类型.
     *
     * @var array
     */</span>
    <span class="token keyword">protected</span> <span class="token variable">$casts</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
        <span class="token string single-quoted-string">&#39;options&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;array&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>一旦定义了转换，你访问 <code>options</code> 属性时他会自动从 JSON 类型反序列化为 PHP 数组。当你设置了 <code>options</code> 属性的值时，给定的数组也会自动序列化为 JSON 类型存储</p><div class="language-php extra-class"><pre class="language-php"><code><span class="token variable">$user</span> <span class="token operator">=</span> <span class="token class-name static-context">User</span><span class="token operator">::</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token variable">$options</span> <span class="token operator">=</span> <span class="token variable">$user</span><span class="token operator">-&gt;</span><span class="token property">options</span><span class="token punctuation">;</span>

<span class="token variable">$options</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;key&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;value&#39;</span><span class="token punctuation">;</span>

<span class="token variable">$user</span><span class="token operator">-&gt;</span><span class="token property">options</span> <span class="token operator">=</span> <span class="token variable">$options</span><span class="token punctuation">;</span>

<span class="token variable">$user</span><span class="token operator">-&gt;</span><span class="token function">save</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div>`,15))])}const _=l(u,[["render",k]]);export{f as __pageData,_ as default};
