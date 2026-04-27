# 应用

控制反转（IoC）容器是一个用于管理类依赖关系的工具。依赖注入是一种移除硬编码类依赖的方法。相反，依赖关系在运行时注入，从而允许更大的灵活性，因为依赖实现可以轻松地被替换。

#### 绑定到容器

IoC 容器有两种解析依赖的方式：通过闭包回调或自动解析。首先，我们来探讨闭包回调。首先，可以将一个"类型"绑定到容器中。

```php
App::bind('foo', function($app) {
    return new FooBar;
});
```

#### 从容器中解析

```php
$value = App::make('foo');
```

当调用 `App::make` 方法时，闭包回调将被执行并返回结果。

#### 将"共享"类型绑定到容器

有时你可能希望将某些内容绑定到容器中，使其只被解析一次，后续调用返回相同的实例：

```php
App::singleton('foo', function() {
    return new FooBar;
});
```

#### 将现有实例绑定到容器

你也可以使用 `instance` 方法将现有的对象实例绑定到容器中：

```php
$foo = new Foo;

App::instance('foo', $foo);
```

#### 将接口绑定到实现

在某些情况下，一个类可能依赖于接口实现，而不是"具体类型"。在这种情况下，必须使用 `App::bind` 方法来告知容器应注入哪个接口实现：

```php
App::bind('UserRepositoryInterface', 'DbUserRepository');
```

现在考虑以下代码：

```php
$users = App::make('UserRepositoryInterface');
```

由于我们已将 `UserRepositoryInterface` 绑定到具体类型，`DbUserRepository` 将在创建此控制器时自动注入。

### 注册绑定的位置

IoC 绑定，如同[事件处理程序](./event.md)，通常属于"引导代码"的范畴。换句话说，它们为你的应用程序准备好实际处理请求的能力，通常需要在路由或控制器实际被调用之前执行。最常见的位置是[插件注册文件](../extending.md)的 `boot` 方法。另外，插件可以在插件目录中提供一个名为 **init.php** 的文件，用于放置 IoC 注册逻辑。

## 服务提供者

服务提供者是创建库和在单个位置执行相关 IoC 注册的好方法。在服务提供者中，你可以注册自定义的身份验证驱动程序、将应用程序的存储库类注册到 IoC 容器中，甚至设置自定义的 Artisan 命令。

事实上，[插件注册文件](../system/plugins.md)继承自服务提供者，大多数核心组件都包含服务提供者。你的应用程序所有已注册的服务提供者都列在 `config/app.php` 配置文件的 `providers` 数组中。

#### 定义服务提供者

要创建服务提供者，只需扩展 `October\Rain\Support\ServiceProvider` 类并定义一个 `register` 方法：

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

请注意，在 `register` 方法中，你可以通过 `$this->app` 属性访问应用程序 IoC 容器。创建提供者并准备将其注册到应用程序后，只需将其添加到 `app` 配置文件中的 `providers` 数组即可。

#### 在运行时注册服务提供者

你也可以使用 `App::register` 方法在运行时注册服务提供者。

```php
App::register('FooServiceProvider');
```

## 应用事件

#### 请求事件

你可以使用 `before` 和 `after` 方法在请求被路由之前注册特殊事件。

```php
App::before(function ($request) {
    // 在请求被路由之前执行的代码
});

App::after(function ($request) {
    // 在请求被路由之后执行的代码
});
```

#### 容器事件

服务容器每次解析对象时都会触发一个事件。你可以使用 `resolving` 方法来监听此事件。

```php
App::resolving(function ($object, $app) {
    // 当容器解析任何类型的对象时调用...
});

App::resolving('foo', function ($fooBar, $app) {
    // 当容器使用提示 "foo" 解析对象时调用...
});

App::resolving('Acme\Blog\Classes\FooBar', function ($fooBar, $app) {
    // 当容器解析类型为 "FooBar" 的对象时调用...
});
```

如你所见，被解析的对象将传递给回调，允许你在将对象交给其使用者之前设置任何附加属性。

## 应用助手

#### 获取应用环境

你可以使用 `environment` 方法来获取由[环境配置](../../setup/configuration.md)确定的应用环境。

```php
// production
App::environment();
```

#### 确定执行上下文

可以使用 `runningInBackend` 方法来判断当前请求是否在后台管理区域执行。

```php
App::runningInBackend();
```

你也可以使用 `runningInConsole` 方法来检查正在执行的代码是否在[命令行界面](../console-commands.md)中运行：

```php
App::runningInConsole();
```
