# 计划任务

过去，开发人员会为他们需要安排的每个任务生成一个 Cron 条目。然而，这有时会让人头疼。您的计划任务不再受源代码控制，您必须通过 SSH 连接到您的服务器才能添加 Cron 条目。命令调度程序允许您在应用程序本身中流畅而明确地定义命令调度，并且您的服务器上只需要一个 Cron 条目。

> **注意**：有关如何设置计划任务的说明，请参阅[安装指南](../setup/installation.md#oc-setting-up-the-scheduler)。

<a id="oc-defining-schedules"></a>
## 定义时间表

您可以通过覆盖[插件注册类](registration.md#oc-registration-file) 中的`registerSchedule` 方法来定义所有计划任务。该方法将采用单个 `$schedule` 参数，用于定义命令及其频率。

首先，让我们看一个计划任务的示例。在这个例子中，我们将安排一个 `Closure` 每天午夜调用。在 `Closure` 中，我们将执行一个数据库查询来清除一个表：

```php
class Plugin extends PluginBase
{
    // ...

    public function registerSchedule($schedule)
    {
        $schedule->call(function () {
            \Db::table('recent_users')->delete();
        })->daily();
    }
}
```

除了调度`Closure`调用，你还可以调度[控制台命令](../console/commands.md)和操作系统命令。 例如，您可以使用 `command` 方法来调度控制台命令：

```php
$schedule->command('cache:clear')->daily();
```

`exec` 命令可用于向操作系统发出命令：

```php
$schedule->exec('node /home/acme/script.js')->daily();
```

### 计划频率选项

当然，您可以为您的任务分配多种时间表：

方法 | 描述
------------- | -------------
`->cron('* * * * *');`  |  按自定义 Cron 计划运行任务
`->everyMinute();`  |  每分钟运行一次任务
`->everyFiveMinutes();`  |  每五分钟运行一次任务
`->everyTenMinutes();`  |  每十分钟运行一次任务
`->everyThirtyMinutes();`  |  每三十分钟运行一次任务
`->hourly();`  |  每小时运行一次任务
`->daily();`  |  每天午夜运行任务
`->dailyAt('13:00');`  |  每天13:00运行任务
`->twiceDaily(1, 13);`  |  每天 1:00 和 13:00 运行任务
`->weekly();`  |  每周运行任务
`->monthly();`  |  每月运行任务

这些方法可以与额外的约束相结合，以创建仅在一周中的某些天运行的更精细调整的计划。 例如，要安排命令在每周星期一运行：

```php
$schedule->call(function () {
    // 每周一在 13:00 运行一次...
})->weekly()->mondays()->at('13:00');
```

以下是附加计划限制的列表：

方法 | 描述
------------- | -------------
`->weekdays();`  |  将任务限制在工作日
`->sundays();`  |  将任务限制在周日
`->mondays();`  |  将任务限制在星期一
`->tuesdays();`  |  将任务限制在星期二
`->wednesdays();`  |  将任务限制在周三
`->thursdays();`  |  将任务限制在星期四
`->fridays();`  |  将任务限制在周五
`->saturdays();`  |  将任务限制在星期六
`->when(Closure);`  |  根据真值测试限制任务

#### 真值测试约束

`when` 方法可用于根据给定真值测试的结果限制任务的执行。 换句话说，如果给定的 `Closure` 返回 `true`，只要没有其他约束条件阻止任务运行，任务就会执行：

```php
$schedule->command('emails:send')->daily()->when(function () {
    return true;
});
```

### 防止任务重叠

默认情况下，即使任务的前一个实例仍在运行，计划任务也会运行。 为了防止这种情况，您可以使用 `withoutOverlapping` 方法：

```php
$schedule->command('emails:send')->withoutOverlapping();
```

在这个例子中，如果`emails:send` [控制台命令](../console/commands.md) 尚未运行，它将每分钟运行一次。 如果您的任务的执行时间变化很大，则`withoutOverlapping`方法特别有用，这使您无需准确预测给定任务将花费多长时间。

## 任务输出

调度程序提供了几种方便的方法来处理调度任务生成的输出。 首先，使用 `sendOutputTo` 方法，您可以将输出发送到文件以供以后检查：

```php
$schedule->command('emails:send')
    ->daily()
    ->sendOutputTo($filePath);
```

使用 `emailOutputTo` 方法，您可以将输出通过电子邮件发送到您选择的电子邮件地址。 请注意，必须首先使用 `sendOutputTo` 方法将输出发送到文件。 同样在通过电子邮件发送任务输出之前，您应该配置 [邮件服务](../services/mail.md)：
```php
$schedule->command('foo')
    ->daily()
    ->sendOutputTo($filePath)
    ->emailOutputTo('foo@example.com');
```

> **注意**：`emailOutputTo` 和`sendOutputTo` 方法是`command` 方法独有的，`call` 不支持。

## 任务钩子

使用 `before` 和 `after` 方法，你可以指定在计划任务完成之前和之后执行的代码：

```php
$schedule->command('emails:send')
    ->daily()
    ->before(function () {
        // 任务即将开始……
    })
    ->after(function () {
        // 任务完成...
    });
```

#### Ping URL

使用`pingBefore` 和`thenPing` 方法，调度程序可以在任务完成之前或之后自动ping 给定的URL。 此方法可用于通知外部服务您的计划任务正在开始或完成：

```php
$schedule->command('emails:send')
    ->daily()
    ->pingBefore($url)
    ->thenPing($url);
```

> 您需要先安装 [Drivers 插件](https://octobercms.com/plugin/october-drivers)，然后才能使用 `pingBefore($url)` 或 `thenPing($url)` 功能。
