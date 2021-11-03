# Дополнительные функции AJAX

Вы можете добавить дополнительные CSS и JavaScript файлы при помощи `{% framework extras %}` на страницу, чтобы использовать расширенные возможности AJAX фреймворка.

<a name="loader-stripe" id="loader-stripe" class="anchor"></a>
## Индикатор загрузки

Вы можете использовать индикатор загрузки, который отображается наверху страницы во время выполнения AJAX запроса.

Перед выполнением AJAX запроса срабатывает событие `ajaxPromise`, которое отображает индикатор загрузки наверху страницы и меняет внешний вид курсора. События `ajaxFail` и` ajaxDone` используются для того, чтобы определить выполнился ли запрос и скрыть индикатор загрузки.

<a name="ajax-validation" id="ajax-validation" class="anchor"></a>
## Валидация формы

Добавьте атрибут `data-request-validate` в тег `form`, чтобы использовать валидацию.

    <form
        data-request="onSubmit"
        data-request-validate>
        <!-- ... -->
    </form>

<a name="throw-validation-exception" id="throw-validation-exception" class="anchor"></a>
### Обработка исключений

Вы можете использовать класс `ValidationException` в своем обработчике для [отображения ошибок](./services-error-log#validation-exception) в форме. Метод принимает один аргумент - массив с именами полей и сообщениями об ошибках.

    function onSubmit()
    {
        throw new ValidationException(['name' => 'You must give a name!']);
    }

> **Note**: You can also pass an instance of the [validation service](../services/validation) as the first argument of the exception.

<a name="error-messages" id="error-messages" class="anchor"></a>
### Отображение сообщений об ошибках

Используйте тег с атрибутом `data-validate-error` внутри формы для отображения первого сообщения об ошибке.

    <div data-validate-error></div>

Используйте тег с атрибутом `data-message` для отображения всех ошибок.

    <div class="alert alert-danger" data-validate-error>
        <p data-message></p>
    </div>

Вы можете использовать события `ajaxInvalidField` и `ajaxPromise`, чтобы добавить свои классы при валидации элементов.

    $(window).on('ajaxInvalidField', function(event, fieldElement, fieldName, errorMsg, isFirst) {
        $(fieldElement).closest('.form-group').addClass('has-error');
    });

    $(document).on('ajaxPromise', '[data-request]', function() {
        $(this).closest('form').find('.form-group.has-error').removeClass('has-error');
    });

<a name="field-errors" id="field-errors" class="anchor"></a>
### Отображение ошибок рядом с полями

Используйте тег с атрибутом `data-validate-for`, чтобы отобразить ошибку рядом с полем.

    <!-- Input field -->
    <input name="phone" />

    <!-- Validation message for the field -->
    <div data-validate-for="phone"></div>

Если содержимое элемента пустое, то отобразится сообщение, которое пришло с сервера. Но Вы также можете указать произвольный текст.

    <div data-validate-for="phone">
        Oops.. phone number is invalid!
    </div>

<a name="loader-button" id="loader-button" class="anchor"></a>
## Индикатор загрузки на кнопке

Если элемент содержит атрибут `data-attach-loading`, то во время выполнения AJAX запроса у него появится класс `oc-loading`.

    <form data-request="onSubmit">
        <button data-attach-loading>
            Submit
        </button>
    </form>

    <a
        href="#"
        data-request="onDoSomething"
        data-attach-loading>
        Do something
    </a>

<a name="ajax-flash" id="ajax-flash" class="anchor"></a>
## Flash сообщения

Используйте атрибут `data-request-flash` в элементе формы

    <form
        data-request="onSuccess"
        data-request-flash>
        <!-- ... -->
    </form>

и фасад `Flash` в обработчике

    function onSuccess()
    {
        Flash::success('You did it!');
    }

для отображения флэш-сообщений при успешном выполнении AJAX запроса.

Вы можете отобразить стандартное [флэш-сообщение](./markup-tag-flash) при загрузке страницы при помощи следующего кода на странице или макете.

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

<a name="usage-example" id="usage-example" class="anchor"></a>
## Примеры

Пример валидации формы.

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
            Submit
        </button>

        <div class="alert alert-danger" data-validate-error>
            <p data-message></p>
        </div>

    </form>

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

        Flash::success('Jobs done!');
    }

19.02.2019
