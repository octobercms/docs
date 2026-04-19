---
subtitle: Взаимодействие с обработчиками с помощью JavaScript-кода.
---
# JavaScript API

JavaScript API является более мощным, чем API атрибутов данных. Метод `oc.request` может использоваться с любым элементом внутри формы или с самим элементом формы. Когда метод используется с элементом внутри формы, запрос передаётся к форме.

Метод `oc.request` принимает целевой элемент и имя AJAX-обработчика в качестве первого и второго аргументов. Целевой элемент может быть строкой CSS-селектора или HTML-элементом. Например:

```html
<form onsubmit="oc.request(this, 'onProcess'); return false;">
    ...
```

Третий аргумент метода `oc.request` — это объект с параметрами. Следующие параметры специфичны для фреймворка October CMS.

Параметр | Описание
------------- | -------------
**update** | объект, указывающий список фрагментов и элементов страницы (в виде CSS-селекторов) для обновления: `{'partial': '#select'}`. Строка селектора должна начинаться с символа `#` или `.`, кроме того, можно добавить `@` для добавления содержимого в конец элемента, `^` для добавления в начало, `!` для замены и `=` для использования произвольного CSS-селектора.
**confirm** | строка подтверждения. Если задана, перед отправкой запроса отображается диалог подтверждения. Если пользователь нажимает «Отмена», запрос отменяется.
**data** | необязательный объект с данными для отправки на сервер вместе с данными формы: `{var: 'value'}`. В этот объект также можно включить файлы для загрузки, используя [объекты `Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob). Чтобы указать имя файла для объекта `Blob`, установите свойство `filename` объекта `Blob`. (Например: `var blob = new Blob(variable); blob.filename = 'test.txt'; var data = {uploaded_file: blob};`)
**query** | необязательный объект с данными для добавления к строке запроса текущего URL.
**headers** | необязательный объект с заголовками для отправки на сервер вместе с запросом.
**redirect** | строка с URL для перенаправления браузера после успешного запроса.
**beforeUpdate** | функция обратного вызова, выполняемая перед обновлением элементов страницы. Переменная `this` внутри функции содержит объект запроса с двумя свойствами: `handler` и `options`, представляющими исходные параметры request().
**afterUpdate** | функция обратного вызова, аналогичная `beforeUpdate`, но выполняемая после обновления элементов страницы.
**success** | функция обратного вызова, выполняемая при успешном запросе. Если указан этот параметр, он переопределяет стандартную функциональность фреймворка: элементы не обновляются, обратные вызовы `beforeUpdate` и `afterUpdate` не срабатывают, события `ajax:update` и `ajax:update-complete` не генерируются. Чтобы вызвать стандартную функциональность фреймворка, используйте `this.success(...)` внутри вашей функции.
**error** | функция обратного вызова, выполняемая при ошибке. По умолчанию отображается сообщение alert. Если параметр переопределён, сообщение alert не отображается.
**complete** | функция обратного вызова, выполняемая в случае успеха или ошибки.
**cancel** | функция обратного вызова, выполняемая, если пользователь прерывает запрос или отменяет его через диалог подтверждения.
**form** | элемент формы для получения данных, отправляемых с запросом, переданный в виде строки селектора или элемента формы.
**flash** | при значении true указывает серверу очистить и отправить все flash-сообщения с ответом. По умолчанию: `false`
**files** | при значении true запрос будет принимать загрузку файлов через интерфейс `FormData`. По умолчанию: `false`
**download** | при значении true принимаются загрузки файлов с ответом `Content-Disposition`. При строковом значении можно указать имя загружаемого файла. По умолчанию: `false`
**bulk** | при значении true запрос будет отправлен в формате JSON для массовых транзакций данных. По умолчанию: `false`
**browserValidate** | при значении true перед отправкой запроса будет выполнена клиентская валидация на стороне браузера. Применяется только к запросам в контексте элемента `<form>`.
**browserRedirectBack** | при значении true и при перенаправлении, если доступен предыдущий URL из браузера, он будет использован вместо URL перенаправления. По умолчанию: `false`.
**message** | отображает сообщение о прогрессе с указанным текстом, показываемое во время выполнения запроса. Этот параметр используется [функцией flash-сообщений](../features/flash-messages.md).
**loading** | необязательная строка или объект для отображения при выполнении запроса. Строка должна быть CSS-селектором элемента, а объект должен поддерживать функции `show()` и `hide()` для управления видимостью.
**progressBar** | включает [индикатор прогресса](../features/loaders.md) при выполнении AJAX-запроса.

Параметры **beforeUpdate**, **afterUpdate**, **success**, **error** и **complete** принимают функции с тремя аргументами: объект данных, полученных от сервера, код HTTP-статуса и объект XHR.

```js
success: function(data, responseCode, xhr) { }
```

Вы также можете переопределить некоторую логику запроса, передав новые функции в качестве параметров. Доступны следующие обработчики логики.

Обработчик | Описание
------------- | -------------
**handleConfirmMessage(message, promise)** | вызывается при запросе подтверждения у пользователя.
**handleErrorMessage(message)** | вызывается, когда необходимо отобразить сообщение об ошибке.
**handleValidationMessage(message, fields)** | устанавливает фокус на первое недопустимое поле при использовании валидации.
**handleFlashMessage(message, type)** | вызывается, когда предоставлено flash-сообщение при использовании параметра **flash** (см. выше).
**handleRedirectResponse(url)** | вызывается, когда браузер должен перенаправиться на другой адрес.

## Примеры использования

Запрос подтверждения перед отправкой запроса `onDelete`.

```js
oc.request('#myform', 'onDelete', {
    confirm: 'Are you sure?',
    redirect: '/dashboard'
});
```

Запуск обработчика `onCalculate` и вставка отрендеренного фрагмента **calcresult** в элемент страницы с CSS-классом **result**.

```js
oc.request('#myform', 'onCalculate', {
    update: { calcresult: '.result' }
})
```

Запуск обработчика `onCalculate` с дополнительными данными.

```js
oc.request('#myform', 'onCalculate', { data: { value: 55 } })
```

Запуск обработчика `onCalculate` и выполнение пользовательского кода перед обновлением элементов страницы.

```js
oc.request('#myform', 'onCalculate', {
    update: { calcresult: '.result' },
    beforeUpdate: function() { /* do something */ }
})
```

Запуск обработчика `onCalculate` и выполнение пользовательского кода после обновления элементов страницы.

```js
oc.request('#myform', 'onCalculate', {
    afterUpdate: function() { /* do something */ }
})
```

Использование метода `oc.ajax` для выполнения запроса без элемента FORM.

```js
oc.ajax('onCalculate', {
    success: function() {
        console.log('Finished!');
    }
})
```

Запуск обработчика `onCalculate` и выполнение пользовательского кода после завершения стандартной функции `success`.

```js
oc.request('#myform', 'onCalculate', {
    success: function(data) {
        this.success(data).done(function() {
            // ... do something after parent success() is finished ...
        });
    }
})
```

## Глобальные AJAX-события

AJAX-фреймворк генерирует события на обновляемых элементах, инициирующем элементе, форме и объекте window. События генерируются независимо от используемого API — API атрибутов данных или JavaScript API.

Дополнительные данные доступны через свойство `event.detail` обработчика событий. Если не указано иное, данные обработчика включают объект `context`, объект `data`, полученный от сервера, `responseCode` и объект `xhr`.

Событие | Описание
------------- | -------------
**ajax:before-send** | генерируется на объекте window перед отправкой запроса. Данные обработчика содержат объект `context`.
**ajax:before-update** | генерируется на объекте формы сразу после завершения запроса, но перед обновлением страницы.
**ajax:update** | генерируется на элементе страницы после его обновления фреймворком.
**ajax:update-complete** | генерируется на объекте window после обновления всех элементов фреймворком.
**ajax:request-success** | генерируется на объекте формы после успешного завершения запроса. Обработчик получает 5 параметров: объект события, объект контекста, объект данных от сервера, строку статуса и объект XHR.
**ajax:request-error** | генерируется на объекте формы, если запрос завершился с ошибкой.
**ajax:error-message** | генерируется на объекте window, если запрос завершился с ошибкой. Обработчик содержит данные `message` с сообщением об ошибке от сервера.
**ajax:confirm-message** | генерируется на объекте window, когда задан параметр `confirm`. Обработчик содержит данные `message` с текстовым сообщением, назначенным обработчику как часть параметра `confirm`. Также предоставляется `promise` для отложения или отмены результата, что полезно для реализации пользовательской логики/интерфейса подтверждения вместо стандартного javascript confirm.

Эти события генерируются на инициирующем элементе:

Событие | Описание
------------- | -------------
**ajax:setup** | генерируется перед формированием запроса. Данные обработчика содержат объект `context`, позволяющий изменять параметры через свойство `context.options`.
**ajax:promise** | генерируется непосредственно перед отправкой AJAX-запроса. Данные обработчика содержат объект `context`.
**ajax:fail** | генерируется в конце, если AJAX-запрос завершился неудачей.
**ajax:done** | генерируется в конце, если AJAX-запрос завершился успешно.
**ajax:always** | генерируется независимо от того, завершился AJAX-запрос неудачей или успешно.

## Примеры использования

Выполнение JavaScript-кода при срабатывании события `ajax:update` на элементе.

```js
document.querySelector('#result').addEventListener('ajax:update', function() {
    console.log('Updated!');
});
```

Выполнение одиночного запроса, отображающего flash-сообщение с помощью обработчика логики.

```js
oc.ajax('onDoSomething', {
    flash: true,
    handleFlashMessage: function(message, type) {
        oc.flashMsg({ message: message, type: type });
    }
});
```

Применение конфигурации ко всем AJAX-запросам глобально.

```js
addEventListener('ajax:setup', function(event) {
    const { options } = event.detail.context;

    // Enable AJAX handling of Flash messages on all AJAX requests
    options.flash = true;

    // Disable the progress bar for all AJAX requests
    options.progressBar = false;

    // Handle Error Messages by triggering a flashMsg of type error
    options.handleErrorMessage = function(message) {
        oc.flashMsg({ message: message, type: 'error' });
    }

    // Handle Flash Messages by triggering a flashMsg of the message type
    options.handleFlashMessage = function(message, type) {
        oc.flashMsg({ message: message, type: type });
    }
});
```

Использование `promise` из данных события.

```js
addEventListener('ajax:confirm-message', function(event) {
    const { message, promise } = event.detail;

    // Prevent default behavior
    event.preventDefault();

    // Handle promise
    if (confirm(message)) {
        promise.resolve();
    }
    else {
        promise.reject();
    }
});
```

Анимация элемента после завершения обновления определённым AJAX-обработчиком.

```js
addEventListener('ajax:update-complete', function(event) {
    const { handler } = event.detail.context;

    // If the handler is either of the following
    if (['onRemoveFromCart', 'onAddToCart'].includes(handler)) {

        // Run an animation for 2 seconds
        var el = document.querySelector('#miniCart');
        el.classList.add('animate-shockwave');
        setTimeout(function() { el.classList.remove('animate-shockwave'); }, 2000);
    }
});
```
