---
subtitle: 将 October CMS 项目部署到私有或共享服务器。
---
# 部署

::: aside
将站点部署到生产环境时，请确保您已实施推荐的[生产环境配置](./configuration.md)。
:::

October CMS 项目可以通过命令行（shell）访问使用 Composer 进行部署，也可以在 shell 访问受限时使用官方 Deploy 插件进行部署。

## 使用 Composer 部署

此方案适用于您拥有 SSH 访问权限并且在目标服务器上已安装 Composer 的情况。使用 Composer 部署 October CMS 项目与部署任何其他 Composer 项目相同：

* 在服务器上克隆项目仓库。
* 手动将 `auth.json` 文件复制到服务器。
* 在项目目录中运行 `composer install`。
* 更新配置文件。

请注意，源 October CMS 安装中的 Composer [auth.json](https://getcomposer.org/doc/articles/http-basic-authentication.md) 文件必须添加到服务器上。该文件在您首次安装 October CMS 时自动生成。它包含许可证密钥信息，是 Composer 向 October CMS Gateway 进行身份验证请求所必需的。

或者，您可以在运行 composer install 之前使用 `project:set` artisan 命令重新创建 **auth.json** 文件。

```bash
php artisan project:set <license key>
```

## 不使用 Composer 部署

如果您没有服务器的 SSH 访问权限，或者由于任何原因无法运行 Composer 命令，可以选择使用官方 <LinkWithIcon text="Deploy Plugin" icon="https://d2f5cg397c40hu.cloudfront.net/storage/app/uploads/public/optimized/local/c99/b52/eb1c99b52eb1dde393bb7ef60e4c861b062.png" href="https://octobercms.com/plugin/rainlab-deploy"/> 来部署 October CMS 项目。

<VideoBlockLink src="https://www.youtube.com/watch?v=Lx9X3CfXwfw" title="Deploy Tutorial" description="This video describes how to deploy your project to a remote server without Composer." prompt="Watch the tutorial"/>

该 Deploy 插件使用本地安装的 October CMS 在您自己的计算机上运行 composer 命令。本地生成的文件将基于此安装部署到您的服务器。之后，October CMS 提供一键更新功能，可用于直接在服务器上更新安装。如果一键更新失败，可以使用 Deploy 插件在无需命令行访问的情况下修复安装。

#### 另请参阅

::: also
* [生产环境配置](../setup/configuration.md)
:::
