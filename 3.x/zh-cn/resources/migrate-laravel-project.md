---
subtitle: 如何将现有 Laravel 应用或项目迁移到 October CMS
---
# 迁移 Laravel 项目

以下指南可用于在现有 Laravel 9 应用程序之上安装 October CMS v3。如果您想保留相同的数据库而不丢失数据，或者只是更喜欢使用 Laravel 作为起点，这将非常有用。

重要步骤包括将 Laravel 的 Illuminate 包替换为 October 的 Rain 包，它代表了 Laravel 的扩展技术版本，并添加了运行 October CMS 所需的核心功能。

::: tip
请务必仔细遵循本指南，因为类名存在细微差异。
:::

## 安装 Laravel 9/10 然后安装 October Rain

首先，假设我们使用以下命令创建了一个全新的 Laravel 安装：

```bash
composer create-project laravel/laravel:^9.0 mylaravel
```

在新创建的目录中，引入 October CMS Rain 库。

```bash
cd mylaravel
composer require october/rain
```

## 认证并安装 October CMS

通过设置项目密钥向 October CMS 网关进行认证。

```bash
php artisan project:set <license key>
```

引入所有 October CMS 模块。

```bash
composer require october/all
```

当提示信任 composer/installers 时，输入 `Y` 表示是。

```bash
Do you trust "composer/installers" to execute code and wish to enable it now?
```

## 将 Illuminate 引用替换为 Rain 库

以下步骤用于将 Illuminate 替换为 Rain。

### 更新应用容器

在文件 **bootstrap/app.php** 中，`Illuminate\Foundation\Application` 类应替换为 `October\Rain\Foundation\Application`。

```bash
// File bootstrap/app.php

// Replace
$app = new Illuminate\Foundation\Application(
    $_ENV['APP_BASE_PATH'] ?? dirname(__DIR__)
);

// With
$app = new October\Rain\Foundation\Application(
    $_ENV['APP_BASE_PATH'] ?? dirname(__DIR__)
);
```

### 更新 HTTP Kernel

在文件 **app/Http/Kernel.php** 中，`App\Http\Kernel` 类应扩展 `October\Rain\Foundation\Http\Kernel`。

```bash
// File app/Http/Kernel.php

// Replace
use Illuminate\Foundation\Http\Kernel as HttpKernel;

// With
use October\Rain\Foundation\Http\Kernel as HttpKernel;
```

### 更新 Console Kernel

在文件 **app/Console/Kernel.php** 中，`App\Console\Kernel` 类应扩展 `October\Rain\Foundation\Console\Kernel`。

```bash
// File app/Console/Kernel.php

// Replace
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

// With
use October\Rain\Foundation\Console\Kernel as ConsoleKernel;
```

### 更新异常处理器

在文件 **app/Exceptions/Handler.php** 中，`App\Exceptions\Handler` 类应扩展 `October\Rain\Foundation\Exception\Handler`。

```bash
// File app/Exceptions/Handler.php

// Replace
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

// With
use October\Rain\Foundation\Exception\Handler as ExceptionHandler;
```

## 发布 October CMS 文件

以下步骤将从 October CMS 复制供应商文件。要发布文件，请按照以下步骤操作：


1. 打开 [October CMS 公共仓库](https://github.com/octobercms/october)
1. 导航到 **Code → Download ZIP**
1. 保存 zip 文件并在本地打开

从 zip 文件中复制以下文件夹。

- **config/**
- **plugins/**
- **themes/**

## 最终步骤

假设您的数据库已配置并正在运行，运行 October CMS 迁移。

```bash
php artisan october:migrate
```

接下来，要使 CMS 页面在前端可用，请删除或注释掉文件 **routes/web.php** 中的默认路由。

现在您可以打开 `/backend` 路由来设置管理员账户。

### 额外步骤

一些可选步骤来配置您的系统：

- 如果您计划使用默认的 Laravel 视图路径，请在 **config/view.php** 文件中取消注释。


#### 另请参阅

::: also
* [Laravel 9 安装](https://laravel.com/docs/9.x/installation)
* [Laravel 10 安装](https://laravel.com/docs/10.x/installation)
:::
