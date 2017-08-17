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

Any class that uses the `Extendable` or `ExtendableTrait` can have its constructor extended with the static `extend` method. The argument should pass a closure that will be called as part of the class constructor.

    MyNamespace\Controller::extend(function($controller) {
        //
    });
    
#### Dynamically declaring properties

Properties can be declared on an extendable object by calling `addDynamicProperty` and passing a property name and value.

    Post::extend(function($model) {
        $model->addDynamicProperty('tagsCache', null);
    });
    
> **Note**: Attempting to set undeclared properties through normal means (`$this->foo = 'bar';`) on an object that implements the **October\Rain\Extension\ExtendableTrait** will not work. It won't throw an exception, but it will not autodeclare the property either. `addDynamicProperty` must be called in order to set previously undeclared properties on extendable objects.

#### Dynamically creating methods

Methods can be created to an extendable object by calling `addDynamicMethod` and passing a method name and callable object, like a `Closure`.

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
    
#### Dynamically implementing a behavior

This unique ability to extend constructors allows behaviors to be implemented dynamically, for example:

    /**
     * Extend the RainLab.Users controller to include the RelationController behavior too
     */
    RainLab\Users\Controllers\Users::extend(function($controller) {

        // Implement the list controller behavior dynamically
        $controller->implement[] = 'Backend.Behaviors.RelationController';
        
        // Declare the relationConfig property dynamically for the RelationController behavior to use
        $controller->addDynamicProperty('relationConfig', '$/myvendor/myplugin/controllers/users/config_relation.yaml');
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

#### Detecting utilized extensions

To check if an object has been extended with a behavior, you may use the `isClassExtendedWith` method on the object.

    $controller->isClassExtendedWith('Backend.Behaviors.RelationController');

Below is an example of dynamically extending a `UsersController` of a third-party plugin utilizing this method to avoid preventing other plugins from also extending the afore-mentioned third-party plugin.

    UsersController::extend(function($controller) {

        // Implement behavior if not already implemented
        if (!$controller->isClassExtendedWith('Backend.Behaviors.RelationController')) {
            $controller->implement[] = 'Backend.Behaviors.RelationController';
        }

        // Define property if not already defined
        if (!isset($controller->relationConfig)) {
            $controller->addDynamicProperty('relationConfig');
        }

        // Splice in configuration safely
        $myConfigPath = '$/myvendor/myplugin/controllers/users/config_relation.yaml';

        $controller->relationConfig = $this->mergeConfig(
            $controller->relationConfig,
            $myConfigPath
        );

    }

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
