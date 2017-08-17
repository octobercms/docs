# Queue service

- [Configuration](#configuration)
- [Basic usage](#basic-usage)
- [Queueing closures](#queueing-closures)
- [Running the queue listener](#running-the-queue-listener)
- [Daemon queue worker](#daemon-queue-worker)
- [Push queues](#push-queues)
- [Failed jobs](#failed-jobs)

<a name="configuration"></a>
## Configuration

Queues allow you to defer the processing of a time consuming task, such as sending an e-mail, until a later time, thus drastically speeding up the web requests to your application.

The queue configuration file is stored in `config/queue.php`. In this file you will find connection configurations for each of the queue drivers that are included, such as a database, [Beanstalkd](http://kr.github.com/beanstalkd), [IronMQ](http://iron.io), [Amazon SQS](http://aws.amazon.com/sqs), [Redis](http://redis.io), null, and synchronous (for local use) driver. The `null` queue driver simply discards queued jobs so they are never executed.

### Driver prerequisites

Before using the Amazon SQS, Beanstalkd, IronMQ or Redis drivers you will need to install [Drivers plugin](http://octobercms.com/plugin/october-drivers).

<a name="basic-usage"></a>
## Basic usage

#### Pushing a job onto the queue

To push a new job onto the queue, use the `Queue::push` method:

    Queue::push('SendEmail', ['message' => $message]);

The first argument given to the `push` method is the name of the class that should be used to process the job. The second argument is an array of data that should be passed to the handler. A job handler should be defined like so:

    class SendEmail
    {
        public function fire($job, $data)
        {
            //
        }
    }

Notice the only method that is required is `fire`, which receives a `Job` instance as well as the array of `data` that was pushed onto the queue.

#### Specifying a custom handler method

If you want the job to use a method other than `fire`, you may specify the method when you push the job:

    Queue::push('SendEmail@send', ['message' => $message]);

#### Specifying a queue name for a job

You may also specify the queue / tube a job should be sent to:

    Queue::push('SendEmail@send', ['message' => $message], 'emails');

#### Delaying the execution of a job

Sometimes you may wish to delay the execution of a queued job. For instance, you may wish to queue a job that sends a customer an e-mail 15 minutes after sign-up. You can accomplish this using the `Queue::later` method:

    $date = Carbon::now()->addMinutes(15);

    Queue::later($date, 'SendEmail', ['message' => $message]);

In this example, we're using the [Carbon](https://github.com/briannesbitt/Carbon) date library to specify the delay we wish to assign to the job. Alternatively, you may pass the number of seconds you wish to delay as an integer.

> **Note:** The Amazon SQS service has a delay limit of 900 seconds (15 minutes).

#### Queues and models

If your queued job takes a model in its data, only the identifier for the model will be serialized onto the queue. When the job is actually handled, the queue system will automatically re-retrieve the full model instance from the database. It's all totally transparent to your application and prevents issues that can arise from serializing full model instances.

#### Deleting a processed job

Once you have processed a job, it must be deleted from the queue, which can be done via the `delete` method on the `Job` instance:

    public function fire($job, $data)
    {
        // Process the job...

        $job->delete();
    }

#### Releasing a job back onto the queue

If you wish to release a job back onto the queue, you may do so via the `release` method:

    public function fire($job, $data)
    {
        // Process the job...

        $job->release();
    }

You may also specify the number of seconds to wait before the job is released:

    $job->release(5);

#### Checking the number of run attempts

If an exception occurs while the job is being processed, it will automatically be released back onto the queue. You may check the number of attempts that have been made to run the job using the `attempts` method:

    if ($job->attempts() > 3) {
        //
    }

#### Accessing the job ID

You may also access the job identifier:

    $job->getJobId();

<a name="queueing-closures"></a>
## Queueing closures

You may also push a Closure onto the queue. This is very convenient for quick, simple tasks that need to be queued:

#### Pushing a closure onto the queue

    Queue::push(function($job) use ($id) {
        Account::delete($id);

        $job->delete();
    });

> **Note:** Instead of making objects available to queued Closures via the `use` directive, consider passing primary keys and re-pulling the associated models from within your queue job. This often avoids unexpected serialization behavior.

When using Iron.io [push queues](#push-queues), you should take extra precaution queueing Closures. The end-point that receives your queue messages should check for a token to verify that the request is actually from Iron.io. For example, your push queue end-point should be something like: `https://example.com/queue/receive?token=SecretToken`. You may then check the value of the secret token in your application before marshalling the queue request.

<a name="running-the-queue-listener"></a>
## Running the queue listener

October includes some [console commands](../console/commands) that will process jobs in the queue.

#### Processing the first job on the queue

To process only the first job on the queue, you may use the `queue:work` command:

    php artisan queue:work

#### Starting the queue listener

To listen for new jobs as they are pushed onto the queue. You may run this task using the `queue:listen` command:

    php artisan queue:listen

You may also specify which queue connection the listener should utilize:

    php artisan queue:listen connection

Note that once this task has started, it will continue to run until it is manually stopped. You may use a process monitor such as [Supervisor](http://supervisord.org/) to ensure that the queue listener does not stop running.

You may pass a comma-delimited list of queue connections to the `listen` command to set queue priorities:

    php artisan queue:listen --queue=high,low

In this example, jobs on the `high-connection` will always be processed before moving onto jobs from the `low-connection`.

#### Specifying the job timeout parameter

You may also set the length of time (in seconds) each job should be allowed to run:

    php artisan queue:listen --timeout=60

#### Specifying queue sleep duration

In addition, you may specify the number of seconds to wait before polling for new jobs:

    php artisan queue:listen --sleep=5

Note that the queue only "sleeps" if no jobs are on the queue. If more jobs are available, the queue will continue to work them without sleeping.

<a name="daemon-queue-worker"></a>
## Daemon queue worker

The `queue:work` also includes a `--daemon` option for forcing the queue worker to continue processing jobs without ever re-booting the framework. This results in a significant reduction of CPU usage when compared to the `queue:listen` command, but at the added complexity of needing to drain the queues of currently executing jobs during your deployments.

To start a queue worker in daemon mode, use the `--daemon` flag:

    php artisan queue:work connection --daemon

    php artisan queue:work connection --daemon --sleep=3

    php artisan queue:work connection --daemon --sleep=3 --tries=3

As you can see, the `queue:work` command supports most of the same options available to `queue:listen`. You may use the `php artisan help queue:work` command to view all of the available options.

### Deploying with daemon queue workers

The simplest way to deploy an application using daemon queue workers is to put the application in maintenance mode at the beginning of your deployment. This can be done using the back-end settings area. Once the application is in maintenance mode, October will not accept any new jobs off of the queue, but will continue to process existing jobs.

The easiest way to restart your workers is to include the following command in your deployment script:

    php artisan queue:restart

This command will instruct all queue workers to restart after they finish processing their current job.

> **Note:** This command relies on the cache system to schedule the restart. By default, APCu does not work for CLI commands. If you are using APCu, add `apc.enable_cli=1` to your APCu configuration.

### Coding for daemon queue workers

Daemon queue workers do not restart the platform before processing each job. Therefore, you should be careful to free any heavy resources before your job finishes. For example, if you are doing image manipulation with the GD library, you should free the memory with `imagedestroy` when you are done.

Similarly, your database connection may disconnect when being used by long-running daemon. You may use the `Db::reconnect` method to ensure you have a fresh connection.

<a name="push-queues"></a>
## Push queues

Push queues allow you to utilize the powerful queue facilities without running any daemons or background listeners. Currently, push queues are only supported by the [Iron.io](http://iron.io) driver. Before getting started, create an Iron.io account, and add your Iron credentials to the `config/queue.php` configuration file.

#### Registering a push queue subscriber

Next, you may use the `queue:subscribe` Artisan command to register a URL end-point that will receive newly pushed queue jobs:

    php artisan queue:subscribe queue_name queue/receive

    php artisan queue:subscribe queue_name http://example.com/queue/receive

Now, when you login to your Iron dashboard, you will see your new push queue, as well as the subscribed URL. You may subscribe as many URLs as you wish to a given queue. Next, create a route for your `queue/receive` end-point and return the response from the `Queue::marshal` method:

    Route::post('queue/receive', function() {
        return Queue::marshal();
    });

The `marshal` method will take care of firing the correct job handler class. To fire jobs onto the push queue, just use the same `Queue::push` method used for conventional queues.

<a name="failed-jobs"></a>
## Failed jobs

Since things don't always go as planned, sometimes your queued jobs will fail. Don't worry, it happens to the best of us! There is a convenient way to specify the maximum number of times a job should be attempted. After a job has exceeded this amount of attempts, it will be inserted into a `failed_jobs` table. The failed jobs table name can be configured via the `config/queue.php` configuration file.

You can specify the maximum number of times a job should be attempted using the `--tries` switch on the `queue:listen` command:

    php artisan queue:listen connection-name --tries=3

If you would like to register an event that will be called when a queue job fails, you may use the `Queue::failing` method. This event is a great opportunity to notify your team via e-mail or another third party service.

    Queue::failing(function($connection, $job, $data) {
        //
    });

You may also define a `failed` method directly on a queue job class, allowing you to perform job specific actions when a failure occurs:

    public function failed()
    {
        // Called when the job is failing...
    }

### Retrying failed jobs

To view all of your failed jobs, you may use the `queue:failed` Artisan command:

    php artisan queue:failed

The `queue:failed` command will list the job ID, connection, queue, and failure time. The job ID may be used to retry the failed job. For instance, to retry a failed job that has an ID of 5, the following command should be issued:

    php artisan queue:retry 5

If you would like to delete a failed job, you may use the `queue:forget` command:

    php artisan queue:forget 5

To delete all of your failed jobs, you may use the `queue:flush` command:

    php artisan queue:flush
