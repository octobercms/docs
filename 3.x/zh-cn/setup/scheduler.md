---
subtitle: 了解如何运行计划任务和队列。
---
# 设置计划任务

为了使计划任务正常运行，请将以下 [Cron job](https://www.cyberciti.biz/faq/how-do-i-add-jobs-to-cron-under-linux-or-unix-oses/) 添加到服务器：

```bash
* * * * * php /october/artisan schedule:run >> /dev/null 2>&1
```

请确保将 `/october/artisan` 替换为 October CMS 安装目录中 artisan 文件的绝对路径。此 Cron job 将每分钟调用一次命令调度器。然后 October CMS 会评估所有计划任务并运行到期的任务。

::: tip
当将 crontab 文件添加到 /etc/cron.d 时，需要在 `* * * * *` 之后指定用户名：

```bash
* * * * * alice php /october/artisan schedule:run >> /dev/null 2>&1
```
:::

## 设置队列工作进程

您可以选择设置队列驱动来处理[队列任务](../extend/services/queue.md)。队列驱动可以在 `config/queue.php` 文件中进行配置。

对于数据库队列驱动，您可以设置一个 Cron job 来运行调用队列中第一个可用任务的命令：`php artisan queue:work --once`。

```bash
* * * * * php /october/artisan queue:work --once >> /dev/null 2>&1
```

或者，也可以将队列作为守护进程运行

```bash
php artisan queue:work
```

## 无命令行环境下的 Cron

如果您的主机提供商未提供 Cron 表，您可以改为每隔 X 分钟调用一个公共 URL。例如，如果某个插件要求您每 15 分钟运行以下命令。

```bash
php artisan campaign:run
```

这需要一些 PHP 编码作为解决方案，使用 `Artisan` facade 配合[路由文件](../extend/system/routing.md)来构建一个调用此命令的端点。例如，一个 **routes.php** 文件可能包含以下内容。

```php
Route::get('/campaign-run', function () {
    return Artisan::call('campaign:run');
});
```

当打开 URL `/campaign-run` 时，artisan 命令将被调用。

#### 另请参阅

::: also
* [任务调度](../extend/system/scheduling.md)
* [队列](../extend/services/queue.md)
:::
