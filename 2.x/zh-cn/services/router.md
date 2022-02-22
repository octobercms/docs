# 路由

## 基本路由

虽然为 [后端控制器](../backend/controllers-ajax.md) 自动处理路由，但 CMS 页面在其 [页面配置](../cms/pages.md#oc-configuration) 中定义了自己的 URL 路由， 路由器服务主要用于定义固定的 API 和端点。

您可以通过在与 [插件注册文件](../plugin/registration.md) 相同的目录中创建一个名为 **routes.php** 的文件来定义这些路由。 最基本的路由只接受一个 URI 和一个`闭包`：

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

#### 注册多个动态的路由

有时您可能需要注册一个响应多个 HTTP 动态的路由。 你可以使用 `Route` 外观上的 `match` 方法来做到这一点：

```php
Route::match(['get', 'post'], '/', function () {
    return 'Hello World';
});
```

您甚至可以使用 `any` 方法注册响应所有 HTTP 动态的路由：

```php
Route::any('foo', function () {
    return 'Hello World';
});
```

#### 生成路由的 URL

你可以使用 `Url` 门面为你的路由生成 URL：

```php
$url = Url::to('foo');
```

## 路由参数

### 必需参数

有时您需要在路由中捕获 URI 的片段，例如，您可能需要从 URL 中捕获用户的 ID。 您可以通过定义路由参数来做到这一点：

```php
Route::get('user/{id}', function ($id) {
    return 'User '.$id;
});
```

您可以根据路由的需要定义任意数量的路由参数：

```php
Route::get('posts/{post}/comments/{comment}', function ($postId, $commentId) {
    //
});
```

路由参数始终包含在单个*大括号*中。 执行路由时，参数将被传递到路由器的`闭包`中。

> **注意**：路由参数不能包含 `-` 字符。 请改用下划线 (`_`)。

### 可选参数

有时您可能需要指定一个路由参数，但该路由参数的存在是可选的。 您可以通过在参数名称后放置一个 `?` 标记来做到这一点：

```php
Route::get('user/{name?}', function ($name = null) {
    return $name;
});

Route::get('user/{name?}', function ($name = 'John') {
    return $name;
});
```

### 正则表达式约束

您可以使用路由实例上的 `where` 方法来限制路由参数的格式。 `where` 方法接受参数的名称和定义如何约束参数的正则表达式：

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

命名路由允许您为特定路由方便地生成 URL 或重定向。 在定义路由时，您可以使用 `as` 数组键为路由指定名称：

```php
Route::get('user/profile', ['as' => 'profile', function () {
    //
}]);
```

#### 路由分组和命名路由

如果您使用 [路由分组](#route-groups)，您可以在路由组属性数组中指定一个 `as` 关键字，允许您为组内的所有路由设置一个通用的路由名称前缀：

```php
Route::group(['as' => 'admin::'], function () {
    Route::get('dashboard', ['as' => 'dashboard', function () {
        // Route named "admin::dashboard"
    }]);
});
```

#### 生成命名路由的 URL

为给定路由指定名称后，您可以在通过 `Url::route` 方法生成 URL 或重定向时使用路由名称：

```php
$url = Url::route('profile');

$redirect = Response::redirect()->route('profile');
```

如果路由定义了参数，您可以将参数作为第二个参数传递给 `route` 方法。 给定的参数将自动插入到 URL 中：

```php
Route::get('user/{id}/profile', ['as' => 'profile', function ($id) {
    //
}]);

$url = Url::route('profile', ['id' => 1]);
```

## 路由组

路由组允许您在大量路由之间共享路由属性，而无需在每个单独的路由上定义这些属性。 共享属性以数组格式指定为 `Route::group` 方法的第一个参数。

### 子域路由

路由组也可用于路由通配符子域。 子域可以像路由 URI 一样被分配路由参数，允许您捕获子域的一部分以在路由或控制器中使用。 可以使用组属性数组上的 `domain` 键指定子域：

```php
Route::group(['domain' => '{account}.example.com'], function () {
    Route::get('user/{id}', function ($account, $id) {
        //
    });
});
```

### 路由前缀

`prefix` 组数组属性可用于为组中的每个路由添加给定 URI 的前缀。 例如，您可能希望在组内的所有路由 URI 前加上 `admin`：

```php
Route::group(['prefix' => 'admin'], function () {
    Route::get('users', function () {
        // Matches The "/admin/users" URL
    });
});
```

您还可以使用 `prefix` 参数为分组路由指定常用参数：

```php
Route::group(['prefix' => 'accounts/{account_id}'], function () {
    Route::get('detail', function ($account_id) {
        // Matches The accounts/{account_id}/detail URL
    });
});
```

### 路由中间件

在插件的 `boot()` 方法中注册中间件将为每个请求全局注册它。
如果您想一次将中间件注册到一个路由，您应该这样做：

```php
Route::get('info', 'Acme\News@info')->middleware('Path\To\Your\Middleware');
```

对于路由组，可以这样做：

```php
Route::group(['middleware' => 'Path\To\Your\Middleware'], function() {
    Route::get('info', 'Acme\News@info');
});
```

最后，如果你想将一组中间件分配给一个路由，你可以像这样

```php
Route::middleware(['Path\To\Your\Middleware'])->group(function() {
    Route::get('info', 'Acme\News@info');
});
```

当然，您可以在一个组中添加多个中间件，为方便起见，在上面的示例中只使用了一个。

## 抛出 404 错误

有两种方法可以从路由中手动触发 404 错误。 首先，您可以使用 `abort` 助手。 `abort` 助手简单地抛出一个带有指定状态码的 `Symfony\Component\HttpFoundation\Exception\HttpException`：

```php
App::abort(404);
```

其次，你可以手动抛出一个 `Symfony\Component\HttpKernel\Exception\NotFoundHttpException` 的实例。

有关处理 404 异常和对这些错误使用自定义响应的更多信息，请参阅文档的 [错误和日志](../services/error-log) 部分。