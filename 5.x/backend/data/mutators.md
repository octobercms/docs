---
previousPath: extend/database/mutators.md
subtitle: Format model attribute values when they are read or set, and cast them to dates and native types.
---
# Accessors & Mutators

Accessors and mutators format a model attribute when you read it or set its value. For example, you can use the [encryption service](../services/hash-crypt.md) to encrypt a value while it is stored in the database, then decrypt it automatically when you access the attribute. Models can also cast date fields to [Carbon](https://github.com/briannesbitt/Carbon) instances and cast text values to JSON.

```php
class User extends Model
{
    public function getFirstNameAttribute($value)
    {
        return ucfirst($value);
    }
}
```

## Defining an Accessor

To define an accessor, create a `getFooAttribute` method on your model, where `Foo` is the "camel" cased name of the column you want to access. This example defines an accessor for the `first_name` attribute. The accessor is called automatically when you retrieve the value of `first_name`.

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

The accessor receives the original value of the column, so you can change it and return the result. To use the accessor, read the `first_name` attribute.

```php
$user = User::find(1);

$firstName = $user->first_name;
```

### Adding an Accessor to Another Model

To define an accessor from outside the model, bind to the `model.getAttribute` model event.

```php
User::extend(function ($model) {
    $model->bindEvent('model.getAttribute', function ($attribute, $value) {
        if ($attribute === 'first_name') {
            return ucfirst($value);
        }
    });
});
```

## Defining a Mutator

To define a mutator, create a `setFooAttribute` method on your model, where `Foo` is the "camel" cased name of the column you want to set. This example defines a mutator for the `first_name` attribute. The mutator is called automatically when you set the value of `first_name` on the model.

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

The mutator receives the value being set, so you can change it and store the result in the model's internal `$attributes` property. For example, set the `first_name` attribute to `Sally`.

```php
$user = User::find(1);

$user->first_name = 'Sally';
```

The `setFirstNameAttribute` method is called with the value `Sally`. It applies the `strtolower` function to the name and sets the result in the internal `$attributes` array.

### Adding a Mutator to Another Model

To define a mutator from outside the model, bind to the `model.setAttribute` model event.

```php
User::extend(function ($model) {
    $model->bindEvent('model.setAttribute', function ($attribute, $value) use ($model) {
        if ($attribute === 'first_name') {
            $model->attributes['first_name'] = strtolower($value);
        }
    });
});
```

## Working with Dates

By default, models convert the `created_at` and `updated_at` columns to instances of [Carbon](https://github.com/briannesbitt/Carbon), which extends the native PHP `DateTime` class and provides many helpful methods.

To choose which fields are converted, or to turn off the conversion, override the `$dates` property of your model.

```php
class User extends Model
{
    /**
     * @var array dates return as \Carbon\Carbon instances
     */
    protected $dates = ['created_at', 'updated_at', 'disabled_at'];
}
```

You can set a date column to a UNIX timestamp, a date string (`Y-m-d`), a date-time string or a `DateTime` or `Carbon` instance. The value is stored correctly in your database.

```php
$user = User::find(1);

$user->disabled_at = Carbon::now();

$user->save();
```

Attributes listed in your `$dates` property are cast to Carbon instances when you retrieve them, so you can use any Carbon method on them.

```php
$user = User::find(1);

return $user->disabled_at->getTimestamp();
```

### Changing the Date Format

By default, timestamps are formatted as `'Y-m-d H:i:s'`. To change the format, set the `$dateFormat` property on your model. This property controls how date attributes are stored in the database, and their format when the model is serialized to an array or JSON.

```php
class Flight extends Model
{
    /**
     * @var string dateFormat for storage of the model's date columns.
     */
    protected $dateFormat = 'U';
}
```

## Casting Attributes

The `$casts` property converts attributes to common data types. It is an array where the key is the attribute name and the value is the type to cast it to. Supported cast types include `integer`, `real`, `float`, `double`, `string`, `boolean`, `object` and `array`.

This example casts the `is_admin` attribute, stored in the database as an integer (`0` or `1`), to a boolean value.

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

The `is_admin` attribute is now always a boolean when you access it, even though the database stores it as an integer.

```php
$user = User::find(1);

if ($user->is_admin) {
    //
}
```

### Casting JSON to an Array

The `array` cast type is useful for columns that store serialized JSON. For example, if a `TEXT` column contains serialized JSON, the `array` cast turns it into a PHP array when you access it on the model.

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

When you read the `options` attribute, it is decoded from JSON into a PHP array. When you set it, the array is encoded back into JSON for storage.

```php
$user = User::find(1);

$options = $user->options;

$options['key'] = 'value';

$user->options = $options;

$user->save();
```

::: tip
Models also provide the `$jsonable` property for storing values as JSON. See [Storing Values as JSON](./models.md#storing-values-as-json).
:::

#### See Also

::: also
* [Defining Models](./models.md)
* [Serialization](./serialization.md)
* [Hashing & Encryption](../services/hash-crypt.md)
:::
