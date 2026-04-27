---
subtitle: Индикация загрузки страницы.
---
# Индикаторы загрузки

Когда AJAX-фреймворк отправляет запрос на сервер, рекомендуется отображать индикатор загрузки, поскольку страница может обновиться не сразу. Существует несколько подходов и стандартных индикаторов загрузки, чтобы обозначить, что AJAX-запрос был отправлен и выполняется.

## Индикатор прогресса

Заметная функция AJAX-фреймворка — индикатор прогресса, отображаемый в верхней части страницы при выполнении AJAX-запроса. Индикатор прогресса отслеживает AJAX-запросы и появляется, когда запрос длится более 300 мс, и скрывается после завершения запроса.

Чтобы отключить индикатор прогресса для запроса, установите атрибут `data-request-progress-bar` в значение `false`.

```html
<button
    data-request="onDoSomething"
    data-request-progress-bar="false">
    Do something
</button>
```

В JavaScript установите параметр `progressBar` AJAX-запроса в `false`.

```js
oc.ajax('onSilentRequest', { progressBar: false });
```

Чтобы отключить индикатор прогресса глобально, установите свойство `visibility` в значение `hidden` с помощью стилей.

```css
.oc-progress-bar {
    visibility: hidden;
}
```

Вы можете отображать индикатор прогресса с помощью JavaScript, используя объект `oc.progressBar` и функции `show` / `hide`.

```js
oc.progressBar.show();

oc.progressBar.hide();
```

## Кнопка загрузки

При отправке форм пользователи могут случайно нажать кнопку дважды и вызвать двойную отправку, и это решается с помощью кнопки загрузки. Во время AJAX-запросов элементы button с атрибутом `data-attach-loading` будут отключены, и к ним будет добавлен CSS-класс `oc-attach-loader`. Этот класс создаёт спиннер загрузки на элементах button и anchor с помощью CSS-селектора `:after`.

```html
<a href="#"
    data-request="onDoSomething"
    data-attach-loading>
    Do Something
</a>
```

Когда кнопка находится внутри формы с атрибутом `oc-attach-loader`, индикатор загрузки будет отображаться.

```html
<form data-request="onSubmit">
    <button data-attach-loading>
        Submit
    </button>
</form>
```

Поскольку элементы input не поддерживают CSS-селектор `:after`, после них вставляется новый элемент. Элемент удаляется после завершения AJAX-запроса. Это полезно при работе с атрибутом `data-track-input`, который отслеживает изменения в поле ввода и отправляет AJAX-запрос.

```html
<input name="username"
    data-request="onCheckUsername"
    data-track-input
    data-attach-loading />
```

Вы можете вручную добавить загрузчик на кнопку с помощью объекта `oc.attachLoader` и функций `show` / `hide`, передавая CSS-селектор элемента или объект в качестве первого аргумента.

```js
oc.attachLoader.show('.my-element');

oc.attachLoader.hide('.my-element');
```

## Переключение видимости элементов

Вы можете использовать атрибут `data-request-loading` для отображения элемента во время AJAX-запроса. Значение — CSS-селектор, который управляет видимостью элемента с помощью свойств display `block` и `none`.

```html
<button
    data-request="onPay"
    data-request-loading=".is-loading">
    Pay Now
</button>

<div style="display:none" class="is-loading">
    Processing Payment...
</div>
```

### Обнаружение глобальных запросов

Вы можете определить, выполняется ли глобальный AJAX-запрос, проверив атрибут `data-ajax-progress` на HTML-элементе. В стилях это выглядит так:

```css
html[data-ajax-progress] {
    /* Display loading indicators */
}
```

Атрибут также добавляется к элементам формы.

```css
form[data-ajax-progress] {
    /* The form is loading */
}
```

### Нацеливание на конкретные обработчики

В некоторых случаях вам может потребоваться показать индикатор загрузки для конкретного [обработчика AJAX-событий](../ajax/handlers.md). Атрибут `data-ajax-progress` будет содержать имя последнего обработчика, и это можно использовать для нацеливания на конкретный запрос.

```html
<form>
    <button data-request="onPay">Pay Now</button>
    <button data-request="onCancel">Cancel</button>

    <div class="is-payment-loading">
        Processing Payment...
    </div>
</form>
```

Это можно нацелить с помощью селектора атрибута в стилях.

```css
.is-payment-loading {
    display: none;
}

form[data-ajax-progress=onPay] .is-payment-loading {
    display: block;
}
```

## Работа с JavaScript

Для более сложных сценариев вы можете использовать [AJAX JavaScript API](../ajax/javascript-api.md) через события `ajax:promise` и `ajax:always`. Эти события можно привязать к документу, форме или целевым элементам.

```js
formElement.addEventListener('ajax:promise', function() {
    // A new request has started
});

formElement.addEventListener('ajax:always', function() {
    // A request has ended
});
```

Следующий пример отключит все поля ввода внутри формы во время выполнения запроса.

```js
addEventListener('ajax:promise', function(event) {
    event.target.closest('form').querySelectorAll('input').forEach(function(el) {
        el.disabled = true;
    });
});

addEventListener('ajax:always', function() {
    event.target.closest('form').querySelectorAll('input').forEach(function(el) {
        el.disabled = false;
    });
});
```
