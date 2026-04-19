# HTTP-клиент

Класс `Http` предоставляет функции для открытия соединений по протоколу HTTP. Вы можете использовать его для выполнения исходящих соединений к другим приложениям и сервисам. Этот клиент предоставляется фреймворком Laravel, и вы можете узнать обо всех возможных функциях в [документации Laravel](https://laravel.com/docs/10.x/http-client).

## Основы использования

Для выполнения запросов PHP-метод будет соответствовать HTTP-методу, который поддерживает `get`, `post`, `patch`, `put`, `options` и `delete`. Ниже приведён пример базового запроса `GET` к URL. Возвращённый результат будет содержать объект ответа.

```php
$response = Http::get('https://octobercms.com');
```

Вы можете быстро и легко просмотреть содержимое запроса, добавив вызов `dd()` перед вызовом метода. Это выведет содержимое запроса и завершит выполнение.

```php
Http::dd()->get('https://octobercms.com');
```

## Обработка ответа

Объект ответа предоставляет методы, которые можно использовать для проверки ответа.

```php
$result = Http::post('https://octobercms.com');
echo $result->body();                  // Outputs: <html><head><title>...
echo $result->status();                // Outputs: 200
echo $result->header('Content-Type');  // Outputs: text/html; charset=UTF-8
```

Объект поддерживает следующие вызовы методов.

Имя метода | Тип возврата | Назначение
------------- | ------------- | -------------
**body()** | `string` | Получить тело ответа.
**json($key)** | `array|mixed` | Получить JSON-декодированное тело ответа в виде массива или скалярного значения.
**object()** | `object` | Получить JSON-декодированное тело ответа в виде объекта.
**collect($key)** | [Коллекция](./collection.md) | Получить JSON-декодированное тело ответа в виде коллекции.
**status()** | `int` | Получить код статуса ответа.
**ok()** | `bool` | Определить, был ли код ответа «OK».
**successful()** | `bool` | Определить, был ли запрос успешным.
**redirect()** | `bool` | Определить, был ли ответ перенаправлением.
**failed()** | `bool` | Определить, указывает ли ответ на ошибку клиента или сервера.
**serverError()** | `bool` | Определить, указывает ли ответ на ошибку сервера.
**clientError()** | `bool` | Определить, указывает ли ответ на ошибку клиента.
**header($header)** | `string` | Получить заголовок из ответа.
**headers()** | `array` | Получить заголовки из ответа.

## Отправка данных запроса

Методы `post`, `put` и `patch` поддерживают отправку дополнительных данных с запросом. По умолчанию данные отправляются с использованием `application/json` в качестве типа содержимого.

```php
Http::post('https://octobercms.com', [
    'name' => 'Jeff'
]);
```

Чтобы отправить данные с использованием типа содержимого `application/x-www-form-urlencoded`, вызовите метод `asForm` перед выполнением запроса.

```php
Http::asForm()->post('https://octobercms.com', [
    'name' => 'Jeff'
]);
```

При передаче данных в запросе `get` массив будет включён в строку запроса URL.

```php
Http::get('https://octobercms.com', [
    'page' => '1'
]);
```

Метод `withHeaders` может использоваться для включения пользовательских заголовков в запрос.

```php
Http::withHeaders([
    'Rest-Key' => '...'
])->post('https://octobercms.com', [
    'name' => 'Jeff'
]);
```

Метод `withBasicAuth` используется для передачи учётных данных аутентификации с запросом.

```php
Http::withBasicAuth('user', 'password')->post('https://octobercms.com', [
    'name' => 'Jeff'
]);
```

## Обработка ошибок

HTTP-клиент считает все ответы валидными, включая ошибки, поэтому для определения того, произошла ли ошибка, вы должны проверить с помощью методов `successful`, `failed`, `clientError` или `serverError`.

```php
// Status code is >= 200 and < 300
$response->successful();

// Status code is >= 400
$response->failed();

// Response has a 400 level status code
$response->clientError();

// Response has a 500 level status code
$response->serverError();
```

Вы также можете использовать метод `onError` для выполнения callback-функции при возникновении ошибки клиента или сервера.

```php
$response->onError(callable $callback);
```

#### Смотрите также

::: also
* [HTTP-клиент Laravel](https://laravel.com/docs/10.x/http-client)
:::
