---
previousPath: extend/database/traits.md#soft-deleting
subtitle: Sets a `deleted_at` timestamp instead of deleting the record.
---
# Soft Deleting

When soft deleting a model, it is not actually removed from your database. Instead, a `deleted_at` timestamp is set on the record. To enable soft deletes for a model, apply the `October\Rain\Database\Traits\SoftDelete` trait to the model and add the deleted_at column to your `$dates` property:

```php
class User extends Model
{
    use \October\Rain\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];
}
```

To add a `deleted_at` column to your table, you may use the `softDeletes` method from a migration:

```php
Schema::table('posts', function ($table) {
    $table->softDeletes();
});
```

Now, when you call the `delete` method on the model, the `deleted_at` column will be set to the current timestamp. When querying a model that uses soft deletes, the "deleted" models will not be included in query results.

To determine if a given model instance has been soft deleted, use the `trashed` method:

```php
if ($user->trashed()) {
    //
}
```

## Querying Soft Deleted Models

### Including Soft Deleted Models

As noted above, soft deleted models will automatically be excluded from query results. However, you may force soft deleted models to appear in a result set using the `withTrashed` method on the query:

```php
$users = User::withTrashed()->where('account_id', 1)->get();
```

The `withTrashed` method may also be used on a [relationship](../relationships.md) query:

```php
$flight->history()->withTrashed()->get();
```

### Retrieving Only Soft Deleted Models

The `onlyTrashed` method will retrieve **only** soft deleted models:

```php
$users = User::onlyTrashed()->where('account_id', 1)->get();
```

### Restoring Soft Deleted Models

Sometimes you may wish to "un-delete" a soft deleted model. To restore a soft deleted model into an active state, use the `restore` method on a model instance:

```php
$user->restore();
```

You may also use the `restore` method in a query to quickly restore multiple models:

```php
// Restore a single model instance...
User::withTrashed()->where('account_id', 1)->restore();

// Restore all related models...
$user->posts()->restore();
```

## Permanently Deleting Models

Sometimes you may need to truly remove a model from your database. To permanently remove a soft deleted model from the database, use the `forceDelete` method:

```php
// Force deleting a single model instance...
$user->forceDelete();

// Force deleting all related models...
$user->posts()->forceDelete();
```

## Soft Deleting Relations

When two related models have soft deletes enabled, you can cascade the delete event by defining the `softDelete` option in the [relation definition](../relationships.md). In this example, if the user model is soft deleted, the comments belonging to that user will also be soft deleted.

```php
class User extends Model
{
    use \October\Rain\Database\Traits\SoftDelete;

    public $hasMany = [
        'comments' => [\Acme\Blog\Models\Comment::class, 'softDelete' => true]
    ];
}
```

::: tip
If the related model does not use the soft delete trait, it will be treated the same as the `delete` option and deleted permanently.
:::

Under these same conditions, when the primary model is restored, all the related models that use the `softDelete` option will also be restored.

```php
// Restore the user and comments
$user->restore();
```

## Including Soft Deleted Relations

Soft deleted records are not included as part of relation lookups, however, you may include them by adding the `withTrashed` scope to the query.

```php
class User extends Model
{
    public $hasMany = [
        'comments' => [\Acme\Blog\Models\Comment::class, 'scope' => 'withTrashed']
    ];
}
```
