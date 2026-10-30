---
previousPath: extend/database/traits.md#user-footprints
subtitle: Records the backend user that created or updated the record.
---
# User Footprints

The user footprints trait automatically populates `created_user_id` and `updated_user_id` columns with the currently logged in backend user. This is useful for tracking which administrator created or last modified a record. To enable user footprints for a model, apply the `October\Rain\Database\Traits\UserFootprints` trait.

```php
class Post extends Model
{
    use \October\Rain\Database\Traits\UserFootprints;
}
```

To add the user footprint columns to your table, you may use the `integer` method inside a migration.

```php
Schema::table('posts', function ($table) {
    $table->integer('created_user_id')->nullable()->unsigned();
    $table->integer('updated_user_id')->nullable()->unsigned();
});
```

Now, when a model is created, the `created_user_id` will be set to the current backend user. When a model is updated, the `updated_user_id` will be updated to the current backend user.

The trait automatically injects two `belongsTo` relations called `created_user` and `updated_user` that reference the backend user model.

```php
$post = Post::find(1);
echo $post->created_user->full_name; // Outputs the full name of the creator
echo $post->updated_user->full_name; // Outputs the full name of the last editor
```

You may modify the column names by defining the `CREATED_USER_ID` and `UPDATED_USER_ID` constants.

```php
const CREATED_USER_ID = 'my_created_by_column';
const UPDATED_USER_ID = 'my_updated_by_column';
```
