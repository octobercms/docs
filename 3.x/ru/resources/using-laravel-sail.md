---
subtitle: Узнайте, как установить October CMS с помощью локального окружения Docker.
---
# Установка с помощью Laravel Sail

::: aside
Поскольку веб-сервер работает отдельно от вашей операционной системы, команды вызываются с помощью `sail artisan` вместо `php artisan`.
:::

[Laravel Sail](https://laravel.com/docs/10.x/sail) — это интерфейс командной строки для взаимодействия с локальным окружением разработки Docker. Он упрощает начало работы, автоматизируя процесс настройки веб-сервера и базы данных. В этом руководстве описано, как использовать Sail и October CMS вместе для быстрого запуска проекта.

## Начало работы

Инструкции по установке Sail различаются в зависимости от вашей операционной системы. Кроме того, для установки October CMS используется другой URL сборки. По умолчанию этот URL устанавливает только базовое окружение с сервисом MySQL.

::: tip
Замените `example-app` на любое имя каталога — именно в него будет установлен October CMS.
```bash
curl -s "https://octobercms.com/api/laravelsail/example-app" | bash
```
:::

С учётом этого URL начните работу, следуя руководству Laravel для вашей операционной системы.

- [macOS](https://laravel.com/docs/10.x/installation#getting-started-on-macos)
- [Windows](https://laravel.com/docs/10.x/installation#getting-started-on-windows)
- [Linux](https://laravel.com/docs/10.x/installation#getting-started-on-linux)

Когда всё будет готово, вам будет предложено выполнить следующие команды для запуска веб-сервера.

```bash
cd example-app
./vendor/bin/sail up
```

Затем откройте другое окно консоли, перейдите в тот же каталог и выполните следующие команды для установки October CMS. Настройки базы данных уже сконфигурированы и готовы к использованию.

```bash
./vendor/bin/sail artisan october:install
```

После завершения установки откройте сайт по адресу `http://localhost`.

#### Смотрите также

::: also
* [Документация Laravel Sail](https://laravel.com/docs/10.x/sail)
:::
