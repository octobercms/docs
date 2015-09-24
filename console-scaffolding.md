# Scaffolding commands

- [Scaffolding commands](#scaffolding-commands)

<a name="scaffolding-commands"></a>
## Scaffolding commands

Use the scaffolding commands to speed up the development process.

`october:fresh` - removes the demo theme and plugin that ships with October.

    php artisan october:fresh

`create:plugin` - generates a plugin folder and basic files for the plugin. The parameter specifies the author and plugin name.

    php artisan create:plugin Foo.Bar

`create:component` - creates a new component class and the default component view. The first parameter specifies the author and plugin name. The second parameter specifies the component class name.

    php artisan create:component Foo.Bar Post

`create:model` - generates files needed for a new model. The first parameter specifies the author and plugin name. The second parameter specifies the model class name.

    php artisan create:model RainLab.Blog Post

`create:controller` - generates a controller, configuration and view files. The first parameter specifies the author and plugin name. The second parameter specifies the controller class name.

    php artisan create:controller RainLab.Blog Posts

`create:formwidget` - generates a back-end form widget, view and basic asset files. The first parameter specifies the author and plugin name. The second parameter specifies the form widget class name.

    php artisan create:formwidget RainLab.Blog CategorySelector

