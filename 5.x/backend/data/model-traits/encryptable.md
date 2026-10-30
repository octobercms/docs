---
previousPath: extend/database/traits.md#encryptable
subtitle: Encrypts attributes when set and decrypts them when retrieved.
---
# Encryptable

Similar to the `Hashable` trait, encrypted attributes are encrypted when set but also decrypted when an attribute is retrieved. To encrypt attributes in your model, apply the `October\Rain\Database\Traits\Encryptable` trait and declare a `$encryptable` property with an array containing the attributes to encrypt.

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Encryptable;

    protected $encryptable = ['api_key', 'api_secret'];
}
```

::: warning
Encrypted attributes are not compatible with [jsonable attributes](../models.md).
:::
