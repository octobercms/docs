---
subtitle: Узнайте, как устанавливать и управлять плагинами и темами.
---
# Установка Плагинов и Тем

## Управление проектом

October CMS включает следующие команды для управления вашим проектом.

### Синхронизация проекта

`project:sync` устанавливает все Плагины и Темы, принадлежащие проекту.

```bash
php artisan project:sync
```

<a id="oc-set-project"></a>
### Привязка проекта

`project:set` устанавливает лицензионный ключ для текущей инсталляции.

```bash
php artisan project:set <license key>
```

## Управление Плагинами

October CMS включает ряд команд для управления Плагинами.

### Установка Плагина

`plugin:install` — загружает и устанавливает плагин по его имени. В следующем примере будет установлен плагин с именем **AuthorName.PluginName**.

```bash
php artisan plugin:install AuthorName.PluginName
```

Используйте параметр `--want`, чтобы установить конкретную версию плагина.

```bash
php artisan plugin:install AuthorName.PluginName --want=1.0
```

Вы можете установить плагин из удалённого источника с помощью параметра `--from`.

```bash
php artisan plugin:install AuthorName.PluginName --from=git@github.com:authorname/pluginname-plugin.git
```

Используйте параметр `--want`, чтобы указать целевую ветку или версию.

```bash
php artisan plugin:install AuthorName.PluginName --from=git@github.com:authorname/pluginname-plugin.git --want=dev-develop
```

Используйте параметр `--oc`, если имя вашего пакета содержит префикс `oc`.

```bash
php artisan plugin:install AuthorName.PluginName --from=git@github.com:authorname/pluginname-plugin.git --oc
```

### Проверка зависимостей

`plugin:check` — выполняет системную проверку зависимостей установленных Плагинов. Эта команда проходит по каждой установленной Теме и Плагину, проверяя, установлены ли их зависимости. При обнаружении отсутствующих зависимостей команда попытается их установить.

```bash
php artisan plugin:check
```

### Обновление Плагина

`plugin:refresh` — удаляет таблицы базы данных плагина и создаёт их заново. Эта команда полезна при разработке.

```bash
php artisan plugin:refresh AuthorName.PluginName
```

Используйте параметр `--rollback`, чтобы только удалить таблицы базы данных без их повторного создания.

```bash
php artisan plugin:refresh AuthorName.PluginName --rollback
```

Вы также можете указать номер версии с параметром `--rollback`, чтобы откатиться до указанной версии.

```bash
php artisan plugin:refresh AuthorName.PluginName --rollback=1.0.3
```

### Список Плагинов

`plugin:list` — отображает список установленных Плагинов и их номера версий.

```bash
php artisan plugin:list
```

### Отключение Плагина

`plugin:disable` — отключает существующий плагин.

```bash
php artisan plugin:disable AuthorName.PluginName
```

### Включение Плагина

`plugin:enable` — включает ранее отключённый плагин.

```bash
php artisan plugin:enable AuthorName.PluginName
```

### Удаление Плагина

`plugin:remove` — удаляет таблицы базы данных плагина и удаляет файлы плагина из файловой системы.

```bash
php artisan plugin:remove AuthorName.PluginName
```

## Управление Темами

October включает ряд команд для управления Темами.

### Установка Темы

`theme:install` — загружает и устанавливает тему из [Маркетплейса](https://octobercms.com/themes/). В следующем примере тема будет установлена в каталог `/themes/authorname-themename`

```bash
php artisan theme:install AuthorName.ThemeName
```

Вы можете установить тему из удалённого источника с помощью параметра `--from`.

```bash
php artisan theme:install AuthorName.ThemeName --from=git@github.com:authorname/themename-theme.git
```

Используйте параметр `--want`, чтобы указать целевую ветку или версию.

```bash
php artisan theme:install AuthorName.ThemeName --from=git@github.com:authorname/themename-theme.git --want=dev-develop
```

Используйте параметр `--oc`, если имя вашего пакета содержит префикс `oc`.

```bash
php artisan theme:install AuthorName.ThemeName --from=git@github.com:authorname/oc-themename-theme.git --oc
```

### Проверка защиты

`theme:check` — выполняет системную проверку Тем, определяя, следует ли пометить их как доступные только для чтения и защищённые от изменений. Эта команда проходит по каждой Теме и проверяет, была ли она установлена через Composer. Если да, добавляется [файл блокировки темы](../cms/themes/child-themes.md) и создаётся дочерняя тема.

```bash
php artisan theme:check
```

### Список Тем

`theme:list` — отображает список установленных Тем.

```bash
php artisan theme:list
```

### Активация Темы

`theme:use` — переключает активную тему. В следующем примере будет выполнено переключение на тему в каталоге `/themes/rainlab-vanilla`

```bash
php artisan theme:use rainlab-vanilla
```

### Удаление Темы

`theme:remove` — удаляет тему. В следующем примере будет удалён каталог `/themes/rainlab-vanilla`

```bash
php artisan theme:remove rainlab-vanilla
```

### Копирование Темы

`theme:copy` — создаёт копию существующей темы для создания новой, включая создание дочерних тем.

```bash
php artisan theme:copy <source-theme> [destination-theme]
```
