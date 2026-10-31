---
previousPath: extend/database/serialization.md
subtitle: Convert models and collections to arrays or JSON, and control which attributes are included.
---
# Serialization

Serialization converts models and their relationships to arrays or JSON, which you often need when building JSON APIs. Models provide methods for these conversions and properties that control which attributes are included.

```php
$user = User::with('roles')->first();

$array = $user->toArray();

$json = $user->toJson();
```

## Converting a Model to an Array

To convert a model and its loaded [relationships](./relationships.md) to an array, use the `toArray` method. This method is recursive, so all attributes and all relations, including the relations of relations, are converted to arrays.

```php
$user = User::with('roles')->first();

return $user->toArray();
```

You can also convert [collections](./model-queries.md#working-with-collections) to arrays.

```php
$users = User::all();

return $users->toArray();
```

## Converting a Model to JSON

To convert a model to JSON, use the `toJson` method. Like `toArray`, it is recursive, so all attributes and relations are converted to JSON.

```php
$user = User::find(1);

return $user->toJson();
```

You can also cast a model or collection to a string, which calls the `toJson` method automatically.

```php
$user = User::find(1);

return (string) $user;
```

Models and collections are converted to JSON when cast to a string, so you can return them directly from your application's routes, AJAX handlers or controllers.

```php
Route::get('users', function () {
    return User::all();
});
```

## Hiding Attributes from JSON

To leave attributes such as passwords out of your model's array or JSON form, add a `$hidden` property to your model.

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

You can instead use the `$visible` property to define an allow list of attributes to include in your model's array and JSON form.

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

## Appending Values to JSON

To add attributes that have no matching column in your database, first define an [accessor](./mutators.md#defining-an-accessor) for the value.

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

Then add the attribute name to the `appends` property on the model.

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

The attribute is now included in both the model's array and JSON forms. Attributes in the `appends` array also respect the `visible` and `hidden` settings of the model.

#### See Also

::: also
* [Accessors & Mutators](./mutators.md)
* [Model Queries](./model-queries.md)
* [Response & View](../services/response-view.md)
:::
