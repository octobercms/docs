# Behaviors

- [Introduction](#introduction)
- [Comparison to traits](#compare-traits)
- [Extending constructors](#constructor-extension)
- [Usage example](#usage-example)

<a name="introduction"></a>
## Introduction

Behaviors add the ability for classes to have *private traits*, also known as Behaviors. These are similar to [native PHP Traits](http://php.net/manual/en/language.oop5.traits.php) except they have some distinct benefits:

1. Behaviors have their own contructor.
1. Behaviors can have private or protected methods.
1. Methods and property names can conflict safely.
1. Classes can be extended with behaviors dynamically.

<a name="compare-traits"></a>
## Comparison to traits

Where you might use a PHP trait like this:

    class MyClass
    {
        use \October\Rain\UtilityFunctions;
        use \October\Rain\DeferredBinding;
    }

A behavior is used in a similar fashion:

    class MyClass extends \October\Rain\Extension\Extendable
    {
        public $implement = [
            'October.Rain.UtilityFunctions',
            'October.Rain.DeferredBinding',
        ];
    }

Where you might define a trait like this:

    trait UtilityFunctions
    {
        public function sayHello()
        {
            echo "Hello from " . get_class($this);
        }
    }

A behavior is defined like this:

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

The extended object is always passed as the first parameter to the Behavior's constructor.

<a name="constructor-extension"></a>
## Extending constructors

Any class that uses the `Extendable` or `ExtendableTrait` can have its constructor extended with the static `extend()` method. The argument should pass a closure that will be called as part of the class constructor.

    MyNamespace\Controller::extend(function($controller) {
        //
    });

#### Dynamically implementing a behavior

This unique ability to extend constructors allows behaviors to be implemented dynamically, for example:

    /**
     * Extend the Pizza Shop to include the Master Splinter behavior too
     */
    MyNamespace\Controller::extend(function($controller) {

        // Implement the list controller behavior dynamically
        $controller->implement[] = 'MyNamespace.Behaviors.ListController';
    });

#### Dynamically creating methods

Methods can be created to a extendable object by calling `addDynamicMethod` and passing a method name and callable object, like a `Closure`.

    Post::extend(function($model) {
        $model->addDynamicMethod('getTagsAttribute', function() use ($model) {
            return $model->tags()->lists('name');
        });
    });


<a name="usage-example"></a>
## Usage example

#### Behavior / Extension class

    <?php namespace MyNamespace\Behaviors;

    class FormController extends \October\Rain\Extension\ExtensionBase
    {
        /**
         * @var Reference to the extended object.
         */
        protected $controller;

        /**
         * Constructor
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

#### Extending a class

This `Controller` class will implement the `FormController` behavior and then the methods will become available (mixed in) to the class. We will override the `otherMethod` method.

    <?php namespace MyNamespace;

    class Controller extends \October\Rain\Extension\Extendable
    {

        /**
         * Implement the FormController behavior
         */
        public $implement = [
            'MyNamespace.Behaviors.FormController'
        ];

        public function otherMethod()
        {
            return "I come from the main Controller!";
        }
    }

#### Using the extension

    $controller = new MyNamespace\Controller;

    // Prints: I come from the FormController Behavior!
    echo $controller->someMethod();

    // Prints: I come from the main Controller!
    echo $controller->otherMethod();

    // Prints: You might not see me...
    echo $controller->asExtension('FormController')->otherMethod();

### Soft definition

If a behavior class does not exist, like a trait, a *Class not found* error will be thrown. In some cases you may wish to suppress this error, for conditional implementation if a behavior is present in the system. You can do this by placing an `@` symbol at the beginning of the class name.

    class User extends \October\Rain\Extension\Extendable
    {
        public $implement = ['@RainLab.Translate.Behaviors.TranslatableModel'];
    }

If the class name `RainLab\Translate\Behaviors\TranslatableModel` does not exist, no error will be thrown. This is the equivalent of the following code:

    class User extends \October\Rain\Extension\Extendable
    {
        public $implement = [];

        public function __construct()
        {
            if (class_exists('RainLab\Translate\Behaviors\TranslatableModel')) {
                $this->implement[] = 'RainLab.Translate.Behaviors.TranslatableModel';
            }

            parent::__construct();
        }
    }

### Using Traits instead of base classes

In some cases you may not wish to extend the `ExtensionBase` or `Extendable` classes, due to other needs. So you can use the traits instead, although obviously the behavior methods will not be available to the parent class.

- When using the `ExtensionTrait` the methods from `ExtensionBase` should be applied to the class.

- When using the `ExtendableTrait` the methods from `Extendable` should be applied to the class.
