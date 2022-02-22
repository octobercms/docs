# 应用

## 应用程序容器

控制反转(IoC)容器是用于管理类依赖关系的工具。 依赖注入是一种去除硬编码类依赖的方法。 相反，依赖项是在运行时注入的，因为可以轻松交换依赖项实现，从而提供更大的灵活性。

#### 将类型绑定到容器中

IoC 容器可以通过两种方式解决依赖关系：通过闭包回调或自动解析。 首先，我们将探索闭包回调，可以将"类型"绑定到容器中：

```php
App::bind('foo', function($app) {
    return new FooBar;
});
```

#### 从容器中解析类型

```php
$value = App::make('foo');
```

当调用 `App::make` 方法时，会执行 Closure 回调并返回结果。

#### 将一个"共享"类型绑定到容器中

有时您可能希望将某些内容绑定到只应解析一次的容器中，并且应在随后对容器的调用中返回相同的实例：

```php
App::singleton('foo', function() {
    return new FooBar;
});
```

#### 将现有实例绑定到容器中

您还可以使用 `instance` 方法将现有对象实例绑定到容器中：

```php
$foo = new Foo;

App::instance('foo', $foo);
```

#### 将接口绑定到实现

在某些情况下，类可能依赖于接口实现，而不是"具体类型"。 在这种情况下，必须使用 `App::bind` 方法来通知容器要注入哪个接口实现：

```php
App::bind('UserRepositoryInterface', 'DbUserRepository');
```

现在考虑以下代码：

```php
$users = App::make('UserRepositoryInterface');
```

由于我们已将 `UserRepositoryInterface` 绑定到具体类型，`DbUserRepository` 将在创建时自动注入此控制器。

### 在哪里注册绑定

IoC 绑定，如 [事件处理程序](events.md)，通常属于"引导代码"类别。换句话说，它们让您的应用程序准备好实际处理请求，并且通常需要在实际调用路由或控制器之前执行。最常见的地方是[插件注册文件](../plugin/registration.md#oc-registration-methods)的`boot`方法。或者，插件可以在插件目录中提供一个名为 **init.php** 的文件，您可以使用该文件来放置 IoC 注册逻辑。

## 服务提供者

服务提供者是在单个位置创建库和执行组相关的 IoC 注册的好方法。在服务提供者中，您可以注册自定义身份验证驱动程序，使用 IoC 容器注册应用程序的存储库类，甚至设置自定义 Artisan 命令。

实际上，[插件注册文件](../plugin/registration.md)继承了服务提供者，大部分核心组件都包含服务提供者。为您的应用程序注册的所有服务提供者都列在 `config/app.php` 配置文件的 `providers` 数组中。

#### 定义服务提供者

要创建服务提供者，只需扩展 `October\Rain\Support\ServiceProvider` 类并定义 `register` 方法：

```php
use October\Rain\Support\ServiceProvider;

class FooServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind('foo', function() {
            return new Foo;
        });
    }
}
```

请注意，在 `register` 方法中，您可以通过 `$this->app` 属性使用应用程序 IoC 容器。 一旦您创建了提供程序并准备将其注册到您的应用程序中，只需将其添加到您的 `app` 配置文件中的 `providers` 数组中。

#### 在运行时注册服务提供者

您还可以在运行时使用 `App::register` 方法注册服务提供者：

```php
App::register('FooServiceProvider');
```

## 应用程序事件

#### 请求事件

您可以使用 `before` 和 `after` 方法在请求路由之前注册特殊事件：

```php
App::before(function ($request) {
    // 在路由请求之前执行的代码
});

App::after(function ($request) {
    // 路由请求后要执行的代码
});
```

#### 容器事件

服务容器每次解析对象时都会触发一个事件。 您可以使用 `resolving` 方法收听此事件：

```php
App::resolving(function ($object, $app) {
    // 当容器解析任何类型的对象时调用...
});

App::resolving('foo', function ($fooBar, $app) {
    // 当容器使用提示"foo"解析对象时调用...
});

App::resolving('Acme\Blog\Classes\FooBar', function ($fooBar, $app) {
    // 当容器解析"FooBar"类型的对象时调用...
});
```

如您所见，正在解析的对象将被传递给回调，允许您在对象被提供给其使用者之前设置对象的任何其他属性。

## 应用程序助手

#### 查找应用环境

您可以使用 `environment` 方法来发现由 [环境配置](../setup/configuration.md#oc-environment-configuration) 确定的应用程序环境。

```php
// 生产
App::environment();
```
#### 确定执行上下文

可以使用 `runningInBackend` 方法知道当前请求是否正在管理后端区域中执行。

```php
App::runningInBackend();
```

您还可以使用 `runningInConsole` 方法检查执行代码是否发生在 [命令行界面](../console/commands.md) 中：

```php
App::runningInConsole();
```
