---
subtitle: Узнайте как запускать запланированные задачи и очереди.
---
# Планировщик задач и очереди

## Конфигурация планировщика задач

Для правильной работы запланированных задач добавьте следующее [задание Cron](https://www.cyberciti.biz/faq/how-do-i-add-jobs-to-cron-under-linux-or-unix-oses/) в сервер:

```bash
* * * * * php /october/artisan schedule:run >> /dev/null 2>&1
```

Обязательно замените `/october/artisan` на абсолютный путь к файлу artisan в каталоге установки October CMS. Это задание cron будет вызывать планировщик команд каждую минуту. Затем October CMS сканирует все запланированные задачи и запускает их.

::: tip
Когда добавляете crontab файл в /etc/cron.d, укажите имя пользователя после `* * * * *`:

```bash
* * * * * alice php /october/artisan schedule:run >> /dev/null 2>&1
```

:::

## Конфигурация очередей

При желании вы можете настроить драйвер для обработки [заданий в очереди](../extend/services/queue.md). Его можно настроить в файле `config/queue.php`.

Для использования базы данных в качестве драйвера очередей, вы можете настроить задание cron, единоразово запускающее первую команду: `php artisan queue:work --once`.

```bash
* * * * * php /october/artisan queue:work --once >> /dev/null 2>&1
```

В качестве альтернативы можно запустить очередь как процесс демона:

```bash
php artisan queue:work
```

#### Смотрите также

::: also
* [Планировщик задач](../extend/system/scheduling.md)
* [Очереди](../extend/services/queue.md)
:::
