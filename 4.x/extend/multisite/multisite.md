---
subtitle: Learn how to duplicate model records across multiple sites.
---
# Multisite

::: aside
For an overview of when to use this trait versus Translatable or MultisiteGroup, see the [Introduction](./introduction.md).
:::

When applying multisite to a model, only records belonging to the active site are available to manage. The active site is attached to the `site_id` column set on the record. To enable multi-site for a model, apply the `October\Rain\Database\Traits\Multisite` trait and define the attributes to propagate across all records using the `$propagatable` property:

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Multisite;

    protected $propagatable = ['api_code'];
}
```

::: tip
The `$propagatable` is required by the multisite trait but can be left as an empty array to disable propagation of any attribute.
:::

To add a `site_id` column to your table, you may use the `integer` method from a migration. A `site_root_id` may also be used to link records together using a root record.

```php
Schema::table('posts', function ($table) {
    $table->integer('site_id')->nullable()->index();
    $table->integer('site_root_id')->nullable()->index();
});
```

Now, when a record is created it will be assigned to the active site and switching to a different site will propagate a new record automatically. When updating a record, propagated fields are copied to every record belonging to the root record.

## Enforcing Synchronization

In some cases, all records must exist for every site, such as categories and tags. You may force every record to exist across all sites by setting the `$propagatableSync` property to true, which is false by default. Once enabled, after a model is saved, it will create the same model for other sites if they do not already exist.

```php
protected $propagatableSync = true;
```

When using [Site Groups](../../cms/multisite/multisite.md), the records will be propagated to all sites within that group. This can be controlled by setting the `$propagatableSync` property to an array containing configuration options.

Option | Description
------------- | -------------
- **sync** - logic to sync specific sites, available options: `all`, `group`, `locale`. Default: `group`
- **delete** - delete all linked records when any record is deleted, default: `true`
- **except** - provides attribute names that should not be replicated for newly synced records

```php
protected $propagatableSync = [
    'sync' => 'all',
    'delete' => false,
    'except' => [
        'description'
    ]
];
```

## Saving Models

Models saved with the multisite trait do not propagate by default. Use the `savePropagate` method to ensure the propagation rules take effect.

```php
$model->savePropagate();
```

#### See Also

::: also
* [Introduction](./introduction.md)
* [Translatable Trait](./translatable.md)
* [MultisiteGroup Trait](./multisite-group.md)
* [Multisite Management](../../cms/multisite/multisite.md)
* [Site Service](../services/site.md)
:::
