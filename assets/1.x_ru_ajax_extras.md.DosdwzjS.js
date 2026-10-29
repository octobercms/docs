import{_ as o,r as t,o as l,c as r,e,a as i,s as p}from"./chunks/framework.CXcwiNg-.js";const q=JSON.parse('{"title":"Дополнительные функции AJAX - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Индикатор загрузки","slug":"индикатор-загрузки","link":"#индикатор-загрузки","children":[]},{"level":2,"title":"Валидация формы","slug":"валидация-формы","link":"#валидация-формы","children":[{"level":3,"title":"Обработка исключений","slug":"обработка-исключении","link":"#обработка-исключении","children":[]},{"level":3,"title":"Отображение сообщений об ошибках","slug":"отображение-сообщении-об-ошибках","link":"#отображение-сообщении-об-ошибках","children":[]},{"level":3,"title":"Отображение ошибок рядом с полями","slug":"отображение-ошибок-рядом-с-полями","link":"#отображение-ошибок-рядом-с-полями","children":[]}]},{"level":2,"title":"Индикатор загрузки на кнопке","slug":"индикатор-загрузки-на-кнопке","link":"#индикатор-загрузки-на-кнопке","children":[]},{"level":2,"title":"Flash сообщения","slug":"flash-сообщения","link":"#flash-сообщения","children":[]},{"level":2,"title":"Примеры","slug":"примеры","link":"#примеры","children":[]}],"relativePath":"1.x/ru/ajax/extras.md","filePath":"1.x/ru/ajax/extras.md"}'),d={name:"1.x/ru/ajax/extras.md"};function c(u,a,g,h,m,f){const n=t("pre-heading"),s=t("post-heading");return l(),r("div",null,[e(n),a[0]||(a[0]=i("h1",null,"Дополнительные функции AJAX",-1)),e(s),a[1]||(a[1]=p(`<p>Вы можете добавить дополнительные CSS и JavaScript файлы при помощи <code>{% framework extras %}</code> на страницу, чтобы использовать расширенные возможности AJAX фреймворка.</p><p><a name="loader-stripe" id="loader-stripe" class="anchor"></a></p><h2 id="индикатор-загрузки"><a href="#индикатор-загрузки" class="header-anchor">#</a> Индикатор загрузки</h2><p>Вы можете использовать индикатор загрузки, который отображается наверху страницы во время выполнения AJAX запроса.</p><p>Перед выполнением AJAX запроса срабатывает событие <code>ajaxPromise</code>, которое отображает индикатор загрузки наверху страницы и меняет внешний вид курсора. События <code>ajaxFail</code> и<code> ajaxDone</code> используются для того, чтобы определить выполнился ли запрос и скрыть индикатор загрузки.</p><p><a name="ajax-validation" id="ajax-validation" class="anchor"></a></p><h2 id="валидация-формы"><a href="#валидация-формы" class="header-anchor">#</a> Валидация формы</h2><p>Добавьте атрибут <code>data-request-validate</code> в тег <code>form</code>, чтобы использовать валидацию.</p><pre><code>&lt;form
    data-request=&quot;onSubmit&quot;
    data-request-validate&gt;
    &lt;!-- ... --&gt;
&lt;/form&gt;
</code></pre><p><a name="throw-validation-exception" id="throw-validation-exception" class="anchor"></a></p><h3 id="обработка-исключении"><a href="#обработка-исключении" class="header-anchor">#</a> Обработка исключений</h3><p>Вы можете использовать класс <code>ValidationException</code> в своем обработчике для <a href="./../services/error-log.html#validation-exception">отображения ошибок</a> в форме. Метод принимает один аргумент - массив с именами полей и сообщениями об ошибках.</p><pre><code>function onSubmit()
{
    throw new ValidationException([&#39;name&#39; =&gt; &#39;You must give a name!&#39;]);
}
</code></pre><blockquote><p><strong>Note</strong>: You can also pass an instance of the <a href="./../services/validation.html">validation service</a> as the first argument of the exception.</p></blockquote><p><a name="error-messages" id="error-messages" class="anchor"></a></p><h3 id="отображение-сообщении-об-ошибках"><a href="#отображение-сообщении-об-ошибках" class="header-anchor">#</a> Отображение сообщений об ошибках</h3><p>Используйте тег с атрибутом <code>data-validate-error</code> внутри формы для отображения первого сообщения об ошибке.</p><pre><code>&lt;div data-validate-error&gt;&lt;/div&gt;
</code></pre><p>Используйте тег с атрибутом <code>data-message</code> для отображения всех ошибок.</p><pre><code>&lt;div class=&quot;alert alert-danger&quot; data-validate-error&gt;
    &lt;p data-message&gt;&lt;/p&gt;
&lt;/div&gt;
</code></pre><p>Вы можете использовать события <code>ajaxInvalidField</code> и <code>ajaxPromise</code>, чтобы добавить свои классы при валидации элементов.</p><pre><code>$(window).on(&#39;ajaxInvalidField&#39;, function(event, fieldElement, fieldName, errorMsg, isFirst) {
    $(fieldElement).closest(&#39;.form-group&#39;).addClass(&#39;has-error&#39;);
});

$(document).on(&#39;ajaxPromise&#39;, &#39;[data-request]&#39;, function() {
    $(this).closest(&#39;form&#39;).find(&#39;.form-group.has-error&#39;).removeClass(&#39;has-error&#39;);
});
</code></pre><p><a name="field-errors" id="field-errors" class="anchor"></a></p><h3 id="отображение-ошибок-рядом-с-полями"><a href="#отображение-ошибок-рядом-с-полями" class="header-anchor">#</a> Отображение ошибок рядом с полями</h3><p>Используйте тег с атрибутом <code>data-validate-for</code>, чтобы отобразить ошибку рядом с полем.</p><pre><code>&lt;!-- Input field --&gt;
&lt;input name=&quot;phone&quot; /&gt;

&lt;!-- Validation message for the field --&gt;
&lt;div data-validate-for=&quot;phone&quot;&gt;&lt;/div&gt;
</code></pre><p>Если содержимое элемента пустое, то отобразится сообщение, которое пришло с сервера. Но Вы также можете указать произвольный текст.</p><pre><code>&lt;div data-validate-for=&quot;phone&quot;&gt;
    Oops.. phone number is invalid!
&lt;/div&gt;
</code></pre><p><a name="loader-button" id="loader-button" class="anchor"></a></p><h2 id="индикатор-загрузки-на-кнопке"><a href="#индикатор-загрузки-на-кнопке" class="header-anchor">#</a> Индикатор загрузки на кнопке</h2><p>Если элемент содержит атрибут <code>data-attach-loading</code>, то во время выполнения AJAX запроса у него появится класс <code>oc-loading</code>.</p><pre><code>&lt;form data-request=&quot;onSubmit&quot;&gt;
    &lt;button data-attach-loading&gt;
        Submit
    &lt;/button&gt;
&lt;/form&gt;

&lt;a
    href=&quot;#&quot;
    data-request=&quot;onDoSomething&quot;
    data-attach-loading&gt;
    Do something
&lt;/a&gt;
</code></pre><p><a name="ajax-flash" id="ajax-flash" class="anchor"></a></p><h2 id="flash-сообщения"><a href="#flash-сообщения" class="header-anchor">#</a> Flash сообщения</h2><p>Используйте атрибут <code>data-request-flash</code> в элементе формы</p><pre><code>&lt;form
    data-request=&quot;onSuccess&quot;
    data-request-flash&gt;
    &lt;!-- ... --&gt;
&lt;/form&gt;
</code></pre><p>и фасад <code>Flash</code> в обработчике</p><pre><code>function onSuccess()
{
    Flash::success(&#39;You did it!&#39;);
}
</code></pre><p>для отображения флэш-сообщений при успешном выполнении AJAX запроса.</p><p>Вы можете отобразить стандартное <a href="./../markup/tag-flash.html">флэш-сообщение</a> при загрузке страницы при помощи следующего кода на странице или макете.</p><div class="language-twig extra-class"><pre class="language-twig"><code><span class="token twig language-twig"><span class="token delimiter punctuation">{%</span> <span class="token tag-name keyword">flash</span> <span class="token delimiter punctuation">%}</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span>
        <span class="token attr-name">data-control</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>flash-message<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>flash-message fade <span class="token twig language-twig"><span class="token delimiter punctuation">{{</span> type <span class="token delimiter punctuation">}}</span></span><span class="token punctuation">&quot;</span></span>
        <span class="token attr-name">data-interval</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>5<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        <span class="token twig language-twig"><span class="token delimiter punctuation">{{</span> message <span class="token delimiter punctuation">}}</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
<span class="token twig language-twig"><span class="token delimiter punctuation">{%</span> <span class="token tag-name keyword">endflash</span> <span class="token delimiter punctuation">%}</span></span>
</code></pre></div><p><a name="usage-example" id="usage-example" class="anchor"></a></p><h2 id="примеры"><a href="#примеры" class="header-anchor">#</a> Примеры</h2><p>Пример валидации формы.</p><pre><code>&lt;form
    data-request=&quot;onDoSomething&quot;
    data-request-validate
    data-request-flash&gt;

    &lt;div&gt;
        &lt;input name=&quot;name&quot; /&gt;
        &lt;span data-validate-for=&quot;name&quot;&gt;&lt;/span&gt;
    &lt;/div&gt;

    &lt;div&gt;
        &lt;input name=&quot;email&quot; /&gt;
        &lt;span data-validate-for=&quot;email&quot;&gt;&lt;/span&gt;
    &lt;/div&gt;

    &lt;button data-attach-loading&gt;
        Submit
    &lt;/button&gt;

    &lt;div class=&quot;alert alert-danger&quot; data-validate-error&gt;
        &lt;p data-message&gt;&lt;/p&gt;
    &lt;/div&gt;

&lt;/form&gt;

function onDoSomething()
{
    $data = post();

    $rules = [
        &#39;name&#39; =&gt; &#39;required&#39;,
        &#39;email&#39; =&gt; &#39;required|email&#39;,
    ];

    $validation = Validator::make($data, $rules);

    if ($validation-&gt;fails()) {
        throw new ValidationException($validation);
    }

    Flash::success(&#39;Jobs done!&#39;);
}
</code></pre><p>19.02.2019</p>`,46))])}const k=o(d,[["render",c]]);export{q as __pageData,k as default};
