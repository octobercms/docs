import{_ as r,r as n,o as i,c as l,e as t,a as s,s as c}from"./chunks/framework.CXcwiNg-.js";const v=JSON.parse('{"title":"Расширение возможностей плагинов - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"События","slug":"события","link":"#события","children":[{"level":3,"title":"Подписка на события","slug":"подписка-на-события","link":"#подписка-на-события","children":[]},{"level":3,"title":"Объявление событий","slug":"объявление-событии","link":"#объявление-событии","children":[]}]},{"level":2,"title":"События в административной части сайта","slug":"события-в-административнои-части-саита","link":"#события-в-административнои-части-саита","children":[]},{"level":2,"title":"Примеры","slug":"примеры","link":"#примеры","children":[{"level":3,"title":"Пользователь","slug":"пользователь","link":"#пользователь","children":[]},{"level":3,"title":"Форма","slug":"форма","link":"#форма","children":[]},{"level":3,"title":"Список","slug":"список","link":"#список","children":[]},{"level":3,"title":"Компонент","slug":"компонент","link":"#компонент","children":[]},{"level":3,"title":"Меню","slug":"меню","link":"#меню","children":[]}]}],"relativePath":"1.x/ru/plugin/extending.md","filePath":"1.x/ru/plugin/extending.md"}'),d={name:"1.x/ru/plugin/extending.md"};function p(g,e,u,h,m,f){const o=n("pre-heading"),a=n("post-heading");return i(),l("div",null,[t(o),e[0]||(e[0]=s("h1",null,"Расширение возможностей плагинов",-1)),t(a),e[1]||(e[1]=c(`<p><a href="#extending-with-events" name="extending-with-events" class="anchor"></a></p><h2 id="события"><a href="#события" class="header-anchor">#</a> События</h2><p>Вы можете добавлять или изменять функциональные возможности плагинов при помощи <a href="./../services/events.html">Событий</a>.</p><p><a href="#subscribing-to-events" name="subscribing-to-events" class="anchor"></a></p><h3 id="подписка-на-события"><a href="#подписка-на-события" class="header-anchor">#</a> Подписка на события</h3><p>Наиболее подходящее место для подписки на события - метод <code>boot()</code> в <a href="./../plugin/registration.html#registration-methods">файле регистрации плагина</a>. Например, если Вы хотите добавить нового пользователя в список для рассылки, используйте глобальное событие <strong>rainlab.user.register</strong>:</p><pre><code>public function boot()
{
    Event::listen(&#39;rainlab.user.register&#39;, function($user) {
        // Code to register $user-&gt;email to mailing list
    });
}
</code></pre><p>Вы также можете расширить конструктор модели и использовать локальное событие.</p><pre><code>User::extend(function($model) {
    $model-&gt;bindEvent(&#39;user.register&#39;, function() use ($model) {
        // Code to register $model-&gt;email to mailing list
    });
});
</code></pre><p><a href="declaring-events" name="declaring-events" class="anchor"></a></p><h3 id="объявление-событии"><a href="#объявление-событии" class="header-anchor">#</a> Объявление событий</h3><p>Вы можете объявлять событие глобальным или локальным. Пример объявления глобального события:</p><pre><code>Event::fire(&#39;acme.blog.beforePost&#39;, [&#39;first parameter&#39;, &#39;second parameter&#39;]);
</code></pre><p>Пример локального события:</p><pre><code>$this-&gt;fireEvent(&#39;blog.beforePost&#39;, [&#39;first parameter&#39;, &#39;second parameter&#39;]);
</code></pre><blockquote><p><strong>Примечание:</strong> Хорошей практикой является размещение локального события перед глобальным событием из-за того, что локальные события имеют больший приоритет.</p></blockquote><p>После подписки на событие, параметры будут доступны в методе обработчика. Например:</p><pre><code>// Global
Event::listen(&#39;acme.blog.beforePost&#39;, function($param1, $param2) {
    echo &#39;Parameters: &#39; . $param1 . &#39; &#39; . $param2;
});

// Local
$this-&gt;bindEvent(&#39;blog.beforePost&#39;, function($param1, $param2) {
    echo &#39;Parameters: &#39; . $param1 . &#39; &#39; . $param2;
});
</code></pre><p><a href="#backend-view-events" name="backend-view-events" class="anchor"></a></p><h2 id="события-в-административнои-части-саита"><a href="#события-в-административнои-части-саита" class="header-anchor">#</a> События в административной части сайта</h2><p>Вы можете использовать события в административной части сайта, используя метод <code>fireViewEvent()</code>.</p><p>Добавьте следующий код в файл с представлением:</p><pre><code>&lt;div class=&quot;footer-area-extension&quot;&gt;
    &lt;?= $this-&gt;fireViewEvent(&#39;backend.auth.extendSigninView&#39;) ?&gt;
&lt;/div&gt;
</code></pre><p>Он позволит другим плагинам внедрять HTML-код в эту область.</p><pre><code>Event::listen(&#39;backend.auth.extendSigninView&#39;, function($controller) {
    return &#39;&lt;a href=&quot;#&quot;&gt;Sign in with Google!&lt;/a&gt;&#39;;
});
</code></pre><blockquote><p><strong>Примечание</strong>: Первым параметром в обработчике события всегда будет вызывающий объект (контроллер).</p></blockquote><p>Приведенный выше пример отобразит следующую разметку:</p><pre><code>&lt;div class=&quot;footer-area-extension&quot;&gt;
    &lt;a href=&quot;#&quot;&gt;Sign in with Google!&lt;/a&gt;
&lt;/div&gt;
</code></pre><p><a href="#usage-examples" name="usage-examples" class="anchor"></a></p><h2 id="примеры"><a href="#примеры" class="header-anchor">#</a> Примеры</h2><p>Ниже приведены некоторые примеры того, как могут быть использованы события.</p><p><a href="#extending-user-model" name="extending-user-model" class="anchor"></a></p><h3 id="пользователь"><a href="#пользователь" class="header-anchor">#</a> Пользователь</h3><p>В этом примере показано, как можно изменить атрибут <code>$model-&gt;foo</code> модели <code>User</code>.</p><pre><code>class Plugin extends PluginBase
{
    [...]

    public function boot()
    {
        // Local event hook that affects all users
        User::extend(function($model) {
            $model-&gt;bindEvent(&#39;model.getAttribute&#39;, function($attribute, $value) {
                if ($attribute == &#39;foo&#39;) {
                    return &#39;bar&#39;;
                }
            });
        });

        // Double event hook that affects user #2 only
        User::extend(function($model) {
            $model-&gt;bindEvent(&#39;model.afterFetch&#39;, function() use ($model) {
                if ($model-&gt;id != 2) {
                    return;
                }

                $model-&gt;bindEvent(&#39;model.getAttribute&#39;, function($attribute, $value) {
                    if ($attribute == &#39;foo&#39;) {
                        return &#39;bar&#39;;
                    }
                });
            });
        });
    }
}
</code></pre><p><a href="#extending-backend-form" name="extending-backend-form" class="anchor"></a></p><h3 id="форма"><a href="#форма" class="header-anchor">#</a> Форма</h3><p>В этом примере показано, как можно добавить и удалить поле из формы редактирования пользователя.</p><pre><code>class Plugin extends PluginBase
{
    [...]

    public function boot()
    {
        // Extend all backend form usage
        Event::listen(&#39;backend.form.extendFields&#39;, function($widget) {

            // Only for the User controller
            if (!$widget-&gt;getController() instanceof \\RainLab\\User\\Controllers\\Users) {
                return;
            }

            // Only for the User model
            if (!$widget-&gt;model instanceof \\RainLab\\User\\Models\\User) {
                return;
            }

            // Add an extra birthday field
            $widget-&gt;addFields([
                &#39;birthday&#39; =&gt; [
                    &#39;label&#39;   =&gt; &#39;Birthday&#39;,
                    &#39;comment&#39; =&gt; &#39;Select the users birthday&#39;,
                    &#39;type&#39;    =&gt; &#39;datepicker&#39;
                ]
            ]);

            // Remove a Surname field
            $widget-&gt;removeField(&#39;surname&#39;);
        });
    }
}
</code></pre><blockquote><p>Не забудьте добавить <code>use Event</code> в верхнюю часть файла класса.</p></blockquote><p><a href="#extending-backend-list" name="extending-backend-list" class="anchor"></a></p><h3 id="список"><a href="#список" class="header-anchor">#</a> Список</h3><p>В этом примере показано, как можно добавить и удалить столбец из списка с пользователями.</p><pre><code>class Plugin extends PluginBase
{
    [...]

    public function boot()
    {
        // Extend all backend list usage
        Event::listen(&#39;backend.list.extendColumns&#39;, function($widget) {

            // Only for the User controller
            if (!$widget-&gt;getController() instanceof \\RainLab\\User\\Controllers\\Users) {
                return;
            }

            // Only for the User model
            if (!$widget-&gt;model instanceof \\RainLab\\User\\Models\\User) {
                return;
            }

            // Add an extra birthday column
            $widget-&gt;addColumns([
                &#39;birthday&#39; =&gt; [
                    &#39;label&#39; =&gt; &#39;Birthday&#39;
                ]
            ]);

            // Remove a Surname column
            $widget-&gt;removeColumn(&#39;surname&#39;);
        });
    }
}
</code></pre><blockquote><p>Не забудьте добавить <code>use Event</code> в верхнюю часть файла класса.</p></blockquote><p><a href="#extending-component" name="extending-component" class="anchor"></a></p><h3 id="компонент"><a href="#компонент" class="header-anchor">#</a> Компонент</h3><p>В этом примере показано, как можно добавить новое глобальное событие <code>rainlab.forum.topic.post</code> и локальное событие <code>topic.post</code> в компонент <code>Topic</code>.</p><pre><code>class Topic extends ComponentBase
{
    public function onPost()
    {
        [...]

        /*
         * Extensibility
         */
        Event::fire(&#39;rainlab.forum.topic.post&#39;, [$this, $post, $postUrl]);
        $this-&gt;fireEvent(&#39;topic.post&#39;, [$post, $postUrl]);
    }
}
</code></pre><p>Пример добавления записи в журнал при загрузке страницы с компонентом <code>Topic</code>:</p><div class="language- extra-class"><pre class="language-text"><code>[topic]
slug = &quot;{{ :slug }}&quot;
==
function onInit()
{
    $this[&#39;topic&#39;]-&gt;bindEvent(&#39;topic.post&#39;, function($post, $postUrl) {
        trace_log(&#39;A post has been submitted at &#39;.$postUrl);
    });
}
</code></pre></div><p><a href="#extending-backend-menu" name="extending-backend-menu" class="anchor"></a></p><h3 id="меню"><a href="#меню" class="header-anchor">#</a> Меню</h3><p>В этом примере показано, как можно заменить название элемента меню в административной части сайта.</p><pre><code>class Plugin extends PluginBase
{
    [...]

    public function boot()
    {
        Event::listen(&#39;backend.menu.extendItems&#39;, function($manager) {

            $manager-&gt;addMainMenuItems(&#39;October.Cms&#39;, [
                &#39;cms&#39; =&gt; [
                    &#39;label&#39; =&gt; &#39;...&#39;
                ]
            ]);

            $manager-&gt;addSideMenuItems(&#39;October.Cms&#39;, &#39;cms&#39;, [
                &#39;pages&#39; =&gt; [
                    &#39;label&#39; =&gt; &#39;...&#39;
                ]
            ]);

        });
    }
}
</code></pre><p>В этом примере показано, как можно удалить элемент меню в административной части сайта.</p><pre><code>Event::listen(&#39;backend.menu.extendItems&#39;, function($manager) {

    $manager-&gt;removeMainMenuItem(&#39;October.Cms&#39;, &#39;cms&#39;);
    $manager-&gt;removeSideMenuItem(&#39;October.Cms&#39;, &#39;cms&#39;, &#39;pages&#39;);

});
</code></pre>`,57))])}const $=r(d,[["render",p]]);export{v as __pageData,$ as default};
