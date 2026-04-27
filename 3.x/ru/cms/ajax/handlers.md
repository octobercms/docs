---
subtitle: Проектируйте свой API и динамически обновляйте страницу.
---
# Обработчики событий

AJAX-обработчики событий — это конечные точки API для взаимодействия AJAX-фреймворка с сервером. Они могут отвечать необработанными данными, перенаправлять браузер или динамически обновлять фрагменты на странице.

## AJAX-обработчики

Чтобы создать AJAX-обработчик, определите его как PHP-функцию в PHP-секции страницы, фрагмента или макета, или [внутри CMS-компонентов](../themes/components.md). Имена обработчиков должны следовать шаблону `onSomething`, например, `onName`. Все обработчики поддерживают [обновление фрагментов](./update-partials.md) в рамках AJAX-запроса.

```php
function onSubmitContactForm()
{
    // ...
}
```

::: tip
Если два обработчика с одинаковым именем определены на странице и в макете одновременно, обработчик страницы будет иметь приоритет. Обработчики, определённые в компонентах, имеют наименьший приоритет.
:::

### Вызов обработчика

Каждый AJAX-запрос должен указывать имя обработчика, используя [API атрибутов данных](../ajax/attributes-api.md) или [JavaScript API](../ajax/javascript-api.md). При выполнении запроса сервер просматривает все зарегистрированные обработчики и находит первый подходящий.

```html
<!-- Attributes API -->
<button data-request="onSubmitContactForm">Go</button>

<!-- JavaScript API -->
<script> oc.ajax('onSubmitContactForm') </script>
```

Обработчики, определённые страницами, макетами и компонентами, регистрируются автоматически. Если вы вызываете обработчик из фрагмента, используйте [Twig-тег `{% ajaxPartial %}`](../../markup/tag/ajax-partial.md), который корректирует цикл страницы для регистрации обработчиков.

### Сериализация формы

Когда AJAX-запрос происходит внутри HTML-тега формы, все значения полей ввода формы доступны обработчику. В примере ниже значение `first_name` будет отправлено вместе с запросом.

```html
<form id="myForm">
    <input name="first_name" />
    <button data-request="onSubmitContactForm">Go</button>
</form>
```

JavaScript API поддерживает эту логику с помощью функции `oc.request`.

```html
<script> oc.request('#myForm', 'onSubmitContactForm') </script>
```

Вы можете использовать PHP-функцию `input()` для доступа к переменной.

```php
function onSubmitContactForm()
{
    $firstName = input('first_name');
}
```

### Универсальный обработчик

Иногда вам может потребоваться выполнить AJAX-запрос только для обновления содержимого страницы, без необходимости выполнения какого-либо кода. Для этой цели вы можете использовать обработчик `onAjax`. Этот обработчик доступен повсюду и не требует написания кода.

```html
<button data-request="onAjax">Do nothing</button>
```

### Обработчики компонентов

Если два компонента регистрируют обработчик с одинаковым именем, рекомендуется указывать префикс с [кратким именем или псевдонимом компонента](../../cms/themes/components.md). Если компонент использует псевдоним **mycomponent**, обработчик может быть вызван как `mycomponent::onName`.

```html
<button data-request="mycomponent::onSubmitContactForm">Go</button>
```

Подробнее читайте в [статье о разработке компонентов](../../extend/cms-components.md).

## Перенаправления в AJAX-обработчиках

Если вам нужно перенаправить браузер на другой адрес, верните объект ответа `Redirect` из AJAX-обработчика. Фреймворк перенаправит браузер сразу после получения ответа от сервера. Пример AJAX-обработчика с перенаправлением:

```php
function onRedirectMe()
{
    return Redirect::to('http://google.com');
}
```

## Возврат данных из AJAX-обработчиков

Ответ от AJAX-обработчика может служить потребляемым API, возвращая структурированные данные. Если AJAX-обработчик возвращает массив, вы можете получить доступ к его элементам в обработчике события `success`. Пример AJAX-обработчика, возвращающего объект данных:

