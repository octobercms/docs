---
previousPath: extend/database/traits.md#sluggable
subtitle: Generates a unique slug for use in URLs.
---
# Sluggable

Slugs are meaningful codes that are commonly used in page URLs. To automatically generate a unique slug for your model, apply the `October\Rain\Database\Traits\Sluggable` trait and declare a `$slugs` property.

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Sluggable;

    protected $slugs = ['slug' => 'name'];
}
```

The `$slugs` property should be an array where the key is the destination column for the slug and the value is the source string used to generate the slug. In the above example, if the `name` column was set to **Cheyenne**, as a result the `slug` column would be set to **cheyenne**, **cheyenne-2**, or **cheyenne-3**, etc before the model is created.

To generate a slug from multiple sources, pass another array as the source value:

```php
protected $slugs = [
    'slug' => ['first_name', 'last_name']
];
```

Slugs are only generated when a model first created. To override or disable this functionality, simply set the slug attribute manually:

```php
$user = new User;
$user->name = 'Remy';
$user->slug = 'custom-slug';
$user->save(); // Slug will not be generated
```

Use the `slugAttributes` method to regenerate slugs when updating a model:

```php
$user = User::find(1);
$user->slug = null;
$user->slugAttributes();
$user->save();
```
