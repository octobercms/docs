# Сериализация

При создании JSON API вам часто потребуется преобразовывать модели и связи в массивы или JSON. Модели включают удобные методы для выполнения этих преобразований, а также для управления тем, какие атрибуты включаются в сериализацию.

## Основы использования

#### Преобразование модели в массив

Для преобразования модели и её загруженных [связей](./relations.md) в массив используйте метод `toArray`. Этот метод является рекурсивным, поэтому все атрибуты и все связи (включая связи связей) будут преобразованы в массивы:

```php
$user = User::with('roles')->first();

return $user->toArray();
```

Вы также можете преобразовать [коллекции](./collections.md) в массивы:

```php
$users = User::all();

return $users->toArray();
```

#### Преобразование модели в JSON

Для преобразования модели в JSON используйте метод `toJson`. Как и `toArray`, метод `toJson` является рекурсивным, поэтому все атрибуты и связи будут преобразованы в JSON:

```php
$user = User::find(1);

return $user->toJson();
```

Альтернативно вы можете привести модель или коллекцию к строке, что автоматически вызовет метод `toJson`:

```php
$user = User::find(1);

return (string) $user;
```

Поскольку модели и коллекции преобразуются в JSON при приведении к строке, вы можете возвращать объекты Model напрямую из маршрутов, обработчиков AJAX или контроллеров вашего приложения:

```php
Route::get('users', function () {
    return User::all();
});
```

## Скрытие атрибутов из JSON

Иногда вы можете захотеть ограничить атрибуты, такие как пароли, которые включаются в массив или JSON-представление вашей модели. Для этого добавьте определение свойства `$hidden` в вашу модель:

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

Альтернативно вы можете использовать свойство `$visible` для определения белого списка атрибутов, которые должны быть включены в массив и JSON-представление вашей модели:

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

## Добавление значений в JSON

Иногда вам может потребоваться добавить атрибуты массива, которые не имеют соответствующего столбца в базе данных. Для этого сначала определите [аксессор](./mutators.md) для значения:

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

После создания аксессора добавьте имя атрибута в свойство `appends` модели:

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

После добавления атрибута в список `appends` он будет включён как в массив, так и в JSON-представление модели. Атрибуты в массиве `appends` также будут учитывать настройки `visible` и `hidden`, сконфигурированные в модели.
