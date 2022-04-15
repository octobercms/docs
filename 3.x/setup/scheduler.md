---
subtitle: Learn how to run scheduled tasks and queues.
---
# Setting Up the Scheduler

For scheduled tasks to operate correctly, add the following [Cron job](https://www.cyberciti.biz/faq/how-do-i-add-jobs-to-cron-under-linux-or-unix-oses/) to the server:

```bash
* * * * * php /october/artisan schedule:run >> /dev/null 2>&1
```

Be sure to replace `/october/artisan` with the absolute path to the artisan file in the October CMS installation directory. This cron job will call the command scheduler every minute. Then October CMS evaluates any scheduled tasks and runs the due tasks.

::: tip
When adding a crontab file to /etc/cron.d, specify a user name after `* * * * *`:

```bash
* * * * * alice php /october/artisan schedule:run >> /dev/null 2>&1
```
:::

## Setting Up Queue Workers

You may optionally set up a queue driver for processing [queued jobs](../services/queues.html). The queue driver can be configured in the `config/queue.php` file.

For the database queue driver, you can set up a cron job running the command that invokes the first job available in the queue: `php artisan queue:work --once`.

Alternatively, it is possible to run the queue as a daemon process with

```bash
php artisan queue:work
```

#### See also

::: also
* [Queues](../services/queues.html)
:::