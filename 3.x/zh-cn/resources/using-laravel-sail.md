---
subtitle: 了解如何使用本地 Docker 环境安装 October CMS。
---
# 使用 Laravel Sail 安装

::: aside
由于 Web 服务器与操作系统分开运行，命令使用 `sail artisan` 而不是 `php artisan` 来调用。
:::

[Laravel Sail](https://laravel.com/docs/10.x/sail) 是一个用于与本地 Docker 开发环境交互的命令行界面。它通过自动化设置 Web 服务器和数据库的过程来帮助您入门。以下说明教您如何将 Sail 和 October CMS 一起使用以快速启动和运行。

## 入门

安装 Sail 的说明因操作系统而异。此外，安装 October CMS 时使用不同的构建 URL。默认情况下，此 URL 仅安装带有 MySQL 服务的基本环境。

::: tip
将 `example-app` 替换为任何目录名称，October CMS 将安装在此处。
```bash
curl -s "https://octobercms.com/api/laravelsail/example-app" | bash
```
:::

考虑到这个不同的 URL，请按照适用于您操作系统的特定 Laravel 指南开始。

- [macOS](https://laravel.com/docs/10.x/installation#getting-started-on-macos)
- [Windows](https://laravel.com/docs/10.x/installation#getting-started-on-windows)
- [Linux](https://laravel.com/docs/10.x/installation#getting-started-on-linux)

一切准备就绪后，系统会提示您运行以下命令来启动 Web 服务器。

```bash
cd example-app
./vendor/bin/sail up
```

接下来，打开另一个控制台窗口，导航到同一目录并运行以下命令来安装 October CMS。数据库设置已预先配置好，可以直接使用。

```bash
./vendor/bin/sail artisan october:install
```

安装完成后，使用 `http://localhost` 地址打开网站。

#### 另请参阅

::: also
* [Laravel Sail 文档](https://laravel.com/docs/10.x/sail)
:::
