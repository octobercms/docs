# 队列

## 配置

队列允许您将耗时任务(例如发送电子邮件)的处理推迟到稍后的时间，从而大大加快了对应用程序的 Web 请求。

队列配置文件存储在 `config/queue.php` 中。在此文件中，您将找到包含的每个队列驱动程序的连接配置，例如数据库、 [Beanstalkd](http://kr.github.com/beanstalkd), [IronMQ](http://iron.io), [Amazon SQS](http://aws.amazon.com/sqs), [Redis](http://redis.io), null,和同步(供本地使用)驱动程序。 `null` 队列驱动程序只是丢弃排队的任务，因此它们永远不会被执行。

### 驱动程序先决条件

在使用 Amazon SQS、Beanstalkd、IronMQ 或 Redis 驱动程序之前，您需要安装 [Drivers 插件](https://octobercms.com/plugin/october-drivers).

## 基本用法

#### 将任务推送到队列中

要将新任务推送到队列中，请使用 `Queue::push` 方法:

```php
Queue::push('SendEmail', ['message' => $message]);
```

`push` 方法的第一个参数是应该用于处理作业的类的名称。 第二个参数是应该传递给处理程序的数据数组。 任务处理程序应该像这样定义：

```php
class SendEmail
{
    public function fire($job, $data)
    {
        //
    }
}
```

请注意，唯一需要的方法是`fire`，它接收一个`Job`实例以及推送到队列中的`data`数组

#### 指定自定义处理程序方法

如果您希望作业使用 `fire` 以外的方法，可以在推送作业时指定方法：

```php
Queue::push('SendEmail@send', ['message' => $message]);
```

#### 为作业指定队列名称

您还可以指定应将作业发送到的队列/管道：

```php
Queue::push('SendEmail@send', ['message' => $message], 'emails');
```

#### 延迟作业的执行

有时您可能希望延迟排队作业的执行。 例如，您可能希望在注册 15 分钟后将向客户发送电子邮件的工作排队。 您可以使用 `Queue::later` 方法完成此操作：

```php
$date = Carbon::now()->addMinutes(15);

Queue::later($date, 'SendEmail', ['message' => $message]);
```

在此示例中，我们使用 [Carbon](https://github.com/briannesbitt/Carbon) 日期库来指定我们希望分配给作业的延迟。 或者，您可以将希望延迟的秒数作为整数传递。

> **注意**:Amazon SQS 服务的延迟限制为 900 秒(15 分钟)。

#### 队列和模型

如果您的队列作业在其数据中使用模型，则只有模型的标识符将被序列化到队列中。 当实际处理作业时，队列系统会自动从数据库中重新检索完整的模型实例。 这对您的应用程序来说是完全透明的，并且可以防止序列化完整模型实例可能出现的问题。

#### 删除已处理的作业

处理完作业后，必须将其从队列中删除，这可以通过 `Job` 实例上的 `delete` 方法完成：

```php
public function fire($job, $data)
{
    // 处理作业...

    $job->delete();
}
```

#### 将作业释放回队列

如果您希望将作业释放回队列中，可以通过 `release` 方法进行

```php
public function fire($job, $data)
{
    // Process the job...

    $job->release();
}
```

您还可以指定在发布作业之前等待的秒数：

```php
$job->release(5);
```

#### 检查运行尝试次数

如果在处理作业时发生异常，它将自动释放回队列中。 您可以使用 `attempts` 方法检查已尝试运行该作业的次数:

```php
if ($job->attempts() > 3) {
    //
}
```

#### 访问作业 ID

您还可以访问作业标识符：

```php
$job->getJobId();
```

## 排队关闭

你也可以将 Closure 推送到队列中。 这对于需要排队的快速、简单的任务非常方便：

#### 将闭包推入队列

```php
Queue::push(function($job) use ($id) {
    Account::delete($id);

    $job->delete();
});
```

> **注意**: 不要通过 `use` 指令让队列中的闭包可以使用对象，而是考虑传递主键并从队列作业中重新拉出关联的模型。 这通常可以避免意外的序列化行为。

使用 Iron.io 推送队列 时, 您应该采取额外的预防措施排队闭包。 接收队列消息的端点应检查令牌以验证请求实际上来自 Iron.io。例如，您的推送队列端点应该类似于: `https://example.com/queue/receive?token=SecretToken`.然后，您可以在编组队列请求之前检查应用程序中秘密令牌的值。

## 运行队列工作者

October CMS 包括一些 [控制台命令](../console/commands.md) 它们将处理队列中的作业。

要在新作业被推送到队列时对其进行处理，请运行 `queue:work` 命令：

    php artisan queue:work

此任务启动后，它将继续运行，直到手动停止。 您可以使用例如[Supervisor](#oc-supervisor-configuration)之类的进程监视器来确保队列工作者不会停止运行。

队列工作进程将启动的应用程序状态存储在内存中。 启动后，它们将无法识别您的代码中的更改。 部署更改时，重新启动队列工作程序。

#### 处理单个作业

要仅处理队列中的第一个作业，请使用`--once` 选项:

    php artisan queue:work --once

#### 指定连接和队列

您还可以指定工作人员应该使用哪个队列连接：

    php artisan queue:work --once connection

您可以将一个以逗号分隔的队列连接列表传递给 `work` 命令来设置队列优先级：

    php artisan queue:work --once --queue=high,low

在此示例中 `high` 队列上的作业将始终在移至 `low` 队列中的作业之前进行处理。.

#### 指定作业超时参数

您还可以设置每个作业应允许运行的时间长度(以秒为单位)：

    php artisan queue:work --once --timeout=60

#### 指定队列睡眠持续时间

此外，您可以指定在轮询新作业之前等待的秒数：

    php artisan queue:work --once --sleep=5

请注意，如果队列中没有作业，队列只会"sleeps"。如果有更多工作可用，队列将继续工作而不sleeping。

## 守护进程队列工作者

默认情况下，`queue:work` 将在不重新启动框架的情况下处理作业。与 `queue:work --once` 命令相比，这会显着减少 CPU 使用率，但会增加部署期间需要排空当前正在执行作业的队列的复杂性。

要在守护进程模式下启动队列工作者，只需省略 `--once` 标志：

    php artisan queue:work connection

    php artisan queue:work connection --sleep=3

    php artisan queue:work connection --sleep=3 --tries=3

您可以使用 `php artisan help queue:work` 命令查看所有可用选项。

### 使用守护进程队列工作人员部署

使用守护进程队列工作者部署应用程序的最简单方法是在部署开始时将应用程序置于维护模式。这可以使用后端设置区域来完成。一旦应用程序处于维护模式，October 将不会接受队列外的任何新作业，但会继续处理现有作业。

重启workers的最简单方法是在部署脚本中包含以下命令：

    php artisan queue:restart

此命令将指示所有队列工作人员在处理完当前作业后重新启动。

> **注意**: 此命令依赖于缓存系统来安排重启。默认情况下，APCu 不适用于 CLI 命令。如果您使用的是 APCu，请将 `apc.enable_cli=1` 添加到您的 APCu 配置中。

### 守护进程队列工作者的编码

守护进程队列工作人员在处理每个作业之前不会重新启动平台。因此，您应该小心在工作完成之前释放任何大量资源。例如，如果您正在使用 GD 库进行图像处理，您应该在完成后使用 `imagedestroy` 释放内存。

同样，您的数据库连接在被长时间运行的守护程序使用时可能会断开。你可以使用 `Db::reconnect` 方法来确保你有一个新的连接。

<a id="oc-supervisor-configuration"></a>
## 主管配置

### 安装主管

Supervisor 是 Linux 操作系统的进程监视器，如果它失败会自动重启你的 `queue:work` 进程。要在 Ubuntu 上安装 Supervisor，您可以使用以下命令：

    sudo apt-get install supervisor

### 配置主管

主管配置文件通常存储在 `/etc/supervisor/conf.d` 目录中。在这个目录中，你可以创建任意数量的配置文件来指示主管应该如何监控你的进程。例如，让我们创建一个启动和监控 `queue:work` 进程的 `october-worker.conf` 文件：

    [program:october-worker]
    process_name=%(program_name)s_%(process_num)02d
    command=php /path/to/october/artisan queue:work --sleep=3 --tries=3
    autostart=true
    autorestart=true
    user=october
    numprocs=8
    redirect_stderr=true
    stdout_logfile=/path/to/october/worker.log

在这个例子中，`numprocs` 指令将指示 Supervisor 运行 8 个 `queue:work` 进程并监控所有进程，如果它们失败则自动重新启动它们。当然，您应该更改命令指令的 `queue:work` 部分以反映您所需的队列连接。 `user` 指令应更改为有权运行该命令的用户名。


### 启动主管

创建配置文件后，您可以使用以下命令更新 Supervisor 配置并启动进程：

    sudo supervisorctl reread

    sudo supervisorctl update

    sudo supervisorctl start october-worker:*

有关 Supervisor 的更多信息，请参阅 [Supervisor 文献资料](http://supervisord.org/index.html).

## 失败的作业

由于事情并不总是按计划进行，有时您排队的作业会失败 别担心 有一种方便的方法可以指定应尝试作业的最大次数。 在作业超过此尝试次数后，它将被插入到 `failed_jobs` 表中。 可以通过 config/queue.php 配置文件配置失败的作业表名称。

您可以使用 `queue:work` 命令上的 `--tries` 开关来指定应尝试作业的最大次数：

    php artisan queue:work connection-name --tries=3

如果您想注册一个在队列作业失败时将调用的事件，您可以使用 `Queue::failing` 方法。此活动是通过电子邮件或其他第三方服务通知您.

```php
Queue::failing(function($connection, $job, $data) {
    //
});
```

您还可以直接在队列作业类上定义 `failed` 方法，允许您在发生故障时执行特定于作业的操作：

```php
public function failed($data)
{
    // 作业失败时调用...
}
```

`data` 的原始数组也将自动传递给失败的方法。

### 重试失败的作业

要查看所有失败的作业，您可以使用 `queue:failed` Artisan 命令：

    php artisan queue:failed

`queue:failed` 命令将列出作业 ID、连接、队列和失败时间。 作业 ID 可用于重试失败的作业。 例如，要重试 ID 为 5 的失败作业，应发出以下命令

    php artisan queue:retry 5

如果您想删除失败的作业，可以使用 `queue:forget` 命令：

    php artisan queue:forget 5

要删除所有失败的作业，您可以使用 `queue:flush` 命令：

    php artisan queue:flush
