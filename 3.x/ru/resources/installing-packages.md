---
subtitle: Узнайте, как устанавливать плагины и шаблоны и управлять ими.
---
# Установка плагинов и шаблонов

## Управление проектом

October CMS включает эти команды для управления вашим проектом.

### Синхронизация проекта

`project:sync` устанавливает все плагины и темы, принадлежащие проекту.

```bash
php artisan project:sync
```

<a id="oc-set-project"></a>
### Установить проект

`project:set` устанавливает лицензионный ключ для установленного October CMS.

```bash
php artisan project:set <license key>
```

## Управление плагинами

October CMS включает ряд команд для управления плагинами.

### Install Plugin

`plugin:install` - загружает и устанавливает плагин по его имени. В следующем примере будет установлен плагин с именем **AuthorName.PluginName**.

```bash
php artisan plugin:install AuthorName.PluginName
```

Вы можете установить плагин из удаленного источника, используя опцию `--from`.

```bash
php artisan plugin:install AuthorName.PluginName --from=git@github.com:authorname/pluginname-plugin.git
```

Используйте параметр `--want`, чтобы выбрать определенную ветку или версию.

```bash
php artisan plugin:install AuthorName.PluginName --from=git@github.com:authorname/pluginname-plugin.git --want=dev-develop
```

Используйте параметр `--oc`, если имя вашего пакета имеет префикс `oc`.

```bash
php artisan plugin:install AuthorName.PluginName --from=git@github.com:authorname/pluginname-plugin.git --oc
```

### Проверка зависимостей

`plugin:check` - выполняет общесистемную проверку зависимостей установленных плагинов. Эта команда проверяет каждую тему и плагин, которые установлены в системе, и наличие их зависимостей. Если он обнаружит какие-либо отсутствующие зависимости, он попытается их установить.

```bash
php artisan plugin:check
```

<a id="oc-refresh-plugin"></a>
### Перезагрузить плагин

`plugin:refresh` - уничтожает таблицы базы данных плагина и создает их заново. Эта команда полезна для разработки.

```bash
php artisan plugin:refresh AuthorName.PluginName
```

Используйте параметр `--rollback`, чтобы только уничтожить таблицы базы данных, не создавая их заново.

```bash
php artisan plugin:refresh AuthorName.PluginName --rollback
```

Так-же в параметр `--rollback` можно указать версию, чтобы выполнить сброс только до нее.

```bash
php artisan plugin:refresh AuthorName.PluginName --rollback=1.0.3
```

### Список плагинов

`plugin:list` - Отображает список установленных плагинов и их версии.

```bash
php artisan plugin:list
```

### Отключить плагин

`plugin:disable` - Отключает установленный плагин.

```bash
php artisan plugin:disable AuthorName.PluginName
```

### Включить плагин

`plugin:enable` - Включает установленный плагин.

```bash
php artisan plugin:enable AuthorName.PluginName
```

### Удалить плагин

`plugin:remove` - уничтожает таблицы базы данных плагина и удаляет его файлы из файловой системы.

```bash
php artisan plugin:remove AuthorName.PluginName
```

## Управление шаблонами

October включает ряд команд для управления шаблонами.

### Установка шаблона

`theme:install` - загружает и устанавливает шаблон из [маркетплейса](https://octobercms.com/themes/). В следующем примере шаблон будет установлен в `/themes/authorname-themename`

```bash
php artisan theme:install AuthorName.ThemeName
```

Вы можете установить шаблон из иного источника, используя параметр `--from`.

```bash
php artisan theme:install AuthorName.ThemeName --from=git@github.com:authorname/themename-theme.git
```

Используйте параметр `--want`, чтобы выбрать определенную ветку или версию.

```bash
php artisan theme:install AuthorName.ThemeName --from=git@github.com:authorname/themename-theme.git --want=dev-develop
```

Используйте параметр `--oc`, если имя вашего пакета имеет префикс `oc`.

```bash
php artisan theme:install AuthorName.ThemeName --from=git@github.com:authorname/oc-themename-theme.git --oc
```

### Проверить шаблоны на защищенность

`theme:check` - выполняет общесистемную проверку шаблонов, чтобы определить, должны ли они быть помечены как доступные только для чтения и защищенные от изменений. Эта команда проверяет каждый шаблон, была ли она установлена через Composer, если да, то будет добавлен [файл блокировки темы](../cms/themes/child-themes.md) и создана дочерняя тема.

```bash
php artisan theme:check
```

### Список шаблонов

`theme:list` - список установленных шаблонов.

```bash
php artisan theme:list
```

### Использовать шаблон

`theme:use` - переключиться на активный шаблон. В следующем примере будет переключено на шаблон `/themes/rainlab-vanilla`

```bash
php artisan theme:use rainlab-vanilla
```

### Удалить шаблон

`theme:remove` - удаляет шаблон. В следующем примере будет удалена директория `/themes/rainlab-vanilla`

```bash
php artisan theme:remove rainlab-vanilla
```

### Скопировать шаблон

`theme:copy` - копирует установленный шаблон и создает новый, включая все дочерние шаблоны.

```bash
php artisan theme:copy <source-theme> [destination-theme]
```
