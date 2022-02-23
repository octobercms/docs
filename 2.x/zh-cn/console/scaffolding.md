# 脚手架

使用脚手架命令加快开发过程。

## 创建插件

`create:plugin` 命令为插件生成一个插件文件夹和基本文件。 该参数指定作者和插件名称。

    php artisan create:plugin Acme.Blog

## 创建一个组件

`create:component` 命令创建一个新的组件类和默认的组件视图。 第一个参数指定作者和插件名称。 第二个参数指定组件类名。

    php artisan create:component Acme.Blog Post

## 创建模型

`create:model` 命令生成新模型所需的文件。 第一个参数指定作者和插件名称。 第二个参数指定模型类名称。

    php artisan create:model Acme.Blog Post

## 创建后端控制器

`create:controller` 命令生成控制器、配置和视图文件。 第一个参数指定作者和插件名称。 第二个参数指定控制器类名。

    php artisan create:controller Acme.Blog Posts

## 创建表单小部件

`create:formwidget` 命令生成后端表单小部件、视图和基本资产文件。 第一个参数指定作者和插件名称。 第二个参数指定表单小部件类名。

    php artisan create:formwidget Acme.Blog CategorySelector

<a id="oc-create-a-report-widget"></a>
## 创建报告小部件

`create:reportwidget` 命令生成后端报告小部件、视图和基本资产文件。 第一个参数指定作者和插件名称。 第二个参数指定报告小部件类名。

    php artisan create:reportwidget Acme.Blog TopPosts

<a id="oc-create-a-console-command"></a>
## 创建控制台命令

`create:command` 命令生成一个 [新控制台命令](../console/development.md)。 第一个参数指定作者和插件名称。 第二个参数指定命令名称。

    php artisan create:command RainLab.Blog MyCommand
