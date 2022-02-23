# 响应和视图

## 基本响应

几乎可以从页面使用的 PHP 方法返回响应。这包括  [布局执行生命周期](../cms/layouts.md#oc-dynamic-layouts) 和 [AJAX 处理程序定义](../ajax/handlers.md)中包含的所有 CMS 方法.

#### 从 CMS 方法返回字符串

从 CMS 页面、布局或组件方法返回字符串将在此时停止进程并覆盖默认行为，因此此处将显示"Hello World"字符串而不是显示页面。

```php
public function onStart()
{
    return 'Hello World';
}
```

#### 从 AJAX 处理程序返回字符串

从 AJAX 处理程序返回字符串将使用默认键 `result` 将字符串添加到响应集合中。请求的部分仍将包含在响应中。

```php
public function onDoSomething()
{
    return 'Hello World';
    // ['result' => 'Hello World']
}
```

#### 从路由返回字符串

从 [路由定义](../services/router.md) 返回字符串将与 CMS 方法相同，并将字符串显示为响应。

```php
Route::get('/', function() {
    return 'Hello World';
});
```

#### 创建自定义响应

对于更健壮的解决方案，返回一个 `Response` 对象，提供各种用于构建 HTTP 响应的方法。我们将在本文中进一步探讨这个主题。

```php
$contents = 'Page not found';
$statusCode = 404;
return Response::make($contents, $statusCode);
```

### 将标题附加到响应

请记住，大多数响应方法都是可链接的，允许流畅地构建响应。例如，您可以使用 `header` 方法将一系列标头添加到响应中，然后再将其发送回用户：

```php
return Response::make($content)
    ->header('Content-Type', $type)
    ->header('X-Header-One', 'Header Value')
    ->header('X-Header-Two', 'Header Value');
```

一个实际的例子是返回一个 XML 响应

```php
return Response::make($xmlString)->header('Content-Type', 'text/xml');
```

### 将 Cookie 附加到响应

`withCookie` 方法允许您轻松地将 cookie 附加到响应中。例如，您可以使用 withCookie 方法生成一个 cookie 并将其附加到响应实例：

```php
return Response::make($content)->withCookie('name', 'value');
```

`withCookie` 方法接受额外的可选参数，允许您进一步自定义 cookie 的属性

```php
->withCookie($name, $value, $minutes, $path, $domain, $secure, $httpOnly)
```

## 其他响应类型

`Response` 外观可用于方便地生成其他类型的响应实例。

### 查看响应

如果您需要访问 `Response` 类方法，但又想返回  [视图](#oc-views) 作为响应内容，可以使用 `Response::view` 方法方便：

```php
return Response::view('acme.blog::hello')->header('Content-Type', $type);
```

### JSON 响应

`json` 方法会自动将 `Content-Type` 标头设置为 application/json，并使用 `json_encode` PHP 函数将给定数组转换为 JSON：

```php
return Response::json(['name' => 'Steve', 'state' => 'CA']);
```

如果您想创建 JSONP 响应，除了 `setCallback` 之外，还可以使用 `json` 方法：

```php
return Response::json(['name' => 'Steve', 'state' => 'CA'])
    ->setCallback(Input::get('callback'));
```

### 文件下载

`download` 方法可用于生成强制用户浏览器在给定路径下载文件的响应。 `download` 方法接受文件名作为该方法的第二个参数，这将确定下载文件的用户看到的文件名。最后，您可以将一组 HTTP 标头作为该方法的第三个参数传递：

```php
return Response::download($pathToFile);

return Response::download($pathToFile, $name, $headers);

return Response::download($pathToFile)->deleteFileAfterSend(true);
```

> **注意**: 管理文件下载的 Symfony HttpFoundation 要求正在下载的文件具有 ASCII 文件名。

<a id="oc-redirects"></a>
## 重定向

定向响应通常是 `Illuminate\Http\RedirectResponse` 类的实例，并包含将用户重定向到另一个 URL 所需的正确标头。 生成 `RedirectResponse` 实例的最简单方法是使用 `Redirect` 外观上的 `to` 方法。

```php
return Redirect::to('user/login');
```

### 使用闪存数据返回重定向

重定向到一个新的 URL 和  [将闪存数据存到Session](../services/session.md) 通常是同时完成的。 因此，为方便起见，您可以在单个方法链中创建一个 `RedirectResponse` 实例并将数据闪存到Session中：

```php
return Redirect::to('user/login')->with('message', 'Login Failed');
```

> **注意**: 由于 `with` 方法将数据闪烁到Session中，您可以使用典型的 `Session::get` 方法检索数据。

#### 重定向到上一个 URL

您可能希望将用户重定向到他们以前的位置，例如，在提交表单之后。您可以使用 `back` 方法来做到这一点

```php
return Redirect::back();

return Redirect::back()->withInput();
```

#### 重定向到当前页面

有时你想简单地刷新当前页面，你可以使用 `refresh` 方法来做到这一点：

```php
return Redirect::refresh();
```

## 响应宏

如果您想定义一个可以在各种路由和控制器中重复使用的自定义响应，您可以使用 `Response::macro` 方法：

```php
Response::macro('caps', function($value) {
    return Response::make(strtoupper($value));
});
```

`macro` 函数接受一个名字作为它的第一个参数，一个闭包作为它的第二个参数。在 `Response` 类上调用宏名称时，将执行宏的闭包：

```php
return Response::caps('foo');
```

您可以在 [插件注册文件](../plugin/registration.md#oc-registration-methods).的 `boot` 方法中定义宏。或者，插件可以在插件目录中提供一个名为 **init.php** 的文件，您可以使用它来放置宏注册。

<a id="oc-views"></a>
## 视图

视图是存储基于系统的表示逻辑的好方法，例如 API 或端点使用的标记，或与 CMS 和后端区域共享的标记 [邮件服务](../services/mail.md) 也使用视图来提供默认模板内容。视图通常存储在插件的 `views` 目录中。

一个简单的视图可能看起来像这样：

```twig
<!-- View stored in plugins/acme/blog/views/greeting.htm -->

<html>
    <body>
        <h1>Hello, {{ name }}</h1>
    </body>
</html>
```

视图也可以通过使用 `.php` 扩展名使用 PHP 模板进行解析：

```php
<!-- View stored in plugins/acme/blog/views/greeting.php -->

<html>
    <body>
        <h1>Hello, <?= $name ?></h1>
    </body>
</html>
```

这个视图可以使用 `View::make` 方法返回给浏览器：

```php
return View::make('acme.blog::greeting', ['name' => 'Charlie']);
```

第一个参数是包含插件名称的"路径提示"，由两个冒号`::`分隔，后跟视图文件名。传递给 `View::make` 的第二个参数是一个数据数组，应该对视图可用。

> **注意**: 路径提示区分大小写，插件名称应始终为小写。


#### 将数据传递给视图

```php
// 使用常规方法
$view = View::make('acme.blog::greeting')->with('name', 'Steve');

// 使用魔术方法
$view = View::make('acme.blog::greeting')->withName('steve');
```

在上面的示例中，变量 `name`可以从视图中访问，并且包含 `Steve`。如上所述，如果你想传递一个数据数组，你可以这样做作为传递给 `make` 方法的第二个参数：

```php
$view = View::make('acme.blog::greeting', $data);
```

也可以在所有视图之间共享一条数据：

```php
View::share('name', 'Steve');
```

#### 将子视图传递给视图

有时您可能希望将一个视图传递给另一个视图。例如，给定一个存储在 `plugins/acme/blog/views/child/view.php` 的子视图，我们可以将它传递给另一个视图，如下所示：

```php
$view = View::make('acme.blog::greeting')->nest('child', 'acme.blog::child.view');

$view = View::make('acme.blog::greeting')->nest('child', 'acme.blog::child.view', $data);
```

然后可以从父视图呈现子视图

```twig
<html>
    <body>
        <h1>你好!</h1>
        {{ child|raw }}
    </body>
</html>
```

#### 判断视图是否存在

如果需要检查视图是否存在，请使用 `View::exists` 方法：

```php
if (View::exists('acme.blog::mail.customer')) {
    //
}
```
