# Updating October CMS

The `october:update` command will request updates from the October gateway. It will update the core application and plugin files, then perform a database migration.

```bash
php artisan october:update
```

<a id="oc-database-migration"></a>
### Database Migration

The `october:migrate` command will perform a database migration, creating database tables and executing seed scripts, provided by the system and [plugin version history](../plugin/updates.md). The migration command can be run multiple times, it will only execute a migration or seed script once, which means only new changes are applied.

```bash
php artisan october:migrate
```

The `--rollback` option will reverse all migrations, dropping database tables and deleting data. Care should be taken when using this command. The [plugin refresh command](#oc-refresh-plugin) is a useful alternative for debugging a single plugin.

```bash
php artisan october:migrate --rollback
```
