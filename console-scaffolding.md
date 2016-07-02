# Scaffolding commands

- [Scaffolding commands](#scaffolding-commands)
    - [Create a plugin](#scaffold-create-plugin)
    - [Create a component](#scaffold-create-component)
    - [Create a model](#scaffold-create-model)
    - [Create a back-end controller](#scaffold-create-controller)
    - [Create a form widget](#scaffold-create-formwidget)
    - [Create a console command](#scaffold-create-command)

<a name="scaffolding-commands"></a>
## Scaffolding commands

Use the scaffolding commands to speed up the development process.

<a name="scaffold-create-plugin"></a>
### Create a plugin

`create:plugin` - generates a plugin folder and basic files for the plugin. The parameter specifies the author and plugin name.

    php artisan create:plugin Acme.Blog

<a name="scaffold-create-component"></a>
### Create a component

`create:component` - creates a new component class and the default component view. The first parameter specifies the author and plugin name. The second parameter specifies the component class name.

    php artisan create:component Acme.Blog Post

<a name="scaffold-create-model"></a>
### Create a model

`create:model` - generates files needed for a new model. The first parameter specifies the author and plugin name. The second parameter specifies the model class name.

    php artisan create:model Acme.Blog Post

<a name="scaffold-create-controller"></a>
### Create a back-end controller

`create:controller` - generates a controller, configuration and view files. The first parameter specifies the author and plugin name. The second parameter specifies the controller class name.

    php artisan create:controller Acme.Blog Posts

<a name="scaffold-create-formwidget"></a>
### Create a form widget

`create:formwidget` - generates a back-end form widget, view and basic asset files. The first parameter specifies the author and plugin name. The second parameter specifies the form widget class name.

    php artisan create:formwidget Acme.Blog CategorySelector

<a name="scaffold-create-command"></a>
### Create a console command

`create:command` - generates a [new console command](../console/development). The first parameter specifies the author and plugin name. The second parameter specifies the command name.

    php artisan create:command RainLab.Blog MyCommand
