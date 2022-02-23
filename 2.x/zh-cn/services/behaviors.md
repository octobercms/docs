# 行为

行为为类添加了具有*私有特征*的能力，也称为行为。 这些与 [原生 PHP 特征](http://php.net/manual/en/language.oop5.traits.php) 类似，但它们有一些明显的好处：

1. 行为有自己的构造函数。
1. 行为可以有私有或受保护的方法。
1. 方法和属性名可以安全地冲突。
1. 类可以动态扩展行为。

## 与特征的比较

您可能会使用这样的 PHP 特征：

```php
class MyClass
{
    use \October\Rain\UtilityFunctions;
    use \October\Rain\DeferredBinding;
}
```

以类似的方式使用行为：

```php
class MyClass extends \October\Rain\Extension\Extendable
{
    public $implement = [
        \October\Rain\UtilityFunctions::class,
        \October\Rain\DeferredBinding::class,
    ];
}
```

您可以在其中定义这样的特征：

```php
trait UtilityFunctions
{
    public function sayHello()
    {
        echo "Hello from " . get_class($this);
    }
}
```

行为定义如下：

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

扩展对象始终作为第一个参数传递给 Behavior 的构造函数。

总结一下：
- 扩展 \October\Rain\Extension\ExtensionBase 以将您的类声明为行为
- 想要实现行为的类需要扩展\October\Rain\Extension\Extendable

> **注意**：参见[使用特征而不是基类](#oc-using-traits-instead-of-base-classes)

## 扩展构造函数

任何使用 `Extendable` 或 `ExtendableTrait` 的类都可以使用静态 `extend` 方法扩展其构造函数。 参数应该传递一个闭包，该闭包将作为类构造函数的一部分调用。

```php
MyNamespace\Controller::extend(function($controller) {
    //
});
```

#### 动态声明属性

可以通过调用`addDynamicProperty`并传递属性名称和值来在可扩展对象上声明属性。

```php
Post::extend(function($model) {
    $model->addDynamicProperty('tagsCache', null);
});
```

> **注意**：尝试直接在实现了 **October\Rain\Extension\ExtendableTrait** 的对象上设置未声明的属性将会抛出异常。

#### 检索动态属性

动态创建的属性可以使用继承自的 getDynamicProperties 函数检索
可扩展特征。

因此检索所有动态属性将如下所示：

```php
$model->getDynamicProperties();
```

这将返回一个关联数组 [key => value]，其中键是动态属性名称
并且值是属性值。

如果我们知道我们想要什么属性，我们可以简单地将键(属性名称)附加到函数中：

```php
$model->getDynamicProperties()[$key];
```

#### 动态创建方法

可以通过调用`addDynamicMethod`并传递方法名称和可调用对象(如`Closure`)为可扩展对象创建方法。

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

#### 检查方法的存在

您可以使用 `methodExists` 方法检查 `Extendable` 类中是否存在方法 - 类似于 PHP 的 `method_exists()` 函数。 这将检测通过`addDynamicMethod`调用添加的标准方法和动态方法。 `methodExists` 接受一个参数：用于检查是否存在的方法名称字符串。

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

#### 列出所有可用的方法

要检索 `Extendable` 类中所有可用方法的列表，可以使用 `getClassMethods` 方法。 此方法的操作类似于 PHP `get_class_methods()` 函数，因为它返回类中可用方法的数组，但除了类中定义的方法之外，它还将列出由扩展或通过 `addDynamicMethod` 调用提供的任何方法。

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

#### 动态实现行为

这种扩展构造函数的独特能力允许动态实现行为，例如：

```php
/**
 * 扩展 RainLab.Users 控制器，使其包含 RelationController 行为
 */
\RainLab\Users\Controllers\Users::extend(function($controller) {

    // 动态实现列表控制器行为
    $controller->implementClassWith(\Backend\Behaviors\RelationController::class);

    // 动态声明要使用的 RelationController 行为的 relationConfig 属性
    $controller->addDynamicProperty('relationConfig', '$/myvendor/myplugin/controllers/users/config_relation.yaml');

});
```

## 用法示例

#### 行为/扩展类

```php
<?php namespace MyNamespace\Behaviors;

class FormController extends \October\Rain\Extension\ExtensionBase
{
    /**
     * @var 对扩展对象的引用。
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
        return "我来自FormController Behavior！";
    }

    public function otherMethod()
    {
        return "你可能看不到我...";
    }
}
```

#### 扩展一个类

这个 `Controller` 类将实现 `FormController` 行为，然后方法将变得可用于(混合)该类。 我们将覆盖 `otherMethod` 方法。

```php
<?php namespace MyNamespace;

class Controller extends \October\Rain\Extension\Extendable
{

    /**
     * 实现 FormController 行为
     */
    public $implement = [
        'MyNamespace.Behaviors.FormController'
    ];

    public function otherMethod()
    {
        return "我来自主控制器！";
    }
}
```

#### 使用扩展

```php
$controller = new MyNamespace\Controller;

// 打印：我来自FormController Behavior！
echo $controller->someMethod();

// 打印：我来自主控制器！
echo $controller->otherMethod();

// 打印：你可能看不到我...
echo $controller->asExtension('FormController')->otherMethod();
```

#### 检测使用的扩展

要检查一个对象是否已经扩展了一个行为，你可以在对象上使用 `isClassExtendedWith` 方法。

```php
$controller->isClassExtendedWith('Backend.Behaviors.RelationController');
```

下面是一个使用该方法动态扩展第三方插件的`UsersController`的示例，以避免阻止其他插件也扩展上述第三方插件。

```php
UsersController::extend(function($controller) {

    // 如果尚未实现，则实现行为
    if (!$controller->isClassExtendedWith('Backend.Behaviors.RelationController')) {
        $controller->implement[] = 'Backend.Behaviors.RelationController';
    }

    // 如果尚未定义，则定义属性
    if (!isset($controller->relationConfig)) {
        $controller->addDynamicProperty('relationConfig');
    }

    // 安全拼接配置
    $myConfigPath = '$/myvendor/myplugin/controllers/users/config_relation.yaml';

    $controller->relationConfig = $controller->mergeConfig(
        $controller->relationConfig,
        $myConfigPath
    );

}
```

### 软定义

如果行为类不存在，例如特征，则会抛出 *Class not found* 错误。 在某些情况下，如果系统中存在行为，您可能希望抑制此错误，以便有条件地执行。 您可以通过在类名的开头放置一个 `@` 符号来做到这一点。

```php
class User extends \October\Rain\Extension\Extendable
{
    public $implement = [
        '@'.\RainLab\Translate\Behaviors\TranslatableModel::class
    ];
}
```

如果类名 `RainLab\Translate\Behaviors\TranslatableModel` 不存在，则不会抛出错误。 这等效于以下代码：

```php
class User extends \October\Rain\Extension\Extendable
{
    public $implement = [];

    public function __construct()
    {
        if (class_exists('\RainLab\Translate\Behaviors\TranslatableModel')) {
            $this->implement[] = \RainLab\Translate\Behaviors\TranslatableModel::class;
        }

        parent::__construct();
    }
}
```

<a id="oc-using-traits-instead-of-base-classes"></a>
### 使用Traits而不是基类

有时您的类可能已经在源代码控制之外扩展了父类，因此您无法扩展`ExtensionBase`或`Extendable`类。 相反，您可以使用这些特征，并且您的类必须按如下方式实现。

首先让我们创建一个行为类，即。 可以由其他类实现。

```php
<?php namespace MyNamespace\Behaviors;

class WaveBehaviour
{
    use \October\Rain\Extension\ExtensionTrait;

    /**
     * 使用 Extensiontrait 时，您的行为也必须实现此方法
     * @see \October\Rain\Extension\ExtensionBase
     */
    public static function extend(callable $callback)
    {
        self::extensionExtendCallback($callback);
    }

    public function wave()
    {
        echo "*waves*<br>";
    }
}
```

现在让我们使用 ExtendableTrait 创建能够实现行为的类。

```php
class AI
{
    use \October\Rain\Extension\ExtendableTrait;

    /**
     * @var array 此类实现的扩展。
     */
    public $implement;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->extendableConstruct();
    }

    public function __get($name)
    {
        return $this->extendableGet($name);
    }

    public function __set($name, $value)
    {
        $this->extendableSet($name, $value);
    }

    public function __call($name, $params)
    {
        return $this->extendableCall($name, $params);
    }

    public static function __callStatic($name, $params)
    {
        return self::extendableCallStatic($name, $params);
    }

    public static function extend(callable $callback)
    {
        self::extendableExtendCallback($callback);
    }

    public function youGotBrains()
    {
        echo "我有一个人工智能！<br>";
    }
}
```

AI 类现在可以使用行为了。 让我们扩展它并让此类实现 WaveBehaviour。

```php
<?php namespace MyNamespace\Classes;

class Robot extends AI
{
    public $implement = [
        \MyNamespace\Behaviors\WaveBehaviour::class
    ];

    public function identify()
    {
        echo "我是机器人<br>";
        echo $this->youGotBrains();
        echo $this->wave();
    }
}
```

您现在可以按如下方式使用Robot：

```php
$robot = new Robot();
$robot->identify();
```

这将输出：

```
我是机器人
我有一个人工智能！
*waves*
```

记住：

- 使用 `ExtensionTrait` 时，应将 `ExtensionBase` 中的方法应用到该类。
- 使用 `ExtendableTrait` 时，应将 `Extendable` 中的方法应用于该类。
