---
subtitle: 将数据库表列直接映射到 PHP 对象。
---
# 模型

October CMS 提供了一个优雅而简洁的 Active Record 实现，用于与数据库交互，基于 [Laravel 的 Eloquent](http://laravel.com/docs/eloquent)。每个数据库表都有一个对应的"模型"，用于与该表进行交互。模型允许你查询表中的数据，以及向表中插入新记录。

模型类位于插件目录的 **models** 子目录中。以下是模型目录结构的示例。

::: dir
├── plugins
|   └── acme
|       └── blog
|           ├── `models`
|           |   ├── post  _← 配置目录_
|           |   |   ├── fields.yaml  _← 配置文件_
|           |   |   └── columns.yaml  _← 配置文件_
|           |   └── Post.php  _← 模型类_
|           └── Plugin.php
:::

模型配置目录可以包含模型的[表单字段定义](../../element/form-fields.md)。模型配置目录名称与以小写形式书写的模型类名匹配。

## 定义模型

`create:model` 命令会生成新模型所需的文件。第一个参数指定作者和插件名称。第二个参数指定模型类名。

```bash
php artisan create:model Acme.Blog Post
```

在大多数情况下，你应该为每个数据库表创建一个模型类。所有模型类必须继承 `Model` 类。在插件中使用的模型的最基本表示如下所示。

```php
namespace Acme\Blog\Models;

use Model;

class Post extends Model
{
    protected $table = 'acme_blog_posts';
}
```

`$table` 受保护字段指定与模型对应的数据库表。表名由作者、插件和记录类型名称的复数形式以蛇形命名法组成。

### 支持的属性

除了[模型 Trait](traits.md) 提供的属性外，模型上还有一些标准属性。例如：

```php
class User extends Model
{
    protected $primaryKey = 'id';

    public $exists = false;

    protected $dates = ['last_seen_at'];

    public $timestamps = true;

    protected $jsonable = ['permissions'];

    protected $guarded = ['*'];
}
```

属性 | 描述
------------- | -------------
**$primaryKey** | 用于标识模型的主键名称。
**$incrementing** | 布尔值，如果为 false，则表示主键不是自增整数值。
**$exists** | 布尔值，如果为 true，则表示模型已存在。
**$dates** | 获取后值会被转换为 Carbon/DateTime 对象的实例。
**$timestamps** | 布尔值，如果为 true，将自动设置 created_at 和 updated_at 字段。
**$jsonable** | 保存前值会被编码为 JSON，获取后转换为数组。
**$fillable** | 可批量赋值的字段。
**$guarded** | 受保护的不允许批量赋值的字段。
**$visible** | [序列化模型数据](../database/serialization.md)时可见的字段。
**$hidden** | [序列化模型数据](../database/serialization.md)时隐藏的字段。
**$connection** | 包含模型默认使用的[连接名称](../../setup/database-config.md)的字符串。

#### 主键

模型将假定每个表都有一个名为 `id` 的主键列。你可以定义 `$primaryKey` 属性来覆盖此约定。

```php
class Post extends Model
{
    protected $primaryKey = 'id';
}
```

#### 自增

模型将假定主键是一个自增整数值，这意味着默认情况下主键将自动转换为整数。如果你希望使用非自增或非数字主键，则必须将公共属性 `$incrementing` 设置为 false。

```php
class Message extends Model
{
    public $incrementing = false;
}
```

#### 时间戳

默认情况下，模型期望表中存在 `created_at` 和 `updated_at` 列。如果你不希望这些列被自动管理，请将模型上的 `$timestamps` 属性设置为 `false`。

```php
class Post extends Model
{
    public $timestamps = false;
}
```

如果你需要自定义时间戳的格式，请在模型上设置 `$dateFormat` 属性。此属性决定日期属性在数据库中的存储方式，以及模型序列化为数组或 JSON 时的格式。

```php
class Post extends Model
{
    protected $dateFormat = 'U';
}
```

#### 存储为 JSON 的值

当属性名称传递给 `$jsonable` 属性时，值将在存储到数据库时序列化为 JSON，在获取时反序列化。

```php
class Post extends Model
{
    protected $jsonable = ['data'];
}
```

## 模型事件

模型会触发多个事件，允许你在模型生命周期的各个节点进行挂钩。事件允许你在每次特定模型类在数据库中保存或更新时轻松执行代码。事件通过覆盖类中的特殊方法来定义，以下方法覆盖可用：

事件 | 描述
------------- | -------------
**beforeCreate** | 模型首次创建时，保存之前。
**afterCreate** | 模型首次创建时，保存之后。
**beforeSave** | 模型创建或更新时，保存之前。
**afterSave** | 模型创建或更新时，保存之后。
**beforeValidate** | 提供的模型数据验证之前。
**afterValidate** | 提供的模型数据验证之后。
**beforeUpdate** | 现有模型保存之前。
**afterUpdate** | 现有模型保存之后。
**beforeDelete** | 现有模型删除之前。
**afterDelete** | 现有模型删除之后。
**beforeRestore** | 软删除的模型恢复之前。
**afterRestore** | 软删除的模型恢复之后。
**beforeFetch** | 现有模型填充之前。
**afterFetch** | 现有模型填充之后。

以下是使用事件的示例。

```php
public function beforeCreate()
{
    $this->slug = Str::slug($this->name);
}
```

### 基本用法

每当新模型第一次保存时，`beforeCreate` 和 `afterCreate` 事件将触发。如果模型已存在于数据库中并调用了 `save` 方法，则 `beforeUpdate` / `afterUpdate` 事件将触发。但是，在两种情况下，`beforeSave` / `afterSave` 事件都会触发。

例如，让我们定义一个事件监听器，在模型首次创建时填充 `slug` 属性。

```php
public function beforeCreate()
{
    $this->slug = Str::slug($this->name);
}
```

从事件返回 `false` 将取消 `save` / `update` 操作。

```php
public function beforeCreate()
{
    if (!$user->isValid()) {
        return false;
    }
}
```

可以使用 `original` 属性访问旧值。例如：

```php
public function afterUpdate()
{
    if ($this->title !== $this->original['title']) {
        // Title has changed
    }
}
```

你可能会发现使用[延迟绑定](../database/relations.md)创建的关联（例如：文件附件）在模型事件中尚不可用。要提前访问它们，请在关联上使用 `withDeferred` 数据库查询方法。

```php
public function beforeCreate()
{
    $avatar = $this->avatar()->withDeferred()->first();

    $gallery = $this->gallery()->withDeferred()->get();
}
```

你可以使用 `bindEvent` 方法从外部为单个模型实例绑定[本地事件](../services/event.md)。事件名称应与方法覆盖名称相同，并以 `model.` 为前缀。

```php
$flight = new Flight;
$flight->bindEvent('model.beforeCreate', function() use ($model) {
    $model->slug = Str::slug($model->name);
});
```

## 扩展模型

由于模型[已准备好使用行为](./behaviors.md)，它们可以使用静态 `extend` 方法进行扩展。该方法接受一个闭包并将模型对象传递给它。

在闭包内部，你可以向模型添加关联。在这里，我们扩展 `User` 模型以包含一个引用 `Profile` 模型的 profile（has one）关联。

```php
User::extend(function($model) {
    $model->hasOne['profile'] = [Profile::class, 'key' => 'user_id'];
});
```

这种方法也可以用于绑定本地事件，以下代码监听 `model.beforeSave` 事件。

```php
User::extend(function($model) {
    $model->bindEvent('model.beforeSave', function() use ($model) {
        // ...
    });
});
```

此外，还存在一些方法用于扩展受保护的模型属性。

```php
User::extend(function($model) {
    // Add cast attributes
    $model->addCasts([
        'some_extended_field' => 'int',
    ]);

    // Add a date attribute
    $model->addDateAttribute('updated_at');

    // Adds fillable or jsonable fields
    $model->addFillable('first_name');
    $model->addJsonable('some_data');
});
```

通常，放置代码的最佳位置是在你的[插件注册文件](../extending.md) `boot` 方法中，因为它会在每次请求时运行，确保你对模型所做的扩展在任何地方都可用。

#### 另请参阅

::: also
* [查询模型](../database/model.md)
* [模型 Trait](../database/traits.md)
:::
