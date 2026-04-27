# 请求和输入

## 基本输入

你可以使用几个简单的方法访问所有用户输入。使用 `Input` 门面时，你不需要担心请求的 HTTP 动词，因为所有动词的输入访问方式相同。全局 `input` [助手函数](./helpers.md)是 `Input::get` 的别名。

#### 获取输入值

```php
$name = Input::get('name');

$name = input('name');
```

#### 当输入值不存在时获取默认值

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

处理"数组"输入的表单时，你可以使用点表示法访问数组：

```php
$input = Input::get('products.0.name');
```

::: tip
某些 JavaScript 库（如 Backbone）可能会将输入作为 JSON 发送到应用程序。你可以像平常一样通过 `Input::get` 访问此数据。
:::

## Cookies

默认情况下，October CMS 创建的所有 cookie 都经过加密和签名，带有身份验证码，这意味着如果它们被客户端更改，将被视为无效。在 `system.unencrypt_cookies` 配置键中命名的 cookie 将不会被加密。

#### 获取 Cookie 值

```php
$value = Cookie::get('name');
```

#### 将新 Cookie 附加到响应

```php
$response = Response::make('Hello World');

$response->withCookie(Cookie::make('name', 'value', $minutes));
```

#### 将 Cookie 排队以用于下一个响应

如果你想在创建响应之前设置 cookie，请使用 `Cookie::queue` 方法。Cookie 将自动附加到应用程序的最终响应中。

```php
Cookie::queue($name, $value, $minutes);
```

#### 创建永久有效的 Cookie

```php
$cookie = Cookie::forever('name', 'value');
```

#### 处理不加密的 Cookie

如果你不想某些 cookie 被加密或解密，可以在配置中指定它们。例如，当你想通过 cookie 在前端和服务器端后端之间传递数据时，这很有用。

将不应被加密或解密的 cookie 名称添加到 `config/system.php` 配置文件中的 `unencrypt_cookies` 参数中。

```php
'unencrypt_cookies' => [
    'my_cookie',
],
```

另外，对于插件，你也可以从插件的 `Plugin.php` 中动态添加这些。

```php
public function boot()
{
    Config::push('system.unencrypt_cookies', 'my_cookie');
}
```

## 旧输入

你可能需要将一次请求的输入保留到下一次请求。例如，你可能需要在检查验证错误后重新填充表单。

#### 将输入闪存到 Session

```php
Input::flash();
```

#### 仅将部分输入闪存到 Session

```php
Input::flashOnly('username', 'email');

Input::flashExcept('password');
```

由于你经常希望将输入闪存与重定向到上一页结合使用，你可以轻松地将输入闪存链接到重定向上。

```php
return Redirect::to('form')->withInput();

return Redirect::to('form')->withInput(Input::except('password'));
```

::: tip
你可以使用 [Session](./session.md) 类跨请求闪存其他数据。
:::

#### 获取旧数据

获取单个输入值。

```php
Input::old('username');
```

获取所有旧输入值。

```php
$data = Input::old();
```

## 文件

你可以使用 `Input` 门面上的 `file` 方法或全局 `files()` 助手从请求中获取上传的文件。

```php
$file = Input::file('photo');

$file = files('photo');
```

要确定请求中是否存在文件，请使用 `hasFile` 方法。

```php
if (Input::hasFile('photo')) {
    //
}
```

除了检查文件是否存在外，你还可以通过 isValid 方法验证上传文件是否没有问题。

```php
if ($file->isValid()) {
    //
}
```

返回的文件对象具有与上传文件相关的各种方法。

方法名 | 用途
------------- | -------------
**move($destinationPath, $fileName)** | 将上传的文件移动到本地路径
**store($folder, $disk)** | 使用[存储服务](../../extend/services/storage.md)存储文件。
**storeAs($folder, $name, $disk)** | 使用[存储服务](../../extend/services/storage.md)以特定名称存储文件。
**extension()** | 根据文件内容猜测扩展名
**getRealPath()** | 返回本地路径
**getClientOriginalName()** | 返回原始名称
**getClientOriginalExtension()** | 返回原始扩展名
**getSize()** | 返回大小
**getMimeType()** | 返回 MIME 类型

移动上传文件的示例。

```php
$file->move($destinationPath);

$file->move($destinationPath, $fileName);
```

[存储上传文件](./storage.md)到文件夹（第一个参数）和可选磁盘（第二个参数）的示例。

```php
$file->store($folder);

$file->store($folder, 's3');
```

::: warning
文件夹名称 `media`、`resources`、`uploads` 或 `public` 是保留的。
:::

`storeAs` 以自定义磁盘名称（第二个参数）存储文件的示例。`storePubliclyAs` 以公共可见性存储文件。

```php
$file->storeAs($folder, 'avatar');

$file->storeAs($folder, 'avatar', 's3');

$file->storePublicly($folder, 's3');

$file->storePubliclyAs($folder, 'avatar', 's3');
```

获取上传文件路径的示例。

```php
$path = $file->getRealPath();
```

获取上传文件原始名称的示例。

```php
$name = $file->getClientOriginalName();
```

获取上传文件的扩展名。

```php
$extension = $file->getClientOriginalExtension();
```

获取上传文件的大小。

```php
$size = $file->getSize();
```

获取上传文件的 MIME 类型。

```php
$mime = $file->getMimeType();
```

## 请求信息

`Request` 类提供了许多方法来检查应用程序的 HTTP 请求，并扩展了 `Symfony\Component\HttpFoundation\Request` 类。以下是一些亮点。

#### 获取请求 URI

```php
$uri = Request::path();
```

#### 获取请求方法

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

#### 获取请求 URL

```php
$url = Request::url();
```

#### 获取请求 URI 片段

```php
$segment = Request::segment(1);
```

#### 获取请求标头

```php
$value = Request::header('Content-Type');
```

#### 从 $_SERVER 获取值

```php
$value = Request::server('PATH_INFO');
```

#### 确定请求是否通过 HTTPS

```php
if (Request::secure()) {
    //
}
```

#### 确定请求是否使用 AJAX

```php
if (Request::ajax()) {
    //
}
```

#### 确定请求是否具有 JSON 内容类型

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
