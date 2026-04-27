---
subtitle: 执行几乎任何事情的计划任务。
---
# 任务调度

::: aside
有关如何设置调度器任务的说明，请参阅[安装指南](../../setup/installation.md)。
:::

过去，开发者需要为每个需要调度的任务生成一个 Cron 条目。然而，这有时会很令人头疼。你的任务调度不再在源代码控制中，你必须通过 SSH 连接到服务器来添加 Cron 条目。命令调度器允许你在应用程序本身中流畅且富有表现力地定义命令调度，并且服务器上只需要一个 Cron 条目。

<a id="oc-defining-schedules"></a>
## 定义调度

你可以通过在[插件注册文件](../extending.md)中覆盖 `registerSchedule` 方法来定义所有计划任务。该方法将接受一个 `$schedule` 参数，用于定义命令及其执行频率。

让我们从一个调度任务的示例开始。在此示例中，我们将调度一个 `Closure` 在每天午夜被调用。在 `Closure` 中，我们将执行一个数据库查询来清空一个表：

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

除了调度 `Closure` 调用外，你还可以调度[控制台命令](../console-commands.md)和操作系统命令。例如，你可以使用 `command` 方法调度控制台命令：

```php
$schedule->command('cache:clear')->daily();
```

`exec` 命令可用于向操作系统发出命令：

```php
$schedule->exec('node /home/acme/script.js')->daily();
```

### 调度频率选项

当然，你可以为任务分配多种调度频率：

方法  | 描述
------------- | -------------
`->cron('* * * * *');`  |  按自定义 Cron 调度运行任务
`->everyMinute();`  |  每分钟运行任务
`->everyFiveMinutes();`  |  每五分钟运行任务
`->everyTenMinutes();`  |  每十分钟运行任务
`->everyThirtyMinutes();`  |  每三十分钟运行任务
`->hourly();`  |  每小时运行任务
`->daily();`  |  每天午夜运行任务
`->dailyAt('13:00');`  |  每天 13:00 运行任务
`->twiceDaily(1, 13);`  |  每天 1:00 和 13:00 运行任务
`->weekly();`  |  每周运行任务
`->monthly();`  |  每月运行任务

这些方法可以与附加约束组合使用，以创建更精细调整的调度，仅在一周中的特定日子运行。例如，调度一个命令在每周一运行：

```php
$schedule->call(function () {
    // Runs once a week on Monday at 13:00...
})->weekly()->mondays()->at('13:00');
```

以下是附加调度约束的列表：

方法  | 描述
------------- | -------------
`->weekdays();`  |  将任务限制在工作日
`->sundays();`  |  将任务限制在周日
`->mondays();`  |  将任务限制在周一
`->tuesdays();`  |  将任务限制在周二
`->wednesdays();`  |  将任务限制在周三
`->thursdays();`  |  将任务限制在周四
`->fridays();`  |  将任务限制在周五
`->saturdays();`  |  将任务限制在周六
`->when(Closure);`  |  基于条件测试限制任务

#### 条件测试约束

`when` 方法可用于根据给定条件测试的结果来限制任务的执行。换句话说，如果给定的 `Closure` 返回 `true`，则只要没有其他约束条件阻止任务运行，任务就会执行：

```php
$schedule->command('emails:send')->daily()->when(function () {
    return true;
});
```

### 防止任务重叠

默认情况下，即使前一个任务实例仍在运行，计划任务也会运行。要防止这种情况，你可以使用 `withoutOverlapping` 方法：

```php
$schedule->command('emails:send')->withoutOverlapping();
```

在此示例中，`emails:send` 控制台命令将每分钟运行，如果它尚未运行的话。`withoutOverlapping` 方法在你有执行时间差异很大的任务时特别有用，可以防止你需要精确预测给定任务将花费多长时间。

## 任务输出

调度器提供了几种便捷的方法来处理计划任务生成的输出。首先，使用 `sendOutputTo` 方法，你可以将输出发送到文件以供后续检查。

```php
$schedule->command('emails:send')
    ->daily()
    ->sendOutputTo($filePath);
```

使用 `emailOutputTo` 方法，你可以将输出通过电子邮件发送到你选择的电子邮件地址。请注意，输出必须首先使用 `sendOutputTo` 方法发送到文件。此外，在通过电子邮件发送任务输出之前，你应该配置[邮件服务](../../setup/mail-config.md)。

```php
$schedule->command('foo')
    ->daily()
    ->sendOutputTo($filePath)
    ->emailOutputTo('foo@example.tld');
```

::: tip
`emailOutputTo` 和 `sendOutputTo` 方法仅适用于 `command` 方法，不支持 `call`。
:::

## 任务钩子

使用 `before` 和 `after` 方法，你可以指定在计划任务完成前后执行的代码：

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

#### Ping URL

使用 `pingBefore` 和 `thenPing` 方法，调度器可以在任务完成前后自动 ping 给定的 URL。此方法对于通知外部服务你的计划任务正在开始或已完成很有用：

```php
$schedule->command('emails:send')
    ->daily()
    ->pingBefore($url)
    ->thenPing($url);
```
