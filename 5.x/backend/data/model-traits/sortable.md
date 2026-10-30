---
previousPath: extend/database/traits.md#sortable
subtitle: Stores the sort order of each record in a `sort_order` column.
---
# Sortable

Sorted models will store a number value in `sort_order` which maintains the sort order of each individual model in a collection. To add the `sort_order` column to your table, you may use the `integer` method inside a migration.

```php
Schema::table('users', function ($table) {
    $table->integer('sort_order')->default(0);
});
```

To store a sort order for your models, apply the `October\Rain\Database\Traits\Sortable` trait and ensure that your schema has a column defined for it to use.

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Sortable;
}
```

You may modify the key name used to identify the sort order by defining the `SORT_ORDER` constant.

```php
const SORT_ORDER = 'my_sort_order_column';
```

Use the `setSortableOrder` method to set the orders on multiple records. The array contains the model identifiers in the sort order that they should appear.

```php
$user->setSortableOrder([3, 2, 1]);
```

If sorting a subset of records, the second array is used to provide a reference pool of sort order values. For example, the following assigns the sort order column as 100, 200 or 300.

```php
$user->setSortableOrder([3, 2, 1], [100, 200, 300]);
```
