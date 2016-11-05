# Events

- [Basic usage](#basic-usage)
    - [Where to register events](#event-registration)
- [Wildcard listeners](#wildcard-listeners)
- [Using classes as listeners](#using-classes-as-listeners)
- [Queued events](#queued-events)
- [Event subscribers](#event-subscribers)
- [Event emitter trait](#event-emitter-trait)

<a name="basic-usage"></a>
## Basic usage

The `Event` class provides a simple observer implementation, allowing you to subscribe and listen for events in your application.

#### Subscribing to an event

    Event::listen('auth.login', function($user) {
        $user->last_login = new DateTime;

        $user->save();
    });

#### Firing an event

    $response = Event::fire('auth.login', [$user]);

The `fire` method returns an array of responses that you can use to control what happens next in your application.

#### Subscribing to events with priority

You may also specify a priority when subscribing to events. Listeners with higher priority will be run first, while listeners that have the same priority will be run in order of subscription.

    Event::listen('auth.login', 'LoginHandler', 10);

    Event::listen('auth.login', 'OtherHandler', 5);

#### Stopping the propagation of an event

Sometimes you may wish to stop the propagation of an event to other listeners. You may do so using by returning `false` from your listener:

    Event::listen('auth.login', function($event) {
        // Handle the event...

        return false;
    });

<a name="event-registration"></a>
### Where to register events

So, you know how to register events, but you may be wondering _where_ to register them. Subscribing to an event can be done from anywhere, although the most common place is the `boot()` method of a [Plugin registration file](../plugin/registration#registration-methods).

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

<a name="wildcard-listeners"></a>
## Wildcard listeners

#### Registering wildcard event listeners

When registering an event listener, you may use asterisks to specify wildcard listeners:

    Event::listen('foo.*', function($param) {
        // Handle the event...
    });

This listener will handle all events that begin with `foo.`.

You may use the `Event::firing` method to determine exactly which event was fired:

    Event::listen('foo.*', function($param) {
        if (Event::firing() == 'foo.bar') {
            //
        }
    });

<a name="using-classes-as-listeners"></a>
## Using classes as listeners

In some cases, you may wish to use a class to handle an event rather than a Closure. Class event listeners will be resolved out of the [Application IoC container](application), providing you with the full power of dependency injection on your listeners.

#### Registering a class listener

    Event::listen('auth.login', 'LoginHandler');

#### Defining an Event listener class

By default, the `handle()` method on the `LoginHandler` class will be called:

    class LoginHandler
    {
        public function handle($data)
        {
            //
        }
    }

#### Specifying which method to subscribe

If you do not wish to use the default `handle` method, you may specify the method that should be subscribed:

    Event::listen('auth.login', 'LoginHandler@onLogin');

<a name="queued-events"></a>
## Queued events

#### Registering a queued event

Using the `queue` and `flush` methods, you may "queue" an event for firing, but not fire it immediately:

    Event::queue('foo', [$user]);

You may run the "flusher" and flush all queued events using the `flush` method:

    Event::flush('foo');

<a name="event-subscribers"></a>
## Event subscribers

#### Defining an event subscriber

Event subscribers are classes that may subscribe to multiple events from within the class itself. Subscribers should define a `subscribe` method, which will be passed an event dispatcher instance:

    class UserEventHandler
    {
        /**
         * Handle user login events.
         */
        public function onUserLogin($event)
        {
            //
        }

        /**
         * Handle user logout events.
         */
        public function onUserLogout($event)
        {
            //
        }

        /**
         * Register the listeners for the subscriber.
         *
         * @param  Illuminate\Events\Dispatcher  $events
         * @return array
         */
        public function subscribe($events)
        {
            $events->listen('auth.login', 'UserEventHandler@onUserLogin');

            $events->listen('auth.logout', 'UserEventHandler@onUserLogout');
        }
    }

#### Registering an event subscriber

Once the subscriber has been defined, it may be registered with the `Event` class.

    $subscriber = new UserEventHandler;

    Event::subscribe($subscriber);

You may also use the [Application IoC container](application) to resolve your subscriber. To do so, simply pass the name of your subscriber to the `subscribe` method:

    Event::subscribe('UserEventHandler');

<a name="event-emitter-trait"></a>
## Event emitter trait

Sometimes you want to bind events to a single instance of an object. You may use an alternative event system by implementing the `October\Rain\Support\Traits\Emitter` trait inside your class.

    class UserManager
    {
        use \October\Rain\Support\Traits\Emitter;
    }

This trait provides a method to listen for events with `bindEvent()`

    $manager = new UserManager;
    $manager->bindEvent('user.beforeRegister', function($user) {
        // Check if the $user is a spammer
    });

The `fireEvent()` method is used to fire events.

    $manager = new UserManager;
    $manager->fireEvent('user.beforeRegister', [$user]);

These events will only occur on the local object as opposed to globally.
