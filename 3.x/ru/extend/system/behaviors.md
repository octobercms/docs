---
subtitle: Объединяйте классы с общей функциональностью.
---
# Поведения

Поведения добавляют возможность классам иметь приватные трейты, аналогичные [нативным PHP-трейтам](http://php.net/manual/en/language.oop5.traits.php), но с некоторыми отличительными преимуществами.

1. Поведения используют собственный конструктор.
1. Поведения могут иметь приватные или защищённые методы.
1. Конфликты имён методов и свойств разрешаются безопасно.
1. Классы могут быть расширены поведениями динамически.

## Сравнение с трейтами

Где вы можете использовать PHP-трейт вот так.

```php
class MyClass
{
    use \October\Rain\UtilityFunctions;
    use \October\Rain\DeferredBinding;
}
```

Поведение используется аналогичным образом.

```php
class MyClass extends \October\Rain\Extension\Extendable
{
    public $implement = [
        \October\Rain\UtilityFunctions::class,
        \October\Rain\DeferredBinding::class,
    ];
}
```

Где вы можете определить трейт вот так.

```php
trait UtilityFunctions
{
    public function sayHello()
    {
        echo "Hello from " . get_class($this);
    }
}
```

Поведение определяется вот так.

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

Расширяемый объект всегда передаётся как первый аргумент конструктора. В итоге, при использовании поведений наследуйте следующие классы.

- Наследуйте `October\Rain\Extension\ExtensionBase` для объявления класса как поведения.
- Наследуйте `October\Rain\Extension\Extendable` для класса, реализующего поведение.

## Расширение конструкторов

Любой класс, наследующий `Extendable`, может расширить свой конструктор статическим методом `extend`. Аргумент должен быть замыканием, которое будет вызвано как часть конструктора класса.

```php
MyClass::extend(function($controller) {
    //
});
```

### Мягкое определение

Если класс поведения не существует, как в случае с трейтом, будет выброшена ошибка **class not found**. В некоторых случаях вы можете захотеть подавить эту ошибку для условной реализации, если поведение присутствует в системе. Это можно сделать, поставив символ `@` в начало имени класса.
В следующем примере, если класс `RainLab\Translate\Behaviors\TranslatableModel` не существует, ошибка не будет выброшена.

```php
class User extends \October\Rain\Extension\Extendable
{
    public $implement = [
        '@'.\RainLab\Translate\Behaviors\TranslatableModel::class
    ];
}
```

## Динамическая реализация поведения

Эта уникальная возможность расширения конструкторов позволяет реализовывать поведения динамически. Например, используйте метод `implementClassWith` для реализации класса `RelationController` в классе `UsersController`.

```php
UsersController::extend(function($controller) {
    $controller->implementClassWith(\Backend\Behaviors\RelationController::class);
});
```

::: tip
Метод `implementClassWith` можно безопасно вызывать несколько раз — он проверит, реализует ли класс уже данное поведение, и реализует его.
:::

Используйте метод `extendClassWith` для расширения объекта после его создания. Следующий пример динамически расширяет класс Model, используя имя класса, хранящееся в базе данных.

```php
public function afterFetch()
{
    $this->extendClassWith($this->class_type);
}
```

Чтобы проверить, был ли объект расширен поведением, используйте метод `isClassExtendedWith` на объекте.

```php
$controller->isClassExtendedWith(\Backend\Behaviors\RelationController::class);
```

Для явного вызова метода из поведения используйте метод `asExtension`, который принимает базовое имя класса или полное имя класса как аргумент.

```php
echo $controller->asExtension('RelationController')->otherMethod();
```

## Динамическое создание методов

Методы могут быть созданы для расширяемого объекта вызовом `addDynamicMethod` с передачей имени метода и вызываемого объекта, например `Closure`.

```php
MyModel::extend(function($model) {
    $model->addDynamicMethod('getTagsAttribute', function() use ($model) {
        return '...';
    });
});
```

### Проверка существования метода

Для проверки существования метода в классе `Extendable` вызовите метод `methodExists` — аналогично PHP-функции `method_exists()`. Это обнаружит как стандартные методы, методы в поведениях, так и динамические методы, добавленные через вызов `addDynamicMethod`.

```php
$post = new Post;
$post->methodExists('getTagsAttribute'); // true
$post->methodExists('missingMethod'); // false
```

### Список всех доступных методов

Для получения списка всех доступных методов в классе `Extendable` используйте метод `getClassMethods`. Этот метод работает аналогично PHP-функции `get_class_methods()` в том, что возвращает массив доступных методов в классе, но дополнительно перечисляет методы, предоставленные расширением или добавленные через вызов `addDynamicMethod`.

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

## Пример использования

### Класс поведения / расширения

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

### Расширение класса

Этот класс `Controller` реализует поведение `FormController`, и затем методы станут доступны (подмешаны) в класс. Мы переопределим метод `otherMethod`.

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

### Использование расширения

```php
$controller = new MyNamespace\Controller;

// Prints: I come from the FormController Behavior!
echo $controller->someMethod();

// Prints: I come from the main Controller!
echo $controller->otherMethod();

// Prints: You might not see me...
echo $controller->asExtension('FormController')->otherMethod();
```
