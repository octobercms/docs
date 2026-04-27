---
subtitle: Валидация отправки форм с помощью AJAX-фреймворка.
---
# Валидация

Валидация форм проверяет пользовательский ввод по набору предопределённых правил. При использовании [AJAX-фреймворка](../ajax/introduction.md) валидация формы происходит без специальной настройки — недопустимое поле получает фокус и отображается сообщение об ошибке (обычно в виде окна alert).

## Flash-валидация

Для базовой валидации добавление [атрибута `data-request-flash`](./flash-messages.md) на HTML-тег формы обеспечивает простой и понятный интерфейс для отображения сообщений валидации и обычно достаточно для большинства реализаций.

```html
<form data-request="onSubmit" data-request-flash>
    <div>
        <label>Name</label>
        <input name="name" />
    </div>

    <button data-attach-loading>
        Submit
    </button>
</form>
```

Внутри вашего [AJAX-обработчика](../ajax/handlers.md) вы можете сгенерировать [исключение валидации](../../extend/system/exceptions.md) с помощью класса `ValidationException`, чтобы сделать поле недопустимым. Передаваемый массив (первый аргумент) должен использовать имена полей в качестве ключей и сообщения об ошибках в качестве значений.

```php
function onSubmit()
{
    if (!post('name')) {
        throw new ValidationException(['name' => 'You must give a name!']);
    }
}
```

Когда AJAX-фреймворк обнаруживает `ValidationException`, он автоматически устанавливает фокус на первое недопустимое поле и отображает сообщения об ошибках, если они настроены.

## Встроенная валидация

Для более комплексной валидации можно включить встроенную валидацию, добавив атрибут `data-request-validate` на HTML-тег формы. Ниже приведён минимальный пример валидации формы с использованием этого подхода, где сообщение об ошибке отображается внутри формы.

```html
<form data-request="onSubmit" data-request-validate>
    <div class="alert alert-danger" data-validate-error>
        <!-- Validation Message -->
    </div>

    <div>
        <label>Name</label>
        <input name="name" />
    </div>

    <button data-attach-loading>
        Submit
    </button>
</form>
```

### Валидация отдельного поля

В некоторых случаях вам может потребоваться валидировать отдельное поле при изменении его значения. Добавив атрибут `data-track-input` вместе с атрибутом `data-request`, AJAX-фреймворк будет отправлять запрос, когда пользователь вводит что-то в поле.

```html
<form data-request-validate>
    <div>
        <label>Username</label>
        <input name="username" data-request="onCheckUsername" data-track-input />
    </div>
</form>
```

Для валидации поля можно использовать отдельный AJAX-обработчик. Если исключение не сгенерировано, поле считается допустимым.

```php
function onCheckUsername()
{
    if (true) {
        throw new ValidationException(['username' => 'Username is taken!']);
    }
}
```

## Использование сервиса валидации

::: aside
Обратитесь к [статье о валидации](../../extend/services/validation.md), чтобы узнать о различных правилах, которые можно использовать.
:::

Для более сложной валидации вы можете использовать фасад `Request` для массового применения правил к пользовательскому вводу. Метод `validate` выполняет валидацию по указанным правилам (первый аргумент) и возвращает массив проверенных атрибутов и значений. Он также генерирует `ValidationException` при неудачной валидации.

```php
function onSubmit()
{
    $data = Request::validate([
        'name' => 'required',
        'email' => 'required|email',
    ]);

    // The code will not reach here if validation fails

    Flash::success('Jobs done!');
}
```

### Пользовательские сообщения об ошибках и атрибуты

Чтобы изменить стандартные сообщения валидации, передайте пользовательские сообщения в метод `validate`. Ключи в массиве сообщений (третий аргумент) следуют формату `атрибут.правило`.

```php
$messages = [
    'email.required' => 'Please type something for the email...',
    'email.email' => 'That email is not an email...!'
];

$data = Request::validate($rules, $messages);
```

Если вы хотите сохранить стандартные сообщения валидации и изменить только имя `:attribute`, передайте пользовательские атрибуты в виде массива (четвёртый аргумент).

```php
$attributeNames = [
    'email' => 'e-mail address'
];

$data = Request::validate($rules, [], $attributeNames);
```

## Отображение сообщений об ошибках

