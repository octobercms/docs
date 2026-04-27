# 响应和视图

## 基本响应

几乎所有页面使用的 PHP 方法都可以返回响应。这包括[布局执行生命周期](../../cms/themes/layouts.md)中包含的所有 CMS 方法和 [AJAX 处理程序定义](../../cms/ajax/handlers.md)。

#### 从 CMS 方法返回字符串

从 CMS 页面、布局或组件方法返回字符串将在此处停止进程并覆盖默认行为，因此这里将显示 "Hello World" 字符串而不是显示页面。

```php
public function onStart()
{
    return 'Hello World';
}
```

#### 从 AJAX 处理程序返回字符串

从 AJAX 处理程序返回字符串将使用默认键 `result` 将字符串添加到响应集合中。请求的局部视图仍将包含在响应中。

```php
public function onDoSomething()
{
    return 'Hello World';
    // ['result' => 'Hello World']
}
```

#### 从路由返回字符串

从[路由定义](../system/routing.md)返回字符串将与 CMS 方法相同，将字符串显示为响应。

```php
Route::get('/', function() {
    return 'Hello World';
});
```

#### 创建自定义响应

对于更强大的解决方案，返回一个 `Response` 对象，提供用于构建 HTTP 响应的各种方法。我们将在本文中进一步探讨此主题。

```php
$contents = 'Page not found';
$statusCode = 404;
return Response::make($contents, $statusCode);
```

### 向响应附加标头

请记住，大多数响应方法都是可链式调用的，允许流畅地构建响应。例如，你可以使用 `header` 方法在将响应发送回用户之前添加一系列标头：

```php
return Response::make($content)
    ->header('Content-Type', $type)
    ->header('X-Header-One', 'Header Value')
    ->header('X-Header-Two', 'Header Value');
```

一个实际的例子是返回 XML 响应：

```php
return Response::make($xmlString)->header('Content-Type', 'text/xml');
```

### 向响应附加 Cookie

`withCookie` 方法允许你轻松地将 cookie 附加到响应。例如，你可以使用 withCookie 方法生成 cookie 并将其附加到响应实例：

```php
return Response::make($content)->withCookie('name', 'value');
```

`withCookie` 方法接受额外的可选参数，允许你进一步自定义 cookie 的属性：

```php
->withCookie($name, $value, $minutes, $path, $domain, $secure, $httpOnly)
```

## 其他响应类型

`Response` 门面可用于便捷地生成其他类型的响应实例。

### 视图响应

如果你需要访问 `Response` 类方法，但希望返回视图作为响应内容，你可以使用 `Response::view` 方法以方便使用：

```php
return Response::view('acme.blog::hello')->header('Content-Type', $type);
```

### JSON 响应

`json` 方法将自动将 `Content-Type` 标头设置为 application/json，并使用 `json_encode` PHP 函数将给定的数组转换为 JSON：

```php
return Response::json(['name' => 'Steve', 'state' => 'CA']);
```

如果你想创建 JSONP 响应，可以使用 `json` 方法并结合 `setCallback`：

```php
return Response::json(['name' => 'Steve', 'state' => 'CA'])
    ->setCallback(Input::get('callback'));
```

### 文件下载

`download` 方法可用于生成强制用户浏览器在给定路径（第一个参数）下载文件的响应。`download` 方法可选地接受文件名（第二个参数，将决定用户下载文件时看到的文件名）和一个 HTTP 标头数组（第三个参数）。

```php
return Response::download($pathToFile);

return Response::download($pathToFile, $name, $headers);

return Response::download($pathToFile)->deleteFileAfterSend(true);
```

::: tip
Symfony HttpFoundation 管理文件下载，要求下载的文件具有 ASCII 文件名。
:::

#### 流式下载

在某些情况下，你可能希望将字符串响应转换为可下载的响应，而不必将内容写入磁盘。使用 `streamDownload` 方法来解决此问题，该方法接受回调（第一个参数）、文件名（第二个参数）和可选的标头数组（第三个参数）。

```php
return Response::streamDownload(function() {
    echo 'CSV Contents...';
}, 'export.csv');
```

### 文件响应

`file` 方法用于直接在用户浏览器中显示文件（如图片或 PDF），而不是启动下载。此方法接受文件路径（第一个参数）和标头数组（第二个参数）。

```php
return Response::file($pathToFile);

return Response::file($pathToFile, $headers);
```

## 重定向

