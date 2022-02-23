# 修改器

访问器和修改器允许您在从模型中检索属性或设置属性值时对其进行格式化。 例如，您可能希望使用 [加密服务](../services/encryption.md) 对存储在数据库中的值进行加密，然后在模型上访问该属性时自动解密该属性。

除了自定义访问器和修改器，您还可以自动将日期字段转换为 [Carbon](https://github.com/briannesbitt/Carbon) 实例，甚至 [将文本值转换为 JSON](#oc-attribute-casting)。

<a id="oc-accessors-mutators"></a>
## 访问器 & 修改器

#### 定义一个访问器

若要定义一个访问器， 则需在模型上创建一个 `getFooAttribute` 方法，要访问的 `Foo` 字段需使用"驼峰式"命名。 在这个示例中，我们将为 `first_name`  属性定义一个访问器。当模型尝试获取 `first_name` 属性时，将自动调用此访问器：

```php
<?php namespace Acme\Blog\Models;

use Model;

class User extends Model
{
    /**
     * 获取用户的名字。
     *
     * @param  string  $value
     * @return string
     */
    public function getFirstNameAttribute($value)
    {
        return ucfirst($value);
    }
}
```

如你所见，字段的原始值被传递到访问器中，允许你对它进行处理并返回结果。如果想获取被修改后的值，你可以在模型实例上访问 `first_name` 属性：

```php
$user = User::find(1);

$firstName = $user->first_name;
```

#### 定义一个修改器

若要定义一个修改器，则需在模型上面定义 `setFooAttribute` 方法。要访问的 `Foo` 字段使用"驼峰式"命名。让我们再来定义一个 `first_name` 属性的修改器。当我们尝试在模型上设置 `first_name` 属性值时，该修改器将被自动调用：

```php
<?php namespace Acme\Blog\Models;

use Model;

class User extends Model
{
    /**
     * Set the user's first name.
     *
     * @param  string  $value
     * @return string
     */
    public function setFirstNameAttribute($value)
    {
        $this->attributes['first_name'] = strtolower($value);
    }
}
```

修改器会获取属性已经被设置的值，允许你修改并且将其值设置到模型内部的 `$attributes` 属性上。举个例子，如果我们尝试将 `first_name` 属性的值设置为 `Sally`：

```php
$user = User::find(1);

$user->first_name = 'Sally';
```

在这个例子中， `setFirstNameAttribute` 方法在调用的时候接受 `Sally` 这个值作为参数。接着修改器会应用 `strtolower` 函数并将处理的结果设置到内部的 `$attributes` 数组。

## 日期转换器

默认情况下，October 模型会将 `created_at` 和 `updated_at` 字段转换为[Carbon](https://github.com/briannesbitt/Carbon)实例，它继承了 PHP 原生的 `DateTime` 类并提供了各种有用的方法。你可以通过设置模型的 `$dates` 属性来添加其他日期属性：

您可以通过覆盖模型的`$dates`属性来自定义哪些字段会自动转换，甚至完全禁用此转换：

```php
class User extends Model
{
    /**
     * 应该转换为日期格式的属性.
     *
     * @var array
     */
    protected $dates = ['created_at', 'updated_at', 'disabled_at'];
}
```

当某个字段是日期格式时，你可以将值设置为一个 UNIX 时间戳，日期时间(`Y-m-d`)字符串，或者 `DateTime` / `Carbon` 实例。日期值会被正确格式化并保存到你的数据库中：

```php
$user = User::find(1);

$user->disabled_at = Carbon::now();

$user->save();
```

就如上面所说，当获取到的属性包含在 `$dates` 属性中时，都会自动转换为 [Carbon](https://github.com/briannesbitt/Carbon) 实例，允许你在属性上使用任意的 Carbon 方法：

```php
$user = User::find(1);

return $user->disabled_at->getTimestamp();
```

默认情况下，时间戳都将以 `'Y-m-d H:i:s'` 形式格式化。如果你需要自定义时间戳格式，可在模型中设置 `$dateFormat` 属性。这个属性决定了日期属性将以何种形式保存在数据库中，以及当模型序列化成数组或 JSON 时的格式：

```php
class Flight extends Model
{
    /**
     * 模型日期字段的存储格式。
     *
     * @var string
     */
    protected $dateFormat = 'U';
}
```

<a id="oc-attribute-casting"></a>
## 属性类型转换

模型中的 `$casts` 属性提供了一个便利的方法来将属性转换为常见的数据类型。`$casts` 属性应是一个数组，且数组的键是那些需要被转换的属性名称，值则是你希望转换的数据类型。支持转换的数据类型有：`integer`, `real`, `float`, `double`, `string`, `boolean`, `object`和 `array`。

示例， 让我们把以整数(`0` 或 `1`)形式存储在数据库中的 `is_admin` 属性转成布尔值：

```php
class User extends Model
{
    /**
     * 这个属性应该被转换为原生类型.
     *
     * @var array
     */
    protected $casts = [
        'is_admin' => 'boolean',
    ];
}
```

现在当你访问 `is_admin` 属性时，虽然保存在数据库里的值是一个整数类型，但是返回值总是会被转换成布尔值类型：

```php
$user = User::find(1);

if ($user->is_admin) {
    //
}
```

#### 数组转换

当你在数据库存储序列化的 JSON 的数据时，`array` 类型的转换非常有用。比如：如果你的数据库具有被序列化为 JSON 的 `TEXT` 字段类型，并且在 Eloquent 模型中加入了 `array` 类型转换，那么当你访问的时候就会自动被转换为 PHP 数组：

```php
class User extends Model
{
    /**
     * 这个属性应该被转换为原生类型.
     *
     * @var array
     */
    protected $casts = [
        'options' => 'array',
    ];
}
```

一旦定义了转换，你访问  `options` 属性时他会自动从 JSON 类型反序列化为 PHP 数组。当你设置了 `options` 属性的值时，给定的数组也会自动序列化为 JSON 类型存储

```php
$user = User::find(1);

$options = $user->options;

$options['key'] = 'value';

$user->options = $options;

$user->save();
```
