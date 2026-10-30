---
previousPath: extend/database/traits.md#defaultable
subtitle: Designates one record as the default using an `is_default` column.
---
# Defaultable

The defaultable trait adds default assignment to models using an `is_default` column. This is useful when you need to designate one record as the default among a collection, such as a default shipping method or payment gateway. To enable defaultable for a model, apply the `October\Rain\Database\Traits\Defaultable` trait.

```php
class PaymentMethod extends Model
{
    use \October\Rain\Database\Traits\Defaultable;
}
```

To add an `is_default` column to your table, you may use the `boolean` method inside a migration.

```php
Schema::table('payment_methods', function ($table) {
    $table->boolean('is_default')->default(false);
});
```

When a model is saved with `is_default` set to `true`, all other records will automatically have their `is_default` set to `false`, ensuring only one default exists.

```php
$method = PaymentMethod::find(1);
$method->is_default = true;
$method->save(); // All other records will have is_default set to false
```

Use the `makeDefault` method to explicitly make a record the default.

```php
$method->makeDefault();
```

Use the static `getDefault` method to retrieve the default record. If no default is found, the first record will automatically be made the default.

```php
$defaultMethod = PaymentMethod::getDefault();
```
