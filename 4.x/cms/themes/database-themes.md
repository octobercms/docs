---
subtitle: Store theme content changes in the database instead of the file system.
---
# Database-driven Themes

In some cases you may not have access to write to the filesystem to make changes to the theme. Database-driven themes allows you to store all changes to CMS templates in the database.

:::aside
Assets files like images and stylesheets do not save in the database and cannot be modified without access to the filesystem.
:::

To enable this feature for a single theme, navigate to **Settings → Frontend Theme**, select **Edit Properties** and check the checkbox called **Save Changes in Database**.

Alternatively you can enable this feature globally for all themes with the config item `cms.database_templates` or using the environment variable.

```text
CMS_DB_TEMPLATES=true
```

## Importing from Database to Filesystem

The `theme:copy` command can be used to copy the database version of the theme to the filesystem. Simply call the command with the `--import-db` option.

```bash
php artisan theme:copy demo --import-db
```

To delete all the database templates at the same time, use the `--purge-db` option.

```bash
php artisan theme:copy demo --import-db --purge-db
```
