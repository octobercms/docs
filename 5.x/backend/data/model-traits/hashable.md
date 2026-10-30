---
previousPath: extend/database/traits.md#hashable
subtitle: Hashes attributes when they are first set.
---
# Hashable

Hashed attributes are hashed immediately when the attribute is first set on the model. To hash attributes in your model, apply the `October\Rain\Database\Traits\Hashable` trait and declare a `$hashable` property with an array containing the attributes to hash.

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Hashable;

    protected $hashable = ['password'];
}
```
