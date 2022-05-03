---
subtitle: Learn how to install October CMS with a local Docker environment.
---
# Installing with Laravel Sail

::: aside
Since the web server runs seperately from your operating system, commands are called using `sail artisan` instead of `php artisan`.
:::

[Laravel Sail](https://laravel.com/docs/9.x/sail) is a command-line interface for interacting with a local Docker development environment. It helps you get started by automating the process of setting up the web server and database. These instructions teach you how to use Sail and October CMS together to get up and running.

## Getting Started

The instructions to install Sail will differ depending on your operating system. Also a different build URL is used to install October CMS. By default this URL only installs the base environment with a MySQL service.

::: tip
Replace `example-app` with any directory name and this is where October CMS will be installed.
```bash
curl -s "https://octobercms.com/api/laravelsail/example-app" | bash
```
:::

With this different URL in mind, get started by following the specific Laravel guide for your operating system.

- [macOS](https://laravel.com/docs/9.x/installation#getting-started-on-macos)
- [Windows](https://laravel.com/docs/9.x/installation#getting-started-on-windows)
- [Linux](https://laravel.com/docs/9.x/installation#getting-started-on-linux)

Once everything is ready, you are prompted to run these commands to start the web server.

```bash
cd example-app
./vendor/bin/sail up
```

Next, open another console window, navigate to the same directory and run these commands to install October CMS. The database settings are preconfigured and ready to go.

```bash
./vendor/bin/sail artisan october:install
```

After the installation is complete, open the website using the `http://localhost` address.

#### See Also

::: also
* [Laravel Sail Documentation](https://laravel.com/docs/9.x/sail)
:::
