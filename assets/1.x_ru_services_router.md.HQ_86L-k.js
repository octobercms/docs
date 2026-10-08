import{_ as a,r,o as c,c as l,e as n,a as s,s as p}from"./chunks/framework.CXcwiNg-.js";const _=JSON.parse('{"title":"Роутинг (маршрутизация) - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Простейшая маршрутизация","slug":"простеишая-маршрутизация","link":"#простеишая-маршрутизация","children":[{"level":4,"title":"Регистрация роута для нескольких методов","slug":"регистрация-роута-для-нескольких-методов","link":"#регистрация-роута-для-нескольких-методов","children":[]},{"level":4,"title":"Генерация URL","slug":"генерация-url","link":"#генерация-url","children":[]}]},{"level":2,"title":"Параметры роутов","slug":"параметры-роутов","link":"#параметры-роутов","children":[{"level":3,"title":"Обязательные параметры","slug":"обязательные-параметры","link":"#обязательные-параметры","children":[]},{"level":3,"title":"Необязательные параметры","slug":"необязательные-параметры","link":"#необязательные-параметры","children":[]},{"level":3,"title":"Параметры с регулярными выражениями","slug":"параметры-с-регулярными-выражениями","link":"#параметры-с-регулярными-выражениями","children":[]}]},{"level":2,"title":"Именованные роуты","slug":"именованные-роуты","link":"#именованные-роуты","children":[{"level":4,"title":"Группы роутов и именованные роуты","slug":"группы-роутов-и-именованные-роуты","link":"#группы-роутов-и-именованные-роуты","children":[]},{"level":4,"title":"Генерация URL","slug":"генерация-url-1","link":"#генерация-url-1","children":[]}]},{"level":2,"title":"Группы роутов","slug":"группы-роутов","link":"#группы-роутов","children":[{"level":3,"title":"Доменная маршрутизация","slug":"доменная-маршрутизация","link":"#доменная-маршрутизация","children":[]},{"level":3,"title":"Префикс пути","slug":"префикс-пути","link":"#префикс-пути","children":[]}]},{"level":2,"title":"Ошибки 404","slug":"ошибки-404","link":"#ошибки-404","children":[]}],"relativePath":"1.x/ru/services/router.md","filePath":"1.x/ru/services/router.md"}'),u={name:"1.x/ru/services/router.md"};function i(d,e,h,f,g,m){const o=r("pre-heading"),t=r("post-heading");return c(),l("div",null,[n(o),e[0]||(e[0]=s("h1",null,"Роутинг (маршрутизация)",-1)),n(t),e[1]||(e[1]=p(`<p><a href="#basic-routing" name="basic-routing" class="anchor"></a></p><h2 id="простеишая-маршрутизация"><a href="#простеишая-маршрутизация" class="header-anchor">#</a> Простейшая маршрутизация</h2><p>Вы можете указать произвольные маршруты в файле <strong>routes.php</strong> в папке с плагином. Простейший роут состоит из URI (урла, пути) и функции-замыкания (она же коллбек):</p><pre><code>Route::get(&#39;/&#39;, function () {
    return &#39;Hello World&#39;;
});

Route::post(&#39;foo/bar&#39;, function () {
    return &#39;Hello World&#39;;
});

Route::put(&#39;foo/bar&#39;, function () {
    //
});

Route::delete(&#39;foo/bar&#39;, function () {
    //
});
</code></pre><h4 id="регистрация-роута-для-нескольких-методов"><a href="#регистрация-роута-для-нескольких-методов" class="header-anchor">#</a> Регистрация роута для нескольких методов</h4><pre><code>Route::match([&#39;get&#39;, &#39;post&#39;], &#39;/&#39;, function () {
    return &#39;Hello World&#39;;
});
</code></pre><p>Регистрация роута для любого типа HTTP-запроса:</p><pre><code>Route::any(&#39;foo&#39;, function () {
    return &#39;Hello World&#39;;
});
</code></pre><h4 id="генерация-url"><a href="#генерация-url" class="header-anchor">#</a> Генерация URL</h4><p>Используйте метод <code>to</code>, чтобы сгенерировать URL:</p><pre><code>$url = Url::to(&#39;foo&#39;);
</code></pre><p><a href="#route-parameters" name="route-parameters" class="anchor"></a></p><h2 id="параметры-роутов"><a href="#параметры-роутов" class="header-anchor">#</a> Параметры роутов</h2><p><a href="#required-parameters" name="required-parameters" class="anchor"></a></p><h3 id="обязательные-параметры"><a href="#обязательные-параметры" class="header-anchor">#</a> Обязательные параметры</h3><p>Вы можете использовать параметры, чтобы передать произвольное значение. Например <code>id</code> пользователя:</p><pre><code>Route::get(&#39;user/{id}&#39;, function ($id) {
    return &#39;User &#39;.$id;
});
</code></pre><p>Вы можете использовать столько параметров, сколько нужно:</p><pre><code>Route::get(&#39;posts/{post}/comments/{comment}&#39;, function ($postId, $commentId) {
    //
});
</code></pre><blockquote><p><strong>Примечание:</strong> Используйте <code>_</code> в названиях параметров.</p></blockquote><p><a href="#parameters-optional-parameters" name="parameters-optional-parameters" class="anchor"></a></p><h3 id="необязательные-параметры"><a href="#необязательные-параметры" class="header-anchor">#</a> Необязательные параметры</h3><p>Вы можете использоватьзнак вопроса <code>?</code>, чтобы сделать параметр необязательным. Пример:</p><pre><code>Route::get(&#39;user/{name?}&#39;, function ($name = null) {
    return $name;
});

Route::get(&#39;user/{name?}&#39;, function ($name = &#39;John&#39;) {
    return $name;
});
</code></pre><p><a href="#parameters-regular-expression-constraints" name="parameters-regular-expression-constraints" class="anchor"></a></p><h3 id="параметры-с-регулярными-выражениями"><a href="#параметры-с-регулярными-выражениями" class="header-anchor">#</a> Параметры с регулярными выражениями</h3><p>Вы можете использовать метод <code>where</code>, чтобы наложить ограничения на параметр:</p><pre><code>Route::get(&#39;user/{name}&#39;, function ($name) {
    //
})-&gt;where(&#39;name&#39;, &#39;[A-Za-z]+&#39;);

Route::get(&#39;user/{id}&#39;, function ($id) {
    //
})-&gt;where(&#39;id&#39;, &#39;[0-9]+&#39;);

Route::get(&#39;user/{id}/{name}&#39;, function ($id, $name) {
    //
})-&gt;where([&#39;id&#39; =&gt; &#39;[0-9]+&#39;, &#39;name&#39; =&gt; &#39;[a-z]+&#39;]);
</code></pre><p><a href="#named-routes" name="named-routes" class="anchor"></a></p><h2 id="именованные-роуты"><a href="#именованные-роуты" class="header-anchor">#</a> Именованные роуты</h2><p>Присваивая имена роутам вы можете сделать обращение к ним (при генерации URL во вьюхах (views) или переадресациях) более удобным. Вы можете задать имя роуту таким образом:</p><pre><code>Route::get(&#39;user/profile&#39;, [&#39;as&#39; =&gt; &#39;profile&#39;, function () {
    //
}]);
</code></pre><h4 id="группы-роутов-и-именованные-роуты"><a href="#группы-роутов-и-именованные-роуты" class="header-anchor">#</a> Группы роутов и именованные роуты</h4><p>Вы можете использовать <code>as</code>, чтобы задать префикс для всех маршрутов в группе:</p><pre><code>Route::group([&#39;as&#39; =&gt; &#39;admin::&#39;], function () {
    Route::get(&#39;dashboard&#39;, [&#39;as&#39; =&gt; &#39;dashboard&#39;, function () {
        // Route named &quot;admin::dashboard&quot;
    }]);
});
</code></pre><h4 id="генерация-url-1"><a href="#генерация-url-1" class="header-anchor">#</a> Генерация URL</h4><p>Пример редиректа:</p><pre><code>$url = Url::route(&#39;profile&#39;);

$redirect = Response::redirect()-&gt;route(&#39;profile&#39;);
</code></pre><p>Пример генерации:</p><pre><code>Route::get(&#39;user/{id}/profile&#39;, [&#39;as&#39; =&gt; &#39;profile&#39;, function ($id) {
    //
}]);

$url = Url::route(&#39;profile&#39;, [&#39;id&#39; =&gt; 1]);
</code></pre><p><a href="#route-groups" name="route-groups" class="anchor"></a></p><h2 id="группы-роутов"><a href="#группы-роутов" class="header-anchor">#</a> Группы роутов</h2><p>Вы можете сгруппировать маршруты, чтобы применить различны фильтры сразу к нескольким роутам:</p><pre><code>Route::group(array(&#39;before&#39; =&gt; &#39;auth&#39;), function()
{
    Route::get(&#39;/&#39;, function()
    {
        // К этому маршруту будет привязан фильтр auth.
    });

    Route::get(&#39;user/profile&#39;, function()
    {
        // К этому маршруту также будет привязан фильтр auth.
    });
});
</code></pre><p><a href="#route-group-sub-domain-routing" name="route-group-sub-domain-routing" class="anchor"></a></p><h3 id="доменная-маршрутизация"><a href="#доменная-маршрутизация" class="header-anchor">#</a> Доменная маршрутизация</h3><p>В OctoberCMS роуты способны работать и с поддоменами по их маске и передавать в Ваш обработчик параметры из шаблона.</p><pre><code>Route::group([&#39;domain&#39; =&gt; &#39;{account}.example.com&#39;], function () {
    Route::get(&#39;user/{id}&#39;, function ($account, $id) {
        //
    });
});
</code></pre><p><a href="#route-group-prefixes" name="route-group-prefixes" class="anchor"></a></p><h3 id="префикс-пути"><a href="#префикс-пути" class="header-anchor">#</a> Префикс пути</h3><p>Группа роутов может быть зарегистрирована с одним префиксом без его явного указания с помощью ключа prefix в параметрах группы. Пример:</p><pre><code>Route::group([&#39;prefix&#39; =&gt; &#39;admin&#39;], function () {
    Route::get(&#39;users&#39;, function () {
        // Matches The &quot;/admin/users&quot; URL
    });
});
</code></pre><p>Вы также можете использовать параметры:</p><pre><code>Route::group([&#39;prefix&#39; =&gt; &#39;accounts/{account_id}&#39;], function () {
    Route::get(&#39;detail&#39;, function ($account_id) {
        // Matches The accounts/{account_id}/detail URL
    });
});
</code></pre><p><a href="#throwing-404-errors" name="throwing-404-errors" class="anchor"></a></p><h2 id="ошибки-404"><a href="#ошибки-404" class="header-anchor">#</a> Ошибки 404</h2><p>Существует два способа вызвать исключение 404 (Not Found) из маршрута. Первый - методом <code>abort</code>:</p><pre><code>App::abort(404);
</code></pre><p>Второй - бросив исключение класса или потомка класса <code>Symfony\\Component\\HttpKernel\\Exception\\NotFoundHttpException</code>.</p><p>Больше информации о том, как обрабатывать исключения 404 и отправлять собственный ответ на такой запрос содержится в разделе об <a href="./../services/error-log.html">ошибках</a>.</p>`,60))])}const $=a(u,[["render",i]]);export{_ as __pageData,$ as default};