重定向响应通常是 `Illuminate\Http\RedirectResponse` 类的实例，包含将用户重定向到另一个 URL 所需的正确标头。生成 `RedirectResponse` 实例的最简单方法是使用 `Redirect` 门面上的 `to` 方法。

```php
return Redirect::to('user/login');
```

### 返回带有闪存数据的重定向

重定向到新 URL 和[将数据闪存到 session](./session.md) 通常同时进行。因此，为了方便，你可以创建 `RedirectResponse` 实例并在单个方法链中将数据闪存到 session：

```php
return Redirect::to('user/login')->with('message', 'Login Failed');
```

::: tip
由于 `with` 方法将数据闪存到 session，你可以使用典型的 `Session::get` 方法检索数据。
:::

#### 重定向到上一个 URL

你可能希望将用户重定向到他们之前的位置，例如在提交表单后。你可以使用 `back` 方法来实现：

```php
return Redirect::back();

return Redirect::back()->withInput();
```

#### 重定向到当前页面

有时你只想简单地刷新当前页面，你可以使用 `refresh` 方法来实现：

```php
return Redirect::refresh();
```

## 响应宏

如果你想定义一个可以在多个路由和控制器中重复使用的自定义响应，可以使用 `Response::macro` 方法：

```php
Response::macro('caps', function($value) {
    return Response::make(strtoupper($value));
});
```

`macro` 函数接受名称作为第一个参数，闭包作为第二个参数。宏的闭包将在 `Response` 类上调用宏名称时执行：

```php
return Response::caps('foo');
```

你可以在[插件注册文件](../extending.md)的 `boot` 方法中定义宏。另外，插件可以在插件目录中提供一个名为 **init.php** 的文件，用于放置宏注册。

## 视图

视图是存储基于系统的表示逻辑的好方法，例如 API 或端点使用的标记，或 CMS 和后台区域共享的标记。视图也被[邮件服务](../system/sending-mail.md)用于提供默认模板内容。视图通常存储在插件的 `views` 目录中。

一个简单的视图可能如下所示：

```twig
<!-- View stored in plugins/acme/blog/views/greeting.htm -->

<html>
    <body>
        <h1>Hello, {{ name }}</h1>
    </body>
</html>
```

视图也可以使用 `.php` 扩展名通过 PHP 模板进行解析：

```php
<!-- View stored in plugins/acme/blog/views/greeting.php -->

<html>
    <body>
        <h1>Hello, <?= $name ?></h1>
    </body>
</html>
```

此视图可以使用 `View::make` 方法返回到浏览器：

```php
return View::make('acme.blog::greeting', ['name' => 'Charlie']);
```

第一个参数是"路径提示"，包含插件名称，用两个冒号 `::` 分隔，后面跟着视图文件名。第二个参数传递给 `View::make` 的是应该提供给视图的数据数组。

::: tip
路径提示区分大小写，插件名称应始终为小写。
:::

#### 向视图传递数据

```php
// 使用常规方法
$view = View::make('acme.blog::greeting')->with('name', 'Steve');

// 使用魔术方法
$view = View::make('acme.blog::greeting')->withName('steve');
```

在上面的示例中，变量 `name` 可以从视图中访问，并且将包含 `Steve`。如上所述，如果你想传递一个数据数组，可以将其作为第二个参数传递给 `make` 方法：

```php
$view = View::make('acme.blog::greeting', $data);
```

也可以在所有视图之间共享一段数据：

```php
View::share('name', 'Steve');
```

#### 将子视图传递给视图

有时你可能希望将一个视图传递到另一个视图中。例如，给定一个存储在 `plugins/acme/blog/views/child/view.php` 的子视图，我们可以这样将其传递给另一个视图：

```php
$view = View::make('acme.blog::greeting')->nest('child', 'acme.blog::child.view');

$view = View::make('acme.blog::greeting')->nest('child', 'acme.blog::child.view', $data);
```

子视图然后可以从父视图中渲染：

```twig
<html>
    <body>
        <h1>Hello!</h1>
        {{ child|raw }}
    </body>
</html>
```

#### 确定视图是否存在

如果你需要检查视图是否存在，请使用 `View::exists` 方法：

```php
if (View::exists('acme.blog::mail.customer')) {
    //
}
```

#### 参见

::: also
* [上传和下载](../../cms/features/upload-download.md)
* [Laravel 响应](https://laravel.com/docs/10.x/responses)
:::
