---
subtitle: Узнайте больше о дополнительных возможностях AJAX фреймворка.
---
# Дополнительные возможности

При использовании AJAX фреймворка у вас есть возможность указать суффикс **extras**, который подключит дополнительные файлы CSS и JS. Эти дополнительные функции полезны при работе с AJAX на фронтенде.

```twig
{% framework extras %}
```

## Индикатор загрузки

Первая функция, на которую следует обратить внимание, — это индикатор загрузки, который отображается в верхней части страницы при выполнении AJAX запроса. Индикатор подключается к глобальным событиям, используемым [JavaScript фреймворком AJAX](./javascript-api.md).

Когда запускается запрос AJAX, срабатывает событие ajaxPromise, которое отображает индикатор и переводит курсор мыши в состояние загрузки. События `ajaxFail` и `ajaxDone` используются для определения момента завершения запроса, когда индикатор снова скрывается.

## Валидация форм

Вы можете указать атрибут `data-request-validate` в форме, чтобы включить функции валидации.

```html
<form
    data-request="onSubmit"
    data-request-validate>
    <!-- ... -->
</form>
```

### Возвращение ошибки валидации

В обработчике AJAX на стороне сервера вы можете сгенерировать [исключение валидации](../../extend/system/exceptions.md), используя класс `ValidationException`, чтобы определить поле с ошибкой, где первым аргументом является массив. Массив должен использовать имена полей для ключей и сообщения об ошибках для значений.

```php
function onSubmit()
{
    throw new ValidationException(['name' => 'Вы должны указать имя!']);
}
```

::: tip
Вы также можете передать экземпляр [службы валидации](../../extend/services/validation.md) в качестве первого аргумента исключения.
:::

### Отображение сообщения ошибок

Внутри формы вы можете отобразить первое сообщение об ошибке, используя атрибут `data-validate-error` в элементе-контейнере. Содержимому внутри контейнера будет присвоено сообщение об ошибке, и элемент станет видимым.

```html
<div data-validate-error></div>
```

Чтобы отобразить несколько сообщений об ошибках, включите элемент с атрибутом `data-message`. В этом примере тег абзаца будет дублироваться и устанавливаться с содержимым для каждого существующего сообщения.

```html
<div class="alert alert-danger" data-validate-error>
    <p data-message></p>
</div>
```

Чтобы добавить пользовательские css классы для AJAX ошибок, слушайте JS-события `ajaxInvalidField` и `ajaxPromise`.

```js
$(window).on('ajaxInvalidField', function(event, fieldElement, fieldName, errorMsg, isFirst) {
    $(fieldElement).closest('.form-group').addClass('has-error');
});

$(document).on('ajaxPromise', '[data-request]', function() {
    $(this).closest('form').find('.form-group.has-error').removeClass('has-error');
});
```

### Отображение ошибок у полей формы

Вы можете отображать сообщения с ошибками валидации для отдельных полей, указав элемент, который использует атрибут `data-validate-for`, передав имя поля в качестве значения.

```html
<!-- Input поле -->
<input name="phone" />

<!-- Сообщение с ошибкой для этого поля -->
<div data-validate-for="phone"></div>
```

Если элемент оставить пустым, он будет заполнен сообщением с ошибкой с сервера. В противном случае вы можете указать любой текст, который вам нравится, и он будет отображаться вместо него.

```html
<div data-validate-for="phone">
    Ой.. Номер телефна не правильный!
</div>
```

## Кнопка с индикатором загрузки

Когда какой-либо элемент содержит атрибут `data-attach-loading`, во время AJAX-запроса к нему будет добавлен класс CSS `oc-loading`. Этот класс создаст индикатор загрузки на кнопке и якорных элементах с помощью CSS-селектора `:after`.

```html
<form data-request="onSubmit">
    <button data-attach-loading>
        Отправить
    </button>
</form>

<a
    href="#"
    data-request="onDoSomething"
    data-attach-loading>
    Сделай что-нибудь
</a>
```

## Флэш-сообщения

Укажите в форме атрибут `data-request-flash`, чтобы включить поддержку флэш-сообщений при успешных запросах AJAX.

```html
<form
    data-request="onSuccess"
    data-request-flash>
    <!-- ... -->
</form>
```

Используя фасад `Flash` в обработчике AJAX запроса, после завершения запроса появится мгновенное сообщение.

```php
function onSuccess()
{
    Flash::success('You did it!');
}
```

Альтернативно вы можете вывести [стандартное флэш сообщение](../../markup/tag/flash.md) при загрузке страницы, указав этот код в теле шаблона.

```twig
{% flash %}
    <p
        data-control="flash-message"
        class="flash-message fade {{ type }}"
        data-interval="5">
        {{ message }}
    </p>
{% endflash %}
```

## Пример использования

Ниже приведен полный пример валидации формы. Он вызывает обработчик события `onDoSomething`, который триггерит кнопку выводя индикатор загрузки в нее, выполняет валидацию полей формы, а затем отображает успешное флэш-сообщение.

```html
<form
    data-request="onDoSomething"
    data-request-validate
    data-request-flash>

    <div>
        <input name="name" />
        <span data-validate-for="name"></span>
    </div>

    <div>
        <input name="email" />
        <span data-validate-for="email"></span>
    </div>

    <button data-attach-loading>
        Отправить
    </button>

    <div class="alert alert-danger" data-validate-error>
        <p data-message></p>
    </div>

</form>
```

AJAX обработчик просматривает данные POST, отправленные клиентом, и применяет некоторые правила к валидатору. Если валидация не пройдена, выдается исключение `ValidationException`, в противном случае возвращается сообщение `Flash::success`.

```php
function onDoSomething()
{
    $data = post();

    $rules = [
        'name' => 'required',
        'email' => 'required|email',
    ];

    $validation = Validator::make($data, $rules);

    if ($validation->fails()) {
        throw new ValidationException($validation);
    }

    Flash::success('Задача выполнена!');
}
```
