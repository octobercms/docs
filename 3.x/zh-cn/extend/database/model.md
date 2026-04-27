# 模型查询

从数据库请求数据时，模型将主要使用 `get` 或 `first` 方法检索值，取决于您希望检索多个模型还是检索单个模型。从 Model 派生的查询返回 `October\Rain\Database\Builder` 的实例。

## 检索多个模型

创建模型及[其关联的数据库表](./structure.md)后，您就可以开始从数据库中检索数据了。将每个模型视为一个强大的[查询构建器](./query.md)，允许您查询与模型关联的数据库表。

```php
$flights = Flight::all();
```

### 访问列值

如果您有一个模型实例，您可以通过访问相应的属性来访问模型的列值。例如，让我们遍历查询返回的每个 `Flight` 实例并输出 `name` 列的值。

```php
foreach ($flights as $flight) {
    echo $flight->name;
}
```

### 添加附加约束

`all` 方法将返回模型表中的所有结果。由于每个模型都充当[查询构建器](./query.md)，您还可以向查询添加约束，然后使用 `get` 方法检索结果：

```php
$flights = Flight::where('active', 1)
    ->orderBy('name', 'desc')
    ->take(10)
    ->get();
```

::: tip
由于模型是查询构建器，您应该熟悉[查询构建器](./query.md)上所有可用的方法。您可以在模型查询中使用这些方法中的任何一个。
:::

### 集合

对于 `all` 和 `get` 等检索多个结果的方法，将返回一个 `Collection` 实例。这个类提供了[多种有用的方法](./collection.md)来处理您的结果。当然，您可以像数组一样简单地遍历此集合。

```php
foreach ($flights as $flight) {
    echo $flight->name;
}
```

### 分块结果

如果您需要处理数千条记录，请使用 `chunk` 命令。`chunk` 方法将检索一"块"模型，将它们提供给给定的 `Closure` 进行处理。使用 `chunk` 方法可以在处理大型结果集时节省内存。

```php
Flight::chunk(200, function ($flights) {
    foreach ($flights as $flight) {
        //
    }
});
```

传递给方法的第一个参数是您希望每个"块"接收的记录数。作为第二个参数传递的 Closure 将为从数据库检索的每个块调用。

## 检索单个模型

除了检索给定表的所有记录外，您还可以使用 `find` 和 `first` 检索单个记录。这些方法不是返回模型集合，而是返回单个模型实例。

```php
// 通过主键检索模型
$flight = Flight::find(1);

// 检索与查询约束匹配的第一个模型
$flight = Flight::where('active', 1)->first();
```

### 未找到异常

有时您可能希望在未找到模型时抛出异常。这在路由或控制器中特别有用。`findOrFail` 和 `firstOrFail` 方法将检索查询的第一个结果。但是，如果未找到结果，将抛出 `Illuminate\Database\Eloquent\ModelNotFoundException`。

```php
$model = Flight::findOrFail(1);

$model = Flight::where('legs', '>', 100)->firstOrFail();
```

在[开发 API](../system/routing.md) 时，如果未捕获异常，会自动向用户发送 `404` HTTP 响应，因此使用这些方法时不需要编写显式检查来返回 `404` 响应。

```php
Route::get('/api/flights/{id}', function ($id) {
    return Flight::findOrFail($id);
});
```

### 检索聚合

您还可以使用查询构建器提供的 `count`、`sum`、`max` 和其他[聚合函数](./query.md)。这些方法返回适当的标量值而不是完整的模型实例：

```php
$count = Flight::where('active', 1)->count();

$max = Flight::where('active', 1)->max('price');
```

## 插入和更新模型

插入和更新数据是模型的核心功能，与传统 SQL 语句相比，它使过程变得轻松。

### 基本插入

要在数据库中创建新记录，只需创建一个新的模型实例，在模型上设置属性，然后调用 `save` 方法：

```php
$flight = new Flight;
$flight->name = 'Sydney to Canberra';
$flight->save();
```

在此示例中，我们只是创建了 `Flight` 模型的新实例并分配了 `name` 属性。当我们调用 `save` 方法时，一条记录将被插入数据库。`created_at` 和 `updated_at` 时间戳也将自动设置，因此无需手动设置。

### 基本更新

`save` 方法也可以用于更新数据库中已存在的模型。要更新模型，您应该检索它，设置您希望更新的任何属性，然后调用 `save` 方法。同样，`updated_at` 时间戳将自动更新，因此无需手动设置其值：

```php
$flight = Flight::find(1);
$flight->name = 'Darwin to Adelaide';
$flight->save();
```

也可以对匹配给定查询的任意数量的模型执行更新。在此示例中，所有 `active` 且 `destination` 为 `San Diego` 的航班将被标记为延误：

