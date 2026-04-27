---
subtitle: 了解如何在服务器上安装 October CMS。
---
# 安装

<VideoBlockLink src="https://www.youtube.com/watch?v=RHUwCvo7xng" title="Installation Tutorial" description="This video describes how to create a project, purchase a license and install October CMS for the first time." prompt="Watch the tutorial" />

## 最低系统要求

在安装 October CMS 之前，请确保目标系统满足以下最低要求：

* PHP 8.0.0 或更高版本
* Composer 2.0 或更高版本
* PDO PHP 扩展
* cURL PHP 扩展
* OpenSSL PHP 扩展
* Mbstring PHP 扩展
* ZipArchive PHP 扩展
* GD PHP 扩展
* SimpleXML PHP 扩展。

支持的数据库服务器：

* MySQL 5.7 或 MariaDB 10.2。对于旧版本的 MySQL 或 MariaDB，您可能需要[配置索引长度](../setup/database-config.md#oc-index-lengths-using-mysql-mariadb)以支持 utf8mb4 字符集。
* PostgreSQL 9.6
* SQLite 3.8.8。

支持的 Web 服务器：

* Apache
* Nginx
* Lighttpd
* Microsoft IIS

## 安装 October CMS

::: aside
您应该在 Web 服务器上配置虚拟主机以访问安装目录。对于本地开发，您可以使用 [Laravel Sail](../resources/using-laravel-sail.md)、[Valet](https://laravel.com/docs/valet)、[Laragon](https://laragon.org/) 或 Laravel 内置的开发服务器。
:::

October CMS 是一个使用 [Composer](http://getcomposer.org/) 来管理其依赖的 PHP Web 应用程序。在开始之前，请确保已安装 Composer。完成安装需要[许可证密钥](https://octobercms.com/help/site/projects#project-id)。

要安装平台，请在终端中使用 `create-project` 命令初始化项目。以下命令在名为 *myoctober* 的目录中创建一个新项目：

```bash
composer create-project october/october myoctober
```

上述命令会安装最新版本的 October CMS，如果您想安装 v3.0，请使用以下命令代替。

```bash
composer create-project october/october myoctober "^3.0"
```

命令完成后，进入项目目录：

```bash
cd myoctober
```

运行安装命令：

```bash
php artisan october:install
```

最后一步是迁移命令，它将初始化数据库。或者，October CMS 也可以在您首次访问后台面板时初始化数据库。

```bash
php artisan october:migrate
```

过程完成后，您可以在浏览器中访问后台面板并创建管理员用户配置文件。如果您使用的是内置 Web 服务器，可以使用以下命令启动它：

```bash
php artisan serve
```

::: warning
如果您在生产 Web 服务器上安装平台，请查看[生产环境配置](../setup/configuration.md#production-configuration)文章中列出的建议。
:::

## 向导安装

<VideoBlockLink src="https://www.youtube.com/watch?v=ypyOiVCxaQg" title="Wizard Tutorial" description="This video guides you through the process of installing October CMS using the easy-to-use Wizard installer." prompt="Watch the tutorial" />

向导安装是一种无需使用 Composer 即可安装 October CMS 的替代方式。它比命令行安装更简单，不需要任何特殊技能。

1. 在服务器上准备一个空目录。它可以是子目录、域名根目录或子域名目录。
1. [下载安装程序归档文件](https://octobercms.com/download)。
1. 将安装程序归档文件解压到准备好的目录中。
1. 为安装目录及其所有子目录和文件授予写入权限。
1. 在 Web 浏览器中导航到 `install.php` 脚本。
1. 按照安装说明操作。

![image](https://github.com/octobercms/docs/blob/develop/images/wizard-installer.png?raw=true)

## 安装疑难解答

在安装过程中或安装后可能会出现一些常见问题。

::: details 输入许可证密钥后安装冻结
在某些环境中粘贴许可证密钥内容时可能会发生这种情况。多次按 ENTER 键以允许安装过程继续。
:::

::: details 安装过程中显示错误"Unable to get local issuer certificate"
完整错误信息可能为 `cURL error 60: SSL certificate problem: unable to get local issuer certificate`。

下载[此证书文件](https://curl.se/ca/cacert.pem)并将其保存为 `cacert.pem`。打开您的 **php.ini** 文件，插入或编辑以下行。您可能需要重新启动 Apache 才能使更改生效。
```
curl.cainfo = "/path/to/cacert.pem"
```
:::

::: details 迁移过程中显示错误"Specified key was too long"
完整错误信息可能为 `SQLSTATE[42000]: Syntax error or access violation: 1071 Specified key was too long; max key length is 767 bytes`

当使用旧版本的 MySQL 或 MariaDB 时可能会发生这种情况。[配置索引长度](../setup/database-config.md#index-lengths-using-mysql-mariadb)以支持 utf8mb4 字符集可以帮助解决此问题。
:::

::: details 打开应用程序时显示空白屏幕
检查 /storage 文件和子目录的权限设置是否正确。它们必须对 Web 服务器可写。
:::

::: details 登录时出现无效安全令牌错误
检查 storage/framework 路径中是否有缺失的子目录。您可能需要添加 [sessions、cache 和 views 目录](https://github.com/octobercms/october-private/tree/develop/storage/framework)。
:::

::: details 后台面板显示"Page not found"(404)
如果应用程序找不到数据库，则后台会显示 404 页面。尝试启用[调试模式](../setup/configuration.md#debug-mode)以查看底层错误消息。
:::

::: details 更新应用程序时显示错误 500
应增加或禁用 Web 服务器的请求超时限制。例如，Apache 的 FastCGI 有时会将 -idle-timeout 选项设置为 30 秒。
:::

::: details Zend OPcache API is restricted by "restrict_api" configuration directive
当内部尝试使用 OPcache 内部接口时可能会出现此问题。可以通过在 **config/cms.php** 文件中将 **force_bytecode_invalidation** 配置设置为 `false` 来禁用。
:::

::: details Invalid credentials (HTTP 403) for '...", aborting.
当服务器上缺少 **auth.json** 文件或您的项目许可证已过期时，Composer 中可能会出现此错误。请尝试登录您的帐户并检查项目是否拥有有效的许可证。如果许可证有效，您可以使用 `project:set` artisan 命令重置它。
:::

#### 另请参阅

::: also
* [生产环境配置](../setup/configuration.md#production-configuration)
:::
