---
previousPath: extend/system/scheduling.md
subtitle: Run closures, console commands and system commands on a schedule defined in your plugin registration file.
---
# Scheduling Tasks

The command scheduler lets you define recurring tasks in your plugin code. Your schedule stays in source control, and the server needs only a single Cron entry instead of one for every task.

::: aside
See [Running the Scheduler](../../setup/scheduler.md) for how to set up the Cron entry on your server.
:::

For example, this task runs a closure every day at midnight to clear a database table.

```php
class Plugin extends PluginBase
{
    // ...

    public function registerSchedule($schedule)
    {
        $schedule->call(function () {
            Db::table('recent_users')->delete();
        })->daily();
    }
}
```

<a id="oc-defining-schedules"></a>
## Defining Schedules

Define your scheduled tasks by overriding the `registerSchedule` method in the [plugin registration file](../plugins/extending.md). The method receives a single `$schedule` argument, which you use to define each task along with its frequency.

As well as closures, you can schedule [console commands](../console/commands.md) and operating system commands. Use the `command` method to schedule a console command.

```php
$schedule->command('cache:clear')->daily();
```

Use the `exec` method to run a command on the operating system.

```php
$schedule->exec('node /home/acme/script.js')->daily();
```

## Setting the Frequency

You can assign a task one of the following schedules.

Method  | Description
------------- | -------------
`->cron('* * * * *');`  |  Run the task on a custom Cron schedule
`->everyMinute();`  |  Run the task every minute
`->everyFiveMinutes();`  |  Run the task every five minutes
`->everyTenMinutes();`  |  Run the task every ten minutes
`->everyThirtyMinutes();`  |  Run the task every thirty minutes
`->hourly();`  |  Run the task every hour
`->daily();`  |  Run the task every day at midnight
`->dailyAt('13:00');`  |  Run the task every day at 13:00
`->twiceDaily(1, 13);`  |  Run the task daily at 1:00 & 13:00
`->weekly();`  |  Run the task every week
`->monthly();`  |  Run the task every month

### Limiting the Days

Combine these methods with extra constraints to run a task only on certain days of the week. For example, to run a task weekly on Monday:

```php
$schedule->call(function () {
    // Runs once a week on Monday at 13:00...
})->weekly()->mondays()->at('13:00');
```

The following constraints are available.

Method  | Description
------------- | -------------
`->weekdays();`  |  Limit the task to weekdays
`->sundays();`  |  Limit the task to Sunday
`->mondays();`  |  Limit the task to Monday
`->tuesdays();`  |  Limit the task to Tuesday
`->wednesdays();`  |  Limit the task to Wednesday
`->thursdays();`  |  Limit the task to Thursday
`->fridays();`  |  Limit the task to Friday
`->saturdays();`  |  Limit the task to Saturday
`->when(Closure);`  |  Limit the task based on a truth test

### Running a Task Conditionally

Use the `when` method to run a task based on the result of a truth test. If the closure returns `true`, the task runs, as long as no other constraint prevents it.

```php
$schedule->command('emails:send')->daily()->when(function () {
    return true;
});
```

## Preventing Task Overlaps

By default, a scheduled task runs even if the previous instance of the task is still running. Use the `withoutOverlapping` method to prevent this.

```php
$schedule->command('emails:send')->withoutOverlapping();
```

In this example, the `emails:send` console command runs every minute if it is not already running. This is useful for tasks whose execution time varies a lot, since you do not need to predict how long each run will take.

## Capturing Task Output

Use the `sendOutputTo` method to send the output of a task to a file for later inspection.

```php
$schedule->command('emails:send')
    ->daily()
    ->sendOutputTo($filePath);
```

Use the `emailOutputTo` method to email the output to an address of your choice. Configure the [mail services](../../setup/mail.md) before emailing the output of a task.

```php
$schedule->command('foo')
    ->daily()
    ->sendOutputTo($filePath)
    ->emailOutputTo('foo@example.tld');
```

::: tip
The `emailOutputTo` and `sendOutputTo` methods only work with the `command` and `exec` methods. They are not supported for `call`.
:::

## Running Code Before and After a Task

Use the `before` and `after` methods to run code before the task starts and after it is complete.

```php
$schedule->command('emails:send')
    ->daily()
    ->before(function () {
        // Task is about to start...
    })
    ->after(function () {
        // Task is complete...
    });
```

### Pinging URLs

Use the `pingBefore` and `thenPing` methods to ping a URL before the task starts or after it is complete. This is useful for notifying an external service that your scheduled task is starting or has finished.

```php
$schedule->command('emails:send')
    ->daily()
    ->pingBefore($url)
    ->thenPing($url);
```

#### See Also

::: also
* [Running the Scheduler](../../setup/scheduler.md)
* [Building Console Commands](../console/commands.md)
* [Queue](./queue.md)
:::
