# 序列化

在构建 JSON API 时，您通常需要将模型和关联转换为数组或 JSON。模型包含执行这些转换的便捷方法，以及控制序列化中包含哪些属性。

## 基本用法

#### 将模型转换为数组

要将模型及其加载的[关联](./relations.md)转换为数组，您可以使用 `toArray` 方法。此方法是递归的，因此所有属性和所有关联（包括关联的关联）都将转换为数组：

```php
$user = User::with('roles')->first();

return $user->toArray();
```

您也可以将[集合](./collections.md)转换为数组：

```php
$users = User::all();

return $users->toArray();
```

#### 将模型转换为 JSON

要将模型转换为 JSON，您可以使用 `toJson` 方法。与 `toArray` 一样，`toJson` 方法是递归的，因此所有属性和关联都将转换为 JSON：

```php
$user = User::find(1);

return $user->toJson();
```

或者，您可以将模型或集合转换为字符串，这将自动调用 `toJson` 方法：

```php
$user = User::find(1);

return (string) $user;
```

由于模型和集合在转换为字符串时会转换为 JSON，您可以直接从应用程序的路由、AJAX 处理程序或控制器返回 Model 对象：

```php
Route::get('users', function () {
    return User::all();
});
```

## 从 JSON 中隐藏属性

有时您可能希望限制模型数组或 JSON 表示中包含的属性，例如密码。为此，请在模型中添加 `$hidden` 属性定义：

```php
namespace Acme\Blog\Models;

use Model;

class User extends Model
{
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['password'];
}
```

或者，您可以使用 `$visible` 属性来定义应包含在模型数组和 JSON 表示中的属性白名单：

```php
class User extends Model
{
    /**
     * The attributes that should be visible in arrays.
     *
     * @var array
     */
    protected $visible = ['first_name', 'last_name'];
}
```

## 向 JSON 追加值

有时，您可能需要添加在数据库中没有对应列的数组属性。为此，首先为该值定义一个[访问器](./mutators.md)：

```php
class User extends Model
{
    /**
     * Get the administrator flag for the user.
     *
     * @return bool
     */
    public function getIsAdminAttribute()
    {
        return $this->attributes['admin'] == 'yes';
    }
}
```

创建访问器后，将属性名称添加到模型的 `appends` 属性中：

```php
class User extends Model
{
    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['is_admin'];
}
```

属性添加到 `appends` 列表后，它将包含在模型的数组和 JSON 形式中。`appends` 数组中的属性也将遵循模型上配置的 `visible` 和 `hidden` 设置。
