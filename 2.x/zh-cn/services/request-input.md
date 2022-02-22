# 请求和输入

## 基本输入

您可以通过一些简单的方法访问所有用户输入。 使用 `Input` 外观时，您无需担心请求的 HTTP 谓词，因为所有谓词都以相同的方式访问输入。 全局 `input` [助手函数](../services/helpers.md) 是 `Input::get` 的别名。 `Input::get`.

#### 检索输入值

```php
$name = Input::get('name');
```

#### 如果输入值不存在，则检索默认值

```php
$name = Input::get('name', 'Sally');
```

#### 确定输入值是否存在

```php
if (Input::has('name')) {
    //
}
```

#### 获取请求的所有输入 

```php
$input = Input::all();
```

#### 仅获取部分请求输入

```php
$input = Input::only('username', 'password');

$input = Input::except('credit_card');
```

在处理带有"array" 输入的表单时，您可以使用点符号来访问数组：

```php
$input = Input::get('products.0.name');
```

> **注意**: 某些 JavaScript 库(例如 Backbone)可能会将输入作为 JSON 发送到应用程序。 您可以像往常一样通过 `Input::get` 访问这些数据。

## Cookies

默认情况下，October CMS 创建的所有 cookie 都经过加密并使用身份验证代码签名，这意味着如果它们被客户端更改，它们将被视为无效。 在 `system.unencrypt_cookies` 配置键中命名的 cookie 不会被加密。

#### 检索 Cookie 值 

```php
$value = Cookie::get('name');
```

#### 将新 Cookie 附加到响应

```php
$response = Response::make('Hello World');

$response->withCookie(Cookie::make('name', 'value', $minutes));
```

#### 为下一个响应排队 Cookie

如果您想在创建响应之前设置 cookie，请使用 `Cookie::queue` 方法。 cookie 将自动附加到您的应用程序的最终响应中。

```php
Cookie::queue($name, $value, $minutes);
```

#### 创建一个永远存在的 Cookie

```php
$cookie = Cookie::forever('name', 'value');
```

#### 不加密处理 Cookie

如果您不希望某些 cookie 被加密或解密，您可以在配置中指定它们。这很有用，例如，当您想通过 cookie 将数据从前端传递到服务器端后端时，反之亦然

在 `config/system.php` 配置文件中的 `unencrypt_cookies` 参数中添加不应加密或解密的 cookie 名称。

```php
'unencrypt_cookies' => [
    'my_cookie',
],
```

或者，对于插件，您也可以从插件的`Plugin.php`动态添加这些。 

```php
public function boot()
{
    Config::push('system.unencrypt_cookies', 'my_cookie');
}
```

## 旧的输入

您可能需要保留一个请求的输入，直到下一个请求。 例如，您可能需要在检查表单是否存在验证错误后重新填充表单。

#### 将输入数据闪存到Session
```php
Input::flash();
```

#### 仅闪存Session的某一个值

```php
Input::flashOnly('username', 'email');

Input::flashExcept('password');
```

由于您经常希望将闪存变量与重定向到上一页相关联，因此您可以轻松地将变量闪存到重定向。

```php
return Redirect::to('form')->withInput();

return Redirect::to('form')->withInput(Input::except('password'));
```

> **注意**:您可以使用 [Session](../services/session.md) 类在请求中刷新其他数据。.

#### 检索旧数据

```php
Input::old('username');
```

## 文件

#### 检索上传的文件

```php
$file = Input::file('photo');
```

#### 确定文件是否已上传

```php
if (Input::hasFile('photo')) {
    //
}
```

file` 方法返回的对象是 `Symfony\Component\HttpFoundation\File\UploadedFile` 类的一个实例，它扩展了 PHP 的 `SplFileInfo` 类并提供了多种与文件交互的方法。

#### 确定上传的文件是否有效

```php
if (Input::file('photo')->isValid()) {
    //
}
```

#### 移动上传的文件

```php
Input::file('photo')->move($destinationPath);

Input::file('photo')->move($destinationPath, $fileName);
```

#### 检索上传文件的路径

```php
$path = Input::file('photo')->getRealPath();
```

#### 检索上传文件的原始名称

```php
$name = Input::file('photo')->getClientOriginalName();
```

#### 检索上传文件的扩展名

```php
$extension = Input::file('photo')->getClientOriginalExtension();
```

#### 检索上传文件的大小

```php
$size = Input::file('photo')->getSize();
```

#### 检索上传文件的 MIME 类型

```php
$mime = Input::file('photo')->getMimeType();
```

## 请求信息

`Request` 类提供了许多检查应用程序 HTTP 请求的方法，并扩展了 `Symfony\Component\HttpFoundation\Request` 类。这儿是一些精彩片段。

#### 检索请求 URI

```php
$uri = Request::path();
```

#### 检索请求方法

```php
$method = Request::method();

if (Request::isMethod('post')) {
    //
}
```

#### 确定请求路径是否匹配模式

```php
if (Request::is('admin/*')) {
    //
}
```

#### 获取请求地址

```php
$url = Request::url();
```

#### 检索请求 URI 

```php
$segment = Request::segment(1);
```

#### 检索请求标头

```php
$value = Request::header('Content-Type');
```

#### 从 $_SERVER 检索值

```php
$value = Request::server('PATH_INFO');
```

#### 确定请求是否通过 HTTPS

```php
if (Request::secure()) {
    //
}
```

#### 判断请求是否使用 AJAX

```php
if (Request::ajax()) {
    //
}
```

#### 判断请求是否有 JSON 内容类型

```php
if (Request::isJson()) {
    //
}
```

#### 确定请求是否请求 JSON

```php
if (Request::wantsJson()) {
    //
}
```

#### 检查请求的响应格式

`Request::format` 方法将根据 HTTP Accept 标头返回请求的响应格式：

```php
if (Request::format() == 'json') {
    //
}
```
