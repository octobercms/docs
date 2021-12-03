# AJAX

OctoberCMS включает в себя AJAX фреймворк, который позволяет выполнять AJAX запросы, находящиеся в [страницах](../cms/pages.md), [шаблонах](../cms/layouts.md) или [компонентах](../cms/components.md), и обновлять элементы страницы при помощи [фрагментов](../cms/partials.md). Существует два способа его использования: JavaScript API и Data attributes API. Data attributes API не требует каких-либо знаний JavaScript.

<a name="introduction"></a>
## Введение

Нужно подключить jQuery, чтобы начать использовать AJAX фреймворк. После чего необходимо вставить тег `{% framework %}` на страницу или в шаблон. Он добавит необходимые JS и CSS файлы. Пример:

```twig
<script src="{{ [
    'assets/javascript/jquery.js',
]|theme }}"></script>

{% framework %}
```

Тег `{% framework %}` имеет необязательный параметр **extras**, который добавляет индикатор загрузки (отображается вверху страницы).

```twig
{% framework extras %}
```

<a name="how-ajax-works"></a>
### Как работает AJAX

Вы можете использовать AJAX на любой странице при помощи **Data Attributes** или **JavaScript**. Каждый запрос вызывает **обработчик событий** на сервере и может обновлять элементы страницы при помощи [фрагментов](../cms/partials.md). AJAX запросы работают лучше всего с формами, так как данные формы автоматически отправляется на сервер. Последовательность выполнения AJAX запроса:

1. Клиент создает AJAX запрос, передав имя обработчика и, при необходимости, дополнительные параметры серверу.
2. Сервер находит обработчик с таким именем и выполняет его.
3. Обработчик выполняет необходимую бизнес-логику и возвращает результат в переменную страницы, которая выводится в фрагменте при помощи Twig тега.
4. Сервер подготавливает обновленный фрагмент, который указан в параметре `update`.
5. Сервер отправляет ответ с содержимым фрагмента.
6. Framework заменяет элемент страницы ответом сервера.

