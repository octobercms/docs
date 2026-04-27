---
subtitle: Twig-функция
---
# ajaxHandler()

Функция `ajaxHandler()` запускает AJAX-обработчик внутри Twig и подготавливает объект ответа `Cms\Classes\AjaxResponse`. Пример вызова обработчика **onResetPassword**.

```twig
{% set result = ajaxHandler('onResetPassword') %}
```

В результирующем объекте можно ожидать следующие свойства.

Свойство | Данные
------------- | -------------
**data** | данные, установленные или возвращённые обработчиком, также доступны при прямом вызове объекта.
**error** | во время выполнения обработчика произошла ошибка.
**flash** | flash-сообщения, установленные обработчиком.
**redirect** | обработчик вернул перенаправление.

## Доступ к данным

Переменные, назначенные странице, доступны в результирующем объекте. Рассмотрим следующее определение AJAX-обработчика.

```php
function onResetPassword()
{
    $this['someVariable'] = 'someValue';
}
```

Далее пример вызова обработчика **onResetPassword**.

```twig
{% set result = ajaxHandler('onResetPassword') %}
```

Переменные **data**, возвращённые обработчиком или установленные на странице во время вызова обработчика, будут доступны через результирующую переменную.

```twig
{{ result.someVariable }}
```

## Использование ответов

При [создании API в вашей теме](../../cms/resources/building-apis.md) ответ можно передать непосредственно в [Twig-функцию](./response.md) `response()`.

```twig
{% do response(ajaxHandler('onResetPassword')) %}
```

При возврате в качестве ответа данные будут доступны в JSON как свойство **data**.

```json
{
    "data": {}
}
```

Переменные страницы не включаются в ответ по соображениям безопасности. Вызовите метод `withPageVars`, чтобы включить их в ответ.

```twig
{% do response(ajaxHandler('onResetPassword').withPageVars()) %}
```

Метод `withVars` может использоваться для включения дополнительных данных в ответ.

```twig
{% do response(ajaxHandler('onResetPassword').withVars({ 'token': 'foobar' })) %}
```

## Обработка ошибок

Если во время выполнения обработчика возникает исключение, сообщение об ошибке будет доступно в свойстве **error.message**. Если ошибка является `ValidationException`, невалидные поля можно найти в свойстве **error.fields**.

```twig
{% if result.error %}
    An error occurred: {{ result.error.message }}
{% endif %}
```

Если возникает исключение, информация об ошибке будет доступна как свойство **error**.

```json
{
    "error": {
        "message": "An error occurred"
    }
}
```

При возврате ответа из AJAX-обработчика для типа исключения используются следующие коды состояния.

Исключение | Код состояния
------------- | -------------
`ValidationException` | 422 Unprocessable Entity
`ApplicationException` | 400 Bad Request
`Exception` | 500 Internal Server Error

## Обработка перенаправлений

Если AJAX-обработчик вызвал перенаправление, оно будет доступно в свойстве **redirect** и может быть возвращено напрямую. Например

```php
function onRedirect()
{
    return Redirect::to('https://octobercms.com');
}
```

Следующий код выполнит перенаправление в браузере в качестве ответа.

```twig
{% do response(ajaxHandler('onTest')) %}
```

Объект содержит сообщения **redirect** наряду с данными.

```json
{
    "data": {},
    "redirect": "https://octobercms.com"
}
```

## Обработка flash-сообщений

Если были использованы flash-сообщения, они будут доступны в свойстве **flash**. Рассмотрим следующий обработчик в качестве примера.

```php
function onTest()
{
    Flash::success('Test successful');
}
```

Вызов обработчика и отправка в качестве ответа.

```twig
{% do response(ajaxHandler('onTest')) %}
```

Вывод содержит **flash**-сообщения наряду с данными.

```json
{
    "data": {},
    "flash": {
        "success": "Test successful"
    }
}
```

#### См. также

::: also
* [Создание API-ресурсов](../../cms/resources/building-apis.md)
:::
