# Мутаторы

Аксессоры и мутаторы позволяют форматировать атрибуты при их получении из модели или установке их значения. Например, вы можете захотеть использовать [сервис шифрования](../services/hash-crypt.md) для шифрования значения при его хранении в базе данных, а затем автоматически расшифровывать атрибут при доступе к нему в модели.

Помимо пользовательских аксессоров и мутаторов, вы также можете автоматически преобразовывать поля дат в экземпляры [Carbon](https://github.com/briannesbitt/Carbon) или преобразовывать текстовые значения в JSON.

## Аксессоры и мутаторы

#### Определение аксессора

Для определения аксессора создайте метод `getFooAttribute` в вашей модели, где `Foo` — это имя столбца в формате «camelCase», к которому вы хотите получить доступ. В этом примере мы определим аксессор для атрибута `first_name`. Аксессор будет автоматически вызван при попытке получить значение `first_name`:

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

Как видите, исходное значение столбца передаётся аксессору, позволяя вам манипулировать значением и возвращать его. Для доступа к значению аксессора вы можете просто обратиться к атрибуту `first_name`.

```php
$user = User::find(1);

$firstName = $user->first_name;
```

Аксессоры могут быть определены извне путём расширения события модели `model.getAttribute`.

```php
User::extend(function ($model) {
    $model->bindEvent('model.getAttribute', function ($attribute, $value) {
        if ($attribute === 'first_name') {
            return ucfirst($value);
        }
    });
});
```

#### Определение мутатора

Для определения мутатора определите метод `setFooAttribute` в вашей модели, где `Foo` — это имя столбца в формате «camelCase», к которому вы хотите получить доступ. В этом примере определим мутатор для атрибута `first_name`. Этот мутатор будет автоматически вызван, когда мы попытаемся установить значение атрибута `first_name` в модели.

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

Мутатор получит значение, которое устанавливается для атрибута, позволяя вам манипулировать значением и устанавливать изменённое значение во внутреннем свойстве `$attributes` модели. Например, если мы попытаемся установить атрибут `first_name` в `Sally`.

```php
$user = User::find(1);

$user->first_name = 'Sally';
```

Здесь функция `setFirstNameAttribute` будет вызвана со значением `Sally`. Мутатор затем применит функцию `strtolower` к имени и установит его значение во внутреннем массиве `$attributes`.

Мутаторы могут быть определены извне путём расширения события модели `model.setAttribute`.

```php
User::extend(function ($model) {
    $model->bindEvent('model.setAttribute', function ($attribute, $value) use ($model) {
        if ($attribute === 'first_name') {
            $model->attributes['first_name'] = strtolower($value);
        }
    });
});
```

## Мутаторы дат

По умолчанию модели в October CMS преобразуют столбцы `created_at` и `updated_at` в экземпляры объекта [Carbon](https://github.com/briannesbitt/Carbon), который предоставляет множество полезных методов и расширяет нативный PHP-класс `DateTime`.

Вы можете настроить, какие поля автоматически мутируются, и даже полностью отключить эту мутацию, переопределив свойство `$dates` вашей модели:

```php
class User extends Model
{
    /**
     * @var array dates return as \Carbon\Carbon instances
     */
    protected $dates = ['created_at', 'updated_at', 'disabled_at'];
}
```

Когда столбец считается датой, вы можете установить его значение в UNIX-метку времени, строку даты (`Y-m-d`), строку даты-времени и, конечно, экземпляр `DateTime` / `Carbon`, и значение даты будет автоматически корректно сохранено в вашей базе данных.

```php
$user = User::find(1);

$user->disabled_at = Carbon::now();

$user->save();
```

Как отмечено выше, при получении атрибутов, перечисленных в вашем свойстве `$dates`, они будут автоматически преобразованы в экземпляры [Carbon](https://github.com/briannesbitt/Carbon), позволяя вам использовать любые методы Carbon для ваших атрибутов.

```php
$user = User::find(1);

return $user->disabled_at->getTimestamp();
```

По умолчанию временные метки форматируются как `'Y-m-d H:i:s'`. Если вам нужно настроить формат временных меток, установите свойство `$dateFormat` в вашей модели. Это свойство определяет, как атрибуты дат хранятся в базе данных, а также их формат при сериализации модели в массив или JSON:

```php
class Flight extends Model
{
    /**
     * @var string dateFormat for storage of the model's date columns.
     */
    protected $dateFormat = 'U';
}
```

## Приведение атрибутов

Свойство `$casts` вашей модели предоставляет удобный метод преобразования атрибутов в общие типы данных. Свойство `$casts` должно быть массивом, где ключ — это имя приводимого атрибута, а значение — тип, к которому вы хотите привести столбец. Поддерживаемые типы приведения: `integer`, `real`, `float`, `double`, `string`, `boolean`, `object` и `array`.

Например, давайте приведём атрибут `is_admin`, который хранится в нашей базе данных как целое число (`0` или `1`), к логическому значению.

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

Теперь атрибут `is_admin` всегда будет приведён к логическому значению при доступе к нему, даже если базовое значение хранится в базе данных как целое число.

```php
$user = User::find(1);

if ($user->is_admin) {
    //
}
```

#### Приведение к массиву

Тип приведения `array` особенно полезен при работе со столбцами, которые хранятся как сериализованный JSON. Например, если ваша база данных имеет поле типа `TEXT`, содержащее сериализованный JSON, добавление приведения `array` к этому атрибуту автоматически десериализует атрибут в PHP-массив при доступе к нему в вашей модели Eloquent:

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

После определения приведения вы можете обращаться к атрибуту `options`, и он автоматически десериализуется из JSON в PHP-массив. Когда вы устанавливаете значение атрибута `options`, данный массив автоматически сериализуется обратно в JSON для хранения:

```php
$user = User::find(1);

$options = $user->options;

$options['key'] = 'value';

$user->options = $options;

$user->save();
```
