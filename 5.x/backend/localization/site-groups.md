---
previousPath: extend/multisite/multisite-group.md
subtitle: Scope model records to a site group so each tenant of a multi-tenant installation only sees its own data.
---
# Site Groups

The MultisiteGroup trait scopes model records to a [site group](../../themes/sites/multisite.md#site-groups), which gives you multi-tenancy. For an overview of when to use this trait versus Multisite or Translatable, see [Localization & Multisite](./introduction.md).

Unlike the [Multisite](./multisite.md) trait, which creates a copy of the record for each site, MultisiteGroup filters a single set of records by the active site group. Each site group usually represents a distinct website or tenant. For example, a "Dogs" website and a "Cats" website can share one October CMS installation but keep completely separate product catalogs.

Apply the `October\Rain\Database\Traits\MultisiteGroup` trait to scope a model by site group.

```php
class Product extends Model
{
    use \October\Rain\Database\Traits\MultisiteGroup;
}
```

Then add a `site_group_id` column to your table with the `integer` method in a migration.

```php
Schema::table('products', function ($table) {
    $table->integer('site_group_id')->nullable()->index();
});
```

## Querying Records for the Active Group

The trait registers a global scope that filters queries by the active site group. When a model is saved, its `site_group_id` column is set to the current site group automatically.

```php
// Only returns products belonging to the active site group
$products = Product::all();
```

### Querying Every Site Group

The scope is bypassed in the global context, set with `Site::withGlobalContext`, so records from all site groups are available.

```php
Site::withGlobalContext(function() {
    // Returns products from all site groups
    $allProducts = Product::all();
});
```

## Turning Off the Group Scope

The `isMultisiteGroupEnabled` method returns `true` by default. Override it to turn off the global scope under certain conditions.

```php
public function isMultisiteGroupEnabled(): bool
{
    return Site::hasSiteGroups();
}
```

## Using a Custom Column Name

The trait uses `site_group_id` as the column name by default. To use a different column, define the `SITE_GROUP_ID` constant on your model.

```php
const SITE_GROUP_ID = 'my_group_column';
```

## Translating Records Within a Group

MultisiteGroup and [Translatable](./translatable.md) work well together. The group decides which records are visible, while Translatable translates individual attributes into the languages of the group.

```php
class Product extends Model
{
    use \October\Rain\Database\Traits\MultisiteGroup;
    use \October\Rain\Database\Traits\Translatable;

    public $translatable = ['name', 'description'];
}
```

With this setup, each site group (tenant) has its own product catalog, and the product names and descriptions can be translated into the languages defined within that group.

#### See Also

::: also
* [Localization & Multisite](./introduction.md)
* [Multisite Models](./multisite.md)
* [Translatable Models](./translatable.md)
* [Setting Up Multisite](../../themes/sites/multisite.md)
* [Site Manager](../services/site.md)
:::
