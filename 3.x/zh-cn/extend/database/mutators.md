# 修改器

访问器和修改器允许您在从模型获取属性或设置其值时格式化属性。例如，您可能希望在将值存储到数据库中时使用[加密服务](../services/hash-crypt.md)加密该值，然后在模型上访问该属性时自动解密。

除了自定义访问器和修改器外，您还可以自动将日期字段转换为 [Carbon](https://github.com/briannesbitt/Carbon) 实例，甚至将文本值转换为 JSON。

## 访问器和修改器

#### 定义访问器

要定义访问器，请在模型上创建一个 `getFooAttribute` 方法，其中 `Foo` 是您希望访问的列的"驼峰命名"名称。在此示例中，我们将为 `first_name` 属性定义一个访问器。尝试获取 `first_name` 的值时，访问器将自动被调用：

```php
namespace Acme\Blog\Models;

use Model;

class User extends Model
{
    /**
     * getFirstNameAttribute is available as `first_name` on the model
     */
    public function getFirstNameAttribute($value)
    {
        return ucfirst($value);
    }
}
```

如您所见，列的原始值传递给访问器，允许您操作并返回该值。要访问访问器的值，您可以简单地访问 `first_name` 属性。

```php
$user = User::find(1);

$firstName = $user->first_name;
```

访问器也可以通过扩展 `model.getAttribute` 模型事件在外部定义。

```php
User::extend(function ($model) {
    $model->bindEvent('model.getAttribute', function ($attribute, $value) {
        if ($attribute === 'first_name') {
            return ucfirst($value);
        }
    });
});
```

#### 定义修改器

要定义修改器，请在模型上定义一个 `setFooAttribute` 方法，其中 `Foo` 是您希望访问的列的"驼峰命名"名称。在此示例中，让我们为 `first_name` 属性定义一个修改器。当我们尝试在模型上设置 `first_name` 属性的值时，此修改器将自动被调用。

```php
namespace Acme\Blog\Models;

use Model;

class User extends Model
{
    /**
     * setFirstNameAttribute writes to the `first_name` attribute
     */
    public function setFirstNameAttribute($value)
    {
        $this->attributes['first_name'] = strtolower($value);
    }
}
```

修改器将接收正在设置的属性值，允许您操作该值并在模型的内部 `$attributes` 属性上设置操作后的值。例如，如果我们尝试将 `first_name` 属性设置为 `Sally`。

```php
$user = User::find(1);

$user->first_name = 'Sally';
```

这里将使用值 `Sally` 调用 `setFirstNameAttribute` 函数。然后修改器将对名称应用 `strtolower` 函数，并在内部 `$attributes` 数组中设置其值。

修改器也可以通过扩展 `model.setAttribute` 模型事件在外部定义。

```php
User::extend(function ($model) {
    $model->bindEvent('model.setAttribute', function ($attribute, $value) use ($model) {
        if ($attribute === 'first_name') {
            $model->attributes['first_name'] = strtolower($value);
        }
    });
});
```

## 日期修改器

默认情况下，October 中的模型会将 `created_at` 和 `updated_at` 列转换为 [Carbon](https://github.com/briannesbitt/Carbon) 对象的实例，它提供了各种有用的方法并继承了原生 PHP `DateTime` 类。

您可以通过覆盖模型的 `$dates` 属性来自定义哪些字段自动转换，甚至完全禁用此转换：

```php
class User extends Model
{
    /**
     * @var array dates return as \Carbon\Carbon instances
     */
    protected $dates = ['created_at', 'updated_at', 'disabled_at'];
}
```

当一列被视为日期时，您可以将其值设置为 UNIX 时间戳、日期字符串（`Y-m-d`）、日期时间字符串，当然还有 `DateTime` / `Carbon` 实例，日期值将自动正确地存储在数据库中。

```php
$user = User::find(1);

$user->disabled_at = Carbon::now();

$user->save();
```

如上所述，当获取在 `$dates` 属性中列出的属性时，它们将自动转换为 [Carbon](https://github.com/briannesbitt/Carbon) 实例，允许您在属性上使用 Carbon 的任何方法。

```php
$user = User::find(1);

return $user->disabled_at->getTimestamp();
```

默认情况下，时间戳格式为 `'Y-m-d H:i:s'`。如果您需要自定义时间戳格式，请在模型上设置 `$dateFormat` 属性。此属性确定日期属性在数据库中的存储方式以及模型序列化为数组或 JSON 时的格式：

```php
class Flight extends Model
{
    /**
     * @var string dateFormat for storage of the model's date columns.
     */
    protected $dateFormat = 'U';
}
```

## 属性转换

模型上的 `$casts` 属性提供了一种将属性转换为常见数据类型的便捷方法。`$casts` 属性应该是一个数组，其中键是要转换的属性名称，值是您希望将列转换为的类型。支持的转换类型有：`integer`、`real`、`float`、`double`、`string`、`boolean`、`object` 和 `array`。

例如，让我们将存储在数据库中的整数（`0` 或 `1`）的 `is_admin` 属性转换为布尔值。

```php
class User extends Model
{
    /**
     * @var array casts attributes to native types.
     */
    protected $casts = [
        'is_admin' => 'boolean',
    ];
}
```

现在，当您访问 `is_admin` 属性时，它将始终被转换为布尔值，即使底层值在数据库中存储为整数。

```php
$user = User::find(1);

if ($user->is_admin) {
    //
}
```

#### 数组转换

`array` 转换类型在处理存储为序列化 JSON 的列时特别有用。例如，如果您的数据库有一个包含序列化 JSON 的 `TEXT` 字段类型，向该属性添加 `array` 转换将在您在 Eloquent 模型上访问它时自动将属性反序列化为 PHP 数组：

```php
class User extends Model
{
    /**
     * @var array casts attributes to native types.
     */
    protected $casts = [
        'options' => 'array',
    ];
}
```

一旦定义了转换，您就可以访问 `options` 属性，它将自动从 JSON 反序列化为 PHP 数组。当您设置 `options` 属性的值时，给定的数组将自动序列化回 JSON 以进行存储：

```php
$user = User::find(1);

$options = $user->options;

$options['key'] = 'value';

$user->options = $options;

$user->save();
```
