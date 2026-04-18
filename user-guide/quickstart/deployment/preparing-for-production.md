---
subtitle: "Configure your site's settings and environment for a secure, optimized production deployment."
---

# Preparing for Production

Your site looks great and works well on your local machine — now it is time to get it ready for the real world. Before you deploy to a live server, there are several important settings to review and configure. Taking a few minutes to go through this checklist can prevent security issues, broken features, and poor performance once your site is public.

Most of these settings live in your `.env` file, a configuration file in the root of your October CMS project. This file is where you define environment-specific values like database credentials, debug settings, and your site's URL.

## Disable Debug Mode

Debug mode is incredibly helpful during development — it shows detailed error messages, stack traces, and environment information when something goes wrong. But in production, that same information becomes a security risk. Detailed error pages can expose your database credentials, file paths, server configuration, and other sensitive data to anyone who visits your site.

In your `.env` file, set:

```
APP_DEBUG=false
```

::: warning
Never leave debug mode enabled on a production site. When `APP_DEBUG=true`, error pages display sensitive information about your server, database, and application internals. This is one of the most common and most dangerous oversights when deploying a website.
:::

With debug mode disabled, visitors see a clean, generic error page if something goes wrong, while the detailed errors are still logged to your server's log files where only you can see them.

## Set Your Application URL

The `APP_URL` setting tells October CMS what your live domain is. This is used for generating correct links, asset URLs, and other references throughout the site.

```
APP_URL=https://www.yoursite.com
```

Make sure this matches your actual domain, including the protocol (`https://`). If you are using HTTPS (and you should be), set it accordingly.

## Verify Your Application Key

The `APP_KEY` is a random string used for encryption — securing session data, cookies, and other sensitive values. This key is generated automatically during installation, but it is worth confirming that it is set in your `.env` file.

```
APP_KEY=base64:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

If this value is missing or empty, you can generate one by running:

```bash
php artisan key:generate
```

::: aside
Never share your `APP_KEY` or commit it to a public repository. If it is compromised, anyone could decrypt your application's encrypted data.
:::

## Configure Your Database

Update your `.env` file with the credentials for your production database. These values will be different from your local development database.

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_production_database
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
```

Double-check that the database exists on your production server and that the user has the necessary permissions before deploying.

## CSRF Protection

October CMS enables CSRF (Cross-Site Request Forgery) protection by default. This prevents malicious websites from submitting forms on behalf of your visitors. You do not need to change anything — just be aware that it is active and protecting your forms automatically.

## File Permissions

Your web server needs to be able to write to certain directories. Make sure the following directories are writable by the web server process:

- `storage/` (and all subdirectories)
- `bootstrap/cache/`

On most Linux servers, you can set this with:

```bash
chmod -R 755 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

The exact user (`www-data`) depends on your server configuration. Check with your hosting provider if you are unsure.

## Optimize for Performance

Once your settings are configured, you can cache your configuration and routes for faster performance. Run the following command on your server:

```bash
php artisan october:optimize
```

This creates cached versions of your configuration files and route definitions, so the application does not need to parse them on every request. The performance improvement is noticeable, especially on shared hosting.

::: tip
Use a pre-deployment checklist to make sure nothing is missed. Here is a quick summary of everything covered on this page:

- [ ] `APP_DEBUG` is set to `false`
- [ ] `APP_URL` is set to your live domain
- [ ] `APP_KEY` is present and not empty
- [ ] Database credentials are set for production
- [ ] `storage/` and `bootstrap/cache/` are writable
- [ ] `php artisan october:optimize` has been run
:::

## Next Steps

With your configuration in place, you are ready to deploy. Head to [Deploying Your Site](./deploying-your-site.md) for step-by-step instructions on getting your project onto a live server.

For the full reference on all available configuration options, see the [Configuration](../../../4.x/setup/configuration.md) and [Deployment](../../../4.x/setup/deployment.md) pages in the developer documentation.
