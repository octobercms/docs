# Роутинг (маршрутизация)

<a href="#basic-routing" name="basic-routing" class="anchor"></a>
## Простейшая маршрутизация

Вы можете указать произвольные маршруты в файле **routes.php** в папке с плагином. Простейший роут состоит из URI (урла, пути) и функции-замыкания (она же коллбек):

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

#### Регистрация роута для нескольких методов

    Route::match(['get', 'post'], '/', function () {
        return 'Hello World';
    });

Регистрация роута для любого типа HTTP-запроса:

    Route::any('foo', function () {
        return 'Hello World';
    });

#### Генерация URL

Используйте метод `to`, чтобы сгенерировать URL:

    $url = Url::to('foo');

<a href="#route-parameters" name="route-parameters" class="anchor"></a>
## Параметры роутов

<a href="#required-parameters" name="required-parameters" class="anchor"></a>
### Обязательные параметры

Вы можете использовать параметры, чтобы передать произвольное значение. Например `id` пользователя:

    Route::get('user/{id}', function ($id) {
        return 'User '.$id;
    });

Вы можете использовать столько параметров, сколько нужно:

    Route::get('posts/{post}/comments/{comment}', function ($postId, $commentId) {
        //
    });

> **Примечание:** Используйте `_` в названиях параметров.

<a href="#parameters-optional-parameters" name="parameters-optional-parameters" class="anchor"></a>
### Необязательные параметры

Вы можете использоватьзнак вопроса `?`, чтобы сделать параметр необязательным. Пример:

    Route::get('user/{name?}', function ($name = null) {
        return $name;
    });

    Route::get('user/{name?}', function ($name = 'John') {
        return $name;
    });

<a href="#parameters-regular-expression-constraints" name="parameters-regular-expression-constraints" class="anchor"></a>
### Параметры с регулярными выражениями

Вы можете использовать метод `where`, чтобы наложить ограничения на параметр:

    Route::get('user/{name}', function ($name) {
        //
    })->where('name', '[A-Za-z]+');

    Route::get('user/{id}', function ($id) {
        //
    })->where('id', '[0-9]+');

    Route::get('user/{id}/{name}', function ($id, $name) {
        //
    })->where(['id' => '[0-9]+', 'name' => '[a-z]+']);

<a href="#named-routes" name="named-routes" class="anchor"></a>
## Именованные роуты

Присваивая имена роутам вы можете сделать обращение к ним (при генерации URL во вьюхах (views) или переадресациях) более удобным. Вы можете задать имя роуту таким образом:

    Route::get('user/profile', ['as' => 'profile', function () {
        //
    }]);

#### Группы роутов и именованные роуты

Вы можете использовать `as`, чтобы задать префикс для всех маршрутов в группе:

    Route::group(['as' => 'admin::'], function () {
        Route::get('dashboard', ['as' => 'dashboard', function () {
            // Route named "admin::dashboard"
        }]);
    });

#### Генерация URL

Пример редиректа:

    $url = Url::route('profile');

    $redirect = Response::redirect()->route('profile');

Пример генерации:

    Route::get('user/{id}/profile', ['as' => 'profile', function ($id) {
        //
    }]);

    $url = Url::route('profile', ['id' => 1]);

<a href="#route-groups" name="route-groups" class="anchor"></a>
## Группы роутов

Вы можете сгруппировать маршруты, чтобы применить различны фильтры сразу к нескольким роутам:

    Route::group(array('before' => 'auth'), function()
    {
        Route::get('/', function()
        {
            // К этому маршруту будет привязан фильтр auth.
        });

        Route::get('user/profile', function()
        {
            // К этому маршруту также будет привязан фильтр auth.
        });
    });

<a href="#route-group-sub-domain-routing" name="route-group-sub-domain-routing" class="anchor"></a>
### Доменная маршрутизация

В OctoberCMS роуты способны работать и с поддоменами по их маске и передавать в Ваш обработчик параметры из шаблона.

    Route::group(['domain' => '{account}.example.com'], function () {
        Route::get('user/{id}', function ($account, $id) {
            //
        });
    });

<a href="#route-group-prefixes" name="route-group-prefixes" class="anchor"></a>
### Префикс пути


Группа роутов может быть зарегистрирована с одним префиксом без его явного указания с помощью ключа prefix в параметрах группы. Пример:

    Route::group(['prefix' => 'admin'], function () {
        Route::get('users', function () {
            // Matches The "/admin/users" URL
        });
    });

Вы также можете использовать параметры:

    Route::group(['prefix' => 'accounts/{account_id}'], function () {
        Route::get('detail', function ($account_id) {
            // Matches The accounts/{account_id}/detail URL
        });
    });

<a href="#throwing-404-errors" name="throwing-404-errors" class="anchor"></a>
## Ошибки 404

Существует два способа вызвать исключение 404 (Not Found) из маршрута. Первый - методом `abort`:

    App::abort(404);

Второй - бросив исключение класса или потомка класса  `Symfony\Component\HttpKernel\Exception\NotFoundHttpException`.

Больше информации о том, как обрабатывать исключения 404 и отправлять собственный ответ на такой запрос содержится в разделе об [ошибках](../services/error-log).
