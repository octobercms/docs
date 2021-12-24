# 安装

<VideoPreview src="https://www.youtube.com/watch?v=RHUwCvo7xng" />

October CMS 是一个具有简单直观界面的 Web 应用程序平台。Web 平台提供一致的结构，并强调可重用性，因此您可以专注于构建独特的内容，而我们处理无聊的部分。


无论您是 Web 开发新手还是拥有多年经验，October CMS 都是一个平台，可让您轻松为您和您的客户创建定制体验。 我们希望您与我们一起享受旅程，并在简单中发现快乐。

要在本地运行 October CMS，我们推荐以下软件：

- [适用于 macOS 的 Laravel Valet](https://laravel.com/docs/valet)
- [适用于 Windows 10 的 Laragon](https://laragon.org/)

## 安装Composer

October CMS 使用[Composer](http://getcomposer.org/) 来管理它的依赖。因此，在开始之前，您需要确保已安装 Composer。

您还应该检查您的计算机或服务器是否满足运行 PHP 应用程序的 [最低系统要求](#minimum-system-requirements) 。

## 安装 October CMS

然后，您可以在终端中使用命令`create-project`创建一个新的 October CMS 项目。下面在名为**myoctober**的目录中创建一个新项目。

```bash
composer create-project october/october myoctober
```

您也可以使用此命令安装到当前目录。

```bash
composer create-project october/october .
```

任务完成后，运行安装命令以指导您完成后续步骤。

```bash
php artisan october:install
```

接下来，使用以下命令迁移数据库。

```bash
php artisan october:migrate
```

然后，您可以提供应用程序并在浏览器中打开它。

```bash
php artisan serve
```
>**Note**：如果您正在使用项目，请继续阅读[项目文章](https://octobercms.com/help/site/projects) 有关如何设置项目的信息。

## 安装后步骤

安装完成后，您可能需要设置一些内容。

###查看配置

配置文件存储在应用程序的**config** 目录中。 虽然每个文件都包含每个设置的描述，但查看适用于您的情况的 [通用配置选项](../setup/configuration.md) 很重要。

例如，在生产环境中，您可能希望执行以下操作：

- 启用[CSRF保护](../setup/configuration.md#csrf-protection)
- 禁用[调试模式](../setup/configuration.md#debug-mode)
- 使用 [公共文件夹](../setup/deployment.md#public-folder) 以提高安全性

###  设置调度程序

为使*计划任务*正确运行，您应该将以下 Cron 条目添加到您的服务器。 编辑 crontab 通常是使用命令 `crontab -e` 来执行的。

     * * * * * php /path/to/artisan schedule:run >> /dev/null 2>&1

请务必将 **/path/to/artisan** 替换为 October CMS 根目录中 *artisan* 文件的绝对路径。 此 Cron 将每分钟调用命令调度程序。 然后 October CMS 评估所有计划的任务并运行到期的任务。

> **注意**：如果你把这个添加到`/etc/cron.d`，你需要在`* * * * *` 之后立即指定一个用户。

###  设置队列工作者

您可以选择设置一个外部队列来处理 *排队任务*，默认情况下，这些将由平台异步处理。这种行为可以通过在 `config/queue.php` 中设置 `default` 参数来改变。

如果您决定使用 `database` 队列驱动程序，最好为命令 `php artisan queue:work --once` 添加一个 Crontab 条目来处理队列中的第一个可用作业。

您还可以将队列作为守护进程运行

```bash
php artisan queue:work
```

## 最低系统要求

October CMS 对服务器有一些要求：

1. PHP 7.2.9 或更高版本
1. Composer 2.0 或更高版本
1. PDO PHP Extension（以及要连接的数据库的相关驱动程序）
1. cURL PHP 扩展
1. OpenSSL PHP 扩展
1. Mbstring PHP 扩展
1. ZipArchive PHP 扩展
1. GD PHP 扩展
1. SimpleXML PHP 扩展

为这些数据库提供支持的最低要求：

1. MySQL 5.7 或 MariaDB 10.2
1. PostgreSQL 9.6
1. SQLite 3.8.8

如果您使用的是旧版本的 MySQL 或 MariaDB，您可能需要[配置索引长度](../database/structure.md#index-lengths-using-mysql-mariadb) 以支持 `utf8mb4` 字符集.

某些操作系统发行版可能需要您手动安装一些必要的 PHP 扩展。使用 Ubuntu 时，可以运行以下命令来安装所有必需的扩展：

```bash
sudo apt-get update &&
sudo apt-get install php php-ctype php-curl php-xml php-fileinfo php-gd php-json php-mbstring php-mysql php-sqlite3 php-zip
```

使用 SQL Server 数据库引擎时，需要安装 [group concatenation](https://github.com/orlando-colamatteo/ms-sql-server-group-concat-sqlclr) 用户定义聚合。

## 安装疑难解答

1. **当我输入许可证密钥时安装挂起或冻结**：在某些环境中粘贴密钥内容时可能会发生这种情况。多次按 ENTER 键以允许安装过程继续。

1. **迁移过程中显示错误 `Specified key was too long`**：当您使用旧版本的 MySQL 或 MariaDB 时会发生这种情况。要解决此问题，您可能需要[配置索引长度](../database/structure.md#index-lengths-using-mysql-mariadb) 以支持`utf8mb4` 字符集。

1. **打开应用程序时显示空白屏幕**：检查`/storage`文件和文件夹的权限设置是否正确，它们应该在Web服务器是可写的。

1. **后端区域显示 `Page not found (404)` **：如果应用程序找不到数据库，则后端会显示404页面。尝试启用 [调试模式](../setup/configuration.md#debug-mode) 以查看底层错误消息。

1. **更新应用程序时显示错误 500 **：您可能需要增加或禁用网络服务器的超时限制。例如，Apache 的 FastCGI 有时会将 `-idle-timeout` 选项设置为 30 秒。

> **注意**：详细的系统日志可以在`storage/logs`目录中找到。
