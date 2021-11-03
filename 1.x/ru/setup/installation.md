# Установка OctoberCMS

Существует два способа установки OctoberCMS: при помощи [Мастера установки](#wizard-installation) и [Командной строки](../console/commands.md#console-install). Перед установкой необходимо убедиться, что Ваш сервер удовлетворяет минимальным системным требованиям.

<a name="system-requirements" class="anchor"></a>
## Минимальные системные требования

1. PHP version 5.5.9 или выше
1. PDO PHP Extension
1. cURL PHP Extension
1. OpenSSL PHP Extension
1. Mbstring PHP Library
1. ZipArchive PHP Library
1. GD PHP Library

Для некоторых операционных систем требуются ручная установка PHP JSON extension (Ubuntu `apt-get install php5-json`).

Если Вы используете SQL Server, то Вам потребуется установить [group concatenation](https://groupconcat.codeplex.com/).

<a name="wizard-installation" class="anchor"></a>
## Мастер установки

Рекомендуется использовать **Мастер установки** для установки OctoberCMS. Он проще, чем командная строка и не требует специальных знаний.

1. Подготовьте пустую папку на вашем сервере.
2. [Скачайте архив с файлами для установки](https://github.com/octobercms/install/archive/master.zip).
3. Распакуйте содержимое архива.
4. Предоставьте права на запись в папку с файлами и ее подпапками.
5. Перейдите по адресу http://ВАШДОМЕН.ru/install.php
6. Следуйте инструкциям.

![image](https://github.com/octobercms/docs/blob/master/images/wizard-installer.png?raw=true) {.img-responsive .frame}

<a name="troubleshoot-installation" class="anchor"></a>
### Устранение неполадок

1. **500 ошибка**: Увеличьте значение timeout limit на вашем сервере.

1. **Пустая страница**: Проверьте версию PHP. Проверьте права на файлы и папки.

1. **liveConnection**: Убедитесь, что ваш веб-сервер может создавать исходящие соединения через порт 80. Обратитесь к своему хостинг-провайдеру. Часто проблема заключается в настройках брандмауэра сервера.

1. **Syntax error or access violation: 1067 Invalid default value for ...**: Проверьте файл с настройками MySQL. Параметр «NO_ZERO_DATE» должен быть отключен.

> **Примечание**: подробный лог установки можно найти в install_files / install.log файла.

<a name="command-line-installation" class="anchor"></a>
## Установка из Командной строки

Процесс установки OctoberCMS при помощи командной строки описан в разделе [Интерфейс командной строки](../console/commands.md#console-install).

<a name="post-install-steps" class="anchor"></a>
## Что нужно сделать после установки

После завершения установки Вам необходимо сделать следующее:

<a name="delete-install-files" class="anchor"></a>
### Удалить установочные файлы

Если Вы использовали [Мастер установки](#wizard-installation), то Вы должны вручную удалить следующие файлы (по соображениям безопасности):

    install_files/      <== Каталог установки
    install.php         <== Файл установки

<a name="config-review" class="anchor"></a>
### Проверить конфигурации

Файлы с конфигурациями приложения хранятся в каталоге **config**. Все файлы содержат описания для каждого параметра. Важно ознакомиться с ними, чтобы настроить приложение под ваши нужды.

Например, на рабочем сервере Вы, возможно, захотите включить [защиту от  CSRF](../setup/configuration.md#csrf-protection). В то время как на локальном - [Последние обновления](../setup/configuration.md#edge-updates).

Мы настоятельно рекомендуем отключить [режим отладки](./setup/configuration.md#debug-mode) для опубликованных проектов.

<a name="crontab-setup" class="anchor"></a>
### Настроить работу планировщика

Для корректной работы *планировщика* Вы должны добавить следующую запись Cron на свой сервер. Редактирование crontab обычно выполняется при помощи команды `crontab -e`.

    * * * * * php /path/to/artisan schedule:run >> /dev/null 2>&1

Обязательно замените **/path/to/artisan** на абсолютный путь к файлу *artisan*, который лежит в корне Вашего приложения.

> **Примечание**: Если Вы добавляете эту команду в `/etc/cron.d`, то обязательно укажите пользователя сразу после `* * * * *`.

<a name="queue-setup" class="anchor"></a>
### Настроить работу очередей

Вы можете настроить очередь для обработки задач. По умолчанию они будут обрабатываться платформой асинхронно. Это поведение можно изменить, установив параметр `default` в `config/queue.php`.

Если Вы решите использовать драйвер очереди бд, то рекомендуется добавить запись Crontab: `php artisan queue: work`, для обработки первого доступного задания в очереди.
