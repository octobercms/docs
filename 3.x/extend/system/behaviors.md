# Behaviors

Behaviors add the ability for classes to have *private traits*, also known as Behaviors. These are similar to [native PHP Traits](http://php.net/manual/en/language.oop5.traits.php) except they have some distinct benefits:

1. Behaviors have their own constructor.
1. Behaviors can have private or protected methods.
1. Methods and property names can conflict safely.
1. Classes can be extended with behaviors dynamically.

## Comparison to Traits

Where you might use a PHP trait like this:

```php
class MyClass
{
    use \October\Rain\UtilityFunctions;
    use \October\Rain\DeferredBinding;
}
```

A behavior is used in a similar fashion:

```php
class MyClass extends \October\Rain\Extension\Extendable
{
    public $implement = [
        \October\Rain\UtilityFunctions::class,
        \October\Rain\DeferredBinding::class,
    ];
}
```

Where you might define a trait like this:

```php
trait UtilityFunctions
{
    public function sayHello()
    {
        echo "Hello from " . get_class($this);
    }
}
```

A behavior is defined like this:

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

The extended object is always passed as the first parameter to the Behavior's constructor.

To summarize:
- Extend `October\Rain\Extension\ExtensionBase` to declare your class as a Behavior
- The class wanting to implement the Behaviour needs to extend `October\Rain\Extension\Extendable`

## Extending Constructors

Any class that uses the `Extendable` or `ExtendableTrait` can have its constructor extended with the static `extend` method. The argument should pass a closure that will be called as part of the class constructor.

```php
MyNamespace\Controller::extend(function($controller) {
    //
});
```

#### Dynamically Declaring Properties

Properties can be declared on an extendable object by calling `addDynamicProperty` and passing a property name and value.

```php
Post::extend(function($model) {
    $model->addDynamicProperty('tagsCache', null);
});
```

> **Note**: Attempting to set undeclared properties directly on the object that implements the **October\Rain\Extension\ExtendableTrait** will throw an expection.

#### Retrieving Dynamic Properties

Properties created dynamically can be retrieved with the getDynamicProperties function inherited from
the ExtendableTrait.

So retrieving all dynamic properties would look like this:

```php
$model->getDynamicProperties();
```

This will return an associative array [key => value], with the key being the dynamic property name
and the value being the property value.

If we know what property we want we can simply append the key (property name) to the function:

```php
$model->getDynamicProperties()[$key];
```

#### Dynamically Creating Methods

Methods can be created to an extendable object by calling `addDynamicMethod` and passing a method name and callable object, like a `Closure`.

```php
Post::extend(function($model) {
    $model->addDynamicProperty('tagsCache', null);

    $model->addDynamicMethod('getTagsAttribute', function() use ($model) {
        if ($this->tagsCache) {
            return $this->tagsCache;
        } else {
            return $this->tagsCache = $model->tags()->lists('name');
        }
    });
});
```

#### Checking the Existence of a Method

You can check for the existence of a method in an `Extendable` class by using the `methodExists` method - similar to the PHP `method_exists()` function. This will detect both standard methods and dynamic methods that have been added through a `addDynamicMethod` call. `methodExists` accepts one parameter: a string of the method name to check the existence of.

```php
Post::extend(function($model) {
    $model->addDynamicMethod('getTagsAttribute', function () use ($model) {
        return $this->tagsCache;
    });
});

$post = new Post;

$post->methodExists('getTagsAttribute'); // true
$post->methodExists('missingMethod'); // false
```

#### List All Available Methods

To retrieve a list of all available methods in an `Extendable` class, you can use the `getClassMethods` method. This method operates similar to the PHP `get_class_methods()` function in that it returns an array of available methods in a class, but in addition to defined methods in the class, it will also list any methods provided by an extension or through an `addDynamicMethod` call.

```php
Post::extend(function($model) {
    $model->addDynamicMethod('getTagsAttribute', function () use ($model) {
        return $this->tagsCache;
    });
});

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

#### Dynamically Implementing a Behavior

This unique ability to extend constructors allows behaviors to be implemented dynamically, for example:

```php
/**
 * Extend the RainLab.Users controller to include the RelationController behavior too
 */
\RainLab\Users\Controllers\Users::extend(function($controller) {

    // Implement the list controller behavior dynamically
    $controller->implementClassWith(\Backend\Behaviors\RelationController::class);

    // Declare the relationConfig property dynamically for the RelationController behavior to use
    $controller->addDynamicProperty('relationConfig', '$/myvendor/myplugin/controllers/users/config_relation.yaml');

});
```

To avoid conflicts with other plugins doing the same thing, it is advisable the merge the configuration using the approach below.

```php
UsersController::extend(function($controller) {

    // Implement the list controller behavior dynamically
    $controller->implementClassWith(\Backend\Behaviors\RelationController::class);

    // Define property if not already defined
    $controller->addDynamicProperty('relationConfig');

    // Splice in configuration safely
    $controller->relationConfig = $controller->mergeConfig(
        $controller->relationConfig,
        '$/myvendor/myplugin/controllers/users/config_relation.yaml'
    );

});
```

## Usage Example

#### Behavior / Extension class

```php
<?php namespace MyNamespace\Behaviors;

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

#### Extending a Class

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

#### Using the Extension

```php
$controller = new MyNamespace\Controller;

// Prints: I come from the FormController Behavior!
echo $controller->someMethod();

// Prints: I come from the main Controller!
echo $controller->otherMethod();

// Prints: You might not see me...
echo $controller->asExtension('FormController')->otherMethod();
```

#### Detecting Utilized Extensions

To check if an object has been extended with a behavior, you may use the `isClassExtendedWith` method on the object.

```php
$controller->isClassExtendedWith(\Backend\Behaviors\RelationController::class);
```

You can extend a class dynamically with the `extendClassWith` method.

```php
$controller->extendClassWith(\Backend\Behaviors\RelationController::class);
```

The `implementClassWith` method will safely check if the class is extended with the behavior and then implement it.

```php
$controller->implementClassWith(\Backend\Behaviors\RelationController::class);
```

### Soft Definition

If a behavior class does not exist, like a trait, a *Class not found* error will be thrown. In some cases you may wish to suppress this error, for conditional implementation if a behavior is present in the system. You can do this by placing an `@` symbol at the beginning of the class name.

```php
class User extends \October\Rain\Extension\Extendable
{
    public $implement = [
        '@'.\RainLab\Translate\Behaviors\TranslatableModel::class
    ];
}
```

If the class name `RainLab\Translate\Behaviors\TranslatableModel` does not exist, no error will be thrown. This is the equivalent of the following code:

```php
class User extends \October\Rain\Extension\Extendable
{
    public $implement = [];

    public function __construct()
    {
        if (class_exists(\RainLab\Translate\Behaviors\TranslatableModel::class)) {
            $this->implement[] = \RainLab\Translate\Behaviors\TranslatableModel::class;
        }

        parent::__construct();
    }
}
```
