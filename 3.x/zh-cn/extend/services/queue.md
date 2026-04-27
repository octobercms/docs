# 队列

队列允许你将耗时任务的处理推迟到稍后的时间，例如发送电子邮件，从而大大加快应用程序的 Web 请求速度。

## 配置

队列配置文件存储在 `config/queue.php` 中。在此文件中，你将找到包含的每个队列驱动程序的连接配置，如数据库、[Beanstalkd](https://beanstalkd.github.io)、[Amazon SQS](https://aws.amazon.com/sqs/)、[Redis](https://redis.io)、null 和同步（用于本地使用）驱动程序。`null` 队列驱动程序简单地丢弃排队的作业，因此它们永远不会被执行。

### 驱动程序先决条件

以下列出的队列驱动程序需要相应的依赖项。这些依赖项可以通过 Composer 包管理器安装。

连接 | 包
------------- | -------------
Amazon SQS | `aws/aws-sdk-php ~3.0`
Beanstalkd | `pda/pheanstalk ~4.0`
Redis      | `predis/predis ~1.0` 或 phpredis PHP 扩展

## 基本用法

要将新作业推送到队列，请使用 `Queue::push` 方法。

```php
Queue::push(SendEmail::class, ['message' => $message]);
```

传递给 `push` 方法的第一个参数是应该用于处理作业的类名。第二个参数是应该传递给处理程序的数据数组。作业处理程序可以定义为文件 **app/SendEmail.php**，如下所示。

```php
class SendEmail
{
    public function fire($job, $data)
    {
        //
    }
}
```

请注意，唯一需要的方法是 `fire`，它接收一个 `Job` 实例以及推送到队列上的 `data` 数组。如果你想让作业使用 `fire` 以外的方法，可以在推送作业时指定该方法：

```php
Queue::push('SendEmail@send', ['message' => $message]);
```

#### 为作业指定队列名称

你也可以指定作业应该发送到的队列/管道：

```php
Queue::push('SendEmail@send', ['message' => $message], 'emails');
```

#### 延迟作业的执行

有时你可能希望延迟排队作业的执行。例如，你可能希望在用户注册 15 分钟后排队一个发送电子邮件的作业。你可以使用 `Queue::later` 方法来实现：

```php
$date = Carbon::now()->addMinutes(15);

Queue::later($date, 'SendEmail', ['message' => $message]);
```

在此示例中，我们使用 [Carbon](https://github.com/briannesbitt/Carbon) 日期库来指定我们希望分配给作业的延迟。或者，你可以传递希望延迟的秒数作为整数。

> **注意**：Amazon SQS 服务的延迟限制为 900 秒（15 分钟）。

#### 队列和模型

如果你的排队作业在其数据中接受模型，则只有模型的标识符会被序列化到队列中。当作业实际被处理时，队列系统将自动从数据库重新获取完整的模型实例。这对你的应用程序完全透明，并防止了序列化完整模型实例可能出现的问题。

#### 删除已处理的作业

一旦你处理了一个作业，它必须从队列中删除，这可以通过 `Job` 实例上的 `delete` 方法完成：

```php
public function fire($job, $data)
{
    // 处理作业...

    $job->delete();
}
```

#### 将作业释放回队列

如果你希望将作业释放回队列，可以通过 `release` 方法来实现：

```php
public function fire($job, $data)
{
    // 处理作业...

    $job->release();
}
```

你也可以指定在作业释放前等待的秒数：

```php
$job->release(5);
```

#### 检查运行尝试次数

如果在处理作业时发生异常，它将自动被释放回队列。你可以使用 `attempts` 方法检查运行作业的尝试次数：

```php
if ($job->attempts() > 3) {
    //
}
```

#### 访问作业 ID

你还可以访问作业标识符：

```php
$job->getJobId();
```

## 排队闭包

你也可以将闭包推送到队列。这对于需要排队的快速、简单任务非常方便：

#### 将闭包推送到队列

```php
Queue::push(function($job) use ($id) {
    Account::delete($id);

    $job->delete();
});
```

::: tip
不要通过 `use` 指令使对象可用于排队的闭包，而是考虑传递主键并从队列作业中重新获取关联的模型。这通常可以避免意外的序列化行为。
:::

## 运行队列工作进程

October CMS 包含一些控制台命令，用于处理队列中的作业。要在作业被推送到队列时处理新作业，请运行 `queue:work` 命令：

```bash
php artisan queue:work
```

一旦此任务启动，它将持续运行直到手动停止。你可以使用进程监控工具（如 [Supervisor](#oc-supervisor-configuration)）来确保队列工作进程不会停止运行。

队列工作进程将已启动的应用程序状态存储在内存中。它们在启动后不会识别代码的更改。部署更改时，请重新启动队列工作进程。

#### 处理单个作业

要仅处理队列中的第一个作业，请使用 `--once` 选项：

```bash
php artisan queue:work --once
```

#### 指定连接和队列

你也可以指定工作进程应使用的队列连接：

```bash
php artisan queue:work --once connection
```

你可以将以逗号分隔的队列连接列表传递给 `work` 命令以设置队列优先级：

```bash
php artisan queue:work --once --queue=high,low
```

在此示例中，`high` 队列上的作业将始终在处理 `low` 队列上的作业之前被处理。

#### 指定作业超时参数

你也可以设置每个作业允许运行的时间长度（以秒为单位）：

```bash
php artisan queue:work --once --timeout=60
```

#### 指定队列休眠时间

此外，你可以指定在轮询新作业之前等待的秒数：

```bash
php artisan queue:work --once --sleep=5
```

请注意，队列仅在没有作业时才会"休眠"。如果有更多可用的作业，队列将继续处理它们而不休眠。

## 守护进程队列工作进程

默认情况下，`queue:work` 会在不重新启动框架的情况下处理作业。与 `queue:work --once` 命令相比，这大大减少了 CPU 使用量，但增加了在部署期间需要清空当前正在执行的作业队列的复杂性。

要以守护进程模式启动队列工作进程，只需省略 `--once` 标志：

```bash
php artisan queue:work connection

php artisan queue:work connection --sleep=3

php artisan queue:work connection --sleep=3 --tries=3
```

你可以使用 `php artisan help queue:work` 命令查看所有可用选项。

### 使用守护进程队列工作进程进行部署

使用守护进程队列工作进程部署应用程序的最简单方法是在部署开始时将应用程序置于维护模式。这可以通过后台设置区域完成。一旦应用程序处于维护模式，October 将不接受来自队列的任何新作业，但会继续处理现有作业。

重新启动工作进程的最简单方法是在部署脚本中包含以下命令：

```bash
php artisan queue:restart
```

此命令将指示所有队列工作进程在完成当前作业的处理后重新启动。

::: tip
此命令依赖于缓存系统来调度重新启动。默认情况下，APCu 不适用于 CLI 命令。如果你使用 APCu，请在 APCu 配置中添加 `apc.enable_cli=1`。
:::

### 为守护进程队列工作进程编码

守护进程队列工作进程在处理每个作业之前不会重新启动平台。因此，你应该注意在作业完成之前释放任何重量级资源。例如，如果你使用 GD 库进行图像处理，应在完成后使用 `imagedestroy` 释放内存。

同样，你的数据库连接在被长时间运行的守护进程使用时可能会断开连接。你可以使用 `Db::reconnect` 方法来确保获得新的连接。

<a id="oc-supervisor-configuration"></a>
## Supervisor 配置

### 安装 Supervisor

Supervisor 是 Linux 操作系统的进程监控器，如果你的 `queue:work` 进程失败，它将自动重新启动。要在 Ubuntu 上安装 Supervisor，你可以使用以下命令：

```bash
sudo apt-get install supervisor
```

### 配置 Supervisor

Supervisor 配置文件通常存储在 `/etc/supervisor/conf.d` 目录中。在此目录中，你可以创建任意数量的配置文件，指示 Supervisor 如何监控你的进程。例如，让我们创建一个 `october-worker.conf` 文件来启动和监控 `queue:work` 进程。

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

在此示例中，`numprocs` 指令将指示 Supervisor 运行 8 个 `queue:work` 进程并监控所有进程，如果它们失败则自动重新启动。当然，你应该更改 command 指令中的 `queue:work` 部分以反映你所需的队列连接。`user` 指令应更改为具有运行命令权限的用户名。

### 启动 Supervisor

创建配置文件后，你可以使用以下命令更新 Supervisor 配置并启动进程：

```bash
sudo supervisorctl reread

sudo supervisorctl update

sudo supervisorctl start october-worker:*
```

有关 Supervisor 的更多信息，请参阅 [Supervisor 文档](http://supervisord.org/index.html)。

## 失败的作业

由于事情并不总是按计划进行，有时你的排队作业会失败。别担心，这在最好的情况下也会发生！有一种便捷的方式来指定作业应该被尝试的最大次数。作业超过此尝试次数后，它将被插入到 `failed_jobs` 表中。失败作业的表名可以通过 `config/queue.php` 配置文件进行配置。

你可以使用 `queue:work` 命令上的 `--tries` 开关来指定作业应该被尝试的最大次数：

```bash
php artisan queue:work connection-name --tries=3
```

如果你想注册一个在队列作业失败时被调用的事件，可以使用 `Queue::failing` 方法。此事件是通过电子邮件或其他第三方服务通知你的团队的好机会。

```php
Queue::failing(function($connection, $job, $data) {
    //
});
```

你还可以直接在队列作业类上定义 `failed` 方法，允许你在发生失败时执行特定于作业的操作：

```php
public function failed($data)
{
    // 当作业失败时调用...
}
```

原始的 `data` 数组也将自动传递给 failed 方法。

### 重试失败的作业

要查看所有失败的作业，你可以使用 `queue:failed` Artisan 命令：

```bash
php artisan queue:failed
```

`queue:failed` 命令将列出作业 ID、连接、队列和失败时间。作业 ID 可用于重试失败的作业。例如，要重试 ID 为 5 的失败作业，应发出以下命令：

```bash
php artisan queue:retry 5
```

如果你想删除失败的作业，可以使用 `queue:forget` 命令：

```bash
php artisan queue:forget 5
```

要删除所有失败的作业，可以使用 `queue:flush` 命令：

```bash
php artisan queue:flush
```
