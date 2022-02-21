# 集合

模型返回的所有结果集都是 `Illuminate\Database\Eloquent\Collection` 对象的实例，包括通过 `get` 方法检索或通过访问关联关系获取到的结果。 该`Collection`对象扩展了[基础集合类](../services/collections.md)，因此它自然也继承了数十种能优雅地处理模型底层数组的方法。

而且，所有的集合都可以作为迭代器，你可以像遍历简单的 PHP 数组一样来遍历它们：

```php
$users = User::where('is_active', true)->get();

foreach ($users as $user) {
    echo $user->name;
}
```

不过，集合比数组更加强大，它通过更加直观的接口暴露出可链式调用的 map / reduce 等操作。例如，让我们移除所有未激活的用户并收集剩余用户的名字：

```php
$users = User::get();

$names = $users->filter(function ($user) {
        return $user->is_active === true;
    })
    ->map(function ($user) {
        return $user->name;
    });
```

> **注意**: 大多数模型集合方法会返回新的实例，但是 `pluck`, `keys`, `zip`, `collapse`, `flatten` 和 `flip` 方法除外，它们会返回一个基础集合类实例。同样，如果 `map` 操作返回的集合不包括任何模型，那么它会被自动转换成集合基类。

## 可用方法

所有模型的集合都扩展了基础集合类; 因此, 他们也继承了所有基础集合类提供的所有强大的方法。

此外，`Illuminate\Database\Eloquent\Collection` 类提供了一套上层的方法来帮你管理你的模型集合。大多数方法返回 `Illuminate\Database\Eloquent\Collection` 实例； 然而，也会有一些方法返回基于 `Illuminate\Support\Collection` 类的实例。

**contains($key, $operator = null, $value = null)**

`contains` 方法可用于确定给定模型实例是否包含在集合中。 此方法接受主键或模型实例：

```php
$users->contains(1);

$users->contains(User::find(1));
```

**diff($items)**

`diff` 方法返回不在给定集合中的所有模型：

```php
use App\User;

$users = $users->diff(User::whereIn('id', [1, 2, 3])->get());
```

**except($keys)**

`except` 方法返回给定主键外的所有模型：

```php
$users = $users->except([1, 2, 3]);
```

**find($key)**

`find` 方法查找给定主键的模型。如果 `$key` 是一个模型实例， `find` 将会尝试返回与主键匹配的模型。 如果 `$key` 是一个关联数组, `find` 将会使用  `whereIn()` 返回所有匹配  `$keys` 的模型:

```php
$users = User::all();

$user = $users->find(1);
```

**fresh($with = [])**

`fresh` 方法从数据库检索集合中的每个模型的新实例。 此外，任何指定的关系都会被预先加载：

```php
$users = $users->fresh();

$users = $users->fresh('comments');
```

**intersect($items)**

`intersect` 方法返回给定集合中也存在的所有模型:

```php
use App\User;

$users = $users->intersect(User::whereIn('id', [1, 2, 3])->get());
```

**load($relations)**

`load` 方法会提前加载集合中所有模型的指定关系:

```php
$users->load('comments', 'posts');

$users->load('comments.author');
```

**loadMissing($relations)**

如果尚未加载关系，`loadMissing` 方法将会为集合中的所有模型加载给定的关系

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

`makeVisible` 方法显示集合中的每个模型的指定隐藏属性：

```php
$users = $users->makeVisible(['address', 'phone_number']);
```

**makeHidden($attributes)**

`makeHidden`  隐藏集合中的每个模型指定属性：

```php
$users = $users->makeHidden(['address', 'phone_number']);
```

**only($keys)**

`only` 方法返回给定主键的所有模型：

```php
$users = $users->only([1, 2, 3]);
```

**unique($key = null, $strict = false)**

`unique` 方法返回集合中的所有唯一模型。并且删除与集合中另一个模型有相同主键的同一类型的所有模型

```php
$users = $users->unique();
```

## 自定义集合

如果你需要使用自定义 `Collection` 对象与自己的扩展方法一起使用， 可以在你的模型上重写 `newCollection` 方法:

```php
class User extends Model
{
    /**
     * 创建一个 Eloquent 集合实例.
     */
    public function newCollection(array $models = [])
    {
        return new CustomCollection($models);
    }
}
```

一旦你定义了 `newCollection` 方法， 你将随时可以从你的自定义集合中接收一个 `Collection` 返回的一个模型实例.。如果要为应用程序的每个模型使用自定义集合，就应该重写所有模型扩展的基类模型中  `newCollection` 方法

```php
use October\Rain\Database\Collection as CollectionBase;

class CustomCollection extends CollectionBase
{
}
```
