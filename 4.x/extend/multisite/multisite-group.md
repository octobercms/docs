---
subtitle: Learn how to scope model records to a site group for multi-tenancy.
---
# MultisiteGroup

::: aside
For an overview of when to use this trait versus Multisite or Translatable, see the [Introduction](./introduction.md).
:::

The MultisiteGroup trait scopes model records to a [site group](../../cms/multisite/multisite.md), providing multi-tenancy support. Unlike the [Multisite](./multisite.md) trait which creates duplicate rows per site, MultisiteGroup filters a single set of records by the active site group. Each site group typically represents a distinct website or tenant.

For example, a "Dogs" website and a "Cats" website might share the same October CMS installation but have completely separate product catalogs. MultisiteGroup ensures each tenant only sees its own data.

## Declaration

To scope a model by site group, apply the `October\Rain\Database\Traits\MultisiteGroup` trait.

```php
class Product extends Model
{
    use \October\Rain\Database\Traits\MultisiteGroup;
}
```

To add a `site_group_id` column to your table, use the `integer` method inside a migration.

```php
Schema::table('products', function ($table) {
    $table->integer('site_group_id')->nullable()->index();
});
```

## How It Works

The trait registers a global scope that automatically filters queries by the active site group. When a model is saved, the `site_group_id` column is automatically set to the current site group from context.

```php
// Only returns products belonging to the active site group
$products = Product::all();
```

When the global context is active (via `Site::withGlobalContext`), the scope is bypassed and records from all site groups are accessible.

```php
Site::withGlobalContext(function() {
    // Returns products from all site groups
    $allProducts = Product::all();
});
```

## Programmatic Toggling

The `isMultisiteGroupEnabled` method returns `true` by default. Override it to conditionally disable the global scope.

```php
public function isMultisiteGroupEnabled(): bool
{
    return Site::hasSiteGroups();
}
```

## Custom Column Name

By default the trait uses `site_group_id` as the column name. You may customize this by defining the `SITE_GROUP_ID` constant on your model.

```php
const SITE_GROUP_ID = 'my_group_column';
```

## Combining with Translatable

MultisiteGroup and [Translatable](./translatable.md) work naturally together. The group scopes which records are visible, while Translatable handles per-attribute translations within the group's languages.

```php
class Product extends Model
{
    use \October\Rain\Database\Traits\MultisiteGroup;
    use \October\Rain\Database\Traits\Translatable;

    public $translatable = ['name', 'description'];
}
```

In this configuration, each site group (tenant) has its own product catalog, and the product names and descriptions can be translated across the languages defined within that group.

#### See Also

::: also
* [Introduction](./introduction.md)
* [Multisite Trait](./multisite.md)
* [Translatable Trait](./translatable.md)
* [Site Groups](../../cms/multisite/multisite.md)
* [Site Service](../services/site.md)
:::
