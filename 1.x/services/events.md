# Events

## Basic usage

>**Note:** For a list of all events available in OctoberCMS itself, see the [api documentation](https://octobercms.com/docs/api/translator/beforeresolve).

The `Event` class provides a simple observer implementation, allowing you to subscribe and listen for events in your application. For example, you may listen for when a user signs in and update their last login date.

    Event::listen('auth.login', function($user) {
        $user->last_login = new DateTime;
        $user->save();
    });

This is event made available with the `Event::fire` method which is called as part of the user sign in logic, thereby making the logic extensible.

    Event::fire('auth.login', [$user]);

## Subscribing to events

The `Event::listen` method is primarily used to subscribe to events and can be done from anywhere within your application code. The first argument is the event name.

    Event::listen('acme.blog.myevent', ...);

The second argument can be a closure that specifies what should happen when the event is fired. The closure can accept optional some arguments, provided by [the firing event](#firing-events).

    Event::listen('acme.blog.myevent', function($arg1, $arg2) {
        // Do something
    });

You may also pass a reference to any callable object or a [dedicated event class](#using-classes-as-listeners) and this will be used instead.

    Event::listen('auth.login', [$this, 'LoginHandler']);

> **Note**: The callable method can choose to specify all, some or none of the arguments. Either way the event will not throw any errors unless it specifies too many.

### Where to register listeners

The most common place is the `boot` method of a [Plugin registration file](../plugin/registration#registration-methods).

    class Plugin extends PluginBase
    {
        [...]

        public function boot()
        {
            Event::listen(...);
        }
    }

Alternatively, plugins can supply a file named **init.php** in the plugin directory that you can use to place event registration logic. For example:

    <?php

    Event::listen(...);

Since none of these approaches is inherently "correct", choose an approach you feel comfortable with based on the size of your application.

### Subscribe using priority

You may also specify a priority as the third argument when subscribing to events. Listeners with higher priority will be run first, while listeners that have the same priority will be run in order of subscription.

    // Run first
    Event::listen('auth.login', function() { ... }, 10);

    // Run second
    Event::listen('auth.login', function() { ... }, 5);

### Halting events

Sometimes you may wish to stop the propagation of an event to other listeners. You may do so using by returning `false` from your listener:

    Event::listen('auth.login', function($event) {
        // Handle the event

        return false;
    });

### Wildcard listeners

When registering an event listener, you may use asterisks to specify wildcard listeners. Wildcard listeners will receive the event name fired first, followed by the parameters passed through to the event as an array.

The following listener will handle all events that begin with `foo.`.

    Event::listen('foo.*', function($event, $params) {
        // Handle the event...
    });

You may use the `Event::firing` method to determine exactly which event was fired:

    Event::listen('foo.*', function($event, $params) {
        if (Event::firing() === 'foo.bar') {
            // ...
        }
    });

## Firing events

You may use the `Event::fire` method anywhere in your code to make the logic extensible. This means other developers, or even your own internal code, can "hook" to this point of code and inject specific logic. The first argument of should be the event name.

    Event::fire('myevent')

It is always a good idea to prefix event names with your plugin namespace code, this will prevent collisions with other plugins.

    Event::fire('acme.blog.myevent');

The second argument is an array of values that will be passed as arguments to [the event listener](#subscribing-to-events) subscribing to it.

    Event::fire('acme.blog.myevent', [$arg1, $arg2]);

The third argument specifies whether the event should be a [halting event](#halting-events), meaning it should halt if a "non null" value is returned. This argument is set to false by default.

    Event::fire('acme.blog.myevent', [...], true);

If the event is halting, the first value returned with be captured.

    // Single result, event halted
    $result = Event::fire('acme.blog.myevent', [...], true);

Otherwise it returns a collection of all the responses from all the events in the form of an array.

    // Multiple results, all events fired
    $results = Event::fire('acme.blog.myevent', [...]);

## Passing arguments by reference

When processing or filtering over a value passed to an event, you may prefix the variable with `&` to pass it by reference. This allows multiple listeners to manipulate the result and pass it to the next one.

    Event::fire('cms.processContent', [&$content]);

When listening for the event, the argument also needs to be declared with the `&` symbol in the closure definition. In the example below, the `$content` variable will have "AB" appended to the result.

    Event::listen('cms.processContent', function (&$content) {
        $content = $content . 'A';
    });

    Event::listen('cms.processContent', function (&$content) {
        $content = $content . 'B';
    });

### Queued events

Firing events can be deferred in [conjunction with queues](../services/queues). Use the `Event::queue` method to "queue" the event for firing but not fire it immediately.

    Event::queue('foo', [$user]);

You may use the `Event::flush` method to flush all queued events.

    Event::flush('foo');

## Using classes as listeners

In some cases, you may wish to use a class to handle an event rather than a Closure. Class event listeners will be resolved out of the [Application IoC container](application), providing you with the full power of dependency injection on your listeners.

### Subscribe to individual methods

The event class can be registered with the `Event::listen` method like any other, passing the class name as a string.

    Event::listen('auth.login', 'LoginHandler');

By default, the `handle` method on the `LoginHandler` class will be called:

    class LoginHandler
    {
        public function handle($data)
        {
            // ...
        }
    }

If you do not wish to use the default `handle` method, you may specify the method name that should be subscribed.

    Event::listen('auth.login', 'LoginHandler@onLogin');

### Subscribe to entire class

Event subscribers are classes that may subscribe to multiple events from within the class itself. Subscribers should define a `subscribe` method, which will be passed an event dispatcher instance.

    class UserEventHandler
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
         * @param  Illuminate\Events\Dispatcher  $events
         * @return array
         */
        public function subscribe($events)
        {
            $events->listen('auth.login', 'UserEventHandler@userLogin');

            $events->listen('auth.logout', 'UserEventHandler@userLogout');
        }
    }

Once the subscriber has been defined, it may be registered with the `Event::subscribe` method.

    Event::subscribe(new UserEventHandler);

You may also use the [Application IoC container](application) to resolve your subscriber. To do so, simply pass the name of your subscriber to the `subscribe` method.

    Event::subscribe('UserEventHandler');

## Event emitter trait

Sometimes you want to bind events to a single instance of an object. You may use an alternative event system by implementing the `October\Rain\Support\Traits\Emitter` trait inside your class.

    class UserManager
    {
        use \October\Rain\Support\Traits\Emitter;
    }

This trait provides a method to listen for events with `bindEvent`.

    $manager = new UserManager;
    $manager->bindEvent('user.beforeRegister', function($user) {
        // Check if the $user is a spammer
    });

The `fireEvent` method is used to fire events.

    $manager = new UserManager;
    $manager->fireEvent('user.beforeRegister', [$user]);

These events will only occur on the local object as opposed to globally.
