---
subtitle: Полезно для определения фиксированных API и эндпоинтов.
---
# Маршрутизация и Middleware

В то время как маршрутизация автоматически обрабатывается для [контроллеров панели управления](../system/controllers.md), а CMS-страницы определяют свои собственные URL-маршруты в [конфигурации страницы](../../cms/themes/pages.md). Плагины также могут предоставлять файл **routes.php**, содержащий пользовательскую логику маршрутизации, как определено в [сервисе маршрутизации Laravel](https://laravel.com/docs/10.x/routing).

::: dir
├── plugins
|   └── acme  _← Имя автора_
|       └── blog  _← Имя плагина_
|           ├── controllers
|           ├── models
|           ├── Plugin.php
|           └── `routes.php`  _← Файл маршрутов_
:::

При таком подходе маршруты определяются в PHP с использованием фасада `Route`. Ниже приведён пример маршрута, доступного по адресу **https://yoursite.tld/api_acme_blog/cleanup_posts** через GET-запрос.

```php
Route::get('api_acme_blog/cleanup_posts', function() {
    return Posts::cleanUp();
});
```

Вы можете генерировать URL к вашим маршрутам с помощью фасада `Url`.

```php
$url = Url::to('api_acme_blog/cleanup_posts');
```

## Базовая маршрутизация

Для определения маршрутов PHP-метод будет соответствовать HTTP-методу: поддерживаются `get`, `post`, `patch`, `put`, `options` и `delete`. Самые базовые маршруты просто принимают URI и `Closure`.

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

### Регистрация нескольких методов

Иногда вам может потребоваться зарегистрировать маршрут, отвечающий на несколько HTTP-методов. Вы можете сделать это с помощью метода `match`.

```php
Route::match(['get', 'post'], '/', function () {
    return 'Hello World';
});
```

Вы даже можете зарегистрировать маршрут, отвечающий на все HTTP-методы, с помощью метода `any`.

```php
Route::any('foo', function () {
    return 'Hello World';
});
```

## Маршрутизация к классу

Для более крупных приложений предпочтительнее организовывать маршруты внутри классов вместо замыканий. Лучшее место для этих классов — директория **handlers**. Маршрут может быть указан как массив, принимающий имя класса и имя метода. В этом примере маршрут `/install` сопоставлен с классом `Installer` и методом `install`.

```php
Route::any('/install', [Installer::class, 'install']);
```

Далее определите класс и маршрут внутри. В этом примере файл расположен в **app/handlers/Installer.php**.

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

## Параметры маршрута

Для захвата сегментов URI вы можете определить параметры маршрута. Например, захват ID пользователя из URL.

```php
Route::get('user/{id}', function ($id) {
    return 'User '.$id;
});
```

Вы можете определить столько параметров маршрута, сколько требуется.

```php
Route::get('posts/{post}/comments/{comment}', function ($postId, $commentId) {
    //
});
```

Параметры маршрута всегда заключаются в одинарные фигурные скобки. Параметры будут переданы в `Closure` вашего маршрута при выполнении маршрута.

::: warning
Параметры маршрута не могут содержать символ `-`, используйте подчёркивание (`_`) вместо него.
:::

### Необязательные параметры

Иногда вам может потребоваться указать параметр маршрута, но сделать его присутствие необязательным. Вы можете сделать это, поставив знак `?` после имени параметра:

```php
Route::get('user/{name?}', function ($name = null) {
    return $name;
});

Route::get('user/{name?}', function ($name = 'John') {
    return $name;
});
```

### Ограничения регулярными выражениями

Вы можете ограничить формат параметров маршрута с помощью метода `where` на экземпляре маршрута. Метод `where` принимает имя параметра и регулярное выражение, определяющее, как параметр должен быть ограничен.

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

## Именованные маршруты

Именованные маршруты позволяют удобно генерировать URL или перенаправления для определённого маршрута. Вы можете указать имя маршрута с помощью ключа массива `as` при определении маршрута:

```php
Route::get('user/profile', ['as' => 'profile', function () {
    //
}]);
```

#### Группы маршрутов и именованные маршруты

При использовании групп маршрутов (ниже) вы можете указать ключ `as` в массиве атрибутов группы маршрутов, позволяя установить общий префикс имени маршрута для всех маршрутов в группе:

```php
Route::group(['as' => 'admin::'], function () {
    Route::get('dashboard', ['as' => 'dashboard', function () {
        // Route named "admin::dashboard"
    }]);
});
```

#### Генерация URL к именованным маршрутам

После присвоения имени маршруту вы можете использовать имя маршрута при генерации URL или перенаправлений через метод `Url::route`:

```php
$url = Url::route('profile');

$redirect = Response::redirect()->route('profile');
```

Если маршрут определяет параметры, вы можете передать параметры вторым аргументом метода `route`. Переданные параметры будут автоматически вставлены в URL:

```php
Route::get('user/{id}/profile', ['as' => 'profile', function ($id) {
    //
}]);

$url = Url::route('profile', ['id' => 1]);
```

## Группы маршрутов

Группы маршрутов позволяют разделять атрибуты маршрутов между большим количеством маршрутов без необходимости определять эти атрибуты для каждого отдельного маршрута. Общие атрибуты указываются в формате массива как первый параметр метода `Route::group`.

### Маршрутизация по поддоменам

Группы маршрутов также могут использоваться для маршрутизации по поддоменам с подстановочными знаками. Поддоменам могут быть назначены параметры маршрута так же, как URI маршрутов, что позволяет захватывать часть поддомена для использования в маршруте или контроллере. Поддомен может быть указан с помощью ключа `domain` в массиве атрибутов группы:

```php
Route::group(['domain' => '{account}.example.tld'], function () {
    Route::get('user/{id}', function ($account, $id) {
        //
    });
});
```

### Префиксы маршрутов

Атрибут массива группы `prefix` может использоваться для добавления префикса к каждому маршруту в группе. Например, вы можете захотеть добавить префикс `admin` ко всем URI маршрутов в группе:

```php
Route::group(['prefix' => 'admin'], function () {
    Route::get('users', function () {
        // Matches The "/admin/users" URL
    });
});
```

Вы также можете использовать параметр `prefix` для указания общих параметров для сгруппированных маршрутов:

```php
Route::group(['prefix' => 'accounts/{account_id}'], function () {
    Route::get('detail', function ($account_id) {
        // Matches The accounts/{account_id}/detail URL
    });
});
```

### Middleware маршрутов

Регистрация middleware в методе `boot()` вашего плагина зарегистрирует его глобально для каждого запроса.
Если вы хотите зарегистрировать middleware для одного маршрута, сделайте это так:

```php
Route::get('info', [\App\News::class, 'info'])->middleware(\Path\To\Your\Middleware::class);
```

Для групп маршрутов это можно сделать так:

```php
Route::group(['middleware' => \Path\To\Your\Middleware::class], function() {
    Route::get('info', [\App\News::class, 'info']);
});
```

И наконец, если вы хотите назначить группу middleware только одному маршруту, вы можете сделать это так:

```php
Route::middleware([\Path\To\Your\Middleware::class])->group(function() {
    Route::get('info', [\App\News::class, 'info']);
});
```

::: tip
Вы можете добавить более одного middleware в группу, в приведённых примерах используется только один для удобства.
:::

## Глобальный Middleware

Для регистрации глобального middleware вы можете расширить класс контроллера `Cms\Classes\CmsController` или `Backend\Classes\BackendController` следующим методом.

```php
public function boot()
{
    \Cms\Classes\CmsController::extend(function($controller) {
        $controller->middleware(\App\Middleware::class);
    });
}
```

Альтернативно можно добавить его напрямую в Kernel через метод регистрации `boot()`.

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

## Генерация ошибок 404

Есть два способа вручную вызвать ошибку 404 из маршрута. Во-первых, вы можете использовать хелпер `abort`. Хелпер `abort` просто выбрасывает `Symfony\Component\HttpFoundation\Exception\HttpException` с указанным кодом состояния.

```php
App::abort(404);
```

Вы также можете вручную выбросить экземпляр `October\Rain\Exception\NotFoundException`. Более подробная информация об обработке исключений 404 и использовании пользовательских ответов для этих ошибок находится в разделе [ошибки и журналирование](../system/exceptions.md) документации.

#### См. также

::: also
* [Маршрутизация Laravel](https://laravel.com/docs/10.x/routing)
* [Eloquent API Resources](https://laravel.com/docs/10.x/eloquent-resources)
:::
