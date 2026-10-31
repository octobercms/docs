---
previousPath: setup/scheduler.md
subtitle: Add the cron job that runs scheduled tasks, and set up workers that process queued jobs.
---
# Running the Scheduler

Scheduled tasks only run when something on the server triggers them. Add this [Cron job](https://www.cyberciti.biz/faq/how-do-i-add-jobs-to-cron-under-linux-or-unix-oses/) to the server so October CMS can check for due tasks every minute:

```bash
* * * * * php /october/artisan schedule:run >> /dev/null 2>&1
```

Replace `/october/artisan` with the absolute path to the artisan file in your October CMS installation directory. The cron job calls the command scheduler every minute, and October CMS then runs any scheduled tasks that are due.

::: tip
When adding a crontab file to /etc/cron.d, specify a user name after `* * * * *`:

```bash
* * * * * alice php /october/artisan schedule:run >> /dev/null 2>&1
```
:::

## Setting Up Queue Workers

You can optionally set up a queue driver to process [queued jobs](../backend/services/queue.md). Configure the queue driver in the `config/queue.php` file.

For the database queue driver, add a cron job that processes the first available job in the queue with `php artisan queue:work --once`.

```bash
* * * * * php /october/artisan queue:work --once >> /dev/null 2>&1
```

Alternatively, run the queue as a daemon process.

```bash
php artisan queue:work
```

## Running Tasks Without Cron

If your web host does not provide a cron table, call a public URL every few minutes instead. For example, a plugin may require you to run this command every 15 minutes.

```bash
php artisan campaign:run
```

Build an endpoint that calls the command, using the `Artisan` facade in a [routes file](../backend/services/routing.md). For example, a **routes.php** file may contain the following.

```php
Route::get('/campaign-run', function () {
    return Artisan::call('campaign:run');
});
```

Opening the URL `/campaign-run` then calls the artisan command. Use an external service to request the URL on the schedule you need.

#### See Also

::: also
* [Task Scheduling](../backend/services/scheduling.md)
* [Queues](../backend/services/queue.md)
:::
