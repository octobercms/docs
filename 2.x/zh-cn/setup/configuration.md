# 配置

October CMS 的所有配置文件都存储在 **config** 目录中。每个选项都记录在案，因此请随意浏览文件并熟悉可用的选项。

<a id="oc-environment-configuration"></a>
## 环境配置

根据应用程序运行的环境设置不同的配置值通常很有帮助。 为了控制不同环境中的配置，October CMS 使用 [DotEnv 库](https://github.com/vlucas/phpdotenv) 来实现易于管理环境变量。这些变量可以覆盖 **config** 目录中指定的任何值。

在全新安装的 October CMS 中，基本目录将包含一个 `.env.example` 文件，该文件为本地环境提供典型值。在安装过程中，此文件将被复制到 `.env` ，您可以在其中进行任何更改。

例如，可以使用这些变量指定数据库连接。

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=database
    DB_USERNAME=root
    DB_PASSWORD=

`.env` 文件中的任何变量都可以被外部环境变量覆盖，例如服务器级或系统级环境变量。例如，在 Apache 中，可以将这一行添加到 `.htaccess` 或 `httpd.config` 文件中：

    SetEnv DB_CONNECTION "mysql"

回顾一下，配置值按此顺序加载。

1. 系统环境变量
1. `.env` 文件中的变量
1. **config** PHP 文件中的值

> **重要**：永远不要将您的 `.env` 文件提交到源代码控制，因为如果入侵者获得对您的源代码控制存储库的访问权，这将是一个安全风险，因为任何敏感的凭据都会被暴露。

### 特定的环境文件

在极少数情况下，您可能需要为相同的代码库加载不同的 `.env` 文件，例如本地、暂存和生产。当前应用程序环境检测可以被服务器级`APP_ENV` 环境变量覆盖。

    SetEnv APP_ENV "staging"

上面的示例将 `APP_ENV` 值设置为 **staging** 因此将尝试从 `.env.staging` 文件加载值。

## 应用程序配置

在这里，我们将介绍一些常见的配置项及其用途。

<a id="oc-debug-mode"></a>
### 调试模式

调试设置可以在`config/app.php` 配置文件中找到带有 `debug` 的参数 。默认情况下，此选项取自存储在您的 .env 文件中的 APP_DEBUG 环境变量的值。

    APP_DEBUG=true

启用后，此设置将显示详细的错误消息以及其他调试功能。虽然在开发过程中很有用，但在实时生产站点中使用时应始终禁用调试模式。这可以防止向最终用户显示潜在的敏感信息。

调试模式在启用时使用以下功能:

1. 显示[详细错误页面](../cms/pages.md#oc-error-page)。
1. 用户认证失败提供具体原因。
1. [组合资产](../markup/filter-theme.md)默认不压缩。
1. [安全模式](#oc-safe-mode) 默认关闭。

> **重要**：在生产环境中始终将 `APP_DEBUG` 设置设置为 `false`。

<a id="oc-safe-mode"></a>
### 安全模式

安全模式可以在`config/app.php` 配置文件中找到带有 `enable_safe_mode` 的参数。默认情况下，该选项的值来自 `CMS_SAFE_MODE` ，它可以添加到您的 `.env` 文件中。

    CMS_SAFE_MODE=null

启用安全模式后，CMS 模板中的 PHP 代码部分将被禁用，以防止用户执行潜在的恶意代码。

此变量可以设置为 `true` 或 `false` 。如果设置为 `null`，则在禁用 [debug mode](#oc-debug-mode) 时将激活安全模式。

<a id="oc-csrf-protection"></a>
### CSRF 保护

October CMS 提供了一种简单的方法来保护您的应用程序免受跨站点请求伪造。首先随机令牌(token)放置在您的session中。然后，当使用 [打开表单标签](../services/html.md#oc-form-tokens) 时，令牌被添加到页面并随每个请求提交回来。

    ENABLE_CSRF=true

虽然默认启用 CSRF 保护，但您可以使用 `config/system.php` 配置文件中的 `enable_csrf_protection` 参数或来自`ENABLE_CSRF`环境变量的源值禁用它。