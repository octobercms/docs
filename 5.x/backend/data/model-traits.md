---
previousPath: extend/database/traits.md
subtitle: Add common functionality to models with traits.
---
# Model Traits

Model traits are used to implement common functionality. Apply a trait to a model class with the `use` keyword, then declare any properties the trait needs.

```php
class Product extends Model
{
    use \October\Rain\Database\Traits\Sluggable;

    protected $slugs = ['slug' => 'name'];
}
```

## Available Traits

The following traits are available, grouped by purpose.

**Attribute Manipulation**

Trait | Description
------------- | -------------
[Nullable](./model-traits/nullable.md) | sets attributes to `NULL` when left empty.
[Hashable](./model-traits/hashable.md) | hashes attributes when they are first set.
[Purgeable](./model-traits/purgeable.md) | prevents attributes from being saved to the database.
[Encryptable](./model-traits/encryptable.md) | encrypts attributes when set and decrypts them when retrieved.
[Sluggable](./model-traits/sluggable.md) | generates a unique slug for use in URLs.
[Base Identifier](./model-traits/base-identifier.md) | adds a random identifier that is immune to enumeration attacks.

**Sorting and Reordering**

Trait | Description
------------- | -------------
[Sortable](./model-traits/sortable.md) | stores the sort order of each record in a `sort_order` column.
[Sortable Relation](./model-traits/sortable-relation.md) | adds sorting support to pivot relationships.
[Simple Tree](./model-traits/simple-tree.md) | maintains a parent and child hierarchy using a `parent_id` column.
[Nested Tree](./model-traits/nested-tree.md) | maintains a hierarchy using the nested set model.
[Sluggable Tree](./model-traits/sluggable-tree.md) | generates full slugs that reflect the tree structure.

**Utility Functions**

Trait | Description
------------- | -------------
[Validation](./model-traits/validation.md) | validates attributes against rules before saving.
[Soft Deleting](./model-traits/soft-delete.md) | sets a `deleted_at` timestamp instead of deleting the record.
[Revisionable](./model-traits/revisionable.md) | records the history of changes to attribute values.
[Defaultable](./model-traits/defaultable.md) | designates one record as the default using an `is_default` column.
[User Footprints](./model-traits/user-footprints.md) | records the backend user that created or updated the record.

**Localization & Multisite**

Trait | Description
------------- | -------------
[Multisite](./model-traits/multisite.md) | duplicates records across multiple sites.
[Multisite Group](./model-traits/multisite-group.md) | scopes records to a site group for multi-tenancy.
[Translatable](./model-traits/translatable.md) | translates individual attributes across locales.
[Translatable Attachments](./model-traits/translatable-attachments.md) | translates file attachments across locales.
