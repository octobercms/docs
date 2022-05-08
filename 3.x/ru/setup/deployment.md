---
subtitle: Деплоинг October CMS проекта на приватный или shared сервер.
---
# Деплоинг

October CMS проекты могут быть развернуты используя Composer и официальный плагин Deploy.

## Деплоинг используя Composer

Этот сценарий применим, если у вас есть доступ по SSH и Composer установлен на целевом сервере. Процесс развертывания проекта на October CMS с помощью Composer аналогичен развертыванию любого другого проекта Composer:

* склонируйте проект из репозитория в папку на сервере.
* скопируйте файл `auth.json` в корневую директорию проекта.
* выполните `composer install` в директории проекта.
* обновите файлы конфигурации.

Учитывайте что файл [auth.json](https://getcomposer.org/doc/articles/http-basic-authentication.md) должен быть добавлен из директории где устанавливался проект в директорию проекта на сервере. Файл создается автоматически при первой установке October CMS. Он включает информацию о лицензионном ключе и требуется для аутентификации запросов Composer к шлюзу October CMS.

Вы можете создать файл `auth.json` заново, используя artisan команду [project:set](../console/commands.html#set-project) до выполнения `composer install`.

```bash
php artisan project:set <license key>
```

Если команда выше не доступна, вы можете создать файл `auth.json` используя composer.

```bash
​composer config --auth http-basic.gateway.octobercms.com <email address> <license key>
```

## Деплоинг без Composer

<VideoBlockLink src="https://www.youtube.com/watch?v=Lx9X3CfXwfw" title="Deploy в один клик" description="В этом видео описывается, как развернуть проект на удаленном сервере без Composer." prompt="Смотреть инструкцию"/>

Если у вас нет SSH-доступа к серверу или вы не можете запускать команды Composer по какой-либо причине, есть возможность развернуть October CMS проект с помощью официального <LinkWithIcon text="плагина Deploy" icon="https://d2f5cg397c40hu.cloudfront.net/storage/app/uploads/public/optimized/local/c99/b52/eb1c99b52eb1dde393bb7ef60e4c861b062.png" href="https://octobercms.com/plugin/rainlab-deploy"/>.