```php
function onFetchDataFromServer()
{
    // Some server-side code

    return [
        'totalUsers' => 1000,
        'totalProjects' => 937
    ];
}
```

Данные можно получить с помощью API атрибутов данных.

```html
<form data-request="onHandleForm" data-request-success="console.log(data)">
```

То же самое с JavaScript API.

```html
<form onsubmit="oc.request(this, 'onHandleForm', {
        success: function(data) {
            console.log(data);
        }
    }); return false"
>
```

## Выполнение кода перед обработчиками

Иногда вам может потребоваться выполнить код перед выполнением обработчика. Определение функции `onInit` как части [жизненного цикла выполнения макета](../../cms/themes/layouts.md) позволяет запускать код перед каждым AJAX-обработчиком.

```php
function onInit()
{
    // From a page or layout PHP code section
}
```

Вы можете определить метод `init` внутри [класса CMS-компонента](../../extend/cms-components.md).

```php
function init()
{
    // From a component or widget class
}
```

## Генерация AJAX-исключения

Вы можете сгенерировать [AJAX-исключение](../../extend/system/exceptions.md) с помощью класса `AjaxException`, чтобы обработать ответ как ошибку, сохранив при этом возможность отправки содержимого ответа в обычном режиме. Просто передайте содержимое ответа в качестве первого аргумента исключения.

```php
throw new AjaxException([
    'error' => 'Not enough questions',
    'questionsNeeded' => 2
]);
```

Эти ошибки обрабатываются AJAX-фреймворком.

```html
<form data-request="onHandleForm" data-request-error="console.log(data)">
```

То же самое с JavaScript API.

```html
<form onsubmit="oc.request(this, 'onHandleForm', {
        error: function(data) {
            console.log(data);
        }
    }); return false"
>
```

::: tip
При генерации исключения этого типа [фрагменты будут обновлены](./update-partials.md) в обычном режиме.
:::

## Отправка событий в браузер

::: aside
Отправленные события вызываются в AJAX-ответе после завершения запроса и перед обновлением фрагментов.
:::

Вы можете отправлять JavaScript-события из AJAX-обработчиков с помощью метода `dispatchBrowserEvent`. Этот метод принимает произвольное имя события (первый аргумент) и переменные деталей для передачи событию (второй аргумент), переменные должны быть совместимы с JSON-сериализацией.

```php
function onPerformAction()
{
    $this->dispatchBrowserEvent('app:update-profile');

    $this->dispatchBrowserEvent('app:update-profile', ['name' => 'Jeff']);
}
```

В браузере используйте `addEventListener` для прослушивания отправленного события при завершении AJAX-запроса. Переменные события доступны через объект `event.detail`.

```js
addEventListener('app:update-profile', function (event) {
    alert('Profile updated with name: ' + event.detail.name);
});
```

Например, если вы хотите показать предупреждение о том, что документ уже был обновлён другим пользователем, вы можете отправить событие в браузер и сгенерировать `AjaxException` для остановки процесса.

::: tip
`AjaxException` и `ValidationException` — это останавливающие исключения, поддерживающие отправку событий.
```php
public function onUpdate()
{
    $this->dispatchBrowserEvent('app:stale-document');

    throw new AjaxException;
}
```
:::

Вы можете прослушивать это событие в браузере с помощью универсального слушателя. Этот пример запрашивает подтверждение пользователя перед повторной отправкой запроса с флагом `force` в данных.

```js
addEventListener('app:stale-document', function (event) {
    if (confirm('Another user has updated this document, proceed?')) {
        oc.request(event.target, 'onUpdate', { data: {
            force: true
        }});
    }
});
```

Чтобы предотвратить обновление фрагментов в рамках ответа, вызовите `preventDefault()` на объекте события.

```js
addEventListener('app:stale-document', function (event) {
    event.preventDefault();
});
```
