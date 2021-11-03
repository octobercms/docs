# Основные команды

- [Основные команды](#scaffolding-commands)
    - [Создание плагина](#scaffold-create-plugin)
    - [Создание компонента](#scaffold-create-component)
    - [Создание модели](#scaffold-create-model)
    - [Создание контроллера](#scaffold-create-controller)
    - [Создание виджета](#scaffold-create-formwidget)
    - [Создание консольной команды](#scaffold-create-command)

<a name="scaffolding-commands" class="anchor" ></a>
## Основные команды

Вы можете использовать основные команды для ускорения процесса разработки.

<a name="scaffold-create-plugin" class="anchor" ></a>
### Создание плагина

`create:plugin` - создает папку с плагином. generates a plugin folder and basic files for the plugin. The parameter specifies the author and plugin name.

    php artisan create:plugin Author.PluginName

<a name="scaffold-create-component" class="anchor" ></a>
### Создание компонента

`create:component` - создает новый класс компонента и представление по умолчанию.

    php artisan create:component Author.PluginName СomponentClassName

<a name="scaffold-create-model" class="anchor" ></a>
### Создание модели

`create:model` - создает необходимые файлы для новой модели.

    php artisan create:model Author.PluginName ModelClassName

<a name="scaffold-create-controller" class="anchor" ></a>
### Cоздание контроллера

`create:controller` - создает контроллер, представления и файлы с настройками.

    php artisan create:controller Author.PluginName ControllerClassName

<a name="scaffold-create-formwidget" class="anchor" ></a>
### Создание виджета

`create:formwidget` - создает виджет, который можно использовать в административной части сайта.

    php artisan create:formwidget Author.PluginName CategorySelector

<a name="scaffold-create-command" class="anchor" ></a>
### Создание консольной команды

`create:command` - создает [новую консольную команду](./console-development).

    php artisan create:command Author.PluginName MyCommandName
