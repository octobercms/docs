---
previousPath: extend/multisite/multisite.md
subtitle: Give each site its own copy of a model record and keep shared attributes in sync across every copy.
---
# Multisite Models

The Multisite trait stores a separate copy of a record for each site, so every site can have its own content. Use it when sites need different content rather than translations of the same content. For an overview of when to use this trait versus Translatable or MultisiteGroup, see [Localization & Multisite](./introduction.md).

Apply the `October\Rain\Database\Traits\Multisite` trait and list the attributes to copy across all sites in the `$propagatable` property.

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Multisite;

    protected $propagatable = ['api_code'];
}
```

Only records that belong to the active site are available to manage. The site of a record is stored in its `site_id` column.

::: tip
The trait requires the `$propagatable` property. Set it to an empty array to turn off propagation for every attribute.
:::

## Adding the Site Columns

Add a `site_id` column to your table with the `integer` method in a migration. Add a `site_root_id` column to link the copies of a record together through a root record.

```php
Schema::table('posts', function ($table) {
    $table->integer('site_id')->nullable()->index();
    $table->integer('site_root_id')->nullable()->index();
});
```

A new record is assigned to the active site. In the backend, switching to a different site creates a copy of the record for that site automatically.

## Saving and Propagating Changes

Propagated attributes are copied to every record that shares the same root record. A regular save does not propagate. Use the `savePropagate` method so the propagation rules take effect.

```php
$model->savePropagate();
```

Backend forms already save with propagation, so you only need this method when you save the model in your own code.

## Creating Records for Every Site

Some records must exist on every site, such as categories and tags. Set the `$propagatableSync` property to `true` to enforce this. After the model is saved, the same model is created for each other site that does not have it yet. The default value is `false`.

```php
protected $propagatableSync = true;
```

When using [site groups](../../themes/sites/multisite.md#site-groups), records are propagated to all sites within the same group. To change this, set `$propagatableSync` to an array of options.

```php
protected $propagatableSync = [
    'sync' => 'all',
    'delete' => false,
    'except' => [
        'description'
    ]
];
```

The following options are supported.

Option | Description
------------- | -------------
**sync** | which sites to sync with, available options: `all`, `group`, `locale`. Default: `group`
**delete** | delete all linked records when any record is deleted. Default: `true`
**except** | attribute names that should not be copied to newly synced records

#### See Also

::: also
* [Localization & Multisite](./introduction.md)
* [Translatable Models](./translatable.md)
* [Site Groups](./site-groups.md)
* [Setting Up Multisite](../../themes/sites/multisite.md)
* [Site Manager](../services/site.md)
:::
