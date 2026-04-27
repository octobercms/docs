---
subtitle: 通过通用功能将类组合在一起。
---
# 行为

行为为类添加了拥有私有 Trait 的能力，类似于[原生 PHP Trait](http://php.net/manual/en/language.oop5.traits.php)，但有一些明显的优势。

1. 行为使用自己的构造函数。
1. 行为可以拥有私有或受保护的方法。
1. 方法和属性名称可以安全地冲突。
1. 类可以动态地通过行为进行扩展。

## 与 Trait 的比较

你可能会像这样使用 PHP Trait。

```php
class MyClass
{
    use \October\Rain\UtilityFunctions;
    use \October\Rain\DeferredBinding;
}
```

行为的使用方式类似。

```php
class MyClass extends \October\Rain\Extension\Extendable
{
    public $implement = [
        \October\Rain\UtilityFunctions::class,
        \October\Rain\DeferredBinding::class,
    ];
}
```

你可能会像这样定义一个 Trait。

```php
trait UtilityFunctions
{
    public function sayHello()
    {
        echo "Hello from " . get_class($this);
    }
}
```

行为的定义如下所示。

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

被扩展的对象始终作为第一个参数传递给构造函数。总而言之，使用行为时需要继承以下类。

- 继承 `October\Rain\Extension\ExtensionBase` 将类声明为行为。
- 继承 `October\Rain\Extension\Extendable` 作为实现行为的类。

## 扩展构造函数

任何继承 `Extendable` 类的类都可以使用静态 `extend` 方法扩展其构造函数。参数应传递一个闭包，该闭包将作为类构造函数的一部分被调用。

```php
MyClass::extend(function($controller) {
    //
});
```

### 软定义

如果行为类不存在，像 Trait 一样，会抛出 **class not found** 错误。在某些情况下，你可能希望抑制此错误，以便在系统中存在行为时进行条件性实现。你可以通过在类名开头放置 `@` 符号来实现。
在以下示例中，如果类名 `RainLab\Translate\Behaviors\TranslatableModel` 不存在，不会抛出错误。

```php
class User extends \October\Rain\Extension\Extendable
{
    public $implement = [
        '@'.\RainLab\Translate\Behaviors\TranslatableModel::class
    ];
}
```

## 动态实现行为

这种扩展构造函数的独特能力允许动态实现行为，例如，使用 `implementClassWith` 方法在 `UsersController` 类中实现 `RelationController` 类。

```php
UsersController::extend(function($controller) {
    $controller->implementClassWith(\Backend\Behaviors\RelationController::class);
});
```

::: tip
`implementClassWith` 方法可以安全地多次调用，它会检查类是否已经实现了该行为并进行实现。
:::

使用 `extendClassWith` 方法在对象构造之后扩展它。以下示例将使用存储在数据库中的类名动态扩展模型类。

```php
public function afterFetch()
{
    $this->extendClassWith($this->class_type);
}
```

要检查对象是否已通过行为进行扩展，可以在对象上使用 `isClassExtendedWith` 方法。

```php
$controller->isClassExtendedWith(\Backend\Behaviors\RelationController::class);
```

要专门调用行为中的方法，使用 `asExtension` 方法，该方法接受类基本名称或完全限定类名作为参数。

```php
echo $controller->asExtension('RelationController')->otherMethod();
```

## 动态创建方法

可以通过调用 `addDynamicMethod` 并传递方法名和可调用对象（如 `Closure`）来向可扩展对象创建方法。

```php
MyModel::extend(function($model) {
    $model->addDynamicMethod('getTagsAttribute', function() use ($model) {
        return '...';
    });
});
```

### 检查方法是否存在

要检查 `Extendable` 类中方法是否存在，请调用 `methodExists` 方法——类似于 PHP 的 `method_exists()` 函数。这将检测标准方法、行为中的方法以及通过 `addDynamicMethod` 调用添加的动态方法。

```php
$post = new Post;
$post->methodExists('getTagsAttribute'); // true
$post->methodExists('missingMethod'); // false
```

### 列出所有可用方法

要检索 `Extendable` 类中所有可用方法的列表，你可以使用 `getClassMethods` 方法。此方法的操作类似于 PHP 的 `get_class_methods()` 函数，它返回类中可用方法的数组，但除了类中定义的方法外，它还会列出扩展提供的任何方法或通过 `addDynamicMethod` 调用添加的方法。

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

## 使用示例

### 行为/扩展类

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

### 扩展一个类

这个 `Controller` 类将实现 `FormController` 行为，然后方法将变为可用（混入）到该类中。我们将覆盖 `otherMethod` 方法。

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

### 使用扩展

```php
$controller = new MyNamespace\Controller;

// Prints: I come from the FormController Behavior!
echo $controller->someMethod();

// Prints: I come from the main Controller!
echo $controller->otherMethod();

// Prints: You might not see me...
echo $controller->asExtension('FormController')->otherMethod();
```
