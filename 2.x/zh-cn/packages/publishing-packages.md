# 发布包

October CMS 使用 [Composer](https://getcomposer.org/) 发布包并且完全兼容，因此他们的文档适用于本文的扩展。

要在October CMS 市场上发布您的插件或主题，您需要首先成为开发者并选择代码。 此代码将确定您的包的名称，以后不能更改。

您的包应该驻留在可以由October CMS 网关访问的源代码控制存储库中，例如 [GitHub](https://github.com/) 或 [BitBucket](https://bitbucket.org/)。 对于私有包，服务器可以使用您在发布过程中提供的凭据访问它们。

确保以 **-plugin** 或 **-theme** 开头的包 `name` 分别以 **-plugin** 或 **-theme** 结尾，这将有助于其他人找到您的包，并且符合 [开发者指南](../../ 帮助/指南/developer.md#package-naming)。

<a id="oc-publishing-plugins"></a>
### 发布插件

发布插件时，`composer.json` 文件至少应包含此 JSON 内容。 请注意，包名必须以 **-plugin** 结尾，并包含 `composer/installers` 包作为依赖项。

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

代码为 **Acme.Blog** 的插件将具有 `acme/blog-plugin` 的 composer 包名称，并将安装在 **plugins/acme/blog** 目录中。

<a id="oc-publishing-themes"></a>
### 发布主题

发布主题时，`composer.json` 文件至少应包含此 JSON 内容。 请注意，包名必须以 **-theme** 结尾，并包含 `composer/installers` 包作为依赖项。

```json
{
    "name": "acme/boilerplate-theme",
    "type": "october-theme",
    "description": "在此处输入有意义的描述",
    "require": {
        "composer/installers": "~1.0"
    }
}
```

代码为 **Acme.Boilerplate** 将有一个`acme/boilerplate-theme` 的编写器包名，并安装在 **themes/boilerplate** 目录中。


### 声明依赖

插件和主题可能需要特定版本的October CMS，并且还依赖于其他包，只需将它们包含在您的 composer.json 文件中即可。

#### October CMS的版本

只需将 `october/system` 软件包要求为所需的 [目标版本模式](https://getcomposer.org/doc/articles/versions.md)。 以下将要求平台安装使用October CMS 2.1版本

```json
"require": {
    "october/system": ">=2.1"
}
```

#### 其他插件

导航到您的主题或插件目录并打开 composer.json 文件以包含依赖项及其目标版本。 以下将包含 [版本范围为 1.2](https://getcomposer.org/doc/articles/versions.md) 的 Acme.Blog 插件。


```json
"require": {
    "acme/blog-plugin": "^1.2"
}
```

您还应该确保此包包含在 [插件注册文件](../plugin/registration.md#oc-dependency-definitions) 中的 `$require` 属性中。


#### 其他主题

导航到您的主题或插件目录并打开 composer.json 文件以包含依赖项及其目标版本。 以下将包含 [版本范围为 1.2](https://getcomposer.org/doc/articles/versions.md) 的 Acme.Vanilla 主题。

```json
"require": {
    "acme/vanilla-theme": "^1.2"
}
```

确保此包包含在 [主题信息文件](../themes/development.md#oc-theme-dependencies) 中的 `require` 属性中。

#### 使用第三方软件包进行开发

要创建使用外部包或库的新插件或主题，您应该将其安装到您的根作曲家文件中，然后将定义复制到您的插件作曲家文件中。 例如，如果您希望插件 `acme/blog-plugin` 依赖于 `aws/aws-sdk-php` 包。

1. 在根目录下，运行`composer require aws/aws-sdk-php`。 这会将包安装到根 composer 文件并确保它与其他包兼容。

2、完成后，打开根目录下的**composer.json**文件，找到新定义的依赖。 例如，您将看到如下内容：

```json
"require": {
    "aws/aws-sdk-php": "^3.158"
}
```

3. 从根 **composer.json** 文件中复制此定义，并将其包含在插件的 **plugins/acme/blog/composer.json** 文件中。 现在，您的应用程序可以使用该依赖项，并且插件也需要该依赖项供其他人使用。

### 版本发布

October CMS 中的包遵循语义版本控制，Composer 使用 git 来确定给定版本的稳定性和影响。

#### 列出版本

使用 `git tag` 命令列出包的现有版本。

```
$ git tag
v1.0
v2.0
```

#### 创建新标签

要创建新标签，请添加 (`-a`) 带有可选 (`-m`) 消息的版本。

```
git tag -a v2.0.1 -m "Version 2 is here!"
```

除了标记之外，您还应该增加在 [插件](../plugin/updates.md) 或 [主题](../themes/development.md#oc-version-file) 中找到的版本文件。

## 私人插件和主题

Composer 允许您将来自 GitHub 和其他提供商的私有存储库添加到您的 October CMS 项目中。 确保您分别遵循了 [发布插件](#oc-publishing-plugins) 和 [主题](#oc-publishing-themes) 的相同说明。

在所有情况下，您都应该将您的私有插件或主题的副本存储在主项目可用的某个位置。 `plugin:install` 和 `theme:install` 命令可用于从远程或本地源安装私人插件。 这会将位置添加到您的作曲家文件中，并像安装任何其他软件包一样安装它。

#### 从远程源安装

安装时使用 `--from` 选项指定远程源的位置。

    php artisan plugin:install Acme.Blog --from=git@github.com:acme/blog-plugin.git

要使用特定版本或分支，请使用 `--want` 选项，例如请求 **develop** 分支版本。

    php artisan plugin:install Acme.Blog --from=git@github.com:acme/blog-plugin.git --want=dev-develop

> **注意**：如果使用仓库的`git@`地址，composer会优先选择源版本并克隆仓库，这样你就可以继续正常推送更新。

#### 从本地源安装

使用来自同一项目源的 composer 安装插件。

    php artisan plugin:install Acme.Blog --from=./plugins/acme/blog

您也可以使用在本地或网络驱动器上找到的源。

    php artisan plugin:install Acme.Blog --from=/home/sam/private-plugins/acme-blog

## 使用 Laravel 包

在 October CMS插件中包含 Laravel 包时，需要注意一些事项。


### 配置文件

Laravel 包通常会提供配置文件，您应该将此配置复制到插件目录。 例如，如果文件名为 **purifier.php** 并包含一些基本配置值。

```php
return [
    'encoding' => 'UTF-8',
    'finalize' => true,
    'cachePath' => storage_path('app/purifier'),
    'cacheFileMode' => 0755,
];
```

将此文件复制到您的插件目录，例如，**plugins/acme/blog/config/purifier.php**。 复制和维护整个文件很重要，因为任何丢失的配置都不会从基本配置继承。

下一步，您应该将插件配置的内容传输到 `boot()` 方法中的包配置。

```php
public function boot()
{
    Config::set('purifier', Config::get('acme.blog::purifier'));
}
```

这会将所有包配置值设置为您的插件配置值。 下列的值将一致。

```php
Config::get('purifier.encoding') === Config::get('acme.blog::purifier.encoding');
```

现在，您可以按照常规插件配置值和[标准配置方法](settings.md#file-based configuration)的方式自由提供软件包配置值。

### 别名和服务提供商

如果 Laravel 包包含任何服务提供者和别名，您应该使用 `register()` 方法中的 `App` 门面在插件中手动注册它们。

```php
public function register()
{
    // 注册插件使用的包提供的别名
    App::registerClassAlias('Purifier', \Mews\Purifier\Facades\Purifier::class);

    // 注册插件使用的包提供的服务提供者
    App::register(\Mews\Purifier\PurifierServiceProvider::class);
}
```

### 迁移 & 模型

与数据库交互的 Laravel 包通常会包含它们自己的数据库迁移和 Eloquent 模型。 您应该将这些迁移和模型复制到插件目录。

请务必更改模型类以扩展基本的 `\October\Rain\Database\Model` 类，而不是基本的 Laravel Eloquent 模型类，以利用 October CMS 中的扩展技术特性。

重命名数据库表并在它们前面加上您的作者代码和插件名称也是一个好主意。 例如，名称为`posts`的表应重命名为`rainlab_blog_posts`。
