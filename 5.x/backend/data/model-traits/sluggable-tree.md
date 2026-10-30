---
previousPath: extend/database/traits.md#sluggable-tree
subtitle: Generates full slugs that reflect the tree structure.
---
# Sluggable Tree

The sluggable tree trait creates structured slugs, called full slugs, for hierarchical models. This is useful when you need URL paths that reflect the tree structure, such as `parent-slug/child-slug/grandchild-slug`. The model is assumed to have `parent` and `children` relations defined (typically via the `SimpleTree` or `NestedTree` traits).

To use the sluggable tree, apply the `October\Rain\Database\Traits\SluggableTree` trait along with a tree trait.

```php
class Category extends Model
{
    use \October\Rain\Database\Traits\SimpleTree;
    use \October\Rain\Database\Traits\Sluggable;
    use \October\Rain\Database\Traits\SluggableTree;

    protected $slugs = ['slug' => 'name'];
}
```

To add a `fullslug` column to your table, you may use the `string` method inside a migration.

```php
Schema::table('categories', function ($table) {
    $table->string('fullslug')->nullable()->index();
});
```

Use the `fullSlugAttributes` method to calculate and update the full slug for a model and all its children. This should be called after making changes to the tree structure.

```php
$category = Category::find(1);
$category->fullSlugAttributes();
```

For example, if you have the following structure:

- Electronics (slug: `electronics`)
  - Phones (slug: `phones`)
    - Smartphones (slug: `smartphones`)

The full slugs would be:
- Electronics: `electronics`
- Phones: `electronics/phones`
- Smartphones: `electronics/phones/smartphones`

You may modify the column names by defining the `FULLSLUG` and `SLUG` constants.

```php
const FULLSLUG = 'my_fullslug_column';
const SLUG = 'my_slug_column';
```
