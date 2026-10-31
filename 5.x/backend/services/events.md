---
previousPath: extend/services/event.md
subtitle: Listen for events to extend October CMS, and fire your own events so other plugins can extend yours.
---
# Events

The `Event` facade lets you listen for events fired by October CMS and other plugins, and fire your own events so other code can hook into yours. For example, you can listen for when a user signs in and update their last login date.

```php
Event::listen('auth.login', function($user) {
    $user->last_login = new DateTime;
    $user->save();
});
```

The sign in logic fires this event with the `Event::fire` method, which is what makes the logic extensible.

```php
Event::fire('auth.login', [$user]);
```

::: tip
The events most often used to extend October CMS are listed under [Commonly Used Events](#commonly-used-events).
:::

## Listening for Events

Use the `Event::listen` method to subscribe to an event from anywhere in your application code. The first argument is the event name.

```php
Event::listen('acme.blog.myevent', ...);
```

The second argument is usually a closure that runs when the event is fired. The closure can accept the arguments provided by the event.

```php
Event::listen('acme.blog.myevent', function($arg1, $arg2) {
    // Do something
});
```

You can also pass any callable, or a dedicated event class, instead of a closure.

```php
Event::listen('auth.login', [$this, 'LoginHandler']);
```

::: tip
The listener can accept all, some or none of the event arguments. It only throws an error if it requires more arguments than the event provides.
:::

### Where to Register Listeners

The most common place is the `boot` method of the [plugin registration file](../plugins/introduction.md#running-code-when-the-plugin-loads).

```php
class Plugin extends PluginBase
{
    // ...

    public function boot()
    {
        Event::listen(...);
    }
}
```

Alternatively, a plugin can include an [init.php file](../plugins/introduction.md#using-an-initialization-file) in the plugin directory to hold its event registrations.

```php
Event::listen(...);
```

Neither approach is more correct than the other, so choose the one that suits the size of your plugin.

### Setting the Listener Priority

Pass a priority as the third argument when subscribing to an event. Listeners with a higher priority run first, and listeners with the same priority run in the order they subscribed.

```php
// Run first
Event::listen('auth.login', function() { ... }, 10);

// Run second
Event::listen('auth.login', function() { ... }, 5);
```

### Stopping Other Listeners

To stop an event from reaching the remaining listeners, return `false` from your listener.

```php
Event::listen('auth.login', function($event) {
    // Handle the event

    return false;
});
```

### Listening With Wildcards

Use an asterisk in the event name to register a wildcard listener. A wildcard listener receives the name of the fired event first, followed by the event parameters as an array.

The following listener handles every event that begins with `foo.`, and checks the event name to find out which one was fired.

```php
Event::listen('foo.*', function($event, $params) {
    if ($event === 'foo.bar') {
        // ...
    }
});
```

## Firing Events

Use the `Event::fire` method anywhere in your code to make the logic extensible. Other developers, or your own code, can then hook into this point and add their own logic. The first argument is the event name.

```php
Event::fire('myevent');
```

Prefix event names with your plugin namespace to avoid collisions with other plugins.

```php
Event::fire('acme.blog.myevent');
```

The second argument is an array of values passed as arguments to each listener.

```php
Event::fire('acme.blog.myevent', [$arg1, $arg2]);
```

Without halting, the method returns an array of the responses from every listener.

```php
// Multiple results, all events fired
$results = Event::fire('acme.blog.myevent', [...]);
```

### Halting on the First Result

The third argument makes the event a halting event, which stops at the first listener that returns a non-null value. It is `false` by default.

```php
Event::fire('acme.blog.myevent', [...], true);
```

A halting event returns the first value it captures.

```php
// Single result, event halted
$result = Event::fire('acme.blog.myevent', [...], true);
```

### Passing Arguments by Reference

To let several listeners change a value in turn, prefix the variable with `&` to pass it by reference. Each listener receives the result of the previous one.

```php
Event::fire('cms.processContent', [&$content]);
```

The listener must also declare the argument with the `&` symbol. In the example below, the `$content` variable ends up with "AB" appended.

```php
Event::listen('cms.processContent', function (&$content) {
    $content = $content . 'A';
});

Event::listen('cms.processContent', function (&$content) {
    $content = $content . 'B';
});
```

### Firing Events Later

Use the `Event::push` method to register an event and its arguments without firing it.

```php
Event::push('foo', [$user]);
```

Then use the `Event::flush` method to fire every pushed event with that name.

```php
Event::flush('foo');
```

## Using Classes as Listeners

You can handle an event with a class instead of a closure. Class listeners are resolved from the [Application IoC container](./application.md), so you can use dependency injection in your listeners.

### Listening With a Class Method

Register the event class with the `Event::listen` method, passing the class name.

```php
Event::listen('auth.login', LoginHandler::class);
```

By default, the `handle` method of the `LoginHandler` class is called.

```php
class LoginHandler
{
    public function handle($data)
    {
        // ...
    }
}
```

To call a different method, pass the class name and method name as an array.

```php
Event::listen('auth.login', [LoginHandler::class, 'onLogin']);
```

### Subscribing a Class to Many Events

An event subscriber is a class that subscribes to several events from within the class itself. A subscriber defines a `subscribe` method, which receives an event dispatcher instance.

```php
class UserEventHandler
{
    /**
     * subscribe register the listeners for the subscriber.
     * @param  Illuminate\Events\Dispatcher  $events
     * @return array
     */
    public function subscribe($events)
    {
        $events->listen('auth.login', [static::class, 'userLogin']);

        $events->listen('auth.logout', [static::class, 'userLogout']);
    }

    /**
     * userLogin handles user login events.
     */
    public function userLogin($event)
    {
        // ...
    }

    /**
     * userLogout handles user logout events.
     */
    public function userLogout($event)
    {
        // ...
    }
}
```

Register the subscriber with the `Event::subscribe` method.

```php
Event::subscribe(new UserEventHandler);
```

You can also pass the class name, and the subscriber is resolved from the [Application IoC container](./application.md).

```php
Event::subscribe(UserEventHandler::class);
```

## Events on a Single Object

To bind events to one instance of an object rather than globally, use the `October\Rain\Support\Traits\Emitter` trait in your class.

```php
class UserManager
{
    use \October\Rain\Support\Traits\Emitter;
}
```

The trait adds the `bindEvent` method to listen for events.

```php
$manager = new UserManager;
$manager->bindEvent('user.beforeRegister', function($user) {
    // Check if the $user is a spammer
});
```

Use the `fireEvent` method to fire events.

```php
$manager = new UserManager;
$manager->fireEvent('user.beforeRegister', [$user]);
```

These events only reach listeners bound to the same object.

## Commonly Used Events

The following events are the ones most often used to extend October CMS.

Event | Description
------------- | -------------
`backend.form.extendFields` | called after the form fields are defined.
`backend.list.extendColumns` | modify the columns of a list.
`backend.list.extendQuery` | modify the query after the list has applied its scopes, before the records are fetched.
`backend.filter.extendScopes` | interact with the filter and its scopes after they have been initialized.
`backend.menu.extendItems` | manipulate the backend navigation.
`backend.page.beforeDisplay` | override the content of a backend page.
`cms.page.init` | return a custom response before the AJAX handlers of a page run.
`cms.page.beforeDisplay` | swap the page that gets displayed for the URL.
`cms.page.display` | modify the response after the page for the URL has been processed.
`cms.router.beforeRoute` | fires before the CMS router handles a route.
`model.beforeSave` | called before the model is created or updated.
`model.afterSave` | called after the model is created or updated.
`model.beforeDelete` | called before the model is deleted.
`model.beforeValidate` | called before the model is validated.
`mailer.beforeSend` | fires before the mailer sends a message.
`system.extendConfigFile` | modify the contents of a configuration file.
`site.changed` | fires when the active site has changed.

#### See Also

::: also
* [Extending October CMS](../plugins/extending.md)
* [Responding to Model Events](../data/models.md#responding-to-model-events)
* [Application](./application.md)
:::
