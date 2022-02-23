# 命令列表

October CMS 包括几个命令行界面 (CLI) 命令和实用程序，可让您管理平台的各个方面，并加快开发过程。 控制台命令基于 Laravel 的 [Artisan](http://laravel.com/docs/artisan) 工具。 您可以[开发自己的控制台命令](../console/development.md) 或使用提供的[脚手架命令](../console/scaffolding.md) 加速开发。

## 设置和维护

### 系统更新

`october:update` 命令将从 October 请求更新。 它将更新核心应用程序和插件文件，然后执行数据库迁移

    php artisan october:update

<a id="oc-database-migration"></a>
### 数据库迁移

`october:migrate` 命令将执行数据库迁移，创建数据库表并执行由系统和 [插件版本历史](../plugin/updates.md) 提供的种子脚本。 迁移命令可以运行多次，它只会执行一次迁移或种子脚本，这意味着只应用新的更改。

    php artisan october:migrate

`--rollback` 选项将反转所有迁移，删除数据库表和删除数据。 使用此命令时应小心。 [插件刷新命令](#oc-refresh-plugin) 是调试单个插件的有用替代方法。

    php artisan october:migrate --rollback

### 修改后台用户密码

`october:passwd` 命令允许通过命令行更改后端管理员的密码。

    php artisan october:passwd username password

第一个参数，您可以传递登录名或电子邮件地址。 第二个参数，您可以选择传递所需的密码。

## 项目管理

October CMS 包含这些用于管理项目的命令。

### 同步项目

`project:sync` 安装属于一个项目的所有插件和主题。

    php artisan project:sync

<a id="oc-set-project"></a>
### 设置项目

`project:set` 设置当前安装的许可证密钥。

    php artisan project:set <license key>

## 插件管理

October CMS 包含许多用于管理插件的命令。

### 安装插件

`plugin:install` - 按名称下载并安装插件。 下一个示例将安装一个名为 **AuthorName.PluginName** 的插件。

    php artisan plugin:install AuthorName.PluginName

您可以使用 `--from` 选项从远程源安装插件。

    php artisan plugin:install AuthorName.PluginName --from=git@github.com:authorname/pluginname-plugin.git

使用 `--want` 选项指定目标分支或版本。

    php artisan plugin:install AuthorName.PluginName --from=git@github.com:authorname/pluginname-plugin.git --want=dev-develop

如果您的包名称具有 `oc` 前缀，请使用 `--oc` 选项。

    php artisan plugin:install AuthorName.PluginName --from=git@github.com:authorname/pluginname-plugin.git --oc

### 检查依赖关系

`plugin:check` - 对已安装的插件依赖项执行系统范围的检查。 此命令将遍历当前安装的每个主题和插件，并检查是否还安装了它的依赖项。 如果它发现任何缺失的需求，它将尝试安装它们。

    php artisan plugin:check

<a id="oc-refresh-plugin"></a>
### 刷新插件

`plugin:refresh` - 销毁插件的数据库表并重新创建它们。 该命令对开发很有用。

    php artisan plugin:refresh AuthorName.PluginName

使用 `--rollback` 仅销毁数据库表而不重新创建它们。

    php artisan plugin:refresh AuthorName.PluginName --rollback

使用 `--rollback` 可以指定版本号在指定版本停止。

    php artisan plugin:refresh AuthorName.PluginName --rollback=1.0.3

### 列出插件

`plugin:list` - 显示已安装插件的列表及其版本号。

    php artisan plugin:list

### 禁用插件

`plugin:disable` - 禁用现有插件。

    php artisan plugin:disable AuthorName.PluginName

### 启用插件

`plugin:enable` - 启用禁用的插件。

    php artisan plugin:enable AuthorName.PluginName

### 删除插件

`plugin:remove` - 销毁插件的数据库表并从文件系统中删除插件文件。

    php artisan plugin:remove AuthorName.PluginName

## 主题管理

October 包含许多用于管理主题的命令。

### 安装主题

`theme:install` - 从 [市场] (https://octobercms.com/themes/) 下载并安装主题。 以下示例将在 `/themes/authorname-themename` 中安装主题

    php artisan theme:install AuthorName.ThemeName

您可以使用 `--from` 选项从远程源安装主题。

    php artisan theme:install AuthorName.ThemeName --from=git@github.com:authorname/themename-theme.git

使用 `--want` 选项指定目标分支或版本。

    php artisan theme:install AuthorName.ThemeName --from=git@github.com:authorname/themename-theme.git --want=dev-develop

如果您的包名称具有 `oc` 前缀，请使用 `--oc` 选项。

    php artisan theme:install AuthorName.ThemeName --from=git@github.com:authorname/oc-themename-theme.git --oc

### 检查受保护

`theme:check` - 对主题执行系统范围的检查，以查看它们是否应标记为只读并防止更改。 此命令将遍历每个主题并检查它是否已与 composer 一起安装，如果是，则添加一个 [主题锁定文件](../cms/themes.md#oc-child-themes) 并创建一个子主题 .

    php artisan theme:check

### 列出主题

`theme:list` - 列出已安装的主题。

    php artisan theme:list

### 启用主题

`theme:use` - 切换活动主题。 以下示例将切换到 `/themes/rainlab-vanilla` 中的主题

    php artisan theme:use vanilla

### 删除主题

`theme:remove` - 删除一个主题。 以下示例将删除目录`/themes/rainlab-vanilla`

    php artisan theme:remove vanilla

### 复制主题

`theme:copy` - 复制现有主题以创建新主题，包括创建子主题。

    php artisan theme:copy <source-theme> [destination-theme]

以下命令通过复制目录及其内容从源主题"demo"创建一个名为"demo-copy"的新主题。 `.themelock` 文件将在此过程中被删除。

    php artisan theme:copy demo demo-copy

要创建继承父主题的子主题，请指定 `--child` 选项。

    php artisan theme:copy demo demo-child --child

如果使用 [数据库驱动的主题](../cms/themes#oc-database-driven-themes)，您可以使用 `--import-db` 选项将数据库更改同步到文件系统。

    php artisan theme:copy demo --import-db

要同时删除所有数据库模板，请使用 --purge-db 选项。

    php artisan theme:copy demo --import-db --purge-db

## 实用程序

October CMS 包括许多实用程序命令。

### 清除应用程序缓存

`cache:clear` - 清除应用程序、树枝和组合器缓存目录。 例子：

    php artisan cache:clear

### 删除演示数据

`october:fresh` - 删除October CMS 附带的演示主题和插件。

    php artisan october:fresh

### 镜像公共目录

`october:mirror` - 将使用符号链接将所有资产和资源文件镜像到 [公共文件夹](../setup/deployment.md#oc-public-folder)。

    php artisan october:mirror

如果要指定自定义文件夹，可以将其作为第二个参数传递，该参数相对于基本目录。

    php artisan october:mirror mypublicfolder

### 其他命令

`october:util` - 执行通用实用程序任务的通用命令，例如清理文件或合并文件。 传递给此命令的参数将确定使用的任务。

#### 编译资产

输出 JavaScript (js)、StyleSheets (less)、客户端语言 (lang) 或所有内容 (assets) 的组合系统文件。

    php artisan october:util compile assets
    php artisan october:util compile lang
    php artisan october:util compile js
    php artisan october:util compile less

要在不缩小的情况下组合，请传递 `--debug` 选项。

    php artisan october:util compile js --debug

#### 拉取所有仓库

这将在所有主题和插件目录上执行命令 `git pull`。

    php artisan october:util git pull

#### 清除缩略图

删除上传目录中所有生成的缩略图。

    php artisan october:util purge thumbs

#### 清除上传

删除上传目录中不存在于 `system_files` 表中的文件。

    php artisan october:util purge uploads

#### 清除遗留记录

删除 `system_files` 表中不属于任何其他模型的记录。

    php artisan october:util purge orphans
