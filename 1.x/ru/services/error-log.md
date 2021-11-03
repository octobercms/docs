# Ошибки и Логирование

<a name="introduction" class="anchor"></a>
## Введение

При первом запуске OctoberCMS обработка ошибок и исключений уже настроена. Вы можете посмотреть логи двумя способами:

1. В файле: `storage/logs/system.log`.
1. В административной части сайта: *System > Logs > Event Log*.

Запись в журнале создается для определенных [исключений](#exception-types), когда отобразилась страница с ошибкой.

<a name="configuration" class="anchor"></a>
## Настройка

#### Детализация ошибок

Подробная детализация ошибок вашего приложения, отображаемая в браузере, контролируется параметром `debug` в файле `config/app.php`. По умолчанию подробные отчеты об ошибках включены. Это полезно для отладки и устранения различных проблем, которые могут возникнуть при разработке нового приложения. Иначе на странице отобразится только общее сообщение об ошибке.

Для локальной разработки Вы должны установить для параметра `debug` значение `true`. В вашей рабочей среде это значение всегда должно быть `false`.

    /*
    |--------------------------------------------------------------------------
    | Application Debug Mode
    |--------------------------------------------------------------------------
    |
    | When your application is in debug mode, detailed error messages with
    | stack traces will be shown on every error that occurs within your
    | application. If disabled, a simple generic error page is shown.
    |
    */

    'debug' => false,

#### Режимы логгирования

Октябрь поддерживает следующие режимы логгирования: `single`, `daily`, `syslog` и `errorlog`. Например, если Вы хотите использовать режим `daily` вместо `single`, Вы должны изменить параметр `log` в файле с настройками приложения `config/app.php`:

    'log' => 'daily'

<a name="exception-types" class="anchor"></a>
## Типы исключений

Октябрь «из коробки» поддерживает несколько видов исключений.

<a name="application-exception" class="anchor"></a>
### Application exception

Класс `October\Rain\Exception\ApplicationException` (или просто `ApplicationException`) - наиболее распространенный тип исключения. Оно используется, когда простое условие не сработало.

    throw new ApplicationException('You must be logged in to do that!');

Сообщение об ошибке будет упрощено и не будет содержать конфиденциальную информацию, такую как файл php и номер строки.

<a name="system-exception" class="anchor"></a>
### System exception

Класс `October\Rain\Exception\SystemException` (или просто `SystemException`) используется для критических ошибок, которые добавляются в логи.

    throw new SystemException('Unable to contact the mail server API');

При вызове этого исключения, отображается подробное сообщение об ошибке с номером файла и строки, в которой она произошла.

<a name="validation-exception" class="anchor"></a>
### Validation exception

Класс `October\Rain\Exception\ValidationException` (или просто `ValidationException`) используется для ошибок, которые связаны непосредственно с отправкой формы. Сообщение должно содержать массив с полями и сообщениями об ошибках.

    throw new ValidationException(['username' => 'Sorry that username is already taken!']);

Вы также можете передать экземпляр [службы проверки](./validation).

    $validation = Validator::make(...);

    if ($validation->fails()) {
        throw new ValidationException($validation);
    }

При вызове этого исключения [AJAX framework](../ajax/introduction) предоставит информацию в удобном для использования формате, и курсор сфокусируется на первом поле, где возникла ошибка.

<a name="ajax-exception" class="anchor"></a>
### AJAX exception

Класс `October\Rain\Exception\AjaxException` (или просто `AjaxException`) можно рассматривать в качестве «интеллектуальной ошибки». Он вернет 406 ошибку, что позволит передать ему произвольный контент.

    throw new AjaxException(['#flashMessages' => $this->renderPartial(...)]);

<a name="exception-handling" class="anchor"></a>
## Обработка исключений

Все исключения обрабатываются классом `October\Rain\Foundation\Exception\Handler`, который имеет два метода: `report` и `render`. Метод `report` используется для логгирования исключений, а `render` - для преобразования исключения в ответ, который можно отправить в браузер.

Вы также можете создавать произвольные обработчики, если это необходимо, при помощи метода `App::error`. Например, Вы можете создать обработчик, который обрабатывает только экземпляры `RuntimeException`:

    App::error(function(RuntimeException $exception) {
        // Handle the exception...
    });

Если обработчик исключений возвращает ответ, этот ответ будет отправлен в браузер, и никакие другие обработчики ошибок не будут вызваны:

    App::error(function(InvalidUserException $exception) {
        return 'Sorry! Something is wrong with this account!';
    });

Используйте метод `App::fatal`, чтобы прослушивать фатальные ошибки PHP:

    App::fatal(function($exception) {
        //
    });

Если у Вас есть несколько обработчиков исключений, то они должны быть определены от наиболее общих до наиболее частных. Так, например, обработчик, который обрабатывает все исключения типа `Exception`, должен быть определен перед произвольным исключением, таким как `SystemException`.

### Где разместить обработчики ошибок?

Обработчики ошибок, как и [обработчики событий](./events), обычно попадают в категорию «код начальной загрузки». Другими словами, они подготавливают ваше приложение для обработки запросов и должны быть выполнены перед вызовом маршрутизации или контроллера. Поэтому наиболее подходящее для них место - метод `boot` в [файле регистрации плагина](../plugin/registration#registration-methods). Также Вы можете использовать файл **init.php**, который должен находится в корне папки плагина, для того, чтобы описать логику регистрации обработчиков ошибок.

<a name="http-exceptions" class="anchor"></a>
## HTTP exceptions

Такие ошибки могут возникнуть во время обработки запроса от клиента. Это может быть ошибка "Страница не найдена" (http-код 404), "Требуется авторизация" (401) или даже "Ошибка сервера" (500). Для того, чтобы отправить такой ответ, используйте следующее:

    App::abort(404);

Опционально, Вы можете установить свой ответ для возврата в браузер:

    App::abort(403, 'Unauthorized action.');

Эти исключения могут быть возбуждены на любом этапе обработки запроса.

<a name="custom-error-page" class="anchor"></a>
### Произвольная страница ошибки

По умолчанию страница с ошибкой содержит секцию с кодом, номер строки и трассировку стека, где она возникла. Вы можете изменить эту страницу, установив значение параметра `debug` на **false** в файле с настройками `config/app.php` и создав страницу со следующим URL: `/error`.

<a name="logging" class="anchor"></a>
## Логгирование

По умолчанию October настроен так, чтобы создать один лог-файл в каталоге `storage/logs`. Вы можете записывать в логи информацию следующим образом:

    $user = User::find(1);
    Log::info('Showing user profile for user: '.$user->name);

Существует восемь уровней логгирования, которые определены в [RFC 5424](http://tools.ietf.org/html/rfc5424): **emergency**, **alert**, **critical**, **error**, **warning**, **notice**, **info** и **debug**.

    Log::emergency($error);
    Log::alert($error);
    Log::critical($error);
    Log::error($error);
    Log::warning($error);
    Log::notice($error);
    Log::info($error);
    Log::debug($error);

#### Контекстная информация

Массив с контекстными данными может быть также передан методами журнала. Эти контекстные данные будут отформатированы и отображены в сообщении:

    Log::info('User failed to login.', ['id' => $user->id]);

<a name="helpers" class="anchor"></a>
### Хелперы

Существует несколько глобальных методов, которые упрощают работу с логгированием. Функция `trace_log` - псевдоним `Log::info` с поддержкой массивов и исключениями.

    // Write a string value
    $val = 'Hello world';
    trace_log('The value is '.$val);

    // Dump an array value
    $val = ['Some', 'array', 'data'];
    trace_log($val);

    // Trace an exception
    try {
        //
    }
    catch (Exception $ex) {
        trace_log($ex);
    }

Функция `trace_sql` включает ведение журнала при работе с базой данных. При вызове она будет регистрировать каждую команду, отправленную в бд. Эти записи появляются только в файле `system.log` и не отображаются в журнале в административной части сайта.

    trace_sql();

    Db::table('users')->count();

    // select count(*) as aggregate from users
