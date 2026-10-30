---
previousPath: extend/database/traits.md#base-identifier
subtitle: Adds a random identifier that is immune to enumeration attacks.
---
# Base Identifier

Base identifiers add random base64 encoded identifiers to a model, used as random lookup keys that are immune to enumeration attacks. To add base identifiers to your model, apply the `October\Rain\Database\Traits\BaseIdentifier` trait.

```php
class Order extends Model
{
    use \October\Rain\Database\Traits\BaseIdentifier;
}
```

To add a `baseid` column to your table, you may use the `string` method inside a migration.

```php
Schema::table('orders', function ($table) {
    $table->string('baseid')->nullable()->index();
});
```

Now, when a model is created, a unique random identifier will be generated and stored in the `baseid` column. This identifier is URL-safe and can be used for public-facing lookups instead of sequential IDs.

```php
$order = Order::create(['name' => 'My Order']);
echo $order->baseid; // Outputs something like: "xK9mN2pL1qRs"
```

You may modify the column name used to store the base identifier by defining the `BASEID` constant.

```php
const BASEID = 'my_custom_baseid_column';
```
