# Application

## Application Container

The inversion of control (IoC) container is a tool for managing class dependencies. Dependency injection is a method of removing hard-coded class dependencies. Instead, the dependencies are injected at run-time, allowing for greater flexibility as dependency implementations may be swapped easily.

#### Binding a type into the container

There are two ways the IoC container can resolve dependencies: via Closure callbacks or automatic resolution. First, we'll explore Closure callbacks. First, a "type" may be bound into the container:

```php
App::bind('foo', function($app) {
    return new FooBar;
});
```

#### Resolving a type from the container

```php
$value = App::make('foo');
```

When the `App::make` method is called, the Closure callback is executed and the result is returned.

#### Binding a "shared" type into the container

Sometimes you may wish to bind something into the container that should only be resolved once, and the same instance should be returned on subsequent calls into the container:

```php
App::singleton('foo', function() {
    return new FooBar;
});
```

#### Binding an existing instance into the container

You may also bind an existing object instance into the container using the `instance` method:

```php
$foo = new Foo;

App::instance('foo', $foo);
```

#### Binding an interface to an implementation

In some cases, a class may depend on an interface implementation, not a "concrete type". When this is the case, the `App::bind` method must be used to inform the container which interface implementation to inject:

```php
App::bind('UserRepositoryInterface', 'DbUserRepository');
```

Now consider the following code:

```php
$users = App::make('UserRepositoryInterface');
```

Since we have bound the `UserRepositoryInterface` to a concrete type, the `DbUserRepository` will automatically be injected into this controller when it is created.

### Where to Register Bindings

IoC bindings, like [event handlers](events), generally fall under the category of "bootstrap code". In other words, they prepare your application to actually handle requests, and usually need to be executed before a route or controller is actually called. The most common place is the `boot` method of a [Plugin registration file](../plugin/registration#registration-methods). Alternatively, plugins can supply a file named **init.php** in the plugin directory that you can use to place IoC registration logic.

## Service Providers

Service providers are a great way to create libraries and perform group related IoC registrations in a single location. Within a service provider, you might register a custom authentication driver, register your application's repository classes with the IoC container, or even setup a custom Artisan command.

In fact, [plugin registration files](../plugin/registration) inherit service providers and most of the core components include service providers. All of the registered service providers for your application are listed in the `providers` array of the `config/app.php` configuration file.

#### Defining a Service Provider

To create a service provider, simply extend the `October\Rain\Support\ServiceProvider` class and define a `register` method:

```php
use October\Rain\Support\ServiceProvider;

class FooServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind('foo', function() {
            return new Foo;
        });
    }
}
```

Note that in the `register` method, the application IoC container is available to you via the `$this->app` property. Once you have created a provider and are ready to register it with your application, simply add it to the `providers` array in your `app` configuration file.

#### Registering a service provider at run-time

You may also register a service provider at run-time using the `App::register` method:

```php
App::register('FooServiceProvider');
```

## Application Events

#### Request events

You can register special events before a requested is routed using the `before` and `after` methods:

```php
App::before(function ($request) {
    // Code to execute before the request is routed
});

App::after(function ($request) {
    // Code to execute after the request is routed
});
```

#### Container events

The service container fires an event each time it resolves an object. You may listen to this event using the `resolving` method:

```php
App::resolving(function ($object, $app) {
    // Called when container resolves object of any type...
});

App::resolving('foo', function ($fooBar, $app) {
    // Called when container resolves objects using hint "foo"...
});

App::resolving('Acme\Blog\Classes\FooBar', function ($fooBar, $app) {
    // Called when container resolves objects of type "FooBar"...
});
```

As you can see, the object being resolved will be passed to the callback, allowing you to set any additional properties on the object before it is given to its consumer.

## Application Helpers

#### Finding the application environment

You may use the `environment` method to discover the application environment as determined by the [environment configuration](../setup/configuration#environment-config).

```php
// production
App::environment();
```

#### Determine the execution context

It is possible to know if the current request is being performed in the administrative back-end area using the `runningInBackend` method.

```php
App::runningInBackend();
```

You may also use the `runningInConsole` method to check if the executing code is taking place inside the [command line interface](../console/commands):

```php
App::runningInConsole();
```
