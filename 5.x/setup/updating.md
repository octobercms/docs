---
previousPath: resources/updating-october.md
subtitle: Update October CMS and its plugins, migrate the database, and find the guides for upgrading from older versions.
---
# Updating October CMS

The `october:update` command requests updates from the October CMS gateway. It updates the core application and plugin files, then migrates the database.

```bash
php artisan october:update
```

The command needs an active license for the project. It is the same as running `composer update` followed by `php artisan october:migrate`.

## Migrating the Database

The `october:migrate` command creates database tables and runs the seed scripts provided by the system and the [plugin version history](../backend/plugins/versions.md). You can run it as many times as you like. It runs each migration or seed script only once, so only new changes are applied.

```bash
php artisan october:migrate
```

The `--rollback` option reverses all migrations, which drops the database tables and deletes their data. Use it with care. To debug a single plugin, the [plugin refresh command](./installing-packages.md#rebuilding-plugin-database-tables) is a useful alternative.

```bash
php artisan october:migrate --rollback
```

The `--skip-errors` option ignores any exceptions that occur during the migration. This is useful when tables already exist but the version information should still be applied.

```bash
php artisan october:migrate --skip-errors
```

## Getting Bleeding Edge Updates

To receive bleeding edge updates of October CMS, change the minimum stability setting to `dev`.

```bash
composer config minimum-stability dev
```

Then target the `develop` branch in the composer.json file. For example:

```json
"october/all": "dev-develop",
"october/rain": "dev-develop",
```

The `develop` branch includes updates that are not yet released in the stable channel. It has the latest bug fixes and features, but it can also contain unfinished work. Bleeding edge updates are not recommended for production environments.

::: tip
The `dev-develop` notation may also apply to some plugins and themes.
:::

## Upgrading from v1, v2 or v3

If your starting point is October CMS 3.0, follow this guide to perform the upgrade.

- [October CMS v4.0 Upgrade Guide](https://octobercms.com/support/article/rn-39)

If your starting point is October CMS 2.0, follow these guides first, then continue with the guide above.

- [October CMS v3.0 Upgrade Guide](https://octobercms.com/support/article/rn-30)
- [October CMS v3.1 Stable Release](https://octobercms.com/support/article/rn-32)

If your starting point is October CMS 1.0, follow these guides first, then continue with the guides above.

- [October CMS v2.0 Upgrade Guide](https://octobercms.com/support/article/rn-13)
- [October CMS v2.1 Stable Release](https://octobercms.com/support/article/rn-27)

#### See Also

::: also
* [Console Commands](./console-commands.md)
* [Installing Plugins & Themes](./installing-packages.md)
:::
