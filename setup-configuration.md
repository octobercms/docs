# App configuration

- [Environment Configuration](#environment-config)
    - [Environment File Security](#environment-file-security)
- [Application Configuration](#app-configuration)
    - [Debug Mode](#debug-mode)
    - [Safe Mode](#safe-mode)
    - [CSRF protection](#csrf-protection)
    - [Bleeding Edge Updates](#edge-updates)

All of the configuration files for October CMS are stored in the **config** directory. Each option is documented, so feel free to look through the files and get familiar with the options available to you.

<a name="environment-config"></a>
## Environment Configuration

It is often helpful to have different configuration values based on the environment the application is running in. To control confguration in different environments, October CMS uses a [DotEnv library](https://github.com/vlucas/phpdotenv) to make it easy to manage environment variables. These variables can override any values specified in the **config** directory.

In a fresh installation of October CMS, the base directory will contain a `.env.example` file that provides typical values for a local environment. During the installation process, this file will be copied to `.env` where you can make any changes.

For example, the database connection can be specified with these variables.

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=database
    DB_USERNAME=root
    DB_PASSWORD=

Any variable in your `.env` file can be overridden by external environment variables such as server-level or system-level environment variables. For example, in Apache this line can be added to the `.htaccess` or `httpd.config` file:

    SetEnv DB_CONNECTION "mysql"

To recap, configuration values are loaded in this order.

1. System environment variables
1. Variables in the `.env` file
1. Values in the **config** PHP files

> **Important**: Never commit your `.env` file to source control because this would be a security risk in the event an intruder gains access to your source control repository, since any sensitive credentials would get exposed.

<a name="app-configuration"></a>
## Application Configuration

Here we will cover some common configuration items and their purpose.

<a name="debug-mode"></a>
### Debug Mode

The debug setting is found in the `config/app.php` configuration file with the `debug` parameter. By default, this option looks at the value of the `APP_DEBUG` environment variable, which is stored in your `.env` file.

    APP_DEBUG=true

When enabled, this setting will show detailed error messages when they occur along with other debugging features. While useful during development, debug mode should always be disabled when used in a live production site. This prevents potentially sensitive information from being displayed to the end-user.

The debug mode uses the following features when enabled:

1. [Detailed error pages](../cms/pages#error-page) are displayed.
1. Failed user authentication provides a specific reason.
1. [Combined assets](../markup/filter-theme) are not minified by default.
1. [Safe mode](#safe-mode) is disabled by default.

> **Important**: Always set the `APP_DEBUG` setting to `false` in production environments.

<a name="safe-mode"></a>
### Safe Mode

The safe mode setting is found in the `config/cms.php` configuration file with the `enable_safe_mode` parameter. By default, the option sources its value from `CMS_SAFE_MODE` which can be added to your `.env` file.

    CMS_SAFE_MODE=null

When safe mode is enabled, the PHP code section is disabled in CMS templates to prevent a user from potentially executing malicious code.

This variable can be set to `true` or `false`. If set to `null`, safe mode will activate when [debug mode](#debug-mode) is disabled.

<a name="csrf-protection"></a>
### CSRF protection

October CMS provides an easy method of protecting your application from cross-site request forgeries. First a random token is placed in your user's session. Then when a [opening form tag is used](../services/html#form-tokens) the token is added to the page and submitted back with each request.

    ENABLE_CSRF=true

While CSRF protection is enabled by default, you can disable it with the `enable_csrf_protection` parameter in the `config/system.php` configuration file, or the sourced value from `ENABLE_CSRF` environment variable.

<a name="edge-updates"></a>
### Bleeding Edge Updates

The October CMS platform is updated all the time and may contain a recent bug fix that won't be available until a new version is created. If you'd like to use the bleeding edge version of October CMS, simply target the `develop` branch in your composer file.

    "october/rain": "dev-develop",
    "october/system": "dev-develop",
    "october/backend": "dev-develop",
    "october/cms": "dev-develop",
    "october/media": "dev-develop",

> **Note**: This naming convention may also apply to some plugins and themes.
