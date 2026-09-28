import{_ as a,r as n,o,c,e as r,a as i,s as l}from"./chunks/framework.CXcwiNg-.js";const b=JSON.parse('{"title":"События ( Events ) - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Использование","slug":"использование","link":"#использование","children":[]},{"level":2,"title":"Подписка на события","slug":"подписка-на-события","link":"#подписка-на-события","children":[{"level":3,"title":"Где писать код ?","slug":"где-писать-код","link":"#где-писать-код","children":[]},{"level":3,"title":"Подписка на событие с приоритетом","slug":"подписка-на-событие-с-приоритетом","link":"#подписка-на-событие-с-приоритетом","children":[]},{"level":3,"title":"Прерывание обработки события","slug":"прерывание-обработки-события","link":"#прерывание-обработки-события","children":[]},{"level":3,"title":"Обработчики по шаблону (wildcard)","slug":"обработчики-по-шаблону-wildcard","link":"#обработчики-по-шаблону-wildcard","children":[]}]},{"level":2,"title":"Вызов событий ( Firing events )","slug":"вызов-событии-firing-events","link":"#вызов-событии-firing-events","children":[]},{"level":2,"title":"Передача аргументов по ссылке","slug":"передача-аргументов-по-ссылке","link":"#передача-аргументов-по-ссылке","children":[{"level":3,"title":"Очередь событий","slug":"очередь-событии","link":"#очередь-событии","children":[]}]},{"level":2,"title":"Использование классов в качестве слушателей","slug":"использование-классов-в-качестве-слушателеи","link":"#использование-классов-в-качестве-слушателеи","children":[{"level":3,"title":"Определение метода-подписчика","slug":"определение-метода-подписчика","link":"#определение-метода-подписчика","children":[]},{"level":3,"title":"Определение класса-подписчика","slug":"определение-класса-подписчика","link":"#определение-класса-подписчика","children":[]}]},{"level":2,"title":"Трейт","slug":"треит","link":"#треит","children":[]}],"relativePath":"1.x/ru/services/events.md","filePath":"1.x/ru/services/events.md"}'),p={name:"1.x/ru/services/events.md"};function d(h,e,u,v,g,f){const t=n("pre-heading"),s=n("post-heading");return o(),c("div",null,[r(t),e[0]||(e[0]=i("h1",null,"События ( Events )",-1)),r(s),e[1]||(e[1]=l(`<p><a href="basic-usage" name="basic-usage" class="anchor"></a></p><h2 id="использование"><a href="#использование" class="header-anchor">#</a> Использование</h2><p>Класс <code>Event</code> содержит простую реализацию концепции Observer (&quot;Наблюдатель&quot;), что позволяет Вам подписываться на уведомления о событиях (listen for events) в вашем приложении. Пример:</p><pre><code>Event::listen(&#39;auth.login&#39;, function($user) {
    $user-&gt;last_login = new DateTime;
    $user-&gt;save();
});
</code></pre><p>Вы можете получить доступ к этому событию при помощи метода <code>Event::fire</code>, который позволяет расширить логику Вашего приложения:</p><pre><code>Event::fire(&#39;auth.login&#39;, [$user]);
</code></pre><p><a href="events-subscribing" name="events-subscribing" class="anchor"></a></p><h2 id="подписка-на-события"><a href="#подписка-на-события" class="header-anchor">#</a> Подписка на события</h2><p>Вы можете использовать метод <code>Event::listen</code> в любом месте. Первый аргумент - название события.</p><pre><code>Event::listen(&#39;acme.blog.myevent&#39;, ...);
</code></pre><p>Второй аргумент - функция-замыкание с <a href="#events-firing">произвольными аргументами</a>.</p><pre><code>Event::listen(&#39;acme.blog.myevent&#39;, function($arg1, $arg2) {
    // Do something
});
</code></pre><p>Вы также можете передать ссылку на вызываемый объект или на <a href="#using-classes-as-listeners">класс</a>.</p><pre><code>Event::listen(&#39;auth.login&#39;, [$this, &#39;LoginHandler&#39;]);
</code></pre><blockquote><p><strong>Примечание</strong>: Вы можете указать все аргументы, их часть или ничего. В любом случае событие не будет вызывать никаких ошибок, если их не указано слишком много.</p></blockquote><p><a href="event-registration" name="event-registration" class="anchor"></a></p><h3 id="где-писать-код"><a href="#где-писать-код" class="header-anchor">#</a> Где писать код ?</h3><p>Наиболее подходящее место - метод <code>boot</code> в <a href="./../plugin/registration.html#registration-methods">файле регистрации плагина</a>.</p><pre><code>class Plugin extends PluginBase
{
    [...]

    public function boot()
    {
        Event::listen(...);
    }
}
</code></pre><p>Вы также можете использовать файл <strong>init.php</strong> в папке с плагином. Пример:</p><pre><code>&lt;?php

Event::listen(...);
</code></pre><p><a href="subscribing-priority" name="subscribing-priority" class="anchor"></a></p><h3 id="подписка-на-событие-с-приоритетом"><a href="#подписка-на-событие-с-приоритетом" class="header-anchor">#</a> Подписка на событие с приоритетом</h3><p>При подписке на событие Вы можете указать приоритет. Обработчики с более высоким приоритетом будут вызваны перед теми, чей приоритет ниже, а обработчики с одинаковым приоритетом будут вызываться в порядке их регистрации.</p><pre><code>// Run first
Event::listen(&#39;auth.login&#39;, function() { ... }, 10);

// Run second
Event::listen(&#39;auth.login&#39;, function() { ... }, 5);
</code></pre><p><a href="subscribing-halting" name="subscribing-halting" class="anchor"></a></p><h3 id="прерывание-обработки-события"><a href="#прерывание-обработки-события" class="header-anchor">#</a> Прерывание обработки события</h3><p>Иногда Вам может быть нужно пропустить вызовы других обработчиков события. Вы можете сделать это, вернув значение <code>false</code>:</p><pre><code>Event::listen(&#39;auth.login&#39;, function($event) {
    // Handle the event

    return false;
});
</code></pre><p><a href="wildcard-listeners" name="wildcard-listeners" class="anchor"></a></p><h3 id="обработчики-по-шаблону-wildcard"><a href="#обработчики-по-шаблону-wildcard" class="header-anchor">#</a> Обработчики по шаблону (wildcard)</h3><p>Вы можете использовать звёздочки (*) при регистрации обработчика для привязки его ко всем подходящим событиям. Пример:</p><pre><code>Event::listen(&#39;foo.*&#39;, function($param) {
    // Handle the event...
});
</code></pre><p>Используйте метод <code>Event::firing</code>, для определения того, какое именно событие из подходящих под <code>foo.*</code> поймано:</p><pre><code>Event::listen(&#39;foo.*&#39;, function($param) {
    if (Event::firing() == &#39;foo.bar&#39;) {
        // ...
    }
});
</code></pre><p><a href="events-firing" name="events-firing" class="anchor"></a></p><h2 id="вызов-событии-firing-events"><a href="#вызов-событии-firing-events" class="header-anchor">#</a> Вызов событий ( Firing events )</h2><p>Вы можете использовать метод <code>Event::fire</code> в любом месте вашего кода, чтобы сделать логику расширяемой. Это означает, что другие разработчики или даже Ваш собственный код могут «подключиться» к этой точке и добавить новую логику. Первый аргумент - название события.</p><pre><code>Event::fire(&#39;myevent&#39;)
</code></pre><p>Вы можете использовать в качестве префикса пространство имен, чтобы избежать конфликты с другими плагинами.</p><pre><code>Event::fire(&#39;acme.blog.myevent&#39;);
</code></pre><p>Второй аргумент - произвольный массив данных, которые будут использоваться в качестве аргументов в методе <code>Event::listen</code>.</p><pre><code>Event::fire(&#39;acme.blog.myevent&#39;, [$arg1, $arg2]);
</code></pre><p>Третий аргумент указывает на то, что <a href="#subscribing-halting">событие должно прерываться</a>, если возвращаемое значение - &quot;non null&quot;. По умолчанию этот аргумент имеет значение <code>false</code>.</p><pre><code>Event::fire(&#39;acme.blog.myevent&#39;, [...], true);

// Single result, event halted
$result = Event::fire(&#39;acme.blog.myevent&#39;, [...], true);

// Collection of results, all events fired
$results = Event::fire(&#39;acme.blog.myevent&#39;, [...]);
</code></pre><p><a href="event-pass-by-reference" name="event-pass-by-reference" class="anchor"></a></p><h2 id="передача-аргументов-по-ссылке"><a href="#передача-аргументов-по-ссылке" class="header-anchor">#</a> Передача аргументов по ссылке</h2><p>Вы можете передать переменную по ссылке, чтобы изменить ее содержимое:</p><pre><code>// $content = &#39;111&#39;
Event::fire(&#39;cms.processContent&#39;, [&amp;$content]);
</code></pre><p>Пример:</p><pre><code>Event::listen(&#39;cms.processContent&#39;, function (&amp;$content) {
    $content = $content . &#39;A&#39;;
});

Event::listen(&#39;cms.processContent&#39;, function (&amp;$content) {
    $content = $content . &#39;B&#39;;
});
</code></pre><p>В итоге: <code>$content = &#39;111AB&#39;</code>.</p><p><a href="queued-events" name="queued-events" class="anchor"></a></p><h3 id="очередь-событии"><a href="#очередь-событии" class="header-anchor">#</a> Очередь событий</h3><p>Вы можете использовать метод <code>Event::queue</code>, чтобы отложить выполнение события и добавить его в <a href="./../services/queues.html">очередь</a>.</p><pre><code>Event::queue(&#39;foo&#39;, [$user]);
</code></pre><p>Используйте метод <code>Event::flush</code>, чтобы удалить все события из очереди.</p><pre><code>Event::flush(&#39;foo&#39;);
</code></pre><p><a href="using-classes-as-listeners" name="using-classes-as-listeners" class="anchor"></a></p><h2 id="использование-классов-в-качестве-слушателеи"><a href="#использование-классов-в-качестве-слушателеи" class="header-anchor">#</a> Использование классов в качестве слушателей</h2><p>Вы можете использовать классы для обработки событий.</p><p><a href="event-class-method" name="event-class-method" class="anchor"></a></p><h3 id="определение-метода-подписчика"><a href="#определение-метода-подписчика" class="header-anchor">#</a> Определение метода-подписчика</h3><p>Вы можете определить класс для обработки событий, передав его название в качестве второго аргумента.</p><pre><code>Event::listen(&#39;auth.login&#39;, &#39;LoginHandler&#39;);
</code></pre><p>По умолчанию буде вызываться метод <code>handle</code> класса <code>LoginHandler</code>:</p><pre><code>class LoginHandler
{
    public function handle($data)
    {
        // ...
    }
}
</code></pre><p>Вы можете заменить этот метода на любой другой:</p><pre><code>Event::listen(&#39;auth.login&#39;, &#39;LoginHandler@onLogin&#39;);
</code></pre><p><a href="event-class-subscribe" name="event-class-subscribe" class="anchor"></a></p><h3 id="определение-класса-подписчика"><a href="#определение-класса-подписчика" class="header-anchor">#</a> Определение класса-подписчика</h3><p>Подписчики на события (Event Class Subscribers) - классы, которые могут быть подписаны на несколько событий и содержать сразу несколько обработчиков событий. Такой класс должен иметь метод <code>subscribe</code>, который принимает в аргументах инстанс диспетчера событий:</p><pre><code>class UserEventHandler
{
    /**
     * Handle user login events.
     */
    public function userLogin($event)
    {
        // ...
    }

    /**
     * Handle user logout events.
     */
    public function userLogout($event)
    {
        // ...
    }

    /**
     * Register the listeners for the subscriber.
     *
     * @param  Illuminate\\Events\\Dispatcher  $events
     * @return array
     */
    public function subscribe($events)
    {
        $events-&gt;listen(&#39;auth.login&#39;, &#39;UserEventHandler@userLogin&#39;);

        $events-&gt;listen(&#39;auth.logout&#39;, &#39;UserEventHandler@userLogout&#39;);
    }
}
</code></pre><p>После того как класс определён, его можно зарегистрировать следующим образом:</p><pre><code>Event::subscribe(new UserEventHandler);
</code></pre><p>Вы также можете использовать <a href="./../services/application.html">сервис-контейнер</a> для того, чтобы получить объект своего подписчика на события:</p><pre><code>Event::subscribe(&#39;UserEventHandler&#39;);
</code></pre><p><a href="event-emitter-trait" name="event-emitter-trait" class="anchor"></a></p><h2 id="треит"><a href="#треит" class="header-anchor">#</a> Трейт</h2><p>Вы можете использовать трейт <code>October\\Rain\\Support\\Traits\\Emitter</code>, чтобы связать события с экземпляром объекта внутри вашего класса.</p><pre><code>class UserManager
{
    use \\October\\Rain\\Support\\Traits\\Emitter;
}
</code></pre><p>Этот трейт позволяет &quot;слушать&quot; события при помощи метода <code>bindEvent</code>.</p><pre><code>$manager = new UserManager;
$manager-&gt;bindEvent(&#39;user.beforeRegister&#39;, function($user) {
    // Check if the $user is a spammer
});
</code></pre><p>Метод <code>fireEvent</code> используется для «выстреливания» события.</p><pre><code>$manager = new UserManager;
$manager-&gt;fireEvent(&#39;user.beforeRegister&#39;, [$user]);
</code></pre><p>Эти события будут происходить только для локального объекта.</p>`,86))])}const E=a(p,[["render",d]]);export{b as __pageData,E as default};
