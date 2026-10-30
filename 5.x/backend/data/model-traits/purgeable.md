---
previousPath: extend/database/traits.md#purgeable
subtitle: Prevents attributes from being saved to the database.
---
# Purgeable

Purged attributes will not be saved to the database when a model is created or updated. To purge attributes in your model, apply the `October\Rain\Database\Traits\Purgeable` trait and declare a `$purgeable` property with an array containing the attributes to purge.

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Purgeable;

    protected $purgeable = ['password_confirmation'];
}
```

Use the `getOriginalPurgeValue` to find a value that was purged after the model was saved.

```php
return $user->getOriginalPurgeValue('password_confirmation');
```

Alternatively, use the `restorePurgedValues` method to restore all purged values.

```php
$user->restorePurgedValues();
```
