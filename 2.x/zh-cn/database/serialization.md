# 序列化

在构建 JSON API 时，您通常需要将模型和关系转换为数组或 JSON。 模型提供了一些便捷方法，以及对序列化中的属性控制。

## 基本用法

#### 序列化为数组

要将模型及其加载的 [关联](relations.md) 转换为数组，您可以使用 `toArray` 方法。 这是一个递归的方法，因此所有的属性和关联(包括关联的关联)都将转化成数组：

```php
$user = User::with('roles')->first();

return $user->toArray();
```

您还可以将 [集合](collections.md) 转换为数组：

```php
$users = User::all();

return $users->toArray();
```

#### 将模型转换为 JSON

要将模型转换为 JSON，您可以使用 `toJson` 方法。 与`toArray`一样，`toJson`方法是递归的，所以所有的属性和关联都会被转换成JSON：

```php
$user = User::find(1);

return $user->toJson();
```

也可以把模型或集合转成字符串，方法 `toJson` 将自动调用：

```php
$user = User::find(1);

return (string) $user;
```

由于模型和集合在转化为字符串的时候会转成 JSON， 因此可以在应用的路由或控制器中直接返回模型对象：

```php
Route::get('users', function () {
    return User::all();
});
```

## 隐藏 JSON 属性


有时要将模型数组或 JSON 中的某些属性进行隐藏，比如密码，则可以在模型中添加 `$hidden` 属性：

```php
<?php namespace Acme\Blog\Models;

use Model;

class User extends Model
{
    /**
     * 应为数组隐藏的属性。。
     *
     * @var array
     */
    protected $hidden = ['password'];
}
```

此外，也可以使用属性 `$visible` 定义一个模型数组和 JSON 可见的白名单。转化后的数组或 JSON 不会出现其他的属性：

```php
class User extends Model
{
    /**
     * 数组中的属性会被展示。
     *
     * @var array
     */
    protected $visible = ['first_name', 'last_name'];
}
```

## 追加 JSON 值

有时，需要在数组或 JSON 中添加一些数据库中不存在字段的对应属性。要实现这个功能，首先要定义一个 [修改器](../database/mutators.md):

```php
class User extends Model
{
    /**
     * 为用户获取管理员标识。
     *
     * @return bool
     */
    public function getIsAdminAttribute()
    {
        return $this->attributes['admin'] == 'yes';
    }
}
```

创建修改器后，将属性名称添加到模型的 `appends` 属性中：

```php
class User extends Model
{
    /**
     * 追加到模型数组表单的修改器。
     *
     * @var array
     */
    protected $appends = ['is_admin'];
}
```

使用 `append` 方法追加属性后，它将包含在模型的数组和 JSON 中。`appends` 数组中的属性也将遵循模型上配置的 `visible` 和 `hidden` 设置。