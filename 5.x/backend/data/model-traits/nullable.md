---
previousPath: extend/database/traits.md#nullable
subtitle: Sets attributes to `NULL` when left empty.
---
# Nullable

Nullable attributes are set to `NULL` when left empty. To nullify attributes in your model, apply the `October\Rain\Database\Traits\Nullable` trait and declare a `$nullable` property with an array containing the attributes to nullify.

```php
class Product extends Model
{
    use \October\Rain\Database\Traits\Nullable;

    protected $nullable = ['sku'];
}
```
