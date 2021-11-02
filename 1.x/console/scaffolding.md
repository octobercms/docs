# Scaffolding

Use the scaffolding commands to speed up the development process.

## Create a plugin

The `create:plugin` command generates a plugin folder and basic files for the plugin. The parameter specifies the author and plugin name.

    php artisan create:plugin Acme.Blog

## Create a component

The `create:component` command creates a new component class and the default component view. The first parameter specifies the author and plugin name. The second parameter specifies the component class name.

    php artisan create:component Acme.Blog Post

## Create a model

The `create:model` command generates the files needed for a new model. The first parameter specifies the author and plugin name. The second parameter specifies the model class name.

    php artisan create:model Acme.Blog Post

## Create a back-end controller

The `create:controller` command generates a controller, configuration and view files. The first parameter specifies the author and plugin name. The second parameter specifies the controller class name.

    php artisan create:controller Acme.Blog Posts

## Create a form widget

The `create:formwidget` command generates a back-end form widget, view and basic asset files. The first parameter specifies the author and plugin name. The second parameter specifies the form widget class name.

    php artisan create:formwidget Acme.Blog CategorySelector

## Create a report widget

The `create:reportwidget` command generates a back-end report widget, view and basic asset files. The first parameter specifies the author and plugin name. The second parameter specifies the report widget class name.

    php artisan create:reportwidget Acme.Blog TopPosts

## Create a console command

The `create:command` command generates a [new console command](../console/development.md). The first parameter specifies the author and plugin name. The second parameter specifies the command name.

    php artisan create:command RainLab.Blog MyCommand
