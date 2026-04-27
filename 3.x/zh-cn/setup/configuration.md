---
subtitle: 了解如何配置和调优 October CMS。
---
# 常用配置

October CMS 的所有配置文件都存储在 `config` 目录中。每个配置参数都有内联文档说明。

## 环境配置

October CMS 的许多参数可以通过环境变量进行配置。环境变量可以在服务器级别设置，也可以为 [Web 应用程序的虚拟主机](https://httpd.apache.org/docs/2.4/env.html) 定义。

::: aside
October CMS 使用 [DotEnv 库](https://github.com/vlucas/phpdotenv) 来方便地管理环境变量。
:::

环境变量也可以在 `.env` 文件中定义，安装脚本会自动在项目根目录中创建该文件。在全新安装的 October CMS 中，根目录包含一个 `.env.example` 文件，其中提供了适用于本地环境的典型值。

例如，数据库连接可以通过以下变量来指定：

```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=database
DB_USERNAME=root
DB_PASSWORD=
```

`.env` 文件中的任何变量都可以被服务器或虚拟主机级别定义的外部环境变量覆盖。

配置值按以下顺序加载：

1. 系统环境变量
2. .env 文件中的变量
3. 配置 PHP 文件中的值。

::: warning
切勿将 `.env` 文件添加到版本控制中。如果入侵者获得了对代码仓库的访问权限，这将构成安全风险。
:::

### 特定环境的配置文件

如果需要根据当前应用程序环境（例如预发布环境或生产环境）加载配置文件，可以使用服务器级别的 `APP_ENV` 变量。Apache 配置示例：

```text
SetEnv APP_ENV "staging"
```

当 `APP_ENV` 变量被定义后，平台会尝试加载后缀与环境名称匹配的 .env 文件，例如 **.env.staging**。如果该文件不存在，不会产生错误。如果 **.env.staging** 和 **.env** 文件同时存在，**.env** 文件将被完全忽略。

当使用缓存或 [优化配置](./web-server-config.md) 时，可以在 **.env** 文件中指定 `APP_CONFIG_CACHE` 值来更改缓存文件路径。这将确保每个环境获得正确的缓存配置值。

```ini
APP_CONFIG_CACHE=storage/framework/config-staging.php
```

## 生产环境配置

有几个重要的常用配置参数应在生产环境中进行设置。

### 调试模式

`debug` 参数位于 `config/app.php` 文件中，在生产环境中应将其禁用。默认情况下，该值从 `APP_DEBUG` 环境变量中加载。安装完成后，调试模式在 `.env` 文件中处于启用状态。

```ini
APP_DEBUG=false
```

启用后，调试模式会在发生错误时显示详细的错误信息以及其他调试功能。虽然在开发过程中很有用，但在正式的生产站点上必须禁用调试模式。它可以防止潜在的敏感信息被展示给网站访问者。

调试模式启用时提供的功能：

- [详细的错误信息](../cms/pages.md#error-page)
- 用户认证失败时提供具体原因
- [合并的资源文件](../markup/filter-theme.md) 默认不进行压缩

### CSRF 防护

October CMS 提供了内置的 [跨站请求伪造](https://owasp.org/www-community/attacks/csrf) 防护机制。当启用 CSRF 防护时，October CMS 会在用户会话中存储一个随机令牌。[表单开始标签](../extend/services/html.md#opening-a-form) 和 [表单令牌标签](../extend/services/html.md#form-tokens) 会在表单中添加一个包含令牌值的隐藏字段。对于所有 POST、PUT 或 DELETE 请求，平台会检查提交的令牌值是否与用户会话中存储的值匹配。

CSRF 防护默认处于启用状态。`enable_csrf_protection` 参数位于 `config/system.php` 文件中。默认情况下，该值从 `ENABLE_CSRF` 环境变量中加载。

### 公共文件夹

建议在生产环境中使用 [公共文件夹](../setup/web-server-config.md) 来将内部文件与公共文件隔离。这是在 [Web 服务器配置](../setup/web-server-config.md) 基础上的一层额外保障，Web 服务器配置仅暴露入口 PHP 文件和静态资源文件。

### 设置备用主题

[活动的 CMS 主题](../cms/themes/themes.md) 通常从数据库中获取。在生产环境中可能出现的一个问题是，当数据库连接失败时，会显示演示主题或通用错误页面。为了解决这个问题，请确保在基于文件的配置中设置一个备用主题。

备用活动主题在 `config/cms.php` 文件中设置，并从 `ACTIVE_THEME` 环境变量中加载。请确保将其设置为一个有效的主题，因为在没有数据库的情况下将使用该值。

```ini
ACTIVE_THEME=my-theme
```

### 禁用编辑器

October CMS 的独特之处之一在于它能够在生产环境中安全地进行网站更新，例如对 HTML 进行微调或快速添加新页面。这对于较小的应用程序非常方便，而较大的应用程序可能对生产环境的更改有更严格的要求。

要禁用生产环境的更改，可以通过以下方法之一移除编辑器。

- 使用 `system.load_modules` 配置仅加载所需的模块
- 不部署 [模块目录](./directory-structure.md) 中的编辑器文件
- 使用 [权限](../extend/backend/permissions.md) 来阻止对编辑器的访问

::: tip
将 [app 和 themes 目录](./directory-structure.md) 设置为只读也是一个好的做法。
:::

或者，[启用安全模式](../setup/web-server-config.md) 以在生产环境中保持编辑器可用。安全模式允许更新 HTML、CSS 和其他文件，但会阻止更新 PHP 代码部分以及任何可能不安全的 Twig 函数。

#### 另请参阅

::: also
* [Web 服务器配置](../setup/web-server-config.md)
:::
