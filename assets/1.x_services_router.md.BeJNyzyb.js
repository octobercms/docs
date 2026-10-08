import{_ as a,r as o,o as i,c as s,e as r,a as u,s as d}from"./chunks/framework.CXcwiNg-.js";const R=JSON.parse('{"title":"Router - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Basic routing","slug":"basic-routing","link":"#basic-routing","children":[{"level":4,"title":"Registering a route for multiple verbs","slug":"registering-a-route-for-multiple-verbs","link":"#registering-a-route-for-multiple-verbs","children":[]},{"level":4,"title":"Generating URLs to routes","slug":"generating-urls-to-routes","link":"#generating-urls-to-routes","children":[]}]},{"level":2,"title":"Route parameters","slug":"route-parameters","link":"#route-parameters","children":[{"level":3,"title":"Required parameters","slug":"required-parameters","link":"#required-parameters","children":[]},{"level":3,"title":"Optional parameters","slug":"optional-parameters","link":"#optional-parameters","children":[]},{"level":3,"title":"Regular expression constraints","slug":"regular-expression-constraints","link":"#regular-expression-constraints","children":[]}]},{"level":2,"title":"Named routes","slug":"named-routes","link":"#named-routes","children":[{"level":4,"title":"Route groups & named routes","slug":"route-groups-named-routes","link":"#route-groups-named-routes","children":[]},{"level":4,"title":"Generating URLs to named routes","slug":"generating-urls-to-named-routes","link":"#generating-urls-to-named-routes","children":[]}]},{"level":2,"title":"Route groups","slug":"route-groups","link":"#route-groups","children":[{"level":3,"title":"Sub-domain routing","slug":"sub-domain-routing","link":"#sub-domain-routing","children":[]},{"level":3,"title":"Route prefixes","slug":"route-prefixes","link":"#route-prefixes","children":[]},{"level":3,"title":"Route Middleware","slug":"route-middleware","link":"#route-middleware","children":[]}]},{"level":2,"title":"Throwing 404 errors","slug":"throwing-404-errors","link":"#throwing-404-errors","children":[]}],"relativePath":"1.x/services/router.md","filePath":"1.x/services/router.md"}'),c={name:"1.x/services/router.md"};function l(p,e,h,m,g,f){const t=o("pre-heading"),n=o("post-heading");return i(),s("div",null,[r(t),e[0]||(e[0]=u("h1",null,"Router",-1)),r(n),e[1]||(e[1]=d(`<h2 id="basic-routing"><a href="#basic-routing" class="header-anchor">#</a> Basic routing</h2><p>While routing is handled automatically for the <a href="./../backend/controllers-ajax.html">backend controllers</a> and CMS pages define their own URL routes in their <a href="./../cms/pages.html#configuration">page configuration</a>, the router service is useful primarily for defining fixed APIs and end points.</p><p>You can define these routes by creating a file named <strong>routes.php</strong> in a same directory as the <a href="./../plugin/registration.html">plugin registration file</a>. The most basic routes simply accept a URI and a <code>Closure</code>:</p><pre><code>Route::get(&#39;/&#39;, function () {
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
</code></pre><h4 id="registering-a-route-for-multiple-verbs"><a href="#registering-a-route-for-multiple-verbs" class="header-anchor">#</a> Registering a route for multiple verbs</h4><p>Sometimes you may need to register a route that responds to multiple HTTP verbs. You may do so using the <code>match</code> method on the <code>Route</code> facade:</p><pre><code>Route::match([&#39;get&#39;, &#39;post&#39;], &#39;/&#39;, function () {
    return &#39;Hello World&#39;;
});
</code></pre><p>You may even register a route that responds to all HTTP verbs using the <code>any</code> method:</p><pre><code>Route::any(&#39;foo&#39;, function () {
    return &#39;Hello World&#39;;
});
</code></pre><h4 id="generating-urls-to-routes"><a href="#generating-urls-to-routes" class="header-anchor">#</a> Generating URLs to routes</h4><p>You may generate URLs to your routes using the <code>Url</code> facade:</p><pre><code>$url = Url::to(&#39;foo&#39;);
</code></pre><h2 id="route-parameters"><a href="#route-parameters" class="header-anchor">#</a> Route parameters</h2><h3 id="required-parameters"><a href="#required-parameters" class="header-anchor">#</a> Required parameters</h3><p>Sometimes you will need to capture segments of the URI within your route, for example, you may need to capture a user&#39;s ID from the URL. You may do so by defining route parameters:</p><pre><code>Route::get(&#39;user/{id}&#39;, function ($id) {
    return &#39;User &#39;.$id;
});
</code></pre><p>You may define as many route parameters as required by your route:</p><pre><code>Route::get(&#39;posts/{post}/comments/{comment}&#39;, function ($postId, $commentId) {
    //
});
</code></pre><p>Route parameters are always encased within singular <em>curly brackets</em>. The parameters will be passed into your route&#39;s <code>Closure</code> when the route is executed.</p><blockquote><p><strong>Note:</strong> Route parameters cannot contain the <code>-</code> character. Use an underscore (<code>_</code>) instead.</p></blockquote><h3 id="optional-parameters"><a href="#optional-parameters" class="header-anchor">#</a> Optional parameters</h3><p>Occasionally you may need to specify a route parameter, but make the presence of that route parameter optional. You may do so by placing a <code>?</code> mark after the parameter name:</p><pre><code>Route::get(&#39;user/{name?}&#39;, function ($name = null) {
    return $name;
});

Route::get(&#39;user/{name?}&#39;, function ($name = &#39;John&#39;) {
    return $name;
});
</code></pre><h3 id="regular-expression-constraints"><a href="#regular-expression-constraints" class="header-anchor">#</a> Regular expression constraints</h3><p>You may constrain the format of your route parameters using the <code>where</code> method on a route instance. The <code>where</code> method accepts the name of the parameter and a regular expression defining how the parameter should be constrained:</p><pre><code>Route::get(&#39;user/{name}&#39;, function ($name) {
    //
})-&gt;where(&#39;name&#39;, &#39;[A-Za-z]+&#39;);

Route::get(&#39;user/{id}&#39;, function ($id) {
    //
})-&gt;where(&#39;id&#39;, &#39;[0-9]+&#39;);

Route::get(&#39;user/{id}/{name}&#39;, function ($id, $name) {
    //
})-&gt;where([&#39;id&#39; =&gt; &#39;[0-9]+&#39;, &#39;name&#39; =&gt; &#39;[a-z]+&#39;]);
</code></pre><h2 id="named-routes"><a href="#named-routes" class="header-anchor">#</a> Named routes</h2><p>Named routes allow you to conveniently generate URLs or redirects for a specific route. You may specify a name for a route using the <code>as</code> array key when defining the route:</p><pre><code>Route::get(&#39;user/profile&#39;, [&#39;as&#39; =&gt; &#39;profile&#39;, function () {
    //
}]);
</code></pre><h4 id="route-groups-named-routes"><a href="#route-groups-named-routes" class="header-anchor">#</a> Route groups &amp; named routes</h4><p>If you are using <a href="#route-groups">route groups</a>, you may specify an <code>as</code> keyword in the route group attribute array, allowing you to set a common route name prefix for all routes within the group:</p><pre><code>Route::group([&#39;as&#39; =&gt; &#39;admin::&#39;], function () {
    Route::get(&#39;dashboard&#39;, [&#39;as&#39; =&gt; &#39;dashboard&#39;, function () {
        // Route named &quot;admin::dashboard&quot;
    }]);
});
</code></pre><h4 id="generating-urls-to-named-routes"><a href="#generating-urls-to-named-routes" class="header-anchor">#</a> Generating URLs to named routes</h4><p>Once you have assigned a name to a given route, you may use the route&#39;s name when generating URLs or redirects via the <code>Url::route</code> method:</p><pre><code>$url = Url::route(&#39;profile&#39;);

$redirect = Response::redirect()-&gt;route(&#39;profile&#39;);
</code></pre><p>If the route defines parameters, you may pass the parameters as the second argument to the <code>route</code> method. The given parameters will automatically be inserted into the URL:</p><pre><code>Route::get(&#39;user/{id}/profile&#39;, [&#39;as&#39; =&gt; &#39;profile&#39;, function ($id) {
    //
}]);

$url = Url::route(&#39;profile&#39;, [&#39;id&#39; =&gt; 1]);
</code></pre><h2 id="route-groups"><a href="#route-groups" class="header-anchor">#</a> Route groups</h2><p>Route groups allow you to share route attributes across a large number of routes without needing to define those attributes on each individual route. Shared attributes are specified in an array format as the first parameter to the <code>Route::group</code> method.</p><h3 id="sub-domain-routing"><a href="#sub-domain-routing" class="header-anchor">#</a> Sub-domain routing</h3><p>Route groups may also be used to route wildcard sub-domains. Sub-domains may be assigned route parameters just like route URIs, allowing you to capture a portion of the sub-domain for usage in your route or controller. The sub-domain may be specified using the <code>domain</code> key on the group attribute array:</p><pre><code>Route::group([&#39;domain&#39; =&gt; &#39;{account}.example.com&#39;], function () {
    Route::get(&#39;user/{id}&#39;, function ($account, $id) {
        //
    });
});
</code></pre><h3 id="route-prefixes"><a href="#route-prefixes" class="header-anchor">#</a> Route prefixes</h3><p>The <code>prefix</code> group array attribute may be used to prefix each route in the group with a given URI. For example, you may want to prefix all route URIs within the group with <code>admin</code>:</p><pre><code>Route::group([&#39;prefix&#39; =&gt; &#39;admin&#39;], function () {
    Route::get(&#39;users&#39;, function () {
        // Matches The &quot;/admin/users&quot; URL
    });
});
</code></pre><p>You may also use the <code>prefix</code> parameter to specify common parameters for your grouped routes:</p><pre><code>Route::group([&#39;prefix&#39; =&gt; &#39;accounts/{account_id}&#39;], function () {
    Route::get(&#39;detail&#39;, function ($account_id) {
        // Matches The accounts/{account_id}/detail URL
    });
});
</code></pre><h3 id="route-middleware"><a href="#route-middleware" class="header-anchor">#</a> Route Middleware</h3><p>Registering middleware inside your plugin&#39;s <code>boot()</code> method will register it globally for each request. If you want to register middleware to one route at a time you should do it like this:</p><pre><code>Route::get(&#39;info&#39;, &#39;Acme\\News@info&#39;)-&gt;middleware(&#39;Path\\To\\Your\\Middleware&#39;);
</code></pre><p>For route groups it could be done like this:</p><pre><code>Route::group([&#39;middleware&#39; =&gt; &#39;Path\\To\\Your\\Middleware&#39;], function() {
    Route::get(&#39;info&#39;, &#39;Acme\\News@info&#39;);
});
</code></pre><p>And finally, if you want to assign a group of middleware to just one route you can it like this</p><pre><code>Route::middleware([&#39;Path\\To\\Your\\Middleware&#39;])-&gt;group(function() {
    Route::get(&#39;info&#39;, &#39;Acme\\News@info&#39;);
});
</code></pre><p>You can of course add more than one middleware in a group, just one is used in the above examples for convenience.</p><h2 id="throwing-404-errors"><a href="#throwing-404-errors" class="header-anchor">#</a> Throwing 404 errors</h2><p>There are two ways to manually trigger a 404 error from a route. First, you may use the <code>abort</code> helper. The <code>abort</code> helper simply throws a <code>Symfony\\Component\\HttpFoundation\\Exception\\HttpException</code> with the specified status code:</p><pre><code>App::abort(404);
</code></pre><p>Secondly, you may manually throw an instance of <code>Symfony\\Component\\HttpKernel\\Exception\\NotFoundHttpException</code>.</p><p>More information on handling 404 exceptions and using custom responses for these errors may be found in the <a href="./../services/error-log.html">errors &amp; logging</a> section of the documentation.</p>`,60))])}const b=a(c,[["render",l]]);export{R as __pageData,b as default};
