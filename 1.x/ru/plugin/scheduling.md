# Планирование задач

- [Введение](#introduction)
- [Создание задач](#defining-schedules)
    - [Параметры частоты выполнения](#schedule-frequency-options)
    - [Предотвращение перекрытия задач](#preventing-task-overlaps)
- [Вывод](#task-output)
- [Хуки](#task-hooks)

<a name="introduction" class="anchor"></a>
## Введение

Раньше разработчики настраивали через SSH крон на сервере для каждой новой задачи. Теперь Вы можете использовать плагины! Нужно указать лишь одну запись в кроне!

> **Примечание**: См. [руководство по установке](./setup-installation#crontab-setup для настройки крона.

<a name="defining-schedules" class="anchor"></a>
## Создание

Вы можете определить все запланированные задачи в методе `registerSchedule` в [классе регистрации плагина](registration#registration-file). Метод принимает один аргумент `$schedule`.

Пример:

    class Plugin extends PluginBase
    {
        [...]

        public function registerSchedule($schedule)
        {
            $schedule->call(function () {
                \Db::table('recent_users')->delete();
            })->daily();
        }
    }

Вы также можете вызывать [консольные команды](./console-commands) по расписанию. Пример:

    $schedule->command('cache:clear')->daily();

Используйте `exec` для создания команд операционной системе:

    $schedule->exec('node /home/acme/script.js')->daily();

<a name="schedule-frequency-options" class="anchor"></a>
### Параметры частоты выполнения

Метод  | Описание
------------- | -------------
`->cron('* * * * *');`  |  Выполнить задачу в произвольный момент времени
`->everyMinute();`  |  Выполнять задачу каждую минуту
`->everyFiveMinutes();`  |  Выполнять задачу каждые 5 минут
`->everyTenMinutes();`  |  Выполнять задачу каждые 10 минут
`->everyThirtyMinutes();`  |  Выполнять задачу каждые пол часа
`->hourly();`  |  Выполнять задачу каждый час
`->daily();`  |  Выполнять задачу каждый день в полночь
`->dailyAt('13:00');`  |  Выполнять задачу каждый день в 13:00
`->twiceDaily(1, 13);`  |  Выполнять задачу каждый день в 01:00 и 13:00
`->weekly();`  |  Выполнять задачу каждую неделю
`->monthly();`  |  Выполнять задачу каждый месяц

Эти методы могут сочетаться с дополнительными условиями для создания более тонкой настройки. Пример задачи, которая выполняется еженедельно в понедельник в 13:00:

    $schedule->call(function () {
        // Runs once a week on Monday at 13:00...
    })->weekly()->mondays()->at('13:00');

Дополнительные условия:

Метод  | Описание
------------- | -------------
`->weekdays();`  |  в будние дни
`->sundays();`  |  по воскресеньям
`->mondays();`  |  по понедельникам
`->tuesdays();`  |  по вторникам
`->wednesdays();`  |  по средам
`->thursdays();`  |  по четвергам
`->fridays();`  |  по пятницам
`->saturdays();`  |  по субботам
`->when(Closure);`  |  произвольное условие

#### Произвольное условие

Метод `when` используется для ограничения выполнения задачи. Другими словами, если заданное `Closure` возвращает` true`, задача будет выполняться до тех пор, пока не наступит другое условие:

    $schedule->command('emails:send')->daily()->when(function () {
        return true;
    });

<a name="preventing-task-overlaps" class="anchor"></a>
### Предотвращение перекрытия задач

По умолчанию запланированные задачи будут выполняться, даже если предыдущий экземпляр все еще запущен. Чтобы предотвратить это, Вы можете использовать метод `withoutOverlapping`:

    $schedule->command('emails:send')->withoutOverlapping();

<a name="task-output" class="anchor"></a>
## Вывод

Планировщик предоставляет несколько удобных методов для работы с результатами, которые генерируют задачами. Во-первых, используя метод `sendOutputTo`, Вы можете отправить результат в файл для последующей проверки:

    $schedule->command('emails:send')
             ->daily()
             ->sendOutputTo($filePath);

Вы также можете отправить результаты задачи на почту при помощи метода `emailOutputTo`, но после того как запишите их в файл. Не забудьте настроить [почтовый сервис](../services/mail):

    $schedule->command('foo')
             ->daily()
             ->sendOutputTo($filePath)
             ->emailOutputTo('foo@example.com');

> **Примечание:** Вы можете использовать методы `emailOutputTo` и `sendOutputTo` только с методом `command`!.

<a name="task-hooks" class="anchor"></a>
## Хуки

Используйте методы `before` и` after`, чтобы указать код, который должен быть выполнен до или после завершения запланированной задачи:

    $schedule->command('emails:send')
             ->daily()
             ->before(function () {
                 // Task is about to start...
             })
             ->after(function () {
                 // Task is complete...
             });

#### Pinging URLs

Используйте методы `pingBefore` и` thenPing`, чтобы автоматически пинговать заданный URL до или после завершения задачи. Этот метод полезен для уведомления внешней службы о том, что запланированное задание начинается или завершается:

    $schedule->command('emails:send')
             ->daily()
             ->pingBefore($url)
             ->thenPing($url);

> Вы должны установить [Drivers plugin](http://octobercms.com/plugin/october-drivers) перед тем как использовать `pingBefore($url)` или `thenPing($url)`.
