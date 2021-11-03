# AJAX data-* атрибуты API (AJAX Data attributes API)

<a name="data-attributes" id="data-attributes" class="anchor"></a>
## data-* атрибуты API

Data-* атрибуты позволяют Вам использовать AJAX без JavaScript. Вы пишете меньше кода, а получаете такой же результат. Список атрибутов:


Атрибут | Описание
------------- | -------------
**data-request** | имя AJAX обработчика.
**data-request-confirm** | сообщение с подтверждением. Окно показывается до того, как запрос будет отправлен. Если пользователь нажмет "Отмена", то запрос не будет отправлен.
**data-request-redirect** | после того, как запрос будет успешно отправлен, пользователь перейдет на эту страницу.
**data-request-url** | URL, на который будет отправлен запрос. По умолчанию: `window.location.href`
**data-request-update** | список фрагментов и элементов страницы (CSS селекторы), которые нужно обновить. Пример: `'my-partial': '#selector', 'partial': '@#selector2', 'partial': '^#selector2'`. `@` - добавить результат перед содержимым элемента, `^` - после.
**data-request-data** | дополнительные параметры для передачи. Формат записи: `var: value, var: value`. При необходимости используйте кавычки: `myvar: 'some string'`. Вы можете использовать данный атрибут на инициирующем элементе, например, на кнопке, на родительском элементе и на форме. Все атрибуты будут объединены в один массив. Если разные элементы будут иметь одинаковый атрибут, то в массив сохранится значение, которое ближе всего к инициирующему элементу.
**data-request-before-update** | JavaScript код, который необходимо выполнить до обновления содержимого элемента. Доступные переменные: `this`, `context`, `data`, `textStatus`,`jqXHR`.
**data-request-success** | JavaScript код, который необходимо выполнить после того, как запрос будет успешно завершен. Доступные переменные: `this`, `context`, `data`, `textStatus`, `jqXHR`.
**data-request-error** | JavaScript код, который выполняется при возникновении ошибки. Доступные переменные: `this`, `context`, `textStatus`, `jqXHR`.
**data-request-complete** | JavaScript код, который выполняется после окончания запроса. Доступные переменные: `this`, `context`, `textStatus`, `jqXHR`.
**data-request-loading** | CSS селектор элемента, который будет показан во время выполнения запроса. Вы можете использовать эту опцию для отображения индикатора загрузки. Эта функция использует jQuery функции `show()` и `hide()` для управления видимостью элемента.
**data-request-form** | CSS селектор формы, которая будет использоваться для получения данных. Если значение не указано, то используется ближайшая форма к инициирующему элементу.
**data-request-flash** | указывает серверу очистить и отправить [флеш-сообщение](../ajax/extras#ajax-flash) с полученым результатом.
**data-request-files** | разрешает загружать файлы.
**data-track-input** | применяется для тега `input` типа `text` или `password` и вызывает обработчик при изменении значения пользователем. Имеет необязательный параметр - время до отправления запроса (в миллисекундах).

Атрибут `data-request` можно использовать в:

Элемент | Событие
------------- | -------------
**Форма** | при отправке.
**Ссылка, кнопка** | при нажатии.
**Поле типа `text`, `number` и `password`** | когда изменяется значение и добавлен атрибут `data-track-input`.
**Select, checkboxes, radios** | когда выбран один из элементов.

<a name="data-attribute-examples" id="data-attribute-examples" class="anchor"></a>
## Примеры

Использование обработчика `onCalculate` при отправке формы и обновлением элемента, имеющего идентификатор `"result"`, фрагментом **calcresult**:

    <form data-request="onCalculate" data-request-update="calcresult: '#result'">

Вызов окна с подтверждением запроса:

    <form ... >
        ...
        <button data-request="onDelete" data-request-confirm="Are you sure?">Delete</button>

Перенаправление на другую страницу после успешного запроса:

    <form data-request="onLogin" data-request-redirect="/admin">

Вызов окна после успешного запроса:

    <form data-request="onLogin" data-request-success="alert('Yay!')">

Отправка параметра `mode` со значением `update`:

    <form data-request="onUpdate" data-request-data="mode: 'update'">

Отправка параметра `id` со значением `7`:

    <div data-request-data="id: 7">
        <button data-request="onDelete">Delete</button>
        <button data-request="onSave">Update</button>
    </div>

[Загрузка файлов](../services/request-input#files):

    <form data-request="onSubmit" data-request-files>
        <input type="file" name="photo" accept="image/*" />
        <button type="submit">Submit</button>
    </form>

15.02.2019
