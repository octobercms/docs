# События ( Events )

- [Использование](#basic-usage)
- [Подписка на события](#events-subscribing)
    - [Где писать код ?](#event-registration)
    - [Подписка на событие с приоритетом](#subscribing-priority)
    - [Прерывание обработки события](#subscribing-halting)
    - [Обработчики по шаблону (wildcard)](#wildcard-listeners)
- [Вызов событий ( Firing events )](#events-firing)
    - [Передача аргументов по ссылке](#event-pass-by-reference)
    - [Очередь событий](#queued-events)
- [Использование классов в качестве слушателей](#using-classes-as-listeners)
    - [Определение метода-подписчика](#event-class-method)
    - [Определение класса-подписчика](#event-class-subscribe)
- [Трейт](#event-emitter-trait)

<a href="basic-usage" name="basic-usage" class="anchor"></a>
## Использование

Класс `Event` содержит простую реализацию концепции Observer ("Наблюдатель"), что позволяет Вам подписываться на уведомления о событиях (listen for events) в вашем приложении. Пример:

    Event::listen('auth.login', function($user) {
        $user->last_login = new DateTime;
        $user->save();
    });

Вы можете получить доступ к этому событию при помощи метода `Event::fire`, который позволяет расширить логику Вашего приложения:

    Event::fire('auth.login', [$user]);

<a href="events-subscribing" name="events-subscribing" class="anchor"></a>
## Подписка на события

Вы можете использовать метод `Event::listen` в любом месте. Первый аргумент - название события.

    Event::listen('acme.blog.myevent', ...);

Второй аргумент - функция-замыкание с [произвольными аргументами](#events-firing).

    Event::listen('acme.blog.myevent', function($arg1, $arg2) {
        // Do something
    });

Вы также можете передать ссылку на вызываемый объект или на [класс](#using-classes-as-listeners).

    Event::listen('auth.login', [$this, 'LoginHandler']);

> **Примечание**: Вы можете указать все аргументы, их часть или ничего. В любом случае событие не будет вызывать никаких ошибок, если их не указано слишком много.

<a href="event-registration" name="event-registration" class="anchor"></a>
### Где писать код ?

Наиболее подходящее место - метод `boot` в [файле регистрации плагина](./plugin/registration#registration-methods).

    class Plugin extends PluginBase
    {
        [...]

        public function boot()
        {
            Event::listen(...);
        }
    }

Вы также можете использовать файл  **init.php** в папке с плагином. Пример:

    <?php

    Event::listen(...);

<a href="subscribing-priority" name="subscribing-priority" class="anchor"></a>
### Подписка на событие с приоритетом

При подписке на событие Вы можете указать приоритет. Обработчики с более высоким приоритетом будут вызваны перед теми, чей приоритет ниже, а обработчики с одинаковым приоритетом будут вызываться в порядке их регистрации.

    // Run first
    Event::listen('auth.login', function() { ... }, 10);

    // Run second
    Event::listen('auth.login', function() { ... }, 5);

<a href="subscribing-halting" name="subscribing-halting" class="anchor"></a>
### Прерывание обработки события

Иногда Вам может быть нужно пропустить вызовы других обработчиков события. Вы можете сделать это, вернув значение `false`:

    Event::listen('auth.login', function($event) {
        // Handle the event

        return false;
    });

<a href="wildcard-listeners" name="wildcard-listeners" class="anchor"></a>
### Обработчики по шаблону (wildcard)

Вы можете использовать звёздочки (*) при регистрации обработчика для привязки его ко всем подходящим событиям. Пример:

    Event::listen('foo.*', function($param) {
        // Handle the event...
    });

Используйте метод `Event::firing`, для определения того, какое именно событие из подходящих под `foo.*` поймано:

    Event::listen('foo.*', function($param) {
        if (Event::firing() == 'foo.bar') {
            // ...
        }
    });

<a href="events-firing" name="events-firing" class="anchor"></a>
## Вызов событий ( Firing events )

Вы можете использовать метод `Event::fire` в любом месте вашего кода, чтобы сделать логику расширяемой. Это означает, что другие разработчики или даже Ваш собственный  код могут «подключиться» к этой точке и добавить новую логику. Первый аргумент - название события.

    Event::fire('myevent')

Вы можете использовать в качестве префикса пространство имен, чтобы избежать конфликты с другими плагинами.

    Event::fire('acme.blog.myevent');

Второй аргумент - произвольный массив данных, которые будут использоваться в качестве аргументов в методе `Event::listen`.

    Event::fire('acme.blog.myevent', [$arg1, $arg2]);

Третий аргумент указывает на то, что [событие должно прерываться](#subscribing-halting), если возвращаемое значение - "non null". По умолчанию этот аргумент имеет значение `false`.

    Event::fire('acme.blog.myevent', [...], true);

    // Single result, event halted
    $result = Event::fire('acme.blog.myevent', [...], true);

    // Collection of results, all events fired
    $results = Event::fire('acme.blog.myevent', [...]);

<a href="event-pass-by-reference" name="event-pass-by-reference" class="anchor"></a>
## Передача аргументов по ссылке

Вы можете передать переменную по ссылке, чтобы изменить ее содержимое:

    // $content = '111'
    Event::fire('cms.processContent', [&$content]);

Пример:

    Event::listen('cms.processContent', function (&$content) {
        $content = $content . 'A';
    });

    Event::listen('cms.processContent', function (&$content) {
        $content = $content . 'B';
    });
    
В итоге: `$content = '111AB'`.

<a href="queued-events" name="queued-events" class="anchor"></a>
### Очередь событий

Вы можете использовать метод `Event::queue`, чтобы отложить выполнение события и добавить его в [очередь](./services/queues).

    Event::queue('foo', [$user]);

Используйте метод `Event::flush`, чтобы удалить все события из очереди.

    Event::flush('foo');

<a href="using-classes-as-listeners" name="using-classes-as-listeners" class="anchor"></a>
## Использование классов в качестве слушателей

Вы можете использовать классы для обработки событий.

<a href="event-class-method" name="event-class-method" class="anchor"></a>
### Определение метода-подписчика

Вы можете определить класс для обработки событий, передав его название в качестве второго аргумента.

    Event::listen('auth.login', 'LoginHandler');

По умолчанию буде вызываться метод `handle` класса `LoginHandler`:

    class LoginHandler
    {
        public function handle($data)
        {
            // ...
        }
    }

Вы можете заменить этот метода на любой другой:

    Event::listen('auth.login', 'LoginHandler@onLogin');

<a href="event-class-subscribe" name="event-class-subscribe" class="anchor"></a>
### Определение класса-подписчика

Подписчики на события (Event Class Subscribers) - классы, которые могут быть подписаны на несколько событий и содержать сразу несколько обработчиков событий. Такой класс должен иметь метод `subscribe`, который принимает в аргументах инстанс диспетчера событий:

    class UserEventHandler
    {
        /**
         * Handle user login events.
         */
        public function userLogin($event)
        {
            // ...
        }

        /**
         * Handle user logout events.
         */
        public function userLogout($event)
        {
            // ...
        }

        /**
         * Register the listeners for the subscriber.
         *
         * @param  Illuminate\Events\Dispatcher  $events
         * @return array
         */
        public function subscribe($events)
        {
            $events->listen('auth.login', 'UserEventHandler@userLogin');

            $events->listen('auth.logout', 'UserEventHandler@userLogout');
        }
    }

После того как класс определён, его можно зарегистрировать следующим образом:

    Event::subscribe(new UserEventHandler);

Вы также можете использовать [сервис-контейнер](./application) для того, чтобы получить объект своего подписчика на события:

    Event::subscribe('UserEventHandler');

<a href="event-emitter-trait" name="event-emitter-trait" class="anchor"></a>
## Трейт

Вы можете использовать трейт `October\Rain\Support\Traits\Emitter`, чтобы связать события с экземпляром объекта внутри вашего класса.

    class UserManager
    {
        use \October\Rain\Support\Traits\Emitter;
    }

Этот трейт позволяет "слушать" события при помощи метода `bindEvent`.

    $manager = new UserManager;
    $manager->bindEvent('user.beforeRegister', function($user) {
        // Check if the $user is a spammer
    });

Метод `fireEvent` используется для «выстреливания» события.

    $manager = new UserManager;
    $manager->fireEvent('user.beforeRegister', [$user]);

Эти события будут происходить только для локального объекта.
