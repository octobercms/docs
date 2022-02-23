# 模型

October CMS 基于 [Laravel 的 Eloquent](http://laravel.com/docs/eloquent) 提供了一个漂亮而简单的 Active Record 实现来处理您的数据库。 每个数据库表都有一个相应的"Model"，用于与该表进行交互。 模型允许您查询表中的数据，以及将新记录插入表中。

模型类位于插件目录的 **models** 子目录中。 模型目录结构示例：

```
plugins/
  acme/
    blog/
      models/
      user/             <=== 配置目录
        columns.yaml    <=== 配置文件
        fields.yaml     <==^
      User.php          <=== 模型类
      Plugin.php
```

模型配置目录可以包含模型的 [列表字段](../backend/lists.md#oc-defining-list-columns) 和 [form field](../backend/forms.md#oc-defining-form-fields) 定义 . 模型配置目录名与小写的模型类名一致。

## 定义模型

在大多数情况下，您应该为每个数据库表创建一个模型类。 所有模型类都必须扩展`Model`类。 插件中使用的模型的最基本表示如下所示：

```php
namespace Acme\Blog\Models;

use Model;

class Post extends Model
{
    /**
     * 与模型关联的表。
     *
     * @var string
     */
    protected $table = 'acme_blog_posts';
}
```

protected`$table`字段指定模型对应的数据库表。 表名是作者、插件和记录类型名称的蛇形命名名称。

<a id="oc-supported-properties"></a>
### 支持的属性

除了 [模型特征](traits.md) 提供的那些之外，还可以在模型上找到一些标准属性。 例如：

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

属性 |  描述
------------- | -------------
**$primaryKey** | 用于标识模型的主键名称。
**$incrementing** | 布尔值，如果 false 表示主键不是递增的整数值。
**$exists** | 布尔值，如果为 true，则表示模型存在。
**$dates** | 获取后，值将转换为 Carbon/DateTime 对象的实例。
**$timestamps** | 布尔值，如果为 true 将自动设置 created_at 和 updated_at 字段。
**$jsonable** | 值在保存之前被编码为 JSON，并在获取后转换为数组。
**$fillable** | values 是 [批量赋值](#mass-assignment) 可访问的字段。
**$guarded** | 值是受 [批量赋值](#mass-assignment) 保护的字段。
**$visible** | 值是在 [序列化模型数据](../database/serialization.md) 时可见的字段。
**$hidden** | 值是在 [序列化模型数据](../database/serialization.md) 时隐藏的字段。
**$connection** | 包含模型默认使用的 [连接名称](../database/basics.md#oc-multiple-database-connections) 的字符串。

#### 主键

Eloquent 也会假设每个数据表都有一个名为 `id` 的主键列。你可以定义一个受保护的 `$primaryKey` 属性来重写约定。

```php
class Post extends Model
{
    /**
     * 模型的主键
     *
     * @var string
     */
    protected $primaryKey = 'id';
}
```

#### 递增

模型将假设主键是一个自增的整数值，这意味着默认情况下主键将自动转换为整数。如果您希望使用非递增或非数字主键，则必须将 public `$incrementing`属性设置为 false

```php
class Message extends Model
{
    /**
     * 模型的主键不是整数。
     *
     * @var bool
     */
    public $incrementing = false;
}
```

#### 时间戳

默认情况下，模型期望你的数据表中存在 `created_at` 和 `updated_at` 。如果你不想让模型自动管理这两个字段， 请将模型中的 `$timestamps` 属性设置为 `false`：

```php
class Post extends Model
{
    /**
     * 指示模型是否应加时间戳。
     *
     * @var bool
     */
    public $timestamps = false;
}
```

如果您需要自定义时间戳的格式，请在模型上设置 `$dateFormat` 属性。此属性确定日期属性在数据库中的存储方式，以及模型序列化为数组或 JSON 时的格式：

```php
class Post extends Model
{
    /**
     * 模型日期字段的存储格式。
     *
     * @var string
     */
    protected $dateFormat = 'U';
}
```

#### 值存储为 JSON

当属性名称被传递给 `$jsonable` 属性时，这些值将作为 JSON 从数据库中序列化和反序列化：

```php
class Post extends Model
{
    /**
     * @var array 使用 JSON 编码和解码的属性名称。
     */
    protected $jsonable = ['data'];
}
```

## 检索模型

当从数据库请求数据时，模型将主要使用 `get` 或 `first` 方法检索值，具体取决于您是希望 [检索多个模型](#retrieving-multiple-models) 还是 [检索单个模型]( #retrieving-a-single-model)。从模型派生的查询返回 [October\Rain\Database\Builder](../api/october/rain/database/builder) 的实例。

### 检索多个模型

一旦你创建了一个模型和[其关联的数据库表](../database/structure.md#oc-migration-structure)，你就可以开始从你的数据库中检索数据了。将每个模型视为一个强大的 [查询构建器](../database/query.md)，允许您查询与模型关联的数据库表。例如：

```php
$flights = Flight::all();
```

#### 访问字段值

如果您有模型实例，则可以通过访问相应的属性来访问模型的字段值。 例如，让我们遍历查询返回的每个 `Flight` 实例并回显 `name` 字段的值：

```php
foreach ($flights as $flight) {
    echo $flight->name;
}
```

#### 添加额外的约束

`all` 方法将返回模型表中的所有结果。 由于每个模型都充当 [查询构建器](../database/query.md)，因此您还可以为查询添加约束，然后使用 `get` 方法检索结果：

```php
$flights = Flight::where('active', 1)
    ->orderBy('name', 'desc')
    ->take(10)
    ->get();
```

> **注意**：由于模型是查询构建器，因此您应该熟悉 [查询构建器](../database/query.md) 上可用的所有方法。 您可以在模型查询中使用这些方法中的任何一种。

#### 集合

对于像 `all` 和 `get` 这样检索多个结果的方法，将返回一个 `Collection` 的实例。 此类提供 [各种有用的方法](../database/collection.md) 用于处理您的结果。 当然，你可以像数组一样简单地循环这个集合：

```php
foreach ($flights as $flight) {
    echo $flight->name;
}
```

#### 分块结果

如果你需要处理数以千计的记录，请使用 `chunk` 命令。 `chunk` 方法将检索模型的"分块"，将它们提供给给定的 `Closure` 进行处理。 在处理大型结果集时，使用 `chunk` 方法将节省内存：

```php
Flight::chunk(200, function ($flights) {
    foreach ($flights as $flight) {
        //
    }
});
```

传递给该方法的第一个参数是您希望每个"分块"接收的记录数。 作为第二个参数传递的闭包将为从数据库中检索到的每个块调用。

### 检索单个模型

传递到方法的第一个参数是希望每个"分块"接收的数据量。闭包作为第二个参数传递，它在每次从数据库中检索分块的时候调用。它将执行数据库查询把检索分块的结果传递给闭包方法。

```php
// 通过主键检索模型
$flight = Flight::find(1);

// 检索与查询约束匹配的第一个模型
$flight = Flight::where('active', 1)->first();
```

#### "未找到"异常

有时你希望在未找到模型时抛出异常。这在控制器和路由中非常有用。 `findOrFail` 和 `firstOrFail` 方法会检索查询的第一个结果，如果未找到，将抛出 `Illuminate\Database\Eloquent\ModelNotFoundException` 异常：

```php
$model = Flight::findOrFail(1);

$model = Flight::where('legs', '>', 100)->firstOrFail();
```

在[开发API](../services/router.md)时，如果未捕获异常，则会自动将'404'HTTP响应发送回用户，因此在使用这些方法时，无需编写显式检查以返回'404'响应：

```php
Route::get('/api/flights/{id}', function ($id) {
    return Flight::findOrFail($id);
});
```

### 检索集合

您还可以使用查询生成器提供的 `count`、`sum`、`max` 和其他 [聚合函数](../database/query.md#oc-aggregates)。 这些方法返回适当的标量值而不是完整的模型实例：

```php
$count = Flight::where('active', 1)->count();

$max = Flight::where('active', 1)->max('price');
```

## 插入 & 更新模型

插入和更新数据是模型的基本功能，与传统的 SQL 语句相比，它使过程变得轻松。

### 插入

要在数据库中创建新记录，只需创建一个新模型实例，在模型上设置属性，然后调用 `save` 方法：

```php
$flight = new Flight;
$flight->name = '悉尼飞往堪培拉';
$flight->save();
```

在这个例子中，我们只是创建了一个新的 `Flight` 模型实例并分配了 `name` 属性。 当我们调用 `save` 方法时，一条记录将被插入到数据库中。 `created_at` 和 `updated_at` 时间戳也会自动设置，因此无需手动设置。

### 更新

`save` 方法也可以用来更新数据库中已经存在的模型。 要更新模型，您应该检索它，设置您希望更新的任何属性，然后调用 `save` 方法。 同样，`updated_at` 时间戳将自动更新，因此无需手动设置其值：

```php
$flight = Flight::find(1);
$flight->name = '上海飞往北京';
$flight->save();
```

还可以针对与给定查询匹配的任意数量的模型执行更新。 在此示例中，所有"活动"且"目的地"为"圣地亚哥"的航班都将被标记为延误：

```php
Flight::where('is_active', true)
    ->where('destination', 'Perth')
    ->update(['delayed' => true]);
```

`update` 方法需要一个表示应该更新的列的字段和值的数组。

<a id="oc-mass-assignment"></a>
### 批量赋值

你也可以使用 `create` 方法来保存新模型，此方法会返回模型实例。不过，在使用之前，您需要在模型上指定一个 `fillable` 或 `guarded` 属性，因为所有模型都默认不可进行批量赋值。注意 `fillable` 或 `guarded` 都不会影响后端表单的提交，只影响 `create` 或 `fill` 方法。

当用户通过 HTTP 请求传入一个意外的参数，并且该参数更改了数据库中你不需要更改的字段时。比如：恶意用户可能会通过 HTTP 请求传入 `is_admin` 参数，然后将其传给 `create` 方法，此操作能让用户将自己升级成管理员。

所以，在开始之前，你应该定义好模型上的哪些属性是可以被批量赋值的。你可以通过模型上的 `$fillable` 属性来实现。 例如：让 `Flight` 模型的 `name` 属性可以被批量赋值：

```php
class Flight extends Model
{
    /**
     * 可批量分配的属性。
     *
     * @var array
     */
    protected $fillable = ['name'];
}
```

一旦我们设置好了可以批量赋值的属性，就可以通过 `create` 方法插入新数据到数据库中了。 `create` 方法将返回保存的模型实例：

```php
$flight = Flight::create(['name' => 'Flight 10']);
```

`$fillable` 可以看作批量赋值的「白名单」, 你也可以使用 `$guarded` 属性来实现。 `$guarded` 属性包含的是不允许批量赋值的数组。也就是说， `$guarded` 从功能上将更像是一个「黑名单」。注意：你只能使用 `$fillable` 或 `$guarded` 二者中的一个，不可同时使用：

```php
class Flight extends Model
{
    /**
     * 不可批量分配的属性。
     *
     * @var array
     */
    protected $guarded = ['price'];
}
```

在上面的示例中，**除 `price`** 之外的所有属性都可以批量赋值。

####其他创建方式

有时您可能希望只实例化模型的新实例。你可以使用 `make` 方法来做到这一点。 `make` 方法将简单地返回一个新实例，而不保存或创建任何内容。

```php
$flight = Flight::make(['name' => 'Flight 10']);

// 功能与...相同
$flight = new Flight;
$flight->fill(['name' => 'Flight 10']);
```

这里有两个你可能用来批量赋值的方法： `firstOrCreate` 和 `firstOrNew`。`firstOrCreate` 方法会通过给定的 列 / 值 来匹配数据库中的数据。如果在数据库中找不到对应的模型， 则会从第一个参数的属性乃至第二个参数的属性中创建一条记录插入到数据库。

`firstOrNew` 方法像 `firstOrCreate` 方法一样尝试通过给定的属性查找数据库中的记录。不同的是，如果 `firstOrNew` 方法找不到对应的模型，会返回一个新的模型实例。注意 `firstOrNew` 返回的模型实例尚未保存到数据库中，你需要手动调用 `save` 方法来保存：

```php
// 通过属性检索航班，否则创建它
$flight = Flight::firstOrCreate(['name' => 'Flight 10']);

// 通过属性检索航班，或实例化一个新实例
$flight = Flight::firstOrNew(['name' => 'Flight 10']);
```

## 删除模型

要删除模型，请在模型实例上调用 `delete` 方法：

```php
$flight = Flight::find(1);

$flight->delete();
```

#### 通过主键删除模型

在上面的示例中，我们在调用`delete`方法之前从数据库中检索模型。 但是，如果您知道模型的主键，则可以不检索而直接删除模型。 为此，请调用 `destroy` 方法：

```php
Flight::destroy(1);

Flight::destroy([1, 2, 3]);

Flight::destroy(1, 2, 3);
```

#### 通过查询删除模型

您还可以对一组模型运行删除查询。 在此示例中，我们将删除所有标记为非活动的航班：

```php
$deletedRows = Flight::where('active', 0)->delete();
```

> **注意**：比较重要的一点是在直接从查询中删除记录时不会触发[模型事件](#model-events)

<a id="oc-query-scopes"></a>
## 查询范围

范围允许您定义可以在整个应用程序中轻松重用的通用约束集。 例如，您可能需要经常检索所有被认为"受欢迎"的用户。 要定义范围，只需在模型方法前面加上 `scope`：

```php
class User extends Model
{
    /**
     * 将查询范围限定为仅包括受欢迎的用户。
     */
    public function scopePopular($query)
    {
        return $query->where('votes', '>', 100);
    }

    /**
     * 将查询范围限定为仅包括活动用户。
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', 1);
    }
}
```

#### 使用查询范围

一旦定义了范围，您就可以在查询模型时调用范围方法。不过，在调用这些方法时不必包含 `scope` 前缀。甚至可以链式调用多个范围，例如：

```php
$users = User::popular()->active()->orderBy('created_at')->get();
```

#### 动态范围

有时您可能希望定义一个接受参数的范围。 要开始，只需将您的附加参数添加到您的范围。 范围参数应该在 `$query` 参数之后定义：

```php
class User extends Model
{
    /**
     * 将查询范围限定为仅包括给定类型的用户。
     */
    public function scopeApplyType($query, $type)
    {
        return $query->where('type', $type);
    }
}
```

现在您可以在调用范围时传递参数：

```php
$users = User::applyType('admin')->get();
```

<a id="oc-model-events"></a>
## 事件

模型会触发几个事件，允许您连接到模型生命周期中的各个点。 每次在数据库中保存或更新特定模型类时，事件允许您轻松执行代码。 事件是通过覆盖类中的特殊方法来定义的，可以使用以下方法覆盖：

事件 | 描述
------------- | -------------
**beforeCreate** | 在模型保存之前，首次创建时。
**afterCreate** | 模型保存后，首次创建时。
**beforeSave** | 在保存模型之前，创建或更新模型。
**afterSave** | 保存模型后，创建或更新模型。
**beforeValidate** | 在验证提供的模型数据之前。
**afterValidate** | 提供的模型数据经过验证后。
**beforeUpdate** | 在保存现有模型之前。
**afterUpdate** | 保存现有模型后。
**beforeDelete** | 在删除现有模型之前。
**afterDelete** | 删除现有模型后。
**beforeRestore** | 在恢复软删除的模型之前。
**afterRestore** | 恢复软删除的模型后。
**beforeFetch** | 在填充现有模型之前。
**afterFetch** | 在填充现有模型之后。

使用事件的示例：

```php
/**
 * 为这个模型生成一个 URL slug
 */
public function beforeCreate()
{
    $this->slug = Str::slug($this->name);
}
```

> **注意**：使用 [延迟绑定](relations#oc-deferred-binding) 创建的关系(即：文件附件)如果尚未提交，则在 `afterSave` 模型事件中将不可用。 要访问未提交的绑定，请在关系上使用 `withDeferred($sessionKey)` 方法。 示例：`$this->images()->withDeferred(post('_session_key'))->get();`

### 基本用法

每当第一次保存新模型时，`beforeCreate` 和 `afterCreate` 事件都会触发。 如果一个模型已经存在于数据库中并且调用了 `save` 方法，`beforeUpdate` / `afterUpdate` 事件将被触发。 但是，在这两种情况下，`beforeSave` / `afterSave` 事件都会触发。

例如，让我们定义一个事件侦听器，在第一次创建模型时填充 slug 属性：

```php
/**
 * 为这个模型生成一个 URL slug
 */
public function beforeCreate()
{
    $this->slug = Str::slug($this->name);
}
```

从事件中返回 `false` 将取消 `save` / `update` 操作：

```php
public function beforeCreate()
{
    if (!$user->isValid()) {
        return false;
    }
}
```

可以使用 `original` 属性访问旧值。 例如：

```php
public function afterUpdate()
{
    if ($this->title != $this->original['title']) {
        // 标题已更改
    }
}
```

您可以使用 `bindEvent` 方法从外部绑定到模型的单个实例的 [本地事件](../services/events.md)。 事件名称应与方法覆盖名称相同，前缀为`model.`。

```php
$flight = new Flight;
$flight->bindEvent('model.beforeCreate', function() use ($model) {
    $model->slug = Str::slug($model->name);
});
```

## 扩展模型

由于模型 [配备使用行为](../services/behaviors.md)，它们可以使用静态的 `extend` 方法进行扩展。 该方法接受一个闭包并将模型对象传递给它。

在闭包内，您可以向模型添加关系。 在这里，我们扩展了 `Backend\Models\User` 模型，以包含引用 `Acme\Demo\Models\Profile` 模型的配置文件（有一个）关系。

```php
\Backend\Models\User::extend(function($model) {
    $model->hasOne['profile'] = ['Acme\Demo\Models\Profile', 'key' => 'user_id'];
});
```

这种方法也可以用来绑定到 [本地事件](#events)，下面的代码监听 `model.beforeSave` 事件。

```php
\Backend\Models\User::extend(function($model) {
    $model->bindEvent('model.beforeSave', function() use ($model) {
        // ...
    });
});
```

此外，还有一些方法可以扩展受保护的模型属性。

```php
\Backend\Models\User::extend(function($model) {
    // 添加演员属性
    $model->addCasts([
        'some_extended_field' => 'int',
    ]);

    // 添加日期属性
    $model->addDateAttribute('updated_at');

    // 添加可填充或 jsonable 字段
    $model->addFillable('first_name');
    $model->addJsonable('some_data');
});
```

> **注意**：通常放置代码的最佳位置是在插件注册类的`boot`方法中，因为这将在每个请求上运行，确保您对模型所做的扩展随处可用。
