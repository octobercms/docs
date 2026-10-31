---
previousPath: extend/system/behaviors.md
subtitle: Mix shared functionality into controllers, models and other classes with behaviors.
---
# Behaviors

Behaviors add methods from one class to another, much like [native PHP traits](http://php.net/manual/en/language.oop5.traits.php). They are how backend controllers get their forms and lists, and you can write your own to share functionality between classes.

```php
class Posts extends \Backend\Classes\Controller
{
    public $implement = [
        \Backend\Behaviors\FormController::class,
        \Backend\Behaviors\ListController::class,
    ];
}
```

Behaviors have some benefits over traits.

1. Behaviors use their own constructor.
1. Behaviors can have private or protected methods.
1. Methods and property names can conflict safely.
1. Classes can be extended with behaviors dynamically.

## Comparing Behaviors to Traits

Where you might use a PHP trait like this.

```php
class MyClass
{
    use \October\Rain\UtilityFunctions;
    use \October\Rain\DeferredBinding;
}
```

A behavior is used in a similar way, listed in the `$implement` property.

```php
class MyClass extends \October\Rain\Extension\Extendable
{
    public $implement = [
        \October\Rain\UtilityFunctions::class,
        \October\Rain\DeferredBinding::class,
    ];
}
```

Where you might define a trait like this.

```php
trait UtilityFunctions
{
    public function sayHello()
    {
        echo "Hello from " . get_class($this);
    }
}
```

A behavior is defined like this.

```php
class UtilityFunctions extends \October\Rain\Extension\ExtensionBase
{
    protected $parent;

    public function __construct($parent)
    {
        $this->parent = $parent;
    }

    public function sayHello()
    {
        echo "Hello from " . get_class($this->parent);
    }
}
```

The extended object is always passed as the first argument to the constructor. In summary, extend the following classes when using behaviors.

- Extend `October\Rain\Extension\ExtensionBase` to declare a class as a behavior.
- Extend `October\Rain\Extension\Extendable` in the class implementing the behavior.

Backend controllers extend `Extendable`, and models use the same `October\Rain\Extension\ExtendableTrait`, so both can implement behaviors without any extra setup. Controller behaviors such as `FormController` extend `Backend\Classes\ControllerBehavior`, a subclass of `ExtensionBase` that adds helpers for configuration, views and widgets.

## Creating a Behavior

The following behavior defines two methods. It stores the extended object in the `$controller` property.

```php
namespace MyNamespace\Behaviors;

class FormController extends \October\Rain\Extension\ExtensionBase
{
    /**
     * @var Controller controller is a reference to the extended object.
     */
    protected $controller;

    /**
     * __construct
     */
    public function __construct($controller)
    {
        $this->controller = $controller;
    }

    public function someMethod()
    {
        return "I come from the FormController Behavior!";
    }

    public function otherMethod()
    {
        return "You might not see me...";
    }
}
```

### Implementing the Behavior

This `Controller` class implements the `FormController` behavior, so its methods become available (mixed in) to the class. The class also defines its own `otherMethod` method, which overrides the one from the behavior.

```php
<?php namespace MyNamespace;

class Controller extends \October\Rain\Extension\Extendable
{
    /**
     * implement the FormController behavior
     */
    public $implement = [
        \MyNamespace\Behaviors\FormController::class
    ];

    public function otherMethod()
    {
        return "I come from the main Controller!";
    }
}
```

### Calling Behavior Methods

Methods from the behavior are called on the class itself. Methods defined by the class take priority. Use the `asExtension` method to call the behavior method directly.

```php
$controller = new MyNamespace\Controller;

// Prints: I come from the FormController Behavior!
echo $controller->someMethod();

// Prints: I come from the main Controller!
echo $controller->otherMethod();

// Prints: You might not see me...
echo $controller->asExtension('FormController')->otherMethod();
```

## Extending a Class Constructor

Any class that extends the `Extendable` class can have its constructor extended with the static `extend` method. Pass a closure, which is called as part of the class constructor.

```php
MyClass::extend(function($controller) {
    //
});
```

## Implementing a Behavior Dynamically

Extending the constructor lets you implement a behavior from outside the class. For example, use the `implementClassWith` method to implement the `RelationController` behavior in the `UsersController` class.

```php
UsersController::extend(function($controller) {
    $controller->implementClassWith(\Backend\Behaviors\RelationController::class);
});
```

::: tip
The `implementClassWith` method can be called multiple times safely. It checks if the class already implements the behavior before implementing it.
:::

Use the `extendClassWith` method to extend an object after it has been constructed. The following example extends a model using a class name stored in the database.

```php
public function afterFetch()
{
    $this->extendClassWith($this->class_type);
}
```

To check if an object has been extended with a behavior, use the `isClassExtendedWith` method.

```php
$controller->isClassExtendedWith(\Backend\Behaviors\RelationController::class);
```

To call a method from a specific behavior, use the `asExtension` method. It takes the class base name or the fully qualified class name.

```php
echo $controller->asExtension('RelationController')->otherMethod();
```

## Implementing an Optional Behavior

A class listed in `$implement` that does not exist is skipped without an error. This lets you implement a behavior from another plugin only when that plugin is installed. In the following example, the `TranslatableModel` behavior is only implemented when the class exists.

```php
class User extends \October\Rain\Extension\Extendable
{
    public $implement = [
        \RainLab\Translate\Behaviors\TranslatableModel::class
    ];
}
```

Earlier versions required an `@` symbol at the beginning of the class name for this, such as `'@'.\RainLab\Translate\Behaviors\TranslatableModel::class`. The prefix is still accepted.

## Adding Methods Dynamically

Add a method to an extendable object by calling `addDynamicMethod` with a method name and a callable, such as a `Closure`.

```php
MyModel::extend(function($model) {
    $model->addDynamicMethod('getTagsAttribute', function() use ($model) {
        return '...';
    });
});
```

### Checking if a Method Exists

Use the `methodExists` method to check for a method in an `Extendable` class, similar to the PHP `method_exists()` function. It detects standard methods, methods from behaviors and methods added with `addDynamicMethod`.

```php
$post = new Post;
$post->methodExists('getTagsAttribute'); // true
$post->methodExists('missingMethod'); // false
```

### Listing All Available Methods

Use the `getClassMethods` method to list all methods of an `Extendable` class. It works like the PHP `get_class_methods()` function, and also includes methods provided by behaviors and methods added with `addDynamicMethod`.

```php
$post = new Post;
$methods = $post->getClassMethods();

/**
 * $methods = [
 *   0 => '__construct',
 *   1 => 'extend',
 *   2 => 'getTagsAttribute',
 *   ...
 * ];
 */
```

#### See Also

::: also
* [Controllers](./controllers.md)
* [Form Controller](../forms/form-controller.md)
* [List Controller](../lists/list-controller.md)
* [Extending October CMS](../plugins/extending.md)
:::
