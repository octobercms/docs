---
subtitle: 了解如何安装和管理插件及主题。
---
# 安装插件和主题

## 项目管理

October CMS 包含以下用于管理项目的命令。

### 同步项目

`project:sync` 安装属于项目的所有插件和主题。

```bash
php artisan project:sync
```

<a id="oc-set-project"></a>
### 设置项目

`project:set` 设置当前安装的许可证密钥。

```bash
php artisan project:set <license key>
```

## 插件管理

October CMS 包含多个用于管理插件的命令。

### 安装插件

`plugin:install` - 通过名称下载并安装插件。下面的示例将安装名为 **AuthorName.PluginName** 的插件。

```bash
php artisan plugin:install AuthorName.PluginName
```

使用 `--want` 选项安装特定的插件版本。

```bash
php artisan plugin:install AuthorName.PluginName --want=1.0
```

您可以使用 `--from` 选项从远程源安装插件。

```bash
php artisan plugin:install AuthorName.PluginName --from=git@github.com:authorname/pluginname-plugin.git
```

使用 `--want` 选项指定目标分支或版本。

```bash
php artisan plugin:install AuthorName.PluginName --from=git@github.com:authorname/pluginname-plugin.git --want=dev-develop
```

如果您的包名带有 `oc` 前缀，请使用 `--oc` 选项。

```bash
php artisan plugin:install AuthorName.PluginName --from=git@github.com:authorname/pluginname-plugin.git --oc
```

### 检查依赖

`plugin:check` - 对已安装的插件依赖执行系统范围的检查。此命令将遍历当前安装的每个主题和插件，检查其依赖是否也已安装。如果发现任何缺失的需求，将尝试安装它们。

```bash
php artisan plugin:check
```

### 刷新插件

`plugin:refresh` - 销毁插件的数据库表并重新创建它们。此命令对开发很有用。

```bash
php artisan plugin:refresh AuthorName.PluginName
```

使用 `--rollback` 选项仅销毁数据库表而不重新创建它们。

```bash
php artisan plugin:refresh AuthorName.PluginName --rollback
```

您还可以使用 `--rollback` 选项指定版本号以在指定版本处停止。

```bash
php artisan plugin:refresh AuthorName.PluginName --rollback=1.0.3
```

### 列出插件

`plugin:list` - 显示已安装的插件及其版本号列表。

```bash
php artisan plugin:list
```

### 禁用插件

`plugin:disable` - 禁用现有插件。

```bash
php artisan plugin:disable AuthorName.PluginName
```

### 启用插件

`plugin:enable` - 启用已禁用的插件。

```bash
php artisan plugin:enable AuthorName.PluginName
```

### 删除插件

`plugin:remove` - 销毁插件的数据库表并从文件系统中删除插件文件。

```bash
php artisan plugin:remove AuthorName.PluginName
```

## 主题管理

October 包含多个用于管理主题的命令。

### 安装主题

`theme:install` - 从[市场](https://octobercms.com/themes/)下载并安装主题。以下示例将在 `/themes/authorname-themename` 中安装主题

```bash
php artisan theme:install AuthorName.ThemeName
```

您可以使用 `--from` 选项从远程源安装主题。

```bash
php artisan theme:install AuthorName.ThemeName --from=git@github.com:authorname/themename-theme.git
```

使用 `--want` 选项指定目标分支或版本。

```bash
php artisan theme:install AuthorName.ThemeName --from=git@github.com:authorname/themename-theme.git --want=dev-develop
```

如果您的包名带有 `oc` 前缀，请使用 `--oc` 选项。

```bash
php artisan theme:install AuthorName.ThemeName --from=git@github.com:authorname/oc-themename-theme.git --oc
```

### 检查保护状态

`theme:check` - 对主题执行系统范围的检查，以查看它们是否应被标记为只读并受保护免受更改。此命令将遍历每个主题并检查它是否已通过 composer 安装，如果是，将添加[主题锁定文件](../cms/themes/child-themes.md)并创建子主题。

```bash
php artisan theme:check
```

### 列出主题

`theme:list` - 列出已安装的主题。

```bash
php artisan theme:list
```

### 启用主题

`theme:use` - 切换活动主题。以下示例将切换到 `/themes/rainlab-vanilla` 中的主题

```bash
php artisan theme:use rainlab-vanilla
```

### 删除主题

`theme:remove` - 删除主题。以下示例将删除目录 `/themes/rainlab-vanilla`

```bash
php artisan theme:remove rainlab-vanilla
```

### 复制主题

`theme:copy` - 复制现有主题以创建新主题，包括创建子主题。

```bash
php artisan theme:copy <source-theme> [destination-theme]
```
