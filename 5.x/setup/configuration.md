---
previousPath: setup/configuration.md
subtitle: Set configuration values with environment variables and prepare your site for production.
---
# Configuration

October CMS stores its configuration files in the `config` directory, and each parameter has inline documentation. Most values read from environment variables, so you usually configure a site by editing the `.env` file in the project root.

```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=database
DB_USERNAME=root
DB_PASSWORD=
```

## Setting Environment Variables

::: aside
October CMS uses the [DotEnv library](https://github.com/vlucas/phpdotenv) to manage environment variables.
:::

The installation script creates the `.env` file for you. A fresh installation also includes a `.env.example` file with typical values for a local environment.

You can also set environment variables at the server level, or for the [web application's virtual host](https://httpd.apache.org/docs/2.4/env.html). These override any variable in the `.env` file.

Configuration values load in this order:

1. system environment variables
2. variables in the .env file
3. values in the configuration PHP files.

::: warning
Never add the `.env` file to source control. It would be a security risk if an intruder gained access to the repository.
:::

### Using a Different File per Environment

To load configuration based on the current environment, such as staging or production, set the `APP_ENV` variable at the server level. For example, in Apache:

```text
SetEnv APP_ENV "staging"
```

When `APP_ENV` is defined, the platform tries to load a .env file with a suffix matching the environment name, for example **.env.staging**. If the file does not exist, there is no error. If both **.env.staging** and **.env** exist, the **.env** file is ignored completely.

When you use cached or [optimized configuration](./web-server.md#improving-performance), set the `APP_CONFIG_CACHE` value in the **.env** file to change the cache file path. This makes sure each environment receives the correct cached configuration values.

```ini
APP_CONFIG_CACHE=storage/framework/config-staging.php
```

## Production Configuration

Review these parameters before you put a site into production.

### Debug Mode

The `debug` parameter in the `config/app.php` file must be disabled in production. Its value loads from the `APP_DEBUG` environment variable, and the installation enables it in the `.env` file.

```ini
APP_DEBUG=false
```

Debug mode shows detailed error messages and turns on other debugging features. This is useful during development, but on a live site it can display sensitive information to visitors.

Debug mode provides these features:

- [detailed error messages](../themes/pages.md#error-page)
- failed user authentication gives a specific reason
- [combined assets](../handbook/twig-filters/theme.md) are not minified by default

### CSRF Protection

October CMS has a built-in [Cross-Site Request Forgery](https://owasp.org/www-community/attacks/csrf) prevention mechanism. When it is enabled, October CMS stores a random token in the user's session. The [form opening tag](../backend/services/html.md#opening-a-form) and the [form token tag](../backend/services/html.md#form-tokens) add a hidden field with the token value to the form. For every POST, PUT or DELETE request, the platform checks that the submitted token matches the one stored in the session.

CSRF protection is enabled by default. The `enable_csrf_protection` parameter is in the `config/system.php` file, and its value loads from the `ENABLE_CSRF` environment variable.

### Public Folder

Use a [public folder](./web-server.md#using-a-public-folder) in production to separate the internal files from the public files. It adds a layer of protection on top of the [web server configuration](./web-server.md), which only exposes the index PHP file and static asset files.

### Setting a Fallback Theme

The [active CMS theme](../themes/structure.md) is usually read from the database. If the database connection fails in production, visitors see the demo theme or a general error screen. To prevent this, set a fallback theme in the file-based configuration.

The fallback theme is set in the `config/cms.php` file and loads from the `ACTIVE_THEME` environment variable. Make sure it names a valid theme, since this value is used when the database is unavailable.

```ini
ACTIVE_THEME=my-theme
```

### Disabling the Editor

October CMS lets you make safe website updates in production, such as small HTML changes or new pages. This suits smaller applications, while larger applications may need stricter control over production changes.

To prevent production changes, remove the Editor using one of these methods.

- load only the required modules with the `system.load_modules` configuration
- do not deploy the Editor files found in the [modules directory](./directory-structure.md#modules-directory)
- use [permissions](../backend/panel/permissions.md) to prevent access to the Editor

::: tip
It is also a good idea to make the [app and themes directories](./directory-structure.md) read-only.
:::

To keep the Editor active in production, [enable safe mode](./web-server.md#enabling-safe-mode) instead. Safe mode allows updating HTML, CSS and other files, but blocks updating the PHP code section and any potentially unsafe Twig functions.

#### See Also

::: also
* [Web Server Configuration](./web-server.md)
* [Database Configuration](./database.md)
* [Mail Configuration](./mail.md)
:::
