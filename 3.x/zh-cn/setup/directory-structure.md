---
subtitle: 了解 October CMS 根目录中每个目录的用途
---
# 目录结构

October CMS 使用模块化结构，大多数编程功能都位于模块目录或插件目录中。

## 根目录

### App 目录

`app` 目录包含应用程序特定的代码。该目录的内容将在本节之后详细介绍。简而言之，此区域包含不属于传统插件的业务逻辑。大多数插件功能在此目录中也可以使用。

### 引导程序目录

`bootstrap` 目录包含加载 Laravel 框架的 app.php 引导脚本。该目录还包含自定义的 PHP 类自动加载器。通常情况下，不应修改此目录中的文件。

### 配置目录

`config` 目录包含所有应用程序配置文件。每个文件控制应用程序的运行方式。配置文件可以根据您的应用程序需求进行修改。系统更新不会修改配置文件。

### 插件目录

`plugins` 目录包含扩展 October CMS 核心功能的包。插件可以通过引入新功能来修改平台。默认情况下，系统会加载文件系统中找到的所有插件。可以使用 `system.disable_plugins` 配置参数禁用特定的插件。

### 存储目录

`storage` 目录包含日志文件、缓存文件、会话以及 October CMS 生成的其他文件。它包含以下几个子目录：

* `app` - 包含应用程序特定的存储文件，例如媒体文件、文件上传和自动生成的资源（如调整大小后的文件和合并的资源文件）。
* `framework` - 由 Laravel 框架用于存储其生成的文件和缓存。
* `cms` - 由 October CMS 平台用于存储其生成的文件和缓存。
* `logs` - 包含应用程序的日志文件。
* `temp` - 用于存储临时的应用程序文件。

### 模块目录

`modules` 目录包含 October CMS 的核心包，提供系统中通用的核心功能。默认情况下，模块根据其在文件系统中的存在情况自动加载。但是，也可以通过 `system.load_modules` 配置参数指定要加载哪些模块。`system` 模块是应用程序运行所必需的最低要求。

* `system` - 定义 October CMS 的核心功能，是一个必需的模块。
* `cms` - 引入用于渲染前端网站主题的功能。它负责将请求路由到页面、渲染页面和处理 AJAX 请求。
* `backend` - 负责显示后台面板页面。
* `editor` - 引入用于在后台面板中编辑 CMS 模板的用户界面。
* `media` - 引入后台面板中的媒体文件管理用户界面。它允许后台用户上传媒体文件（如图片或视频文件），并将其包含在其他位置（例如博客文章中）。
* `tailor` - 引入 October CMS Tailor 功能。

### 主题目录

`themes` 目录包含前端网站 CMS 主题的子目录。CMS 主题包括网站页面、布局、部件、资源和其他文件的模板文件。活动主题通过 `cms.active_theme` 配置参数设置，并可以在后台面板设置页面中进行覆盖。

### 供应商目录

`vendor` 目录包含通过 Composer 引入的包。一些插件也可能包含 vendor 目录。系统的 vendor 目录优先于插件特定的 vendor 目录。

## App 目录

`app` 目录包含应用程序特定的文件，包括内容、资源和不属于[传统插件](../extend/system/plugins.md)的业务逻辑。它包含一个由默认配置加载的 Service Provider 文件。

### Assets 目录

`app/assets` 目录包含资源文件，例如 JavaScript、CSS 和图片文件。此目录应该对网站公开可访问。

### Blueprints 目录

`app/blueprints` 目录包含 Tailor 使用的[内容蓝图](../cms/tailor/introduction.md)文件。

### 其他目录

您可以在此处创建任何目录，就像插件一样，例如 `models` 或 `controllers`。这些目录将在 `App` 命名空间中自动加载。例如，文件 **app/models/Customer.php** 在 PHP 中将以 `App\Models\Customer` 的形式使用。
