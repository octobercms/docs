---
subtitle: Learn how to configure and fine-tune October CMS.
---
# Common Configuration

All of the configuration files for October CMS are stored in the `config` directory. Each configuration parameter has inline documentation.

## Environment Configuration

Many of October CMS parameters can be configured using environment variables. Environment variables can be set on the server level, or defined for the [web application's virtual host](https://httpd.apache.org/docs/2.4/env.html).

::: aside
October CMS uses the [DotEnv library](https://github.com/vlucas/phpdotenv) to make it easy to manage environment variables.
:::

Environment variables can also be defined in the `.env` file that the installation script automatically creates in the project root directory. In a fresh installation of October CMS, the base directory contains a `.env.example` file that provides typical values for a local environment.

For example, the database connection can be specified with these variables:

```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=database
DB_USERNAME=root
DB_PASSWORD=
```

Any variable in the `.env` file can be overridden by external environment variables defined on the server or virtual host level.

Configuration values are loaded in this order:

1. system environment variables
2. variables in the .env file
3. values in the configuration PHP files.

::: warning
Never add the `.env` file to source control. It would be a security risk in the event an intruder gains access to the repository.
:::

### Environment-Specific Configuration Files

If a configuration file must be loaded based on the current application environment, e.g. staging or production, you can use the server-level `APP_ENV` variable. Example Apache configuration:

```text
SetEnv APP_ENV "staging"
```

When the `APP_ENV` variable is defined, the platform attempts to load a .env file with the suffix matching the environment name. e.g. **.env.staging**. If the file does not exist, there will be no error. If both **.env.staging** and **.env** files exist, the **.env** file is completely ignored.

When using cached or [optimized configuration](./web-server-config.md), the `APP_CONFIG_CACHE` value can be specified in the **.env** file to change the cache file path. This will ensure each environment receives the correct cached configuration values.

```ini
APP_CONFIG_CACHE=storage/framework/config-staging.php
```

## Production Configuration

There are several important commonly used configuration parameters that should be established for production environments.

### Debug Mode

The `debug` parameter can be found in the `config/app.php` file, and should be disabled in production. By default, the value is loaded from the `APP_DEBUG` environment variable. After the installation, the debug mode is enabled in the `.env` file.

```ini
APP_DEBUG=false
```

When enabled, the debug mode shows detailed error messages when they occur, along with other debugging features. While useful during development, the debug mode must be disabled on a live production site. It prevents potentially sensitive information from being displayed to website visitors.

Features provided when debug mode is enabled:

- [detailed error messages](../cms/pages.md#error-page)
- failed user authentication provides a specific reason
- [combined assets](../markup/filter-theme.md) are not minified by default

### CSRF protection

October CMS provides a built-in [Cross-Site Request Forgery](https://owasp.org/www-community/attacks/csrf) prevention mechanism. When CSRF protection is enabled, October CMS stores a random token in the user's session. The [form opening tag](../extend/services/html.md#opening-a-form) and the [form token tag](../extend/services/html.md#form-tokens) add a hidden field with the token value to the form. For all POST, PUT or DELETE requests, the platform checks whether the submitted token value matches the one stored in the user session.

CSRF protection is enabled by default. The `enable_csrf_protection` parameter can be found in the `config/system.php` file. By default, the value is loaded from the `ENABLE_CSRF` environment variable.

### Public Folder

A [public folder](../setup/web-server-config.md) is recommended to be used in production environments to isolate the internal files from the public files. This is an extra layer of redundancy used in addition to the [web server configuration](../setup/web-server-config.md), which only exposes the index PHP file and static asset files.

### Setting a Fallback Theme

The [active CMS theme](../cms/themes/themes.md) is commonly sourced from the database. An issue that can occur in production environments is when the database connection fails, the demo theme or a general error screen is shown instead. To solve this, be sure to set a fallback theme in the file-based configuration.

The fallback active theme is set in the `config/cms.php` file and is loaded from the `ACTIVE_THEME` environment variable. Check to make sure this is set to a valid theme since this value will be used in the absence of a database.

```ini
ACTIVE_THEME=my-theme
```

### Disabling the Editor

One of the unique aspects of October CMS is its ability to make website updates safely in production, for example, making minor adjustments to HTML or quickly adding new pages. This is great for smaller applications, whereas larger applications may be more strict about production changes.

To disable production changes, you may remove the Editor using one of the following methods.

- load only required modules using the `system.load_modules` configuration
- do not deploy the Editor files found in the [modules directory](./directory-structure.md)
- use [permissions](../extend/backend/permissions.md) to prevent access to the Editor

::: tip
It is also a good idea to make the [app and themes directories](./directory-structure.md) read-only.
:::

Alternatively, [enable safe mode](../setup/web-server-config.md) to keep the Editor active in production. Safe mode allows updating HTML, CSS and other files, but blocks updating the PHP code section and any potentially unsafe Twig functions.

#### See Also

::: also
* [Web Server Configuration](../setup/web-server-config.md)
:::