Ниже приведен пример калькулятора, который использует **Data Attributes API**. При отправке формы вызывается обработчик [**onTest**](#ajax-handlers), код которого находится ниже. Результат расчета выводится в элементе **#result** при помощью фрагмента **calcresult**.

```html
<form data-request="onTest" data-request-update="calcresult: '#result'">
    <input type="text" name="value1">
    <input type="text" name="value2">
    <input type="submit" value="Calculate">
</form>
<div id="result"></div>
```

Содержимое фрагмента **calcresult**:

```twig
The result is {{ result }}
```

<a name="ajax-handlers"></a>
## Обработчики

Обработчики AJAX - PHP функции, которые могут быть определены в странице, шаблоне или внутри компонента. Они имеют название вида `onНазваниеОбработчика` и могут передавать результат на страницу. Следующий пример демонстрирует обработчик, который определен в [PHP секции](../cms/themes.md#php-section) страницы. Он получает два значения из формы, суммирует их и присваивает новое число переменной страницы **result**.

```php
url = "js"
layout = "default"
==
function onTest()
{
    $value1 = post('value1');
    $value2 = post('value2');
    $this['result'] = $value1 + $value2;
}
==
```

> **Примечание:** Если обработчики имеют одинаковые имена, то сначала вызывается тот, который определен в странице, затем - в шаблоне, после - в компоненте.

The `onInit()` methods found in the [page execution life cycle](layouts.md#dynamic-pages) can be used for defining code that always executes before an AJAX event is handled.

```php
function onInit()
{
    // This code will be executed before
    // an AJAX request is handled.
}
```

<a name="data-attributes"></a>
## Data attributes API

позволяет Вам использовать AJAX без JavaScript. Вы пишете меньше кода, а получаете такой же результат. Список поддерживаемых атрибутов:

Атрибут | Описание
------------- | -------------
**data-request** | имя AJAX обработчика.
**data-request-confirm** | сообщение с подтверждением. Окно показывается до того, как запрос будет отправлен. Если пользователь нажмет "Отмена", то запрос не будет отправлен.
**data-request-redirect** | после того, как запрос будет успешно отправлен, пользователь перейдет на эту страницу.
**data-request-update** | список фрагментов и элементов страницы, которые нужно обновить. Пример: `'my-partial': '#selector', 'partial': '@#selector2', 'partial': '^#selector2'`. `@` - добавить результат перед содержимым элемента, `^` - после.
**data-request-data** | дополнительные параметры для передачи. Формат записи: `myvar: 'some string'`.
**data-request-before-update** | JavaScript код, который необходимо выполнить до обновления содержимого элемента. Доступные переменные: `this`, `context`, `data`, `textStatus`,`jqXHR`.
**data-request-success** | JavaScript код, который необходимо выполнить после того, как запрос будет успешно завершен. Доступные переменные: `this`, `context`, `data`, `textStatus`, `jqXHR`.
**data-request-error** | JavaScript код, который выполняется при возникновении ошибки. Доступные переменные: `this`, `context`, `textStatus`, `jqXHR`.
**data-request-complete** | JavaScript код, который выполняется после окончания запроса. Доступные переменные: `this`, `context`, `textStatus`, `jqXHR`.
**data-request-loading** | CSS селектор элемента, который будет показан во время выполнения запроса. Вы можете использовать эту опцию для отображения индикатора загрузки. Эта функция использует jQuery функции `show()` и `hide()` для управления видимостью элемента.
**data-track-input** | применяется для тега `input` типа `text` или `password` и вызывает обработчик при изменении значения пользователем. Имеет необязательный параметр - время до отправления запроса (в миллисекундах).

Атрибут `data-request` можно использовать в:

Элемент | Событие
------------- | -------------
**Формы** | при отправке.
**Ссылки, кнопки** | при нажатии.
**Поля типа `text`, `number` и `password`** | когда изменяется значение и добавлен атрибут `data-track-input`.
**Select, checkboxes, radios** | когда выбран один из элементов.

<a name="data-attribute-examples"></a>
### Примеры Data Attributes API

Использование обработчика `onCalculate` при отправке формы и обновлением элемента, имеющего идентификатор `"result"`, фрагментом **calcresult**:

```html
<form data-request="onCalculate" data-request-update="calcresult: '#result'">
```

Вызов окна с подтверждением запроса:

```html
<form ... >
    ...
    <button data-request="onDelete" data-request-confirm="Are you sure?">Delete</button>
```

Перенаправление на другую страницу после успешного запроса:

```html
<form data-request="onLogin" data-request-redirect="/admin">
```

Вызов окна после успешного запроса:

```html
<form data-request="onLogin" data-request-success="alert('Yay!')">
```

Отправка параметра `mode` со значением `update`:

```html
<form data-request="onUpdate" data-request-data="mode: 'update'">
```

Отправка параметра `id` со значением `7`:

```html
<div data-request-data="id: 7">
    <button data-request="onDelete">Delete</button>
    <button data-request="onSave">Update</button>
</div>
```

<a name="javascript-api"></a>
## JavaScript API

JavaScript API является более мощным инструментом, чем **Data Attributes API**. Метод `request()` может использоваться с любым элементом внутри формы или с самой формой.

Метод `request()` имеет один обязательный параметр - имя обработчика. Пример:

```html
<form onsubmit="$(this).request('onProcess'); return false;">
    ...
```

Второй параметр метода `request()` - объект с настройками. Вы можете использовать любые настройки и методы, которые совместимы с [jQuery AJAX function](http://api.jquery.com/jQuery.ajax/). Следующие параметры используются Октябрем:

Параметр | Описание
------------- | -------------
**update** | объект со списком фрагментов и элементов страницы для обновления: {'partial': '#select', 'partial2': '@#select2', 'partial3': '^#select3'}. `@` - добавить результат перед содержимым элемента, `^` - после.
**confirm** | объект со списком фрагментов и элементов страницы для обновления: {'partial': '#select', 'partial2': '@#select2', 'partial3': '^#select3'}. `@` - добавить результат перед содержимым элемента, `^` - после.
**data** | необязательный параметр. Объект с дополнительной информацией, который будет отправлен на сервер: {var: 'value'}.
**redirect** | адрес, на который будет перенаправлен пользователь после успешного запроса.
**beforeUpdate** | callback функция, которая выполнится перед тем, как элемент страницы будет обновлен. Принимает три параметра: `data`, `status`, `jqXHR`. Переменная `this` является объектом и имеет два свойства: `handler` и `options`.
**success** | callback функция, которая выполняется в случае успешного запроса. Она перекрывает функцию фреймворка, а элемент страницы не обновляется. Также не вызываются следующие события: `beforeUpdate`, `ajaxUpdate`, `ajaxUpdateComplete`. Функция принимает три параметра: `data`, `status` и `jqXHR`. Однако, Вы можете обновить элемент, вызвав `this.success(...)`.
**error** | callback функция, которая выполняется в случае ошибки. По умолчанию показывается окно с ошибкой. Функция принимает три параметра: `jqXHR`, `status` и `error` - см. [jQuery AJAX function](http://api.jquery.com/jQuery.ajax/).
**complete** | callback функция, которая выполняется в случае успешного запроса или ошибки.

<a name="javascript-examples"></a>
### Примеры JavaScript API

Подтверждение запроса:

```js
$('form').request('onDelete', {
    confirm: 'Are you sure?',
    redirect: '/dashboard'
})
```

Вызов обработчика `onCalculate` и обновление элемента страницы **result** с фрагментом **calcresult**:

```js
$('form').request('onCalculate', {
    update: {calcresult: '.result'}
})
```

Вызов обработчика `onCalculate` с дополнительной информацией:

```js
$('form').request('onCalculate', {data: {value: 55}})
```

Вызов обработчика `onCalculate` и выполнение некоторой функции перед обновлением элемента:

```js
$('form').request('onCalculate', {
    update: {calcresult: '.result'},
    beforeUpdate: function() { /* do something */ }
})
```

Вызов обработчика `onCalculate`. При успешном результате происходит выполнение некоторой функции и обновление элемента страницы:

```js
$('form').request('onCalculate', {success: function(data) {
    //... do something ...
    this.success(data);
}})
```

Выполнение запроса без использования формы:

```js
$.request('onCalculate', {
    success: function() {
        console.log('Finished!');
    }
})
```

Вызов обработчика `onCalculate`. При успешном результате происходит выполнение некоторой функции после вызова функции `success`:

```js
$('form').request('onCalculate', {success: function(data) {
    this.success(data).done(function() {
        //... do something after parent success() is finished ...
    });
}})
```

<a name="components-ajax-handlers"></a>
## Вызов обработчика AJAX из компонента

If you need to issue a request to an AJAX handler defined in a [component](components.md) attached to a page or layout, you should prefix the handler name with the component short name or [alias](components.md#aliases). The next example demonstrates how to invoke the **onCalculate** AJAX handler defined in the imaginary **calculator** component:

```html
<form data-request="calculator::onCalculate" data-request-update="calcresult: '#result'">
```

<a name="global-events"></a>
## Глобальные события AJAX

Во время выполнении AJAX приводит в действие несколько событий независимо от используемого API (Data Attributes или JavaScript).

Событие | Описание
------------- | -------------
**ajaxBeforeSend** | вызывается непосредственно перед отправкой ajax-запроса на сервер.
**ajaxUpdate** | вызывается после того, как элемент на странице был обновлен. Принимает пять параметров: `event`, `context`, `data`, `status`, `jqXHR`.
**ajaxUpdateComplete** | вызывается после того, как все элементы на странице были обновлены. Принимает пять параметров: `event`, `context`, `data`, `status`, `jqXHR`.
**ajaxBeforeUpdate** | вызывается после того, как форма была отправлена, но страница еще не была обновлена. Принимает пять параметров: `event`, `context`, `data`, `status`, `jqXHR`.
**ajaxSuccess** | вызывается после того, как форма была отправлена. Принимает пять параметров: `event`, `context`, `data`, `status`, `jqXHR`.
**ajaxError** | вызывается при возникновении ошибки во время отправки формы. Принимает четыре параметра: `event`, `context`, `status`, `jqXHR`.
**ajaxErrorMessage** | вызывается при возникновении ошибки. Принимает два параметра: `event`, `message`.
**ajaxConfirmMessage** | вызывается, когда есть параметр `confirm`. Принимает два параметра: `event`, `message`.

Пример выполнения JavaScript кода при вызове события `ajaxUpdate`:

```js
$('.calcresult').on('ajaxUpdate', function() {
    console.log('Updated!');
})
```

<a name="returning-data-from-handlers"></a>
## Возвращение данных из обработчика

В большинстве случаев Вам может понадобиться вернуть данные из обработчика. Если он вернет массив, то Вы можете получить к нему доступ в обработчике события `success` в javascript коде. Пример:

```php
function onFetchDataFromServer()
{
    /* Something server-side code */

    return [
        'totalUsers' => 1000,
        'totalProjects' => 937
    ];
}
```

Data attributes API:

```html
<form data-request="onHandleForm" data-request-success="console.log(data)">
```

JavaScript API:

```js
<form
    onsubmit="$(this).request('onHandleForm', {
        success: function(data) {
            console.log(data);
        }
    }); return false;">
```

<a name="redirections-in-handlers"></a>
## Перенаправление в обработчике

Если Вы хотите перенаправить пользователя на другую страницу, то необходимо вернуть объект `Redirect` из обработчика. Пример:

```php
function onRedirectMe()
{
    return Redirect::to('http://google.com');
}
```

<a name="pushing-content-updates"></a>
## Сообщения

AJAX обработчики могут заменить содержимое элемента на странице при помощи атрибута  **data-request-update** в [Data Attributes API](#data-attributes) или свойства **update** в [JavaScript API](#javascript-api).

Для этого необходимо вернуть массив, в котором ключ - HTML элемент, а значение - новое содержимое. Пример:

```php
function onFlash()
{
    return ['#flashMessages' => $this->renderPartial('flash-messages')];
}
```

> **Примечание:** Имя ключа должно начинаться с идентификатора `#` или класса `.`.
