---
subtitle: Twig Function
---
# config()

You may access configuration values using the `config()` helper function. It returns the current value from the configuration store.

The following example will output the value currently stored in `app.locale`.

```twig
{{ config('app.locale') }}
```

The above is the PHP equivalent of the following:

```php
<?= Config::get('app.locale') ?>
```

## env()

As companion function called `env()` can be used to access environment variables.

The following example would output the value currently stored in `APP_ENV` environment variable. Second argument is default value, when ENV key does not exists.

```twig
{{ env('APP_ENV', 'production') }}
```

The above is the PHP equivalent of the following:

```php
<?= env('APP_ENV', 'production') ?>
```

::: warning
The `config()` and `env()` functions are not available when [safe mode is enabled](../../setup/configuration.md).
:::
