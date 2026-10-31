---
previousPath: resources/migrate-laravel-project.md
subtitle: Install October CMS on top of an existing Laravel 12 application and keep its database.
---
# Migrating a Laravel Project

You can install October CMS on top of an existing Laravel 12 application. Use this approach to keep the same database without losing data, or when you prefer Laravel as a starting point.

The main steps replace Laravel's Illuminate package with October's Rain package. Rain extends Laravel and adds the core features that October CMS needs to run.

::: tip
Follow this guide carefully, since the class names differ only slightly.
:::

## Installing Laravel and October Rain

This guide starts from a new Laravel installation, created with this command:

```bash
composer create-project laravel/laravel:^12.0 mylaravel
```

In the project directory, require the October CMS Rain library.

```bash
cd mylaravel
composer require october/rain
```

## Installing the October CMS Modules

Authenticate with the October CMS gateway by setting your license key.

```bash
php artisan project:set <license key>
```

Require all the October CMS modules.

```bash
composer require october/all
```

When Composer asks whether to trust composer/installers, enter `Y` for yes.

```bash
Do you trust "composer/installers" to execute code and wish to enable it now?
```

## Replacing Illuminate with Rain

These steps switch the application from Illuminate to Rain.

### Updating the Application Class

In the **bootstrap/app.php** file, replace the `Illuminate\Foundation\Application` class with `October\Rain\Foundation\Application`.

```php
// File bootstrap/app.php

// Replace
use Illuminate\Foundation\Application;

// With
use October\Rain\Foundation\Application;
```

Laravel 12 no longer includes the HTTP kernel, console kernel and exception handler files. The October application class registers its own versions of these automatically, so the rest of the file can stay the same.

### Registering the System Module

In the **bootstrap/providers.php** file, add the `System\ServiceProvider` class to the list of providers.

```php
// File bootstrap/providers.php

return [
    System\ServiceProvider::class,
    App\Providers\AppServiceProvider::class,
];
```

## Copying the October CMS Files

Copy the configuration, plugin and theme files from the October CMS public repository.

1. Open the [October CMS public repo](https://github.com/octobercms/october)
1. Navigate to **Code → Download ZIP**
1. Save the zip and open it locally

Copy these folders from the zip file into your project.

- **config/**
- **plugins/**
- **themes/**

## Finishing the Installation

With your database configured and running, run the October CMS migration.

```bash
php artisan october:migrate
```

To make CMS pages available on the frontend, remove or comment out the default route in the **routes/web.php** file.

Then open the `/admin` route to set up the administrator account.

### Using Laravel Views

If you plan to use the default Laravel path for views, add `resource_path('views')` to the `paths` array in the **config/view.php** file.

#### See Also

::: also
* [Installation](./installation.md)
* [Directory Structure](./directory-structure.md)
* [Laravel 12 Installation](https://laravel.com/docs/12.x/installation)
:::
