---
previousPath: extend/services/application.md
subtitle: Bind classes in the service container, register service providers and check the application environment.
---
# Application

The inversion of control (IoC) container manages class dependencies. Dependency injection removes hard-coded class dependencies: the dependencies are injected at run-time instead, so you can swap one implementation for another.

```php
App::bind('foo', function($app) {
    return new FooBar;
});

$value = App::make('foo');
```

## Binding to the Container

The IoC container can resolve dependencies in two ways: with Closure callbacks or with automatic resolution. To use a Closure callback, bind a "type" into the container.

```php
App::bind('foo', function($app) {
    return new FooBar;
});
```

### Resolving from the Container

```php
$value = App::make('foo');
```

When you call the `App::make` method, the Closure callback runs and its result is returned.

### Binding a Shared Type

To bind something into the container that is only resolved once, use the `singleton` method. Later calls into the container return the same instance.

```php
App::singleton('foo', function() {
    return new FooBar;
});
```

### Binding an Existing Instance

You can also bind an existing object instance into the container using the `instance` method.

```php
$foo = new Foo;

App::instance('foo', $foo);
```

### Binding an Interface to an Implementation

Sometimes a class depends on an interface implementation, not a "concrete type". In this case, use the `App::bind` method to tell the container which interface implementation to inject.

```php
App::bind('UserRepositoryInterface', 'DbUserRepository');
```

Now consider the following code.

```php
$users = App::make('UserRepositoryInterface');
```

Since the `UserRepositoryInterface` is bound to a concrete type, the container injects a `DbUserRepository` instance.

### Where to Register Bindings

IoC bindings, like [event handlers](./events.md), are bootstrap code. They prepare your application to handle requests, and usually need to run before a route or controller is called. The most common place is the `boot` method of a [plugin registration file](../plugins/extending.md). Plugins can also supply a file named **init.php** in the plugin directory for IoC registration logic.

## Using Service Providers

Service providers let you create libraries and group related IoC registrations in a single location. In a service provider, you might register a custom authentication driver, register your application's repository classes with the IoC container, or set up a custom Artisan command.

[Plugin registration files](../plugins/introduction.md) inherit from service providers, and most of the core components include service providers. Your application's own service providers are listed in the **bootstrap/providers.php** file.

### Defining a Service Provider

To create a service provider, extend the `October\Rain\Support\ServiceProvider` class and define a `register` method.

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

In the `register` method, the application IoC container is available through the `$this->app` property. Once you have created a provider, register it with your application by adding it to the array in the **bootstrap/providers.php** file.

### Registering a Service Provider at Runtime

You can also register a service provider at run-time using the `App::register` method.

```php
App::register('FooServiceProvider');
```

## Listening to Application Events

### Request Events

To run code before or after a request is routed, use the `before` and `after` methods.

```php
App::before(function ($request) {
    // Code to execute before the request is routed
});

App::after(function ($request) {
    // Code to execute after the request is routed
});
```

### Container Events

The service container fires an event each time it resolves an object. Listen to this event with the `resolving` method.

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

The callback receives the object being resolved, so you can set extra properties on the object before it is given to its consumer.

## Checking the Application Environment

#### Finding the Application Environment

Use the `environment` method to find the application environment, as set by the [environment configuration](../../setup/configuration.md).

```php
// production
App::environment();
```

#### Determining the Execution Context

To check if the current request is in the administrative backend area, use the `runningInBackend` method.

```php
App::runningInBackend();
```

To check if the code is running in the [command line interface](../console/commands.md), use the `runningInConsole` method.

```php
App::runningInConsole();
```

#### See Also

::: also
* [Events](./events.md)
* [Laravel Service Container](https://laravel.com/docs/12.x/container)
* [Laravel Service Providers](https://laravel.com/docs/12.x/providers)
:::
