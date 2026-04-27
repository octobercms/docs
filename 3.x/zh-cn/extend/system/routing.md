---
subtitle: 用于定义固定的 API 和端点。
---
# 路由与中间件

路由对于[后端控制器](../system/controllers.md)是自动处理的，CMS 页面在其[页面配置](../../cms/themes/pages.md)中定义自己的 URL 路由。插件也可以提供一个名为 **routes.php** 的文件，其中包含自定义路由逻辑，如 [Laravel 路由服务](https://laravel.com/docs/10.x/routing)中所定义的。

::: dir
├── plugins
|   └── acme  _← 作者名称_
|       └── blog  _← 插件名称_
|           ├── controllers
|           ├── models
|           ├── Plugin.php
|           └── `routes.php`  _← 路由文件_
:::

使用这种方式，路由在 PHP 中使用 `Route` 门面定义。以下是一个通过 GET 请求访问 **https://yoursite.tld/api_acme_blog/cleanup_posts** 的路由示例。

```php
Route::get('api_acme_blog/cleanup_posts', function() {
    return Posts::cleanUp();
});
```

你可以使用 `Url` 门面生成路由的 URL。

```php
$url = Url::to('api_acme_blog/cleanup_posts');
```

## 基本路由

要定义路由，PHP 方法将关联到 HTTP 方法，支持 `get`、`post`、`patch`、`put`、`options` 和 `delete`。最基本的路由只需接受一个 URI 和一个 `Closure`。

```php
Route::get('/', function () {
    return 'Hello World';
});

Route::post('foo/bar', function () {
    return 'Hello World';
});

Route::put('foo/bar', function () {
    //
});

Route::delete('foo/bar', function () {
    //
});
```

### 注册多个方法

有时你可能需要注册一个响应多个 HTTP 方法的路由。你可以使用 `match` 方法来实现。

```php
Route::match(['get', 'post'], '/', function () {
    return 'Hello World';
});
```

你甚至可以使用 `any` 方法注册一个响应所有 HTTP 方法的路由。

```php
Route::any('foo', function () {
    return 'Hello World';
});
```

## 路由到类

对于较大的应用程序，最好将路由组织到类中而不是闭包中。最适合放置这些类的位置是 **handlers** 目录。路由可以作为数组引用，包含类名和方法名。在此示例中，`/install` 路由映射到 `Installer` 类和 `install` 方法。

```php
Route::any('/install', [Installer::class, 'install']);
```

接下来，定义类和路由。在此示例中，文件位于 **app/handlers/Installer.php**。

```php
namespace App\Handlers;

class Installer extends \Illuminate\Routing\Controller
{
    /**
     * Route: /install
     */
    public function install()
    {
        return 'Welcome!';
    }
}
```

## 路由参数

要在路由中捕获 URI 的片段，你可以通过定义路由参数来实现。例如，从 URL 中捕获用户的 ID。

```php
Route::get('user/{id}', function ($id) {
    return 'User '.$id;
});
```

你可以根据路由的需要定义任意多的路由参数。

```php
Route::get('posts/{post}/comments/{comment}', function ($postId, $commentId) {
    //
});
```

路由参数始终包裹在单花括号中。当路由执行时，参数将传递到路由的 `Closure` 中。

::: warning
路由参数不能包含 `-` 字符，请使用下划线（`_`）代替。
:::

### 可选参数

有时你可能需要指定一个路由参数，但使该路由参数的存在是可选的。你可以通过在参数名后面放置 `?` 标记来实现：

```php
Route::get('user/{name?}', function ($name = null) {
    return $name;
});

Route::get('user/{name?}', function ($name = 'John') {
    return $name;
});
```

### 正则表达式约束

你可以使用路由实例上的 `where` 方法来约束路由参数的格式。`where` 方法接受参数名称和定义参数应如何约束的正则表达式。

```php
Route::get('user/{name}', function ($name) {
    //
})->where('name', '[A-Za-z]+');

Route::get('user/{id}', function ($id) {
    //
})->where('id', '[0-9]+');

Route::get('user/{id}/{name}', function ($id, $name) {
    //
})->where(['id' => '[0-9]+', 'name' => '[a-z]+']);
```

## 命名路由

命名路由允许你方便地为特定路由生成 URL 或重定向。你可以在定义路由时使用 `as` 数组键为路由指定名称：

```php
Route::get('user/profile', ['as' => 'profile', function () {
    //
}]);
```

#### 路由组与命名路由

如果你正在使用路由组（见下文），你可以在路由组属性数组中指定 `as` 关键字，允许你为组内所有路由设置公共路由名称前缀：

```php
Route::group(['as' => 'admin::'], function () {
    Route::get('dashboard', ['as' => 'dashboard', function () {
        // Route named "admin::dashboard"
    }]);
});
```

#### 生成命名路由的 URL

一旦你为给定路由分配了名称，你可以通过 `Url::route` 方法在生成 URL 或重定向时使用路由名称：

```php
$url = Url::route('profile');

$redirect = Response::redirect()->route('profile');
```

如果路由定义了参数，你可以将参数作为第二个参数传递给 `route` 方法。给定的参数将自动插入到 URL 中：

```php
Route::get('user/{id}/profile', ['as' => 'profile', function ($id) {
    //
}]);

$url = Url::route('profile', ['id' => 1]);
```

## 路由组

路由组允许你在大量路由之间共享路由属性，而无需在每个单独的路由上定义这些属性。共享属性以数组格式指定为 `Route::group` 方法的第一个参数。

### 子域名路由

路由组也可用于路由通配符子域名。子域名可以像路由 URI 一样分配路由参数，允许你捕获子域名的一部分以在路由或控制器中使用。子域名可以使用组属性数组上的 `domain` 键来指定：

```php
Route::group(['domain' => '{account}.example.tld'], function () {
    Route::get('user/{id}', function ($account, $id) {
        //
    });
});
```

### 路由前缀

`prefix` 组数组属性可用于为组中的每个路由添加给定 URI 前缀。例如，你可能希望为组内所有路由 URI 添加 `admin` 前缀：

```php
Route::group(['prefix' => 'admin'], function () {
    Route::get('users', function () {
        // Matches The "/admin/users" URL
    });
});
```

你也可以使用 `prefix` 参数为分组路由指定公共参数：

```php
Route::group(['prefix' => 'accounts/{account_id}'], function () {
    Route::get('detail', function ($account_id) {
        // Matches The accounts/{account_id}/detail URL
    });
});
```

### 路由中间件

在插件的 `boot()` 方法中注册中间件将为每个请求全局注册它。
如果你希望一次为一个路由注册中间件，应该这样做：

```php
Route::get('info', [\App\News::class, 'info'])->middleware(\Path\To\Your\Middleware::class);
```

对于路由组，可以这样做：

```php
Route::group(['middleware' => \Path\To\Your\Middleware::class], function() {
    Route::get('info', [\App\News::class, 'info']);
});
```

最后，如果你想将一组中间件分配给单个路由，可以这样做：

```php
Route::middleware([\Path\To\Your\Middleware::class])->group(function() {
    Route::get('info', [\App\News::class, 'info']);
});
```

::: tip
你可以在一个组中添加多个中间件，上面的示例中为了方便只使用了一个。
:::

## 全局中间件

要注册全局中间件，你可以使用以下方法扩展 `Cms\Classes\CmsController` 或 `Backend\Classes\BackendController` 控制器类。

```php
public function boot()
{
    \Cms\Classes\CmsController::extend(function($controller) {
        $controller->middleware(\App\Middleware::class);
    });
}
```

或者，你可以通过 `boot()` 注册方法将其直接推入 Kernel。

```php
public function boot()
{
    // Add a new middleware to beginning of the stack.
    $this->app[\Illuminate\Contracts\Http\Kernel::class]
        ->prependMiddleware(\App\Middleware::class);

    // Add a new middleware to end of the stack.
    $this->app[\Illuminate\Contracts\Http\Kernel::class]
        ->pushMiddleware(\App\Middleware::class);
}
```

## 抛出 404 错误

有两种方式可以从路由手动触发 404 错误。第一种，你可以使用 `abort` 辅助函数。`abort` 辅助函数只是抛出一个带有指定状态码的 `Symfony\Component\HttpFoundation\Exception\HttpException`。

```php
App::abort(404);
```

你也可以手动抛出 `October\Rain\Exception\NotFoundException` 的实例。有关处理 404 异常和为这些错误使用自定义响应的更多信息，请参阅文档的[错误与日志](../system/exceptions.md)部分。

#### 另请参阅

::: also
* [Laravel 路由](https://laravel.com/docs/10.x/routing)
* [Eloquent API 资源](https://laravel.com/docs/10.x/eloquent-resources)
:::
