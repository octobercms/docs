# Поведения ( Behaviors )

<a href="introduction" name="introduction" class="anchor"></a>
## Введение

Поведения позволяют классам иметь *приватные трейты* и являются аналогией [native PHP Traits](http://php.net/manual/en/language.oop5.traits.php) за исключением того, что они имеют некоторые преимущества:

1. Поведения имеют собственный конструктор.
1. Поведения могут иметь приватные (private) и защищенные (protected) методы.
1. Названия методов и свойств могут безопасно конфликтовать.
1. Классы могут быть динамически расширены поведением.

<a href="compare-traits" name="compare-traits" class="anchor"></a>
## Сравнение с трейтами

Трейт:

    class MyClass
    {
        use \October\Rain\UtilityFunctions;
        use \October\Rain\DeferredBinding;
    }

Поведение:

    class MyClass extends \October\Rain\Extension\Extendable
    {
        public $implement = [
            'October.Rain.UtilityFunctions',
            'October.Rain.DeferredBinding',
        ];
    }

Трейт:

    trait UtilityFunctions
    {
        public function sayHello()
        {
            echo "Hello from " . get_class($this);
        }
    }

Поведение:

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

Расширенный объект всегда передается в качестве первого параметра конструктору.

<a href="constructor-extension" name="constructor-extension" class="anchor"></a>
## Расширение конструкторов

Классы, которые используют `Extendable` или `ExtendableTrait` могут иметь конструктор, который можно расширить при помощи статического метода `extend`. Аргументом является функция-замыкания:

    MyNamespace\Controller::extend(function($controller) {
        //
    });

#### Динамическое объявление свойств

Вы можете задать свойства динамически при помощи метода `addDynamicProperty`. Первый аргумент - название свойства, второй - его значение.

    Post::extend(function($model) {
        $model->addDynamicProperty('tagsCache', null);
    });

#### Динамическое создание методов

Вы можете создать методы динамически при помощи метода `addDynamicMethod`.  Первый аргумент - название метода, второй - `Closure`.

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

#### Динамическая имплементация поведения

Эта уникальная возможность позволяет динамически изменять поведение, например:

    /**
     * Extend the RainLab.Users controller to include the RelationController behavior too
     */
    RainLab\Users\Controllers\Users::extend(function($controller) {

        // Implement the list controller behavior dynamically
        $controller->implement[] = 'Backend.Behaviors.RelationController';

        // Declare the relationConfig property dynamically for the RelationController behavior to use
        $controller->addDynamicProperty('relationConfig', '$/myvendor/myplugin/controllers/users/config_relation.yaml');
    });

<a href="usage-example" name="usage-example" class="anchor"></a>
## Примеры

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

#### Расширение класса

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

#### Использование расширения

    $controller = new MyNamespace\Controller;

    // Prints: I come from the FormController Behavior!
    echo $controller->someMethod();

    // Prints: I come from the main Controller!
    echo $controller->otherMethod();

    // Prints: You might not see me...
    echo $controller->asExtension('FormController')->otherMethod();

#### Обнаружение использованных расширений

Используйте метод `isClassExtendedWith`, чтобы проверить, был ли объект расширен при помощи поведения:

    $controller->isClassExtendedWith('Backend.Behaviors.RelationController');

Пример:

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

### Мягкое определение

Используйте символ `@`, чтобы избежать ошибки *Class not found*, при использовании поведений:

    class User extends \October\Rain\Extension\Extendable
    {
        public $implement = ['@RainLab.Translate.Behaviors.TranslatableModel'];
    }

Если класс `RainLab\Translate\Behaviors\TranslatableModel` не существует, то ошибка не будет отображаться. Это эквивалентно следующему коду:

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

### Использование трейтов вместо базовых классов

В некоторых случаях Вы можете не захотеть расширять классы `ExtensionBase` или `Extendable`. В таком случае, Вы можете использовать трейты. Очевидно, что поведения не доступны родительскому классу.

- При использовании `ExtensionTrait` методы класса` ExtensionBase` должны применяться к классу.

- При использовании `ExtendableTrait` методы класса `Extendable` должны применяться к классу.
