# 事件

## 基本用法

`Event` 类提供了一个简单的观察者实现，允许您订阅和监听应用程序中的事件。 例如，您可以监听用户何时登录并更新他们的上次登录日期。

```php
Event::listen('auth.login', function($user) {
    $user->last_login = new DateTime;
    $user->save();
});
```

这是通过 `Event::fire` 方法提供的事件，该方法作为用户登录逻辑的一部分调用，从而使逻辑可扩展。

```php
Event::fire('auth.login', [$user]);
```

> **注意**：有关 October CMS 本身中可用的所有事件的列表，请参阅 [API 文档](https://octobercms.com/docs/api)。

## 监听事件

`Event::listen` 方法主要用于监听事件，可以在应用程序代码中的任何位置完成。 第一个参数是事件名称。

```php
Event::listen('acme.blog.myevent', ...);
```

第二个参数可以是一个闭包，它指定触发事件时应该发生什么。 闭包可以接受一些可选的参数，由 [触发事件](#firing-events) 提供。

```php
Event::listen('acme.blog.myevent', function($arg1, $arg2) {
    // 做
});
```

您还可以传递对任何可调用对象或 [专用事件类](#using-classes-as-listeners) 的引用，并将使用它来代替。

```php
Event::listen('auth.login', [$this, 'LoginHandler']);
```

> **注意**：可调用方法可以选择指定全部、部分或不指定任何参数。 无论哪种方式，事件都不会引发任何错误，除非它指定太多。

### 在哪里注册监听器

最常见的地方是[插件注册文件](../plugin/registration.md#oc-registration-methods)的`boot`方法。

```php
class Plugin extends PluginBase
{
    // ...

    public function boot()
    {
        Event::listen(...);
    }
}
```

或者，插件可以在插件目录中提供一个名为 **init.php** 的文件，您可以使用它来放置事件注册逻辑。 例如：

```php
<?php

Event::listen(...);
```

由于这些方法都不是本质上"正确"的，因此请根据应用程序的大小选择您觉得合适的方法。

### 使用优先级监听

您还可以在监听事件时指定优先级作为第三个参数。 优先级较高的监听器将首先运行，而具有相同优先级的监听器将按监听顺序运行。

```php
// 第一个运行
Event::listen('auth.login', function() { ... }, 10);

// 第二个运行
Event::listen('auth.login', function() { ... }, 5);
```

### 停止事件

有时您可能希望停止将事件传播给其他监听器。 您可以通过从监听器返回 `false` 来执行此操作：

```php
Event::listen('auth.login', function($event) {
    // 处理事件

    return false;
});
```

### 通配符监听器

注册事件监听器时，您可以使用星号指定通配符监听器。 通配符监听器接收首先触发的事件名称，然后是作为数组传递给事件的参数。

以下监听器处理所有以 `foo.` 开头的事件。

```php
Event::listen('foo.*', function($event, $params) {
    // 处理事件...
});
```

您可以使用 `Event::firing` 方法来准确确定触发了哪个事件。

```php
Event::listen('foo.*', function($event, $params) {
    if (Event::firing() === 'foo.bar') {
        // ...
    }
});
```

## 触发事件

您可以在代码中的任何位置使用 `Event::fire` 方法来使逻辑可扩展。 这意味着其他开发人员，甚至您自己的内部代码，都可以"挂钩"到这一个代码并注入特定的逻辑。 第一个参数应该是事件名称。

```php
Event::fire('myevent');
```

使用插件命名空间代码为事件名称添加前缀总是一个好主意，这将防止与其他插件发生冲突。

```php
Event::fire('acme.blog.myevent');
```

第二个参数是一个值数组，将作为参数传递给监听它的 [事件监听器](#subscribing-to-events)。

```php
Event::fire('acme.blog.myevent', [$arg1, $arg2]);
```

第三个参数指定事件是否应该是 [停止事件](#halting-events)，这意味着如果返回"非 null"值，它应该停止。此参数默认设置为 false。

```php
Event::fire('acme.blog.myevent', [...], true);
```

如果事件正在停止，则返回的第一个值被捕获。

```php
// 单一结果，事件停止
$result = Event::fire('acme.blog.myevent', [...], true);
```

否则，它将以数组的形式返回来自所有事件的所有响应的集合。

```php
// 多个结果，所有事件都被触发
$results = Event::fire('acme.blog.myevent', [...]);
```

## 通过引用传递参数

在处理或过滤传递给事件的值时，您可以在变量前面加上 `&` 以通过引用传递它。这允许多个监听器操纵结果并将其传递给下一个监听器。

```php
Event::fire('cms.processContent', [&$content]);
```

监听事件时，参数也需要在闭包定义中用 `&` 符号声明。在下面的示例中，`$content` 变量将在结果中附加"AB"。

```php
Event::listen('cms.processContent', function (&$content) {
    $content = $content . 'A';
});

Event::listen('cms.processContent', function (&$content) {
    $content = $content . 'B';
});
```

### 队列事件

触发事件可以在 [与队列结合使用](../services/queues.md) 中延迟。使用 `Event::queue` 方法将事件"排队"触发，但不立即触发。

```php
Event::queue('foo', [$user]);
```

您可以使用 `Event::flush` 方法刷新所有排队的事件。

```php
Event::flush('foo');
```

## 使用类作为监听器

在某些情况下，您可能希望使用类而不是闭包来处理事件。类事件监听器将从 [Application IoC 容器](application.md) 中解析出来，为您提供监听器依赖注入的全部功能。

### 监听单个方法

事件类可以像任何其他方法一样使用 `Event::listen` 方法注册，将类名作为字符串传递。

```php
Event::listen('auth.login', 'LoginHandler');
```

默认情况下，会调用 `LoginHandler` 类的 `handle` 方法：

```php
class LoginHandler
{
    public function handle($data)
    {
        // ...
    }
}
```

如果你不想使用默认的 `handle` 方法，你可以指定应该监听的方法名。

```php
Event::listen('auth.login', 'LoginHandler@onLogin');
```

### 监听整个类

事件订阅者是可以从类本身监听多个事件的类。订阅者应该定义一个 `subscribe` 方法，该方法将被传递一个事件调度程序实例。

```php
class UserEventHandler
{
    /**
     * 处理用户登录事件。
     */
    public function userLogin($event)
    {
        // ...
    }

    /**
     * 处理用户注销事件。
     */
    public function userLogout($event)
    {
        // ...
    }

    /**
     * 为订阅者注册监听器。
     *
     * @param  Illuminate\Events\Dispatcher  $events
     * @return array
     */
    public function subscribe($events)
    {
        $events->listen('auth.login', 'UserEventHandler@userLogin');

        $events->listen('auth.logout', 'UserEventHandler@userLogout');
    }
}
```

一旦定义了订阅者，就可以使用 `Event::subscribe` 方法注册它。

```php
Event::subscribe(new UserEventHandler);
```

您也可以使用 [Application IoC 容器](application.md) 来解析您的订阅者。为此，只需将订阅者的名称传递给 `subscribe` 方法。

```php
Event::subscribe('UserEventHandler');
```

## 事件派发器特征

有时您希望将事件绑定到对象的单个实例。您可以通过在类中实现 `October\Rain\Support\Traits\Emitter` 特征来使用替代事件系统。

```php
class UserManager
{
    use \October\Rain\Support\Traits\Emitter;
}
```

此特征提供了一种使用 `bindEvent` 监听事件的方法。

```php
$manager = new UserManager;
$manager->bindEvent('user.beforeRegister', function($user) {
    // 检查 $user 是否是垃圾邮件发送者
});
```

`fireEvent` 方法用于触发事件。

```php
$manager = new UserManager;
$manager->fireEvent('user.beforeRegister', [$user]);
```

这些事件只会发生在本地对象上，而不是全局发生。
