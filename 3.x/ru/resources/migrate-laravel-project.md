---
subtitle: Как перенести существующее приложение или проект Laravel на October CMS
---
# Миграция проекта Laravel

Следующее руководство поможет установить October CMS v3 поверх существующего приложения Laravel 9. Это полезно, если вы хотите сохранить ту же базу данных без потери данных или просто предпочитаете использовать Laravel в качестве отправной точки.

Основные шаги включают замену пакета Illuminate от Laravel на пакет Rain от October, который представляет собой расширенную технологическую версию Laravel и добавляет необходимые базовые функции для работы October CMS.

::: tip
Обязательно следуйте этому руководству внимательно, так как в именах классов есть небольшие различия.
:::

## Установка Laravel 9/10 и October Rain

Для начала предположим, что у нас есть свежая установка Laravel, выполненная следующей командой:

```bash
composer create-project laravel/laravel:^9.0 mylaravel
```

В созданном каталоге подключите библиотеку October CMS Rain.

```bash
cd mylaravel
composer require october/rain
```

## Аутентификация и установка October CMS

Пройдите аутентификацию на сервере October CMS, указав ключ вашего проекта.

```bash
php artisan project:set <license key>
```

Подключите все модули October CMS.

```bash
composer require october/all
```

Когда появится запрос на доверие к composer/installers, введите `Y` для подтверждения.

```bash
Do you trust "composer/installers" to execute code and wish to enable it now?
```

## Замена ссылок на Illuminate библиотекой Rain

Следующие шаги используются для замены Illuminate на Rain.

### Обновление контейнера приложения

В файле **bootstrap/app.php** класс `Illuminate\Foundation\Application` следует заменить на `October\Rain\Foundation\Application`.

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

### Обновление HTTP Kernel

В файле **app/Http/Kernel.php** класс `App\Http\Kernel` должен наследоваться от `October\Rain\Foundation\Http\Kernel`.

```bash
// File app/Http/Kernel.php

// Replace
use Illuminate\Foundation\Http\Kernel as HttpKernel;

// With
use October\Rain\Foundation\Http\Kernel as HttpKernel;
```

### Обновление Console Kernel

В файле **app/Console/Kernel.php** класс `App\Console\Kernel` должен наследоваться от `October\Rain\Foundation\Console\Kernel`.

```bash
// File app/Console/Kernel.php

// Replace
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

// With
use October\Rain\Foundation\Console\Kernel as ConsoleKernel;
```

### Обновление обработчика исключений

В файле **app/Exceptions/Handler.php** класс `App\Exceptions\Handler` должен наследоваться от `October\Rain\Foundation\Exception\Handler`.

```bash
// File app/Exceptions/Handler.php

// Replace
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

// With
use October\Rain\Foundation\Exception\Handler as ExceptionHandler;
```

## Публикация файлов October CMS

Следующие шаги скопируют файлы вендора из October CMS. Чтобы опубликовать файлы, выполните следующие действия:


1. Откройте [публичный репозиторий October CMS](https://github.com/octobercms/october)
1. Перейдите в **Code → Download ZIP**
1. Сохраните архив и откройте его локально

Скопируйте следующие папки из архива.

- **config/**
- **plugins/**
- **themes/**

## Заключительные шаги

При условии, что ваша база данных настроена и работает, выполните миграцию October CMS.

```bash
php artisan october:migrate
```

Далее, чтобы сделать CMS-страницы доступными на фронтенде, удалите или закомментируйте маршрут по умолчанию в файле **routes/web.php**.

Теперь вы можете открыть маршрут `/backend`, чтобы настроить учётную запись администратора.

### Дополнительные шаги

Некоторые необязательные шаги для настройки вашей системы:

- Если вы планируете использовать стандартный путь Laravel для представлений, раскомментируйте соответствующую строку в файле **config/view.php**.


#### Смотрите также

::: also
* [Установка Laravel 9](https://laravel.com/docs/9.x/installation)
* [Установка Laravel 10](https://laravel.com/docs/10.x/installation)
:::
