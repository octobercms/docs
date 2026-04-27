---
subtitle: 将主题内容更改存储在数据库中而不是文件系统中。
---
# 数据库驱动的主题

在某些情况下，您可能无法通过写入文件系统来对主题进行更改。数据库驱动的主题允许您将所有 CMS 模板的更改存储在数据库中。

:::aside
图片和样式表等资产文件不会保存在数据库中，如果无法访问文件系统则无法修改。
:::

要为单个主题启用此功能，请导航到**设置 → 前端主题**，选择**编辑属性**，然后勾选名为**将更改保存到数据库**的复选框。

或者，您可以使用配置项 `cms.database_templates` 或使用环境变量为所有主题全局启用此功能。

```text
CMS_DB_TEMPLATES=true
```

## 从数据库导入到文件系统

`theme:copy` 命令可用于将数据库版本的主题复制到文件系统。只需使用 `--import-db` 选项调用该命令。

```bash
php artisan theme:copy demo --import-db
```

要同时删除所有数据库模板，请使用 `--purge-db` 选项。

```bash
php artisan theme:copy demo --import-db --purge-db
```
