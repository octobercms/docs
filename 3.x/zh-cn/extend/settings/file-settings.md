# 文件设置

文件设置将设置值存储在文件中，可以通过环境变量或应用程序文件覆盖。

## 配置文件结构

插件可以在插件目录的 **config** 子目录中使用基于文件的配置文件。以下是插件 **config** 目录的示例。

::: dir
├── plugins
|   └── acme
|       └── todo
|           └── `config`
|               ├── config.php  _← 配置文件_
|               └── custom.php  _← 配置文件_
:::

配置文件是定义并返回**数组**的 PHP 脚本。以下是配置文件 **config.php** 的示例。

```php
return [
    'maxItems' => 10,
    'display' => 5
];
```

## 访问配置值

使用 `Config` facade 访问配置文件中定义的配置值。`get` 方法接受以下格式的插件和配置名称（第一个参数）：**acme.demo::maxItems**。您还可以定义默认值（第二个参数），在配置参数不存在时返回。

```php
$maxItems = Config::get('acme.demo::maxItems', 50);
```

使用不同的配置文件名会影响键名。例如，名为 **custom.php** 的配置文件将在键名前添加 `custom` 前缀，使用以下格式：**acme.demo::custom.maxItems**。以下示例基于名为 **custom.php** 的配置文件。

```php
$maxItems = Config::get('acme.demo::custom.maxItems', 50);
```

## 覆盖配置值

插件配置文件可以通过应用程序创建匹配的本地配置文件来覆盖，例如，要覆盖 **plugins/acme/demo/config/config.php**，请创建名为 **config/acme/todo/config.php** 的文件。


::: dir
├── config
|   └── `acme`
|       └── `todo`
|           └── config.php  _← 覆盖文件_
:::

在覆盖的配置文件中，您只需返回要覆盖的值。

```php
return [
    'maxItems' => 20
];
```

如果您希望在不同环境中使用不同的配置（例如：**dev**、**production**），可以考虑使用 `env()` 辅助函数从环境变量中获取值。`env()` 函数接受环境变量名称（第一个参数）和变量不存在时的可选默认值（第二个参数）。

```php
<?php

return [
    'maxItems' => env('ACME_TODO_MAX_ITEMS', 25)
];
```

当环境变量 `ACME_TODO_MAX_ITEMS` 设置为其他值时，这将更改 `maxItems` 的值。例如，在应用程序的 **.env** 文件中。请参阅[配置文章](../../setup/configuration.md)了解如何根据环境更改这些值。

```ini
ACME_TODO_MAX_ITEMS=10
```

#### 另请参阅

::: also
* [通用配置](../../setup/configuration.md)
:::
