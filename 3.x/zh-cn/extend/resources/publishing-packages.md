# 发布包

October CMS 使用 [Composer](https://getcomposer.org/) 来发布包，并且完全兼容，因此 Composer 的文档可作为本文的扩展阅读。

要在 October CMS 市场上发布您的插件或主题，您需要先成为作者并选择一个作者代码。此代码将决定您的包名称，之后无法更改。

您的包应存储在 October CMS 网关可以访问的源代码管理仓库中，例如 [GitHub](https://github.com/) 或 [BitBucket](https://bitbucket.org/)。对于私有包，服务器可以使用您在发布过程中提供的凭据来访问它们。

请确保您的包 `name` 以 **-plugin** 或 **-theme** 结尾，这将帮助其他人找到您的包，并且符合[开发者指南](https://octobercms.com/help/guidelines/developer#package-naming)的要求。

::: warning
当更新您的插件或主题以兼容较新版本的 October CMS 时，遵循[语义化版本控制](https://semver.org/)至关重要，以保护旧站点免受破坏性更改的影响。
:::

## 发布插件

发布插件时，`composer.json` 文件至少应包含以下 JSON 内容。请注意，包名称必须以 **-plugin** 结尾，并且需要将 `composer/installers` 包作为依赖项。

```json
{
    "name": "acme/blog-plugin",
    "type": "october-plugin",
    "description": "Enter a meaningful description here",
    "require": {
        "composer/installers": "~1.0"
    }
}
```

代码为 **Acme.Blog** 的插件将拥有 `acme/blog-plugin` 的 Composer 包名称，并将安装在 **plugins/acme/blog** 目录中。

## 发布主题

发布主题时，`composer.json` 文件至少应包含以下 JSON 内容。请注意，包名称必须以 **-theme** 结尾，并且需要将 `composer/installers` 包作为依赖项。

```json
{
    "name": "acme/boilerplate-theme",
    "type": "october-theme",
    "description": "Enter a meaningful description here",
    "require": {
        "composer/installers": "~1.0"
    }
}
```

代码为 **Acme.Boilerplate** 的插件将拥有 `acme/boilerplate-theme` 的 Composer 包名称，并安装在 **themes/boilerplate** 目录中。

## 声明依赖

插件和主题都可以要求特定版本的 October CMS，也可以依赖其他包，只需将它们包含在您的 composer.json 文件中即可。

### 要求特定版本的 October CMS

只需将 `october/rain` 包添加为所需的[目标版本模式](https://getcomposer.org/doc/articles/versions.md)。以下示例将要求平台安装使用 October CMS 3.1 或更高版本。

```json
"require": {
    "october/rain": ">=3.1"
}
```

### 要求另一个插件

导航到您的主题或插件目录，打开 composer.json 文件以添加依赖项及其目标版本。以下示例将包含 Acme.Blog 插件，[版本范围为 1.2](https://getcomposer.org/doc/articles/versions.md)。

```json
"require": {
    "acme/blog-plugin": "^1.2"
}
```

您还应确保此包包含在[插件注册文件](../system/plugins.md)中的 `$require` 属性中。

### 要求另一个主题

导航到您的主题或插件目录，打开 composer.json 文件以添加依赖项及其目标版本。以下示例将包含 Acme.Vanilla 主题，[版本范围为 1.2](https://getcomposer.org/doc/articles/versions.md)。

```json
"require": {
    "acme/vanilla-theme": "^1.2"
}
```

请确保此包包含在[主题信息文件](../../cms/themes/settings.md)中的 `require` 属性中。

### 使用第三方包进行开发

要创建使用外部包或库的新插件或主题，您应将其安装到根 composer 文件中，然后将定义复制到您的插件 composer 文件中。例如，如果您希望插件 `acme/blog-plugin` 依赖 `aws/aws-sdk-php` 包。

1. 在根目录中，运行 `composer require aws/aws-sdk-php`。这将把包安装到根 composer 文件中，并确保它与其他包兼容。

2. 完成后，打开根目录的 **composer.json** 文件以找到新定义的依赖项。例如，您将看到类似以下内容：

```json
"require": {
    "aws/aws-sdk-php": "^3.158"
}
```

3. 将此定义从根目录的 **composer.json** 文件复制并包含到您的插件的 **plugins/acme/blog/composer.json** 文件中。现在该依赖项既可供您的应用使用，也是其他人使用该插件时所必需的。

## 标记发布版本

October CMS 中的包遵循[语义化版本控制](https://semver.org/)，Composer 使用 git 来确定给定版本的稳定性和影响。

### 语义化版本控制

语义化版本控制是保护旧站点免受破坏性更改影响的流程。需要注意的是，默认情况下，Composer 不会自动更新主版本号。

以下版本升级路径将需要**手动操作**：

- 从 `v1.0.0` 升级到 `v2.0.0`

Composer 会**自动更新**次版本和补丁版本：

- 从 `v1.2.0` 更新到 `v1.3.0`
- 从 `v1.3.5` 更新到 `v1.3.6`

阅读 Composer 关于 [Composer 版本和约束](https://getcomposer.org/doc/articles/versions.md)的文章以了解更多信息。

### 列出您的标签

使用 `git tag` 命令列出您的包的现有标签。

```bash
$ git tag
v1.0
v2.0
```

### 创建新标签

要创建新标签，使用添加（`-a`）版本和可选的（`-m`）消息。

```bash
git tag -a v2.0.1 -m "Version 2 is here!"
```

### 递增版本文件

除了标记外，您还应递增在[插件版本文件](../system/plugins.md)或[主题设置](../../cms/themes/settings.md)中找到的版本文件。此文件会告知 October CMS 网关最新版本，并包含之前的版本历史。

为帮助理解其工作原理：

- 网关使用仓库**默认分支**中的版本文件。
- Composer 将使用仓库的**最新稳定标签**来安装和更新。

这意味着默认分支中的版本文件应始终与 Git 中的最新稳定标签匹配。

## 私有插件和主题

Composer 允许您将 GitHub 和其他提供商的私有仓库添加到您的 October CMS 项目中。请确保您已分别遵循发布插件和主题的相同说明。

在所有情况下，您都应该在主项目可访问的位置存储一份私有插件或主题的副本。`plugin:install` 和 `theme:install` 命令可用于从远程或本地来源安装私有插件。这将把位置添加到您的 composer 文件并像其他任何包一样安装它。

### 从远程来源安装

安装时使用 `--from` 选项指定远程来源的位置。

```bash
php artisan plugin:install Acme.Blog --from=git@github.com:acme/blog-plugin.git
```

要使用特定版本或分支，请使用 `--want` 选项，例如请求 **develop** 分支版本。

```bash
php artisan plugin:install Acme.Blog --from=git@github.com:acme/blog-plugin.git --want=dev-develop
```

::: tip
如果您使用仓库的 `git@` 地址，Composer 将优先使用源版本并克隆仓库，以便您可以继续正常推送更新。
:::

### 从本地来源安装

从同一项目源使用 Composer 安装插件。

```bash
php artisan plugin:install Acme.Blog --from=./plugins/acme/blog
```

您也可以使用本地或网络驱动器上的来源。

```bash
php artisan plugin:install Acme.Blog --from=/home/sam/private-plugins/acme-blog
```

#### 另请参阅

::: also
* [Semantic Versioning](https://semver.org/)
* [Composer Versions and Constraints](https://getcomposer.org/doc/articles/versions.md)
:::
