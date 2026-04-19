---
subtitle: 保持 October CMS 网站更新的说明。
---
# 更新 October CMS

`october:update` 命令将从 October 网关请求更新。它将更新核心应用程序和插件文件，然后执行数据库迁移。

```bash
php artisan october:update
```

## 数据库迁移

`october:migrate` 命令将执行数据库迁移，创建数据库表并执行由系统和[插件版本历史](../plugin/updates.md)提供的种子脚本。迁移命令可以多次运行，它只会执行一次迁移或种子脚本，这意味着只会应用新的更改。

```bash
php artisan october:migrate
```

`--rollback` 选项将撤销所有迁移，删除数据库表和数据。使用此命令时应谨慎。[插件刷新命令](../resources/installing-packages.md)是调试单个插件的有用替代方案。

```bash
php artisan october:migrate --rollback
```

`--skip-errors` 选项将忽略迁移过程中发生的任何异常。这在表已存在但仍需应用版本信息的情况下非常有用。

```bash
php artisan october:migrate --skip-errors
```

## 前沿更新

要接收 October CMS 的前沿更新，请将最低稳定性设置更改为 `dev`。

```bash
composer config minimum-stability dev
```

然后在 composer.json 文件中指定 `develop` 分支。例如：

```json
"october/all": "dev-develop",
"october/rain": "dev-develop",
```

`develop` 分支包含尚未在稳定渠道中发布的更新。可能有最新的错误修复和功能，但同时也可能包含未完成的工作。不建议在生产环境中启用前沿更新。

::: tip
`dev-develop` 标记也可能适用于某些插件和主题。
:::

## 从 v1 和 v2 升级指南

如果您的起点是 October CMS 2.0，请在执行升级时参考以下指南。

- [October CMS v3.0 升级指南](https://octobercms.com/support/article/rn-30)
- [October CMS v3.1 稳定版发布](https://octobercms.com/support/article/rn-32)

如果您的起点是 October CMS 1.0，请在继续上述指南之前参考这些指南。

- [October CMS v2.0 升级指南](https://octobercms.com/support/article/rn-13)
- [October CMS v2.1 稳定版发布](https://octobercms.com/support/article/rn-27)