```php
Flight::where('is_active', true)
    ->where('destination', 'Perth')
    ->update(['delayed' => true]);
```

`update` 方法期望一个列和值对的数组，表示应该更新的列。

### 批量赋值

您也可以使用 `create` 方法在一行中保存新模型。插入的模型实例将从方法返回给您。但是，在此之前，您需要在模型上指定 `fillable` 或 `guarded` 属性，因为所有模型都会防止批量赋值。请注意，`fillable` 和 `guarded` 都不影响后端表单的提交，只影响 `create` 或 `fill` 方法的使用。

当用户通过请求传递意外的 HTTP 参数，并且该参数更改了您意料之外的数据库列时，就会发生批量赋值漏洞。例如，恶意用户可能通过 HTTP 请求发送 `is_admin` 参数，然后将其映射到模型的 `create` 方法，允许用户将自己提升为管理员。

要开始，您应该定义哪些模型属性可以批量赋值。您可以使用模型上的 `$fillable` 属性来实现。例如，让我们使 `Flight` 模型的 `name` 属性可以批量赋值：

```php
class Flight extends Model
{
    /**
     * @var array fillable attributes that are mass assignable.
     */
    protected $fillable = ['name'];
}
```

一旦我们使属性可以批量赋值，我们就可以使用 `create` 方法在数据库中插入新记录。`create` 方法返回已保存的模型实例：

```php
$flight = Flight::create(['name' => 'Flight 10']);
```

虽然 `$fillable` 充当应该可以批量赋值的属性的"允许列表"，您也可以选择使用 `$guarded`。`$guarded` 属性应该包含您不希望被批量赋值的属性数组。不在数组中的所有其他属性将是可批量赋值的。因此，`$guarded` 的功能类似于"阻止列表"。当然，您应该使用 `$fillable` 或 `$guarded` - 而不是两者同时使用：

```php
class Flight extends Model
{
    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = ['price'];
}
```

在上面的示例中，除了 `price` 之外的所有属性都将是可批量赋值的。

### 其他创建方法

有时您可能只想实例化一个模型的新实例。您可以使用 `make` 方法来实现。`make` 方法将简单地返回一个新实例，而不保存或创建任何内容。

```php
$flight = Flight::make(['name' => 'Flight 10']);

// 功能上等同于...
$flight = new Flight;
$flight->fill(['name' => 'Flight 10']);
```

还有另外两个方法可以通过批量赋值属性来创建模型：`firstOrCreate` 和 `firstOrNew`。`firstOrCreate` 方法将尝试使用给定的列/值对定位数据库记录。如果在数据库中找不到模型，将使用给定的属性插入一条记录。

`firstOrNew` 方法与 `firstOrCreate` 一样，将尝试在数据库中定位与给定属性匹配的记录。但是，如果未找到模型，将返回一个新的模型实例。请注意，`firstOrNew` 返回的模型尚未持久化到数据库。您需要手动调用 `save` 来持久化它：

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

在上面的示例中，我们在调用 `delete` 方法之前从数据库检索模型。但是，如果您知道模型的主键，您可以在不检索模型的情况下删除它。为此，请调用 `destroy` 方法：

```php
Flight::destroy(1);

Flight::destroy([1, 2, 3]);

Flight::destroy(1, 2, 3);
```

您还可以对一组模型运行删除查询。在此示例中，我们将删除所有标记为不活跃的航班：

```php
$deletedRows = Flight::where('active', 0)->delete();
```

::: warning
需要注意的是，直接从查询中删除记录时，[模型事件](../system/models.md)不会触发。
:::

## 查询作用域

作用域允许您定义可以在整个应用程序中轻松重用的常见约束集。例如，您可能需要频繁检索所有被认为是"热门"的用户。要定义作用域，只需在模型方法前加上 `scope` 前缀。

```php
class User extends Model
{
    /**
     * scopePopular query to only include popular users.
     */
    public function scopePopular($query)
    {
        return $query->where('votes', '>', 100);
    }

    /**
     * scopeActive query to only include active users.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', 1);
    }
}
```

一旦定义了作用域，您可以在查询模型时调用作用域方法。但是，调用方法时不需要包含 `scope` 前缀。您甚至可以链接调用各种作用域，例如：

```php
$users = User::popular()->active()->orderBy('created_at')->get();
```

有时您可能希望定义一个接受参数的作用域。首先，只需将额外的参数添加到您的作用域。作用域参数应该定义在 `$query` 参数之后：

```php
class User extends Model
{
    /**
     * Scope a query to only include users of a given type.
     */
    public function scopeApplyType($query, $type)
    {
        return $query->where('type', $type);
    }
}
```

现在您可以在调用作用域时传递参数：

```php
$users = User::applyType('admin')->get();
```

#### 另请参阅

::: also
* [模型文章](../system/models.md)
:::
