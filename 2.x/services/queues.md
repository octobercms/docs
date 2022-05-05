# Queues

## Configuration

Queues allow you to defer the processing of a time consuming task, such as sending an e-mail, until a later time, thus drastically speeding up the web requests to your application.

The queue configuration file is stored in `config/queue.php`. In this file you will find connection configurations for each of the queue drivers that are included, such as a database, [Beanstalkd](https://beanstalkd.github.io), [IronMQ](http://iron.io), [Amazon SQS](https://aws.amazon.com/sqs/), [Redis](https://redis.io), null, and synchronous (for local use) driver. The `null` queue driver simply discards queued jobs so they are never executed.

### Driver prerequisites

Before using the Amazon SQS, Beanstalkd, IronMQ or Redis drivers you will need to install [Drivers plugin](https://octobercms.com/plugin/october-drivers).

## Basic usage

#### Pushing a job onto the queue

To push a new job onto the queue, use the `Queue::push` method:

```php
Queue::push('SendEmail', ['message' => $message]);
```

The first argument given to the `push` method is the name of the class that should be used to process the job. The second argument is an array of data that should be passed to the handler. A job handler should be defined like so:

```php
class SendEmail
{
    public function fire($job, $data)
    {
        //
    }
}
```

Notice the only method that is required is `fire`, which receives a `Job` instance as well as the array of `data` that was pushed onto the queue.

#### Specifying a custom handler method

If you want the job to use a method other than `fire`, you may specify the method when you push the job:

```php
Queue::push('SendEmail@send', ['message' => $message]);
```

#### Specifying a queue name for a job

You may also specify the queue / tube a job should be sent to:

```php
Queue::push('SendEmail@send', ['message' => $message], 'emails');
```

#### Delaying the execution of a job

Sometimes you may wish to delay the execution of a queued job. For instance, you may wish to queue a job that sends a customer an e-mail 15 minutes after sign-up. You can accomplish this using the `Queue::later` method:

```php
$date = Carbon::now()->addMinutes(15);

Queue::later($date, 'SendEmail', ['message' => $message]);
```

In this example, we're using the [Carbon](https://github.com/briannesbitt/Carbon) date library to specify the delay we wish to assign to the job. Alternatively, you may pass the number of seconds you wish to delay as an integer.

> **Note**: The Amazon SQS service has a delay limit of 900 seconds (15 minutes).

#### Queues and models

If your queued job takes a model in its data, only the identifier for the model will be serialized onto the queue. When the job is actually handled, the queue system will automatically re-retrieve the full model instance from the database. It's all totally transparent to your application and prevents issues that can arise from serializing full model instances.

#### Deleting a processed job

Once you have processed a job, it must be deleted from the queue, which can be done via the `delete` method on the `Job` instance:

```php
public function fire($job, $data)
{
    // Process the job...

    $job->delete();
}
```

#### Releasing a job back onto the queue

If you wish to release a job back onto the queue, you may do so via the `release` method:

```php
public function fire($job, $data)
{
    // Process the job...

    $job->release();
}
```

You may also specify the number of seconds to wait before the job is released:

```php
$job->release(5);
```

#### Checking the number of run attempts

If an exception occurs while the job is being processed, it will automatically be released back onto the queue. You may check the number of attempts that have been made to run the job using the `attempts` method:

```php
if ($job->attempts() > 3) {
    //
}
```

#### Accessing the job ID

You may also access the job identifier:

```php
$job->getJobId();
```

## Queueing closures

You may also push a Closure onto the queue. This is very convenient for quick, simple tasks that need to be queued:

#### Pushing a closure onto the queue

```php
Queue::push(function($job) use ($id) {
    Account::delete($id);

    $job->delete();
});
```

> **Note**: Instead of making objects available to queued Closures via the `use` directive, consider passing primary keys and re-pulling the associated models from within your queue job. This often avoids unexpected serialization behavior.

When using Iron.io push queues, you should take extra precaution queueing Closures. The end-point that receives your queue messages should check for a token to verify that the request is actually from Iron.io. For example, your push queue end-point should be something like: `https://example.com/queue/receive?token=SecretToken`. You may then check the value of the secret token in your application before marshalling the queue request.

## Running the queue worker

October CMS includes some [console commands](../console/commands.md) that will process jobs in the queue.

To process new jobs as they are pushed onto the queue, run the `queue:work` command:

    php artisan queue:work

Once this task has started, it will continue to run until it is manually stopped. You may use a process monitor such as [Supervisor](#oc-supervisor-configuration) to ensure that the queue worker does not stop running.

Queue worker processes store the booted application state in memory. They will not recognize changes in your code after they have been started. When deploying changes, restart queue workers.

#### Processing a single job

To process only the first job on the queue, use the `--once` option:

    php artisan queue:work --once

#### Specifying the connection & Queue

You may also specify which queue connection the worker should utilize:

    php artisan queue:work --once connection

You may pass a comma-delimited list of queue connections to the `work` command to set queue priorities:

    php artisan queue:work --once --queue=high,low

In this example, jobs on the `high` queue will always be processed before moving onto jobs from the `low` queue.

#### Specifying the job timeout parameter

You may also set the length of time (in seconds) each job should be allowed to run:

    php artisan queue:work --once --timeout=60

#### Specifying queue sleep duration

In addition, you may specify the number of seconds to wait before polling for new jobs:

    php artisan queue:work --once --sleep=5

Note that the queue only "sleeps" if no jobs are on the queue. If more jobs are available, the queue will continue to work them without sleeping.

## Daemon queue worker

By default `queue:work` will process jobs without ever re-booting the framework. This results in a significant reduction of CPU usage when compared to the `queue:work --once` command, but at the added complexity of needing to drain the queues of currently executing jobs during your deployments.

To start a queue worker in daemon mode, simply omit the `--once` flag:

    php artisan queue:work connection

    php artisan queue:work connection --sleep=3

    php artisan queue:work connection --sleep=3 --tries=3

You may use the `php artisan help queue:work` command to view all of the available options.

### Deploying with daemon queue workers

The simplest way to deploy an application using daemon queue workers is to put the application in maintenance mode at the beginning of your deployment. This can be done using the back-end settings area. Once the application is in maintenance mode, October will not accept any new jobs off of the queue, but will continue to process existing jobs.

The easiest way to restart your workers is to include the following command in your deployment script:

    php artisan queue:restart

This command will instruct all queue workers to restart after they finish processing their current job.

> **Note**: This command relies on the cache system to schedule the restart. By default, APCu does not work for CLI commands. If you are using APCu, add `apc.enable_cli=1` to your APCu configuration.

### Coding for daemon queue workers

Daemon queue workers do not restart the platform before processing each job. Therefore, you should be careful to free any heavy resources before your job finishes. For example, if you are doing image manipulation with the GD library, you should free the memory with `imagedestroy` when you are done.

Similarly, your database connection may disconnect when being used by long-running daemon. You may use the `Db::reconnect` method to ensure you have a fresh connection.

<a id="oc-supervisor-configuration"></a>
## Supervisor configuration

### Installing Supervisor

Supervisor is a process monitor for the Linux operating system, and will automatically restart your `queue:work` process if it fails. To install Supervisor on Ubuntu, you may use the following command:

    sudo apt-get install supervisor

### Configuring Supervisor

Supervisor configuration files are typically stored in the `/etc/supervisor/conf.d` directory. Within this directory, you may create any number of configuration files that instruct supervisor how your processes should be monitored. For example, let's create a `october-worker.conf` file that starts and monitors a `queue:work` process:

    [program:october-worker]
    process_name=%(program_name)s_%(process_num)02d
    command=php /path/to/october/artisan queue:work --sleep=3 --tries=3
    autostart=true
    autorestart=true
    user=october
    numprocs=8
    redirect_stderr=true
    stdout_logfile=/path/to/october/worker.log

In this example, the `numprocs` directive will instruct Supervisor to run 8 `queue:work` processes and monitor all of them, automatically restarting them if they fail. Of course, you should change the `queue:work` portion of the command directive to reflect your desired queue connection. The `user` directive should be changed to the name of a user that has permission to run the command.

### Starting Supervisor

Once the configuration file has been created, you may update the Supervisor configuration and start the processes using the following commands:

    sudo supervisorctl reread

    sudo supervisorctl update

    sudo supervisorctl start october-worker:*

For more information on Supervisor, consult the [Supervisor documentation](http://supervisord.org/index.html).

## Failed Jobs

Since things don't always go as planned, sometimes your queued jobs will fail. Don't worry, it happens to the best of us! There is a convenient way to specify the maximum number of times a job should be attempted. After a job has exceeded this amount of attempts, it will be inserted into a `failed_jobs` table. The failed jobs table name can be configured via the `config/queue.php` configuration file.

You can specify the maximum number of times a job should be attempted using the `--tries` switch on the `queue:work` command:

    php artisan queue:work connection-name --tries=3

If you would like to register an event that will be called when a queue job fails, you may use the `Queue::failing` method. This event is a great opportunity to notify your team via e-mail or another third party service.

```php
Queue::failing(function($connection, $job, $data) {
    //
});
```

You may also define a `failed` method directly on a queue job class, allowing you to perform job specific actions when a failure occurs:

```php
public function failed($data)
{
    // Called when the job is failing...
}
```

The original array of `data` will also be automatically passed onto the failed method.

### Retrying Failed Jobs

To view all of your failed jobs, you may use the `queue:failed` Artisan command:

    php artisan queue:failed

The `queue:failed` command will list the job ID, connection, queue, and failure time. The job ID may be used to retry the failed job. For instance, to retry a failed job that has an ID of 5, the following command should be issued:

    php artisan queue:retry 5

If you would like to delete a failed job, you may use the `queue:forget` command:

    php artisan queue:forget 5

To delete all of your failed jobs, you may use the `queue:flush` command:

    php artisan queue:flush
