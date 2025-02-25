---
subtitle: How to move an existing Laravel App or Project to October CMS
---
# Migrating a Laravel Project

The following guide can be used to install October CMS v3 atop an existing Laravel 9 application. This is useful if you want to keep the same database without losing data or just prefer to use Laravel as a starting point.

The significant steps involve replacing Laravel’s Illuminate package with October’s Rain package, which represents an extended technology version of Laravel and adds the necessary core features to run October CMS.

::: tip
Be sure to follow this guide carefully, as slight differences exist in class names.
:::

## Install Laravel 9/10 and then October Rain

To get started, assume we have a brand new Laravel installation with the following command:

```bash
composer create-project laravel/laravel:^9.0 mylaravel
```

In the newly created directory, require the October CMS Rain library.

```bash
cd mylaravel
composer require october/rain
```

## Authenticate and Install October CMS

Authenticate with the October CMS gateway by setting your project key.

```bash
php artisan project:set <license key>
```

Require all the October CMS modules.

```bash
composer require october/all
```

When prompted to trust composer/installers enter `Y` for yes.

```bash
Do you trust "composer/installers" to execute code and wish to enable it now?
```

## Replace Illuminate references with Rain Library

The following steps are used to replace Illuminate with Rain.

### Update Application Container

In the file **bootstrap/app.php** the `Illuminate\Foundation\Application` class should be replaced with `October\Rain\Foundation\Application`.

```bash
// File bootstrap/app.php

// Replace
$app = new Illuminate\Foundation\Application(
    $_ENV['APP_BASE_PATH'] ?? dirname(__DIR__)
);

// With
$app = new October\Rain\Foundation\Application(
    $_ENV['APP_BASE_PATH'] ?? dirname(__DIR__)
);
```

### Update HTTP Kernel

In the file **app/Http/Kernel.php** the `App\Http\Kernel` class should extend `October\Rain\Foundation\Http\Kernel`.

```bash
// File app/Http/Kernel.php

// Replace
use Illuminate\Foundation\Http\Kernel as HttpKernel;

// With
use October\Rain\Foundation\Http\Kernel as HttpKernel;
```

### Update Console Kernel

In the file **app/Console/Kernel.php** the `App\Console\Kernel` class should extend `October\Rain\Foundation\Console\Kernel`.

```bash
// File app/Console/Kernel.php

// Replace
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

// With
use October\Rain\Foundation\Console\Kernel as ConsoleKernel;
```

### Update Exception Handler

In the file **app/Exceptions/Handler.php** the `App\Exceptions\Handler` class should extend `October\Rain\Foundation\Exception\Handler`.

```bash
// File app/Exceptions/Handler.php

// Replace
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

// With
use October\Rain\Foundation\Exception\Handler as ExceptionHandler;
```

## Publish October CMS Files

The following steps will copy the vendor files from October CMS. To publish the files, follow these steps:


1. Open the [October CMS public repo](https://github.com/octobercms/october)
1. Navigate to **Code → Download ZIP**
1. Save the zip and open it locally

Copy the following folders from the zip file.

- **config/**
- **plugins/**
- **themes/**

## Final Steps

Assuming that your database is configured and running, run the October CMS migration.

```bash
php artisan october:migrate
```

Next, to make CMS pages available to the frontend, remove or comment out the default route in the file **routes/web.php**.

Now you can open the `/backend` route to set up the administrator account.

### Extra Steps

Some optional steps to configure your system:

- If you plan on using the default Laravel path for views, uncomment this in the **config/view.php** file.


#### See Also

::: also
* [Laravel 9 Installation](https://laravel.com/docs/9.x/installation)
* [Laravel 10 Installation](https://laravel.com/docs/10.x/installation)
:::
