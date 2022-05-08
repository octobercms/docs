---
subtitle: Узнайте, как установить October CMS в локальной среде Docker.
---
# Установка с помощью Laravel Sail

::: aside
Поскольку веб-сервер работает отдельно от вашей операционной системы, команды вызываются с использованием `sail artisan` вместо `php artisan`.
:::

[Laravel Sail](https://laravel.com/docs/9.x/sail) — это интерфейс командной строки для взаимодействия с локальной средой разработки Docker. Это поможет вам начать работу, автоматизировав процесс настройки веб-сервера и базы данных. Эти инструкции научат вас, как использовать Sail и October CMS вместе.

## Приступаем к работе

Инструкции по установке Sail будут различаться в зависимости от вашей операционной системы. Также для установки October CMS используется другой URL сборки. По умолчанию этот URL устанавливает только базовую среду со службой MySQL.

::: tip
Замените `example-app` на любое имя директории, в котором будет установлен October CMS.
```bash
curl -s "https://octobercms.com/api/laravelsail/example-app" | bash
```
:::

Имея в виду этот другой URL-адрес, начните работу, следуя конкретному руководству Laravel для вашей операционной системы.

- [macOS](https://laravel.com/docs/9.x/installation#getting-started-on-macos)
- [Windows](https://laravel.com/docs/9.x/installation#getting-started-on-windows)
- [Linux](https://laravel.com/docs/9.x/installation#getting-started-on-linux)

Когда все будет готово, вам будет предложено выполнить эти команды для запуска веб-сервера.

```bash
cd example-app
./vendor/bin/sail up
```

Затем откройте другое окно консоли, перейдите в тот же каталог и выполните эти команды для установки October CMS. Параметры базы данных предварительно настроены и готовы к работе.

```bash
./vendor/bin/sail artisan october:install
```

После завершения установки откройте веб-сайт, используя адрес `http://localhost`.

#### Смотрите также

::: also
* [Документация Laravel Sail](https://laravel.com/docs/9.x/sail)
:::
