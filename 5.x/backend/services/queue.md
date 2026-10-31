---
previousPath: extend/services/queue.md
subtitle: Defer time consuming tasks, such as sending email, to a queue that a background worker processes.
---
# Queue

Queues let you defer a time consuming task, such as sending an email, until later. This makes web requests to your application much faster.

```php
Queue::push(SendEmail::class, ['message' => $message]);
```

## Configuring the Queue

The queue configuration file is stored in **config/queue.php**. In this file you will find connection configurations for each of the included queue drivers: database, [Beanstalkd](https://beanstalkd.github.io), [Amazon SQS](https://aws.amazon.com/sqs/), [Redis](https://redis.io), null, and a synchronous driver for local use. The `null` queue driver discards queued jobs so they never run.

### Driver Prerequisites

The following queue drivers need these dependencies, which you can install with the Composer package manager.

Connection | Package
------------- | -------------
Amazon SQS | `aws/aws-sdk-php ^3.322.9`
Beanstalkd | `pda/pheanstalk ^5.0`
Redis      | `predis/predis ^2.3\|^3.0` or phpredis PHP extension

## Pushing Jobs onto the Queue

To push a new job onto the queue, use the `Queue::push` method.

```php
Queue::push(SendEmail::class, ['message' => $message]);
```

The first argument of the `push` method is the name of the class that processes the job. The second argument is an array of data to pass to the handler. For example, define a job handler in the file **app/SendEmail.php**.

```php
class SendEmail
{
    public function fire($job, $data)
    {
        //
    }
}
```

The only required method is `fire`, which receives a `Job` instance and the array of `data` that was pushed onto the queue. To use a method other than `fire`, specify the method when you push the job.

```php
Queue::push('SendEmail@send', ['message' => $message]);
```

#### Specifying a Queue Name for a Job

You can also specify the queue, or tube, that a job is sent to.

```php
Queue::push('SendEmail@send', ['message' => $message], 'emails');
```

#### Delaying the Execution of a Job

To delay a queued job, use the `Queue::later` method. For example, you may want to send a customer an email 15 minutes after they sign up.

```php
$date = Carbon::now()->addMinutes(15);

Queue::later($date, 'SendEmail', ['message' => $message]);
```

This example uses the [Carbon](https://github.com/briannesbitt/Carbon) date library to set the delay for the job. You can also pass the number of seconds to delay as an integer.

::: tip
The Amazon SQS service has a delay limit of 900 seconds (15 minutes).
:::

#### Passing Models to a Job

The data you push onto the queue is stored as JSON, so a model passed in the data array reaches the job as plain attribute data. Pass the model's primary key instead, and look up the model again inside the job.

#### Deleting a Processed Job

Once you have processed a job, you must delete it from the queue. Use the `delete` method on the `Job` instance.

```php
public function fire($job, $data)
{
    // Process the job...

    $job->delete();
}
```

#### Releasing a Job Back onto the Queue

To release a job back onto the queue, use the `release` method.

```php
public function fire($job, $data)
{
    // Process the job...

    $job->release();
}
```

You can also specify the number of seconds to wait before the job is released.

```php
$job->release(5);
```

#### Checking the Number of Run Attempts

If an exception occurs while the job is processed, the job is released back onto the queue. Check the number of attempts made to run the job with the `attempts` method.

```php
if ($job->attempts() > 3) {
    //
}
```

#### Accessing the Job ID

You can also access the job identifier.

```php
$job->getJobId();
```

## Queueing Closures

You can also push a Closure onto the queue. This is useful for quick, small tasks.

```php
Queue::push(function($job) use ($id) {
    Account::delete($id);

    $job->delete();
});
```

::: tip
Instead of making objects available to queued Closures with the `use` directive, pass primary keys and fetch the associated models again from within your queue job. This often avoids unexpected serialization behavior.
:::

## Running the Queue Worker

October CMS includes console commands that process jobs in the queue. To process new jobs as they are pushed onto the queue, run the `queue:work` command.

```bash
php artisan queue:work
```

Once started, this task runs until you stop it. Use a process monitor such as [Supervisor](#oc-supervisor-configuration) to keep the queue worker running.

Queue worker processes store the booted application state in memory, so they do not notice changes to your code after they start. Restart queue workers when you deploy changes.

#### Processing a Single Job

To process only the first job on the queue, use the `--once` option.

```bash
php artisan queue:work --once
```

#### Specifying the Connection & Queue

You can also specify which queue connection the worker uses.

```bash
php artisan queue:work --once connection
```

To set queue priorities, pass a comma-delimited list of queue names to the `--queue` option.

```bash
php artisan queue:work --once --queue=high,low
```

In this example, jobs on the `high` queue are always processed before jobs on the `low` queue.

#### Specifying the Job Timeout Parameter

You can also set the time in seconds that each job is allowed to run.

```bash
php artisan queue:work --once --timeout=60
```

#### Specifying Queue Sleep Duration

You can also specify the number of seconds to wait before polling for new jobs.

```bash
php artisan queue:work --once --sleep=5
```

The queue only "sleeps" when no jobs are on the queue. If more jobs are available, the queue keeps working through them without sleeping.

## Running a Daemon Queue Worker

By default `queue:work` processes jobs without ever rebooting the framework. This uses much less CPU than the `queue:work --once` command, but you need to drain the queues of running jobs during your deployments.

To start a queue worker in daemon mode, leave out the `--once` flag.

```bash
php artisan queue:work connection

php artisan queue:work connection --sleep=3

php artisan queue:work connection --sleep=3 --tries=3
```

Run the `php artisan help queue:work` command to view all of the available options.

### Deploying with Daemon Queue Workers

The simplest way to deploy an application that uses daemon queue workers is to put the application in maintenance mode at the start of your deployment, using the `php artisan down` command. While the application is in maintenance mode, October CMS does not take any new jobs off the queue, but it finishes processing the current ones.

To restart your workers, include the following command in your deployment script.

```bash
php artisan queue:restart
```

This command tells all queue workers to restart after they finish processing their current job.

::: tip
This command relies on the cache system to schedule the restart. By default, APCu does not work for CLI commands. If you use APCu, add `apc.enable_cli=1` to your APCu configuration.
:::

### Coding for Daemon Queue Workers

Daemon queue workers do not restart the platform before processing each job, so free any heavy resources before your job finishes. For example, if you manipulate images with the GD library, free the memory with `imagedestroy` when you are done.

Your database connection may also disconnect when a long-running daemon uses it. Use the `Db::reconnect` method to make sure you have a fresh connection.

<a id="oc-supervisor-configuration"></a>
## Supervisor Configuration

### Installing Supervisor

Supervisor is a process monitor for the Linux operating system, and restarts your `queue:work` process if it fails. To install Supervisor on Ubuntu, use the following command.

```bash
sudo apt-get install supervisor
```

### Configuring Supervisor

Supervisor configuration files are usually stored in the `/etc/supervisor/conf.d` directory. In this directory, you can create any number of configuration files that tell Supervisor how to monitor your processes. For example, create an `october-worker.conf` file that starts and monitors a `queue:work` process.

```ini
[program:october-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /path/to/october/artisan queue:work --sleep=3 --tries=3
autostart=true
autorestart=true
user=october
numprocs=8
redirect_stderr=true
stdout_logfile=/path/to/october/worker.log
```

In this example, the `numprocs` directive tells Supervisor to run 8 `queue:work` processes, monitor all of them and restart them if they fail. Change the `queue:work` part of the `command` directive to use your queue connection. Change the `user` directive to the name of a user that has permission to run the command.

### Starting Supervisor

Once you have created the configuration file, update the Supervisor configuration and start the processes with the following commands.

```bash
sudo supervisorctl reread

sudo supervisorctl update

sudo supervisorctl start october-worker:*
```

For more information, see the [Supervisor documentation](http://supervisord.org/index.html).

## Handling Failed Jobs

Sometimes your queued jobs will fail. You can specify the maximum number of times a job should be attempted. Once a job exceeds this number of attempts, it is inserted into a `failed_jobs` table. You can configure the failed jobs table name in the **config/queue.php** configuration file.

To specify the maximum number of attempts for a job, use the `--tries` switch on the `queue:work` command.

```bash
php artisan queue:work connection-name --tries=3
```

To register an event that is called when a queue job fails, use the `Queue::failing` method. The callback receives an event object with the `connectionName`, `job` and `exception` properties. This event is a good place to notify your team by email or another third party service.

```php
Queue::failing(function($event) {
    // $event->connectionName
    // $event->job
    // $event->exception
});
```

You can also define a `failed` method directly on a queue job class, to perform job specific actions when a failure occurs.

```php
public function failed($data)
{
    // Called when the job is failing...
}
```

The original array of `data` is passed to the `failed` method.

### Retrying Failed Jobs

To view all of your failed jobs, use the `queue:failed` Artisan command.

```bash
php artisan queue:failed
```

The `queue:failed` command lists the job ID, connection, queue and failure time. Use the job ID to retry the failed job. For example, to retry a failed job with an ID of 5, run the following command.

```bash
php artisan queue:retry 5
```

To delete a failed job, use the `queue:forget` command.

```bash
php artisan queue:forget 5
```

To delete all of your failed jobs, use the `queue:flush` command.

```bash
php artisan queue:flush
```

#### See Also

::: also
* [Running the Scheduler](../../setup/scheduler.md)
* [Scheduling Tasks](./scheduling.md)
* [Laravel Queues](https://laravel.com/docs/12.x/queues)
:::
