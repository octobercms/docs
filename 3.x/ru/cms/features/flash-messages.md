---
subtitle: Отображение сообщения о результате запроса.
---
# Flash-сообщения

Flash-сообщения — удобный способ сообщить пользователю о результате запроса, будь то успех или ошибка. Просто используйте фасад `Flash` для отображения сообщения после завершения запроса. Flash-сообщения обычно устанавливаются в [AJAX-обработчиках](../ajax/handlers.md), в [логике компонентов](../../extend/cms-components.md) или в [PHP-секции](../themes/themes.md) страницы или макета.

```php
function onSave()
{
    // Sets a successful message
    Flash::success('Settings successfully saved!');

    // Sets an error message
    Flash::error('Something went wrong...');

    // Sets a warning message
    Flash::warning('Please confirm your email address soon');

    // Sets an informative message
    Flash::info('The export is still processing. Please try again in a minute.');
}
```

Flash-сообщения исчезают через 3 секунды. Клик по flash-сообщению предотвращает его исчезновение.

## Встроенные flash-сообщения

AJAX-фреймворк имеет встроенную поддержку flash-сообщений. Просто укажите атрибут `data-request-flash` на форме, чтобы включить использование flash-сообщений для завершённых AJAX-запросов.

```html
<form
    data-request="onSuccess"
    data-request-flash>
    <!-- ... -->
</form>
```

Чтобы flash-сообщения отображались также при перенаправлении браузера, следует отрендерить [встроенное flash-сообщение](../../markup/tag/flash.md) при загрузке страницы, разместив этот код на странице или в макете.

```twig
{% flash %}
    <p
        data-control="flash-message"
        data-type="{{ type }}"
        data-interval="5">
        {{ message }}
    </p>
{% endflash %}
```

Чтобы отобразить только определённый тип flash-сообщения, передайте значение атрибуту — **success**, **error**, **info**, **warning** или **validate**. Несколько значений разделяются запятыми.

```html
<form data-request-flash="success,warning"></form>
```

При использовании [функций валидации](./validation.md) совместно с атрибутом `data-request-flash` ошибки валидации имеют приоритет и подавляют flash-сообщение. Чтобы отобразить оба одновременно, включите тип **validate** в атрибут.

```html
<form
    data-request-validate
    data-request-flash="success,error,validate">
```

### Flash-сообщение загрузки

Атрибут `data-request-message` можно использовать для отображения flash-сообщения прогресса во время выполнения запроса. Это особенно полезно для длительных процессов.

```html
<button
    data-request="onSubmit"
    data-request-message="Please wait while we process your request...">
    Submit
</button>
```

### Стилизация flash-сообщений

Чтобы изменить внешний вид flash-сообщения, используйте CSS-класс `.oc-flash-message`.

```css
.oc-flash-message.success {
    background: green;
}
.oc-flash-message.error {
    background: red;
}
.oc-flash-message.warning {
    background: orange;
}
.oc-flash-message.info {
    background: aqua;
}
.oc-flash-message.loading {
    background: aqua;
}
```

## Пользовательские flash-сообщения

::: aside
Обратитесь к [статье о Twig-теге flash](../../markup/tag/flash.md), чтобы узнать больше о теге `{% flash %}`.
:::

Для отображения встроенных flash-сообщений или полного изменения стандартной разметки flash-сообщений создайте новый фрагмент в вашей теме с пользовательским содержимым. Например, создайте фрагмент с именем **flash-messages.htm** и вставьте следующее содержимое.

```twig
{% flash %}
    <div class="alert alert-{{ type }}">
        {{ message }}
    </div>
{% endflash %}
```

Затем включите фрагмент в форму как [самообновляющийся фрагмент](../../markup/tag/ajax-partial.md) с помощью тега `{% ajaxPartial %}`. Указание имени фрагмента в `data-request-update` автоматически обновит этот фрагмент и отключит встроенные flash-сообщения.

```twig
<form>
    {% ajaxPartial 'flash-messages' %}

    <label>Title</label>
    <input name="title" />

    <button
        data-request="onSave"
        data-request-update="{ flash-messages: true }">
        Save
    </button>
</form>
```

Также вы можете включить фрагмент в макет и обновлять его глобально вместо добавления `data-request-flash` к каждому элементу. Добавьте мета-тег `ajax-request-update` в секцию head страницы и установите атрибут content для [глобального обновления фрагмента](../ajax/update-partials.md).

```html
<head>
    <meta name="ajax-request-update" content="{ flash-messages: true }" />
</head>
<body>
    <!-- Updates with every AJAX request -->
    {% ajaxPartial 'flash-messages' %}
</body>
```

## Работа с JavaScript

Используйте функцию `oc.flashMsg` для отображения flash-сообщения с помощью JavaScript. Тип может быть `success`, `error` или `warning`. Необязательный параметр `interval` контролирует длительность отображения flash-сообщения в секундах.

```js
oc.flashMsg({
    message: 'Record has been successfully saved. This message will disappear in 1 second.',
    type: 'success',
    interval: 1
});
```

#### См. также

::: also
* [Twig-тег flash](../../markup/tag/flash.md)
:::
