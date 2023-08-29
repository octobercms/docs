---
subtitle: Instructions for keeping your October CMS website up to date.
---
# Updating October CMS

The `october:update` command will request updates from the October gateway. It will update the core application and plugin files, then perform a database migration.

```bash
php artisan october:update
```

## Database Migration

The `october:migrate` command will perform a database migration, creating database tables and executing seed scripts, provided by the system and [plugin version history](../plugin/updates.md). The migration command can be run multiple times, it will only execute a migration or seed script once, which means only new changes are applied.

```bash
php artisan october:migrate
```

The `--rollback` option will reverse all migrations, dropping database tables and deleting data. Care should be taken when using this command. The [plugin refresh command](../resources/installing-packages.md) is a useful alternative for debugging a single plugin.

```bash
php artisan october:migrate --rollback
```

The `--skip-errors` option will ignore any exceptions that occur during the migration process. This can be useful in cases where tables already exist, but version information should still be applied.

```bash
php artisan october:migrate --skip-errors
```

## Upgrade Guide from v1 and v2

If your starting point is October CMS 2.0, please observe the following guides when performing the upgrade.

- [October CMS v3.0 Upgrade Guide](https://octobercms.com/support/article/rn-30)
- [October CMS v3.1 Stable Release](https://octobercms.com/support/article/rn-32)

If your starting point is October CMS 1.0, please observe these guides before continuing with the above guides.

- [October CMS v2.0 Upgrade Guide](https://octobercms.com/support/article/rn-13)
- [October CMS v2.1 Stable Release](https://octobercms.com/support/article/rn-27)