Внутри формы вы можете отобразить первое сообщение об ошибке, используя атрибут `data-validate-error` на элементе-контейнере. Содержимое контейнера будет заменено сообщением об ошибке, а элемент станет видимым.

```html
<div data-validate-error></div>
```

Для отображения нескольких сообщений об ошибках добавьте элемент с атрибутом `data-message`. В этом примере тег paragraph будет продублирован для каждого существующего сообщения.

```html
<div class="alert alert-danger" data-validate-error>
    <p data-message></p>
</div>
```

### Отображение ошибок рядом с полями

Если вы предпочитаете показывать сообщения валидации для отдельных полей, определите элемент с атрибутом `data-validate-for`, передав имя поля в качестве значения.

```html
<!-- Input field -->
<input name="phone" />

<!-- Validation message for the field -->
<div data-validate-for="phone"></div>
```

Если элемент оставлен пустым, он будет заполнен текстом валидации от сервера. В противном случае можно указать произвольный текст, который будет отображаться вместо серверного.

```html
<div data-validate-for="phone">
    Oops.. phone number is invalid!
</div>
```

### Отображение ошибок с flash-сообщениями

При использовании атрибута `data-request-validate` совместно с [атрибутом `data-request-flash`](./flash-messages.md) ошибки валидации имеют приоритет и подавляют flash-сообщение. Чтобы отобразить оба одновременно, установите значение атрибута в подстановочный символ (`*`) для отображения всех типов flash-сообщений, включая валидацию.

```html
<form
    data-request-validate
    data-request-flash="*">
```

## Работа с JavaScript

Для реализации пользовательской обработки сообщений об ошибках используйте событие `ajax:invalid-field` для отображения поля и `ajax:promise` для сброса формы при новой отправке. Используемые JavaScript-события описаны в [AJAX JavaScript API](../ajax/javascript-api.md).

```js
addEventListener('ajax:invalid-field', function(event) {
    const { element, fieldName, errorMsg, isFirst } = event.detail;
    element.classList.add('has-error');
});

addEventListener('ajax:promise', function(event) {
    event.target.closest('form').querySelectorAll('.has-error').forEach(function(el) {
        el.classList.remove('has-error');
    });
});
```

## Полный пример использования

Ниже приведён полный пример валидации формы. Он вызывает обработчик `onSubmitForm`, который запускает индикатор загрузки на кнопке, выполняет валидацию полей формы, затем отображает успешное flash-сообщение.

Атрибут `data-request-flash` используется для [включения flash-сообщений](./flash-messages.md) для успешных сообщений и отображения сообщений валидации. Атрибут `data-attach-loading` используется для отображения [индикатора загрузки](./loaders.md) и предотвращения повторных отправок из-за случайных кликов.

```html
<form
    data-request="onSubmitForm"
    data-request-validate
    data-request-flash>
    <div>
        <label>Username</label>
        <input name="username"
            data-request="onCheckUsername"
            data-track-input
            data-attach-loading />
        <span data-validate-for="username"></span>
    </div>

    <div>
        <label>Email</label>
        <input name="email" />
        <span data-validate-for="email"></span>
    </div>

    <button data-attach-loading>
        Submit
    </button>

    <div class="alert alert-danger" data-validate-error>
        <p data-message></p>
    </div>
</form>
```

AJAX-обработчик `onSubmitForm` анализирует POST-данные, отправленные клиентом, и применяет правила к валидатору. Если валидация не проходит, генерируется `ValidationException`, в противном случае возвращается сообщение `Flash::success`.

Обработчик `onCheckUsername` проверяет доступность имени пользователя — в данном случае жёстко запрещены имена **admin** и **jeff**. Проверка выполняется дважды: при вводе текста пользователем и при отправке формы.

```php
function onSubmitForm()
{
    $data = Request::validate([
        'username' => 'required',
        'email' => 'required|email',
    ]);

    $this->onCheckUsername();

    Flash::success('Jobs done!');
}

function onCheckUsername()
{
    $username = strtolower(trim(post('username')));
    $isTaken = in_array($username, ['admin', 'jeff']);

    if ($isTaken) {
        throw new ValidationException(['username' => 'Username is taken!']);
    }
}
```

#### См. также

::: also
* [Сервис валидации](../../extend/services/validation.md)
* [Трейт валидации](../../extend/database/traits.md)
:::
