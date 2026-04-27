# 集合

模型返回的所有多结果集都是 `October\Rain\Database\Collection` 对象的实例，包括通过 `get` 方法检索的结果或通过关联访问的结果。`Collection` 对象继承了[基础集合](../services/collections.md)，因此它自然继承了数十种用于流畅地操作底层模型数组的方法。

所有集合也充当迭代器，允许您像简单的 PHP 数组一样遍历它们。

```php
$users = User::where('is_active', true)->get();

foreach ($users as $user) {
    echo $user->name;
}
```

但是，集合比数组强大得多，它使用直观的接口公开了各种 map / reduce 操作。例如，让我们过滤所有活跃的模型并收集每个过滤用户的名称。

```php
$users = User::get();

$names = $users->filter(function ($user) {
        return $user->is_active === true;
    })
    ->map(function ($user) {
        return $user->name;
    });
```

::: tip
虽然大多数模型集合方法返回 `Eloquent` 集合的新实例，但 `pluck`、`keys`、`zip`、`collapse`、`flatten` 和 `flip` 方法返回基础集合实例。同样，如果 `map` 操作返回不包含任何模型的集合，它将自动转换为基础集合。
:::

## 可用方法

所有模型集合都继承基础集合对象；因此，它们继承了基础集合类提供的所有强大方法。

此外，`October\Rain\Database\Collection` 类提供了一个方法超集来帮助管理您的模型集合。大多数方法返回 `October\Rain\Database\Collection` 实例；但是，有些方法返回基础 `Illuminate\Support\Collection` 实例。

**contains($key, $operator = null, $value = null)**

`contains` 方法可用于确定集合中是否包含给定的模型实例。此方法接受主键或模型实例：

```php
$users->contains(1);

$users->contains(User::find(1));
```

**diff($items)**

`diff` 方法返回给定集合中不存在的所有模型：

```php
use App\User;

$users = $users->diff(User::whereIn('id', [1, 2, 3])->get());
```

**except($keys)**

`except` 方法返回没有给定主键的所有模型：

```php
$users = $users->except([1, 2, 3]);
```

**find($key)**

`find` 方法查找具有给定主键的模型。如果 `$key` 是模型实例，`find` 将尝试返回与主键匹配的模型。如果 `$key` 是键数组，find 将使用 `whereIn()` 返回与 `$keys` 匹配的所有模型：

```php
$users = User::all();

$user = $users->find(1);
```

**fresh($with = [])**

`fresh` 方法从数据库中检索集合中每个模型的新实例。此外，任何指定的关联都将被预加载：

```php
$users = $users->fresh();

$users = $users->fresh('comments');
```

**intersect($items)**

`intersect` 方法返回给定集合中也存在的所有模型：

```php
use App\User;

$users = $users->intersect(User::whereIn('id', [1, 2, 3])->get());
```

**load($relations)**

`load` 方法为集合中的所有模型预加载给定的关联：

```php
$users->load('comments', 'posts');

$users->load('comments.author');
```

**loadMissing($relations)**

`loadMissing` 方法为集合中的所有模型预加载给定的关联（如果关联尚未加载）：

```php
$users->loadMissing('comments', 'posts');

$users->loadMissing('comments.author');
```

**modelKeys()**

`modelKeys` 方法返回集合中所有模型的主键：

```php
$users->modelKeys();

// [1, 2, 3, 4, 5]
```

**makeVisible($attributes)**

`makeVisible` 方法使集合中每个模型上通常"隐藏"的属性变为可见：

```php
$users = $users->makeVisible(['address', 'phone_number']);
```

**makeHidden($attributes)**

`makeHidden` 方法隐藏集合中每个模型上通常"可见"的属性：

```php
$users = $users->makeHidden(['address', 'phone_number']);
```

**only($keys)**

`only` 方法返回具有给定主键的所有模型：

```php
$users = $users->only([1, 2, 3]);
```

**unique($key = null, $strict = false)**

`unique` 方法返回集合中所有唯一的模型。与集合中另一个具有相同主键的相同类型的模型将被移除。

```php
$users = $users->unique();
```

## 自定义集合

如果您需要使用自定义 `Collection` 对象及其自己的扩展方法，您可以在模型上覆盖 `newCollection` 方法：

```php
class User extends Model
{
    /**
     * Create a new Collection instance.
     */
    public function newCollection(array $models = [])
    {
        return new CustomCollection($models);
    }
}
```

一旦定义了 `newCollection` 方法，每当模型返回 `Collection` 实例时，您都会收到自定义集合的实例。如果您想为插件或应用程序中的每个模型使用自定义集合，您应该在所有模型继承的基础模型类上覆盖 `newCollection` 方法。

```php
use October\Rain\Database\Collection as CollectionBase;

class CustomCollection extends CollectionBase
{
}
```
