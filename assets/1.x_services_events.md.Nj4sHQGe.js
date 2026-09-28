import{_ as l,r as s,o as c,c as d,e as i,a as e,s as r,d as t}from"./chunks/framework.CXcwiNg-.js";const y=JSON.parse('{"title":"Events - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Basic usage","slug":"basic-usage","link":"#basic-usage","children":[]},{"level":2,"title":"Subscribing to events","slug":"subscribing-to-events","link":"#subscribing-to-events","children":[{"level":3,"title":"Where to register listeners","slug":"where-to-register-listeners","link":"#where-to-register-listeners","children":[]},{"level":3,"title":"Subscribe using priority","slug":"subscribe-using-priority","link":"#subscribe-using-priority","children":[]},{"level":3,"title":"Halting events","slug":"halting-events","link":"#halting-events","children":[]},{"level":3,"title":"Wildcard listeners","slug":"wildcard-listeners","link":"#wildcard-listeners","children":[]}]},{"level":2,"title":"Firing events","slug":"firing-events","link":"#firing-events","children":[]},{"level":2,"title":"Passing arguments by reference","slug":"passing-arguments-by-reference","link":"#passing-arguments-by-reference","children":[{"level":3,"title":"Queued events","slug":"queued-events","link":"#queued-events","children":[]}]},{"level":2,"title":"Using classes as listeners","slug":"using-classes-as-listeners","link":"#using-classes-as-listeners","children":[{"level":3,"title":"Subscribe to individual methods","slug":"subscribe-to-individual-methods","link":"#subscribe-to-individual-methods","children":[]},{"level":3,"title":"Subscribe to entire class","slug":"subscribe-to-entire-class","link":"#subscribe-to-entire-class","children":[]}]},{"level":2,"title":"Event emitter trait","slug":"event-emitter-trait","link":"#event-emitter-trait","children":[]}],"relativePath":"1.x/services/events.md","filePath":"1.x/services/events.md"}'),h={name:"1.x/services/events.md"};function u(p,n,v,g,m,b){const o=s("pre-heading"),a=s("post-heading");return c(),d("div",null,[i(o),n[0]||(n[0]=e("h1",null,"Events",-1)),i(a),n[1]||(n[1]=r(`<h2 id="basic-usage"><a href="#basic-usage" class="header-anchor">#</a> Basic usage</h2><p>The <code>Event</code> class provides a simple observer implementation, allowing you to subscribe and listen for events in your application. For example, you may listen for when a user signs in and update their last login date.</p><pre><code>Event::listen(&#39;auth.login&#39;, function($user) {
    $user-&gt;last_login = new DateTime;
    $user-&gt;save();
});
</code></pre><p>This is event made available with the <code>Event::fire</code> method which is called as part of the user sign in logic, thereby making the logic extensible.</p><pre><code>Event::fire(&#39;auth.login&#39;, [$user]);
</code></pre>`,5)),n[2]||(n[2]=e("blockquote",null,[e("p",null,[e("strong",null,"Note"),t(": For a list of all available events see the "),e("a",{href:"https://octobercms.com/docs/api",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[t("API documentation"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),t(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),t(),e("span",{class:"sr-only"},"(opens new window)")])]),t(".")])],-1)),n[3]||(n[3]=r(`<h2 id="subscribing-to-events"><a href="#subscribing-to-events" class="header-anchor">#</a> Subscribing to events</h2><p>The <code>Event::listen</code> method is primarily used to subscribe to events and can be done from anywhere within your application code. The first argument is the event name.</p><pre><code>Event::listen(&#39;acme.blog.myevent&#39;, ...);
</code></pre><p>The second argument can be a closure that specifies what should happen when the event is fired. The closure can accept optional some arguments, provided by <a href="#firing-events">the firing event</a>.</p><pre><code>Event::listen(&#39;acme.blog.myevent&#39;, function($arg1, $arg2) {
    // Do something
});
</code></pre><p>You may also pass a reference to any callable object or a <a href="#using-classes-as-listeners">dedicated event class</a> and this will be used instead.</p><pre><code>Event::listen(&#39;auth.login&#39;, [$this, &#39;LoginHandler&#39;]);
</code></pre><blockquote><p><strong>Note</strong>: The callable method can choose to specify all, some or none of the arguments. Either way the event will not throw any errors unless it specifies too many.</p></blockquote><h3 id="where-to-register-listeners"><a href="#where-to-register-listeners" class="header-anchor">#</a> Where to register listeners</h3><p>The most common place is the <code>boot</code> method of a <a href="./../plugin/registration.html#registration-methods">Plugin registration file</a>.</p><pre><code>class Plugin extends PluginBase
{
    [...]

    public function boot()
    {
        Event::listen(...);
    }
}
</code></pre><p>Alternatively, plugins can supply a file named <strong>init.php</strong> in the plugin directory that you can use to place event registration logic. For example:</p><pre><code>&lt;?php

Event::listen(...);
</code></pre><p>Since none of these approaches is inherently &quot;correct&quot;, choose an approach you feel comfortable with based on the size of your application.</p><h3 id="subscribe-using-priority"><a href="#subscribe-using-priority" class="header-anchor">#</a> Subscribe using priority</h3><p>You may also specify a priority as the third argument when subscribing to events. Listeners with higher priority will be run first, while listeners that have the same priority will be run in order of subscription.</p><pre><code>// Run first
Event::listen(&#39;auth.login&#39;, function() { ... }, 10);

// Run second
Event::listen(&#39;auth.login&#39;, function() { ... }, 5);
</code></pre><h3 id="halting-events"><a href="#halting-events" class="header-anchor">#</a> Halting events</h3><p>Sometimes you may wish to stop the propagation of an event to other listeners. You may do so using by returning <code>false</code> from your listener:</p><pre><code>Event::listen(&#39;auth.login&#39;, function($event) {
    // Handle the event

    return false;
});
</code></pre><h3 id="wildcard-listeners"><a href="#wildcard-listeners" class="header-anchor">#</a> Wildcard listeners</h3><p>When registering an event listener, you may use asterisks to specify wildcard listeners. Wildcard listeners will receive the event name fired first, followed by the parameters passed through to the event as an array.</p><p>The following listener will handle all events that begin with <code>foo.</code>.</p><pre><code>Event::listen(&#39;foo.*&#39;, function($event, $params) {
    // Handle the event...
});
</code></pre><p>You may use the <code>Event::firing</code> method to determine exactly which event was fired:</p><pre><code>Event::listen(&#39;foo.*&#39;, function($event, $params) {
    if (Event::firing() === &#39;foo.bar&#39;) {
        // ...
    }
});
</code></pre><h2 id="firing-events"><a href="#firing-events" class="header-anchor">#</a> Firing events</h2><p>You may use the <code>Event::fire</code> method anywhere in your code to make the logic extensible. This means other developers, or even your own internal code, can &quot;hook&quot; to this point of code and inject specific logic. The first argument of should be the event name.</p><pre><code>Event::fire(&#39;myevent&#39;)
</code></pre><p>It is always a good idea to prefix event names with your plugin namespace code, this will prevent collisions with other plugins.</p><pre><code>Event::fire(&#39;acme.blog.myevent&#39;);
</code></pre><p>The second argument is an array of values that will be passed as arguments to <a href="#subscribing-to-events">the event listener</a> subscribing to it.</p><pre><code>Event::fire(&#39;acme.blog.myevent&#39;, [$arg1, $arg2]);
</code></pre><p>The third argument specifies whether the event should be a <a href="#halting-events">halting event</a>, meaning it should halt if a &quot;non null&quot; value is returned. This argument is set to false by default.</p><pre><code>Event::fire(&#39;acme.blog.myevent&#39;, [...], true);
</code></pre><p>If the event is halting, the first value returned with be captured.</p><pre><code>// Single result, event halted
$result = Event::fire(&#39;acme.blog.myevent&#39;, [...], true);
</code></pre><p>Otherwise it returns a collection of all the responses from all the events in the form of an array.</p><pre><code>// Multiple results, all events fired
$results = Event::fire(&#39;acme.blog.myevent&#39;, [...]);
</code></pre><h2 id="passing-arguments-by-reference"><a href="#passing-arguments-by-reference" class="header-anchor">#</a> Passing arguments by reference</h2><p>When processing or filtering over a value passed to an event, you may prefix the variable with <code>&amp;</code> to pass it by reference. This allows multiple listeners to manipulate the result and pass it to the next one.</p><pre><code>Event::fire(&#39;cms.processContent&#39;, [&amp;$content]);
</code></pre><p>When listening for the event, the argument also needs to be declared with the <code>&amp;</code> symbol in the closure definition. In the example below, the <code>$content</code> variable will have &quot;AB&quot; appended to the result.</p><pre><code>Event::listen(&#39;cms.processContent&#39;, function (&amp;$content) {
    $content = $content . &#39;A&#39;;
});

Event::listen(&#39;cms.processContent&#39;, function (&amp;$content) {
    $content = $content . &#39;B&#39;;
});
</code></pre><h3 id="queued-events"><a href="#queued-events" class="header-anchor">#</a> Queued events</h3><p>Firing events can be deferred in <a href="./../services/queues.html">conjunction with queues</a>. Use the <code>Event::queue</code> method to &quot;queue&quot; the event for firing but not fire it immediately.</p><pre><code>Event::queue(&#39;foo&#39;, [$user]);
</code></pre><p>You may use the <code>Event::flush</code> method to flush all queued events.</p><pre><code>Event::flush(&#39;foo&#39;);
</code></pre><h2 id="using-classes-as-listeners"><a href="#using-classes-as-listeners" class="header-anchor">#</a> Using classes as listeners</h2><p>In some cases, you may wish to use a class to handle an event rather than a Closure. Class event listeners will be resolved out of the <a href="./application.html">Application IoC container</a>, providing you with the full power of dependency injection on your listeners.</p><h3 id="subscribe-to-individual-methods"><a href="#subscribe-to-individual-methods" class="header-anchor">#</a> Subscribe to individual methods</h3><p>The event class can be registered with the <code>Event::listen</code> method like any other, passing the class name as a string.</p><pre><code>Event::listen(&#39;auth.login&#39;, &#39;LoginHandler&#39;);
</code></pre><p>By default, the <code>handle</code> method on the <code>LoginHandler</code> class will be called:</p><pre><code>class LoginHandler
{
    public function handle($data)
    {
        // ...
    }
}
</code></pre><p>If you do not wish to use the default <code>handle</code> method, you may specify the method name that should be subscribed.</p><pre><code>Event::listen(&#39;auth.login&#39;, &#39;LoginHandler@onLogin&#39;);
</code></pre><h3 id="subscribe-to-entire-class"><a href="#subscribe-to-entire-class" class="header-anchor">#</a> Subscribe to entire class</h3><p>Event subscribers are classes that may subscribe to multiple events from within the class itself. Subscribers should define a <code>subscribe</code> method, which will be passed an event dispatcher instance.</p><pre><code>class UserEventHandler
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
</code></pre><p>Once the subscriber has been defined, it may be registered with the <code>Event::subscribe</code> method.</p><pre><code>Event::subscribe(new UserEventHandler);
</code></pre><p>You may also use the <a href="./application.html">Application IoC container</a> to resolve your subscriber. To do so, simply pass the name of your subscriber to the <code>subscribe</code> method.</p><pre><code>Event::subscribe(&#39;UserEventHandler&#39;);
</code></pre><h2 id="event-emitter-trait"><a href="#event-emitter-trait" class="header-anchor">#</a> Event emitter trait</h2><p>Sometimes you want to bind events to a single instance of an object. You may use an alternative event system by implementing the <code>October\\Rain\\Support\\Traits\\Emitter</code> trait inside your class.</p><pre><code>class UserManager
{
    use \\October\\Rain\\Support\\Traits\\Emitter;
}
</code></pre><p>This trait provides a method to listen for events with <code>bindEvent</code>.</p><pre><code>$manager = new UserManager;
$manager-&gt;bindEvent(&#39;user.beforeRegister&#39;, function($user) {
    // Check if the $user is a spammer
});
</code></pre><p>The <code>fireEvent</code> method is used to fire events.</p><pre><code>$manager = new UserManager;
$manager-&gt;fireEvent(&#39;user.beforeRegister&#39;, [$user]);
</code></pre><p>These events will only occur on the local object as opposed to globally.</p>`,73))])}const w=l(h,[["render",u]]);export{y as __pageData,w as default};
