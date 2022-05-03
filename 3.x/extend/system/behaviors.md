---
subtitle: Used to extend controllers and models with common functionality.
---
# Behaviors

Behaviors add the ability for classes to have private traits that are similar to [native PHP Traits](http://php.net/manual/en/language.oop5.traits.php), except they have some distinct benefits.

1. Behaviors use their own constructor.
1. Behaviors can have private or protected methods.
1. Methods and property names can conflict safely.
1. Classes can be extended with behaviors dynamically.

## Comparison to Traits

Where you might use a PHP trait like this.

```php
class MyClass
{
    use \October\Rain\UtilityFunctions;
    use \October\Rain\DeferredBinding;
}
```

A behavior is used in a similar fashion.

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

The extended object is always passed as the first argument to the constructor. In summary, when using behaviors extend the following classes.

- Extend `October\Rain\Extension\ExtensionBase` to declare a class as a behavior.
- Extend `October\Rain\Extension\Extendable` as the class implementing the behavior.

## Extending Constructors

Any class that extends the `Extendable` class can have its constructor extended with the static `extend` method. The argument should pass a closure that will be called as part of the class constructor.

```php
MyClass::extend(function($controller) {
    //
});
```

### Soft Definition

If a behavior class does not exist, like a trait, a **class not found** error will be thrown. In some cases you may wish to suppress this error, for conditional implementation if a behavior is present in the system. You can do this by placing an `@` symbol at the beginning of the class name.
In the following example, if the class name `RainLab\Translate\Behaviors\TranslatableModel` does not exist, no error will be thrown.

```php
class User extends \October\Rain\Extension\Extendable
{
    public $implement = [
        '@'.\RainLab\Translate\Behaviors\TranslatableModel::class
    ];
}
```

## Dynamically Implementing a Behavior

This unique ability to extend constructors allows behaviors to be implemented dynamically, for example, use the `implementClassWith` method to implement the `RelationController` class in the `UsersController` class.

```php
UsersController::extend(function($controller) {
    $controller->implementClassWith(\Backend\Behaviors\RelationController::class);
});
```

::: tip
The `implementClassWith` method can be called multiple times safely, it will check if the class is already implementing the behavior and implement it.
:::

Use the `extendClassWith` method to extend an object after it has been constructed. The following example would dynamically extend a Model class using a class name stored in the database.

```php
public function afterFetch()
{
    $this->extendClassWith($this->class_type);
}
```

To check if an object has been extended with a behavior, you may use the `isClassExtendedWith` method on the object.

```php
$controller->isClassExtendedWith(\Backend\Behaviors\RelationController::class);
```

To specifically call a method from a behavior, use the `asExtension` method which takes the class base name or the fully qualified class as its argument.

```php
echo $controller->asExtension('RelationController')->otherMethod();
```

## Dynamically Creating Methods

Methods can be created to an extendable object by calling `addDynamicMethod` and passing a method name and callable object, like a `Closure`.

```php
MyModel::extend(function($model) {
    $model->addDynamicMethod('getTagsAttribute', function() use ($model) {
        return '...';
    });
});
```

### Checking the Existence of a Method

To check for the existence of a method in an `Extendable` class call the `methodExists` method - similar to the PHP `method_exists()` function. This will detect both standard methods, methods in behaviors and dynamic methods that have been added through a `addDynamicMethod` call.

```php
$post = new Post;
$post->methodExists('getTagsAttribute'); // true
$post->methodExists('missingMethod'); // false
```

### List All Available Methods

To retrieve a list of all available methods in an `Extendable` class, you can use the `getClassMethods` method. This method operates similar to the PHP `get_class_methods()` function in that it returns an array of available methods in a class, but in addition to defined methods in the class, it will also list any methods provided by an extension or through an `addDynamicMethod` call.

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

## Usage Example

### Behavior / Extension class

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

### Extending a Class

This `Controller` class will implement the `FormController` behavior and then the methods will become available (mixed in) to the class. We will override the `otherMethod` method.

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

### Using the Extension

```php
$controller = new MyNamespace\Controller;

// Prints: I come from the FormController Behavior!
echo $controller->someMethod();

// Prints: I come from the main Controller!
echo $controller->otherMethod();

// Prints: You might not see me...
echo $controller->asExtension('FormController')->otherMethod();
```
