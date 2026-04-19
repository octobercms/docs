# 事件

## 基本用法

`Event` 类提供了一个简单的观察者实现，允许你在应用程序中订阅和监听事件。例如，你可以监听用户登录的事件并更新其最后登录日期。

```php
Event::listen('auth.login', function($user) {
    $user->last_login = new DateTime;
    $user->save();
});
```

此事件通过 `Event::fire` 方法触发，该方法作为用户登录逻辑的一部分被调用，从而使逻辑可扩展。

```php
Event::fire('auth.login', [$user]);
```

::: tip
有关 October CMS 本身提供的所有事件列表，请参阅 [API 文档](https://octobercms.com/docs/api)。
:::

## 订阅事件

`Event::listen` 方法主要用于订阅事件，可以在应用程序代码的任何位置调用。第一个参数是事件名称。

```php
Event::listen('acme.blog.myevent', ...);
```

第二个参数可以是一个闭包，指定在事件触发时应执行的操作。闭包可以接受一些可选参数，这些参数由触发的事件提供。

```php
Event::listen('acme.blog.myevent', function($arg1, $arg2) {
    // 做一些事情
});
```

你还可以传递对任何可调用对象的引用或专用事件类，它将被使用。

```php
Event::listen('auth.login', [$this, 'LoginHandler']);
```

::: tip
可调用方法可以选择指定全部、部分或不指定参数。无论如何，除非指定了过多的参数，否则事件不会抛出任何错误。
:::

### 注册监听器的位置

最常见的位置是[插件注册文件](../extending.md)的 `boot` 方法。

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

另外，插件可以在插件目录中提供一个名为 **init.php** 的文件，用于放置事件注册逻辑。例如：

```php
Event::listen(...);
```

由于这些方法都没有本质上的"正确"与否，你可以根据应用程序的大小选择你觉得合适的方法。

### 使用优先级订阅

在订阅事件时，你还可以将优先级作为第三个参数指定。优先级较高的监听器将先运行，而具有相同优先级的监听器将按订阅顺序运行。

```php
// 先运行
Event::listen('auth.login', function() { ... }, 10);

// 后运行
Event::listen('auth.login', function() { ... }, 5);
```

### 停止事件传播

有时你可能希望阻止事件传播到其他监听器。你可以通过从监听器返回 `false` 来实现：

```php
Event::listen('auth.login', function($event) {
    // 处理事件

    return false;
});
```

### 通配符监听器

注册事件监听器时，你可以使用星号指定通配符监听器。通配符监听器首先接收被触发的事件名称，然后接收作为数组传递给事件的参数。

以下监听器处理所有以 `foo.` 开头的事件。

```php
Event::listen('foo.*', function($event, $params) {
    // 处理事件...
});
```

你可以使用 `Event::firing` 方法来确定触发了哪个事件。

```php
Event::listen('foo.*', function($event, $params) {
    if (Event::firing() === 'foo.bar') {
        // ...
    }
});
```

## 触发事件

你可以在代码的任何位置使用 `Event::fire` 方法使逻辑可扩展。这意味着其他开发者，甚至你自己的内部代码，可以"挂钩"到代码的这个点并注入特定的逻辑。第一个参数应该是事件名称。

```php
Event::fire('myevent');
```

始终建议使用你的插件命名空间代码作为事件名称的前缀，这将防止与其他插件冲突。

```php
Event::fire('acme.blog.myevent');
```

第二个参数是一个值数组，将作为参数传递给订阅该事件的事件监听器。

```php
Event::fire('acme.blog.myevent', [$arg1, $arg2]);
```

第三个参数指定事件是否应该是可停止事件，意味着如果返回了"非 null"值，它应该停止。此参数默认设置为 false。

```php
Event::fire('acme.blog.myevent', [...], true);
```

如果事件是可停止的，将捕获返回的第一个值。

```php
// 单个结果，事件已停止
$result = Event::fire('acme.blog.myevent', [...], true);
```

否则，它以数组的形式返回所有事件的所有响应的集合。

```php
// 多个结果，所有事件都已触发
$results = Event::fire('acme.blog.myevent', [...]);
```

## 按引用传递参数

在处理或过滤传递给事件的值时，你可以在变量前加上 `&` 以按引用传递。这允许多个监听器操作结果并将其传递给下一个。

```php
Event::fire('cms.processContent', [&$content]);
```

在监听事件时，参数也需要在闭包定义中使用 `&` 符号声明。在下面的例子中，`$content` 变量将在结果后附加 "AB"。

```php
Event::listen('cms.processContent', function (&$content) {
    $content = $content . 'A';
});

Event::listen('cms.processContent', function (&$content) {
    $content = $content . 'B';
});
```

### 队列事件

触发事件可以与[队列](./queue.md)配合延迟执行。使用 `Event::queue` 方法将事件"排队"以备触发，但不立即触发。

```php
Event::queue('foo', [$user]);
```

你可以使用 `Event::flush` 方法刷新所有排队的事件。

```php
Event::flush('foo');
```

## 使用类作为监听器

在某些情况下，你可能希望使用类而不是闭包来处理事件。类事件监听器将从[应用程序 IoC 容器](./application.md)中解析，为你的监听器提供完整的依赖注入功能。

### 订阅单个方法

事件类可以像其他任何类一样使用 `Event::listen` 方法注册，将类名作为字符串传递。

```php
Event::listen('auth.login', LoginHandler::class);
```

默认情况下，将调用 `LoginHandler` 类上的 `handle` 方法：

```php
class LoginHandler
{
    public function handle($data)
    {
        // ...
    }
}
```

如果你不想使用默认的 `handle` 方法，可以指定应该订阅的方法名称。

```php
Event::listen('auth.login', [LoginHandler::class, 'onLogin']);
```

### 订阅整个类

事件订阅者是可以在类内部订阅多个事件的类。订阅者应定义一个 `subscribe` 方法，该方法将接收一个事件调度器实例。

```php
class UserEventHandler
{
    /**
     * subscribe 注册订阅者的监听器。
     * @param  Illuminate\Events\Dispatcher  $events
     * @return array
     */
    public function subscribe($events)
    {
        $events->listen('auth.login', [static::class, 'userLogin']);

        $events->listen('auth.logout', [static::class, 'userLogout']);
    }

    /**
     * userLogin 处理用户登录事件。
     */
    public function userLogin($event)
    {
        // ...
    }

    /**
     * userLogout 处理用户登出事件。
     */
    public function userLogout($event)
    {
        // ...
    }
}
```

一旦定义了订阅者，就可以使用 `Event::subscribe` 方法注册它。

```php
Event::subscribe(new UserEventHandler);
```

你也可以使用[应用程序 IoC 容器](./application.md)来解析你的订阅者。为此，只需将订阅者的名称传递给 `subscribe` 方法。

```php
Event::subscribe(UserEventHandler::class);
```

## 事件发射器 Trait

有时你希望将事件绑定到单个对象实例。你可以通过在类中实现 `October\Rain\Support\Traits\Emitter` trait 来使用替代事件系统。

```php
class UserManager
{
    use \October\Rain\Support\Traits\Emitter;
}
```

此 trait 提供了一个使用 `bindEvent` 监听事件的方法。

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

这些事件仅发生在本地对象上，而不是全局的。
