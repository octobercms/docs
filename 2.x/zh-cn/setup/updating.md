# 升级指南

## 更新到 v2.0

执行升级时请遵守以下指南。

- [October CMS v2.0 升级指南](https://octobercms.com/support/article/rn-13)
- [Laravel v6.0 LTS 升级指南](https://octobercms.com/support/article/rn-11)
- [October CMS v2.1 稳定版](https://octobercms.com/support/article/rn-27)

#### 使用 Deploy 插件升级

如果想把v1网站升级使用v2，可以使用[官方部署插件](https://octobercms.com/plugin/rainlab-deploy)作为升级网站的解决方案。在执行这些步骤之前，始终**进行完整的站点备份**。

1. 在您的机器上本地安装或升级到 October CMS v2
1. 将Beacon文件部署到要升级的v1站点
1. Deploy 插件会在第一次部署时尝试升级站点

## 最新更新

October CMS 平台一直在更新，并且可能包含最近的错误修复，在创建新版本之前将不可用。如果你想使用 October CMS 的最新版本，只需在你的 Composer 文件中定位 `develop` 分支。

     "october/all": "dev-develop",
    "october/rain": "dev-develop",

> **注意**：此命名约定也可能适用于某些插件和主题。
