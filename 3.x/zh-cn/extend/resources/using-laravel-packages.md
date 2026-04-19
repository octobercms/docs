# 使用 Laravel 包

在 October CMS 插件中引入 Laravel 包时，有一些注意事项需要了解。

### 配置文件

Laravel 包通常会提供配置文件，您应将此配置复制到您的插件目录中。例如，如果文件名为 **purifier.php** 并包含一些基本配置值。

```php
return [
    'encoding' => 'UTF-8',
    'finalize' => true,
    'cachePath' => storage_path('app/purifier'),
    'cacheFileMode' => 0755,
];
```

将此文件复制到您的插件目录，例如 **plugins/acme/blog/config/purifier.php**。重要的是要复制和维护整个文件，因为任何缺失的键都不会从基础配置中继承。

接下来，您应在 `boot()` 方法中将插件配置的内容传递给包配置。

```php
public function boot()
{
    Config::set('purifier', Config::get('acme.blog::purifier'));
}
```

这将把所有包配置值设置为您的插件配置值。以下值将相等。

```php
Config::get('purifier.encoding') === Config::get('acme.blog::purifier.encoding');
```

现在您可以像使用常规插件配置值和[标准配置方法](../settings/file-settings.md)一样提供包的配置值。

### 别名和服务提供者

如果 Laravel 包包含任何服务提供者和别名，您应在插件的 `register()` 方法中使用 `App` 门面手动注册它们。

```php
public function register()
{
    // Register the aliases provided by the packages used by your plugin
    App::registerClassAlias('Purifier', \Mews\Purifier\Facades\Purifier::class);

    // Register the service providers provided by the packages used by your plugin
    App::register(\Mews\Purifier\PurifierServiceProvider::class);
}
```

### 迁移和模型

与数据库交互的 Laravel 包通常会包含自己的数据库迁移和 Eloquent 模型。您应将这些迁移和模型复制到您的插件目录中。

请确保将 Model 类更改为扩展基础 `October\Rain\Database\Model` 类，而不是基础 Laravel Eloquent 模型类，以利用 October CMS 中的扩展技术特性。

重命名数据库表并以您的作者代码和插件名称作为前缀也是一个好做法。例如，名为 `posts` 的表应重命名为 `rainlab_blog_posts`。
